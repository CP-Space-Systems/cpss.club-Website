/* Shared Plotly test-data behavior. Configure datasets in each page's HTML.
   The approved local-vendor goal is pending a supplied Plotly bundle: network
   downloads are blocked in the authoring environment. See VENDOR.md. */
(() => {
  'use strict';
  const PLOTLY_SOURCE = 'https://cdn.plot.ly/plotly-4.1.1.min.js';
  const palette = ['#154734', '#a47500', '#447eb3', '#a34c6b', '#7964a5', '#259783'];
  let loadingLibrary;
  function loadLibrary() {
    if (window.Plotly) return Promise.resolve(window.Plotly);
    if (loadingLibrary) return loadingLibrary;
    loadingLibrary = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = PLOTLY_SOURCE;
      script.onload = () => resolve(window.Plotly);
      script.onerror = () => reject(new Error('Plotly could not load. Internet access is currently required; see VENDOR.md for local hosting.'));
      document.head.append(script);
    });
    return loadingLibrary;
  }
  function parseRecording(text, definition) {
    const parsed = window.CPSSProjectData.parseCSV(text);
    const xColumn = definition.xColumn || 'time_s';
    const columns = [...new Set(definition.groups.flatMap(group => group.columns))];
    const required = [xColumn, ...columns];
    required.forEach(key => { if (!parsed.headers.includes(key)) throw new Error('Missing CSV column: ' + key); });
    const xRaw = [], signals = Object.fromEntries(columns.map(key => [key, []]));
    parsed.records.forEach((row, index) => {
      const values = required.map(key => row[key] === '' ? NaN : Number(row[key]));
      if (values.some(value => !Number.isFinite(value))) throw new Error(`Missing/nonnumeric measurement at CSV row ${index + 2}. Prepare the dataset before publishing.`);
      xRaw.push(values[0]); columns.forEach((key, column) => signals[key].push(values[column + 1]));
    });
    if (!xRaw.length) throw new Error('No measured samples found.');
    if (xRaw.some((value, index) => index && value < xRaw[index - 1])) throw new Error('The x column must be sorted in ascending order.');
    const scale = definition.xScale ?? 1;
    if (!Number.isFinite(scale) || scale <= 0) throw new Error('xScale must be positive.');
    const origin = definition.xOrigin === 'first' ? xRaw[0] : 0;
    const x = xRaw.map(value => (value - origin) * scale);
    if (x[0] !== 0) throw new Error('Prepare the first x sample as zero, or set xOrigin to first.');
    return { x, signals, count: x.length, duration: x.at(-1), text };
  }
  function lowerBound(x, value) {
    let low = 0, high = x.length;
    while (low < high) { const middle = (low + high) >>> 1; if (x[middle] < value) low = middle + 1; else high = middle; }
    return low;
  }
  function nearest(x, value) {
    const index = Math.min(lowerBound(x, value), x.length - 1);
    return index > 0 && Math.abs(x[index - 1] - value) <= Math.abs(x[index] - value) ? index - 1 : index;
  }
  function normalizeRange(next, duration) {
    let [left, right] = next.map(Number).sort((a, b) => a - b);
    if (!Number.isFinite(left) || !Number.isFinite(right) || right <= left) return [0, duration];
    const width = right - left;
    if (width >= duration) return [0, duration];
    if (left < 0) { left = 0; right = width; }
    if (right > duration) { right = duration; left = duration - width; }
    return [left, right];
  }
  function windowIndices(data, limits) {
    return [Math.max(0, lowerBound(data.x, limits[0]) - 1), Math.min(data.count - 1, lowerBound(data.x, limits[1]))];
  }
  function extremaIndices(values, start, end, limit = 2400) {
    if (end - start + 1 <= limit) return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    const selected = new Set([start, end]);
    const bucket = Math.ceil((end - start + 1) / (limit / 2));
    for (let first = start; first <= end; first += bucket) {
      let minimum = first, maximum = first;
      for (let index = first; index <= Math.min(first + bucket - 1, end); index++) {
        if (values[index] < values[minimum]) minimum = index;
        if (values[index] > values[maximum]) maximum = index;
      }
      selected.add(minimum); selected.add(maximum);
    }
    return [...selected].sort((a, b) => a - b);
  }
  function yRange(data, entries, visibility, limits, group) {
    const first = lowerBound(data.x, limits[0]);
    const last = Math.min(data.count - 1, lowerBound(data.x, limits[1]));
    let minimum = Infinity, maximum = -Infinity;
    entries.forEach(([key], curve) => {
      if (!visibility[curve]) return;
      const values = data.signals[key];
      for (let index = first; index <= last; index++) {
        minimum = Math.min(minimum, values[index]); maximum = Math.max(maximum, values[index]);
      }
    });
    if (!Number.isFinite(minimum)) return [0, 1];
    const padding = (maximum - minimum) * .08 || Math.max(Math.abs(maximum) * .08, 1);
    return [group.floorZero ? Math.max(0, minimum - padding) : minimum - padding, maximum + padding];
  }
  function makeTraces(data, entries, visibility, limits, unit) {
    const [first, last] = windowIndices(data, limits);
    return entries.map(([key, label, color], index) => {
      const kept = extremaIndices(data.signals[key], first, last);
      return {
        type: 'scatter', mode: 'lines', name: label,
        x: kept.map(i => data.x[i]), y: kept.map(i => data.signals[key][i]),
        visible: visibility[index] ? true : 'legendonly',
        line: { color, width: 1.6, simplify: false },
        hovertemplate: `<b>${label}</b><br>%{x:.6f} s<br>%{y:.5g} ${unit}<extra></extra>`
      };
    });
  }

  window.CPSSChartCore = { parseRecording, nearest, normalizeRange, extremaIndices, yRange, makeTraces };
  document.querySelectorAll('[data-data-charts]').forEach(host => {
    const status = host.querySelector('[data-status]');
    const note = host.querySelector('[data-chart-note]');
    const controls = host.querySelector('[data-controls]');
    const selector = host.querySelector('[data-dataset]');
    const plotHost = host.querySelector('[data-plots]');
    const download = host.querySelector('[data-download]');
    let definitions;
    try { definitions = JSON.parse(host.querySelector('[data-chart-config]').textContent).datasets || []; }
    catch (error) { status.textContent = 'Invalid chart configuration: ' + error.message; return; }
    if (!definitions.length) { note.hidden = true; status.textContent = 'Test data not yet published.'; return; }
    const margins = { l: 78, r: 28, t: 98, b: 60, autoexpand: false };
    const plots = [], groups = [], visible = [];
    let recording, definition, range, ready = false, busy = false, scheduled, request = 0, revision = 0, mode = 'zoom';
    definitions.forEach((item, index) => { const option = document.createElement('option'); option.value = index; option.textContent = item.label; selector.append(option); });
    function errorMessage(error) { status.textContent = error.message || String(error); status.classList.add('chart-error'); }
    function entries(group) { return group.columns.map((key, index) => [key, key, palette[index % palette.length]]); }
    function layout(index) {
      const group = groups[index];
      return {
        autosize: true, margin: margins, paper_bgcolor: 'white', plot_bgcolor: 'white',
        font: { family: 'Space Grotesk, Arial, sans-serif', size: 13, color: '#154734' },
        dragmode: mode, hovermode: 'x', uirevision: revision,
        legend: { orientation: 'h', x: 0, y: 1.23, xanchor: 'left', yanchor: 'top', font: { size: 12 } },
        xaxis: { title: { text: `${definition.xLabel || 'Time'} (${definition.xUnit || 's'})` }, range: range.slice(), gridcolor: '#edf1ec', zeroline: false, showspikes: true, spikemode: 'across', spikesnap: 'cursor' },
        yaxis: { title: { text: `${group.title} (${group.unit})` }, range: yRange(recording, entries(group), visible[index], range, group), gridcolor: '#edf1ec', zerolinecolor: '#cdd8d1', fixedrange: true }
      };
    }
    const config = { responsive: true, displaylogo: false, scrollZoom: false, doubleClick: 'reset', modeBarButtonsToRemove: ['select2d','lasso2d','autoScale2d','resetScale2d'], toImageButtonOptions: { format: 'png', scale: 2 } };
    async function refresh(next = range) {
      if (!ready) return;
      const limits = normalizeRange(next, recording.duration);
      if (busy) { scheduled = limits; return; }
      busy = true; range = limits; revision++;
      try {
        await Promise.all(plots.map((plot, index) => window.Plotly.react(plot,
          makeTraces(recording, entries(groups[index]), visible[index], range, groups[index].unit), layout(index), config)));
        host.querySelector('[data-window]').textContent = `${range[0].toFixed(3)}–${range[1].toFixed(3)} ${definition.xUnit || 's'}`;
      } finally { busy = false; if (scheduled) { const nextRange = scheduled; scheduled = undefined; await refresh(nextRange); } }
    }
    function relayout(event) {
      if (busy) return;
      let limits = event['xaxis.range'];
      if (!limits && event['xaxis.range[0]'] !== undefined) limits = [event['xaxis.range[0]'], event['xaxis.range[1]']];
      if (event['xaxis.autorange']) limits = [0, recording.duration];
      if (limits) refresh(limits).catch(errorMessage);
    }
    function readout(index, event) {
      if (!ready || busy) return;
      const rect = plots[index].getBoundingClientRect();
      const position = event.clientX - rect.left;
      if (position < margins.l || position > rect.width - margins.r) return;
      const x = range[0] + (position - margins.l) / (rect.width - margins.l - margins.r) * (range[1] - range[0]);
      const sample = nearest(recording.x, x);
      updateReadout(index, sample);
    }
    function updateReadout(index, sample) {
      plots[index].sampleIndex = sample;
      const output = plots[index].parentElement.querySelector('[data-readout]'); output.replaceChildren();
      const time = document.createElement('strong'); time.textContent = `${recording.x[sample].toFixed(6)} ${definition.xUnit || 's'}`; output.append(time);
      groups[index].columns.forEach((key, curve) => {
        if (!visible[index][curve]) return;
        const value = document.createElement('span'); value.style.borderLeftColor = palette[curve % palette.length];
        value.textContent = `${key}: ${recording.signals[key][sample].toFixed(3)} ${groups[index].unit}`; output.append(value);
      });
    }
    function checkboxes(index) {
      const area = plots[index].parentElement.querySelector('[data-curve-controls]'); area.replaceChildren();
      groups[index].columns.forEach((key, curve) => {
        const label = document.createElement('label'); const input = document.createElement('input'); input.type = 'checkbox'; input.checked = visible[index][curve];
        const dot = document.createElement('i'); dot.style.backgroundColor = palette[curve % palette.length];
        label.append(input, dot, document.createTextNode(key)); area.append(label);
        input.addEventListener('change', () => { visible[index][curve] = input.checked; refresh().catch(errorMessage); });
      });
    }
    async function loadDataset() {
      const token = ++request; ready = false; download.hidden = true; controls.hidden = true;
      status.classList.remove('chart-error'); status.textContent = 'Loading measured data…';
      definition = definitions[Number(selector.value)];
      try {
        if (!definition.file || definition.file.startsWith('/') || /^(?:[a-z]+:|\/\/)/i.test(definition.file)) throw new Error('Use a local CSV path without a leading slash.');
        const url = (document.body.dataset.base || './') + definition.file;
        const response = await fetch(url); if (!response.ok) throw new Error(`CSV could not load (HTTP ${response.status}). Check filename case and preview through a local server.`);
        const text = await response.text(); if (token !== request) return;
        recording = parseRecording(text, definition); range = [recording.x[0], recording.duration];
        await loadLibrary(); if (token !== request) return;
        plots.forEach(plot => window.Plotly.purge(plot)); plots.length = 0; groups.length = 0; visible.length = 0; plotHost.replaceChildren();
        definition.groups.forEach(group => {
          groups.push(group); visible.push(group.columns.map(() => true));
          const panel = document.createElement('div'); panel.className = 'data-plot-panel';
          const title = document.createElement('h3'); title.textContent = group.title;
          const checks = document.createElement('div'); checks.className = 'data-curve-controls'; checks.setAttribute('data-curve-controls','');
          const plot = document.createElement('div'); plot.className = 'data-plot'; plot.setAttribute('aria-label',`${group.title} in ${group.unit}. Arrow keys inspect samples; Home and End jump to the visible interval boundaries.`); plot.setAttribute('tabindex','0');
          const output = document.createElement('div'); output.className = 'data-readout'; output.setAttribute('data-readout',''); output.setAttribute('role','status'); output.setAttribute('aria-live','polite'); output.textContent = 'Hover or tap for the nearest recorded sample.';
          panel.append(title, checks, plot, output); plotHost.append(panel); plots.push(plot);
        });
        await Promise.all(plots.map((plot, index) => window.Plotly.newPlot(plot,
          makeTraces(recording, entries(groups[index]), visible[index], range, groups[index].unit), layout(index), config)));
        if (token !== request) return;
        ready = true; controls.hidden = false; note.hidden = false; note.textContent = definition.note || '';
        download.href = url; download.hidden = false;
        plots.forEach((plot, index) => {
          checkboxes(index); plot.on('plotly_relayout', relayout);
          plot.on('plotly_legendclick', event => { visible[index][event.curveNumber] = !visible[index][event.curveNumber]; checkboxes(index); refresh().catch(errorMessage); return false; });
          plot.on('plotly_legenddoubleclick', event => { visible[index] = visible[index].map((_, curve) => curve === event.curveNumber); checkboxes(index); refresh().catch(errorMessage); return false; });
          plot.on('plotly_doubleclick', () => refresh([recording.x[0],recording.duration]).catch(errorMessage));
          plot.addEventListener('pointermove', event => readout(index,event)); plot.addEventListener('pointerdown',event => readout(index,event));
          plot.addEventListener('keydown',event => {
            if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
            event.preventDefault();
            const first = nearest(recording.x,range[0]), last = nearest(recording.x,range[1]);
            const current = plot.sampleIndex ?? first;
            const sample = event.key === 'Home' ? first : event.key === 'End' ? last : Math.max(first,Math.min(last,current+(event.key==='ArrowRight'?1:-1)));
            updateReadout(index,sample);
          });
        });
        host.querySelector('[data-window]').textContent = `${range[0].toFixed(3)}–${range[1].toFixed(3)} ${definition.xUnit || 's'}`;
        status.textContent = `${recording.count.toLocaleString()} recorded samples. Drag a time window in either plot; both plots stay linked. Drawing is reduced at wide zoom, while sample readouts use the full dataset.`;
      } catch (error) { if (token === request) errorMessage(error); }
    }
    selector.addEventListener('change', loadDataset);
    host.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
      mode = button.dataset.mode; host.querySelectorAll('[data-mode]').forEach(other => other.setAttribute('aria-pressed',String(other === button)));
      Promise.all(plots.map(plot => window.Plotly.relayout(plot,{dragmode:mode}))).catch(errorMessage);
    }));
    host.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
      if (!ready) return;
      const width = range[1] - range[0];
      const next = button.dataset.action === 'reset' ? [recording.x[0],recording.duration]
        : button.dataset.action === 'in' ? [range[0]+width/4,range[1]-width/4] : [range[0]-width/2,range[1]+width/2];
      refresh(next).catch(errorMessage);
    }));
    loadDataset();
  });
})();
