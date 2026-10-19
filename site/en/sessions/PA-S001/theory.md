PA-S001 — Software Engineering and Architecture Foundations

Phase F0 · Engineering foundations + baseline evidence · Study mode · Canonical EN theory
Lanes: Staff → Principal Software Engineering · Frontend Platform Architecture (FPA) · AI Product Engineering (AIPE).
Status: study material, not evidence of demonstrated mastery or completed implementation.

30-SECOND SYNTHESIS

Architecture organizes relationships, decisions, and boundaries that shape how a system meets qualities and changes.

Application, system, platform, and ecosystem are analysis scopes; quality and constraints turn expectations into verifiable scenarios.

Staff → Principal, FPA, and AIPE address distinct concerns that connect through contracts, evidence, and coordinated decisions.

Reading convention. The concept and topic identifiers correspond to the Spanish edition and allow the lesson to be published without being rewritten. Cited definitions are distinguished from operational definitions introduced for this lesson. Unless a source is identified, software examples are hypothetical.

1. Objective

Distinguish software engineering, architecture and detailed design; establish the scope of application, system, platform and ecosystem; reason about quality attributes, constraints and boundaries; understand coupling and cohesion; and recognize how responsibilities differ across Staff → Principal, FPA and AIPE. The learning outcome is the ability to explain technical decisions through mechanisms and consequences, without confusing a diagram, implementation or passing test with evidence that a desired quality has been achieved.

2. Learning Preview — what you will learn

Central question: How can we design a system whose structure, quality and decisions can be explained and verified, instead of justifying it merely because it “works”?

First, understand

Then, reason about

Engineering, architecture, design, responsibility, contract

Who decides what and what crosses a boundary

Application → system → platform → ecosystem, separately

How the scope of analysis depends on the question

Quality attribute → constraint → measurable scenario

Why “it must scale” is insufficient

Boundary → coupling → cohesion

How change propagates between modules

FPA and AIPE as distinct disciplines

When their concerns intersect

Staff and Principal

How the scope of a decision grows, beyond technical complexity

Pretraining: terms needed before the main theory

Module: a software unit grouping responsibilities behind an interface; a directory alone does not guarantee that boundary.

Interface: the defined point through which a consumer interacts with a module or service; it may be a function, type or network contract.

Contract: an observable promise about inputs, outputs, conditions and errors. It is more than a syntactic interface.

Architecture Decision Record (ADR): a short document recording context, alternatives, the decision and consequences. It records reasoning, not proof that the system is correct.

International Organization for Standardization / International Electrotechnical Commission / Institute of Electrical and Electronics Engineers (ISO/IEC/IEEE): standardization organizations named in references such as ISO/IEC/IEEE 42010:2022. That standard concerns architecture descriptions, which are not the actual architecture. [S2]

Route map: a representation of which web address or navigation path leads to which page; it documents one view, not the complete architecture.

Quality attribute: a property of interest, such as modifiability, security or availability, which needs an observable criterion to be evaluated. [S3][S9]

3. Concepts — domain foundations taught separately

3A. Staff → Principal Software Engineering

<!-- concept: eng.responsibility -->

Concept: responsibility

Level 1 — Foundation

A responsibility is a behavior or decision a software element must own and implement coherently. This is a design notion: everything a class can do does not necessarily belong within it. Software design assigns responsibilities and defines interfaces between components. [S1]

Level 2 — Mechanism

Worked example. ContentValidator checks that a chapter cites existing references; SessionRenderer turns validated content into Hypertext Markup Language (HTML). If the renderer also silently repairs missing references, the responsibility for integrity becomes blurred: some content errors become presentation decisions.

Check: Who should reject a missing citation? Answer: the validation responsibility, before rendering. The view may present an error but should not decide that an absent source exists.

Level 3 — Further analysis

A responsibility should match the reason for change. If one class validates references and also decides how to present them, those tasks change for different reasons and are harder to test or replace.

<!-- concept: eng.contract -->

Concept: contract

Level 1 — Foundation

A software contract defines what a consumer can expect of a provider: data shape, preconditions, outcomes, errors and compatibility. A TypeScript type may restrict data shape, but cannot on its own show that a network response meets an operational agreement.

Level 2 — Mechanism

// Hypothetical reading contract; this is not a test result.
type ReadSession = (id: string, lang: 'es' | 'en') =>
  Promise<{ id: string; title: string; sections: readonly Section[] }>;

When the shape of sections changes, what matters is which consumer depends on it. If SessionRenderer uses implementation details outside the contract, coordinated changes become more likely.

Self-check: Why does the type not prove semantic equivalence between English and Spanish? It checks structure, not meaning.

Level 3 — Further analysis

A static type does not validate network data at runtime. Compatibility requires checking producers and consumers against changes and defining observable errors.

<!-- concept: eng.adr -->

Concept: architectural decision and ADR

Level 1 — Foundation

An architectural decision selects an option that shapes a system's structure, operation or evolution. An ADR documents the reasoning behind that choice; an ADR is not the running decision in production. ISO/IEC/IEEE 42010 explicitly distinguishes architecture from an architecture description. [S2][S4]

Level 2 — Mechanism

Example: choosing static generation for the Learning Site constrains publishing, data handling and updates. Documenting the choice in an ADR explains why it was selected; only inspection of the implementation and relevant tests can show what was actually built.

Critical distinction: responsibility = who owns the behavior; contract = what another element can expect; decision = which option is chosen; ADR = where its reasoning is recorded.

Self-check: What does an ADR demonstrate? Answer: It records a decision and its rationale; verifying its effect requires checking the system against evidence.

Level 3 — Further analysis

Evaluate a decision through its consequences and later evidence, not through persuasive wording in the ADR. If constraints or findings change, record a review without confusing the document with the architecture that is actually running.

3B. Frontend Platform Architecture (FPA)

<!-- concept: fpa.platform-architecture -->

Concept: frontend platform architecture

