# Projects and Apps — targets for 120 sessions (v10)

**APP TARGET IS NOT THE ACADEMIC CASE STUDY.** Source 09 determines *what will be built after editorial approval*; university/industry examples explain theory elsewhere. A session's `site/` page, Portfolio link or diagram is not an executable substitute for its named app. Targets are plans, not confirmed Git paths or completed builds.

**PA-S004:** first runnable Design System + Storybook (exact component list is configurable); **PA-S039:** evolution, not reinvention. S001–S005 pilot capabilities preserved, then reviewed for platformization.


## Project selection rule

Sessions should advance longitudinal systems whenever possible. Do not create a throwaway app merely because a session contains an exercise.

At session start, identify the primary project/app/lab and state whether the session **initializes**, **extends**, **compares**, or **reviews** it.

A bare `PA-Sxxx` requests the complete editorial inventory first; individual sections are drafted and approved by the learner before any canonical ES/EN consolidation and later Codex handoff. Use a `.sh` only to initialize a NEW repository/app/lab/system from zero when no compatible baseline exists; once structure exists, Codex creates all session deliverables directly.


## Non-blocking project continuity

A missing or incomplete previous session must not block work on a longitudinal project.

If the expected prior project state is absent, reconstruct or scaffold the minimum compatible baseline and continue. Record the gap as a revisit/deviation.

Session completion status is not an app/project unlock mechanism.

## Mandatory per-session app target resolution (P0–P6)

The main session Codex handoff must identify **two distinct output planes**:

1. **EXECUTABLE PRODUCT / LAB / PACKAGE**: name, purpose, `INITIALIZE | EXTEND | COMPARE | REVIEW`, actual verified repository path or a proposal pending repo inspection, runnable demonstration if applicable, acceptance evidence, CODEX-OWNED vs LEARNER-OWNED work. If no new app is appropriate, explicitly name the existing app extended or state `NO NEW APP — design/review/evidence only` with reasons.
2. **LEARNING/PUBLISHING SURFACE**: canonical ES/EN session theory under `site/` and relevant bilingual project page. Publishing outputs are **in addition to** the executable deliverable; `apps/portfolio/` or `site/` must not silently replace the session-specific P1–P6 app target.

Resolve the target from `03-MASTER-ROADMAP.md` + this source + actual Git state; inspect existing capabilities first. Preserve the pilot S001–S005 products, avoid speculative platform refactors, and identify new vs existing work. Entries in the roadmap are learning intent, not proof an app already exists. Never invent executed changes, benchmarks or evidence. No universal number of components/apps/labs per session. For P1 preserve independent architectural variants; for P3 evolve early Design System capabilities; for P2/P4/P5/P6 extend longitudinal systems rather than starting unrelated demos.

**Handoff rejection:** a PA-S004 implementation plan containing only Portfolio and Learning Site work, with no runnable Storybook/Design-System output and no explicit documented reason/deviation, is incomplete: `MISSING_SESSION_APP_TARGET`.


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
| PA-S001 | Initialize Accelerator repository + first runnable `apps/portfolio/` slice + current bilingual `site/` baseline: dashboard home, global curriculum nav, Light/Dark, interactive study tracking, Visual Learning Studio, Mermaid→SVG and responsive publishing. |
| PA-S002 | Evolve repository into Accelerator monorepo; add engineering standards, workspace/package boundaries and quality gates. |
| PA-S003 | Deepen portfolio architecture and Learning Site content/information architecture without conflating the two surfaces. |
| PA-S004 | **INITIALIZE a runnable Design System + Storybook component workbench (P3 early pilot)**, not just documentation in `apps/portfolio/` or `site/`. Create/extend an independently consumable design-system package, Storybook stories, design tokens, accessible interactive components, appropriate tests, and ES/EN Learning Site theory/project pages. Preserve PA-S001–S003 working features; do not hard-code component count or an unverified repo path. |

### PA-S004 — accepted executable target, adaptable implementation details

