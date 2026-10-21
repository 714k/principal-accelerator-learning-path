import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('generated bilingual chapters load the emitted explorer module',()=>{
  const source=readFileSync('site/shared/assets/concept-explorers.js');
  assert.deepEqual(readFileSync('dist/assets/concept-explorers.js'),source);
  for(const lang of ['es','en']){
    const html=readFileSync(`dist/${lang}/sessions/PA-S001/index.html`,'utf8');
    assert.match(html,/<script type="module" src="\/assets\/concept-explorers\.js"><\/script>/);
  }
});
