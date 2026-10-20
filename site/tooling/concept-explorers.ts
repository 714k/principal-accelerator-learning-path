/** Declarative bilingual reference experiences for PA-S001. Not a generic simulation engine. */
export type LearningPattern='conceptual'|'structural'|'causal'|'decisional';
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export const referenceExperiences:Readonly<Record<string,LearningPattern>>={
  'scope.application':'conceptual',
  'design.coupling':'structural',
  'quality.attribute':'causal',
  'aipe.ai-product':'decisional'
};
export function renderReferenceExperience(id:string,lang:'es'|'en'):string{
  const pattern=referenceExperiences[id];if(!pattern)return '';
  const es=lang==='es',t=(a:string,b:string)=>es?a:b;
  const option=(value:string,label:string)=>`<option value="${value}">${escape(label)}</option>`;
  const select=(name:string,values:[string,string,string][],attr='')=>`<label>${escape(name)}<select ${attr}>${values.map(([v,a,b])=>option(v,t(a,b))).join('')}</select></label>`;
  let controls='',fallback='',title='',mechanism='';
  if(pattern==='conceptual'){
    title=t('¿Qué cambia cuando cambiamos la perspectiva?','What changes when we change perspective?');
    mechanism=t('Selecciona una perspectiva sobre P0. Observa cómo cambian la definición, el ejemplo y la frontera del concepto.','Choose a perspective on P0. Observe how the definition, example and concept boundary change.');
    controls=`<div class="reference-choice-group" role="group" aria-label="${t('Perspectivas','Perspectives')}">${[['application','Aplicación','Application'],['system','Sistema','System'],['platform','Plataforma','Platform'],['ecosystem','Ecosistema','Ecosystem']].map(([v,a,b])=>`<button type="button" data-choice="${v}" aria-pressed="false">${t(a,b)}</button>`).join('')}</div>`;
    fallback=t('Sin JavaScript: aplicación = tarea de usuario; sistema = elementos coordinados; plataforma = capacidades para consumidores; ecosistema = actores y relaciones externos.','Without JavaScript: application = user task; system = coordinated elements; platform = capabilities for consumers; ecosystem = external actors and relationships.');
  }else if(pattern==='structural'){
    title=t('Propagación de un cambio entre módulos','Change propagation across modules');
    mechanism=t('Modelo hipotético dirigido: Renderer → esquema → sesiones ES/EN. Cambia la dependencia del portafolio y observa qué nodos son alcanzables desde Renderer; alcanzabilidad no implica que todos deban modificarse.','Hypothetical directed graph: Renderer → schema → ES/EN sessions. Change the portfolio dependency and observe which nodes are reachable from Renderer; reachability does not mean every node must change.');
    controls=select(t('Grafo de dependencias','Dependency graph'),[['contract','Portafolio independiente','Independent portfolio'],['shared','Portafolio depende del renderer','Portfolio depends on renderer']],'data-graph');
    fallback=t('Sin JavaScript: grafo A: Renderer → esquema → ES/EN; portafolio separado. Grafo B: agrega Renderer → portafolio. El segundo tiene un consumidor potencial adicional.','Without JavaScript: graph A: Renderer → schema → ES/EN; portfolio separate. Graph B: add Renderer → portfolio. The second has one more potentially affected consumer.');
  }else if(pattern==='causal'){
    title=t('Escenario de calidad: condiciones y evidencia','Quality scenario: conditions and evidence');
    mechanism=t('Cambia condiciones declaradas de una página. Las reglas identifican qué se debe comprobar, pero no ejecutan una prueba de accesibilidad.','Change declared page conditions. Rules identify what must be checked, but do not run an accessibility test.');
    controls=select(t('JavaScript','JavaScript'),[['on','Disponible','Available'],['off','Deshabilitado','Disabled']],'data-js')+select(t('Operación con teclado','Keyboard operation'),[['pass','Declarada operable','Declared operable'],['fail','No operable','Not operable']],'data-keyboard');
    fallback=t('Sin JavaScript: el contenido crítico debe existir en HTML. Un control no operable con teclado falla el escenario; afirmar que sí es operable exige prueba real.','Without JavaScript: critical content must exist in HTML. A keyboard-inoperable control fails the scenario; claiming it works requires a real test.');
  }else{
    title=t('Decidir la frontera de un resumen asistido por IA','Deciding the boundary of an AI-assisted summary');
    mechanism=t('Caso hipotético: datos, citas y revisión humana son condiciones independientes. Cambiarlas revela razones para bloquear una publicación; no constituye política universal.','Hypothetical case: data, citations and human review are independent conditions. Changing them reveals reasons to block publication; this is not a universal policy.');
    controls=select(t('Datos','Data'),[['public','Texto público autorizado','Authorized public text'],['sensitive','Datos privados no autorizados','Unauthorized private data']])+select(t('Citas','Citations'),[['yes','Verificadas','Verified'],['no','Sin verificar','Unchecked']])+select(t('Revisión humana','Human review'),[['yes','Disponible','Available'],['no','No disponible','Unavailable']]);
    fallback=t('Sin JavaScript: detener datos privados no autorizados; sin citas verificadas no afirmar hechos; sin revisión humana no publicar. Incluso con todas las condiciones favorables, la salida es solo borrador.','Without JavaScript: stop unauthorized private data; without verified citations do not assert facts; without human review do not publish. Even with favorable conditions the output remains a draft.');
  }
  return `<section class="reference-explorer" data-explorer="${pattern}" data-concept-ref="${escape(id)}" aria-label="${escape(title)}"><p class="concept-eyebrow">${t('EXPLORA EL MECANISMO','EXPLORE THE MECHANISM')}</p><h4>${escape(title)}</h4><p>${escape(mechanism)}</p><div class="reference-controls">${controls}</div><div class="reference-result" data-explorer-output role="status" aria-live="polite"><p>${escape(fallback)}</p></div><p class="reference-fallback">${escape(fallback)}</p><p class="reference-citation">${t('Fuente de la explicación:','Explanation source:')} <a href="#source-${pattern==='decisional'?'R7':pattern==='causal'?'R5':pattern==='structural'?'R2':'P1'}">[${pattern==='decisional'?'R7':pattern==='causal'?'R5':pattern==='structural'?'R2':'P1'}]</a>. ${t('Modelo didáctico, no medición del repositorio ni acreditación de dominio.','Instructional model, not a repository measurement or mastery assessment.')}</p></section>`;
}
