# PA-S001 — Engineering foundations, frontend platform architecture, and AI product engineering

**Phase:** F0 — Accelerator Platform. **Lanes:** Staff→Principal, Frontend Platform Architecture (FPA), AI Product Engineering (AIPE). **Prerequisite:** basic familiarity with components, routes, and application programming interfaces; no earlier session must be certified. **Longitudinal system:** P0, the professional portfolio at `apps/portfolio/` and the separate learning site at `site/`. **Intended artifact, not yet produced:** a first runnable slice and bilingual chapter. **Indicative study and practice time:** 3 h 20 min–5 h 10 min; an estimate, not an observation.

> **30-SECOND SYNTHESIS**
> 1. Software engineering spans the life cycle; architecture concerns structural decisions that shape change and quality attributes.
> 2. An application delivers a use case, a system coordinates elements, a platform offers reusable capabilities, and an ecosystem includes external actors and relationships.
> 3. In P0, boundaries among the portfolio, learning site, and possible AI functions need evidence and constraints; job titles and checked boxes cannot justify them.

## Objective

Explain and distinguish the scope concepts, identify a boundary and its dependencies, reason about a quality attribute under a constraint, and defend an initial P0 boundary. Future evidence must show decisions, working behavior, and checked outcomes; reading this theory does not certify mastery.

## Learning Preview

First you will study engineering, architecture, four scopes, quality, constraints, boundaries, coupling, and cohesion in the Staff→Principal lane. Then you will study the frontend platform and, independently, the AI product. The guiding question is: **which responsibilities should be grouped, and which should be separated, when several products start?** The application exercise examines `apps/portfolio/`, `site/`, and a hypothetical assisted-summary function, without assuming that the last one exists. Here, a “contract” means an observable expectation between components, such as input, output, and error behavior.

## Concepts

### Staff → Principal lane: engineering and scope foundations

#### `engineering.software` — Software engineering

**Level 1 — Foundation.** The discipline of specifying, designing, building, verifying, operating, and maintaining software using defensible methods; this scope synthesizes SWEBOK's knowledge areas [R1]. Example: adding a `/en/projects/` route involves more than writing HTML; requirements, accessibility, tests, and evolution also belong to engineering. A list of technologies does not define a life cycle.

**Level 2 — Mechanism.** 📥 **Input:** a need to navigate projects; ⚙️ **Process:** turn it into a route contract, implementation, and checks; 📤 **Output:** a page whose link and behavior can be verified; 💡 **Contextual rule:** closing the loop includes observing failures after change. Representation: `need → contract → implementation → test → operation`. **Retrieval:** does a component that compiles prove the need was met? **Answer:** no; compare its behavior with the requirement.

**Level 3 — Deep Dive (optional).** More checks cost time; select those addressing actual risks. A route test does not establish keyboard usability. Type: procedural; objective: trace change to verification; technique: worked walkthrough followed by independent practice; source [R1]; revisit: explain again after building P0. Interaction: not applicable, since a textual sequence and real test suffice.

#### `engineering.architecture` — Software architecture

**Level 1 — Foundation.** Reasoning about a system's elements, relationships, and structural principles; an *architecture description* documents such reasoning and concerns, but is not the executed structure itself [R2]. Example: separating `apps/portfolio/` from `site/` prevents a decision about editorial navigation from automatically determining professional navigation. A diagram without correspondence to actual dependencies is an inaccurate description, not proven architecture.

**Level 2 — Mechanism.** A decision allocates responsibilities and contracts; these boundaries determine how changes propagate. Representation: `site/content → renderer → HTML`, while `apps/portfolio → portfolio UI`; a direct internal import between them breaks the proposed separation. **Retrieval:** if the site and app live in the same repository, are they the same product? **Answer:** no; Git location and architectural responsibility are different dimensions.

**Level 3 — Deep Dive (optional).** Record context, alternatives, consequences, and ways to check a decision; distinct folders alone cannot prove quality. Type: structural and decisional; objective: connect boundaries to propagation; technique: dependency map and counterexample; sources [R1, R2]; revisit: inspect imports and routes after P0. Suggested interaction: select a dependency to highlight reachable consumers *only if* derived from a real graph; no-JavaScript alternative: static map.

#### `scope.application` — Application

**Level 1 — Foundation.** Software assembled to support users' tasks in a defined context; this is an **operational definition for this program**, not an ISO normative taxonomy. `apps/portfolio/` presents work and contact information to a visitor. A button library used by several interfaces, without a user task of its own, is not therefore another application.