Level 1 — Foundation

Frontend Platform Architecture (FPA) organizes reusable frontend capabilities and contracts across products: components, design tokens, navigation, accessibility, publishing, telemetry and adoption. Not every collection of shared components constitutes a platform: a platform exists in relation to consumers, capabilities and maintenance responsibilities. This is an operational program definition, supported by the general platform concept of the Cloud Native Computing Foundation (CNCF). [S6]

Level 2 — Mechanism

Example: packages/ui may expose Button and ThemeTokens, but it becomes useful platform capability only if products adopt it with documentation, compatibility rules, support and an upgrade path. The existence of duplicate copies in two products does not show platform adoption.

Self-check: Is a shared package enough to call something a platform? Answer: No; real consumer needs, a contract, and maintenance are also required.

Level 3 — Further analysis

Reuse creates value when it meets a shared need for real consumers. An abstraction without adoption adds support and constraints; assess the need met and cost of adoption, not the number of components.

<!-- concept: fpa.consumer -->

Concept: platform consumer and adoption contract

Level 1 — Foundation

A platform consumer is a product or team using a capability provided by a platform. An adoption contract describes how to integrate it, configure extensions, receive changes and respond to incompatibilities.

Level 2 — Mechanism

Example: apps/portfolio and Learning Site might consume the same theme capability but require different navigation. Imposing the same navigation on both would reduce autonomy without a demonstrated product need.

Self-check: Does having two consumers automatically establish a good platform? No: their needs and adoption costs still need examination.

Level 3 — Further analysis

An adoption contract protects consumers from internal details, but can also freeze decisions before legitimate variation is understood. Expose justified extension points and version incompatible changes.

3C. AI Product Engineering (AIPE)

<!-- concept: aipe.product-engineering -->

Concept: AI product engineering

Level 1 — Foundation

AI Product Engineering (AIPE) integrates artificial intelligence (AI) capabilities into an operable, verifiable product: user-visible behavior, contracts, uncertainty management, evaluation, safety and impact review. This is a curricular definition; using a programming assistant to implement a site does not itself turn the site into an AI product. The AI risk framework of the National Institute of Standards and Technology (NIST) organizes governance, mapping, measuring and managing risk. [S7]

Level 2 — Mechanism

Example: an assistant proposing tax document classifications must validate output structure and connect conclusions to relevant documents; using Codex to create frontend components does not automatically add AI features to the product.

Self-check: What should be evaluated in an AI product? Answer: The product flow and its effects, not only the model output.

Level 3 — Further analysis

The model is one component: permissions, data, interface, output handling, evaluation, and operations also shape risk. NIST’s AI Risk Management Framework is voluntary and, according to NIST, under revision as of October 2026 [S7].

<!-- concept: aipe.evaluation -->

Concept: evaluating AI behavior

Level 1 — Foundation

An AI evaluation compares outputs against defined task-specific criteria. A valid JavaScript Object Notation (JSON) response establishes format conformity, not factual correctness, usefulness or safety. Without evaluated cases and observed results there is no quality measurement to publish.

Level 2 — Mechanism

Example: for 30 proposed document questions, the team would need criteria for a valid citation, a correct abstention and a critical failure; this lesson has not run such a dataset.

Self-check: Can a parseable response still be wrong? Yes: structural correctness and content correctness are different properties. [S7]

Level 3 — Further analysis

A metric alone does not establish quality: selected cases and biased samples can hide failures. OpenAI says its Evals platform becomes read-only on October 31, 2026, with shutdown planned for November 30; evaluation practice does not depend on that tool [S11].

4. Main Topic — justifiable architecture

<!-- topic: main.justifiable-system requires: eng.responsibility,eng.contract,eng.adr,fpa.platform-architecture,aipe.product-engineering -->

Level 1 — Foundation

Central concept. Software architecture concerns the significant decisions governing a system's organization and behavior, including elements, relationships and evolutionary constraints. An architecture description is a set of representations used to communicate and analyze that architecture. ISO/IEC/IEEE 42010:2022 makes that distinction explicit. [S2][S4]

Guiding question: If we have a route map, an ADR and passing tests, have we demonstrated that the architecture delivers its desired qualities?

Level 2 — Mechanism

Mechanism. A structural decision constrains which parts can change independently. If ContentValidator returns a validated chapter and SessionRenderer depends only on that contract, replacing the renderer can be evaluated without changing content-validation rules. If both components read private files directly, a publishing change might expose unintended data.

flowchart LR
  R[Requirements and constraints] --> D[Architectural decisions]
  D --> A[Actual architecture: elements and dependencies]
  D --> AD[Description: diagrams and ADRs]
  A --> O[Observed behavior]
  O --> E[Tests and quality evidence]
  AD -. describes but does not prove .-> A

How to read it. The dashed arrow between description and architecture denotes representation, not equivalence. Evidence comes from comparing real behavior with defined quality scenarios; an accurate drawing does not replace verification.

Self-check: What does a passing npm run check prove? Only the properties its checks actually cover. It does not establish maintainability, bilingual semantic equivalence or the learner's mastery.

Level 3 — Further analysis

An architecture description supports reasoning, but does not prove that an implementation follows its decisions or meets quality goals. Verification must connect concrete scenarios to observed behavior.

Guiding-question resolution: No. A map, an ADR and tests provide different information. To claim modifiability or security, we must define how the quality will be observed and collect appropriate evidence. [S3][S9]

5. Subtopics — independent concepts before integration

Subtopic 1 · Software engineering, software architecture and detailed design

<!-- topic: engineering-levels requires: eng.software-engineering,eng.architecture,eng.detailed-design -->

Guiding question: How can we tell whether a decision concerns the whole engineering lifecycle, architecture or a module's internal design?

<!-- concept: eng.software-engineering -->

1. Software engineering

Level 1 — Foundation

Software engineering systematically addresses building and evolving software, from needs and requirements through design, verification, delivery, maintenance and operation. This framing synthesizes knowledge areas in the Software Engineering Body of Knowledge (SWEBOK). [S1]

