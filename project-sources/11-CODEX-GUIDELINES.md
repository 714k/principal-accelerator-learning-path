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

## Mermaid → SVG publishing rule

For Principal Accelerator Learning Site content, Mermaid is source-only.

Whenever Codex encounters a Mermaid diagram in session/content sources:

1. preserve the Mermaid source;
2. convert it to SVG at build time;
3. store the generated SVG in an appropriate shared/session diagram directory;
4. render the SVG in the final `site/` page;
5. do not require browser-side Mermaid rendering;
6. do not add an interactive Mermaid viewer, canvas, pan/zoom UI, iframe or modal viewer unless explicitly requested.

Preferred storage:

```text
site/shared/diagrams/PA-Sxxx/
  architecture-flow.mmd
  architecture-flow.svg
```

Responsive rendering requirement:

```css
.session-diagram {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
```

Equivalent implementation is acceptable.

The SVG must:

- preserve a valid `viewBox`;
- use the available article/content width;
- preserve aspect ratio;
- derive height automatically;
- scale down correctly on phones and tablets/iPads;
- avoid horizontal viewport overflow;
- not be cropped or distorted;
- not require dragging/panning for normal reading.

Accessibility requirements:

- provide meaningful surrounding explanation/caption;
- use accessible SVG metadata/semantics where practical (`<title>`, `<desc>`, `role="img"`, `aria-labelledby` or equivalent).

If Mermaid-to-SVG conversion fails:

- fail the build with a clear error;
- identify the session/source diagram that failed;
- do not silently fall back to displaying Mermaid source code;
- do not remove the diagram without reporting the failure.

Do not manually edit generated SVG when the conceptual source should be changed in Mermaid.

Treat this rule as persistent for all current and future PA sessions.



## Mandatory `/ui-reference/` inspection

Before Codex creates, regenerates or substantially changes any Principal Accelerator Learning Site UI/content presentation, it must inspect:

```text
/ui-reference/
```

Treat it as the **Canonical UI Reference** for `site/`.

Codex must derive from it, as applicable:

- page composition;
- visual hierarchy;
- typography treatment;
- spacing;
- content width/density;
- cards/callouts;
- section separators;
- concept presentation;
- diagram presentation;
- code/example presentation;
- navigation patterns;
- interactive/progressive-disclosure behavior;
- responsive behavior;
- Light/Dark look and feel.

### Content mapping

Map canonical session content into the reference presentation rather than dumping Markdown into a generic documentation template:

```text
Concepts
Main Topic
Subtopics
Production-Ready Example
Visual Learning Guide
        ↓
reference UI patterns
        ↓
implemented session page
```

The reference guides **presentation**, but may not invent, remove or weaken academic claims.

### Implementation rule

Do not blindly copy `/ui-reference/` source code.

Prefer:
1. identify the visible/interactive pattern;
2. understand its purpose;
3. implement it using the approved `site/` architecture and Technology Radar;
4. preserve accessibility, responsiveness and static-site requirements.

Do not add a library solely because `/ui-reference/` uses it.

### Conflict priority

If `/ui-reference/` conflicts with Principal Accelerator contracts, use:

```text
security / accessibility / factual-content integrity
        ↓
accepted ADR / technical standards
        ↓
Learning Site functional requirements
        ↓
/ui-reference/ visual/interaction intent
```

### Regeneration rule

This applies to both new sessions and regeneration/migration of existing pages such as PA-S001. When regenerating, bring the page forward to the current `/ui-reference/`, Visual Learning Guide and Mermaid → SVG standards.

### Completion report

For meaningful Learning Site work, report:

```text
UI reference inspected:
Reference patterns reused/adapted:
Patterns intentionally not copied:
Accessibility/responsive adaptations:
New reusable UI primitives created:
Deviations and rationale:
```

## Visual Learning Guide generation rule

When Codex creates or updates a theory-bearing `site/` session page, it must also implement/preserve the session's Visual Learning Guide.

The visual guide is generated from the completed theory content. Do not invent new theory, evidence or conclusions.

Expected page order includes:

```text
Concepts
Main Topic
Subtopics
...
Real-World Example
Production-Ready Example
Visual Learning Guide
Exercises
...
```

Codex should provide reusable presentation primitives rather than session-specific hard-coded layouts when practical.

Candidate primitives:

```text
ConceptCard
ConceptRelationship
CompareCard
MechanismDiagram
CodeCallout
FailureFlow
FastRecall
```

Names may differ according to the chosen frontend architecture.

Requirements:

- mobile-first;
- accessible;
- Light/Dark compatible;
- visual hierarchy optimized for rapid scanning;
- no essential hover-only behavior;
- responsive diagrams;
- Mermaid diagrams compiled to SVG according to the Mermaid → SVG rule;
- no client-side Mermaid viewer;
- preserve citations/reference anchors when visual claims require them.

Do not replace the academic theory with these cards/components.

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


## Mandatory Technology Radar check

Before Codex introduces any architecture-significant technology or dependency, it must consult the repository Technology Radar.

Expected source:

```text
docs/architecture/technology-radar.md
```

and, if present, its machine-readable projection:

```text
data/architecture/technology-radar.json
```

Codex behavior by category:

```text
ADOPT  → may use when appropriate for the current scope
TRIAL  → use only in the approved project/scope
ASSESS → evaluate or prototype; do not silently adopt into longitudinal systems
HOLD   → do not use unless an explicit override/ADR re-evaluates it
```

Do not silently choose architecture-significant libraries such as:

- frontend frameworks/meta-frameworks;
- state-management libraries;
- routers when the choice materially shapes architecture;
- CSS/component frameworks;
- schema-validation stacks;
- ORMs;
- databases;
- message brokers;
- vector stores;
- AI providers;
- AI orchestration/agent frameworks;
- observability vendors;
- cloud providers;
- deployment platforms.

If no approved default exists, report that a technology decision is required rather than silently installing a preferred package.

A significant Radar change is LEARNER-OWNED when it represents architectural judgment. Codex may research alternatives, scaffold experiments and collect evidence, but must not independently make the durable Principal-level decision.

When a technology/dependency is introduced, include in the completion report when materially relevant:

```text
Technology/dependency:
Version:
Radar category:
Scope:
Reason introduced:
Alternative considered:
Architecture impact:
Related ADR/RFC:
```

Do not automatically promote a technology after one successful use.

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
