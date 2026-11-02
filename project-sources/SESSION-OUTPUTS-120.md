# 120 outputs previstos — referencia NO ejecutada

Este inventario es una **propuesta técnica**; no demuestra rutas existentes, apps construidas, fuentes verificadas ni validación de Codex. Source 03 define el tema; Source 09 define el producto; Source 16 gobierna la aprobación editorial.

# Principal Accelerator — outputs planificados por sesión (PA-S001–PA-S120)

> Base: v8 `03-MASTER-ROADMAP.md` + `09-PROJECTS-AND-APPS.md` + `SESSION-APP-TARGETS-120.csv`. No es evidencia de implementación ejecutada. Los entregables específicos amplían la planificación para hacerla comprobable: Codex debe confrontarlos con Git, el Radar y las decisiones aceptadas antes de implementarlos.

## Paquete transversal de toda sesión con teoría

Cada sesión incluye en su handoff: teoría canónica completa en español e inglés (separación de Staff→Principal, FPA y AIPE; conceptos atómicos; síntesis; fundamentos, mecanismos y profundización opcional; ejemplos, ejercicios, fuentes, recuperación y respuestas), publicación bajo `site/es/sessions/PA-Sxxx/` y `site/en/sessions/PA-Sxxx/`, mapa mental Mermaid→SVG, flashcards de cobertura completa, visuales pertinentes, tracking de estudio distinto de evidence/mastery, y reporte de validaciones reales con diff y desviaciones. Una app o laboratorio indicado abajo es **adicional** al site.

Una sesión de diseño o revisión entrega artefactos duraderos y no crea una nueva aplicación automáticamente. Una sesión de implementación preserva capacidades previas; nuevos proyectos requieren verificación previa de ruta/estado real. `PA-S004` debe crear o extender el Design System y ofrecer Storybook ejecutable; el número de componentes no es una cuota global.

## F0 — Accelerator Platform

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S001 | Fundamentos de ingeniería y arquitectura | **INITIALIZE** — P0 Portfolio + bilingual Learning Site | Portfolio funcional con perfil, Selected Work y enlaces a evidencias; Learning Site ES/EN con dashboard, navegación, tracking y Studio | Pruebas de rutas ES/EN, accesibilidad, persistencia de actividades y build |
| PA-S002 | Monorepo y estándares de ingeniería | **EXTEND** — P0 Accelerator monorepo, packages, standards and CI | Workspaces, paquetes separados, límites de imports, convenciones, lint/typecheck/tests y pipeline CI | Gates de CI y pruebas de límites entre paquetes |
| PA-S003 | Arquitectura de Portfolio y Learning Site | **EXTEND** — P0 Portfolio architecture + Learning Site information architecture | Portfolio modular con páginas de proyectos/casos de estudio; arquitectura de información y contenidos del site | Pruebas de navegación y ADR de límites Portfolio/site |
| PA-S004 | Design System, tokens y accesibilidad | **INITIALIZE/EXTEND** — P3 Design System library + runnable Storybook workbench | Biblioteca de componentes consumible y Storybook ejecutable; tokens, componentes accesibles e historias de estados; tamaño definido por alcance real | Stories funcionales, pruebas de componentes/a11y y demostración de adopción |
| PA-S005 | Contenido ES/EN e internacionalización | **EXTEND** — P0/P3 bilingual content and i18n contracts | Contratos de contenido, rutas localizadas, fallback y validación de paridad ES/EN para P0/P3 | Pruebas de idioma, rutas y cobertura de traducciones |
| PA-S006 | Arquitectura de dashboard, temas y charts | **EXTEND** — P0 Learning Site dashboard, theme and charts | Ampliación del dashboard preexistente, visualizaciones semánticas, temas y separación estudio/mastery | Pruebas de vistas, cambios de tema y datos reales/estado vacío |

