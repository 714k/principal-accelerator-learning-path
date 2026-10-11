#!/usr/bin/env bash
set -euo pipefail

# PA-S001 conservative repository bootstrap.
# Usage: ./bootstrap-pa-s001.sh [repository-root]
# This script creates only missing directories and seed documents. It does not
# install dependencies, overwrite files, choose a framework, or claim evidence.

repo_root="${1:-$PWD}"

if [[ ! -d "$repo_root" ]]; then
  echo "ERROR: repository root does not exist: $repo_root" >&2
  exit 1
fi

repo_root="$(cd "$repo_root" && pwd -P)"

if [[ "$repo_root" == "/" || "$repo_root" == "$HOME" ]]; then
  echo "ERROR: refusing to operate on a broad directory: $repo_root" >&2
  exit 1
fi

cd "$repo_root"

if [[ ! -d .git ]]; then
  git init
  echo "Initialized Git repository at $repo_root"
else
  echo "Using existing Git repository at $repo_root"
fi

directories=(
  "ui-reference"
  "apps/portfolio"
  "site/es/sessions/PA-S001"
  "site/en/sessions/PA-S001"
  "site/es/projects/portfolio"
  "site/en/projects/portfolio"
  "site/shared/diagrams/PA-S001"
  "site/shared/assets"
  "site/shared/data"
  "artifacts/PA-S001"
  "data/architecture"
  "data/mastery"
  "data/metrics"
  "docs/architecture"
  "docs/adr"
  "scripts"
  "tests"
)

for directory in "${directories[@]}"; do
  mkdir -p "$directory"
done

write_if_missing() {
  local target="$1"
  if [[ -e "$target" ]]; then
    echo "Preserved existing $target"
    return
  fi
  shift
  printf '%s\n' "$@" > "$target"
  echo "Created $target"
}

write_if_missing ".gitignore" \
  "node_modules/" \
  "dist/" \
  "coverage/" \
  ".DS_Store" \
  "*.log"

write_if_missing "apps/portfolio/README.md" \
  "# Professional Portfolio" \
  "" \
  "PA-S001 initializes this as the executable professional portfolio." \
  "It is separate from the Principal Accelerator Learning Site under \`site/\`." \
  "" \
  "> Implementation stack and durable architecture decisions remain learner-owned until reviewed."

write_if_missing "site/README.md" \
  "# Principal Accelerator Learning Site" \
  "" \
  "Canonical bilingual learning/theory surface." \
  "The localized home routes are dashboards; session theory does not belong in the portfolio app."

write_if_missing "artifacts/PA-S001/README.md" \
  "# PA-S001 Evidence" \
  "" \
  "Record only evidence actually produced. Do not infer mastery from checklist state."

write_if_missing "docs/adr/ADR-0001-p0-boundaries.md" \
  "# ADR-0001 — P0 product boundaries" \
  "" \
  "- Status: Proposed" \
  "- Session: PA-S001" \
  "" \
  "## Confirmed constraint" \
  "" \
  "\`apps/portfolio/\` is the professional portfolio and \`site/\` is the separate bilingual Learning Site." \
  "" \
  "## Learner-owned analysis" \
  "" \
  "TODO: document forces, alternatives, consequences, quality-attribute scenarios, and the implementation-stack decision after repository inspection."

echo
echo "PA-S001 directory bootstrap complete."
echo "No dependencies were installed and no existing file was overwritten."
echo "Next: open this repository in VS Code and paste PA-S001-CODEX-PROMPT.md into Codex."
