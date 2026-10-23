# PA-S002 repository and tooling decision — draft, not accepted

Decision owner: learner. This document records alternatives and observations for review; it does not establish policy or approve a migration.

## Observed local baseline

The root npm manifest declares `apps/portfolio` as its only workspace; `site/` has no workspace manifest. `site/tooling/build.ts` imports `apps/portfolio/src/portfolio.ts` to emit `/portfolio/`. This is a real build-time cross-product edge and must be accounted for before introducing any rule that rejects imports into portfolio internals. The portfolio manifest is private and has no declared exports. No new shared package has been established by this inventory.

`npm run check` runs lint, typecheck, tests, build, then build-output tests sequentially. During build, Mermaid sources are converted before output is replaced. The GitHub workflow invokes `npm run check` and uploads the static output; its deploy job runs on non-pull-request events. A workflow file does not prove that branch protection or required checks are configured or active.

## Alternatives for learner evaluation

- Retain a monorepo: coordinated changes share history; boundaries and independent publication still need explicit ownership and verification.
- Separate repositories: histories and permissions may be independently managed; coordinated contract changes need cross-repository version and release planning.
- Retain npm workspaces and existing scripts: preserves the current toolchain; task selection and caching remain limited to what is actually implemented.
- Introduce a new orchestrator: may add graph-aware task execution, but needs demonstrated requirements, migration and maintenance costs, and learner approval. No speed or correctness gain is assumed.

## Open decisions and evidence

The learner decides dependency direction, whether and how the existing build-time portfolio edge should become a public contract, ownership and exceptions, toolchain changes, CI governance and branch protection. Compare actual consumers and failure cases before proposing package extraction. Record the scope, owner, expiration and verification for any proposed exception. Local checks are not evidence of learner mastery or a protected branch.