## F1 — Software Design & Architecture

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S007 | Abstracción, encapsulación y modularidad | **EXTEND** — P1 abstraction and encapsulation design lab | Laboratorio P1 de módulos con interfaces públicas, encapsulación y variantes implementadas | Pruebas de límites públicos/internos y ejemplos contrapuestos |
| PA-S008 | Acoplamiento, cohesión y boundaries | **EXTEND** — P1 coupling/cohesion dependency change lab | Laboratorio de grafo de dependencias y propagación de cambios entre módulos | Pruebas de límites y escenarios de cambio controlado |
| PA-S009 | SOLID y GRASP | **EXTEND** — P1 SOLID/GRASP examples and architecture tests | Casos de diseño con variantes, refactorizaciones justificadas y verificaciones estructurales | Tests de comportamiento y decisiones documentadas |
| PA-S010 | Dependency Inversion e Injection | **EXTEND** — P1 dependency inversion/injection lab | Laboratorio de inversión de dependencias, wiring de implementaciones y dobles de prueba | Tests de sustitución de dependencias y grafo válido |
| PA-S011 | Strategy, Factory y Composition | **EXTEND** — P1 Strategy/Factory/composition patterns lab | Laboratorio de patrones con algoritmos sustituibles, factorías y composición | Pruebas de variantes y decisiones de selección |
| PA-S012 | Adapter, Facade y Decorator | **EXTEND** — P1 Adapter/Facade/Decorator integration lab | Integraciones con API externa simulada, adaptadores, fachada y decoradores | Contratos de integración, errores y pruebas de sustitución |
| PA-S013 | Observer, Command y State | **EXTEND** — P1 Observer/Command/State behavior lab | Flujos de eventos/comandos y máquina de estados explícita | Pruebas de transiciones válidas/ilegales y notificaciones |
| PA-S014 | Repository, Specification y persistencia | **EXTEND** — P1 repository/specification persistence lab | Modelo de dominio con repositorios, filtros compuestos y adapters de persistencia | Pruebas de consultas, límites y persistencia |
| PA-S015 | Aplicación Layered Architecture | **INITIALIZE** — P1 independent Layered Architecture app | Aplicación Layered independiente y ejecutable con capas de presentación, servicio y datos | Tests de capas, rutas y decisión arquitectónica |
| PA-S016 | Aplicación Onion Architecture + AI Adapter | **INITIALIZE** — P1 independent Onion Architecture app + AI adapter | Aplicación Onion independiente con dominio interno, dependencias entrantes y adaptador AI sustituible | Tests de invariantes de dominio y adaptador de IA |
| PA-S017 | Aplicación Hexagonal + Ports/Tools | **INITIALIZE** — P1 independent Hexagonal Architecture app + ports/tools | Aplicación Hexagonal independiente con puertos de entrada/salida y adaptadores | Tests contractuales de puertos y sustitución de adaptadores |
| PA-S018 | Aplicación Clean Architecture | **INITIALIZE** — P1 independent Clean Architecture app | Aplicación Clean independiente con entidades, casos de uso e interfaces exteriores | Tests de reglas de dependencia y casos de uso |
| PA-S019 | Vertical Slice + Modular Monolith | **INITIALIZE** — P1 independent Vertical Slice/Modular Monolith app | Aplicación Modular Monolith independiente organizada por capacidades/slices | Tests de fronteras modulares y casos de negocio |
| PA-S020 | Comparación de arquitecturas + ADR | **COMPARE/REVIEW** — P1 architecture comparison + ADR + evidence | Matriz evaluativa de 015–019, escenarios comparables y ADR de selección | Informe con limitaciones y evidencia disponible, sin rankings inventados |

