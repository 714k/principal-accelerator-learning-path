import type { Page } from './content.ts';
import { hasMobileDiagramVariant, outputForDiagram, outputForMobileDiagram } from './diagrams.ts';
import { renderCanonical, SUCCESS_IDS } from './canonical.ts';
import hljs from 'highlight.js';
export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}

function decodeCodeEntities(source: string): string {
  return source
    .replace(/&(?:lt|gt|quot|apos|#39);/gi, (entity) => {
      const entities: Record<string, string> = {
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': "'",
        '&#39;': "'",
      };
      return entities[entity.toLowerCase()] ?? entity;
    })
    .replace(
      /&#(?:x([\da-f]+)|(\d+));/gi,
      (entity, hex: string | undefined, decimal: string | undefined) => {
        const point = Number.parseInt(hex ?? decimal ?? '', hex ? 16 : 10);
        return Number.isFinite(point) && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
      },
    )
    .replace(/&amp;/gi, '&');
}

function highlightCodeBlocks(markup: string): string {
  const aliases: Record<string, string> = {
    cjs: 'javascript',
    css: 'css',
    htm: 'xml',
    html: 'xml',
    js: 'javascript',
    jsx: 'javascript',
    jsonc: 'json',
    md: 'markdown',
    py: 'python',
    sh: 'bash',
    shell: 'bash',
    ts: 'typescript',
    tsx: 'typescript',
    txt: 'plaintext',
    yml: 'yaml',
  };
  const supported = new Set(hljs.listLanguages());
  const mermaidPattern =
    /^(?:\s*(?:%%|flowchart\b|graph\b|sequenceDiagram\b|stateDiagram(?:-v2)?\b|classDiagram\b|erDiagram\b|journey\b|gantt\b|pie\b|mindmap\b|gitGraph\b|timeline\b))/m;
  const typedDeclarationPattern =
    /^\s*(?:export\s+)?(?:type|interface)\s+[A-Z_$][\w$]*(?:<[^>\n]+>)?\s*(?:=|\{)/m;
  const jsSyntaxPattern =
    /^\s*(?:import\s|export\s|(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=|function\s+[A-Za-z_$][\w$]*\s*\()/m;

  return markup.replace(
    /(<pre\b[^>]*>\s*<code\b([^>]*)>)([\s\S]*?)(<\/code\s*>\s*<\/pre\s*>)/gi,
    (whole, opening: string, attributes: string, encodedSource: string, closing: string) => {
      if (/\bdata-syntax-enhanced=/.test(attributes)) return whole;
      const source = decodeCodeEntities(encodedSource);
      const languageClass = attributes.match(/\bclass="([^"]*)"/i)?.[1] ?? '';
      const requestedLanguage = languageClass
        .split(/\s+/)
        .find((name) => name.startsWith('language-'))
        ?.slice('language-'.length)
        .toLowerCase();
      if (requestedLanguage === 'mermaid' || mermaidPattern.test(source)) return whole;

      let language = requestedLanguage ? (aliases[requestedLanguage] ?? requestedLanguage) : '';
      if (!language && typedDeclarationPattern.test(source)) language = 'typescript';
      else if (!language && jsSyntaxPattern.test(source)) language = 'javascript';
      else if (!language && /<\/?[A-Za-z][\w:-]*(?:\s|\/?>)/.test(source)) language = 'xml';

      let highlighted: ReturnType<typeof hljs.highlight> | undefined;
      if (language && supported.has(language)) {
        highlighted = hljs.highlight(source, { language, ignoreIllegals: true });
      } else if (!language && !requestedLanguage) {
        const detected = hljs.highlightAuto(source);
        if (detected.language && detected.relevance >= 2) highlighted = detected;
      }
      if (!highlighted) return whole;

      let nextAttributes = attributes.replace(/\s+data-syntax-enhanced="[^"]*"/i, '');
      nextAttributes += ' data-syntax-enhanced="highlightjs"';
      const classes = new Set(languageClass.split(/\s+/).filter(Boolean));
      classes.add('hljs');
      if (![...classes].some((name) => name.startsWith('language-')))
        classes.add(`language-${highlighted.language}`);
      else if (
        requestedLanguage &&
        !aliases[requestedLanguage] &&
        requestedLanguage !== highlighted.language
      ) {
        classes.delete(`language-${requestedLanguage}`);
        classes.add(`language-${highlighted.language}`);
      }
      const nextClass = `class="${[...classes].join(' ')}"`;
      if (/\bclass="[^"]*"/i.test(nextAttributes))
        nextAttributes = nextAttributes.replace(/\bclass="[^"]*"/i, nextClass);
      else nextAttributes += ` ${nextClass}`;
      const nextOpening = opening.replace(/<code\b[^>]*>/i, `<code${nextAttributes}>`);
      return `${nextOpening}${highlighted.value}${closing}`;
    },
  );
}
export function basePath(raw = '/'): string {
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(raw)) throw new Error('BASE_PATH must be / or /segment/');
  return raw;
}
function icon(
  name:
    | 'spark'
    | 'dashboard'
    | 'grid'
    | 'book'
    | 'layers'
    | 'search'
    | 'chevron'
    | 'moon'
    | 'sun'
    | 'menu'
    | 'close'
    | 'bookmark',
): string {
  const paths: Record<typeof name, string> = {
    spark:
      '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/><path d="M3 17h4M5 15v4"/>',
    dashboard: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 16v-4m5 4V8m5 8v-6"/>',
    grid: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
    book: '<path d="M12 6c-2.5-2-5.5-2.4-9-2v15c3.5-.4 6.5 0 9 2 2.5-2 5.5-2.4 9-2V4c-3.5-.4-6.5 0-9 2ZM12 6v15"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    moon: '<path d="M20.5 13.1A8.5 8.5 0 0 1 10.9 3.5 8.5 8.5 0 1 0 20.5 13.1Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    bookmark: '<path d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17l-7-4-7 4V4Z"/>',
  };
  return `<svg class="icon icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}
export function tocFab(lang: 'es' | 'en'): string {
  const label = lang === 'es' ? 'Volver a la tabla de contenido' : 'Back to the table of contents';
  return `<a class="toc-fab" href="#table-of-contents" aria-label="${label}" title="${label}"><span aria-hidden="true">↑</span><span class="sr-only">${label}</span></a>`;
}
export function themedMindMap(source: string, alt: string, className = ''): string {
  const darkSource = source.replace(/\.svg$/, '.dark.svg');
  const lightClass = className || 'theme-map--light';
  return `<span class="themed-mind-map"><img class="${lightClass}" data-theme-map="light" src="${source}" alt="${escapeHtml(alt)}" loading="lazy"><img class="theme-map--dark" data-theme-map="dark" src="${darkSource}" alt="" aria-hidden="true" loading="lazy"></span>`;
}
export function placeTocFabsAtSectionEnds(html: string, lang: 'es' | 'en'): string {
  const withoutFabs = html.replace(/<a class="toc-fab"[^>]*>[\s\S]*?<\/a>/g, '');
  // A page has one fixed control, rather than one control after every section.
  return `${withoutFabs}${tocFab(lang)}`;
}
export function checkWhatYouLearned(lang: 'es' | 'en'): string {
  return lang === 'es' ? 'Comprueba lo aprendido' : 'Check what you learned';
}
export function sectionHeading(
  level: number,
  id: string,
  title: string,
  lang: 'es' | 'en',
  ordinal: number,
  className = '',
): string {
  const classes = ['section-heading', className].filter(Boolean).join(' ');
  const subtopic = title.match(/^((?:Subtema|Subtopic)\s+\d+)\.\s+(.+)$/i);
  const label = subtopic?.[1] ?? `${lang === 'es' ? 'Sección' : 'Section'} ${ordinal}`;
  const heading = subtopic?.[2] ?? title;
  return `<h${level} id="${id}" class="${classes}"><span class="section-number" aria-hidden="true">${label}</span><span class="section-title">${heading}</span></h${level}>`;
}
function themeControl(): string {
  return `<button class="theme-toggle" type="button" aria-label="Light/Dark" aria-pressed="false" data-theme-toggle>${icon('moon')}${icon('sun')}</button>`;
}
function themeScript(): string {
  return `<script>(()=>{const r=document.documentElement,b=document.querySelector('[data-theme-toggle]');if(!b)return;let t;try{t=localStorage.getItem('pa-theme')}catch{}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';const set=(v,p)=>{r.dataset.theme=v;b.setAttribute('aria-pressed',String(v==='dark'));const label=r.lang==='es'?(v==='dark'?'Activar tema claro':'Activar tema oscuro'):(v==='dark'?'Switch to light theme':'Switch to dark theme');b.setAttribute('aria-label',label);b.title=label;if(p)try{localStorage.setItem('pa-theme',v)}catch{}};set(t,false);b.addEventListener('click',()=>set(r.dataset.theme==='dark'?'light':'dark',true))})()</script>`;
}
function globalNav(
  lang: 'es' | 'en',
  base: string,
  current: string,
  variant: 'desktop' | 'mobile',
): string {
  const es = lang === 'es';
  const root = `${base}${lang}/`;
  const link = (href: string, label: string, active = false) =>
    `<a href="${href}"${active ? ' aria-current="page"' : ''}>${escapeHtml(label)}</a>`;
  const group = (name: string, label: string, items: string, open = false, count?: number) =>
    `<details class="nav-group"${open ? ' open' : ''}><summary>${icon(name as 'grid' | 'layers' | 'book' | 'bookmark')}<span>${label}</span>${count === undefined ? '' : `<span class="nav-count">${count}</span>`}${icon('chevron')}</summary><div class="nav-children">${items}</div></details>`;
  const sessionId = current.match(/^sessions\/(PA-S\d{3})\//)?.[1] ?? 'PA-S001';
  const session = `${root}sessions/${sessionId}/`;
  const projects = `${root}projects/`;
  const id = `site-search-${variant}`;
  const search = `<form class="site-search" role="search" data-site-search data-index-url="${base}assets/search-${lang}.json"><label class="sr-only" for="${id}">${es ? 'Buscar en el sitio' : 'Search the site'}</label>${icon('search')}<input id="${id}" type="search" autocomplete="off" placeholder="${es ? 'Buscar en el sitio…' : 'Search the site…'}" aria-controls="${id}-results"><button class="sr-only" type="submit">${es ? 'Buscar' : 'Search'}</button><div class="search-results" id="${id}-results" data-search-results hidden></div><p class="sr-only" role="status" aria-live="polite" data-search-status></p></form><noscript><p class="nav-empty">${es ? 'La búsqueda requiere JavaScript.' : 'Search requires JavaScript.'}</p></noscript>`;
  const sessionItems =
    link(`${root}sessions/`, es ? 'Todas las sesiones' : 'All sessions', current === 'sessions/') +
    `<p class="nav-phase">F0 · ${es ? 'Fundamentos' : 'Foundations'}</p>` +
    link(session, 'PA-S001', current === 'sessions/PA-S001/') +
    link(`${root}sessions/PA-S002/`, 'PA-S002', current === 'sessions/PA-S002/') +
    link(`${root}sessions/PA-S003/`, 'PA-S003', current === 'sessions/PA-S003/') +
    link(`${root}sessions/PA-S004/`, 'PA-S004', current === 'sessions/PA-S004/') +
    link(`${root}sessions/PA-S005/`, 'PA-S005', current === 'sessions/PA-S005/') +
    `<p class="nav-phase">F1–F5 · ${es ? 'Sin sesiones publicadas' : 'No published sessions'}</p>`;
  const projectItems =
    link(projects, es ? 'Todos los proyectos' : 'All projects', current === 'projects/') +
    link(`${projects}p0/`, 'P0 · Accelerator', current === 'projects/p0/') +
    link(
      `${projects}portfolio/`,
      es ? 'Portafolio' : 'Portfolio',
      current === 'projects/portfolio/',
    ) +
    link(`${base}portfolio/`, es ? 'Portafolio público' : 'Public portfolio');
  const s002 = sessionId === 'PA-S002';
  const learnItems = s002
    ? link(`${session}#concepts`, es ? 'Conceptos' : 'Concepts') +
      link(`${session}#main-topic`, es ? 'Tema principal' : 'Main topic') +
      link(`${session}#visual-learning-studio`, es ? 'Estudio visual' : 'Visual learning') +
      link(`${session}#exercises`, es ? 'Ejercicios' : 'Exercises') +
      link(`${session}#study-checklist`, es ? 'Lista de estudio' : 'Study checklist')
    : link(`${session}#concepts`, es ? 'Conceptos' : 'Concepts') +
      link(`${session}#main.p0-boundaries`, es ? 'Tema principal' : 'Main topic') +
      link(`${session}#visual-learning-studio`, es ? 'Estudio visual' : 'Visual learning') +
      link(`${session}#exercises`, es ? 'Ejercicios' : 'Exercises') +
      link(`${session}#study-checklist`, es ? 'Lista de estudio' : 'Study checklist');
  const resourceItems = s002
    ? link(`${session}#sources`, es ? 'Fuentes y referencias' : 'Sources and references') +
      link(`${session}#resources`, es ? 'Recursos' : 'Resources')
    : link(`${session}#sources`, es ? 'Fuentes y referencias' : 'Sources and references') +
      link(`${session}#resources`, es ? 'Recursos' : 'Resources');
  const navigationLabel = es
    ? variant === 'mobile'
      ? 'Navegación del programa móvil'
      : 'Navegación del programa'
    : variant === 'mobile'
      ? 'Mobile program navigation'
      : 'Program navigation';
  const hasSidebarToggle = variant === 'desktop' && /^sessions\/PA-S\d{3}\/$/.test(current);
  const desktopNavId = hasSidebarToggle ? ' id="desktop-curriculum"' : '';
  const closeButton = hasSidebarToggle
    ? `<button class="sidebar-dialog-close" type="button" data-sidebar-close aria-label="${es ? 'Cerrar navegación' : 'Close navigation'}" title="${es ? 'Cerrar navegación' : 'Close navigation'}">${icon('close')}</button>`
    : '';
  return `<div class="sidebar-content"><div class="sidebar-top"><a class="sidebar-brand" href="${root}"><span class="sidebar-logo">${icon('spark')}</span><span><strong>Principal Accelerator</strong><small>Learning Path</small></span></a>${closeButton}</div>${search}<nav class="curriculum" aria-label="${navigationLabel}"${desktopNavId}><a class="nav-home" href="${root}"${current === '' ? ' aria-current="page"' : ''}>${icon('dashboard')}<span>Dashboard</span></a>${group('grid', es ? 'Sesiones' : 'Sessions', sessionItems, current.startsWith('sessions/'), 5)}${group('layers', es ? 'Proyectos' : 'Projects', projectItems, current.startsWith('projects/'), 4)}${group('book', es ? 'Aprender' : 'Learn', learnItems)}${group('bookmark', es ? 'Recursos' : 'Resources', resourceItems)}</nav><p class="sidebar-foot">F0 · ${es ? 'Plataforma Accelerator' : 'Accelerator platform'}</p></div>`;
}
function questionAnswerDisclosure(attributes: string, content: string): string | null {
  const answerLabel =
    /<strong\b[^>]*>\s*(Respuesta(?:\s+razonada|\s+a\s+la\s+pregunta\s+gu[ií]a)?|Answer(?:\s+reasoned|\s+to\s+the\s+guiding\s+question)?|Reasoned\s+(?:answer|response)|Response)\s*:\s*<\/strong>\s*/i.exec(
      content,
    );
  if (!answerLabel) return null;

  const questionLabel =
    /^\s*(?:<strong\b[^>]*>\s*)?(Pregunta(?:\s+de\s+transferencia)?|Question(?:\s+of\s+transfer)?|Transfer\s+Question)\s*:\s*(?:<\/strong>)?\s*/i.exec(
      content,
    );
  const questionEnd = answerLabel.index;
  const question = content.slice(questionLabel?.[0].length ?? 0, questionEnd).trim();
  const answer = content.slice(questionEnd + answerLabel[0].length).trim();
  const plainQuestion = question.replace(/<[^>]*>/g, ' ');
  if ((!questionLabel && !/[?¿]/.test(plainQuestion)) || !question || !answer) return null;

  const labelText = answerLabel[1]!.replace(/\s+/g, ' ').trim();
  const questionLabelText = questionLabel?.[1]?.replace(/\s+/g, ' ').trim();
  const existingClasses = attributes.match(/\bclass="([^"]*)"/i)?.[1]?.split(/\s+/) ?? [];
  const detailsClasses = [...new Set([...existingClasses, 'qa-disclosure'])].join(' ');
  const otherAttributes = attributes.replace(/\sclass="[^"]*"/i, '');
  return `<details${otherAttributes} class="${detailsClasses}"><summary>${questionLabelText ? `<span class="sr-only">${questionLabelText}:</span> ` : ''}${question}</summary><p><span class="sr-only">${labelText}:</span> ${answer}</p></details>`;
}
function decorateQuestionAnswerLists(markup: string): string {
  const changes: { start: number; end: number; value: string }[] = [];
  const stack: { contentStart: number }[] = [];
  const listItemTags = /<\/?li\b[^>]*>/gi;
  let tag: RegExpExecArray | null;
  while ((tag = listItemTags.exec(markup))) {
    if (/^<\//.test(tag[0])) {
      const open = stack.pop();
      if (!open) continue;
      const content = markup.slice(open.contentStart, tag.index);
      if (/<li\b/i.test(content) || /<details\b/i.test(content)) continue;
      const disclosure = questionAnswerDisclosure('', content);
      if (disclosure) changes.push({ start: open.contentStart, end: tag.index, value: disclosure });
    } else stack.push({ contentStart: tag.index + tag[0].length });
  }
  let result = markup;
  for (const change of changes.reverse())
    result = result.slice(0, change.start) + change.value + result.slice(change.end);
  return result;
}
function decorateProfessionalAreaTabs(markup: string, lang: 'es' | 'en'): string {
  let groupIndex = 0;
  return markup.replace(
    /(<h3\b[^>]*>[\s\S]*?<\/h3>)\s*(<p\b[^>]*>[\s\S]*?<\/p>)\s*(<p\b[^>]*>[\s\S]*?<\/p>)\s*(<p\b[^>]*>[\s\S]*?<\/p>)/gi,
    (whole, heading: string, ...captures: (string | number)[]) => {
      const paragraphs = captures.slice(0, 3) as string[];
      const markers = [
        /<strong\b[^>]*>\s*Staff\s*→\s*Principal\s*:\s*<\/strong>/i,
        /<strong\b[^>]*>\s*FPA\s*:\s*<\/strong>/i,
        /<strong\b[^>]*>\s*AIPE\s*:\s*<\/strong>/i,
      ];
      if (
        paragraphs.length !== 3 ||
        !markers.every((marker, index) => marker.test(paragraphs[index]!))
      )
        return whole;

      const groupId = `professional-areas-${++groupIndex}`;
      const labels =
        lang === 'es'
          ? [
              'Staff → Principal:',
              'Arquitectura de Plataforma Frontend (FPA):',
              'Ingeniería de Producto con IA (AIPE):',
            ]
          : [
              'Staff → Principal:',
              'Frontend Platform Engineer (FPA):',
              'AI Product Engineer (AIPE):',
            ];
      const shortLabels = ['Staff', 'FPA', 'AIPE'];
      const tablistLabel = lang === 'es' ? 'Áreas profesionales' : 'Professional areas';
      const tablist = `<div class="professional-area-tablist" role="tablist" aria-label="${tablistLabel}" hidden>${labels
        .map(
          (label, index) =>
            `<button class="professional-area-tab" id="${groupId}-tab-${index + 1}" type="button" role="tab" aria-label="${label}" aria-controls="${groupId}-panel-${index + 1}" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}"><span class="professional-area-tab-full">${label}</span><span class="professional-area-tab-short">${shortLabels[index]}</span></button>`,
        )
        .join('')}</div>`;
      const panels = paragraphs
        .map((paragraph, index) => {
          const label = markers[index]!;
          const content = paragraph.replace(
            /^(<p\b[^>]*>)([\s\S]*?)(<\/p>)$/i,
            (_match, opening: string, body: string, closing: string) =>
              `${opening}${body.replace(label, '').trimStart()}${closing}`,
          );
          return `<div class="professional-area-panel" id="${groupId}-panel-${index + 1}" role="tabpanel" aria-labelledby="${groupId}-tab-${index + 1}" tabindex="0">${content}</div>`;
        })
        .join('');
      return `${heading}<div class="professional-area-tabs" data-professional-area-tabs>${tablist}${panels}</div>`;
    },
  );
}
export function normalizeSessionMarkup(
  markup: string,
  lang: 'es' | 'en',
  decorateExternalLinks = false,
): string {
  const withProfessionalAreaTabs = decorateProfessionalAreaTabs(markup, lang);
  const withConceptDisclosures = withProfessionalAreaTabs.replace(
    /<div\b(?=[^<>]*\bdata-concept(?:\s|=|>))[^>]*>[\s\S]*?<\/div>/g,
    (concept) => {
      const term = concept.match(/<dt([^>]*)>([\s\S]*?)<\/dt>/);
      const definition = term
        ? term[2]!.match(/^\s*<strong([^>]*)>([\s\S]*?)<\/strong>([\s\S]*)$/)
        : null;
      const description = concept.match(/<dd([^>]*)>([\s\S]*?)<\/dd>/);
      if (!term || !definition || !description) return concept;

      const termText = definition[2]!.trim().replace(/:\s*$/, '');
      const definitionText = definition[3]!.trim();
      const exampleLabel = lang === 'es' ? 'Ejemplo' : 'Example';
      const exampleContent = description[2]!.replace(
        /<p([^>]*)>\s*<strong>(?:Ejemplo|Example):<\/strong>\s*([\s\S]*?)<\/p>/i,
        (_match, attributes: string, content: string) =>
          `<details class="concept-example-disclosure"><summary>${exampleLabel}</summary><p${attributes}>${content}</p></details>`,
      );
      const nextTerm = `<dt${term[1]}><strong${definition[1]}>${termText}</strong></dt>`;
      const nextDescription = `<dd${description[1]}>${definitionText ? `<p>${definitionText}</p>` : ''}${exampleContent}</dd>`;
      return concept.replace(term[0], nextTerm).replace(description[0], nextDescription);
    },
  );
  const withListQuestionAnswers = decorateQuestionAnswerLists(withConceptDisclosures);
  const isInsideDetails = (source: string, offset: number): boolean => {
    const prefix = source.slice(0, offset);
    return prefix.lastIndexOf('<details') > prefix.lastIndexOf('</details>');
  };
  const withQuestionAnswerParagraphs = withListQuestionAnswers.replace(
    /<p\b([^>]*)>([\s\S]*?)<\/p\s*>/gi,
    (whole, attributes: string, content: string, offset: number, source: string) => {
      if (isInsideDetails(source, offset)) return whole;
      const disclosure = questionAnswerDisclosure(attributes, content);
      return disclosure ?? whole;
    },
  );
  const withUnwrappedListQuestionAnswers = withQuestionAnswerParagraphs.replace(
    /(<li\b[^>]*>)\s*<p\b[^>]*>\s*(<details\b(?=[^>]*\bclass="[^"]*\bqa-disclosure\b)[\s\S]*?<\/details>)\s*<\/p>\s*(<\/li>)/gi,
    '$1$2$3',
  );
  const beginsWithQuotation = (content: string): boolean => {
    let visibleStart = content.trimStart();
    while (/^<(?:strong|b|em|i|span)\b[^>]*>\s*/i.test(visibleStart)) {
      visibleStart = visibleStart.replace(/^<(?:strong|b|em|i|span)\b[^>]*>\s*/i, '');
    }
    return /^(?:[«“„‘"'`]|&(?:laquo|ldquo|bdquo|lsquo);)/i.test(visibleStart);
  };
  const isInsideBlockquote = (source: string, offset: number): boolean => {
    const prefix = source.slice(0, offset);
    return prefix.lastIndexOf('<blockquote') > prefix.lastIndexOf('</blockquote>');
  };
  const withParagraphQuotes = withUnwrappedListQuestionAnswers.replace(
    /<p\b([^>]*)>([\s\S]*?)<\/p\s*>/gi,
    (whole, attributes: string, content: string, offset: number, source: string) => {
      if (isInsideBlockquote(source, offset) || !beginsWithQuotation(content)) return whole;
      return `<blockquote><p${attributes}>${content}</p></blockquote>`;
    },
  );
  const quoteListOpenings = [...withParagraphQuotes.matchAll(/<li\b[^>]*>/gi)]
    .filter((match) =>
      beginsWithQuotation(withParagraphQuotes.slice(match.index! + match[0].length)),
    )
    .filter((match) => !isInsideBlockquote(withParagraphQuotes, match.index!));
  let withListQuotes = withParagraphQuotes;
  for (const opening of quoteListOpenings.reverse()) {
    const start = opening.index! + opening[0].length;
    const listItemTags = /<\/?li\b[^>]*>/gi;
    listItemTags.lastIndex = start;
    let depth = 1;
    let closing: RegExpExecArray | null = null;
    let tag: RegExpExecArray | null;
    while ((tag = listItemTags.exec(withListQuotes))) {
      if (/^<\//.test(tag[0])) depth -= 1;
      else depth += 1;
      if (depth === 0) {
        closing = tag;
        break;
      }
    }
    if (!closing) continue;
    withListQuotes =
      withListQuotes.slice(0, closing.index) +
      '</blockquote>' +
      withListQuotes.slice(closing.index);
    withListQuotes = withListQuotes.slice(0, start) + '<blockquote>' + withListQuotes.slice(start);
  }
  const withExternalSemantics = decorateExternalLinks
    ? withListQuotes.replace(
        /<a\b([^>]*\bhref="https?:[^"]*"[^>]*)>([\s\S]*?)<\/a\s*>/g,
        (whole, attrs: string, content: string) => {
          const icon = '<span class="external-link-icon" aria-hidden="true">↗</span>';
          let nextAttrs = attrs.replace(/\s+target="[^"]*"/i, '');
          nextAttrs = `${nextAttrs} target="_blank"`;
          const rel = nextAttrs.match(/\brel="([^"]*)"/i)?.[1]?.split(/\s+/) ?? [];
          for (const token of ['noopener', 'noreferrer']) if (!rel.includes(token)) rel.push(token);
          if (/\brel="[^"]*"/i.test(nextAttrs))
            nextAttrs = nextAttrs.replace(/\brel="[^"]*"/i, `rel="${rel.join(' ')}"`);
          else nextAttrs += ` rel="${rel.join(' ')}"`;
          const newTab = `<span class="sr-only">${lang === 'es' ? '(se abre en una nueva pestaña)' : '(opens in a new tab)'}</span>`;
          const localizedNewTabLabel =
            lang === 'es' ? '(se abre en una nueva pestaña)' : '(opens in a new tab)';
          return `<a${nextAttrs}>${content}${content.includes('external-link-icon') ? '' : icon}${content.includes(localizedNewTabLabel) ? '' : newTab}</a>`;
        },
      )
    : withListQuotes;
  const normalizedResourceLists = withExternalSemantics.replace(
    /<ul\b(?=[^>]*\bclass="[^"]*\bresource-link-list\b[^"]*")[^>]*>[\s\S]*?<\/ul\s*>/g,
    (list) =>
      list.replace(
        /(<\/a\s*>)\s*:\s*(\p{L})/gu,
        (_match, close: string, firstLetter: string) =>
          `${close} ${firstLetter.toLocaleUpperCase(lang)}`,
      ),
  );
  const decoratedMarkup = normalizedResourceLists.replace(
    /<p([^>]*)>([\s\S]*?)<\/p>/g,
    (whole, attributes: string, content: string) => {
      const separatedFlow = content.match(
        /^([\s\S]*?:)\s*<strong>([^<]*→[^<]*)<\/strong>([.!?])?$/,
      );
      if (separatedFlow)
        return `<p${attributes}>${separatedFlow[1]!}</p><p class="arrow-flow">${separatedFlow[2]!}${separatedFlow[3] ?? ''}</p>`;
      if (
        !content.includes('→') ||
        /\b(?:arrow-flow|notice|concept-summary-label)\b/.test(attributes)
      )
        return whole;
      const className = attributes.match(/\bclass="([^"]*)"/);
      const nextAttributes = className
        ? attributes.replace(className[0], `class="${className[1]} arrow-flow"`)
        : `${attributes} class="arrow-flow"`;
      return `<p${nextAttributes}>${content}</p>`;
    },
  );
  return decorateExternalLinks ? highlightCodeBlocks(decoratedMarkup) : decoratedMarkup;
}
export function shell(
  lang: 'es' | 'en',
  title: string,
  body: string,
  base: string,
  other: string,
): string {
  const es = lang === 'es';
  const current = other.replace(/^(?:es|en)\//, '');
  const breadcrumb = body.match(/<nav class="breadcrumb"[\s\S]*?<\/nav>/)?.[0] ?? '';
  const mainBody = breadcrumb ? body.replace(breadcrumb, '') : body;
  const isSession = /^sessions\/PA-S\d{3}\/$/.test(current);
  const paS001 = /sessions\/PA-S001\//.test(current);
  const mainId = isSession ? 'main-content' : 'main';
  const skipTarget = mainId;
  const bodyClass = isSession ? ` class="session-page${paS001 ? ' pa-s001' : ''}"` : '';
  const footer = `<footer><span>Principal Accelerator Learning Path</span><span>Victor Zamudio | 2026</span></footer>`;
  const sessionAssets = isSession
    ? `<link rel="stylesheet" href="${base}assets/session-ui.css"><script defer src="${base}assets/session-ui.js"></script>`
    : '';
  const sidebarToggle = isSession
    ? `<button class="desktop-nav-toggle" type="button" aria-controls="desktop-navigation-dialog" aria-expanded="false" aria-label="${es ? 'Abrir navegación' : 'Open navigation'}" title="${es ? 'Abrir navegación' : 'Open navigation'}" data-sidebar-toggle hidden>${icon('menu')}<span class="sr-only">${es ? 'Abrir navegación' : 'Open navigation'}</span></button>`
    : '';
  const desktopSidebar = globalNav(lang, base, current, 'desktop');
  const sidebarDialog = isSession
    ? `<dialog class="desktop-nav-dialog" id="desktop-navigation-dialog" aria-label="${es ? 'Navegación del programa' : 'Program navigation'}" data-sidebar-dialog open><aside class="site-sidebar">${desktopSidebar}</aside></dialog>`
    : '';
  const permanentSidebar = isSession ? '' : `<aside class="site-sidebar">${desktopSidebar}</aside>`;
  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} · Principal Accelerator Learning Path</title><link rel="stylesheet" href="${base}assets/site.css">${sessionAssets}<script type="module" src="${base}assets/concept-explorers.js"></script><script defer src="${base}assets/study.js"></script><script defer src="${base}assets/search.js"></script></head><body${bodyClass}><a class="skip" href="#${skipTarget}">${es ? 'Saltar al contenido' : 'Skip to content'}</a>${sidebarDialog}<div class="site-grid">${permanentSidebar}<div class="site-main-column"><header class="site-header">${sidebarToggle}<details class="mobile-global"><summary aria-label="${es ? 'Navegación' : 'Navigation'}">${icon('menu')}</summary>${globalNav(lang, base, current, 'mobile')}</details><a class="brand" href="${base}${lang}/">Principal Accelerator Learning Path</a><div class="header-context">${breadcrumb}<nav class="header-actions" aria-label="${es ? 'Idioma y tema' : 'Language and theme'}"><a lang="${es ? 'en' : 'es'}" hreflang="${es ? 'en' : 'es'}" href="${base}${other}">${es ? 'en' : 'es'}</a>${themeControl()}</nav></div></header><main id="${mainId}">${normalizeSessionMarkup(mainBody, lang, isSession)}</main>${footer}</div></div>${themeScript()}</body></html>`;
}
function inlineReferences(value: string): string {
  return escapeHtml(value).replace(/\[([A-Z][0-9]+)\]/g, '<a href="#ref-$1">[$1]</a>');
}
function renderTable(table: { headers: string[]; rows: string[][] }, lang: 'es' | 'en'): string {
  const label =
    lang === 'es' ? 'Tabla con desplazamiento horizontal' : 'Table with horizontal scrolling';
  return `<div class="scroll" tabindex="0" role="region" aria-label="${label}"><table><thead><tr>${table.headers.map((h) => `<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${inlineReferences(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function splitNumberedItems(value: string): string[] {
  const matches = [...value.matchAll(/(?:^|\s)(\d+)\.\s+/g)];
  if (matches.length < 2) return [];
  return matches
    .map((match, index) =>
      value
        .slice(
          match.index! + match[0].indexOf(`${match[1]}.`) + `${match[1]}.`.length,
          matches[index + 1]?.index ?? value.length,
        )
        .trim(),
    )
    .filter(Boolean);
}
function renderNarrative(value: string, position: number): string {
  const numbered = splitNumberedItems(value);
  if (numbered.length)
    return `<ol class="reading-steps">${numbered.map((item) => `<li>${inlineReferences(item)}</li>`).join('')}</ol>`;
  const rendered = inlineReferences(value).replace(/^([^:<]{1,48}:)(?=\s)/, '<strong>$1</strong>');
  return `<p class="${position === 0 ? 'reading-lead' : 'reading-paragraph'}">${rendered}</p>`;
}
function renderInstructionalBlocks(
  blocks: NonNullable<Page['sections'][number]['blocks']>,
  lang: 'es' | 'en',
): string {
  const labels: Record<'es' | 'en', Record<(typeof blocks)[number]['kind'], string>> = {
    es: {
      pretraining: 'Antes de empezar',
      'guiding-question': 'Pregunta guía',
      concept: 'Concepto y alcance',
      example: 'Ejemplo concreto',
      mechanism: 'Cómo funciona',
      analysis: 'Análisis',
      retrieval: 'Autoprueba',
      failure: 'Fallo o contraejemplo',
      tradeoffs: 'Trade-offs y límites',
      production: 'Implicación de producción',
      resolution: 'Respuesta a la pregunta guía',
    },
    en: {
      pretraining: 'Before you begin',
      'guiding-question': 'Guiding question',
      concept: 'Concept and scope',
      example: 'Concrete example',
      mechanism: 'How it works',
      analysis: 'Analysis',
      retrieval: 'Self-check',
      failure: 'Failure or counterexample',
      tradeoffs: 'Trade-offs and limits',
      production: 'Production implication',
      resolution: 'Answer to the guiding question',
    },
  };
  return `<div class="instructional-blocks">${blocks
    .map((block) => {
      const label = labels[lang][block.kind];
      if (block.kind === 'retrieval')
        return `<details class="instructional-block instructional-retrieval"><summary><span class="instructional-label">${escapeHtml(label)}</span><strong>${inlineReferences(block.text)}</strong></summary><div class="retrieval-answer"><p class="instructional-answer-label">${lang === 'es' ? 'Respuesta' : 'Answer'}</p><p>${inlineReferences(block.answer!)}</p></div></details>`;
      return `<div class="instructional-block instructional-${block.kind}"><h4 class="instructional-label">${escapeHtml(label)}</h4><p>${inlineReferences(block.text)}</p></div>`;
    })
    .join('')}</div>`;
}
function renderSectionHeading(title: string, level: number): string {
  const tag = `h${level}`;
  const separator = ' — ';
  const splitAt = title.indexOf(separator);
  if (splitAt === -1) return `<${tag} class="section-heading">${escapeHtml(title)}</${tag}>`;
  const kicker = title.slice(0, splitAt);
  const heading = title.slice(splitAt + separator.length);
  return `<${tag} class="section-heading"><span class="section-kicker">${escapeHtml(kicker)}</span><span>${escapeHtml(heading)}</span></${tag}>`;
}
function renderDiagram(
  diagram: { source: string; description: string },
  base: string,
  lang: 'es' | 'en',
): string {
  const relation = diagram.source.includes('architecture-quality-relation')
    ? ' session-diagram--relation'
    : '';
  const desktopImage = `<img class="session-diagram${relation}" src="${base}${lang}/${outputForDiagram(diagram.source)}" alt="${escapeHtml(diagram.description)}">`;
  const mobileSource = hasMobileDiagramVariant(process.cwd(), diagram.source)
    ? `<picture class="responsive-diagram"><source media="(max-width: 52rem)" srcset="${base}${lang}/${outputForMobileDiagram(diagram.source)}">${desktopImage}</picture>`
    : desktopImage;
  return `<figure class="diagram-card">${mobileSource}<figcaption>${escapeHtml(diagram.description)}</figcaption></figure>`;
}
function renderToc(sections: Page['sections'], lang: 'es' | 'en'): string {
  const groups: { parent: Page['sections'][number]; children: Page['sections'] }[] = [];
  for (const section of sections) {
    if (section.level === 3 && groups.length) groups[groups.length - 1]!.children.push(section);
    else groups.push({ parent: section, children: [] });
  }
  const link = (section: Page['sections'][number]) =>
    `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.title)}</a>`;
  return `<details class="toc" id="table-of-contents"><summary>${lang === 'es' ? 'Tabla de contenido' : 'Table of contents'}</summary><nav aria-label="${lang === 'es' ? 'Tabla de contenido' : 'Table of contents'}"><ol class="toc-list">${groups.map((group) => `<li>${link(group.parent)}${group.children.length ? `<ol class="toc-sublist">${group.children.map((child) => `<li>${link(child)}</li>`).join('')}</ol>` : ''}</li>`).join('')}</ol></nav></details>`;
}
function renderStudyVisuals(
  lang: 'es' | 'en',
  exerciseTotal: number,
  checklistTotal: number,
): string {
  const es = lang === 'es';
  const share = (
    kind: 'exercise' | 'criteria' | 'success',
    shape: 'pie' | 'donut',
    total: number,
    title: string,
  ) =>
    `<figure class="share-chart" data-share-chart="${kind}"><figcaption>${title}</figcaption><div class="share-visual ${shape}" data-share-visual role="img" aria-label="${es ? 'Datos locales disponibles con JavaScript' : 'Local data available with JavaScript'}"><span data-share-center aria-hidden="true">— / ${total}</span></div><p class="share-caption" data-share-caption>${es ? 'Marcas locales pendientes de cargar' : 'Waiting for local study marks'}</p><ul class="share-legend" aria-hidden="true"><li><span class="legend-swatch legend-marked"></span>${es ? 'Marcados' : 'Marked'}</li><li><span class="legend-swatch legend-remaining"></span>${es ? 'Pendientes' : 'Remaining'}</li></ul></figure>`;
  const total = exerciseTotal + checklistTotal;
  return `<div class="chart-gallery">${share('exercise', 'pie', exerciseTotal, es ? 'Pie · Ejercicios' : 'Pie · Exercises')}${share('criteria', 'donut', checklistTotal, es ? 'Donut · Criterios de repaso' : 'Donut · Review criteria')}<figure class="line-chart"><figcaption>${es ? 'Línea · Actividad local registrada' : 'Line · Recorded local study activity'}</figcaption><svg data-study-line viewBox="0 0 400 170" role="img" aria-label="${es ? 'Historial local disponible con JavaScript' : 'Local history available with JavaScript'}"><path class="line-grid" d="M38 20H382 M38 80H382 M38 140H382"></path><path class="line-axis" d="M38 20V140H382"></path><text x="4" y="25">${total}</text><text x="18" y="145">0</text><path class="line-series" data-line-series hidden></path><g data-line-points></g></svg><p class="line-state" data-line-state role="status">${es ? 'Activa JavaScript para consultar el historial local.' : 'Enable JavaScript to view local history.'}</p><div class="line-time" data-line-time></div><p class="muted">${es ? 'Cada punto es el total marcado después de un cambio; el eje horizontal sigue el orden de los cambios, no intervalos de tiempo iguales.' : 'Each point is the total marked after a change; horizontal spacing follows change order, not equal time intervals.'}</p></figure></div>`;
}
function renderStudyTable(
  lang: 'es' | 'en',
  exerciseTotal: number,
  checklistTotal: number,
): string {
  const es = lang === 'es';
  const row = (group: 'exercise' | 'criteria' | 'success', label: string, total: number) =>
    `<tr><th scope="row">${label}</th><td data-study-table-marked="${group}">—</td><td data-study-table-remaining="${group}">—</td><td>${total}</td></tr>`;
  return `<div class="dashboard-table-wrap study-detail-table"><table class="dashboard-table"><caption>${es ? 'Detalle numérico de actividad local' : 'Numeric local study detail'}</caption><thead><tr><th scope="col">${es ? 'Grupo' : 'Group'}</th><th scope="col">${es ? 'Marcados' : 'Marked'}</th><th scope="col">${es ? 'Pendientes' : 'Remaining'}</th><th scope="col">Total</th></tr></thead><tbody>${row('exercise', es ? 'Ejercicios' : 'Exercises', exerciseTotal)}${row('criteria', es ? 'Criterios de repaso' : 'Review criteria', checklistTotal)}</tbody></table></div>`;
}
function renderSignalsTable(
  lang: 'es' | 'en',
  canonicalStatus: string,
  masteryStatus: string,
  sessionStatus: Page['status'],
): string {
  const es = lang === 'es';
  const statusLabel = (status: string) =>
    es
      ? ({
          'Not started': 'No iniciado',
          Partial: 'Parcial',
          Completed: 'Completado',
          Revisit: 'Revisitar',
        }[status] ?? status)
      : status;
  const mastery =
    masteryStatus === 'not-assessed' ? (es ? 'Sin evaluar' : 'Not assessed') : masteryStatus;
  const publication =
    sessionStatus === 'editorial-draft'
      ? es
        ? 'Borrador editorial'
        : 'Editorial draft'
      : sessionStatus;
  return `<div class="dashboard-table-wrap"><table class="dashboard-table"><caption>${es ? 'Estado y procedencia de las señales principales' : 'Status and source of key signals'}</caption><thead><tr><th scope="col">${es ? 'Señal' : 'Signal'}</th><th scope="col">${es ? 'Estado' : 'Status'}</th><th scope="col">${es ? 'Fuente' : 'Source'}</th></tr></thead><tbody><tr><th scope="row">${es ? 'Programa' : 'Program'}</th><td>${escapeHtml(statusLabel(canonicalStatus))}</td><td>07-PROGRESS.md</td></tr><tr><th scope="row">${es ? 'Dominio L1–L5' : 'L1–L5 mastery'}</th><td>${escapeHtml(mastery)}</td><td>data/mastery/PA-S001.json</td></tr><tr><th scope="row">${es ? 'Revisitas' : 'Revisits'}</th><td>${es ? 'Cola vacía' : 'Empty queue'}</td><td>07-PROGRESS.md</td></tr><tr><th scope="row">${es ? 'Publicación PA-S001' : 'PA-S001 publication'}</th><td>${escapeHtml(publication)}</td><td>site/${lang}/sessions/PA-S001/page.json</td></tr></tbody></table></div>`;
}
function mobileLinearFlow(
  figure: string,
  lang: 'es' | 'en',
  base: string,
  mobileDiagrams: ReadonlyMap<string, string>,
): string | undefined {
  if (
    !/<code\b[^>]*>\s*(?:(?:flowchart|graph)\s+(?:LR|RL)(?:;|\s)|sequenceDiagram\b)/i.test(figure)
  )
    return;
  const svg = figure.match(/<svg\b([^>]*)>([\s\S]*?)<\/svg>/);
  if (!svg) return;
  const diagramId = figure.match(/\bdata-diagram="([^"]+)"/)?.[1];
  const mobileAsset = diagramId ? mobileDiagrams.get(`${lang}:${diagramId}`) : undefined;
  if (mobileAsset) {
    const description =
      svg[2]!.match(/<desc\b[^>]*>([\s\S]*?)<\/desc>/)?.[1]?.replace(/<[^>]+>/g, '') ??
      figure.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1]?.replace(/<[^>]+>/g, '') ??
      '';
    const desktop = `<svg${svg[1]!.replace(/\bclass="[^"]*"/, '').trimEnd()} class="diagram-desktop">${svg[2]}</svg>`;
    const mobile = `<img class="diagram-mobile" src="${base}${lang}/${mobileAsset}" alt="${escapeHtml(description)}">`;
    return figure.replace(svg[0], `${desktop}${mobile}`);
  }
  const attributes = (source: string): Record<string, string> =>
    Object.fromEntries(
      [...source.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1]!, match[2]!]),
    );
  const rects = [...svg[2]!.matchAll(/<rect\b([^>]*)\/?\s*>/g)].map((match) =>
    attributes(match[1]!),
  );
  const labels = [...svg[2]!.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)].map((match) => ({
    attributes: attributes(match[1]!),
    text: match[2]!
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim(),
  }));
  if (rects.length < 3 || rects.length !== labels.length) return;
  const values = rects.map((rect) => ({
    x: Number(rect.x),
    y: Number(rect.y),
    width: Number(rect.width),
    height: Number(rect.height),
  }));
  if (
    values.some((rect) => !Object.values(rect).every(Number.isFinite)) ||
    values.some(
      (rect) =>
        Math.abs(rect.y - values[0]!.y) > 1 || Math.abs(rect.height - values[0]!.height) > 1,
    ) ||
    labels.some(
      (label, index) =>
        Math.abs(Number(label.attributes.x) - (values[index]!.x + values[index]!.width / 2)) > 2,
    )
  )
    return;

  const flowId =
    figure.match(/\bdata-diagram="([^"]+)"/)?.[1]?.replace(/[^\w-]/g, '-') ?? 'session-flow';
  const title =
    svg[2]!
      .match(/<title\b[^>]*>([\s\S]*?)<\/title>/)?.[1]
      ?.replace(/<[^>]+>/g, '')
      .trim() ?? '';
  const description =
    svg[2]!
      .match(/<desc\b[^>]*>([\s\S]*?)<\/desc>/)?.[1]
      ?.replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim() ?? title;
  const toneFor = (label: string, index: number): string => {
    const normalized = label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    if (/origen|source|cliente|client/.test(normalized)) return 'blue';
    if (/estimulo|stimulus|evento|event/.test(normalized)) return 'cyan';
    if (/entorno|context|architecture|arquitectura/.test(normalized)) return 'violet';
    if (/respuesta|response|quality|calidad/.test(normalized)) return 'amber';
    if (/medida|measure|evidencia|evidence|receptor/.test(normalized)) return 'green';
    if (/artefacto|artifact|stripe|external|externo/.test(normalized)) return 'coral';
    return ['blue', 'cyan', 'violet', 'amber', 'green', 'coral'][index % 6]!;
  };
  const wrap = (value: string, limit = 27): string[] => {
    const lines: string[] = [];
    let line = '';
    for (const word of value.split(/\s+/)) {
      if (line && `${line} ${word}`.length > limit) {
        lines.push(line);
        line = word;
      } else line = line ? `${line} ${word}` : word;
    }
    if (line) lines.push(line);
    return lines;
  };
  const nodeWidth = 280;
  const nodeX = 20;
  const center = nodeX + nodeWidth / 2;
  const gap = 30;
  let y = 18;
  const boxes: { y: number; height: number }[] = [];
  const nodes = labels.map((label, index) => {
    const lines = wrap(label.text);
    const height = Math.max(52, lines.length * 18 + 20);
    const nodeY = y;
    boxes.push({ y: nodeY, height });
    const tone = toneFor(label.text, index);
    const text = lines
      .map(
        (line, lineIndex) =>
          `<tspan x="${center}" dy="${lineIndex === 0 ? 0 : 18}">${escapeHtml(line)}</tspan>`,
      )
      .join('');
    y += height + gap;
    return `<g class="diagram-node" data-tone="${tone}"><rect x="${nodeX}" y="${nodeY}" width="${nodeWidth}" height="${height}" rx="10"/><text x="${center}" y="${nodeY + (height - lines.length * 18) / 2 + 14}" text-anchor="middle" data-node-label="true" data-tone="${tone}">${text}</text></g>`;
  });
  const arrows = nodes.slice(0, -1).map((_node, index) => {
    const start = boxes[index]!.y + boxes[index]!.height + 4;
    const next = boxes[index + 1]!.y - 8;
    return `<path class="diagram-arrow" d="M${center} ${start}V${next}" marker-end="url(#${flowId}-mobile-arrow)"/>`;
  });
  const totalHeight = y - gap + 18;
  const mobile = `<svg class="diagram-mobile" viewBox="0 0 320 ${totalHeight}" role="img" aria-labelledby="${flowId}-mobile-title ${flowId}-mobile-desc" preserveAspectRatio="xMidYMin meet"><title id="${flowId}-mobile-title">${escapeHtml(title)}</title><desc id="${flowId}-mobile-desc">${escapeHtml(description)}</desc><defs><marker id="${flowId}-mobile-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="#748194"/></marker></defs>${arrows.join('')}${nodes.join('')}</svg>`;
  const desktop = `<svg${svg[1]!.replace(/\bclass="[^"]*"/, '').trimEnd()} class="diagram-desktop">${svg[2]}</svg>`;
  return figure.replace(svg[0], `${desktop}${mobile}`);
}
function renderSourceSessionLayout(
  source: string,
  lang: 'es' | 'en',
  base: string,
  mobileDiagrams: ReadonlyMap<string, string>,
): string {
  const tocSource = source.match(
    /<nav (?:aria-label="(?:Índice de la sesión|Session index)"|aria-labelledby="toc-heading")>[\s\S]*?<\/nav>/,
  )?.[0];
  if (!tocSource) throw new Error(`PA-S001 ${lang} session index is missing`);
  let tocList = tocSource.match(/<ol>[\s\S]*<\/ol>/)?.[0];
  if (!tocList) throw new Error(`PA-S001 ${lang} session index list is missing`);
  let listDepth = 0;
  tocList = tocList.replace(/<ol>/g, () => {
    const className = listDepth++ === 0 ? 'toc-list' : 'toc-sublist';
    return `<ol class="${className}">`;
  });
  const toc = `<details class="toc" id="table-of-contents"><summary>${lang === 'es' ? 'Tabla de contenido' : 'Table of contents'}</summary><nav aria-labelledby="toc-heading"><h2 class="sr-only" id="toc-heading">${lang === 'es' ? 'Contenido' : 'Contents'}</h2>${tocList}</nav></details>`;
  let sectionNumber = 0;
  const article = source
    .replace(tocSource, '')
    .replace(/<p class="eyebrow">[\s\S]*?<\/p>/, '')
    .replace(/<h1\b[\s\S]*?<\/h1>/, '')
    .replace(/<p class="capability">[\s\S]*?<\/p>/, '')
    .replace(
      /<h2([^>]*)>\s*(\d+)\.\s*([\s\S]*?)\s*<\/h2>/g,
      (_heading, attributes: string, _sourceNumber: string, title: string) => {
        const number = String(++sectionNumber);
        const classAttribute = attributes.match(/\bclass="([^"]*)"/);
        const nextAttributes = classAttribute
          ? attributes.replace(
              classAttribute[0],
              `class="${[...new Set([...classAttribute[1]!.split(/\s+/), 'section-heading'])].join(' ')}"`,
            )
          : `${attributes} class="section-heading"`;
        return `<h2${nextAttributes}><span class="sr-only">${number}. </span><span class="section-number" aria-hidden="true">${lang === 'es' ? 'Sección' : 'Section'} ${number}</span><span class="section-title">${title.trim()}</span></h2>`;
      },
    );
  const responsiveFlows = article.replace(
    /<figure\b[^>]*data-diagram="[^"]+"[^>]*>[\s\S]*?<\/figure>/g,
    (figure) => mobileLinearFlow(figure, lang, base, mobileDiagrams) ?? figure,
  );
  const objectiveCards = responsiveFlows.replace(
    /<h([34])\b([^>]*)>([^<]*)<\/h\1>\s*(<p\b[\s\S]*?<\/p>)/g,
    (match, level: string, attributes: string, heading: string, paragraph: string) => {
      const title = heading.replace(/\s+/g, ' ').trim();
      const isObjective =
        /^(?:Objetivo(?: del tema principal| del subtema \d+| práctico)?|Objective(?: of the main topic| of (?:the )?subtopic \d+)?|Subtopic \d+ Objective|Goal of subtopic \d+|Practical Goal)$/i.test(
          title,
        );
      return isObjective
        ? `<div class="session-objective-card"><h${level}${attributes}>${heading}</h${level}>${paragraph}</div>`
        : match;
    },
  );
  let tableIndex = 0;
  const scrollableTables = objectiveCards.replace(
    /<table\b([^>]*)>([\s\S]*?)<\/table>/g,
    (_table, attributes: string, content: string) => {
      const captionId = `session-table-caption-${++tableIndex}`;
      const hasCaption = /<caption\b/.test(content);
      const labelledContent = hasCaption
        ? content.replace(/<caption\b([^>]*)>/, (_caption, captionAttributes: string) =>
            /\bid=/.test(captionAttributes)
              ? `<caption${captionAttributes}>`
              : `<caption${captionAttributes} id="${captionId}">`,
          )
        : content;
      const accessibleName = hasCaption
        ? `aria-labelledby="${captionId}"`
        : `aria-label="${lang === 'es' ? 'Tabla desplazable' : 'Scrollable table'}"`;
      const tableAttributes = attributes.replace(/\s+tabindex="[^"]*"/, '');
      return `<div class="session-table-scroll" tabindex="0" role="region" ${accessibleName}><table${tableAttributes}>${labelledContent}</table></div>`;
    },
  );
  return `<div class="layout">${toc}${scrollableTables}</div>`;
}
function renderVisualLearning(page: Page, base: string): string {
  if (!page.visualLearning) return '';
  const es = page.lang === 'es';
  const guide = page.visualLearning;
  const renderBlock = (
    value: (typeof guide.modes)[number]['blocks'][number],
    modeNumber: number,
  ): string => {
    if (value.type === 'cards')
      return `<div class="studio-cards">${value.cards.map((card) => `<article class="studio-card">${card.eyebrow ? `<p class="eyebrow">${escapeHtml(card.eyebrow)}</p>` : ''}<h4>${escapeHtml(card.title)}</h4><p>${inlineReferences(card.body)}</p></article>`).join('')}</div>`;
    if (value.type === 'diagram') return renderDiagram(value.diagram, base, page.lang);
    if (value.type === 'comparison') return renderTable(value.table, page.lang);
    if (value.type === 'flow')
      return `<ol class="studio-flow">${value.steps.map((step, index) => `<li><span class="flow-index">${String(index + 1).padStart(2, '0')}</span><div><h4>${escapeHtml(step.title)}</h4><p>${inlineReferences(step.body)}</p></div></li>`).join('')}</ol>`;
    const reveal = es ? 'Mostrar respuesta' : 'Reveal answer';
    const hide = es ? 'Mostrar pregunta' : 'Show question';
    return `<div class="flashcard-deck" data-flashcards tabindex="0" aria-label="${es ? 'Tarjetas de repaso' : 'Recall cards'}"><p class="flashcard-mode">${es ? 'MODO' : 'MODE'} ${modeNumber} ${es ? 'DE' : 'OF'} ${guide.modes.length}</p><div class="flashcard-controls"><button type="button" data-flash-prev>${es ? 'Anterior' : 'Previous'}</button><span aria-live="polite" data-flashcard-count></span><button type="button" data-flash-next>${es ? 'Siguiente' : 'Next'}</button></div>${value.cards.map((card) => `<article class="flashcard" data-flashcard data-flash-id="${escapeHtml(card.id)}"><button class="flashcard-flip" type="button" data-flash-flip aria-pressed="false" aria-expanded="false" data-reveal-label="${escapeHtml(`${reveal}: ${card.question}`)}" data-hide-label="${escapeHtml(`${hide}: ${card.question}`)}" aria-label="${escapeHtml(`${reveal}: ${card.question}`)}"><span class="flashcard-inner"><span class="flashcard-face flashcard-question"><span class="eyebrow">${escapeHtml(card.id)} · ${escapeHtml(card.category)}</span><strong>${escapeHtml(card.question)}</strong><span class="flashcard-prompt">${es ? 'Toca para revelar la respuesta' : 'Tap to reveal the answer'}</span></span><span class="flashcard-face flashcard-answer"><span class="eyebrow">${es ? 'RESPUESTA' : 'ANSWER'}</span><strong>${inlineReferences(card.answer)}</strong><span class="flashcard-explanation">${inlineReferences(card.explanation)}</span></span></span></button></article>`).join('')}</div>`;
  };
  return `<div class="learning-studio" data-learning-studio><div class="studio-intro"><p class="eyebrow">${es ? 'ESTUDIO VISUAL' : 'VISUAL STUDIO'}</p><p>${inlineReferences(guide.intro)}</p></div><nav class="visual-mode-nav" data-mode-nav aria-label="${es ? 'Modos de aprendizaje' : 'Learning modes'}">${guide.modes.map((mode, index) => `<a id="visual-tab-${mode.id}" href="#visual-panel-${mode.id}" data-mode-control class="${index === 0 ? 'is-active' : ''}">${escapeHtml(mode.label)}</a>`).join('')}</nav>${guide.modes.map((mode, index) => `<div class="visual-mode-panel" id="visual-panel-${mode.id}" data-visual-panel><details class="visual-mode" open><summary>${escapeHtml(mode.label)}</summary><div class="visual-mode-content"><p class="eyebrow">${escapeHtml(mode.kind)}</p><h3>${escapeHtml(mode.title)}</h3><p class="studio-rationale">${inlineReferences(mode.rationale)}</p><p class="studio-sources">${es ? 'Derivado de' : 'Derived from'} ${mode.sourceSections.map((id) => `<a href="#${id}">#${escapeHtml(id)}</a>`).join(', ')}</p>${mode.blocks.map((block) => renderBlock(block, index + 1)).join('')}</div></details></div>`).join('')}</div>`;
}
export function renderPage(
  page: Page,
  base: string,
  route = page.kind === 'session' ? 'sessions/PA-S001' : 'projects/p0',
  canonicalTheory?: string,
  sourceSessionHtml?: string,
  mobileDiagrams: ReadonlyMap<string, string> = new Map(),
): string {
  const es = page.lang === 'es';
  const crumb =
    page.kind === 'session'
      ? `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${page.lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${page.lang}/sessions/">${es ? 'Sesiones' : 'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S001</span></nav>`
      : `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${page.lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${page.lang}/projects/">${es ? 'Proyectos' : 'Projects'}</a><span aria-hidden="true">/</span><span>${escapeHtml(page.title)}</span></nav>`;
  const intro = `${crumb}<div class="page-intro"><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.description)}</p><p class="notice">${es ? 'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno' : 'Editorial draft · Mastery not assessed · No learner measurements'}</p>${page.kind === 'session' ? `<noscript><p class="notice">${es ? 'La teoría y las respuestas son legibles; las casillas no se guardan sin JavaScript.' : 'Theory and answers remain readable; study boxes are not saved without JavaScript.'}</p></noscript>` : ''}</div>`;
  if (sourceSessionHtml && page.kind === 'session') {
    const sourceBody = placeTocFabsAtSectionEnds(
      renderSourceSessionLayout(sourceSessionHtml, page.lang, base, mobileDiagrams),
      page.lang,
    );
    const sourceMetadata =
      sourceSessionHtml
        .match(/<p class="eyebrow">([\s\S]*?)<\/p>/)?.[1]
        ?.replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim() ?? '';
    const sourceIntro = `${crumb}<div class="page-intro">${sourceMetadata ? `<p class="eyebrow sr-only">${sourceMetadata}</p>` : ''}<h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.description)}</p></div>`;
    return shell(
      page.lang,
      page.title,
      `${sourceIntro}${sourceBody}`,
      base,
      (es ? 'en/' : 'es/') + `${route}/`,
    );
  }
  const canonical =
    canonicalTheory && page.kind === 'session'
      ? renderCanonical(canonicalTheory, page.lang, base)
      : undefined;
  const toc = canonical?.toc ?? renderToc(page.sections, page.lang);
  const referencesList = `<ol class="references">${page.references.map((r) => `<li id="ref-${r.id}"><a href="${escapeHtml(r.url)}">[${r.id}] ${escapeHtml(r.title)}</a></li>`).join('')}</ol>`;
  const body = page.sections
    .map((s) => {
      const heading = s.level === 3 ? 3 : 2;
      const table = s.table ? renderTable(s.table, page.lang) : '';
      const diagram = s.diagram ? renderDiagram(s.diagram, base, page.lang) : '';
      const code = s.code ? `<pre class="code"><code>${escapeHtml(s.code)}</code></pre>` : '';
      const checklist = s.checklist
        ? `<ul class="checklist">${s.checklist.map((item) => `<li>□ ${escapeHtml(item)}</li>`).join('')}</ul>`
        : '';
      const study = s.studyItems
        ? `<ul class="study-list">${s.studyItems.map((item) => `<li><label><input type="checkbox" data-study-id="${escapeHtml(item.id)}"><span>${escapeHtml(item.label)}</span></label></li>`).join('')}</ul><p class="study-status" data-storage-status role="status"></p>`
        : '';
      const visual = s.id === 'visual-learning-guide' ? renderVisualLearning(page, base) : '';
      const instructional = s.blocks ? renderInstructionalBlocks(s.blocks, page.lang) : '';
      return `<section id="${s.id}">${renderSectionHeading(s.title, heading)}${s.paragraphs.map((p, index) => renderNarrative(p, index)).join('')}${instructional}${table}${diagram}${code}${checklist}${study}${visual}${s.id === 'resources' ? referencesList : ''}</section>`;
    })
    .join('');
  const extra =
    page.sections.some((s) => s.id === 'resources') || page.references.length === 0
      ? ''
      : `<section id="references"><h2>${es ? 'Fuentes y referencias' : 'Sources and references'}</h2>${referencesList}</section>`;
  const article = canonical
    ? `<article class="canonical-theory">${canonical.html}</article>`
    : `<article>${body}${extra}</article>`;
  return shell(
    page.lang,
    page.title,
    intro +
      `<div class="layout">${toc}${article}</div>` +
      (page.kind === 'session' && !canonical ? tocFab(page.lang) : ''),
    base,
    (es ? 'en/' : 'es/') + `${route}/`,
  );
}
export function home(
  lang: 'es' | 'en',
  base: string,
  session: Page,
  canonicalStatus: string,
  masteryStatus: string,
  systemsStatus: string,
): string {
  if (session.lang !== lang || !session.dashboard)
    throw new Error('Dashboard requires the matching session source');
  const es = lang === 'es';
  const statusLabel = (status: string) =>
    es
      ? ({
          'Not started': 'No iniciado',
          Partial: 'Parcial',
          Completed: 'Completado',
          Revisit: 'Revisitar',
        }[status] ?? status)
      : status;
  const exerciseIds = session.dashboard.exerciseIds.join('|');
  const checklistIds = session.dashboard.checklistIds.join('|');
  const successIds = SUCCESS_IDS.join('|');
  const exerciseTotal = session.dashboard.exerciseIds.length;
  const checklistTotal = session.dashboard.checklistIds.length;
  const body = `<div class="home-hero"><p class="eyebrow">F0 / PA-S001</p><h1>${es ? 'Panel de aprendizaje' : 'Learning dashboard'}</h1><p class="lead">${es ? 'Actividad de estudio local, estado canónico y evidencia se presentan por separado.' : 'Local study activity, canonical status, and evidence are shown separately.'}</p></div><div class="dashboard-grid">
  <section class="dash-card dash-card--featured" id="study"><p class="eyebrow">01 / ${es ? 'ESTUDIO' : 'STUDY'}</p><h2>${es ? 'Actividad marcada' : 'Marked study activity'}</h2><p data-study-summary>${es ? 'Las marcas de estudio locales aparecen aquí al habilitar JavaScript.' : 'Local study marks appear here when JavaScript is enabled.'}</p><figure class="study-chart" data-study-chart data-session-id="${escapeHtml(session.id)}" data-exercise-ids="${exerciseIds}" data-criteria-ids="${checklistIds}" data-success-ids="${successIds}"><figcaption>${es ? 'Barras · Marcas en este navegador' : 'Bar · Marks in this browser'}</figcaption><div class="chart-row"><label for="study-exercises">${es ? 'Ejercicios' : 'Exercises'}</label><progress id="study-exercises" data-study-progress="exercise" max="${exerciseTotal}"></progress><output data-study-count="exercise">— / ${exerciseTotal}</output></div><div class="chart-row"><label for="study-criteria">${es ? 'Criterios de repaso' : 'Review criteria'}</label><progress id="study-criteria" data-study-progress="criteria" max="${checklistTotal}"></progress><output data-study-count="criteria">— / ${checklistTotal}</output></div></figure>${renderStudyVisuals(lang, exerciseTotal, checklistTotal)}${renderStudyTable(lang, exerciseTotal, checklistTotal)}<p class="muted">${es ? 'Las visualizaciones y la tabla muestran actividad local, no dominio acreditado.' : 'The visualizations and table show local study activity, not assessed mastery.'}</p></section>
  <section class="dash-card dash-card--wide" id="roadmap"><p class="eyebrow">02 / ROADMAP</p><h2>${es ? 'Sesiones disponibles' : 'Available sessions'}</h2><div class="dashboard-table-wrap"><table class="dashboard-table"><caption>${es ? 'Sesiones disponibles y estado editorial' : 'Available sessions and editorial status'}</caption><thead><tr><th scope="col">${es ? 'Sesión' : 'Session'}</th><th scope="col">${es ? 'Fase' : 'Phase'}</th><th scope="col">${es ? 'Publicación' : 'Publication'}</th></tr></thead><tbody><tr><th scope="row"><a href="${base}${lang}/sessions/PA-S001/">${escapeHtml(session.id)} · ${escapeHtml(session.title)}</a></th><td>F0</td><td>${es ? 'Borrador editorial' : 'Editorial draft'}</td></tr><tr><th scope="row"><a href="${base}${lang}/sessions/PA-S002/">PA-S002 · ${es ? 'Monorepo y estándares de ingeniería' : 'Monorepo and engineering standards'}</a></th><td>F0</td><td>${es ? 'Borrador editorial' : 'Editorial draft'}</td></tr><tr><th scope="row"><a href="${base}${lang}/sessions/PA-S003/">PA-S003 · ${es ? 'Arquitectura del portafolio y Learning Site' : 'Portfolio and Learning Site architecture'}</a></th><td>F0</td><td>${es ? 'Borrador editorial' : 'Editorial draft'}</td></tr><tr><th scope="row"><a href="${base}${lang}/sessions/PA-S004/">PA-S004 · ${es ? 'Sistemas de diseño, tokens y accesibilidad' : 'Design systems, tokens, and accessibility'}</a></th><td>F0</td><td>${es ? 'Borrador editorial' : 'Editorial draft'}</td></tr><tr><th scope="row"><a href="${base}${lang}/sessions/PA-S005/">PA-S005 · ${es ? 'Arquitectura de contenido ES/EN e internacionalización' : 'ES/EN content architecture and internationalization'}</a></th><td>F0</td><td>${es ? 'Borrador editorial' : 'Editorial draft'}</td></tr></tbody></table></div><p class="muted">${es ? 'F1–F5: sin sesiones publicadas todavía.' : 'F1–F5: no sessions published yet.'}</p></section>
  <section class="dash-card dash-card--featured" id="signals"><p class="eyebrow">03 / ${es ? 'RESUMEN' : 'OVERVIEW'}</p><h2>${es ? 'Señales principales' : 'Key signals'}</h2>${renderSignalsTable(lang, canonicalStatus, masteryStatus, session.status)}<p class="muted">${es ? 'Cada fila conserva su fuente; la actividad local no modifica estos estados.' : 'Each row retains its source; local study activity does not modify these statuses.'}</p></section>
  <section class="dash-card" id="status"><p class="eyebrow">04 / ${es ? 'ESTADO' : 'STATUS'}</p><h2>${es ? 'Estado general del programa' : 'Overall program status'}</h2><p><strong>${escapeHtml(statusLabel(canonicalStatus))}</strong></p><p class="muted">${es ? 'Fuente: 07-PROGRESS.md. Las marcas locales no modifican este estado.' : 'Source: 07-PROGRESS.md. Local marks do not change this status.'}</p></section>
  <section class="dash-card" id="mastery"><p class="eyebrow">05 / L1–L5</p><h2>${es ? 'Dominio respaldado' : 'Evidence-backed mastery'}</h2><p><strong>${masteryStatus === 'not-assessed' ? (es ? 'Sin evaluar' : 'Not assessed') : escapeHtml(masteryStatus)}</strong></p><p class="muted">${es ? 'No hay niveles ni mediciones asignados.' : 'No levels or measurements are assigned.'}</p></section>
  <section class="dash-card" id="artifacts"><p class="eyebrow">06 / ${es ? 'ARTEFACTOS' : 'ARTIFACTS'}</p><h2>${es ? 'Artefactos públicos' : 'Public artifacts'}</h2><ul><li><a href="${base}${lang}/sessions/PA-S001/">${es ? 'Capítulo editorial PA-S001' : 'PA-S001 editorial chapter'}</a></li><li><a href="${base}${lang}/projects/portfolio/">${es ? 'Proyecto de portafolio P0' : 'P0 portfolio project'}</a></li></ul><p class="muted">${es ? 'Borradores publicados localmente; sin evidencia del estudiante validada.' : 'Locally built drafts; no learner evidence validated.'}</p></section>
  <section class="dash-card" id="revisit"><p class="eyebrow">07 / REVISIT</p><h2>${es ? 'Revisitas' : 'Revisits'}</h2><p>${es ? 'La cola canónica está vacía.' : 'The canonical queue is empty.'}</p><p class="muted">${es ? 'Revisiones pendientes: decisiones, fallo controlado y equivalencia semántica ES/EN.' : 'Pending review: decisions, controlled failure, and ES/EN semantic equivalence.'}</p></section>
  <section class="dash-card dash-card--wide" id="projects"><p class="eyebrow">08 / P0</p><h2>${es ? 'Proyectos y sistemas' : 'Projects and systems'}</h2><div class="dashboard-table-wrap"><table class="dashboard-table"><caption>${es ? 'Productos P0 y estado canónico' : 'P0 products and canonical status'}</caption><thead><tr><th scope="col">${es ? 'Producto' : 'Product'}</th><th scope="col">${es ? 'Estado canónico' : 'Canonical status'}</th></tr></thead><tbody><tr><th scope="row"><a href="${base}${lang}/">Principal Accelerator Learning Path</a></th><td>${escapeHtml(statusLabel(systemsStatus))}</td></tr><tr><th scope="row"><a href="${base}${lang}/projects/portfolio/">${es ? 'Portafolio profesional' : 'Professional portfolio'}</a></th><td>${escapeHtml(statusLabel(systemsStatus))}</td></tr></tbody></table></div><p class="muted">${es ? 'Fuente: 07-PROGRESS.md; el registro canónico existente agrupa el estado P0.' : 'Source: 07-PROGRESS.md; the existing canonical record groups P0 status.'}</p></section>
  <section class="dash-card" id="activity"><p class="eyebrow">09 / ${es ? 'ACTIVIDAD' : 'ACTIVITY'}</p><h2>${es ? 'Actividad y siguiente trabajo' : 'Activity and next work'}</h2><p>${es ? 'Sin actividad del estudiante registrada en fuentes canónicas.' : 'No learner activity recorded in canonical sources.'}</p><p>${es ? 'Siguiente: PA-S001, revisión del capítulo y ejercicios propios.' : 'Next: PA-S001, chapter review and learner exercises.'}</p></section>
  </div>`;
  return shell(lang, 'Principal Accelerator Learning Path', body, base, es ? 'en/' : 'es/');
}
export function sessionsIndex(lang: 'es' | 'en', base: string): string {
  const es = lang === 'es';
  const body = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><span>${es ? 'Sesiones' : 'Sessions'}</span></nav><p class="eyebrow">F0</p><h1>${es ? 'Sesiones' : 'Sessions'}</h1><p class="lead">${es ? 'Índice publicable de sesiones disponibles.' : 'Publishable index of available sessions.'}</p><div class="cards"><a class="card" href="${base}${lang}/sessions/PA-S001/"><span>PA-S001</span><h2>${es ? 'Fundamentos de ingeniería de software: arquitectura, plataforma y alcance Staff → Principal' : 'Fundamentals of software engineering: architecture, platform and scope Staff → Principal'}</h2><p>${es ? 'Borrador editorial bilingüe; evidencia de dominio pendiente.' : 'Bilingual editorial draft; mastery evidence pending.'}</p></a><a class="card" href="${base}${lang}/sessions/PA-S002/"><span>PA-S002</span><h2>${es ? 'Monorepo y estándares de ingeniería' : 'Monorepo and engineering standards'}</h2><p>${es ? 'Borrador editorial bilingüe; dominio sin evaluar.' : 'Editorial draft; mastery not assessed.'}</p></a><a class="card" href="${base}${lang}/sessions/PA-S003/"><span>PA-S003</span><h2>${es ? 'Arquitectura del portafolio y Learning Site' : 'Portfolio and Learning Site architecture'}</h2><p>${es ? 'Borrador editorial bilingüe; dominio sin evaluar.' : 'Editorial draft; mastery not assessed.'}</p></a><a class="card" href="${base}${lang}/sessions/PA-S004/"><span>PA-S004</span><h2>${es ? 'Sistemas de diseño, tokens y accesibilidad' : 'Design systems, tokens, and accessibility'}</h2><p>${es ? 'Borrador editorial bilingüe; dominio sin evaluar.' : 'Editorial draft; mastery not assessed.'}</p></a><a class="card" href="${base}${lang}/sessions/PA-S005/"><span>PA-S005</span><h2>${es ? 'Arquitectura de contenido ES/EN e internacionalización' : 'ES/EN content architecture and internationalization'}</h2><p>${es ? 'Borrador editorial bilingüe; dominio sin evaluar.' : 'Editorial draft; mastery not assessed.'}</p></a></div>`;
  return shell(
    lang,
    es ? 'Sesiones' : 'Sessions',
    body,
    base,
    es ? 'en/sessions/' : 'es/sessions/',
  );
}
export function projectsIndex(lang: 'es' | 'en', base: string): string {
  const es = lang === 'es';
  const body = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><span>${es ? 'Proyectos' : 'Projects'}</span></nav><p class="eyebrow">P0</p><h1>${es ? 'Proyectos' : 'Projects'}</h1><p class="lead">${es ? 'Índice publicable de productos del Accelerator.' : 'Publishable index of Accelerator products.'}</p><div class="cards"><a class="card" href="${base}${lang}/projects/portfolio/"><span>P0 / PORTFOLIO</span><h2>${es ? 'Portafolio profesional' : 'Professional portfolio'}</h2><p>${es ? 'Superficie profesional separada; detalles pendientes de revisión del estudiante.' : 'A separate professional surface; details await learner review.'}</p></a><a class="card" href="${base}${lang}/"><span>P0 / LEARNING SITE</span><h2>Principal Accelerator Learning Path</h2><p>${es ? 'Sitio bilingüe de teoría, seguimiento de estudio y proyectos.' : 'Bilingual site for theory, study tracking, and projects.'}</p></a></div>`;
  return shell(
    lang,
    es ? 'Proyectos' : 'Projects',
    body,
    base,
    es ? 'en/projects/' : 'es/projects/',
  );
}
