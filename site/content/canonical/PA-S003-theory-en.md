Metadata: F0 — Accelerator Platform · Lanes: Staff → Principal Software Engineering and Frontend Platform Architecture (FPA) · Primary project: P0, extending apps/portfolio/ and site/ as distinct products.

# PA-S003 — Portfolio and Learning Site Architecture

## 30-second synthesis
1. The portfolio and Learning Site serve different purposes and connect through explicit contracts.
2. Architecture makes boundaries, ownership, dependencies, decisions, and quality attributes visible; navigation and the content model make those boundaries concrete.
3. Decisions need evidence in routes, content types, links, tests, and safe public evidence. They do not establish progress or achievement.

This session develops an evolvable architecture for a professional portfolio and a bilingual learning site: separate responsibilities, model content and navigation, select architectural views for stakeholder concerns, and turn decisions into testable contracts without assuming unapproved technology. P0 is the running case. `apps/portfolio/` communicates professional identity, selected work, case studies, direction, and concise links to evidence. `site/` publishes theory, sessions, exercises, references, and program project pages. The products may link to each other, but neither owns the other product’s purpose or duplicates its complete theory.

## Concepts

### Software architecture: structures and decisions
Level 1 — Foundation. Software architecture comprises the structures needed to reason about a system: elements, relations among them, and externally visible properties of both. It includes high-impact decisions; it is neither a diagram, a technology list, nor all code. An element can be an application, content module, or service; a relation can be a call, package dependency, link, or publication flow; a property can be privacy, availability, or ease of change. [Software architecture: structures and decisions that determine a system’s shape]

Level 2 — Mechanism. For an architectural decision, identify its concern, alternatives, affected boundary, allowed relations, and observable effect. Keeping extended theory in `site/` while showing a linked summary in the portfolio preserves a canonical source and reduces duplication. Boxes without contracts or relationships do not demonstrate that decision.

Level 3 — Deepening. Decisions are evaluated against specific goals and constraints. If the session structure changes, a non-duplication policy should prevent inconsistent edits in two products. Stable links may require versioned paths or aliases/redirects. Documentation-code divergence is a risk to investigate, not proof that deployed code follows a diagram.

Retrieval. What distinguishes “theory has one canonical location” from a declaration? A content model or route locating it in `site/`, plus output review or tests that detect substantial duplication in `apps/portfolio/`.

### Stakeholders and architectural views
A concern is a question or need relevant to a stakeholder: a case reader needs evidence, a learner needs to traverse a session, a maintainer needs to add a session without rebuilding navigation, and a keyboard user needs semantic orientation. An architectural view answers a chosen set of concerns. No single view explains every aspect.

Choose a view by its question. A context view shows products and audiences; a module view shows code and content boundaries; a flow shows how canonical source becomes a page; a route matrix shows how ES/EN sessions are reached. C4 distinguishes context, containers, components, and code, but only views that clarify a decision need be drawn. Every view needs scope, audience, legend, and readable relationships. A detailed view ages quickly; an abstract one cannot establish dependencies.

Retrieval. To show that a new session preserves existing links, use a navigation/route view with stable IDs and a URL contract, plus a test for existing routes.

### Product boundaries and ownership
A product boundary defines the purpose, responsibility, and content owned by a surface. In P0, `apps/portfolio/` is the professional-identity product and `site/` is the editorial learning product. Related public surfaces are not one conceptual application. A boundary may exist in a monorepo when responsibilities, APIs, routes, and publishing rules enforce it.

Assign each information type an owner. The portfolio owns professional profile, selections, and case narratives; the site owns complete theory, sessions, exercises, and references. A case-to-learning-project link relates products without transferring content ownership. Canonical source, consumers, stable links, and reference metadata form the contract. Contextual links need a title, purpose, and accessible destination; a boundary must be intelligible to users and maintainers, not just mirror folders.

### Quality attributes, constraints, and ADRs
A quality attribute is a relevant behavioral or structural property: accessibility, maintainability, usability, privacy, performance, or publishing compatibility. A constraint limits alternatives: static publishing, two languages, mobile-first work, or public-data policy. No architecture is universally best; each balances attributes under constraints.

