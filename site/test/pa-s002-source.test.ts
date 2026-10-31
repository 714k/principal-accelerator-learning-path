import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { renderS002 } from '../tooling/pa-s002.ts';
import { sessionsIndex } from '../tooling/render.ts';

const ids = [
  'repo.monorepo',
  'repo.polyrepo',
  'boundary.repository',
  'boundary.architecture',
  'standards.convention',
  'standards.policy',
  'standards.standard',
  'quality.gate',
  'architecture.constraint',
  'architecture.fitness',
  'ownership.boundary',
  'workspace.workspace',
  'workspace.application',
  'workspace.package',
  'workspace.library',
  'dependency.graph',
  'dependency.direction',
  'dependency.cycle',
  'api.public',
  'tasks.graph',
  'sharing.tradeoffs',
  'ai.boundaries',
];
const topics = [
  'main.monorepo',
  'sub.strategy',
  'sub.units',
  'sub.contracts',
  'sub.execution',
  'sub.governance',
  'sub.verification',
  'sub.responsibility',
];

test('PA-S002 source files retain the authorized bytes and bilingual identifiers', () => {
  for (const [lang, size, hash] of [
    ['es', 39513, '917daa42c6d834c4fac57528fbb31e85d864e6a2da2bebb09dd8f594432db5de'],
    ['en', 36563, '896e5b415792351a6cababb1feafc4e4a0d3bc696247fd69a809c9dabfef972c'],
  ] as const) {
    const bytes = readFileSync(`site/content/canonical/PA-S002-theory-${lang}.md`);
    assert.equal(bytes.length, size);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), hash);
    const source = bytes.toString('utf8');
    assert.equal(source.endsWith('\n'), true);
    assert.deepEqual(
      [...source.matchAll(/<!-- concept: ([\w.]+) -->/g)].map((m) => m[1]),
      ids,
    );
    assert.deepEqual(
      [...source.matchAll(/<!-- topic: ([\w.]+) requires:/g)].map((m) => m[1]),
      topics,
    );
    const blocks = [...source.matchAll(/```mermaid\n([\s\S]*?)```/g)].map((m) => m[1]);
    assert.equal(blocks.length, 2);
    for (const [index, name] of ['example', 'mindmap'].entries()) {
      assert.equal(
        readFileSync(`site/shared/diagrams/PA-S002/${name}-${lang}.mmd`, 'utf8'),
        blocks[index],
      );
    }
  }
});

test('PA-S002 is linked in navigation and index and renders both canonical chapters', () => {
  for (const lang of ['es', 'en'] as const) {
    const source = readFileSync(`site/content/canonical/PA-S002-theory-${lang}.md`, 'utf8');
    const html = renderS002(source, lang, '/');
    assert.match(sessionsIndex(lang, '/'), new RegExp(`/${lang}/sessions/PA-S002/`));
    assert.match(html, new RegExp(`/${lang}/sessions/PA-S002/`));
    for (const id of [...ids, ...topics]) assert.ok(html.includes(`id="${id}"`), id);
    assert.match(html, /PA-S002:exercise:1/);
    assert.match(html, /PA-S002:mastery:5/);
    assert.match(html, /PA-S002\/mindmap-/);
    assert.equal((html.match(/class="concept-heading"/g) ?? []).length, 29);
    assert.equal((html.match(/class="reading-level"/g) ?? []).length, 44);
    assert.equal((html.match(/class="deep-dive"/g) ?? []).length, 22);
    const synthesis = html.match(/<aside class="synthesis">([\s\S]*?)<\/aside>/)?.[1];
    assert.ok(synthesis);
    assert.equal((synthesis.match(/<li>/g) ?? []).length, 3);
    assert.match(html, /<nav class="breadcrumb"/);
    assert.match(html, /<h2 id="s002-0" class="chapter-title">/);
    assert.match(html, /<div class="chapter-meta">/);
  }
});