Level 2 — Mechanism

Concrete example: deciding which accessibility requirements a portal must satisfy, automating a validation check and fixing defects after release all belong to software engineering. None necessarily requires changing the architecture. The discipline includes technical work and decisions about process and verification.

Retrieval: Is one end-to-end (E2E) test the whole discipline of software engineering? No: it is one verification technique within a much wider lifecycle.

Level 3 — Further analysis

Adjust rigor to consequences: a prototype may use lightweight evidence, while a flow that publishes personal data needs stronger controls. No single phase guarantees end-to-end quality.

<!-- concept: eng.architecture -->

2. Software architecture

Level 1 — Foundation

Architecture concerns organization important to system qualities and evolution: components, relationships, boundaries and decisions constraining future options. It is neither the folder tree nor the selected library. [S2][S4]

Level 2 — Mechanism

Concrete example: separating static publication from learning assessment prevents a change to the study interface from silently modifying the source of L1–L5 evidence. This is an architectural separation because it affects trust and long-term evolution. Changing a button icon usually is not.

Retrieval: What signals an architectural decision? Answer: it changes significant relations, constraints or qualities across relevant elements and over time.

Level 3 — Further analysis

No architecture is suitable in the abstract. Distributing services may allow independent deployment, but adds networking, observability, and coordination; a modular monolith may fit when changes do not justify distribution.

<!-- concept: eng.detailed-design -->

3. Detailed design

Level 1 — Foundation

Detailed design specifies how a module fulfills its responsibility through algorithms, data structures and internal interfaces within selected architectural boundaries. SWEBOK distinguishes architectural from detailed design. [S1]

Level 2 — Mechanism

Concrete example: SessionRenderer can order headings with a pure function and use either a dictionary or an array to resolve references. Changing that internal structure without breaking the public contract is detailed design, although performance and tests can still be affected.

Retrieval: Is every technical detail architecture? No: what matters is scope, reversal cost and the qualities affected.

Level 3 — Further analysis

Scale depends on effect: an algorithm may be a local detail, but if it constrains system performance, security, or cost it deserves broader review. Classify a decision by its consequences, not by its code form.

<!-- integration: engineering-levels -->

Comparison: related scopes, not synonyms

Concept

Question answered

Specific example

Limitation

Software engineering

How do we build and evolve reliable software?

Requirements, testing, delivery, site maintenance

Includes many non-architectural decisions

Architecture

What structure and relationships shape qualities?

Separating validation, rendering and evidence

Does not specify every algorithm

Detailed design

How does a module implement its behavior?

renderSections() algorithm

Must not redefine external contracts without analysis

A useful dependency is requirements → organizational decisions → internal mechanisms, but real projects involve feedback among all three. Resolution: classify by consequences imposed, not by the engineer's seniority or number of changed lines.

Subtopic 2 · Application, system, platform and ecosystem

<!-- topic: scope-model requires: scope.application,scope.system,scope.platform,scope.ecosystem -->

Guiding question: When is the Learning Site an application, when are we analyzing a system, and what would make it a platform consumer or provider?

<!-- concept: scope.application -->

1. Application

Level 1 — Foundation

An application is a software unit delivering functions to users or other systems for a specific purpose. In this lesson it is treated as a functional product unit: a publishable experience with users, inputs and expected behavior. This is an operational scoping definition, not a universal standards definition.

Level 2 — Mechanism

Example: the Learning Site lets readers choose sessions, study theory and save local study state. It remains an application even when served as static files. Having separate site/es and site/en folders does not automatically make it two different applications.

Check: Does the application necessarily include the entire hosting provider? No; that depends on the question and the chosen analytical boundary.

Level 3 — Further analysis

An identity provider can be a dependency without belonging to the application under analysis. State ownership and behavior; folder count does not set the boundary.

<!-- concept: scope.system -->

2. System

Level 1 — Foundation

A system is a set of interacting elements inside a chosen boundary that delivers a function and responds to an environment. The system of interest is delimited, rather than discovered by simply counting folders. ISO/IEC/IEEE 42010:2022 supports architecture descriptions of several kinds of entities, including systems and products. [S2]

Level 2 — Mechanism

Example: to analyze bilingual publishing, the system of interest includes English/Spanish sources, ContentValidator, SiteGenerator, Scalable Vector Graphics (SVG) output, generated artifacts and hosting. The browser is a consumer whose effects matter even though its source code is not in the repository. The right boundary depends on whether we study build time, editorial integrity or published data.

Check: Must a system have a frontend? No; it might be a batch processor generating reports.

Level 3 — Further analysis

A component can work in isolation while the system fails because of contracts, availability, or authorization between elements. Verify the full flow in the relevant context and environment.

<!-- concept: scope.platform -->

3. Platform

Level 1 — Foundation

A platform provides capabilities, tools, documentation and contracts used by consumers to build, operate or deliver their own products. The Cloud Native Computing Foundation (CNCF) describes platforms as sets of capabilities and resources supporting development and delivery. A platform should be examined from its consumers' needs, not merely by whether code is shared. [S6]

Level 2 — Mechanism

Example: packages/ui with theme, tokens and components can become platform capability when Portfolio and Learning Site adopt it through a public interface, versioning, support and migration guidance. A shared/ directory alone does not demonstrate a platform with a usable adoption experience.

Check: Is every shared library a platform? No: appropriate services, contracts or practices for its actual consumers still matter.

Level 3 — Further analysis

A library does not become a platform just because it is shared. It needs a recurring need, a contract, and support; imposing a capability on incompatible consumers can reduce their autonomy.

<!-- concept: scope.ecosystem -->

4. Ecosystem

Level 1 — Foundation

An ecosystem is the network of products, teams, organizations, suppliers and conventions interacting around a system or platform. It is a contextual analytical model, not a fourth deployable layer of code.

Level 2 — Mechanism

