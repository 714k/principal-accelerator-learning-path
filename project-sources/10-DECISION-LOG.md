# Decision Log

## Accepted editorial architecture decision — atomic concepts before synthesis
**CONTENT-005 — Accepted.** For all 120 sessions and their later generated Codex prompts, composite Main Topics/Subtopics are decomposed into individual independently taught component concepts with stable bilingual IDs; no integrated exposition precedes those foundations. Instructional means (concrete examples, relevant inline diagrams/tables/lists/flows, retrieval+answer and named production consequences) are part of canonical ChatGPT-owned theory, not decorations Codex may generate as a substitute. Codex preserves/re-renders those authored functions exactly; failure if coverage is missing (`MISSING_ATOMIC_CONCEPT_COVERAGE`). See `05` authority, `04/11/12/13` gates.

Track durable technical decisions made during the Accelerator.

## Accepted program-level decisions — 2026-10-10

| ID | Session | Project/App | Decision | Artifact | Status |
|---|---|---|---|---|---|
| UI-001 | Program | `site/` | Learning Site home is an evidence-safe progress dashboard; study completion is separate from evidence-backed mastery. | Project Sources | Accepted |
| UI-002 | Program | `site/` | Desktop global navigation uses the primary navigation column for phases/sessions/projects; page TOC is below it or above article content; mobile-first priority is phone → tablet/iPad → desktop. | Project Sources | Accepted |
| LEARN-001 | Program | `site/` | Every theory-bearing session publishes an adaptive Visual Learning Studio with mandatory mind map + complete flashcards and topic-appropriate additional modes. | Project Sources | Accepted |
| CONTENT-001 | Program | `site/` | Main Topic/Subtopics begin with academic concept definition/scope before deeper development; every acronym is expanded at least once per page. | Project Sources | Accepted |
| STYLE-001 | Program | Accelerator UIs | Default decorative palette avoids pink, purple and rainbow/multi-hue combinations unless product/domain/brand context explicitly requires them. | Project Sources | Accepted |

## Accepted program-level decisions — implementation enforcement

| ID | Session | Project/App | Decision | Artifact | Status |
|---|---|---|---|---|---|
| UI-004 | Program | `site/` | Dashboard + interactive study tracking are P0 baseline capabilities from PA-S001, not deferred to PA-S006. | Project Sources | Accepted |
| UI-005 | Program | `site/` | Regeneration is preserve-and-extend: current richer site capabilities must not be replaced by a smaller scaffold. | Project Sources | Accepted |
| UI-006 | Program | `site/` | Trackable Exercise/Mastery controls are enabled, toggleable, persisted study-state controls with stable ES/EN IDs; `disabled` is non-compliant by default. | Project Sources | Accepted |
| GEN-001 | Program | Codex | Session-generated Codex prompts inline hard Learning Site acceptance gates rather than only referencing Sources. | Project Sources | Accepted |
| GEN-002 | Program | Codex | Codex is the default Build executor once compatible structure exists. `.sh` is reserved exclusively for deterministic first-time scaffolding of a new repository/app/lab/system and is not required for routine session deliverables, content publication, migrations or extensions. | Project Sources | Accepted |

## Accepted clarification — session executable targets and PA-S004

**APP-001 — Accepted (2026-10-23).** Every implementation handoff distinguishes primary runnable application/lab/package from the separate Learning Site publishing and Portfolio surfaces. When a session calls for a runnable deliverable, documentation alone does not satisfy it. The source-of-truth app map lives in `09-PROJECTS-AND-APPS.md`; Codex must resolve real paths against Git and preserve previous pilot sessions. Missing target is `MISSING_SESSION_APP_TARGET`.

**APP-004 — Accepted (2026-10-23).** PA-S004 initiates or extends a usable independent Design System + Storybook workbench. Component quantities and choices remain session-specific implementation scope, not universal constraints. Do not force a platform-wide refactor during S001–S005 discovery. The previously listed six components are a **proposal**, not an accepted fixed count.


## Status values

-   Proposed
-   Accepted
-   Superseded
-   Rejected
-   Experimental

## Rule

Do not record a technology preference as a decision unless context,
alternatives, trade-offs and consequences have been analyzed.

## Accepted program-level decisions — learning text ergonomics

| ID | Session | Project/App | Decision | Artifact | Status |
|---|---|---|---|---|---|
| LEARN-002 | Program | `site/` | Theory publishing must optimize learning ergonomics: local pre-training, one dominant idea per paragraph, structural signaling, immediate concrete examples, retrieval prompts, adjacent topic-fit visuals, optional bounded analogies and evidence-adaptive scaffolding. Pure exposition/bullet-only/card-soup output is non-compliant. | Project Sources | Accepted |

## Accepted program-level decisions — canonical theory authorship

| ID | Session | Project/App | Decision | Artifact | Status |
|---|---|---|---|---|---|
| CONTENT-002 | Program | `site/` | ChatGPT/session Theory Phase is the canonical author of complete academic learning content; Codex publishes/integrates it and may not independently reauthor or compress it. | Project Sources | Accepted |
| CONTENT-003 | Program | `site/` | Theory-bearing Build handoffs must carry exact canonical ES/EN content payload/files; missing canonical theory causes a hard publication stop rather than Codex synthesis. | Project Sources | Accepted |
| CONTENT-004 | Program | `site/` | Renderer/schema must represent instructional functions explicitly enough to preserve pre-training, guiding question, examples, mechanism/visual, retrieval, failures/trade-offs and resolution. | Project Sources | Accepted |