## F2 — Product Systems: APIs, Data & AI Boundaries

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S021 | HTTP, REST y límites frontend/backend | **INITIALIZE** — P2 Document Product frontend + REST API | Document Product inicial: interfaz navegable, API REST y flujo de consulta/carga de documentos | Pruebas de endpoints, códigos HTTP y frontend↔API |
| PA-S022 | API Contracts, OpenAPI y Schema Validation | **EXTEND** — P2 API contracts/OpenAPI validation | Especificación OpenAPI, validadores de schema y contratos consumidores/proveedores | Pruebas contractuales y errores de entradas/salidas |
| PA-S023 | GraphQL y arquitectura de datos frontend | **EXTEND/COMPARE** — P2 GraphQL as alternate API contract | Superficie GraphQL comparable a REST para Document Product, resolvers y control de consultas | Pruebas GraphQL y comparación razonada de enfoques |
| PA-S024 | Realtime: WebSockets y SSE | **EXTEND** — P2 real-time processing notifications | Notificaciones de procesamiento documental y conexión en tiempo real | Pruebas de conexión, reconexión y orden de mensajes |
| PA-S025 | Authentication e Identity | **EXTEND** — P2 authentication/identity | Login, sesión, expiración y protección de recursos según modelo elegido | Pruebas de identidad y expiración/autenticación |
| PA-S026 | Authorization RBAC/ABAC + permisos IA | **EXTEND** — P2 authorization/AI permissions | Reglas de autorización de documentos y herramientas AI con roles/atributos | Matriz de permisos y pruebas de acceso denegado |
| PA-S027 | PostgreSQL y modelado de dominio | **EXTEND** — P2 PostgreSQL domain model and migrations | Esquema de documentos, relaciones, migraciones y restricciones de integridad | Migraciones reproducibles y tests de integridad |
| PA-S028 | Transactions y Concurrency | **EXTEND** — P2 concurrency and transaction lab | Operaciones simultáneas en datos documentales con políticas de transacción | Casos de carrera, aislamiento y rollback probados |
| PA-S029 | Query Optimization e Indexes | **EXTEND** — P2 query optimization and indexes | Consultas optimizadas e índices justificados para Document Product | Planes de ejecución registrados y mediciones reales si se ejecutan |
| PA-S030 | Redis + cache frontend/API/AI | **EXTEND** — P2 caching experiments and policies | Caché de consultas/respuestas con claves, TTL e invalidación explícitos | Pruebas de hit/miss, invalidación y consistencia |
| PA-S031 | Search Architecture y Retrieval Foundations | **EXTEND** — P2 document search and retrieval foundations | Búsqueda documental léxica, filtros e interfaz de consulta | Pruebas de recuperación, ranking básico y errores |
| PA-S032 | Product Data Architecture ADR | **REVIEW** — P2 data architecture ADR and review | Revisión de modelo, búsqueda, transacciones, contratos y ADR de persistencia | Informe comparativo basado en pruebas y trade-offs |

## F3 — Frontend Platform Engineering

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S033 | Browser Architecture y Rendering | **EXTEND** — P3 browser rendering architecture lab | Laboratorio del ciclo de renderizado, DOM, layout y pintura | Trazas/observaciones de DevTools y escenarios reproducibles |
| PA-S034 | Event Loop, Concurrency y AI Streaming | **EXTEND** — P3 event loop/asynchronous execution lab | Laboratorio de tareas/microtareas, async y lectura incremental | Pruebas de secuencias de eventos, cancelación y errores |
| PA-S035 | Domain-Oriented Frontend Architecture | **EXTEND** — P2/P3 domain-oriented frontend modules | Módulos frontend por dominio/capacidad dentro de producto consumidor | Tests de fronteras y navegación entre dominios |
| PA-S036 | State Architecture | **EXTEND/COMPARE** — P3 frontend state architecture comparisons | Implementaciones comparables de estado local, remoto, derivado y compartido | Tests de consistencia y decisiones de ownership |
| PA-S037 | CSR, SSR, SSG y Streaming | **COMPARE** — P3 CSR/SSR/SSG/streaming rendering examples | Ejemplos preservados de las cuatro estrategias de renderizado | Comparaciones técnicas y pruebas con entornos equivalentes |
| PA-S038 | Microfrontends y límites organizacionales | **INITIALIZE** — P3 microfrontend shell + independent remotes | Shell con remotos independientes y contratos de integración | Pruebas de carga de remotos, aislamiento y fallos |
| PA-S039 | Design Systems como plataformas | **EXTEND** — P3 evolve PA-S004 Design System as consumer-facing platform | Evolución del Design System S004: contratos, versionado, distribución y consumidores | Tests de compatibilidad/adopción y guía de migración |
| PA-S040 | Design Tokens, Theming y Multi-brand | **EXTEND** — P3 tokens/theme/multi-brand variants | Paquetes de tokens, modos de tema y variantes de marca para Design System | Pruebas de contraste, composición y selección de tema |
| PA-S041 | Component/API Architecture | **EXTEND** — P3 component public APIs and Storybook stories | Componentes/historias adicionales en Storybook, APIs públicas y composición | Tests de componentes, contratos de props/slots y accesibilidad |
| PA-S042 | Accessibility Architecture y Governance | **EXTEND** — P3 accessibility testing and governance | Auditoría a11y del Design System con patrones, reglas, excepciones y seguimiento | Tests automatizados + lista de validaciones manuales ejecutadas/no ejecutadas |
| PA-S043 | Monorepos y Dependency Graphs | **EXTEND** — P3 monorepo dependency and boundary tests | Restricciones de imports/paquetes y visualización de grafos del workspace | Checks de dependencias inválidas y revisión de ownership |
| PA-S044 | Build Systems, Caching y CI | **EXTEND** — P3 build caching and CI developer tooling | Pipeline incremental, cache de tareas y CI de plataforma | Resultados reales de builds y cache si medidos |
| PA-S045 | Golden Paths, Scaffolding y AI-assisted DX | **INITIALIZE/EXTEND** — P3 golden-path generator/developer workflow | Generador CLI/plantillas para nuevos componentes o proyectos compatibles | Tests de generación, proyecto resultante y guía de mantenimiento |
| PA-S046 | Frontend Platform Strategy + Adoption RFC | **REVIEW** — P3 adoption RFC and platform strategy | RFC de adopción y estrategia de plataforma, roadmap de consumidores y acuerdos de soporte | Architecture review, supuestos y decisiones documentadas |

