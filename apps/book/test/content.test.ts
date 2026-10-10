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
