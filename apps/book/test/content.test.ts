import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validatePage, assertPair, loadPage } from '../src/content.ts';
import { escapeHtml, renderPage, basePath, sessionsIndex } from '../src/render.ts';
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
  assert.ok(sessionsIndex('en','/').includes('PA-S001'));
});