**Level 2 — Mechanism.** A request for `/work/` reaches a router, which chooses a page for the browser to display. Changing a URL requires checking inbound links and navigation. **Retrieval:** does a new style package constitute an application? **Answer:** not necessarily; a recognizable user experience is needed.

**Level 3 — Deep Dive (optional).** An application may include services, and organizations use the word differently; declare the analytical scope before drawing it. Type: conceptual; objective: identify user responsibility; technique: contrast with a library; sources [R1, R2] and P0 convention [P1]; revisit: classify `apps/portfolio/` during implementation. Interaction: not applicable.

#### `scope.system` — System

**Level 1 — Foundation.** A bounded set of interacting elements serving a purpose; the boundary depends on the analytical question [R2]. For publishing, the generator, content files, and generated HTML may form a system; for the visitor's experience, browser and network also matter. A folder alone does not define this boundary.

**Level 2 — Mechanism.** 📥 **Input:** canonical Markdown; ⚙️ **Process:** renderer and diagram conversion produce artifacts; 📤 **Output:** HTML page and SVG for the reader. If conversion fails, the publication system must not present an incomplete page as success. **Retrieval:** is the portfolio application always the whole system? **Answer:** it depends on the purpose and interactions being studied.

**Level 3 — Deep Dive (optional).** Make inclusions, exclusions, and environment explicit to avoid assigning external failures to the wrong component. Type: structural; objective: draw the publication-system boundary; technique: element and failure map; sources [R2, P1]; revisit: redraw for an actual failure. Interaction: not applicable.

#### `scope.platform` — Platform

**Level 1 — Foundation.** In this program, a product offering shared capabilities with contracts and consumers; CNCF describes internal platforms as self-service offerings for teams [R4]. A bilingual content layer, visual tokens, and a Mermaid→SVG pipeline could serve many sessions; a component copied once does not yet demonstrate a useful platform.

**Level 2 — Mechanism.** An author supplies theory and a diagram to the site contract; the platform renders, validates, and publishes them without duplicating this machinery per session. `session → stable schema → common renderer → ES/EN pages` represents consumption, not guaranteed adoption. **Retrieval:** do several shared folders prove platform value? **Answer:** no; check actual use, support, and contract suitability.

**Level 3 — Deep Dive (optional).** Premature abstraction can impose expensive conventions; a divergent consumer may need an extension or different boundary. Type: structural and decisional; objective: weigh reuse against cost; technique: consumer/trade-off matrix; sources [R4, P1]; revisit: observe a second session before generalizing. Interaction: not applicable.

#### `scope.ecosystem` — Ecosystem

**Level 1 — Foundation.** The network of products, people, teams, rules, and integrations shaping a solution; this is an **analytical abstraction**, not a formal hierarchy guaranteed by [R2]. P0 might include the content author, learner, hosting, browser, test tools, and portfolio visitors. It is not synonymous with “a very large repository.”

**Level 2 — Mechanism.** A session-schema change requires coordination among authors, renderer, translation, and publishing, even when they do not share code. Representation: actor → contract → change effect table. **Retrieval:** does an external provider stop mattering because it is outside the repository? **Answer:** no; it may cross the product's operational boundary.

**Level 3 — Deep Dive (optional).** The ecosystem boundary is a modeling choice: including everything makes the model useless; excluding critical dependencies hides risks. Type: structural; objective: identify actors and contracts; technique: change map; sources [R2, P1]; revisit: add real dependencies when they exist. Interaction: not applicable.

#### `quality.attribute` — Quality attribute

**Level 1 — Foundation.** A quality property to specify and evaluate for a product; ISO/IEC 25010:2023 supplies a reference model, not an automatic score for this site [R3]. In P0, accessibility and performance are distinct concerns: a page may load quickly yet have controls impossible to operate by keyboard [R5, R6].

**Level 2 — Mechanism.** State a property as a checkable scenario: “given a session view on a small screen, a person navigates the outline by keyboard without losing focus or hiding content.” A manual check observes focus; a screenshot alone does not. **Retrieval:** is “high-quality site” a verifiable criterion? **Answer:** no; context, stimulus, and observation are missing.

**Level 3 — Deep Dive (optional).** Attributes may conflict: loading widgets may affect responsiveness; measure both before optimizing. Type: decisional; objective: state a test scenario; technique: worked example and comparison; sources [R3, R5, R6]; revisit: revalidate after site changes. Interaction: not applicable.

#### `quality.constraint` — Engineering constraint

