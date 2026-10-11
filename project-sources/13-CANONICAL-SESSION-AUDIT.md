# Principal Accelerator — Canonical Session Contract Audit

This file is a preflight checklist for every future `PA-Sxxx` conversation.
It exists to prevent regression into earlier failure modes.

## 1. Source-of-truth preflight

Before teaching:
- [ ] Load the session from `03-MASTER-ROADMAP.md`.
- [ ] Read `07-PROGRESS.md` for context, not authorization.
- [ ] Select the longitudinal app/lab/system from `09-PROJECTS-AND-APPS.md`.
- [ ] Apply `04-SESSION-TEMPLATE.md`, `05-LEARNING-METHODOLOGY.md`,
      `06-TECHNICAL-STANDARDS.md`, `11-CODEX-GUIDELINES.md`,
      and `12-ARTIFACT-AND-PUBLISHING-STANDARD.md`.
- [ ] Consider competency and decision logs.

## 2. Progression must never block

- [ ] A previous Not started / Partial / Revisit session does NOT block the requested session.
- [ ] Missing knowledge is bridged just-in-time.
- [ ] Missing technical baseline is minimally reconstructed/scaffolded.
- [ ] Unresolved work goes to Revisit/progress.
- [ ] Never require the learner to return to a prior conversation to unlock a later one.

## 3. PA-S001 invariants

PA-S001:
- [ ] teaches engineering foundations;
- [ ] is not a standalone diagnostic interview;
- [ ] initializes the real Accelerator repository;
- [ ] initializes P0 `apps/portfolio/` + separate `site/`;
- [ ] initializes bilingual `site/`;
- [ ] never creates a throwaway diagnostic app.

When PA-S001 enters Build:
- [ ] automatically provide a complete Codex prompt;
- [ ] provide a runnable `.sh` only if the repository/P0 structure must be initialized from zero;
- [ ] if compatible structure already exists, confirm that no shell script is required and Codex creates all session deliverables directly.

## 4. Complete Theory Phase before Build/checkpoints

Required visible order:

Session header / Objective
→ Learning Preview
→ Concepts
→ Main Topic
→ Subtopics
→ Theory → Practice Map
→ Time Breakdown
→ Real-World Example
→ Production-Ready Example
→ Visual Learning Guide / Studio
→ Exercises
→ Curated Sources and References
→ Resources
→ Knowledge Mastery Checklist
→ End-of-Session Success Criteria
→ Bridge

Then stop for study/discussion.

- [ ] No checkpoint before all theory is complete.
- [ ] No Codex/implementation during the initial Theory Phase.
- [ ] No “we will cover the remaining subtopics later”.
- [ ] If theory spans messages, continue automatically until the full Theory Phase is complete.

## 5. Academic theory quality

The Theory Phase must read like technical study material, not informal conversation.

- [ ] Curated source set selected before writing.
- [ ] Prefer standards/BoKs, peer-reviewed work, established books,
      recognized institutional reports, official specs/docs.
- [ ] Foundational definitions have sources.
- [ ] Non-obvious factual claims have citations.
- [ ] Technology/runtime claims use official specs/docs where available.
- [ ] Hypothetical examples are labeled.
- [ ] Recommendations are not presented as universal facts.
- [ ] ChatGPT/Codex are never cited as theory authorities.
- [ ] References list contains sources actually used.

## 5A. Clarity and concreteness

For every major Concept and every Subtopic:
- [ ] Plain technical definition is present.
- [ ] Software context is explicit.
- [ ] Concrete software elements are named.
- [ ] At least one concrete example is present.
- [ ] A meaningful diagram/flow/dependency sketch is present when applicable.
- [ ] The diagram is explained.
- [ ] Mechanism is explained, not merely named.
- [ ] Jargon is defined before use.
- [ ] No opaque one-line abstraction substitutes for teaching.

Reject explanations such as “Coupling describes interdependence” unless followed by a concrete software definition, mechanism, example and diagram.

## 5B. Production-ready example quality
- [ ] Context is concrete.
- [ ] Components are named.
- [ ] Diagram is present.
- [ ] Normal path is explained.
- [ ] At least one failure path is explained.
- [ ] Code/schema/config/contract excerpt is included when useful.
- [ ] Verification is stated without inventing results.
- [ ] Relevant production concerns are covered.
- [ ] Trade-offs/limitations are explicit.
- [ ] Connection to session theory is explicit.

