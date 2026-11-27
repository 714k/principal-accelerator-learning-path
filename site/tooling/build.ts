import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  rmSync,
  readdirSync,
  lstatSync,
  mkdtempSync,
} from 'node:fs';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { loadPage, assertPair, assertSessionHtmlPair } from './content.ts';
import {
  copyDiagrams,
  diagramMetadata,
  generateDiagrams,
  generateInlineMobileDiagrams,
} from './diagrams.ts';
import { basePath, renderPage, home, sessionsIndex, projectsIndex } from './render.ts';
import { searchIndex } from './search.ts';
import { renderPortfolio } from '../../apps/portfolio/src/portfolio.ts';
import { renderS002Html, assertS002HtmlPair } from './pa-s002-html.ts';
import { renderS003 } from './pa-s003.ts';
import { renderS004 } from './pa-s004.ts';
import { renderS005 } from './pa-s005.ts';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const output = resolve(root, 'dist');
const base = basePath(process.env.BASE_PATH);
// Validate all inputs before touching output. Only explicit public files are read.
const routes = ['sessions/PA-S001', 'projects/portfolio', 'projects/p0'];
const pairs = routes.map((route) => ({
  route,
  es: loadPage(resolve(root, `site/es/${route}/page.json`)),
  en: loadPage(resolve(root, `site/en/${route}/page.json`)),
}));
for (const p of pairs) assertPair(p.es, p.en);
const sessionPair = pairs.find((pair) => pair.route === 'sessions/PA-S001');
if (!sessionPair) throw new Error('PA-S001 session source is missing');
const sourceSession = {
  es: readFileSync(resolve(root, 'site/content/canonical/PA-S001-session-es.html'), 'utf8'),
  en: readFileSync(resolve(root, 'site/content/canonical/PA-S001-session-en.html'), 'utf8'),
};
assertSessionHtmlPair(sourceSession.es, sourceSession.en);
const s002Html = {
  es: readFileSync(resolve(root, 'site/content/canonical/PA-S002-session-es.html'), 'utf8'),
  en: readFileSync(resolve(root, 'site/content/canonical/PA-S002-session-en.html'), 'utf8'),
};
const s003 = {
  es: readFileSync(resolve(root, 'site/content/canonical/PA-S003-theory-es.md'), 'utf8'),
  en: readFileSync(resolve(root, 'site/content/canonical/PA-S003-theory-en.md'), 'utf8'),
};
const s004 = {
  es: readFileSync(resolve(root, 'site/content/canonical/PA-S004-theory-es.md'), 'utf8'),
  en: readFileSync(resolve(root, 'site/content/canonical/PA-S004-theory-en.md'), 'utf8'),
};
const s005 = {
  es: readFileSync(resolve(root, 'site/content/canonical/PA-S005-theory-es.md'), 'utf8'),
  en: readFileSync(resolve(root, 'site/content/canonical/PA-S005-theory-en.md'), 'utf8'),
};
assertS002HtmlPair(s002Html.es, s002Html.en);
const pages = pairs.flatMap((pair) => [pair.es, pair.en]);
const progress = readFileSync(resolve(root, 'project-sources/07-PROGRESS.md'), 'utf8');
const status = progress.match(
  /Current overall status:\s*(Not started|Partial|Completed|Revisit)/,
)?.[1];
if (!status) throw new Error('Cannot read canonical status from 07-PROGRESS.md');
const systemsStatus = progress.match(
  /Engineering Book \/ Portfolio:\s*(Not started|Partial|Completed|Revisit)/,
)?.[1];
if (!systemsStatus) throw new Error('Cannot read P0 systems status from 07-PROGRESS.md');
const mastery: unknown = JSON.parse(
  readFileSync(resolve(root, 'data/mastery/PA-S001.json'), 'utf8'),
);
if (
  typeof mastery !== 'object' ||
  mastery === null ||
  !('status' in mastery) ||
  typeof mastery.status !== 'string'
)
  throw new Error('Invalid mastery source');
