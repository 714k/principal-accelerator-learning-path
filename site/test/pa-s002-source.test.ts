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
});

test('PA-S002 is linked in bilingual navigation and renders complete Spanish content', () => {
  for (const lang of ['es', 'en'] as const) {
    const html = renderS002(chapter(lang), lang, '/');
    assert.match(sessionsIndex(lang, '/'), new RegExp(`/${lang}/sessions/PA-S002/`));
    assert.match(html, new RegExp(`/${lang}/sessions/PA-S002/`));
    assert.match(html, /data-learning-studio/);
    assert.equal((html.match(/data-flash-id=/g) ?? []).length, 10);
    assert.doesNotMatch(html, /class="concept-id"/);
    assert.doesNotMatch(html, /(?:Nivel|Level) [123] —/);
    assert.match(html, new RegExp(`/${lang}/sessions/PA-S002/#concepts`));
  }
  const spanish = renderS002(chapter('es'), 'es', '/');
  assert.match(
    spanish,
    /<ol class="concept-list"><li><strong class="concept-list-term">Staff → Principal<\/strong><span class="concept-list-definition">«Estándar de ingeniería:/,
  );
  assert.match(
    spanish,
    /<ul class="concept-list"><li><strong class="concept-list-term">Estándar de ingeniería:<\/strong><span class="concept-list-definition">/,
  );
  assert.match(
    spanish,
    /<ol class="canonical-ordered-list"><li>Un repositorio compartido facilita coordinar cambios/,
  );
  assert.match(
    spanish,
    /<p class="split-lead"><strong>Objetivo<\/strong><span>Poder decidir cuándo conviene/,
  );
  assert.match(spanish, /<p class="split-lead"><strong>Preguntas guía<\/strong><span>¿Qué se gana/);
  assert.doesNotMatch(spanish, /Estado editorial: EN REVISIÓN/);
  assert.match(spanish, /<h3 id="section-192">Comprueba lo aprendido<\/h3>/);
  assert.doesNotMatch(spanish, /<span class="section-title">Recuperación<\/span>/);
  assert.match(
    spanish,
    /<h2 id="main-topic" class="section-heading"><span class="section-number" aria-hidden="true">Sección 2<\/span><span class="section-title">Tema principal — Del repositorio compartido a los límites comprobables<\/span><\/h2>/,
  );
  assert.match(
    spanish,
    /<div class="flow-card flow-card-code"><pre class="code"><code>web → ui → tokens<\/code><\/pre><\/div>/,
  );
  for (const heading of [
    'Ownership y evolución de estándares',
    'Caso documentado del mundo real',
    'Ejercicios',
  ])
    assert.match(spanish, new RegExp(heading));
  assert.match(
    spanish,
    /<h2 id="subtopic-2" class="section-heading"><span class="section-number" aria-hidden="true">Subtema 2<\/span><span class="section-title">Workspaces, aplicaciones y paquetes<\/span><\/h2>/,
  );
  assert.match(
    spanish,
    /<ol class="toc-list"><li><a href="#concepts">Conceptos por ámbito profesional<\/a><\/li><li><a href="#main-topic">Tema principal — Del repositorio compartido a los límites comprobables<\/a><\/li><li><a href="#subtopics">Subtemas<\/a><ol class="toc-sublist"><li><a href="#subtopic-1">Repositorios y fronteras<\/a><\/li><li><a href="#subtopic-2">Workspaces, aplicaciones y paquetes<\/a>/,
  );
  assert.match(
    spanish,
    /<a href="#bridge-to-pa-s003">Puente a PA-S003<\/a><\/li><\/ol><\/nav><\/details>/,
  );
  const subtopicTwo = spanish.indexOf('<h2 id="subtopic-2"'),
    subtopicThree = spanish.indexOf('<h2 id="subtopic-3"'),
    returnToContents = spanish.lastIndexOf('class="toc-fab"', subtopicThree);
  assert.ok(returnToContents > subtopicTwo && returnToContents < subtopicThree);
  assert.equal((spanish.match(/class="session-diagram"/g) ?? []).length, 5);
  assert.ok(existsSync('site/shared/diagrams/PA-S002/studio-map-es.mmd'));
});
