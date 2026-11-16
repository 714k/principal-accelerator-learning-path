"""Generate a small, noncanonical fixture for the v13 DOM and widget contract."""
from pathlib import Path
from html import escape
import json
import subprocess

root = Path(__file__).parent
schema = json.loads((root / 'SESSION-SCHEMA.json').read_text())
names = ['Estructura de la sesión','Tiempo estimado de aprendizaje','Síntesis en 30 segundos','Objetivo','Vista previa del aprendizaje','Conceptos','Tema principal: contratos y cambios compatibles','Integración entre áreas de conocimiento','Teoría → Práctica','Ejemplo del mundo real','Ejemplo listo para producción','Visual Learning Studio global','Ejercicios','Fuentes de conocimiento','Recursos de trabajo','Entregables de la sesión','Checklist de revisión','Criterios de éxito','Puente hacia la siguiente sesión']
records = {
 'contract': ('Contrato', 'Interfaz acordada entre proveedor y consumidor.', 'Una API promete devolver un identificador.', 'Proveedor → consumidor; versión y compatibilidad.'),
 'compatibility': ('Compatibilidad', 'Capacidad de una versión nueva para respetar contratos previos.', 'Agregar un campo opcional conserva el cliente anterior.', 'Contrato → prueba de consumidores.'),
 'validation': ('Validación', 'Comprobación de que una entrada respeta el contrato.', 'Una solicitud sin identificador recibe un error definido.', 'Entrada → validación → salida o error.'),
}
def concepts(ids):
    return '<dl>'+''.join(f'<div data-concept data-concept-id="{key}"><dt>{records[key][0]}:</dt><dd><p data-definition>{records[key][1]}</p><p data-example>Ejemplo: {records[key][2]}</p></dd></div>' for key in ids)+'</dl>'

def diagram(title):
    return f'''<figure data-diagram><svg viewBox="0 0 360 110" role="img" aria-label="{title}"><title>{title}</title><desc>El consumidor envía datos al servicio; la validación dirige la respuesta.</desc><rect x="5" y="25" width="100" height="45" rx="6"/><rect x="135" y="25" width="100" height="45" rx="6"/><rect x="265" y="25" width="90" height="45" rx="6"/><path d="M105 47H135 M235 47H265"/><text x="55" y="52">Cliente</text><text x="185" y="52">Validador</text><text x="310" y="52">API</text></svg><figcaption>{title}: la entrada se valida antes de aplicar cambios; si no satisface el contrato, se informa el error.</figcaption><details><summary>Fuente Mermaid</summary><pre>flowchart LR\nCliente -- entrada --> Validador --> API</pre></details></figure>'''

def studio(scope, ids, modes):
    out=f'<section data-studio-scope="{scope}"><h4>Visual Learning Studio</h4>'
    for mode in modes:
        title={'mind-map':'Mapa mental','flashcards':'Flashcards','simulator':'Simulador','architecture-explorer':'Explorador de arquitectura','decision-matrix':'Matriz de decisión'}[mode]
        out+=f'<section class="widget" data-widget="{mode}" data-coverage="{" ".join(ids)}"><h5>{title}</h5><p>Explora {title.lower()} en este escenario hipotético de contratos.</p><div class="dynamic" hidden></div><div class="fallback"><p>Lectura sin JavaScript:</p>{concepts(ids)}'
        if mode=='simulator': out+='<p>Una entrada válida y compatible se acepta; una inválida o incompatible se rechaza.</p>'
        if mode=='decision-matrix': out+='<p>Compara cambio aditivo y ruptura de contrato, con pesos de compatibilidad y rapidez. Puntuaciones hipotéticas: 5/2 y 1/5.</p>'
        out+='</div></section>'
    return out+'</section>'