**Level 1 — Foundation.** A condition limiting admissible solutions, distinct from an attribute we aim to achieve. “Publish as static HTML readable without JavaScript” constrains the design of `site/`; “be accessible” names a property that needs concrete criteria. A team's preference does not automatically become a constraint.

**Level 2 — Mechanism.** 📥 **Cause:** no-JavaScript reading requirement; ⚙️ **Mechanism:** card answers are present in HTML and script only changes presentation; 📤 **Output:** content remains readable when script fails. **Retrieval:** is “use React” itself a quality attribute? **Answer:** no; it is a technology choice requiring justification.

**Level 3 — Deep Dive (optional).** Record each constraint's origin and owner; a false constraint may discard a better option. Type: decisional; objective: separate aim from condition; technique: justified classification; sources [R3, P1]; revisit: consult real repository criteria. Interaction: not applicable.

#### `design.boundary` — Boundary

**Level 1 — Foundation.** A delineation of responsibility and permitted interaction between parts [R2]. `apps/portfolio/` holds professional communication; `site/` holds full theory and study state. A public link may be suitable; importing private study state into the portfolio could violate its purpose.

**Level 2 — Mechanism.** Changing the site's flashcard schema should affect its renderer and tests, not the portfolio. Map: `portfolio --public link--> site`; each has its own content pipeline. **Retrieval:** does a boundary prevent all communication? **Answer:** no; it makes permitted contracts explicit.

**Level 3 — Deep Dive (optional).** Separation may duplicate styles and deployment work; share tokens only when their contract is stable. Type: structural; objective: anticipate propagation; technique: hypothetical change and map; sources [R2, P1]; revisit: inspect actual import differences. Interaction: not applicable.

#### `design.coupling` — Coupling

**Level 1 — Foundation.** [Coupling:: Dependency between parts that propagates changes] is the degree and kind of dependency between elements; this exercise asks **which change forces a consumer change**, without inventing a numeric index [R1]. If the portfolio directly reads the site's internal JSON, renaming a field could break it.

**Level 2 — Mechanism.** 📥 **Cause:** rename `page.title` to `page.heading`; ⚙️ **Mechanism:** the importer depends on the internal shape; 📤 **Output:** rendering fails until the consumer is updated. A stable public URL limits this particular propagation, though it adds availability dependency. **Retrieval:** do fewer imports necessarily mean zero coupling? **Answer:** no; network, data, and operational contracts also matter.

**Level 3 — Deep Dive (optional).** Dependency direction and stability matter more than counting imports; verify breakage with a contract test before concluding. Type: causal/structural; objective: predict change impact; technique: predict→reveal with two graphs; sources [R1, R2]; revisit: run a controlled change. Editorial interaction possible: choose an edge to highlight transitive consumers of an explicit graph; without a real graph, use two static drawings.

#### `design.cohesion` — Cohesion

**Level 1 — Foundation.** How closely a module's responsibilities contribute to a recognizable purpose [R1]. A `session-renderer` module organizing sections, citations, and session diagrams has related work; if it also manages portfolio contacts and AI provider secrets, it mixes independent reasons for change.

**Level 2 — Mechanism.** Compare change reasons: editing citation schema affects the renderer; changing the contact form affects the portfolio. If both always require editing one module, revisit its responsibility split. **Retrieval:** does one file per function guarantee cohesion? **Answer:** no; cohesion concerns responsibility and change reasons, not file size.

**Level 3 — Deep Dive (optional).** Excessive splitting creates more interfaces and coordination; examine real cases before extraction. Type: conceptual/decisional; objective: group responsibilities; technique: contrast change reasons; source [R1]; revisit: review P0's first diff. Interaction: not applicable.

#### `role.staff` — Staff scope

**Level 1 — Foundation.** In this program, Staff means resolving problems spanning teams or domains through explainable technical decisions, delivery, and mentorship. This is a **curriculum convention**, not a universal job definition [P1]. Example: agree on the site's navigation contract and help two authors use it.

**Level 2 — Mechanism.** Detect an incompatibility, propose options, agree on ownership, publish a contract, and observe adoption with evidence. **Retrieval:** does writing more individual code prove greater Staff scope? **Answer:** no; influence and shared outcome require different evidence.

**Level 3 — Deep Dive (optional).** A title does not certify competence; distinguish proposal from actual adoption to avoid claiming unobserved leadership. Type: decisional; objective: frame evidence; technique: case analysis; source [P1]; revisit: document a decision and real feedback. Interaction: not applicable.

