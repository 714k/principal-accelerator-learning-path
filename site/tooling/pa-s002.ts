import {
  checkWhatYouLearned,
  escapeHtml,
  placeTocFabsAtSectionEnds,
  sectionHeading,
  shell,
  themedMindMap,
} from './render.ts';

function conceptList(items: string[], headingTag: number): string | undefined {
  const concepts = items.map((item) => {
    const quoted = item.match(/^«([^:«»]+):\s*([^»]+)»\.?$/);
    if (quoted) return quoted;
    const bold = item.match(/^\*\*([^*]+):\*\*\s+(.+)$/);
    if (bold) return bold;
    return /[`*\[\]]/.test(item) ? null : item.match(/^([^:«»]+):\s*(.+)$/);
  });
  if (concepts.some((item) => !item)) return undefined;
  const tag = Math.min(headingTag + 1, 6);
  return `<ul class="concept-list">${concepts
    .map(
      (item) =>
        `<li class="concept-definition"><h${tag}>${inline(item![1]!.trim())}</h${tag}><p>${inline(item![2]!.trim())}</p></li>`,
    )
    .join('')}</ul>`;
}

function laneDefinitionList(items: string[], headingTag: number): string | undefined {
  const lanes = items.map((item) => item.match(/^\*\*([^*]+?)\.\*\*\s+((?:«[^»]+»[.\s]*)+)$/));
  if (lanes.some((item) => !item)) return undefined;
  const tag = Math.min(headingTag + 1, 6);
  return `<ul class="lane-definition-list">${lanes
    .map((lane) => {
      const definitions =
        lane![2]!
          .replace(/[«»]/g, '')
          .match(/[^.]+(?:\.|$)/g)
          ?.map((item) => item.trim())
          .filter(Boolean) ?? [];
      const [first = '', ...rest] = definitions;
      const concept = first.match(/^([^:]+):\s*(.+)$/);
      if (!concept)
        return `<li class="statement-card"><p class="concept-summary-label">${inline(lane![1]!)}</p><p>${inline(definitions.join(' '))}</p></li>`;
      return `<li class="statement-card"><p class="concept-summary-label">${inline(lane![1]!)}</p><h${tag}>${inline(concept[1]!)}</h${tag}><p>${inline([concept[2]!, ...rest].join(' '))}</p></li>`;
    })
    .join('')}</ul>`;
}

export function assertS002(source: string, lang: 'es' | 'en'): void {
  const required =
    lang === 'es'
      ? [
          'Monorepos y estándares de ingeniería',
          'Subtema 7.',
          'Visual Learning Studio',
          'Práctica y cierre',
        ]
      : ['Accelerator Monorepo', 'Visual Learning Studio', 'Exercises'];
  if (required.some((heading) => !source.includes(heading)))
    throw new Error(`Incomplete PA-S002 ${lang} canonical source`);
}
function inline(s: string): string {
  const held: string[] = [];
  const hold = (v: string) => {
    held.push(v);
    return `@@${held.length - 1}@@`;
  };
  let value = s
    .replace(/«([^»]+)»/g, '$1')
    .replace(/`([^`]+)`/g, (_, x: string) => hold(`<code>${escapeHtml(x)}</code>`));
  value = value.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_, label: string, url: string) =>
    hold(`<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`),
  );
  value = value.replace(/https?:\/\/[^\s)]+/g, (url: string) =>
    hold(`<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`),
  );
  value = escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return value.replace(/@@(\d+)@@/g, (_, n: string) => held[Number(n)]!);
}
function paragraphWithReferences(value: string): string {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const references = [...value.matchAll(pattern)];
  if (!references.length) return `<p>${inline(value)}</p>`;
  const prose = value
    .replace(pattern, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  const links = references
    .map(
      ([, label, url]) =>
        `<li><a href="${escapeHtml(url!)}" rel="noreferrer">${inline(label!)}</a></li>`,
    )
    .join('');
  return `${prose ? `<p>${inline(prose)}</p>` : ''}<ul class="reference-links">${links}</ul>`;
}
function statementCard(value: string, headingTag: number): string {
  const statement = value.match(/^\*\*([^*]{28,}):\*\*\s+(.+)$/);
  if (!statement) return paragraphWithReferences(value);
  const tag = Math.min(headingTag + 1, 6);
  return `<section class="statement-card"><h${tag}>${inline(statement[1]!)}</h${tag}>${paragraphWithReferences(statement[2]!)}</section>`;
}
function conceptParagraphCard(value: string, headingTag: number): string {
  const concept = value.match(
    /^\*\*([^*:]+)\*\*\s+((?:es|son|is|are|reúne|mantiene|confirma|revisa|compara|identifica|describe|permite|representa|establece|define|muestra|comunica|comprueba|declara|requiere|conserva|facilita|garantiza)\b[\s\S]*)$/i,
  );
  if (!concept) return statementCard(value, headingTag);
  const tag = Math.min(headingTag + 1, 6);
  return `<section class="concept-definition concept-definition--paragraph"><h${tag}>${inline(concept[1]!)}</h${tag}>${paragraphWithReferences(concept[2]!)}</section>`;
}
function paragraph(value: string, headingTag: number): string {
  const journey = value.match(/^(.*?:)\s+(\*\*.+(?:→|←|↔|⟶|⇒|->|<-).+\*\*)\.?$/);
  if (journey)
    return `<p>${inline(journey[1]!)}</p><div class="flow-card">${inline(journey[2]!)}</div>`;
  const lead = value.match(/^\*\*([^*]+?)\.\*\*\s+(.+)$/);
  if (lead)
    return `<p class="split-lead"><strong>${inline(lead[1]!)}</strong><span>${inline(lead[2]!)}</span></p>`;
  if (/\s(?:→|←|↔|⟶|⇒|->|<-)\s/.test(value)) return `<p class="flow-card">${inline(value)}</p>`;
  return conceptParagraphCard(value, headingTag);
}
function sectionId(title: string, index: number): string {
  const normalized = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  if (normalized === 'conceptos por ambito profesional' || /(?:^|\.) concepts$/.test(normalized))
    return 'concepts';
  if (
    normalized.includes('tema principal') ||
    /(?:^|\.) main topic$/.test(normalized) ||
    normalized.includes('shared repository')
  )
    return 'main-topic';
  if (normalized.includes('subtemas previstos') || /(?:^|\.) subtopics$/.test(normalized))
    return 'subtopics';
  const subtopic = normalized.match(
    /^(?:subtema|subtopic)\s*(\d+)\.|^(?:\d+)\.\s*(?:repository topology|workspaces, applications|dependencies, apis|task graph|conventions, policies|quality gates|ownership and ai)/,
  );
  if (subtopic?.[1]) return `subtopic-${subtopic[1]}`;
  if (
    /^\d+\.\s*(repository topology|workspaces, applications|dependencies, apis|task graph|conventions, policies|quality gates|ownership and ai)/.test(
      normalized,
    )
  ) {
    const topics = [
      'repository topology',
      'workspaces, applications',
      'dependencies, apis',
      'task graph',
      'conventions, policies',
      'quality gates',
      'ownership and ai',
    ];
    return `subtopic-${topics.findIndex((topic) => normalized.includes(topic)) + 1}`;
  }
  const englishSubtopicIndex = [
    'repository topology and autonomy',
    'workspaces, applications and packages',
    'dependencies, apis and direction',
    'task graph and shared code',
    'conventions, policies and standards',
    'quality gates, constraints and fitness',
    'ownership and ai boundaries',
  ].indexOf(normalized);
  if (englishSubtopicIndex >= 0) return `subtopic-${englishSubtopicIndex + 1}`;
  if (
    normalized.includes('integracion entre ambitos') ||
    normalized.includes('cross-domain synthesis')
  )
    return 'integration';
  if (
    normalized === 'teoria → practica' ||
    (normalized.includes('theory') && normalized.includes('practice'))
  )
    return 'theory-practice';
  if (normalized.includes('tiempo estimado') || normalized.includes('time breakdown'))
    return 'estimated-time';
  if (normalized.includes('caso documentado') || normalized.includes('real-world example'))
    return 'real-world-case';
  if (
    normalized.includes('diseno de produccion') ||
    normalized.includes('production-ready example')
  )
    return 'production-reference-design';
  if (normalized.includes('visual learning studio')) return 'visual-learning-studio';
  if (normalized.includes('tarjetas de estudio') || normalized.includes('study cards'))
    return 'study-cards';
  if (normalized.includes('practica y cierre') || /(?:^|\.) exercises$/.test(normalized))
    return 'exercises';
  if (normalized === 'fuentes' || normalized.includes('curated sources')) return 'sources';
  if (normalized.includes('recursos de trabajo') || /(?:^|\.) resources$/.test(normalized))
    return 'resources';
  if (
    normalized.includes('checklist de revision') ||
    normalized.includes('knowledge mastery checklist')
  )
    return 'study-checklist';
  if (normalized.includes('criterios de exito') || normalized.includes('end-of-session success'))
    return 'success-criteria';
  if (normalized.includes('puente a pa-s003') || normalized.includes('bridge to pa-s003'))
    return 'bridge-to-pa-s003';
  return `section-${index}`;
}

function sessionToc(lang: 'es' | 'en'): string {
  const es = lang === 'es';
  const sections: Array<[string, string]> = es
    ? [
        ['concepts', 'Conceptos por ámbito profesional'],
        ['main-topic', 'Tema principal — Del repositorio compartido a los límites comprobables'],
        ['subtopics', 'Subtemas'],
        ['integration', 'Integración entre ámbitos'],
        ['theory-practice', 'Teoría → práctica'],
        ['estimated-time', 'Tiempo estimado'],
        ['real-world-case', 'Caso documentado del mundo real: el repositorio monolítico de Google'],
        ['production-reference-design', 'Diseño de referencia para producción'],
        ['visual-learning-studio', 'Visual Learning Studio'],
        ['study-cards', 'Tarjetas de estudio — 10'],
        ['exercises', 'Ejercicios'],
        ['sources', 'Fuentes y referencias curadas'],
        ['resources', 'Recursos'],
        ['study-checklist', 'Checklist de dominio'],
        ['success-criteria', 'Criterios de éxito de la sesión'],
        ['bridge-to-pa-s003', 'Puente a PA-S003'],
      ]
    : [
        ['concepts', 'Concepts by professional domain'],
        ['main-topic', 'Main topic — From the shared repository to verifiable boundaries'],
        ['subtopics', 'Subtopics'],
        ['integration', 'Cross-domain integration'],
        ['theory-practice', 'Theory → practice'],
        ['estimated-time', 'Estimated time'],
        ['real-world-case', "Documented real-world case: Google's monolithic repository"],
        ['production-reference-design', 'Reference design for production'],
        ['visual-learning-studio', 'Visual Learning Studio'],
        ['study-cards', 'Study cards — 10'],
        ['exercises', 'Exercises'],
        ['sources', 'Curated sources and references'],
        ['resources', 'Resources'],
        ['study-checklist', 'Knowledge mastery checklist'],
        ['success-criteria', 'End-of-session success criteria'],
        ['bridge-to-pa-s003', 'Bridge to PA-S003'],
      ];
  const subtopics = es
    ? [
        'Repositorios y fronteras',
        'Workspaces, aplicaciones y paquetes',
        'Grafo y dirección de dependencias',
        'Grafo de tareas y construcción',
        'Políticas y gates de calidad',
        'Contratos para frontend y productos con IA',
        'Ownership y evolución de estándares',
      ]
    : [
        'Repository topology and autonomy',
        'Workspaces, applications and packages',
        'Dependencies, APIs and direction',
        'Task graph and shared code',
        'Conventions, policies and standards',
        'Quality gates, constraints and fitness',
        'Ownership and AI boundaries',
      ];
  return `<details class="toc" id="table-of-contents"><summary>${es ? 'Contenido' : 'Contents'}</summary><nav aria-label="${es ? 'Contenido' : 'Contents'}"><ol class="toc-list">${sections
    .map(([id, label]) => {
      const children =
        id === 'subtopics'
          ? `<ol class="toc-sublist">${subtopics.map((topic, topicIndex) => `<li><a href="#subtopic-${topicIndex + 1}">${escapeHtml(topic)}</a></li>`).join('')}</ol>`
          : '';
      return `<li><a href="#${id}">${escapeHtml(label)}</a>${children}</li>`;
    })
    .join('')}</ol></nav></details>`;
}

const SESSION_SECTION_ORDER: Record<string, number> = {
  concepts: 1,
  'main-topic': 2,
  subtopics: 3,
  integration: 4,
  'theory-practice': 5,
  'estimated-time': 6,
  'real-world-case': 7,
  'production-reference-design': 8,
  'visual-learning-studio': 9,
  'study-cards': 10,
  exercises: 11,
  sources: 12,
  resources: 13,
  'study-checklist': 14,
  'success-criteria': 15,
  'bridge-to-pa-s003': 16,
};

function sectionTitle(id: string, title: string, lang: 'es' | 'en'): string {
  const es = lang === 'es';
  const labels: Record<string, [string, string]> = {
    concepts: ['Conceptos por ámbito profesional', 'Concepts by professional domain'],
    'main-topic': [
      'Tema principal — Del repositorio compartido a los límites comprobables',
      'Main topic — From the shared repository to verifiable boundaries',
    ],
    subtopics: ['Subtemas', 'Subtopics'],
    integration: ['Integración entre ámbitos', 'Cross-domain integration'],
    'theory-practice': ['Teoría → práctica', 'Theory → practice'],
    'estimated-time': ['Tiempo estimado', 'Estimated time'],
    'real-world-case': [
      'Caso documentado del mundo real: el repositorio monolítico de Google',
      "Documented real-world case: Google's monolithic repository",
    ],
    'production-reference-design': [
      'Diseño de referencia para producción',
      'Reference design for production',
    ],
    'visual-learning-studio': ['Visual Learning Studio', 'Visual Learning Studio'],
    'study-cards': ['Tarjetas de estudio — 10', 'Study cards — 10'],
    exercises: ['Ejercicios', 'Exercises'],
    sources: ['Fuentes y referencias curadas', 'Curated sources and references'],
    resources: ['Recursos', 'Resources'],
    'study-checklist': ['Checklist de dominio', 'Knowledge mastery checklist'],
    'success-criteria': ['Criterios de éxito de la sesión', 'End-of-session success criteria'],
    'bridge-to-pa-s003': ['Puente a PA-S003', 'Bridge to PA-S003'],
  };
  return labels[id]?.[es ? 0 : 1] ?? title;
}
function studio(lang: 'es' | 'en', base: string): string {
  const es = lang === 'es';
  const cardsId = es ? 's002-cards' : 'study-cards';
  const cards = es
    ? [
        [
          'F01',
          'Monorepo',
          '¿Qué no implica compartir repositorio?',
          'No obliga a un único despliegue ni sustituye las fronteras arquitectónicas.',
        ],
        [
          'F02',
          'Fronteras',
          '¿Qué vuelve comprobable una frontera arquitectónica?',
          'Un contrato declarado y una prueba o revisión que detecte dependencias prohibidas.',
        ],
        [
          'F03',
          'Workspaces',
          '¿Qué distingue a un workspace de una API pública?',
          'El workspace organiza unidades locales; la API define el único acceso admitido por consumidores.',
        ],
        [
          'F04',
          'Grafo',
          '¿Qué revela un ciclo de dependencias?',
          'Que el cambio y la inicialización pueden propagarse en ambas direcciones y dificultar el aislamiento.',
        ],
        [
          'F05',
          'Tareas',
          '¿Qué debe describir una tarea para reutilizar caché?',
          'Sus entradas, herramienta, configuración y salidas relevantes.',
        ],
        [
          'F06',
          'Gates',
          '¿Qué no demuestra un quality gate que pasa?',
          'No demuestra una buena arquitectura completa ni una protección de rama si esa configuración no existe.',
        ],
        [
          'F07',
          'Compatibilidad',
          '¿Qué protege una API pública?',
          'Los usos admitidos de los consumidores, no los detalles internos de implementación.',
        ],
        [
          'F08',
          'IA',
          '¿Qué prueba adicional puede requerir un cambio de producto con IA?',
          'Una evaluación de comportamiento, permisos y datos, además de compilar y pasar pruebas de software.',
        ],
        [
          'F09',
          'Ownership',
          '¿Qué acompaña a una excepción útil?',
          'Alcance, responsable, fecha de revisión y una ruta para volver a cumplir la regla.',
        ],
        [
          'F10',
          'Evidencia',
          '¿Qué aporta un check ejecutado?',
          'Evidencia limitada de la regla concreta que ejecutó, junto con sus entradas y alcance.',
        ],
      ]
    : [
        [
          'F01',
          'Monorepo',
          'What does sharing a repository not imply?',
          'It does not require one deployment or replace architectural boundaries.',
        ],
        [
          'F02',
          'Boundaries',
          'What makes an architectural boundary verifiable?',
          'A declared contract and a test or review that detects prohibited dependencies.',
        ],
        [
          'F03',
          'Workspaces',
          'What distinguishes a workspace from a public API?',
          'A workspace organizes local units; an API defines the only access consumers are allowed to use.',
        ],
        [
          'F04',
          'Graph',
          'What does a dependency cycle reveal?',
          'Change and initialization can propagate in both directions, making isolation harder.',
        ],
        [
          'F05',
          'Tasks',
          'What must a task describe for cache reuse?',
          'Its inputs, tool, configuration, and relevant outputs.',
        ],
        [
          'F06',
          'Gates',
          'What does a passing quality gate not demonstrate?',
          'It does not demonstrate complete good architecture or branch protection when that configuration does not exist.',
        ],
        [
          'F07',
          'Compatibility',
          'What does a public API protect?',
          'Consumers’ supported uses, not internal implementation details.',
        ],
        [
          'F08',
          'AI',
          'What additional test can an AI-product change require?',
          'An evaluation of behavior, permissions, and data, alongside compilation and software tests.',
        ],
        [
          'F09',
          'Ownership',
          'What accompanies a useful exception?',
          'Scope, an owner, a review date, and a path back to compliance.',
        ],
        [
          'F10',
          'Evidence',
          'What does an executed check provide?',
          'Limited evidence for the specific rule it ran, together with its inputs and scope.',
        ],
      ];
  const items = cards
    .map(
      (card) =>
        `<article class="flashcard" data-flashcard data-flash-id="${card[0]}"><button type="button" data-flash-flip aria-pressed="false" data-reveal-label="${es ? 'Mostrar respuesta' : 'Reveal answer'}: ${escapeHtml(card[2]!)}" data-hide-label="${es ? 'Mostrar pregunta' : 'Show question'}: ${escapeHtml(card[2]!)}"><strong>${escapeHtml(card[2]!)}</strong></button><div class="flashcard-answer"><p><strong>${es ? 'Respuesta' : 'Answer'}:</strong> ${escapeHtml(card[3]!)}</p></div><p class="sr-only">${escapeHtml(card[0]!)} · ${escapeHtml(card[1]!)}</p></article>`,
    )
    .join('');
  const map = `${base}${lang}/shared/diagrams/PA-S002/studio-map-${lang}.svg`;
  const mapAlt = es
    ? 'Mapa mental de monorepo, límites, dependencias, calidad y ownership.'
    : 'Mind map of monorepo, boundaries, dependencies, quality, and ownership.';
  return `<div class="learning-studio" data-learning-studio><nav class="visual-mode-nav" data-mode-nav aria-label="${es ? 'Modos de estudio visual' : 'Visual study modes'}"><a id="s002-tab-map" href="#s002-map" data-mode-control>${es ? 'Mapa mental' : 'Mind map'}</a><a id="s002-tab-cards" href="#${cardsId}" data-mode-control>${es ? 'Tarjetas' : 'Cards'}</a></nav><section id="s002-map" class="visual-mode-panel" data-visual-panel><h3>${es ? 'Mapa de conceptos' : 'Concept map'}</h3><figure class="diagram-card">${themedMindMap(map, mapAlt, 'session-diagram')}<figcaption>${es ? 'Relaciona las decisiones de repositorio con contratos, comprobaciones y responsables.' : 'Relates repository decisions to contracts, checks, and owners.'}</figcaption></figure></section><section id="${cardsId}" class="visual-mode-panel" data-visual-panel><h3>${checkWhatYouLearned(lang)}: 10 ${es ? 'tarjetas' : 'cards'}</h3><p>${es ? 'Las respuestas permanecen disponibles sin JavaScript.' : 'Answers remain available without JavaScript.'}</p><div class="flashcard-deck" data-flashcards tabindex="0"><div class="flashcard-controls"><button type="button" data-flash-prev>${es ? 'Anterior' : 'Previous'}</button><output data-flashcard-count aria-live="polite">1 / ${cards.length}</output><button type="button" data-flash-next>${es ? 'Siguiente' : 'Next'}</button></div>${items}</div></section></div>`;
}
export function renderS002(source: string, lang: 'es' | 'en', base: string): string {
  assertS002(source, lang);
  const lines = source.replace(/\r\n/g, '\n').split('\n'),
    out: string[] = [];
  let pending = '',
    deep = false,
    reading = false,
    mermaid = 0,
    study = 0,
    studioMapFollows = false,
    chapterTitleSeen = false,
    sectionNumber = 0,
    currentHeadingTag = 3;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const marker = line.match(/^<!-- (?:concept:|topic:) ([\w.]+)/);
    if (marker) {
      if (reading) {
        out.push('</div>');
        reading = false;
      }
      if (deep) {
        out.push('</details>');
        deep = false;
      }
      if (marker[1] === 'main.monorepo') out.push('<span id="main.monorepo"></span>');
      else pending = marker[1]!;
      continue;
    }
    if (
      !line ||
      line.startsWith('<!--') ||
      /^---+$/.test(line) ||
      /^\*\*(?:Fase|Phase):/.test(line) ||
      /^(?:\*\*)?F0 · PA-S002 · /.test(line) ||
      /\*\*(?:Hechos confirmados|Supuestos e inferencias|Incertidumbres y limitaciones|Cómo verificarlo|Confirmed facts|Assumptions and inferences|Uncertainties and limitations|How to verify)(?::|\*\*)/i.test(
        line,
      ) ||
      /^\*\*(?:Estado(?: editorial)?|Editorial(?: status)?):/i.test(line) ||
      /\*\*Estado editorial de este bloque:/i.test(line)
    )
      continue;
    const heading = line.match(/^(#{1,5}) (.+)$/);
    if (heading) {
      if (reading) {
        out.push('</div>');
        reading = false;
      }
      if (deep) {
        out.push('</details>');
        deep = false;
      }
      const level = heading[1]!.length,
        title = heading[2]!,
        initialTitle = /^(?:Recuperación|Retrieval)$/i.test(title)
          ? checkWhatYouLearned(lang)
          : title;
      if (level === 1 && !chapterTitleSeen) {
        chapterTitleSeen = true;
        continue;
      }
      const generatedId = sectionId(title, i);
      const id = generatedId === `section-${i}` ? pending || generatedId : generatedId;
      pending = '';
      const sessionOrdinal = SESSION_SECTION_ORDER[id];
      const displayTitle = sectionTitle(id, initialTitle, lang).replace(/\s+\(`[^`]+`\)$/, '');
      const isSessionSection = sessionOrdinal !== undefined;
      if (isSessionSection) sectionNumber = sessionOrdinal;
      if (level === 5 && /^(Nivel|Level) [123]/.test(title)) {
        out.push(`<div class="reading-level"><h4>${inline(title)}</h4>`);
        reading = true;
        continue;
      }
      const tag = Math.min(Math.max(level + 1, 2), 6);
      currentHeadingTag = tag;
      if (isSessionSection) {
        const compact = /^(?:Tema principal|Main topic|Subtemas|Subtopics)$/i.test(displayTitle)
          ? ' section-label'
          : '';
        out.push(sectionHeading(2, id, inline(displayTitle), lang, sectionNumber, compact.trim()));
      } else if (level === 1 && /^(?:Subtema|Subtopic)\s+\d+\./i.test(title))
        out.push(sectionHeading(2, id, inline(displayTitle), lang, sectionNumber));
      else if (level === 1) out.push(`<h2 id="${id}">${inline(displayTitle)}</h2>`);
      else out.push(`<h${tag} id="${id}">${inline(displayTitle)}</h${tag}>`);
      if (/^(?:11\. )?(Visual Learning Studio|Studio de aprendizaje visual)/i.test(title)) {
        out.push(studio(lang, base));
        studioMapFollows = true;
      }
      continue;
    }
    if (line.startsWith('```')) {
      const kind = line.slice(3).trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.startsWith('```')) code.push(lines[i++]!);
      if (kind === 'mermaid' && studioMapFollows) {
        studioMapFollows = false;
        mermaid++;
        continue;
      }
      if (kind === 'mermaid') {
        const names = [
          'studio-map',
          'dependency-graph',
          'task-graph',
          'production-flow',
          'exercise-graph',
        ];
        const name = names[mermaid++] ?? `diagram-${mermaid}`;
        out.push(
          `<figure class="diagram-card"><img class="session-diagram" src="${base}${lang}/shared/diagrams/PA-S002/${name}-${lang}.svg" alt="${lang === 'es' ? 'Diagrama de la sesión PA-S002' : 'PA-S002 session diagram'}" loading="lazy"><details><summary>${lang === 'es' ? 'Fuente Mermaid' : 'Mermaid source'}</summary><pre class="code"><code>${escapeHtml(code.join('\n'))}</code></pre></details></figure>`,
        );
      } else {
        const content = code.join('\n');
        const pre = `<pre class="code"><code>${escapeHtml(content)}</code></pre>`;
        out.push(
          /\s(?:→|←|↔|⟶|⇒|->|<-)\s/.test(content)
            ? `<div class="flow-card flow-card-code">${pre}</div>`
            : pre,
        );
      }
      continue;
    }
    if (line.startsWith('|')) {
      const rows: string[] = [];
      while (lines[i]?.startsWith('|')) rows.push(lines[i++]!);
      i--;
      const cells = (s: string) =>
        s
          .slice(1, -1)
          .split('|')
          .map((x) => x.trim());
      const data = rows.filter((x) => !/^\|[-| :]+\|$/.test(x));
      out.push(
        `<div class="scroll"><table><thead><tr>${cells(data[0]!)
          .map((c) => `<th scope="col">${inline(c)}</th>`)
          .join('')}</tr></thead><tbody>${data
          .slice(1)
          .map(
            (r) =>
              `<tr>${cells(r)
                .map((c) => `<td>${inline(c)}</td>`)
                .join('')}</tr>`,
          )
          .join('')}</tbody></table></div>`,
      );
      continue;
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (/^[-*] /.test(lines[i] ?? '')) items.push(lines[i++]!.slice(2));
      i--;
      const referenceList =
        items.length > 0 && items.every((item) => /^\[[^\]]+\]\(https?:\/\/[^)]+\)\.?$/.test(item));
      if (referenceList) {
        out.push(
          `<ul class="reference-links">${items
            .map((item) => {
              const link = item.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)\.?$/)!;
              return `<li><a href="${escapeHtml(link[2]!)}" rel="noreferrer">${inline(link[1]!)}</a></li>`;
            })
            .join('')}</ul>`,
        );
        continue;
      }
      const laneDefinitions = laneDefinitionList(items, currentHeadingTag);
      if (laneDefinitions) {
        out.push(laneDefinitions);
        continue;
      }
      const definitions = conceptList(items, currentHeadingTag);
      if (definitions) {
        out.push(definitions);
        continue;
      }
      out.push(
        `<ul>${items
          .map((item) => {
            const tracked = item.match(/^\[ \] `(PA-S002:(?:exercise|mastery):\d+)` (.+)$/);
            if (tracked)
              return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="${tracked[1]}"><span>${inline(tracked[2]!)}</span></label></li>`;
            const localStudy = item.match(/^\[ \] (.+)$/);
            if (localStudy) {
              study++;
              return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="PA-S002:review:${study}"><span>${inline(localStudy[1]!)}</span></label></li>`;
            }
            return `<li>${inline(item)}</li>`;
          })
          .join('')}</ul>`,
      );
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (/^\d+\. /.test(lines[i] ?? '')) items.push(lines[i++]!.replace(/^\d+\. /, ''));
      i--;
      out.push(
        `<ol class="canonical-ordered-list">${items.map((item) => `<li>${inline(item)}</li>`).join('')}</ol>`,
      );
      continue;
    }
    if (line.startsWith('> ')) {
      const group: string[] = [];
      while (lines[i]?.startsWith('> ')) group.push(lines[i++]!.slice(2));
      i--;
      if (
        group.length !== 4 ||
        group.slice(1).some((item, index) => !item.startsWith(`${index + 1}. `))
      )
        throw new Error(`Invalid PA-S002 ${lang} synthesis`);
      out.push(
        `<aside class="synthesis"><h2>${inline(group[0]!)}</h2><ol>${group
          .slice(1)
          .map((item) => `<li>${inline(item.slice(3))}</li>`)
          .join('')}</ol></aside>`,
      );
      continue;
    }
    out.push(paragraph(line, currentHeadingTag));
  }
  if (reading) out.push('</div>');
  if (deep) out.push('</details>');
  const title =
    lang === 'es'
      ? 'Monorepo del Accelerator y estándares de ingeniería'
      : 'Accelerator Monorepo and Engineering Standards';
  const objective = lines.findIndex((line) => /^## (?:1\. )?(?:Objetivo|Objective)$/.test(line));
  const objectiveText = lines.slice(objective + 1).find((line) => Boolean(line.trim()));
  if (objective < 0 || !objectiveText) throw new Error(`Missing PA-S002 ${lang} objective`);
  const tocHtml = sessionToc(lang);
  const crumb = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${lang}/sessions/">${lang === 'es' ? 'Sesiones' : 'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S002</span></nav>`;
  return shell(
    lang,
    title,
    `${crumb}<div class="page-intro"><h1>${title}</h1><p class="lead">${inline(objectiveText)}</p></div><div class="layout">${tocHtml}<article class="canonical-theory">${placeTocFabsAtSectionEnds(out.join('\n'), lang)}</article></div>`,
    base,
    `${lang === 'es' ? 'en' : 'es'}/sessions/PA-S002/`,
  );
}
