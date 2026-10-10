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
  return '<button class="theme-toggle" type="button" aria-label="Light/Dark" aria-pressed="false" data-theme-toggle>Light/Dark</button>';
}
function themeScript(): string {
  return `<script>(()=>{const r=document.documentElement,b=document.querySelector('[data-theme-toggle]');if(!b)return;let t;try{t=localStorage.getItem('pa-theme')}catch{}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';const set=(v,p)=>{r.dataset.theme=v;b.setAttribute('aria-pressed',String(v==='dark'));if(p)try{localStorage.setItem('pa-theme',v)}catch{}};set(t,false);b.addEventListener('click',()=>set(r.dataset.theme==='dark'?'light':'dark',true))})()</script>`;
}
function globalNav(lang: 'es'|'en', base: string): string {
  const es=lang==='es';
  return `<nav class="curriculum" aria-label="${es?'Navegación del programa':'Program navigation'}"><p class="nav-label">${es?'Destinos':'Destinations'}</p><a href="${base}${lang}/">${es?'Panel de aprendizaje':'Learning dashboard'}</a><a href="${base}${lang}/sessions/">${es?'Sesiones':'Sessions'}</a><a href="${base}${lang}/projects/">${es?'Proyectos y sistemas':'Projects and systems'}</a><p class="nav-label">F0 · ${es?'Plataforma Accelerator':'Accelerator platform'}</p><a href="${base}${lang}/sessions/PA-S001/">PA-S001 · ${es?'Fundamentos':'Foundations'}</a><p class="nav-label">F1–F5</p><p class="nav-empty">${es?'Sesiones aún no publicadas':'Sessions not yet published'}</p><p class="nav-label">P0 · ${es?'Proyectos y sistemas':'Projects and systems'}</p><a href="${base}${lang}/projects/engineering-book/">Engineering Book</a><a href="${base}${lang}/projects/portfolio/">${es?'Portafolio':'Portfolio'}</a><a href="${base}portfolio/">${es?'Portafolio público':'Public portfolio'}</a></nav>`;
}
function learningStudioScript(): string {
  return `<script>(()=>{for(const s of document.querySelectorAll('[data-learning-studio]')){const c=[...s.querySelectorAll('[data-mode-control]')],p=[...s.querySelectorAll('[data-visual-panel]')];if(!c.length||c.length!==p.length)continue;s.dataset.enhanced='true';s.querySelector('[data-mode-nav]')?.setAttribute('role','tablist');const set=(i,focus)=>{c.forEach((x,n)=>{x.setAttribute('role','tab');x.setAttribute('aria-selected',String(n===i));x.setAttribute('tabindex',n===i?'0':'-1');x.classList.toggle('is-active',n===i);x.setAttribute('aria-controls',p[n].id);p[n].setAttribute('role','tabpanel');p[n].setAttribute('aria-labelledby',x.id);p[n].hidden=n!==i});if(focus)c[i].focus()};c.forEach((x,i)=>{x.addEventListener('click',e=>{e.preventDefault();set(i,false)});x.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowRight')n=(i+1)%c.length;else if(e.key==='ArrowLeft')n=(i+c.length-1)%c.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=c.length-1;else return;e.preventDefault();set(n,true)})});set(0,false)}for(const d of document.querySelectorAll('[data-flashcards]')){const c=[...d.querySelectorAll('[data-flashcard]')],n=d.querySelector('[data-flashcard-count]');if(!c.length)continue;let i=0;d.dataset.enhanced='true';const flip=(card,on)=>{const button=card.querySelector('[data-flash-flip]');card.classList.toggle('is-flipped',on);button?.setAttribute('aria-pressed',String(on));if(button)button.setAttribute('aria-label',on?button.dataset.hideLabel:button.dataset.revealLabel)};const set=x=>{i=(x+c.length)%c.length;c.forEach((card,k)=>{card.hidden=k!==i;flip(card,false)});if(n)n.textContent=(i+1)+' / '+c.length};d.querySelectorAll('[data-flash-flip]').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('[data-flashcard]');if(card)flip(card,!card.classList.contains('is-flipped'))}));d.querySelector('[data-flash-prev]')?.addEventListener('click',()=>set(i-1));d.querySelector('[data-flash-next]')?.addEventListener('click',()=>set(i+1));d.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();set(i-1)}if(e.key==='ArrowRight'){e.preventDefault();set(i+1)}});set(0)}})()</script>`;
}
export function shell(lang: 'es'|'en', title: string, body: string, base: string, other: string): string {
  const es=lang==='es';
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} · Principal Accelerator Learning Path</title><link rel="stylesheet" href="${base}assets/site.css"><script defer src="${base}assets/study.js"></script></head><body><a class="skip" href="#main">${es?'Saltar al contenido':'Skip to content'}</a><header class="site-header"><a class="brand" href="${base}${lang}/">Principal Accelerator Learning Path</a><nav class="header-actions" aria-label="${es?'Idioma y tema':'Language and theme'}"><a lang="${es?'en':'es'}" hreflang="${es?'en':'es'}" href="${base}${other}">${es?'en':'es'}</a>${themeControl()}</nav></header><details class="mobile-global"><summary>${es?'Navegación del programa':'Program navigation'}</summary>${globalNav(lang,base)}</details><div class="site-grid"><aside class="site-sidebar">${globalNav(lang,base)}</aside><main id="main">${body}</main></div><footer>Principal Accelerator Learning Path · F0 · ${es?'Evidencia antes que afirmaciones.':'Evidence before claims.'}</footer>${themeScript()}${learningStudioScript()}</body></html>`;
}
function inlineReferences(value: string): string {
  return escapeHtml(value).replace(/\[([A-Z][0-9]+)\]/g,'<a href="#ref-$1">[$1]</a>');
}
function renderTable(table: { headers: string[]; rows: string[][] }): string {
  return `<div class="scroll"><table><thead><tr>${table.headers.map(h=>`<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map(cell=>`<td>${inlineReferences(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function splitNumberedItems(value: string): string[] {
  const matches=[...value.matchAll(/(?:^|\s)(\d+)\.\s+/g)];
  if (matches.length<2) return [];
  return matches.map((match,index)=>value.slice(match.index!+match[0].indexOf(`${match[1]}.`)+`${match[1]}.`.length, matches[index+1]?.index ?? value.length).trim()).filter(Boolean);
}
function renderNarrative(value: string, position: number): string {
  const numbered=splitNumberedItems(value);
  if (numbered.length) return `<ol class="reading-steps">${numbered.map(item=>`<li>${inlineReferences(item)}</li>`).join('')}</ol>`;
  return `<p class="${position===0?'reading-lead':'reading-paragraph'}">${inlineReferences(value)}</p>`;
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
function renderDiagram(diagram: { source: string; description: string }, base: string, lang: 'es'|'en'): string {
  return `<figure class="diagram-card"><img class="session-diagram" src="${base}${lang}/${outputForDiagram(diagram.source)}" alt="${escapeHtml(diagram.description)}"><figcaption>${escapeHtml(diagram.description)}</figcaption></figure>`;
}
function renderVisualLearning(page: Page, base: string): string {
  if (!page.visualLearning) return '';
  const es=page.lang==='es';
  const guide=page.visualLearning;
  const renderBlock=(value: typeof guide.modes[number]['blocks'][number], modeNumber: number): string => {
    if (value.type==='cards') return `<div class="studio-cards">${value.cards.map(card=>`<article class="studio-card">${card.eyebrow?`<p class="eyebrow">${escapeHtml(card.eyebrow)}</p>`:''}<h4>${escapeHtml(card.title)}</h4><p>${inlineReferences(card.body)}</p></article>`).join('')}</div>`;
    if (value.type==='diagram') return renderDiagram(value.diagram,base,page.lang);
    if (value.type==='comparison') return renderTable(value.table);
    if (value.type==='flow') return `<ol class="studio-flow">${value.steps.map((step,index)=>`<li><span class="flow-index">${String(index+1).padStart(2,'0')}</span><div><h4>${escapeHtml(step.title)}</h4><p>${inlineReferences(step.body)}</p></div></li>`).join('')}</ol>`;
    const reveal=es?'Mostrar respuesta':'Reveal answer';
    const hide=es?'Mostrar pregunta':'Show question';
    return `<div class="flashcard-deck" data-flashcards tabindex="0" aria-label="${es?'Tarjetas de repaso':'Recall cards'}"><p class="flashcard-mode">${es?'MODO':'MODE'} ${modeNumber} ${es?'DE':'OF'} ${guide.modes.length}</p><div class="flashcard-controls"><button type="button" data-flash-prev>${es?'Anterior':'Previous'}</button><span aria-live="polite" data-flashcard-count></span><button type="button" data-flash-next>${es?'Siguiente':'Next'}</button></div>${value.cards.map(card=>`<article class="flashcard" data-flashcard data-flash-id="${escapeHtml(card.id)}"><button class="flashcard-flip" type="button" data-flash-flip aria-pressed="false" data-reveal-label="${escapeHtml(`${reveal}: ${card.question}`)}" data-hide-label="${escapeHtml(`${hide}: ${card.question}`)}" aria-label="${escapeHtml(`${reveal}: ${card.question}`)}"><span class="flashcard-inner"><span class="flashcard-face flashcard-question"><span class="eyebrow">${escapeHtml(card.id)} · ${escapeHtml(card.category)}</span><strong>${escapeHtml(card.question)}</strong><span class="flashcard-prompt">${es?'Toca para revelar la respuesta':'Tap to reveal the answer'}</span></span><span class="flashcard-face flashcard-answer"><span class="eyebrow">${es?'RESPUESTA':'ANSWER'}</span><strong>${inlineReferences(card.answer)}</strong><span class="flashcard-explanation">${inlineReferences(card.explanation)}</span></span></span></button></article>`).join('')}</div>`;
  };
  return `<div class="learning-studio" data-learning-studio><div class="studio-intro"><p class="eyebrow">${es?'ESTUDIO VISUAL':'VISUAL STUDIO'}</p><p>${inlineReferences(guide.intro)}</p></div><nav class="visual-mode-nav" data-mode-nav aria-label="${es?'Modos de aprendizaje':'Learning modes'}">${guide.modes.map((mode,index)=>`<a id="visual-tab-${mode.id}" href="#visual-panel-${mode.id}" data-mode-control class="${index===0?'is-active':''}">${escapeHtml(mode.label)}</a>`).join('')}</nav>${guide.modes.map((mode,index)=>`<div class="visual-mode-panel" id="visual-panel-${mode.id}" data-visual-panel><details class="visual-mode" open><summary>${escapeHtml(mode.label)}</summary><div class="visual-mode-content"><p class="eyebrow">${escapeHtml(mode.kind)}</p><h3>${escapeHtml(mode.title)}</h3><p class="studio-rationale">${inlineReferences(mode.rationale)}</p><p class="studio-sources">${es?'Derivado de':'Derived from'} ${mode.sourceSections.map(id=>`<a href="#${id}">#${escapeHtml(id)}</a>`).join(', ')}</p>${mode.blocks.map(block=>renderBlock(block,index+1)).join('')}</div></details></div>`).join('')}</div>`;
}
export function renderPage(page: Page, base: string, route = page.kind==='session'?'sessions/PA-S001':'projects/p0'): string {
  const es=page.lang==='es';
  const crumb=page.kind==='session'
    ? `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${page.lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><a href="${base}${page.lang}/sessions/">${es?'Sesiones':'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S001</span></nav>`
    : `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${page.lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><a href="${base}${page.lang}/projects/">${es?'Proyectos':'Projects'}</a><span aria-hidden="true">/</span><span>${escapeHtml(page.title)}</span></nav>`;
  const intro=`${crumb}<div class="page-intro"><p class="eyebrow">${page.kind==='session'?'F0 / PA-S001':'P0 / PORTFOLIO + LEARNING SITE'}</p><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.description)}</p><p class="notice">${es?'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno':'Editorial draft · Mastery not assessed · No learner measurements'}</p></div>`;
  const toc=`<details class="toc"><summary>${es?'Contenido':'Contents'}</summary><nav aria-label="${es?'Contenido':'Contents'}">${page.sections.map(s=>`<a href="#${s.id}">${escapeHtml(s.title)}</a>`).join('')}</nav></details>`;
  const referencesList=`<ol class="references">${page.references.map(r=>`<li id="ref-${r.id}"><a href="${escapeHtml(r.url)}">[${r.id}] ${escapeHtml(r.title)}</a></li>`).join('')}</ol>`;
  const body=page.sections.map(s=>{
    const heading=s.level===3?3:2;
    const table=s.table?renderTable(s.table):'';
    const diagram=s.diagram?renderDiagram(s.diagram,base,page.lang):'';
    const code=s.code?`<pre class="code"><code>${escapeHtml(s.code)}</code></pre>`:'';
    const checklist=s.checklist?`<ul class="checklist">${s.checklist.map(item=>`<li>□ ${escapeHtml(item)}</li>`).join('')}</ul>`:'';
    const study=s.studyItems?`<ul class="study-list">${s.studyItems.map(item=>`<li><label><input type="checkbox" data-study-id="${escapeHtml(item.id)}"><span>${escapeHtml(item.label)}</span></label></li>`).join('')}</ul><p class="study-status" data-storage-status role="status"></p>`:'';
    const visual=s.id==='visual-learning-guide'?renderVisualLearning(page,base):'';
    return `<section id="${s.id}">${renderSectionHeading(s.title,heading)}${s.paragraphs.map((p,index)=>renderNarrative(p,index)).join('')}${table}${diagram}${code}${checklist}${study}${visual}${s.id==='resources'?referencesList:''}</section>`;
  }).join('');
  const extra=page.sections.some(s=>s.id==='resources') || page.references.length===0?'':`<section id="references"><h2>${es?'Fuentes y referencias':'Sources and references'}</h2>${referencesList}</section>`;
  return shell(page.lang,page.title,intro+`<div class="layout">${toc}<article>${body}${extra}</article></div>`,base,(es?'en/':'es/')+`${route}/`);
}
export function home(lang: 'es'|'en',base: string, canonicalStatus = 'Not started', masteryStatus = 'not-assessed'): string {
  const es=lang==='es';
  const body=`<div class="home-hero"><p class="eyebrow">F0 / PA-S001</p><h1>${es?'Panel de aprendizaje':'Learning dashboard'}</h1><p class="lead">${es?'Actividad de estudio local, estado canónico y evidencia se presentan por separado.':'Local study activity, canonical status, and evidence are shown separately.'}</p></div><div class="dashboard-grid">
  <section class="dash-card" id="roadmap"><p class="eyebrow">01 / ROADMAP</p><h2>${es?'Sesiones disponibles':'Available sessions'}</h2><p>F0 · PA-S001</p><a href="${base}${lang}/sessions/PA-S001/">${es?'Abrir fundamentos de ingeniería':'Open engineering foundations'}</a><p class="muted">${es?'F1–F5: sin sesiones publicadas todavía.':'F1–F5: no sessions published yet.'}</p></section>
  <section class="dash-card" id="study"><p class="eyebrow">02 / ${es?'ESTUDIO':'STUDY'}</p><h2>${es?'Actividad marcada':'Marked study activity'}</h2><p data-study-summary>${es?'Las marcas de estudio locales aparecen aquí al habilitar JavaScript.':'Local study marks appear here when JavaScript is enabled.'}</p><p class="muted">${es?'5 ejercicios y 8 criterios de repaso; marcar no acredita dominio.':'5 exercises and 8 review criteria; checking does not award mastery.'}</p></section>
  <section class="dash-card" id="status"><p class="eyebrow">03 / ${es?'ESTADO':'STATUS'}</p><h2>${es?'Estado canónico de PA-S001':'PA-S001 canonical status'}</h2><p><strong>${escapeHtml(canonicalStatus)}</strong></p><p class="muted">${es?'Fuente: 07-PROGRESS.md. Las marcas locales no modifican este estado.':'Source: 07-PROGRESS.md. Local marks do not change this status.'}</p></section>
  <section class="dash-card" id="mastery"><p class="eyebrow">04 / L1–L5</p><h2>${es?'Dominio respaldado':'Evidence-backed mastery'}</h2><p><strong>${masteryStatus==='not-assessed'?(es?'Sin evaluar':'Not assessed'):escapeHtml(masteryStatus)}</strong></p><p class="muted">${es?'No hay niveles ni mediciones asignados.':'No levels or measurements are assigned.'}</p></section>
  <section class="dash-card" id="artifacts"><p class="eyebrow">05 / ${es?'ARTEFACTOS':'ARTIFACTS'}</p><h2>${es?'Artefactos públicos':'Public artifacts'}</h2><ul><li><a href="${base}${lang}/sessions/PA-S001/">${es?'Capítulo editorial PA-S001':'PA-S001 editorial chapter'}</a></li><li><a href="${base}${lang}/projects/engineering-book/">Engineering Book P0</a></li></ul><p class="muted">${es?'Borradores publicados localmente; sin evidencia del estudiante validada.':'Locally built drafts; no learner evidence validated.'}</p></section>
  <section class="dash-card" id="revisit"><p class="eyebrow">06 / REVISIT</p><h2>${es?'Revisitas':'Revisits'}</h2><p>${es?'La cola canónica está vacía.':'The canonical queue is empty.'}</p><p class="muted">${es?'Revisiones pendientes: decisiones, fallo controlado y equivalencia semántica ES/EN.':'Pending review: decisions, controlled failure, and ES/EN semantic equivalence.'}</p></section>
  <section class="dash-card" id="projects"><p class="eyebrow">07 / P0</p><h2>${es?'Proyectos y sistemas':'Projects and systems'}</h2><ul><li><a href="${base}${lang}/projects/engineering-book/">Engineering Book</a></li><li><a href="${base}${lang}/projects/portfolio/">${es?'Portafolio':'Portfolio'}</a></li></ul><p class="muted">${es?'Progreso canónico de sistemas: Not started.':'Canonical systems progress: Not started.'}</p></section>
  <section class="dash-card" id="activity"><p class="eyebrow">08 / ${es?'ACTIVIDAD':'ACTIVITY'}</p><h2>${es?'Actividad y siguiente trabajo':'Activity and next work'}</h2><p>${es?'Sin actividad del estudiante registrada en fuentes canónicas.':'No learner activity recorded in canonical sources.'}</p><p>${es?'Siguiente: PA-S001, revisión del capítulo y ejercicios propios.':'Next: PA-S001, chapter review and learner exercises.'}</p></section>
  </div>`;
  return shell(lang,'Principal Accelerator Learning Path',body,base,es?'en/':'es/');
}
export function sessionsIndex(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><span>${es?'Sesiones':'Sessions'}</span></nav><p class="eyebrow">F0</p><h1>${es?'Sesiones':'Sessions'}</h1><p class="lead">${es?'Índice publicable de sesiones disponibles.':'Publishable index of available sessions.'}</p><div class="cards"><a class="card" href="${base}${lang}/sessions/PA-S001/"><span>PA-S001</span><h2>${es?'Fundamentos de ingeniería':'Engineering foundations'}</h2><p>${es?'Borrador editorial bilingüe; evidencia de dominio pendiente.':'Bilingual editorial draft; mastery evidence pending.'}</p></a></div>`;
  return shell(lang,es?'Sesiones':'Sessions',body,base,es?'en/sessions/':'es/sessions/');
}
export function projectsIndex(lang: 'es'|'en',base: string): string {
  const es=lang==='es';
  const body=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">${es?'Inicio':'Home'}</a><span aria-hidden="true">/</span><span>${es?'Proyectos':'Projects'}</span></nav><p class="eyebrow">P0</p><h1>${es?'Proyectos':'Projects'}</h1><p class="lead">${es?'Índice publicable de productos del Accelerator.':'Publishable index of Accelerator products.'}</p><div class="cards"><a class="card" href="${base}${lang}/projects/portfolio/"><span>P0 / PORTFOLIO</span><h2>${es?'Portafolio profesional':'Professional portfolio'}</h2><p>${es?'Superficie profesional separada; detalles pendientes de revisión del estudiante.':'A separate professional surface; details await learner review.'}</p></a><a class="card" href="${base}${lang}/projects/engineering-book/"><span>P0 / LEARNING SITE</span><h2>Engineering Book</h2><p>${es?'Proyecto editorial bilingüe y sus rutas de estudio.':'Bilingual editorial project and its study routes.'}</p></a></div>`;
  return shell(lang,es?'Proyectos':'Projects',body,base,es?'en/projects/':'es/projects/');
}
