/* The localized manifest is embedded in each lab. This file owns selection rules only. */
export function outcomeId(kind, values) {
  if (kind === 'scope') return values.lens;
  if (kind === 'dependency') return values.change;
  if (kind === 'quality') return values.delivery + '-' + values.js;
  if (kind === 'ai')
    return values.data === 'private'
      ? 'blocked'
      : values.citations === 'no'
        ? 'unverified'
        : values.review === 'no'
          ? 'unreviewed'
          : 'reviewable';
  throw new Error('Unknown learning lab: ' + kind);
}
export function selectOutcome(spec, values) {
  const id = outcomeId(spec.kind, values);
  const result = spec.outcomes.find((outcome) => outcome.id === id);
  if (!result) throw new Error('Missing lab outcome: ' + spec.kind + '/' + id);
  return result;
}
export function enhanceExplorer(root) {
  const spec = JSON.parse(root.querySelector('[data-lab-spec]').textContent);
  const controls = [...root.querySelectorAll('[data-lab-control]')];
  const output = root.querySelector('[data-explorer-output]');
  const es = document.documentElement.lang === 'es';
  const update = () => {
    const values = Object.fromEntries(
      controls.map((control) => [control.dataset.labControl, control.value]),
    );
    const outcome = selectOutcome(spec, values);
    const heading = document.createElement('h5');
    heading.textContent = outcome.title;
    const parts = [
      ['cause', es ? 'Causa' : 'Cause', outcome.cause],
      ['mechanism', es ? 'Mecanismo' : 'Mechanism', outcome.mechanism],
      [
        'effect',
        spec.limitation
          ? es
            ? 'Consecuencia posible'
            : 'Potential consequence'
          : es
            ? 'Efecto y retroalimentación'
            : 'Effect and feedback',
        outcome.effect,
      ],
    ];
    if (spec.limitation)
      parts.push(['limitation', es ? 'Limitaciones' : 'Limitations', spec.limitation]);
    output.replaceChildren(
      heading,
      ...parts.map(([key, label, value]) => {
        const p = document.createElement('p'),
          strong = document.createElement('strong');
        p.dataset[key] = '';
        strong.textContent = label + ': ';
        p.append(strong, document.createTextNode(value));
        return p;
      }),
    );
    return outcome;
  };
  controls.forEach((control) => control.addEventListener('change', update));
  root.dataset.enhanced = 'true';
  root.querySelector('.reference-cases')?.removeAttribute('open');
  update();
}
if (typeof document !== 'undefined')
  document.querySelectorAll('[data-explorer]').forEach(enhanceExplorer);
