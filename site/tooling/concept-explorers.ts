import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

type Locale='es'|'en';
type Outcome={id:string;title:string;cause:string;mechanism:string;effect:string};
type Lab={id:string;kind:string;concepts:string[];sources:string[];title:string;eyebrow:string;objective:string;intro:string;assumption:string;controls:{id:string;label:string;options:[string,string][]}[];outcomes:Outcome[];illustrations?:{id:string;title:string;steps:string[]}[]};
type Manifest={session:string;lang:Locale;labs:Lab[]};
const directory=resolve(dirname(fileURLToPath(import.meta.url)),'../content/learning-labs');
const specs=Object.fromEntries((['es','en'] as const).map(lang=>[lang,JSON.parse(readFileSync(resolve(directory,'PA-S001.'+lang+'.json'),'utf8')) as Manifest])) as Record<Locale,Manifest>;
export const referenceExperiences:Readonly<Record<string,string>>={
  'scope.application':'sub.scope-layers',
  'design.coupling':'sub.boundary-dependencies',
  'quality.attribute':'sub.quality-constraints',
  'aipe.ai-product':'sub.ai-product'
};
const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const label=(es:boolean,a:string,b:string)=>es?a:b;
function outcomeHtml(outcome:Outcome,es:boolean,limitation?:string):string{
  const parts:[string,string,string][]=[['cause',label(es,'Causa','Cause'),outcome.cause],['mechanism',label(es,'Mecanismo','Mechanism'),outcome.mechanism],['effect',limitation?label(es,'Consecuencia posible','Potential consequence'):label(es,'Efecto y retroalimentación','Effect and feedback'),outcome.effect]];
  if(limitation)parts.push(['limitation',label(es,'Limitaciones','Limitations'),limitation]);
  return '<h5>'+escape(outcome.title)+'</h5>'+parts.map(([key,title,value])=>'<p data-'+key+'><strong>'+title+':</strong> '+escape(value)+'</p>').join('');
}
function prerequisiteIds(lab:Lab):string[]{
  const byKind:Record<string,string[]>={scope:['engineering.software'],dependency:['scope.system','design.boundary'],quality:['engineering.architecture','quality.attribute'],ai:['quality.constraint','design.boundary']};
  return byKind[lab.kind]??[];
}
export function renderReferenceExperience(id:string,lang:Locale,labels:Record<string,string>):string{
  const lab=specs[lang].labs.find(entry=>entry.id===referenceExperiences[id]);if(!lab)return '';
  const es=lang==='es',initial=lab.outcomes[0]!;
  const controls=lab.controls.map(control=>'<label>'+escape(control.label)+'<select data-lab-control="'+escape(control.id)+'">'+control.options.map(([value,text])=>'<option value="'+escape(value)+'">'+escape(text)+'</option>').join('')+'</select></label>').join('');
  const prerequisites=prerequisiteIds(lab).map(concept=>'<a href="#'+escape(concept)+'">'+escape(labels[concept]??(()=>{throw new Error('Unknown prerequisite: '+concept)})())+'</a>').join(', ');
  const graph=lab.illustrations?'<div class="reference-graph" data-graph>'+lab.illustrations.map(item=>'<figure data-illustration="'+escape(item.id)+'"><figcaption><strong>'+escape(item.title)+'</strong></figcaption><p>'+item.steps.map(step=>'<span>'+escape(step)+'</span>').join(' → ')+'</p></figure>').join('')+'</div>':'';
  const limitation=lab.kind==='dependency'?lab.assumption:undefined;
  const cases=lab.outcomes.map((outcome,index)=>'<li><strong>'+(es?'Regla':'Rule')+' '+(index+1)+': '+escape(outcome.title)+'</strong>'+outcomeHtml(outcome,es,limitation)+'</li>').join('');
  const sources=lab.sources.map(source=>'<a href="#source-'+escape(source)+'">['+escape(source)+']</a>').join(', ');
  const payload=JSON.stringify({kind:lab.kind,outcomes:lab.outcomes,limitation}).replace(/</g,'\\u003c');
  const rules:Record<string,string>=es?{scope:'Cada perspectiva selecciona el caso con el mismo nombre.',dependency:'El cambio de esquema selecciona el caso editorial; el cambio del portafolio selecciona el caso de contenido profesional.',quality:'Combina el origen del texto con la disponibilidad de JavaScript para elegir uno de los cuatro casos.',ai:'Por orden: datos no autorizados bloquean el envío; con autorización, citas sin verificar bloquean la presentación; sin revisión humana se conserva el borrador; con las tres condiciones se considera para revisión.'}:{scope:'Each perspective selects the case with the same name.',dependency:'The schema change selects the editorial case; the portfolio change selects the professional content case.',quality:'Combine the text origin and JavaScript availability to select one of the four cases.',ai:'In order: unauthorized data blocks transfer; with authorization, unchecked citations block presentation; without human review the draft is kept; all three conditions allow consideration for review.'};
  const pattern=({scope:'conceptual',dependency:'structural',quality:'causal',ai:'decisional'} as Record<string,string>)[lab.kind]!;
  return '<section class="reference-explorer" data-explorer="'+pattern+'" data-lab-key="'+escape(lab.id)+'" aria-labelledby="lab-'+escape(lab.kind)+'"><p class="concept-eyebrow">'+escape(lab.eyebrow)+'</p><h4 id="lab-'+escape(lab.kind)+'">'+escape(lab.title)+'</h4><p><strong>'+(es?'Objetivo':'Learning objective')+':</strong> '+escape(lab.objective)+'</p><p><strong>'+(es?'Prerrequisitos':'Prerequisites')+':</strong> '+prerequisites+'</p><p>'+escape(lab.intro)+'</p><div class="reference-controls">'+controls+'</div>'+graph+'<div class="reference-result" data-explorer-output role="status" aria-live="polite" aria-atomic="true">'+outcomeHtml(initial,es,limitation)+'</div><details class="reference-cases" open><summary>'+(es?'Reglas, ejemplo resuelto y contraejemplos':'Rules, worked example and counterexamples')+'</summary><p><strong>'+(es?'Regla de selección':'Selection rule')+':</strong> '+escape(rules[lab.kind]!)+'</p><p>'+(es?'Primer caso: ejemplo resuelto. Los demás muestran perspectivas o condiciones alternativas, incluido el fallo.':'First case: worked example. The others show alternative perspectives or conditions, including failure.')+'</p><ol>'+cases+'</ol></details><p class="reference-assumption"><strong>'+(es?'Supuestos y límites':'Assumptions and limits')+':</strong> '+escape(lab.assumption)+'</p><p class="reference-citation"><strong>'+(es?'Fuentes':'Sources')+':</strong> '+sources+'</p><script type="application/json" data-lab-spec>'+payload+'</script></section>';
}
