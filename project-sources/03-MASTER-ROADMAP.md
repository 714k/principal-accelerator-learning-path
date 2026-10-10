# Master Roadmap --- v2

## Area abbreviations

-   **FPA** --- Frontend Platform Architecture
-   **AIPE** --- AI Product Engineering
-   **Staff** --- Staff Software Engineering
-   **Principal** --- Principal Software Engineering

The roadmap contains **120 integrated sessions**. Backend, data, cloud,
distributed systems, reliability, security and system design are
enabling competencies embedded into the three primary areas.

## Roadmap execution rules

The session title identifies the engineering topic, not a replacement for teaching. Every theory-bearing session must expand the roadmap topic into the concepts required to understand and apply it.

Mastery is assessed progressively through normal session evidence. Do **not** create broad upfront diagnostic sessions, quizzes or interviews that displace theory and building.

A session should advance one or more longitudinal projects from `09-PROJECTS-AND-APPS.md`. When implementation is applicable, the session must identify the target app/lab/system and provide the scaffold/Codex entry point automatically.



### Non-blocking progression rule

The roadmap defines learning order and dependencies, not hard gates.

The learner may start any `PA-Sxxx` even if preceding sessions are Not started, Partial, Revisit, or missing mastery evidence.

When dependencies are incomplete, continue the requested session, state the dependency, teach/review the minimum prerequisite material needed, adapt the build if necessary, and record a revisit item rather than blocking.

Never require a previous session to be marked Completed before rendering or teaching the requested session.

### Public-site output rule

Every theory-bearing session must leave a publishable ES/EN web section under the repository `site/` contract.

When the session also creates or extends an app/lab/system, its scaffold must create/update both:
- the executable implementation; and
- the corresponding public theory/project pages under `site/`.

PA-S001 initializes the professional portfolio app under `apps/portfolio/` and the separate Principal Accelerator Learning Site under `site/es/...` + `site/en/...`. PA-S002 and all later applicable sessions extend the same public site rather than creating isolated documentation silos.



### Learning Site experience rule — all 120 sessions

For every theory-bearing session PA-S001–PA-S120, publishing includes the current Learning Site contract:
- concept-first Main Topic/Subtopics;
- acronym expansion at least once per page;
- adaptive Visual Learning Studio;
- mandatory mind map + comprehensive flashcards;
- additional visual modes selected by topic fit;
- ES/EN structural parity;
- responsive Mermaid→SVG diagrams;
- dashboard-compatible checklist/exercise/evidence data.

A new session is not publication-complete if its content model fails these validation requirements.

### Main Topic + Subtopics expansion contract

For all 120 sessions:

- `## Main Topic` must be a developed synthesis section, not merely a one-line theme.
- `## Subtopics` must contain one developed `###` subsection per subtopic, not merely a list.

The Main Topic should integrate the session concepts into a coherent engineering model.

Each subtopic subsection must provide enough theory to be independently studied in the context of the session, even if its foundational concepts were already introduced in `## Concepts`.

Therefore, roadmap subtopics must be rendered as **developed theory sections**, not syllabus labels.

### Subtopic depth contract

Every subtopic listed or implied by a session topic is mandatory theory content.

A session must not treat `## Subtopics` as a syllabus-only list. Each listed subtopic must be developed in the Theory Phase with enough depth for independent study.

Minimum expectation per subtopic, when applicable:

`definition/purpose → distinctions → mental model/mechanism → example → counterexample → misconceptions → trade-offs/limitations → production implications → relationships → FPA/AIPE/Staff/Principal implications`

The Theory Phase is incomplete if a subtopic is present in the session outline but lacks developed explanatory content.

This applies to all 120 sessions, including subtopics explicitly listed in session-specific contracts and subtopics reasonably required to understand the roadmap topic.

### Theory-phase execution contract

For every theory-bearing session, the topic/subtopics defined here are **minimum required theory coverage**, not optional prompts.

Before any checkpoint, Design, Build, Codex, implementation or assessment, the session must complete:

