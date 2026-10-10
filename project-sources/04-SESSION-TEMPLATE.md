# Mandatory Session Template

Every `PA-Sxxx` conversation should use this structure, adapting depth
to the topic. Sections that are not applicable should be marked as such
rather than filled with invented content.

The default learning sequence is:

**Learn → Design → Build → Prove → Think → Publish**

The detailed learning loop is:

**Understand → Build → Test → Break → Observe → Measure → Compare →
Decide → Document → Teach/Lead**



## Non-Blocking Progression Gate

Inspect `07-PROGRESS.md` for context, never for authorization.

- Never block a requested session because a prior one is incomplete.
- Never require `Status: Completed` to start the next session.
- Bridge missing prerequisite knowledge just-in-time.
- Reconstruct/scaffold a minimum technical baseline when prior code is missing.
- Record unresolved work as `Revisit`.
- Continue the requested session.


## Academic Presentation Contract

The Theory Phase is a study artifact, not a chat transcript.

### Required scholarly structure

Use the following presentation discipline:

- `## Concepts`: formal definitions, distinctions, mechanisms and foundations with inline citations.
- `## Main Topic`: sustained integrated exposition. It should develop a thesis/problem, derive relationships among the concepts, analyze constraints and consequences, and cite the literature/standards used.
- `## Subtopics`: one substantial `###` section per subtopic. Each section must be written as a mini-chapter, not a bullet explanation.
- `## Curated Sources and References`: bibliography of sources actually used, with precise sections/chapters where practical.

Lists may summarize after the prose, but must not replace explanatory paragraphs.

### Minimum content pattern per major subtopic

Use this pattern when applicable:

1. **Definition and scope** — authoritative definition(s), source and boundaries.
2. **Purpose/problem** — engineering force that motivates the concept.
3. **Mechanism** — how the concept works in a real system.
4. **Distinctions** — neighboring concepts and terminology.
5. **Analytical model** — relationships, invariants, dependencies or causal model.
6. **Example** — clearly labeled concrete example.
7. **Counterexample/failure mode** — why a plausible alternative fails or differs.
8. **Trade-offs/limitations** — costs, constraints and contexts where it may not apply.
9. **Production implications** — testing, operations, security, reliability, performance, cost or governance where relevant.
10. **FPA/AIPE/Staff/Principal relevance** — only where technically meaningful.
11. **Sources** — citations adjacent to the claims they support.

Do not force identical wording for every subtopic; preserve academic coherence.

### Tone

Prefer textbook/technical-report prose over coaching language.

Do not repeatedly address the learner with "tú", "veremos", "imagina", "piensa en", or conversational transitions when formal exposition is clearer.

Use questions primarily in Learning Preview, Exercises and later checkpoints—not as substitutes for exposition.

### Source quality gate

Before completing the Theory Phase, verify:

- [ ] foundational definitions are sourced;
- [ ] normative claims are tied to standards/specifications when available;
- [ ] technology behavior is supported by official documentation/specification;
- [ ] non-obvious claims are cited;
- [ ] examples are distinguished from sourced facts;
- [ ] recommendations are labeled as contextual judgments;
- [ ] the references section contains only sources actually used.

## Concrete Teaching Gate

Before considering any Concept/Main Topic/Subtopic taught, verify all applicable items:
- [ ] The term is defined in plain technical language.
- [ ] The software-engineering context is explicit.
- [ ] Concrete software elements are named.
- [ ] At least one concrete example is provided.
- [ ] The example explains actual dependencies/data/control/change behavior.
- [ ] A diagram/flow/dependency sketch is included and explained.
- [ ] A counterexample or contrasting case is included where it improves understanding.
- [ ] Jargon is defined before use.
- [ ] The explanation could be understood without inferring missing context.

A one-sentence abstraction does not satisfy the Theory Phase.

### Example quality bar
Do not write only:
> Coupling describes interdependence.

Write substantially enough to answer:
- What is coupling in software development?
- Coupling between which concrete elements?
- What makes coupling higher or lower?
- What developer/runtime consequence does that create?
- What code/dependency example demonstrates it?
- What does the dependency graph look like?
- When is coupling acceptable or intentional?

