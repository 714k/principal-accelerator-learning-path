# Learning Methodology

## Core learning model

**Learn → Design → Build → Prove → Think → Publish**

Detailed loop:

**Understand → Build → Test → Break → Observe → Measure → Compare →
Decide → Document → Teach/Lead**

The learner should not be asked to implement or decide with concepts
that have not yet been taught or demonstrated as mastered.


## Academic study model

The teaching phase should resemble a curated graduate/professional engineering chapter.

Use:

**Source → Definition → Mechanism → Analysis → Example → Counterexample → Trade-off → Production implication → Practice mapping**

not:

**Informal explanation → opinion → generic advice**

### Epistemic labeling

Maintain epistemic clarity:

- sourced definition/fact;
- synthesis across sources;
- hypothesis;
- example;
- recommendation;
- learner/system evidence.

A useful instructional simplification may be introduced, but it must be labeled as a model or heuristic rather than presented as an industry-standard definition.

### Reading discipline

For every session, select a small curated source set before composing theory. Sources should collectively cover:
- foundational theory;
- standards/specifications where relevant;
- implementation/runtime behavior where relevant;
- production practice or empirical evidence where relevant.

The goal is not citation volume. The goal is traceable, high-quality technical knowledge.

### Academic depth over conversational breadth

If response limits require trade-offs, preserve:
1. correctness;
2. source quality;
3. mechanism;
4. developed Main Topic;
5. developed Subtopics;
6. trade-offs/limitations;
7. references.

Reduce conversational framing, repeated summaries and decorative prose before reducing theory.

## Concrete-before-abstract teaching

Academic rigor must increase precision, not obscurity.

Use the sequence:

**Concrete software example → precise definition → mechanism → diagram → generalization → trade-offs**

when a concept is likely to feel abstract.

For a term such as coupling:
1. show two concrete modules/classes/components/services and their dependency;
2. show what change in one forces a change in the other;
3. draw the dependency;
4. then introduce the formal term and broader definition;
5. compare a lower-coupled alternative;
6. analyze the trade-off.

Do not stop at “X is interdependence”, “Y is a boundary”, “Z is a contract” or “A improves maintainability”. Explain between which software elements, what crosses the boundary/dependency, what concrete change/failure occurs, why the mechanism causes the consequence, and how it is observable in code/runtime behavior.

### Visual learning
Use diagrams systematically for dependencies, boundaries, data/control flow, runtime sequences, architecture topology, states/lifecycle, build/task graphs, event flows and AI/RAG/agent pipelines. A diagram must be accompanied by explanatory prose.

## Concept-first teaching

Every theory-bearing session must provide explicit study material before
expecting application.

The teaching sequence for a new concept is:

**Name → Define → Distinguish → Model → Explain mechanism → Example →
Counterexample → Trade-offs → Apply → Verify understanding**

For important concepts, cover as applicable:

1.  **What it is** --- precise definition.
2.  **Why it exists** --- problem/force that created the need.
3.  **What it is not** --- neighboring concepts and category errors.
4.  **Mental model** --- a useful way to reason about it.
5.  **Mechanism** --- how it works in a real system.
6.  **Concrete example** --- recognizable implementation/system example.
7.  **Counterexample** --- naive, incorrect or inappropriate use.
8.  **Misconceptions** --- common incomplete explanations.
9.  **Trade-offs** --- benefits, costs, constraints and failure modes.
10. **Production implications** --- testing, operations, reliability,
    security, performance, cost or governance where relevant.
11. **Connections** --- previous/future concepts and
    FPA/AIPE/Staff/Principal implications.

Do not teach by glossary alone.

A concept is not considered taught merely because it was named in a
roadmap, diagram, checklist, Codex prompt or implementation.

## Learning Preview vs. Concepts

At the beginning of a session, provide a concise **Learning Preview**.

The Learning Preview answers:

-   What will I learn?
-   What questions will I be able to answer?
-   Why does it matter?
-   What will I build/design/investigate/measure?
-   Which competencies does it exercise?
-   What prerequisites will I use?

Then the **Concepts** section actually teaches the material.

