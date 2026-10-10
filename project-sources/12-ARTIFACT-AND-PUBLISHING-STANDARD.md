# Artifact and Publishing Standard

## One durable artifact per session

Every session must produce at least one durable artifact.

Examples:

-   working app/lab/feature;
-   ADR;
-   RFC;
-   architecture diagram;
-   benchmark;
-   performance report;
-   AI evaluation report;
-   threat model;
-   incident/postmortem;
-   architecture review;
-   technical strategy;
-   reusable platform package;
-   system-design document;
-   publishable theory chapter.

The artifact must reflect the learning objective; a generated
placeholder does not count as completed evidence.


## Longitudinal artifact rule

Prefer artifacts that advance the persistent projects. PA-S001 should leave the first runnable P0 Portfolio + Learning Site slice plus session evidence scaffolding, not a standalone diagnostic report/application.

A diagnostic or mastery report may be an accompanying artifact, but it does not replace the required learning/build outcome when the session is implementation-capable.

## Publish model

Every applicable theory-bearing session contributes to the Engineering
Book.

### Spanish

Publish/update the Spanish theory and case-study content.

### English

Publish/update the semantically equivalent English content.

Translations must preserve technical meaning rather than translate
jargon mechanically.

Canonical English technical terms may remain in English when that is
clearer or standard industry usage.

## Bilingual theory structure

For theory-bearing sessions, both Spanish and English published versions
should preserve the same conceptual hierarchy.

Recommended structure:

1.  Objective
2.  Learning Preview or chapter summary
3.  Concepts
4.  Main Topic
5.  Subtopics
6.  Theory → Practice Map
7.  Real-World Example
8.  Production-Ready Example
9.  Visual Learning Guide / Studio
10. Architecture/Design where applicable
11. Exercises or reflection prompts where publishable
12. Curated Sources and References
13. Resources
14. Knowledge Mastery / What I Learned
15. Evidence / implementation links
16. Related Topics / Bridge

The interactive session may contain additional operational sections such
as Codex ownership, testing and progress updates. The published chapter
should retain the parts that create durable learning value.

## Concepts publishing standard

`Concepts` is not a glossary.

For important concepts, preserve as applicable:

-   definition;
-   purpose/problem;
-   terminology and distinctions;
-   mental model;
-   mechanism;
-   example;
-   counterexample;
-   misconception;
-   constraints/trade-offs;
-   production implications;
-   relationship to other concepts;
-   FPA/AIPE/Staff/Principal implications.

Spanish and English versions must cover the same concepts and
conclusions, even when phrasing differs.

## Book content model

A topic may expose:

-   Theory;
-   Concepts;
-   Interactive Example;
-   Architecture;
-   Implementation Mapping;
-   Decisions;
-   Tests;
-   Experiments;
-   Metrics;
-   Failure Analysis;
-   Artifact;
-   What I Learned;
-   Related Topics.

Prefer the navigation model:

**Theory → Implementation → Evidence**

## Theory → Implementation → Evidence

Published learning should connect:

### Theory

What the concept means and how it works.

### Implementation

Where it exists in an app/lab/system.

### Evidence

How behavior, trade-offs, quality or mastery were verified.

Do not publish architectural claims as evidence merely because an
implementation follows a named pattern.

## Real-world cases

When a published chapter uses a real-world external case:

-   verify factual claims when necessary;
-   prefer primary/reliable sources;
-   distinguish sourced facts from analysis/inference;
-   preserve citations/links in both language versions where applicable.

## Production-ready examples

Production-ready examples should demonstrate realistic engineering
representation, such as:

-   architecture topology;
-   API/component contract;
-   dependency rule;
-   deployment model;
-   telemetry;
-   failure policy;
-   threat model;
-   AI evaluation;
-   governance rule;
-   migration strategy.

Do not imply measured superiority without evidence.


## Academic publishing standard

Published theory under `site/` must preserve source provenance.

Every public theory chapter should include:
- inline citations or academically clear source markers;
- a references section;
- links/identifiers for standards, papers, reports, books or official documentation where legally/practically available;
- clear labeling of hypothetical examples and contextual recommendations.

The ES and EN versions must cite the same underlying sources for equivalent claims.

Do not publish a model-generated paraphrase as if it were a formal industry definition.



## Learning Site dashboard publishing contract

The `site/` home route is a learning-progress dashboard generated from available public-safe data.

Dashboard visualizations may include cards, tables, line/bar charts, donut/pie charts, timelines, matrices and project/session summaries when the data relationship justifies them.

Never infer or fabricate mastery from study activity. Render learner-toggleable Knowledge Mastery Checklist and Exercise completion as **study tracking**. Render L1–L5 only from recorded evidence/mastery assessment. Clearly label the distinction.

The dashboard must be useful on phone first, tablet second and desktop third, and must remain accessible with non-chart textual/table equivalents for essential information.

