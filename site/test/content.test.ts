import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validatePage, assertPair, loadPage } from '../tooling/content.ts';
import { escapeHtml, renderPage, basePath, sessionsIndex, projectsIndex, home } from '../tooling/render.ts';
import { generateDiagrams } from '../tooling/diagrams.ts';
import { resolve, dirname } from 'node:path';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, symlinkSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const es=loadPage(resolve(root,'site/es/sessions/PA-S001/page.json'));
const en=loadPage(resolve(root,'site/en/sessions/PA-S001/page.json'));
test('ES/EN have corresponding sections and references',()=>assert.doesNotThrow(()=>assertPair(es,en)));
test('missing source references are rejected',()=>{
  const changed=structuredClone(es); changed.sections[0]!.paragraphs.push('Missing [R999]');
  assert.throws(()=>validatePage(changed),/Missing reference/);
});
test('bilingual structural drift is rejected',()=>{
  const changed=structuredClone(en); changed.sections.pop(); assert.throws(()=>assertPair(es,changed));
});
test('publication status cannot claim completion',()=>assert.throws(()=>validatePage({...es,status:'Completed'})));
test('HTML-shaped content is displayed as text',()=>{
  const changed=structuredClone(es); changed.sections[0]!.paragraphs=['<script>alert(1)</script>'];
  const html=renderPage(changed,'/'); assert.ok(!html.includes('<script>alert(1)</script>')); assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.equal(escapeHtml('"&'), '&quot;&amp;');
});
test('session theory renders as paragraphs with concept-first openings',()=>{
  const html=renderPage(es,'/');
  assert.ok(html.includes('id="main-topic"'));
  assert.ok(html.includes('class="reading-lead"'));
  assert.ok(html.includes('Concepto y alcance:'));
  assert.ok(html.includes('Mecanismo:'));
  assert.ok(html.includes('class="reading-paragraph"'));
});
test('diagram fields require a Mermaid source and render a responsive SVG image',()=>{
  const changed=structuredClone(es); changed.sections[0]!.diagram={source:'PA-S001/example.mmd',title:'Example',description:'Example diagram'};
  assert.doesNotThrow(()=>validatePage(changed));
  assert.throws(()=>validatePage({...changed,sections:[{...changed.sections[0]!,diagram:{source:'PA-S001/example.svg',title:'Example',description:'Example diagram'}},...changed.sections.slice(1)]}),/Invalid section/);
  const html=renderPage(changed,'/accelerator/');
  assert.ok(html.includes('class="session-diagram"'));
  assert.ok(html.includes('src="/accelerator/es/shared/diagrams/PA-S001/example.svg"'));
  assert.ok(!html.includes('<pre class="diagram">'));
});
test('subpath hosting has prefixed links and assets',()=>{
  const html=renderPage(es,'/accelerator/'); assert.ok(html.includes('href="/accelerator/assets/site.css"'));
  assert.ok(html.includes('href="/accelerator/en/sessions/PA-S001/"'));
  assert.throws(()=>basePath('//example.com/')); assert.throws(()=>basePath('/../'));
});
test('session navigation and progressive theme control are present',()=>{
  const html=renderPage(es,'/');
  assert.ok(html.includes('<details class="toc">'));
  assert.ok(html.includes('data-theme-toggle'));
  assert.ok(html.includes('localStorage.setItem'));
  assert.ok(html.includes('href="/es/sessions/"'));
  assert.ok(!html.includes('>Sessions</a>'));
  assert.ok(html.includes('>Light/Dark</button>'));
  assert.ok(html.includes('r.dataset.theme=v'));
  assert.ok(html.includes('>Principal Accelerator Learning Path</a>'));
  assert.ok(html.includes('class="site-sidebar"'));
  assert.ok(html.includes('F0 · Plataforma Accelerator'));
  assert.ok(sessionsIndex('en','/').includes('PA-S001'));
  assert.ok(projectsIndex('en','/').includes('projects/portfolio/'));
});
test('session contents are a vertical semantic list with nested subtopics',()=>{
  for (const page of [es,en]) {
    const toc=renderPage(page,'/').match(/<details class="toc">([\s\S]*?)<\/details>/)?.[1];
    assert.ok(toc);
    assert.ok(toc.includes('<ol class="toc-list">'));
    assert.ok(toc.includes('<ol class="toc-sublist"><li><a href="#c1">'));
    assert.ok(toc.includes('<ol class="toc-sublist"><li><a href="#s1">'));
    assert.equal((toc.match(/<a href="#/g) ?? []).length,page.sections.length);
  }
});
test('project language switching preserves an explicit project route',()=>{
  const html=renderPage(es,'/','projects/portfolio');
  assert.ok(html.includes('href="/en/projects/portfolio/"'));
});
test('visual learning modes are data-driven, paired, and source-linked',()=>{
  assert.equal(es.visualLearning?.modes.length,5);
  assert.deepEqual(es.visualLearning?.modes.map(mode=>mode.id),en.visualLearning?.modes.map(mode=>mode.id));
  const recall=es.visualLearning!.modes.find(mode=>mode.id==='recall-cards')!;
  const deck=recall.blocks.find(block=>block.type==='flashcards');
  assert.ok(deck && deck.type==='flashcards');
  assert.equal(deck.cards.length,9);
  assert.deepEqual(deck.cards.map(card=>card.id),['F01','F02','F03','F04','F05','F06','F07','F08','F09']);
  const changed=structuredClone(es);
  changed.visualLearning!.modes[0]!.sourceSections=['unknown-section'];
  assert.throws(()=>validatePage(changed),/Invalid visual learning guide/);
  const missingCoverage=structuredClone(es);
  const recallMode=missingCoverage.visualLearning!.modes.find(mode=>mode.id==='recall-cards')!;
  const recallDeck=recallMode.blocks.find(block=>block.type==='flashcards');
  assert.ok(recallDeck && recallDeck.type==='flashcards');
  recallDeck.cards=recallDeck.cards.filter(card=>!card.sourceSections.includes('s6'));
  assert.throws(()=>validatePage(missingCoverage),/Flashcards must cover every concept/);
  const missingMentalMap=structuredClone(es);
  const mentalMap=missingMentalMap.visualLearning!.modes.find(mode=>mode.id==='mental-model')!;
  mentalMap.blocks=mentalMap.blocks.filter(block=>block.type!=='diagram');
  assert.throws(()=>validatePage(missingMentalMap),/mental-map diagram must cover every concept/);
});
test('study IDs match across languages and controls are enabled',()=>{
  const ids=(page: typeof es)=>page.sections.flatMap(section=>section.studyItems?.map(item=>item.id) ?? []);
  assert.deepEqual(ids(es),ids(en));
  assert.equal(ids(es).length,13);
  const html=renderPage(es,'/');
  assert.equal((html.match(/data-study-id="PA-S001:/g) ?? []).length,13);
  assert.ok(!/<input[^>]+data-study-id[^>]+disabled/.test(html));
  assert.ok(html.includes('src="/assets/study.js"'));
  const changed=structuredClone(en); changed.sections.find(section=>section.id==='mastery')!.studyItems![0]!.id='PA-S001:mastery:changed';
  assert.throws(()=>assertPair(es,changed),/ES\/EN structure/);
});
test('dashboard separates local study, canonical status, mastery, and artifacts',()=>{
  const html=home('en','/',en,'Not started','not-assessed','Not started');
  for (const id of ['roadmap','study','status','mastery','artifacts','revisit','projects','activity']) assert.ok(html.includes(`id="${id}"`));
  assert.ok(html.includes('Not started'));
  assert.ok(html.includes('Not assessed'));
  assert.ok(html.includes('Overall program status'));
  assert.ok(html.includes('Editorial draft'));
  assert.ok(html.includes('data-study-summary'));
  assert.ok(html.includes('data-study-chart'));
  assert.ok(html.includes(`data-exercise-ids="${en.dashboard!.exerciseIds.join('|')}"`));
  assert.ok(html.includes(`data-criteria-ids="${en.dashboard!.checklistIds.join('|')}"`));
  assert.equal((html.match(/<table class="dashboard-table">/g) ?? []).length,2);
  assert.ok(html.includes('<progress id="study-exercises"'));
  assert.ok(!html.includes('<progress id="study-exercises" data-study-progress="exercise" max="5" value='));
  assert.ok(html.includes('PA-S001 editorial chapter'));
  const spanish=home('es','/accelerator/',es,'Not started','not-assessed','Not started');
  assert.ok(spanish.includes('No iniciado'));
  assert.ok(spanish.includes('href="/accelerator/es/sessions/PA-S001/"'));
  assert.throws(()=>home('en','/',es,'Not started','not-assessed','Not started'),/matching session source/);
});
test('missing Mermaid source fails before publication',()=>{
  assert.throws(()=>generateDiagrams(root,new Map([['PA-S001/missing.mmd',{source:'PA-S001/missing.mmd',title:'Missing',description:'Missing'}]]),'/tmp/pa-missing-diagram-test'),/Diagram source is missing/);
});
test('malformed Mermaid stops SVG publication with an explicit error',()=>{
  const temp=mkdtempSync(resolve(tmpdir(),'pa-mermaid-test-'));
  try {
    mkdirSync(resolve(temp,'site/shared/diagrams/PA-S001'),{recursive:true});
    mkdirSync(resolve(temp,'site/tooling'),{recursive:true});
    mkdirSync(resolve(temp,'node_modules/.bin'),{recursive:true});
    writeFileSync(resolve(temp,'site/shared/diagrams/PA-S001/broken.mmd'),'this is not valid Mermaid :::');
    copyFileSync(resolve(root,'site/tooling/puppeteer.config.json'),resolve(temp,'site/tooling/puppeteer.config.json'));
    symlinkSync(resolve(root,'node_modules/.bin/mmdc'),resolve(temp,'node_modules/.bin/mmdc'));
    assert.throws(()=>generateDiagrams(temp,new Map(),resolve(temp,'generated')),/Mermaid conversion failed for site\/shared\/diagrams\/PA-S001\/broken.mmd/);
  } finally { rmSync(temp,{recursive:true,force:true}); }
});
test('mind map source names all concept/subtopic pairs and central model',()=>{
  const source=readFileSync(resolve(root,'site/shared/diagrams/PA-S001/foundations.mmd'),'utf8');
  for(let i=1;i<=8;i++) assert.ok(source.includes(`C${i} / S${i}`));
  assert.ok(source.includes('Outcome → responsibility'));
  assert.ok(source.includes('Change → verification'));
});
test('visual learning studio supplies static content and progressive tab/recall hooks',()=>{
  const html=renderPage(en,'/');
  assert.ok(html.includes('data-learning-studio'));
  assert.equal((html.match(/<a id="visual-tab-[^"]+" href="#visual-panel-[^"]+" data-mode-control/g) ?? []).length,5);
  assert.ok(html.includes('data-visual-panel'));
  assert.ok(html.includes('role\',\'tablist\''));
  assert.ok(html.includes("e.key==='ArrowRight'"));
  assert.ok(html.includes('aria-selected'));
  assert.ok(html.includes('data-flashcards'));
  assert.ok(html.includes('data-flash-prev'));
  assert.ok(html.includes('data-flash-next'));
  assert.ok(html.includes('data-flash-flip'));
  assert.ok(html.includes('aria-pressed="false"'));
  assert.ok(html.includes("card.classList.toggle('is-flipped',on)"));
  assert.ok(html.includes('Tap to reveal the answer'));
});
