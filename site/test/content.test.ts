import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve, dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadPage, assertPair, validatePage, assertSessionHtmlPair } from '../tooling/content.ts';
import {
  assertCanonicalPair,
  renderCanonical,
  studyIds,
  CONCEPT_IDS,
  TOPIC_IDS,
  EXERCISE_IDS,
  CHECK_IDS,
  SUCCESS_IDS,
} from '../tooling/canonical.ts';
import { renderPage, home, sessionsIndex, projectsIndex } from '../tooling/render.ts';
import { diagramMetadata } from '../tooling/diagrams.ts';
import { searchIndex } from '../tooling/search.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const source = (lang: 'es' | 'en') =>
  readFileSync(resolve(root, `site/content/canonical/PA-S001-theory-${lang}.md`), 'utf8');
const sourceHtml = (lang: 'es' | 'en') =>
  readFileSync(resolve(root, `site/content/canonical/PA-S001-session-${lang}.html`), 'utf8');
const siteCss =
  readFileSync(resolve(root, 'site/tooling/site.css'), 'utf8') +
  readFileSync(resolve(root, 'site/shared/assets/session-ui.css'), 'utf8');
const pages = {
  es: loadPage(resolve(root, 'site/es/sessions/PA-S001/page.json')),
  en: loadPage(resolve(root, 'site/en/sessions/PA-S001/page.json')),
};

test('canonical files retain learner supplied bytes and hashes', () => {
  assert.doesNotThrow(() => assertCanonicalPair(source('es'), source('en')));
  assert.throws(
    () => assertCanonicalPair(source('es').replace('Ingeniería', 'Ingenieria'), source('en')),
    /MISSING_CANONICAL_THEORY_PAYLOAD/,
  );
});

