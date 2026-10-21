import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { basePath } from '../tooling/render.ts';

test('generated bilingual chapters load the emitted explorer module',()=>{
  const source=readFileSync('site/shared/assets/concept-explorers.js');
  assert.deepEqual(readFileSync('dist/assets/concept-explorers.js'),source);
  const moduleUrl=`${basePath(process.env.BASE_PATH)}assets/concept-explorers.js`;
  for(const lang of ['es','en']){
    const html=readFileSync(`dist/${lang}/sessions/PA-S001/index.html`,'utf8');
    assert.ok(html.includes(`<script type="module" src="${moduleUrl}"></script>`),`${lang}: missing explorer module at ${moduleUrl}`);
  }
});
