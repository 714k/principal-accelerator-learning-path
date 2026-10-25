import { escapeHtml, shell } from './render.ts';

type Lang='es'|'en';
function inline(value:string):string {
  const held:string[]=[]; const hold=(html:string)=>{const id=`@@${held.length}@@`;held.push(html);return id;};
  let text=value.replace(/`([^`]+)`/g,(_,value:string)=>hold(`<code>${escapeHtml(value)}</code>`));
  text=text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,(_,label:string,url:string)=>hold(`<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`));
  return escapeHtml(text).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/@@(\d+)@@/g,(_,id:string)=>held[Number(id)]!);
}
function slug(value:string):string { return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/`/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function map(lang:Lang,base:string):string {
  const alt=lang==='es'?'Mapa mental de PA-S004: sistema de diseño, tokens y verificación de accesibilidad.':'PA-S004 mind map: design system, tokens, and accessibility verification.';
  return `<figure class="diagram"><img src="${base}${lang}/shared/diagrams/PA-S004/mindmap.svg" alt="${alt}" loading="lazy"><figcaption>${lang==='es'?'Mapa mental para relacionar contratos, tokens y verificación.':'Mind map relating contracts, tokens, and verification.'}</figcaption></figure>`;
}
function theoryDiagram(lang:Lang,index:number,base:string,code:string):string {
  const captions=lang==='es' ? [
    'De una necesidad recurrente a la evolución del patrón compartido.',
    'Ciclo de propuesta, decisión, publicación, uso y retroalimentación.',
    'La fuente de tokens pasa por validación y transformación antes del consumo.',
    'La evaluación de accesibilidad combina alcance, pruebas y revalidación.',
    'La verificación combina herramientas, teclado, flujos y tecnologías de asistencia.',
    'Una decisión compartida se publica, evalúa y evoluciona mediante contratos.'
  ] : [
    'From a recurring need to shared-pattern evolution.',
    'Cycle of proposal, decision, publication, use, and feedback.',
    'The token source passes through validation and transformation before consumption.',
    'Accessibility evaluation combines scope, tests, and revalidation.',
    'Verification combines tools, keyboard, flows, and assistive technologies.',
    'A shared decision is published, evaluated, and evolved through contracts.'
  ];
  const caption=captions[index-1] ?? (lang==='es'?'Diagrama de teoría PA-S004.':'PA-S004 theory diagram.');
  const source=`${base}${lang}/shared/diagrams/PA-S004/theory-${lang}-${String(index).padStart(2,'0')}.svg`;
  return `<figure class="diagram-card"><img class="session-diagram" src="${source}" alt="${caption}" loading="lazy"><figcaption>${caption}</figcaption><details><summary>${lang==='es'?'Fuente Mermaid':'Mermaid source'}</summary><pre class="code"><code>${escapeHtml(code)}</code></pre></details></figure>`;
}
function studio(lang:Lang,base:string):string {
 const es=lang==='es'; const cards=es?[
 ['F01','Sistema de diseño','¿Qué añade un sistema de diseño a una guía y una biblioteca?','Contratos, documentación, adopción, mantenimiento y gobernanza coordinados.'],
 ['F02','Gobernanza','¿Qué no resuelve una política de adopción?','No repara un contrato compartido que no cubre una necesidad válida.'],
 ['F03','Tokens','¿Qué distingue un token semántico?','Nombra intención de interfaz, no solo un valor base.'],
 ['F04','Flujo de tokens','¿Qué no garantiza un formato válido?','No garantiza contraste, significado ni uso apropiado.'],
 ['F05','WCAG','¿Qué limita una declaración de conformidad?','El alcance, contenido y tecnologías realmente evaluados.'],
 ['F06','Semántica','¿Qué falta a un div con role button?','Comportamiento, foco, activación por teclado, nombre y estados.'],
 ['F07','Foco','¿Qué verifica un indicador visible?','Que la persona pueda percibir dónde está el foco.'],
 ['F08','Presentación','¿Qué debe acompañar al color?','Otra señal perceptible y exposición semántica.'],
 ['F09','Verificación','¿Qué demuestra un test automático que pasa?','Solo que pasó en el entorno y rutas ejecutados.'],
 ['F10','Tema principal','¿Cuándo es reutilizable una decisión?','Cuando sus consumidores pueden entenderla, adoptarla y corregirla por un canal visible.'],
 ['F11','Producto interno','¿Qué necesitan los consumidores además de archivos?','Propósito, límites, versiones, compatibilidad y soporte.'],
 ['F12','Intención y valor','¿Por qué no consumir primitivas directamente?','Porque compartir valor no prueba compartir rol.'],
 ['F13','Contrato de plataforma','¿Por qué no basta un componente compartido?','Su comportamiento y contexto aún deben verificarse.']
 ]:[
 ['F01','Design system','What does a design system add beyond a guide and library?','Coordinated contracts, documentation, adoption, maintenance, and governance.'],
 ['F02','Governance','What does an adoption policy not solve?','It does not repair a shared contract that misses a valid need.'],
 ['F03','Tokens','What distinguishes a semantic token?','It names interface intent, not merely a base value.'],
 ['F04','Token flow','What does a valid format not guarantee?','It does not guarantee contrast, meaning, or appropriate use.'],
 ['F05','WCAG','What limits a conformance claim?','The scope, content, and technologies actually evaluated.'],
 ['F06','Semantics','What is missing from a div with role button?','Behavior, focus, keyboard activation, name, and states.'],
 ['F07','Focus','What does a visible indicator verify?','That a person can perceive where focus is.'],
 ['F08','Presentation','What must accompany color?','Another perceivable signal and semantic exposure.'],
 ['F09','Verification','What does a passing automated test demonstrate?','Only that it passed in the executed environment and routes.'],
 ['F10','Main topic','When is a decision reusable?','When consumers can understand, adopt, and correct it through a visible channel.'],
 ['F11','Internal product','What do consumers need beyond files?','Purpose, limits, versions, compatibility, and support.'],
 ['F12','Intent and value','Why not consume primitives directly?','Sharing a value does not prove sharing a role.'],
 ['F13','Platform contract','Why is a shared component not enough?','Its behavior and context still need verification.']
 ];
 const items=cards.map((card,index)=>`<article class="flashcard" data-flashcard data-flash-id="${card[0]}"><button type="button" data-flash-flip aria-pressed="false" data-reveal-label="${es?'Mostrar respuesta':'Reveal answer'}: ${escapeHtml(card[2]!)}" data-hide-label="${es?'Mostrar pregunta':'Show question'}: ${escapeHtml(card[2]!)}"><strong>${inline(card[2]!)}</strong></button><div class="flashcard-answer"><p><strong>${es?'Respuesta':'Answer'}:</strong> ${inline(card[3]!)}</p><p>${es?'Fuente':'Source'}: ${inline(card[1]!)}</p></div><p class="sr-only">${index+1} / ${cards.length}</p></article>`).join('');
 return `<div class="learning-studio" data-learning-studio><nav class="visual-mode-nav" data-mode-nav aria-label="${es?'Modos de estudio visual':'Visual study modes'}"><a id="s004-tab-map" href="#s004-map" data-mode-control>${es?'Mapa mental':'Mind map'}</a><a id="s004-tab-cards" href="#s004-cards" data-mode-control>${es?'Tarjetas':'Cards'}</a><a id="s004-tab-compare" href="#s004-compare" data-mode-control>${es?'Comparar':'Compare'}</a></nav><section id="s004-map" class="visual-mode-panel" data-visual-panel><h3>${es?'Mapa de conceptos':'Concept map'}</h3>${map(lang,base)}</section><section id="s004-cards" class="visual-mode-panel" data-visual-panel><h3>${es?'Recuperación: 13 tarjetas':'Retrieval: 13 cards'}</h3><p>${es?'Las respuestas permanecen disponibles sin JavaScript.':'Answers remain available without JavaScript.'}</p><div class="flashcard-deck" data-flashcards tabindex="0"><div class="flashcard-controls"><button type="button" data-flash-prev>${es?'Anterior':'Previous'}</button><output data-flashcard-count aria-live="polite">1 / ${cards.length}</output><button type="button" data-flash-next>${es?'Siguiente':'Next'}</button></div>${items}</div></section><section id="s004-compare" class="visual-mode-panel" data-visual-panel><h3>${es?'Capas de token':'Token layers'}</h3><div class="scroll"><table><thead><tr><th>${es?'Primitivo':'Primitive'}</th><th>${es?'Semántico':'Semantic'}</th><th>${es?'Componente':'Component'}</th></tr></thead><tbody><tr><td><code>blue.700</code><br>${es?'Valor base':'Base value'}</td><td><code>color.text.primary</code><br>${es?'Intención de interfaz':'Interface intent'}</td><td><code>button.primary.background</code><br>${es?'Uso limitado':'Limited use'}</td></tr></tbody></table></div></section></div>`;
}
export function renderS004(source:string,lang:Lang,base:string):string {
 const lines=source.replace(/^\uFEFF/,'').split('\n').map(line=>line.replace(/\r$/,'')),out:string[]=[],toc:string[]=[];let i=0,headingCount=0,mermaidIndex=0;
 while(i<lines.length){const line=lines[i]!; if(!line.trim()){i++;continue;}
  if(line.startsWith('```')){const kind=line.slice(3).trim(),code:string[]=[];i++;while(i<lines.length&&!lines[i]!.startsWith('```'))code.push(lines[i++]!);i++;out.push(kind==='mermaid'?theoryDiagram(lang,++mermaidIndex,base,code.join('\n')):`<pre class="code"><code>${escapeHtml(code.join('\n'))}</code></pre>`);continue;}
  if(line.startsWith('> **')){const title=line.slice(2).replace(/^\*\*|\*\*$/g,'');const items:string[]=[];i++;while(i<lines.length&&lines[i]!.startsWith('>')){const value=lines[i]!.replace(/^>\s?/,'');if(value)items.push(value);i++;}out.push(`<aside class="synthesis"><h2>${inline(title)}</h2><ol>${items.map(item=>`<li>${inline(item)}</li>`).join('')}</ol></aside>`);continue;}
  const heading=line.match(/^(#{1,4}) (.+)$/);if(heading){const level=heading[1]!.length,title=heading[2]!,id=level===1?'chapter-title':slug(title)||`section-${++headingCount}`;if(level===2)toc.push(`<li><a href="#${id}">${inline(title)}</a></li>`);out.push(level===1?`<h2 id="${id}" class="chapter-title">${inline(title)}</h2>`:`<h${Math.min(level+1,4)} id="${id}">${inline(title)}</h${Math.min(level+1,4)}>`);if(/Visual Learning Studio|Visual Learning Guide/i.test(title))out.push(studio(lang,base));i++;continue;}
  if(/^\*\*(?:Fase|Phase):/.test(line)){out.push(`<div class="chapter-meta"><div class="chapter-meta-item"><h3>${lang==='es'?'Datos de la sesión':'Session details'}</h3><p>${inline(line)}</p></div></div>`);i++;continue;}
  const retrieval=line.match(/^\*\*(?:Recuperación|Retrieval)\.\*\* (.+)$/);if(retrieval){let j=i+1;while(j<lines.length&&!lines[j]!.trim())j++;const answer=lines[j]?.match(/^\*\*(?:Respuesta|Answer)\.\*\* (.+)$/);if(answer){out.push(`<details class="mechanism-retrieval"><summary><strong>${lang==='es'?'Comprueba tu comprensión':'Check your understanding'}:</strong> ${inline(retrieval[1]!)}</summary><p><strong>${lang==='es'?'Respuesta razonada':'Reasoned answer'}:</strong> ${inline(answer[1]!)}</p></details>`);i=j+1;continue;}}
  if(/^\|/.test(line)&&/^\|/.test(lines[i+1]??'')){const group:string[]=[];while(i<lines.length&&lines[i]!.startsWith('|'))group.push(lines[i++]!);const rows=group.filter(row=>!/^\|\s*-/.test(row)).map(row=>row.split('|').slice(1,-1).map(cell=>cell.trim()));out.push(`<div class="scroll"><table><thead><tr>${rows[0]!.map(cell=>`<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row=>`<tr>${row.map(cell=>`<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);continue;}
  if(/^[-*] /.test(line)){const items:string[]=[];while(i<lines.length&&/^[-*] /.test(lines[i]??''))items.push(lines[i++]!.replace(/^[-*] /,''));out.push(`<ul>${items.map(item=>{const study=item.match(/^\[ \] `(PA-S004:(?:exercise|check|success):\d+)`\s+(.+)$/);return study?`<li class="canonical-study-item"><label><input type="checkbox" data-study-id="${study[1]}"><span>${inline(study[2]!)}</span></label></li>`:`<li>${inline(item)}</li>`;}).join('')}</ul>`);continue;}
  if(/^\d+\. /.test(line)){const items:string[]=[];while(i<lines.length&&/^\d+\. /.test(lines[i]??''))items.push(lines[i++]!.replace(/^\d+\. /,''));out.push(`<ol>${items.map(item=>`<li>${inline(item)}</li>`).join('')}</ol>`);continue;}
  out.push(`<p>${inline(line)}</p>`);i++;
 }
 const title=lang==='es'?'Sistemas de diseño, tokens y fundamentos de accesibilidad':'Design systems, tokens, and accessibility foundations';
 const crumb=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${lang}/sessions/">${lang==='es'?'Sesiones':'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S004</span></nav>`;
 return shell(lang,title,`${crumb}<div class="page-intro"><p class="eyebrow">F0 / PA-S004</p><h1>${title}</h1><p class="lead">${lang==='es'?'Contratos de plataforma, tokens y evidencia de accesibilidad verificable.':'Platform contracts, tokens, and verifiable accessibility evidence.'}</p><p class="notice">${lang==='es'?'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno':'Editorial draft · Mastery not assessed · No learner measurements'}</p></div><div class="layout"><details class="toc"><summary>${lang==='es'?'Contenido':'Contents'}</summary><nav><ol>${toc.join('')}</ol></nav></details><article class="canonical-theory">${out.join('\n')}</article></div>`,base,`${lang==='es'?'en':'es'}/sessions/PA-S004/`);
}