## F4 — Performance, Production & Reliability

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S047 | DNS, TCP, TLS y CDN | **EXTEND** — P2/P3 network flow/DNS/TCP/TLS diagnostic lab | Laboratorio de ruta de solicitud y diagnóstico de conexiones/red | Trazas reales o simuladas identificadas y casos de fallo |
| PA-S048 | Core Web Vitals + Browser Profiling | **EXTEND** — P0/P3 Web Vitals and browser profiling | Instrumentación/perfiles de Portfolio, Learning Site o consumidor P3 | Reportes con datos medidos, condiciones y límites |
| PA-S049 | Bundle, Rendering y Memory Optimization | **EXTEND** — P0/P2/P3 bundle/rendering/memory optimization | Optimización focalizada de aplicación existente con comparación verificable | Tests de regresión y mediciones antes/después si realizadas |
| PA-S050 | Containers + Runtime Architecture | **EXTEND** — P2 containerized runtime | Servicios de Document Product reproducibles en contenedores | Build/run de imágenes, health checks y configuración |
| PA-S051 | Cloud + Load Balancing + Deployment | **EXTEND** — P2 cloud/deployment/load distribution lab | Despliegue/lab de balanceo para API con plan de infraestructura | Pruebas de rutas, health checks y límites de entorno |
| PA-S052 | CI/CD + Feature Flags | **EXTEND** — P2 delivery pipeline and feature flags | Pipeline de despliegue y feature flags en producto existente | Pruebas de activación, rollback y controles CI |
| PA-S053 | Logs y Structured Telemetry | **EXTEND** — P2 structured logging and telemetry | Logging estructurado y correlación contextual de operaciones | Comprobación de campos/privacidad y escenarios de error |
| PA-S054 | Metrics + OpenTelemetry | **EXTEND** — P2 OpenTelemetry metrics | Instrumentación de métricas, recolector/exportador y panel | Tests de instrumentación y valores observados únicamente |
| PA-S055 | Distributed Tracing | **EXTEND** — P2 cross-service distributed tracing | Trazas correlacionadas UI→API→dependencias del producto | Trazas de ejemplo efectivas y análisis de spans |
| PA-S056 | SLI, SLO y Error Budgets | **EXTEND** — P2 SLI/SLO/error-budget dashboard | Documento de indicadores/objetivos y vista de confiabilidad con datos disponibles | Definición de fórmulas, fuente de métricas y estado explícito sin datos |
| PA-S057 | Retries, Timeouts y Circuit Breakers | **EXTEND** — P2 timeout/retry/circuit-breaker failure lab | Laboratorio de resiliencia con inyección controlada de lentitud/fallo | Tests de reintentos, cutoff, fallback y límites |
| PA-S058 | Failure Engineering + Postmortem | **REVIEW** — P2 incident/failure engineering lab and postmortem | Experimento de incidente controlado y postmortem con timeline y causas | Logs/mediciones reales o marcadas como simulación |

