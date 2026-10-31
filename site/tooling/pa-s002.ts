import { createHash } from 'node:crypto';
import { escapeHtml, shell } from './render.ts';

const concepts = [
  'repo.monorepo',
  'repo.polyrepo',
  'boundary.repository',
  'boundary.architecture',
  'standards.convention',
  'standards.policy',
  'standards.standard',
  'quality.gate',
  'architecture.constraint',
  'architecture.fitness',
  'ownership.boundary',
  'workspace.workspace',
  'workspace.application',
  'workspace.package',
  'workspace.library',
  'dependency.graph',
  'dependency.direction',
  'dependency.cycle',
  'api.public',
  'tasks.graph',
  'sharing.tradeoffs',
  'ai.boundaries',
];
const topics = [
  'main.monorepo',
  'sub.strategy',
  'sub.units',
  'sub.contracts',
  'sub.execution',
  'sub.governance',
  'sub.verification',
  'sub.responsibility',
];
const expected = {
  es: [39513, '917daa42c6d834c4fac57528fbb31e85d864e6a2da2bebb09dd8f594432db5de'],
  en: [36563, '896e5b415792351a6cababb1feafc4e4a0d3bc696247fd69a809c9dabfef972c'],
} as const;
export function assertS002(source: string, lang: 'es' | 'en'): void {
  const [size, hash] = expected[lang];
  if (
    Buffer.byteLength(source) !== size ||
    createHash('sha256').update(source).digest('hex') !== hash
  )
    throw new Error(`Invalid PA-S002 ${lang} canonical source`);
  const ids = [...source.matchAll(/<!-- concept: ([\w.]+) -->/g)].map((m) => m[1]);
  const found = [...source.matchAll(/<!-- topic: ([\w.]+) requires:/g)].map((m) => m[1]);
  if (ids.join('|') !== concepts.join('|') || found.join('|') !== topics.join('|'))
    throw new Error(`Invalid PA-S002 ${lang} coverage`);
}
function inline(s: string): string {
  const held: string[] = [];
  const hold = (v: string) => {
    held.push(v);
    return `@@${held.length - 1}@@`;
  };
  let value = s.replace(/`([^`]+)`/g, (_, x: string) => hold(`<code>${escapeHtml(x)}</code>`));
  value = value.replace(/https?:\/\/[^\s)]+/g, (url: string) =>
    hold(`<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`),
  );
  value = escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return value.replace(/@@(\d+)@@/g, (_, n: string) => held[Number(n)]!);
}
export function renderS002(source: string, lang: 'es' | 'en', base: string): string {
  assertS002(source, lang);
  const lines = source.split('\n'),
    out: string[] = [],
    toc: string[] = [];
  let pending = '',
    deep = false,
    reading = false,
    diagram = 0;
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
    if (!line || line.startsWith('<!--')) continue;
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
        title = heading[2]!;
      if (level === 5 && /^(Nivel|Level) 3/.test(title)) {
        out.push(
          `<details class="deep-dive"><summary><span class="reading-level-title">${inline(title)}</span></summary>`,
        );
        deep = true;
        continue;
      }
      if (level === 5 && /^(Nivel|Level) [12]/.test(title)) {
        out.push(`<div class="reading-level"><h4>${inline(title)}</h4>`);
        reading = true;
        continue;
      }
      const id =
        pending || (level === 2 ? `section-${title.match(/^\d+/)?.[0] ?? i}` : `s002-${i}`);
      pending = '';
      const tag = Math.min(Math.max(level, 2), 6);
      if (level === 2) toc.push(`<li><a href="#${id}">${inline(title)}</a></li>`);
      if (level === 1) out.push(`<h2 id="${id}" class="chapter-title">${inline(title)}</h2>`);
      else if (concepts.includes(id) || id.startsWith('sub.')) {
        const subtopic = id.startsWith('sub.');
        const label =
          lang === 'es' ? (subtopic ? 'SUBTEMA' : 'CONCEPTO') : subtopic ? 'SUBTOPIC' : 'CONCEPT';
        const number = subtopic ? topics.indexOf(id) : concepts.indexOf(id) + 1;
        const name = title.replace(/ \(`[^`]+`\)$/, '');
        out.push(
          `<div class="concept-heading" data-concept-id="${id}"><p class="concept-eyebrow">${label} · ${String(number).padStart(2, '0')}</p><h3 id="${id}">${inline(name)}</h3><span class="concept-id"><code>${escapeHtml(id)}</code></span></div>`,
        );
      } else out.push(`<h${tag} id="${id}">${inline(title)}</h${tag}>`);
      continue;
    }
    if (line.startsWith('```')) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.startsWith('```')) code.push(lines[i++]!);
      const name = diagram++ === 0 ? 'example' : 'mindmap';
      out.push(
        `<figure class="diagram"><img src="${base}${lang}/shared/diagrams/PA-S002/${name}-${lang}.svg" alt="${lang === 'es' ? 'Diagrama de la teoría PA-S002' : 'PA-S002 theory diagram'}"><details><summary>${lang === 'es' ? 'Fuente Mermaid' : 'Mermaid source'}</summary><pre><code>${escapeHtml(code.join('\n'))}</code></pre></details></figure>`,
      );
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
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (lines[i]?.startsWith('- ')) items.push(lines[i++]!.slice(2));
      i--;
      out.push(
        `<ul>${items
          .map((item) => {
            const study = item.match(/^\[ \] `(PA-S002:(?:exercise|mastery):\d+)` (.+)$/);
            if (study)
              return `<li><label><input type="checkbox" data-study-id="${study[1]}"> ${inline(item.slice(4))}</label></li>`;
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
    if (i === 1 && /^\*\*F0 · PA-S002 · /.test(line)) {
      out.push(
        `<div class="chapter-meta"><div class="chapter-meta-item"><h3>${lang === 'es' ? 'Datos de la sesión' : 'Session details'}</h3><p>${inline(line)}</p></div></div>`,
      );
      continue;
    }
    out.push(`<p>${inline(line)}</p>`);
  }
  if (reading) out.push('</div>');
  if (deep) out.push('</details>');
  const title =
    lang === 'es'
      ? 'Monorepo del Accelerator y estándares de ingeniería'
      : 'Accelerator Monorepo and Engineering Standards';
  const objective = lines.findIndex((line) => /^## 1\./.test(line));
  if (objective < 0 || !lines[objective + 1]) throw new Error(`Missing PA-S002 ${lang} objective`);
  const tocHtml = `<details class="toc"><summary>${lang === 'es' ? 'Contenido' : 'Contents'}</summary><nav><ol>${toc.join('')}</ol></nav></details>`;
  const crumb = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${lang}/sessions/">${lang === 'es' ? 'Sesiones' : 'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S002</span></nav>`;
  return shell(
    lang,
    title,
    `${crumb}<div class="page-intro"><p class="eyebrow">F0 / PA-S002</p><h1>${title}</h1><p class="lead">${inline(lines[objective + 1]!)}</p><p class="notice">${lang === 'es' ? 'Borrador editorial · Dominio sin evaluar · Sin mediciones del alumno' : 'Editorial draft · Mastery not assessed · No learner measurements'}</p></div><div class="layout">${tocHtml}<article class="canonical-theory">${out.join('\n')}</article></div>`,
    base,
    `${lang === 'es' ? 'en' : 'es'}/sessions/PA-S002/`,
  );
}
