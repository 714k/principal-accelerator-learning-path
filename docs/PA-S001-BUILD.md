# PA-S001 — Design → Build → Prove → Think → Publish

## Design
Experimental baseline: Node 24 + TypeScript static generation, no application runtime dependencies. This remains a reversible implementation proposal for learner review.
site/ owns bilingual public content in explicitly allowlisted page metadata and canonical
`theory.md` sources; site/tooling renders it; apps/portfolio supplies a
separate draft portfolio route; data/ and artifacts/ are not copied automatically.
Only selected bilingual page.json metadata, the paired learner-supplied canonical theory files, the
portfolio renderer, CSS, study-state script, and compiled Mermaid SVG enter the public build. The generator runs from
`site/tooling/`; `apps/book/` remains historical and is outside the active workspace.
The PA-S001 chapter publishes all 17 source sections, 24 atomic concepts, six theoretical subtopics, 25 authored flashcards per locale, and the authored decision matrix. The dashboard counts six exercises and six review criteria by their exact ES/EN-shared source IDs. Local checkboxes never change canonical progress or evidence-backed mastery.

The site adapts the checked-in `ui-reference/` neutral surfaces, compact navigation, responsive card grids, disclosure and Light/Dark cues without copying its sample metrics or application dependencies. The 30-second synthesis and three reading levels are presentation of the supplied theory, not newly authored curriculum. The source Mermaid diagrams are compiled to accessible SVG. The build does not establish learner mastery, semantic translation review, or production readiness.

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
The previous browser review in `artifacts/PA-S001/verification-2026-10-10.md` covered the earlier content. Reinspect the current canonical pages after this Build; automated checks are not a WCAG conformance audit.
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