## 5C. Checklist rendering
- [ ] `Knowledge Mastery Checklist` uses one Markdown checkbox per criterion.
- [ ] `End-of-Session Success Criteria` uses one Markdown checkbox per criterion.
- [ ] Neither section is rendered as comma-separated prose.

## Academic content + acronym audit

For every Main Topic and theoretical Subtopic:
- [ ] academic concept/definition and scope appear before quotations, recommendations or integrated discussion;
- [ ] mechanism/model follows the concept foundation;
- [ ] content has enough depth for independent study;
- [ ] presentation uses varied semantic structures where useful, not only walls of prose, bullets or rounded cards;
- [ ] examples/counterexamples and production implications are concrete.

For each ES/EN page:
- [ ] every acronym/initialism is expanded at least once before shorthand-only use.

## 6. Concepts / Main Topic / Subtopics

### Concepts
- [ ] Formal foundations: definition, scope, terminology, mechanism,
      examples/counterexamples, trade-offs, production implications.

### Main Topic
- [ ] Substantial integrated chapter, not one paragraph.
- [ ] Synthesizes concepts into an engineering model.
- [ ] Explains forces, mechanisms, consequences and trade-offs.
- [ ] Source-backed.

### Subtopics
- [ ] Every listed subtopic has its own `###` section.
- [ ] Every section contains substantial prose.
- [ ] Bullet lists do not substitute for theory.
- [ ] Prior mention in Concepts does not substitute for contextual deep development.
- [ ] Each section is independently useful for study.

## 7. Style

Prefer:
- formal technical prose;
- precise terminology;
- claim → evidence/rationale;
- definitions before use;
- explicit scope and distinctions;
- causal/mechanistic explanation.

Avoid:
- chatty narration;
- motivational filler;
- excessive second person;
- rhetorical/filler questions that substitute for teaching; purposeful guiding and retrieval questions are allowed and expected under the Learning Text Ergonomics Contract;
- “best practice” claims without context/source;
- unsupported certainty.

## 8. Build handoff

Once the learner continues after Theory:
- [ ] enter Design → Build → Prove → Think → Publish;
- [ ] provide scaffold automatically when implementation applies;
- [ ] explicitly separate CODEX-OWNED and LEARNER-OWNED;
- [ ] preserve learning-critical implementation/decisions for learner;
- [ ] preserve architecture variants as separate labs when comparison matters.

## 9. Public bilingual output

Every theory-bearing session:
- [ ] updates `site/es/sessions/PA-Sxxx/`;
- [ ] updates `site/en/sessions/PA-Sxxx/`.

When an app/lab/system is involved:
- [ ] updates ES/EN project pages;
- [ ] links Theory → Implementation → Evidence;
- [ ] preserves references/citations in ES/EN;
- [ ] does not publish secrets/confidential evidence.

## 9A. Portfolio vs Learning Site separation
- [ ] `apps/portfolio/` is treated as the professional portfolio.
- [ ] `site/` is treated as the separate learning/theory website.
- [ ] Full session theory is not conflated with portfolio content.
- [ ] Header title is `Principal Accelerator Learning Path`.
- [ ] Language controls are `en` and `es`.
- [ ] Light/Dark theme toggle exists.
- [ ] Layout is mobile-first/responsive.
- [ ] Phone and tablet/iPad reading is explicitly considered.
- [ ] Session page has breadcrumb.
- [ ] `/en/sessions/` and `/es/sessions/` indexes exist.
- [ ] Global header does not enumerate all PA sessions.
- [ ] Session TOC is collapsible.
- [ ] TOC is compact/collapsed on small screens.
- [ ] TOC control is keyboard accessible and exposes expanded/collapsed state.



## Learning Site dashboard/navigation audit

- [ ] `site/` home is a learning-progress dashboard.
- [ ] Dashboard uses only real/declared data.
- [ ] Study completion is visually/semantically separate from evidence-backed mastery.
- [ ] Knowledge Mastery Checklist / Exercise toggles do not award L1–L5.
- [ ] Charts match the data relationship and have accessible textual/table support where essential.
- [ ] Desktop global navigation includes phases/sessions and projects/systems.
- [ ] Current-page TOC is below global navigation or above content, not a wasteful second permanent rail by default.
- [ ] Phone is treated as priority layout, then tablet/iPad, then desktop.
- [ ] No page-level horizontal overflow.
- [ ] Default palette avoids decorative pink/purple/rainbow unless explicitly justified by product/domain/brand context.

