# Principal Accelerator Learning Path — P0

PA-S001 provides an executable, static first slice of two separate public products:

- `apps/portfolio/`: a concise professional portfolio draft. Its Staff role and
  focus areas come from learner-supplied context; public claims await learner review.
- `site/`: bilingual PA-S001 learning content and its static generator in `site/tooling/`.

The renderer is an experimental Node 24 + TypeScript baseline, not a final framework
decision. `site/` is the public content source; `data/`, `artifacts/`, and
`project-sources/` are never copied automatically into `dist/`.
The retired `apps/book/` package remains in repository history but is outside the
active workspace and public architecture.

## Install and run

Requires Node 24.12+ (24.x) and npm.

To initialize a separate empty checkout from this verified scaffold, use:

```bash
bash generators/bootstrap-pa-s001.sh ../principal-engineer-accelerator
```

The companion [Codex handoff](docs/CODEX-PA-S001.md) is intentionally bounded
to mechanical P0 work; it does not make learner-owned architecture decisions.

```bash
npm ci
npm run check
npm run dev
```

`npm run dev` builds first and starts a loopback-only local preview at:

- http://localhost:4173/
- http://localhost:4173/es/sessions/
- http://localhost:4173/es/sessions/PA-S001/
- http://localhost:4173/en/sessions/PA-S001/
- http://localhost:4173/es/projects/
- http://localhost:4173/es/projects/engineering-book/
- http://localhost:4173/es/projects/p0/
- http://localhost:4173/portfolio/

There is intentionally no hot reload; rebuild or restart after changes. `npm run preview`
serves an existing `dist/` directory. It is not a production server.

## Commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run check
BASE_PATH=/accelerator/ npm run build
BASE_PATH=/accelerator/ npm run preview
bash generators/verify-p0-scaffold.sh
```

`npm run check` runs lint, TypeScript checking, Node tests, and the static build. The
tests cover bounded content validation, bilingual structural correspondence, Mermaid
failure paths, study IDs, HTML escaping, subpath links, and rendered navigation/theme markup. They do not certify
accessibility, semantic translation equivalence, production readiness, or learner mastery.

## Static publication

Publish only the generated `dist/` directory after review. Under a subdirectory host,
build and preview with `BASE_PATH=/accelerator/` and serve `dist/` below that exact
prefix. The build refuses to replace a nonempty unmanaged `dist/` and refuses a
symlinked `dist/`. It neither deploys, pushes, nor creates a commit.

`/es/projects/engineering-book/` and `/en/projects/engineering-book/` are active
P0 learning-project routes. `/projects/p0/` remains as a broader P0 overview.

## Pending learner work

The learner owns the ADR decision, quality scenarios, controlled-failure diagnosis,
professional portfolio details, evidence interpretation, and mastery responses.
`data/mastery/PA-S001.json` remains `not-assessed` with null levels. See
`artifacts/PA-S001/ADR-001-template.md`, `artifacts/PA-S001/verification.md`, and
`docs/PA-S001-progress-proposal.md` before recording progress.
