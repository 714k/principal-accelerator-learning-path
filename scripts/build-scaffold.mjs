import { cp, mkdir } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await cp('site', 'dist/site', { recursive: true, force: true });
await cp('apps/portfolio', 'dist/portfolio', { recursive: true, force: true });
console.log('Provisional static copy built. Codex must add the canonical Mermaid → SVG/content pipeline and full checks before publication.');
