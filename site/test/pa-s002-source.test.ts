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
    assert.doesNotMatch(html, /<details class="deep-dive">/);
    assert.doesNotMatch(html, /F0 · PA-S002/);
    assert.doesNotMatch(html, /F0 \/ PA-S002/);
    assert.doesNotMatch(html, /<p>---<\/p>/);
    assert.match(html, /<details class="toc" id="table-of-contents">/);
    assert.equal((html.match(/class="toc-fab"/g) ?? []).length, 1);
    assert.match(html, /id="concepts"/);
  }
  const spanish = renderS002(chapter('es'), 'es', '/');
  for (const heading of [
    'Subtema 1. Repositorios y fronteras',
    'Subtema 7. Ownership y evolución de estándares',
    'Caso documentado del mundo real',
    'Práctica y cierre de PA-S002',
  ])
    assert.match(spanish, new RegExp(heading));
  assert.match(
    spanish,
    /<li class="concept-definition"><h5>Estándar de ingeniería<\/h5><p>acuerdo que define una práctica técnica esperada/,
  );
  assert.match(
    spanish,
    /<li class="concept-summary"><p class="concept-summary-label">Staff → Principal\.<\/p><h4>Estándar de ingeniería<\/h4><p>acuerdo técnico que define una práctica verificable\.<\/p><p>Gobierno técnico:/,
  );
  assert.match(
    spanish,
    /<li class="concept-definition"><h4>Monorepo<\/h4><p>un repositorio que reúne el código de varios proyectos relacionados\.<\/p><\/li>/,
  );
  assert.match(
    spanish,
    /<li class="concept-definition"><h4>Ownership<\/h4><p>responsabilidad explícita sobre el mantenimiento y la revisión de un componente\.<\/p><\/li>/,
  );
  assert.match(
    spanish,
    /<li class="concept-definition"><h4>Excepción documentada<\/h4><p>desviación justificada, acotada y revisable de una regla\.<\/p><\/li>/,
  );
  assert.match(
    spanish,
    /<li class="concept-definition"><h5>Contrato de datos<\/h5><p>confirma la estructura de solicitud y respuesta\.<\/p><\/li>/,
  );
  assert.match(
    spanish,
    /<li class="concept-definition"><h5>Evaluación de resultados<\/h5><p>revisa si los resúmenes cubren información relevante y evitan atribuir al documento datos que no contiene\.<\/p><\/li>/,
  );
  assert.match(
    spanish,
    /<div class="concept-definition concept-definition--paragraph"><h4>Repositorio<\/h4><p>es la unidad de versionado que conserva archivos y su historial de cambios\.<\/p><\/div>/,
  );
  assert.match(
    spanish,
    /<div class="concept-definition concept-definition--paragraph"><h4>Monorepo<\/h4><p>reúne en un repositorio el código de varios proyectos\. <strong>Polyrepo<\/strong> mantiene esos proyectos en repositorios separados\./,
  );
  assert.match(spanish, /<p class="arrow-flow">Un <strong>grafo de dependencias<\/strong> representa módulos/);
  assert.match(
    spanish,
    /<p>El recorrido será:<\/p><p class="arrow-flow">conceptos → tema principal → siete subtemas → integración entre ámbitos → teoría a práctica → caso real → diseño de producción → Studio → ejercicios → fuentes, criterios y puente\.<\/p>/,
  );
  assert.match(
    spanish,
    /<ul class="reference-links"><li><a href="https:\/\/research\.google\/pubs\/why-google-stores-billions-of-lines-of-code-in-a-single-repository\/">Publicación de Google Research: Potvin y Levenberg<\/a><\/li><li><a href="https:\/\/research\.google\/pubs\/advantages-and-disadvantages-of-a-monolithic-codebase\/">Publicación de Google Research: Jaspan y colaboradores<\/a><\/li><\/ul>/,
  );
  assert.match(
    spanish,
    /<div class="statement-card"><h4>Diseño de referencia externo, aún no verificado<\/h4><p>una plataforma hipotética de reservas con aplicación web/,
  );
  assert.match(
    spanish,
    /<div class="statement-card"><h4>Visual Learning Studio previsto<\/h4><p>mapa mental Mermaid que cubra conceptos/,
  );
  assert.equal((spanish.match(/class="session-diagram"/g) ?? []).length, 5);
  assert.ok(existsSync('site/shared/diagrams/PA-S002/studio-map-es.mmd'));
});
