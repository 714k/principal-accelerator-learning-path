import { readFileSync } from 'node:fs';
export interface Table {
  headers: string[];
  rows: string[][];
}
/** A Mermaid source file that is rendered to SVG before publication. */
export interface Diagram {
  source: string;
  title: string;
  description: string;
}
export interface VisualCard {
  eyebrow?: string;
  title: string;
  body: string;
}
export interface VisualFlowStep {
  title: string;
  body: string;
}
export interface VisualFlashcard {
  id: string;
  category: string;
  question: string;
  answer: string;
  explanation: string;
  sourceSections: string[];
}
export type VisualBlock =
  | { type: 'cards'; cards: VisualCard[] }
  | { type: 'diagram'; diagram: Diagram }
  | { type: 'comparison'; table: Table }
  | { type: 'flow'; steps: VisualFlowStep[] }
  | { type: 'flashcards'; cards: VisualFlashcard[] };
export interface VisualLearningMode {
  id: string;
  kind: string;
  label: string;
  title: string;
  rationale: string;
  sourceSections: string[];
  blocks: VisualBlock[];
}
export interface VisualLearning {
  intro: string;
  modes: VisualLearningMode[];
}
export type InstructionalKind =
  | 'pretraining'
  | 'guiding-question'
  | 'concept'
  | 'example'
  | 'mechanism'
  | 'analysis'
  | 'retrieval'
  | 'failure'
  | 'tradeoffs'
  | 'production'
  | 'resolution';