`Learning Preview → Concepts → Main Topic → Subtopics → Theory → Practice Map → Time Breakdown → Real-World Example → Production-Ready Example → Visual Learning Guide / Studio → Exercises → Resources → Knowledge Mastery Checklist → End-of-Session Success Criteria → Bridge`

All session-specific concepts listed in this roadmap must be taught before leaving the Theory Phase.

For PA-S001 specifically, this means the first theory phase must teach **all** of the listed foundations—software engineering vs. architecture; application/system/platform/ecosystem; quality attributes/constraints; boundaries; introductory coupling/cohesion; FPA; AIPE; Staff vs. Principal scope—before asking the learner a checkpoint question.

For PA-S002 specifically, this means the first theory phase must teach **all** of the listed monorepo/standards concepts—monorepo vs. polyrepo; repository vs. architecture boundary; workspace/app/package; dependency graph/direction; public APIs/package boundaries; build/task graphs; shared-code trade-offs; engineering standards; convention/policy/standard; quality gates; architectural constraints/fitness functions; ownership boundaries—before asking the learner a checkpoint question.



### P0 Learning Site baseline timing

PA-S001 initializes the current Learning Site baseline, including dashboard home, Light/Dark shell, global curriculum navigation, interactive checklist/exercise study tracking, Visual Learning Studio infrastructure and Mermaid→SVG publication. Later F0 sessions deepen/refactor these capabilities without removing them.

Therefore, PA-S006 **deepens** dashboard/theme/chart architecture and evidence visualization. A PA-S001 regeneration must not defer the dashboard or interactive tracking until PA-S006.

### PA-S001 automatic scaffold rule

After the complete PA-S001 Theory Phase and learner continuation into Build, automatically provide both a `.sh` scaffold and Codex prompt.

The scaffold must initialize the real Accelerator repository and first runnable P0 slice, including `apps/portfolio/` plus the separate bilingual `site/` learning surface. The learner must not need to request these artifacts separately.

### PA-S001 contract

PA-S001 is the program entry session, not a standalone diagnostic interview.

Primary theory should establish the engineering foundations needed for the program, including as appropriate:

- software engineering vs. software architecture;
- application vs. system vs. platform vs. ecosystem;
- quality attributes and engineering constraints;
- boundaries;
- introductory coupling and cohesion;
- Frontend Platform Architecture;
- AI Product Engineering;
- Staff vs. Principal scope;
- evidence and L1--L5 only as supporting program mechanics.

Primary build outcome: initialize the real Accelerator repository and the first slice of **P0 --- Portfolio application (`apps/portfolio/`) + Principal Accelerator Learning Site (`site/`)**.

Do not create a separate diagnostic app. Do not delay the portfolio until PA-S003. PA-S003 deepens its architecture; PA-S001 starts it.

### PA-S002 contract

PA-S002 deepens the repository/platform foundation and should explicitly teach, as applicable:

- monorepo vs. polyrepo;
- repository boundary vs. architecture boundary;
- workspace, app and package/library;
- dependency graph and dependency direction;
- public APIs/package boundaries;
- build/task graphs;
- shared-code trade-offs;
- engineering standards;
- convention vs. policy vs. standard;
- quality gates;
- architectural constraints and fitness functions;
- ownership boundaries.

Its build should evolve the same Accelerator repository rather than create an unrelated exercise repository.

## F0 --- Accelerator Platform

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S001                 Engineering foundations + **FPA + AIPE + Staff**
                          baseline evidence   

  PA-S002                 Accelerator monorepo +  **FPA + AIPE + Staff**
                          engineering standards   

  PA-S003                 Engineering             **FPA + Staff**
                          Book/Portfolio          
                          architecture            

  PA-S004                 Design system +         **FPA + Staff**
                          tokens + accessibility  
                          foundation              

  PA-S005                 ES/EN content           **FPA + Staff**
                          architecture + i18n     

  PA-S006                 Dashboard/theme/chart  **FPA + AIPE + Staff**
                          architecture deepening  
  -----------------------------------------------------------------------