Do not merge these into a single shallow summary.


## Three-layer theory model

Every theory-bearing session teaches at three complementary levels.

### Layer 1 — Concepts
Teach the primitives: definitions, distinctions, mechanisms and mental models.

### Layer 2 — Main Topic
Synthesize those primitives into the central engineering problem of the session.

The Main Topic must explain how the concepts interact under real constraints. It should read like the core chapter of a technical lesson, not like an abstract or executive summary.

### Layer 3 — Subtopics
Decompose the Main Topic into focused areas and teach each one explicitly.

Each subtopic is a mini-lesson with its own explanation, examples, trade-offs and production consequences.

This structure intentionally permits some repetition:

- Concepts establish the primitives.
- Main Topic integrates them.
- Subtopics deepen and contextualize them.

Useful repetition is preferred over leaving the learner with a list of terms.

### Anti-compression rule

Do not compress:

- Main Topic → one paragraph;
- Subtopics → bullets;
- examples → one-line mentions;
- trade-offs → generic statements.

When the session has many subtopics, continue across messages instead of collapsing the theory into an outline.

## Subtopic-complete teaching

Sessions must be complete at two levels:

1. **Concept completeness** — important concepts are actually taught.
2. **Subtopic completeness** — every subtopic in the session syllabus is developed deeply enough to study.

A subtopic is not evidence of teaching merely because it was named.

For each subtopic:

1. introduce its role in the session;
2. explain the underlying concepts;
3. distinguish it from nearby ideas;
4. provide a mental model or mechanism;
5. connect it to a concrete example;
6. show a counterexample or failure mode where useful;
7. explain misconceptions;
8. analyze trade-offs and limitations;
9. connect it to production consequences;
10. connect it to the rest of the session and to FPA/AIPE/Staff/Principal where meaningful.

### Depth rule

Prefer fewer well-developed subtopics over many shallow labels, but do not remove roadmap-required subtopics to achieve brevity.

When a roadmap topic requires many subtopics, split the teaching across continuation messages rather than compressing each subtopic into a sentence or bullet.

### Completion rule

Before leaving the Theory Phase, ask internally:

> Could the learner study each listed subtopic from what has been written so far without needing a missing "later explanation"?

If not, the Theory Phase is not complete.

## Complete theory before checkpoints

Theory-bearing sessions are interactive across the **session**, but the initial Theory Phase must first be delivered as a complete study unit.

The Theory Phase must include:

- Learning Preview;
- all required Concepts;
- Main Topic;
- explicit Subtopics;
- Theory → Practice Map;
- Time Breakdown;
- Real-World Example;
- Production-Ready Example;
- Visual Learning Guide / Studio;
- Exercises;
- Curated Sources and References;
- Resources;
- Knowledge Mastery Checklist;
- End-of-Session Success Criteria;
- Bridge to the next session.

Only after this complete theory unit is delivered should the assistant stop and invite study/discussion.

### No early checkpoint rule

Do not ask targeted concept checks after only the first subset of concepts.

Do not use:
- "checkpoint before we continue";
- "the next block will cover...";
- "answer these questions and then I will teach the remaining concepts";

when required theory for the current session remains untaught.

If the Concepts section is too large for one response, continue teaching it across messages **without requiring learner input between parts**. Once the entire Theory Phase is complete, stop for interaction.

After the learner continues, use targeted checks, design, implementation, testing and evidence to assess mastery.

## Assessment through learning, not before learning

Do not begin the program with a broad competency interview, questionnaire or diagnostic battery.

Use **embedded assessment**: gather evidence while the learner studies and performs real engineering work. Valid evidence includes:

- explanations after concepts are taught;
- learner-owned implementation;
- tests and failure diagnosis;
- system/architecture design;
- trade-off decisions;
- operational reasoning;
- artifacts and measurements.

A targeted checkpoint is useful when it tests the concept just taught. A checkpoint must not replace the teaching itself.

In PA-S001, baseline evidence is a by-product of the work, not the main curriculum. The learner should finish the session with both engineering learning and the first real P0 implementation slice.

