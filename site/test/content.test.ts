import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve, dirname } from 'node:path';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, symlinkSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { loadPage, validatePage, assertPair } from '../tooling/content.ts';
import { assertCanonicalPair, canonicalDiagramSources, renderCanonical, studyIds } from '../tooling/canonical.ts';
import { escapeHtml, renderPage, home, projectsIndex, sessionsIndex } from '../tooling/render.ts';
import { diagramMetadata, generateDiagrams } from '../tooling/diagrams.ts';
import { searchIndex } from '../tooling/search.ts';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const es=loadPage(resolve(root,'site/es/sessions/PA-S001/page.json'));
const en=loadPage(resolve(root,'site/en/sessions/PA-S001/page.json'));
const p0=loadPage(resolve(root,'site/en/projects/p0/page.json'));
const theoryEs=readFileSync(resolve(root,'site/es/sessions/PA-S001/theory.md'),'utf8');
const theoryEn=readFileSync(resolve(root,'site/en/sessions/PA-S001/theory.md'),'utf8');

test('session JSON is metadata only and cannot claim progress or mastery',()=>{
  assert.deepEqual(es.sections,[]); assert.deepEqual(es.references,[]); assert.equal(es.canonicalContent,'theory.md');
  assert.deepEqual(es.dashboard?.exerciseIds,studyIds(theoryEs).exercises);
  assert.deepEqual(es.dashboard?.checklistIds,studyIds(theoryEs).mastery);
  assert.deepEqual(es.dashboard?.successIds,[]); assert.equal(es.dashboard?.studyState,'local-only');
  assert.equal(es.dashboard?.evidenceState,'not-assessed');
  assert.throws(()=>validatePage({...es,canonicalContent:'invented.md'}),/Invalid page metadata/);
  assert.throws(()=>validatePage({...es,status:'Completed'}));
  assert.doesNotThrow(()=>assertPair(es,en));
});

test('canonical ES and EN theory have equivalent hierarchy, study IDs, cards, and diagram coverage',()=>{
  assert.doesNotThrow(()=>assertCanonicalPair(theoryEs,theoryEn));
  const altered=theoryEn.replace('PA-S001:mastery:evidence —','PA-S001:mastery:other —');
  assert.throws(()=>assertCanonicalPair(theoryEs,altered),/checklist IDs/);
  assert.throws(()=>assertCanonicalPair(theoryEs,theoryEn.replace('<!-- concept: scope.application -->','')),/MISSING_ATOMIC_CONCEPT_COVERAGE/);
  assert.throws(()=>assertCanonicalPair(theoryEs,theoryEn.replace('fc.scope.application\n','fc.scope.other\n')),/structural parity/);
  assert.equal(canonicalDiagramSources(theoryEs).length,6);
  assert.equal(canonicalDiagramSources(theoryEn).length,6);
});

test('canonical renderer publishes the whole chapter with linked sources and safe stable controls',()=>{
  const rendered=renderCanonical(theoryEs,'es','/accelerator/').html;
  for(const text of ['Learning Preview','Staff → Principal Software Engineering','Frontend Platform Architecture (FPA)','AI Product Engineering (AIPE)','Cross-Domain Synthesis','Main Topic','1. Ingeniería de software','Subtopic 6 · Alcance Staff y Principal','Real-World Example','Production-Ready Example','Knowledge Mastery Checklist','Bridge → PA-S002']) assert.ok(rendered.includes(text),`missing ${text}`);
  assert.equal((rendered.match(/data-study-id="PA-S001:exercise:[a-z-]+"/g)??[]).length,6);
  assert.equal((rendered.match(/data-study-id="PA-S001:mastery:[a-z-]+"/g)??[]).length,6);
  assert.ok(rendered.includes('href="#reference-1"'));
  for(let n=1;n<=12;n++)assert.ok(rendered.includes(`id="reference-${n}"`));
  assert.ok(rendered.includes('href="https://www.iso.org/standard/74393.html"'));
  assert.ok(rendered.includes('/accelerator/es/shared/diagrams/PA-S001/theory-es-06.svg'));
  assert.ok(!rendered.includes('flowchart LR'));
  assert.ok(!rendered.includes('<script>alert'));
});