## F5 — Distributed Product Systems

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S059 | Distributed Failure Models | **INITIALIZE** — P4 independent distributed failure-model lab | Laboratorio distribuido inicial con particiones, crash/recovery y observación | Tests de recuperación y registro de supuestos |
| PA-S060 | CAP y Consistency | **EXTEND** — P4 consistency/partition scenarios | Escenarios de consistencia y partición con resultados contrastados | Tests de consistencia y explicación de límites CAP |
| PA-S061 | Replication y Partitioning | **EXTEND** — P4 replication/partitioning scenarios | Réplicas/particiones con simulación de propagación y cambios | Tests de divergencia, reconciliación y recuperación |
| PA-S062 | Time, Ordering y Coordination | **EXTEND** — P4 ordering/coordination scenarios | Laboratorio de orden causal/lógico, coordinación e idempotencia temporal | Pruebas de orden y casos fuera de secuencia |
| PA-S063 | Queues y Pub/Sub | **INITIALIZE** — P4 event-driven product with queue/PubSub | Producto event-driven inicial, productor, broker y consumidor | Integración cola/pubsub, entrega y fallos |
| PA-S064 | Kafka y Event Streaming | **EXTEND** — P4 Kafka/event streaming | Topics y consumidores de eventos integrados con P4 | Pruebas de particiones, offsets y recuperación |
| PA-S065 | Delivery Semantics e Idempotency | **EXTEND** — P4 idempotent consumers and delivery semantics | Consumidores idempotentes ante duplicados y reintentos | Pruebas de at-least-once, deduplicación y resultados |
| PA-S066 | Transactional Outbox | **EXTEND** — P4 transactional outbox | Patrón Outbox con escritura transaccional + relay de mensajes | Pruebas de atomicidad y publicación eventual |
| PA-S067 | Saga y Distributed Workflows | **EXTEND** — P4 Saga workflow/compensation | Workflow Saga con pasos y compensaciones explícitas | Pruebas de fallos parciales y compensación |
| PA-S068 | Aplicación CQRS | **INITIALIZE** — P4 independent CQRS implementation | Aplicación CQRS independiente con modelos de escritura/lectura separados | Tests de comandos, proyecciones y consistencia |
| PA-S069 | Aplicación Event Sourcing | **INITIALIZE** — P4 independent Event Sourcing implementation | Aplicación Event Sourcing independiente con registro inmutable y proyecciones | Pruebas de replay, snapshots si proceden y evolución de eventos |
| PA-S070 | Event-driven Architecture Review | **REVIEW** — P4 event architecture and failure review | Revisión de P4: topología, contratos, fallos, observabilidad y ADR | Informe con evidencias ejecutadas y riesgos abiertos |

