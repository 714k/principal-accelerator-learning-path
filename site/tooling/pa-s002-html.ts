import { placeTocFabsAtSectionEnds, shell } from './render.ts';

const introIds = new Set(['estimated-time', 'summary', 'objective', 'preview']);
const tocSections: Array<[string, string, boolean]> = [
  ['estimated-time', 'Estimated time', false],
  ['summary', 'Synthesis in 30 seconds', false],
  ['objective', 'Objective', false],
  ['preview', 'Learning preview', false],
  ['concepts', 'Concepts', false],
  ['main-topic', 'Main topic: From the shared repository to testable boundaries', true],
  ['integration', 'Integration across knowledge areas', false],
  ['theory-practice', 'Theory → practice', false],
  ['real-world', 'Real-world example', false],
  ['production-example', 'Production-ready example', false],
  ['global-studio', 'Global Visual Learning Studio', false],
  ['exercises', 'Exercises', false],
  ['sources', 'Knowledge sources', false],
  ['work-resources', 'Work resources', false],
  ['deliverables', 'Session deliverables', false],
  ['checklist', 'Review checklist', false],
  ['success-criteria', 'Success criteria', false],
  ['bridge', 'Bridge to the next session', false],
];

function matchingElementEnd(markup: string, start: number, name: string): number {
  const tags = new RegExp(`<\\/?${name}\\b[^>]*>`, 'gi');
  tags.lastIndex = start;
  let depth = 0;
  let tag: RegExpExecArray | null;
  while ((tag = tags.exec(markup))) {
    if (/^<\//.test(tag[0])) depth -= 1;
    else depth += 1;
    if (depth === 0) return tags.lastIndex;
  }
  return markup.length;
}

function matchingSectionEnd(markup: string, start: number): number {
  return matchingElementEnd(markup, start, 'section');
}

function addSectionLabel(markup: string, id: string, headingId: string): string {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const open = new RegExp(`<section\\b(?=[^>]*\\bid="${escaped}")[^>]*>`);
  const match = open.exec(markup);
  if (!match) return markup;
  const end = matchingSectionEnd(markup, match.index);
  let section = markup.slice(match.index, end);
  section = section.replace(match[0], (tag) => {
    const withLabel = tag.replace(/\s+aria-labelledby="[^"]*"/g, '');
    return withLabel.slice(0, -1) + ` aria-labelledby="${headingId}">`;
  });
  const heading = /<h([2-6])\b([^>]*)>/.exec(section);
  if (heading) {
    const opening = heading[0];
    const attributes = heading[2] ?? '';
    const nextAttributes = /\bid="/.test(attributes)
      ? attributes.replace(/\bid="[^"]*"/, `id="${headingId}"`)
      : `${attributes} id="${headingId}"`;
    section = section.replace(opening, `<h${heading[1]}${nextAttributes}>`);
  }
  return markup.slice(0, match.index) + section + markup.slice(end);
}

function normalizeConceptCards(markup: string, lang: 'es' | 'en'): string {
  const exampleLabel = lang === 'es' ? 'Ejemplo' : 'Example';
  return markup.replace(
    /<div\b(?=[^>]*\bdata-concept(?:\s|=|>))([^>]*)>([\s\S]*?)<\/div>/gi,
    (whole, attributes: string, inner: string) => {
      const term = inner.match(/<dt\b[^>]*>([\s\S]*?)<\/dt>/i)?.[1];
      const definitionBlock = inner.match(/<dd\b[^>]*>([\s\S]*?)<\/dd>/i)?.[1];
      if (!term || !definitionBlock) return whole;
      const plainTerm = term.replace(/<[^>]+>/g, '').trim();
      const colon = plainTerm.indexOf(':');
      if (colon < 0) return whole;
      const conceptName = plainTerm.slice(0, colon).trim();
      const definition = plainTerm.slice(colon + 1).trim();
      const example = definitionBlock.match(
        /<p\b([^>]*)>\s*<strong\b[^>]*>(?:Ejemplo|Example):<\/strong>\s*([\s\S]*?)<\/p>/i,
      );
      const exampleMarkup = example
        ? `<details class="concept-example-disclosure"><summary>${exampleLabel}</summary><p${example[1]}>${example[2]}</p></details>`
        : definitionBlock;
      return `<div${attributes}><dt><strong>${conceptName}</strong></dt><dd><p>${definition}</p>${exampleMarkup}</dd></div>`;
    },
  );
}

function normalizeToc(markup: string, lang: 'es' | 'en'): string {
  const nav = markup.match(/<nav\b(?=[^>]*\bid="structure")[^>]*>[\s\S]*?<\/nav>/i);
  if (!nav) throw new Error('PA-S002 handoff is missing its table of contents');
  const labels = tocSections.map(([id, english, nested]) => {
    const sourceLinkLabel = (target: string): string => {
      const match = markup.match(
        new RegExp(`<a\\s+href="#${target}"[^>]*>\\s*([\\s\\S]*?)\\s*<\\/a\\s*>`, 'i'),
      );
      return (
        match?.[1]
          ?.replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim() ?? ''
      );
    };
    const label =
      lang === 'es' ? (sourceLinkLabel(id) || english).replace(/^\d+\.\s*/, '') : english;
    const children = nested
      ? `<ol class="toc-sublist">${Array.from({ length: 7 }, (_, index) => {
          const subId = `subtopic-${index + 1}`;
          const sourceLabel = sourceLinkLabel(subId);
          const childLabel =
            lang === 'es'
              ? sourceLabel.replace(/^\d+\.\d+\s*Subtema\s*\d+:?\s*/i, '')
              : sourceLabel.replace(/^\d+\.\d+\s*Subtopic\s*\d+:?\s*/i, '');
          return `<li><a href="#${subId}">${childLabel}</a></li>`;
        }).join('')}</ol>`
      : '';
    return `<li><a href="#${id}">${label}</a>${children}</li>`;
  });
  const introCount = tocSections.findIndex(([id]) => id === 'concepts');
  const introList = `<ul class="toc-intro-list">${labels.slice(0, introCount).join('')}</ul>`;
  const sectionList = `<ol class="toc-list">${labels.slice(introCount).join('')}</ol>`;
  const tocHeading = lang === 'es' ? 'Tabla de contenido' : 'Table of contents';
  const replacement = `<nav id="table-of-contents" aria-labelledby="toc-heading"><h2 id="toc-heading">${tocHeading}</h2>${introList}${sectionList}</nav>`;
  return markup.replace(nav[0], replacement);
}

function normalizeHeadings(markup: string, lang: 'es' | 'en'): string {
  let structural = false;
  let sectionNumber = 0;
  return markup.replace(
    /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi,
    (whole, attributes: string, content: string) => {
      const title = content.replace(/^\s*\d+\.\s*/, '').trim();
      if (introIds.has(attributes.match(/\bid="([^"]+)"/)?.[1] ?? ''))
        return `<h2${attributes}>${title}</h2>`;
      if (/^Conceptos$|^Concepts$/i.test(title)) structural = true;
      if (!structural) return `<h2${attributes}>${title}</h2>`;
      sectionNumber += 1;
      const hidden = lang === 'es' ? `Sección ${sectionNumber}. ` : `Section ${sectionNumber}. `;
      const headingAttributes = /\bclass="([^"]*)"/.test(attributes)
        ? attributes.replace(/\bclass="([^"]*)"/, (_match, value: string) => {
            const classes = new Set(value.split(/\s+/).filter(Boolean));
            classes.add('section-heading');
            return `class="${[...classes].join(' ')}"`;
          })
        : `${attributes} class="section-heading"`;
      return `<h2${headingAttributes}><span class="sr-only">${hidden}</span><span class="section-number" aria-hidden="true">${lang === 'es' ? `Sección ${sectionNumber}` : `Section ${sectionNumber}`}</span><span class="section-title">${title}</span></h2>`;
    },
  );
}