test('replacement PA-S001 HTML has bilingual structural parity and reversible success checks', () => {
  assert.doesNotThrow(() => assertSessionHtmlPair(sourceHtml('es'), sourceHtml('en')));
  for (const lang of ['es', 'en'] as const) {
    const html = sourceHtml(lang);
    const rendered = renderPage(pages[lang], '/', 'sessions/PA-S001', undefined, html);
    const toc = html.match(/<nav aria-labelledby="toc-heading">[\s\S]*?<\/nav>/)?.[0] ?? '';
    const success =
      html.match(/<section\b(?=[^>]*\bid="success-criteria")[^>]*>[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(
      rendered,
      /<dialog class="desktop-nav-dialog" id="desktop-navigation-dialog" aria-label="(?:Navegación del programa|Program navigation)" data-sidebar-dialog open><aside class="site-sidebar">[\s\S]*?id="desktop-curriculum"/,
    );
    assert.match(
      rendered,
      /<button class="desktop-nav-toggle" type="button" aria-controls="desktop-navigation-dialog" aria-expanded="false" aria-label="(?:Abrir navegación|Open navigation)"[\s\S]*?data-sidebar-toggle hidden>/,
    );
    assert.match(
      rendered,
      /data-sidebar-close aria-label="(?:Cerrar navegación|Close navigation)"/,
    );
    const mobileNavStart = rendered.indexOf('<details class="mobile-global">');
    const mobileSummaryStart = rendered.indexOf('<summary', mobileNavStart);
    const mobileSummaryEnd =
      rendered.indexOf('</summary>', mobileSummaryStart) + '</summary>'.length;
    const headerStart = rendered.indexOf('<header class="site-header">');
    const brandStart = rendered.indexOf('<a class="brand"', headerStart);
    assert.ok(headerStart >= 0 && headerStart < mobileNavStart && mobileNavStart < brandStart);
    assert.match(
      rendered.slice(mobileSummaryStart, mobileSummaryEnd),
      /^<summary aria-label="(?:Navegación|Navigation)"><svg class="icon icon-menu"[\s\S]*<\/svg><\/summary>$/,
    );
    assert.equal((rendered.match(/class="toc-fab"/g) ?? []).length, 1);
    assert.match(rendered, /class="toc-fab" href="#table-of-contents"/);
    assert.match(
      rendered,
      new RegExp(
        `aria-label="${lang === 'es' ? 'Volver a la tabla de contenido' : 'Back to the table of contents'}"`,
      ),
    );
    assert.match(toc, /<h2 id="toc-heading">(?:Tabla de contenido|Table of contents)<\/h2>/);
    assert.match(
      rendered,
      new RegExp(
        `<h2 id="concepts-heading" class="section-heading"><span class="sr-only">1\\. <\\/span><span class="section-number" aria-hidden="true">${lang === 'es' ? 'Sección' : 'Section'} 1<\\/span>`,
      ),
    );
    for (const id of ['concepts', 'main-topic', 'integration', 'theory-practice']) {
      assert.match(rendered, new RegExp(`<a href="#${id}"\\s*>`));
    }
    for (const [id, title] of [
      ['estimated-time', /Tiempo estimado de aprendizaje|Estimated learning time/],
      ['summary', /Síntesis en 30 segundos|Synthesis in 30 seconds/],
      ['objective', /Objetivo|Objective/],
      ['preview', /Vista previa del aprendizaje|Learning preview/],
    ] as const) {
      assert.match(html, new RegExp(`<div class="session-intro-component" id="${id}">`));
      assert.doesNotMatch(html, new RegExp(`<section\\b[^>]*\\bid="${id}"`));
      assert.match(toc, new RegExp(`<a href="#${id}">`));
      assert.match(html, new RegExp(`<h2 id="${id}-heading">(?:${title.source})</h2>`));
    }
    const preview = html.match(
      /<div class="session-intro-component" id="preview">([\s\S]*?)<section id="concepts"/,
    )?.[1];
    assert.ok(preview, `${lang} learning preview exists`);
    assert.equal((preview.match(/class="preview-entry-card"/g) ?? []).length, 3);
    assert.equal((preview.match(/<h3\b/g) ?? []).length, 3);
    assert.equal((preview.match(/<p\b/g) ?? []).length, 3);
    assert.doesNotMatch(html, /<section id="structure"/);
    assert.doesNotMatch(
      toc,
      /<a href="#(?:estimated-time|summary|objective|preview|concepts|main-topic|integration|theory-practice|real-world|production-example|global-studio|exercises|sources|work-resources|deliverables|checklist|success-criteria|bridge)">\s*\d+\./,
    );
    assert.match(
      toc,
      /<a href="#subtopic-1"\s*>\s*(?:Ingeniería de software|Software engineering)/,
    );
    assert.doesNotMatch(toc, />\s*6\.\d (?:Subtema|Subtopic) \d:/);
    assert.match(html, /<ol class="synthesis-plain">/);
    assert.match(
      html,
      /<section id="concepts"[\s\S]*?<div\s+data-concept[\s\S]*?<dd>[\s\S]*?<strong>Ejemplo:|Example:/,
    );
    assert.match(
      html,
      /<ol class="mechanism-steps">[\s\S]*?<span class="ordered-list-content"\s*>/,
    );
    assert.equal(
      (
        html.match(/<section\b[^>]*\bid="subtopic-[1-7]"[^>]*\bdata-section="subtopic-[1-7]"/gs) ??
        []
      ).length,
      7,
    );
    assert.equal(
      (success.match(/<input[^>]*type="checkbox"[^>]*data-study-check="success-l[1-5]"/g) ?? [])
        .length,
      5,
    );
    assert.match(html, /<section\b(?=[^>]*\bid="sources")(?=[^>]*\bdata-section="sources")[^>]*>/);
  }
  for (const lang of ['es', 'en'] as const) {
    const introEntries = searchIndex(
      lang,
      '/',
      [{ route: 'sessions/PA-S001', page: pages[lang] }],
      sourceHtml(lang),
    );
    for (const id of ['estimated-time', 'summary', 'objective', 'preview'])
      assert.ok(introEntries.some((entry) => entry.href === `/${lang}/sessions/PA-S001/#${id}`));
  }
  const rendered = renderPage(pages.en, '/', 'sessions/PA-S001', undefined, sourceHtml('en'));
  assert.match(rendered, /<link rel="stylesheet" href="\/assets\/site\.css">/);
  assert.match(rendered, /<link rel="stylesheet" href="\/assets\/session-ui\.css">/);
  assert.match(rendered, /<script defer src="\/assets\/session-ui\.js"><\/script>/);
  assert.match(rendered, /<a class="skip" href="#main-content">/);
  assert.match(rendered, /<main id="main-content">/);
  assert.match(rendered, /<body class="session-page pa-s001">/);
  assert.match(
    rendered,
    /<nav aria-labelledby="toc-heading"><h2 class="sr-only" id="toc-heading">/,
  );
  assert.match(rendered, /Staff → Principal/);
  assert.equal((rendered.match(/<h1\b/g) ?? []).length, 1);
  assert.match(rendered, /<span class="external-link-icon" aria-hidden="true">↗<\/span>/);
  assert.match(rendered, /<span class="sr-only">\(opens in a new tab\)<\/span>/);
  assert.match(rendered, /target="_blank" rel="noopener noreferrer"/);
  assert.ok(
    rendered.indexOf('<div class="page-intro">') <
      rendered.indexOf('<div class="layout"><details class="toc"'),
  );
  assert.ok(
    rendered.indexOf('<details class="toc"') <
      rendered.indexOf('<article class="canonical-theory session-source">'),
  );
  assert.doesNotMatch(rendered, /color-scheme: light dark; font-family: system-ui, sans-serif/);
});

test('PA-S001 concepts separate term and definition and collapse examples accessibly', () => {
  for (const lang of ['es', 'en'] as const) {
    const rendered = renderPage(pages[lang], '/', 'sessions/PA-S001', undefined, sourceHtml(lang));
    const concepts = [
      ...rendered.matchAll(/<div\b(?=[^<>]*\bdata-concept(?:\s|=|>))[^>]*>[\s\S]*?<\/div>/g),
    ].map(([concept]) => concept!);
    const sourceConceptCount = [
      ...sourceHtml(lang).matchAll(/<div\b(?=[^<>]*\bdata-concept(?:\s|=|>))[^>]*>/g),
    ].length;
    assert.equal(concepts.length, sourceConceptCount);
    for (const concept of concepts) {
      assert.match(
        concept,
        /<dt[^>]*>\s*<strong[^>]*>[^<]+<\/strong>\s*<\/dt>\s*<dd[^>]*>\s*<p>[^<]+<\/p>\s*<details class="concept-example-disclosure">/,
      );
      assert.match(concept, /<summary>(?:Ejemplo|Example)<\/summary>/);
      assert.doesNotMatch(concept, /<strong>(?:Ejemplo|Example):<\/strong>/);
      assert.doesNotMatch(concept, /<dt[^>]*>[\s\S]*?<strong[^>]*>[^<]*:<\/strong>/);
    }
  }
  assert.match(
    siteCss,
    /details\.concept-example-disclosure\s*\{[^}]*border:\s*1px solid var\(--line\);[^}]*background:\s*color-mix\(in srgb, var\(--soft\) 70%, var\(--surface\)\);/,
  );
  assert.match(
    siteCss,
    /details\.concept-example-disclosure > summary\s*\{[^}]*background: color-mix\(in srgb, var\(--accent\) 5%, var\(--surface\)\);[^}]*color: var\(--ink\);/,
  );
  assert.match(
    siteCss,
    /details\.concept-example-disclosure > summary::after\s*\{[^}]*width: 1\.2rem;[^}]*background-color: var\(--accent\);/,
  );
  assert.match(
    siteCss,
    /details\.concept-example-disclosure\[open\]\s*>\s*summary\s*\{[^}]*border-bottom: 1px solid var\(--line\);[^}]*background: transparent;/,
  );
  assert.match(
    siteCss,
    /details\.concept-example-disclosure\[open\]\s*>\s*summary::after\s*\{[^}]*transform: rotate\(180deg\);/,
  );
});