## Canonical UI Reference publishing contract

All public Learning Site pages under `site/` should use `/ui-reference/` as the canonical reference for their visual and interactive presentation.

This applies to session indexes, theory pages, Concepts/Main Topic/Subtopics, Visual Learning Guides, project-learning pages, code examples, diagrams, comparisons, references/resources, navigation and reading interactions.

The reference governs **presentation**; Project Sources govern **content truth and required structure**.

Published ES and EN pages should share the same design language and equivalent interaction model.

### Reference fidelity

Aim for recognizable consistency with `/ui-reference/` in hierarchy, spacing, typography, component shapes, content grouping, interaction affordances, reading flow and visual explanation patterns.

Exact pixel cloning is not required when doing so would harm responsiveness, accessibility, maintainability or content clarity.

### Reusable primitives

When a reference pattern recurs, promote it into reusable site primitives/tokens instead of duplicating markup/CSS across sessions:

```text
Reference pattern
      ↓
reusable primitive
      ↓
PA-S001 ... PA-S120
```

## Adaptive Visual Learning Studio publishing standard

The Visual Learning Studio implements the existing `Visual Learning Guide` / `Guía Visual de Aprendizaje` section as an adaptive multi-mode learning experience; the visible section name may remain localized while the platform capability is called Visual Learning Studio.

Every published theory-bearing session includes a Visual Learning Studio after full theory/examples and before Exercises.

Required:
- mind map with complete Concepts/Main Topic/Subtopics coverage;
- flashcards with complete coverage;
- explicit source-section linkage for every mode;
- ES/EN same mode identifiers and structural coverage;
- adaptive additional modes only when supported by source content.

Mind-map source lives under `site/shared/diagrams/<SESSION_ID>/` and publishes as responsive SVG. The diagram visual baseline uses a white canvas, restrained dark nodes and high-contrast white node text unless `/ui-reference/` or accessibility requires an equivalent adaptation. Do not use bright/rainbow node palettes.

Flashcards must remain readable without JavaScript and become interactive progressively. They are retrieval-practice tools, not mastery scores.

### Academic-first content composition
Every Main Topic/Subtopic begins with its academic concept definition/scope before integrated exposition. Publishable theory should use varied semantic structures—prose, descriptive subheadings, real lists, numbered mechanisms, tables, diagrams, code excerpts, examples/counterexamples and semantic callouts—without turning the page into card soup.

### Acronym rule
Every acronym/initialism on each page is expanded at least once using `Full Term (ACRONYM)` or equivalent localized expansion.

## Visual Learning Guide publishing standard

Every published theory-bearing session under `site/` must include a visual-summary section after the full theory/examples and before exercises or equivalent practice content.

Routes remain:

```text
site/es/sessions/PA-Sxxx/
site/en/sessions/PA-Sxxx/
```

Use headings:

```text
## Guía Visual de Aprendizaje
```

for Spanish and:

```text
## Visual Learning Guide
```

for English.

The ES/EN visual guides must be semantically equivalent.

### Purpose

This section provides a fast visual representation of the academic theory already published on the same page.

It is not:
- a replacement for theory;
- a separate set of claims;
- an infographic with unsupported slogans;
- a transcript summary.

### Presentation components

Use reusable site components/patterns where appropriate, for example:

```text
VisualLearningGuide
ConceptCard
CompareCard
MechanismDiagram
CodeCallout
FailureFlow
FastRecall
```

Component names are illustrative; architecture may choose equivalents.

The content model should allow the same pattern to scale across PA-S001 … PA-S120 without hard-coding each session.

### Responsive behavior

- mobile-first;
- one-column cards on narrow screens;
- progressively wider grids when space permits;
- diagrams width: 100% of content container;
- diagram height: auto;
- no fixed diagram viewport;
- no pan/zoom viewer for normal diagrams;
- no essential hover-only content;
- code/tables must not break viewport width.

All Mermaid-authored diagrams follow the existing build-time Mermaid → responsive SVG rule.

### Accessibility

Visual explanations must remain understandable with:
- semantic headings;
- textual labels;
- captions/adjacent explanations;
- accessible SVG descriptions where applicable;
- sufficient contrast in Light and Dark themes;
- keyboard-accessible disclosure components.

Never encode meaning using color alone.

## Public web publishing contract

Every applicable theory-bearing session must produce a public-ready bilingual web representation under `site/`.

Minimum logical outputs:

```text
site/es/sessions/PA-Sxxx/
site/en/sessions/PA-Sxxx/
```

When a project/app/lab/system is involved:

```text
site/es/projects/<project-or-app>/
site/en/projects/<project-or-app>/
```

The public pages should include, as applicable:
- refined theory;
- Concepts;
- Theory → Practice mapping;
- architecture/design;
- implementation links;
- evidence links;
- diagrams;
- decisions/trade-offs;
- mastery/related topics.

