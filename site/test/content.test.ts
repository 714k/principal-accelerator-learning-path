import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve, dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadPage, assertPair, validatePage } from '../tooling/content.ts';
import { assertCanonicalPair, renderCanonical, studyIds, CONCEPT_IDS, TOPIC_IDS, EXERCISE_IDS, CHECK_IDS, SUCCESS_IDS } from '../tooling/canonical.ts';
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

test('chapter metadata and reading layers have a semantic heading hierarchy in both languages',()=>{
  for(const lang of ['es','en'] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    const phase=lang==='es'?'Fase':'Phase';
    const lanes=lang==='es'?'Carriles':'Lanes';
    const foundation=lang==='es'?'Nivel 1 — Fundamento.':'Level 1 — Foundation.';
    assert.match(html,/<h2 id="chapter-title" class="chapter-title">PA-S001 —/);
    assert.match(html,new RegExp(`<h3>${phase}:</h3><p>`));
    assert.match(html,new RegExp(`<h3>${lanes}:</h3><p>`));
    assert.match(html,/<div class="concept-heading" data-concept-id="scope\.system"><p class="concept-eyebrow">/);
    assert.match(html,/<div class="concept-heading" data-concept-id="sub\.software-vs-architecture"><p class="concept-eyebrow">/);
    assert.ok(html.includes(`<h4>${foundation}</h4>`));
    assert.ok(!html.includes('<p><strong>Level 1')&&!html.includes('<p><strong>Nivel 1'));
  }
});

test('paragraph lead-ins become headings without redundant definition labels',()=>{
  for(const [lang,titles] of [
    ['es',['Ingeniería de software','Arquitectura de software','Aplicación']],
    ['en',['Software engineering','Software architecture','Application']],
  ] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    for(const title of titles)assert.ok(html.includes(`class="instructional-heading">${title}</h4><p>`),`${lang}: ${title}`);
    assert.doesNotMatch(html,/<strong>[^<]+:\s*(?:definición|definition)\.\s*<\/strong>/i);
  }
});