- **Primary executable target:** a separate **Design System + Storybook** workbench for reusable frontend components, tokens and accessibility. Storybook serves as a runnable development/documentation surface for components, distinct from the professional Portfolio and the theoretical Learning Site.
- **Paths:** inspect Git, the Technology Radar and `/ui-reference/` first; use an appropriate existing design-system package/workbench if present, or establish a compatible new package/workbench without touching other apps destructively. Suggested locations (`packages/design-system/`, a Storybook workspace) are *not* claims about existing paths.
- **Suggested first sample, not fixed or accepted count:** Button, TextField, Checkbox, Select, Dialog, Tabs; choose actual scope based on existing code, covered theory and the session handoff. Do not impose six components on S005 or other sessions, or force Storybook-specific internals into downstream architecture.
- **Implementation acceptance:** Storybook runs; real stories cover representative states/interactions; design tokens and a11y mechanisms are demonstrated; applicable automated checks are run and their actual results reported; publish the unchanged canonical ES/EN theory and project link separately under `site/`.
- **Pilot preservation:** PA-S004 builds on PA-S001–S003 without breaking dashboards, nav, Studio, content, persisted study tracking, light/dark, responsive UI or `apps/portfolio/`; PA-S005 may build on those capabilities without changing the nature of PA-S004 output.

| PA-S005 | Deepen ES/EN content architecture and i18n for Learning Site and applicable portfolio surfaces. |
| PA-S006 | Deepen/refactor theme, chart and learning/mastery visualization architecture already present since PA-S001; do not introduce the dashboard for the first time here. |

Baseline/mastery evidence belongs in normal evidence/data artifacts and may be linked from the Learning Site when public-safe. It is not a separate diagnostic application.


## Learning Site home/dashboard

`site/` home is the Accelerator learning dashboard, not a marketing landing page.

It should summarize available, non-invented data through appropriate cards, tables and charts, including where available:
- roadmap/session progress;
- learner-tracked checklist and exercise completion;
- evidence-backed mastery separately;
- artifacts/evidence;
- revisit queue;
- longitudinal project/system progress;
- recent activity/next work.

Global navigation is a scalable curriculum navigator. On desktop it should expose sessions grouped by phase plus projects/systems and principal site destinations. The current-page TOC belongs below global navigation or above article content rather than occupying a separate mostly-empty rail.

Every session page contributes data/content required for this dashboard and the adaptive Visual Learning Studio.

## Canonical UI Reference — `/ui-reference/`

`/ui-reference/` is a repository-level reference surface used to define the intended UI/UX of the Principal Accelerator Learning Site.

It is not another production app and is not the canonical location for theory.

```text
/ui-reference/   → canonical look/feel + interaction reference
site/            → actual bilingual Learning Site implementation/content
apps/portfolio/  → separate professional portfolio
```

When P0 creates or evolves `site/`, use `/ui-reference/` to guide overall visual language, session/content layouts, concept presentation, Visual Learning Guides, interactive disclosure, responsive behavior, navigation and reading experience.

Do not force unrelated applications/labs to copy the Learning Site UI unless the relevant session deliberately adopts the same design language.

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

## Proposed session-to-application map — all PA-S001–PA-S120

**Status/provenance:** This is a **planning hypothesis**, built from the current Master Roadmap (topics) and the user's requested app-by-session plan. It is **not** evidence that a project/app exists or that 120 builds are fixed. `PA-S001` P0 targets and `PA-S004` Design System/Storybook target are explicit approved pilot intents; the other app assignments are suggested implementation paths to be validated at their session. PA-S002–S005 must preserve already working behavior, and generalized contracts are decided only after reviewing all five pilot sessions. Session-specific component counts, framework choices and exact paths must be verified, not inferred from this map.

In each handoff, identify the **executable deliverable first**, and show the separately published ES/EN Learning Site chapter/project page second. `REVIEW` / `DESIGN` rows need not create a new application; they create durable design/evidence artifacts and may extend an existing app only where justified. This table is a planning input, not a claim of completed work.

