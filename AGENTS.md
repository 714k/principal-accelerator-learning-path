# Accelerator agent instructions

When the learner supplies session content in Spanish, translate it into English, add both locales to all relevant session navigation and indexes, and reuse the PA-S002 session UI as the look-and-feel reference for every session created from now on. Do not treat a Spanish expansion as complete while its English equivalent and ES/EN parity verification are missing. Spanish and English must have the same content, structure, interactions, and styles; only the language may differ.
Read docs/PA-S001-BUILD.md and learner-supplied Project Sources before editing.
Project Sources govern curriculum; Git governs code. Never invent source contents.
PA-S001 starts P0 apps/book and bilingual site/; no diagnostic app.
Preserve code and existing user edits. Inspect git status before work.
CODEX-OWNED: mechanical scaffold, rendering, routing, tooling, editorial publication.
LEARNER-OWNED: ADR decisions, reasoning, failure diagnosis, mastery, trade-offs.
Do not solve learner-owned tasks. Do not fabricate metrics or label the session Completed.
Do not weaken lint/type/tests or publish automatically. Keep architecture variants separate.
Use npm run check. Report commands, results, warnings, dependencies, and deviations.

## HTML semantics

Use HTML elements for their meaning, not only their presentation. Keep a single
page-level `h1`, then use `h2` through `h6` in order for nested sections; do
not choose heading tags solely for visual size. Use `p` for paragraphs, `ul`
or `ol` for genuine lists, `table` for tabular relationships, and the native
semantic element that matches the content before adding CSS or ARIA.

## Concept cards

Render every concept and definition using the shared concept-card pattern. When
an explanatory paragraph immediately follows a concept card, keep that paragraph
inside the preceding card rather than rendering it as detached body text.

## Study success criteria

Render every item under “Criterios de éxito de la sesión” and “End-of-session
success criteria” as a reversible checkbox with a stable study identifier.