## F1 --- Software Design & Architecture

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S007                 Abstraction,            **FPA + AIPE + Staff**
                          encapsulation,          
                          modularity              

  PA-S008                 Coupling, cohesion &    **FPA + AIPE + Staff**
                          boundaries              

  PA-S009                 SOLID + GRASP           **FPA + AIPE + Staff**

  PA-S010                 Dependency inversion +  **FPA + AIPE + Staff**
                          dependency injection    

  PA-S011                 Strategy, Factory &     **FPA + AIPE + Staff**
                          composition             

  PA-S012                 Adapter, Facade &       **FPA + AIPE + Staff**
                          Decorator               

  PA-S013                 Observer, Command &     **FPA + AIPE + Staff**
                          State                   

  PA-S014                 Repository,             **AIPE + Staff**
                          Specification &         
                          persistence boundaries  

  PA-S015                 Layered Architecture    **FPA + AIPE + Staff**
                          app                     

  PA-S016                 Onion Architecture      **FPA + AIPE + Staff**
                          app + AI adapter        

  PA-S017                 Hexagonal Architecture  **FPA + AIPE + Staff**
                          app + ports/tools       

  PA-S018                 Clean Architecture app  **FPA + AIPE + Staff**

  PA-S019                 Vertical Slice +        **FPA + AIPE + Staff**
                          Modular Monolith app    

  PA-S020                 Architecture            **FPA + AIPE + Staff →
                          comparison + ADR        Principal**
  -----------------------------------------------------------------------

## F2 --- Product Systems: APIs, Data & AI Boundaries

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S021                 HTTP + REST +           **FPA + AIPE + Staff**
                          frontend/backend        
                          boundaries              

  PA-S022                 API contracts +         **FPA + AIPE + Staff**
                          OpenAPI + schema        
                          validation              

  PA-S023                 GraphQL + frontend data **FPA + AIPE + Staff**
                          architecture            

  PA-S024                 Realtime:               **FPA + AIPE + Staff**
                          WebSockets/SSE          

  PA-S025                 Authentication +        **FPA + AIPE + Staff**
                          identity                

  PA-S026                 Authorization:          **FPA + AIPE + Staff**
                          RBAC/ABAC + AI          
                          permissions             

  PA-S027                 PostgreSQL modeling +   **AIPE + Staff**
                          product domain          

  PA-S028                 Transactions +          **AIPE + Staff**
                          concurrency             

  PA-S029                 Query optimization +    **FPA + AIPE + Staff**
                          indexes                 

  PA-S030                 Redis + frontend/API/AI **FPA + AIPE + Staff**
                          caching                 

  PA-S031                 Search architecture +   **FPA + AIPE + Staff**
                          retrieval foundations   

  PA-S032                 Product data            **FPA + AIPE + Staff →
                          architecture ADR        Principal**
  -----------------------------------------------------------------------

## F3 --- Frontend Platform Engineering

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S033                 Browser architecture +  **FPA + Staff**
                          rendering               

  PA-S034                 Event loop +            **FPA + AIPE + Staff**
                          concurrency + AI        
                          streaming               

  PA-S035                 Domain-oriented         **FPA + AIPE + Staff**
                          frontend architecture   

  PA-S036                 State architecture      **FPA + AIPE + Staff**

  PA-S037                 CSR/SSR/SSG/streaming   **FPA + AIPE + Staff**
                          architecture            

  PA-S038                 Microfrontends +        **FPA + Staff →
                          organizational          Principal**
                          boundaries              

  PA-S039                 Design systems as       **FPA + Staff →
                          platforms               Principal**

  PA-S040                 Tokens + theming +      **FPA + Staff**
                          multi-brand             

  PA-S041                 Component/API           **FPA + AIPE + Staff**
                          architecture            

  PA-S042                 Accessibility           **FPA + Staff →
                          architecture +          Principal**
                          governance              

  PA-S043                 Monorepos + dependency  **FPA + AIPE + Staff**
                          graphs                  

  PA-S044                 Build systems +         **FPA + AIPE + Staff**
                          caching + CI            

  PA-S045                 Golden paths +          **FPA + AIPE + Staff →
                          scaffolding +           Principal**
                          AI-assisted DX          

  PA-S046                 Frontend Platform       **FPA + AIPE +
                          strategy + adoption RFC Principal**
  -----------------------------------------------------------------------