#### `role.principal` — Principal scope

**Level 1 — Foundation.** In the program's model, Principal adds technical direction and decisions across multiple systems, with explicit consequences for evolution and governance [P1]. Example: assess whether P0's bilingual contract can serve 120 chapters without forcing a tool on unrelated projects.

**Level 2 — Mechanism.** Identify alternatives, constraints, and migration costs; agree on a revisable rule and observe whether multiple teams/systems can follow it. **Retrieval:** does choosing a framework for one page prove Principal impact? **Answer:** no; relevant breadth, adoption, and outcomes would be needed.

**Level 3 — Deep Dive (optional).** Scope depends on organization and context; here it is a learning aim, not a career prediction. Type: decisional; objective: compare decision radius; technique: scope matrix; source [P1]; revisit: compare P0's decision with its evolution in PA-S002. Interaction: not applicable.

### Frontend Platform Architecture (FPA) lane

#### `fpa.frontend-platform` — Frontend platform architecture

**Level 1 — Foundation.** Design of shared frontend capabilities, contracts, consumers, and evolution: for example navigation shell, session schema, theme, accessible components, and diagram compilation. This is a **program synthesis** of platform [R4], architecture [R2], and accessibility [R5]. An isolated marketing page can use a shared component without itself becoming a platform.

**Level 2 — Mechanism.** The chapter declares section IDs; a renderer creates navigation and HTML; study state uses stable IDs in both languages, while mastery records remain separate. Translation changes displayed text, not persisted keys. **Retrieval:** should checking a box raise L1–L5? **Answer:** no; study tracking and mastery evidence have separate contracts [P1].

**Level 3 — Deep Dive (optional).** Consider JavaScript failure, schema compatibility, focus, contrast, and script weight; do not call a page “accessible” based solely on a scanner. Type: structural/procedural; objective: follow author→reader contract; technique: diagram and keyboard check; sources [R2, R4, R5, P1]; revisit: second bilingual session. Interaction: language selector showing that ID and state persist, only if the site implements actual persistence; no-JavaScript alternative: ID table.

### AI Product Engineering (AIPE) lane

#### `aipe.ai-product` — AI product engineering

**Level 1 — Foundation.** Treats an AI function as part of a product flow with usage context, permitted inputs, output, risks, and evaluation; NIST's voluntary AI RMF organizes risk management as Govern, Map, Measure, and Manage [R7]. **Hypothetical** example: an assisted summary of a public portfolio case study; there is no evidence that P0 has or needs this feature.

**Level 2 — Mechanism.** 📥 **Input:** public text selected by the user; ⚙️ **Process:** a service delimits data, requests a model draft, validates its format, and enables human review; 📤 **Output:** a labeled draft to approve or reject, not an automatically published factual claim. **Retrieval:** does fluent output establish accuracy? **Answer:** no; check it against source text and relevant test cases [R7].

**Level 3 — Deep Dive (optional).** Outputs may vary or be wrong; bound privacy, failure, cost, and evaluation before deployment. Type: causal/decisional; objective: distinguish demo from product; technique: failure walkthrough and criteria-based decision; sources [R7, R8]; revisit: only if a real use case emerges. Interaction: not applicable now; no model or approved dataset exists to simulate quality.

### Learning and evidence mechanics (auxiliary, separate from the lanes)

#### `learning.evidence` — Evidence and study state

**Level 1 — Foundation.** In the program, evidence is an artifact or observation traceable to a capability claim; an exercise checkbox indicates declared activity, not a validated outcome [P1]. Example: “I read about keyboard navigation” is study state; a test record plus human review of the route is evidence.

**Level 2 — Mechanism.** Recording `PA-S001.exercise.boundary-map = checked` changes only study storage. A reference to a real test and its result is recorded by a different channel; the dashboard does not derive mastery from the checkbox. **Retrieval:** does ticking the checklist grant L2? **Answer:** no; L2 requires implementation and distinct evidence.

**Level 3 — Deep Dive (optional).** Without an artifact or observable criterion, the level remains pending; “cannot be determined” is valid. Type: conceptual/decisional; objective: separate states; technique: classification and feedback; source [P1]; revisit: after building and review. Interaction: reversible study controls because the variable is a tracking declaration; without JS show readable non-editable state, without false claims.

#### `learning.levels` — L1–L5 levels

**Level 1 — Foundation.** The program distinguishes L1 Explain, L2 Implement, L3 Operate, L4 Decide, and L5 Lead [P1]. They are not percentages and are not the three **reading depth levels** of a concept. Explaining why a map distinguishes site from portfolio may support L1 but does not prove that the boundary exists in code.

