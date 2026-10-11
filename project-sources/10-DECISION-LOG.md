# Decision Log

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
