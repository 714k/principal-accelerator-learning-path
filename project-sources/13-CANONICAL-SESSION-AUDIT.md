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
- [ ] initializes P0 `apps/book`;
- [ ] initializes bilingual `site/`;
- [ ] never creates a throwaway diagnostic app.

When PA-S001 enters Build:
- [ ] automatically provide a runnable `.sh`;
- [ ] automatically provide a complete Codex prompt;
- [ ] do not wait for the learner to request either.

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
- rhetorical questions as teaching;
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