## F6 — AI Product Engineering

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S071 | LLM Mental Model y Product Architecture | **EXTEND** — P2 AI-assisted document capability | Función AI asistida para consulta del Document Product con contrato claro | Pruebas de integración e incertidumbre documentada |
| PA-S072 | Prompt + Context Engineering | **EXTEND** — P2/P5 prompt/context composition and versioning | Composición de prompts con plantillas/versiones y separación de entradas confiables | Tests de templates, límites de contexto y entradas adversas |
| PA-S073 | Structured Outputs + Schema Contracts | **EXTEND** — P2/P5 structured-output validation | Validación de salidas AI estructuradas, errores y estrategias de recuperación | Tests de parseo/schema y rechazo de payload inválido |
| PA-S074 | Tool / Function Calling | **EXTEND** — P2/P5 tool calling contracts/permissions | Herramientas AI para consultas del producto con contratos y autorización | Tests de selección, permisos, ejecución y fallos |
| PA-S075 | Model Abstraction + AI Gateway | **INITIALIZE** — P5 AI gateway/provider abstraction | AI Gateway nuevo con proveedores/adaptadores y contrato neutral a vendor | Tests de rutas y reemplazo/fallo de proveedor simulado |
| PA-S076 | Streaming AI UX | **EXTEND** — P2 AI streaming UX | Interfaz de IA incremental con estados, cancelación y recuperación | Pruebas de stream, abort, accesibilidad y error |
| PA-S077 | Document Ingestion + Processing | **INITIALIZE** — P2/P5 ingestion and document-processing pipeline | Pipeline de ingesta/document processing con validación y estados | Pruebas de archivos válidos/inválidos y procesamiento |
| PA-S078 | Chunking + Embeddings | **EXTEND** — P2/P5 chunking and embeddings | Segmentación documental configurable y embeddings con metadatos | Pruebas de límites de chunk y trazabilidad a documento |
| PA-S079 | Vector Search | **EXTEND** — P2/P5 vector search | Índice/vector search de fragmentos documentales | Pruebas de consulta, filtrado y control de acceso |
| PA-S080 | Hybrid Retrieval + Metadata | **EXTEND** — P2/P5 hybrid retrieval and metadata | Combinación BM25/keyword + vector retrieval con filtros de metadatos | Pruebas de fusión, filtros y permisos |
| PA-S081 | Reranking + Context Construction | **EXTEND** — P2/P5 reranking and context selection | Pipeline de reranking y selección de evidencias/fragmentos | Pruebas de selección de contexto y costes reportados solo si medidos |
| PA-S082 | Production RAG Application | **EXTEND** — P2/P5 production RAG application | Producto RAG de consultas documentales con citas, abstención y políticas de error | E2E de consulta y trazabilidad cita→fragmento fuente |
| PA-S083 | RAG Evaluation + Groundedness | **EXTEND** — P2/P5 retrieval and groundedness eval suite | Conjunto de casos/golden data, evaluación retrieval/respuesta/groundedness | Resultados reales de evals con datasets/versiones documentados |
| PA-S084 | RAG Architecture Review + ADR/RFC | **REVIEW** — P2/P5 RAG architecture ADR and evidence review | Revisión formal del sistema RAG con ADR de modelo/retención/evaluación | Riesgos, trade-offs y evidencia disponible |

## F7 — Agents & AI Platform

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S085 | Workflow vs Agent | **COMPARE** — P5 workflow vs agent executable implementations | Workflow determinista y agente ejecutable como implementaciones comparables | Pruebas de casos de uso, límites y fallos |
| PA-S086 | Agent Loop + Orchestration | **INITIALIZE** — P5 agent loop and orchestration runtime | Runtime de agente con ciclo plan/acción/observación y límites de ejecución | Pruebas de fin de ciclo, presupuesto y terminación |
| PA-S087 | Tool Architecture | **EXTEND** — P5 tool registry/execution architecture | Registro de herramientas con contratos, permisos y observabilidad | Tests de herramientas y denegaciones |
| PA-S088 | Agent State + Memory | **EXTEND** — P5 agent state/memory | Estado persistente/efímero del agente con políticas de memoria | Pruebas de recuperación, borrado y separación entre sesiones |
| PA-S089 | Human-in-the-loop UX | **EXTEND** — P5 human-in-the-loop review/approval UI | Interfaz de aprobaciones antes de acciones sensibles de agente | Tests de rechazo/aprobación, auditoría y accesibilidad |
| PA-S090 | Agent Evaluation + Failure Modes | **EXTEND** — P5 agent evaluation/failure suite | Suite de evaluaciones de workflows/agentes y catálogo de fallos | Resultados medidos de evals y trazas reproducibles |
| PA-S091 | AI Security + Prompt Injection | **EXTEND** — P5 AI security and prompt-injection defenses | Escenarios defensivos de inyección y políticas de autorización de herramientas | Tests de resistencia y limitaciones de controles |
| PA-S092 | Shared AI Platform + Gateway | **EXTEND** — P5 multi-consumer AI gateway platform | AI Gateway multi-consumidor con versionado, cuotas y observabilidad | Tests de contratos entre consumidores y gateway |
| PA-S093 | Model Routing + Fallback + Governance | **EXTEND** — P5 model routing/fallback/governance | Políticas versionadas de routing/fallback y controles organizacionales | Pruebas de degradación, rutas y decisiones de proveedor |
| PA-S094 | AI Developer Platform + Adoption RFC | **INITIALIZE/EXTEND** — P5 AI developer portal and adoption artifacts | Portal para desarrolladores AI, golden paths, documentación y RFC de adopción | Demo de onboarding y revisión de contratos/soporte |