Example: the Learning Site ecosystem includes content authors, the hosting provider, third-party libraries, reading devices, evaluation tools and teams that adopt repository packages. A hosting outage can affect the application even when its cause is outside the application's code.

Check: Are all ecosystem actors controlled by one team? No: external dependencies and limits of authority are part of the point of this model.

Level 3 — Further analysis

Software ecosystem literature does not settle on one universal definition [S12]. State which actors and dependencies are in scope; a relationship map does not mean one team controls everyone in it.

<!-- integration: scope-model -->

Only now: how all four relate

flowchart TB
  ECO["Ecosystem: authors, hosting, libraries, teams, users"]
  ECO --> SYS["Publishing system: sources + validation + build + delivery"]
  SYS --> APP["Application: reader-facing Learning Site"]
  PLAT["Platform: capabilities for consumers"] --> APP
  PLAT --> PORT["Application: Portfolio"]
  ECO -. includes and shapes .-> PLAT

The edges show analytical relationships, not a required deployment hierarchy. An application can belong to a broader system; a platform serves consumer experiences; an ecosystem introduces external actors and conditions. The platform is not necessarily contained within the chosen publishing system: its boundary depends on consumers and responsibilities.

Dimension

Application

System

Platform

Ecosystem

Main question

What does the product do?

Which elements work together to deliver it?

Which capabilities do others consume?

Who shapes or depends on the arrangement?

Observable unit

Function/experience

Relationships within a boundary

Capabilities/contracts

Actors and external dependencies

Example

Bilingual reader

Publishing pipeline

Adopted ThemeTokens

Author, hosting provider, teams

Typical confusion

“It's only a frontend”

“It's the whole repo”

“It's any shared package”

“It's another microservice”

Worked case. If one session link is broken, start with the application. If all routes fail during generation, inspect the publishing system. If a common navigation capability breaks multiple adopting products, look at the platform. If the hosting provider changes policy, consider the ecosystem dependency.

Partially worked problem: A web-font provider becomes unavailable. Does visible application behavior change? Yes. Did the failure necessarily originate in your frontend module? No. Determine which external dependency or platform contract can mitigate it.

Guiding-question resolution: the label changes with the boundary, purpose and consumers. These are not interchangeable names for the same directory.

Subtopic 3 · Quality attributes, constraints and scenarios

<!-- topic: quality-model requires: quality.attribute,quality.constraint,quality.scenario -->

Guiding question: Why is “the site must be reliable and fast” not a sufficient architectural criterion?

<!-- concept: quality.attribute -->

1. Quality attribute

Level 1 — Foundation

A quality attribute describes a product property we wish to specify or assess: security, reliability, modifiability, interaction quality or performance, among others. ISO/IEC 25010:2023 provides a product quality model with nine characteristics; naming a characteristic does not show that it has been achieved. [S3][S9]

Level 2 — Mechanism

Example: modifiability matters because publishing a new session should not require rewriting the renderer. To evaluate it, we need to specify what change is made, where it takes place and what success would look like; “clean architecture” is not a measure.

Self-check: Can accessibility be a quality concern beyond one screen's feature requirement? Yes: it should be translated into verifiable criteria in context.

Level 3 — Further analysis

Attributes can compete: improving performance can affect cost, security, or maintainability. Specify scenarios in context and review their effects together.

<!-- concept: quality.constraint -->

2. Constraint

Level 1 — Foundation

A constraint limits acceptable design or construction options through policy, adopted technology, deadline, privacy or runtime environment. Unlike a quality attribute, it usually acts as a condition the solution must respect.

Level 2 — Mechanism

Example: “Learning Site must publish static HTML without server secrets” rules out approaches requiring server execution to read its theory. It does not automatically guarantee speed or security; options must still be evaluated inside that constraint.

Self-check: Is TypeScript itself a quality attribute? No: it may be a technology choice, engineering standard or implementation constraint.

Level 3 — Further analysis

A constraint has a source and a decision margin: a legal obligation is not the same as a technical preference. Identifying authority and flexibility prevents treating a preference as immutable.

<!-- concept: quality.scenario -->

3. Quality scenario

Level 1 — Foundation

A quality scenario turns an abstract property into behavior that can be assessed. The Carnegie Mellon Software Engineering Institute (SEI) uses scenarios described through a stimulus source, stimulus, environment, artifact, response and response measure. [S10]

Level 2 — Mechanism

Worked example — publishing integrity: during npm run build, an author adds a missing [S99] reference; ContentValidator must reject the build and name the session, reference and location before replacing public output. This is a proposed acceptance criterion, not an observed result.

Self-check: What makes a quality scenario useful? Answer: An observable response and measure in a defined context.

Level 3 — Further analysis

A measure should be observable and relevant, not a decorative number. A scenario supports comparison and test design; it does not prove in advance that an architecture meets it.

<!-- integration: quality-model -->

Integration and gradually faded example

Element

Key question

Case formulation

Quality attribute

Which property matters?

Reference integrity

Constraint

Which options are ruled out?

Static output; no browser-side secrets

Scenario

When does it occur; what is observed?

Invalid reference → explicit failure before publish

Partially worked example. The English chapter file is missing. Mentally complete the stimulus (missing file), artifact (ContentValidator) and expected response (reject publication). Then independently choose a meaningful response measure.

Self-check: Does a passing test certify general security? Answer: only the behavior and circumstances covered by the test. Resolution: a quality can guide design when connected to a sufficiently specific, testable scenario. [S3][S10]

Subtopic 4 · Boundaries, coupling and cohesion

<!-- topic: module-model requires: design.boundary,design.coupling,design.cohesion -->

Guiding question: How can a single import statement reveal a poor assignment of responsibilities?

<!-- concept: design.boundary -->

1. Boundary

Level 1 — Foundation

A boundary deliberately separates responsibilities, rules, dependencies or levels of trust. It defines what knowledge may cross and what decisions remain internal. The criterion of hiding design decisions likely to change comes from Parnas's analysis of alternative system decompositions. [S5]