Express an attribute as a verifiable scenario: a keyboard user can reach a session from the index and return without losing focus or relying on hover. State actor, stimulus, context, response, and observable measure. Do not invent timings or success percentages before measuring. Static structure can simplify hosting and permit no-JavaScript reading, while limiting dynamic personalization unless further infrastructure is justified.

An ADR records problem, context, alternatives, decision, and consequences. For the product separation, record audiences, alternatives (one product, linked products, duplicated theory), criteria, consequences, state, and pending evidence. It does not choose a framework, cloud provider, or database outside scope. React for the portfolio and Astro for the site are TRIAL candidates in the supplied sources, not adopted decisions; consult the Technology Radar and actual repository before proposing dependencies.

### Information architecture and content model
Information architecture organizes and labels content so people understand where they are and how to find what they need. It includes organization, labeling, navigation, and search; it is not just a menu or folder tree. Global navigation answers which areas exist; the session index answers which sessions exist; a local table of contents answers what is on an open page.

Begin with tasks and objects: consult a session, follow the roadmap, find a project. Define recognizable categories and labels, assign a canonical location, design routes and links, then test whether a person can predict a destination from its label. A session may belong to a phase, competency, and project; preserve one canonical location and add curated cross-links where useful. Search helps only when terms, metadata, and language are indexed correctly.

A content model defines editorial object types, fields, constraints, and relations independently of presentation. A session can have an ID, locale, title, phase, concepts, subtopics, references, exercises, and project links. A portfolio case has purpose, context, decisions, contribution, verifiable results, and public links. A schema separates stable identity (`PA-S003`) from localized text, joins ES/EN by shared ID, gives exercises and checklists stable IDs, and distinguishes evidence references from narrative claims. It must map to the existing schema before adding fields.

### Routes, modules, and semantic structure
Information hierarchy expresses relationships between levels; a URL identifies a resource; navigation and breadcrumbs orient people; a link expresses a destination relationship. These are related, not interchangeable. `/es/sessions/PA-S003/` and `/en/sessions/PA-S003/` preserve language indexes and recognizable session identity. Build URLs from stable IDs, provide index, breadcrumb, and previous/next links where they exist, and test real destinations. A title may change while the ID and, where possible, contractual URL or redirect remain stable.

A frontend module groups related responsibilities and exposes an interface. A visual component is not automatically an architectural boundary. Pages consume components and data; components should not indiscriminately know every session route or invent content. Contracts may be types, public APIs, routes, or architecture tests. Share components only where behavior and contracts are genuinely shared; otherwise sharing creates coupling and coordination cost.

Semantic structure expresses document relationships in HTML: ordered headings, navigation regions, main content, and descriptive links. `header`, `nav`, `main`, headings, and `footer` provide landmarks. Controls need a name, state, visible focus, and keyboard behavior. Collapsed TOCs, theme controls, cards, diagrams, and tooltips retain a readable alternative without hover and without JavaScript when content is essential. Automated checks find some defects but do not prove a complete assistive experience or WCAG conformance.

## Main topic — P0 architecture as an editorial contract
P0 connects two surfaces through links and a program identity, rather than by merging their purposes. The portfolio answers who the professional is, which work is represented, and which public evidence can be reviewed. The Learning Site answers what is studied, how it is organized, and which learning artifacts exist. Model each product with its users, content, routes, and criteria. The minimum shared contract covers project names/IDs, stable public URLs, locale, link policy, redirects where hosting permits them, and public-data rules.

Trace concerns through the system: concern → content object → metadata/relations → route → navigation/link → semantic presentation → verification. This exposes whether failure is an absent object, missing route, incorrect link, ambiguous label, missing locale, or defective semantic structure. A route test proves availability, not findability.

## Subtopics

