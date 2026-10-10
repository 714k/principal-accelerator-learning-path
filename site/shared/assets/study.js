(() => {
  const exerciseIds = ['product-boundaries','quality-scenario','change-propagation','ai-boundary','staff-principal'];
  const masteryIds = ['engineering-architecture','product-scales','quality-scenario','boundaries','coupling-cohesion','fpa','aipe','scope-evidence'];
  const key = id => `pa-study-v1:${id}`;
  const read = id => { try { return localStorage.getItem(key(id)) === '1'; } catch { return false; } };
  const summary = document.querySelector('[data-study-summary]');
  const update = () => {
    if (!summary) return;
    const exercises = exerciseIds.filter(id => read(`PA-S001:exercise:${id}`)).length;
    const criteria = masteryIds.filter(id => read(`PA-S001:mastery:${id}`)).length;
    summary.textContent = document.documentElement.lang === 'es'
      ? `${exercises} de 5 ejercicios; ${criteria} de 8 criterios marcados en este navegador.`
      : `${exercises} of 5 exercises; ${criteria} of 8 review criteria marked in this browser.`;
  };
  document.querySelectorAll('input[data-study-id]').forEach(control => {
    const id = control.dataset.studyId;
    control.checked = read(id);
    control.addEventListener('change', () => {
      try { localStorage.setItem(key(id), control.checked ? '1' : '0'); }
      catch {
        const status = control.closest('section')?.querySelector('[data-storage-status]');
        if (status) status.textContent = document.documentElement.lang === 'es'
          ? 'No se pudo guardar la marca en este navegador.'
          : 'The mark could not be saved in this browser.';
      }
      update();
    });
  });
  update();
})();
