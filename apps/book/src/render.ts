import type { Page } from './content.ts';
import { outputForDiagram } from './diagrams.ts';
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
function learningStudioScript(): string {
  return `<script>(()=>{for(const s of document.querySelectorAll('[data-learning-studio]')){const c=[...s.querySelectorAll('[data-mode-control]')],p=[...s.querySelectorAll('[data-visual-panel]')];if(!c.length||c.length!==p.length)continue;s.dataset.enhanced='true';s.querySelector('[data-mode-nav]')?.setAttribute('role','tablist');const set=(i,focus)=>{c.forEach((x,n)=>{x.setAttribute('role','tab');x.setAttribute('aria-selected',String(n===i));x.setAttribute('tabindex',n===i?'0':'-1');x.classList.toggle('is-active',n===i);x.setAttribute('aria-controls',p[n].id);p[n].setAttribute('role','tabpanel');p[n].setAttribute('aria-labelledby',x.id);p[n].hidden=n!==i});if(focus)c[i].focus()};c.forEach((x,i)=>{x.addEventListener('click',e=>{e.preventDefault();set(i,false)});x.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%c.length;else if(e.key==='ArrowLeft')n=(i+c.length-1)%c.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=c.length-1;else return;e.preventDefault();set(n,true)})});set(0,false)}for(const d of document.querySelectorAll('[data-flashcards]')){const c=[...d.querySelectorAll('[data-flashcard]')],n=d.querySelector('[data-flashcard-count]');if(!c.length)continue;let i=0;d.dataset.enhanced='true';const flip=(card,on)=>{const button=card.querySelector('[data-flash-flip]');card.classList.toggle('is-flipped',on);button?.setAttribute('aria-pressed',String(on));if(button)button.setAttribute('aria-label',on?button.dataset.hideLabel:button.dataset.revealLabel)};const set=x=>{i=(x+c.length)%c.length;c.forEach((card,k)=>{card.hidden=k!==i;flip(card,false)});if(n)n.textContent=(i+1)+' / '+c.length};d.querySelectorAll('[data-flash-flip]').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('[data-flashcard]');if(card)flip(card,!card.classList.contains('is-flipped'))}));d.querySelector('[data-flash-prev]')?.addEventListener('click',()=>set(i-1));d.querySelector('[data-flash-next]')?.addEventListener('click',()=>set(i+1));d.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();set(i-1)}if(e.key==='ArrowRight'){e.preventDefault();set(i+1)}});set(0)}})()</script>`;
}
export function shell(lang: 'es'|'en', title: string, body: string, base: string, other: string): string {
  const es=lang==='es';
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} · Principal Accelerator Learning Path</title><link rel="stylesheet" href="${base}assets/book.css"></head><body><a class="skip" href="#main">${es?'Saltar al contenido':'Skip to content'}</a><header><a class="brand" href="${base}${lang}/">Principal Accelerator<br /><span>LEARNING PATH</span></a><nav aria-label="${es?'Principal':'Main'}"><a lang="${es?'en':'es'}" hreflang="${es?'en':'es'}" href="${base}${other}">${es?'en':'es'}</a>${themeControl()}</nav></header><main id="main">${body}</main><footer>Principal Accelerator · F0 · ${es?'Evidencia antes que afirmaciones.':'Evidence before claims.'}</footer>${themeScript()}${learningStudioScript()}</body></html>`;
}
function inlineReferences(value: string): string {
  return escapeHtml(value).replace(/\[([A-Z][0-9]+)\]/g,'<a href="#ref-$1">[$1]</a>');
}
function renderTable(table: { headers: string[]; rows: string[][] }): string {
  return `<div class="scroll"><table><thead><tr>${table.headers.map(h=>`<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map(cell=>`<td>${inlineReferences(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function splitSentences(value: string): string[] {
  return value.trim().split(/(?<=[.!?])\s+(?=[¿¡“"']?[A-ZÁÉÍÓÚÜÑ0-9])/u).filter(Boolean);
}
function splitNumberedItems(value: string): string[] {
  const matches=[...value.matchAll(/(?:^|\s)(\d+)\.\s+/g)];
  if (matches.length<2) return [];
  return matches.map((match,index)=>value.slice(match.index!+match[0].indexOf(`${match[1]}.`)+`${match[1]}.`.length, matches[index+1]?.index ?? value.length).trim()).filter(Boolean);
}
function renderNarrative(value: string, position: number): string {
  const numbered=splitNumberedItems(value);
  if (numbered.length) return `<ol class="reading-steps">${numbered.map(item=>`<li>${inlineReferences(item)}</li>`).join('')}</ol>`;
  const sentences=splitSentences(value);
  if (sentences.length<2) return `<p>${inlineReferences(value)}</p>`;
  const [takeaway,...points]=sentences;
  return `<div class="reading-unit"><p class="${position===0?'reading-lead':'reading-sentence'}">${inlineReferences(takeaway!)}</p><ul class="reading-points">${points.map(point=>`<li>${inlineReferences(point)}</li>`).join('')}</ul></div>`;
}
function renderSectionHeading(title: string, level: number): string {
  const tag=`h${level}`;
  const separator=' — ';
  const splitAt=title.indexOf(separator);
  if (splitAt===-1) return `<${tag} class="section-heading">${escapeHtml(title)}</${tag}>`;
  const kicker=title.slice(0,splitAt);
  const heading=title.slice(splitAt+separator.length);
  return `<${tag} class="section-heading"><span class="section-kicker">${escapeHtml(kicker)}</span><span>${escapeHtml(heading)}</span></${tag}>`;
}
function renderDiagram(diagram: { source: string; description: string }, base: string): string {
  return `<figure class="diagram-card"><img class="session-diagram" src="${base}${outputForDiagram(diagram.source)}" alt="${escapeHtml(diagram.description)}"><figcaption>${escapeHtml(diagram.description)}</figcaption></figure>`;
}
function renderVisualLearning(page: Page, base: string): string {
  if (!page.visualLearning) return '';
  const es=page.lang==='es';
  const guide=page.visualLearning;
  const renderBlock=(value: typeof guide.modes[number]['blocks'][number], modeNumber: number): string => {
    if (value.type==='cards') return `<div class="studio-cards">${value.cards.map(card=>`<article class="studio-card">${card.eyebrow?`<p class="eyebrow">${escapeHtml(card.eyebrow)}</p>`:''}<h4>${escapeHtml(card.title)}</h4><p>${inlineReferences(card.body)}</p></article>`).join('')}</div>`;
    if (value.type==='diagram') return renderDiagram(value.diagram,base);
    if (value.type==='comparison') return renderTable(value.table);
    if (value.type==='flow') return `<ol class="studio-flow">${value.steps.map((step,index)=>`<li><span class="flow-index">${String(index+1).padStart(2,'0')}</span><div><h4>${escapeHtml(step.title)}</h4><p>${inlineReferences(step.body)}</p></div></li>`).join('')}</ol>`;
    const reveal=es?'Mostrar respuesta':'Reveal answer';
    const hide=es?'Mostrar pregunta':'Show question';
    return `<div class="flashcard-deck" data-flashcards tabindex="0" aria-label="${es?'Tarjetas de repaso':'Recall cards'}"><p class="flashcard-mode">${es?'MODO':'MODE'} ${modeNumber} ${es?'DE':'OF'} ${guide.modes.length}</p><div class="flashcard-controls"><button type="button" data-flash-prev>${es?'Anterior':'Previous'}</button><span aria-live="polite" data-flashcard-count></span><button type="button" data-flash-next>${es?'Siguiente':'Next'}</button></div>${value.cards.map(card=>`<article class="flashcard" data-flashcard><button class="flashcard-flip" type="button" data-flash-flip aria-pressed="false" data-reveal-label="${escapeHtml(`${reveal}: ${card.question}`)}" data-hide-label="${escapeHtml(`${hide}: ${card.question}`)}" aria-label="${escapeHtml(`${reveal}: ${card.question}`)}"><span class="flashcard-inner"><span class="flashcard-face flashcard-question"><span class="eyebrow">${escapeHtml(card.category)}</span><strong>${escapeHtml(card.question)}</strong><span class="flashcard-prompt">${es?'Toca para revelar la respuesta':'Tap to reveal the answer'}</span></span><span class="flashcard-face flashcard-answer"><span class="eyebrow">${es?'RESPUESTA':'ANSWER'}</span><strong>${inlineReferences(card.answer)}</strong><span class="flashcard-explanation">${inlineReferences(card.explanation)}</span></span></span></button></article>`).join('')}</div>`;
  };
  return `<div class="learning-studio" data-learning-studio><div class="studio-intro"><p class="eyebrow">${es?'ESTUDIO VISUAL':'VISUAL STUDIO'}</p><p>${inlineReferences(guide.intro)}</p></div><nav class="visual-mode-nav" data-mode-nav aria-label="${es?'Modos de aprendizaje':'Learning modes'}">${guide.modes.map((mode,index)=>`<a id="visual-tab-${mode.id}" href="#visual-panel-${mode.id}" data-mode-control class="${index===0?'is-active':''}">${escapeHtml(mode.label)}</a>`).join('')}</nav>${guide.modes.map((mode,index)=>`<div class="visual-mode-panel" id="visual-panel-${mode.id}" data-visual-panel><details class="visual-mode" open><summary>${escapeHtml(mode.label)}</summary><div class="visual-mode-content"><p class="eyebrow">${escapeHtml(mode.kind)}</p><h3>${escapeHtml(mode.title)}</h3><p class="studio-rationale">${inlineReferences(mode.rationale)}</p><p class="studio-sources">${es?'Derivado de':'Derived from'} ${mode.sourceSections.map(id=>`<a href="#${id}">#${escapeHtml(id)}</a>`).join(', ')}</p>${mode.blocks.map(block=>renderBlock(block,index+1)).join('')}</div></details></div>`).join('')}</div>`;
}
export function renderPage(page: Page, base: string, route = page.kind==='session'?'sessions/PA-S001':'projects/p0'): string {
  const es=page.lang==='es';
  const crumb=page.kind==='session'
    ? `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${page.lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><a href="${base}${page.lang}/sessions/">${es?'Sesiones':'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S001</span></nav>`
    : `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${page.lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><a href="${base}${page.lang}/projects/">${es?'Proyectos':'Projects'}</a><span aria-hidden="true">/</span><span>P0</span></nav>`;
  const intro=`${crumb}<div class="page-intro"><p class="eyebrow">${page.kind==='session'?'F0 / PA-S001':'P0 / PORTFOLIO + LEARNING SITE'}</p><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.description)}</p><p class="notice">${es?'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno':'Editorial draft · Mastery not assessed · No learner measurements'}</p></div>`;
  const toc=`<details class="toc"><summary>${es?'Contenido':'Contents'}</summary><nav aria-label="${es?'Contenido':'Contents'}">${page.sections.map(s=>`<a href="#${s.id}">${escapeHtml(s.title)}</a>`).join('')}</nav></details>`;
  const body=page.sections.map(s=>{
    const heading=s.level===3?3:2;
    const table=s.table?renderTable(s.table):'';
    const diagram=s.diagram?renderDiagram(s.diagram,base):'';
    const code=s.code?`<pre class="code"><code>${escapeHtml(s.code)}</code></pre>`:'';
    const checklist=s.checklist?`<ul class="checklist">${s.checklist.map(item=>`<li><input type="checkbox" disabled> ${escapeHtml(item)}</li>`).join('')}</ul>`:'';
    const visual=s.id==='visual-learning-guide'?renderVisualLearning(page,base):'';
    return `<section id="${s.id}">${renderSectionHeading(s.title,heading)}${s.paragraphs.map((p,index)=>renderNarrative(p,index)).join('')}${table}${diagram}${code}${checklist}${visual}</section>`;
  }).join('');
  const refs=`<section id="references"><h2>${es?'Fuentes y referencias':'Sources and references'}</h2><ol>${page.references.map(r=>`<li id="ref-${r.id}"><a href="${escapeHtml(r.url)}">[${r.id}] ${escapeHtml(r.title)}</a></li>`).join('')}</ol></section>`;
  return shell(page.lang,page.title,intro+`<div class="layout">${toc}<article>${body}${refs}</article></div>`,base,(es?'en/':'es/')+`${route}/`);
}
export function home(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<div class="home-hero"><p class="eyebrow">PRINCIPAL ACCELERATOR / 001</p><h1>${es?'Sistemas que se pueden explicar.':'Systems that can be explained.'}</h1><p class="lead">${es?'Arquitectura frontend, productos con IA y decisiones de ingeniería respaldadas por evidencia.':'Frontend architecture, AI products, and engineering decisions supported by evidence.'}</p></div><div class="cards"><a class="card" href="${base}${lang}/sessions/"><span>01 / INDEX</span><h2>${es?'Sesiones':'Sessions'}</h2><p>${es?'Índice de sesiones publicadas y sus capítulos.':'Index of published sessions and their chapters.'}</p></a><a class="card" href="${base}${lang}/projects/"><span>02 / INDEX</span><h2>${es?'Proyectos':'Projects'}</h2><p>${es?'Índice de productos y su evidencia pública.':'Index of products and their public evidence.'}</p></a></div><p class="notice">${es?'Aprendizaje sin evaluar. Las pruebas del scaffold no acreditan dominio del alumno.':'Learning not assessed. Scaffold tests do not establish learner mastery.'}</p>`;
  return shell(lang,'Principal Accelerator Learning Path',body,base,es?'en/':'es/');
}
export function sessionsIndex(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><span>${es?'Sesiones':'Sessions'}</span></nav><p class="eyebrow">F0</p><h1>${es?'Sesiones':'Sessions'}</h1><p class="lead">${es?'Índice publicable de sesiones disponibles.':'Publishable index of available sessions.'}</p><div class="cards"><a class="card" href="${base}${lang}/sessions/PA-S001/"><span>PA-S001</span><h2>${es?'Fundamentos de ingeniería':'Engineering foundations'}</h2><p>${es?'Borrador editorial bilingüe; evidencia de dominio pendiente.':'Bilingual editorial draft; mastery evidence pending.'}</p></a></div>`;
  return shell(lang,es?'Sesiones':'Sessions',body,base,es?'en/sessions/':'es/sessions/');
}
export function projectsIndex(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><span>${es?'Proyectos':'Projects'}</span></nav><p class="eyebrow">P0</p><h1>${es?'Proyectos':'Projects'}</h1><p class="lead">${es?'Índice publicable de productos del Accelerator.':'Publishable index of Accelerator products.'}</p><div class="cards"><a class="card" href="${base}${lang}/projects/portfolio/"><span>P0 / PORTFOLIO</span><h2>${es?'Portafolio profesional':'Professional portfolio'}</h2><p>${es?'Superficie profesional separada; detalles pendientes de revisión del learner.':'A separate professional surface; details await learner review.'}</p></a></div>`;
  return shell(lang,es?'Proyectos':'Projects',body,base,es?'en/projects/':'es/projects/');
}
