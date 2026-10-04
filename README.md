# Principal Accelerator Learning Path — P0

PA-S001 provides an executable, static first slice of two separate public products:

- `apps/portfolio/`: a concise professional portfolio draft. Confirmed identity, work,
  contact details, metrics, testimonials, and employer information remain learner-owned.
- `site/`: bilingual PA-S001 learning content rendered by the inherited `apps/book/`
  static generator.

The renderer is an experimental Node 24 + TypeScript baseline, not a final framework
decision. `site/` is the public content source; `data/`, `artifacts/`, and
`project-sources/` are never copied automatically into `dist/`.

## Install and run

Requires Node 24.12+ (24.x) and npm.

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
tests cover bounded content validation, bilingual structural correspondence, HTML
escaping, subpath links, and rendered navigation/theme markup. They do not certify
accessibility, semantic translation equivalence, production readiness, or learner mastery.

## Static publication

Publish only the generated `dist/` directory after review. Under a subdirectory host,
build and preview with `BASE_PATH=/accelerator/` and serve `dist/` below that exact
prefix. The build refuses to replace a nonempty unmanaged `dist/` and refuses a
symlinked `dist/`. It neither deploys, pushes, nor creates a commit.

The legacy `/es/projects/engineering-book/` and `/en/projects/engineering-book/` routes
remain generated for compatibility; P0’s current public project route is `/projects/p0/`.

## Pending learner work

The learner owns the ADR decision, quality scenarios, controlled-failure diagnosis,
professional portfolio details, evidence interpretation, and mastery responses.
`data/mastery/PA-S001.json` remains `not-assessed` with null levels. See
`artifacts/PA-S001/ADR-001-template.md`, `artifacts/PA-S001/verification.md`, and
`docs/PA-S001-progress-proposal.md` before recording progress.
