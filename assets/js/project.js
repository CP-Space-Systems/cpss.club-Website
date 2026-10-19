/* Project page behavior: goals, gallery and CSV plots. Visible content stays in HTML.
   Add dataset/channel options in the page's Data & Telemetry Curves section. */
(() => {
  'use strict';

  // Quoted fields, commas, CRLF, escaped quotes and UTF-8 BOM are supported.
  function parseCSV(text) {
    const rows = [];
    let row = [], field = '', quoted = false;
    text = text.replace(/^\uFEFF/, '');
    for (let index = 0; index < text.length; index++) {
      const char = text[index];
      if (char === '"') {
        if (quoted && text[index + 1] === '"') { field += '"'; index++; }
        else if (quoted || !field) quoted = !quoted;
        else throw new Error('Unexpected quote in CSV.');
      } else if (char === ',' && !quoted) {
        row.push(field); field = '';
      } else if ((char === '\n' || char === '\r') && !quoted) {
        row.push(field);
        if (row.some(value => value.trim())) rows.push(row);
        row = []; field = '';
        if (char === '\r' && text[index + 1] === '\n') index++;
      } else field += char;
    }
    if (quoted) throw new Error('Unclosed quoted CSV field.');
    row.push(field);
    if (row.some(value => value.trim())) rows.push(row);
    if (!rows.length) throw new Error('The CSV has no headers.');
    const headers = rows.shift().map(value => value.trim());
    if (headers.some(value => !value) || new Set(headers).size !== headers.length) {
      throw new Error('CSV headers must be nonempty and unique.');
    }
    return {
      headers,
      records: rows.map((values, index) => {
        if (values.length !== headers.length) throw new Error(`CSV row ${index + 2} has the wrong number of fields.`);
        return Object.fromEntries(headers.map((header, column) => [header, values[column].trim()]));
      })
    };
  }

  function selectSamples(dataset, xKey, yKey, options = {}) {
    if (!dataset.headers.includes(xKey) || !dataset.headers.includes(yKey)) {
      throw new Error(`Missing CSV column: ${!dataset.headers.includes(xKey) ? xKey : yKey}.`);
    }
    const samples = dataset.records
      .filter(row => row[xKey] !== '' && row[yKey] !== '')
      .map(row => ({ x: Number(row[xKey]), y: Number(row[yKey]) }))
      .filter(sample => Number.isFinite(sample.x) && Number.isFinite(sample.y))
      .sort((a, b) => a.x - b.x);
    if (options.origin === 'first' && samples.length) {
      const origin = samples[0].x;
      const scale = Number(options.scale || 1);
      if (!Number.isFinite(scale) || scale <= 0) throw new Error('The x-axis scale must be a positive number.');
      samples.forEach(sample => {
        sample.rawX = sample.x;
        sample.x = (sample.x - origin) * scale;
      });
    }
    return samples;
  }

  // Snap to an actual sample by horizontal position, without inventing interpolated values.
  function nearest(samples, x) {
    if (!samples.length) return -1;
    let low = 0, high = samples.length - 1;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (samples[middle].x < x) low = middle + 1;
      else high = middle;
    }
    if (low > 0 && Math.abs(samples[low - 1].x - x) <= Math.abs(samples[low].x - x)) return low - 1;
    return low;
  }
  // Keep the full dataset for hover/table/download. Reduce only SVG line vertices,
  // retaining each bucket's extrema and both sides of recorded timestamp gaps.
  function plotSamples(samples, limit = 2400) {
    if (samples.length <= limit) return samples;
    const indices = new Set([0, samples.length - 1]);
    const bucket = Math.ceil(samples.length / (limit / 2));
    for (let start = 0; start < samples.length; start += bucket) {
      let minimum = start, maximum = start;
      for (let index = start; index < Math.min(start + bucket, samples.length); index++) {
        if (samples[index].y < samples[minimum].y) minimum = index;
        if (samples[index].y > samples[maximum].y) maximum = index;
        if (index > 0 && samples[index].segment !== samples[index - 1].segment) {
          indices.add(index - 1); indices.add(index);
        }
      }
      indices.add(minimum); indices.add(maximum);
    }
    return [...indices].sort((a, b) => a - b).map(index => samples[index]);
  }

  function markGaps(samples) {
    const differences = samples.slice(1).map((sample, index) => sample.x - samples[index].x)
      .filter(value => value > 0).sort((a, b) => a - b);
    const typical = differences[Math.floor(differences.length / 2)];
    let segment = 0;
    samples.forEach((sample, index) => {
      if (index && typical && sample.x - samples[index - 1].x > typical * 5) segment++;
      sample.segment = segment;
    });
    return samples;
  }
  window.CPSSProjectData = { parseCSV, selectSamples, nearest, plotSamples, markGaps };

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const goals = [...document.querySelectorAll('.goal-row')];
  let observer;
  function showGoals() {
    observer?.disconnect();
    goals.forEach(goal => {
      goal.classList.remove('reveal-init');
      goal.classList.add('reveal-visible');
    });
  }
  if ('IntersectionObserver' in window && !motion.matches) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-init');
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    goals.forEach(goal => { goal.classList.add('reveal-init'); observer.observe(goal); });
  } else showGoals();
  motion.addEventListener('change', event => { if (event.matches) showGoals(); });

  document.querySelectorAll('[data-project-gallery]').forEach(gallery => {
    const slides = [...gallery.querySelectorAll('[data-project-slide]')];
    const previous = gallery.querySelector('[data-project-prev]');
    const next = gallery.querySelector('[data-project-next]');
    const position = gallery.querySelector('[data-project-position]');
    if (!slides.length) return;
    let current = 0;
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, number) => { slide.hidden = number !== current; });
      position.textContent = `${current + 1} of ${slides.length}`;
    }
    previous.disabled = next.disabled = slides.length < 2;
    previous.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    gallery.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    });
    let touchStart;
    gallery.addEventListener('touchstart', event => { touchStart = event.touches[0].clientX; }, { passive: true });
    gallery.addEventListener('touchend', event => {
      if (touchStart === undefined) return;
      const distance = touchStart - event.changedTouches[0].clientX;
      if (Math.abs(distance) > 50) show(current + (distance > 0 ? 1 : -1));
      touchStart = undefined;
    }, { passive: true });
    show(0);
  });

})();
