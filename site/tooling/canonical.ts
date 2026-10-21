import { renderReferenceExperience } from './concept-explorers.ts';
import { asciiDiagrams } from './ascii-diagrams.ts';
/** Renderer and coverage gate for the learner supplied PA-S001 Markdown. */
export const CONCEPT_IDS = [
  'engineering.software','engineering.architecture','scope.application','scope.system',
  'scope.platform','scope.ecosystem','quality.attribute','quality.constraint',
  'design.boundary','design.coupling','design.cohesion','role.staff','role.principal',
  'fpa.frontend-platform','aipe.ai-product','learning.evidence','learning.levels'
] as const;
export const TOPIC_IDS = ['main.p0-boundaries','sub.software-vs-architecture','sub.scope-layers',
  'sub.quality-constraints','sub.boundary-dependencies','sub.frontend-platform','sub.ai-product'] as const;
export const EXERCISE_IDS = ['classify','boundary-map','quality','ai-decision'].map(id=>`PA-S001.exercise.${id}`);
export const CHECK_IDS = ['engineering','scope','quality','boundary','fpa','aipe','roles','evidence'].map(id=>`PA-S001.check.${id}`);
export const SUCCESS_IDS = ['engineering','scope','quality','boundary','fpa','aipe','retrieval','evidence'].map(id=>`PA-S001.success.${id}`);
const EXPECTED_ES = { bytes:70016, sha:'9a7c96cabc984a2e0a7d08c22475e28fd9815b4c6b2d177ba6509b562868abf5' };
const EXPECTED_EN = { bytes:64546, sha:'ba9865813943c67f7aac8c906eeecf8e70bdf0bcd9563109bc9f6e60e48bdb34' };
import { createHash } from 'node:crypto';