## F4 --- Performance, Production & Reliability

  --------------------------------------------------------------------------
  Session                 Topic                      Simultaneous areas
  ----------------------- -------------------------- -----------------------
  PA-S047                 Networking:                **FPA + AIPE + Staff**
                          DNS/TCP/TLS/CDN            

  PA-S048                 Core Web Vitals + browser  **FPA + Staff**
                          profiling                  

  PA-S049                 Bundle/rendering/memory    **FPA + AIPE + Staff**
                          optimization               

  PA-S050                 Containers + runtime       **FPA + AIPE + Staff**
                          architecture               

  PA-S051                 Cloud + load balancing +   **FPA + AIPE + Staff**
                          deployment                 

  PA-S052                 CI/CD + feature flags      **FPA + AIPE + Staff**

  PA-S053                 Logs + structured          **FPA + AIPE + Staff**
                          telemetry                  

  PA-S054                 Metrics + OpenTelemetry    **FPA + AIPE + Staff**

  PA-S055                 Distributed tracing        **FPA + AIPE + Staff**

  PA-S056                 SLI/SLO/error budgets      **FPA + AIPE + Staff →
                                                     Principal**

  PA-S057                 Retries/timeouts/circuit   **AIPE + Staff**
                          breakers                   

  PA-S058                 Failure engineering +      **FPA + AIPE + Staff →
                          incident/postmortem        Principal**
  --------------------------------------------------------------------------

## F5 --- Distributed Product Systems

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S059                 Distributed-system      **FPA + AIPE + Staff**
                          failure models          

  PA-S060                 CAP + consistency       **AIPE + Staff**

  PA-S061                 Replication +           **AIPE + Staff**
                          partitioning            

  PA-S062                 Time, ordering &        **AIPE + Staff**
                          coordination            

  PA-S063                 Queues + Pub/Sub        **FPA + AIPE + Staff**

  PA-S064                 Kafka + event streaming **FPA + AIPE + Staff**

  PA-S065                 Delivery semantics +    **AIPE + Staff**
                          idempotency             

  PA-S066                 Transactional Outbox    **AIPE + Staff**

  PA-S067                 Saga + distributed      **FPA + AIPE + Staff**
                          workflows               

  PA-S068                 CQRS app                **FPA + AIPE + Staff**

  PA-S069                 Event Sourcing app      **FPA + AIPE + Staff**

  PA-S070                 Event-driven platform   **FPA + AIPE +
                          architecture review     Principal**
  -----------------------------------------------------------------------

## F6 --- AI Product Engineering

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S071                 LLM mental model +      **FPA + AIPE + Staff**
                          product architecture    

  PA-S072                 Prompt + context        **FPA + AIPE + Staff**
                          engineering             

  PA-S073                 Structured outputs +    **FPA + AIPE + Staff**
                          schema contracts        

  PA-S074                 Tool/function calling   **FPA + AIPE + Staff**

  PA-S075                 Model abstraction + AI  **FPA + AIPE + Staff →
                          gateway                 Principal**

  PA-S076                 Streaming AI UX         **FPA + AIPE + Staff**

  PA-S077                 Document ingestion +    **FPA + AIPE + Staff**
                          processing              

  PA-S078                 Chunking + embeddings   **AIPE + Staff**

  PA-S079                 Vector search           **FPA + AIPE + Staff**

  PA-S080                 Hybrid retrieval +      **FPA + AIPE + Staff**
                          metadata                

  PA-S081                 Reranking + context     **FPA + AIPE + Staff**
                          construction            

  PA-S082                 Production RAG          **FPA + AIPE + Staff**
                          application             

  PA-S083                 RAG evaluation +        **FPA + AIPE + Staff**
                          groundedness            

  PA-S084                 RAG architecture        **FPA + AIPE +
                          review + ADR/RFC        Principal**
  -----------------------------------------------------------------------

