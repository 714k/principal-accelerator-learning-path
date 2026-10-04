import { readFileSync } from 'node:fs';
export interface Section { id: string; title: string; paragraphs: string[] }
export interface Reference { id: string; title: string; url: string }
export interface Page {
  id: string; lang: 'es' | 'en'; kind: 'session' | 'project'; title: string;
  description: string; status: 'editorial-draft'; sections: Section[]; references: Reference[];
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function validatePage(value: unknown): asserts value is Page {
  if (!record(value) || !['es','en'].includes(String(value.lang)) ||
      !['session','project'].includes(String(value.kind)) || value.status !== 'editorial-draft' ||
      ![value.id,value.title,value.description].every(x => typeof x === 'string' && x.length > 0) ||
      !Array.isArray(value.sections) || value.sections.length === 0 || !Array.isArray(value.references)) {
    throw new Error('Invalid page metadata');
  }
  const ids = new Set<string>();
  for (const s of value.sections) {
    if (!record(s) || typeof s.id !== 'string' || !/^[a-z0-9-]+$/.test(s.id) || ids.has(s.id) ||
        typeof s.title !== 'string' || !Array.isArray(s.paragraphs) || !s.paragraphs.length ||
        !s.paragraphs.every(p => typeof p === 'string' && p.length > 0)) throw new Error('Invalid section');
    ids.add(s.id);
  }
  const refs = new Set<string>();
  for (const r of value.references) {
    if (!record(r) || typeof r.id !== 'string' || !/^[A-Z][0-9]+$/.test(r.id) || refs.has(r.id) ||
        typeof r.title !== 'string' || typeof r.url !== 'string' || new URL(r.url).protocol !== 'https:') {
      throw new Error('Invalid reference');
    }
    refs.add(r.id);
  }
  for (const s of value.sections as Section[]) for (const p of s.paragraphs) {
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
  if (es.lang !== 'es' || en.lang !== 'en' || es.id !== en.id || es.kind !== en.kind ||
      es.sections.map(s=>s.id).join('|') !== en.sections.map(s=>s.id).join('|') ||
      es.references.map(r=>r.id+'='+r.url).join('|') !== en.references.map(r=>r.id+'='+r.url).join('|')) {
    throw new Error('ES/EN structure or references differ; semantic review is still required');
  }
}
