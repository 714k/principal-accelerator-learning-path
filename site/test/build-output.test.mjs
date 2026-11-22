import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { basePath } from '../tooling/render.ts';

test('generated bilingual chapters load the emitted explorer module', () => {
  const source = readFileSync('site/shared/assets/concept-explorers.js');
  assert.deepEqual(readFileSync('dist/assets/concept-explorers.js'), source);
  const moduleUrl = `${basePath(process.env.BASE_PATH)}assets/concept-explorers.js`;
  for (const lang of ['es', 'en']) {
    const html = readFileSync(`dist/${lang}/sessions/PA-S001/index.html`, 'utf8');
    assert.ok(
      html.includes(`<script type="module" src="${moduleUrl}"></script>`),
      `${lang}: missing explorer module at ${moduleUrl}`,
    );
  }
});

test('session routes load the shared semantic UI assets and PA-S001 landmarks are linked', () => {
  const base = basePath(process.env.BASE_PATH);
  for (const asset of ['session-ui.css', 'session-ui.js']) {
    const source = readFileSync(`site/shared/assets/${asset}`);
    assert.deepEqual(readFileSync(`dist/assets/${asset}`), source);
  }
  for (const lang of ['es', 'en']) {
    for (const session of ['PA-S001', 'PA-S002']) {
      const html = readFileSync(`dist/${lang}/sessions/${session}/index.html`, 'utf8');
      assert.ok(html.includes(`<link rel="stylesheet" href="${base}assets/session-ui.css">`));
      assert.ok(html.includes(`<script defer src="${base}assets/session-ui.js"></script>`));
      assert.match(html, /<a class="skip" href="#main-content">/);
      assert.match(html, /<main id="main-content">/);
    }
    const paS001 = readFileSync(`dist/${lang}/sessions/PA-S001/index.html`, 'utf8');
    assert.match(
      paS001,
      /<nav aria-labelledby="toc-heading"><h2 class="sr-only" id="toc-heading">/,
    );
    assert.match(paS001, /<section[^>]*id="subtopic-7"[\s\S]*?aria-labelledby="subtopic-7-title"/);
    const diagramFigures = [
      ...paS001.matchAll(/<figure\b[^>]*data-diagram[^>]*>[\s\S]*?<\/figure>/g),
    ].map((match) => match[0]);
    assert.equal(diagramFigures.length, 12);
    for (const figure of diagramFigures)
      assert.match(figure, /<details>\s*<summary>[^<]*Mermaid[^<]*<\/summary>/i);
    const navLabels =
      lang === 'es'
        ? ['Navegación del programa', 'Navegación del programa móvil']
        : ['Program navigation', 'Mobile program navigation'];
    for (const label of navLabels) assert.ok(paS001.includes(`aria-label="${label}"`));
    assert.equal(
      (paS001.match(/<form\b/g) ?? []).length,
      (paS001.match(/<button\b[^>]*type="submit"/g) ?? []).length,
    );
    assert.match(
      paS001,
      /<label for="s001-range-impact">(?:Impact|Impacto)<\/label\s*>[\s\S]*?<input[^>]*id="s001-range-impact"[^>]*\/?><output for="s001-range-impact">4<\/output>/,
    );
  }
});

test('PA-S001 horizontal Mermaid flows render a vertical mobile variant from their source', () => {
  const base = basePath(process.env.BASE_PATH);
  for (const lang of ['es', 'en']) {
    const source = readFileSync(`site/content/canonical/PA-S001-session-${lang}.html`, 'utf8');
    const html = readFileSync(`dist/${lang}/sessions/PA-S001/index.html`, 'utf8');
    const inlineFlows = [
      ...source.matchAll(/<figure\b[^>]*data-diagram="([^"]+)"[^>]*>([\s\S]*?)<\/figure>/gi),
    ].filter(([, , figure]) =>
      /<code\b[^>]*>\s*(?:(?:flowchart|graph)\s+(?:LR|RL)\b|sequenceDiagram\b)/i.test(figure),
    );
    assert.ok(inlineFlows.length > 0, `${lang}: expected inline horizontal Mermaid flows`);
    for (const [, id] of inlineFlows) {
      const asset = `dist/${lang}/shared/diagrams/inline/${id}.mobile.svg`;
      assert.ok(existsSync(asset), `${lang}/${id}: missing generated mobile SVG`);
      assert.match(
        html,
        new RegExp(
          `<img class="diagram-mobile" src="${base}${lang}/shared/diagrams/inline/${id}\\.mobile\\.svg"`,
        ),
        `${lang}/${id}: mobile SVG is not selected by the session markup`,
      );
      assert.match(
        html,
        new RegExp(`<svg[^>]*class="diagram-desktop"`),
        `${lang}/${id}: desktop SVG should remain available`,
      );
    }
  }
});

