(() => {
  const key = id => `pa-study-v1:${id}`;
  const read = id => { try { return localStorage.getItem(key(id)) === '1'; } catch { return null; } };
  const charts = document.querySelectorAll('[data-study-chart]');
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
        return count;
      });
      const summary = document.querySelector('[data-study-summary]');
      if (summary) summary.textContent = counts.includes(null)
        ? document.documentElement.lang === 'es' ? 'Las marcas locales no están disponibles en este navegador.' : 'Local study marks are unavailable in this browser.'
        : document.documentElement.lang === 'es'
          ? `${counts[0]} de ${groups[0].ids.length} ejercicios; ${counts[1]} de ${groups[1].ids.length} criterios marcados en este navegador.`
          : `${counts[0]} of ${groups[0].ids.length} exercises; ${counts[1]} of ${groups[1].ids.length} review criteria marked in this browser.`;
    });
  };
  document.querySelectorAll('input[data-study-id]').forEach(control => {
    const id = control.dataset.studyId;
    control.checked = read(id) === true;
    control.addEventListener('change', () => {
      try { localStorage.setItem(key(id), control.checked ? '1' : '0'); }
      catch {
        control.checked = read(id) === true;
        const status = control.closest('section')?.querySelector('[data-storage-status]');
        if (status) status.textContent = document.documentElement.lang === 'es'
          ? 'No se pudo guardar la marca en este navegador.'
          : 'The mark could not be saved in this browser.';
      }
      update();
    });
  });
  globalThis.addEventListener('storage', () => {
    document.querySelectorAll('input[data-study-id]').forEach(control => { control.checked = read(control.dataset.studyId) === true; });
    update();
  });
  update();
})();