test('rendered theory retains every authored prose and code line in both locales',()=>{
  for(const [source,lang] of [[theoryEs,'es'],[theoryEn,'en']] as const){
    const rendered=renderCanonical(source,lang,'/').html
      .replace(/<[^>]*>/g,' ')
      .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'")
      .replace(/\s+/g,' ').replace(/(\[S\d+\])\s+(?=\[S\d+\])/g,'$1').replace(/\s+([.,;:])/g,'$1');
    let inDiagram=false;
    const ignored=new Set(['ID estable','Stable ID','Frente','Front','Reverso (respuesta + por qué)','Back (answer and explanation)','Sección fuente','Source section']);
    const missing:string[]=[];
    for(const raw of source.split(/\r?\n/)){
      const line=raw.trim();
      if(!line){inDiagram=false;continue;}
      if(/^(flowchart|mindmap|sequenceDiagram|graph)\b/.test(line))inDiagram=true;
      if(inDiagram||line.startsWith('<!--')||ignored.has(line))continue;
      if(!rendered.includes(line.replace(/\s+/g,' ')))missing.push(line);
    }
    assert.deepEqual(missing,[],`${lang} source lines lost during rendering`);
  }
});

test('Visual Learning Studio has the same three modes, 25 cards, coverage, and static fallback in both languages',()=>{
  const esHtml=renderCanonical(theoryEs,'es','/').html; const enHtml=renderCanonical(theoryEn,'en','/').html;
  const modes=(html:string)=>[...html.matchAll(/id="visual-tab-([a-z-]+)"/g)].map(match=>match[1]);
  assert.deepEqual(modes(esHtml),['mind-map','flashcards','scope-matrix']); assert.deepEqual(modes(esHtml),modes(enHtml));
  for(const html of [esHtml,enHtml]){
    assert.equal((html.match(/data-flash-id="fc\.[a-z0-9.-]+"/g)??[]).length,25);
    assert.ok(html.includes('data-source-sections="Main Topic"'));
    assert.ok(html.includes('data-flash-prev')); assert.ok(html.includes('data-flash-next')); assert.ok(html.includes('data-flash-flip'));
    assert.ok(html.includes('<table>'));
    assert.ok(!html.includes('[hidden]'));
  }
});

test('search indexes link to rendered canonical anchors, not retired JSON sections',()=>{
  const entries=searchIndex('en','/accelerator/',[{route:'sessions/PA-S001',page:en},{route:'projects/p0',page:p0}],theoryEn);
  const main=entries.find(entry=>entry.href==='/accelerator/en/sessions/PA-S001/#main-topic');
  assert.ok(main); assert.ok(main.text.includes('architecture'));
  assert.ok(entries.some(entry=>entry.href==='/accelerator/en/sessions/PA-S001/#knowledge-mastery-checklist'));
  assert.ok(entries.some(entry=>entry.href==='/accelerator/en/projects/p0/#theory'));
  assert.throws(()=>searchIndex('es','/',[{route:'sessions/PA-S001',page:en}],theoryEn),/language mismatch/);
});