test('mind maps emit palettes for both site themes', () => {
  const page = readFileSync('dist/es/sessions/PA-S002/index.html', 'utf8');
  assert.match(page, /data-theme-map="light"[\s\S]*studio-map-es\.svg/);
  assert.match(page, /data-theme-map="dark"[\s\S]*studio-map-es\.dark\.svg/);
  const light = 'dist/es/shared/diagrams/PA-S002/studio-map-es.svg';
  const dark = 'dist/es/shared/diagrams/PA-S002/studio-map-es.dark.svg';
  assert.ok(existsSync(light));
  assert.ok(existsSync(dark));
  assert.match(readFileSync(light, 'utf8'), /#my-svg\.mindmapDiagram\{background:#ffffff\}/);
  assert.match(readFileSync(dark, 'utf8'), /#my-svg\.mindmapDiagram\{background:#10141c\}/);
  const paS001Map = readFileSync('dist/es/shared/diagrams/PA-S001/canonical-map-es.svg', 'utf8');
  assert.match(paS001Map, /class="mindmap-legend" role="group"/);
  assert.match(paS001Map, />Fundamentos</);
  assert.match(paS001Map, />Plataforma y producto</);
  assert.match(paS001Map, /\[class\*="section-edge-"\]\{[^}]*stroke-dasharray:4 5!important/);
  assert.match(paS001Map, /\.mindmap-legend > rect\{fill:#f0f4f8!important/);
});

test('categorized Mermaid diagrams expose a visible color legend and directional arrow styling', () => {
  const diagram = readFileSync(
    'dist/es/shared/diagrams/PA-S001/architecture-quality-relation-es.svg',
    'utf8',
  );
  assert.match(
    diagram,
    /class="diagram-legend" role="group" aria-label="Leyenda de categorías y relaciones"/,
  );
  assert.match(diagram, />Contexto</);
  assert.match(diagram, />Decisión</);
  assert.match(diagram, />Evidencia</);
  assert.match(diagram, /<desc[^>]*>[\s\S]*Leyenda de colores: Contexto, Decisión, Evidencia\./);
  assert.match(diagram, /\.edgePath \.path[^}]*stroke:#8395a9!important/);
  assert.match(diagram, /marker path[^}]*fill:#8395a9!important/);
});

test('shared diagram, simulator, and architecture explorer styling is normalized', () => {
  const script = readFileSync('site/shared/assets/session-ui.js', 'utf8');
  const styles = readFileSync('site/shared/assets/session-ui.css', 'utf8');
  assert.match(script, /markerWidth', '14'/);
  assert.match(script, /nodeLabel = 'true'/);
  assert.match(script, /diagram-legend/);
  assert.match(styles, /\.diagram-shape-node\[data-tone='blue'\]/);
  assert.match(styles, /\.diagram-shape-node\[data-tone='coral'\]/);
  assert.match(styles, /text\[data-node-label='true'\]\[data-tone='blue'\]/);
  assert.match(styles, /text\[data-message-label='true'\]\s*\{[^}]*font-size: 10px/);
  assert.match(styles, /\.diagram-arrow\s*\{[^}]*stroke-dasharray: 4 5/);
  assert.match(styles, /\.session-source \.diagram-legend\s*\{[^}]*background: transparent/);
  assert.match(
    styles,
    /figure\[data-diagram\]\s*> details\s*\{[^}]*border: 1px solid var\(--line\)/,
  );
  assert.match(styles, /figure\[data-diagram\]\s*> details\s*\{[^}]*background: var\(--surface\)/);
  assert.match(styles, /\.widget\[data-widget='simulator'\]/);
  assert.match(styles, /widget\[data-widget='simulator'\] select\s*\{/);
  assert.match(styles, /widget\[data-widget='simulator'\] \[aria-live='polite'\]/);
  assert.match(script, /querySelectorAll\('\[data-widget="architecture-explorer"\]'\)/);
  assert.match(styles, /\.widget\[data-widget='architecture-explorer'\]/);
  assert.match(styles, /\.session-map-node\.is-selected/);
  assert.match(styles, /#global-architecture-svg\s+\.architecture-explorer-edge/);
  assert.match(styles, /ul:not\(\.success-study-list\)[\s\S]*?:not\(\.session-map-legend\)/);
  assert.match(script, /querySelectorAll\('\[data-widget="decision-matrix"\]'\)/);
  assert.match(styles, /\.widget\.session-decision-matrix/);
  assert.match(styles, /table\.decision-matrix-table/);
});