### Diagram rule
Each important Concept/Subtopic must include a meaningful diagram or visual model when technically applicable. For software architecture and system concepts, assume a diagram is applicable unless there is a clear reason otherwise.

## Mandatory Theory Gate

For a theory-bearing session, the **Theory Phase is a complete deliverable** and must be finished before any learner checkpoint, architecture exercise, scaffold, Codex prompt, implementation, testing, or assessment.

The first teaching response must use this exact theory-phase structure:

```text
# PA-Sxxx — <official title>

**Phase · Session · estimated duration**

**Objective:** ...

## Learning Preview

## Concepts

## Main Topic

## Subtopics

## Theory → Practice Map

## Time Breakdown

## Real-World Example

## Production-Ready Example



## UI Reference application rule

For every theory-bearing session that publishes or regenerates Learning Site content:

1. inspect `/ui-reference/` before defining the page presentation;
2. identify the relevant reference patterns for the session content;
3. map the session's theory hierarchy to those patterns;
4. preserve the reference look-and-feel and interaction model where appropriate;
5. adapt rather than copy when accessibility, responsiveness or content semantics require it.

The Theory Phase content remains academically governed by the Project Sources. `/ui-reference/` governs how that content is **presented and interacted with**, not what factual/theoretical claims are made.

The Visual Learning Guide should use `/ui-reference/` as the primary UI inspiration for cards, diagrams, comparisons, progressive disclosure, code callouts and rapid-learning patterns.

## Visual Learning Guide — mandatory second representation

After the complete academic theory, and before `## Exercises`, add:

```text
## Visual Learning Guide
```

This section is a **second representation of theory already taught**. It does not replace or shorten `Concepts`, `Main Topic`, `Subtopics`, Real-World Example or Production-Ready Example.

Its purpose is rapid comprehension and review.

### Required content

Adapt the visual guide to the session, but normally include:

#### 1. At a glance
A compact visual summary of:
- the central problem;
- the main concepts;
- the relationship between them;
- the production consequence.

Prefer a diagram or compact card layout rather than a paragraph.

#### 2. Concept cards
Create one concise visual card for each major concept/subtopic.

Each card should answer, in plain technical language:

```text
WHAT IS IT?
WHY DOES IT MATTER?
WHERE DOES IT EXIST IN SOFTWARE?
HOW DOES IT WORK?
WHAT BREAKS / WHAT CHANGES?
```

Use named software elements, not abstract nouns.

Example:

```text
COUPLING

What:
How strongly module A depends on module B.

In software:
CheckoutComponent → PaymentService

Change consequence:
If CheckoutComponent depends on Stripe-specific methods,
changing payment provider also changes CheckoutComponent.
```

#### 3. Visual mechanism
Show the important flow, dependency, lifecycle, state or interaction.

Examples:
- dependency graph;
- request/data flow;
- sequence;
- before/after boundary;
- event flow;
- render pipeline;
- RAG/agent pipeline.

Use Mermaid as source when appropriate, but the published Learning Site must render the generated responsive SVG according to the Mermaid → SVG publishing standard.

#### 4. Compare / contrast
When useful, use a compact comparison:

```text
Tightly coupled            Lower coupled
--------------             -------------
A knows B internals        A depends on interface
change B → change A        change B adapter only
simple initially           extra abstraction
```

Do not imply that one option is universally superior.

#### 5. See it in code
Include a minimal code/config/schema excerpt when code makes the mechanism clearer.

The snippet must be small enough to scan quickly and must illustrate the exact concept already taught.

#### 6. Failure / consequence
Show one concrete failure or change scenario visually:

```text
Change / failure
      ↓
affected element
      ↓
propagation
      ↓
user/runtime/developer consequence
```

#### 7. Fast recall
End with 3–7 short statements the learner should be able to recall quickly.

These are not new claims. They must be faithful summaries of the academic theory above.

### Visual design rules

The Learning Site presentation should favor:

- short labeled blocks/cards;
- clear hierarchy;
- diagrams;
- arrows/relationships;
- comparison blocks;
- concise code;
- whitespace;
- progressive disclosure when the visual guide is large.

Do not turn this section into another long prose chapter.