**Level 2 — Mechanism.** Inspect implementation and tests for L2; observed incidents/operation for L3; alternatives and decision outcomes for L4; verified adoption and influence for L5. **Retrieval:** does a completed tutorial demonstrate L5? **Answer:** no; each level needs different evidence.

**Level 3 — Deep Dive (optional).** Evidence can be partial or contradictory; record its scope and do not infer higher levels. Type: structural; objective: link claim to proof; technique: evidence→level matrix; source [P1]; revisit: reevaluate after new artifacts. Interaction: not applicable until real records exist.

### Atomic coverage manifest

Each row links a semantic ID to its namesake `####` section, which contains a definition, mechanism, example, retrieval, answer, source, technique, and revisit. Prerequisites are conceptual, not access gates. “Visual” refers to nearby representation or conditional proposal; an annotation does not prove a widget was built.

| ID (source section) | Lane / knowledge type | Prerequisite | Source | Representation or technique |
|---|---|---|---|---|
| `engineering.software` | Staff→Principal / procedural | none | R1 | life cycle and worked walkthrough |
| `engineering.architecture` | Staff→Principal / structural, decisional | `engineering.software` | R1,R2 | dependency map |
| `scope.application` | Staff→Principal / conceptual | `engineering.software` | R1,R2,P1 | contrast with library |
| `scope.system` | Staff→Principal / structural | `scope.application` | R2,P1 | boundary and flow |
| `scope.platform` | Staff→Principal / structural, decisional | `scope.system` | R4,P1 | consumer→contract |
| `scope.ecosystem` | Staff→Principal / structural | `scope.system` | R2,P1 | actor→contract |
| `quality.attribute` | Staff→Principal / decisional | `engineering.architecture` | R3,R5,R6 | scenario and test |
| `quality.constraint` | Staff→Principal / decisional | `quality.attribute` | R3,P1 | condition→option |
| `design.boundary` | Staff→Principal / structural | `scope.system` | R2,P1 | contract map |
| `design.coupling` | Staff→Principal / causal, structural | `design.boundary` | R1,R2 | change→propagation |
| `design.cohesion` | Staff→Principal / conceptual, decisional | `design.boundary` | R1 | change reasons |
| `role.staff` | Staff→Principal / decisional | `engineering.software` | P1 | case and evidence |
| `role.principal` | Staff→Principal / decisional | `role.staff` | P1 | scope matrix |
| `fpa.frontend-platform` | FPA / structural, procedural | `scope.platform`, `design.boundary` | R2,R4,R5,P1 | author→renderer→reader |
| `aipe.ai-product` | AIPE / causal, decisional | `quality.constraint`, `design.boundary` | R7,R8 | draft/failure flow |
| `learning.evidence` | Auxiliary / conceptual, decisional | none | P1 | state ≠ evidence |
| `learning.levels` | Auxiliary / structural | `learning.evidence` | P1 | evidence→level |

## Main Topic — Choosing P0's initial boundaries

**Guiding question:** how should we separate responsibilities in the first slice without calling a folder an imaginary “platform”? **Definition and scope:** initial architecture selects revisable elements, interactions, and principles enabling delivery of the portfolio and bilingual theory [R2, P1]. Shared need is verifiable delivery; constraints include content available without JavaScript and no fabricated evidence. This map follows the separate definitions above:

| Element | Immediate purpose | Consumer / boundary | Change it should contain |
|---|---|---|---|
| Application `apps/portfolio/` | Present professional work | Visitors, public links | A new professional case |
| Publishing system `site/` | Publish ES/EN chapters | Learner and reader | New concept or citation |
| Potential editorial platform | Reusable schema and renderer | Later sessions | New session without renderer duplication |
| P0 ecosystem | People, repository, hosting, browser | Various actors | External rule or service change |

**Worked example.** If a session's Spanish prose changes, the author edits ES content; the renderer keeps the same ID in EN, and the portfolio remains untouched unless a link needs updating. If translating text resets checkboxes, the ID probably depended on translated text: the boundary between presentation and tracking was poorly chosen. Check the proposed architecture against code and rendered HTML; today it is a **design, not a verified outcome**.

**Counterexample.** Declaring “microservices for everything” without operational need adds deployments, contracts, and failures. Keeping the products in separate folders is also insufficient if they exchange internal data without a contract. A boundary costs integration work; an absent boundary costs change propagation. **Answer to the guiding question:** start from responsibilities and verifiable contracts, share a capability after seeing real consumers, and revisit dependencies after the first slice.