ids=list(records)
sections={
'structure':'<nav aria-label="Índice"><ol>'+''.join(f'<li><a href="#{key}">{name}</a>'+('<ol><li><a href="#subtopic-1">Subtema 1: validación de entradas</a></li></ol>' if key=='main-topic' else '')+'</li>' for key,name in zip(schema['sections'],names))+'</ol></nav>',
'estimated-time':'<p>Estimación ilustrativa: teoría 20 min + práctica 10 min = 30 min; no es una sesión del roadmap.</p>',
'summary':'<ol><li>Un contrato define fronteras.</li><li>Los cambios compatibles preservan consumidores.</li><li>La validación protege invariantes.</li></ol>',
'objective':'<p>Distinguir cambios aditivos y rupturas, y predecir su respuesta.</p>',
'preview':'<h3>Staff → Principal</h3><p>Contratos y decisiones de evolución.</p><h3>Frontend Platform Architecture</h3><p>Compatibilidad del cliente.</p><h3>AI Product Engineering</h3><p>No aplica al caso ilustrativo.</p>',
'concepts':'<h3>Staff → Principal</h3>'+concepts(ids),
'main-topic':'<ol><li>Proteger consumidores.</li><li>Validar entradas.</li><li>Evitar rupturas no planificadas.</li></ol><h3>Conceptos del tema principal</h3>'+concepts(ids)+diagram('Flujo de contrato')+'<p>Una versión nueva acepta solicitudes anteriores y valida sus entradas; fallar antes de modificar estado conserva el invariante.</p>'+studio('main-topic',ids,schema['allModes'])+'<section id="subtopic-1" data-section="subtopic-1"><h3>Subtema 1: validación de entradas</h3><ol><li>Identificar el contrato.</li><li>Rechazar datos inválidos.</li><li>Evitar modificar estado.</li></ol><h4>Conceptos del subtema 1</h4>'+concepts(['validation','contract'])+diagram('Validación de entradas')+'<p>Si falta el identificador, el validador devuelve un error antes de procesar la solicitud.</p>'+studio('subtopic-1',['validation','contract'],['mind-map','flashcards','simulator'])+'</section>',
'integration':'<p>Los autores del API y del cliente acuerdan cambios y comprueban compatibilidad compartida.</p>',
'theory-practice':'<p>En un proyecto, documentar el contrato, escribir pruebas del consumidor y evaluar el cambio.</p>',
'real-world':'<p>Esta referencia no atribuye un caso empresarial: es un fixture hipotético, no una lección canónica.</p>',
'production-example':'<p>Diseño ilustrativo no validado en producción: validar ID antes de persistir, devolver error documentado.</p>',
'global-studio':studio('global',ids,schema['allModes']),
'exercises':'<details><summary>¿Qué pasa si desaparece un campo obligatorio?</summary>Se rompe el contrato de consumidores que dependían de él.</details>',
'sources':'<p>Referencia de formato, sin atribuciones empresariales. Consultar fuentes del tema real antes de publicar.</p>',
'work-resources':'<p>Crear un contrato de ejemplo y un fixture de entrada válida e inválida.</p>',
'deliverables':'<p>Esta referencia solo demuestra el HTML; no entrega una aplicación ni una sesión del roadmap.</p>',
'checklist':'<label><input type="checkbox"> Revisé la compatibilidad del ejemplo.</label>',
'success-criteria':'<p>Explicar por qué cambia la salida y predecir un caso nuevo; esta actividad no acredita mastery.</p>',
'bridge':'<p>El siguiente concepto puede ser versionado y migración de consumidores.</p>'}