Do not use decorative visuals that do not teach something.

### Epistemic integrity

The Visual Learning Guide must not:
- introduce unsupported facts;
- omit a critical limitation in a way that changes meaning;
- turn a contextual recommendation into a universal rule;
- replace citations for factual claims.

Where the visual summary contains a non-obvious factual or normative claim, preserve an appropriate citation/reference link back to the sourced theory.

## Exercises

## Curated Sources and References

## Resources

## Knowledge Mastery Checklist

## End-of-Session Success Criteria

## Bridge to PA-Sxxx
```

Then stop.

Do **not** ask the learner a checkpoint question before this structure is complete.

Do **not** postpone required concepts to a later block after asking questions.

If `## Concepts` is very large, it may span multiple assistant messages only when necessary. In that case:
- label the continuation clearly as `## Concepts — Part N`;
- do not ask questions between parts;
- continue until all required concepts are taught;
- then complete every remaining Theory Phase section;
- only after that stop for learner discussion.

The Theory Phase must not include Build/Codex implementation yet. `Theory → Practice Map` may preview where concepts will appear later, but implementation starts only after the learner asks to continue.


## 1. Session Overview

State:

-   session ID/title;
-   phase;
-   simultaneous areas: FPA / AIPE / Staff / Principal;
-   prerequisite sessions/concepts;
-   app/lab/system involved;
-   expected durable artifact;
-   estimated session duration.

## 2. Objective

State what the learner should understand, explain, apply and/or decide
by the end of the session.

## 3. Session-mode guardrail

Before proceeding, determine whether the session is primarily theory+build, design/review, implementation, or operations.

Do not convert a session into a broad upfront diagnostic interview. Mastery is gathered progressively from normal session work. Targeted concept checks are allowed after teaching; broad questionnaires are not a substitute for `## Concepts` or Build.

For PA-S001, initialize P0 --- Engineering Book / Portfolio and the Accelerator repository. Never scaffold a separate diagnostic application.

## 4. Learning Preview

Before detailed teaching, exercises, architecture work, Codex or
implementation, show a concise syllabus containing:

-   concepts and terminology to be learned;
-   key questions the session will answer;
-   why the concepts matter;
-   what will be built, designed, investigated or measured;
-   connection to FPA, AIPE, Staff and/or Principal engineering;
-   prerequisite concepts used.

The preview must let the learner understand what the session intends to
teach.

It is not a substitute for the Concepts/Theory section.

## 5. Concepts

This is the primary study section for every theory-bearing session.

Teach concepts before expecting the learner to apply them when they are
new or not yet demonstrated as mastered.

For each important concept, explain as applicable:

### Definition and purpose

-   What is it?
-   Why does it exist?
-   What problem does it solve?

### Terminology and distinctions

-   Precise vocabulary.
-   Neighboring concepts that are commonly confused.
-   Category errors to avoid.

### Mental model and mechanism

-   How should the learner reason about it?
-   How does it work?
-   What boundaries, dependencies, state or control/data flow are
    involved?

### Examples

-   Concrete example.
-   Counterexample or naive implementation.
-   Production-oriented example when useful.

### Misconceptions

-   Common misunderstanding.
-   Why it is wrong or incomplete.

### Constraints and trade-offs

-   What does the concept improve?
-   What does it make harder?
-   When is it inappropriate or overengineering?

### Engineering implications

-   Production implications.
-   Operational implications.
-   Testing/observability/security/performance implications where
    relevant.

### Connections

-   Relationship to previously learned concepts.
-   Relationship to future sessions.
-   FPA / AIPE / Staff / Principal connection where meaningful.

Do not turn this section into a glossary of short definitions.

Conceptual material should be substantial enough to study independently
before the learner attempts the exercises.

If the theory is too large for one response, split only the `## Concepts` section across continuation messages when technically necessary. Do not insert learner questions/checkpoints between parts. Complete all Concepts and all remaining Theory Phase sections before asking the learner to respond.

## 6. Main Topic

This is a **full theory section**, not a title, slogan, short thesis or summary.

Develop the central engineering problem that unifies the session.

Cover, as applicable:

- problem/context;
- why the problem exists;
- forces and constraints;
- integrated mental model;
- how the session concepts interact;
- mechanisms/relationships;
- integrated concrete example;
- counterexample/failure mode;
- misconceptions;
- trade-offs/limitations;
- production implications;
- FPA / AIPE / Staff / Principal implications.

The Main Topic should synthesize the Concepts into a coherent model the learner can reason with.

A Main Topic consisting only of one or two paragraphs is insufficient when the session contains substantial theory.

## 7. Subtopics

This is a **second layer of theory development**, not merely an index.

Use one developed heading per subtopic:

```text
## Subtopics

### Subtopic A
<substantial explanatory theory>

### Subtopic B
<substantial explanatory theory>
```

For every subtopic, explain as applicable:

- what it is and its scope;
- why it exists / why it matters;
- terminology and distinctions;
- mental model/mechanism;
- concrete example;
- counterexample/failure mode;
- misconceptions;
- trade-offs and limitations;
- production implications;
- relationship to the Main Topic;
- relationship to other subtopics;
- FPA / AIPE / Staff / Principal implications.

A brief index/list may appear first, but it cannot replace the developed subsections.

Do not treat prior coverage in `## Concepts` as sufficient by itself. The Subtopics section must develop each subtopic in the context of the session.

Before leaving `## Subtopics`, verify that every listed item has its own substantive explanatory section.

## Mandatory Subtopic Coverage Gate

`## Subtopics` must not be a bare list that introduces material which has not been taught.

For every item in `## Subtopics`, there must be substantial explanatory coverage in the Theory Phase.

Preferred structure when helpful:

```text
## Concepts

### Concept / Subtopic A
- definition and purpose
- terminology/distinctions
- mental model/mechanism
- example
- counterexample
- misconceptions
- trade-offs/limitations
- production implications
- relationships / FPA / AIPE / Staff / Principal

### Concept / Subtopic B
...
```

A subtopic may be nested under a broader concept, but the learner must still receive enough explanation to understand and study that subtopic independently.

Before moving to `## Theory → Practice Map`, verify:

- [ ] every roadmap-required subtopic has been taught;
- [ ] every additional subtopic introduced by the session has been taught;
- [ ] none exists only as a bullet, heading, table cell or future promise;
- [ ] no "we will cover this later" remains for theory required by the current session.

If one or more checks fail, continue the Theory Phase before proceeding.

Additional mandatory checks:

- [ ] `## Main Topic` contains a developed synthesis, not only a thesis/summary.
- [ ] every subtopic appears under its own `###` heading.
- [ ] every subtopic heading contains substantive explanatory prose.
- [ ] prior mention in `## Concepts` is not being used as a substitute for the required Subtopics development.

## 8. Theory → Practice Map

Mandatory table mapping important concepts to concrete code,
architecture, system elements, experiments, operational behavior or
decisions.

Example columns:

  Concept   Where it appears   Evidence/verification
  --------- ------------------ -----------------------

## 9. Time Breakdown

For sessions with an expected timebox, propose a realistic distribution
across:

-   concept study;
-   concept checks;
-   design;
-   implementation;
-   testing/failure;
-   measurement;
-   decision/artifact;
-   publishing/reflection.

Do not let implementation consume the entire session when conceptual
learning is an objective.

## 10. Real-World Example

Use at least one relevant real-world case when it materially improves
understanding.

For external factual claims:

-   use reliable/primary sources when necessary;
-   distinguish verified facts from interpretation/inference;
-   do not repeat folklore as fact.

Explain exactly which concept the case demonstrates.

## 11. Production-Ready Example

Provide a **complete concrete production scenario**, not an abstract policy fragment.

Required structure when applicable:

### Context
Name the product/use case and the user/system outcome.

### Components
Name the concrete software elements involved.

### Diagram
Show topology, dependency flow, sequence or data flow.

### Normal path
Explain step-by-step what happens when the system works.

### Failure path
Choose at least one realistic failure. State what fails, where it is detected, which component owns the response, what the user/system observes, and how recovery/fallback works if any.

### Implementation/contract excerpt
Include a small but meaningful code, schema, API, configuration or interface excerpt.