## Subtopics

### `sub.software-vs-architecture` — Software engineering and architecture

**Guiding question:** what does each decide when we add a session? Engineering covers requirement, design, implementation, test, and maintenance [R1]; architecture focuses on elements and relationships affecting change [R2]. Example: whether a link opens a page is behavior to verify; whether every session uses a common schema is a structural decision. **Mechanism:** changing a schema field requires migrating its consumers, whereas a local spelling fix should not. A correct diagram without link tests does not deliver behavior; a working page without contracts may be hard to extend. **Trade-off:** documenting every choice costs time; document choices affecting consumers or quality. **Retrieval:** does a green build establish architectural fitness? **Answer:** no, only properties covered by its checks. **Resolution:** engineering manages the entire life cycle; architecture examines structure and evolution within it.

### `sub.scope-layers` — Application, system, platform, and ecosystem

**Guiding question:** are these four increasing sizes of the same object? No: they are **different perspectives**. Application identifies user experience; system selects elements for a purpose; platform offers capabilities to consumers; ecosystem includes external agents and dependencies. In P0 a portfolio app may belong to the public-delivery system, the site may offer editorial capability to many sessions, and hosting matters without being an internal module. **Counterexample:** calling a shared button a “platform” does not establish product, support, or consumers. **Trade-off:** expanding the system under analysis reveals interactions but makes testing harder. **Retrieval:** can something be a system without being a platform? **Answer:** yes; elements can serve a purpose without reusable self-service. **Resolution:** choose each term according to the question and draw the boundary.

### `sub.quality-constraints` — Quality attributes and constraints

**Guiding question:** how can we decide whether an interface “is good”? Separate desired property, checkable scenario, and mandatory condition. ISO provides a quality model [R3]; W3C specifies accessibility criteria [R5]; the project requires no-JavaScript access [P1]. **Worked example:** “the outline works by keyboard on a phone” supplies context, action, and observation; “content readable without JS” constrains the solution. Keyboard testing and HTML inspection provide evidence limited to these scenarios, not universal certification. **Failure:** an invented “95% mastery” score confuses interface quality with learner evidence. **Trade-off:** more scenarios take time; prioritize explicit requirements and risks. **Retrieval:** is an attribute an implementation? **Answer:** no; several solutions can satisfy it. **Resolution:** state a verifiable criterion and the constraint limiting options.

### `sub.boundary-dependencies` — Boundaries, coupling, and cohesion

**Guiding question:** what breaks when a boundary is misplaced? Boundary defines contract; coupling exposes dependencies to change; cohesion asks whether a module groups related change reasons [R1, R2]. **Worked example:** separating `session-renderer` from `portfolio-contact` contains a citation change. **Faded example:** imagine a translation changes an exercise ID; write down affected storage and pages before reading the answer: if the ID derives from text, states diverge; a shared semantic ID keeps the key stable. **Failure:** splitting each line into its own package increases interfaces without coherent responsibility. **Retrieval:** does a public link violate the boundary? **Answer:** not if intentional. **Resolution:** use change reasons and contract checks to locate boundaries.

### `sub.frontend-platform` — First frontend platform slice

**Guiding question:** what should be shared beginning in PA-S001? Share mechanisms multiple sessions need: semantic shell, phase navigation, chapter template, stable IDs, theme, SVG build, and study controls [P1]. `apps/portfolio/` remains a distinct product. **Mechanism:** canonical content → validation → accessible HTML and SVG → local study state; L1–L5 records come from separate evidence. **Failure:** disabled checkboxes, flashcard answers existing only after JS, or uncompiled Mermaid violate the contract. **Trade-off:** a common schema requires consumer migration when it evolves. **Retrieval:** should an empty dashboard invent progress? **Answer:** no; say “no evidence recorded.” **Resolution:** share a small usable base and expand from real use.

### `sub.ai-product` — Boundary of an AI function

**Guiding question:** does the first slice need AI? No verified requirement exists; assess a proposal by use case, data, risk, tests, and output review [R7, P1]. **Hypothetical example:** if a public case-study summary is wanted later, set allowed text and draft output; check claims against sources and enable human rejection. **Failure:** publish an unreviewed summary as fact or send private data to a provider without an explicit decision. **Trade-off:** possible automation versus variability, risk, and cost requiring verification. **Retrieval:** does a convincing prototype prove production suitability? **Answer:** no; evaluation and operational conditions are missing. **Resolution:** PA-S001 defines the conceptual boundary and records the feature as unimplemented.