## Decision — domain-separated theory before cross-domain synthesis

**Status:** Accepted.

Every theory-bearing session separates Staff → Principal Software Engineering, Frontend Platform Architecture (FPA), and AI Product Engineering (AIPE) concepts/theory before any mixed treatment. Cross-domain synthesis is conditional and explicitly labeled. This prevents the curriculum from obscuring which competency track a concept develops.

## Historical decision — Study-only conversation theory companions (SUPERSEDED)

**Status:** Superseded by **FLOW-009 / Source 16** (2026-10-25). ES/EN canonical files remain required after block approvals, but bare `PA-Sxxx` now produces only the editorial inventory. Do not interpret this historical item as an active trigger contract. The files are created before composing the prompt and must be transportable to the Codex workspace.

## Accepted — accelerated-learning format across canonical theory and Codex prompts
**CONTENT-006 — Accepted.** Every future theory session opens with a three-point 30-second synthesis, uses restrained paragraph-entry key-phrase emphasis and three reading levels, contextual causal labels, accessible inline 10-word glossaries, and context-grounded widget suggestions where appropriate. This applies in ChatGPT-authored ES/EN companions and is inlined into every later Codex publishing prompt. This is instructional presentation, not a license to alter application business logic or to let Codex author missing canonical theory. Detailed source: `14-ACCELERATED-LEARNING-UX.md`.

## Accepted — V6 automatic Codex handoff + adaptive pedagogy — 2026-10-18
- **FLOW-006 — Superseded by FLOW-009:** the former immediate Codex handoff remains historical; do not use it as a current trigger.
- **LEARN-006 — Accepted:** all 120 sessions adopt universal learning fundamentals plus evidence-aware selection of additional methods per atomic concept, with justified interactions and spaced retrieval; do not require all widgets.
- **CONTENT-007 — Accepted:** canonical authorship firewall stays intact; no Codex theory reauthoring.

## V8 — Approved application-target enforcement (2026-10-24)

- **APP-008 — Accepted:** Every `PA-Sxxx` handoff distinguishes (a) primary runnable app/lab/platform/package or justified durable review/design artifact, and (b) bilingual Learning Site publication; the latter never replaces the former.
- **APP-004 — Accepted:** PA-S004's primary implementation is **Design System + runnable Storybook**, accessible real components, tokens, stories and applicable tests. Portfolio and Learning Site are secondary/publishing surfaces, not substitutes. Component number/framework/paths remain session-specific after actual repository and Radar inspection. Failure marker: `MISSING_SESSION_APP_TARGET`.
- **MAP-008 — Accepted as planning baseline, not frozen execution contract:** Source 09 carries mapped primary targets for all 120 sessions. Other rows may be refined by session decisions and real Git state; do not infer apps were already built.
- **PILOT-008 — Accepted:** Review S001–S005 collectively before generalizing platform contracts at S006; preserve capabilities between sessions, avoid speculative rewrites.


## FLOW-009 — Accepted, 2026-10-25 — Editorial review by parts

Supersedes FLOW-006 immediate Codex prompt. Bare `PA-Sxxx` now triggers only a comprehensive editorial inventory; the student requests/reviews/accepts the Main Topic and then each Subtopic and other sections individually. Consolidated ES, EN and Codex are later separately requested. Source 16 is authoritative. Also accepted: one visible H1, no printed Nivel 1/2/3 headings, local concept introduction in EVERY topic, independently verified named-company real-world cases, production-ready scenarios with actual contracts/failure/testing/ops, and no Accelerator project in academic teaching examples. Preserve Source 09 app targets, including PA-S004 Storybook.


## FLOW-010 / CONTENT-010 / EVIDENCE-010 — aceptadas, 2026-10-31

**FLOW-010 (Accepted).** La versión vigente revisa por bloques con aceptación explícita; petición literal de sesión completa permite un borrador íntegro pero **no implica aprobación**. Los fragmentos aprobados no se modifican sin reconfirmación. La activación de entrega inmediata de Codex de versiones anteriores permanece **SUPERSEDED** dentro de este paquete documental.

**CONTENT-010 (Accepted).** Se prohíben los IDs de máquina impresos en cualquier texto académico visible (título, índice, definición, tarjetas, tablas). Cada concepto en el inventario se expresa **«término: definición breve»**, y se desarrolla localmente dentro del Tema principal o Subtema correspondiente. Un H1 único y títulos naturales. Ningún «Nivel 1/2/3» visible para capas de lectura. La teoría trata sistemas externos; Accelerator solo en Teoría→Práctica/entregables.

**QUALITY-010 (Accepted).** La profundidad se prueba con mecanismos técnicos concretos, escenarios adversos, alternativas, justificación y verificación; un marcador «ejemplo real» requiere una fuente primaria que sustente exactamente el mecanismo descrito. Production-ready sin implementación y pruebas ejecutadas se denomina *diseño de referencia no validado*. Diagramas y flashcards no sustituyen desarrollo. Auditoría humana obligatoria tras checks automáticos.

**PILOT-010 (Accepted).** PA-S001–PA-S005: comparar los cinco antes de estandarizar S006–S120, y preservar productos/capacidades existentes; no imponer estructuras internas iguales.