export interface CanonicalRender { html:string; toc:string }
export interface CanonicalSearchSection { id:string; title:string; text:string }
interface Heading { level:number; id:string; title:string; line:number }
interface Card { id:string; label:string; question:string; answer:string; explanation:string }
const escapeHtml=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const sourceLines=(source:string)=>source.split('\n');
const idFromHeading=(title:string,lang:'es'|'en'):string=>{
  if(title.startsWith('PA-S001 —'))return 'chapter-title';
  const explicit=title.match(/^`((?:engineering|scope|quality|design|role|fpa|aipe|learning|sub)\.[a-z.-]+)`/);
  if(explicit)return explicit[1]!;
  if(/^(Tema principal|Main Topic)/.test(title))return 'main.p0-boundaries';
  if(/^(Contexto documentado: plataformas internas|Documented context: internal engineering platforms)/.test(title))return 'platform-context';
  if(/^(Transferencia explícita al proyecto P0|Explicit transfer to P0)/.test(title))return 'transfer-p0';
  if(/^(Carril Staff|Staff → Principal lane)/.test(title))return 'lane-staff';
  if(/^(Carril Frontend|Frontend Platform Architecture \(FPA\) lane)/.test(title))return 'lane-fpa';
  if(/^(Carril AI|AI Product Engineering \(AIPE\) lane)/.test(title))return 'lane-aipe';
  if(/^(Mecanismo de aprendizaje|Learning and evidence mechanics)/.test(title))return 'lane-learning';
  const localized:Record<string,string>=lang==='es'?{
    'Objetivo':'objective','Vista previa del aprendizaje':'learning-preview','Conceptos':'concepts',
    'Manifiesto de cobertura atómica':'coverage-manifest','Subtemas':'subtopics',
    'Síntesis entre dominios':'cross-domain-synthesis','Mapa de teoría a práctica':'theory-practice-map',
    'Tiempo estimado':'time-breakdown','Ejemplo del mundo real':'real-world-example',
    'Ejemplo listo para producción':'production-ready-example','Guía visual de aprendizaje':'visual-learning-studio',
    'Ejercicios':'exercises','Fuentes verificadas':'sources','Recursos y método de repaso':'resources',
    'Lista de comprobación de estudio':'study-checklist','Criterios de éxito de la sesión':'success-criteria',
    'Puente a PA-S002':'bridge-to-pa-s002'
  }:{
    'Objective':'objective','Learning preview':'learning-preview','Concepts':'concepts',
    'Atomic coverage manifest':'coverage-manifest','Subtopics':'subtopics',
    'Cross-domain synthesis':'cross-domain-synthesis','Theory → Practice Map':'theory-practice-map',
    'Time estimate':'time-breakdown','Real-World Example':'real-world-example',
    'Production-Ready Example':'production-ready-example','Visual Learning Guide':'visual-learning-studio',
    'Exercises':'exercises','Verified sources':'sources','Resources and revisit method':'resources',
    'Study checklist':'study-checklist','End-of-session success criteria':'success-criteria',
    'Bridge to PA-S002':'bridge-to-pa-s002'
  };
  for(const [prefix,id] of Object.entries(localized))if(title.startsWith(prefix))return id;
  return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
};
function headings(source:string,lang:'es'|'en'):Heading[]{
  return sourceLines(source).flatMap((line,index)=>{
    const match=line.match(/^(#{1,4}) (.+)$/);
    return match?[{level:match[1]!.length,id:idFromHeading(match[2]!,lang),title:match[2]!,line:index}]:[];
  });
}
export function studyIds(source:string):{exercises:string[];mastery:string[]}{
  return {exercises:[...source.matchAll(/^\d+\. \*\*`(PA-S001\.exercise\.[a-z-]+)`/gm)].map(x=>x[1]!),
    mastery:[...source.matchAll(/^- \[ \] `(PA-S001\.check\.[a-z-]+)`/gm)].map(x=>x[1]!)};
}
function sectionText(source:string,heading:Heading,all:Heading[]):string{
  const next=all.find(h=>h.line>heading.line&&h.level<=heading.level);
  return sourceLines(source).slice(heading.line+1,next?.line).join('\n').trim();
}
function cards(source:string,lang:'es'|'en'):Card[]{
  const all=headings(source,lang);
  const selected=all.filter(h=>[...CONCEPT_IDS,...TOPIC_IDS].includes(h.id as typeof CONCEPT_IDS[number]));
  return selected.map(h=>{
    const body=sectionText(source,h,all);
    const retrieval=body.match(/\*\*(?:Recuperación|Retrieval):\*\* (.+?) \*\*(?:Respuesta|Answer):\*\* (.+?)(?= \*\*|\n|$)/s);
    const main=body.match(/\*\*(?:Pregunta guía|Guiding question):\*\* (.+?) \*\*(?:Definición y alcance|Definition and scope):\*\*/s);
    const mainAnswer=body.match(/\*\*(?:Respuesta a la pregunta guía|Answer to the guiding question):\*\* (.+?)(?=\n|$)/s);
    const first=body.match(/^(?:\*\*[^*]+\*\* )?(.+?)(?:\n|$)/m)?.[1]??'';
    return {id:h.id,label:h.title.replace(/^`[^`]+` — /,''),question:retrieval?.[1]??main?.[1]??'',answer:retrieval?.[2]??mainAnswer?.[1]??'',explanation:first};
  });
}
export function assertCanonicalPair(es:string,en:string):void{
  for(const [lang,source,expected] of [['es',es,EXPECTED_ES],['en',en,EXPECTED_EN]] as const){
    const bytes=Buffer.byteLength(source,'utf8');
    if(bytes!==expected.bytes||createHash('sha256').update(source).digest('hex')!==expected.sha||!source.endsWith('\n'))
      throw new Error(`MISSING_CANONICAL_THEORY_PAYLOAD: ${lang} bytes/hash/final newline`);
    const all=headings(source,lang),ids=all.map(h=>h.id),needed=[...CONCEPT_IDS,...TOPIC_IDS];
    if(needed.some(id=>ids.filter(value=>value===id).length!==1))throw new Error(`MISSING_ATOMIC_CONCEPT_COVERAGE: ${lang} heading IDs`);
    const concepts=all.filter(h=>CONCEPT_IDS.includes(h.id as typeof CONCEPT_IDS[number]));
    if(concepts.map(h=>h.id).join('|')!==CONCEPT_IDS.join('|'))throw new Error(`MISSING_ATOMIC_CONCEPT_COVERAGE: ${lang} concept order`);
    const scopes=CONCEPT_IDS.slice(2,6).map(id=>ids.indexOf(id));
    if(scopes.some((position,index)=>index>0&&position<=scopes[index-1]!)||ids.indexOf('sub.scope-layers')<scopes[3]!)throw new Error(`MISSING_ATOMIC_CONCEPT_COVERAGE: ${lang} scope sequence`);
    for(const h of concepts){
      const body=sectionText(source,h,all);
      const levels=lang==='es'?['Nivel 1','Nivel 2','Nivel 3']:['Level 1','Level 2','Level 3'];
      const positions=levels.map(level=>body.indexOf(`**${level} —`));
      if(positions.some((position,index)=>position<0||(index>0&&position<=positions[index-1]!))||
        !/(?:Recuperación|Retrieval)/.test(body)||!/(?:Respuesta|Answer)/.test(body)||body.length<450)
        throw new Error(`MISSING_ATOMIC_CONCEPT_COVERAGE: ${lang} ${h.id}`);
    }
    const study=studyIds(source);
    if(study.exercises.join('|')!==EXERCISE_IDS.join('|')||study.mastery.join('|')!==CHECK_IDS.join('|'))throw new Error(`Canonical ${lang} study IDs differ`);
    const foundCards=cards(source,lang);
    if(foundCards.length!==24||foundCards.some(card=>!card.question||!card.answer||!card.explanation))throw new Error(`MISSING_ATOMIC_CONCEPT_COVERAGE: ${lang} retrieval cards`);
    const summary=source.match(/^> \*\*(?:SÍNTESIS EN 30 SEGUNDOS|30-SECOND SYNTHESIS)\*\*\n((?:> [1-3]\. .+\n){3})/m);
    if(!summary||source.indexOf(summary[0])>source.indexOf('## '))throw new Error(`Canonical ${lang} synthesis missing or misplaced`);
  }
  const esIds=headings(es,'es').map(h=>h.id),enIds=headings(en,'en').map(h=>h.id);
  if(esIds.join('|')!==enIds.join('|'))throw new Error('Canonical ES/EN heading parity differs');
}

function inline(value:string):string{
  const tokens:string[]=[];
  const hold=(html:string)=>{const key=`@@TOKEN${tokens.length}@@`;tokens.push(html);return key;};
  let text=value.replace(/`([^`]+)`/g,(_,code:string)=>hold(`<code>${escapeHtml(code)}</code>`));
  text=text.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g,(_,label:string,url:string)=>hold(`<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`));
  text=text.replace(/\[([^\]\n:]+):: ([^\]\n]+)\]/g,(_,term:string,definition:string)=>{
    if(definition.trim().split(/\s+/).length>10)throw new Error(`Context definition exceeds ten words: ${term}`);
    return hold(`<span class="term-note"><abbr title="${escapeHtml(definition)}" tabindex="0">${escapeHtml(term)}</abbr><span> — ${escapeHtml(definition)}</span></span>`);
  });
  text=escapeHtml(text).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
  text=text.replace(/\[((?:R[1-8]|P1)(?:,\s*(?:R[1-8]|P1))*)\]/g,(_,ids:string)=>`[${ids.split(/,\s*/).map(id=>`<a href="#source-${id}">${id}</a>`).join(', ')}]`);
  return text.replace(/@@TOKEN(\d+)@@/g,(_,number:string)=>tokens[Number(number)]!);
}
function chapterMetadata(line:string):string | undefined{
  if(!/^\*\*(?:Fase|Phase):\*\*/.test(line))return undefined;
  const fields=[...line.matchAll(/\*\*([^*]+):\*\* ([\s\S]*?)(?= \*\*[^*]+:\*\*|$)/g)];
  if(!fields.length)return undefined;
  return `<div class="chapter-meta">${fields.map(([,label,value])=>`<div class="chapter-meta-item"><h3>${escapeHtml(label!)}:</h3><p>${inline(value!)}</p></div>`).join('')}</div>`;
}
function conceptHeading(heading:Heading,lang:'es'|'en'):string | undefined{
  const match=heading.title.match(/^`([^`]+)` — (.+)$/);
  if(!match)return undefined;
  const sub=heading.id.startsWith('sub.');
  const index=sub?TOPIC_IDS.indexOf(heading.id as typeof TOPIC_IDS[number]):CONCEPT_IDS.indexOf(heading.id as typeof CONCEPT_IDS[number]);
  const label=lang==='es'?(sub?'SUBTEMA':'CONCEPTO'):(sub?'SUBTOPIC':'CONCEPT');
  return `<div class="concept-heading" data-concept-id="${escapeHtml(heading.id)}"><p class="concept-eyebrow">${label} · ${String(index+(sub?0:1)).padStart(2,'0')}</p><h3 id="${heading.id}">${inline(match[2]!)}</h3></div>`;
}
function studio(source:string,lang:'es'|'en',base:string):string{
  const es=lang==='es',all=cards(source,lang);
  const buttons=all.map((card,index)=>`<article class="flashcard" data-flashcard data-flash-id="${card.id}"><a href="#${card.id}" class="studio-source">${es?'Ir al concepto':'View lesson'}: ${inline(card.label)}</a><button type="button" data-flash-flip aria-pressed="false" data-reveal-label="${es?'Mostrar respuesta':'Reveal answer'}: ${escapeHtml(card.question)}" data-hide-label="${es?'Mostrar pregunta':'Show question'}: ${escapeHtml(card.question)}" aria-label="${es?'Mostrar respuesta':'Reveal answer'}: ${escapeHtml(card.question)}"><strong>${inline(card.question)}</strong></button><div class="flashcard-answer"><p><strong>${es?'Respuesta':'Answer'}:</strong> ${inline(card.answer)}</p><p>${inline(card.explanation)}</p></div><p class="sr-only">${index+1} / ${all.length}</p></article>`).join('');
  const map=`${base}${lang}/shared/diagrams/PA-S001/canonical-map-${lang}.svg`;
  return `<!-- STUDIO START --><div class="learning-studio" data-learning-studio><nav class="visual-mode-nav" data-mode-nav aria-label="${es?'Modos de estudio visual':'Visual study modes'}"><a id="visual-tab-mind-map" href="#visual-panel-mind-map" data-mode-control>${es?'Mapa mental':'Mind map'}</a><a id="visual-tab-flashcards" href="#visual-panel-flashcards" data-mode-control>${es?'Tarjetas':'Cards'}</a></nav><div id="visual-panel-mind-map" class="visual-mode-panel" data-visual-panel><h3>${es?'Mapa de conceptos':'Concept map'}</h3><p>${es?'Las ramas organizan conceptos para repasarlos; abre una lección para estudiar su explicación.':'Branches organize concepts for review; open a lesson for its full explanation.'}</p><figure class="diagram"><img src="${map}" alt="${es?'Mapa mental de 17 conceptos, un tema principal y seis subtemas':'Mind map of 17 concepts, one main topic and six subtopics'}" loading="lazy"></figure><ul class="studio-coverage">${all.map(card=>`<li><a href="#${card.id}">${inline(card.label)}</a></li>`).join('')}</ul></div><div id="visual-panel-flashcards" class="visual-mode-panel" data-visual-panel><h3>${es?'Recuperación: 24 tarjetas':'Retrieval: 24 cards'}</h3><p>${es?'Las respuestas están disponibles en HTML incluso sin JavaScript.':'Answers remain in HTML without JavaScript.'}</p><div class="flashcard-deck" data-flashcards tabindex="0"><div class="flashcard-controls"><button type="button" data-flash-prev>${es?'Anterior':'Previous'}</button><output data-flashcard-count aria-live="polite">1 / 24</output><button type="button" data-flash-next>${es?'Siguiente':'Next'}</button></div>${buttons}</div></div></div><!-- STUDIO END -->`;
}
export function renderCanonical(source:string,lang:'es'|'en',base:string):CanonicalRender{
  const lines=sourceLines(source),all=headings(source,lang),out:string[]=[];
  const toc=`<details class="toc"><summary>${lang==='es'?'Contenido':'Contents'}</summary><nav aria-label="${lang==='es'?'Contenido':'Contents'}"><ol class="toc-list">${all.filter(h=>h.level===2).map(h=>`<li><a href="#${h.id}">${inline(h.title.replace(/^`[^`]+` — /,''))}</a></li>`).join('')}</ol></nav></details>`;
  let i=0, currentHeading='';
  const labels=Object.fromEntries(all.filter(h=>[...CONCEPT_IDS,...TOPIC_IDS].includes(h.id as typeof CONCEPT_IDS[number])).map(h=>[h.id,h.title.replace(/^`[^`]+` — /,'')]));
  let successIndex=0,diagramIndex=0;
  const figureFor=(id:string):string=>{
    const figures:Record<string,[number,string,string]>={
      'engineering.architecture':[1,'De requisitos a arquitectura, comportamiento y evidencia.','From requirements to architecture, behavior and evidence.'],
      'scope.application':[2,'Aplicación, sistema, plataforma y ecosistema tienen alcances diferentes.','Application, system, platform and ecosystem have different scopes.'],
      'design.boundary':[3,'Dependencias a través de un contrato explícito.','Dependencies through an explicit contract.'],
      'fpa.frontend-platform':[4,'Responsabilidades distintas de FPA, AIPE y Staff.','Separate responsibilities of FPA, AIPE and Staff.'],
      'aipe.ai-product':[5,'Una función de IA separa generación, validación y revisión.','An AI feature separates generation, validation and review.']
    };const v=figures[id];if(!v)return '';
    const caption=v[lang==='es'?1:2],number=String(v[0]).padStart(2,'0');
    return `<figure class="concept-diagram"><img src="${base}${lang}/shared/diagrams/PA-S001/theory-${lang}-${number}.svg" loading="lazy" alt="${escapeHtml(caption)}"><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
  };
  while(i<lines.length){
    const line=lines[i]!;
    if(!line){i++;continue;}
    const heading=all.find(h=>h.line===i);
    if(heading){
      currentHeading=heading.id;
      out.push(heading.level===1
        ? `<h2 id="${heading.id}" class="chapter-title">${inline(heading.title)}</h2>`
        : conceptHeading(heading,lang)??`<h${heading.level} id="${heading.id}">${inline(heading.title)}</h${heading.level}>`);
      if(heading.id==='visual-learning-studio')out.push(studio(source,lang,base));
      i++;continue;
    }
    if(line.startsWith('> ')){
      const group:string[]=[];while(lines[i]?.startsWith('> '))group.push(lines[i++]!.slice(2));
      if(group.length!==4||!/^\*\*/.test(group[0]!))throw new Error(`Invalid ${lang} synthesis`);
      out.push(`<aside class="synthesis"><h2>${inline(group[0]!)}</h2><ol>${group.slice(1).map(item=>`<li>${inline(item.replace(/^[1-3]\. /,''))}</li>`).join('')}</ol></aside>`);
      continue;
    }
    if(line.startsWith('```')){
      const language=line.slice(3);const code:string[]=[];i++;
      while(i<lines.length&&lines[i]!== '```')code.push(lines[i++]!);
      if(i===lines.length)throw new Error(`Unclosed ${lang} code fence`);
      const original=code.join('\n');
      if(language==='text'){
        const diagram=asciiDiagrams[lang][diagramIndex++];
        if(!diagram||createHash('sha256').update(original).digest('hex')!==diagram.hash)throw new Error(`Unrecognized ${lang} text diagram ${diagramIndex}`);
        const number=String(diagramIndex).padStart(2,'0');
        const caption=escapeHtml(diagram.caption);
        const label=lang==='es'?'Descripción textual original':'Original text description';
        out.push(`<figure class="concept-diagram"><img src="${base}${lang}/shared/diagrams/PA-S001/ascii-${lang}-${number}.svg" loading="lazy" alt="${caption}"><figcaption>${caption}</figcaption><details><summary>${label}</summary><pre class="code"><code class="language-text">${escapeHtml(original)}</code></pre></details></figure>`);
      }else out.push(`<pre class="code"><code class="language-${escapeHtml(language)}">${escapeHtml(original)}</code></pre>`);
      i++;continue;
    }
    if(line.startsWith('|')){
      const table:string[]=[];while(lines[i]?.startsWith('|'))table.push(lines[i++]!);
      const cells=(row:string)=>row.slice(1,-1).split('|').map(cell=>cell.trim());
      const rows=table.filter(row=>!/^\|[-| :]+\|$/.test(row));
      out.push(`<div class="scroll"><table><thead><tr>${cells(rows[0]!).map(cell=>`<th scope="col">${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row=>`<tr>${cells(row).map(cell=>`<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);continue;
    }
    if(/^\d+\. /.test(line)){
      const items:string[]=[];while(/^\d+\. /.test(lines[i]??''))items.push(lines[i++]!);
      out.push(`<ol>${items.map(item=>{
        const content=item.replace(/^\d+\. /,'');const study=content.match(/^\*\*`(PA-S001\.exercise\.[a-z-]+)`:\*\* (.+)$/);
        return study?`<li class="canonical-study-item"><label><input type="checkbox" data-study-id="${study[1]}"><span><strong>${study[1]}</strong>: ${inline(study[2]!)}</span></label></li>`:`<li>${inline(content)}</li>`;
      }).join('')}</ol>`);continue;
    }
    if(line.startsWith('- ')){
      const items:string[]=[];while(lines[i]?.startsWith('- '))items.push(lines[i++]!);
      out.push(`<ul>${items.map(item=>{
        const content=item.slice(2),check=content.match(/^\[ \] `(PA-S001\.check\.[a-z-]+)` (.+)$/);
        const citation=content.match(/^\[(R[1-8]|P1)\] /);
        if(currentHeading==='success-criteria' && content.startsWith('[ ] ')){const id=SUCCESS_IDS[successIndex++];if(!id)throw new Error('Too many success criteria');return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="${id}"><span>${inline(content.slice(4))}</span></label></li>`;}
        if(check)return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="${check[1]}"><span><strong>${check[1]}</strong> ${inline(check[2]!)}</span></label></li>`;
        return `<li${citation?` id="source-${citation[1]}"`:''}>${inline(content)}</li>`;
      }).join('')}</ul>`);continue;
    }
    if(/^\*\*(?:Nivel|Level) 3 —/.test(line)){
      const match=line.match(/^\*\*([^*]+)\*\* (.*)$/)!;
      out.push(`<details class="deep-dive"><summary><span class="reading-level-title">${escapeHtml(match[1]!)}</span></summary><p>${inline(match[2]!)}</p></details>`);i++;continue;
    }
    const metadata=chapterMetadata(line);
    if(metadata){out.push(metadata);i++;continue;}
    const level=line.match(/^\*\*((?:Nivel|Level) [12] — [^*]+)\*\* (.*)$/);
    if(level){const blocks=level[2]!.split(/(?=📥|⚙️|📤|💡|\*\*(?:Recuperación|Retrieval):\*\*)/).map(part=>part.trim()).filter(Boolean);out.push(`<div class="reading-level"><h4>${escapeHtml(level[1]!)}</h4>${blocks.map(part=>`<p>${inline(part)}</p>`).join('')}</div>`);if(/^(?:Nivel|Level) 2/.test(level[1]!)){out.push(figureFor(currentHeading));out.push(renderReferenceExperience(currentHeading,lang,labels));}i++;continue;}
    const lead=line.match(/^\*\*([^*]+\.)\*\* (.+)$/);
    if(lead){
      const title=lead[1]!.replace(/:\s*(?:definición|definition)\.$/i,'').replace(/\.$/,'');
      const parent=all.find(h=>h.id===currentHeading);
      const depth=parent&&parent.level>=3?4:3;
      out.push(`<h${depth} class="instructional-heading">${inline(title)}</h${depth}><p>${inline(lead[2]!)}</p>`);i++;continue;
    }
    out.push(`<p>${inline(line)}</p>`);i++;
  }
  if(successIndex!==SUCCESS_IDS.length)throw new Error(`Canonical ${lang} success criteria count differs`);
  if(diagramIndex!==asciiDiagrams[lang].length)throw new Error(`Canonical ${lang} text diagram count differs`);
  return {html:out.join('\n'),toc};
}
export function canonicalSearchSections(source:string):CanonicalSearchSection[]{
  const lang=source.includes('## Objetivo')?'es':'en',all=headings(source,lang);
  return all.filter(h=>h.level===2||[...CONCEPT_IDS,...TOPIC_IDS].includes(h.id as typeof CONCEPT_IDS[number]))
    .map(h=>({id:h.id,title:h.title.replace(/^`[^`]+` — /,''),text:sectionText(source,h,all).replace(/[#*`|]/g,' ').slice(0,1600)}));
}