## F7 --- Agents & AI Platform

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S085                 Workflow vs Agent       **FPA + AIPE + Staff**

  PA-S086                 Agent loop +            **FPA + AIPE + Staff**
                          orchestration           

  PA-S087                 Tool architecture       **FPA + AIPE + Staff**

  PA-S088                 Agent state + memory    **FPA + AIPE + Staff**

  PA-S089                 Human-in-the-loop UX    **FPA + AIPE + Staff**

  PA-S090                 Agent evaluation +      **FPA + AIPE + Staff**
                          failure modes           

  PA-S091                 AI security + prompt    **FPA + AIPE + Staff**
                          injection               

  PA-S092                 Shared AI platform +    **FPA + AIPE + Staff →
                          gateway                 Principal**

  PA-S093                 Model routing +         **FPA + AIPE +
                          fallback + governance   Principal**

  PA-S094                 AI Developer Platform + **FPA + AIPE +
                          adoption RFC            Principal**
  -----------------------------------------------------------------------

## F8 --- Security, Scale & Global Systems

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S095                 Threat modeling         **FPA + AIPE + Staff**

  PA-S096                 Web/API security        **FPA + AIPE + Staff**

  PA-S097                 Supply-chain/platform   **FPA + AIPE + Staff →
                          security                Principal**

  PA-S098                 Capacity estimation     **FPA + AIPE + Staff**

  PA-S099                 Load testing +          **FPA + AIPE + Staff**
                          bottlenecks             

  PA-S100                 Rate limiting +         **FPA + AIPE + Staff**
                          backpressure            

  PA-S101                 Horizontal scaling +    **FPA + AIPE + Staff**
                          autoscaling             

  PA-S102                 Multi-region            **FPA + AIPE +
                          architecture            Principal**

  PA-S103                 DR + RTO/RPO            **FPA + AIPE +
                                                  Principal**

  PA-S104                 Cost engineering /      **FPA + AIPE +
                          FinOps + architecture   Principal**
                          review                  
  -----------------------------------------------------------------------

## F9 --- System Design + Principal Engineering

  -----------------------------------------------------------------------
  Session                 Topic                   Simultaneous areas
  ----------------------- ----------------------- -----------------------
  PA-S105                 System-design           **FPA + AIPE + Staff →
                          methodology +           Principal**
                          requirements            

  PA-S106                 Design: realtime        **FPA + AIPE +
                          collaboration system    Principal**

  PA-S107                 Design:                 **FPA + AIPE +
                          search/knowledge system Principal**

  PA-S108                 Design: event-driven    **FPA + AIPE +
                          enterprise system       Principal**

  PA-S109                 Design: AI knowledge    **FPA + AIPE +
                          platform                Principal**

  PA-S110                 Design: Frontend        **FPA + AIPE +
                          Platform                Principal**

  PA-S111                 Architecture            **FPA + AIPE +
                          governance + standards  Principal**

  PA-S112                 Cross-team influence +  **FPA + AIPE +
                          architecture reviews    Principal**

  PA-S113                 Technical strategy +    **FPA + AIPE +
                          multi-quarter roadmap   Principal**

  PA-S114                 Principal system-design **FPA + AIPE +
                          & strategy review       Principal**
  -----------------------------------------------------------------------

## F10 --- Principal Capstone

  ---------------------------------------------------------------------------------
  Session                 Topic                             Simultaneous areas
  ----------------------- --------------------------------- -----------------------
  PA-S115                 Requirements + architecture       **FPA + AIPE +
                                                            Principal**

  PA-S116                 Frontend Platform + backend/data  **FPA + AIPE +
                          integration                       Principal**

  PA-S117                 Distributed/event/AI integration  **FPA + AIPE +
                                                            Principal**

  PA-S118                 Reliability/security/scale/cost   **FPA + AIPE +
                          validation                        Principal**

  PA-S119                 Architecture review +             **FPA + AIPE +
                          organizational adoption strategy  Principal**

  PA-S120                 Engineering Book + evidence +     **FPA + AIPE +
                          final competency review           Principal**
  ---------------------------------------------------------------------------------