Level 2 — Mechanism

Example: the renderer receives ValidatedSession, not an arbitrary filesystem path. The validator owns reference checking and the renderer does not receive implicit permission to publish private data. A directory named /core alone cannot enforce this arrangement.

Retrieval: Is a boundary the same thing as a folder? No: it is manifested by permitted dependencies and contracts, not folder naming.

Level 3 — Further analysis

Hiding volatile decisions can reduce change cost, but each interface also requires design and maintenance. Place boundaries where responsibility, trust, or volatility justifies that investment.

<!-- concept: design.coupling -->

2. Coupling

Level 1 — Foundation

Coupling is the degree to which one element must know another's data shapes, behaviors or implementation details in order to function and evolve. Tight coupling can propagate change; lower coupling may ease substitution, but useful dependencies never disappear entirely. [S1][S5]

Level 2 — Mechanism

Example: CheckoutPage imports StripePaymentClient directly and handles provider-specific errors. Changing providers now requires modifying the page. If it depends on a PaymentPort contract, the provider can change behind an adapter, but that additional interface also needs maintenance.

Retrieval: Is zero dependency always the best architecture? No: collaboration requires dependencies; the goal is to control unnecessary detail knowledge.

Level 3 — Further analysis

The goal is not to eliminate collaboration, but to avoid unnecessary knowledge of volatile details. If an interface leaks provider-specific types and errors, coupling remains even if the dependency gets a new name.

<!-- concept: design.cohesion -->

3. Cohesion

Level 1 — Foundation

Cohesion expresses how closely related the responsibilities within a module are. A cohesive unit collects operations changing for related reasons; unrelated behavior grouped under a generic name makes change harder. [S1]

Level 2 — Mechanism

Example: PaymentAdapter handles payment authorization, capture and payment-specific errors; it should not also decide frontend translations or academic progress calculations. A UtilsService doing all three has weak cohesion even if its methods are called from many places.

Retrieval: Is a short module necessarily cohesive? No: the relation among responsibilities matters more than line count.

Level 3 — Further analysis

Size does not determine cohesion. Group responsibilities that change for related reasons and separate those needing different policies, lifecycles, or tests.

<!-- integration: module-model -->

Integration: who knows what, and what fails when something changes

flowchart LR
  UI[CheckoutPage] --> PORT[PaymentPort: authorize]
  PORT --> AD[StripeAdapter]
  AD --> EXT[Payment service]
  BAD["Counterexample: CheckoutPage"] -. knows internal errors .-> EXT

PaymentPort is an explicit boundary. It reduces provider-detail coupling in the page and keeps payment-related behavior cohesive. It does not remove complexity; it adds an adapter, contract tests and error-mapping decisions.

Change

Provider-coupled design

Port-based design

New external error

UI interprets provider type

Adapter maps to a public error

Replace provider

Change UI and calls

Change/adapt implementation

Added cost

Fewer initial layers

Contract and tests to maintain

Retrieval question: If PaymentPort returns private Stripe objects unchanged, does the boundary protect substitution? No: naming something an interface does not prevent provider-specific details from leaking.

Guiding-question resolution: an import reveals dependency knowledge and possible change propagation. We must inspect which details cross and why. Parnas offers a decomposition criterion, not a universal cost guarantee. [S5]

Subtopic 5 · Frontend platform architecture and AI-enabled product engineering

<!-- topic: fpa-aipe-model requires: fpa.platform-architecture,aipe.product-engineering,aipe.provider-adapter,aipe.grounded-result -->

The first two concepts were taught separately in Concepts. Two further AI-specific concepts are taught below before relating the two domains.

<!-- concept: aipe.provider-adapter -->

1. Model provider adapter

Level 1 — Foundation

A provider adapter hides integration details for a model service, such as parameters, authentication, size limits, responses and failure behaviors. In an AI product it is a technical boundary, not a guarantee of instant portability: providers can differ in semantics.

Level 2 — Mechanism

Example: ModelGateway.generate() accepts an internal request; ProviderAdapterA maps it to an external call; the application consumes a validated result. If the internal interface exposes provider-exclusive options, swapping providers will still require consumer migration.

Retrieval: Does an adapter eliminate provider risk? No: it can localize change but not erase cost, latency, provider behavior or policies.

Level 3 — Further analysis

An adapter localizes technical translation, but does not guarantee semantic equivalence across models or equalize cost, latency, policies, or quality. Define minimum capabilities and reevaluate when changing providers.

<!-- concept: aipe.grounded-result -->

2. Evidence-grounded result

Level 1 — Foundation

An evidence-grounded result is an output whose material assertions can be checked against identifiable evidence in the task context. Displaying a citation alone does not guarantee that the claim is supported; the system must check correspondence between the claim and retrieved evidence. This is an operational program definition for document-oriented AI, consistent with contextual risk management and evaluation principles in NIST's framework. [S7]

Level 2 — Mechanism

Example: the assistant claims a date occurs in a document and attaches evidenceIds=['doc:12#p2']. The system must confirm that the retrieved document exists and actually supports the claim before presenting it as grounded.

Retrieval: Does valid JSON guarantee a true citation? No: structural validation and factual support are independent requirements.

Level 3 — Further analysis

An evidence identifier confirms provenance, not that the text supports a claim. High-impact use also needs content evaluation, abstention when evidence is insufficient, and human review proportionate to risk.

<!-- integration: fpa-aipe-model -->

Compare each domain's responsibilities before combining them

Concern

FPA

AIPE

Consumer

Team/app adopting frontend capabilities

User/service consuming AI results

Main contract

Components, tokens, state, accessibility

Request, response, evidence, abstention and errors

Variability

Themes, brands, versions, browsers

Models, providers, data quality, uncertainty

Risk

Shared change affects several products

Wrong result affects a user decision

Verification

Visual, accessibility, contract and compatibility tests

