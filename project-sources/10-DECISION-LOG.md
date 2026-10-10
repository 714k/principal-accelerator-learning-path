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

## Status values

-   Proposed
-   Accepted
-   Superseded
-   Rejected
-   Experimental

## Rule

Do not record a technology preference as a decision unless context,
alternatives, trade-offs and consequences have been analyzed.
