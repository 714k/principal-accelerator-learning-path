import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderS005 } from '../tooling/pa-s005.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const source = (lang: 'es' | 'en') =>
  readFileSync(resolve(root, `site/content/canonical/PA-S005-theory-${lang}.md`), 'utf8');

test('PA-S005 keeps bilingual i18n identifiers, accessible diagrams, and study coverage', () => {
  const ids = Array.from(
    { length: 14 },
    (_, index) => `S005-C${String(index + 1).padStart(2, '0')}`,
  );
  for (const lang of ['es', 'en'] as const) {
    const chapter = source(lang),
      html = renderS005(chapter, lang, '/');
    for (const id of ids) assert.ok(chapter.includes(id), `${lang}: ${id}`);
    assert.ok(html.includes('data-learning-studio'));
    assert.equal((html.match(/data-flash-id=/g) ?? []).length, 20);
    assert.ok(html.includes('/shared/diagrams/PA-S005/mindmap.svg'));
    for (let index = 1; index <= 3; index++)
      assert.ok(html.includes(`theory-${lang}-${String(index).padStart(2, '0')}.svg`));
    assert.ok(html.includes('mechanism-retrieval'));
    const studyIds = [...html.matchAll(/data-study-id="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(studyIds, [
      ...['01', '02', '03', '04'].map((id) => `PA-S005:exercise:${id}`),
      ...['01', '02', '03', '04', '05', '06', '07', '08', '09'].map((id) => `PA-S005:check:${id}`),
    ]);
    assert.equal((html.match(/<input type="checkbox"/g) ?? []).length, 13);
  }
  assert.ok(existsSync(resolve(root, 'site/shared/diagrams/PA-S005/mindmap.mmd')));
});