The site must be deployable to GitHub Pages or equivalent static hosting without requiring private conversation context.

Do not publish confidential employer information, secrets, private evidence or unsupported claims.


## Theme

The Book must support:

-   Light;
-   Dark;
-   System.

Persist the user's preference where appropriate.

## Dashboard

Dashboard content should be evidence-backed.

Possible views:

-   competency/mastery matrix;
-   sessions completed;
-   artifacts produced;
-   tests;
-   architecture violations;
-   performance;
-   reliability;
-   accessibility;
-   AI evaluation;
-   cost/latency;
-   learning timeline.

## Mastery visualization

Use L1--L5:

-   Explain;
-   Implement;
-   Operate;
-   Decide;
-   Lead.

Do not convert mastery into arbitrary percentages unless a documented
scoring model exists.

## Data integrity

Distinguish:

-   measured;
-   calculated;
-   fixture/demo;
-   target;
-   estimate;
-   self-assessment;
-   instructor assessment.

Never display fixture values as actual learner/system performance.

## Session publishing package

Where applicable, a completed session should leave a package similar to:

``` text
content/es/<topic>.md
content/en/<topic>.md
artifacts/<type>/<artifact>.md
data/mastery/PA-Sxxx.json
data/metrics/PA-Sxxx.json
apps-or-packages/<implementation>
```

Exact paths may evolve through architectural decisions.

The Spanish and English files should link to the same underlying
implementation/evidence rather than duplicate evidence.

## Engineering Book as portfolio

The Book should demonstrate:

-   technical depth;
-   architecture judgment;
-   production thinking;
-   AI Product Engineering;
-   Frontend Platform Architecture;
-   Staff/Principal decision-making;
-   ability to explain complex systems clearly;
-   evidence-backed learning progression.

It should not expose confidential employer information or proprietary
source material.


## Portfolio is not the Learning Site

The public portfolio and the Principal Accelerator Learning Site are separate products.

### Portfolio (`apps/portfolio/`)
Shows professional positioning, selected work, concise case studies and evidence.

### Learning Site (`site/`)
Publishes the complete learning material for the Accelerator. Do not place full PA session theory inside the portfolio merely because both surfaces are public.

## Learning Site navigation publishing contract

Desktop:
- global navigation occupies the main navigation region and includes sessions grouped by phase, projects/systems and principal destinations;
- current-page TOC appears below global navigation or above the article;
- avoid a separate mostly-empty rail solely for a few global controls plus another permanent TOC rail.

Mobile/tablet:
- prioritize the reading surface;
- global navigation and TOC collapse accessibly;
- no page-level horizontal overflow;
- tabs/mode rails may use controlled local horizontal scrolling when needed.

Global header remains compact and does not enumerate all 120 sessions.

## Learning Site information architecture

Required global UI:
- header title `Principal Accelerator Learning Path`;
- language switcher `en` / `es`;
- Light/Dark theme switch;
- mobile-first responsive behavior.

Required navigation:
- breadcrumb on session pages;
- `/en/sessions/` and `/es/sessions/` session indexes;
- no full session list in the global header;
- collapsible per-session TOC;
- compact/collapsed TOC on small screens.

Required accessibility:
- semantic landmarks;
- keyboard-operable controls;
- visible focus;
- accessible disclosure state for TOC;
- sufficient contrast;
- responsive code/table/diagram treatment.

## Learning Site content clarity

Published theory must preserve the same clarity bar as the teaching session: plain technical definitions, concrete software examples, diagrams/flows for architectural concepts, complete production-ready examples, no cryptic fragments, no editorial/meta language unrelated to software engineering, references and inline citations.


### Interactive study-state publishing
Trackable exercises and Knowledge Mastery Checklist criteria must expose stable IDs shared by ES/EN. Their toggle state is learner study activity and may be persisted by the static client implementation. Dashboard aggregations must not infer evidence-backed mastery from these toggles.

## Dashboard + study tracking definition of done

From PA-S001 onward, localized Learning Site home pages are dashboard pages. A marketing-style hero may be present, but does not satisfy the dashboard requirement by itself.

The dashboard must render available public-safe information or honest empty states for the applicable categories: roadmap/session progress, study checklist/exercise state, evidence-backed mastery, artifacts/evidence, revisits, projects/systems, recent/next activity.

Knowledge Mastery Checklist and trackable Exercise controls in published pages are learner-operable study controls:
- enabled by default;
- checkable/uncheckable;
- stable ID shared across ES/EN;
- persistable in the current static architecture;
- never interpreted as proof of mastery.

Do not publish disabled checkboxes merely to mimic Markdown checkboxes.

## Preserve current site capability on regeneration

Regenerating an old session means applying new content/contract to the current site platform. Preserve current dashboard, navigation, Visual Learning Studio, responsive behavior, accessibility and tracking capabilities. Do not roll the platform back to an earlier minimal shell.
