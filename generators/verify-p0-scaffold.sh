#!/usr/bin/env bash
set -euo pipefail

# Verifies the non-destructive PA-S001 P0 adaptation in an existing checkout.
# It creates no content, accepts no learner decisions, and never removes files.
repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repository_root"

required=(
  "apps/book/src/build.ts"
  "apps/portfolio/src/portfolio.ts"
  "site/es/sessions/PA-S001/page.json"
  "site/en/sessions/PA-S001/page.json"
  "site/es/projects/p0/page.json"
  "site/en/projects/p0/page.json"
  "data/mastery/PA-S001.json"
  "artifacts/PA-S001/ADR-001-template.md"
)

for path in "${required[@]}"; do
  [[ -f "$path" ]] || { echo "Missing PA-S001 scaffold file: $path" >&2; exit 1; }
done

npm run check
echo "P0 scaffold verified. Learner-owned ADR, failure diagnosis, and mastery remain pending."
