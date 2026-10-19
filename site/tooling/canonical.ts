/** Publish the learner supplied PA-S001 text without changing its prose. */
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]!));
}

export interface CanonicalRender { html: string; toc: string }
export interface CanonicalSearchSection { id: string; title: string; text: string }
interface Flashcard { id: string; front: string; back: string; source: string }
const sectionIds=['objective','learning-preview','concepts','main-topic','subtopics','cross-domain-synthesis','theory-practice-map','time-breakdown','real-world-example','production-ready-example','visual-learning-studio','exercises','curated-sources-and-references','resources','knowledge-mastery-checklist','end-of-session-success-criteria','bridge-to-pa-s002'];
const expectedExercises=['atomic-scope','quality-scenario','contract-change','adr-critique','ai-failure','teach-back'].map(id=>`PA-S001:exercise:${id}`);
const expectedMastery=['distinguish-levels','scope-four','quality','modularity','domain-lanes','evidence'].map(id=>`PA-S001:mastery:${id}`);

function linesOf(source: string): string[] { return source.replace(/\r\n/g,'\n').split('\n'); }
function nonempty(source: string): string[] { return linesOf(source).map(line=>line.trim()).filter(Boolean); }
function majorSections(source: string): {number:number;title:string;id:string}[] {
  const result:{number:number;title:string;id:string}[]=[];
  let next=1;
  for (const line of linesOf(source)) {
    const match=line.match(/^(\d+)\. (.+)$/);
    if (match && Number(match[1])===next && next<=17) {
      result.push({number:next,title:match[2]!,id:sectionIds[next-1]!});
      next++;
    }
  }
  return result;
}
function identifiers(source: string, kind: 'concept'|'topic'): string[] {
  return [...source.matchAll(new RegExp(`^<!-- ${kind}: ([a-z0-9.-]+)(?: requires: [^>]+)? -->$`,'gm'))].map(match=>match[1]!);
}
export function studyIds(source: string): {exercises:string[];mastery:string[]} {
  return {
    exercises:[...source.matchAll(/^(PA-S001:exercise:[a-z-]+) — /gm)].map(match=>match[1]!),
    mastery:[...source.matchAll(/^(PA-S001:mastery:[a-z-]+) — /gm)].map(match=>match[1]!)
  };
}
export function canonicalDiagramSources(source: string): string[] {
  const lines=linesOf(source), result:string[]=[];
  for(let index=0;index<lines.length;index++) if(/^(flowchart|mindmap|sequenceDiagram|graph)\b/.test(lines[index]!.trim())) {
    const block=[lines[index]!];
    while(index+1<lines.length && lines[index+1]!.trim()) block.push(lines[++index]!);
    result.push(block.join('\n')+'\n');
  }
  return result;
}
function flashcards(source: string): Flashcard[] {
  const lines=nonempty(source), cards:Flashcard[]=[];
  for(let index=0;index<lines.length;index++) if(/^fc\.[a-z0-9.-]+$/.test(lines[index]!)) {
    cards.push({id:lines[index]!,front:lines[index+1]??'',back:lines[index+2]??'',source:lines[index+3]??''});
    index+=3;
  }
  return cards;
}
function synthesis(source: string, lang:'es'|'en'): string[] {
  const lines=nonempty(source), heading=lang==='es'?'SÍNTESIS EN 30 SEGUNDOS':'30-SECOND SYNTHESIS';
  const index=lines.indexOf(heading);
  return index<0?[]:lines.slice(index+1,index+4);
}
export function assertCanonicalPair(es: string,en: string): void {
  for(const [lang,source] of [['es',es],['en',en]] as const) {
    const sections=majorSections(source);
    if(sections.length!==17 || sections.some((section,index)=>section.number!==index+1)) throw new Error(`Canonical ${lang} theory must have all 17 sections in order`);
    if(synthesis(source,lang).length!==3 || linesOf(source).indexOf(lang==='es'?'SÍNTESIS EN 30 SEGUNDOS':'30-SECOND SYNTHESIS')>linesOf(source).indexOf(lang==='es'?'1. Objetivo':'1. Objective')) throw new Error(`Canonical ${lang} synthesis must precede the objective`);
    const concepts=identifiers(source,'concept'), topics=identifiers(source,'topic');
    if(concepts.length!==24 || new Set(concepts).size!==24 || topics.length!==7 || new Set(topics).size!==7) throw new Error(`MISSING_ATOMIC_CONCEPT_COVERAGE: ${lang}`);
    if(!/3A\. Staff → Principal Software Engineering[\s\S]*3B\. Frontend Platform Architecture \(FPA\)[\s\S]*3C\. AI Product Engineering \(AIPE\)/.test(source)) throw new Error(`Canonical ${lang} concept lanes are missing or out of order`);
    if(!sections[5]?.title.includes('Cross-Domain Synthesis') || !sections[4]?.title.includes('Subtopics')) throw new Error(`Canonical ${lang} synthesis is out of order`);
    if((source.match(/^Subtopic [1-6] · /gm)??[]).length!==6) throw new Error(`Canonical ${lang} theory must have six developed subtopics`);
    const ids=studyIds(source);
    if(ids.exercises.join('|')!==expectedExercises.join('|')) throw new Error(`Canonical ${lang} exercise IDs differ`);
    if(ids.mastery.join('|')!==expectedMastery.join('|')) throw new Error(`Canonical ${lang} checklist IDs differ`);
    if(canonicalDiagramSources(source).length!==6) throw new Error(`Canonical ${lang} must preserve six diagrams`);
    const cards=flashcards(source);
    if(cards.length!==25 || new Set(cards.map(card=>card.id)).size!==25 || cards.some(card=>!card.front||!card.back||!card.source)) throw new Error(`Canonical ${lang} flashcards are incomplete`);
  }
  const compare=(getter:(source:string)=>string[])=>{
    if(getter(es).join('|')!==getter(en).join('|')) throw new Error('Canonical ES/EN structural parity differs');
  };
  compare(source=>identifiers(source,'concept'));
  compare(source=>identifiers(source,'topic'));
  compare(source=>flashcards(source).map(card=>card.id));
  compare(source=>flashcards(source).map(card=>card.source));
  compare(source=>[...studyIds(source).exercises,...studyIds(source).mastery]);
}