## F8 — Security, Scale & Global Systems

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S095 | Threat Modeling | **REVIEW** — P2/P3/P4/P5 threat models | Modelos de amenaza y mitigaciones priorizadas P2/P3/P4/P5 | Inventario de activos, límites y revisión de cobertura |
| PA-S096 | Web/API Security | **EXTEND** — P2/P5 web/API security controls/tests | Controles de seguridad Web/API en productos existentes | Tests defensivos de autorización, entradas, headers y sesiones |
| PA-S097 | Supply-chain / Platform Security | **EXTEND** — P3/P5 supply-chain/platform security | Validaciones de dependencias, provenance, secretos y pipeline | SBOM/escaneo/configuración documentada sin afirmar certificación |
| PA-S098 | Capacity Estimation | **REVIEW** — P2/P4/P5 capacity estimates and models | Modelo de capacidad para servicios existentes con supuestos explícitos | Hoja de estimaciones y sensibilidad a escenarios |
| PA-S099 | Load Testing + Bottlenecks | **EXTEND** — P2/P4/P5 load-test harness/results | Harness de pruebas de carga, observabilidad y análisis de cuellos | Resultados de carga solo si pruebas realmente corridas |
| PA-S100 | Rate Limiting + Backpressure | **EXTEND** — P2/P4 backpressure/rate limiting | Límites de ingreso/colas y control de presión en P2/P4 | Tests de saturación, rechazo y recuperación |
| PA-S101 | Horizontal Scaling + Autoscaling | **EXTEND** — P2/P4 autoscaling lab | Laboratorio de escalado y política de réplicas | Pruebas de escalado con límites y costes estimados etiquetados |
| PA-S102 | Multi-region Architecture | **DESIGN/COMPARE** — P6 multi-region design/lab when justified | Diseño multi-región y prototipo si justificado por el objetivo | ADR de consistencia, latencia y recuperación entre regiones |
| PA-S103 | Disaster Recovery, RTO y RPO | **EXTEND** — P6 recovery/backup restoration exercise | Backups/restauración, procedimientos y simulacro de recuperación | Resultado de restauración medido y límites RTO/RPO no inventados |
| PA-S104 | Cost Engineering y FinOps | **REVIEW** — P6 cost/FinOps analysis | Modelo de coste, escenarios y ADR financiero de arquitectura | Supuestos, fuentes de precios y sensibilidades |