test('session UI assets are shared, theme-aware, and keyboard-accessible', () => {
  const sessionCss = readFileSync(resolve(root, 'site/shared/assets/session-ui.css'), 'utf8');
  const sessionJs = readFileSync(resolve(root, 'site/shared/assets/session-ui.js'), 'utf8');
  assert.match(sessionCss, /:focus-visible/);
  assert.match(sessionCss, /prefers-reduced-motion/);
  assert.match(sessionCss, /var\(--surface\)/);
  assert.ok(
    /\.session-page \.toc-fab\s*\{[^}]*right: max\(10px, env\(safe-area-inset-right\)\);[^}]*bottom: max\(10px, env\(safe-area-inset-bottom\)\);[^}]*width: 60px;[^}]*height: 60px;/.test(
      sessionCss,
    ),
    'the TOC FAB must be circular, 60px, and clear the device safe area',
  );
  assert.ok(
    /\.session-page \.toc-fab:focus-visible\s*\{[^}]*outline: 3px solid var\(--focus\);/.test(
      sessionCss,
    ),
    'the TOC FAB must have a visible keyboard focus indicator',
  );
  assert.match(
    sessionCss,
    /\.session-source \.widget\[data-widget='simulator'\]\s*\{[^}]*border-top:\s*3px solid var\(--accent\);[^}]*background:\s*var\(--surface\);/,
  );
  assert.match(
    sessionCss,
    /\.session-source\s*>\s*\.session-intro-component#objective\s*\{[^}]*border-inline-start:\s*3px solid var\(--accent\);[^}]*background:\s*linear-gradient\(/,
  );
  assert.match(
    sessionCss,
    /\.session-source\s*>\s*\.session-intro-component#objective\s*>\s*h2::after\s*\{[^}]*background:\s*var\(--accent\);/,
  );
  assert.match(sessionCss, /\.session-page \.session-source select,[\s\S]*appearance: none/);
  assert.match(sessionCss, /right 28px center,[\s\S]*right 20px center/);
  assert.match(sessionCss, /@media \(forced-colors: active\)/);
  assert.match(sessionCss, /\.session-page \.desktop-nav-dialog\s*\{[^}]*position: fixed;/);
  assert.match(
    sessionCss,
    /\.session-page \.desktop-nav-dialog::backdrop\s*\{[^}]*backdrop-filter: blur\(3px\);/,
  );
  assert.match(
    sessionCss,
    /\.session-page \.desktop-nav-dialog \.curriculum\s*\{[^}]*overflow-y: auto;[^}]*scrollbar-width: thin;/,
  );
  assert.match(
    sessionCss,
    /\.session-source \.widget\[data-widget='architecture-explorer'\] \.widget-panel\s*\{[^}]*border:\s*0;[^}]*background:\s*transparent;[^}]*padding-inline:\s*0;/,
  );
  assert.match(
    siteCss,
    /\.mobile-global\s*>\s*summary\s*\{[^}]*width:\s*2\.75rem;[^}]*justify-content:\s*center;/,
  );
  assert.match(
    siteCss,
    /\.mobile-global\s*>\s*summary\s*>\s*\.icon-menu\s*\{[^}]*width:\s*1\.35rem;[^}]*height:\s*1\.35rem;/,
  );
  assert.match(
    sessionCss,
    /details:not\(\.nav-group\):not\(\.mobile-global\)[\s\S]*width: 1\.2rem;[\s\S]*height: 1\.2rem;/,
  );
  assert.match(
    sessionCss,
    /details:not\(\.nav-group\):not\(\.mobile-global\)\[open\][\s\S]*transform: rotate\(180deg\);/,
  );
  assert.match(
    sessionCss,
    /details:is\(\.qa-disclosure, \.mechanism-retrieval\)\s*> summary\s*\{[^}]*display: block;[^}]*position: relative;/,
  );
  assert.match(
    sessionCss,
    /details:is\(\.qa-disclosure, \.mechanism-retrieval\)\s*> summary::after\s*\{[^}]*position: absolute;[^}]*inset-inline-end:/,
  );
  assert.match(
    sessionCss,
    /ul\.resource-link-list\s*>\s*li\s*>\s*a\s*\{[^}]*display: block;[^}]*width: fit-content;/,
  );
  assert.match(sessionJs, /aria-expanded/);
  assert.match(sessionJs, /aria-pressed/);
  assert.match(sessionJs, /ArrowLeft/);
  assert.match(sessionJs, /groupCategorizedControls/);
  assert.match(sessionJs, /groupCategorizedControls\(controls, buttons, localized, 'mind-map'\)/);
  assert.match(sessionJs, /kind === 'architecture' && buttons\.length > 3/);
  assert.match(sessionJs, /architecture-explorer-selector/);
  assert.match(sessionJs, /Architecture component|Componente de arquitectura/);
  assert.match(sessionJs, /setAttribute\('role', 'tablist'\)/);
  assert.match(sessionJs, /setAttribute\('role', 'tabpanel'\)/);
  assert.match(sessionJs, /event\.key === 'ArrowRight'/);
  assert.match(sessionJs, /event\.key === 'Home'/);
  assert.match(sessionJs, /decision-matrix-range-pair/);
  assert.match(sessionJs, /dispatchEvent\(new globalThis\.Event\('input', \{ bubbles: true \}\)\)/);
  assert.match(sessionJs, /decision-matrix-progress-toggle/);
  assert.match(sessionJs, /decision-matrix-manual-note/);
  assert.match(sessionJs, /const highlightTypescript/);
  assert.match(sessionJs, /const highlightMermaid/);
  assert.match(sessionJs, /code\.dataset\.syntaxEnhanced = 'typescript'/);
  assert.match(sessionJs, /code\.dataset\.syntaxEnhanced = 'mermaid'/);
  assert.match(sessionCss, /\.code-token-type\s*\{/);
  assert.match(sessionCss, /\.code-token-property\s*\{/);
  assert.match(sessionCss, /\.code-token-number\s*\{/);
  assert.match(sessionCss, /\.code-token-function\s*\{/);
  assert.match(sessionCss, /\.code-token-operator\s*\{/);
  assert.match(sessionCss, /\.code-token-entity\s*\{/);
  assert.match(sessionCss, /\.node-category-panel\[hidden\]\s*\{\s*display: none;/);
  assert.match(
    sessionCss,
    /\.session-source \.session-map-graph\s*\{[^}]*max-height: min\(55vh, 30rem\);/,
  );
  assert.match(
    sessionCss,
    /\.session-source \.session-map-visual\s*\{[^}]*overflow-x: auto;[^}]*overflow-y: hidden;/,
  );
  assert.match(
    sessionCss,
    /@media\s*\(max-width:\s*42rem\)[\s\S]*?\.node-grid\.session-interactive-map\s*>\s*\.session-map-visual\s*>\s*\.session-map-graph\s*\{\s*display:\s*none;/,
  );
  assert.match(
    sessionCss,
    /\.node-grid\.session-interactive-map\s*\.node-category-panel\s*\{\s*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\);/,
  );
  assert.match(
    sessionCss,
    /\.session-source :is\(\.session-map-selector, \.mind-map-controls\)\.categorized-node-picker\s*\{\s*display: block;/,
  );
});

test('tables distinguish columns without taking the site link color', () => {
  const sessionCss = readFileSync(resolve(root, 'site/shared/assets/session-ui.css'), 'utf8');
  for (const [index, tone] of [
    [1, '#ffb454'],
    [2, '#aad94c'],
    [3, '#c4a4ff'],
    [4, '#55c99a'],
    [5, '#f28b73'],
    [6, '#e6c06f'],
    [7, '#e6a6d7'],
  ]) {
    assert.match(sessionCss, new RegExp(`--table-col-${index}: ${tone};`));
    assert.match(
      sessionCss,
      new RegExp(`table > :is\\(thead, tbody\\) > tr > :nth-child\\(${index}\\)`),
    );
  }
  assert.match(sessionCss, /\.session-source table :is\(th, td\) a\s*\{\s*color: var\(--accent\);/);
  assert.match(
    sessionCss,
    /table\.decision-matrix-table thead th\s*\{\s*background: var\(--surface\);/,
  );
});

test('resource descriptions omit their colon and all external link icons have 8px left padding', () => {
  const sessionCss = readFileSync(resolve(root, 'site/shared/assets/session-ui.css'), 'utf8');
  for (const lang of ['es', 'en'] as const) {
    const rendered = renderPage(pages[lang], '/', 'sessions/PA-S001', undefined, sourceHtml(lang));
    const resourceLists = [
      ...rendered.matchAll(
        /<ul\b[^>]*class="[^"]*\bresource-link-list\b[^"]*"[^>]*>[\s\S]*?<\/ul>/g,
      ),
    ].map(([list]) => list!);
    assert.ok(resourceLists.length > 0);
    for (const list of resourceLists) {
      assert.doesNotMatch(list, /<\/a\s*>\s*:/);
      assert.doesNotMatch(list, /<\/a\s*>\s+[a-záéíóúñü]/);
    }
  }
  assert.match(
    sessionCss,
    /\.session-page \.external-link-icon\s*\{[^}]*padding-inline-start: 8px;/,
  );
  assert.match(
    readFileSync(resolve(root, 'site/tooling/site.css'), 'utf8'),
    /main a\[href\^='http'\]::after\s*\{[^}]*padding-left: 8px;/,
  );
});

test('select labels in widgets keep their text full-width above the control', () => {
  assert.match(
    siteCss,
    /\.session-source \.widget label:has\(> select\)\s*\{[^}]*display: grid;[^}]*grid-template-columns: minmax\(0, 1fr\);[^}]*width: 100%;/,
  );
  assert.match(
    siteCss,
    /\.session-source \.widget label:has\(> select\) > select\s*\{[^}]*display: block;[^}]*width: 100%;[^}]*min-width: 0;/,
  );
});

test('PA-S001 numbered lists keep mixed inline prose in one wrapping column', () => {
  assert.match(
    siteCss,
    /ol:not\(\.synthesis-plain\):not\(\.mechanism-steps\)[\s\S]*?>\s+li\s*\{[^}]*display:\s*block;/,
  );
  assert.match(
    siteCss,
    /ol:not\(\.synthesis-plain\):not\(\.mechanism-steps\)[\s\S]*?>\s+li::before\s*\{[^}]*position:\s*absolute;/,
  );
  assert.match(
    siteCss,
    /ol\.mechanism-steps[^}]*grid-template-columns: max-content minmax\(0, 1fr\);[^}]*column-gap: 1rem;/s,
  );
});

test('PA-S001 structural sections stay unboxed and every synthesis uses card rows', () => {
  assert.match(
    siteCss,
    /\.session-source\s+section:not\(\.widget\)\s*\{\s*padding:\s*0;\s*border:\s*0;\s*border-radius:\s*0;\s*background:\s*transparent;\s*box-shadow:\s*none;/,
  );
  assert.match(siteCss, /\.session-source\s+ol\.synthesis-plain\s*\{\s*display:\s*grid;/);
  assert.match(
    siteCss,
    /\.session-source\s+ol\.synthesis-plain\s*>\s*li\s*\{\s*display:\s*block;[^}]*border:\s*1px solid var\(--line\);[^}]*background:\s*var\(--surface\);/,
  );
  for (const lang of ['es', 'en'] as const) {
    assert.match(renderCanonical(source(lang), lang, '/').html, /<ul class="resource-link-list">/);
  }
  assert.match(
    siteCss,
    /ul:not\(\.success-study-list\):not\(\.studio-coverage\):not\(\.references\):not\(\.resource-link-list\)/,
  );
  assert.match(
    siteCss,
    /ul\.resource-link-list\s*>\s*li\s*\{[^}]*padding:\s*0;[^}]*border:\s*0;[^}]*background:\s*transparent;/,
  );
  assert.match(siteCss, /ul\.resource-link-list\s*>\s*li\s*>\s*strong\s*\{\s*display:\s*block;/);
  assert.match(
    siteCss,
    /ul\.resource-link-list\s+a\s*\{\s*color:\s*var\(--accent\);\s*text-decoration:\s*underline;/,
  );
});

test('PA-S001 checklist criteria use reversible checkbox cards', () => {
  assert.match(
    siteCss,
    /\.session-source\s+:is\(#study-checklist, #success-study-checklist, \.success-study-list\)\s+label\s*\{[^}]*padding:\s*1\.25rem 1\.5rem;[^}]*border:\s*1px solid var\(--line\);[^}]*background:\s*var\(--surface\);/,
  );
  assert.match(
    siteCss,
    /\.session-source\s+:is\(#study-checklist, #success-study-checklist, \.success-study-list\)\s+label\s*>\s*input\[type='checkbox'\]\s*\{[^}]*accent-color:\s*var\(--accent\);/,
  );
});

test('PA-S001 paragraph and list Q&A use native accessible disclosures', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = sourceHtml(lang);
    const rendered = renderPage(pages[lang], '/', 'sessions/PA-S001', undefined, html);
    assert.equal((html.match(/<details class="qa-disclosure">/g) ?? []).length, 44);
    assert.ok((rendered.match(/<details\b[^>]*class="[^"]*\bqa-disclosure\b/g) ?? []).length > 44);
    assert.match(html, /<summary>\s*<span class="sr-only">(?:Pregunta|Question):<\/span>/);
    assert.match(html, /<p\b[^>]*>\s*<span class="sr-only">(?:Respuesta|Answer|Response):<\/span>/);
    assert.match(html, /<li>\s*<details class="qa-disclosure">/);
    assert.match(
      rendered,
      lang === 'es'
        ? /<details class="qa-disclosure"><summary><span class="sr-only">Pregunta:<\/span>\s*Un equipo cambia internamente el adaptador de IA[\s\S]*?<\/summary><p><span class="sr-only">Respuesta razonada:<\/span>\s*no\./
        : /<details class="qa-disclosure"><summary><span class="sr-only">Question:<\/span>\s*A team changes the AI[\s\S]*?adapter internally[\s\S]*?<\/summary><p><span class="sr-only">Reasoned response:<\/span>\s*no\./,
    );
    assert.match(
      rendered,
      lang === 'es'
        ? /<li>\s*<details class="qa-disclosure"><summary><strong>Clasificación\.<\/strong>[\s\S]*?¿Arquitectura o diseño detallado\?<\/summary><p><span class="sr-only">Respuesta:<\/span>\s*normalmente diseño detallado/
        : /<li>\s*<details class="qa-disclosure"><summary><strong>Classification\.<\/strong>[\s\S]*?Architecture or detailed design\?<\/summary><p><span class="sr-only">Answer:<\/span>\s*normally detailed design/,
    );
  }
  assert.match(
    siteCss,
    /details\.qa-disclosure[^{}]*\{[^}]*border-inline-start:\s*3px solid var\(--accent\);[^}]*background:\s*var\(--surface\);/,
  );
  assert.match(
    siteCss,
    /details:not\(\.nav-group\):not\(\.mobile-global\)\s*>\s*summary::after\s*\{[^}]*width:\s*1\.2rem;[^}]*height:\s*1\.2rem;[^}]*background-color:\s*var\(--accent\);/,
  );
  assert.match(
    siteCss,
    /details:not\(\.nav-group\):not\(\.mobile-global\)\[open\]\s*>\s*summary::after\s*\{[^}]*transform:\s*rotate\(180deg\);/,
  );
});

