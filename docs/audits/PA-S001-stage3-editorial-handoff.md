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

## Phase 1 validation — 2026-10-21

**Status: STAGE_3_BLOCKED.** The authored Spanish and English proposals cannot yet be promoted as a validated pair. In the CNCF illustrative scenario, the Spanish text diagram joins `Equipo consumidor A ----Equipo consumidor B` on the same line, instead of showing A and B as separate inputs to the shared capability. The English diagram shows three separate consumer-team branches. This changes the illustrated relationship and conflicts with the Spanish prose describing three teams. See `site/content/proposals/PA-S001-stage3-theory-es.md` lines 426–431 and the English proposal lines 426–432. Academic authorship is outside this implementation's authority; the diagram requires an author-supplied correction or explicit clarification before promotion.

Structural checks on the supplied proposals found 17 unique atomic concepts, one main topic and six subtopics in the same order in both languages; all 24 sections contain a retrieval question and answer. Both contain the original eight `PA-S001.check.*` IDs, eight success-criterion items, and source entries R1–R8 and P1. These checks do not establish full ES/EN semantic equivalence. The eight success items are unnumbered in the source; the handoff authorizes assigning the specified stable IDs by order during rendering.

Proposal integrity at inspection: ES 69,986 bytes, SHA-256 `0981e52ae72228ac53686782c775aa426011cf29d81fc68105cb7286aad603ad`; EN 64,544 bytes, SHA-256 `1f87b16d474f4ceee5daa9a42a600ce0847bf4ec76d94c344275026b7cea5b9c`. Production canonical sources, renderer, and Project Sources were not changed. No build, `npm run check`, browser tests, or Stage 3 screenshots were executed for this validation-only stop; historical Stage 2 results do not prove Stage 3 acceptance.

## Stage 3 implementation and verification — 2026-10-21

**Acceptance: STAGE_3_PASSED.** The author corrected both CNCF diagrams, superseding the earlier Phase 1 blocker. The three separate consumer branches now agree with the surrounding illustrative scenario. This status concerns the requested implementation and checks; it does not certify learner mastery or mark the session Completed.

### Academic and integrity review

The two proposals have 17 atomic concepts, one main topic and six subtopics in the same order, with 24 retrieval questions and answers in each language. Both retain the eight original study-check IDs, eight parallel success criteria, and R1–R8/P1 source entries. The concepts and subtopics were compared for instructional coverage and citations, and the corrected CNCF context, hypothetical scenario, alternatives, transfer and retrieval were reviewed across languages. The check is an implementation review, not an independent professional translation certification.

Promoted proposal bytes without rewriting them. Old canonical inputs: ES **45,577 bytes**, SHA-256 `4a29a68ec5ca5ed0b73c19c45ce7f4c18f3dba7824cfd8944c90db2e1a04af99`; EN **41,953 bytes**, SHA-256 `b63622e5fc36c562c83b7cc6c62a7858d4bf6aee99a8f2680267b367d15eb333`. New canonical inputs: ES **70,016 bytes**, SHA-256 `9a7c96cabc984a2e0a7d08c22475e28fd9815b4c6b2d177ba6509b562868abf5`; EN **64,546 bytes**, SHA-256 `ba9865813943c67f7aac8c906eeecf8e70bdf0bcd9563109bc9f6e60e48bdb34`. Tests assert equality with the proposal files and the build retains exact length/hash guards.

### Modified files

- `site/content/canonical/PA-S001-theory-es.md`, `site/content/canonical/PA-S001-theory-en.md`: exact authorized proposal bytes.
- `site/tooling/canonical.ts`: integrity values, bilingual headings, separate causal/retrieval paragraphs, linked grouped citations, and eight stable success controls.
- `site/tooling/concept-explorers.ts`: prerequisite labels resolved from canonical headings; unknown prerequisite IDs fail rendering.
- `site/tooling/render.ts`: include success IDs in existing local study activity accounting.
- `site/test/content.test.ts`: success criteria, proposal equality, code/diagram, source-link, list and table coverage.
- `docs/audits/PA-S001-stage3-editorial-handoff.md`: historical blocker and this result.
- Browser evidence under `artifacts/PA-S001/stage3-2026-10-21/`: `{es,en}-{390,1440}-{conceptual,causal}.png` and `{es,en}-390-page.png`.

The article keeps source order, full explanations, context-adjacent authored text diagrams and existing compiled SVG diagrams. The mind map and prerequisite links use human-readable names. Existing palette, typography, routes and four educational models remain in place. The new checkboxes share IDs across languages, are independent of the existing eight checks and do not modify mastery or canonical status. Grouped citation markers were linked individually after identifying that the renderer previously left them as unlinked text.

### Executed validation

- Node `v24.21.0`: `npm ci --ignore-scripts --no-audit --no-fund` succeeded (293 packages); preinstalled Mermaid Chromium was used.
- `npm run check`: succeeded after the final test changes: ESLint, TypeScript, 13 Node tests, 14 HTML pages and 23 Mermaid SVG sources, plus the generated-asset test. Paragraph-order, list/table, code-block, URLs, study IDs, 24 cards and source byte equality were checked.
- `node /tmp/pa-s001-stage3-matrix.cjs`: Chromium/Playwright passed ES/EN × 360/390/768/1440 × light/dark. The four explorers' options and results, status regions, labels, focus, keyboard arrow, emulated touch, reduced motion, body size (20 px mobile and 22 px wider), overflow, no-JS fallback, routes, cards and SVG presence were checked.
- `node /tmp/pa-s001-stage3.cjs`: all eight success controls were checked, persisted after reload, shared across locales and unchecked; the original study state also persisted. In both languages local anchors resolved, the SVG images actually decoded, and no-JS content and fallback cases remained available.
- `node /tmp/pa-s001-regression.cjs`: both languages passed search, theme switching/persistence, cross-language study state and Studio navigation/flip checks. Browser captures are at the evidence paths above; the ES mobile conceptual and EN desktop causal captures were visually inspected.
- External reference link checks: seven URLs returned HTTP 200 to HEAD. Both ISO URLs returned 403 to local HEAD and GET; an independent web reader opened both ISO landing pages successfully. Local automated access to those two pages remains restricted and the full standards may require a license. This is a source-access limitation, not evidence that those links are broken.
- `git diff --check` passed. No commit, push, deployment or merge was performed.

**Remaining limitations:** touch was emulated; no physical-device or real screen-reader test was executed. Live-region attributes and result updates were checked in Chromium, not actual assistive-technology speech. Browser tests do not establish WCAG conformance, learner comprehension or measured learning gains.