Output validation, evaluations and defined failure cases

These concerns intersect when a frontend displays AI results: the platform provides accessible loading and error experiences, while AIPE defines which result may be treated as grounded and when to abstain. Neither domain's checks substitute for the other's.

Subtopic 6 · Staff and Principal engineering scope

<!-- topic: career-scope requires: career.staff,career.principal -->

Guiding question: What changes when a decision no longer affects one team but starts constraining several products and teams?

<!-- concept: career.staff -->

1. Staff Software Engineer

Level 1 — Foundation

In this program, a Staff Software Engineer leads technical decisions whose consequences go beyond one task or component: combines perspectives, reviews trade-offs, supports execution and builds agreements among relevant engineers. The actual scope varies by company; this is a curricular model, not a universal title equivalence.

Level 2 — Mechanism

Example: facilitate agreement between ContentValidator and SessionRenderer owners on errors, contracts and test coverage. The contribution is not only implementing the validator but clarifying a decision and enabling adoption.

Retrieval: Does Staff mean never implementing? No: the role's value is not determined by abandoning code.

Level 3 — Further analysis

Scope and title vary by company; a public framework is a reference, not a standard [S8]. Look for adopted and delivered decisions that enable a team or domain; counting meetings does not demonstrate that effect.

<!-- concept: career.principal -->

2. Principal Software Engineer

Level 1 — Foundation

A Principal Software Engineer often influences decisions across multiple capabilities, teams or systems, addressing compatibility, evolutionary strategy and organizational risk. This is a contextual model: for example, GitLab describes organizational scope and cross-team coordination in its own Principal framework; other employers may use different boundaries. [S8]

Level 2 — Mechanism

Example: establish a compatibility policy for contracts shared by Learning Site, Portfolio and future labs, including migration path, exceptions and ownership. A proposal without observed adoption is a designed decision, not proof of exercised leadership.

Retrieval: Does writing an ADR in a personal repository demonstrate real Principal leadership? No: it documents reasoning; influence needs contextual evidence.

Level 3 — Further analysis

Principal often extends scope across multiple domains in some frameworks, but does not mean being a manager or writing a proposal [S8]. Assess adoption and consequences; unnecessary organizational intervention also has a cost.

<!-- integration: career-scope -->

Scope and consequences compared

Dimension

Staff (learning model)

Principal (learning model)

Decision unit

Subsystem/product and nearby collaborations

System portfolio and agreements across teams

Durable output

Applied contract, design or review

Standard, strategy, governance and migration

Typical risk

Solve locally and displace the problem

Over-standardize and restrict autonomy

Useful evidence

Tests, changes, reviewed agreements

Adoption, consequences and sustained decisions

Guiding-question resolution: the radius of consequences and coordination increases, not merely code complexity.

6. Cross-Domain Synthesis — only after separate foundations

Only now are the three lanes mixed, because each has defined its own decision objects.

Hypothetical situation: a document product adds AI-assisted recommendations while using shared frontend platform components. FPA is responsible for loading/error behavior, accessibility and compatibility; AIPE is responsible for model contracts, citations, abstention and evaluation; Staff/Principal work is responsible for cross-team boundaries, priorities, policy and evolution.

flowchart LR
  F["FPA: accessible experience and UI contracts"] --> P["Document product"]
  A["AIPE: validation, evidence and abstention"] --> P
  S["Staff/Principal: decisions and governance"] --> F
  S --> A

Shared failure: when a model provider does not respond, AIPE classifies the failure and defines safe behavior; FPA displays a comprehensible state for keyboard and screen-reader users; Staff/Principal work aligns a shared degradation policy and ownership. None can claim availability, accessibility or accuracy without relevant verification.

7. Theory → Practice Map (no implementation yet)

Learned concept

Possible future manifestation

What would need verification

Primary lane

Application/system/platform/ecosystem

apps/portfolio/, site/, packages, hosting

Explicit boundaries, consumers, dependencies

Staff / FPA

Responsibility and contract

ContentValidator → ValidatedSession → Renderer

Missing-reference behavior, data compatibility

Staff

Quality attribute/constraint/scenario

Static build with invalid reference

Identifiable failure before publication

Staff / FPA

Boundary/coupling/cohesion

PaymentPort, adapter and consumer

Controlled substitution and contract tests

Staff / FPA

Grounded result and evaluation

AI-assisted document review proposal

Citations, abstention, evaluation criteria

AIPE

8. Time Breakdown (estimates, not measurements)

Study unit

Suggested time

Domain-lane concepts

40–60 min

Main Topic and Subtopics 1–3

60–90 min

Subtopics 4–6 and synthesis

60–90 min

Production example and Visual Learning Studio

35–50 min

Exercises, retrieval and reference review

45–75 min

9. Real-World Example — published framework, not learner project

GitLab's public handbook describes Principal engineering in terms of organizational scope, cross-team collaboration and architecture decisions. This is a documented example from one employer, neither a universal title definition nor evidence of this learner's progress. [S8]

Architectural reading: a contract decision can require a local technical solution and, when shared across consumers, an adoption policy and exception process. The framework helps distinguish solution depth from influence radius. It does not establish that a personal learning repository has adopting internal teams.

10. Production-Ready Example — proposed design, not verified production

Hypothetical context. A document-review product accepts a request, retrieves authorized excerpts, asks a model for a draft, validates shape and references, and sends the recommendation for human review. Its key requirement is not to present a claim as grounded without verifiable evidence.

sequenceDiagram
  participant UI as ReviewUI
  participant API as ReviewAPI
  participant RET as EvidenceRetriever
  participant GW as ModelGateway
  participant VAL as EvidenceValidator
  participant HUM as HumanReviewer
  UI->>API: requestReview(documentId)
  API->>RET: retrieveAuthorized(documentId)
  RET-->>API: fragments + evidenceIds
  API->>GW: generate(context)
  GW-->>API: candidate + claimedEvidenceIds
  API->>VAL: validateSchemaAndCitations(candidate)
  alt evidence supported
    VAL-->>API: supported
    API-->>UI: draft + citations
    UI->>HUM: request decision
  else missing/unverifiable evidence
    VAL-->>API: insufficient_evidence
    API-->>UI: abstain + reason
  end