function normalizeWidgetMarkup(markup: string, lang: 'es' | 'en'): string {
  const openings = [...markup.matchAll(/<section\b(?=[^>]*\bdata-widget=)[^>]*>/gi)].reverse();
  let normalized = markup;
  let flashcardIndex = 0;
  for (const opening of openings) {
    const start = opening.index!;
    const end = matchingElementEnd(normalized, start, 'section');
    let widget = normalized
      .slice(start, end)
      .replace(/<h5\b/gi, '<h4')
      .replace(/<\/h5\s*>/gi, '</h4>');
    if (/\bdata-widget="flashcards"/.test(opening[0]!)) {
      const targetId = `PA-S002-flashcard-${++flashcardIndex}-answer`;
      widget = widget.replace(
        /<p\b([^>]*\bclass="[^"]*\bflashcard-answer\b[^"]*")/i,
        `<p$1 id="${targetId}"`,
      );
      widget = widget.replace(
        /<button\b([^>]*\bclass="[^"]*\bflashcard-reveal\b[^"]*")/i,
        (button) =>
          /\baria-controls=/.test(button)
            ? button
            : button.replace(/>$/, ` aria-controls="${targetId}">`),
      );
    }
    if (/\bdata-widget="simulator"/.test(opening[0]!)) {
      const legend = lang === 'es' ? 'Controles del simulador' : 'Simulator controls';
      widget = widget.replace(
        /(<label\b)/i,
        `<fieldset class="semantic-select"><legend class="sr-only">${legend}</legend>$1`,
      );
      widget = widget.replace(/(<\/label>)(?=\s*<div\b[^>]*class="sim-graph")/i, '$1</fieldset>');
    }
    normalized = normalized.slice(0, start) + widget + normalized.slice(end);
  }
  return normalized;
}