test('seventeen concepts, main topic, six subtopics, and study IDs have ES/EN parity', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = renderCanonical(source(lang), lang, '/').html;
    const ids = [...CONCEPT_IDS, ...TOPIC_IDS];
    for (const id of ids)
      assert.equal(
        (html.match(new RegExp(`<h[2-4] id="${id}"`, 'g')) ?? []).length,
        1,
        `${lang} ${id}`,
      );
    const conceptPositions = CONCEPT_IDS.map((id) => html.indexOf(`id="${id}"`));
    assert.ok(
      conceptPositions.every((value, index) => index === 0 || value > conceptPositions[index - 1]!),
    );
    assert.ok(html.indexOf('id="scope.ecosystem"') < html.indexOf('id="sub.scope-layers"'));
    assert.deepEqual(studyIds(source(lang)), { exercises: EXERCISE_IDS, mastery: CHECK_IDS });
  }
});

test('reading layers use semantic labels while editorial metadata stays out of the rendered page', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = renderCanonical(source(lang), lang, '/').html;
    const phase = lang === 'es' ? 'Fase' : 'Phase';
    const concept = lang === 'es' ? 'Concepto' : 'Concept';
    assert.doesNotMatch(html, /class="chapter-title"/);
    assert.doesNotMatch(html, new RegExp(`${phase}:`));
    assert.match(
      html,
      /<div class="concept-heading" data-concept-id="scope\.system"><p class="concept-eyebrow">/,
    );
    assert.match(
      html,
      /<div class="concept-heading" data-concept-id="sub\.software-vs-architecture"><p class="concept-eyebrow">/,
    );
    assert.ok(html.includes(`<h4>${concept}</h4>`));
    assert.ok(html.includes('class="concept-disclosure"'));
    assert.ok(!html.includes('Level 1') && !html.includes('Nivel 1'));
  }
});

