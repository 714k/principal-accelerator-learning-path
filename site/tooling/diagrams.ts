import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, relative, resolve, sep } from 'node:path';
import type { Page } from './content.ts';
import { asciiDiagrams } from './ascii-diagrams.ts';

export interface DiagramMetadata { source: string; title: string; description: string }

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    return entry.isFile() && entry.name.endsWith('.mmd') ? [path] : [];
  });
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[character]!));
}

function accessibleSvg(svg: string, id: string, title: string, description: string): string {
  const opening = svg.match(/^<svg\b([^>]*)>/);
  if (!opening || !/\bviewBox=(['"]).+?\1/.test(opening[0])) throw new Error(`Generated SVG is missing a usable viewBox: ${id}`);
  const titleId = `${id}-title`;
  const descriptionId = `${id}-desc`;
  const cleaned = opening[1]!
    .replace(/\s(?:role|aria-labelledby|width|height)=(['"]).*?\1/g, '');
  const replacement = `<svg${cleaned} width="100%" role="img" aria-labelledby="${titleId} ${descriptionId}"><title id="${titleId}">${escapeXml(title)}</title><desc id="${descriptionId}">${escapeXml(description)}</desc>`;
  return svg.replace(opening[0], replacement);
}

function monochromeMindMap(svg: string): string {
  const rules='<style>.mindmapDiagram .mindmap-node .node-bkg,.mindmapDiagram .mindmap-node path,.mindmapDiagram .mindmap-node rect,.mindmapDiagram .mindmap-node circle,.mindmapDiagram .mindmap-node polygon{fill:#253440!important;stroke:#253440!important}.mindmapDiagram .mindmap-node .nodeLabel,.mindmapDiagram .mindmap-node .nodeLabel p,.mindmapDiagram .mindmap-node span{color:#fff!important;fill:#fff!important}.mindmapDiagram .mindmap-node line{stroke:#fff!important}.mindmapDiagram [class*="section-edge--"],.mindmapDiagram [class*="edge-depth--"]{stroke:#61717d!important}</style>';
  return svg.replace('</svg>',`${rules}</svg>`);
}

export function outputForDiagram(source: string): string {
  return `shared/diagrams/${source.replace(/\.mmd$/, '.svg')}`;
}

export function diagramMetadata(pages: Page[]): Map<string, DiagramMetadata> {
  const metadata = new Map<string, DiagramMetadata>();
  const add = (diagram: DiagramMetadata | undefined): void => {
    if (diagram && !metadata.has(diagram.source)) metadata.set(diagram.source, diagram);
  };
  for (const page of pages) {
    for (const section of page.sections) add(section.diagram);
    for (const mode of page.visualLearning?.modes ?? []) for (const block of mode.blocks) {
      if (block.type === 'diagram') add(block.diagram);
    }
    if (page.kind==='session') for (let i=1;i<=6;i++) {
      const number=String(i).padStart(2,'0'); const source=`PA-S001/theory-${page.lang}-${number}.mmd`;
      const title=page.lang==='es'?`PA-S001 — diagrama de teoría ${i}`:`PA-S001 — theory diagram ${i}`;
      const description=i===6
        ? page.lang==='es'?'Mapa mental canónico de PA-S001 con 24 conceptos, seis subtemas, Main Topic y síntesis entre dominios.':'Canonical PA-S001 mind map covering 24 concepts, six subtopics, Main Topic, and cross-domain synthesis.'
        : page.lang==='es'?'Diagrama de apoyo de la teoría canónica PA-S001.':'Supporting diagram from canonical PA-S001 theory.';
      add({source,title,description});
    }
    if(page.kind==='session')add({
      source:`PA-S001/canonical-map-${page.lang}.mmd`,
      title:page.lang==='es'?'PA-S001 — mapa mental de conceptos':'PA-S001 — concept mind map',
      description:page.lang==='es'?'Conceptos y subtemas con etiquetas legibles.':'Concepts and subtopics with readable labels.'
    });
    if(page.kind==='session')asciiDiagrams[page.lang].forEach((diagram,index)=>{
      const source=`PA-S001/ascii-${page.lang}-${String(index+1).padStart(2,'0')}.mmd`;
      add({source,title:diagram.caption,description:diagram.caption});
    });
    if(page.kind==='session')add({
      source:`PA-S001/coupling-contract-${page.lang}.mmd`,
      title:page.lang==='es'?'Acoplamiento: propagación de un cambio de contrato':'Coupling: contract change propagation',
      description:page.lang==='es'
        ?'Modelo hipotético: productor cambia title por heading mientras el consumidor conserva el campo antiguo; comparar alternativas.'
        :'Hypothetical model: producer changes title to heading while consumer keeps the old field; compare alternatives.'
    });
    if(page.kind==='session')add({
      source:'PA-S001/canonical-map.mmd',
      title:page.lang==='es'?'PA-S001 — mapa de los 24 apartados':'PA-S001 — map of the 24 sections',
      description:page.lang==='es'
        ?'Mapa mental de los 17 conceptos, un tema principal y seis subtemas. Las ramas muestran orden de estudio, no causalidad.'
        :'Mind map of 17 concepts, one main topic and six subtopics. Branches show study order, not causation.'
    });
    if(page.kind==='session')add({
      source:'PA-S001/foundations.mmd',
      title:page.lang==='es'?'PA-S001 — mapa mental de fundamentos':'PA-S001 — foundations mind map',
      description:page.lang==='es'
        ?'Mapa mental que cubre 24 conceptos, seis subtemas, Main Topic y síntesis entre dominios.'
        :'Mind map covering 24 concepts, six subtopics, Main Topic, and cross-domain synthesis.'
    });
  }
  return metadata;
}

/** Regenerates every checked-in Mermaid asset before the public output is replaced. */
export function generateDiagrams(root: string, metadata: Map<string, DiagramMetadata>, generatedRoot: string): string[] {
  const diagramsRoot = resolve(root, 'site/shared/diagrams');
  if (!existsSync(diagramsRoot)) return [];
  const sourceFiles = walk(diagramsRoot);
  const sources = new Set(sourceFiles.map(path => relative(diagramsRoot, path).split(sep).join('/')));
  for (const source of metadata.keys()) if (!sources.has(source)) throw new Error(`Diagram source is missing: site/shared/diagrams/${source}`);
  const cli = resolve(root, 'node_modules/.bin/mmdc');
  if (!existsSync(cli)) throw new Error('Mermaid CLI is unavailable. Install dependencies before building diagrams.');
  const puppeteerConfig = resolve(root, 'site/tooling/puppeteer.config.json');
  if (!existsSync(puppeteerConfig)) throw new Error('Mermaid Puppeteer configuration is missing.');
  for (const input of sourceFiles) {
    const source = relative(diagramsRoot, input).split(sep).join('/');
    const output = resolve(generatedRoot, source.replace(/\.mmd$/, '.svg'));
    const temporary = `${output}.tmp.svg`;
    const detail = metadata.get(source) ?? { source, title: 'Mermaid diagram', description: 'A diagram generated from the preserved Mermaid source.' };
    mkdirSync(dirname(output),{recursive:true});
    rmSync(temporary, { force: true });
    const result = spawnSync(cli, ['--quiet', '--puppeteerConfigFile', puppeteerConfig, '--input', input, '--output', temporary, '--backgroundColor', 'transparent'], { cwd: root, encoding: 'utf8' });
    if (result.status !== 0 || !existsSync(temporary)) {
      rmSync(temporary, { force: true });
      throw new Error(`Mermaid conversion failed for site/shared/diagrams/${source}: ${result.stderr || result.stdout || `exit ${result.status}`}`);
    }
    try {
      const id = `diagram-${source.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}`;
      let svg=accessibleSvg(readFileSync(temporary, 'utf8'), id, detail.title, detail.description);
      if (source.endsWith('theory-es-06.mmd') || source.endsWith('theory-en-06.mmd') || source==='PA-S001/foundations.mmd' || source==='PA-S001/canonical-map.mmd') svg=monochromeMindMap(svg);
      writeFileSync(temporary, svg);
      renameSync(temporary, output);
    } catch (error) {
      rmSync(temporary, { force: true });
      throw error;
    }
  }
  return sourceFiles.map(file => relative(diagramsRoot, file).replace(/\.mmd$/, '.svg').split(sep).join('/'));
}

export function copyDiagrams(generatedRoot: string, output: string, generated: string[], pages: Page[]): void {
  for (const lang of ['es','en'] as const) {
    const metadata=diagramMetadata(pages.filter(page=>page.lang===lang));
    const publicRoot = resolve(output, lang, 'shared/diagrams');
    for (const file of generated) {
      const source = resolve(generatedRoot, file);
      const destination = resolve(publicRoot, file);
      if (!destination.startsWith(publicRoot + sep)) throw new Error(`Invalid diagram output: ${file}`);
      mkdirSync(dirname(destination), { recursive: true });
      let svg=readFileSync(source,'utf8');
      const detail=metadata.get(file.replace(/\.svg$/,'.mmd'));
      if (detail) svg=svg.replace(/(<title\b[^>]*>).*?(<\/title>)/s,`$1${escapeXml(detail.title)}$2`).replace(/(<desc\b[^>]*>).*?(<\/desc>)/s,`$1${escapeXml(detail.description)}$2`);
      writeFileSync(destination,svg);
    }
  }
}
