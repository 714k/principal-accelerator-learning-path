# PA-S001 — Design → Build → Prove → Think → Publish

## Design
Experimental baseline: Node 24 + TypeScript static generation, no runtime dependencies.
site/ owns bilingual public content; apps/book renders it; data/ and artifacts/ are not
copied automatically. Only four page.json sources and one CSS source enter the build.
The initial chapter is an explicitly marked editorial synthesis, not a claim that the
full Theory Phase has been published. Extend it using CODEX-PA-S001.md.

## Ownership / mode: Scaffold
CODEX-OWNED: setup, routing, responsive shell, content rendering, quality tooling,
bilingual editorial transcription and citations, execution reports.
LEARNER-OWNED: quality priorities, boundary rationale, architecture comparison,
ADR acceptance, failure diagnosis, mastery answers, evidence interpretation.

## Prove
npm run check
npm run dev
Open /es/, /en/, both session routes and both project routes.
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
PA-S001: Partial. Artifact: runnable scaffold and bilingual editorial draft.
Mastery: pending evidence. Measurements: only actual recorded commands.
Revisit: full chapter publication, learner ADR, controlled failure, manual accessibility,
final stack review. Next: PA-S002; progression remains non-blocking.
