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
  return lanes
    .map((lane) => {
      const definitions =
        lane![2]!
          .replace(/[«»]/g, '')
          .match(/[^.]+(?:\.|$)/g)
          ?.map((item) => item.trim())
          .filter(Boolean) ?? [];
      const grouped = definitions.reduce<Array<[string, string]>>((concepts, definition) => {
        const match = definition.match(/^([^:]+):\s*(.+)$/);
        if (match) concepts.push([match[1]!, match[2]!]);
        else if (concepts.length) concepts[concepts.length - 1]![1] += ` ${definition}`;
        return concepts;
      }, []);
      if (!grouped.length) return '';
      return grouped
        .map(
          ([name, definition]) =>
            `<section class="concept-definition concept-definition--paragraph"><h${tag}>${inline(name)}</h${tag}><p>${inline(definition)}</p></section>`,
        )
        .join('');
    })
    .join('');
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
      : ['Monorepos and engineering standards', 'Visual Learning Studio', 'Exercises'];
  if (required.some((heading) => !source.includes(heading)))
    throw new Error(`Incomplete PA-S002 ${lang} canonical source`);
}
function inline(s: string): string {
  const held: string[] = [];
  const hold = (v: string) => {
    held.push(v);
    return `@@${held.length - 1}@@`;
  };
  let value = stripEditorialArtifacts(s)
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
function stripEditorialArtifacts(value: string): string {
  return value
    .replace(/\s*genui\{[\s\S]*?\}\}(?:)?/g, '')
    .replace(/\s*genui\[[\s\S]*?(?:|$)/g, '');
}
function separateReferences(value: string): { prose: string; links: string } {
  value = stripEditorialArtifacts(value);
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const references = [...value.matchAll(pattern)];
  const prose = value
    .replace(pattern, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*[·•]\s*(?=[.!?]|$)/g, '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([.!?]){2,}/g, '$1')
    .trim();
  const links = references
    .map(
      ([, label, url]) =>
        `<li><a href="${escapeHtml(url!)}" rel="noreferrer">${inline(label!)}</a></li>`,
    )
    .join('');
  return { prose, links };
}
function referenceEntry(value: string): string | undefined {
  const entry = stripEditorialArtifacts(value).match(/^\*\*([^*]+?)\s+—\s+(.+?)\.\*\*\s+(.+)$/);
  if (!entry) return undefined;
  const title = inline(entry[2]!).replace(/<a href="([^"]+)">/g, '<a href="$1" rel="noreferrer">');
  return `<article class="reference-entry"><p class="reference-entry-source"><strong>${inline(entry[1]!)}</strong></p><p class="reference-entry-link">${title}</p><p class="reference-entry-description">${inline(entry[3]!)}</p></article>`;
}
function paragraphWithReferences(value: string): string {
  const { prose, links } = separateReferences(value);
  return `${prose ? `<p>${inline(prose)}</p>` : ''}${links ? `<ul class="reference-links">${links}</ul>` : ''}`;
}
function instructionalOutcome(value: string): string | undefined {
  const outcome = value.match(/^\*\*([^*]+?)(?::|\.)\*\*\s+(.+)$/);
  if (!outcome) return undefined;
  const label = outcome[1]!;
  const normalized = label.toLowerCase();
  const kind = /^(respuesta|reasoned (?:answer|response)|answer and)/.test(normalized)
    ? 'answer'
    : /^(entregable|deliverable|reviewable deliverable)/.test(normalized)
      ? 'deliverable'
      : /^(criterio|review criteria|editorial readiness criteria)/.test(normalized)
        ? 'review'
        : undefined;
  if (!kind) return undefined;
  return `<aside class="instructional-outcome instructional-outcome--${kind}"><p class="instructional-outcome-label">${inline(label)}</p>${paragraphWithReferences(outcome[2]!)}</aside>`;
}
function statementCard(value: string, headingTag: number): string {
  const statement = value.match(/^\*\*([^*]{28,}):\*\*\s+(.+)$/);
  if (!statement) return paragraphWithReferences(value);
  const tag = Math.min(headingTag + 1, 6);
  return `<section class="statement-card"><h${tag}>${inline(statement[1]!)}</h${tag}>${paragraphWithReferences(statement[2]!)}</section>`;
}
function conceptParagraphCard(value: string, headingTag: number): string {
  const definition =
    '(?:es|son|is|are|reúne|mantiene|confirma|revisa|compara|identifica|describe|permite|representa|establece|define|muestra|comunica|comprueba|declara|requiere|conserva|facilita|garantiza)';
  const concept =
    value.match(new RegExp(`^\\*\\*([^*:]+)\\*\\*\\s+(${definition}\\b[\\s\\S]*)$`, 'i')) ??
    value.match(
      new RegExp(
        `^(?:un(?:a)?|el|la|los|las|an?|the)\\s+\\*\\*([^*:]+)\\*\\*\\s+(${definition}\\b[\\s\\S]*)$`,
        'i',
      ),
    );
  if (!concept) return statementCard(value, headingTag);
  const tag = Math.min(headingTag + 1, 6);
  return `<section class="concept-definition concept-definition--paragraph"><h${tag}>${inline(concept[1]!)}</h${tag}>${paragraphWithReferences(concept[2]!)}</section>`;
}
function paragraph(value: string, headingTag: number, conceptCallouts = false): string {
  value = stripEditorialArtifacts(value);
  const outcome = instructionalOutcome(value);
  if (outcome) return outcome;
  const journey = value.match(/^(.*?:)\s+(\*\*.+(?:→|←|↔|⟶|⇒|->|<-).+\*\*)\.?$/);
  if (journey)
    return `<p>${inline(journey[1]!)}</p><div class="flow-card">${inline(journey[2]!)}</div>`;
  const conceptCallout = value.match(/^\*\*([^*.]+)\.\*\*\s+(.+)$/);
  if (conceptCallouts && conceptCallout) {
    const tag = Math.min(headingTag + 1, 6);
    return `<section class="concept-definition concept-definition--paragraph"><h${tag}>${inline(conceptCallout[1]!.trim())}</h${tag}>${paragraphWithReferences(conceptCallout[2]!)}</section>`;
  }
  const lead = value.match(/^\*\*([^*]+?)\.\*\*\s+(.+)$/);
  if (lead) {
    const { prose, links } = separateReferences(lead[2]!);
    return `<p class="split-lead"><strong>${inline(lead[1]!)}</strong>${prose ? `<span>${inline(prose)}</span>` : ''}</p>${links ? `<ul class="reference-links">${links}</ul>` : ''}`;
  }
  if (/\s(?:→|←|↔|⟶|⇒|->|<-)\s/.test(value)) return `<p class="flow-card">${inline(value)}</p>`;
  return conceptParagraphCard(value, headingTag);
}

function appendConceptExplanation(output: string[], value: string): boolean {
  const last = output.at(-1);
  if (
    !last?.startsWith('<section class="concept-definition concept-definition--paragraph">') ||
    !value.startsWith('<p')
  )
    return false;
  output[output.length - 1] = last.replace(/<\/section>$/, `${value}</section>`);
  return true;
}
function sectionId(title: string, index: number): string {
  const normalized = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  if (
    normalized === 'conceptos por ambito profesional' ||
    normalized.startsWith('concepts by professional') ||
    /(?:^|\.) concepts$/.test(normalized)
  )
    return 'concepts';
  if (
    normalized.includes('tema principal') ||
    /(?:^|\.) main topic$/.test(normalized) ||
    normalized.includes('parent topic') ||
    normalized.includes('shared repository') ||
    normalized.includes('del repositorio compartido')
  )
    return 'main-topic';
  if (
    normalized.includes('subtemas previstos') ||
    normalized.includes('planned subtopics') ||
    /(?:^|\.) subtopics$/.test(normalized)
  )
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
    normalized.includes('cross-domain synthesis') ||
    normalized.includes('integration between')
  )
    return 'integration';
  if (
    normalized.includes('teoria → practica') ||
    (normalized.includes('theory') && normalized.includes('practice'))
  )
    return 'theory-practice';
  if (
    normalized.includes('tiempo estimado') ||
    normalized.includes('time breakdown') ||
    normalized === 'estimated time'
  )
    return 'estimated-time';
  if (
    normalized.includes('caso documentado') ||
    normalized.includes('caso real candidato') ||
    normalized.includes('real-world example') ||
    normalized.includes('documented real-world')
  )
    return 'real-world-case';
  if (
    normalized.includes('diseno de produccion') ||
    normalized.includes('aprendizaje visual previstos') ||
    normalized.includes('production-ready example') ||
    normalized.includes('production design')
  )
    return 'production-reference-design';
  if (normalized.includes('visual learning studio')) return 'visual-learning-studio';
  if (normalized.includes('tarjetas de estudio') || normalized.includes('study cards'))
    return 'study-cards';
  if (
    normalized.includes('practica y cierre') ||
    normalized.includes('practice and closure') ||
    /(?:^|\.) exercises$/.test(normalized)
  )
    return 'exercises';
  if (normalized === 'fuentes' || normalized.includes('curated sources')) return 'sources';
  if (
    normalized.includes('recursos de trabajo') ||
    normalized.includes('resources') ||
    /(?:^|\.) resources$/.test(normalized)
  )
    return 'resources';
  if (
    normalized.includes('checklist de revision') ||
    normalized.includes('knowledge mastery checklist') ||
    normalized.includes('review checklist')
  )
    return 'study-checklist';
  if (
    normalized.includes('criterios de exito') ||
    normalized.includes('end-of-session success') ||
    normalized === 'success criteria'
  )
    return 'success-criteria';
  if (
    normalized.includes('puente a pa-s003') ||
    normalized.includes('bridge to pa-s003') ||
    normalized.includes('jumper to pa-s003')
  )
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
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const sectionBodies = new Map(
    Object.keys(SESSION_SECTION_ORDER).map((id) => [id, []] as [string, string[]]),
  );
  let activeSection = 'concepts',
    out = sectionBodies.get(activeSection)!;
  const activateSection = (id: string) => {
    activeSection = id;
    out = sectionBodies.get(activeSection)!;
  };
  let pending = '',
    deep = false,
    reading = false,
    mermaid = 0,
    study = 0,
    successStudy = 0,
    studioMapFollows = false,
    chapterTitleSeen = false,
    sessionSectionSeen = false,
    skipInitialObjective = false,
    conceptCallouts = false,
    sectionNumber = 0,
    sectionSourceLevel = 2,
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
      skipInitialObjective = false;
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
      conceptCallouts = /(?:fallos?|errores?|problemas?|failures?|errors?|issues?)/i.test(title);
      if (level === 1 && !chapterTitleSeen) {
        chapterTitleSeen = true;
        sectionSourceLevel = level;
        continue;
      }
      if (!sessionSectionSeen && /^(?:1\. )?(?:Objetivo|Objective)$/i.test(title)) {
        skipInitialObjective = true;
        continue;
      }
      if (!sessionSectionSeen && /^(?:2\. )?(?:Vista previa|Learning Preview)$/i.test(title)) {
        out.push(`<p class="session-preview-label">${inline(title.replace(/^\d+\.\s*/, ''))}</p>`);
        continue;
      }
      const generatedId = sectionId(title, i);
      const id = generatedId === `section-${i}` ? pending || generatedId : generatedId;
      pending = '';
      const sessionOrdinal = SESSION_SECTION_ORDER[id];
      const displayTitle = sectionTitle(id, initialTitle, lang).replace(/\s+\(`[^`]+`\)$/, '');
      const isSessionSection = sessionOrdinal !== undefined;
      const isSubtopic = level === 1 && /^(?:Subtema|Subtopic)\s+\d+\./i.test(title);
      const isProfessionalDomain =
        activeSection === 'concepts' &&
        /^(?:Staff → Principal(?: Software Engineering)?|Arquitectura de Plataforma Frontend|Frontend Platform Architecture \(FPA\)|Ingeniería de Productos con IA|AI Product Engineering \(AIPE\))$/.test(
          title,
        );
      if (isSessionSection) sectionNumber = sessionOrdinal;
      const tag = isSessionSection
        ? 2
        : isSubtopic
          ? 3
          : Math.min(Math.max(2 + level - sectionSourceLevel, 3), 6);
      if (level === 5 && /^(Nivel|Level) [123]/.test(title)) {
        currentHeadingTag = tag;
        out.push(`<div class="reading-level"><h${tag}>${inline(title)}</h${tag}>`);
        reading = true;
        continue;
      }
      if (isProfessionalDomain) {
        currentHeadingTag = 2;
        continue;
      }
      currentHeadingTag = tag;
      if (isSessionSection) {
        sessionSectionSeen = true;
        activateSection(id);
        sectionSourceLevel = level;
      } else if (isSubtopic) {
        activateSection('subtopics');
        sectionSourceLevel = 0;
        out.push(sectionHeading(3, id, inline(displayTitle), lang, sectionNumber));
      } else {
        if (level === 1) sectionSourceLevel = 0;
        out.push(`<h${tag} id="${id}">${inline(displayTitle)}</h${tag}>`);
      }
      if (/^(?:11\. )?(Visual Learning Studio|Studio de aprendizaje visual)/i.test(title)) {
        out.push(studio(lang, base));
        studioMapFollows = true;
      }
      continue;
    }
    if (skipInitialObjective) {
      skipInitialObjective = false;
      continue;
    }
    const question = line.match(/^\*\*((?:Pregunta|Question)):\*\*\s+(.+)$/i);
    if (question) {
      let answerIndex = i + 1;
      while (answerIndex < lines.length && !(lines[answerIndex] ?? '').trim()) answerIndex++;
      const answer = (lines[answerIndex] ?? '').match(
        /^\*\*((?:Respuesta(?: razonada)?|Answer(?: and (?:explanation|feedback))?|Reasoned response)):\*\*\s+(.+)$/i,
      );
      if (answer) {
        out.push(
          `<details class="instructional-block instructional-retrieval"><summary><span class="instructional-label">${inline(question[1]!)}</span><strong>${inline(question[2]!)}</strong></summary><div class="retrieval-answer"><p class="instructional-answer-label">${inline(answer[1]!)}</p><p>${inline(answer[2]!)}</p></div></details>`,
        );
        i = answerIndex;
        continue;
      }
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
          `<figure class="diagram-card"><img class="session-diagram" src="${base}${lang}/shared/diagrams/PA-S002/${name}-${lang}.svg" alt="${lang === 'es' ? 'Diagrama de la sesión PA-S002' : 'PA-S002 session diagram'}" loading="lazy"><details class="diagram-source"><summary><span class="diagram-source-label">${lang === 'es' ? 'Más información del diagrama' : 'More diagram information'}</span><strong>${lang === 'es' ? 'Ver fuente Mermaid y detalles técnicos' : 'View Mermaid source and technical details'}</strong></summary><p class="diagram-source-hint">${lang === 'es' ? 'Incluye el código Mermaid usado para generar esta visualización.' : 'Includes the Mermaid code used to generate this visualization.'}</p><pre class="code"><code>${escapeHtml(code.join('\n'))}</code></pre></details></figure>`,
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
      const referenceEntries = items.map(referenceEntry);
      if (referenceEntries.every(Boolean)) {
        out.push(`<div class="reference-entries">${referenceEntries.join('')}</div>`);
        continue;
      }
      const referenceList =
        items.length > 0 && items.every((item) => /\[[^\]]+\]\(https?:\/\/[^)]+\)/.test(item));
      if (referenceList) {
        out.push(
          `<ul class="reference-links">${items
            .map((item) => {
              const link = item.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)\.?$/);
              return link
                ? `<li><a href="${escapeHtml(link[2]!)}" rel="noreferrer">${inline(link[1]!)}</a></li>`
                : `<li>${inline(item)}</li>`;
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
        `<ul class="canonical-unordered-list">${items
          .map((item) => {
            const tracked = item.match(/^\[ \] `(PA-S002:(?:exercise|mastery):\d+)` (.+)$/);
            if (tracked)
              return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="${tracked[1]}"><span>${inline(tracked[2]!)}</span></label></li>`;
            const localStudy = item.match(/^\[ \] (.+)$/);
            if (localStudy) {
              if (activeSection === 'success-criteria') {
                successStudy++;
                return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="PA-S002:success:${String(successStudy).padStart(2, '0')}"><span>${inline(localStudy[1]!)}</span></label></li>`;
              }
              study++;
              return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="PA-S002:review:${study}"><span>${inline(localStudy[1]!)}</span></label></li>`;
            }
            return `<li><span class="unordered-list-content">${inline(item)}</span></li>`;
          })
          .join('')}</ul>`,
      );
      continue;
    }
    if (activeSection === 'study-cards' && /^\d+\. /.test(line)) {
      const cards: Array<[string, string]> = [];
      while (/^\d+\. /.test(lines[i] ?? '')) {
        const question = lines[i++]!.replace(/^\d+\. /, '');
        const answer: string[] = [];
        while (i < lines.length) {
          const next = lines[i]!;
          if (!next.trim()) {
            i++;
            if (answer.length) break;
            continue;
          }
          if (!/^\s{2,}/.test(next)) break;
          answer.push(next.trim());
          i++;
        }
        cards.push([question, answer.join(' ')]);
      }
      i--;
      out.push(
        `<div class="study-question-cards">${cards
          .map(
            ([question, answer]) =>
              `<details class="study-retrieval"><summary>${inline(question)}</summary><div class="study-retrieval-answer"><p>${inline(answer)}</p></div></details>`,
          )
          .join('')}</div>`,
      );
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (/^\d+\. /.test(lines[i] ?? '')) items.push(lines[i++]!.replace(/^\d+\. /, ''));
      i--;
      if (activeSection === 'success-criteria') {
        out.push(
          `<ul class="success-study-list">${items
            .map((item) => {
              successStudy++;
              return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="PA-S002:success:${String(successStudy).padStart(2, '0')}"><span>${inline(item)}</span></label></li>`;
            })
            .join('')}</ul>`,
        );
        continue;
      }
      out.push(
        `<ol class="canonical-ordered-list">${items
          .map((item) => `<li><span class="ordered-list-content">${inline(item)}</span></li>`)
          .join('')}</ol>`,
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
        `<aside class="synthesis"><h3>${inline(group[0]!)}</h3><ol>${group
          .slice(1)
          .map(
            (item) =>
              `<li><span class="numbered-card-content">${inline(item.slice(3))}</span></li>`,
          )
          .join('')}</ol></aside>`,
      );
      continue;
    }
    const rendered = paragraph(line, currentHeadingTag, conceptCallouts);
    if (!appendConceptExplanation(out, rendered)) out.push(rendered);
  }
  if (reading) out.push('</div>');
  if (deep) out.push('</details>');
  const title =
    lang === 'es'
      ? 'Monorepo del Accelerator y estándares de ingeniería'
      : 'Accelerator Monorepo and Engineering Standards';
  const objective = lines.findIndex((line) =>
    /^## (?:1\. )?(?:Objetivo|Objective|Aim)$/.test(line),
  );
  const objectiveText = lines.slice(objective + 1).find((line) => Boolean(line.trim()));
  if (objective < 0 || !objectiveText) throw new Error(`Missing PA-S002 ${lang} objective`);
  const tocHtml = sessionToc(lang);
  const crumb = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${lang}/sessions/">${lang === 'es' ? 'Sesiones' : 'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S002</span></nav>`;
  const content = Object.entries(SESSION_SECTION_ORDER)
    .sort(([, first], [, second]) => first - second)
    .map(([id, ordinal]) => {
      const displayTitle = sectionTitle(id, '', lang);
      return `${sectionHeading(2, id, inline(displayTitle), lang, ordinal)}${sectionBodies.get(id)!.join('\n')}`;
    })
    .join('\n');
  return shell(
    lang,
    title,
    `${crumb}<div class="page-intro"><h1>${title}</h1><p class="lead">${inline(objectiveText)}</p></div><div class="layout">${tocHtml}<article class="canonical-theory">${placeTocFabsAtSectionEnds(content, lang)}</article></div>`,
    base,
    `${lang === 'es' ? 'en' : 'es'}/sessions/PA-S002/`,
  );
}
