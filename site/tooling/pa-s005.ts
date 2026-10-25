import { escapeHtml, shell } from './render.ts';

type Lang='es'|'en';
function inline(value:string):string {
  const held:string[]=[]; const hold=(html:string)=>{const id=`@@${held.length}@@`;held.push(html);return id;};
  let text=value.replace(/`([^`]+)`/g,(_,v:string)=>hold(`<code>${escapeHtml(v)}</code>`));
  text=text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,(_,label:string,url:string)=>hold(`<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`));
  return escapeHtml(text).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/@@(\d+)@@/g,(_,id:string)=>held[Number(id)]!);
}
function slug(value:string):string { return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/`/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function diagram(lang:Lang,index:number,base:string,code:string):string {
  const captions=lang==='es' ? [
    'Señales de idioma resueltas por una política explícita.',
    'Modelo de contenido con identidad estable, traducciones y estado compartido.',
    'De la solicitud localizada a la validación o el bloqueo de publicación.'
  ] : [
    'Language signals resolved through an explicit policy.',
    'Content model with stable identity, translations, and shared state.',
    'From localized request to validation or publication blocking.'
  ];
  const source=`${base}${lang}/shared/diagrams/PA-S005/theory-${lang}-${String(index).padStart(2,'0')}.svg`;
  const caption=captions[index-1] ?? (lang==='es'?'Diagrama de teoría PA-S005.':'PA-S005 theory diagram.');
  return `<figure class="diagram-card"><img class="session-diagram" src="${source}" alt="${caption}" loading="lazy"><figcaption>${caption}</figcaption><details><summary>${lang==='es'?'Fuente Mermaid':'Mermaid source'}</summary><pre class="code"><code>${escapeHtml(code)}</code></pre></details></figure>`;
}
function map(lang:Lang,base:string):string {
  const alt=lang==='es'?'Mapa mental de PA-S005: contratos de contenido bilingüe, locale, rutas, accesibilidad, validación y ownership.':'PA-S005 mind map: bilingual-content contracts, locale, routes, accessibility, validation, and ownership.';
  return `<figure class="diagram"><img src="${base}${lang}/shared/diagrams/PA-S005/mindmap.svg" alt="${alt}" loading="lazy"><figcaption>${lang==='es'?'Mapa mental para relacionar identidad, locale y operación.':'Mind map relating identity, locale, and operation.'}</figcaption></figure>`;
}
function studio(lang:Lang,base:string):string {
  const es=lang==='es';
  const cards=es?[
    ['F01','C01 [R8]','¿i18n=l10n?','No: i18n prepara capacidad; l10n adapta una experiencia a un locale.'],
    ['F02','C02 [PS]','Mensaje vs dato','Mensaje expresa; dato conserva identidad o valor independiente de etiqueta.'],
    ['F03','C03 [R8]','¿Label como clave?','Copy cambia; un ID estable conserva estado y relaciones.'],
    ['F04','C04 [R1,R2,R5]','¿Pedido=contenido=formato?','No siempre; son contratos distintos.'],
    ['F05','C05 [R2–R4]','¿Fallback invisible?','Solo si la política lo admite; exponer idioma y trazar la ausencia.'],
    ['F06','C06 [R6,R7]','¿Concatenar unidad?','Orden, plural e inflexión varían; traducir el mensaje completo.'],
    ['F07','C07 [R5,R6]','¿Persistir número formateado?','No; persistir valor tipado y formatear al mostrar.'],
    ['F08','C08 [PS]','¿Qué comparten ES/EN?','IDs, relaciones y cobertura; no bytes ni longitud.'],
    ['F09','C09 [PS]','¿Cómo alternar ruta?','Mapear la misma entidad por ID o aplicar fallback declarado.'],
    ['F10','C10 [R3,R4]','¿Qué informa lang?','Idioma de página o pasaje para presentación lingüística adecuada.'],
    ['F11','C11 [PS]','¿Mismo encabezado es paridad?','No; comprobar significado, respuestas y comportamiento.'],
    ['F12','C12 [PS]','¿translated=true prueba revisión?','Solo estado auténtico; no sustituye revisión.'],
    ['F13','C13 [PS]','¿Servicio global siempre?','No; depende de consumidores y costos observados.'],
    ['F14','C14 [PS]','¿Qué contiene decisión?','Contexto, opciones, criterios, consecuencias y revisión.'],
    ['F15','Tema principal [R1–R7]','¿URL a texto?','Resolver locale, cargar por ID, formatear dato y declarar idioma real.'],
    ['F16','Subtema 1','¿Traducción cambia tracking?','No si entidad no cambia; usar ID estable.'],
    ['F17','Subtema 2','¿Intl es traducción es-MX?','No; formato disponible no garantiza texto localizado.'],
    ['F18','Subtema 3','¿Qué cubre deep link?','Recurso, locale, fallback, ruta y navegación fuera de home.'],
    ['F19','Subtema 4','¿Qué prueba gate?','Solo reglas codificadas; no calidad, aprendizaje ni mastery.'],
    ['F20','Ejemplo listo para producción','¿Qué queda igual ES↔EN?','ID y estado de estudio; cambia presentación sin escribir evidencia.']
  ]:[
    ['F01','C01 [R8]','Does i18n equal l10n?','No: i18n prepares capability; l10n adapts an experience to a locale.'],
    ['F02','C02 [PS]','Message versus data','A message expresses; data retains identity or value beyond its label.'],
    ['F03','C03 [R8]','Label as key?','Copy changes; a stable ID retains state and relations.'],
    ['F04','C04 [R1,R2,R5]','Requested=content=format?','Not always; they are different contracts.'],
    ['F05','C05 [R2–R4]','Invisible fallback?','Only if policy permits it; expose language and trace absence.'],
    ['F06','C06 [R6,R7]','Concatenate a unit?','Order, plural, and inflection vary; translate the full message.'],
    ['F07','C07 [R5,R6]','Persist a formatted number?','No; persist typed value and format it at display.'],
    ['F08','C08 [PS]','What do ES/EN share?','IDs, relations, and coverage; not bytes or length.'],
    ['F09','C09 [PS]','How to switch route?','Map the same entity by ID or apply declared fallback.'],
    ['F10','C10 [R3,R4]','What does lang convey?','Page or passage language for appropriate linguistic presentation.'],
    ['F11','C11 [PS]','Does same heading prove parity?','No; check meaning, answers, and behavior.'],
    ['F12','C12 [PS]','Does translated=true prove review?','Only genuine state; it does not replace review.'],
    ['F13','C13 [PS]','A global service always?','No; it depends on consumers and observed costs.'],
    ['F14','C14 [PS]','What belongs in a decision?','Context, options, criteria, consequences, and review.'],
    ['F15','Main topic [R1–R7]','URL to text?','Resolve locale, load by ID, format data, and declare real language.'],
    ['F16','Subtopic 1','Does translation change tracking?','Not if entity does not change; use a stable ID.'],
    ['F17','Subtopic 2','Is Intl an es-MX translation?','No; available formatting does not guarantee localized text.'],
    ['F18','Subtopic 3','What does a deep link cover?','Resource, locale, fallback, route, and navigation beyond home.'],
    ['F19','Subtopic 4','What does a gate prove?','Only coded rules; not quality, learning, or mastery.'],
    ['F20','Production-ready example','What remains ES↔EN?','Study ID and state; presentation changes without writing evidence.']
  ];
  const items=cards.map((card,index)=>`<article class="flashcard" data-flashcard data-flash-id="${card[0]}"><button type="button" data-flash-flip aria-pressed="false" data-reveal-label="${es?'Mostrar respuesta':'Reveal answer'}: ${escapeHtml(card[2]!)}" data-hide-label="${es?'Mostrar pregunta':'Show question'}: ${escapeHtml(card[2]!)}"><strong>${inline(card[2]!)}</strong></button><div class="flashcard-answer"><p><strong>${es?'Respuesta':'Answer'}:</strong> ${inline(card[3]!)}</p><p>${es?'Fuente':'Source'}: ${inline(card[1]!)}</p></div><p class="sr-only">${index+1} / ${cards.length}</p></article>`).join('');
  const comparison=es?['Señal','Rol','Ejemplo','URL','Locale de contenido','`/es/`','Preferencia','Intención del lector','`en`','Navegador','Convención disponible','`es-MX`','Dato tipado','Valor canónico','`1234.5`']:[
    'Signal','Role','Example','URL','Content locale','`/es/`','Preference','Reader intent','`en`','Browser','Available convention','`es-MX`','Typed data','Canonical value','`1234.5`'];
  return `<div class="learning-studio" data-learning-studio><nav class="visual-mode-nav" data-mode-nav aria-label="${es?'Modos de estudio visual':'Visual study modes'}"><a id="s005-tab-map" href="#s005-map" data-mode-control>${es?'Mapa mental':'Mind map'}</a><a id="s005-tab-cards" href="#s005-cards" data-mode-control>${es?'Tarjetas':'Cards'}</a><a id="s005-tab-compare" href="#s005-compare" data-mode-control>${es?'Comparar':'Compare'}</a></nav><section id="s005-map" class="visual-mode-panel" data-visual-panel><h3>${es?'Mapa de conceptos':'Concept map'}</h3>${map(lang,base)}</section><section id="s005-cards" class="visual-mode-panel" data-visual-panel><h3>${es?'Recuperación: 20 tarjetas':'Retrieval: 20 cards'}</h3><p>${es?'Las respuestas permanecen disponibles sin JavaScript.':'Answers remain available without JavaScript.'}</p><div class="flashcard-deck" data-flashcards tabindex="0"><div class="flashcard-controls"><button type="button" data-flash-prev>${es?'Anterior':'Previous'}</button><output data-flashcard-count aria-live="polite">1 / ${cards.length}</output><button type="button" data-flash-next>${es?'Siguiente':'Next'}</button></div>${items}</div></section><section id="s005-compare" class="visual-mode-panel" data-visual-panel><h3>${es?'Señales separadas':'Separate signals'}</h3><div class="scroll"><table><thead><tr><th>${comparison[0]}</th><th>${comparison[1]}</th><th>${comparison[2]}</th></tr></thead><tbody><tr><td>${comparison[3]}</td><td>${comparison[4]}</td><td>${inline(comparison[5]!)}</td></tr><tr><td>${comparison[6]}</td><td>${comparison[7]}</td><td>${inline(comparison[8]!)}</td></tr><tr><td>${comparison[9]}</td><td>${comparison[10]}</td><td>${inline(comparison[11]!)}</td></tr><tr><td>${comparison[12]}</td><td>${comparison[13]}</td><td>${inline(comparison[14]!)}</td></tr></tbody></table></div></section></div>`;
}
export function renderS005(source:string,lang:Lang,base:string):string {
  const lines=source.replace(/^\uFEFF/,'').split('\n').map(line=>line.replace(/\r$/,'')),out:string[]=[],toc:string[]=[];let i=0,headingCount=0,mermaidIndex=0;
  while(i<lines.length){const line=lines[i]!;if(!line.trim()){i++;continue;}
    if(line.startsWith('```')){const kind=line.slice(3).trim(),code:string[]=[];i++;while(i<lines.length&&!lines[i]!.startsWith('```'))code.push(lines[i++]!);i++;out.push(kind==='mermaid'?diagram(lang,++mermaidIndex,base,code.join('\n')):`<pre class="code"><code>${escapeHtml(code.join('\n'))}</code></pre>`);continue;}
    if(line.startsWith('> **')){const title=line.slice(2).replace(/^\*\*|\*\*$/g,''),items:string[]=[];i++;while(i<lines.length&&lines[i]!.startsWith('>')){const value=lines[i]!.replace(/^>\s?/,'');if(value)items.push(value);i++;}out.push(`<aside class="synthesis"><h2>${inline(title)}</h2><ol>${items.map(item=>`<li>${inline(item)}</li>`).join('')}</ol></aside>`);continue;}
    const heading=line.match(/^(#{1,4}) (.+)$/);if(heading){const level=heading[1]!.length,title=heading[2]!,id=level===1?'chapter-title':slug(title)||`section-${++headingCount}`;if(level===2)toc.push(`<li><a href="#${id}">${inline(title)}</a></li>`);out.push(level===1?`<h2 id="${id}" class="chapter-title">${inline(title)}</h2>`:`<h${Math.min(level+1,4)} id="${id}">${inline(title)}</h${Math.min(level+1,4)}>`);if(/Visual Learning Studio/i.test(title))out.push(studio(lang,base));i++;continue;}
    if(/^\*\*(?:Fase|Phase):/.test(line)){out.push(`<div class="chapter-meta"><div class="chapter-meta-item"><h3>${lang==='es'?'Datos de la sesión':'Session details'}</h3><p>${inline(line)}</p></div></div>`);i++;continue;}
    const retrieval=line.match(/^\*\*(?:Recuperación|Retrieval)\.\*\* (.+)$/);if(retrieval){let j=i+1;while(j<lines.length&&!lines[j]!.trim())j++;const answer=lines[j]?.match(/^\*\*(?:Respuesta|Answer)\.\*\* (.+)$/);if(answer){out.push(`<details class="mechanism-retrieval"><summary><strong>${lang==='es'?'Comprueba tu comprensión':'Check your understanding'}:</strong> ${inline(retrieval[1]!)}</summary><p><strong>${lang==='es'?'Respuesta razonada':'Reasoned answer'}:</strong> ${inline(answer[1]!)}</p></details>`);i=j+1;continue;}}
    if(/^\|/.test(line)&&/^\|/.test(lines[i+1]??'')){const group:string[]=[];while(i<lines.length&&lines[i]!.startsWith('|'))group.push(lines[i++]!);const rows=group.filter(row=>!/^\|\s*-/.test(row)).map(row=>row.split('|').slice(1,-1).map(cell=>cell.trim()));out.push(`<div class="scroll"><table><thead><tr>${rows[0]!.map(cell=>`<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row=>`<tr>${row.map(cell=>`<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);continue;}
    if(/^[-*] /.test(line)){const items:string[]=[];while(i<lines.length&&/^[-*] /.test(lines[i]??''))items.push(lines[i++]!.replace(/^[-*] /,''));out.push(`<ul>${items.map(item=>{const study=item.match(/^\[ \] `(PA-S005:(?:exercise|check):\d+)`\s+(.+)$/);return study?`<li class="canonical-study-item"><label><input type="checkbox" data-study-id="${study[1]}"><span>${inline(study[2]!)}</span></label></li>`:`<li>${inline(item)}</li>`;}).join('')}</ul>${items.some(item=>item.startsWith('[ ] `PA-S005:'))?'<p class="study-status" data-storage-status role="status"></p>':''}`);continue;}
    if(/^\d+\. /.test(line)){const items:string[]=[];while(i<lines.length&&/^\d+\. /.test(lines[i]??''))items.push(lines[i++]!.replace(/^\d+\. /,''));out.push(`<ol>${items.map(item=>`<li>${inline(item)}</li>`).join('')}</ol>`);continue;}
    out.push(`<p>${inline(line)}</p>`);i++;
  }
  const title=lang==='es'?'Arquitectura de contenido ES/EN e internacionalización':'ES/EN content architecture and internationalization';
  const crumb=`<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${lang}/sessions/">${lang==='es'?'Sesiones':'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S005</span></nav>`;
  return shell(lang,title,`${crumb}<div class="page-intro"><p class="eyebrow">F0 / PA-S005</p><h1>${title}</h1><p class="lead">${lang==='es'?'Contratos bilingües de contenido, locale, rutas, accesibilidad y validación.':'Bilingual contracts for content, locale, routes, accessibility, and validation.'}</p><p class="notice">${lang==='es'?'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno':'Editorial draft · Mastery not assessed · No learner measurements'}</p><noscript><p class="notice">${lang==='es'?'La teoría y las respuestas son legibles; las casillas no se guardan sin JavaScript.':'Theory and answers remain readable; study boxes are not saved without JavaScript.'}</p></noscript></div><div class="layout"><details class="toc"><summary>${lang==='es'?'Contenido':'Contents'}</summary><nav><ol>${toc.join('')}</ol></nav></details><article class="canonical-theory">${out.join('\n')}</article></div>`,base,`${lang==='es'?'en':'es'}/sessions/PA-S005/`);
}
