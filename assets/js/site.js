/* Shared behavior only. Page body content stays in HTML; preview metadata is in content.js. */
(() => {
  'use strict';
  const base = document.body.dataset.base || './';
  const content = window.CPSS_CONTENT || { projects: [], publications: [], updates: [] };
  const settings = window.CPSS_SETTINGS || {};
  const sitePath = (path) => base + path.replace(/^\/+/, '');
  const make = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const link = (text, path) => {
    const node = make('a', text);
    node.href = /^(https?:|mailto:)/i.test(path) ? path : sitePath(path);
    return node;
  };
  const media = (path, alt) => {
    if (!path) {
      const node = make('div', '[Project thumbnail]', 'media-placeholder aspect-[4/3]');
      node.setAttribute('role', 'img');
      node.setAttribute('aria-label', 'Project thumbnail placeholder');
      return node;
    }
    const image = make('img');
    image.src = sitePath(path);
    image.alt = alt || 'Project photograph';
    image.loading = 'lazy';
    image.className = 'w-full aspect-[4/3] object-cover';
    return image;
  };

  // Mobile navigation: escape closes and returns focus; desktop resets it.
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  function closeMenu() {
    nav?.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', closeMenu);

  // Homepage only: the video opens without a bar across it. Navigation slides
  // down after the first 96px of scrolling and stays available below the hero.
  // Without JavaScript the normal shared header remains visible.
  if (document.body.dataset.home === 'true') {
    const header = document.querySelector('.site-header');
    document.body.classList.add('has-scroll-header');
    const updateHeader = () => {
      header.classList.toggle('is-visible', window.scrollY > 96);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('pageshow', updateHeader);
    header.addEventListener('focusin', () => header.classList.add('is-visible'));
    header.addEventListener('focusout', () => {
      if (!header.contains(document.activeElement)) updateHeader();
    });
    updateHeader();
  }

  function projectPreview(project, compact) {
    const article = make('article', undefined, compact ? '' : 'project-row');
    article.dataset.projectSlug = project.slug;
    const imageLink = link('', `projects/${project.slug}/`);
    imageLink.className = 'project-media';
    imageLink.setAttribute('aria-label', `View ${project.title}`);
    imageLink.append(media(project.thumbnail, project.thumbnailAlt));
    const copy = make('div', undefined, 'project-copy');
    copy.append(make('p', project.status, 'project-meta'));
    const heading = make(compact ? 'h3' : 'h2');
    heading.append(link(project.title, `projects/${project.slug}/`));
    copy.append(heading, make('p', project.summary));
    if (!compact) {
      const tags = make('div', undefined, 'project-tags');
      (project.tags || []).forEach((tag) => tags.append(make('span', tag)));
      copy.append(tags, make('p', `Lead: ${project.lead || '[Project lead]'}`, 'project-meta'));
    }
    copy.append(link('View project →', `projects/${project.slug}/`));
    article.append(imageLink, copy);
    return article;
  }
  let activeTag = null;
  let sorting = 'featured';
  const filterHost = document.querySelector('[data-project-filters]');
  const sortSelect = document.querySelector('[data-project-sort]');
  const count = document.querySelector('[data-project-count]');
  function orderedProjects() {
    const result = content.projects.filter((project) => !activeTag || (project.tags || []).includes(activeTag));
    if (sorting === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sorting === 'newest' || sorting === 'oldest') {
      // Missing/invalid dates are always last, regardless of sort direction.
      result.sort((a, b) => {
        const first = Date.parse(a.date);
        const second = Date.parse(b.date);
        if (!Number.isFinite(first)) return Number.isFinite(second) ? 1 : 0;
        if (!Number.isFinite(second)) return -1;
        return sorting === 'newest' ? second - first : first - second;
      });
    }
    return result;
  }
  function renderProjects() {
    document.querySelectorAll('[data-project-list]').forEach((host) => {
      const compact = host.dataset.projectList === 'home';
      const entries = compact ? content.projects.filter((p) => p.featured).slice(0, Math.max(1, Number(settings.homeProjectLimit) || 3)) : orderedProjects();
      host.replaceChildren(...entries.map((project) => projectPreview(project, compact)));
      if (!entries.length) host.append(make('p', 'No projects match this tag.'));
      if (!compact && count) count.textContent = `${entries.length} project${entries.length === 1 ? '' : 's'}`;
    });
  }
  if (filterHost) {
    // The same tag values are used for labels and matching. Renaming a catalog tag is safe.
    const tags = [...new Set(content.projects.flatMap((project) => project.tags || []))].sort();
    [null, ...tags].forEach((tag) => {
      const button = make('button', tag === null ? 'All projects' : tag);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(tag === null));
      button.addEventListener('click', () => {
        activeTag = tag;
        filterHost.querySelectorAll('button').forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
        renderProjects();
      });
      filterHost.append(button);
    });
  }
  sortSelect?.addEventListener('change', () => {
    sorting = sortSelect.value;
    renderProjects();
  });
  renderProjects();

  const publicationHost = document.querySelector('[data-publications-list]');
  content.publications.forEach((publication) => {
    if (!publicationHost) return;
    const article = make('article', undefined, 'publication-entry');
    const heading = make('h2');
    heading.append(link(publication.title, publication.link || `publications/${publication.slug}/`));
    article.append(make('p', `${publication.type} · ${publication.date || '[Date]'}`, 'project-meta'), heading,
      make('p', publication.summary), make('p', publication.authors), make('p', (publication.tags || []).join(' · ')),
      link('View publication →', publication.link || `publications/${publication.slug}/`));
    publicationHost.append(article);
  });
  const updatesHost = document.querySelector('[data-updates-list]');
  function renderUpdates(category = 'all') {
    if (!updatesHost) return;
    updatesHost.replaceChildren();
    ['professional', 'blog'].filter((kind) => category === 'all' || kind === category).forEach((kind) => {
      const section = make('section', undefined, 'update-group');
      section.append(make(
        'h2',
        kind === 'professional' ? 'Professional Updates' : 'Club Blog',
        kind === 'professional' ? 'section-title section-title--large' : 'section-title section-title--gold'
      ));
      const entries = content.updates.filter((update) => update.category === kind);
      entries.forEach((update) => {
        const article = make('article', undefined, 'update-entry');
        const heading = make('h3');
        heading.append(link(update.title, `updates/${update.slug}/`));
        article.append(make('p', update.dateLabel || update.date || '[Date]', 'project-meta'), heading, make('p', update.summary),
          link('Read article →', `updates/${update.slug}/`));
        section.append(article);
      });
      if (!entries.length) section.append(make('p', 'No posts in this category yet.'));
      updatesHost.append(section);
    });
  }
  document.querySelectorAll('[data-update-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-update-filter]').forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
      renderUpdates(button.dataset.updateFilter);
    });
  });
  renderUpdates();

  // Add a slide by copying one HTML figure. No separate JavaScript array needed.
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('[data-slide]')];
    let current = 0;
    const previous = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    const position = carousel.querySelector('[data-position]');
    function show(index) {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, number) => {
        slide.hidden = number !== current;
        slide.setAttribute('aria-label', `Photograph ${number + 1} of ${slides.length}`);
      });
      position.textContent = `${current + 1} / ${slides.length}`;
    }
    previous.disabled = next.disabled = slides.length < 2;
    previous.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let startX;
    let startY;
    carousel.addEventListener('touchstart', (event) => {
      startX = event.changedTouches[0].clientX;
      startY = event.changedTouches[0].clientY;
    }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      if (startX === undefined) return;
      const dx = event.changedTouches[0].clientX - startX;
      const dy = event.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
      startX = undefined;
    }, { passive: true });
    show(0);
  });

  const dialog = document.querySelector('#image-dialog');
  document.querySelectorAll('[data-enlarge]').forEach((button) => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      if (!source) return;
      dialog.querySelector('img').src = source.src;
      dialog.querySelector('img').alt = source.alt;
      dialog.querySelector('p').textContent = source.alt;
      dialog.showModal();
    });
  });
  dialog?.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

  // Missing destination links explain what is needed instead of navigating nowhere.
  let noticeTimer;
  document.querySelectorAll('[data-placeholder-link]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const notice = document.querySelector('.link-notice');
      notice.textContent = 'This link needs its real destination before publication. Edit it in this page’s HTML.';
      notice.hidden = false;
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => { notice.hidden = true; }, 7000);
    });
  });

  const form = document.querySelector('#inquiry-form');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('[data-form-status]');
    const values = new FormData(form);
    if (settings.formEndpoint) {
      try {
        status.textContent = 'Sending…';
        const response = await fetch(settings.formEndpoint, { method: 'POST', body: values, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Submission failed');
        status.textContent = 'Your inquiry was sent.';
        form.reset();
      } catch {
        status.textContent = 'The inquiry could not be sent. Please try again or use the club email address.';
      }
      return;
    }
    if (!settings.contactEmail) {
      status.textContent = 'A confirmed club email address is needed. Set contactEmail in assets/data/content.js to enable email drafts.';
      return;
    }
    const subject = `CPSS inquiry: ${values.get('topic')}`;
    const body = `Name: ${values.get('name')}\nReply to: ${values.get('email')}\n\n${values.get('message')}`;
    const mailto = `mailto:${settings.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.dataset.mailto = mailto;
    status.textContent = 'Opening your email application. Review and send the draft there.';
    window.location.href = mailto;
  });

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((section) => {
      section.classList.add('reveal-pending');
      observer.observe(section);
    });
  }
  // Optional supplied homepage background video; respects reduced motion and playback failures.
  document.querySelectorAll('[data-background-video]').forEach((video) => {
    const toggle = video.parentElement.querySelector('[data-video-toggle]');
    video.muted = true;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const updateLabel = () => {
      if (toggle) toggle.textContent = video.paused ? 'Play video' : 'Pause video';
    };
    if (motion.matches) {
      video.autoplay = false;
      video.pause();
    }
    motion.addEventListener('change', () => { if (motion.matches) video.pause(); });
    video.addEventListener('play', updateLabel);
    video.addEventListener('pause', updateLabel);
    toggle?.addEventListener('click', () => {
      if (video.paused) video.play().catch(updateLabel);
      else video.pause();
    });
    updateLabel();
  });
})();