export interface InstructionalBlock {
  kind: InstructionalKind;
  text: string;
  answer?: string;
}
export interface Section {
  id: string;
  title: string;
  paragraphs: string[];
  level?: 2 | 3;
  blocks?: InstructionalBlock[];
  checklist?: string[];
  studyItems?: { id: string; label: string }[];
  table?: Table;
  diagram?: Diagram;
  code?: string;
}
export interface Reference {
  id: string;
  title: string;
  url: string;
}
export interface Page {
  id: string;
  lang: 'es' | 'en';
  kind: 'session' | 'project';
  title: string;
  description: string;
  status: 'editorial-draft';
  sections: Section[];
  references: Reference[];
  canonicalContent?: string;
  visualLearning?: VisualLearning;
  dashboard?: {
    sessionId: string;
    projectId: string;
    checklistIds: string[];
    exerciseIds: string[];
    successIds: string[];
    studyState: string;
    evidenceState: string;
  };
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function validTable(value: unknown): boolean {
  if (!record(value)) return false;
  const headers = value.headers;
  const rows = value.rows;
  if (
    !Array.isArray(headers) ||
    !Array.isArray(rows) ||
    !headers.every((x) => typeof x === 'string')
  )
    return false;
  return rows.every(
    (row) =>
      Array.isArray(row) &&
      row.length === headers.length &&
      row.every((x) => typeof x === 'string'),
  );
}
function validDiagram(value: unknown): value is Diagram {
  return (
    record(value) &&
    typeof value.source === 'string' &&
    /^[A-Za-z0-9][A-Za-z0-9/_-]*\.mmd$/.test(value.source) &&
    typeof value.title === 'string' &&
    value.title.length > 0 &&
    typeof value.description === 'string' &&
    value.description.length > 0
  );
}
function validVisualBlock(value: unknown, sectionIds: Set<string>): value is VisualBlock {
  if (!record(value) || typeof value.type !== 'string') return false;
  if (value.type === 'cards')
    return (
      Array.isArray(value.cards) &&
      value.cards.length > 0 &&
      value.cards.every(
        (card) =>
          record(card) &&
          (card.eyebrow === undefined || typeof card.eyebrow === 'string') &&
          typeof card.title === 'string' &&
          card.title.length > 0 &&
          typeof card.body === 'string' &&
          card.body.length > 0,
      )
    );
  if (value.type === 'diagram') return validDiagram(value.diagram);
  if (value.type === 'comparison') return validTable(value.table);
  if (value.type === 'flow')
    return (
      Array.isArray(value.steps) &&
      value.steps.length > 0 &&
      value.steps.every(
        (step) =>
          record(step) &&
          typeof step.title === 'string' &&
          step.title.length > 0 &&
          typeof step.body === 'string' &&
          step.body.length > 0,
      )
    );
  if (value.type === 'flashcards')
    return (
      Array.isArray(value.cards) &&
      value.cards.length > 0 &&
      value.cards.every(
        (card) =>
          record(card) &&
          typeof card.id === 'string' &&
          /^F\d{2}$/.test(card.id) &&
          ['category', 'question', 'answer', 'explanation'].every(
            (key) => typeof card[key] === 'string' && String(card[key]).length > 0,
          ) &&
          Array.isArray(card.sourceSections) &&
          card.sourceSections.length > 0 &&
          card.sourceSections.every((id) => typeof id === 'string' && sectionIds.has(id)),
      )
    );
  return false;
}
function validVisualLearning(value: unknown, sectionIds: Set<string>): value is VisualLearning {
  return (
    record(value) &&
    typeof value.intro === 'string' &&
    value.intro.length > 0 &&
    Array.isArray(value.modes) &&
    value.modes.length >= 1 &&
    value.modes.length <= 7 &&
    value.modes.every(
      (mode) =>
        record(mode) &&
        typeof mode.id === 'string' &&
        /^[a-z0-9-]+$/.test(mode.id) &&
        typeof mode.kind === 'string' &&
        mode.kind.length > 0 &&
        typeof mode.label === 'string' &&
        mode.label.length > 0 &&
        typeof mode.title === 'string' &&
        mode.title.length > 0 &&
        typeof mode.rationale === 'string' &&
        mode.rationale.length > 0 &&
        Array.isArray(mode.sourceSections) &&
        mode.sourceSections.length > 0 &&
        mode.sourceSections.every((id) => typeof id === 'string' && sectionIds.has(id)) &&
        Array.isArray(mode.blocks) &&
        mode.blocks.length > 0 &&
        mode.blocks.every((block) => validVisualBlock(block, sectionIds)),
    )
  );
}
const instructionalKinds = new Set<InstructionalKind>([
  'pretraining',
  'guiding-question',
  'concept',
  'example',
  'mechanism',
  'analysis',
  'retrieval',
  'failure',
  'tradeoffs',
  'production',
  'resolution',
]);
export function validatePage(value: unknown): asserts value is Page {
  if (
    !record(value) ||
    !['es', 'en'].includes(String(value.lang)) ||
    !['session', 'project'].includes(String(value.kind)) ||
    value.status !== 'editorial-draft' ||
    ![value.id, value.title, value.description].every(
      (x) => typeof x === 'string' && x.length > 0,
    ) ||
    !Array.isArray(value.sections) ||
    (value.sections.length === 0 &&
      !(
        value.kind === 'session' &&
        /^PA-S001-theory-(es|en)\.md$/.test(String(value.canonicalContent))
      )) ||
    !Array.isArray(value.references)
  ) {
    throw new Error('Invalid page metadata');
  }
  const ids = new Set<string>();
  for (const s of value.sections) {
    if (
      !record(s) ||
      typeof s.id !== 'string' ||
      !/^[a-z0-9-]+$/.test(s.id) ||
      ids.has(s.id) ||
      typeof s.title !== 'string' ||
      !Array.isArray(s.paragraphs) ||
      !s.paragraphs.length ||
      !s.paragraphs.every((p) => typeof p === 'string' && p.length > 0) ||
      (s.blocks !== undefined &&
        (!Array.isArray(s.blocks) ||
          !s.blocks.length ||
          !s.blocks.every(
            (block) =>
              record(block) &&
              instructionalKinds.has(block.kind as InstructionalKind) &&
              typeof block.text === 'string' &&
              block.text.length > 0 &&
              (block.kind === 'retrieval'
                ? typeof block.answer === 'string' && block.answer.length > 0
                : block.answer === undefined),
          ))) ||
      (s.level !== undefined && s.level !== 2 && s.level !== 3) ||
      (s.checklist !== undefined &&
        (!Array.isArray(s.checklist) ||
          !s.checklist.every((x) => typeof x === 'string' && x.length > 0))) ||
      (s.studyItems !== undefined &&
        (!Array.isArray(s.studyItems) ||
          !s.studyItems.every(
            (x) =>
              record(x) &&
              typeof x.id === 'string' &&
              /^PA-S001:(exercise|mastery|success):[a-z-]+$/.test(x.id) &&
              typeof x.label === 'string' &&
              x.label.length > 0,
          ))) ||
      (s.code !== undefined && typeof s.code !== 'string') ||
      (s.diagram !== undefined && !validDiagram(s.diagram)) ||
      (s.table !== undefined && !validTable(s.table))
    ) {
      throw new Error('Invalid section');
    }
    ids.add(s.id);
  }
  if (value.kind === 'session') {
    const exercises = ['classify', 'boundary-map', 'quality', 'ai-decision'].map(
      (id) => `PA-S001.exercise.${id}`,
    );
    const criteria = [
      'engineering',
      'scope',
      'quality',
      'boundary',
      'fpa',
      'aipe',
      'roles',
      'evidence',
    ].map((id) => `PA-S001.check.${id}`);
    const dashboard = value.dashboard;
    if (
      value.canonicalContent !== `PA-S001-theory-${value.lang}.md` ||
      value.sections.length !== 0 ||
      value.references.length !== 0 ||
      value.visualLearning !== undefined ||
      !record(dashboard) ||
      dashboard.sessionId !== value.id ||
      dashboard.projectId !== 'P0' ||
      dashboard.studyState !== 'local-only' ||
      dashboard.evidenceState !== 'not-assessed' ||
      !Array.isArray(dashboard.exerciseIds) ||
      dashboard.exerciseIds.join('|') !== exercises.join('|') ||
      !Array.isArray(dashboard.checklistIds) ||
      dashboard.checklistIds.join('|') !== criteria.join('|') ||
      !Array.isArray(dashboard.successIds) ||
      dashboard.successIds.length !== 0
    ) {
      throw new Error(
        'PA-S001 session metadata must point to theory.md and keep the canonical exercise/mastery IDs separate from evidence',
      );
    }
    return;
  }
  if (value.kind === 'session' && value.visualLearning === undefined)
    throw new Error('Session pages require a visual learning guide with flashcards');
  if (value.kind === 'session') {
    const studyItems = (value.sections as Section[]).flatMap((section) => section.studyItems ?? []);
    if (
      new Set(studyItems.map((item) => item.id)).size !== studyItems.length ||
      studyItems.filter((item) => item.id.includes(':exercise:')).length !== 4 ||
      studyItems.filter((item) => item.id.includes(':mastery:')).length !== 6 ||
      studyItems.filter((item) => item.id.includes(':success:')).length !== 5
    )
      throw new Error(
        'PA-S001 study IDs must match four exercises, six review criteria, and five success criteria',
      );
    if (
      !record(value.dashboard) ||
      value.dashboard.sessionId !== value.id ||
      !Array.isArray(value.dashboard.exerciseIds) ||
      !Array.isArray(value.dashboard.checklistIds) ||
      !Array.isArray(value.dashboard.successIds) ||
      value.dashboard.exerciseIds.join('|') !==
        studyItems
          .filter((item) => item.id.includes(':exercise:'))
          .map((item) => item.id)
          .join('|') ||
      value.dashboard.checklistIds.join('|') !==
        studyItems
          .filter((item) => item.id.includes(':mastery:'))
          .map((item) => item.id)
          .join('|') ||
      value.dashboard.successIds.join('|') !==
        studyItems
          .filter((item) => item.id.includes(':success:'))
          .map((item) => item.id)
          .join('|')
    )
      throw new Error('Dashboard study IDs differ from controls');
    const theory = (value.sections as Section[]).filter(
      (section) => section.id === 'main-topic' || /^s[1-7]$/.test(section.id),
    );
    if (
      theory.some(
        (section) =>
          !section.blocks ||
          section.blocks[0]?.kind !== 'guiding-question' ||
          section.blocks.at(-1)?.kind !== 'resolution',
      )
    ) {
      throw new Error(
        'Main Topic and theoretical subtopics require an opening guiding question and closing resolution',
      );
    }
    const concepts = (value.sections as Section[]).find((section) => section.id === 'concepts');
    const firstConcept = (value.sections as Section[]).find((section) => section.id === 'c1');
    if (
      !concepts?.title
        .toLowerCase()
        .includes(value.lang === 'es' ? 'pre-entrenamiento' : 'pre-training') ||
      firstConcept?.blocks?.[0]?.kind !== 'pretraining' ||
      !firstConcept.diagram
    ) {
      throw new Error(
        'Session vocabulary requires visible pre-training and an adjacent architecture relationship diagram',
      );
    }
  }
  if (value.visualLearning !== undefined && !validVisualLearning(value.visualLearning, ids))
    throw new Error('Invalid visual learning guide');
  if (
    value.visualLearning &&
    new Set(value.visualLearning.modes.map((mode) => mode.id)).size !==
      value.visualLearning.modes.length
  ) {
    throw new Error('Visual learning mode identifiers must be unique');
  }
  if (value.visualLearning) {
    const flashcards = value.visualLearning.modes
      .flatMap((mode) => mode.blocks)
      .filter((block) => block.type === 'flashcards')
      .flatMap((block) => block.cards);
    const covered = new Set(flashcards.flatMap((card) => card.sourceSections));
    const theorySections = (value.sections as Section[])
      .filter(
        (section) =>
          section.id === 'main-topic' || /^c[1-8]$/.test(section.id) || /^s[1-7]$/.test(section.id),
      )
      .map((section) => section.id);
    if (
      flashcards.length !== 10 ||
      flashcards.map((card) => card.id).join('|') !==
        ['F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08', 'F09', 'F10'].join('|') ||
      theorySections.some((id) => !covered.has(id))
    ) {
      throw new Error('Flashcards must cover every concept, main topic, and subtopic');
    }
    const mentalMap = value.visualLearning.modes.find((mode) => mode.id === 'mental-model');
    const hasDiagram = mentalMap?.blocks.some((block) => block.type === 'diagram') ?? false;
    if (
      !mentalMap ||
      !hasDiagram ||
      theorySections.some((id) => !mentalMap.sourceSections.includes(id))
    ) {
      throw new Error('A mental-map diagram must cover every concept, main topic, and subtopic');
    }
  }
  const refs = new Set<string>();
  for (const r of value.references) {
    if (
      !record(r) ||
      typeof r.id !== 'string' ||
      !/^[A-Z][0-9]+$/.test(r.id) ||
      refs.has(r.id) ||
      typeof r.title !== 'string' ||
      typeof r.url !== 'string' ||
      new URL(r.url).protocol !== 'https:'
    ) {
      throw new Error('Invalid reference');
    }
    refs.add(r.id);
  }
  for (const s of value.sections as Section[])
    for (const p of [
      ...s.paragraphs,
      ...(s.blocks?.flatMap((block) => [block.text, ...(block.answer ? [block.answer] : [])]) ??
        []),
    ]) {
      for (const match of p.matchAll(/\[([A-Z][0-9]+)\]/g)) {
        if (!refs.has(match[1]!)) throw new Error(`Missing reference: ${match[1]}`);
      }
    }
}
export function loadPage(path: string): Page {
  const value: unknown = JSON.parse(readFileSync(path, 'utf8'));
  validatePage(value);
  return value;
}
export function assertPair(es: Page, en: Page): void {
  if (
    es.lang !== 'es' ||
    en.lang !== 'en' ||
    es.id !== en.id ||
    es.kind !== en.kind ||
    (es.kind === 'session' &&
      (es.canonicalContent !== `PA-S001-theory-es.md` ||
        en.canonicalContent !== `PA-S001-theory-en.md`)) ||
    es.sections.map((s) => s.id).join('|') !== en.sections.map((s) => s.id).join('|') ||
    es.sections.map((s) => s.blocks?.map((block) => block.kind).join(',') ?? '').join('|') !==
      en.sections.map((s) => s.blocks?.map((block) => block.kind).join(',') ?? '').join('|') ||
    es.sections.flatMap((s) => s.studyItems?.map((x) => x.id) ?? []).join('|') !==
      en.sections.flatMap((s) => s.studyItems?.map((x) => x.id) ?? []).join('|') ||
    es.dashboard?.exerciseIds.join('|') !== en.dashboard?.exerciseIds.join('|') ||
    es.dashboard?.checklistIds.join('|') !== en.dashboard?.checklistIds.join('|') ||
    es.dashboard?.successIds.join('|') !== en.dashboard?.successIds.join('|') ||
    es.references.map((r) => r.id + '=' + r.url).join('|') !==
      en.references.map((r) => r.id + '=' + r.url).join('|') ||
    es.visualLearning?.modes
      .map((mode) => mode.id + ':' + mode.sourceSections.join(','))
      .join('|') !==
      en.visualLearning?.modes
        .map((mode) => mode.id + ':' + mode.sourceSections.join(','))
        .join('|') ||
    es.visualLearning?.modes
      .flatMap((mode) =>
        mode.blocks
          .filter((block) => block.type === 'flashcards')
          .flatMap((block) => block.cards.map((card) => card.sourceSections.join(','))),
      )
      .join('|') !==
      en.visualLearning?.modes
        .flatMap((mode) =>
          mode.blocks
            .filter((block) => block.type === 'flashcards')
            .flatMap((block) => block.cards.map((card) => card.sourceSections.join(','))),
        )
        .join('|')
  ) {
    throw new Error('ES/EN structure or references differ; semantic review is still required');
  }
}