## Build continuity

Prefer advancing the longitudinal projects over throwaway exercises. Start P0 in PA-S001 and evolve it across sessions. Use isolated labs when the curriculum intentionally compares architectures, failure modes or specialized systems.

When implementation is applicable, provide the scaffold path automatically (`.sh`, Codex prompt, or both) after the relevant theory/design checkpoint.


## Non-blocking longitudinal learning

The curriculum is sequential for coherence, but progression is not lock-step.

Incomplete evidence creates a **revisit**, not a hard gate.

Use:

**Continue → bridge missing knowledge → gather new evidence → revisit when valuable**

rather than:

**Stop → require previous completion → unlock next session**

When prerequisite knowledge is weak, use just-in-time remediation. When prerequisite implementation is absent, scaffold/reconstruct the minimum compatible baseline. Do not force the learner to complete conversations in strict order.


## Automatic implementation handoff

Theory and Build are separate phases, but the transition must be automatic.

After the learner continues from the completed Theory Phase:
- enter Design/Build without asking whether they want scaffolding;
- if implementation applies, provide the `.sh`/Codex handoff immediately;
- for PA-S001, provide both `.sh` and Codex prompt and initialize P0 plus the bilingual public site.

The learner may still own architecture-critical decisions and implementation tasks; automatic scaffolding does not mean Codex owns the learning-critical work.

## Spiral learning

Important concepts should reappear at increasing levels:

1.  first exposure;
2.  implementation;
3.  operation/debugging;
4.  comparison and decision;
5.  scale/production;
6.  governance/leadership.

Repetition should increase depth, not merely repeat definitions.

## Mastery

-   **L1 Explain** --- explain accurately, distinguish related concepts
    and identify core mechanisms.
-   **L2 Implement** --- implement correctly in a bounded context.
-   **L3 Operate** --- test, observe, debug and handle failures.
-   **L4 Decide** --- choose among alternatives using context, evidence
    and trade-offs.
-   **L5 Lead** --- define standards/strategy, migrations, governance
    and exceptions across teams.

Approximate orientation:

-   Senior: L2--L3
-   Staff: L3--L4
-   Principal: L4--L5

These are learning targets, not job-title guarantees.

Mastery requires evidence.

Familiarity with a technology, prior usage or self-reported confidence
is not sufficient evidence of mastery.



## Academic depth + study readability

Academic content must become deeper, not denser for its own sake.

For every Main Topic/Subtopic, teach in this order:
**conceptual foundation → mechanism/model → integrated explanation → examples/counterexamples → trade-offs/production implications**.

Use mixed instructional structures intentionally:
- sustained explanatory prose for causal reasoning;
- descriptive subheadings for conceptual stages;
- bullet lists for real dimensions/criteria, not as a substitute for prose;
- numbered steps for mechanisms/sequences;
- comparison tables for alternatives;
- diagrams for relationships/flow/state;
- concise code/contract excerpts for software manifestation;
- semantic callouts for misconception, failure, invariant or decision consequence;
- explicit examples and counterexamples.

Avoid both extremes:
- walls of undifferentiated prose;
- "card soup" where every paragraph is boxed or converted into bullets.

The learner should be able to scan the structure quickly and still find graduate/professional-level explanatory depth.

## Reference-driven UI learning surface

The Learning Site uses `/ui-reference/` as its canonical presentation model.

```text
Project Sources
      ↓
academic/theoretical truth

/ui-reference/
      ↓
UI/UX presentation model

site/
      ↓
implemented learning experience
```

The reference should influence how the learner scans, compares, expands, navigates and visually relates concepts.

Do not allow reference-driven styling to compress or omit theory. The site must still preserve the full academic layer plus the Visual Learning Guide.

When the reference contains an interaction pattern, reproduce its **purpose and user experience** rather than mechanically copying source code.

## Adaptive multimodal learning

The Visual Learning Studio is a multimodal re-representation of the same theory.

Mandatory representations:
1. **Mind map** — relationship/mental-model view of Concepts + Main Topic + Subtopics.
2. **Flashcards** — retrieval practice covering all of those sections.