### Verification
State concrete tests, checks or telemetry that would verify the claimed behavior. Do not invent successful results.

### Production concerns
Cover only relevant concerns: accessibility, security, reliability, performance, observability, deployment, cost, compatibility or governance.

### Trade-offs and limitations
Explain what is intentionally not solved and the cost of the chosen approach.

### Theory connection
Map the example explicitly to Concepts/Main Topic/Subtopics.

The example must be understandable without hidden context.

## DESIGN / BUILD PHASE — begins only after Theory Phase completion and learner continuation

## 12. Architecture Before Implementation

When architecture matters:

-   show boundaries;
-   dependencies;
-   data flow;
-   control flow;
-   ownership;
-   failure boundaries;
-   relevant quality attributes.

Ask architecture reasoning questions before coding.

## 13. Build Objective

Define the concrete executable outcome, if the session includes
implementation.

For theory/review sessions with no meaningful build, state the
appropriate design, analysis or evidence objective instead.

## 14. Build Plan

Use incremental steps, files/packages/components and checkpoints.

When implementation is applicable, **automatically provide an executable scaffold entry point in the first Build turn**. Do not wait for a separate learner request. Prefer a ready-to-run `.sh` script for repository/app/package creation and a Codex prompt for bounded implementation. The learner should not need to ask separately.

The scaffold must target the longitudinal project selected from `09-PROJECTS-AND-APPS.md`, not an unrelated throwaway app unless the roadmap explicitly calls for an isolated lab.


### PA-S001 required Build handoff

When PA-S001 enters Build, provide **both** artifacts immediately:

1. `bootstrap-pa-s001.sh` (or equivalently named runnable shell script).
2. A complete Codex prompt ready to paste into VS Code.

The script/prompt must target the real Accelerator repository and initialize:
- `apps/book`;
- repository/workspace baseline;
- public bilingual session routes/content under `site/es/sessions/PA-S001/` and `site/en/sessions/PA-S001/`;
- public project pages for the Engineering Book;
- appropriate lint/typecheck/test/build plumbing.

Do not create a diagnostic app. Do not ask the learner whether they want the scaffold; provide it automatically.


## 15. Codex Ownership

Explicitly list:

### CODEX-OWNED

Mechanical/repetitive/scaffolding work.

### LEARNER-OWNED

The conceptual implementation, diagnosis, trade-offs and decisions the
learner must perform.

## 16. Codex Prompt

When Codex is appropriate, provide a complete prompt ready to paste into
Codex in VS Code. Follow `11-CODEX-GUIDELINES.md`.

If Codex is not useful, explicitly say why.

## 17. Guided Implementation

Use:

**Code/Change → Concept Check → Architecture Check →
Failure/Verification**

Do not dump a complete solution when learner-owned implementation is the
learning objective.

## 18. Concept Checkpoints — after the complete Theory Phase

Ask targeted questions that reveal whether the learner understands:

-   mechanism;
-   boundaries;
-   failure modes;
-   trade-offs;
-   alternatives;
-   consequences.

Do not use only recognition/multiple-choice questions.

## 19. Deliberate Wrong Implementation

When pedagogically useful, introduce or analyze a plausible naive
design, category error or architecture violation.

Require the learner to diagnose why it fails or what cost it creates
before revealing the full analysis.

## 20. Testing

Select tests that match the architecture, as applicable:

-   unit;
-   integration;
-   contract;
-   E2E;
-   architecture;
-   accessibility;
-   performance;
-   security;
-   AI evaluation.

## 21. Break It

Run controlled failure experiments appropriate to the session.

## 22. Measure It

Collect real evidence where quantification is possible.

Never fabricate dashboard values.

Label fixture/demo values explicitly.

## 23. AI Product Engineering Lens

When relevant, analyze AI as a product/system dependency:

-   UX;
-   model behavior;
-   context/retrieval;
-   tools;
-   evals;
-   security;
-   reliability;
-   latency/cost;
-   observability;
-   governance.

Do not force AI into unrelated topics.

## 24. Staff Engineering Exercise

Require system-level reasoning such as:

-   trade-offs;
-   ownership;
-   migration;
-   operability;
-   cross-team impact;
-   ADR/RFC review;
-   standards and exceptions.

