# PA-S001 — Design → Build → Prove → Think → Publish

## Design
Experimental baseline: Node 24 + TypeScript static generation, no application runtime dependencies. This remains a reversible implementation proposal for learner review.
site/ owns bilingual public content in explicitly allowlisted page metadata and paired canonical
`site/content/canonical/PA-S001-session-{es,en}.html` sources; site/tooling wraps the supplied session
structure in the shared site shell and stylesheet; apps/portfolio supplies a
separate draft portfolio route; data/ and artifacts/ are not copied automatically.
Only selected bilingual page.json metadata, the paired learner-supplied canonical session files, the
portfolio renderer, CSS, study-state script, and compiled Mermaid SVG enter the public build. The generator runs from
`site/tooling/`; `apps/book/` remains historical and is outside the active workspace.
The bilingual PA-S001 source publishes 18 numbered article sections, seven nested subtopics, interactive widgets, and study checks. The table of contents is the session structure and appears once. The dashboard tracks four exercises and eight progress checks from canonical project data. Session-local study checkboxes never change canonical progress or evidence-backed mastery.

The site stylesheet, design tokens, navigation, responsive behavior, and Light/Dark themes take precedence over styles embedded in learner-supplied files. PA-S001 uses those shared site styles; the source document's inline stylesheet is excluded from the build. Supplied inline diagrams remain in the session HTML. The build does not establish learner mastery, semantic translation review, or production readiness.

The previous `PA-S001-theory-{es,en}.md` files remain as historical source material; they are not routed or published by the current PA-S001 build. The new English HTML is a working translation and still requires semantic editorial review. PA-S001 remains an editorial draft.

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
The browser review in `artifacts/PA-S001/verification-2026-10-19.md` predates the supplied HTML replacement and does not verify the current PA-S001 content. Automated checks are not a WCAG conformance audit; review the revised page visually and with keyboard/touch before publication.
For a subdirectory: BASE_PATH=/accelerator/ npm run build
BASE_PATH=/accelerator/ npm run preview
Serve dist/ under that prefix in the final host.

## Publish
Review public content and semantic ES/EN parity before hosting dist/.
Do not publish private evidence, Project Sources, credentials, or employer material.
The script does not deploy, add a remote, or create a commit.

## Progress proposal (not an automatic mutation of Project Sources)
PA-S001 remains Not started in `07-PROGRESS.md`. The runnable scaffold, separate portfolio draft, and bilingual theory are publication artifacts, not learner mastery evidence. Measurements: only actual recorded commands.
Revisit: learner ADR, controlled failure, semantic review, manual accessibility, and final
stack review. Next: PA-S002; progression remains non-blocking.
