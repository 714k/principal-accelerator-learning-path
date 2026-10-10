# Technical Standards

These are defaults, not immutable technology mandates. A session may
deliberately compare or replace them when that choice is itself part of
the learning.

## Primary languages

-   TypeScript as the primary application/platform language.
-   Python when pedagogically or technically justified for AI/data
    workloads.

## Frontend

Use modern web platform practices. React and Angular are both valid
learning/production surfaces where comparison adds value.

## Backend

Node.js/TypeScript by default; Python services when appropriate.

## Data

-   PostgreSQL for relational work.
-   Redis for caching/ephemeral state.
-   Other stores only when justified by workload/learning objective.

## Testing

Use the applicable layers: - unit; - integration; - contract; - E2E; -
architecture/boundary tests; - accessibility; - performance; -
security; - AI evals.

## Delivery

-   containers where appropriate;
-   CI/CD;
-   feature flags/configuration/secrets;
-   cloud introduced progressively;
-   infrastructure as code when the curriculum reaches it.

Do not prematurely freeze a cloud provider, Kubernetes distribution,
vector database or model provider when comparing those choices is
educationally useful.

## Architecture documentation

Use: - ADRs; - RFCs; - C4-style diagrams where useful; - sequence
diagrams; - data-flow diagrams; - architecture reviews.

## Observability

Progress toward: - structured logs; - metrics; - traces; -
OpenTelemetry; - SLI/SLO/error-budget reasoning.

## Accessibility

Accessibility is a system quality, not a final checklist. Use semantic
HTML, keyboard behavior, focus management, automated checks and manual
validation where applicable.

## Security

Treat authentication, authorization, secrets, dependencies, input
boundaries, threat modeling and AI-specific threats as architecture
concerns.

## Metrics

Never hard-code invented "success metrics" into the public dashboard as
though measured. Fixture/demo data must be labeled. Prefer generated
machine-readable evidence from tests, benchmarks and evals.

## Repository quality

Do not disable lint/type/test/security rules merely to make Codex output
pass. Deviations must be reported and justified.



## Dashboard aggregation identifiers

To support bilingual interactive study tracking without confusing it with mastery, published session content should expose stable identifiers for dashboard-tracked items:
- session ID;
- exercise ID for each trackable exercise;
- checklist item ID for each learner-toggleable Knowledge Mastery criterion;
- project/system ID where applicable;
- evidence/mastery references separately.

ES and EN counterparts use the same stable IDs even when display text differs. Client-side study state keys must be based on stable IDs, not translated labels. Canonical evidence/mastery data remains separate from learner-toggle state.

## Learning Site interaction/data standard

The Learning Site home is an evidence-safe dashboard. Its data model must distinguish at least:
- learner-tracked study completion (checklist/exercise toggles);
- session status;
- evidence-backed mastery L1–L5;
- artifacts/evidence actually produced;
- projects/systems and revisit state.

Interactive checklist and exercise state may persist client-side under the static architecture. It must not mutate canonical evidence/mastery records merely because the learner toggles a checkbox.

Charts must be selected according to the data relationship. Avoid decorative visualization. Never render invented percentages or mastery scores.

### Navigation architecture
Desktop default: global learning navigation + main article. Global navigation should expose phases/sessions, projects/systems and principal destinations. Place the current-page TOC below the global navigation or at the top of the article; avoid an additional permanent TOC rail unless an accepted design decision justifies it.

Mobile-first is mandatory: phone first, then tablet/iPad, then desktop enhancement.

### Palette baseline
Across Accelerator-generated UIs, the default design system must avoid pink, purple and rainbow/multi-hue decorative palettes unless explicitly required by product/domain/brand context. Prefer neutral surfaces and restrained semantic accents (blue, cyan/teal, green, amber/orange, red) with accessible contrast. Do not encode meaning by color alone.

### Acronym rendering
Published content tooling/validation should enforce or test that each acronym/initialism is expanded at least once per page.

## Canonical UI Reference technical rule

`/ui-reference/` is the UI/UX reference source for the Learning Site.

Before implementing or substantially changing `site/`, inspect the reference and extract reusable design tokens/patterns where justified, such as:

- typography scale;
- spacing rhythm;
- content width;
- surface/card treatment;
- border/radius treatment;
- section hierarchy;
- code-block treatment;
- diagram containers;
- responsive behavior;
- interaction/disclosure patterns;
- Light/Dark conventions.

Prefer implementing these as reusable site/platform primitives rather than copying page-local CSS repeatedly.

Do not import arbitrary dependencies from `/ui-reference/` merely because they exist there. Dependency introduction is still governed by the Technology Radar.

Do not let `/ui-reference/` override semantic HTML, accessibility, mobile-first behavior, Mermaid → responsive SVG publishing, ES/EN parity, static/public hosting compatibility or accepted ADRs.

If the reference is visually desirable but technically incompatible, preserve the user-visible intent with an implementation appropriate to the Accelerator.

## Technology Radar governance

The repository must maintain a persistent Technology Radar as an architecture/governance artifact.

Recommended sources of truth:

```text
docs/architecture/technology-radar.md
data/architecture/technology-radar.json   # optional machine-readable projection
```

Use four categories:

- **ADOPT** — approved default when it fits the current scope.
- **TRIAL** — intentionally used in one or more real Accelerator systems, but still being validated.
- **ASSESS** — worth evaluating/comparing; do not silently introduce into longitudinal systems.
- **HOLD** — do not normally introduce unless a later ADR/RFC explicitly re-evaluates it.

The Technology Radar is not a popularity list and not a substitute for architecture reasoning.

