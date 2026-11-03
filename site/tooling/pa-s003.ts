import { escapeHtml, placeTocFabsAtSectionEnds, sectionHeading, shell, tocFab } from './render.ts';
function inline(value: string): string {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1">$1</a>');
}
function paragraph(value: string): string {
  const lead = value.match(/^\*\*([^*]+?)\.\*\*\s+(.+)$/);
  if (lead)
    return `<p class="split-lead"><strong>${inline(lead[1]!)}</strong><span>${inline(lead[2]!)}</span></p>`;
  if (/\s(?:→|←|↔|⟶|⇒|->|<-)\s/.test(value) && !value.includes(' · ') && !/[.!?;]$/.test(value))
    return `<p class="flow-card">${inline(value)}</p>`;
  return `<p>${inline(value)}</p>`;
}
function synthesis(title: string, items: string[]): string {
  return `<aside class="synthesis"><h2>${inline(title)}</h2><ol>${items.map((item) => `<li>${inline(item.replace(/^\d+\.\s*/, ''))}</li>`).join('')}</ol></aside>`;
}
export function renderS003(source: string, lang: 'es' | 'en', base: string): string {
  const lines = source.split('\n'),
    output: string[] = [],
    toc: string[] = [];
  let n = 0,
    chapterTitleSeen = false,
    sectionNumber = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (
      !line.trim() ||
      line === '---' ||
      /^(?:Metadatos|Metadata):/.test(line) ||
      /\*\*(?:Hechos confirmados|Supuestos e inferencias|Incertidumbres y limitaciones|Cómo verificarlo|Confirmed facts|Assumptions and inferences|Uncertainties and limitations|How to verify)(?::|\*\*)/i.test(
        line,
      ) ||
      /^\*\*(?:Estado(?: editorial)?|Editorial(?: status)?):/i.test(line) ||
      /\*\*Estado editorial de este bloque:/i.test(line)
    )
      continue;
    if (/^(SÍNTESIS EN 30 SEGUNDOS|## 30-second synthesis)$/i.test(line)) {
      const items: string[] = [];
      while (/^\d+\. /.test(lines[i + 1] ?? '')) items.push(lines[++i]!);
      output.push(synthesis(line.replace(/^## /, ''), items));
      continue;
    }
    const h = line.match(/^(#{1,3}) (.+)$/);
    if (h) {
      const level = h[1]!.length,
        title = h[2]!,
        id = `s003-${++n}`;
      if (level === 1 && !chapterTitleSeen) {
        chapterTitleSeen = true;
        continue;
      }
      if (level === 2) toc.push(`<li><a href="#${id}">${inline(title)}</a></li>`);
      if (level === 1) sectionNumber++;
      output.push(
        level === 1
          ? `${sectionHeading(2, id, inline(title), lang, sectionNumber)}${tocFab(lang)}`
          : `<h${level} id="${id}">${inline(title)}</h${level}>`,
      );
      continue;
    }
    const level = line.match(/^(Nivel|Level) ([123]) — ([^.]+)\.\s*(.+)$/);
    if (level) {
      const title = `${level[1]} ${level[2]} — ${level[3]}`;
      if (level[2] === '3')
        output.push(
          `<details class="deep-dive"><summary><span class="reading-level-title">${inline(title)}</span></summary><p>${inline(level[4]!)}</p></details>`,
        );
      else
        output.push(
          `<div class="reading-level"><h4>${inline(title)}</h4><p>${inline(level[4]!)}</p></div>`,
        );
      continue;
    }
    const retrieval = line.match(
      /^Recuperación\.\s*(.+?)(?:Respuesta(?: y retroalimentación)?:|Answer(?: and feedback)?:)\s*(.+)$/i,
    );
    if (retrieval) {
      output.push(
        `<details class="mechanism-retrieval"><summary><strong>${lang === 'es' ? 'Comprueba lo aprendido' : 'Check what you learned'}:</strong> ${inline(retrieval[1]!)}</summary><p><strong>${lang === 'es' ? 'Respuesta razonada' : 'Reasoned answer'}:</strong> ${inline(retrieval[2]!)}</p></details>`,
      );
      continue;
    }
    const exercise = line.match(
      /^(?:\d+\.\s+|-\s+\[ \]\s+)?`?(S003-EX-\d+|PA-S003:exercise:\d+)`?\s*[—–-]?\s*(.+)$/,
    );
    if (exercise && /^(?:S003-EX-|PA-S003:exercise:)/.test(exercise[1]!)) {
      const id = `PA-S003:exercise:${String(Number(exercise[1]!.match(/\d+$/)?.[0] ?? 0)).padStart(2, '0')}`;
      output.push(
        `<p class="canonical-study-item"><label><input type="checkbox" data-study-id="${id}"><span><strong>${inline(exercise[1]!)}</strong> ${inline(exercise[2]!)}</span></label></p>`,
      );
      continue;
    }
    const ordered = line.match(/^(\d+)\. (.+)$/);
    if (ordered) {
      output.push(
        `<p class="s003-item"><strong>${ordered[1]!.padStart(2, '0')}</strong><span>${inline(ordered[2]!)}</span></p>`,
      );
      continue;
    }
    const bullet = line.match(/^- (.+)$/);
    if (bullet) {
      output.push(`<p class="s003-reference">${inline(bullet[1]!)}</p>`);
      continue;
    }
    output.push(paragraph(line));
  }
  const title =
    lang === 'es'
      ? 'Arquitectura del portafolio y Learning Site'
      : 'Portfolio and Learning Site Architecture';
  const crumb = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}${lang}/">Dashboard</a><span aria-hidden="true">/</span><a href="${base}${lang}/sessions/">${lang === 'es' ? 'Sesiones' : 'Sessions'}</a><span aria-hidden="true">/</span><span>PA-S003</span></nav>`;
  const tocHtml = `<details class="toc" id="table-of-contents"><summary>${lang === 'es' ? 'Contenido' : 'Contents'}</summary><nav><ol>${toc.join('')}</ol></nav></details>`;
  const diagram = `<figure class="diagram"><img src="${base}${lang}/shared/diagrams/PA-S003/mindmap.svg" alt="${lang === 'es' ? 'Mapa mental de PA-S003: límites, ownership, arquitectura de información y verificación.' : 'PA-S003 mind map: boundaries, ownership, information architecture, and verification.'}"><figcaption>${lang === 'es' ? 'Mapa mental de la arquitectura P0.' : 'P0 architecture mind map.'}</figcaption></figure>`;
  return shell(
    lang,
    title,
    `${crumb}<div class="page-intro"><p class="eyebrow">F0 / PA-S003</p><h1>${title}</h1><p class="lead">${lang === 'es' ? 'Límites de producto, arquitectura de información y contratos verificables para P0.' : 'Product boundaries, information architecture, and verifiable contracts for P0.'}</p></div><div class="layout">${tocHtml}<article class="canonical-theory">${diagram}${placeTocFabsAtSectionEnds(output.join('\n'), lang)}</article></div>`,
    base,
    `${lang === 'es' ? 'en' : 'es'}/sessions/PA-S003/`,
  );
}
