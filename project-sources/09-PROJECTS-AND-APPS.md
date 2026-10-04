# Projects and Apps

## Project selection rule

Sessions should advance longitudinal systems whenever possible. Do not create a throwaway app merely because a session contains an exercise.

At session start, identify the primary project/app/lab and state whether the session **initializes**, **extends**, **compares**, or **reviews** it.

When the session includes implementation, provide the executable scaffold path automatically: `.sh`, Codex prompt, or both.


## Non-blocking project continuity

A missing or incomplete previous session must not block work on a longitudinal project.

If the expected prior project state is absent, reconstruct or scaffold the minimum compatible baseline and continue. Record the gap as a revisit/deviation.

Session completion status is not an app/project unlock mechanism.

## P0 --- Portfolio + Principal Accelerator Learning Site

P0 contains **two separate public products**.

### A. Professional Portfolio — `apps/portfolio/`
Purpose: professional identity, selected engineering work, case studies, systems/architecture highlights, direction, contact and concise evidence links. The portfolio is not the canonical location for full session theory.

### B. Principal Accelerator Learning Site — `site/`
Purpose: publish the theory learned in every PA session: Concepts, Main Topic, developed Subtopics, diagrams, Theory → Practice, examples, exercises, curated references, project learning pages and public-safe evidence links.

Required capabilities:
- Spanish / English;
- language switcher labels exactly `en` and `es`;
- Light / Dark theme toggle;
- mobile-first responsive layout;
- excellent phone and tablet/iPad readability;
- semantic HTML and accessibility;
- breadcrumb navigation;
- language-specific session index;
- collapsible per-session Table of Contents;
- diagrams, tables and code examples;
- static/public hosting compatibility.

### Navigation contract for `site/`
Global header:
- title: **Principal Accelerator Learning Path**;
- link to current-language home/index;
- `en` / `es` switcher;
- Light/Dark theme control.

Do **not** put PA-S001 … PA-S120 links in the global header.
Use `/es/sessions/` and `/en/sessions/` as scalable indexes, with session pages under `/es/sessions/PA-Sxxx/` and `/en/sessions/PA-Sxxx/`.
Every session page includes breadcrumb, compact/collapsible TOC and Previous/Next links where available. On small screens, the TOC is collapsed by default.

### F0 mapping
| Session | Primary P0 outcome |
|---|---|
| PA-S001 | Initialize Accelerator repository + first runnable `apps/portfolio/` slice + first bilingual `site/` Learning Site shell. |
| PA-S002 | Evolve repository into Accelerator monorepo; add engineering standards, workspace/package boundaries and quality gates. |
| PA-S003 | Deepen portfolio architecture and Learning Site content/information architecture without conflating the two surfaces. |
| PA-S004 | Add design-system/token/accessibility foundations reusable by portfolio and Learning Site where appropriate. |
| PA-S005 | Deepen ES/EN content architecture and i18n for Learning Site and applicable portfolio surfaces. |
| PA-S006 | Add theme and learning/mastery visualization where appropriate; maintain clear Portfolio vs Learning Site boundaries. |

Baseline/mastery evidence belongs in normal evidence/data artifacts and may be linked from the Learning Site when public-safe. It is not a separate diagnostic application.

## P1 --- Architecture Laboratory

A collection of preserved, independently runnable applications/labs demonstrating materially different structural architectures.

Examples:

- layered app;
- onion app;
- hexagonal app;
- clean architecture app;
- vertical slice/modular monolith examples;
- CQRS app;
- event-sourcing app.

**Rule:** do not overwrite one architecture with another.

Where useful, use comparable domains and measurements. Where repetition would reduce portfolio value, use different realistic domains while keeping explicit comparison criteria.

Primary use: F1 architecture sessions and later architecture comparisons.

## P2 --- Intelligent Product / Document Systems

Apps that combine product architecture with AIPE:

- document processing;
- search/retrieval;
- RAG;
- AI-assisted workflows;
- evaluation;
- citations/grounding;
- observability.

Primary use: F2 foundations where product/data boundaries need a concrete domain, then F6 AI Product Engineering.

## P3 --- Enterprise Frontend Platform

Reusable platform capabilities consumed by multiple apps:

- design system;
- tokens/themes;
- i18n;
- charts;
- diagrams;
- app shell;
- accessibility;
- generators/golden paths;
- shared frontend APIs;
- telemetry;
- developer experience.

The Engineering Book should become a real consumer of this platform.

Primary use: F3 and selected earlier F0 foundations.

## P4 --- Event-Driven Product System

Used for:

- messaging;
- Kafka/event streaming;
- idempotency;
- outbox;
- Saga;
- CQRS;
- Event Sourcing;
- reliability and failure experiments.

Primary use: F5.

## P5 --- AI Engineering Platform

Used for:

- AI gateway;
- provider abstraction;
- model routing/fallback;
- prompt/model/version management;
- tool architecture;
- RAG;
- evals;
- guardrails/security;
- observability;
- AI developer experience.

Primary use: F6--F7.

## P6 --- Intelligent Enterprise Platform Capstone

Integrates:

- frontend platform;
- backend/data;
- event-driven architecture;
- AI platform/RAG/agents;
- security;
- observability;
- reliability;
- scale;
- cost;
- governance;
- organizational adoption.

Primary use: F8--F10, especially capstone synthesis.

## Suggested repository shape

```text
principal-engineer-accelerator/
  apps/
    portfolio/
    architecture-labs/
    product-systems/
    event-driven/
    ai-platform/
    principal-capstone/
  packages/
    ui/
    design-system/
    theme/
    i18n/
    charts/
    diagrams/
    mastery/
    observability/
  site/
    es/
      index.*
      sessions/
        index.*
        PA-S001/
      concepts/
      projects/
    en/
      index.*
      sessions/
        index.*
        PA-S001/
      concepts/
      projects/
    shared/
      diagrams/
      assets/
      data/
  artifacts/
  data/
  docs/
```

## Responsibility split
- `apps/portfolio/`: executable professional portfolio.
- `site/`: separate canonical bilingual learning/theory website.
- other `apps/*`: executable learning systems/labs.
- `artifacts/`: durable engineering artifacts; not all public.
- `data/`: mastery/metrics/session data; only explicitly public-safe subsets may be published.

Do not duplicate full theory inside the portfolio.
If a repository already contains `apps/book/`, treat it as legacy structure and migrate non-destructively toward `apps/portfolio/` in an applicable Build. Preserve user work and history.
