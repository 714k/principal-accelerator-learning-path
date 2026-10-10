# PA-S001 — Codex build handoff

Paste the following prompt into Codex from the root of the Accelerator repository.

```text
Continue PA-S001 from Design → Build for this existing Accelerator repository.

Before editing, read AGENTS.md, docs/PA-S001-BUILD.md, and every file under
project-sources/. Inspect git status and preserve all existing user changes.

Scope: complete only Codex-owned mechanical P0 work. Maintain the separate
products: site/tooling/ renders the bilingual public learning site from explicit
site/es/ and site/en/ page.json sources; apps/portfolio/ renders a separate
draft portfolio route. Keep data/, artifacts/, project-sources/, credentials,
and employer material out of dist/. Do not create a diagnostic app.

Required scaffold surfaces:
- workspace scripts plus strict lint, type checking, tests, and static build;
- site/tooling/ for static rendering and local preview;
- apps/portfolio/ as a separate draft public route;
- site/es/sessions/PA-S001/ and site/en/sessions/PA-S001/;
- matching P0 and portfolio project pages beneath site/es/projects/ and
  site/en/projects/;
- a responsive, keyboard-accessible, system-color-scheme-aware shell;
- content validation, ES/EN structural correspondence, safe HTML escaping,
  subpath-safe links, and an explicit build allowlist.

LEARNING SITE HARD GATES
- Inspect and preserve the current site and `/ui-reference/` before editing.
- `/es/` and `/en/` are real dashboards with honest study, status, mastery,
  artifact, revisit, project, and activity states.
- Exercises and Knowledge Mastery Checklist use enabled controls with stable
  shared ES/EN IDs. Persist only local study state; never award L1–L5 or Completed.
- Provide phase-grouped global navigation, compact mobile TOC, phone/tablet-first
  layouts, keyboard access, Light/Dark, and no page overflow.
- Main Topic and every Subtopic open with definition/scope, then mechanism;
  expand acronyms on each published page.
- Visual Learning Studio needs a complete mind map, F01–F09 flashcards, source
  coverage, no-JavaScript answers, and responsive accessible Mermaid-built SVG.
- Avoid decorative pink/purple/rainbow palettes and current-architecture claims
  about `apps/book/`. Run checks and inspect generated HTML, not only source.

Do not make learner-owned decisions or claims. In particular, do not accept
the ADR, choose the final framework, write the learner's quality scenarios or
architecture rationale, add unverified portfolio biography/contact/employer claims,
assign mastery, fabricate measurements, or label PA-S001 Completed. Keep
architecture variants separate. Do not publish, deploy, add a remote, create
a commit, weaken checks, or overwrite existing learner files.

If an applicable mechanical piece is already present, verify it rather than
duplicating or replacing it. Use apply_patch for edits. Run npm run check and
report the exact commands, results, warnings, dependencies changed, any
deviations, and the learner-owned next steps. Also state any manual checks
that remain unverified (keyboard, focus, no-JavaScript, mobile, color scheme,
semantic ES/EN review, hosting review).
```

The prompt deliberately leaves the final framework choice, quality priorities,
P0 boundary acceptance, controlled-failure diagnosis, portfolio claims, and
mastery evidence to the learner.
