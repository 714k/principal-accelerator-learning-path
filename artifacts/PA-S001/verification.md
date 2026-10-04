# PA-S001 — Mechanical verification record

Status: scaffold verification only; learner evidence and mastery remain pending.

## Environment

- Node: `v24.21.0`
- npm: `11.19.0`
- Platform: local repository checkout

## Commands and actual results

| Command | Result |
| --- | --- |
| `npm install --package-lock-only` | Passed; lockfile updated for the new local `@accelerator/portfolio` workspace. npm reported 0 vulnerabilities and 29 packages seeking funding. |
| `npm run check` | Passed: ESLint, `tsc --noEmit`, 7 Node tests, and default static build. |
| `BASE_PATH=/accelerator/ npm run build` | Passed; generated 12 HTML pages below `dist/` with the `/accelerator/` prefix. |
| Local `fetch` through `BASE_PATH=/accelerator/ PORT=4174 npm run preview` | Returned HTTP 200 for `/accelerator/`, `/accelerator/es/sessions/`, `/accelerator/en/sessions/PA-S001/`, `/accelerator/es/projects/p0/`, and `/accelerator/portfolio/`. The local preview was stopped afterwards. |
| Generated-file inspection | `find dist -type f` found only the explicit HTML/CSS/marker output. Private directories were not emitted as files. Text references to `data/` and `artifacts/` remain in public explanatory prose only. |

## Failures encountered and corrected during implementation

- The first typecheck rejected an `unknown` table shape; validation now narrows it through
  `validTable` without weakening TypeScript checks.
- The chapter’s explanatory literal `[R999]` was correctly treated as a missing citation;
  it now refers to the missing marker as `R999`, while the unit test retains the controlled
  missing-reference case.
- The HTML-escaping test was updated to distinguish content injection from the intentional,
  generated theme script; it still verifies that a content-provided script is escaped.

## Not verified

- Manual keyboard, focus, no-JavaScript, 375/768/1280px, and system-color-scheme review.
- Semantic equivalence of ES/EN prose, full reference reading, external hosting, and
  deployment configuration.
- Learner-controlled failure diagnosis, ADR reasoning, professional portfolio claims, and
  all mastery levels.
