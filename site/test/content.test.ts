import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve, dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadPage, assertPair, validatePage } from '../tooling/content.ts';
import { assertCanonicalPair, renderCanonical, studyIds, CONCEPT_IDS, TOPIC_IDS, EXERCISE_IDS, CHECK_IDS } from '../tooling/canonical.ts';
import { renderPage, home, sessionsIndex, projectsIndex } from '../tooling/render.ts';
import { diagramMetadata } from '../tooling/diagrams.ts';
import { searchIndex } from '../tooling/search.ts';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const source=(lang:'es'|'en')=>readFileSync(resolve(root,`site/content/canonical/PA-S001-theory-${lang}.md`),'utf8');
const pages={es:loadPage(resolve(root,'site/es/sessions/PA-S001/page.json')),
  en:loadPage(resolve(root,'site/en/sessions/PA-S001/page.json'))};

test('canonical files retain learner supplied bytes and hashes',()=>{
  assert.doesNotThrow(()=>assertCanonicalPair(source('es'),source('en')));
  assert.throws(()=>assertCanonicalPair(source('es').replace('Ingeniería','Ingenieria'),source('en')),/MISSING_CANONICAL_THEORY_PAYLOAD/);
});

test('seventeen concepts, main topic, six subtopics, and study IDs have ES/EN parity',()=>{
  for(const lang of ['es','en'] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    const ids=[...CONCEPT_IDS,...TOPIC_IDS];
    for(const id of ids)assert.equal((html.match(new RegExp(`<h[2-4] id="${id}"`,'g'))??[]).length,1,`${lang} ${id}`);
    const conceptPositions=CONCEPT_IDS.map(id=>html.indexOf(`id="${id}"`));
    assert.ok(conceptPositions.every((value,index)=>index===0||value>conceptPositions[index-1]!));
    assert.ok(html.indexOf('id="scope.ecosystem"')<html.indexOf('id="sub.scope-layers"'));
    assert.deepEqual(studyIds(source(lang)),{exercises:EXERCISE_IDS,mastery:CHECK_IDS});
  }
});

function plainMarkdown(line:string):string{
  const code:string[]=[];
  let value=line.replace(/`([^`]+)`/g,(_,content:string)=>{code.push(content);return `@@CODE${code.length-1}@@`;});
  value=value.replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g,'$1')
    .replace(/\[([^\]:]+):: ([^\]]+)\]/g,'$1 — $2')
    .replace(/\*\*([^*]+)\*\*/g,'$1').replace(/\*([^*]+)\*/g,'$1')
    .replace(/@@CODE(\d+)@@/g,(_,index:string)=>code[Number(index)]!);
  return value.replace(/\s+/g,' ').trim();
}
function visibleHtml(html:string):string{
  return html.replace(/<!-- STUDIO START -->[\s\S]*?<!-- STUDIO END -->/g,' ')
    .replace(/<\/(?:p|h[1-6]|li|summary|tr|div|aside)>/g,' ')
    .replace(/<[^>]+>/g,'')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
}
test('every substantive authored paragraph and instruction appears in rendered order',()=>{
  for(const lang of ['es','en'] as const){
    const visible=visibleHtml(renderCanonical(source(lang),lang,'/').html);
    let cursor=0,count=0,inCode=false;
    for(const raw of source(lang).split('\n')){
      if(raw.startsWith('```')){inCode=!inCode;continue;}
      if(inCode||!raw||raw.startsWith('#')||raw.startsWith('|')||raw.startsWith('- ')||raw.startsWith('> ')||/^\d+\. /.test(raw))continue;
      const line=plainMarkdown(raw);
      if(line.length<60)continue;
      const next=visible.indexOf(line,cursor);
      assert.ok(next>=cursor,`${lang} missing or out of order: ${line.slice(0,100)}`);
      cursor=next+line.length;count++;
    }
    assert.ok(count>=65,`${lang} paragraph comparator covered only ${count} lines`);
  }
});

test('all four exercises and eight checkboxes are reversible controls with static fallback',()=>{
  for(const lang of ['es','en'] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    for(const id of [...EXERCISE_IDS,...CHECK_IDS])assert.ok(html.includes(`data-study-id="${id}"`));
    assert.equal((html.match(/data-study-id="PA-S001\.(?:exercise|check)\.[a-z-]+"/g)??[]).length,12);
    assert.equal((html.match(/<input type="checkbox"/g)??[]).length,12);
    assert.ok(!/<input[^>]*\bdisabled\b/.test(html));
    assert.ok(html.includes('class="flashcard-answer"'));
    assert.ok(!html.includes('<script'));
  }
  const script=readFileSync(resolve(root,'site/shared/assets/study.js'),'utf8');
  assert.ok(script.includes('localStorage.setItem(key(id)'));
  assert.ok(!script.includes('data/mastery/'));
});

test('Studio exposes 24 source-linked cards and responsive SVG mind map',()=>{
  for(const lang of ['es','en'] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    assert.equal((html.match(/data-flash-id="/g)??[]).length,24);
    assert.deepEqual([...html.matchAll(/data-flash-id="([^"]+)"/g)].map(x=>x[1]),[...CONCEPT_IDS,...TOPIC_IDS]);
    assert.ok(html.includes(`/${lang}/shared/diagrams/PA-S001/canonical-map.svg`));
    assert.ok(html.includes('data-flash-prev')&&html.includes('data-flash-next')&&html.includes('data-flash-flip'));
    assert.ok(html.includes('id="visual-panel-mind-map"')&&html.includes('id="visual-panel-flashcards"'));
  }
  const diagram=readFileSync(resolve(root,'site/shared/diagrams/PA-S001/canonical-map.mmd'),'utf8');
  for(const id of [...CONCEPT_IDS,...TOPIC_IDS])assert.ok(diagram.includes(id));
  const data=diagramMetadata([pages.es,pages.en]);
  assert.ok(data.get('PA-S001/canonical-map.mmd')?.title);
});

test('metadata, routes, citations, dashboard, and search retain product boundaries',()=>{
  assert.doesNotThrow(()=>assertPair(pages.es,pages.en));
  assert.throws(()=>validatePage({...pages.es,status:'Completed'}));
  for(const lang of ['es','en'] as const){
    const html=renderPage(pages[lang],'/','sessions/PA-S001',source(lang));
    assert.ok(html.includes('Principal Accelerator Learning Path'));
    assert.ok(html.includes('id="source-R8"')&&html.includes('href="#source-R8"'));
    assert.ok(html.includes('id="main.p0-boundaries"'));
    assert.ok(html.includes('data-theme-toggle'));
    assert.ok(html.includes('<noscript>'));
    assert.ok(sessionsIndex(lang,'/').includes('PA-S001'));
    assert.ok(projectsIndex(lang,'/').includes('projects/portfolio/'));
    const dashboard=home(lang,'/',pages[lang],'Not started','not-assessed','Not started');
    for(const id of ['study','roadmap','mastery','artifacts','revisit','projects','activity'])assert.ok(dashboard.includes(`id="${id}"`));
    assert.ok(dashboard.includes('max="4"')&&dashboard.includes('max="8"'));
    assert.ok(searchIndex(lang,'/',[{route:'sessions/PA-S001',page:pages[lang]}],source(lang)).some(entry=>entry.href===`/${lang}/sessions/PA-S001/#design.boundary`));
  }
});
