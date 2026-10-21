# PA-S001 — Stage 3 instructional rendering handoff specification

**Status:** ChatGPT-authored ES/EN theory proposals are delivered under `site/content/proposals/`; **not yet published**, no Build evidence. These are academic source texts, not implementation claims. Keep PR #17 Draft.

## Canonical proposals

- `site/content/proposals/PA-S001-stage3-theory-es.md`
- `site/content/proposals/PA-S001-stage3-theory-en.md`

Both derive from the existing canonical theories with the 17 individual concepts retained; the main topic, six subtopics, theory→practice map, real-world example, Studio guide, and success criteria are expanded. **Do not overwrite** `site/content/canonical/` until both files pass structural/semantic review and integrity gates. Recalculate bytes/SHA-256 after acceptance, then update hardcoded historical guards and tests intentionally; do not weaken them or silence errors.

## The reading defect and required solution

The current renderer surfaces concept identifiers, prerequisite identifiers, paragraph-sized clusters of **cause → mechanism → effect → retrieval → answer**, and editorial metadata in normal reading. Merely increasing line-height will not help. Treat these as **structured knowledge blocks** and preserve every statement:

1. Prerequisites: resolve stable IDs through a localized label map. Show e.g. `Arquitectura de software` and `Atributo de calidad`; keep machine IDs only in href/data attributes, never as visible labels. Unknown ID must be reported as source-validation failure, not replaced with placeholder copy.
2. Concept teaching: show Foundation before Mechanism; then mechanism as explained flow/diagram with source link, worked example, edge cases, and only then retrieval/answer. Avoid inline emoji (📥, ⚙️, 📤) as an ersatz flowchart. Reflow **theory that exists**, do not invent new theory in renderer.
3. Topic and subtopic starts: begin with proper definition, purpose, scope and contrast. Guiding questions belong after teaching, not as first paragraph. For `main.p0-boundaries` and each `sub.*`, preserve all expanded paragraphs, examples, decision rationale, counterexamples and full references.
4. Atomic coverage manifest and theory→practice: readable localized concept names rather than `engineering.software`, `scope.*`, `fpa.frontend-platform`. IDs remain in hidden data and links for tests; include code metadata only in optional developer disclosure clearly separate from reading.
5. Real-world example: render the multi-step CNCF-context case faithfully; distinguish **CNCF-documented premise**, **hypothetical three-team scenario**, and **analogy to P0**, without implying real outcomes or inventing benchmarks.
6. Studio guide: remove reader-facing `engineering.*` diagrams-in-prose. Show actual accessible mind map + 24 full-coverage cards, with adjacent diagrams in applicable lessons. Labels and alternative lists must be comprehensible to new learners; source IDs in code are permitted but avoid exposing them as node text.
7. Success criteria: render **eight** reversible, persisted, bilingual shared-ID study checkboxes. Avoid overlap with existing eight mastery study checklist IDs. Suggested additional IDs (not mastery): `PA-S001.success.engineering`, `scope`, `quality`, `boundary`, `fpa`, `aipe`, `retrieval`, `evidence`; map to ES/EN check texts in same order. Study marks **never** imply L1–L5, completed status or empirical learning gains.
8. Typography and UI: do **not** alter original palette tokens. Default mobile 20–22px, desktop 22px, responsive diagrams and tables, no page horizontal overflow, keyboard/touch, visible focus, reduced motion, no-JS content fallback.

## Academically critical implementation boundary

**PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY.** Codex may normalize schema and renderer, not regenerate canonical ES/EN content. A markdown renderer is not permitted to silently drop authored paragraphs, source references or 24 retrieval answers. Preserve existing routes, portfolio separation, dashboards, evidence-backed mastery boundaries, study-history semantics, flashcards and SVGs. Do not recreate `apps/book/`.

Potential parser regression: the current source has eight original `PA-S001.check.*` study checklist IDs; the eight **new success criteria** use different shared keys. The checks must not be misinterpreted as additional certified mastery levels or alter the canonical eight mastery checklist identity semantics.

## Acceptance gate and required evidence

**No success declaration until:**

- Validate all 17 concept IDs, one main topic and six subtopics in both new proposals; exact concept order and semantically equivalent atomic coverage.
- Verify all 24 retrieval front/back pairs, eight original study checks, and eight additional success study checks.
- Source-vs-rendered order completeness: every substantive ES/EN paragraph, diagrams/flows, source link and scenario must survive publication; no summarization.
- Execute `npm ci` with Node 24, `npm run check`, actual Mermaid compilation and link check.
- Browser inspection at 360/390/768/1440 in both locales and light/dark; verify real checkboxes save/uncheck/switch language, navigation, search, flashcards, four reference explorations, Studio, no-JS, keyboard, and mobile readability.
- Inspect `git diff` and report actual commands, failures, omissions and screenshot paths.
- Update SHA-256 and byte integrity gates to **exact hashes of approved final canonical files**, not to values guessed from chat snippets. Deliver full existing-text-source and new-text-source byte counts.
- Do not merge #17 or publish until quality gates and learner UI review are satisfied.

### State of this document

This specification is a Stage 3 **academic and rendering contract**, not proof of a compiled or deployed site. The proposals have been stored on the remote branch but have not yet been adopted into the canonical input files. Stage 2 code remains independently testable; Stage 3 is awaiting implementation and verification.
