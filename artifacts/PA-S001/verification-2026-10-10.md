# PA-S001 mechanical verification — 2026-10-10

This record describes repository and browser observations only. It is not learner
mastery evidence and does not approve an ADR or change `07-PROGRESS.md`.

## Scope and design

- Public products: `apps/portfolio/` is a professional draft; `site/` is the
  bilingual Learning Site. The former `apps/book/` workspace was retired from
  active scripts; its package remains historical.
- Flow: explicit ES/EN `page.json` → validation and pair checks → Mermaid to
  temporary SVG → localized static HTML/SVG in `dist/` → local browser study marks.
  The build reads canonical status/mastery sources but does not publish or edit them.
- Failure limits: missing/invalid editorial inputs and malformed Mermaid stop the
  build; local storage failure reports an unsaved mark; study controls cannot write
  mastery or canonical progress.

## Inputs and UI reference

- Inspected Git status before edits; Project Sources 01–13 and
  `docs/PA-S001-BUILD.md`; the existing renderer, tests, generated HTML,
  provisional site HTML, portfolio, Radar and `/ui-reference/`.
- `/ui-reference/` supplied the desktop sidebar, grouped destinations, card
  surfaces, generous spacing, bold hierarchy, responsive disclosures and Light/Dark
  intent. Its sample app data and decorative purple/pink gradients were not copied.
- No `data/architecture/technology-radar.json` exists. Radar lists TypeScript and
  Node as ADOPT proposals requiring learner review, React and Astro as TRIAL
  candidates. The build retained Node/TypeScript and browser APIs. No new package
  was added.

## Commands and results

| Command | Actual result |
| --- | --- |
| Initial `npm run check` with Node v22.22.0 | Failed in 4 old assertions after lint/typecheck: paragraph layout, renamed CSS path, theme label, and expected old 10-card count. Tests were updated to the new observable contract. Node 22 is below the declared Node 24 engine. |
| `PATH=/home/tlak/.nvm/versions/node/v24.21.0/bin:$PATH npm install --package-lock-only --ignore-scripts --no-audit --no-fund` | Passed; synchronized the lockfile after removing the legacy workspace. |
| `PATH=/home/tlak/.nvm/versions/node/v24.21.0/bin:$PATH npm prune --ignore-scripts --no-audit --no-fund` | Passed; removed one extraneous local workspace link. |
| Final `PATH=/home/tlak/.nvm/versions/node/v24.21.0/bin:$PATH npm run check` | Passed: ESLint (TypeScript and study script), `tsc --noEmit`, 17/17 Node tests, and build of 16 HTML pages plus 5 Mermaid sources into 10 localized SVG files. |
| `PATH=/home/tlak/.nvm/versions/node/v24.21.0/bin:$PATH BASE_PATH=/accelerator/ npm run build` | Passed; all four required pages had prefixed CSS/navigation and session SVG URLs. A default `npm run build` then restored `dist/` to `/`. |
| `bash -n generators/bootstrap-pa-s001.sh generators/verify-p0-scaffold.sh` | Passed. |
| `git diff --check` | Exit 2 from pre-existing learner-edited whitespace in `project-sources/03-MASTER-ROADMAP.md:177` and an extra EOF blank line in `project-sources/13-CANONICAL-SESSION-AUDIT.md:324`. Those sources were left untouched. `git diff --check -- . ':(exclude)project-sources'` passed. |
| `find dist -type f` private-prefix inspection | No `data/`, `artifacts/` or `project-sources/` files copied. |

Dependency versions present: Node v24.21.0 and npm v11.19.0 for the final gate;
the earlier Node 22 shell had npm v10.9.4. `npm ls --depth=0` under Node 24 showed
Mermaid CLI 12.0.0, TypeScript 5.9.3, typescript-eslint 8.71.0, ESLint 10.12.0,
`@types/node` 24.10.1, and the local portfolio 0.1.0 workspace. These packages
were already present; no React or Astro dependency was introduced.