test('session route uses canonical theory, stable study controls, accessible diagrams, and updated TOC',()=>{
  const html=renderPage(en,'/','sessions/PA-S001',theoryEn);
  assert.ok(html.includes('id="main-topic"')); assert.ok(html.includes('id="knowledge-mastery-checklist"'));
  assert.ok(html.includes('visual-tab-scope-matrix')); assert.ok(html.includes('data-flash-id="fc.main"'));
  assert.ok(html.includes('data-study-id="PA-S001:exercise:teach-back"')); assert.ok(html.includes('data-study-id="PA-S001:mastery:evidence"'));
  assert.ok(html.includes('alt="Mind map of 24 concepts, six subtopics, Main Topic, and cross-domain synthesis"'));
  assert.ok(html.includes('src="/assets/study.js"')); assert.ok(!html.includes('flowchart LR'));
  assert.ok(html.includes('id="reference-5"'));
  const spanish=renderPage(es,'/accelerator/','sessions/PA-S001',theoryEs);
  assert.ok(spanish.includes('href="/accelerator/en/sessions/PA-S001/"'));
  assert.ok(spanish.includes('id="reference-1"'));
});

test('dashboard counts only the actual study items and keeps mastery/evidence separate',()=>{
  const html=home('en','/',en,'Not started','not-assessed','Not started');
  for(const id of ['roadmap','study','signals','status','mastery','artifacts','revisit','projects','activity'])assert.ok(html.includes(`id="${id}"`));
  assert.ok(html.includes(`data-exercise-ids="${en.dashboard!.exerciseIds.join('|')}"`));
  assert.ok(html.includes(`data-criteria-ids="${en.dashboard!.checklistIds.join('|')}"`));
  assert.ok(html.includes('max="6"')); assert.ok(html.includes('Not assessed'));
  assert.ok(!html.includes('success criteria')); assert.ok(html.includes('data/mastery/PA-S001.json'));
});

test('global indexes, project rendering, and escaping remain available',()=>{
  assert.ok(sessionsIndex('en','/').includes('PA-S001'));
  assert.ok(projectsIndex('en','/').includes('projects/portfolio/'));
  assert.ok(renderPage(p0,'/','projects/p0').includes(p0.title));
  assert.equal(escapeHtml('"&'), '&quot;&amp;');
  assert.ok(!renderPage(p0,'/','projects/p0').includes('<script>alert(1)</script>'));
});

test('Mermaid registry provides localized accessible mind-map metadata',()=>{
  const data=diagramMetadata([es]); const mindMap=data.get('PA-S001/theory-es-06.mmd');
  assert.ok(mindMap?.title.includes('PA-S001')); assert.ok(mindMap?.description.includes('24 conceptos'));
  const source=readFileSync(resolve(root,'site/shared/diagrams/PA-S001/theory-es-06.mmd'),'utf8');
  assert.ok(source.includes('Cross-domain synthesis'));
});

test('missing Mermaid source fails before publication',()=>{
  assert.throws(()=>generateDiagrams(root,new Map([['PA-S001/missing.mmd',{source:'PA-S001/missing.mmd',title:'Missing',description:'Missing'}]]),'/tmp/pa-missing-diagram-test'),/Diagram source is missing/);
});

test('malformed Mermaid stops SVG publication with an explicit error',()=>{
  const temp=mkdtempSync(resolve(tmpdir(),'pa-mermaid-test-'));
  try{
    mkdirSync(resolve(temp,'site/shared/diagrams/PA-S001'),{recursive:true});mkdirSync(resolve(temp,'site/tooling'),{recursive:true});mkdirSync(resolve(temp,'node_modules/.bin'),{recursive:true});
    writeFileSync(resolve(temp,'site/shared/diagrams/PA-S001/broken.mmd'),'this is not valid Mermaid :::');
    copyFileSync(resolve(root,'site/tooling/puppeteer.config.json'),resolve(temp,'site/tooling/puppeteer.config.json'));
    symlinkSync(resolve(root,'node_modules/.bin/mmdc'),resolve(temp,'node_modules/.bin/mmdc'));
    assert.throws(()=>generateDiagrams(temp,new Map(),resolve(temp,'generated')),/Mermaid conversion failed for site\/shared\/diagrams\/PA-S001\/broken.mmd/);
  }finally{rmSync(temp,{recursive:true,force:true});}
});