Normal path. ReviewAPI confirms authorization; EvidenceRetriever returns excerpts; ModelGateway creates a candidate; EvidenceValidator checks shape and identifiers; ReviewUI displays citations and retains explicit human decision-making.

Concrete failure. If EvidenceRetriever returns no excerpts, or citations do not belong to the authorized set, ReviewAPI does not present a conclusion as grounded. It returns insufficient_evidence with a non-sensitive reason, and the user can request further information.

// Proposed contract; no implementation is claimed.
type ReviewResult =
  | { kind: 'supported'; draft: string; evidenceIds: readonly string[] }
  | { kind: 'insufficient_evidence'; reason: 'no_context' | 'invalid_citation' };

Verification to perform later: contract tests for citation identifiers, user isolation, absence of documents in telemetry, keyboard interaction and simulated model-provider outage. Limit: validating evidenceIds cannot by itself establish that source text semantically supports every claim; contextual evaluation is still necessary. [S7]

11. Visual Learning Studio — review representations, not a theory substitute

Mandatory mode: complete session mind map

mindmap
  root((PA-S001))
    Concepts
      Staff → Principal
        Responsibility
        Contract
        ADR
      FPA
        Frontend platform
        Consumer adoption
      AIPE
        AI product
        Evaluation
    Main Topic
      Justifiable architecture
    Subtopics
      Engineering levels
        Software engineering
        Architecture
        Detailed design
      Scope
        Application
        System
        Platform
        Ecosystem
      Quality
        Attribute
        Constraint
        Scenario
      Modular design
        Boundary
        Coupling
        Cohesion
      Domain concerns
        Provider adapter
        Grounded result
      Career scope
        Staff
        Principal
    Cross-domain synthesis
    Production example

Mermaid is the conceptual source for the future generated Scalable Vector Graphics (SVG) asset during Build. The map covers the concepts and six subtopics, but full explanations remain in the preceding sections.

Adaptive mode: decision matrix for choosing analytical scope

Problem

Analyze first

Then expand into

Button does not respond

Application

Module behavior and contract

Chapters fail to publish

System

Generator, sources, hosting

Three products need one theme

Platform

Adoption, compatibility, governance

External provider changes policy

Ecosystem

Dependencies, alternatives, contingency

Mandatory mode: retrieval flashcards

Cards have a front question, a back answer and explanation, and a source section. During Build, Codex will publish flip, previous/next, counter, keyboard support, readable fallback without JavaScript, and reduced-motion behavior using exactly these authored answers—not new ones.

Stable ID

Front

Back (answer and explanation)

Source section

fc.eng.responsibility

Who should reject a missing reference?

ContentValidator. Validation owns integrity; rendering displays validated data instead of inventing sources.

Concepts / Staff

fc.eng.contract

What can a contract specify that a type alone cannot verify?

Observable and semantic behavior, including errors and compatibility; a type constrains static shapes only.

Concepts / Staff

fc.eng.adr

Does an ADR prove a decision works?

No. It records context, alternatives and consequences; tests and observation are needed for behavior claims.

Concepts / Staff

fc.fpa.platform-architecture

What makes a frontend library a platform capability?

Real consumers, a public contract, adoption, compatibility and support; sharing files is not enough.

Concepts / FPA

fc.fpa.consumer

Why should two consumers not be forced into identical navigation?

They may have different product needs; a shared contract must allow legitimate variation.

Concepts / FPA

fc.aipe.product-engineering

Why does using Codex not automatically make a product AI-enabled?

Codex assists development; AI products integrate model behavior, controls, evaluation and user-facing responsibility.

Concepts / AIPE

fc.aipe.evaluation

Does valid JSON establish a correct answer?

No. Structural conformity and content correctness require different checks.

Concepts / AIPE

fc.eng.software-engineering

Why does software engineering cover more than architecture?

It includes requirements, verification, delivery, maintenance and operation alongside structural decisions.

Subtopic 1

fc.eng.architecture

How does architecture differ from a small visual edit?

Architecture sets significant relations and constraints; a local icon usually changes neither.

Subtopic 1

fc.eng.detailed-design

When is choosing a dictionary versus an array detailed design?

When it changes an internal mechanism without reshaping significant external boundaries or contracts.

Subtopic 1

fc.scope.application

What makes Learning Site an application?

It provides reader-facing functionality; static hosting does not negate its application role.

Subtopic 2

fc.scope.system

Why is the build part of the publishing system?

It interacts with sources, validation and delivery to produce output; the boundary depends on the question.

Subtopic 2

fc.scope.platform

Why does shared/ not establish a platform?

A platform has consumers, capabilities, contracts and adoption; a folder proves none of those.

Subtopic 2

fc.scope.ecosystem

What does an ecosystem show beyond the repository?

Providers, users, organizations and failures beyond the team’s control.

Subtopic 2

fc.quality.attribute

Why is “modifiable” not yet a measure?

It names a quality; the change, context, response and observable criterion are missing.

Subtopic 3

fc.quality.constraint

Is static HTML a quality or a constraint?

It is an architectural/delivery constraint; it does not prove security or performance.

Subtopic 3

fc.quality.scenario

What are the parts of a quality scenario?

Source, stimulus, environment, artifact, response and response measure; they make a quality testable.

Subtopic 3

fc.design.boundary

Why does a core folder not enforce a boundary?

Boundaries depend on actual contracts, access and permitted dependencies.

Subtopic 4

fc.design.coupling

Can PaymentPort still be coupled to Stripe?

Yes: leaking provider-specific objects or errors exports internal details across the port.

Subtopic 4

fc.design.cohesion