- [ ] Trackable Exercises and Knowledge Mastery Checklist items have stable IDs.
- [ ] ES/EN equivalents share the same IDs.
- [ ] Toggle state keys do not depend on translated labels.
- [ ] Local study state cannot overwrite canonical mastery/evidence records.

## Canonical UI Reference audit

For every Learning Site implementation/regeneration:

- [ ] `/ui-reference/` was inspected before UI work.
- [ ] Relevant visual patterns were identified.
- [ ] Theory/content structure was mapped into the reference UI rather than an unrelated generic template.
- [ ] Look and feel is recognizably derived from the reference.
- [ ] Relevant interaction patterns are preserved or deliberately adapted.
- [ ] Repeated patterns were considered for reusable components/tokens.
- [ ] No dependency was introduced solely because the reference uses it.
- [ ] Accessibility and semantic HTML were preserved.
- [ ] Mobile/tablet responsiveness was preserved or improved.
- [ ] Mermaid diagrams still publish as responsive SVG.
- [ ] ES/EN pages preserve equivalent presentation and interaction.
- [ ] Content accuracy/academic requirements were not weakened.
- [ ] Material deviations from the reference are documented.

## Adaptive Visual Learning Studio audit

The Visual Learning Studio implements the existing `Visual Learning Guide` / `Guía Visual de Aprendizaje` section as an adaptive multi-mode learning experience; the visible section name may remain localized while the platform capability is called Visual Learning Studio.

For every theory-bearing session:
- [ ] content model declares visual-learning modes and source-section coverage;
- [ ] mandatory mind map covers every Concept + Main Topic + theoretical Subtopic;
- [ ] Mermaid `.mmd` exists under the session diagram directory;
- [ ] responsive SVG is generated/discovered through the canonical build pipeline;
- [ ] mind map has localized accessible title/description;
- [ ] diagram uses restrained accessible styling; no bright/rainbow decorative node palette;
- [ ] flashcards cover every Concept + Main Topic + theoretical Subtopic;
- [ ] each flashcard declares covered source section(s);
- [ ] front question + back answer/explanation exist;
- [ ] tap/click, keyboard, previous/next, counter, no-JS fallback and reduced-motion behavior exist;
- [ ] additional modes are supported by source content rather than invented to fill tabs;
- [ ] ES/EN preserve the same mode identifiers/coverage structure;
- [ ] validation fails new session content that violates this contract.

## Visual Learning Guide audit

For every theory-bearing session:

- [ ] `Visual Learning Guide` / `Guía Visual de Aprendizaje` exists.
- [ ] It appears after the full theory/examples and before Exercises.
- [ ] It derives only from theory already taught.
- [ ] It does not replace Concepts/Main Topic/Subtopics.
- [ ] Major concepts are represented visually or as concise cards.
- [ ] At least one meaningful relationship/flow/dependency visual is present when applicable.
- [ ] Concrete software elements are named.
- [ ] A compare/contrast block exists when useful.
- [ ] A small code/schema/config example appears when it improves understanding.
- [ ] A concrete failure/change consequence is shown when applicable.
- [ ] Fast-recall points preserve theory meaning and limitations.
- [ ] Mermaid-authored diagrams are published as responsive SVG.
- [ ] Layout works on phone/tablet without requiring diagram pan/zoom.
- [ ] Visual content remains accessible in Light/Dark themes.
- [ ] No unsupported facts, invented evidence or uncited non-obvious claims are introduced.

## 10. Evidence/mastery integrity

- [ ] No invented tests, metrics, benchmarks, AI evals or mastery.
- [ ] Separate facts, observations, measurements, hypotheses, assumptions,
      estimates, recommendations and fixture/demo data.
- [ ] Mastery requires evidence.
- [ ] End with exact proposed `07-PROGRESS.md` update.
- [ ] Status is Completed / Partial / Revisit, but status never locks future sessions.

## 11. Project Instructions size

`PROJECT-INSTRUCTIONS-SETTINGS.md` MUST remain below 8,000 characters.
Detailed rules belong in Sources; Settings contains only high-priority routing/invariants.