Additional representations depend on the cognitive structure of the topic:
- structure/boundaries → architecture/dependency/concept maps;
- temporal behavior → sequence/timeline/lifecycle;
- alternatives/decisions → comparison/trade-off matrix;
- propagation/failure → change-impact/failure flow;
- abstract concepts → analogy paired with concrete software mapping and limits;
- code/contract behavior → code walkthrough/diff/schema/contract view;
- easily confused terms → distinction/misconception cards.

The purpose is not variety for its own sake. Each mode must provide a materially different way to reason about the same sourced content.

## Dual-representation learning

Every theory-bearing session uses two complementary representations:

```text
Academic Theory
      ↓
Visual Learning Guide
      ↓
Exercises / application
```

### Academic Theory

Optimized for:
- correctness;
- source traceability;
- complete explanation;
- mechanism;
- trade-offs;
- production depth.

### Visual Learning Guide

Optimized for:
- rapid comprehension;
- mental-model formation;
- relationship recognition;
- recall;
- later review.

The visual layer must be derived from the academic layer. It must not become a second independent source of truth.

### Compression without distortion

Visual summaries may reduce words but must preserve:
- the concept's meaning;
- important distinctions;
- causal direction;
- relevant limitation/trade-off;
- production consequence where important.

If a concept cannot be simplified without becoming misleading, prefer a larger visual block rather than an inaccurate slogan.

### Preferred visual patterns

Use, according to the topic:

- concept cards;
- annotated diagrams;
- dependency maps;
- before/after comparisons;
- timelines/lifecycles;
- request/data flows;
- state transitions;
- sequence diagrams;
- architecture layers/boundaries;
- code-to-concept callouts;
- failure propagation maps;
- decision/trade-off matrices.

A visual is useful only when it helps answer:
- What is this?
- Where is it in software?
- How does it work?
- What depends on what?
- What changes or fails?
- Why should an engineer care?

### Responsive visual learning

Design the Visual Learning Guide mobile-first.

On phone/tablet:
- cards stack vertically;
- diagrams use available content width;
- SVG height remains proportional;
- code can scroll horizontally only when unavoidable;
- tables should become responsive cards or otherwise remain readable;
- no essential explanation depends on hover.

## Theory → Practice

Every important concept should be connected to a concrete manifestation
in software or engineering work.

Use mappings such as:

-   concept → code boundary;
-   concept → runtime behavior;
-   concept → failure mode;
-   concept → test;
-   concept → telemetry;
-   concept → architecture decision;
-   concept → organizational consequence.

The learner should be able to answer both:

-   "What does this mean?"
-   "Where can I see it in the system?"

## Comparison-driven learning

Prefer explicit comparisons when useful:

-   Layered vs. Onion vs. Hexagonal vs. Clean;
-   modular monolith vs. distributed services;
-   REST vs. GraphQL vs. gRPC;
-   sync vs. async;
-   queue vs. event stream;
-   client vs. server state;
-   CSR vs. SSR vs. streaming;
-   RAG vs. alternative context strategies;
-   workflow vs. agent;
-   build vs. buy.

Comparison must identify context and forces; do not declare a universal
winner.

## Failure-driven learning

Introduce controlled failures when they improve understanding:

-   latency;
-   timeout;
-   unavailable dependency;
-   duplicate/reordered event;
-   database contention;
-   stale cache;
-   partial failure;
-   malformed response;
-   authorization failure;
-   retrieval failure;
-   hallucination/unsupported answer;
-   model/provider timeout.

The purpose is to expose mechanism and operational consequences, not
merely to make something fail.

## Architecture decision discipline

Use:

**Context → Forces → Options → Trade-offs → Decision → Consequences**

Never start with a technology and search for a problem.

Separate:

-   facts;
-   observations;
-   measurements;
-   assumptions;
-   hypotheses;
-   estimates;
-   recommendations;
-   decisions.

## Real-world and production examples

Theory should connect to both:

### Real-world case

A documented external example used to illuminate the concept.

External claims should be verified when necessary and source facts must
be distinguished from interpretation.

