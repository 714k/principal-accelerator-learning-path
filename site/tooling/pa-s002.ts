import { escapeHtml, shell, themedMindMap, tocFab } from './render.ts';

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
  const first = references[0]!;
  const prefix = value.slice(0, first.index).trimEnd();
  const suffix = value.slice(first.index!);
  const onlyReferences = suffix.replace(pattern, '').replace(/[·.\s]/g, '') === '';
  const prose = onlyReferences && /[.!?]$/.test(prefix)
    ? prefix
    : value.replace(pattern, (_, label: string) => label);
  const links = references
    .map(([, label, url]) => `<li><a href="${escapeHtml(url!)}">${inline(label!)}</a></li>`)
    .join('');
  return `${prose ? `<p>${inline(prose)}</p>` : ''}<ul class="reference-links">${links}</ul>`;
}
function statementCard(value: string, headingTag: number): string {
  const statement = value.match(/^\*\*([^*]{28,}):\*\*\s+(.+)$/);
  if (!statement) return paragraphWithReferences(value);
  const tag = Math.min(headingTag + 1, 6);
  return `<div class="statement-card"><h${tag}>${inline(statement[1]!)}</h${tag}>${paragraphWithReferences(statement[2]!)}</div>`;
}
function conceptParagraphCard(value: string, headingTag: number): string {
  const concept = value.match(/^\*\*([^*:]+)\*\*\s+((?:es|son|is|are|reúne|mantiene|confirma|revisa|compara|identifica|describe|permite|representa|establece|define|muestra|comunica|comprueba|declara|requiere|conserva|facilita|garantiza)\b[\s\S]*)$/i);
  if (!concept) return statementCard(value, headingTag);
  const tag = Math.min(headingTag + 1, 6);
  return `<div class="concept-definition concept-definition--paragraph"><h${tag}>${inline(concept[1]!)}</h${tag}>${paragraphWithReferences(concept[2]!)}</div>`;
}
function sectionId(title: string, index: number): string {
  const normalized = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  if (normalized.includes('conceptos por ambito') || /(?:^|\.) concepts$/.test(normalized))
    return 'concepts';
  if (normalized.includes('del repositorio compartido') || normalized.includes('shared repository'))
    return 'main-topic';
  if (normalized.includes('visual learning studio')) return 'visual-learning-studio';
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
  return `section-${index}`;
}
function studio(lang: 'es' | 'en', base: string): string {
  const es = lang === 'es';
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
  const mapAlt = es ? 'Mapa mental de monorepo, límites, dependencias, calidad y ownership.' : 'Mind map of monorepo, boundaries, dependencies, quality, and ownership.';
  return `<div class="learning-studio" data-learning-studio><nav class="visual-mode-nav" data-mode-nav aria-label="${es ? 'Modos de estudio visual' : 'Visual study modes'}"><a id="s002-tab-map" href="#s002-map" data-mode-control>${es ? 'Mapa mental' : 'Mind map'}</a><a id="s002-tab-cards" href="#s002-cards" data-mode-control>${es ? 'Tarjetas' : 'Cards'}</a></nav><section id="s002-map" class="visual-mode-panel" data-visual-panel><h3>${es ? 'Mapa de conceptos' : 'Concept map'}</h3><figure class="diagram-card">${themedMindMap(map, mapAlt, 'session-diagram')}<figcaption>${es ? 'Relaciona las decisiones de repositorio con contratos, comprobaciones y responsables.' : 'Relates repository decisions to contracts, checks, and owners.'}</figcaption></figure></section><section id="s002-cards" class="visual-mode-panel" data-visual-panel><h3>${es ? 'Recuperación: 10 tarjetas' : 'Retrieval: 10 cards'}</h3><p>${es ? 'Las respuestas permanecen disponibles sin JavaScript.' : 'Answers remain available without JavaScript.'}</p><div class="flashcard-deck" data-flashcards tabindex="0"><div class="flashcard-controls"><button type="button" data-flash-prev>${es ? 'Anterior' : 'Previous'}</button><output data-flashcard-count aria-live="polite">1 / ${cards.length}</output><button type="button" data-flash-next>${es ? 'Siguiente' : 'Next'}</button></div>${items}</div></section></div>`;
}
export function renderS002(source: string, lang: 'es' | 'en', base: string): string {
  assertS002(source, lang);
  const lines = source.replace(/\r\n/g, '\n').split('\n'),
    out: string[] = [],
    toc: string[] = [];
  let pending = '',
    reading = false,
    mermaid = 0,
    study = 0,
    studioMapFollows = false,
    currentHeadingTag = 3;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const marker = line.match(/^<!-- (?:concept:|topic:) ([\w.]+)/);
    if (marker) {
      if (reading) {
        out.push('</div>');
        reading = false;
      }
      if (marker[1] === 'main.monorepo') out.push('<span id="main.monorepo"></span>');
      else pending = marker[1]!;
      continue;
    }
    if (!line || line.startsWith('<!--') || /^---+$/.test(line)) continue;
    const heading = line.match(/^(#{1,5}) (.+)$/);
    if (heading) {
      if (reading) {
        out.push('</div>');
        reading = false;
      }
      const level = heading[1]!.length,
        title = heading[2]!;
      if (level === 5 && /^(Nivel|Level) [123]/.test(title)) {
        out.push(`<div class="reading-level"><h6>${inline(title)}</h6>`);
        reading = true;
        continue;
      }
      const id = pending || sectionId(title, i);
      pending = '';
      const tag = Math.min(Math.max(level + 1, 2), 6);
      currentHeadingTag = tag;
      if (level === 1 || (level === 2 && toc.length < 12))
        toc.push(`<li><a href="#${id}">${inline(title)}</a></li>`);
      if (level === 1) out.push(`<h2 id="${id}" class="chapter-title">${inline(title)}</h2>`);
      else out.push(`<h${tag} id="${id}">${inline(title)}</h${tag}>`);
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
      } else out.push(`<pre class="code"><code>${escapeHtml(code.join('\n'))}</code></pre>`);
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
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (/^\d+\. /.test(lines[i] ?? '')) items.push(lines[i++]!.replace(/^\d+\. /, ''));
      i--;
      out.push(`<ol>${items.map((item) => `<li>${inline(item)}</li>`).join('')}</ol>`);
      continue;
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (/^[-*] /.test(lines[i] ?? '')) items.push(lines[i++]!.slice(2));
      i--;
      const referenceList = items.some((item) => /\]\(https?:\/\//.test(item));
      out.push(
        `<ul${referenceList ? ' class="reference-links"' : ''}>${items
          .map((item) => {
            const tracked = item.match(/^\[ \] `(PA-S002:(?:exercise|mastery):\d+)` (.+)$/);
            if (tracked)
              return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="${tracked[1]}"><span>${inline(tracked[2]!)}</span></label></li>`;
            const localStudy = item.match(/^\[ \] (.+)$/);
            if (localStudy) {
              study++;
              return `<li class="canonical-study-item"><label><input type="checkbox" data-study-id="PA-S002:review:${study}"><span>${inline(localStudy[1]!)}</span></label></li>`;
            }
            const conceptSummary = item.match(/^\*\*([^*]+)\*\*\s+(.+)$/);
            if (conceptSummary && /«[^»]+»/.test(conceptSummary[2]!)) {
              const statements = (conceptSummary[2]!.replace(/[«»]/g, '').match(/[^.]+(?:\.|$)/g) ?? [])
                .map((statement) => statement.trim())
                .filter(Boolean);
              const first = statements.shift()?.match(/^([^:]+):\s*(.+)$/);
              if (first) {
                const tag = Math.min(currentHeadingTag + 1, 6);
                return `<li class="concept-summary"><p class="concept-summary-label">${inline(conceptSummary[1]!)}</p><h${tag}>${inline(first[1]!)}</h${tag}><p>${inline(first[2]!)}</p>${statements.length ? `<p>${statements.map(inline).join(' ')}</p>` : ''}</li>`;
              }
            }
            const concept = item.match(/^\*\*([^*]+):\*\*\s+(.+)$/);
            if (concept) {
              const tag = Math.min(currentHeadingTag + 1, 6);
              return `<li class="concept-definition"><h${tag}>${inline(concept[1]!)}</h${tag}><p>${inline(concept[2]!)}</p></li>`;
            }
            const bareConcept = item.startsWith('«')
              ? item.match(/^«([^:«»]+):\s*([^»]+)»(\.)?$/)
              : /[`*\[\]]/.test(item)
                ? null
                : item.match(/^([^:«»]+):\s*(.+)$/);
            if (bareConcept) {
              const tag = Math.min(currentHeadingTag + 1, 6);
              const definition = `${bareConcept[2]!.trim()}${bareConcept[3] ?? ''}`;
              return `<li class="concept-definition"><h${tag}>${inline(bareConcept[1]!.trim())}</h${tag}><p>${inline(definition)}</p></li>`;
            }
            return `<li>${inline(item)}</li>`;
          })
          .join('')}</ul>`,
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
    if (/^(?:\*\*)?F0 · PA-S002 · /.test(line)) continue;
    out.push(conceptParagraphCard(line, currentHeadingTag));
  }
  if (reading) out.push('</div>');
  const title =
    lang === 'es'
      ? 'Monorepo del Accelerator y estándares de ingeniería'
      : 'Accelerator Monorepo and Engineering Standards';
  const objective = lines.findIndex((line) => /^## (?:1\. )?(?:Objetivo|Objective)$/.test(line));
  const objectiveText = lines.slice(objective + 1).find((line) => Boolean(line.trim()));
  if (objective < 0 || !objectiveText) throw new Error(`Missing PA-S002 ${lang} objective`);
  const tocHtml = `<details class="toc" id="table-of-contents"><summary>${lang === 'es' ? 'Contenido' : 'Contents'}</summary><nav><ol>${toc.join('')}</ol></nav></details>`;
  const crumb = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${lang}/sessions/">${lang === 'es' ? 'Sesiones' : 'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S002</span></nav>`;
  return shell(
    lang,
    title,
    `${crumb}<div class="page-intro"><h1>${title}</h1><p class="lead">${inline(objectiveText)}</p><p class="notice">${lang === 'es' ? 'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno' : 'Editorial draft · Mastery not assessed · No learner measurements'}</p></div><div class="layout">${tocHtml}<article class="canonical-theory">${out.join('\n')}</article></div>${tocFab(lang)}`,
    base,
    `${lang === 'es' ? 'en' : 'es'}/sessions/PA-S002/`,
  );
}
