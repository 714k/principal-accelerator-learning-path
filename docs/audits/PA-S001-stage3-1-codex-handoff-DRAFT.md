# PA-S001 Stage 3.1 — Codex integration handoff (DRAFT / NOT AUTHORIZED TO PUBLISH)

## Scope and exact inputs

This branch contains ChatGPT-authored bilingual **proposals**, not approved canonical theory:

- `site/content/proposals/PA-S001-stage3-1-pedagogy-es.md`
- `site/content/proposals/PA-S001-stage3-1-pedagogy-en.md`

Both proposals include 17 separately authored Level 2 mechanisms, 7 source Mermaid diagrams converted from the 7 existing ASCII diagrams, and no remaining \`\`\`text fences. **Do not interpret this as verified educational completeness or build success.** Source Mermaid may need syntax review. Do not silently rewrite academic semantics to make Mermaid compile.

## Academic author review gate — STOP BEFORE CANONICAL PROMOTION

1. Inspect every one of the 17 Level 2 sections in ES and EN for its specific title, purpose, starting context, steps, consequence, counterexample/edge case and specific retrieval with explanatory feedback. Current proposals use some generic retrieval language: **this is an explicit open pedagogical defect** to be corrected by ChatGPT before publication.
2. Validate the diagrams against source semantics and each other. The 7 conversions include flow diagrams in main topic, subtopics and real-world example; 17 concepts currently do not each have contextual Mermaid. Decide which require an adjacent source-authored diagram (not necessarily all 17).
3. Verify the 17 concept sections, main topic, six subtopics, 24 flashcards, 8 study checkboxes and 8 success checkboxes, all sources, cross-language meaning, stable IDs.
4. Do not promote the proposals, update integrity hashes or implement renderer changes until academic review passes.

## Implementation phase AFTER academic approval

- Promote exact approved ES/EN bytes into canonical content; report UTF-8 bytes and SHA-256, update existing content-integrity gates without weakening checks.
- Ensure all authored Mermaid diagrams compile **at build time** to inline or emitted accessible SVG with human-readable ES/EN labels and linked source text. No diagrammatic ASCII remains. Preserve code snippets that are not diagrams.
- Place SVG beside the corresponding instructional mechanism; no diagram should be available only in a separate Studio.
- Render each Level 2 with a visible topic-specific title, learning purpose, scenario, steps, consequences, limits and separated retrieval. Do not turn full paragraphs into label-only cards or use emoji as diagrams.
- If the content model lacks a field, adapt schema/renderer without generating theory. Preserve all paragraphs and sources; no theory reauthoring by Codex.
- Maintain the original color palette, responsive premium hierarchy, 20–22px base on mobile, accessible light/dark, no page overflow, SVG pan/zoom or contained scrolling, no-JS theory.
- Preserve dashboards, phase/project navigation, 24 flashcards, 4 reference experiences, source-linked mind map, stable ES/EN study and success IDs, reversible persistence, and evidence-separated L1–L5 mastery.

## Verification (must execute, not assert)

- Run repository-required install/build/check/lint/type tests and `git diff --check`; inspect emitted HTML and actual compiled SVG counts; ensure no source Mermaid leaks as visible raw code.
- Browser at 360/390/768/1440, light/dark, both locales; check no-JS, keyboard, focus, reduced motion, checkboxes, flashcards, diagram labels, explorer scenarios, dashboard and route links.
- Test source-to-output completeness and ES/EN semantic parity, including all 17 mechanisms and 7+ diagrams.
- Report actual commands, stdout summaries, screenshots, defects, missing coverage and any accessibility limits. No fabricated metrics or mastery.

**Stop conditions:** missing concept coverage => `MISSING_ATOMIC_CONCEPT_COVERAGE`; incomplete theory payload => `MISSING_CANONICAL_THEORY_PAYLOAD`; other failed gate => `STAGE_3_1_BLOCKED`. Only after all tests and learner review may `STAGE_3_1_PASSED` be reported.

**Never merge PR #19 or modify main.** Keep Draft until the user explicitly approves.
