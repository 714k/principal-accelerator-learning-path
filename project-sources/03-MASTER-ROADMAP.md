# Roadmap maestro — 120 sesiones

**Fuente canónica de títulos, áreas y secuencia de PA-S001–PA-S120.** Las tablas siguientes se conservan del roadmap del paquete anterior. No afirman implementación ni progreso. Cada sesión sigue la revisión editorial por etapas descrita en Source 16 y el objetivo de app/lab de Source 09. Ninguna sesión queda bloqueada por estado anterior.

## PA-S001 — cobertura mínima obligatoria

Ingeniería de software vs arquitectura; diseño detallado; aplicación/sistema/plataforma/ecosistema (cuatro conceptos separados); atributos de calidad/escenarios/restricciones; fronteras, acoplamiento y cohesión; plataforma frontend/consumidores/contratos; producto con IA/evaluación; Staff vs Principal en contexto. Niveles de evidencia son mecánica de progreso auxiliar, **no tema principal de ingeniería**. Primero se estudian sistemas externos documentados; P0 solo se utiliza como transferencia en Teoría→Práctica.

## PA-S002–PA-S005 — continuidad del piloto

- **PA-S002:** monorepo vs polyrepo; repositorio vs frontera arquitectónica; workspace/app/paquete; grafos y direcciones de dependencia; APIs públicas; build/task graphs; políticas/gates; ownership. Evolucionar repositorio sin quitar capacidades de S001.
- **PA-S003:** arquitectura e información del Portfolio profesional y Learning Site separados; modelos de contenido y rutas; casos de estudio; preservar ambas superficies y el estado previo.
- **PA-S004:** Design System, tokens, accesibilidad; **biblioteca de componentes ejecutable y Storybook real**, stories de estados/interacción, verificaciones correspondientes, más teoría ES/EN; número de componentes ajustado al alcance real, no fijo.
- **PA-S005:** internacionalización/localización, modelos ES/EN, rutas, fallback, persistencia con identificadores compartidos y experiencia accesible; no eliminar Storybook ni funciones anteriores.
- Tras S005 evaluar qué patrones son universales/configurables/específicos/no resueltos; PA-S006 primer ensayo de plantilla graduada.

## Ejecución por sesión

`PA-Sxxx` → inventario con conceptos redactados como **término: definición breve**, sin IDs de máquina visibles → solicitud y aprobación de cada capítulo → casos y materiales aprobados → consolidación ES → EN equivalente → Codex explícito con texto íntegro y objetivos técnicos. En solicitudes explícitas de muestra completa entregar borrador no aprobado. Cada capítulo define sus conceptos localmente, explica mecanismos reales y aporta evaluación con respuesta razonada. Sin encabezados didácticos Nivel 1/2/3. El tema real y sus subtemas tienen prioridad sobre la estructura repetitiva.

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
