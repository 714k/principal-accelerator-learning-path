#!/usr/bin/env bash
set -euo pipefail

if (( $# != 1 )); then
  echo 'Usage: bash bootstrap-pa-s001.sh <absolute-or-relative-accelerator-repository-root>' >&2
  exit 2
fi

repo_root="$1"
mkdir -p "$repo_root"
repo_root="$(cd "$repo_root" && pwd)"

write_new() {
  local target="$1"
  mkdir -p "$(dirname "$target")"
  if [[ -e "$target" ]]; then
    echo "Preserved: $target"
    cat >/dev/null
  else
    cat >"$target"
    echo "Created: $target"
  fi
}

if [[ ! -e "$repo_root/.git" ]] && command -v git >/dev/null 2>&1; then
  git -C "$repo_root" init -q
  echo "Initialized Git: $repo_root"
fi

mkdir -p "$repo_root/apps/portfolio" "$repo_root/site/es/sessions/PA-S001" \
  "$repo_root/site/en/sessions/PA-S001" "$repo_root/site/es/projects/engineering-book" \
  "$repo_root/site/en/projects/engineering-book" "$repo_root/site/shared/diagrams/PA-S001" \
  "$repo_root/site/shared/assets" "$repo_root/docs/architecture" \
  "$repo_root/data/architecture" "$repo_root/artifacts/PA-S001" "$repo_root/scripts"

write_new "$repo_root/package.json" <<'EOF'
{
  "name": "principal-accelerator",
  "private": true,
  "scripts": {
    "dev:site": "node scripts/serve.mjs site 4173",
    "dev:portfolio": "node scripts/serve.mjs apps/portfolio 4174",
    "build": "node scripts/build-scaffold.mjs",
    "check": "node scripts/check-scaffold.mjs"
  }
}
EOF

write_new "$repo_root/scripts/serve.mjs" <<'EOF'
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
const root = resolve(process.argv[2] ?? 'site');
const port = Number(process.argv[3] ?? 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const path = resolve(root, '.' + pathname);
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const target = (await stat(path)).isDirectory() ? resolve(path, 'index.html') : path;
    const body = await readFile(target);
    res.writeHead(200, { 'content-type': mime[extname(target)] ?? 'application/octet-stream' }).end(body);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
EOF

write_new "$repo_root/scripts/build-scaffold.mjs" <<'EOF'
import { cp, mkdir } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await cp('site', 'dist/site', { recursive: true, force: true });
await cp('apps/portfolio', 'dist/portfolio', { recursive: true, force: true });
console.log('Provisional static copy built. Codex must add the canonical Mermaid → SVG/content pipeline and full checks before publication.');
EOF

write_new "$repo_root/scripts/check-scaffold.mjs" <<'EOF'
console.error('PA-S001 is only scaffolded. Complete the Codex prompt, implement canonical checks, inspect generated HTML, then report results.');
process.exitCode = 1;
EOF

write_new "$repo_root/site/shared/assets/base.css" <<'EOF'
:root { color-scheme: light dark; font: 1rem/1.55 system-ui, sans-serif; }
body { max-width: 78rem; margin: auto; padding: 1rem; overflow-wrap: anywhere; }
nav a, main a { margin-inline-end: 1rem; }
main { max-width: 72ch; }
fieldset { margin-block: 1.5rem; }
input, button { font: inherit; }
:focus-visible { outline: 3px solid #078699; outline-offset: 3px; }
.session-diagram { display: block; width: 100%; max-width: 100%; height: auto; }
@media (min-width: 60rem) { body { padding: 2rem; } }
EOF

write_new "$repo_root/site/shared/assets/study.js" <<'EOF'
document.querySelectorAll('input[data-study-id]').forEach(control => {
  const key = 'pa-study-v1:' + control.dataset.studyId;
  try { control.checked = localStorage.getItem(key) === '1'; } catch { /* still operable in this page */ }
  control.addEventListener('change', () => {
    try { localStorage.setItem(key, control.checked ? '1' : '0'); }
    catch { document.querySelector('[data-storage-status]').textContent = 'Study state could not be saved on this device.'; }
  });
});
EOF

for language in es en; do
  if [[ "$language" == es ]]; then
    title='Panel de aprendizaje'; status='PA-S001: no iniciada'; study='Actividad de estudio'; evidence='Dominio con evidencia: sin registros'; artifacts='Artefactos: pendientes'; revisits='Revisitas: ninguna registrada'; systems='Sistemas: P0 por iniciar'; activity='Siguiente actividad: PA-S001'; exercise='Dibujar los límites de P0'; mastery='Explicar ingeniería frente a arquitectura'; project='Proyecto Engineering Book'; sessions='Sesiones'; note='Borrador de andamiaje: completar teoría y estudio visual antes de publicar.'; other='en';
  else
    title='Learning dashboard'; status='PA-S001: Not started'; study='Study activity'; evidence='Evidence-backed mastery: no records'; artifacts='Artifacts: pending'; revisits='Revisits: none recorded'; systems='Systems: P0 to start'; activity='Next activity: PA-S001'; exercise='Draw P0 boundaries'; mastery='Explain engineering versus architecture'; project='Engineering Book project'; sessions='Sessions'; note='Scaffold draft: complete theory and Visual Learning Studio before publishing.'; other='es';
  fi
  write_new "$repo_root/site/$language/index.html" <<EOF
<!doctype html><html lang="$language"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>$title — Principal Accelerator Learning Path</title><link rel="stylesheet" href="/shared/assets/base.css"><body><header><strong>Principal Accelerator Learning Path</strong><nav aria-label="Global"><a href="/$language/">$language</a><a href="/$other/">$other</a><a href="/$language/sessions/">$sessions</a><a href="/$language/projects/engineering-book/">$project</a></nav></header><main><h1>$title</h1><section aria-label="Roadmap progress"><h2>F0</h2><p>$status</p></section><section aria-label="Study tracking"><h2>$study</h2><p>0 recorded in this browser until you use the session controls.</p></section><section aria-label="Evidence"><h2>$evidence</h2><p>$artifacts</p></section><section aria-label="Revisits"><h2>$revisits</h2></section><section aria-label="Projects"><h2>$systems</h2></section><section aria-label="Activity"><h2>$activity</h2></section><p>$note</p></main></body></html>
EOF
  write_new "$repo_root/site/$language/sessions/index.html" <<EOF
<!doctype html><html lang="$language"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>$sessions</title><link rel="stylesheet" href="/shared/assets/base.css"><body><header><a href="/$language/">Principal Accelerator Learning Path</a></header><main><h1>$sessions</h1><nav aria-label="F0"><a href="/$language/sessions/PA-S001/">PA-S001</a></nav></main></body></html>
EOF
  write_new "$repo_root/site/$language/sessions/PA-S001/index.html" <<EOF
<!doctype html><html lang="$language"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PA-S001</title><link rel="stylesheet" href="/shared/assets/base.css"><body><header><a href="/$language/">Principal Accelerator Learning Path</a><nav aria-label="Languages"><a href="/es/sessions/PA-S001/">es</a><a href="/en/sessions/PA-S001/">en</a></nav></header><main><nav aria-label="Breadcrumb"><a href="/$language/">Home</a> / <a href="/$language/sessions/">$sessions</a> / PA-S001</nav><h1>PA-S001</h1><p>$note</p><details><summary>Contents</summary><a href="#exercise">$study</a></details><section id="exercise"><h2>$study</h2><label><input type="checkbox" data-study-id="PA-S001:exercise:product-boundaries"> $exercise</label><br><label><input type="checkbox" data-study-id="PA-S001:mastery:engineering-architecture"> $mastery</label><p data-storage-status role="status"></p><p>These controls track study activity only; they do not award L1–L5 or change canonical progress.</p></section></main><script defer src="/shared/assets/study.js"></script></body></html>
EOF
  write_new "$repo_root/site/$language/projects/engineering-book/index.html" <<EOF
<!doctype html><html lang="$language"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>$project</title><link rel="stylesheet" href="/shared/assets/base.css"><body><header><a href="/$language/">Principal Accelerator Learning Path</a></header><main><h1>$project</h1><p>$note</p><a href="/$language/sessions/PA-S001/">PA-S001</a></main></body></html>
EOF
done

write_new "$repo_root/apps/portfolio/index.html" <<'EOF'
<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Professional portfolio — draft</title><style>body{font:1rem/1.5 system-ui;max-width:70ch;margin:auto;padding:2rem}</style><main><h1>Professional portfolio</h1><p>Initial P0 slice. Profile, selected work and evidence links await learner review.</p><a href="http://localhost:4173/en/">Principal Accelerator Learning Path</a></main></html>
EOF

write_new "$repo_root/site/shared/diagrams/PA-S001/foundations.mmd" <<'EOF'
mindmap
  root((PA-S001: boundaries and evidence))
    Engineering and architecture
    Application system platform ecosystem
    Quality attributes and constraints
    Boundaries and contracts
    Coupling and cohesion
    Frontend Platform Architecture
    AI Product Engineering
    Staff Principal and evidence
EOF

write_new "$repo_root/docs/architecture/technology-radar.md" <<'EOF'
# Technology Radar — initial draft

This is not an accepted architecture decision. Review existing technology choices before changing categories.

| Technology | Provisional scope | Category | Decision owner |
|---|---|---|---|
| TypeScript | Accelerator apps | ADOPT proposed in Project Sources | Learner review |
| Node.js | Build/development | ADOPT proposed in Project Sources | Learner review |
| React | Portfolio | TRIAL candidate only | Learner review |
| Astro | Learning Site | TRIAL candidate only | Learner review |

Do not treat a candidate as approval to install it.
EOF

write_new "$repo_root/artifacts/PA-S001/README.md" <<'EOF'
# PA-S001 evidence

Scaffold only. No test results, metrics, mastery, or architectural decision have been demonstrated.
EOF

echo
echo 'Provisional P0 scaffold is ready. Existing files were preserved.'
echo "Run: cd '$repo_root' && npm run dev:site"
echo 'Open http://localhost:4173/es/ and http://localhost:4173/en/'
echo "In another terminal: cd '$repo_root' && npm run dev:portfolio"
echo 'Open http://localhost:4174/'
echo 'Then paste PA-S001-CODEX-PROMPT.md into Codex. npm run check intentionally fails until canonical implementation and verification are completed.'
