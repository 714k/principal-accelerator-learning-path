import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { renderS002 } from '../tooling/pa-s002.ts';
import { sessionsIndex } from '../tooling/render.ts';

const chapter = (lang: 'es' | 'en') =>
  readFileSync(`site/content/canonical/PA-S002-theory-${lang}.md`, 'utf8');

test('PA-S002 Spanish canonical chapter retains the complete learner-supplied source', () => {
  const source = chapter('es');
  assert.equal(
    createHash('sha256').update(source).digest('hex'),
    '8336ddeeb0b39e306899c679bf639029921b3c5157a79a470b61391efc8ade1b',
  );
  for (const heading of [
    'Monorepos y estándares de ingeniería',
    'Subtema 7. Ownership y evolución de estándares',
    'Visual Learning Studio — desarrollo didáctico',
    'Práctica y cierre de PA-S002',
    'Fuentes y recursos para profundizar',
  ])
    assert.ok(source.includes(heading), heading);
  const diagrams = [...source.matchAll(/```mermaid\r?\n([\s\S]*?)```/g)].map((match) =>
    match[1]!.replace(/\r\n/g, '\n'),
  );
  const names = [
    'studio-map-es',
    'dependency-graph-es',
    'task-graph-es',
    'production-flow-es',
    'exercise-graph-es',
  ];
  assert.equal(diagrams.length, names.length);
  for (const [index, name] of names.entries())
    assert.equal(readFileSync(`site/shared/diagrams/PA-S002/${name}.mmd`, 'utf8'), diagrams[index]);

  const english = chapter('en');
  assert.equal(
    [...english.matchAll(/^#{1,5} /gm)].length,
    [...source.matchAll(/^#{1,5} /gm)].length,
    'English preserves the Spanish heading structure',
  );
  const englishDiagrams = [...english.matchAll(/```mermaid\r?\n([\s\S]*?)```/g)].map((match) =>
    match[1]!.replace(/\r\n/g, '\n'),
  );
  const englishNames = [
    'studio-map-en',
    'dependency-graph-en',
    'task-graph-en',
    'production-flow-en',
    'exercise-graph-en',
  ];
  assert.equal(englishDiagrams.length, englishNames.length);
  for (const [index, name] of englishNames.entries())
    assert.equal(
      readFileSync(`site/shared/diagrams/PA-S002/${name}.mmd`, 'utf8'),
      englishDiagrams[index],
    );
  for (const heading of [
    'Monorepos and engineering standards',
    'Subtopic 7. Ownership and evolution of standards',
    'Visual Learning Studio — educational development',
    'Practice and closure of PA-S002',
    'Sources and resources to delve deeper',
  ])
    assert.ok(english.includes(heading), heading);
});

test('PA-S002 is linked in bilingual navigation and renders complete Spanish content', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = renderS002(chapter(lang), lang, '/');
    assert.match(sessionsIndex(lang, '/'), new RegExp(`/${lang}/sessions/PA-S002/`));
    assert.match(html, new RegExp(`/${lang}/sessions/PA-S002/`));
    assert.match(html, /data-learning-studio/);
    assert.equal((html.match(/data-flash-id=/g) ?? []).length, 10);
    assert.doesNotMatch(html, /class="concept-id"/);
    if (lang === 'en') {
      assert.match(html, /Documented real-world case: Google/);
      assert.match(html, /class="instructional-outcome instructional-outcome--deliverable"/);
    }
    assert.doesNotMatch(html, /<details class="deep-dive">/);
    assert.equal((html.match(/class="toc-fab"/g) ?? []).length, 1);
    assert.match(html, new RegExp(`/${lang}/sessions/PA-S002/#concepts`));
  }
  const spanish = renderS002(chapter('es'), 'es', '/');
  assert.match(
    spanish,
    /<section class="concept-definition concept-definition--paragraph"><h4>Estándar de ingeniería<\/h4><p>acuerdo técnico que define una práctica verificable\.<\/p><\/section><section class="concept-definition concept-definition--paragraph"><h4>Gobierno técnico<\/h4><p>proceso para adoptar, revisar y exceptuar esos acuerdos\.<\/p><\/section>/,
  );
  assert.match(
    spanish,
    /<ul class="concept-list"><li class="concept-definition"><h3>Estándar de ingeniería<\/h3><p>acuerdo que define una práctica técnica esperada y cómo comprobarla\.[\s\S]*?<\/li><li class="concept-definition"><h3>Gobierno técnico<\/h3><p>proceso mediante el cual los equipos proponen, adoptan, revisan y, cuando corresponde, exceptúan estándares\./,
  );
  assert.doesNotMatch(spanish, /<h3[^>]*>Staff → Principal<\/h3>/);
  assert.match(
    spanish,
    /<ul class="concept-list"><li class="concept-definition"><h[3-6]>Monorepo<\/h[3-6]><p>un repositorio que reúne el código de varios proyectos relacionados<\/p><\/li><li class="concept-definition"><h[3-6]>Polyrepo<\/h[3-6]>/,
  );
  assert.match(
    spanish,
    /<ol class="canonical-ordered-list"><li><span class="ordered-list-content">Un repositorio compartido facilita coordinar cambios/,
  );
  assert.match(
    spanish,
    /<ul class="canonical-unordered-list"><li><span class="unordered-list-content">En un monorepo, paquete y aplicación pueden cambiar juntos en una misma revisión\.<\/span><\/li><li><span class="unordered-list-content">En polyrepo, el paquete suele publicarse como una versión/,
  );
  assert.match(
    spanish,
    /<ul class="canonical-unordered-list"><li><span class="unordered-list-content"><strong>Si el cambio requiere actualizar al mismo tiempo el paquete y la aplicación<\/strong>, un monorepo puede facilitar que ambos cambios se revisen y versionen en conjunto\.<\/span><\/li><li><span class="unordered-list-content"><strong>Si el paquete tiene una API estable y se publica con versiones<\/strong>, polyrepos pueden permitir/,
  );
  assert.match(
    spanish,
    /<p class="split-lead"><strong>Objetivo<\/strong><span>Poder decidir cuándo conviene/,
  );
  assert.match(spanish, /<p class="split-lead"><strong>Preguntas guía<\/strong><span>¿Qué se gana/);
  assert.match(
    spanish,
    /<section class="concept-definition concept-definition--paragraph"><h4>frontera arquitectónica<\/h4><p>define qué puede usar un componente de otro y a través de qué contrato\./,
  );
  assert.match(
    spanish,
    /<section class="concept-definition concept-definition--paragraph"><h4>estándar de ingeniería verificable<\/h4><p>es una regla cuya aplicación puede observarse mediante revisión o prueba\./,
  );
  assert.match(
    spanish,
    /<section class="concept-definition concept-definition--paragraph"><h[3-6]>Import interno<\/h[3-6]><p>El consumidor depende de un archivo privado\./,
  );
  assert.match(
    spanish,
    /<section class="concept-definition concept-definition--paragraph"><h[3-6]>Regla sin responsable<\/h[3-6]><p>Una política que nadie revisa puede quedar desactualizada o acumular excepciones\./,
  );
  assert.match(
    spanish,
    /<details class="instructional-block instructional-retrieval"><summary><span class="instructional-label">Pregunta<\/span><strong>Un equipo coloca una aplicación y un paquete compartido en el mismo repositorio, pero permite imports directos desde cualquier archivo interno\. ¿Tiene fronteras arquitectónicas comprobables\?<\/strong><\/summary><div class="retrieval-answer"><p class="instructional-answer-label">Respuesta razonada<\/p><p>No necesariamente\./,
  );
  assert.match(
    spanish,
    /<div class="study-question-cards"><details class="study-retrieval"><summary><strong>¿Qué organiza un monorepo\?<\/strong><\/summary><div class="study-retrieval-answer"><p>Reúne el código y su historial en un repositorio común\. No define automáticamente las fronteras arquitectónicas ni obliga a que todo sea una sola aplicación\.<\/p><\/div><\/details>/,
  );
  assert.match(
    spanish,
    /<section class="concept-definition concept-definition--paragraph"><h4>Repositorio<\/h4><p>es la unidad de versionado del código y su historial\. <strong>Monorepo<\/strong> reúne en un repositorio el código de varios proyectos\. En un modelo <strong>polyrepo<\/strong>, los proyectos viven en repositorios separados\.<\/p><p>La diferencia está en la unidad donde se coordinan el historial y los cambios\./,
  );
  assert.match(
    spanish,
    /<aside class="instructional-outcome instructional-outcome--answer"><p class="instructional-outcome-label">Respuesta razonada<\/p><p>el monorepo prueba que existe una raíz de control de versiones común;/,
  );
  assert.match(
    spanish,
    /<aside class="instructional-outcome instructional-outcome--deliverable"><p class="instructional-outcome-label">Entregable<\/p><p>diagrama de módulos, regla de dependencia en lenguaje natural y ejemplo de test/,
  );
  assert.match(
    spanish,
    /<aside class="instructional-outcome instructional-outcome--review"><p class="instructional-outcome-label">Criterio de revisión<\/p><p>la respuesta no equipara monorepo con monolito/,
  );
  assert.match(
    spanish,
    /<ul class="success-study-list"><li class="canonical-study-item"><label><input type="checkbox" data-study-id="PA-S002:success:01"><span>Dibujar el límite y el grafo de dependencias sin confundirlos con la estructura de carpetas\.<\/span><\/label><\/li>/,
  );
  const english = renderS002(chapter('en'), 'en', '/');
  assert.match(
    english,
    /<li class="canonical-study-item"><label><input type="checkbox" data-study-id="PA-S002:success:01"><span>Draw the boundary and the dependency graph without confusing them with the folder structure\.<\/span><\/label><\/li>/,
  );
  assert.match(
    spanish,
    /<p class="split-lead"><strong>Caso documentado: el repositorio monolítico de Google<\/strong><span>[\s\S]*?nuestro proyecto\.<\/span><\/p><ul class="reference-links"><li><a href="https:\/\/research\.google\/pubs\/why-google-stores-billions-of-lines-of-code-in-a-single-repository\/" rel="noreferrer">Publicación de Google Research: Potvin y Levenberg<\/a><\/li><li><a href="https:\/\/research\.google\/pubs\/advantages-and-disadvantages-of-a-monolithic-codebase\/" rel="noreferrer">Publicación de Google Research: Jaspan y colaboradores<\/a>/,
  );
  assert.match(
    spanish,
    /<article class="reference-entry"><p class="reference-entry-source"><strong>Google Research<\/strong><\/p><p class="reference-entry-link"><a href="https:\/\/research\.google\/pubs\/why-google-stores-billions-of-lines-of-code-in-a-single-repository\/" rel="noreferrer">Why Google Stores Billions of Lines of Code in a Single Repository<\/a><\/p><p class="reference-entry-description">Rachel Potvin y Josh Levenberg describen el repositorio monolítico de Google y las razones del modelo\./,
  );
  assert.doesNotMatch(spanish, /genui/);
  assert.doesNotMatch(spanish, /Estado editorial: EN REVISIÓN/);
  assert.doesNotMatch(spanish, /section-heading section-label/);
  assert.match(spanish, /<h3 id="section-192">Comprueba lo aprendido<\/h3>/);
  assert.doesNotMatch(spanish, /<span class="section-title">Recuperación<\/span>/);
  assert.match(
    spanish,
    /<h2 id="main-topic" class="section-heading"><span class="section-number" aria-hidden="true">Sección 2<\/span><span class="section-title">Tema principal — Del repositorio compartido a los límites comprobables<\/span><\/h2>/,
  );
  assert.match(spanish, /flow-card-code/);
  assert.match(spanish, /web → ui → tokens/);
  assert.match(
    spanish,
    /<details class="diagram-source"><summary><span class="diagram-source-label">Más información del diagrama<\/span><strong>Ver fuente Mermaid y detalles técnicos<\/strong><\/summary><p class="diagram-source-hint">Incluye el código Mermaid usado para generar esta visualización\.<\/p>/,
  );
  for (const heading of [
    'Ownership y evolución de estándares',
    'Caso documentado del mundo real',
    'Ejercicios',
  ])
    assert.match(spanish, new RegExp(heading));
  assert.match(
    spanish,
    /<h3 id="subtopic-2" class="section-heading"><span class="section-number" aria-hidden="true">Subtema 2<\/span><span class="section-title">Workspaces, aplicaciones y paquetes<\/span><\/h3>/,
  );
  assert.match(
    spanish,
    /<ol class="toc-list"><li><a href="#concepts">Conceptos por ámbito profesional<\/a><\/li><li><a href="#main-topic">Tema principal — Del repositorio compartido a los límites comprobables<\/a><\/li><li><a href="#subtopics">Subtemas<\/a><ol class="toc-sublist"><li><a href="#subtopic-1">Repositorios y fronteras<\/a><\/li><li><a href="#subtopic-2">Workspaces, aplicaciones y paquetes<\/a>/,
  );
  assert.match(
    spanish,
    /<a href="#bridge-to-pa-s003">Puente a PA-S003<\/a><\/li><\/ol><\/nav><\/details>/,
  );
  assert.equal((spanish.match(/class="toc-fab"/g) ?? []).length, 1);
  assert.equal((spanish.match(/class="session-diagram"/g) ?? []).length, 5);
  assert.ok(existsSync('site/shared/diagrams/PA-S002/studio-map-es.mmd'));
});

test('PA-S002 uses an ordered semantic heading hierarchy in both locales', () => {
  const primarySections = [
    'concepts',
    'main-topic',
    'subtopics',
    'integration',
    'theory-practice',
    'estimated-time',
    'real-world-case',
    'production-reference-design',
    'visual-learning-studio',
    'study-cards',
    'exercises',
    'sources',
    'resources',
    'study-checklist',
    'success-criteria',
    'bridge-to-pa-s003',
  ];
  for (const lang of ['es', 'en'] as const) {
    const html = renderS002(chapter(lang), lang, '/');
    const articleStart = html.indexOf('<article class="canonical-theory">');
    const articleEnd = html.indexOf('<a class="toc-fab"', articleStart);
    const article = html.slice(articleStart, articleEnd);
    const levels = [...article.matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]));
    const ids = [...article.matchAll(/<h2 id="([^"]+)" class="section-heading/g)].map(
      (match) => match[1],
    );
    assert.equal(
      (article.match(/<h2\b/g) ?? []).length,
      primarySections.length,
      `${lang}: only primary h2s`,
    );
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${lang}: one page-level h1`);
    assert.deepEqual(ids, primarySections, `${lang}: primary section order`);
    assert.equal(levels[0], 2, `${lang}: the first content heading is a section`);
    for (const [index, level] of levels.entries()) {
      if (index)
        assert.ok(level <= levels[index - 1]! + 1, `${lang}: h${levels[index - 1]} → h${level}`);
    }
  }

  const spanish = renderS002(chapter('es'), 'es', '/');
  assert.match(
    spanish,
    /<h2 id="concepts"[^>]*>[\s\S]*?<ul class="concept-list"><li class="concept-definition"><h3>Estándar de ingeniería<\/h3>/,
  );
  assert.match(
    spanish,
    /<h2 id="subtopics"[^>]*>[\s\S]*?<h3 id="subtopic-1"[^>]*>[\s\S]*?<h4 id="section-206">Objetivo<\/h4>[\s\S]*?<h5>Repositorio<\/h5>/,
  );
});
