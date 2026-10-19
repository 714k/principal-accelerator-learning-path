> **CONTRATO V6 VIGENTE (2026-10-18):** `15-ADAPTIVE-LEARNING-EXPERIENCE.md` prevalece sobre las reglas históricas incompatibles de este documento. Una entrada `PA-Sxxx` entrega directamente el handoff de Codex con teoría canónica ES/EN completa y accesible para Codex; no se detiene en Study-only ni exige una segunda petición. ChatGPT sigue siendo autor exclusivo de la teoría; Codex solo la publica. Todas las sesiones usan selección de técnicas pedagógicas por concepto, con práctica de recuperación, repaso y simulaciones solo donde se justifiquen. Cualquier regla antigua que prohíba ese prompt está **derogada**.

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

## Decision — ChatGPT conversation theory companions

**Status:** Accepted.

A bare `PA-Sxxx` starts Study mode. ChatGPT immediately creates separate ES and EN Markdown companions (`PA-Sxxx-theory-es.md`, `PA-Sxxx-theory-en.md`) as the only substantive initial deliverable, surfaced in the same conversation for study/questions. Theory completion does not trigger Build. A later explicit Build/Codex/site/app request uses the synchronized companions as canonical publication payloads; Codex preserves, not recreates, their theory.


## Accepted — accelerated-learning format across canonical theory and Codex prompts
**CONTENT-006 — Accepted.** Every future theory session opens with a three-point 30-second synthesis, uses restrained paragraph-entry key-phrase emphasis and three reading levels, contextual causal labels, accessible inline 10-word glossaries, and context-grounded widget suggestions where appropriate. This applies in ChatGPT-authored ES/EN companions and is inlined into every later Codex publishing prompt. This is instructional presentation, not a license to alter application business logic or to let Codex author missing canonical theory. Detailed source: `14-ACCELERATED-LEARNING-UX.md`.

## Accepted — V6 automatic Codex handoff + adaptive pedagogy — 2026-10-18
- **FLOW-006 — Accepted:** bare `PA-Sxxx` generates the full Codex handoff directly, with ChatGPT-authored canonical ES/EN payload available to Codex; old Study-only prohibition superseded.
- **LEARN-006 — Accepted:** all 120 sessions adopt universal learning fundamentals plus evidence-aware selection of additional methods per atomic concept, with justified interactions and spaced retrieval; do not require all widgets.
- **CONTENT-007 — Accepted:** canonical authorship firewall stays intact; no Codex theory reauthoring.
