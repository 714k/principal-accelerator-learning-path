import type { Page } from './content.ts';
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}
export function basePath(raw = '/'): string {
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(raw)) throw new Error('BASE_PATH must be / or /segment/');
  return raw;
}
export function shell(lang: 'es'|'en', title: string, body: string, base: string, other: string): string {
  const es=lang==='es';
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} · Engineering Book</title><link rel="stylesheet" href="${base}assets/book.css"></head><body><a class="skip" href="#main">${es?'Saltar al contenido':'Skip to content'}</a><header><a class="brand" href="${base}${lang}/">VZ <span>ENGINEERING BOOK</span></a><nav aria-label="${es?'Principal':'Main'}"><a href="${base}${lang}/sessions/PA-S001/">PA-S001</a><a href="${base}${lang}/projects/engineering-book/">P0</a><a lang="${es?'en':'es'}" hreflang="${es?'en':'es'}" href="${base}${other}">${es?'English':'Español'}</a></nav></header><main id="main">${body}</main><footer>Principal Accelerator · F0 · ${es?'Evidencia antes que afirmaciones.':'Evidence before claims.'}</footer></body></html>`;
}
export function renderPage(page: Page, base: string): string {
  const es=page.lang==='es';
  const route=page.kind==='session'?'sessions/PA-S001/':'projects/engineering-book/';
  const intro=`<p class="eyebrow">${page.kind==='session'?'F0 / PA-S001':'P0 / ENGINEERING BOOK'}</p><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.description)}</p><p class="notice">${es?'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno':'Editorial draft · Mastery not assessed · No learner measurements'}</p>`;
  const toc=`<nav class="toc" aria-label="${es?'Contenido':'Contents'}">${page.sections.map(s=>`<a href="#${s.id}">${escapeHtml(s.title)}</a>`).join('')}</nav>`;
  const body=page.sections.map(s=>`<section id="${s.id}"><h2>${escapeHtml(s.title)}</h2>${s.paragraphs.map(p=>`<p>${escapeHtml(p).replace(/\[([A-Z][0-9]+)\]/g,'<a href="#ref-$1">[$1]</a>')}</p>`).join('')}</section>`).join('');
  const refs=`<section id="references"><h2>${es?'Fuentes y referencias':'Sources and references'}</h2><ol>${page.references.map(r=>`<li id="ref-${r.id}"><a href="${escapeHtml(r.url)}">[${r.id}] ${escapeHtml(r.title)}</a></li>`).join('')}</ol></section>`;
  return shell(page.lang,page.title,intro+`<div class="layout">${toc}<article>${body}${refs}</article></div>`,base,(es?'en/':'es/')+route);
}
export function home(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<p class="eyebrow">PRINCIPAL ACCELERATOR / 001</p><h1>${es?'Sistemas que se pueden explicar.':'Systems that can be explained.'}</h1><p class="lead">${es?'Arquitectura frontend, productos con IA y decisiones de ingeniería respaldadas por evidencia.':'Frontend architecture, AI products, and engineering decisions supported by evidence.'}</p><div class="cards"><a class="card" href="${base}${lang}/sessions/PA-S001/"><span>01 / THEORY</span><h2>${es?'Fundamentos de ingeniería':'Engineering foundations'}</h2><p>${es?'Responsabilidades, calidad y límites.':'Responsibilities, quality, and boundaries.'}</p></a><a class="card" href="${base}${lang}/projects/engineering-book/"><span>02 / PROJECT</span><h2>Engineering Book</h2><p>${es?'P0: primera porción ejecutable.':'P0: first runnable slice.'}</p></a></div><p class="notice">${es?'Aprendizaje sin evaluar. Las pruebas del scaffold no acreditan dominio del alumno.':'Learning not assessed. Scaffold tests do not establish learner mastery.'}</p>`;
  return shell(lang,'Engineering Book',body,base,es?'en/':'es/');
}
