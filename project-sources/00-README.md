# Principal Accelerator Learning Path --- Project Files

This folder is the source of truth for generating and running the
Principal Accelerator sessions.

## Core model

The program develops three areas simultaneously:

1.  **Frontend Platform Architecture (FPA)**
2.  **AI Product Engineering (AIPE)**
3.  **Staff → Principal Software Engineering (S/P)**

Backend, APIs, data, cloud, distributed systems, reliability, security
and system design are enabling technical competencies used across those
three areas.

## Session model

Every session follows:

**Learn → Design → Build → Prove → Think → Publish**

Every session must produce, as applicable: - substantial theory and concepts; - Theory → Practice
mapping; - a build, app, lab, package, experiment or platform
capability that advances the longitudinal systems; - a Codex prompt; - explicit Codex-owned vs Learner-owned
work; - tests/evidence; - at least one durable artifact; - Staff and
Principal reasoning; - AI Product Engineering integration when
technically meaningful; - Spanish and English publishable
theory/content; - dashboard/mastery data; - an Engineering Book
update; - mastery assessment L1--L5; - PROGRESS.md update.




## Non-blocking progression invariant

Session completion never acts as an unlock mechanism.

The learner may start later sessions while earlier sessions are Partial, Revisit, Not started, or missing evidence. Bridge missing prerequisites and record revisits; do not block the requested session.


## Automatic Build handoff invariant

When Build begins, implementation-capable sessions provide the executable scaffold automatically.

PA-S001 must provide both `.sh` and Codex prompt for the real Accelerator repository, `apps/book`, and bilingual `site/` surface.

## Main Topic / Subtopics invariant

`Main Topic` and `Subtopics` are teaching sections, not outline metadata.

- Main Topic = developed synthesis.
- Each Subtopic = developed `###` theory subsection.
- A list alone is invalid.

## Subtopic-depth invariant

Every subtopic named by a session must be taught in depth. A bullet list is not theory.

The Theory Phase cannot end until every roadmap-required and session-introduced subtopic has substantial explanatory coverage.

## Theory-phase invariant

For theory-bearing sessions, complete the full Theory Phase before asking the learner to answer anything:

**Learning Preview → Concepts → Main Topic → Subtopics → Theory → Practice Map → Time Breakdown → Real-World Example → Production-Ready Example → Exercises → Resources → Knowledge Mastery Checklist → End-of-Session Success Criteria → Bridge**

Then stop. Design/Build begins only after learner continuation.


## Public bilingual site invariant

Every theory-bearing session must create/update a public ES/EN session section under `site/`, and every app/lab/system session must create/update its public project section. Scaffolding handles this automatically.

The public surface must be hostable on GitHub Pages or another static hosting service and must never require access to private chat context.


## Important architecture rule

When a session teaches a materially different architecture or structural
approach, **create a new application/lab instead of refactoring a
previous architecture implementation away**. Preserve previous
implementations for comparison and evidence.


## Clarity invariant
Academic does not mean abstract. Every major concept/subtopic must use plain technical definitions, concrete software examples and meaningful diagrams/flows. Production-ready examples must be complete scenarios rather than policy fragments.

## Portfolio / Learning Site invariant
The professional portfolio and the Principal Accelerator Learning Site are different products:
- `apps/portfolio/` = portfolio.
- `site/` = bilingual theory/learning site.
Do not conflate them.

## Canonical-baseline rule

This package is the consolidated baseline. Do not create another numbered version for every discovered issue.

Future changes should first be checked against `13-CANONICAL-SESSION-AUDIT.md`.
Revise the canonical baseline only when a real contract change is needed, and preserve compatibility with previously agreed invariants.

The preflight audit is mandatory for each new `PA-Sxxx` conversation.

## Files

-   `01-PROJECT-INSTRUCTIONS.md` --- operating contract for every
    conversation.
-   `02-LEARNER-CONTEXT.md` --- relevant learner background and target.
-   `03-MASTER-ROADMAP.md` --- 120-session curriculum.
-   `04-SESSION-TEMPLATE.md` --- mandatory session output structure.
-   `05-LEARNING-METHODOLOGY.md` --- pedagogical model.
-   `06-TECHNICAL-STANDARDS.md` --- technical defaults and evidence
    rules.
-   `07-PROGRESS.md` --- dynamic learning state.
-   `08-COMPETENCY-MATRIX.md` --- mastery model and competency coverage.
-   `09-PROJECTS-AND-APPS.md` --- longitudinal apps, labs and
    Engineering Book.
-   `10-DECISION-LOG.md` --- ADR/RFC/architecture review index.
-   `11-CODEX-GUIDELINES.md` --- Codex delegation rules and prompt
    contract.
-   `12-ARTIFACT-AND-PUBLISHING-STANDARD.md` --- artifact, bilingual
    publishing and dashboard contract.

Start a new conversation with a session ID such as:

`PA-S001`

The assistant should use these files to reconstruct the session without
requiring the learner to restate the program.

## Critical execution rules

- Do not turn PA-S001 or any other session into a broad upfront diagnostic interview.
- Competency/mastery is inferred progressively from normal learning work: concept checks, learner-owned implementation, debugging, tests, architecture/design decisions and durable evidence.
- PA-S001 initializes the real Accelerator repository and P0 --- Engineering Book / Portfolio. It is not a separate diagnostic application.
- When a session creates or extends an app/lab/system, the session must provide the executable scaffold path automatically: a shell script and/or complete Codex prompt appropriate to the task.
- Theory comes before applying new concepts. `## Concepts` must teach the engineering topic, not merely explain the learning process or assessment model.

