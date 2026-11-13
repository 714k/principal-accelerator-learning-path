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

test('mind maps emit palettes for both site themes', () => {
  const page = readFileSync('dist/es/sessions/PA-S002/index.html', 'utf8');
  assert.match(page, /data-theme-map="light"[\s\S]*studio-map-es\.svg/);
  assert.match(page, /data-theme-map="dark"[\s\S]*studio-map-es\.dark\.svg/);
  const light = 'dist/es/shared/diagrams/PA-S002/studio-map-es.svg';
  const dark = 'dist/es/shared/diagrams/PA-S002/studio-map-es.dark.svg';
  assert.ok(existsSync(light));
  assert.ok(existsSync(dark));
  assert.match(readFileSync(light, 'utf8'), /svg\{background:#ffffff\}/);
  assert.match(readFileSync(dark, 'utf8'), /svg\{background:#10141c\}/);
});