### Cross-domain synthesis (after the three lanes)

Staff→Principal frames who argues for and reviews scope decisions; FPA defines shared contracts and browser behavior; AIPE adds input control, variable output, and evaluation only if there is a real function. This is a **design synthesis**: accessible publication affects both the chapter and any generated draft, but an AI output does not itself make an app a platform.

## Theory → Practice Map

| Concepts | Later work | Observable signal |
|---|---|---|
| `scope.*`, `design.*` | Draw P0 boundary and inspect imports | comparable graph and diff |
| `quality.*`, `fpa.frontend-platform` | Check ES/EN routes, keyboard, no-JS, and phone | actual test report |
| `aipe.ai-product` | Assess proposal before integrating a provider | decision with use case and risks |
| `learning.*`, `role.*` | Separate study tracking and evidence | reviewable data and arguments |

## Time estimate

The estimate is a guide: reading and retrieval 60–90 min; map and decision 40–60 min; first slice and tests 80–130 min; reflection 20–30 min. Lower sum = 60+40+80+20 = **200 min (3 h 20 min)**; upper sum = 90+60+130+30 = **310 min (5 h 10 min)**. Actual time depends on repository state and has not been measured.

## Real-World Example

**Documented case, not evidence about P0.** CNCF's white paper presents internal platforms as capabilities consumed by teams and emphasizes self-service [R4]. Translated **by design analogy** to this site, sessions consume an editorial contract, without necessarily being independent product teams. The analogy fails if no second session uses the renderer or if abstraction adds work instead of removing it. Value would require observing usage and maintenance; the source cannot guarantee improvement in this project.

## Production-Ready Example (verifiable design, not yet executed)

**Context:** publish `PA-S001` in ES and EN, record reversible reading state, and retain its source. **Normal path:** canonical files → ID schema → coverage/citation check → Mermaid→SVG compilation → static HTML → progressive study controls. On both pages, `PA-S001.exercise.boundary-map` denotes the same exercise; the label changes language, not the key. A portfolio-page link does not import private site data.

**Failure path:** if an ID is missing or SVG compilation fails, the build should identify the file and section and fail; do not serve raw Mermaid as a rendered diagram. Without JavaScript, text, answers, and maps remain readable. **Illustrative minimal contract, not executed implementation:**

```ts
type StudyItem = { id: "PA-S001.exercise.boundary-map"; checked: boolean };
type EvidenceRecord = { artifactId: string; claim: string; verification?: string };
// The study item does not mutate EvidenceRecord or L1–L5.
```

**Required verification:** compare ES/EN IDs and paragraphs, inspect real HTML, tab through focus and toggling, reload stored state, disable JS, and check that no checkbox changes mastery records. An automated heading-presence test does not establish comprehension or complete accessibility. **Risks:** storage conflicts between devices, broken external links, and translations that alter nuance; document limitations and corrections before publishing.

## Visual Learning Guide / Visual Learning Studio

**Concept map to compile as SVG:** `engineering.software → engineering.architecture → {scope.application, scope.system, scope.platform, scope.ecosystem} → {quality.attribute, quality.constraint, design.boundary, design.coupling, design.cohesion, role.staff, role.principal}`; independent branches `fpa.frontend-platform` and `aipe.ai-product`; auxiliary branch `learning.evidence, learning.levels`; nodes `main.p0-boundaries` and all six `sub.*`. Arrows mean “studied before synthesis,” not physical causation. Each node's source is the section with the same ID.

**Retrieval cards:** one card for each of the 17 `Concepts` IDs, one for `main.p0-boundaries`, and one for each of the six `sub.*`: **24 cards total**. Each front reuses its section's retrieval or guiding question; each back keeps the answer and explanation. Coverage links to source IDs and never replaces prose. Previous/next, flip, counter, keyboard, touch, reduced motion, and answers readable without JavaScript are publication requirements [P1].

**Justified additional mode:** boundary/change-propagation map based on `design.boundary`, `design.coupling`, and `sub.boundary-dependencies`; input X = select a declared dependency, output Y = highlight reachable consumers in that graph. It neither measures quality nor purports to represent an uninspected repository. Accessible alternative: edge/consequence table. No other widget is required.

## Exercises

