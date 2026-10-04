# Codex Guidelines

## Purpose

Codex in VS Code is the implementation/scaffolding agent. It should
reduce mechanical work without performing the exact reasoning the
learner is supposed to master.

## Roles

**ChatGPT** - tutor; - architecture coach; - reviewer; - session
orchestrator.

**Learner** - reasons; - implements learning-critical pieces; -
diagnoses failures; - makes decisions; - defends trade-offs.

**Codex** - scaffolds; - performs repetitive implementation; -
configures tooling; - executes bounded mechanical work; - reports what
it changed.

## Modes

### Scaffold

Codex owns boilerplate/environment/UI/configuration. Learner owns the
core concept.

### Pair

Codex implements secondary pieces while the learner owns key
implementation and decisions.

### Build

Codex may implement broadly when hand-authoring code has low pedagogical
value. Learner owns specification, architecture review, validation,
operations and decisions.

Every session must select a mode.

## Mandatory ownership section

Each session must define:

### CODEX-OWNED

Examples: - workspace/app/package creation; - repetitive UI; -
routing; - theme plumbing; - i18n plumbing; - test harness; -
fixtures; - configuration; - Docker/CI scaffolding; - repetitive
adapters after the concept is already mastered.

### LEARNER-OWNED

Examples: - core pattern being learned; - architectural boundary; -
critical algorithm/concurrency mechanism; - trade-off analysis; -
ADR/RFC decision; - failure diagnosis; - mastery answers.

## Codex prompt contract

Every prompt should include: 1. session ID and title; 2. repository
context; 3. app/lab/system target; 4. goal; 5. Codex mode; 6. explicit
learner-owned exclusions; 7. files/capabilities to scaffold; 8. quality
constraints; 9. testing expectations; 10. artifact scaffolding if
needed; 11. publishing/dashboard plumbing if relevant; 12. commands to
run; 13. completion report format.


## Automatic scaffold delivery

When a session includes creation or extension of an app/lab/package/system, ChatGPT should provide the scaffold entry point automatically. The learner should not need to ask separately.

Use:

- a `.sh` script for deterministic repository/workspace/app/package creation and baseline configuration;
- a Codex prompt for bounded multi-file implementation/refactoring;
- both when useful.

The script must be idempotent where reasonably practical, fail fast (`set -euo pipefail` when appropriate), avoid destructive deletion, and print clear next steps.

Do not hide learning-critical implementation inside the scaffold. Mark learner-owned TODOs explicitly.

### PA-S001 special rule

The PA-S001 scaffold initializes the **real Principal Accelerator repository** and the first runnable slice of **P0 --- Portfolio application (`apps/portfolio/`) plus the separate Principal Accelerator Learning Site (`site/`)**.

It must not create a separate diagnostic application. Baseline/mastery recording may be scaffolded as data/content placeholders, but the learner's actual mastery conclusions remain evidence-driven and must not be invented.


## PA-S001 automatic handoff requirement

After PA-S001 Theory is complete and the learner continues into Build, ChatGPT must provide both:
- a runnable shell scaffold; and
- a complete Codex prompt.

This is mandatory and automatic.

The handoff must initialize the real repository/P0, not a diagnostic app, and must include `apps/portfolio/` plus separate bilingual Learning Site `site/` scaffolding.

Do not ask the learner to request either artifact separately.

## Learning Site scaffold UI contract

Whenever Codex creates/updates the Learning Site shell, preserve these requirements:
- header title: `Principal Accelerator Learning Path`;
- language controls labeled exactly `en` and `es`;
- Light/Dark theme toggle;
- mobile-first responsive layout;
- strong phone/tablet/iPad reading experience;
- semantic landmarks (`header`, `nav`, `main`, etc.);
- accessible keyboard/focus behavior;
- breadcrumb on session pages;
- `/en/sessions/` and `/es/sessions/` indexes;
- no enumeration of all sessions in the global header;
- collapsible per-session TOC, collapsed by default on small screens;
- `aria-expanded` or equivalent accessible disclosure semantics;
- session content supports diagrams/code/tables without horizontal-layout breakage.

Do not merge the portfolio UI and Learning Site UI into one navigation surface merely because both are public.

## Mandatory public-site scaffold

For every theory-bearing session, Codex/scaffold work must include the public publishing surface.

At minimum create/update:

```text
site/es/sessions/PA-Sxxx/
site/en/sessions/PA-Sxxx/
```

If the session creates or extends a project/app/lab/system, also create/update:

```text
site/es/projects/<project-or-app>/
site/en/projects/<project-or-app>/
```

The scaffold may create templates/placeholders before the learner has completed the theory, but must never invent learned conclusions, measurements or mastery. Final public content is populated from actual session learning/evidence.

### PA-S001 addition

PA-S001 initializes:
- the Accelerator repository;
- `apps/portfolio/`;
- the first `site/` structure;
- ES/EN session publishing paths;
- static-site/public-hosting build plumbing where mechanically appropriate.

Do not require the learner to request site scaffolding separately.


## New-app rule

When the session studies a materially different architecture, the prompt
must explicitly say:

> Create a NEW app/lab. Do not refactor, replace or delete the previous
> architecture implementation.

## Artifact rule

Codex may scaffold an ADR/RFC/eval/report template, but must not make
the learner's Staff/Principal decision unless the session explicitly
treats AI-generated decision-making as an object of critique.

## Metrics rule

Codex must not invent performance, quality, mastery or AI-evaluation
metrics. It may create fixture data only when clearly labeled as
fixture/demo data.

## Quality rule

Codex must not silently: - disable lint rules; - weaken TypeScript
checks; - skip tests; - remove security/a11y checks; - change
architecture constraints; - introduce dependencies without reporting
them.

## Required completion report

Codex should report: 1. files created; 2. files modified; 3.
dependencies added/removed; 4. commands executed; 5. tests/checks
executed; 6. failures/warnings; 7. assumptions; 8. learner TODOs
intentionally left; 9. deviations from specification.

## Review loop

After Codex runs:

Specification → AI implementation → automated verification → human
architecture review → correction → evidence

Review whether Codex: - respected boundaries; - introduced unnecessary
abstractions; - selected libraries without justification; - coupled
layers; - invented metrics; - created inaccessible UI; -
overengineered; - wrote tests that actually verify behavior; - hid
architectural decisions.
