# PA-S001 — Design → Build → Prove → Think → Publish

## Design
Experimental baseline: Node 24 + TypeScript static generation, no runtime dependencies.
site/ owns bilingual public content; apps/book renders it; apps/portfolio supplies a
separate draft portfolio route; data/ and artifacts/ are not copied automatically.
Only explicit bilingual page.json sources, the portfolio renderer, and one CSS source
enter the build.
The PA-S001 chapter covers the required publishing sections as an explicitly marked
editorial synthesis. It does not establish learner mastery, semantic translation review,
or production readiness.

## Ownership / mode: Scaffold
CODEX-OWNED: setup, routing, responsive shell, content rendering, quality tooling,
bilingual editorial transcription and citations, execution reports.
LEARNER-OWNED: quality priorities, boundary rationale, architecture comparison,
ADR acceptance, failure diagnosis, mastery answers, evidence interpretation.

## Prove
npm run check
npm run dev
Open /es/, /en/, both session routes, both P0 project routes, and /portfolio/.
Review keyboard navigation, focus, mobile layout, and system color scheme manually.
No automated accessibility test has been supplied or claimed.
For a subdirectory: BASE_PATH=/accelerator/ npm run build
BASE_PATH=/accelerator/ npm run preview
Serve dist/ under that prefix in the final host.

## Publish
Review public content and semantic ES/EN parity before hosting dist/.
Do not publish private evidence, Project Sources, credentials, or employer material.
The script does not deploy, add a remote, or create a commit.

## Progress proposal (not an automatic mutation of Project Sources)
PA-S001: Partial. Artifact: runnable scaffold, separate portfolio draft, and bilingual editorial draft.
Mastery: pending evidence. Measurements: only actual recorded commands.
Revisit: learner ADR, controlled failure, semantic review, manual accessibility, and final
stack review. Next: PA-S002; progression remains non-blocking.