## Generated HTML inspected separately

| Route | Observation |
| --- | --- |
| `/es/` | Eight dashboard regions: roadmap, study, canonical status `Not started`, mastery `Sin evaluar`, artifact drafts, revisit, projects, and activity/next work. |
| `/en/` | Same eight regions and status `Not started`, mastery `Not assessed`; language link and phase-grouped navigation. |
| `/es/sessions/PA-S001/` | Full chapter hierarchy including C1–C8 and S1–S8; 13 enabled stable-ID study controls; five Studio modes; five SVG image references; no raw Mermaid. |
| `/en/sessions/PA-S001/` | Matching section and study IDs, 13 enabled controls, five modes and five SVG image references. |

No generated HTML contained `apps/book` as current architecture text. Both
localized mental-map SVGs have `viewBox`, white canvas, dark high-contrast nodes,
and distinct ES/EN `<title>` and `<desc>` values. The map was revised after a
phone screenshot exposed unreadably small text; the final vertical map was read
at about 262 × 710 CSS pixels without page overflow.

## Browser checks

Headless Chromium through Puppeteer returned HTTP 200 for each required route
at 390, 820 and 1440 px. Separate overflow checks at 320, 768 and 1024 px found
`scrollWidth === innerWidth`; the sidebar appears at desktop width and the
session TOC is closed by default on phone. The dark control set `data-theme=dark`
and `aria-pressed=true` with no page errors. Screenshots were inspected for
mobile Light/Dark, tablet dashboard and desktop session.

A Spanish exercise mark persisted after opening the English session with the
same ID; the English dashboard showed `1 of 5 exercises; 0 of 8 review criteria`.
Canonical status/mastery remained separate. Flashcard click changed
`aria-pressed` from false to true; Next changed the counter to `2 / 9`.
With JavaScript disabled, all 9 answers and all 5 Studio modes remained in the
HTML and visible. These are focused mechanical checks, not a complete keyboard,
screen-reader, WCAG 2.2, or translation review.
The portfolio, Engineering Book project pages and session index returned HTTP 200.
The portfolio initially overflowed at 320 px due to its header links; after
wrapping those links, checks at 320, 390, 768 and 1024 px found no page overflow.

## Warnings, deviations and pending learner work

- The first build used the inherited generator, which regenerated three already
  modified adjacent SVG snapshots before generation was moved to a temporary
  directory. Their pre-build uncommitted bytes were not captured. The current
  build leaves adjacent SVG snapshots untouched and publishes from `.mmd` into
  `dist/`. The regenerated snapshots are included in the PR for review.
- Provisional `site/*/index.html` files and `scripts/` supplied earlier were
  preserved but are not inputs to the canonical `page.json` build.
- Learner review remains necessary for the ADR/technology decision, exercise
  answers, one controlled-failure diagnosis, semantic ES/EN equivalence,
  professional portfolio claims, full accessibility assessment, and any L1–L5
  evidence. No external publication or progress-file mutation occurred during
  this verification.

## Dashboard chart and table follow-up

The first dashboard rendered eight cards without a chart or table. The corrected
ES/EN home now contains two source-backed tables (the available session and P0
systems) and a two-bar chart for local exercise/review marks. Session publication
comes from the editorial page; overall program and P0 system statuses come from
`07-PROGRESS.md`. The chart IDs and totals come from the session's paired
`dashboard` fields. Local marks still cannot change canonical status or mastery.

The Node 24 `npm run check` gate passed again: lint, typecheck, 17 tests and 16
HTML pages. Headless Chromium found two tables and the chart at 320, 820 and
1440 px, with no page overflow. After marking one Spanish exercise, the English
dashboard displayed 1/5 exercises and 0/8 review criteria while mastery remained
`Not assessed` and overall status remained `Not started`. The default preview port
4173 was occupied; preview succeeded on port 4174. No package or Project Source
was changed for this follow-up. Accessibility and ES/EN semantic review remain
pending with the learner.
