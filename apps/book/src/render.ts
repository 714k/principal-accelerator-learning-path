import type { Page } from './content.ts';
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}
export function basePath(raw = '/'): string {
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(raw)) throw new Error('BASE_PATH must be / or /segment/');
  return raw;
}
function themeControl(): string {
  return '<button class="theme-toggle" type="button" aria-label="Switch to dark theme" aria-pressed="false" data-theme-toggle>☾</button>';
}
function themeScript(): string {
  return `<script>(()=>{const r=document.documentElement,b=document.querySelector('[data-theme-toggle]');if(!b)return;let t;try{t=localStorage.getItem('pa-theme')}catch{}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';const set=(v,p)=>{r.dataset.theme=v;b.textContent=v==='dark'?'☀':'☾';b.setAttribute('aria-pressed',String(v==='dark'));b.setAttribute('aria-label',v==='dark'?'Switch to light theme':'Switch to dark theme');if(p)try{localStorage.setItem('pa-theme',v)}catch{}};set(t,false);b.addEventListener('click',()=>set(r.dataset.theme==='dark'?'light':'dark',true))})()</script>`;
}
export function shell(lang: 'es'|'en', title: string, body: string, base: string, other: string): string {
  const es=lang==='es';
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} · Principal Accelerator Learning Path</title><link rel="stylesheet" href="${base}assets/book.css"></head><body><a class="skip" href="#main">${es?'Saltar al contenido':'Skip to content'}</a><header><a class="brand" href="${base}${lang}/">Principal Accelerator<br /><span>LEARNING PATH</span></a><nav aria-label="${es?'Principal':'Main'}"><a lang="${es?'en':'es'}" hreflang="${es?'en':'es'}" href="${base}${other}">${es?'en':'es'}</a>${themeControl()}</nav></header><main id="main">${body}</main><footer>Principal Accelerator · F0 · ${es?'Evidencia antes que afirmaciones.':'Evidence before claims.'}</footer>${themeScript()}</body></html>`;
}
function inlineReferences(value: string): string {
  return escapeHtml(value).replace(/\[([A-Z][0-9]+)\]/g,'<a href="#ref-$1">[$1]</a>');
}
export function renderPage(page: Page, base: string): string {
  const es=page.lang==='es';
  const route=page.kind==='session'?'sessions/PA-S001/':'projects/p0/';
  const crumb=page.kind==='session'
    ? `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${page.lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><a href="${base}${page.lang}/sessions/">${es?'Sesiones':'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S001</span></nav>`
    : `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${page.lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><a href="${base}${page.lang}/projects/">${es?'Proyectos':'Projects'}</a><span aria-hidden="true">/</span><span>P0</span></nav>`;
  const intro=`${crumb}<p class="eyebrow">${page.kind==='session'?'F0 / PA-S001':'P0 / PORTFOLIO + LEARNING SITE'}</p><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.description)}</p><p class="notice">${es?'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno':'Editorial draft · Mastery not assessed · No learner measurements'}</p>`;
  const toc=`<details class="toc"><summary>${es?'Contenido':'Contents'}</summary><nav aria-label="${es?'Contenido':'Contents'}">${page.sections.map(s=>`<a href="#${s.id}">${escapeHtml(s.title)}</a>`).join('')}</nav></details>`;
  const body=page.sections.map(s=>{
    const heading=s.level===3?'h3':'h2';
    const table=s.table?`<div class="scroll"><table><thead><tr>${s.table.headers.map(h=>`<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(row=>`<tr>${row.map(cell=>`<td>${inlineReferences(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
    const diagram=s.diagram?`<figure><pre class="diagram">${escapeHtml(s.diagram.text)}</pre><figcaption>${escapeHtml(s.diagram.description)}</figcaption></figure>`:'';
    const code=s.code?`<pre class="code"><code>${escapeHtml(s.code)}</code></pre>`:'';
    const checklist=s.checklist?`<ul class="checklist">${s.checklist.map(item=>`<li><input type="checkbox" disabled> ${escapeHtml(item)}</li>`).join('')}</ul>`:'';
    return `<section id="${s.id}"><${heading}>${escapeHtml(s.title)}</${heading}>${s.paragraphs.map(p=>`<p>${inlineReferences(p)}</p>`).join('')}${table}${diagram}${code}${checklist}</section>`;
  }).join('');
  const refs=`<section id="references"><h2>${es?'Fuentes y referencias':'Sources and references'}</h2><ol>${page.references.map(r=>`<li id="ref-${r.id}"><a href="${escapeHtml(r.url)}">[${r.id}] ${escapeHtml(r.title)}</a></li>`).join('')}</ol></section>`;
  return shell(page.lang,page.title,intro+`<div class="layout">${toc}<article>${body}${refs}</article></div>`,base,(es?'en/':'es/')+route);
}
export function home(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<p class="eyebrow">PRINCIPAL ACCELERATOR / 001</p><h1>${es?'Sistemas que se pueden explicar.':'Systems that can be explained.'}</h1><p class="lead">${es?'Arquitectura frontend, productos con IA y decisiones de ingeniería respaldadas por evidencia.':'Frontend architecture, AI products, and engineering decisions supported by evidence.'}</p><div class="cards"><a class="card" href="${base}${lang}/sessions/"><span>01 / INDEX</span><h2>${es?'Sesiones':'Sessions'}</h2><p>${es?'Índice de sesiones publicadas y sus capítulos.':'Index of published sessions and their chapters.'}</p></a><a class="card" href="${base}${lang}/projects/"><span>02 / INDEX</span><h2>${es?'Proyectos':'Projects'}</h2><p>${es?'Índice de productos y su evidencia pública.':'Index of products and their public evidence.'}</p></a></div><p class="notice">${es?'Aprendizaje sin evaluar. Las pruebas del scaffold no acreditan dominio del alumno.':'Learning not assessed. Scaffold tests do not establish learner mastery.'}</p>`;
  return shell(lang,'Principal Accelerator Learning Path',body,base,es?'en/':'es/');
}
export function sessionsIndex(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><span>${es?'Sesiones':'Sessions'}</span></nav><p class="eyebrow">F0</p><h1>${es?'Sesiones':'Sessions'}</h1><p class="lead">${es?'Índice publicable de sesiones disponibles.':'Publishable index of available sessions.'}</p><div class="cards"><a class="card" href="${base}${lang}/sessions/PA-S001/"><span>PA-S001</span><h2>${es?'Fundamentos de ingeniería':'Engineering foundations'}</h2><p>${es?'Borrador editorial bilingüe; evidencia de dominio pendiente.':'Bilingual editorial draft; mastery evidence pending.'}</p></a></div>`;
  return shell(lang,es?'Sesiones':'Sessions',body,base,es?'en/sessions/':'es/sessions/');
}
export function projectsIndex(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><span>${es?'Proyectos':'Projects'}</span></nav><p class="eyebrow">P0</p><h1>${es?'Proyectos':'Projects'}</h1><p class="lead">${es?'Índice publicable de productos del Accelerator.':'Publishable index of Accelerator products.'}</p><div class="cards"><a class="card" href="${base}${lang}/projects/p0/"><span>P0</span><h2>${es?'Portafolio + Learning Site':'Portfolio + Learning Site'}</h2><p>${es?'Dos productos públicos con responsabilidades separadas.':'Two public products with distinct responsibilities.'}</p></a></div>`;
  return shell(lang,es?'Proyectos':'Projects',body,base,es?'en/projects/':'es/projects/');
}
