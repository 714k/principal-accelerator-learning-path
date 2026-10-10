import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, relative, resolve, sep } from 'node:path';
import type { Page } from './content.ts';

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

export function outputForDiagram(source: string): string {
  return `shared/diagrams/${source.replace(/\.mmd$/, '.svg')}`;
}

export function diagramMetadata(pages: Page[]): Map<string, DiagramMetadata> {
  const metadata = new Map<string, DiagramMetadata>();
  for (const page of pages) for (const section of page.sections) if (section.diagram && !metadata.has(section.diagram.source)) {
    metadata.set(section.diagram.source, section.diagram);
  }
  return metadata;
}

/** Regenerates every checked-in Mermaid asset before the public output is replaced. */
export function generateDiagrams(root: string, metadata: Map<string, DiagramMetadata>): string[] {
  const diagramsRoot = resolve(root, 'site/shared/diagrams');
  if (!existsSync(diagramsRoot)) return [];
  const sourceFiles = walk(diagramsRoot);
  const sources = new Set(sourceFiles.map(path => relative(diagramsRoot, path).split(sep).join('/')));
  for (const source of metadata.keys()) if (!sources.has(source)) throw new Error(`Diagram source is missing: site/shared/diagrams/${source}`);
  const cli = resolve(root, 'node_modules/.bin/mmdc');
  if (!existsSync(cli)) throw new Error('Mermaid CLI is unavailable. Install dependencies before building diagrams.');
  const puppeteerConfig = resolve(root, 'apps/book/puppeteer.config.json');
  if (!existsSync(puppeteerConfig)) throw new Error('Mermaid Puppeteer configuration is missing.');
  for (const input of sourceFiles) {
    const source = relative(diagramsRoot, input).split(sep).join('/');
    const output = input.replace(/\.mmd$/, '.svg');
    const temporary = `${output}.tmp.svg`;
    const detail = metadata.get(source) ?? { source, title: 'Mermaid diagram', description: 'A diagram generated from the preserved Mermaid source.' };
    rmSync(temporary, { force: true });
    const result = spawnSync(cli, ['--quiet', '--puppeteerConfigFile', puppeteerConfig, '--input', input, '--output', temporary, '--backgroundColor', 'transparent'], { cwd: root, encoding: 'utf8' });
    if (result.status !== 0 || !existsSync(temporary)) {
      rmSync(temporary, { force: true });
      throw new Error(`Mermaid conversion failed for site/shared/diagrams/${source}: ${result.stderr || result.stdout || `exit ${result.status}`}`);
    }
    try {
      const id = `diagram-${source.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}`;
      writeFileSync(temporary, accessibleSvg(readFileSync(temporary, 'utf8'), id, detail.title, detail.description));
      renameSync(temporary, output);
    } catch (error) {
      rmSync(temporary, { force: true });
      throw error;
    }
  }
  return sourceFiles.map(file => relative(diagramsRoot, file).replace(/\.mmd$/, '.svg').split(sep).join('/'));
}

export function copyDiagrams(root: string, output: string, generated: string[]): void {
  const publicRoot = resolve(output, 'shared/diagrams');
  for (const file of generated) {
    const source = resolve(root, 'site/shared/diagrams', file);
    const destination = resolve(publicRoot, file);
    if (!destination.startsWith(publicRoot + sep)) throw new Error(`Invalid diagram output: ${file}`);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, readFileSync(source));
  }
}