### Portfolio architecture and safe evidence
The portfolio organizes a professional narrative around selection and evidence, rather than an exhaustive history. Objects may include profile, direction, case study, contribution, decision, outcome, and verifiable link. A case distinguishes context, problem, personal responsibility, collaboration, technical decision, trade-offs, and evidence. Unmeasured outcomes remain descriptions or hypotheses, never fabricated metrics. The case can link to learning theory while retaining an autonomous account of real work. Publish authorized evidence only; anonymize sensitive client, user, and employer data.

### Learning Site architecture and bilingual relations
The Learning Site organizes sessions, concepts, projects, exercises, sources, resources, and revisit items. Sessions are indexed by locale and phase, have their own route and local TOC, and may add project/concept links without duplicating content. The model represents session–phase, session–concept, session–project, concept–source, and exercise–study-state relations. Localized text is representation, not identity. Dashboard data, study state, session state, and L1–L5 mastery remain separate.

### Findability and publication verification
Testing information architecture means traversing tasks, not only compiling pages. A route table checks destinations; a link list checks relationships; reader review checks vocabulary and labeling; content audit finds missing locales. Without user research, usability conclusions remain hypotheses. A public link does not authorize publishing what lies behind it. Build checks may detect duplicate IDs, unresolved routes, missing ES/EN pages, broken internal links, forbidden legacy routes, and semantic HTML. Final HTML inspection checks a mobile TOC, contrast preservation, and non-overflowing diagrams. A green suite proves only the executed cases and measured properties.

### Architectural views and decision review
Engineering audiences need context, content/module ownership, authoring/publication flow, routes and locales, decisions, and quality attributes. Keep each view aligned to its concern. Record context, forces, alternatives, choice, consequences, evidence, and review criterion; connect each rule to a verification, or name its manual reviewer. The Mermaid mind map for PA-S003 links Staff/Principal and FPA concepts: structures and concerns determine boundaries; boundaries assign ownership; tasks guide information architecture and the editorial model; IDs and routes connect locales and surfaces; quality and ADRs produce verification; the portfolio presents safe evidence while the site publishes theory.

## Exercises
- [ ] `PA-S003:exercise:01` Model boundaries. Assign profile, case study, complete theory, exercise, reference, and checklist state to portfolio or site. Explain ownership and cross-links. Guide: portfolio owns profile/case; site owns theory/exercise/reference/editorial checklist; user state persists separately and is not public by default.
- [ ] `PA-S003:exercise:02` Trace findability. For opening S003 in English and finding routes, write index, URL, breadcrumb, and TOC sequence. Add two link tests. Guide: `/en/sessions/` → English S003 → return breadcrumb → routes TOC anchor.
- [ ] `PA-S003:exercise:03` Review a professional claim. Draft a case claim with available evidence, contribution, and limitation. Do not invent a number.
- [ ] `PA-S003:exercise:04` Predict change propagation. If a localized title changes but its ID does not, state what remains; if the ID changes, identify links, routes, tracking, and content relations to review.
- [ ] `PA-S003:exercise:05` Write a brief ADR. Compare duplicated portfolio theory with theory linked from the portfolio using ownership, maintenance, findability, and privacy; do not claim a universal option.

## Curated sources and references
- Bass, L., Clements, P., & Kazman, R. *Software Architecture in Practice*, 4th ed., 2021. https://www.informit.com/store/software-architecture-in-practice-9780136886099
- Software Engineering Institute. “Software Architecture.” https://www.sei.cmu.edu/software-architecture/
- C4 model: https://c4model.com/introduction · https://c4model.com/abstractions · https://c4model.com/diagrams
- W3C WAI, “Page Structure” and “Headings.” https://www.w3.org/WAI/tutorials/page-structure/ · https://www.w3.org/WAI/tutorials/page-structure/headings/
- WCAG 2.2, especially 1.3.1 and 2.4.6. https://www.w3.org/TR/WCAG22/
- GOV.UK Design System, “Help users to navigate a service.” https://design-system.service.gov.uk/patterns/navigate-a-service/

The study checks are reversible study state; they do not certify mastery, completion, or L1–L5 evidence. PA-S004 develops design systems, tokens, and accessibility: product and module boundaries determine where accessible shared capabilities belong without making the portfolio and Learning Site lose their distinct purposes.