## F9 — System Design + Principal Engineering

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S105 | System Design Methodology + Requirements | **REVIEW** — P6 system-design requirements/template | Kit de diseño: requisitos funcionales/no funcionales, capacidad y restricciones | Plantilla/diagrama y revisión de completitud |
| PA-S106 | Diseño de sistema de colaboración en tiempo real | **DESIGN/COMPARE** — P6 real-time collaboration design/prototype | Arquitectura de colaboración y prototipo delimitado si aporta valor | Secuencias de concurrencia, fallos y decisiones |
| PA-S107 | Diseño de búsqueda y conocimiento | **DESIGN/COMPARE** — P2/P6 search/knowledge system design | Propuesta de arquitectura de búsqueda empresarial y pruebas de hipótesis | Modelo de relevancia, contratos y trade-offs |
| PA-S108 | Diseño de sistema empresarial por eventos | **DESIGN/COMPARE** — P4/P6 enterprise event-driven design | Arquitectura empresarial event-driven basada en P4 | Topología, confiabilidad, idempotencia y ADR |
| PA-S109 | Diseño de plataforma de conocimiento con IA | **DESIGN/COMPARE** — P5/P6 AI knowledge platform design | Arquitectura de knowledge platform con RAG/evals/seguridad | Flujos de datos, contratos y evaluación propuesta |
| PA-S110 | Diseño de Frontend Platform | **DESIGN/COMPARE** — P3/P6 enterprise frontend platform design | Arquitectura multi-producto/equipo: APIs, gobierno y migraciones | RFC de adopción y compatibilidad |
| PA-S111 | Architecture Governance + Standards | **REVIEW** — P6 architecture standards/governance catalog | Catálogo de estándares, excepciones y fitness functions | Proceso de excepción, pruebas y ownership |
| PA-S112 | Cross-team Influence + Architecture Reviews | **REVIEW** — P6 architecture review practice/artifacts | Proceso de revisión técnica transversal y ejemplos de feedback | Acta de review, conflictos y acuerdos sin inventar adopción real |
| PA-S113 | Technical Strategy + Multi-quarter Roadmap | **REVIEW** — P6 multiquarter technical strategy/roadmap | Roadmap estratégico con dependencias, apuestas, costes/riesgos | Documento de opciones, hitos y decisiones |
| PA-S114 | Principal System Design + Strategy Review | **REVIEW** — P6 Principal architecture/design review | Defensa/revisión integrada de diseños 105–113 | Informe de revisión con riesgos, decisiones y tareas de seguimiento |

## F10 — Principal Capstone

| Sesión | Tema | Modo / proyecto objetivo (Source 09) | Entregable técnico específico | Verificación / evidencia exigible |
|---|---|---|---|---|
| PA-S115 | Capstone: requisitos y arquitectura | **INITIALIZE** — P6 Intelligent Enterprise Platform capstone | Intelligent Enterprise Platform P6: alcance, esqueleto técnico y contratos entre dominios | Revisión inicial de arquitectura y criterios de aceptación |
| PA-S116 | Capstone: frontend, backend y datos | **EXTEND** — P6 frontend/backend/data integration | Integrar Frontend Platform, servicios y persistencia en P6 | Tests E2E de flujos transversales y contratos |
| PA-S117 | Capstone: eventos e IA | **EXTEND** — P6 event-driven/AI integration | Integrar streaming/workflows y AI Gateway/RAG/agentes aplicables a P6 | Tests de integración y fallos en cruces P4/P5 |
| PA-S118 | Capstone: reliability, security, scale y cost | **EXTEND** — P6 reliability/security/scale/cost proof | Endurecimiento del capstone con controles, telemetría y evaluación | Reportes ejecutados y riesgos no resueltos, sin métricas ficticias |
| PA-S119 | Capstone: architecture review y adoption | **REVIEW** — P6 architecture and adoption strategy | ADR/RFC final, estrategia de migración/adopción y gobierno | Review de alternativas y plan de adopción con supuestos |
| PA-S120 | Engineering Book + evidencia + revisión final | **REVIEW/PUBLISH** — P6 final capstone + Portfolio/Learning Site evidence showcase | Showcase de P6 en Portfolio; Learning Site íntegro ES/EN; índice de artifacts y revisión de competencias | Enlaces y evidencias reales, sin atribuir L1–L5 por checkboxes |

## Reglas de lectura y aceptación

- **Estado:** planificación de outputs; no afirma que existan rutas, componentes, historias de Storybook, servicios, tests o informes.
- **Mínimo:** en sesiones técnicas se espera un producto/lab/paquete o extensión ejecutable; en sesiones decisionales, ADR/RFC/diseño/review verificable con evidencias disponibles.
- **Piloto:** PA-S001–PA-S005 preservan funcionalidades previas. La comparación al terminar S005 decidirá la plataforma reusable antes de S006.
- **Propiedad del aprendizaje:** CODEX-OWNED implementa infraestructura y trabajo acotado; LEARNER-OWNED mantiene decisiones, diagnóstico y evidencias de dominio.
- **Reutilización:** no crear un repositorio/aplicación por sesión sin fundamento; las variantes arquitectónicas relevantes se mantienen independientes.
- **Status de cobertura:** 120/120 sesiones consecutivas; esta tabla es un desglose operativo y no altera por sí sola la v8 de Project Sources.
