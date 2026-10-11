(() => {
  const lang = document.documentElement.lang === 'es' ? 'es' : 'en';
  const message = (es, en) => lang === 'es' ? es : en;
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  const cache = new Map();
  const load = url => {
    if (!cache.has(url)) cache.set(url, globalThis.fetch(url).then(response => {
      if (!response.ok) throw new Error(`Search index: ${response.status}`);
      return response.json();
    }).then(entries => entries.map(entry => ({
      ...entry,
      titleKey: normalize(entry.title),
      contextKey: normalize(entry.context),
      textKey: normalize(entry.text)
    }))));
    return cache.get(url);
  };
  const rank = (entries, query) => {
    const words = normalize(query).trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return entries.map((entry, order) => {
      if (!words.every(word => `${entry.titleKey} ${entry.contextKey} ${entry.textKey}`.includes(word))) return null;
      const score = words.reduce((sum, word) => sum +
        (entry.titleKey.includes(word) ? 100 : 0) +
        (entry.contextKey.includes(word) ? 25 : 0) +
        (entry.textKey.includes(word) ? 5 : 0), 0) +
        (entry.titleKey === normalize(query).trim() ? 100 : 0);
      return {entry, score, order};
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.order - b.order);
  };
  const snippet = (entry, query) => {
    const words = normalize(query).trim().split(/\s+/).filter(Boolean);
    const source = entry.text.replace(/\s+/g, ' ').trim();
    const folded = normalize(source);
    const positions = words.map(word => folded.indexOf(word)).filter(index => index >= 0);
    const start = Math.max(0, (positions.length ? Math.min(...positions) : 0) - 36);
    const end = Math.min(source.length, start + 125);
    return `${start ? '…' : ''}${source.slice(start, end)}${end < source.length ? '…' : ''}`;
  };
  for (const form of document.querySelectorAll('[data-site-search]')) {
    const input = form.querySelector('input');
    const results = form.querySelector('[data-search-results]');
    const status = form.querySelector('[data-search-status]');
    let request = 0;
    const render = async () => {
      const query = input.value.trim();
      const current = ++request;
      results.replaceChildren();
      if (!query) { results.hidden = true; status.textContent = ''; return; }
      results.hidden = false;
      status.textContent = message('Buscando…', 'Searching…');
      try {
        const matches = rank(await load(form.dataset.indexUrl), query);
        if (current !== request) return;
        const heading = document.createElement('p');
        heading.className = 'search-result-count';
        heading.textContent = matches.length
          ? message(`${matches.length} resultado${matches.length === 1 ? '' : 's'}`, `${matches.length} result${matches.length === 1 ? '' : 's'}`)
          : message('Sin resultados', 'No results');
        results.append(heading);
        for (const {entry} of matches.slice(0, 8)) {
          const link = document.createElement('a');
          link.className = 'search-result';
          link.href = entry.href;
          const title = document.createElement('strong');
          title.textContent = entry.title;
          const context = document.createElement('small');
          context.textContent = entry.context;
          const detail = document.createElement('span');
          detail.textContent = snippet(entry, query);
          link.append(title, context, detail);
          results.append(link);
        }
        status.textContent = heading.textContent;
      } catch {
        if (current !== request) return;
        const error = document.createElement('p');
        error.className = 'search-result-count';
        error.textContent = message('No se pudo cargar la búsqueda.', 'Search could not be loaded.');
        results.append(error);
        status.textContent = error.textContent;
      }
    };
    input.addEventListener('input', render);
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape') { input.value = ''; render(); }
      if (event.key === 'ArrowDown') {
        const first = results.querySelector('a');
        if (first) { event.preventDefault(); first.focus(); }
      }
    });
    form.addEventListener('submit', async event => {
      event.preventDefault();
      await render();
      const first = results.querySelector('a');
      if (first) globalThis.location.assign(first.href);
    });
  }
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      const mobile = globalThis.matchMedia('(max-width: 59.99rem)').matches;
      const selector = mobile ? '.mobile-global [data-site-search]' : '.site-sidebar [data-site-search]';
      if (mobile) document.querySelector('.mobile-global')?.setAttribute('open', '');
      document.querySelector(`${selector} input`)?.focus();
    }
  });
})();