/** Source section titles and prose are also indexed for the existing site search. */
export function canonicalSearchSections(source: string): CanonicalSearchSection[] {
  const sections=majorSections(source), result:CanonicalSearchSection[]=[];
  for(const [index,section] of sections.entries()) {
    const start=source.indexOf(`${section.number}. ${section.title}`);
    const next=sections[index+1];
    const end=next?source.indexOf(`${next.number}. ${next.title}`,start+1):source.length;
    result.push({id:section.id,title:section.title,text:source.slice(start,end).replace(/<!--[^>]*-->/g,' ').replace(/\s+/g,' ').trim()});
  }
  return result;
}

function inline(value: string): string {
  const token=/(https?:\/\/[^\s<>]+|\[[^\]\n]+::[^\]\n]+\]|\[S(?:1[0-2]|[1-9])\])/g;
  let result='',last=0;
  for(const match of value.matchAll(token)) {
    const index=match.index!;
    result+=escapeHtml(value.slice(last,index));
    const raw=match[0];
    if(raw.startsWith('http')) {
      const url=raw.replace(/[.,;]+$/,'');
      result+=`<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>${escapeHtml(raw.slice(url.length))}`;
    } else if(raw.includes('::')) {
      const [term,definition]=raw.slice(1,-1).split('::').map(part=>part.trim());
      if(!term||!definition||definition.split(/\s+/).length>10) throw new Error(`Invalid contextual term: ${raw}`);
      result+=`<span class="term-note"><button type="button" aria-label="${escapeHtml(`${term}: ${definition}`)}">${escapeHtml(term)}</button><span>${escapeHtml(definition)}</span></span>`;
    } else result+=`<a href="#reference-${raw.slice(2,-1)}">${escapeHtml(raw)}</a>`;
    last=index+raw.length;
  }
  return result+escapeHtml(value.slice(last));
}
function paragraph(value: string): string {
  const match=value.match(/^([^:.?]{2,52}[.:]) (.+)$/);
  return `<p>${match?`<strong>${inline(match[1]!)}</strong> ${inline(match[2]!)}`:inline(value)}</p>`;
}
function matrix(source:string): {headers:string[];rows:string[][]} {
  const all=nonempty(source),start=all.indexOf(all.includes('Problema')?'Problema':'Problem');
  if(start<0) throw new Error('Canonical decision matrix is missing');
  const values=all.slice(start,start+15);
  if(values.length!==15) throw new Error('Canonical decision matrix is incomplete');
  return {headers:values.slice(0,3),rows:Array.from({length:4},(_,index)=>values.slice(3+index*3,6+index*3))};
}
function studio(source:string,lang:'es'|'en',base:string): string {
  const es=lang==='es',cards=flashcards(source),data=matrix(source);
  const cardMarkup=cards.map(card=>{
    const reveal=es?'Mostrar respuesta':'Reveal answer',hide=es?'Mostrar pregunta':'Show question';
    return `<article class="flashcard" data-flashcard data-flash-id="${card.id}" data-source-sections="${escapeHtml(card.source)}"><button class="flashcard-flip" type="button" data-flash-flip aria-pressed="false" data-reveal-label="${escapeHtml(`${reveal}: ${card.front}`)}" data-hide-label="${escapeHtml(`${hide}: ${card.front}`)}" aria-label="${escapeHtml(`${reveal}: ${card.front}`)}"><span class="flashcard-inner"><span class="flashcard-face flashcard-question"><span class="eyebrow">${card.id} · ${escapeHtml(card.source)}</span><strong>${inline(card.front)}</strong><span class="flashcard-prompt">${es?'Toca o pulsa Enter para ver la respuesta':'Tap or press Enter to see the answer'}</span></span><span class="flashcard-face flashcard-answer"><span class="eyebrow">${es?'RESPUESTA':'ANSWER'}</span><strong>${inline(card.back)}</strong></span></span></button></article>`;
  }).join('');
  const table=`<div class="scroll"><table><thead><tr>${data.headers.map(value=>`<th scope="col">${inline(value)}</th>`).join('')}</tr></thead><tbody>${data.rows.map(row=>`<tr>${row.map(value=>`<td>${inline(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const map=`${base}${lang}/shared/diagrams/PA-S001/theory-${lang}-06.svg`;
  return `<div class="learning-studio canonical-studio" data-learning-studio><nav class="visual-mode-nav" data-mode-nav aria-label="${es?'Modos de estudio visual':'Visual study modes'}"><a id="visual-tab-mind-map" href="#visual-panel-mind-map" data-mode-control>${es?'Mapa mental':'Mind map'}</a><a id="visual-tab-flashcards" href="#visual-panel-flashcards" data-mode-control>${es?'Tarjetas':'Flashcards'}</a><a id="visual-tab-scope-matrix" href="#visual-panel-scope-matrix" data-mode-control>${es?'Matriz de alcance':'Scope matrix'}</a></nav><div class="visual-mode-panel" id="visual-panel-mind-map" data-visual-panel><h3>${es?'Mapa mental PA-S001':'PA-S001 mind map'}</h3><figure class="diagram"><img src="${map}" alt="${es?'Mapa mental de 24 conceptos, seis subtemas, tema principal y síntesis entre dominios':'Mind map of 24 concepts, six subtopics, Main Topic, and cross-domain synthesis'}"></figure></div><div class="visual-mode-panel" id="visual-panel-flashcards" data-visual-panel><h3>${es?'Recuperación con 25 tarjetas':'Recall with 25 cards'}</h3><div class="flashcard-deck" data-flashcards tabindex="0" aria-label="${es?'Tarjetas PA-S001':'PA-S001 flashcards'}"><div class="flashcard-controls"><button type="button" data-flash-prev>${es?'Anterior':'Previous'}</button><span aria-live="polite" data-flashcard-count></span><button type="button" data-flash-next>${es?'Siguiente':'Next'}</button></div>${cardMarkup}</div></div><div class="visual-mode-panel" id="visual-panel-scope-matrix" data-visual-panel><h3>${es?'Matriz para elegir el límite de análisis':'Matrix for choosing analytical scope'}</h3>${table}</div></div>`;
}

export function renderCanonical(source:string,lang:'es'|'en',base:string): CanonicalRender {
  const sections=majorSections(source), all=linesOf(source), html:string[]=[];
  let nextMajor=1, diagram=0, inDeep=false, skipMatrix=false,skipCards=false;
  const close=()=>{if(inDeep){html.push('</div></details>');inDeep=false;}};
  const heading=(level:number,id:string,title:string)=>{close();html.push(`<h${level} id="${id}">${inline(title)}</h${level}>`);};
  const toc=`<details class="toc"><summary>${lang==='es'?'Contenido':'Contents'}</summary><nav aria-label="${lang==='es'?'Contenido':'Contents'}"><ol class="toc-list">${sections.map(section=>`<li><a href="#${section.id}">${inline(`${section.number}. ${section.title}`)}</a></li>`).join('')}</ol></nav></details>`;
  for(let index=0;index<all.length;index++) {
    const line=all[index]!.trim();
    if(!line) continue;
    if(skipMatrix){if(/^(Modo obligatorio: flashcards|Mandatory mode: retrieval flashcards)/.test(line))skipMatrix=false;else continue;}
    if(skipCards){if(/^(Autoexplicación:|Teach-back:)/.test(line))skipCards=false;else continue;}
    if(line==='Problema'||line==='Problem'){skipMatrix=true;continue;}
    if(line==='ID estable'||line==='Stable ID'){skipCards=true;continue;}
    const major=line.match(/^(\d+)\. (.+)$/);
    if(major && Number(major[1])===nextMajor && nextMajor<=17) {
      heading(2,sectionIds[nextMajor-1]!,line);
      if(nextMajor===11) html.push(studio(source,lang,base));
      nextMajor++;continue;
    }
    if(index===all.findIndex(value=>value.trim().startsWith('PA-S001 — '))) {html.push(`<p class="canonical-source-title" id="chapter-title">${inline(line)}</p>`);continue;}
    if(line==='SÍNTESIS EN 30 SEGUNDOS'||line==='30-SECOND SYNTHESIS') {
      html.push(`<aside class="synthesis" aria-label="${escapeHtml(line)}"><h2>${escapeHtml(line)}</h2><ol>`);
      for(let n=1;n<=3;n++)html.push(`<li>${inline(all[index+n]!.trim())}</li>`);
      html.push('</ol></aside>');index+=3;continue;
    }
    const marker=line.match(/^<!-- (concept|topic): ([a-z0-9.-]+)(?: requires: [^>]+)? -->$/);
    if(marker){close();html.push(`<span id="${marker[1]}-${marker[2]}" class="anchor"></span>`);continue;}
    if(/^<!--/.test(line))continue;
    if(/^3[A-C]\. /.test(line)) {heading(3,`lane-${line[1]!.toLowerCase()}`,line);continue;}
    const subtopic=line.match(/^Subtopic ([1-6]) · /);
    if(subtopic){heading(3,`subtopic-${subtopic[1]}`,line);continue;}
    if(/^(Nivel|Level) [12] — /.test(line)){heading(5,`level-${index}`,line);continue;}
    if(/^(Nivel|Level) 3 — /.test(line)){close();html.push(`<details class="deep-dive"><summary>${inline(line)}</summary><div>`);inDeep=true;continue;}
    if(major && nextMajor>5 && nextMajor<=7){heading(4,`atomic-${index}`,line);continue;}
    if(/^(Concepto:|Concept:)/.test(line)){heading(4,`concept-heading-${index}`,line);continue;}
    if(/^(flowchart|mindmap|sequenceDiagram|graph)\b/.test(line)) {
      close();diagram++;
      while(index+1<all.length && all[index+1]!.trim())index++;
      const filename=`theory-${lang}-${String(diagram).padStart(2,'0')}.svg`;
      html.push(`<figure class="diagram"><img src="${base}${lang}/shared/diagrams/PA-S001/${filename}" alt="${lang==='es'?'Diagrama de teoría PA-S001':'PA-S001 theory diagram'} ${diagram}" loading="lazy"></figure>`);continue;
    }
    if(line.startsWith('//')) {
      const code=[all[index]!];while(index+1<all.length && all[index+1]!.trim())code.push(all[++index]!);
      html.push(`<pre class="code"><code>${escapeHtml(code.join('\n'))}</code></pre>`);continue;
    }
    const study=line.match(/^(PA-S001:(?:exercise|mastery):[a-z-]+) — (.+)$/);
    if(study){html.push(`<p class="canonical-study-item"><label><input type="checkbox" data-study-id="${study[1]}"><span><strong>${study[1]}</strong> — ${inline(study[2]!)}</span></label></p>`);continue;}
    const reference=line.match(/^\[(S(?:1[0-2]|[1-9]))\] /);
    if(reference){html.push(`<p id="reference-${reference[1]!.slice(1)}">${inline(line)}</p>`);continue;}
    if(/^(Componente Interactivo Recomendado:|Interactive Component Recommended:)/.test(line)) {html.push(`<p class="widget-proposal">${inline(line)}</p>`);continue;}
    if(/^(Modo obligatorio:|Modo adaptativo:|Mandatory mode:|Adaptive mode:|Preentrenamiento:|Pretraining:)/.test(line)) {heading(3,`section-label-${index}`,line);continue;}
    html.push(paragraph(line));
  }
  close();
  if(diagram!==6)throw new Error(`Canonical ${lang} rendered ${diagram} diagrams, expected six`);
  return {html:html.join('\n'),toc};
}
