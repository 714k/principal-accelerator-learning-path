import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, relative, resolve, sep } from 'node:path';
import type { Page } from './content.ts';
import { asciiDiagrams } from './ascii-diagrams.ts';

export interface DiagramMetadata {
  source: string;
  title: string;
  description: string;
}

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    return entry.isFile() && entry.name.endsWith('.mmd') ? [path] : [];
  });
}

function escapeXml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]!,
  );
}

function accessibleSvg(svg: string, id: string, title: string, description: string): string {
  const opening = svg.match(/^<svg\b([^>]*)>/);
  if (!opening || !/\bviewBox=(['"]).+?\1/.test(opening[0]))
    throw new Error(`Generated SVG is missing a usable viewBox: ${id}`);
  const titleId = `${id}-title`;
  const descriptionId = `${id}-desc`;
  const cleaned = opening[1]!.replace(/\s(?:role|aria-labelledby|width|height)=(['"]).*?\1/g, '');
  const replacement = `<svg${cleaned} width="100%" role="img" aria-labelledby="${titleId} ${descriptionId}"><title id="${titleId}">${escapeXml(title)}</title><desc id="${descriptionId}">${escapeXml(description)}</desc>`;
  return svg.replace(opening[0], replacement);
}

function mindMapPalette(
  svg: string,
  theme: 'light' | 'dark',
  source: string,
  sourcePath: string,
): string {
  const tones = {
    foundations: { fill: '#203e61', edge: '#68aef3' },
    architecture: { fill: '#403666', edge: '#b0a0f7' },
    quality: { fill: '#5b431f', edge: '#f0b54d' },
    evidence: { fill: '#1d503f', edge: '#55c99a' },
    platform: { fill: '#174b5d', edge: '#55bfdc' },
    ai: { fill: '#633d37', edge: '#f28b73' },
  } as const;
  type Tone = keyof typeof tones;
  const text = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  const toneFor = (label: string): Tone => {
    const normalized = text(label);
    if (
      /\b(ai|ia|inteligencia artificial|artificial intelligence|modelo|inferencia)\b/.test(
        normalized,
      )
    )
      return 'ai';
    if (
      /\b(evidencia|learning|aprendizaje|evaluacion|evaluation|testing|prueba|verification|verificacion)\b/.test(
        normalized,
      )
    )
      return 'evidence';
    if (
      /\b(quality|calidad|security|seguridad|performance|rendimiento|restriction|restriccion)\b/.test(
        normalized,
      )
    )
      return 'quality';
    if (
      /\b(platform|plataforma|consumer|consumidor|frontend|implementation|implementacion|product|producto|api)\b/.test(
        normalized,
      )
    )
      return 'platform';
    if (
      /\b(architecture|arquitectura|decision|frontera|boundary|coupling|acoplamiento|design|diseno|scope|alcance)\b/.test(
        normalized,
      )
    )
      return 'architecture';
    return 'foundations';
  };
  const rootIndex = source.split(/\r?\n/).findIndex((line) => /^\s*root\b/.test(line));
  const lines = source.split(/\r?\n/);
  const rootIndent = rootIndex < 0 ? 0 : (lines[rootIndex]!.match(/^\s*/)![0].length ?? 0);
  const branchLabels = lines.slice(rootIndex + 1).flatMap((line) => {
    const match = /^(\s+)(\S.*)$/.exec(line);
    if (!match || match[1]!.length !== rootIndent + 2 || /^%%/.test(match[2]!)) return [];
    return [match[2]!.replace(/::icon\([^)]*\)/g, '').trim()];
  });
  const localized = sourcePath.endsWith('-es.mmd');
  const labels = {
    foundations: localized ? 'Fundamentos' : 'Foundations',
    architecture: localized ? 'Arquitectura' : 'Architecture',
    quality: localized ? 'Calidad y restricciones' : 'Quality and constraints',
    evidence: localized ? 'Evidencia y aprendizaje' : 'Evidence and learning',
    platform: localized ? 'Plataforma y producto' : 'Platform and product',
    ai: localized ? 'Ingeniería de IA' : 'AI engineering',
  } satisfies Record<Tone, string>;
  const branchTones = branchLabels.map(toneFor);
  const usedTones = [...new Set(branchTones)];
  const legendItems = usedTones
    .map((tone, index) => {
      const previousWidth = usedTones
        .slice(0, index)
        .reduce((sum, previousTone) => sum + 30 + labels[previousTone].length * 7.2, 0);
      const x = 18 + previousWidth;
      return `<g class="diagram-legend-item"><rect x="${x}" y="0" width="12" height="12" rx="3" fill="${tones[tone].fill}" stroke="${tones[tone].edge}"/><text x="${x + 18}" y="11">${escapeXml(labels[tone])}</text></g>`;
    })
    .join('');
  const legendWidth =
    usedTones.reduce((sum, tone) => sum + 30 + labels[tone].length * 7.2, 0) + 190;
  const viewBox = svg.match(/\bviewBox="([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)"/);
  if (!viewBox) return svg;
  const [, minX, minY, width, height] = viewBox;
  const legendX = Number(minX) + 8;
  const legendY = Number(minY) + Number(height) + 28;
  const rootFill = theme === 'dark' ? '#173954' : '#1d4b70';
  const branchStyles = branchTones
    .map(
      (tone, index) =>
        `#my-svg.mindmapDiagram .mindmap-node.section-${index} .node-bkg,#my-svg.mindmapDiagram .mindmap-node.section-${index} path,#my-svg.mindmapDiagram .mindmap-node.section-${index} rect,#my-svg.mindmapDiagram .mindmap-node.section-${index} circle,#my-svg.mindmapDiagram .mindmap-node.section-${index} polygon{fill:${tones[tone].fill}!important;stroke:${tones[tone].edge}!important;stroke-width:2px!important}#my-svg.mindmapDiagram .mindmap-node.section-${index} .nodeLabel,#my-svg.mindmapDiagram .mindmap-node.section-${index} .nodeLabel p,#my-svg.mindmapDiagram .mindmap-node.section-${index} .nodeLabel span,#my-svg.mindmapDiagram .mindmap-node.section-${index} foreignObject div{color:#f5f8ff!important;fill:#f5f8ff!important}`,
    )
    .join('');
  const legendBackground = theme === 'dark' ? '#151a23' : '#f0f4f8';
  const legendBorder = theme === 'dark' ? '#343e4d' : '#c6d0dc';
  const legendText = theme === 'dark' ? '#b7c1cf' : '#405166';
  const rules = `<style>
    #my-svg.mindmapDiagram{background:${theme === 'dark' ? '#10141c' : '#ffffff'}}
    #my-svg.mindmapDiagram .mindmap-node.section--1 .node-bkg,
    #my-svg.mindmapDiagram .mindmap-node.section--1 path,
    #my-svg.mindmapDiagram .mindmap-node.section--1 rect,
    #my-svg.mindmapDiagram .mindmap-node.section--1 circle,
    #my-svg.mindmapDiagram .mindmap-node.section--1 polygon{fill:${rootFill}!important;stroke:#75c4ed!important;stroke-width:2.5px!important}
    #my-svg.mindmapDiagram .mindmap-node.section--1 .nodeLabel,
    #my-svg.mindmapDiagram .mindmap-node.section--1 .nodeLabel p,
    #my-svg.mindmapDiagram .mindmap-node.section--1 foreignObject div{color:#f5f8ff!important;fill:#f5f8ff!important}
    ${branchStyles}
    #my-svg.mindmapDiagram .mindmap-node .nodeLabel p{margin:0!important;line-height:1.25!important}
    #my-svg.mindmapDiagram .mindmap-node .node-bkg{stroke-width:2px!important}
    #my-svg.mindmapDiagram [class*="section-edge-"]{fill:none!important;stroke:#8395a9!important;stroke-width:2px!important;stroke-dasharray:4 5!important;stroke-linecap:round!important;marker-end:url(#mindmap-arrow)!important}
    #my-svg.mindmapDiagram .node-line-{stroke:transparent!important;marker-end:none!important}
    #my-svg.mindmapDiagram marker path{fill:#8395a9!important;stroke:#8395a9!important}
    #my-svg.mindmapDiagram .mindmap-legend > rect{fill:${legendBackground}!important;stroke:${legendBorder}!important}
    #my-svg.mindmapDiagram .mindmap-legend text{fill:${legendText}!important;font:13px system-ui,sans-serif!important}
    #my-svg.mindmapDiagram .mindmap-legend path{fill:none!important;stroke:#8395a9!important;stroke-dasharray:4 4!important}
    #my-svg.mindmapDiagram .mindmap-legend marker path{fill:#8395a9!important}
  </style>`;
  const relation = localized ? 'Relación jerárquica' : 'Study hierarchy';
  const legend = `<g class="mindmap-legend" role="group" aria-label="${localized ? 'Leyenda de categorías y relaciones' : 'Category and relationship legend'}" font-family="system-ui, sans-serif" font-size="13" fill="${theme === 'dark' ? '#b7c1cf' : '#405166'}"><rect x="${legendX}" y="${legendY - 14}" width="${legendWidth}" height="38" rx="8" fill="${theme === 'dark' ? '#151a23' : '#f0f4f8'}" stroke="${theme === 'dark' ? '#343e4d' : '#c6d0dc'}"/>${legendItems}<path d="M${legendX + legendWidth - 168} ${legendY + 4}h22" stroke="#8395a9" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#mindmap-arrow)"/><text x="${legendX + legendWidth - 138}" y="${legendY + 9}">${escapeXml(relation)}</text></g>`;
  const defs =
    '<defs><marker id="mindmap-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0 0 8 4 0 8z" fill="#94a5b7"/></marker></defs>';
  return svg
    .replace(
      /(<desc\b[^>]*>)([\s\S]*?)(<\/desc>)/,
      `$1$2 ${escapeXml(localized ? 'Los colores agrupan ramas por función; las flechas punteadas indican jerarquía de estudio.' : 'Colors group branches by function; dotted arrows show study hierarchy.')}$3`,
    )
    .replace(
      /\bviewBox="([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)"/,
      `viewBox="${minX} ${minY} ${Math.max(Number(width), legendWidth + 30)} ${Number(height) + 64}"`,
    )
    .replace('</svg>', `${defs}${rules}${legend}</svg>`);
}

function flowDiagramPalette(svg: string, source: string, sourcePath: string): string {
  const rules = `<style>#my-svg .node.default .basic.label-container{fill:#18212c!important;stroke:#50b6e6!important;stroke-width:2px!important}#my-svg .node.default .nodeLabel,#my-svg .node.default .nodeLabel p{color:#edf4f8!important;fill:#edf4f8!important}#my-svg .edgePath .path,#my-svg .flowchart-link,#my-svg .messageLine0,#my-svg .messageLine1,#my-svg .transition{stroke:#8395a9!important;stroke-width:2px!important;stroke-dasharray:5 5!important;stroke-linecap:round!important}#my-svg .marker,#my-svg marker path,#my-svg .arrowheadPath{fill:#8395a9!important;stroke:#8395a9!important}#my-svg .edge-pattern-dashed,#my-svg .edge-pattern-dotted{stroke:#9baabc!important}</style>`;
  const styled = svg.replace('</svg>', `${rules}</svg>`);
  const categories = [...source.matchAll(/^\s*classDef\s+([\w-]+)\s+([^\r\n]+)/gm)].map(
    (match) => ({
      name: match[1]!,
      fill: match[2]!.match(/(?:^|,)\s*fill:\s*(#[\da-fA-F]{3,8})/)?.[1] ?? '#50b6e6',
    }),
  );
  const viewBox = styled.match(/\bviewBox="([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)"/);
  if (!viewBox) return styled;
  const [, minX, minY, width, height] = viewBox;
  const x = Number(minX) + 14;
  const y = Number(minY) + Number(height) + 24;
  const spanishLabels: Record<string, string> = {
    context: 'Contexto',
    decision: 'Decisión',
    evidence: 'Evidencia',
  };
  const legendItems = categories
    .map((category, index) => {
      const itemX =
        x + categories.slice(0, index).reduce((sum, item) => sum + 30 + item.name.length * 7.5, 0);
      const label = sourcePath.endsWith('-es.mmd')
        ? (spanishLabels[category.name] ?? category.name.replace(/[-_]+/g, ' '))
        : category.name.replace(/[-_]+/g, ' ');
      return `<g class="diagram-legend-item"><rect x="${itemX}" y="${y - 10}" width="10" height="10" rx="2" fill="${category.fill}" stroke="${category.fill}"/><text x="${itemX + 16}" y="${y}" fill="#a4adba" font-size="12">${escapeXml(label)}</text></g>`;
    })
    .join('');
  const relationLabel = sourcePath.endsWith('-es.mmd')
    ? 'Relación dirigida'
    : 'Directed relationship';
  const categoryWidth = categories.reduce((sum, item) => sum + 30 + item.name.length * 7.5, 0);
  const relationX = x + categoryWidth + 18;
  const extraWidth = categoryWidth + 18 + relationLabel.length * 7.5 + 48;
  const relation = `<path d="M${relationX} ${y - 4}h20" stroke="#8395a9" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><text x="${relationX + 27}" y="${y}" fill="#a4adba" font-size="12">${escapeXml(relationLabel)}</text>`;
  const legend = `<g class="diagram-legend" role="group" aria-label="${sourcePath.endsWith('-es.mmd') ? 'Leyenda de categorías y relaciones' : 'Category and relationship legend'}" font-family="Arial, sans-serif"><rect x="${Number(minX) + 6}" y="${y - 20}" width="${extraWidth}" height="30" rx="6" fill="#10141c" fill-opacity="0.96"/>${legendItems}${relation}</g>`;
  const withLegend = styled.replace(
    /\bviewBox="([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)"/,
    `viewBox="${minX} ${minY} ${Math.max(Number(width), extraWidth)} ${Number(height) + 44}"`,
  );
  return withLegend.replace('</svg>', `${legend}</svg>`);
}

function isMindMap(source: string): boolean {
  const contents = readFileSync(source, 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  return /^\s*(?:%%[^\n]*\r?\n\s*)*mindmap\b/m.test(contents);
}

export function outputForDiagram(source: string): string {
  return `shared/diagrams/${source.replace(/\.mmd$/, '.svg')}`;
}

export function outputForMobileDiagram(source: string): string {
  return `shared/diagrams/${source.replace(/\.mmd$/, '.mobile.svg')}`;
}

function verticalMobileSource(source: string): string | undefined {
  const frontmatter = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)?.[0] ?? '';
  const content = source.slice(frontmatter.length);
  const direction = /^(\s*(?:flowchart|graph)\s+)(LR|RL)\b/im;
  return direction.test(content)
    ? `${frontmatter}${content.replace(direction, '$1TB')}`
    : undefined;
}

function verticalMobileSequenceSource(source: string): string | undefined {
  if (!/^\s*sequenceDiagram\b/m.test(source)) return;
  const messages = [
    ...source.matchAll(/^\s*([\w-]+)\s*(-->>|->>|-->|->|--x|-x|--)\s*([\w-]+)\s*:\s*(.+?)\s*$/gm),
  ];
  if (messages.length === 0) return;
  const participants = new Map<string, string>();
  for (const [, id, alias] of source.matchAll(
    /^\s*(?:participant|actor)\s+([\w-]+)(?:\s+as\s+(.+?))?\s*$/gm,
  ))
    participants.set(id!, alias?.trim() ?? id!);
  const nodes = messages.map(([, sender, arrow, receiver, label], index) => {
    const from = participants.get(sender!) ?? sender!;
    const to = participants.get(receiver!) ?? receiver!;
    const direction = arrow!.includes('x') ? '✕' : arrow!.startsWith('--') ? '⇢' : '→';
    const message = label!.replace(/"/g, "'").replace(/\[/g, '(').replace(/\]/g, ')');
    return `  message${index + 1}["${index + 1}. ${from} ${direction} ${to}<br/>${message}"]`;
  });
  const links = messages
    .slice(1)
    .map((_, index) => `  message${index + 1} --> message${index + 2}`);
  return ['flowchart TB', ...nodes, ...links].join('\n');
}

export function generateInlineMobileDiagrams(
  root: string,
  sessions: Record<'es' | 'en', string>,
  generatedRoot: string,
): { assets: Map<string, string>; files: string[] } {
  const cli = resolve(root, 'node_modules/.bin/mmdc');
  const puppeteerConfig = resolve(root, 'site/tooling/puppeteer.config.json');
  const assets = new Map<string, string>();
  const files: string[] = [];
  const decodeHtml = (value: string) =>
    value
      .replace(/&#(x[\da-f]+|\d+);/gi, (_entity, code: string) =>
        String.fromCodePoint(
          code[0]?.toLowerCase() === 'x' ? Number.parseInt(code.slice(1), 16) : Number(code),
        ),
      )
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;|&#39;/g, "'")
      .replace(/&amp;/g, '&');

  for (const lang of ['es', 'en'] as const) {
    for (const match of sessions[lang].matchAll(
      /<figure\b([^>]*\bdata-diagram="([^"]+)"[^>]*)>([\s\S]*?)<\/figure>/gi,
    )) {
      const [, , diagramId, figure] = match;
      const code = figure!.match(/<code\b[^>]*>([\s\S]*?)<\/code>/i)?.[1];
      if (!code) continue;
      const authoredSource = decodeHtml(code);
      const mobileSource =
        verticalMobileSource(authoredSource) ?? verticalMobileSequenceSource(authoredSource);
      if (!mobileSource) continue;

      const safeId = diagramId!.replace(/[^\w-]/g, '-');
      const input = resolve(generatedRoot, `inline-source/${lang}-${safeId}.mmd`);
      const relativeOutput = `inline/${lang}/${safeId}.mobile.svg`;
      const output = resolve(generatedRoot, relativeOutput);
      mkdirSync(dirname(input), { recursive: true });
      mkdirSync(dirname(output), { recursive: true });
      writeFileSync(input, mobileSource);
      const result = spawnSync(
        cli,
        [
          '--quiet',
          '--puppeteerConfigFile',
          puppeteerConfig,
          '--input',
          input,
          '--output',
          output,
          '--backgroundColor',
          'transparent',
        ],
        { cwd: root, encoding: 'utf8' },
      );
      try {
        if (result.status !== 0 || !existsSync(output))
          throw new Error(
            `Inline Mermaid mobile conversion failed for ${lang}/${diagramId}: ${result.stderr || result.stdout || `exit ${result.status}`}`,
          );
        const svgText = readFileSync(output, 'utf8');
        const authoredSvg = figure!.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/i)?.[1] ?? '';
        const title = decodeHtml(
          authoredSvg.match(/<title\b[^>]*>([\s\S]*?)<\/title>/)?.[1] ??
            figure!.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1] ??
            diagramId!,
        );
        const description = decodeHtml(
          authoredSvg.match(/<desc\b[^>]*>([\s\S]*?)<\/desc>/)?.[1] ?? title,
        );
        const uniqueId = `pa-s001-${lang}-${safeId}-mobile`;
        const accessible = accessibleSvg(svgText, uniqueId, title, description);
        const styled = flowDiagramPalette(
          accessible,
          mobileSource,
          `PA-S001/${safeId}-${lang}.mmd`,
        );
        writeFileSync(output, styled);
        assets.set(`${lang}:${diagramId}`, `shared/diagrams/inline/${safeId}.mobile.svg`);
        files.push(relativeOutput);
      } finally {
        rmSync(input, { force: true });
      }
    }
  }
  return { assets, files };
}

export function hasMobileDiagramVariant(root: string, source: string): boolean {
  const input = resolve(root, 'site/shared/diagrams', source);
  return existsSync(input) && verticalMobileSource(readFileSync(input, 'utf8')) !== undefined;
}

export function diagramMetadata(pages: Page[]): Map<string, DiagramMetadata> {
  const metadata = new Map<string, DiagramMetadata>();
  const add = (diagram: DiagramMetadata | undefined): void => {
    if (diagram && !metadata.has(diagram.source)) metadata.set(diagram.source, diagram);
  };
  for (const page of pages) {
    for (const section of page.sections) add(section.diagram);
    for (const mode of page.visualLearning?.modes ?? [])
      for (const block of mode.blocks) {
        if (block.type === 'diagram') add(block.diagram);
      }
    if (page.kind === 'session')
      for (let i = 1; i <= 6; i++) {
        const number = String(i).padStart(2, '0');
        const source = `PA-S001/theory-${page.lang}-${number}.mmd`;
        const title =
          page.lang === 'es'
            ? `PA-S001 — diagrama de teoría ${i}`
            : `PA-S001 — theory diagram ${i}`;
        const description =
          i === 6
            ? page.lang === 'es'
              ? 'Mapa mental canónico de PA-S001 con 24 conceptos, seis subtemas, Main Topic y síntesis entre dominios.'
              : 'Canonical PA-S001 mind map covering 24 concepts, six subtopics, Main Topic, and cross-domain synthesis.'
            : page.lang === 'es'
              ? 'Diagrama de apoyo de la teoría canónica PA-S001.'
              : 'Supporting diagram from canonical PA-S001 theory.';
        add({ source, title, description });
      }
    if (page.kind === 'session')
      add({
        source: `PA-S001/canonical-map-${page.lang}.mmd`,
        title:
          page.lang === 'es' ? 'PA-S001 — mapa mental de conceptos' : 'PA-S001 — concept mind map',
        description:
          page.lang === 'es'
            ? 'Conceptos y subtemas con etiquetas legibles.'
            : 'Concepts and subtopics with readable labels.',
      });
    if (page.kind === 'session')
      asciiDiagrams[page.lang].forEach((diagram, index) => {
        const source = `PA-S001/ascii-${page.lang}-${String(index + 1).padStart(2, '0')}.mmd`;
        add({ source, title: diagram.caption, description: diagram.caption });
      });
    if (page.kind === 'session')
      add({
        source: `PA-S001/coupling-contract-${page.lang}.mmd`,
        title:
          page.lang === 'es'
            ? 'Acoplamiento: propagación de un cambio de contrato'
            : 'Coupling: contract change propagation',
        description:
          page.lang === 'es'
            ? 'Modelo hipotético: productor cambia title por heading mientras el consumidor conserva el campo antiguo; comparar alternativas.'
            : 'Hypothetical model: producer changes title to heading while consumer keeps the old field; compare alternatives.',
      });
    if (page.kind === 'session')
      add({
        source: `PA-S001/architecture-quality-relation-${page.lang}.mmd`,
        title:
          page.lang === 'es'
            ? 'Relación entre calidad, arquitectura y evidencia'
            : 'Relationship between quality, architecture, and evidence',
        description:
          page.lang === 'es'
            ? 'La cualidad y el contexto influyen en decisiones arquitectónicas; el comportamiento y la descripción orientan evidencia observable.'
            : 'Quality and context inform architectural decisions; behavior and description guide observable evidence.',
      });
    if (page.kind === 'session')
      add({
        source: 'PA-S001/canonical-map.mmd',
        title:
          page.lang === 'es'
            ? 'PA-S001 — mapa de los 24 apartados'
            : 'PA-S001 — map of the 24 sections',
        description:
          page.lang === 'es'
            ? 'Mapa mental de los 17 conceptos, un tema principal y seis subtemas. Las ramas muestran orden de estudio, no causalidad.'
            : 'Mind map of 17 concepts, one main topic and six subtopics. Branches show study order, not causation.',
      });
    if (page.kind === 'session')
      add({
        source: 'PA-S001/foundations.mmd',
        title:
          page.lang === 'es'
            ? 'PA-S001 — mapa mental de fundamentos'
            : 'PA-S001 — foundations mind map',
        description:
          page.lang === 'es'
            ? 'Mapa mental que cubre 24 conceptos, seis subtemas, Main Topic y síntesis entre dominios.'
            : 'Mind map covering 24 concepts, six subtopics, Main Topic, and cross-domain synthesis.',
      });
  }
  for (const lang of ['es', 'en'] as const) {
    const entries =
      lang === 'es'
        ? [
            ['Mapa mental', 'Sistema de diseño, tokens y verificación de accesibilidad.'],
            ['Ciclo del sistema de diseño', 'Necesidad, patrón, publicación, uso y evolución.'],
            [
              'Gobernanza de plataforma',
              'Propuesta, revisión, decisión, migración y retroalimentación.',
            ],
            ['Flujo de tokens', 'Fuente, validación, transformación, consumidores y pruebas.'],
            [
              'Evaluación de accesibilidad',
              'Alcance, criterios, pruebas, hallazgos y revalidación.',
            ],
            [
              'Verificación de accesibilidad',
              'Herramientas, teclado, flujos críticos y corrección.',
            ],
            ['Decisión compartida', 'Necesidad, contrato, publicación, evaluación y evolución.'],
          ]
        : [
            ['Mind map', 'Design system, tokens, and accessibility verification.'],
            ['Design-system cycle', 'Need, pattern, publication, use, and evolution.'],
            ['Platform governance', 'Proposal, review, decision, migration, and feedback.'],
            ['Token flow', 'Source, validation, transformation, consumers, and tests.'],
            ['Accessibility evaluation', 'Scope, criteria, tests, findings, and revalidation.'],
            ['Accessibility verification', 'Tools, keyboard, critical flows, and correction.'],
            ['Shared decision', 'Need, contract, publication, evaluation, and evolution.'],
          ];
    add({
      source: 'PA-S004/mindmap.mmd',
      title: `PA-S004 — ${entries[0]![0]!}`,
      description: entries[0]![1]!,
    });
    for (let index = 1; index <= 6; index++)
      add({
        source: `PA-S004/theory-${lang}-${String(index).padStart(2, '0')}.mmd`,
        title: `PA-S004 — ${entries[index]![0]!}`,
        description: entries[index]![1]!,
      });
    const s005 =
      lang === 'es'
        ? [
            [
              'Mapa mental',
              'Contratos de contenido bilingüe, locale, rutas, accesibilidad, validación y ownership.',
            ],
            [
              'Resolución de locale',
              'Señales de URL, preferencia y navegador resueltas por una política.',
            ],
            [
              'Modelo de contenido',
              'Identidad estable, contenido por idioma, fuentes y estado compartido.',
            ],
            [
              'Flujo de publicación',
              'Resolución, carga, formato, rendering, accesibilidad y validación.',
            ],
          ]
        : [
            [
              'Mind map',
              'Bilingual-content contracts, locale, routes, accessibility, validation, and ownership.',
            ],
            [
              'Locale resolution',
              'URL, preference, and browser signals resolved through a policy.',
            ],
            ['Content model', 'Stable identity, per-language content, sources, and shared state.'],
            [
              'Publication flow',
              'Resolution, loading, formatting, rendering, accessibility, and validation.',
            ],
          ];
    add({
      source: 'PA-S005/mindmap.mmd',
      title: `PA-S005 — ${s005[0]![0]!}`,
      description: s005[0]![1]!,
    });
    for (let index = 1; index <= 3; index++)
      add({
        source: `PA-S005/theory-${lang}-${String(index).padStart(2, '0')}.mmd`,
        title: `PA-S005 — ${s005[index]![0]!}`,
        description: s005[index]![1]!,
      });
  }
  return metadata;
}

/** Regenerates every checked-in Mermaid asset before the public output is replaced. */
export function generateDiagrams(
  root: string,
  metadata: Map<string, DiagramMetadata>,
  generatedRoot: string,
  onProgress?: (completed: number, total: number) => void,
): string[] {
  const diagramsRoot = resolve(root, 'site/shared/diagrams');
  if (!existsSync(diagramsRoot)) {
    onProgress?.(0, 0);
    return [];
  }
  const sourceFiles = walk(diagramsRoot);
  const sources = new Set(
    sourceFiles.map((path) => relative(diagramsRoot, path).split(sep).join('/')),
  );
  for (const source of metadata.keys())
    if (!sources.has(source))
      throw new Error(`Diagram source is missing: site/shared/diagrams/${source}`);
  const cli = resolve(root, 'node_modules/.bin/mmdc');
  if (!existsSync(cli))
    throw new Error('Mermaid CLI is unavailable. Install dependencies before building diagrams.');
  const puppeteerConfig = resolve(root, 'site/tooling/puppeteer.config.json');
  if (!existsSync(puppeteerConfig)) throw new Error('Mermaid Puppeteer configuration is missing.');
  const mindMaps = new Set(sourceFiles.filter(isMindMap));
  const mobileSources = new Map(
    sourceFiles.flatMap((input) => {
      const source = relative(diagramsRoot, input).split(sep).join('/');
      const vertical = verticalMobileSource(readFileSync(input, 'utf8'));
      return vertical ? [[source, vertical] as const] : [];
    }),
  );
  const total = sourceFiles.length + mindMaps.size + mobileSources.size;
  onProgress?.(0, total);
  let completed = 0;
  for (const input of sourceFiles) {
    const source = relative(diagramsRoot, input).split(sep).join('/');
    const detail = metadata.get(source) ?? {
      source,
      title: 'Mermaid diagram',
      description: 'A diagram generated from the preserved Mermaid source.',
    };
    for (const theme of mindMaps.has(input) ? (['light', 'dark'] as const) : [undefined]) {
      const output = resolve(
        generatedRoot,
        source.replace(/\.mmd$/, theme === 'dark' ? '.dark.svg' : '.svg'),
      );
      const temporary = `${output}.tmp.svg`;
      mkdirSync(dirname(output), { recursive: true });
      rmSync(temporary, { force: true });
      const result = spawnSync(
        cli,
        [
          '--quiet',
          '--puppeteerConfigFile',
          puppeteerConfig,
          '--input',
          input,
          '--output',
          temporary,
          '--backgroundColor',
          'transparent',
        ],
        { cwd: root, encoding: 'utf8' },
      );
      if (result.status !== 0 || !existsSync(temporary)) {
        rmSync(temporary, { force: true });
        throw new Error(
          `Mermaid conversion failed for site/shared/diagrams/${source}: ${result.stderr || result.stdout || `exit ${result.status}`}`,
        );
      }
      try {
        const id = `diagram-${source.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}`;
        let svg = accessibleSvg(
          readFileSync(temporary, 'utf8'),
          id,
          detail.title,
          detail.description,
        );
        if (mindMaps.has(input))
          svg = mindMapPalette(svg, theme ?? 'light', readFileSync(input, 'utf8'), source);
        else svg = flowDiagramPalette(svg, readFileSync(input, 'utf8'), source);
        writeFileSync(temporary, svg);
        renameSync(temporary, output);
        onProgress?.(++completed, total);
      } catch (error) {
        rmSync(temporary, { force: true });
        throw error;
      }
    }
    const mobileSource = mobileSources.get(source);
    if (mobileSource) {
      const mobileInput = resolve(generatedRoot, source.replace(/\.mmd$/, '.mobile.mmd'));
      const output = resolve(generatedRoot, source.replace(/\.mmd$/, '.mobile.svg'));
      const temporary = `${output}.tmp.svg`;
      mkdirSync(dirname(mobileInput), { recursive: true });
      writeFileSync(mobileInput, mobileSource);
      rmSync(temporary, { force: true });
      const result = spawnSync(
        cli,
        [
          '--quiet',
          '--puppeteerConfigFile',
          puppeteerConfig,
          '--input',
          mobileInput,
          '--output',
          temporary,
          '--backgroundColor',
          'transparent',
        ],
        { cwd: root, encoding: 'utf8' },
      );
      try {
        if (result.status !== 0 || !existsSync(temporary))
          throw new Error(
            `Mermaid mobile conversion failed for site/shared/diagrams/${source}: ${result.stderr || result.stdout || `exit ${result.status}`}`,
          );
        const id = `diagram-${source.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}-mobile`;
        const svg = flowDiagramPalette(
          accessibleSvg(readFileSync(temporary, 'utf8'), id, detail.title, detail.description),
          mobileSource,
          source,
        );
        writeFileSync(temporary, svg);
        renameSync(temporary, output);
        onProgress?.(++completed, total);
      } catch (error) {
        rmSync(temporary, { force: true });
        throw error;
      } finally {
        rmSync(mobileInput, { force: true });
      }
    }
  }
  return sourceFiles.flatMap((file) => {
    const output = relative(diagramsRoot, file)
      .replace(/\.mmd$/, '.svg')
      .split(sep)
      .join('/');
    const source = relative(diagramsRoot, file).split(sep).join('/');
    return [
      ...(mindMaps.has(file) ? [output, output.replace(/\.svg$/, '.dark.svg')] : [output]),
      ...(mobileSources.has(source) ? [output.replace(/\.svg$/, '.mobile.svg')] : []),
    ];
  });
}

export function copyDiagrams(
  root: string,
  generatedRoot: string,
  output: string,
  generated: string[],
  pages: Page[],
): void {
  for (const lang of ['es', 'en'] as const) {
    const metadata = diagramMetadata(pages.filter((page) => page.lang === lang));
    const publicRoot = resolve(output, lang, 'shared/diagrams');
    for (const file of generated) {
      const inline = /^inline\/(es|en)\/(.+)$/.exec(file);
      if (inline) {
        if (inline[1] !== lang) continue;
        const source = resolve(generatedRoot, file);
        const destination = resolve(publicRoot, 'inline', inline[2]!);
        if (!destination.startsWith(publicRoot + sep))
          throw new Error(`Invalid inline diagram output: ${file}`);
        mkdirSync(dirname(destination), { recursive: true });
        writeFileSync(destination, readFileSync(source));
        continue;
      }
      const source = resolve(generatedRoot, file);
      const destination = resolve(publicRoot, file);
      if (!destination.startsWith(publicRoot + sep))
        throw new Error(`Invalid diagram output: ${file}`);
      mkdirSync(dirname(destination), { recursive: true });
      let svg = readFileSync(source, 'utf8');
      const sourcePath = file.replace(/(?:\.(?:mobile|dark))?\.svg$/, '.mmd');
      const detail = metadata.get(sourcePath);
      if (detail)
        svg = svg
          .replace(/(<title\b[^>]*>).*?(<\/title>)/s, `$1${escapeXml(detail.title)}$2`)
          .replace(/(<desc\b[^>]*>).*?(<\/desc>)/s, `$1${escapeXml(detail.description)}$2`);
      const diagramSource = readFileSync(resolve(root, 'site/shared/diagrams', sourcePath), 'utf8');
      const spanishLabels: Record<string, string> = {
        context: 'Contexto',
        decision: 'Decisión',
        evidence: 'Evidencia',
      };
      const legendLabels = [...diagramSource.matchAll(/^\s*classDef\s+([\w-]+)\s+/gm)].map(
        (match) =>
          lang === 'es'
            ? (spanishLabels[match[1]!] ?? match[1]!.replace(/[-_]+/g, ' '))
            : match[1]!.replace(/[-_]+/g, ' '),
      );
      if (legendLabels.length) {
        const legendDescription = lang === 'es' ? 'Leyenda de colores' : 'Color legend';
        const accessibleLegend = `${legendDescription}: ${legendLabels.join(', ')}.`;
        svg = svg.replace(
          /(<desc\b[^>]*>)([\s\S]*?)(<\/desc>)/,
          `$1$2 ${escapeXml(accessibleLegend)}$3`,
        );
      }
      writeFileSync(destination, svg);
    }
  }
}
