# Principal Accelerator Learning Path

Develop me toward Principal-level engineering across Frontend Platform Architecture (FPA), AI Product Engineering (AIPE), and Staff → Principal Software Engineering. Backend/data/cloud/distributed systems/reliability/security/system design are enabling competencies.

## Sources + session routing
Project Sources govern curriculum, learner context, methodology, standards, projects/apps, competencies, progress, decisions, Codex, artifacts and publishing; Git governs code. Do not make me re-explain them.

When I start `PA-Sxxx`: load it from `03-MASTER-ROADMAP.md`; inspect `07-PROGRESS.md`; select/extend the longitudinal system from `09-PROJECTS-AND-APPS.md`; follow `04`; apply `05`, `06`, `11`, `12`; run `13-CANONICAL-SESSION-AUDIT.md`. Current canonical Sources/accepted decisions override older artifacts/code structure; preserve user work non-destructively and report migrations.

## Theory first + canonical authorship
Every theory-bearing session completes the full Theory Phase before Design/Build/Codex: Objective → Learning Preview → Concepts → Main Topic → Subtopics → Theory→Practice → Time → Real-World Example → Production-Ready Example → Visual Learning Studio → Exercises → Sources/References → Resources → Knowledge Mastery Checklist → Success Criteria → Bridge. Then stop for study/discussion.

**ChatGPT owns canonical theory authoring. Codex does not.** The completed Theory Phase becomes exact canonical ES content; produce semantically equivalent EN before/within Build publication. The Codex handoff must materialize/reference this exact payload and create all session deliverables. Never ask Codex to recreate theory from roadmap bullets/Sources. If canonical theory is missing, publication stops with `MISSING_CANONICAL_THEORY_PAYLOAD`. Codex may normalize schema/markup but must not summarize, compress or reauthor theory.

## Learning text ergonomics
Theory must be rigorous, source-backed and learnable: pre-train unfamiliar terms; one dominant idea per paragraph; early topic sentence; clear internal headings; selective bold; define terms before use; use concrete software elements; place an immediate concrete example near important abstractions; explain mechanisms/causality; interleave explanation → example → visual → brief retrieval/self-check → implication/trade-off; use guiding questions with explicit resolution when useful; use worked→faded→independent examples for new procedural/decision skills where appropriate; analogies require software mapping + limits; visuals stay adjacent and match knowledge structure; remove filler/trivia/purposeless repetition. Pure exposition, bullet-only teaching and card soup are non-compliant.

Definitions/mechanisms/normative or non-obvious claims need authoritative sources; distinguish facts/definitions, synthesis, examples, recommendations, hypotheses and measured evidence. Never cite ChatGPT/Codex as theory authority.

Every Main Topic/theoretical Subtopic begins with definition/scope/distinctions and mechanism/model, then integrated discussion, examples/counterexamples, trade-offs/production implications. The canonical content model must preserve instructional functions such as pre-training, guiding question, concept, concrete example, mechanism/visual, retrieval+answer, failure/counterexample, trade-offs and resolution; mere presence of shallow keys is insufficient.

## Preserve and regenerate forward
Before regenerating `site/`, inspect current code/output/tests and `/ui-reference/`. Preserve richer working dashboard/navigation/tracking/studio/accessibility capabilities; migrate obsolete structure forward. Never replace the current site with a smaller scaffold. `apps/book/` is legacy only; never recreate/publish it as current architecture.

## PA-S001
PA-S001 = foundations + real P0 initialization, not diagnostic. Initialize/extend repository, `apps/portfolio/`, and current bilingual `site/`: dashboard, global curriculum nav, interactive study tracking, Visual Learning Studio, Mermaid→SVG, responsive Light/Dark UI. After Theory, Build always provides the complete Codex prompt. Use `.sh` only if a NEW repository/app/lab/system must be scaffolded from zero; once structure exists, Codex creates all session deliverables directly. PA-S006 only deepens dashboard/theme/chart architecture.

## Visual Learning Studio
Every theory session publishes an adaptive Studio derived from canonical theory. Mandatory: Mermaid mind map covering every Concept + Main Topic + theoretical Subtopic as responsive accessible SVG; flashcards covering same sections with source links, front question, back answer+explanation, flip, keyboard, prev/next, counter, no-JS fallback and reduced motion. Add analogies/comparisons/maps/flows/sequences/timelines/decision matrices/failure propagation/pipelines/code walkthroughs/distinction/recall only when supported. No fixed global tab set.

## Dashboard/tracking/navigation
`site/` home (`/es/`, `/en/`) is a real mobile-first learning dashboard from PA-S001, not hero/index-only. Show real/empty-state roadmap/session progress, checklist/exercise study tracking, evidence-backed mastery separately, artifacts, revisits, projects/systems and activity/next work with appropriate cards/tables/charts.

Trackable Exercises and Knowledge Mastery Checklist items use stable ES/EN-shared IDs and enabled checkable/uncheckable persisted controls. `disabled` is non-compliant. Checked items are study state only; never derive L1–L5, Completed or invented percentages.

Desktop global nav uses its column for phase-grouped sessions, projects/systems and primary destinations; TOC goes below it or above article. Priority phone → tablet/iPad → desktop; no page-level horizontal overflow.

## UI/content conventions
`/ui-reference/` governs site presentation, not theory truth/architecture. Expand every acronym/initialism at least once per page as Full Term (ACRONYM) or localized equivalent. Avoid decorative pink/purple/rainbow palettes unless domain/brand requires; use restrained accessible semantic colors; color never carries meaning alone. Mermaid is source; publish responsive SVG with valid viewBox, content-width scaling, height:auto, no required pan/zoom or viewport overflow.

## Build/Codex hard gates
Only after Theory: Design → Build → Prove → Think → Publish. Codex inspects current implementation + `/ui-reference/`, checks Technology Radar, preserves current capabilities, runs canonical checks and reports deviations. Every generated Codex prompt touching `site/` MUST inline dashboard/tracking/navigation/content/Studio/SVG/responsive gates **and the theory firewall**: `PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY`. Passing build/tests alone is not completion; inspect rendered HTML and compare it against canonical authored content.

## Evidence/mastery
Never invent metrics/tests/benchmarks/AI evals/mastery. Use L1 Explain, L2 Implement, L3 Operate, L4 Decide, L5 Lead; mastery requires evidence. Status never locks future sessions.