1. **`PA-S001.exercise.classify`:** classify `apps/portfolio/`, `site/`, renderer, and hosting against the four scopes; justify how your system boundary changes for accessibility versus publishing. Criterion: each label has purpose and counterexample; checking it records study only.
2. **`PA-S001.exercise.boundary-map`:** draw portfolio, site, schema, and study-state boundary; name contracts and predict propagation of renaming a translated ID. Compare prediction with imports and tests once a repository exists.
3. **`PA-S001.exercise.quality`:** write an accessibility scenario with context, action, and observation; separate attribute from constraint. Validate in a browser with keyboard and without JavaScript after implementation.
4. **`PA-S001.exercise.ai-decision`:** defend whether a hypothetical summary belongs in the first slice. State permitted data, non-AI alternative, risk, needed evaluation, and output reviewer. Do not implement a provider merely to finish the exercise.

## Verified sources

- [R1] IEEE Computer Society, [SWEBOK Guide V4: software engineering, architecture, and design topics](https://www.computer.org/education/bodies-of-knowledge/software-engineering/topics). Used for engineering scope and design reasoning, without attributing P0's exact operational taxonomy to it.
- [R2] ISO/IEC/IEEE, [42010:2022, Architecture description](https://www.iso.org/standard/74393.html). The public page describes the architecture-description scope; the full standard may require a license.
- [R3] ISO/IEC, [25010:2023, Product quality model](https://www.iso.org/standard/78176.html). The public page confirms a nine-characteristic model; no unchecked characteristic list is attributed to it here.
- [R4] CNCF TAG App Delivery, [Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/) and [maturity model](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/). Describes consumable internal platforms; application to content is this course's inference.
- [R5] W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Normative source for web accessibility principles and criteria; conformance is not claimed here.
- [R6] Mozilla, [What is web performance?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/What_is_web_performance). Web-platform guide for the performance/experience distinction.
- [R7] NIST, [AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/). Voluntary framework for AI risk management.
- [R8] NIST, [Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence). Companion profile for generative AI systems.
- [P1] Project Sources: `03-MASTER-ROADMAP` (§PA-S001), `04-SESSION-TEMPLATE`, `05-LEARNING-METHODOLOGY`, `06-TECHNICAL-STANDARDS`, `07-PROGRESS`, `08-COMPETENCY-MATRIX`, `09-PROJECTS-AND-APPS`, `10-DECISION-LOG`, `11-CODEX-GUIDELINES`, `12-ARTIFACT-AND-PUBLISHING-STANDARD`, `13-CANONICAL-SESSION-AUDIT`, `14-ACCELERATED-LEARNING-UX`, `15-ADAPTIVE-LEARNING-EXPERIENCE`. Local curriculum contract, not a source of external facts.

## Resources and revisit method

Read [R2]'s public description and state a P0 boundary; compare your accessibility scenario with [R5], platform with [R4], and hypothetical function with [R7]. At the end of the session, recall the four scopes without looking and check against `Concepts`; retry when starting PA-S002 and after the first actual schema change. These are **opportunities**, not a universal optimal schedule or evidence of mastery. Record prompt, answer, corrected error, and verification artifact separately.

## Study checklist

The following IDs are reversible and shared across ES/EN; a mark expresses personal tracking.

- [ ] `PA-S001.check.engineering` I can explain engineering and architecture with a concrete change.
- [ ] `PA-S001.check.scope` I distinguish application, system, platform, and ecosystem.
- [ ] `PA-S001.check.quality` I separate attribute, verifiable scenario, and constraint.
- [ ] `PA-S001.check.boundary` I predict propagation through coupling and justify cohesion.
- [ ] `PA-S001.check.fpa` I explain the bilingual editorial contract and fallback.
- [ ] `PA-S001.check.aipe` I distinguish AI draft from validated output.
- [ ] `PA-S001.check.roles` I distinguish Staff/Principal scopes without inferring mastery.
- [ ] `PA-S001.check.evidence` I separate study checkbox from L1–L5 evidence.

## End-of-session success criteria

A reviewer can inspect a boundary map with named contracts, a first executable portfolio and ES/EN site slice, a keyboard/no-JavaScript check, and an account of what was actually run. **None is claimed complete now:** the real repository was not supplied in this chat, and `07-PROGRESS` says “Not started.” L1–L5 are recorded only after distinct evidence: explain, implement, operate, decide, and lead are different claims [P1].

## Bridge to PA-S002

The next session examines whether the same repository needs workspaces, packages, and dependency rules. First retrieve “folder ≠ boundary,” then check the import graph to see whether the proposed limits survived the first slice.