test('paragraph lead-ins become headings without redundant definition labels', () => {
  for (const [lang, titles] of [
    ['es', ['Ingeniería de software', 'Arquitectura de software', 'Aplicación']],
    ['en', ['Software engineering', 'Software architecture', 'Application']],
  ] as const) {
    const html = renderCanonical(source(lang), lang, '/').html;
    for (const title of titles)
      assert.ok(
        html.includes(`class="instructional-heading">${title}</h4><p>`),
        `${lang}: ${title}`,
      );
    assert.doesNotMatch(html, /<strong>[^<]+:\s*(?:definición|definition)\.\s*<\/strong>/i);
  }
});

function plainMarkdown(line: string): string {
  if (/^\*\*(?:Nivel|Level) [123] —/.test(line))
    line = line.replace(/^\*\*(?:Nivel|Level) [123] — [^*]+\.\*\*\s*/, '');
  else line = line.replace(/^\*\*([^*]+?)(?::\s*(?:definición|definition))?\.\*\* /i, '**$1** ');
  const code: string[] = [];
  let value = line.replace(/`([^`]+)`/g, (_, content: string) => {
    code.push(content);
    return `@@CODE${code.length - 1}@@`;
  });
  value = value
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1')
    .replace(/\[([^\]:]+):: ([^\]]+)\]/g, '$1 — $2')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/@@CODE(\d+)@@/g, (_, index: string) => code[Number(index)]!);
  return value.replace(/\s+/g, ' ').trim();
}
function visibleHtml(html: string): string {
  return html
    .replace(/<!-- STUDIO START -->[\s\S]*?<!-- STUDIO END -->/g, ' ')
    .replace(/<\/(?:p|h[1-6]|li|summary|tr|div|aside)>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
test('every substantive authored paragraph and instruction appears in rendered order', () => {
  for (const lang of ['es', 'en'] as const) {
    const visible = visibleHtml(renderCanonical(source(lang), lang, '/').html);
    let cursor = 0,
      count = 0,
      inCode = false;
    for (const raw of source(lang).split('\n')) {
      if (raw.startsWith('```')) {
        inCode = !inCode;
        continue;
      }
      if (/^\*\*(?:Recuperación|Retrieval):\*\*/.test(raw)) {
        const match = raw.match(
          /^\*\*(?:Recuperación|Retrieval):\*\* (.+?) \*\*(?:Respuesta|Answer):\*\* (.+)$/,
        );
        assert.ok(match, `${lang}: retrieval source syntax`);
        const question = plainMarkdown(match![1]!);
        const answer = plainMarkdown(match![2]!);
        const questionAt = visible.indexOf(question, cursor);
        const answerAt = visible.indexOf(answer, questionAt + question.length);
        assert.ok(
          questionAt >= cursor && answerAt > questionAt,
          `${lang}: retrieval answer missing or out of order`,
        );
        cursor = answerAt + answer.length;
        count++;
        continue;
      }
      if (
        inCode ||
        !raw ||
        raw.startsWith('#') ||
        raw.startsWith('|') ||
        raw.startsWith('- ') ||
        raw.startsWith('> ') ||
        /^\d+\. /.test(raw) ||
        /^\*\*(?:Fase|Phase):/.test(raw)
      )
        continue;
      const line = plainMarkdown(raw);
      if (line.length < 60) continue;
      const next = visible.indexOf(line, cursor);
      assert.ok(next >= cursor, `${lang} missing or out of order: ${line.slice(0, 100)}`);
      cursor = next + line.length;
      count++;
    }
    assert.ok(count >= 65, `${lang} paragraph comparator covered only ${count} lines`);
  }
});

