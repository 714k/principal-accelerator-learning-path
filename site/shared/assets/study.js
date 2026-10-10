(() => {
  const key = id => `pa-study-v1:${id}`;
  const historyKey = sessionId => `pa-study-v1:${sessionId}:activity`;
  const lang = document.documentElement.lang;
  const charts = document.querySelectorAll('[data-study-chart]');
  const read = id => { try { return localStorage.getItem(key(id)) === '1'; } catch { return null; } };
  const readHistory = sessionId => {
    if (!sessionId) return null;
    try {
      const raw = localStorage.getItem(historyKey(sessionId));
      if (raw === null) return [];
      const entries = JSON.parse(raw);
      if (!Array.isArray(entries)) return null;
      return entries.filter(entry => entry && Number.isSafeInteger(entry.at) && entry.at > 0 && Number.isSafeInteger(entry.marked) && entry.marked >= 0).slice(-30);
    } catch { return null; }
  };
  const updateShare = (group, count) => {
    const figure = document.querySelector(`[data-share-chart="${group.name}"]`);
    if (!figure) return;
    const visual = figure.querySelector('[data-share-visual]');
    const center = figure.querySelector('[data-share-center]');
    const caption = figure.querySelector('[data-share-caption]');
    const total = group.ids.length;
    visual.classList.toggle('is-ready', count !== null);
    if (count === null) {
      visual.style.removeProperty('--chart-share');
      visual.setAttribute('aria-label', lang === 'es' ? 'Marcas locales no disponibles' : 'Local study marks unavailable');
      center.textContent = `— / ${total}`;
      caption.textContent = lang === 'es' ? 'Marcas locales no disponibles' : 'Local study marks unavailable';
      return;
    }
    const remaining = total - count;
    const category = group.name === 'exercise' ? (lang === 'es' ? 'ejercicios' : 'exercises') : (lang === 'es' ? 'criterios de repaso' : 'review criteria');
    visual.style.setProperty('--chart-share', `${total ? count / total * 100 : 0}%`);
    visual.setAttribute('aria-label', lang === 'es'
      ? `${count} marcados y ${remaining} pendientes de ${total} ${category}`
      : `${count} marked and ${remaining} remaining of ${total} ${category}`);
    center.textContent = `${count} / ${total}`;
    caption.textContent = lang === 'es'
      ? `${count} marcados · ${remaining} pendientes`
      : `${count} marked · ${remaining} remaining`;
  };
  const updateLine = (total, sessionId) => {
    const svg = document.querySelector('[data-study-line]');
    if (!svg) return;
    const series = svg.querySelector('[data-line-series]');
    const pointGroup = svg.querySelector('[data-line-points]');
    const state = document.querySelector('[data-line-state]');
    const time = document.querySelector('[data-line-time]');
    const history = readHistory(sessionId);
    series.setAttribute('d', '');
    pointGroup.replaceChildren();
    time.replaceChildren();
    if (history === null) {
      state.textContent = lang === 'es' ? 'Historial local no disponible.' : 'Local history unavailable.';
      svg.setAttribute('aria-label', state.textContent);
      return;
    }
    const entries = history.filter(entry => entry.marked <= total);
    if (!entries.length) {
      state.textContent = lang === 'es'
        ? 'Sin cambios registrados. La línea aparecerá después de dos cambios guardados.'
        : 'No recorded changes. The line will appear after two saved changes.';
      svg.setAttribute('aria-label', state.textContent);
      return;
    }
    const points = entries.map((entry, index) => ({
      x: entries.length === 1 ? 38 : 38 + index * 344 / (entries.length - 1),
      y: 140 - entry.marked * 120 / total
    }));
    if (points.length > 1) series.setAttribute('d', points.map((point, index) => `${index ? 'L' : 'M'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' '));
    for (const point of points) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'line-point');
      circle.setAttribute('cx', point.x.toFixed(1));
      circle.setAttribute('cy', point.y.toFixed(1));
      circle.setAttribute('r', '4');
      pointGroup.append(circle);
    }
    const last = entries[entries.length - 1];
    state.textContent = lang === 'es'
      ? `${entries.length} cambio${entries.length === 1 ? '' : 's'} registrado${entries.length === 1 ? '' : 's'}; último total: ${last.marked} de ${total}.`
      : `${entries.length} recorded change${entries.length === 1 ? '' : 's'}; latest total: ${last.marked} of ${total}.`;
    svg.setAttribute('aria-label', state.textContent);
    const format = new Intl.DateTimeFormat(lang, {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'});
    for (const entry of [entries[0], ...(entries.length > 1 ? [last] : [])]) {
      const label = document.createElement('span');
      label.textContent = format.format(new Date(entry.at));
      time.append(label);
    }
  };
  const update = () => {
    charts.forEach(chart => {
      const groups = [
        { name: 'exercise', ids: chart.dataset.exerciseIds?.split('|').filter(Boolean) ?? [] },
        { name: 'criteria', ids: chart.dataset.criteriaIds?.split('|').filter(Boolean) ?? [] }
      ];
      const counts = groups.map(group => {
        const marks = group.ids.map(read);
        const count = marks.includes(null) ? null : marks.filter(Boolean).length;
        const progress = chart.querySelector(`[data-study-progress="${group.name}"]`);
        const output = chart.querySelector(`[data-study-count="${group.name}"]`);
        if (progress) {
          if (count === null) progress.removeAttribute('value');
          else progress.value = count;
        }
        if (output) output.textContent = `${count ?? '—'} / ${group.ids.length}`;
        updateShare(group, count);
        return count;
      });
      const summary = document.querySelector('[data-study-summary]');
      if (summary) summary.textContent = counts.includes(null)
        ? lang === 'es' ? 'Las marcas locales no están disponibles en este navegador.' : 'Local study marks are unavailable in this browser.'
        : lang === 'es'
          ? `${counts[0]} de ${groups[0].ids.length} ejercicios; ${counts[1]} de ${groups[1].ids.length} criterios marcados en este navegador.`
          : `${counts[0]} of ${groups[0].ids.length} exercises; ${counts[1]} of ${groups[1].ids.length} review criteria marked in this browser.`;
      updateLine(groups[0].ids.length + groups[1].ids.length, chart.dataset.sessionId);
    });
  };
  const recordChange = () => {
    const controls = [...document.querySelectorAll('input[data-study-id]')];
    const sessionId = controls[0]?.dataset.studyId?.split(':')[0];
    if (!sessionId || controls.some(control => !control.dataset.studyId?.startsWith(`${sessionId}:`))) return false;
    const history = readHistory(sessionId);
    if (history === null) return false;
    const marks = controls.map(control => read(control.dataset.studyId));
    if (marks.includes(null)) return false;
    try {
      localStorage.setItem(historyKey(sessionId), JSON.stringify([...history, {at:Date.now(), marked:marks.filter(Boolean).length}].slice(-30)));
      return true;
    } catch { return false; }
  };
  document.querySelectorAll('input[data-study-id]').forEach(control => {
    const id = control.dataset.studyId;
    control.checked = read(id) === true;
    control.addEventListener('change', () => {
      const status = control.closest('section')?.querySelector('[data-storage-status]');
      try { localStorage.setItem(key(id), control.checked ? '1' : '0'); }
      catch {
        control.checked = read(id) === true;
        if (status) status.textContent = lang === 'es'
          ? 'No se pudo guardar la marca en este navegador.'
          : 'The mark could not be saved in this browser.';
        update();
        return;
      }
      if (status) status.textContent = recordChange() ? '' : lang === 'es'
        ? 'La marca se guardó, pero no se pudo guardar el historial local.'
        : 'The mark was saved, but local history could not be saved.';
      update();
    });
  });
  globalThis.addEventListener('storage', () => {
    document.querySelectorAll('input[data-study-id]').forEach(control => { control.checked = read(control.dataset.studyId) === true; });
    update();
  });
  update();
})();