| Session | Proposed mode | Primary executable / durable target |
|---|---|---|
| PA-S001 | INITIALIZE | P0 Portfolio + bilingual Learning Site |
| PA-S002 | EXTEND | P0 Accelerator monorepo, packages, standards and CI |
| PA-S003 | EXTEND | P0 Portfolio architecture + Learning Site information architecture |
| PA-S004 | INITIALIZE/EXTEND | P3 Design System library + runnable Storybook workbench |
| PA-S005 | EXTEND | P0/P3 bilingual content and i18n contracts |
| PA-S006 | EXTEND | P0 Learning Site dashboard, theme and charts |
| PA-S007 | EXTEND | P1 abstraction and encapsulation design lab |
| PA-S008 | EXTEND | P1 coupling/cohesion dependency change lab |
| PA-S009 | EXTEND | P1 SOLID/GRASP examples and architecture tests |
| PA-S010 | EXTEND | P1 dependency inversion/injection lab |
| PA-S011 | EXTEND | P1 Strategy/Factory/composition patterns lab |
| PA-S012 | EXTEND | P1 Adapter/Facade/Decorator integration lab |
| PA-S013 | EXTEND | P1 Observer/Command/State behavior lab |
| PA-S014 | EXTEND | P1 repository/specification persistence lab |
| PA-S015 | INITIALIZE | P1 independent Layered Architecture app |
| PA-S016 | INITIALIZE | P1 independent Onion Architecture app + AI adapter |
| PA-S017 | INITIALIZE | P1 independent Hexagonal Architecture app + ports/tools |
| PA-S018 | INITIALIZE | P1 independent Clean Architecture app |
| PA-S019 | INITIALIZE | P1 independent Vertical Slice/Modular Monolith app |
| PA-S020 | COMPARE/REVIEW | P1 architecture comparison + ADR + evidence |
| PA-S021 | INITIALIZE | P2 Document Product frontend + REST API |
| PA-S022 | EXTEND | P2 API contracts/OpenAPI validation |
| PA-S023 | EXTEND/COMPARE | P2 GraphQL as alternate API contract |
| PA-S024 | EXTEND | P2 real-time processing notifications |
| PA-S025 | EXTEND | P2 authentication/identity |
| PA-S026 | EXTEND | P2 authorization/AI permissions |
| PA-S027 | EXTEND | P2 PostgreSQL domain model and migrations |
| PA-S028 | EXTEND | P2 concurrency and transaction lab |
| PA-S029 | EXTEND | P2 query optimization and indexes |
| PA-S030 | EXTEND | P2 caching experiments and policies |
| PA-S031 | EXTEND | P2 document search and retrieval foundations |
| PA-S032 | REVIEW | P2 data architecture ADR and review |
| PA-S033 | EXTEND | P3 browser rendering architecture lab |
| PA-S034 | EXTEND | P3 event loop/asynchronous execution lab |
| PA-S035 | EXTEND | P2/P3 domain-oriented frontend modules |
| PA-S036 | EXTEND/COMPARE | P3 frontend state architecture comparisons |
| PA-S037 | COMPARE | P3 CSR/SSR/SSG/streaming rendering examples |
| PA-S038 | INITIALIZE | P3 microfrontend shell + independent remotes |
| PA-S039 | EXTEND | P3 evolve PA-S004 Design System as consumer-facing platform |
| PA-S040 | EXTEND | P3 tokens/theme/multi-brand variants |
| PA-S041 | EXTEND | P3 component public APIs and Storybook stories |
| PA-S042 | EXTEND | P3 accessibility testing and governance |
| PA-S043 | EXTEND | P3 monorepo dependency and boundary tests |
| PA-S044 | EXTEND | P3 build caching and CI developer tooling |
| PA-S045 | INITIALIZE/EXTEND | P3 golden-path generator/developer workflow |
| PA-S046 | REVIEW | P3 adoption RFC and platform strategy |
| PA-S047 | EXTEND | P2/P3 network flow/DNS/TCP/TLS diagnostic lab |
| PA-S048 | EXTEND | P0/P3 Web Vitals and browser profiling |
| PA-S049 | EXTEND | P0/P2/P3 bundle/rendering/memory optimization |
| PA-S050 | EXTEND | P2 containerized runtime |
| PA-S051 | EXTEND | P2 cloud/deployment/load distribution lab |
| PA-S052 | EXTEND | P2 delivery pipeline and feature flags |
| PA-S053 | EXTEND | P2 structured logging and telemetry |
| PA-S054 | EXTEND | P2 OpenTelemetry metrics |
| PA-S055 | EXTEND | P2 cross-service distributed tracing |
| PA-S056 | EXTEND | P2 SLI/SLO/error-budget dashboard |
| PA-S057 | EXTEND | P2 timeout/retry/circuit-breaker failure lab |
| PA-S058 | REVIEW | P2 incident/failure engineering lab and postmortem |
| PA-S059 | INITIALIZE | P4 independent distributed failure-model lab |
| PA-S060 | EXTEND | P4 consistency/partition scenarios |
| PA-S061 | EXTEND | P4 replication/partitioning scenarios |
| PA-S062 | EXTEND | P4 ordering/coordination scenarios |
| PA-S063 | INITIALIZE | P4 event-driven product with queue/PubSub |
| PA-S064 | EXTEND | P4 Kafka/event streaming |
| PA-S065 | EXTEND | P4 idempotent consumers and delivery semantics |
| PA-S066 | EXTEND | P4 transactional outbox |
| PA-S067 | EXTEND | P4 Saga workflow/compensation |
| PA-S068 | INITIALIZE | P4 independent CQRS implementation |
| PA-S069 | INITIALIZE | P4 independent Event Sourcing implementation |
| PA-S070 | REVIEW | P4 event architecture and failure review |
| PA-S071 | EXTEND | P2 AI-assisted document capability |
| PA-S072 | EXTEND | P2/P5 prompt/context composition and versioning |
| PA-S073 | EXTEND | P2/P5 structured-output validation |
| PA-S074 | EXTEND | P2/P5 tool calling contracts/permissions |
| PA-S075 | INITIALIZE | P5 AI gateway/provider abstraction |
| PA-S076 | EXTEND | P2 AI streaming UX |
| PA-S077 | INITIALIZE | P2/P5 ingestion and document-processing pipeline |
| PA-S078 | EXTEND | P2/P5 chunking and embeddings |
| PA-S079 | EXTEND | P2/P5 vector search |
| PA-S080 | EXTEND | P2/P5 hybrid retrieval and metadata |
| PA-S081 | EXTEND | P2/P5 reranking and context selection |
| PA-S082 | EXTEND | P2/P5 production RAG application |
| PA-S083 | EXTEND | P2/P5 retrieval and groundedness eval suite |
| PA-S084 | REVIEW | P2/P5 RAG architecture ADR and evidence review |
| PA-S085 | COMPARE | P5 workflow vs agent executable implementations |
| PA-S086 | INITIALIZE | P5 agent loop and orchestration runtime |
| PA-S087 | EXTEND | P5 tool registry/execution architecture |
| PA-S088 | EXTEND | P5 agent state/memory |
| PA-S089 | EXTEND | P5 human-in-the-loop review/approval UI |
| PA-S090 | EXTEND | P5 agent evaluation/failure suite |
| PA-S091 | EXTEND | P5 AI security and prompt-injection defenses |
| PA-S092 | EXTEND | P5 multi-consumer AI gateway platform |
| PA-S093 | EXTEND | P5 model routing/fallback/governance |
| PA-S094 | INITIALIZE/EXTEND | P5 AI developer portal and adoption artifacts |
| PA-S095 | REVIEW | P2/P3/P4/P5 threat models |
| PA-S096 | EXTEND | P2/P5 web/API security controls/tests |
| PA-S097 | EXTEND | P3/P5 supply-chain/platform security |
| PA-S098 | REVIEW | P2/P4/P5 capacity estimates and models |
| PA-S099 | EXTEND | P2/P4/P5 load-test harness/results |
| PA-S100 | EXTEND | P2/P4 backpressure/rate limiting |
| PA-S101 | EXTEND | P2/P4 autoscaling lab |
| PA-S102 | DESIGN/COMPARE | P6 multi-region design/lab when justified |
| PA-S103 | EXTEND | P6 recovery/backup restoration exercise |
| PA-S104 | REVIEW | P6 cost/FinOps analysis |
| PA-S105 | REVIEW | P6 system-design requirements/template |
| PA-S106 | DESIGN/COMPARE | P6 real-time collaboration design/prototype |
| PA-S107 | DESIGN/COMPARE | P2/P6 search/knowledge system design |
| PA-S108 | DESIGN/COMPARE | P4/P6 enterprise event-driven design |
| PA-S109 | DESIGN/COMPARE | P5/P6 AI knowledge platform design |
| PA-S110 | DESIGN/COMPARE | P3/P6 enterprise frontend platform design |
| PA-S111 | REVIEW | P6 architecture standards/governance catalog |
| PA-S112 | REVIEW | P6 architecture review practice/artifacts |
| PA-S113 | REVIEW | P6 multiquarter technical strategy/roadmap |
| PA-S114 | REVIEW | P6 Principal architecture/design review |
| PA-S115 | INITIALIZE | P6 Intelligent Enterprise Platform capstone |
| PA-S116 | EXTEND | P6 frontend/backend/data integration |
| PA-S117 | EXTEND | P6 event-driven/AI integration |
| PA-S118 | EXTEND | P6 reliability/security/scale/cost proof |
| PA-S119 | REVIEW | P6 architecture and adoption strategy |
| PA-S120 | REVIEW/PUBLISH | P6 final capstone + Portfolio/Learning Site evidence showcase |

## Suggested repository shape

```text
principal-engineer-accelerator/
  ui-reference/
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

## P0 dashboard data contract

Every published session contributes stable dashboard-addressable data where applicable:
- session ID/phase/status context;
- exercise IDs and learner study state;
- Knowledge Mastery Checklist IDs and learner study state;
- evidence/mastery references separately;
- artifacts/revisits/project association.

The dashboard may show zero/empty states honestly. Empty evidence is preferable to invented mastery.