const generatedRoot = mkdtempSync(resolve(tmpdir(), 'pa-s001-diagrams-'));
// Percent represents completed build steps, not elapsed time. One step covers
// validated inputs, each diagram is one step, and one covers output emission.
const showProgress = process.argv.includes('--progress');
let progressLineOpen = false;
let lastLoggedBucket = -1;
function reportProgress(completed: number, total: number, stage: string): void {
  if (!showProgress) return;
  const percent = Math.floor((completed / total) * 100);
  const width = 20,
    filled = Math.floor((percent * width) / 100);
  const line = `Build [${'#'.repeat(filled)}${'-'.repeat(width - filled)}] ${String(percent).padStart(3)}% ${stage}`;
  if (process.stdout.isTTY) {
    process.stdout.write(`\r\x1b[2K${line}`);
    progressLineOpen = true;
  } else {
    const bucket = Math.floor(percent / 10);
    if (bucket !== lastLoggedBucket || percent === 100) {
      console.log(line);
      lastLoggedBucket = bucket;
    }
  }
}
let totalSteps = 2;

try {
  const generatedDiagrams = generateDiagrams(
    root,
    diagramMetadata(pages),
    generatedRoot,
    (completed, total) => {
      totalSteps = total + 2;
      reportProgress(completed + 1, totalSteps, `diagramas ${completed}/${total}`);
    },
  );
  const inlineMobileDiagrams = generateInlineMobileDiagrams(root, sourceSession, generatedRoot);
  generatedDiagrams.push(...inlineMobileDiagrams.files);
  const marker = resolve(output, '.pa-generated');
  if (existsSync(output)) {
    if (lstatSync(output).isSymbolicLink()) throw new Error('Refusing symlink dist');
    if (readdirSync(output).length && !existsSync(marker))
      throw new Error('Refusing to replace unmanaged dist');
    rmSync(output, { recursive: true });
  }
  function emit(relative: string, value: string): void {
    const path = resolve(output, relative);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, value);
  }
  emit('.pa-generated', 'Generated by PA-S001; do not store source files here.\n');
  emit('assets/site.css', readFileSync(resolve(root, 'site/tooling/site.css'), 'utf8'));
  emit(
    'assets/session-ui.css',
    readFileSync(resolve(root, 'site/shared/assets/session-ui.css'), 'utf8'),
  );
  emit(
    'assets/session-ui.js',
    readFileSync(resolve(root, 'site/shared/assets/session-ui.js'), 'utf8'),
  );
  emit('assets/study.js', readFileSync(resolve(root, 'site/shared/assets/study.js'), 'utf8'));
  emit('assets/search.js', readFileSync(resolve(root, 'site/shared/assets/search.js'), 'utf8'));
  emit(
    'assets/concept-explorers.js',
    readFileSync(resolve(root, 'site/shared/assets/concept-explorers.js'), 'utf8'),
  );
  copyDiagrams(root, generatedRoot, output, generatedDiagrams, pages);
  emit('.nojekyll', '');
  emit('index.html', home('es', base, sessionPair.es, status, mastery.status, systemsStatus));
  emit('portfolio/index.html', renderPortfolio(base));
  for (const lang of ['es', 'en'] as const) {
    emit(
      `assets/search-${lang}.json`,
      JSON.stringify(
        searchIndex(
          lang,
          base,
          pairs.map((pair) => ({ route: pair.route, page: pair[lang] })),
          sourceSession[lang],
        ),
      ),
    );
    emit(
      `${lang}/index.html`,
      home(lang, base, sessionPair[lang], status, mastery.status, systemsStatus),
    );
    emit(`${lang}/sessions/index.html`, sessionsIndex(lang, base));
    emit(`${lang}/sessions/PA-S002/index.html`, renderS002Html(s002Html[lang], lang, base));
    emit(`${lang}/sessions/PA-S003/index.html`, renderS003(s003[lang], lang, base));
    emit(`${lang}/sessions/PA-S004/index.html`, renderS004(s004[lang], lang, base));
    emit(`${lang}/sessions/PA-S005/index.html`, renderS005(s005[lang], lang, base));
    emit(`${lang}/projects/index.html`, projectsIndex(lang, base));
    for (const p of pairs) {
      const sessionHtml = p.route === 'sessions/PA-S001' ? sourceSession[lang] : undefined;
      emit(
        `${lang}/${p.route}/index.html`,
        renderPage(p[lang], base, p.route, undefined, sessionHtml, inlineMobileDiagrams.assets),
      );
    }
  }
  reportProgress(totalSteps, totalSteps, 'salida generada');
  if (progressLineOpen) {
    process.stdout.write('\n');
    progressLineOpen = false;
  }
  console.log(
    `Built ${12 + pages.length} HTML pages and ${generatedDiagrams.length} SVG diagram source(s) in ${output}; BASE_PATH=${base}; mastery=${mastery.status}.`,
  );
} finally {
  if (progressLineOpen) process.stdout.write('\n');
  rmSync(generatedRoot, { recursive: true, force: true });
}