Before introducing a framework, runtime, database, message broker, AI SDK, orchestration framework, vector store, observability vendor, cloud provider, build system or other architecture-significant dependency, check the Radar first.

A technology may have different status by scope. Example:

```text
React
- apps/portfolio/: TRIAL or ADOPT after accepted decision
- site/: ASSESS except where interactive islands justify it
- architecture labs: valid comparison surface
```

Significant category changes should reference evidence and, when appropriate, an ADR/RFC.

Do not silently promote a technology because it was used successfully once.

### Initial direction

Unless superseded by an explicit project/session decision:

- TypeScript — ADOPT
- Node.js — ADOPT
- PostgreSQL — ADOPT
- Redis — ADOPT when caching/ephemeral state is justified
- Python — TRIAL/ADOPT for AI/data-specific workloads
- React — TRIAL candidate for `apps/portfolio/`
- Astro — TRIAL candidate for `site/`
- Angular — ASSESS/TRIAL depending on the learning/project scope
- Kafka — TRIAL for event-streaming/distributed-system learning
- OpenTelemetry — preferred observability standard/interface where applicable
- dedicated vector databases — ASSESS
- Kubernetes and specific cloud providers — ASSESS until explicitly evaluated
- large AI orchestration frameworks — ASSESS unless evidence justifies broader adoption

Do not treat candidate status as an accepted architecture decision. The session/ADR may promote, demote or reject a candidate.

### Dependency governance

Before adding a new runtime dependency, determine:

1. whether an existing dependency or platform capability already solves the problem;
2. whether the Web Platform/standard library can solve it;
3. the candidate's Radar category;
4. whether it is approved for this project/scope;
5. maintenance/security/bundle/runtime/operational cost;
6. lock-in implications;
7. whether the dependency is learning-critical or merely convenient.

Do not install architecture-significant libraries merely because they shorten implementation.


## Visual Learning Studio technical contract

Session `page.json` (or the current equivalent content schema) must declare a visual learning configuration with stable mode identifiers and explicit source-section coverage.

Validation must reject theory-bearing `session` pages that lack:
- visual guide/studio declaration;
- mind-map mode covering Concepts, Main Topic and all theoretical Subtopics;
- flashcard coverage for the same set;
- ES/EN structural parity of visual mode identifiers/coverage.

Mind maps are Mermaid-authored and participate in the same diagram discovery/build pipeline as section diagrams. Preserve Puppeteer/browser configuration required by the current Mermaid build unless deliberately replaced through an accepted technology/architecture decision.

Progressive enhancement: core theory and readable flashcard answers remain available without JavaScript. Interactive tabs/flips enhance, not gate, learning content.

## Diagram publishing standard: Mermaid source → responsive SVG

Mermaid is an authoring/source format for diagrams, not the required browser-rendering format for the Learning Site.

For publishable content under `site/`:

```text
Mermaid source (.mmd or fenced Mermaid)
        ↓
build-time conversion
        ↓
SVG artifact
        ↓
responsive SVG rendered in the page
```

Requirements:

- preserve the original Mermaid source in the repository;
- convert Mermaid to SVG during the build/content pipeline;
- do not show Mermaid source code to the reader unless the source itself is intentionally being taught;
- do not require a client-side Mermaid runtime or interactive Mermaid viewer for normal reading;
- fail the build clearly if SVG generation fails rather than silently publishing the code block;
- generated SVG must preserve a valid `viewBox`;
- SVG must scale to the available content width and preserve aspect ratio;
- no fixed-height cropping;
- no horizontal viewport overflow on phone/tablet layouts;
- generated SVG may be reused by `apps/portfolio/` when appropriate.

Preferred responsive behavior:

```css
.session-diagram {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
}
```

Equivalent implementation is acceptable.

Accessibility:

- meaningful diagram caption/explanation in surrounding content;
- accessible text via `<title>`, `<desc>`, `role="img"` and/or appropriate `aria-labelledby` where practical;
- the diagram does not replace the textual explanation.

Recommended storage pattern:

```text
site/shared/diagrams/PA-Sxxx/
  <diagram-name>.mmd
  <diagram-name>.svg
```

Generated SVG is derived output; edit the Mermaid source rather than manually editing the SVG when the conceptual diagram changes.

## Learning Site hard implementation contract

These are observable implementation requirements from the initial P0 Learning Site slice.

### Dashboard root
The localized home route must render a semantic dashboard region (implementation naming may vary) containing real available data or explicit empty states. A home consisting only of hero copy plus links/cards is non-compliant.

Essential dashboard information must remain understandable without interpreting a chart. Charts may supplement cards/tables/text; they do not replace accessible values/labels.

### Study-control identifiers
Each trackable item has a stable identifier independent of translated text, for example:

```text
PA-S001:exercise:quality-scenario
PA-S001:mastery:explain-architecture
```

ES/EN equivalents share the same key. The rendered control exposes this ID through the schema/DOM (`id`, `value`, `data-study-id`, or equivalent).

Trackable controls are enabled. Do not generate `disabled` checkboxes as the default checklist UI.

Client persistence may use local storage under a versioned namespace when compatible with the current static architecture. Stored study state remains distinct from `07-PROGRESS.md`, evidence artifacts and competency/mastery records.

### Rendered-output regression checks
The canonical site check should fail when practical if:
- localized home lacks dashboard semantics/data sections;
- a trackable checklist/exercise input is disabled or lacks a stable ID;
- a session lacks Visual Learning Studio/mind-map/flashcard coverage;
- generated public HTML contains `apps/book` as current architecture;
- global curriculum navigation is missing;
- raw Mermaid is published instead of generated SVG;
- ES/EN structural parity is broken.