## 12. Rendered Learning Site hard-fail audit

For any session/build that creates, regenerates or materially changes `site/`, inspect rendered output in addition to source/configuration.

### Localized home `/es/` and `/en/`
- [ ] Home is a real learning dashboard, not only hero copy plus links/cards.
- [ ] Dashboard has available-data or explicit empty-state representations for learning progress/activity categories.
- [ ] Dashboard distinguishes study tracking from evidence-backed mastery.
- [ ] Essential chart information has accessible text/table/value equivalents.
- [ ] Global curriculum navigation exposes phase-grouped sessions, projects/systems and primary destinations.

### Session page
- [ ] Trackable Knowledge Mastery Checklist controls are enabled; default `disabled` checkboxes are a hard failure.
- [ ] Trackable Exercises expose enabled study controls where the exercise is intended to be tracked.
- [ ] Every trackable control has a stable machine ID shared by ES/EN.
- [ ] Toggle state can be changed and persisted using the current site architecture.
- [ ] Toggling does not mutate or award L1–L5/session completion.
- [ ] Visual Learning Studio is rendered and its mandatory mind-map + flashcard modes are usable.
- [ ] Main Topic/Subtopics visibly start with conceptual definition/scope before deeper material.
- [ ] Acronym expansion rule is satisfied on the rendered page.
- [ ] No public current-architecture prose says `apps/book` represents the Learning Site.

### Regression protection
- [ ] Existing richer site capabilities were inventoried before regeneration.
- [ ] No dashboard/navigation/tracking/studio/accessibility capability was silently removed.
- [ ] Generated Codex prompt contained the hard Learning Site gates inline.
- [ ] Rendered HTML was inspected after `npm run check`; passing source/build checks alone is insufficient.

Any failed item above means the Learning Site portion of the session is not complete.
## 13. Optional package verifier

When the repository has generated HTML available, the included `verify-learning-site-contract.py` may be run as an additional regression check. It does not replace repository-native tests or the audit above.

## 14. Learning Text Ergonomics hard-fail audit

For every theory-bearing session, inspect the actual rendered/visible theory—not only source-schema presence.

### Structure and signaling
- [ ] One dominant idea per paragraph is the norm; paragraphs do not bundle unrelated claims.
- [ ] Main idea/topic sentence appears early in substantial paragraphs.
- [ ] Long sections are segmented with descriptive subheadings and natural pauses.
- [ ] Bold emphasis is selective rather than decorative/high-frequency.
- [ ] Content is not mostly uninterrupted exposition, bullet-only summaries or card soup.

### Pre-training and terminology
- [ ] Unfamiliar terms required for the section are introduced before heavy use.
- [ ] Every new technical term is defined at first meaningful use or linked immediately to its prior local definition.
- [ ] Standards/artifacts such as ADR/RFC/ISO references are not dropped into prose unexplained.
- [ ] Each acronym/initialism is expanded on the page before shorthand-only use.

### Examples and learning rhythm
- [ ] Every important abstraction has a nearby concrete software example unless inherently concrete.
- [ ] Examples name concrete software elements and observable change/runtime behavior.
- [ ] Substantial sections vary rhythm across explanation/example/visual/retrieval/implication rather than pure exposition.
- [ ] Procedural/new skills use a worked → faded → independent sequence when pedagogically appropriate.
- [ ] Long sections contain brief retrieval/self-check prompts that do not block Theory completion.
- [ ] Main Topic/Subtopics use a substantive guiding question when appropriate and answer it explicitly near the end.

### Analogies
- [ ] Any analogy has explicit software mapping.
- [ ] Any analogy states where it stops mapping / can mislead.
- [ ] Analogy does not replace the formal definition.

### Visuals
- [ ] Diagram/table/timeline/flow type matches the structure of the knowledge.
- [ ] Visual is adjacent to the prose it explains.
- [ ] Concept/dependency maps label relationships where meaningful.
- [ ] Labels are placed directly in/near the visual objects where practical; no unnecessary legend lookup.
- [ ] Arrows/color have semantic meaning; palette is restrained and non-decorative.
- [ ] Visual is explained in prose and does not simply duplicate nearby text.