function normalizeSessionSource(source: string, lang: 'es' | 'en'): string {
  const article = /<article\b[^>]*>/i.exec(source);
  if (!article) throw new Error(`PA-S002 ${lang} HTML source has no article`);
  const articleEnd = matchingElementEnd(source, article.index, 'article');
  const closingIndex = source.lastIndexOf('</article', articleEnd);
  if (closingIndex < article.index) throw new Error(`PA-S002 ${lang} HTML article is not closed`);
  let content = source
    .slice(article.index + article[0].length, closingIndex)
    .replace(/<header\b[^>]*>[\s\S]*?<\/header>/i, '')
    .replace(/<script\b(?![^>]*\btype="application\/json")[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<nav id="structure"\b[^>]*>/i, '<nav id="structure" data-legacy-toc>');
  content = normalizeToc(content, lang);
  content = content.replace(/<p class="state"([^>]*)>/i, '<p class="notice"$1>');

  for (const id of introIds) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const startTag = new RegExp(`<section\\b(?=[^>]*\\bid="${escaped}")[^>]*>`).exec(content);
    if (!startTag) continue;
    const end = matchingSectionEnd(content, startTag.index);
    const fragment = content.slice(startTag.index, end);
    const changed = fragment
      .replace(startTag[0], `<div class="session-intro-component" id="${id}">`)
      .replace(/<\/section>\s*$/, '</div>');
    content = content.slice(0, startTag.index) + changed + content.slice(end);
  }

  const mainChapters = /<section\b(?=[^>]*\bid="main-chapters")[^>]*>/i.exec(content);
  if (mainChapters) {
    const end = matchingSectionEnd(content, mainChapters.index);
    const wrapper = content
      .slice(mainChapters.index, end)
      .replace(mainChapters[0], '<div class="main-chapters">')
      .replace(/<\/section>\s*$/, '</div>');
    content = content.slice(0, mainChapters.index) + wrapper + content.slice(end);
  }
  content = content.replace(
    /<section\b(?=[^>]*\bclass="area")[^>]*>\s*(?=<h5\b)/gi,
    '<div class="area">',
  );
  content = content.replace(/<\/dl>\s*<\/section>/gi, '</dl></div>');
  content = normalizeHeadings(content, lang);
  content = content.replace(
    /(<h3\b[^>]*>)\s*7\.(\d+)\s*/gi,
    (_whole, opening: string, index: string) => `${opening}2.${index} `,
  );
  content = normalizeConceptCards(content, lang);

  for (const [sectionId, checklistId] of [
    ['checklist', 'study-checklist'],
    ['success-criteria', 'success-study-checklist'],
  ]) {
    const sectionOpen = new RegExp(`<section\\b(?=[^>]*\\bid="${sectionId}")[^>]*>`);
    const sectionMatch = sectionOpen.exec(content);
    if (!sectionMatch) continue;
    const sectionEnd = matchingSectionEnd(content, sectionMatch.index);
    const section = content.slice(sectionMatch.index, sectionEnd);
    const normalized = section
      .replace(/<fieldset(?![^>]*\bid=)([^>]*)>/i, `<fieldset id="${checklistId}"$1>`)
      .replace(/<br\s*\/?>/gi, '');
    content = content.slice(0, sectionMatch.index) + normalized + content.slice(sectionEnd);
  }

  const sectionIds = [
    'concepts',
    'main-topic',
    ...Array.from({ length: 7 }, (_, i) => `subtopic-${i + 1}`),
    'integration',
    'theory-practice',
    'real-world',
    'production-example',
    'global-studio',
    'exercises',
    'sources',
    'work-resources',
    'deliverables',
    'checklist',
    'success-criteria',
    'bridge',
  ];
  for (const id of sectionIds) content = addSectionLabel(content, id, `${id}-heading`);

  content = content.replace(
    /<input\b([^>]*\bdata-check="([^"]+)"[^>]*)>/gi,
    (whole, attrs: string, checkKey: string, offset: number, full: string) => {
      const prefix = full.slice(0, offset);
      const successAt = prefix.lastIndexOf('id="success-criteria"');
      const reviewAt = prefix.lastIndexOf('id="checklist"');
      const success =
        checkKey.startsWith('success-') ||
        (successAt > reviewAt && successAt > prefix.lastIndexOf('</section>'));
      const group = success ? 'success' : 'review';
      const index = Number(checkKey.match(/\d+/)?.[0] ?? 0) + 1;
      const id = `PA-S002:${group}:${String(index).padStart(2, '0')}`;
      const safeAttrs = attrs.replace(/\sdata-check="[^"]+"/, '').replace(/\/\s*$/, '');
      return `<input${safeAttrs} data-study-id="${id}">`;
    },
  );
  content = content.replace(/class="question"/g, 'class="question flashcard-prompt"');
  content = content.replace(/class="answer"/g, 'class="answer flashcard-answer"');
  content = content.replace(/class="flip"/g, 'class="flip flashcard-reveal"');
  content = content.replace(/class="flash"/g, 'class="flash flashcard"');
  content = content.replace(/class="controls"/g, 'class="controls flashcard-controls"');
  content = content.replace(/class="mind-graph"/g, 'class="mind-graph node-grid"');
  content = content.replace(/class="architecture"/g, 'class="architecture node-grid"');
  content = content.replace(/class="panel"/g, 'class="panel widget-panel"');
  content = content.replace(/class="weights"/g, 'class="weights matrix-controls"');
  content = content.replace(/class="bars"/g, 'class="bars matrix-result"');
  content = content.replace(/class="result"/g, 'class="result widget-panel"');
  content = normalizeWidgetMarkup(content, lang);
  content = content.replace(/<pre\b(?![^>]*\btabindex=)([^>]*)>/gi, '<pre$1 tabindex="0">');
  content = content.replace(
    /<table\b([^>]*)>([\s\S]*?)<\/table>/gi,
    (whole, attrs: string, inner: string) => {
      const captionText =
        lang === 'es' ? 'Tiempo estimado de aprendizaje' : 'Estimated learning time';
      const caption = /<caption\b/i.test(inner) ? '' : `<caption>${captionText}</caption>`;
      const scoped = inner
        .replace(/<thead\b[^>]*>[\s\S]*?<\/thead>/i, (head) =>
          head.replace(/<th\b(?![^>]*\bscope=)([^>]*)>/gi, '<th scope="col"$1>'),
        )
        .replace(/<tbody\b[^>]*>[\s\S]*?<\/tbody>/i, (body) =>
          body.replace(/<th\b(?![^>]*\bscope=)([^>]*)>/gi, '<th scope="row"$1>'),
        );
      const table = `<table${attrs.replace(/\s+tabindex="[^"]*"/g, '')}>${caption}${scoped}</table>`;
      return `<div class="session-table-scroll" tabindex="0" role="region" aria-label="${lang === 'es' ? 'Tabla desplazable' : 'Scrollable table'}">${table}</div>`;
    },
  );

  content = placeTocFabsAtSectionEnds(content, lang);
  return content;
}

