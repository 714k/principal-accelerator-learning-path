import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validatePage, assertPair, loadPage } from '../src/content.ts';
import { escapeHtml, renderPage, basePath, sessionsIndex, projectsIndex } from '../src/render.ts';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../../..');
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
test('session prose is rendered as scannable takeaways, bullets, and learner steps',()=>{
  const html=renderPage(es,'/');
  assert.ok(html.includes('class="section-kicker">Main Topic</span>'));
  assert.ok(html.includes('class="reading-lead"'));
  assert.ok(html.includes('class="reading-points"'));
  assert.ok(html.includes('class="reading-steps"'));
  assert.ok(html.includes('Codex los resuelva.'));
});
test('diagram fields require a Mermaid source and render a responsive SVG image',()=>{
  const changed=structuredClone(es); changed.sections[0]!.diagram={source:'PA-S001/example.mmd',title:'Example',description:'Example diagram'};
  assert.doesNotThrow(()=>validatePage(changed));
  assert.throws(()=>validatePage({...changed,sections:[{...changed.sections[0]!,diagram:{source:'PA-S001/example.svg',title:'Example',description:'Example diagram'}},...changed.sections.slice(1)]}),/Invalid section/);
  const html=renderPage(changed,'/accelerator/');
  assert.ok(html.includes('class="session-diagram"'));
  assert.ok(html.includes('src="/accelerator/shared/diagrams/PA-S001/example.svg"'));
  assert.ok(!html.includes('<pre class="diagram">'));
});
test('subpath hosting has prefixed links and assets',()=>{
  const html=renderPage(es,'/accelerator/'); assert.ok(html.includes('href="/accelerator/assets/book.css"'));
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
  assert.ok(html.includes('>☾</button>'));
  assert.ok(html.includes("r.dataset.theme=v;b.textContent=v==='dark'?'☀':'☾'"));
  assert.ok(html.includes('Principal Accelerator<br /><span>LEARNING PATH</span>'));
  assert.ok(sessionsIndex('en','/').includes('PA-S001'));
  assert.ok(projectsIndex('en','/').includes('projects/portfolio/'));
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
  assert.equal(deck.cards.length,10);
  const changed=structuredClone(es);
  changed.visualLearning!.modes[0]!.sourceSections=['unknown-section'];
  assert.throws(()=>validatePage(changed),/Invalid visual learning guide/);
  const missingCoverage=structuredClone(es);
  const recallMode=missingCoverage.visualLearning!.modes.find(mode=>mode.id==='recall-cards')!;
  const recallDeck=recallMode.blocks.find(block=>block.type==='flashcards');
  assert.ok(recallDeck && recallDeck.type==='flashcards');
  recallDeck.cards=recallDeck.cards.filter(card=>!card.sourceSections.includes('fpa'));
  assert.throws(()=>validatePage(missingCoverage),/Flashcards must cover every concept/);
  const missingMentalMap=structuredClone(es);
  const mentalMap=missingMentalMap.visualLearning!.modes.find(mode=>mode.id==='mental-model')!;
  mentalMap.blocks=mentalMap.blocks.filter(block=>block.type!=='diagram');
  assert.throws(()=>validatePage(missingMentalMap),/mental-map diagram must cover every concept/);
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