test('17 concept-specific mechanisms expose separated retrieval and contextual coupling SVG', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = renderCanonical(source(lang), lang, '/').html;
    assert.equal((html.match(/class="mechanism-retrieval"/g) ?? []).length, 24); // 17 concepts + 7 topic/subtopic retrievals
    assert.ok(html.includes(`/shared/diagrams/PA-S001/coupling-contract-${lang}.svg`));
    assert.ok(diagramMetadata([pages[lang]]).has(`PA-S001/coupling-contract-${lang}.mmd`));
    assert.equal(
      (source(lang).match(/\*\*(?:Mecanismo resuelto|Worked mechanism)\.\*\*/g) ?? []).length,
      17,
    );
  }
});

test('all four exercises and eight checkboxes are reversible controls with static fallback', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = renderCanonical(source(lang), lang, '/').html;
    for (const id of [...EXERCISE_IDS, ...CHECK_IDS, ...SUCCESS_IDS])
      assert.ok(html.includes(`data-study-id="${id}"`));
    assert.equal(
      (html.match(/data-study-id="PA-S001\.(?:exercise|check)\.[a-z-]+"/g) ?? []).length,
      12,
    );
    assert.equal((html.match(/<input type="checkbox"/g) ?? []).length, 20);
    assert.equal((html.match(/data-study-id="PA-S001\.success\.[a-z-]+"/g) ?? []).length, 8);
    assert.ok(!/<input[^>]*\bdisabled\b/.test(html));
    assert.ok(html.includes('class="flashcard-answer"'));
    assert.ok(!/<script(?! type="application\/json")/.test(html));
  }
  const script = readFileSync(resolve(root, 'site/shared/assets/study.js'), 'utf8');
  assert.ok(script.includes('localStorage.setItem(key(id)'));
  assert.ok(!script.includes('data/mastery/'));
});

test('Studio exposes 24 source-linked cards and responsive SVG mind map', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = renderCanonical(source(lang), lang, '/').html;
    assert.equal((html.match(/data-flash-id="/g) ?? []).length, 24);
    assert.deepEqual(
      [...html.matchAll(/data-flash-id="([^"]+)"/g)].map((x) => x[1]),
      [...CONCEPT_IDS, ...TOPIC_IDS],
    );
    assert.ok(html.includes(`/${lang}/shared/diagrams/PA-S001/canonical-map-${lang}.svg`));
    assert.ok(html.includes(`/${lang}/shared/diagrams/PA-S001/theory-${lang}-01.svg`));
    assert.ok(html.includes('data-lab-key="sub.ai-product"'));
    assert.ok(
      html.includes('data-flash-prev') &&
        html.includes('data-flash-next') &&
        html.includes('data-flash-flip'),
    );
    assert.ok(
      html.includes('id="visual-panel-mind-map"') && html.includes('id="visual-panel-flashcards"'),
    );
  }
  for (const lang of ['es', 'en'] as const) {
    const diagram = readFileSync(
      resolve(root, `site/shared/diagrams/PA-S001/canonical-map-${lang}.mmd`),
      'utf8',
    );
    for (const id of [...CONCEPT_IDS, ...TOPIC_IDS]) assert.ok(diagram.includes(id));
  }
  const data = diagramMetadata([pages.es, pages.en]);
  assert.ok(data.get('PA-S001/canonical-map.mmd')?.title);
});

test('metadata, routes, citations, dashboard, and search retain product boundaries', () => {
  assert.doesNotThrow(() => assertPair(pages.es, pages.en));
  assert.throws(() => validatePage({ ...pages.es, status: 'Completed' }));
  for (const lang of ['es', 'en'] as const) {
    const html = renderPage(pages[lang], '/', 'sessions/PA-S001', source(lang));
    assert.ok(html.includes('Principal Accelerator Learning Path'));
    assert.ok(html.includes('id="source-R8"') && html.includes('href="#source-R8"'));
    assert.ok(html.includes('id="main.p0-boundaries"'));
    assert.ok(html.includes('data-theme-toggle'));
    assert.ok(html.includes('<noscript>'));
    assert.ok(sessionsIndex(lang, '/').includes('PA-S001'));
    assert.ok(projectsIndex(lang, '/').includes('projects/portfolio/'));
    const dashboard = home(lang, '/', pages[lang], 'Not started', 'not-assessed', 'Not started');
    for (const id of [
      'study',
      'roadmap',
      'mastery',
      'artifacts',
      'revisit',
      'projects',
      'activity',
    ])
      assert.ok(dashboard.includes(`id="${id}"`));
    assert.ok(dashboard.includes('max="4"') && dashboard.includes('max="8"'));
    assert.ok(
      searchIndex(lang, '/', [{ route: 'sessions/PA-S001', page: pages[lang] }], source(lang)).some(
        (entry) => entry.href === `/${lang}/sessions/PA-S001/#design.boundary`,
      ),
    );
  }
});

test('four bilingual reference experiences render with real controls and fallback', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = renderCanonical(source(lang), lang, '/').html;
    for (const kind of ['conceptual', 'structural', 'causal', 'decisional'])
      assert.match(html, new RegExp('data-explorer="' + kind + '"'));
    assert.equal((html.match(/class="reference-explorer"/g) ?? []).length, 4);
    assert.equal((html.match(/class="reference-cases"/g) ?? []).length, 4);
    assert.ok(html.includes('value="platform"') && html.includes('data-graph'));
  }
  const script = readFileSync(resolve(root, 'site/shared/assets/concept-explorers.js'), 'utf8');
  assert.ok(script.includes('addEventListener'));
  assert.ok(script.includes('data-explorer-output'));
});

