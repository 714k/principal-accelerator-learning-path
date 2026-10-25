import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderS004 } from '../tooling/pa-s004.ts';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const source=(lang:'es'|'en')=>readFileSync(resolve(root,`site/content/canonical/PA-S004-theory-${lang}.md`),'utf8');

test('PA-S004 keeps its bilingual concept identifiers and Studio coverage',()=>{
  const ids=['S004-STAFF-C01','S004-STAFF-C02','S004-FPA-C01','S004-FPA-C02','S004-A11Y-C01','S004-A11Y-C02','S004-A11Y-C03','S004-A11Y-C04','S004-A11Y-C05'];
  for(const lang of ['es','en'] as const){
    const chapter=source(lang),html=renderS004(chapter,lang,'/');
    for(const id of ids)assert.ok(chapter.includes(id),`${lang}: ${id}`);
    assert.ok(html.includes('data-learning-studio'));
    assert.equal((html.match(/data-flash-id=/g)??[]).length,13);
    assert.ok(html.includes(`/shared/diagrams/PA-S004/mindmap.svg`));
    for(let index=1;index<=6;index++)assert.ok(html.includes(`theory-${lang}-${String(index).padStart(2,'0')}.svg`));
    assert.ok(html.includes('mechanism-retrieval'));
    const studyIds=[...html.matchAll(/data-study-id="([^"]+)"/g)].map(match=>match[1]);
    assert.deepEqual(studyIds,[
      ...['01','02','03','04'].map(id=>`PA-S004:exercise:${id}`),
      ...['01','02','03','04','05','06','07','08'].map(id=>`PA-S004:check:${id}`),
      ...['01','02','03','04'].map(id=>`PA-S004:success:${id}`)
    ]);
    assert.equal((html.match(/<input type="checkbox"/g)??[]).length,16);
  }
  assert.ok(existsSync(resolve(root,'site/shared/diagrams/PA-S004/mindmap.mmd')));
});