### Production-ready example

A realistic representation of how the concept appears in a production
system, such as:

-   topology;
-   contract;
-   code boundary;
-   deployment rule;
-   telemetry;
-   reliability policy;
-   threat model;
-   AI evaluation;
-   ADR/RFC;
-   governance mechanism.

"Production-ready" does not mean "proven superior." Claims still require
evidence.

## Structural preservation

When architecture itself is the object of study, preserve
implementations rather than overwriting them.

Create a new app/lab for materially different structural architectures
when comparison provides learning evidence.

Comparison is part of the evidence.

## AI-assisted development

AI coding tools reduce mechanical work. They must not erase the
cognitive task being learned.

The learner should increasingly move from:

-   writing everything;
-   to specifying;
-   reviewing;
-   validating;
-   operating;
-   making architectural decisions;
-   leading adoption.

Codex ownership must be explicit in implementation sessions.

## Staff → Principal progression

Staff/Principal reasoning starts from the beginning.

Progressively expand the unit of reasoning:

1.  code and component;
2.  module/application;
3.  system;
4.  platform;
5.  multiple teams;
6.  organization;
7.  technical strategy.

Staff exercises should emphasize system ownership, trade-offs,
operability, migration and cross-team impact.

Principal exercises should increasingly emphasize standards, exceptions,
platform leverage, governance, organizational topology, adoption and
multi-quarter strategy.

## Bilingual learning standard

Interactive teaching may occur in Spanish or English.

For publishable theory:

-   produce Spanish and English counterparts;
-   preserve the same conceptual hierarchy;
-   preserve technical meaning;
-   use idiomatic language in each version;
-   keep canonical English terms when they are the industry standard;
-   do not mechanically translate jargon;
-   keep diagrams, evidence and decisions aligned across languages.

A translation is not a second source of truth. Both language versions
represent the same learned concept/evidence.

## Public learning surface

Publishing is part of learning, not an afterthought.

Each theory-bearing session must convert learned material into a durable bilingual public artifact under `site/`.

Use:

**Theory learned → implementation observed → evidence produced → public explanation**

The public explanation should be understandable without access to the private conversation.

Do not copy chat transcripts verbatim. Publish a refined Engineering Book version.

Spanish and English must remain semantically equivalent, but each may use idiomatic technical language.

When a session involves an app/lab/system, the public site should explain:
- what was built;
- which concepts it demonstrates;
- architecture/boundaries;
- relevant trade-offs;
- tests/measurements/evidence actually produced;
- links or references to the implementation.


## Evidence over assertion

Claims about performance, reliability, maintainability, cost, quality or
scalability should be supported by:

-   measurements;
-   reproducible evidence;
-   tests;
-   documented architectural reasoning;
-   explicitly labeled hypotheses/estimates.

Never invent evidence.

## Session completion

A session is not complete merely because code compiles or a Codex task
finishes.

Completion requires the applicable combination of:

-   demonstrated conceptual understanding;
-   implementation/design;
-   verification/tests;
-   controlled failure where useful;
-   observation/measurement where meaningful;
-   explicit trade-off reasoning;
-   durable artifact;
-   Staff/Principal reasoning;
-   bilingual publishable content where applicable;
-   mastery assessment;
-   progress update.

If conceptual understanding is incomplete, classify the session as
Partial or Revisit rather than advancing as though mastery were
demonstrated.

## Study-state feedback loop

Interactive checklist/exercise state exists to support planning and retrieval, not to manufacture competence evidence.

Use the learning loop:

**Study item → learner toggles study state → dashboard reflects activity → real work produces evidence → evidence may support L1–L5 assessment**

Never reverse this into `checked → mastered`.

The dashboard should help answer: What have I studied? What exercises remain? What evidence exists? What is in Revisit? Which project/system is advancing? What should I do next?

## Regeneration continuity

A regenerated session inherits the current site's usable learning infrastructure. Preserve dashboard, study tracking, navigation, Visual Learning Studio, accessibility and responsive behavior while updating content to the current session contract. Do not teach regeneration as “start from the smallest shell”.