test('stage 2 bilingual lab specifications cover all four instructional knowledge types', () => {
  const langs = ['es', 'en'] as const;
  const expected = [
    ['sub.scope-layers', 'scope'],
    ['sub.boundary-dependencies', 'dependency'],
    ['sub.quality-constraints', 'quality'],
    ['sub.ai-product', 'ai'],
  ];
  const stored = langs.map(
    (lang) =>
      JSON.parse(
        readFileSync(resolve(root, `site/content/learning-labs/PA-S001.${lang}.json`), 'utf8'),
      ) as {
        session: string;
        lang: string;
        labs: Array<{
          id: string;
          kind: string;
          concepts: string[];
          sources: string[];
          title: string;
          objective: string;
          intro: string;
          assumption: string;
          controls: Array<{ id: string; label: string; options: string[][] }>;
          outcomes: Array<{
            id: string;
            title: string;
            cause: string;
            mechanism: string;
            effect: string;
            affected?: string[];
          }>;
        }>;
      },
  );
  for (let index = 0; index < stored.length; index++) {
    const spec = stored[index]!;
    assert.equal(spec.session, 'PA-S001');
    assert.equal(spec.lang, langs[index]);
    assert.deepEqual(
      spec.labs.map((l) => [l.id, l.kind]),
      expected,
    );
    for (const lab of spec.labs) {
      for (const property of ['title', 'objective', 'intro', 'assumption'] as const)
        assert.ok(
          lab[property].length > (property === 'title' ? 8 : 35),
          `${spec.lang} ${lab.id}: ${property}`,
        );
      assert.ok(lab.sources.length > 0 && lab.concepts.length > 0);
      assert.ok(lab.controls.length > 0 && lab.outcomes.length > 1);
      for (const control of lab.controls) {
        assert.ok(control.label.length > 0);
        assert.ok(control.options.length >= 2);
        assert.equal(new Set(control.options.map((o) => o[0])).size, control.options.length);
      }
      for (const outcome of lab.outcomes) {
        assert.ok(
          outcome.cause.length > 0 && outcome.mechanism.length > 0 && outcome.effect.length > 0,
        );
      }
      assert.equal(new Set(lab.outcomes.map((o) => o.id)).size, lab.outcomes.length);
      assert.ok(
        lab.concepts.some((id) => CONCEPT_IDS.includes(id as (typeof CONCEPT_IDS)[number])),
      );
    }
  }
  for (let i = 0; i < expected.length; i++) {
    const es = stored[0]!.labs[i]!,
      en = stored[1]!.labs[i]!;
    assert.deepEqual(
      es.controls.map((c) => [c.id, c.options.map((o) => o[0])]),
      en.controls.map((c) => [c.id, c.options.map((o) => o[0])]),
    );
    assert.deepEqual(
      es.outcomes.map((o) => o.id),
      en.outcomes.map((o) => o.id),
    );
  }
});
test('stage 2 reference explorers are adjacent to canonical source concepts, not only in Studio', () => {
  const mapping = [
    ['scope.application', 'conceptual'],
    ['design.coupling', 'structural'],
    ['quality.attribute', 'causal'],
    ['aipe.ai-product', 'decisional'],
  ];
  for (const lang of ['es', 'en'] as const) {
    const html = renderCanonical(source(lang), lang, '/').html;
    for (const [id, kind] of mapping) {
      const start = html.indexOf(`id="${id}"`);
      const widget = html.indexOf(`data-explorer="${kind}"`, start);
      const next = html.indexOf('class="concept-heading"', start + 1);
      assert.ok(
        start >= 0 && widget > start && (next < 0 || widget < next),
        `${lang} ${kind} not adjacent to ${id}`,
      );
    }
  }
});

