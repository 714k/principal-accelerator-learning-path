import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderS003 } from '../tooling/pa-s003.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const source = (lang: 'es' | 'en') =>
  readFileSync(resolve(root, `site/content/canonical/PA-S003-theory-${lang}.md`), 'utf8');

test('PA-S003 exercises render as bilingual, reversible study checkboxes', () => {
  const expected = ['01', '02', '03', '04', '05'].map((number) => `PA-S003:exercise:${number}`);
  for (const lang of ['es', 'en'] as const) {
    const html = renderS003(source(lang), lang, '/');
    assert.deepEqual(
      [...html.matchAll(/data-study-id="([^"]+)"/g)].map((match) => match[1]),
      expected,
    );
    assert.equal((html.match(/<input type="checkbox"/g) ?? []).length, expected.length);
  }
  const study = readFileSync(resolve(root, 'site/shared/assets/study.js'), 'utf8');
  assert.match(study, /firstId\?\.startsWith\('PA-S003:'\)\s*\?\s*'PA-S003'/);
});