### Coherence and expertise adaptation
- [ ] Decorative anecdotes, trivia, motivational filler and seductive details unrelated to the objective are absent.
- [ ] Repetition has an explicit function (retrieval, contrast, deepening, synthesis or spaced revisit).
- [ ] Scaffolding depth is based on actual learner evidence where available, not job title/self-report alone.
- [ ] Previously demonstrated expertise may reduce redundant scaffolding but never remove required definitions/distinctions/source integrity.

Any material failure above means the Theory/Publishing portion is incomplete and must be corrected before the session is considered canonical.

## Canonical theory authorship and publishing contract — v5

This contract resolves the boundary between ChatGPT session teaching and Codex implementation.

### Authority split

**ChatGPT owns canonical theory authoring.** During the Theory Phase, ChatGPT must compose the complete source-backed ES session content to the required pedagogical standard and, before Build publication, produce or materialize the semantically equivalent EN content.

**Codex does not own theory authoring.** Codex owns schema integration, rendering, diagrams, interaction, build plumbing, migration, tests and publication. Codex must not independently shorten, summarize, "improve", replace or regenerate canonical theory prose merely to fit a renderer.

### Build handoff invariant

When Build begins for a theory-bearing session, the Codex handoff must carry canonical theory in one of these forms, in priority order:
1. the Codex prompt contains the exact approved ES/EN canonical content payload to materialize;
2. the prompt points to exact canonical content files already present in the repository.

A shell script is not part of normal publication; it is only valid for first-time deterministic scaffolding of a new repository/app/lab/system. A handoff that merely tells Codex to "write the session theory from the Sources" is incomplete.

If the canonical content payload/files are missing, Codex must stop and report `MISSING_CANONICAL_THEORY_PAYLOAD`; it must not invent a substitute chapter.

### Fidelity rule

Mechanical transformations are allowed only when they preserve meaning and instructional structure: escaping, stable IDs, schema normalization, localized link wiring, diagram references, citation IDs and equivalent markup segmentation.

Codex must preserve:
- section order and hierarchy;
- definitions/scope/distinctions;
- guiding questions and explicit resolutions;
- concrete examples and named software elements;
- retrieval/self-check prompts and their answers;
- counterexamples/failure modes;
- trade-offs/limitations;
- citations/source linkage;
- visual adjacency intent;
- epistemic labels and limitations.

Codex must not collapse several authored blocks into a generic paragraph or bullet list.

### Structured instructional content model

The canonical content schema should preserve instructional function explicitly rather than relying only on free-form prose. For substantial Main Topics/Subtopics, support typed blocks or equivalent semantics such as:

```text
pretraining[]
guidingQuestion
concept { definition, scope, distinctions, sources }
example { context, namedElements, behavior, consequence }
mechanism { explanation, visualRef? }
analysis[]
retrieval { prompt, answer, explanation }
counterexample/failure
tradeoffs[]
productionImplications[]
guidingQuestionResolution
```

Exact field names may differ, but the functions must remain representable and renderer-visible. A single string field containing a shallow paragraph is not a sufficient replacement for this structure.

### Validation principle

Validation must check both **presence and rendered instructional function**. A section does not pass merely because keys named `concept`, `example` or `visual` exist. Rendered output must contain substantive authored content for the applicable functions and preserve their ordering/proximity.

The canonical audit remains the semantic quality gate; machine checks provide regression protection, not proof of pedagogical quality.

## 15. Canonical theory authorship/fidelity hard-fail audit

For every theory-bearing session publication:

- [ ] The complete canonical ES theory was authored in the ChatGPT Theory Phase before Build.
- [ ] A semantically equivalent EN payload exists before/within the publication handoff.
- [ ] The Codex prompt materializes/references the exact canonical payload; it does not ask Codex to recreate theory from roadmap/Sources.
- [ ] `.sh` is absent unless a genuinely new repository/app/lab/system requires first-time deterministic scaffolding.
- [ ] Codex prompt contains `PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY` or equivalent unambiguous instruction.
- [ ] If canonical theory is unavailable, Codex is instructed to fail with `MISSING_CANONICAL_THEORY_PAYLOAD`.
- [ ] Renderer/schema preserves guiding questions, examples, retrieval prompts, counterexamples, trade-offs, citations and visual adjacency intent.
- [ ] Rendered page was compared against the canonical authored payload, not only checked for headings/keys.
- [ ] No authored explanatory prose was collapsed into generic bullets/cards merely for layout convenience.

Any failure means the session is not publication-complete.