test('reference rules select the specified outcomes for every input combination', async () => {
  const modulePath = '../shared/assets/concept-explorers.js';
  const { selectOutcome } = await import(modulePath);
  for (const lang of ['es', 'en'] as const) {
    const { labs } = JSON.parse(
      readFileSync(resolve(root, `site/content/learning-labs/PA-S001.${lang}.json`), 'utf8'),
    );
    const expected: Record<string, Record<string, string>> = {
      scope: {
        application: 'application',
        system: 'system',
        platform: 'platform',
        ecosystem: 'ecosystem',
      },
      dependency: { schema: 'schema', portfolio: 'portfolio' },
      quality: {
        'static,on': 'static-on',
        'static,off': 'static-off',
        'client,on': 'client-on',
        'client,off': 'client-off',
      },
      ai: {
        'public,yes,yes': 'reviewable',
        'public,yes,no': 'unreviewed',
        'public,no,yes': 'unverified',
        'public,no,no': 'unverified',
        'private,yes,yes': 'blocked',
        'private,yes,no': 'blocked',
        'private,no,yes': 'blocked',
        'private,no,no': 'blocked',
      },
    };
    for (const lab of labs) {
      const combinations = lab.controls.reduce(
        (rows: Record<string, string>[], control: { id: string; options: string[][] }) =>
          rows.flatMap((row) =>
            control.options.map(([value]) => ({ ...row, [control.id]: value })),
          ),
        [{}],
      );
      for (const values of combinations) {
        const key = lab.controls.map((c: { id: string }) => values[c.id]).join(',');
        const outcome = selectOutcome(lab, values);
        assert.equal(outcome.id, expected[lab.kind]![key], `${lang} ${lab.kind} ${key}`);
        for (const field of ['cause', 'mechanism', 'effect']) assert.ok(outcome[field]);
      }
      const html = renderCanonical(source(lang), lang, '/').html;
      for (const id of lab.sources)
        assert.ok(html.includes(`id="source-${id}"`) && html.includes(`href="#source-${id}"`));
      for (const id of lab.concepts) assert.ok(html.includes(`id="${id}"`));
    }
    const structural = labs[1];
    assert.equal('graph' in structural, false);
    assert.ok(structural.outcomes.every((outcome: object) => !('affected' in outcome)));
    assert.deepEqual(
      structural.illustrations.map((item: { id: string; steps: string[] }) => [
        item.id,
        item.steps.length,
      ]),
      [
        ['schema', 4],
        ['portfolio', 2],
      ],
    );
    const html = renderCanonical(source(lang), lang, '/').html;
    for (const illustration of structural.illustrations) {
      assert.ok(html.includes(`data-illustration="${illustration.id}"`));
      for (const step of illustration.steps) assert.ok(html.includes(step));
    }
    assert.ok(html.includes('data-limitation'));
    assert.ok(!html.includes('data-possible-review'));
  }
});

test('texts that begin with quotation marks render as blockquotes without changing their wording', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = sourceHtml(lang);
    const rendered = renderPage(pages[lang], '/', 'sessions/PA-S001', undefined, html);
    const quote =
      lang === 'es'
        ? '«Es arquitectura porque usa microservicios»'
        : '“It is architecture because it uses microservices”';
    const explanation = lang === 'es' ? 'el estilo de despliegue no' : 'the deployment style';
    assert.match(
      rendered,
      new RegExp(`<li\\b[^>]*>\\s*<blockquote>\\s*<strong>${quote}:<\\/strong>`),
    );
    assert.match(
      siteCss,
      /> li:has\(> blockquote:only-child\)\s*\{[^}]*padding: 0;[^}]*border: 0;[^}]*background: transparent;/,
    );
    assert.ok(rendered.includes(explanation), `${lang}: preserve the explanation after the quote`);
    assert.ok(rendered.includes(`${quote}:</strong>`), `${lang}: preserve the quoted wording`);
  }
});

test('expanded canonical sources preserve stage 3 structure, success criteria, examples and references', () => {
  for (const lang of ['es', 'en'] as const) {
    const text = source(lang),
      html = renderCanonical(text, lang, '/').html;
    const stage3 = readFileSync(
      resolve(root, `site/content/proposals/PA-S001-stage3-theory-${lang}.md`),
      'utf8',
    );
    const headings = (value: string) =>
      [...value.matchAll(/^#{1,4} .+$/gm)].map((match) => match[0]);
    assert.deepEqual(headings(text), headings(stage3), `${lang}: no stage 3 section may disappear`);
    assert.equal(
      (text.match(/\*\*(?:Nivel 2 — Mecanismo|Level 2 — Mechanism)\.\*\*/g) ?? []).length,
      17,
    );
    const criteria = text
      .split(
        lang === 'es' ? '## Criterios de éxito de la sesión' : '## End-of-session success criteria',
      )[1]!
      .split('\n## ')[0]!;
    const items = [...criteria.matchAll(/^- \[ \] (.+)$/gm)].map((m) => m[1]!);
    assert.equal(items.length, 8);
    for (let i = 0; i < 8; i++)
      assert.ok(html.includes(`data-study-id="${SUCCESS_IDS[i]}"><span>${items[i]}`));
    for (const url of text.matchAll(/\]\((https?:\/\/[^)]+)\)/g))
      assert.ok(html.includes(`href="${url[1]}"`), `${lang} missing source ${url[1]}`);
    for (const block of text.matchAll(/```[^\n]*\n([\s\S]*?)\n```/g)) {
      const code = block[1]!
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      assert.ok(html.includes(code), `${lang} missing code/diagram`);
    }
  }
});

test('authored text diagrams render as localized SVGs with original text fallback', () => {
  for (const lang of ['es', 'en'] as const) {
    const text = source(lang),
      html = renderCanonical(text, lang, '/').html;
    for (let i = 1; i <= 7; i++) {
      const name = `ascii-${lang}-${String(i).padStart(2, '0')}`;
      assert.ok(html.includes(`/shared/diagrams/PA-S001/${name}.svg`));
      assert.ok(
        readFileSync(resolve(root, `site/shared/diagrams/PA-S001/${name}.mmd`), 'utf8').startsWith(
          'flowchart TB\n',
        ),
      );
    }
    assert.equal((html.match(/<code class="language-text">/g) ?? []).length, 7);
    assert.throws(
      () => renderCanonical(text.replace('```text\n', '```text\nChanged '), lang, '/'),
      /Unrecognized .* text diagram/,
    );
  }
});

test('authored list items and table cells survive rendering', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = visibleHtml(renderCanonical(source(lang), lang, '/').html);
    let inCode = false,
      checked = 0;
    for (const raw of source(lang).split('\n')) {
      if (raw.startsWith('```')) {
        inCode = !inCode;
        continue;
      }
      if (inCode) continue;
      const parts =
        raw.startsWith('|') && !/^\|[-| :]+\|$/.test(raw)
          ? raw.slice(1, -1).split('|')
          : raw.startsWith('- ')
            ? [raw.slice(2).replace(/^\[ \] /, '')]
            : /^\d+\. /.test(raw)
              ? [raw.replace(/^\d+\. /, '')]
              : [];
      for (const part of parts) {
        const value = plainMarkdown(part);
        if (value.length < 3) continue;
        assert.ok(html.includes(value), `${lang} omitted: ${value.slice(0, 100)}`);
        checked++;
      }
    }
    assert.ok(checked > 100, `${lang}: insufficient list/table coverage`);
  }
});