## 25. Principal Engineering Exercise

When appropriate, require organization-level reasoning such as:

-   standards;
-   exceptions;
-   adoption;
-   governance;
-   cognitive load;
-   platform leverage;
-   strategy;
-   cost;
-   multi-team consequences.

## 26. Exercises

Include conceptual, implementation and/or decision exercises appropriate
to the session.

Do not provide learner-owned solutions before the learner has a
reasonable opportunity to solve them.

## 27. Resources

Provide verified, high-quality resources.

For each resource, explain:

-   why it matters;
-   which chapter/section/document to study;
-   whether it is required or optional depth.

Prefer primary documentation and authoritative books/papers.

## 28. Knowledge Mastery Checklist

Use Markdown checkboxes for **every criterion**. Format each item exactly as `- [ ] ...`. Never collapse criteria into a comma-separated sentence.

Criteria should be demonstrable. Prefer:

-   "I can explain X and distinguish it from Y."
-   "I can diagnose Z."
-   "I can defend a choice between A and B."

Avoid vague items such as "I understand X."

## 29. Mastery Test

Assess as applicable:

-   L1 Explain
-   L2 Implement
-   L3 Operate
-   L4 Decide
-   L5 Lead

Do not award mastery solely from self-report.

## 30. Session Artifact

Produce at least one durable artifact:

-   ADR;
-   RFC;
-   diagram;
-   benchmark;
-   eval report;
-   threat model;
-   postmortem;
-   architecture review;
-   strategy;
-   package;
-   app;
-   system-design document;
-   other evidence aligned to the session.

## 31. Publish --- Spanish

Create/update publishable Spanish theory and case-study content for the
Engineering Book.

Use the same conceptual hierarchy as the session:

-   Objective;
-   Concepts;
-   Main Topic;
-   Subtopics;
-   examples/diagrams where applicable;
-   Theory → Practice;
-   decisions/trade-offs;
-   evidence;
-   mastery/related topics.

Preserve canonical English technical terminology when translating it
would reduce precision.

## 32. Publish --- English

Create/update the semantically equivalent English counterpart.

Do not mechanically translate Spanish phrasing; preserve technical
meaning and professional English usage.

## Public Site Update

For every theory-bearing session, define the public-site output before closing the session.

Required outputs when applicable:

```text
site/es/sessions/PA-Sxxx/
site/en/sessions/PA-Sxxx/
site/es/projects/<project-or-app>/
site/en/projects/<project-or-app>/
```

The `.sh` scaffold / Codex prompt must create or update these paths automatically.

The public content must include the session's publishable theory, implementation mapping, evidence links and relevant diagrams without exposing confidential/private material.

The site must remain compatible with static/public deployment such as GitHub Pages or equivalent hosting. Vendor-specific deployment is an architectural decision, not an implicit default.


## 33. Dashboard Data

Identify real metrics/mastery/evidence to add.

Fixture/demo values must be labeled and never presented as measurements.

## 34. Engineering Book Update

Specify routes/pages/components/evidence added to the Book.

## 35. Evidence Produced

List only evidence actually produced:

-   code;
-   tests;
-   measurements;
-   decisions;
-   diagrams;
-   documents;
-   reviews;
-   published theory.

## 36. End-of-Session Success Criteria

Provide an explicit Markdown checkbox checklist tied to the Objective and Build/Analysis Objective. Every criterion must be its own `- [ ] ...` item. Never render success criteria as prose separated by commas or semicolons.

## 37. Progress Update

Provide exact proposed markdown to update `07-PROGRESS.md`.

Include:

-   Completed / Partial / Revisit;
-   evidence;
-   demonstrated mastery;
-   weak areas;
-   revisit items;
-   dependency for next session.

## 38. Bridge to Next Session

Name the next session and explain:

-   which concepts carry forward;
-   what new question the next session introduces;
-   what dependency the current session creates.

## Language rule

The interactive session may be taught in Spanish or English according to
the learner's current language/request.

Published theory must support both Spanish and English.

The two versions must preserve the same concepts, technical meaning,
evidence and decisions, while allowing idiomatic language in each
version.
