# PA-S001 mechanical verification — 2026-10-11

This record covers repository and browser observations from the canonical-theory
migration. It is not learner mastery evidence, an accepted ADR, a WCAG conformance
claim, or a production-readiness claim.

## Repository and content outcome

- Preserved the Node/TypeScript static renderer, bilingual dashboard, search,
  grouped navigation, Light/Dark control, local study persistence, static fallback,
  Mermaid build, `BASE_PATH` support, and separate portfolio product.
- Replaced the prior non-canonical PA-S001 chapter with the supplied canonical
  Spanish theory and a matching English translation.
- Published 8 Concepts, 1 Main Topic, 7 theoretical Subtopics, the remaining
  required Theory Phase sections, 10 flashcards, 4 exercises, 6 review criteria,
  and 5 trackable end-of-session success criteria.
- Added structured instructional blocks for concept, mechanism, example, analysis,
  retrieval/guidance, failure, trade-off, production implication, and resolution.
- Removed the Engineering Book route from the active public build. `apps/book/`
  remains only as explicitly labeled historical migration evidence.
- Added `document-review-flow.mmd` and revised `foundations.mmd`; the build generated
  localized responsive SVG files with `viewBox`, `<title>`, and `<desc>`.
- Added no runtime or development dependency and did not change the Technology Radar.

## Commands and actual results

| Command | Actual result |
| --- | --- |
| `node --version; npm --version` | `v22.22.0`; `10.9.4`. Warning: Node is below the repository-declared Node 24 range. |
| `npm run typecheck` | Passed. |
| `npm test` during migration | 18/19 passed; one assertion expected a later-stage error after the new validator rejected the malformed visual mode earlier. The assertion was corrected without weakening validation. |
| `npm run check` | Passed: ESLint, `tsc --noEmit`, 19/19 Node tests, and static build. |
| Default `npm run build` | Passed: 14 HTML pages and 6 Mermaid diagram sources converted into localized SVG output; mastery stayed `not-assessed`. |
| `BASE_PATH=/accelerator/ npm run build` | Passed: 14 HTML pages with `/accelerator/` asset/navigation prefixes. |
| Initial post-build subpath probe | The build passed, but the probe incorrectly looked for `dist/accelerator/...`; this repository writes routes under `dist/` and applies the prefix inside generated links. |
| Corrected subpath probe | Passed for `dist/es/sessions/PA-S001/index.html` and its `/accelerator/assets/site.css` link. A default build then restored `dist/` to `/`. |
| `npm ls --depth=0` | Existing packages only: portfolio workspace 0.1.0, Mermaid CLI 12.0.0, `@types/node` 24.10.1, ESLint 10.12.0, TypeScript ESLint 8.71.0, and TypeScript 5.9.3. |
| `git diff --check -- . ':(exclude)project-sources'` | Passed. |

## Generated HTML inspection

- Inspected `/es/`, `/en/`, both session indexes, both PA-S001 pages, both
  portfolio project pages, and `/portfolio/`.
- Each localized PA-S001 page contains 31 semantic sections, 15 enabled study
  controls, 10 flashcards, and 35 typed instructional blocks.
- Spanish sentinels from the canonical payload were present, including the shared-
  library/platform limitation, coupling caveat, Thomson Reuters disclaimer, and
  end-of-Theory-Phase boundary.
- No generated HTML contained raw Mermaid, a disabled tracked input, or an active
  `/projects/engineering-book/` link.
- The only generated `apps/book/` text is an explicit historical-migration note;
  it does not describe current architecture.

## Browser inspection

Headless Chromium inspected nine routes at 390 × 844, 834 × 1112, and
1440 × 1000 (27 route/viewport combinations). Every request returned HTTP 200.
All pages had `main`, `header`, and navigation landmarks, and none had page-level
horizontal overflow. At phone/tablet widths the global sidebar was hidden and the
mobile disclosure was visible; at desktop width the inverse was true.

A Spanish exercise toggle stored `pa-study-v1:PA-S001:exercise:classify-scope=1`;
the corresponding English control loaded checked. A flashcard flip changed the
enhanced card state. Screenshots of the English phone session and Spanish desktop
dashboard were inspected; hierarchy, focusable controls, responsive surfaces, and
readable content were present in the captured viewport.

## Visual modes and success-criteria follow-up

- Restored five theory-supported Visual Learning Studio modes with matching ES/EN
  IDs: mind map, boundary flow, scope matrix, change journey, and flashcards.
- Replaced the obsolete P0 publication diagram behind `boundary-flow.mmd` with the
  document-review boundary flow described by the canonical production example.
- Converted all five End-of-Session Success Criteria into enabled, persistent
  `PA-S001:success:*` controls. They remain study state, not mastery evidence.
- The dashboard now includes success criteria in a third bar, a marked/remaining
  donut, a numeric table row, the text summary, and the aggregate activity history.
- A rendered phone check found 5 modes, 5 success controls, 15 total controls, and
  zero horizontal overflow. After marking one Spanish success criterion, the
  English dashboard showed `1 / 5` in the progress bar, table, and donut; mastery
  remained `Not assessed` and canonical status remained `Not started`.

## Learning-ergonomics follow-up

- Made the Concepts group an explicit pre-training sequence and introduced the
  full ISO/IEC/IEEE organization names before relying on the initialism.
- Rendered instructional functions as localized semantic subheadings instead of
  exposing internal English block keys on the Spanish page.
- Reused canonical flashcard and recall material to place a guiding question at
  the beginning and an explicit resolution at the end of the Main Topic and all
  seven theoretical Subtopics.
- Rendered four canonical retrieval prompts as disclosure-based self-checks with
  answers. The page now contains 62 typed instructional blocks: 8 guiding
  questions, 4 retrieval checks, 10 concrete examples, and 8 resolutions.
- Added localized Mermaid diagrams that directly label the relationship among
  context/expected quality, architecture, architecture description, and observable
  consequences. The diagram sits beside the first architecture definition and uses
  a three-color semantic palette.
- Added validation and regression tests for pre-training, retrieval answers,
  guiding-question order, explicit resolution, bilingual block parity, and diagram
  adjacency. The final aggregate check passed ESLint, typecheck, 22/22 tests, and a
  build of 14 HTML pages plus 8 Mermaid sources.
- Headless Chromium rechecked the Spanish session at 390, 768, and 1440 CSS pixels:
  zero page-level horizontal overflow, 8 guiding questions, 4 self-checks, 8
  resolutions, no raw English instructional labels, and no broken images. The
  pre-training, quality-attribute section, open self-check, and new relationship
  diagram were also inspected as rendered screenshots.

## Limits and pending learner work

- The active shell did not use the declared Node 24 runtime; repeat the final gate
  under Node 24 before external publication.
- Browser inspection was mechanical, not a screen-reader or full keyboard audit,
  color-contrast measurement, WCAG audit, or semantic translation approval.
- Learner-owned work remains: exercise answers, quality priorities, controlled-
  failure diagnosis, ADR/stack decision, portfolio claims, semantic ES/EN review,
  evidence interpretation, session status, and all L1–L5 conclusions.
- The supplied canonical PA-S001 theory does not contain an ADR explanation/example,
  a bounded analogy, or a partial worked-example step between the complete example
  and learner-owned exercise. Those were not invented during publication; they need
  an authored canonical theory amendment before they can be added faithfully.
- No deployment, commit, push, pull request, or canonical progress mutation occurred.