style='''body{font:16px/1.6 system-ui,sans-serif;max-width:960px;margin:auto;padding:16px;color:#18242d;background:#f7f9fb}h1,h2,h3{line-height:1.25}section{margin:24px 0}a{color:#075a91}button,input,select{font:inherit;max-width:100%}button{padding:8px 12px;border:1px solid #527289;border-radius:6px;background:#fff;color:#18242d;cursor:pointer}button[aria-pressed=true]{background:#174f73;color:white}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #e99b20;outline-offset:3px}button:disabled{opacity:.5}label{display:block;margin:8px 0}.widget{border:1px solid #a5b8c6;border-radius:10px;padding:12px;background:#fff}.controls{display:flex;flex-wrap:wrap;gap:8px}.panel{background:#e8f2f8;padding:12px;margin-top:10px;border-radius:6px}.graph{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:12px;align-items:center}.graph svg{grid-column:1/-1;max-height:85px}.bar{background:#277da1;color:white;min-width:1px;margin:4px 0;padding:4px;box-sizing:border-box}svg{max-width:100%;height:auto}svg rect{fill:#e8f2f8;stroke:#527289}svg path{stroke:#527289;stroke-width:2;fill:none}svg text{fill:#18242d;text-anchor:middle;font-size:12px}dt{font-weight:bold}dd{margin:0 0 12px}pre{white-space:pre-wrap}figure{margin:12px 0} @media(prefers-color-scheme:dark){body,.widget{background:#18242d;color:#e8f2f8}a{color:#9ed7fe}.panel{background:#283f4f}}'''
script='''const concepts = RECORDS;
const make = (tag, text, parent) => { const el=document.createElement(tag); if(text) el.textContent=text; if(parent) parent.append(el); return el; };
function action(parent, label, kind, callback) { const b=make('button',label,parent); b.type='button'; b.dataset.action=kind; b.addEventListener('click',callback); return b; }
for(const widget of document.querySelectorAll('[data-widget]')) {
 const ids=widget.dataset.coverage.split(' '), host=widget.querySelector('.dynamic'), mode=widget.dataset.widget;
 const controls=make('div','',host); controls.className='controls';
 const result=make('div','',host); result.className='panel'; result.dataset.result=''; result.setAttribute('aria-live','polite');
 const update=(text)=>{result.textContent=text};
 if(mode==='mind-map'||mode==='architecture-explorer') {
  controls.className='graph'; const graph=document.createElementNS('http://www.w3.org/2000/svg','svg'); graph.setAttribute('viewBox','0 0 300 60'); graph.setAttribute('aria-hidden','true'); controls.append(graph);
  const links=ids.map((id,index)=>{ const edge=document.createElementNS(graph.namespaceURI,'path'); edge.setAttribute('d',`M150 5 L${50+index*100} 55`); graph.append(edge); return edge; });
  const architecture=[['Cliente','Consume la API. Entrada: acción del usuario. Salida: solicitud con ID. Contrato: forma de solicitud publicada. Depende del validador.'],['Validador','Comprueba el identificador. Entrada: solicitud. Salida: error o entrada válida. Contrato: no persistir si falla. Depende del servicio.'],['Servicio','Aplica el cambio compatible. Entrada: ID validado. Salida: respuesta acordada. Contrato: preservar campos obligatorios.']];
  const buttons=ids.map((id,index)=>action(controls,mode==='architecture-explorer'?architecture[index][0]:concepts[id][0],'select',()=>select(index)));
  function select(index){buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index))); links.forEach((edge,i)=>{edge.style.stroke=i===index?'#df8a00':'#527289';edge.style.strokeWidth=i===index?'5':'2'}); const c=concepts[ids[index]];update(mode==='architecture-explorer'?architecture[index].join(' — '):`${c[0]} — ${c[1]} Ejemplo: ${c[2]} Relación: ${c[3]}`);}
  select(0);
 } else if(mode==='flashcards') {
  let index=0,show=false;const prev=action(controls,'Anterior','previous',()=>{index--;show=false;render()});const flip=action(controls,'Girar tarjeta','flip',()=>{show=!show;render()});const next=action(controls,'Siguiente','next',()=>{index++;show=false;render()});
  function render(){const c=concepts[ids[index]];prev.disabled=index===0;next.disabled=index===ids.length-1;flip.setAttribute('aria-pressed',String(show));update(`${index+1}/${ids.length} — ${show?c[1]+' Ejemplo: '+c[2]:'¿Qué significa '+c[0]+'?'}`)}render();
 } else if(mode==='simulator') {
  const label=make('label','Identificador presente ',controls), input=make('input','',label);input.type='checkbox';input.checked=true;input.dataset.action='variable';
  const wrap=make('label','Escenario ',controls), select=make('select','',wrap);select.dataset.action='scenario';for(const item of ['Compatible','Ruptura','Límite']){const option=make('option',item,select);option.value=item;}
  function render(){const ok=input.checked&&select.value!=='Ruptura';update(`${ok?'Aceptado':'Rechazado'} → ${!input.checked?'Falta identificador; no se modifica estado.':select.value==='Ruptura'?'Contrato incompatible; requiere migración.':select.value==='Límite'?'Entrada mínima válida; se mantiene el contrato.':'Entrada válida y contrato compatible.'}`)}input.addEventListener('change',render);select.addEventListener('change',render);render();
 } else if(mode==='decision-matrix') {
  const sliders=['Compatibilidad','Rapidez'].map((name)=>{const label=make('label',name+' ',controls);const input=make('input','',label);input.type='range';input.min=0;input.max=5;input.value=3;input.dataset.action='weight';input.setAttribute('aria-label',name);input.addEventListener('input',render);return input});
  function render(){const [a,b]=sliders.map(x=>Number(x.value));result.replaceChildren();make('p',`Pesos: ${a}, ${b}. Escala hipotética 1–5; promedio ponderado. Aditivo 5/2; ruptura 1/5.`,result);if(!a&&!b){make('p','Sin ranking: pesos nulos.',result);return;}const scores=[['Aditivo',(5*a+2*b)/(a+b)],['Ruptura',(a+5*b)/(a+b)]].sort((x,y)=>y[1]-x[1]);for(const [name,value] of scores){const bar=make('div',`${name}: ${value.toFixed(2)}`,result);bar.className='bar';bar.style.width=`${value/5*100}%`;}make('p',scores[0][1]===scores[1][1]?'Empate: investigar otros criterios.':`Primero: ${scores[0][0]}. Más peso a compatibilidad favorece el cambio aditivo; rapidez puede favorecer ruptura.`,result)}render();
 }
 host.hidden=false;widget.querySelector('.fallback').hidden=true;
}'''.replace('RECORDS',json.dumps(records,ensure_ascii=False))
html='<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Referencia HTML v13</title><style>'+style+'</style></head><body><main><article><p>Fixture ilustrativo · No canónico</p><h1>Contratos de software: referencia funcional</h1>'
for i,(key,name) in enumerate(zip(schema['sections'],names),1):
    html+=f'\n<section id="{key}" data-section="{key}"><h2>{i}. {escape(name)}</h2>{sections[key]}</section>'
html+='</article></main><script>'+script+'</script></body></html>\n'
output = root / 'SESSION-HTML-REFERENCE.html'
prettier = root.parent / 'node_modules' / 'prettier' / 'bin' / 'prettier.cjs'
if not prettier.is_file():
    raise SystemExit('Install locked repository dependencies before generating the reference (npm ci).')
output.write_text(html, encoding='utf-8')
subprocess.run(['node', str(prettier.resolve()), '--write', str(output.resolve())],
               cwd=root.parent.resolve(), check=True)
