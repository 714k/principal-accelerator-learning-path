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
  for (const heading of [
    'Subtema 1. Repositorios y fronteras',
    'Subtema 7. Ownership y evolución de estándares',
    'Caso documentado del mundo real',
    'Práctica y cierre de PA-S002',
  ])
    assert.match(spanish, new RegExp(heading));
  assert.equal((spanish.match(/class="session-diagram"/g) ?? []).length, 5);
  assert.ok(existsSync('site/shared/diagrams/PA-S002/studio-map-es.mmd'));
});