export function assertS002HtmlPair(spanish: string, english: string): void {
  for (const [lang, source] of [
    ['es', spanish],
    ['en', english],
  ] as const) {
    if (
      !source.includes('<article') ||
      !source.includes('id="main-topic"') ||
      !source.includes('id="success-criteria"')
    )
      throw new Error(`Incomplete PA-S002 ${lang} HTML source`);
  }
  const signature = (source: string) => ({
    headings: [...source.matchAll(/<h[1-6]\b/g)].length,
    ids: [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]).sort(),
    widgets: [...source.matchAll(/\bdata-widget="([^"]+)"/g)].map((match) => match[1]).sort(),
    concepts: [...source.matchAll(/\bdata-concept(?:\s|=|>)/g)].length,
    tables: [...source.matchAll(/<table\b/g)].length,
    successChecks: [...source.matchAll(/data-check="\d+"/g)].length,
  });
  const es = signature(spanish);
  const en = signature(english);
  if (JSON.stringify(es) !== JSON.stringify(en))
    throw new Error(
      `PA-S002 ES/EN structure mismatch: ${JSON.stringify(es)} vs ${JSON.stringify(en)}`,
    );
}

export function renderS002Html(source: string, lang: 'es' | 'en', base: string): string {
  const title =
    lang === 'es'
      ? 'Monorepo y estándares de ingeniería: contratos, grafos y calidad'
      : 'Monorepos and Engineering Standards: Contracts, Graphs, and Quality';
  const breadcrumb = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${lang}/sessions/">${lang === 'es' ? 'Sesiones' : 'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S002</span></nav>`;
  const article = /<article\b[^>]*>/i.exec(source);
  const header = article
    ? source
        .slice(
          article.index + article[0].length,
          matchingElementEnd(source, article.index, 'article'),
        )
        .match(/<header\b[^>]*>([\s\S]*?)<\/header>/i)?.[1]
    : undefined;
  const sourceTitle = header?.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const sourceLead = header?.match(/<h1\b[^>]*>[\s\S]*?<\/h1>\s*<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1];
  if (!sourceTitle || !sourceLead)
    throw new Error(`PA-S002 ${lang} HTML source is missing its page title or summary`);
  const html = normalizeSessionSource(source, lang);
  const toc = html.match(/<nav\b(?=[^>]*\bid="table-of-contents")[^>]*>([\s\S]*?)<\/nav>/i);
  if (!toc)
    throw new Error(`PA-S002 ${lang} HTML source is missing its normalized table of contents`);
  const tocTitle = lang === 'es' ? 'Tabla de contenido' : 'Table of contents';
  const tocHeading = lang === 'es' ? 'Contenido' : 'Contents';
  const tocDetails = `<details class="toc" id="table-of-contents"><summary>${tocTitle}</summary><nav aria-labelledby="toc-heading"><h2 class="sr-only" id="toc-heading">${tocHeading}</h2>${toc[1]!.replace(/<h2\b[^>]*>[\s\S]*?<\/h2>/i, '')}</nav></details>`;
  const body = html
    .replace(toc[0], '')
    .replace(/<nav\b[^>]*data-legacy-toc[^>]*>[\s\S]*?<\/nav>/i, '');
  const pageIntro = `<div class="page-intro"><h1>${sourceTitle}</h1><p class="lead">${sourceLead}</p></div>`;
  return shell(
    lang,
    title,
    `${breadcrumb}${pageIntro}<div class="layout">${tocDetails}<article class="canonical-theory session-source">${body}</article></div>`,
    base,
    `${lang === 'es' ? 'en' : 'es'}/sessions/PA-S002/`,
  );
}