Why can UtilsService have low cohesion?

It groups unrelated responsibilities that change for different reasons.

Subtopic 4

fc.aipe.provider-adapter

Does a model adapter guarantee effortless provider swaps?

No. It localizes technical translation, while semantics, costs and policy differences remain.

Subtopic 5

fc.aipe.grounded-result

Why do valid evidenceIds not prove a conclusion true?

They identify sources; the system must establish that their content supports the claim.

Subtopic 5

fc.career.staff

Must Staff stop coding to lead?

No. Scope follows decisions, collaboration and consequences, not the absence of coding.

Subtopic 6

fc.career.principal

Why does a personal ADR not prove Principal influence?

It records reasoning but does not show adoption and coordinated cross-team outcomes.

Subtopic 6

fc.main

Do an ADR and a green build prove the desired quality?

No: they describe decisions and bounded checks. Relevant scenarios and evidence are still needed.

Main Topic

Teach-back: Without looking above, explain in 60 seconds why application, system, platform and ecosystem are not interchangeable. A complete answer should mention function, boundary, consumer and external actors.

12. Exercises — study work (not claimed completed evidence)

PA-S001:exercise:atomic-scope — Write four distinct definitions of application, system, platform and ecosystem around the same document product. Then draw their relations.

PA-S001:exercise:quality-scenario — Write a quality scenario with its six parts. Identify the technical constraint separately.

PA-S001:exercise:contract-change — Compare two PaymentClient designs: one tightly coupled to a provider and one behind a port. Identify which module changes under which event.

PA-S001:exercise:adr-critique — Explain what an ADR, a passing build and a contract test can and cannot demonstrate.

PA-S001:exercise:ai-failure — Propose an abstention outcome for an unsupported recommendation and explain FPA/AIPE/Staff responsibilities.

PA-S001:exercise:teach-back — Explain two decisions aloud using a concrete example, mechanism, trade-off and verification criterion.

13. Curated Sources and References

[S1] IEEE Computer Society. Guide to the Software Engineering Body of Knowledge (SWEBOK), Version 4.0; IEEE Technology Navigator, “Software engineering.” IEEE Technology Navigator.

[S2] ISO/IEC/IEEE, 42010:2022 — Software, systems and enterprise — Architecture description. https://www.iso.org/standard/74393.html

[S3] ISO/IEC, 25010:2023 — Product quality model. https://www.iso.org/standard/78176.html

[S4] Carnegie Mellon Software Engineering Institute, Software Architecture. https://www.sei.cmu.edu/software-architecture/

[S5] D. L. Parnas (1972), On the Criteria to Be Used in Decomposing Systems into Modules, Communications of the ACM, 15(12), 1053–1058. https://doi.org/10.1145/361598.361623

[S6] Cloud Native Computing Foundation (CNCF), TAG App Delivery. CNCF Platforms White Paper, “What is a platform.” Its focus is cloud; used here by analogy for frontend capabilities and consumers. Paper.

[S7] National Institute of Standards and Technology (2023), AI Risk Management Framework (AI RMF 1.0). https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf

[S8] GitLab. Engineering Career Framework: Staff and Development Department Career Framework: Principal. One employer’s references, not universal definitions. Staff · Principal.

[S9] Software Engineering Institute. “Reasoning About Software Quality Attributes,” sections “General Scenarios” and “Attribute Primitives.” SEI.

[S10] Carnegie Mellon Software Engineering Institute, Quality Attribute Workshop and Scenario Documentation, six-part quality scenarios. https://www.sei.cmu.edu/documents/2056/2004_004_001_14348.pdf

[S11] OpenAI. “Evaluation best practices,” developer documentation. Guidance on task-specific criteria, iterative evaluation, and edge cases; not a standard. The page announces the Evals transition: read-only from October 31, 2026, with shutdown planned for November 30. Guide.

[S12] Manikas, K. and Hansen, K. M. “Software ecosystems – A systematic literature review.” Journal of Systems and Software, 86(5), 1294–1306, 2013. Reviews varying definitions and a lack of consensus. DOI.

Source integrity: The public descriptions and identified documents are referenced here; complete ISO standards may require paid access. No hypothetical example, suggested duration or future design is represented as a measured result.

14. Resources — a focused reading path

Start with [S1] for design, [S2] to separate architecture from description, [S3] for quality and [S5] for modularity. Use [S6] for platforms and [S7] to understand AI risk evaluation. Treat [S8] as an employer-specific career example, not a way to infer an individual's level.

15. Knowledge Mastery Checklist — study tracking, not awarded level

PA-S001:mastery:distinguish-levels — I can explain engineering, architecture and detailed design using one concrete change for each.

PA-S001:mastery:scope-four — I can define application, system, platform and ecosystem separately and then compare them without confusing their boundaries.

PA-S001:mastery:quality — I can distinguish attribute, constraint and verifiable quality scenario.

PA-S001:mastery:modularity — I can explain a boundary and a change revealing coupling/cohesion using named components.

PA-S001:mastery:domain-lanes — I can distinguish Staff→Principal, FPA and AIPE responsibilities before integrating them.

PA-S001:mastery:evidence — I can distinguish a proposed design, an executed test and actual evidence of a quality.

Checking boxes records study state. It does not automatically award L1 Explain, L2 Implement, L3 Operate, L4 Decide or L5 Lead.

16. End-of-Session Success Criteria — later learning review

I can explain each subtopic's atomic concepts without relying on the integrative table.

The mind map and tables do not contradict definitions or confuse scope/domain.

I can defend a contract by describing consequences under change or failure.

I can propose how to verify a quality without inventing results.

I distinguish AI-tool output from evidence of AI-product quality.

17. Bridge → PA-S002

PA-S002 applies these distinctions to the repository: monorepo versus polyrepo, workspace, application, package, dependency graph, public interfaces and engineering standards/quality gates. That session can start without waiting for a Completed status; unresolved PA-S001 questions remain available for revisiting.