function plainMarkdown(line:string):string{
  if(!/^\*\*(?:Nivel|Level) [123] —/.test(line))line=line.replace(/^\*\*([^*]+?)(?::\s*(?:definición|definition))?\.\*\* /i,'**$1** ');
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
      if(/^\\*\\*(?:Recuperación|Retrieval):\\*\\*/.test(raw)){
        const match=raw.match(/^\\*\\*(?:Recuperación|Retrieval):\\*\\* (.+?) \\*\\*(?:Respuesta|Answer):\\*\\* (.+)$/);
        assert.ok(match,`${lang}: retrieval source syntax`);
        const question=plainMarkdown(match![1]!);
        const answer=plainMarkdown(match![2]!);
        const questionAt=visible.indexOf(question,cursor);
        const answerAt=visible.indexOf(answer,questionAt+question.length);
        assert.ok(questionAt>=cursor&&answerAt>questionAt,`${lang}: retrieval answer missing or out of order`);
        cursor=answerAt+answer.length;count++;
        continue;
      }
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

test('17 concept-specific mechanisms expose separated retrieval and contextual coupling SVG',()=>{
  for(const lang of ['es','en'] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    assert.equal((html.match(/class="mechanism-retrieval"/g)??[]).length,17);
    assert.ok(html.includes(`/shared/diagrams/PA-S001/coupling-contract-${lang}.svg`));
    assert.ok(diagramMetadata([pages[lang]]).has(`PA-S001/coupling-contract-${lang}.mmd`));
    assert.equal((source(lang).match(/\\*\\*(?:Mecanismo resuelto|Worked mechanism)\\.\\*\\*/g)??[]).length,17);
  }
});

test('all four exercises and eight checkboxes are reversible controls with static fallback',()=>{
  for(const lang of ['es','en'] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    for(const id of [...EXERCISE_IDS,...CHECK_IDS,...SUCCESS_IDS])assert.ok(html.includes(`data-study-id="${id}"`));
    assert.equal((html.match(/data-study-id="PA-S001\.(?:exercise|check)\.[a-z-]+"/g)??[]).length,12);
    assert.equal((html.match(/<input type="checkbox"/g)??[]).length,20);
    assert.equal((html.match(/data-study-id="PA-S001\.success\.[a-z-]+"/g)??[]).length,8);
    assert.ok(!/<input[^>]*\bdisabled\b/.test(html));
    assert.ok(html.includes('class="flashcard-answer"'));
    assert.ok(!/<script(?! type="application\/json")/.test(html));
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
    assert.ok(html.includes(`/${lang}/shared/diagrams/PA-S001/canonical-map-${lang}.svg`));
    assert.ok(html.includes(`/${lang}/shared/diagrams/PA-S001/theory-${lang}-01.svg`));
    assert.ok(html.includes('data-lab-key="sub.ai-product"'));
    assert.ok(html.includes('data-flash-prev')&&html.includes('data-flash-next')&&html.includes('data-flash-flip'));
    assert.ok(html.includes('id="visual-panel-mind-map"')&&html.includes('id="visual-panel-flashcards"'));
  }
  for(const lang of ['es','en'] as const){
    const diagram=readFileSync(resolve(root,`site/shared/diagrams/PA-S001/canonical-map-${lang}.mmd`),'utf8');
    for(const id of [...CONCEPT_IDS,...TOPIC_IDS])assert.ok(diagram.includes(id));
  }
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

test('four bilingual reference experiences render with real controls and fallback',()=>{
  for(const lang of ['es','en'] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    for(const kind of ['conceptual','structural','causal','decisional'])assert.match(html,new RegExp('data-explorer="'+kind+'"'));
    assert.equal((html.match(/class="reference-explorer"/g)??[]).length,4);
    assert.equal((html.match(/class="reference-cases"/g)??[]).length,4);
    assert.ok(html.includes('value="platform"')&&html.includes('data-graph'));
  }
  const script=readFileSync(resolve(root,'site/shared/assets/concept-explorers.js'),'utf8');
  assert.ok(script.includes('addEventListener'));
  assert.ok(script.includes('data-explorer-output'));
});

test('stage 2 bilingual lab specifications cover all four instructional knowledge types',()=>{
  const langs=['es','en'] as const;
  const expected=[
    ['sub.scope-layers','scope'],
    ['sub.boundary-dependencies','dependency'],
    ['sub.quality-constraints','quality'],
    ['sub.ai-product','ai']
  ];
  const stored=langs.map(lang=>JSON.parse(readFileSync(resolve(root,`site/content/learning-labs/PA-S001.${lang}.json`),'utf8')) as {
    session:string;lang:string;labs:Array<{id:string;kind:string;concepts:string[];sources:string[];title:string;objective:string;intro:string;assumption:string;controls:Array<{id:string;label:string;options:string[][]}>;outcomes:Array<{id:string;title:string;cause:string;mechanism:string;effect:string;affected?:string[]}>}>
  });
  for(let index=0;index<stored.length;index++){
    const spec=stored[index]!;
    assert.equal(spec.session,'PA-S001');
    assert.equal(spec.lang,langs[index]);
    assert.deepEqual(spec.labs.map(l=>[l.id,l.kind]),expected);
    for(const lab of spec.labs){
      for(const property of ['title','objective','intro','assumption'] as const)assert.ok(lab[property].length>(property==='title'?8:35),`${spec.lang} ${lab.id}: ${property}`);
      assert.ok(lab.sources.length>0 && lab.concepts.length>0);
      assert.ok(lab.controls.length>0 && lab.outcomes.length>1);
      for(const control of lab.controls){
        assert.ok(control.label.length>0);
        assert.ok(control.options.length>=2);
        assert.equal(new Set(control.options.map(o=>o[0])).size,control.options.length);
      }
      for(const outcome of lab.outcomes){
        assert.ok(outcome.cause.length>0 && outcome.mechanism.length>0 && outcome.effect.length>0);
      }
      assert.equal(new Set(lab.outcomes.map(o=>o.id)).size,lab.outcomes.length);
      assert.ok(lab.concepts.some(id=>CONCEPT_IDS.includes(id as typeof CONCEPT_IDS[number])));
    }
  }
  for(let i=0;i<expected.length;i++){
    const es=stored[0]!.labs[i]!,en=stored[1]!.labs[i]!;
    assert.deepEqual(es.controls.map(c=>[c.id,c.options.map(o=>o[0])]),en.controls.map(c=>[c.id,c.options.map(o=>o[0])]));
    assert.deepEqual(es.outcomes.map(o=>o.id),en.outcomes.map(o=>o.id));
  }
});
test('stage 2 reference explorers are adjacent to canonical source concepts, not only in Studio',()=>{
  const mapping=[
    ['scope.application','conceptual'],
    ['design.coupling','structural'],
    ['quality.attribute','causal'],
    ['aipe.ai-product','decisional']
  ];
  for(const lang of ['es','en'] as const){
    const html=renderCanonical(source(lang),lang,'/').html;
    for(const [id,kind] of mapping){
      const start=html.indexOf(`id="${id}"`);
      const widget=html.indexOf(`data-explorer="${kind}"`,start);
      const next=html.indexOf('class="concept-heading"',start+1);
      assert.ok(start>=0 && widget>start && (next<0 || widget<next),`${lang} ${kind} not adjacent to ${id}`);
    }
  }
});

test('reference rules select the specified outcomes for every input combination',async()=>{
  const modulePath='../shared/assets/concept-explorers.js';
  const {selectOutcome}=await import(modulePath);
  for(const lang of ['es','en'] as const){
    const {labs}=JSON.parse(readFileSync(resolve(root,`site/content/learning-labs/PA-S001.${lang}.json`),'utf8'));
    const expected:Record<string,Record<string,string>>={
      scope:{application:'application',system:'system',platform:'platform',ecosystem:'ecosystem'},
      dependency:{schema:'schema',portfolio:'portfolio'},
      quality:{'static,on':'static-on','static,off':'static-off','client,on':'client-on','client,off':'client-off'},
      ai:{'public,yes,yes':'reviewable','public,yes,no':'unreviewed','public,no,yes':'unverified','public,no,no':'unverified','private,yes,yes':'blocked','private,yes,no':'blocked','private,no,yes':'blocked','private,no,no':'blocked'}
    };
    for(const lab of labs){
      const combinations=lab.controls.reduce((rows:Record<string,string>[],control:{id:string;options:string[][]})=>rows.flatMap(row=>control.options.map(([value])=>({...row,[control.id]:value}))),[{}]);
      for(const values of combinations){
        const key=lab.controls.map((c:{id:string})=>values[c.id]).join(',');
        const outcome=selectOutcome(lab,values);
        assert.equal(outcome.id,expected[lab.kind]![key],`${lang} ${lab.kind} ${key}`);
        for(const field of ['cause','mechanism','effect'])assert.ok(outcome[field]);
      }
      const html=renderCanonical(source(lang),lang,'/').html;
      for(const id of lab.sources)assert.ok(html.includes(`id="source-${id}"`) && html.includes(`href="#source-${id}"`));
      for(const id of lab.concepts)assert.ok(html.includes(`id="${id}"`));
    }
    const structural=labs[1];
    assert.equal('graph' in structural,false);
    assert.ok(structural.outcomes.every((outcome:object)=>!('affected' in outcome)));
    assert.deepEqual(structural.illustrations.map((item:{id:string;steps:string[]})=>[item.id,item.steps.length]),[['schema',4],['portfolio',2]]);
    const html=renderCanonical(source(lang),lang,'/').html;
    for(const illustration of structural.illustrations){
      assert.ok(html.includes(`data-illustration="${illustration.id}"`));
      for(const step of illustration.steps)assert.ok(html.includes(step));
    }
    assert.ok(html.includes('data-limitation'));
    assert.ok(!html.includes('data-possible-review'));
  }
});

test('expanded canonical sources are exact proposals and retain success criteria, examples and references',()=>{
  for(const lang of ['es','en'] as const){
    const text=source(lang),html=renderCanonical(text,lang,'/').html;
    assert.equal(text,readFileSync(resolve(root,`site/content/proposals/PA-S001-stage3-theory-${lang}.md`),'utf8'));
    const criteria=text.split(lang==='es'?'## Criterios de éxito de la sesión':'## End-of-session success criteria')[1]!.split('\n## ')[0]!;
    const items=[...criteria.matchAll(/^- \[ \] (.+)$/gm)].map(m=>m[1]!);
    assert.equal(items.length,8);
    for(let i=0;i<8;i++)assert.ok(html.includes(`data-study-id="${SUCCESS_IDS[i]}"><span>${items[i]}`));
    for(const url of text.matchAll(/\]\((https?:\/\/[^)]+)\)/g))assert.ok(html.includes(`href="${url[1]}"`),`${lang} missing source ${url[1]}`);
    for(const block of text.matchAll(/```[^\n]*\n([\s\S]*?)\n```/g)){
      const code=block[1]!.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
      assert.ok(html.includes(code),`${lang} missing code/diagram`);
    }
  }
});

test('authored text diagrams render as localized SVGs with original text fallback',()=>{
  for(const lang of ['es','en'] as const){
    const text=source(lang),html=renderCanonical(text,lang,'/').html;
    for(let i=1;i<=7;i++){
      const name=`ascii-${lang}-${String(i).padStart(2,'0')}`;
      assert.ok(html.includes(`/shared/diagrams/PA-S001/${name}.svg`));
      assert.ok(readFileSync(resolve(root,`site/shared/diagrams/PA-S001/${name}.mmd`),'utf8').startsWith('flowchart TB\n'));
    }
    assert.equal((html.match(/<code class="language-text">/g)??[]).length,7);
    assert.throws(()=>renderCanonical(text.replace('```text\n','```text\nChanged '),lang,'/'),/Unrecognized .* text diagram/);
  }
});

test('authored list items and table cells survive rendering',()=>{
  for(const lang of ['es','en'] as const){
    const html=visibleHtml(renderCanonical(source(lang),lang,'/').html);
    let inCode=false,checked=0;
    for(const raw of source(lang).split('\n')){
      if(raw.startsWith('```')){inCode=!inCode;continue;}
      if(inCode)continue;
      const parts=raw.startsWith('|')&&!/^\|[-| :]+\|$/.test(raw)?raw.slice(1,-1).split('|'):raw.startsWith('- ')?[raw.slice(2).replace(/^\[ \] /,'')]:/^\d+\. /.test(raw)?[raw.replace(/^\d+\. /,'')]:[];
      for(const part of parts){const value=plainMarkdown(part);if(value.length<3)continue;assert.ok(html.includes(value),`${lang} omitted: ${value.slice(0,100)}`);checked++;}
    }
    assert.ok(checked>100,`${lang}: insufficient list/table coverage`);
  }
});
