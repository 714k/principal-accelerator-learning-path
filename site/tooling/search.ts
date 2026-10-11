import type { Page } from './content.ts';

export interface SearchEntry {
  title: string;
  context: string;
  href: string;
  text: string;
}

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

export function searchIndex(lang: 'es'|'en', base: string, pages: {route: string; page: Page}[]): SearchEntry[] {
  const es=lang==='es';
  const root=`${base}${lang}/`;
  const dashboard=es?[
    ['roadmap','Sesiones disponibles','Roadmap y estado editorial de PA-S001'],
    ['study','Actividad marcada','Ejercicios, criterios de repaso y gráficos de barras, pie, donut y línea'],
    ['status','Estado general del programa','Progreso canónico del programa'],
    ['mastery','Dominio respaldado','Evaluación de dominio L1–L5'],
    ['artifacts','Artefactos públicos','Capítulo editorial y Engineering Book'],
    ['revisit','Revisitas','Cola de revisiones pendientes'],
    ['projects','Proyectos y sistemas','Estado de Engineering Book y Portafolio'],
    ['activity','Actividad y siguiente trabajo','Actividad registrada y trabajo siguiente']
  ]: [
    ['roadmap','Available sessions','Roadmap and PA-S001 editorial status'],
    ['study','Marked study activity','Exercises, review criteria, and bar, pie, donut and line charts'],
    ['status','Overall program status','Canonical program progress'],
    ['mastery','Evidence-backed mastery','L1–L5 mastery assessment'],
    ['artifacts','Public artifacts','Editorial chapter and Engineering Book'],
    ['revisit','Revisits','Pending review queue'],
    ['projects','Projects and systems','Engineering Book and Portfolio status'],
    ['activity','Activity and next work','Recorded activity and next work']
  ];
  const entries: SearchEntry[]=[
    {title:es?'Panel de aprendizaje':'Learning dashboard',context:es?'Inicio':'Home',href:root,text:es?'Inicio, actividad local, progreso y proyectos':'Home, local activity, progress and projects'},
    ...dashboard.map(([id,title,text])=>({title: title!,context:es?'Panel de aprendizaje':'Learning dashboard',href:`${root}#${id}`,text: text!})),
    {title:es?'Sesiones':'Sessions',context:es?'Índice':'Index',href:`${root}sessions/`,text:es?'Sesiones disponibles por fase':'Available sessions by phase'},
    {title:es?'Proyectos':'Projects',context:es?'Índice':'Index',href:`${root}projects/`,text:es?'Proyectos y sistemas P0':'P0 projects and systems'}
  ];
  for (const {route,page} of pages) {
    if (page.lang!==lang) throw new Error(`Search page language mismatch: ${route}`);
    const href=`${root}${route}/`;
    entries.push({title:page.title,context:page.kind==='session'?(es?'Sesión':'Session'):(es?'Proyecto':'Project'),href,text:`${page.id} ${page.description}`});
    for (const section of page.sections) {
      entries.push({title:section.title,context:page.title,href:`${href}#${section.id}`,text:[
        ...section.paragraphs,
        ...strings(section.checklist),
        ...strings(section.studyItems),
        ...strings(section.table),
        ...strings(section.diagram),
        section.code ?? '',
        ...(section.id==='visual-learning-guide'?strings(page.visualLearning):[])
      ].join(' ')});
    }
    for (const reference of page.references) {
      entries.push({title:reference.title,context:es?'Fuente de '+page.title:'Source for '+page.title,href:`${href}#ref-${reference.id}`,text:`${reference.id} ${reference.url}`});
    }
  }
  entries.push(
    {title:'Professional portfolio',context:es?'Portafolio público':'Public portfolio',href:`${base}portfolio/`,text:'Staff Software Engineer. Frontend engineering, design systems, accessibility, platform-level product work.'},
    {title:'Selected work',context:'Professional portfolio',href:`${base}portfolio/#work`,text:'Principal Accelerator Learning Path P0 bilingual learning site and professional portfolio draft.'},
    {title:'Direction',context:'Professional portfolio',href:`${base}portfolio/#direction`,text:'Frontend Platform Architecture and AI Product Engineering.'},
    {title:'Contact',context:'Professional portfolio',href:`${base}portfolio/#contact`,text:'No public contact channel has been supplied.'}
  );
  return entries;
}
