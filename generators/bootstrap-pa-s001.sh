#!/usr/bin/env bash
set -euo pipefail

# PA-S001 P0 scaffold copier. It creates a new, empty checkout from the
# current verified scaffold; it never overwrites an existing checkout.
#
# Usage: bash generators/bootstrap-pa-s001.sh [target-directory] [--no-install]

target="${1:-principal-engineer-accelerator}"
mode="${2:-}"

if [[ "$target" == "--help" ]]; then
  printf '%s\n' 'Usage: bash generators/bootstrap-pa-s001.sh [target-directory] [--no-install]'
  exit 0
fi

if [[ "$target" == -* || ( -n "$mode" && "$mode" != "--no-install" ) || $# -gt 2 ]]; then
  printf '%s\n' 'Invalid arguments; use --help.' >&2
  exit 2
fi

for tool in node npm git; do
  command -v "$tool" >/dev/null || { printf 'Missing prerequisite: %s\n' "$tool" >&2; exit 1; }
done

node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if(major!==24 || minor<12){console.error("Use Node.js 24.12+ (24.x)");process.exit(1)}'

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
source_root="$(cd "$script_dir/.." && pwd -P)"

if [[ -e "$target" ]]; then
  if [[ ! -d "$target" ]] || [[ -n "$(find "$target" -mindepth 1 -maxdepth 1 -print -quit)" ]]; then
    printf '%s\n' "Refusing to overwrite a non-empty target: $target" >&2
    exit 1
  fi
else
  mkdir -p "$target"
fi

target_root="$(cd "$target" && pwd -P)"
if [[ "$target_root" == "$source_root" ]]; then
  printf '%s\n' 'The scaffold target must be a new directory, not this source checkout.' >&2
  exit 1
fi

# Only explicit tracked inputs are copied. Generated output, dependencies,
# credentials, Git metadata, and private local state are intentionally excluded.
inputs=(
  .gitignore
  .nvmrc
  AGENTS.md
  README.md
  package.json
  package-lock.json
  tsconfig.json
  eslint.config.mjs
  apps/portfolio
  site
  ui-reference
  docs/architecture
  data/mastery/PA-S001.json
  artifacts/PA-S001
  artifacts/adrs/0001-p0-boundaries.md
  docs/PA-S001-BUILD.md
  docs/CODEX-PA-S001.md
  generators/bootstrap-pa-s001.sh
  generators/verify-p0-scaffold.sh
  project-sources
)

for relative in "${inputs[@]}"; do
  source_path="$source_root/$relative"
  [[ -e "$source_path" ]] || { printf 'Missing scaffold input: %s\n' "$relative" >&2; exit 1; }
  destination="$target_root/$relative"
  mkdir -p "$(dirname "$destination")"
  cp -R "$source_path" "$destination"
done

if ! git -C "$target_root" rev-parse --show-toplevel >/dev/null 2>&1; then
  git -C "$target_root" init -q
  printf '%s\n' 'Initialized local Git metadata; no remote or commit was created.'
else
  printf '%s\n' 'Using existing Git metadata; no remote or commit was created.'
fi

cd "$target_root"
if [[ "$mode" == "--no-install" ]]; then
  printf '%s\n' 'Dependencies were not installed. Run npm ci, then npm run check.'
else
  npm ci --no-audit --no-fund
  npm run check
fi

printf 'Ready in: %s\n' "$target_root"
printf '%s\n' 'Next: npm run dev → http://localhost:4173/'
printf '%s\n' 'Then open docs/CODEX-PA-S001.md. This scaffold does not complete the learning session.'
