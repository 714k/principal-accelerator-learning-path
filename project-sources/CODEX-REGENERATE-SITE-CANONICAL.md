# Codex — Regenerate/upgrade Principal Accelerator Learning Site to canonical contract

Work in the existing Principal Accelerator repository. This is a preserve-and-extend migration, NOT a clean rewrite.

## 0. Inspect before editing
Read the current Project Sources (`01`, `03`, `04`, `05`, `06`, `09`, `10`, `11`, `12`, `13`), the Technology Radar, `/ui-reference/`, current `site/`, content schemas, generated output, tests and any existing PA session pages.

Inventory current capabilities first. Preserve all richer working behavior that conforms to the current contract. Do not replace the current site with a smaller PA-S001 scaffold.

Search for legacy `apps/book` references. Preserve them only in explicit history/migration documentation; migrate current implementation/content references to `apps/portfolio/` + separate `site/`.

## 1. Home = actual dashboard from PA-S001
Both `/es/` and `/en/` must be learning dashboards. A hero may remain, but hero + “Sessions/Projects” cards alone is NON-COMPLIANT.

Render available real/public-safe data or honest empty states for:
- roadmap/session progress;
- learner study checklist completion;
- exercise study completion;
- evidence-backed mastery separately;
- artifacts/evidence;
- revisit queue;
- projects/systems;
- recent activity / next work.

Use cards, tables and charts (line/bar/donut/pie/timeline/matrix) only when the data relationship supports them. Do not invent percentages or evidence. Essential values must have accessible text/table equivalents.

## 2. Interactive checkboxes
Every trackable Exercise and Knowledge Mastery Checklist criterion must have a stable machine ID shared by ES/EN.

Rendered controls MUST be enabled and checkable/uncheckable. Do not render default `disabled` checkboxes.

Persist learner study state using the existing static/progressive architecture (for example versioned localStorage if already appropriate). Study state MUST NOT mutate `07-PROGRESS.md`, session status, evidence, competency levels or L1–L5 mastery.

Provide readable no-JS content.

## 3. Navigation
Desktop: primary navigation region contains phase-grouped PA sessions + projects/systems + primary destinations. Put current-page TOC below that nav or above article. Do not keep a second mostly-empty permanent TOC rail.

Mobile first: phone priority 1, tablet/iPad priority 2, desktop priority 3. Collapse nav/TOC accessibly. No page-level horizontal overflow.

## 4. Academic content renderer
For every Main Topic and theoretical Subtopic render in this semantic order:
1. concept definition/scope/distinctions with appropriate source support;
2. mechanism/mental model and concrete software elements;
3. integrated development;
4. examples/counterexamples;
5. trade-offs/limitations;
6. production/Staff/Principal implications.

Do not start with a quote/slogan/implementation fragment. Preserve full sourced theory. Improve readability with meaningful subheadings, prose, real lists, numbered mechanisms, comparison tables, diagrams, concise code/contracts, examples, misconceptions/failure callouts. Avoid walls of text, bullet-only summaries and “card soup”.

Expand every acronym/initialism at least once per page as `Full Term (ACRONYM)` or localized equivalent.

## 5. Adaptive Visual Learning Studio — every theory session
Every bilingual theory session must declare a visual-learning model tied to canonical source sections.

Mandatory modes:
- Mind Map: Mermaid `.mmd` under `site/shared/diagrams/<SESSION_ID>/`, covers every Concept + Main Topic + theoretical Subtopic, build-time SVG, responsive/accessibility metadata, restrained dark nodes + high-contrast text and non-rainbow palette.
- Flashcards: complete coverage of the same sections, explicit source coverage, question/front, answer+explanation/back, tap/click flip, previous/next, counter, keyboard, reduced motion, readable no-JS fallback.

Additional modes are adaptive to topic: analogy+software mapping+limits, comparison, dependency/boundary map, flow, sequence, timeline/lifecycle, decision/trade-off matrix, failure/change propagation, pipeline/journey, code/contract walkthrough, distinction/misconception, rapid recall. Do not hard-code one tab set for all sessions and do not invent theory to fill tabs.

ES/EN must preserve identical mode IDs and coverage structure.

## 6. Mermaid → SVG
Mermaid remains source. Generate SVG at build time. Preserve valid `viewBox`, content-width scaling, proportional `height:auto`, no normal-reading pan/zoom requirement, no raw Mermaid in published pages, no viewport overflow.

## 7. UI reference + palette
Derive look/feel, hierarchy, spacing, typography, interaction, content presentation, Light/Dark and responsive patterns from `/ui-reference/` without blindly copying its dependencies.

Default Accelerator UI must not use decorative pink, purple or rainbow palettes unless the domain/brand explicitly requires them. Prefer restrained neutral surfaces with accessible blue/cyan-teal/green/amber-orange/red semantic accents. Never encode meaning only with color.

## 8. Validation must hard-fail regressions
Add/update content/runtime/build tests so a new theory session fails validation if:
- Visual Learning Studio declaration is missing;
- mind map does not cover every Concept/Main Topic/theoretical Subtopic;
- flashcards do not cover the same set;
- ES/EN visual mode IDs/coverage differ;
- diagram discovery/generation fails;
- trackable exercise/mastery IDs are missing or differ ES/EN.

Add rendered-output regression checks where practical so completion fails if:
- `/es/` or `/en/` is hero/index-only instead of dashboard;
- trackable checkbox is `disabled`;
- a trackable control lacks a stable ID;
- current public architecture contains `apps/book`;
- global curriculum nav is absent;
- raw Mermaid is rendered.

## 9. PA-S001 and future sessions
Bring existing PA-S001 forward to this contract without discarding richer local implementation. Apply the same renderer/schema/validation/platform behavior to every current and future theory-bearing session. A future session must fail validation if it omits the required platform/content contract.

PA-S006 deepens/refactors dashboard/theme/chart architecture; do not defer the initial dashboard/tracking/theme baseline until PA-S006.

## 10. Verification
Run the repository canonical checks, including `npm run check` when defined. Then separately inspect generated `/es/`, `/en/`, `/es/sessions/PA-S001/` and `/en/sessions/PA-S001/` HTML/output. Passing `npm run check` alone is insufficient.

Report:
- files inspected/changed;
- existing capabilities preserved;
- migrations performed;
- dashboard data and empty states implemented;
- stable study IDs and persistence mechanism;
- Visual Learning Studio modes/coverage;
- SVG generation;
- navigation/responsive/accessibility verification;
- dependencies and Technology Radar status;
- exact commands/tests/results;
- remaining failures/warnings;
- intentional deviations and why.
