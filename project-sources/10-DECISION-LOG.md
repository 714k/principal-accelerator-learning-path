# Decision Log

## Accepted editorial architecture decision — atomic concepts before synthesis
**CONTENT-005 — Accepted.** For all 120 sessions and their later generated Codex prompts, composite Main Topics/Subtopics are decomposed into individual independently taught component concepts with stable bilingual IDs; no integrated exposition precedes those foundations. Instructional means (concrete examples, relevant inline diagrams/tables/lists/flows, retrieval+answer and named production consequences) are part of canonical ChatGPT-owned theory, not decorations Codex may generate as a substitute. Codex preserves/re-renders those authored functions exactly; failure if coverage is missing (`MISSING_ATOMIC_CONCEPT_COVERAGE`). See `05` authority, `04/11/12/13` gates.

Track durable technical decisions made during the Accelerator.

## Accepted program-level decisions — 2026-10-10

| ID | Session | Project/App | Decision | Artifact | Status |
|---|---|---|---|---|---|
| UI-001 | Program | `site/` | Learning Site home is an evidence-safe progress dashboard; study completion is separate from evidence-backed mastery. | Project Sources | Accepted |
| UI-002 | Program | `site/` | Desktop global navigation uses the primary navigation column for phases/sessions/projects; page TOC is below it or above article content; mobile-first priority is phone → tablet/iPad → desktop. | Project Sources | Accepted |
| LEARN-001 | Program | `site/` | Every theory-bearing session publishes an adaptive Visual Learning Studio with mandatory mind map + complete flashcards and topic-appropriate additional modes. | Project Sources | Accepted |
| CONTENT-001 | Program | `site/` | Main Topic/Subtopics begin with academic concept definition/scope before deeper development; every acronym is expanded at least once per page. | Project Sources | Accepted |
| STYLE-001 | Program | Accelerator UIs | Default decorative palette avoids pink, purple and rainbow/multi-hue combinations unless product/domain/brand context explicitly requires them. | Project Sources | Accepted |

## Accepted program-level decisions — implementation enforcement

| ID | Session | Project/App | Decision | Artifact | Status |
|---|---|---|---|---|---|
| UI-004 | Program | `site/` | Dashboard + interactive study tracking are P0 baseline capabilities from PA-S001, not deferred to PA-S006. | Project Sources | Accepted |
| UI-005 | Program | `site/` | Regeneration is preserve-and-extend: current richer site capabilities must not be replaced by a smaller scaffold. | Project Sources | Accepted |
| UI-006 | Program | `site/` | Trackable Exercise/Mastery controls are enabled, toggleable, persisted study-state controls with stable ES/EN IDs; `disabled` is non-compliant by default. | Project Sources | Accepted |
| GEN-001 | Program | Codex | Session-generated Codex prompts inline hard Learning Site acceptance gates rather than only referencing Sources. | Project Sources | Accepted |
| GEN-002 | Program | Codex | Codex is the default Build executor once compatible structure exists. `.sh` is reserved exclusively for deterministic first-time scaffolding of a new repository/app/lab/system and is not required for routine session deliverables, content publication, migrations or extensions. | Project Sources | Accepted |

## Accepted clarification — session executable targets and PA-S004

**APP-001 — Accepted (2026-10-23).** Every implementation handoff distinguishes primary runnable application/lab/package from the separate Learning Site publishing and Portfolio surfaces. When a session calls for a runnable deliverable, documentation alone does not satisfy it. The source-of-truth app map lives in `09-PROJECTS-AND-APPS.md`; Codex must resolve real paths against Git and preserve previous pilot sessions. Missing target is `MISSING_SESSION_APP_TARGET`.

**APP-004 — Accepted (2026-10-23).** PA-S004 initiates or extends a usable independent Design System + Storybook workbench. Component quantities and choices remain session-specific implementation scope, not universal constraints. Do not force a platform-wide refactor during S001–S005 discovery. The previously listed six components are a **proposal**, not an accepted fixed count.


## Status values

-   Proposed
-   Accepted
-   Superseded
-   Rejected
-   Experimental

## Rule

Do not record a technology preference as a decision unless context,
alternatives, trade-offs and consequences have been analyzed.

## Accepted program-level decisions — learning text ergonomics

| ID | Session | Project/App | Decision | Artifact | Status |
|---|---|---|---|---|---|
| LEARN-002 | Program | `site/` | Theory publishing must optimize learning ergonomics: local pre-training, one dominant idea per paragraph, structural signaling, immediate concrete examples, retrieval prompts, adjacent topic-fit visuals, optional bounded analogies and evidence-adaptive scaffolding. Pure exposition/bullet-only/card-soup output is non-compliant. | Project Sources | Accepted |

## Accepted program-level decisions — canonical theory authorship

| ID | Session | Project/App | Decision | Artifact | Status |
|---|---|---|---|---|---|
| CONTENT-002 | Program | `site/` | ChatGPT/session Theory Phase is the canonical author of complete academic learning content; Codex publishes/integrates it and may not independently reauthor or compress it. | Project Sources | Accepted |
| CONTENT-003 | Program | `site/` | Theory-bearing Build handoffs must carry exact canonical ES/EN content payload/files; missing canonical theory causes a hard publication stop rather than Codex synthesis. | Project Sources | Accepted |
| CONTENT-004 | Program | `site/` | Renderer/schema must represent instructional functions explicitly enough to preserve pre-training, guiding question, examples, mechanism/visual, retrieval, failures/trade-offs and resolution. | Project Sources | Accepted |

## Decision — domain-separated theory before cross-domain synthesis

**Status:** Accepted.

Every theory-bearing session separates Staff → Principal Software Engineering, Frontend Platform Architecture (FPA), and AI Product Engineering (AIPE) concepts/theory before any mixed treatment. Cross-domain synthesis is conditional and explicitly labeled. This prevents the curriculum from obscuring which competency track a concept develops.

## Historical decision — Study-only conversation theory companions (SUPERSEDED)

**Status:** Superseded by **FLOW-009 / Source 16** (2026-10-25). ES/EN canonical files remain required after block approvals, but bare `PA-Sxxx` now produces only the editorial inventory. Do not interpret this historical item as an active trigger contract. The files are created before composing the prompt and must be transportable to the Codex workspace.

## Accepted — accelerated-learning format across canonical theory and Codex prompts
**CONTENT-006 — Accepted.** Every future theory session opens with a three-point 30-second synthesis, uses restrained paragraph-entry key-phrase emphasis and three reading levels, contextual causal labels, accessible inline 10-word glossaries, and context-grounded widget suggestions where appropriate. This applies in ChatGPT-authored ES/EN companions and is inlined into every later Codex publishing prompt. This is instructional presentation, not a license to alter application business logic or to let Codex author missing canonical theory. Detailed source: `14-ACCELERATED-LEARNING-UX.md`.

## Accepted — V6 automatic Codex handoff + adaptive pedagogy — 2026-10-18
- **FLOW-006 — Superseded by FLOW-009:** the former immediate Codex handoff remains historical; do not use it as a current trigger.
- **LEARN-006 — Accepted:** all 120 sessions adopt universal learning fundamentals plus evidence-aware selection of additional methods per atomic concept, with justified interactions and spaced retrieval; do not require all widgets.
- **CONTENT-007 — Accepted:** canonical authorship firewall stays intact; no Codex theory reauthoring.

## V8 — Approved application-target enforcement (2026-10-24)

- **APP-008 — Accepted:** Every `PA-Sxxx` handoff distinguishes (a) primary runnable app/lab/platform/package or justified durable review/design artifact, and (b) bilingual Learning Site publication; the latter never replaces the former.
- **APP-004 — Accepted:** PA-S004's primary implementation is **Design System + runnable Storybook**, accessible real components, tokens, stories and applicable tests. Portfolio and Learning Site are secondary/publishing surfaces, not substitutes. Component number/framework/paths remain session-specific after actual repository and Radar inspection. Failure marker: `MISSING_SESSION_APP_TARGET`.
- **MAP-008 — Accepted as planning baseline, not frozen execution contract:** Source 09 carries mapped primary targets for all 120 sessions. Other rows may be refined by session decisions and real Git state; do not infer apps were already built.
- **PILOT-008 — Accepted:** Review S001–S005 collectively before generalizing platform contracts at S006; preserve capabilities between sessions, avoid speculative rewrites.


## FLOW-009 — Accepted, 2026-10-25 — Editorial review by parts

Supersedes FLOW-006 immediate Codex prompt. Bare `PA-Sxxx` now triggers only a comprehensive editorial inventory; the student requests/reviews/accepts the Main Topic and then each Subtopic and other sections individually. Consolidated ES, EN and Codex are later separately requested. Source 16 is authoritative. Also accepted: one visible H1, no printed Nivel 1/2/3 headings, local concept introduction in EVERY topic, independently verified named-company real-world cases, production-ready scenarios with actual contracts/failure/testing/ops, and no Accelerator project in academic teaching examples. Preserve Source 09 app targets, including PA-S004 Storybook.


## FLOW-010 / CONTENT-010 / EVIDENCE-010 — aceptadas, 2026-10-31

**FLOW-010 (Accepted).** La versión vigente revisa por bloques con aceptación explícita; petición literal de sesión completa permite un borrador íntegro pero **no implica aprobación**. Los fragmentos aprobados no se modifican sin reconfirmación. La activación de entrega inmediata de Codex de versiones anteriores permanece **SUPERSEDED** dentro de este paquete documental.

**CONTENT-010 (Accepted).** Se prohíben los IDs de máquina impresos en cualquier texto académico visible (título, índice, definición, tarjetas, tablas). Cada concepto en el inventario se expresa **término: definición breve**, y se desarrolla localmente dentro del Tema principal o Subtema correspondiente. Un H1 único y títulos naturales. Ningún `Nivel 1/2/3` visible para capas de lectura. La teoría trata sistemas externos; Accelerator solo en Teoría→Práctica/entregables.

**QUALITY-010 (Accepted).** La profundidad se prueba con mecanismos técnicos concretos, escenarios adversos, alternativas, justificación y verificación; un marcador «ejemplo real» requiere una fuente primaria que sustente exactamente el mecanismo descrito. Production-ready sin implementación y pruebas ejecutadas se denomina *diseño de referencia no validado*. Diagramas y flashcards no sustituyen desarrollo. Auditoría humana obligatoria tras checks automáticos.

**PILOT-010 (Accepted).** PA-S001–PA-S005: comparar los cinco antes de estandarizar S006–S120, y preservar productos/capacidades existentes; no imponer estructuras internas iguales.

## CONTENT-011 / UX-011 / PUBLISH-011 — Feedback del piloto PA-S002, 2026-11-14

**Estado: aceptado como requisito editorial por solicitud del usuario; implementación y adecuación visual aún no verificadas.** El contenido de PA-S002 y su renderizador sirvieron exclusivamente de referencia; no se revisaron las otras sesiones en esta iteración.

- `CONTENT-011`: una leyenda visible de fase/sesión por página (`Fase N · PA-Sxxx`, nombre de fase desarrollado); un H1; vista previa vertical por dominio; nombre de concepto seguido de definición y ejemplo local, sin comillas angulares ni IDs de máquina; etiquetas `Conceptos del tema principal` y `Conceptos del subtema N`.
- `UX-011`: cada Tema principal y cada Subtema contiene su síntesis propia de tres ideas, diagrama contextual Mermaid→SVG, ejemplo, ejercicio resuelto, flashcards, recursos y Studio local; la sesión además conserva su Studio integral. Elementos interactivos adicionales según mecanismo pedagógico válido.
- `PUBLISH-011`: HTML semántico (p, ol, ul, dl, figure, strong/em, fieldset) y anchors legibles válidos, sin convertir secuencias en párrafos o `br`. Navegación de anclas y base GitHub Pages verificadas contra el HTML generado. Codex no reautoriza ni modifica lógica de aplicación para cumplir presentación.

**Efecto retroactivo:** no se reescriben automáticamente bloques aprobados. PA-S002 puede migrarse al contrato v11 cuando el usuario autorice revisar sus bloques; diferencias conceptuales requieren confirmación editorial. Fuente de verdad de aceptación: Source 16, no el estado impreso dentro de un archivo histórico.

## FLOW-012 / CONTENT-012 / UX-012 / OUTPUT-012 / CODE-012 — 2026-11-15

Aceptado como requisito por solicitud expresa del estudiante; no evidencia de implementación. Sustituye las reglas v11 incompatibles; el resto se conserva.

- FLOW-012: Tras título/contexto mostrar la **estructura completa y numerada** de la sesión, incluidos los subtemas del roadmap y las restantes secciones; si la petición es solo PA-Sxxx, entregar únicamente inventario, no desarrollar teoría ni Codex, y detenerse. Después desarrollar exclusivamente el bloque solicitado y esperar aprobación explícita.
- CONTENT-012: Todos los conceptos globales y locales, incluso en el inventario, se organizan verticalmente por Staff → Principal, FPA y AIPE (indicar cuando no aplique). Cada entrada es `Concepto: definición` y un párrafo independiente `Ejemplo:` propio y contextualizado en software; nunca tabla, grid horizontal, comillas angulares o ID visible. Flashcards individuales, nunca tablas.
- UX-012: **Mínimos obligatorios v12:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional conserva mapa y tarjetas de cobertura integral. Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.
- OUTPUT-012: Incluir `Entregables de la sesión` antes del Checklist y anticiparlo en el inventario. Separar Learning Site ES/EN, app/lab/package/tool o artefacto de diseño/revisión de Source 09, contribución al Portfolio (o N/A justificado), tareas CODEX-OWNED/LEARNER-OWNED y pruebas/evidencia. Para cada entregable: propósito, instrucciones numeradas de qué crear/modificar, comandos verificados si existen, resultado esperado, ruta relativa al monorepo (verificada o propuesta), responsable y criterio de aceptación/verificación. Consultar Git, Sources 03/09 y SESSION-OUTPUTS-120; ninguna página teórica sustituye el objetivo de ingeniería.
- CODE-012: Código legible y mantenible en todo el monorepo (apps, Portfolio, Learning Site y paquetes): nombres claros, módulos y tipos; prohibido ofuscar/minimizar código autorado o salida propia; preservar archivos de terceros y no usar bundles minificados como fuente. Usar configuración e ignore Prettier de raíz para JS/TS/JSX/TSX, HTML, CSS/SCSS/Sass (parser/plugin compatible), Markdown, JSON y otros formatos soportados; ejecutar formato y `prettier --check` en CI. Reportar comandos/resultados reales y no alterar semántica, convenciones ni teoría aprobada.
- PA-S003: PA-S003, punto 13: **Integración entre AI Product Engineering, Staff Software Engineer y Frontend Platform Architect**. Síntesis transversal de conceptos, mecanismos, fronteras, arquitectura y responsabilidades después de enseñar cada área; integración del Portfolio/site corresponde a aplicación posterior, no a esta teoría.

Las decisiones no otorgan dominio, no cambian contenido aprobado automáticamente y no certifican que widgets o CI funcionen.

## GOVERNANCE-012 / UX-012-A — Settings como router y Source 17

Aceptado por solicitud del estudiante: Settings se limita a enrutamiento y precedencia; las reglas detalladas y todas las correcciones aprobadas se conservan de forma acumulativa en Sources. Actualizar el Source temático, este registro y referencias/auditorías afectadas en cada cambio; no perder requisitos anteriores para respetar el límite de Settings.

Source 17 es la autoridad específica del Visual Learning Studio: cinco modos interactivos en Tema principal, tres en cada Subtema y Studio global adicional; generación directa en chat, comportamiento observable y pruebas de aceptación. Source 16 conserva flujo y aprobación, Source 14 aporta UX. No modifica roadmap, aplicación, teoría aprobada ni evidencia.

## v14 — 18 de noviembre de 2026: generación integral

- FLOW-014: Source 23 sustituye el disparador bare ID de v13 y FLOW-009/012: `PA-Sxxx` genera HTML ES completo por bloques y plano B separado sin turnos de aprobación. Introducción/progresivo quedan como modalidades explícitas, y «Continúa» retoma checkpoints. Nunca reducir profundidad por longitud.
- Encabezado H1 técnico específico seguido de párrafo de capacidad concreta. Tiempo inmediatamente después del índice en tabla Actividad/Tiempo/Total.
- Conservar las 19 secciones académicas, subtemas anidados y Studio 5/3/5, diagramas y pruebas. Plano B B.1–B.11 en archivos separados, con prompt borrador, no handoff ejecutado ni publicación implícita.
- Mantener currículo, destinos, teoría aprobada y estados; EN a solicitud. Source 19 incorpora el schema completo para el límite de 25 archivos de Sources; JSON sigue en Git.

## UX-013 — Mapa mental como diagrama interactivo premium

**Aceptado por solicitud expresa del estudiante, 2026-11-26.** Cada mapa mental incluido al crear o migrar sesiones desde contenido suministrado (texto, Markdown, HTML u otro formato) se presenta como un diagrama conceptual interactivo con el look and feel premium de PA-S001. Se preservan conceptos y relaciones de la fuente sin inventar conexiones; los nodos se seleccionan con puntero, toque y teclado, y sincronizan el estado visual, selectores nativos y panel de detalle accesible `aria-live="polite"`. La representación usa grupos funcionales de color, conectores punteados dirigidos, leyenda localizada y canvas oscuro. En mapas de más de tres conceptos se usan selectores de categoría/concepto; escritorio conserva SVG compacto y móvil oculta solo la vista general, manteniendo leyenda y selectores. La implementación pertenece a `site/shared/assets/session-ui.css` y `session-ui.js`, no a estilos/scripts locales. Fuente normativa completa: Source 17 §3.1 y `contracts/02-ui-normalization-contract.md`; el agente debe aplicarlo a todas las sesiones derivadas de contenido.

## v13 — 16 de noviembre de 2026: contratos acumulativos aprobados para actualización (histórico; disparador sustituido por v14)

- Primera respuesta limitada a seis apartados, orden 18; tiempo enseguida del índice, subtemas anidados, integración PA-S003 en 8.
- Autoría por bloques profundos a solicitud, sin estados que bloqueen creación, edición, traducción o consolidación; publicación canónica conserva sus puertas.
- HTML de aprendizaje autónomo incremental por sesión/idioma; contenido aprobado sin cambios fuera del alcance; Markdown ES/EN al handoff.
- Studio 5/3/5, mínimo global cinco modos adicionales, HTML funcional como superficie principal; pruebas de comportamiento y declaración de pendientes.
- Contratos 18–22, auditoría y referencia ejecutable; fuentes detalladas, Settings router, entregables Learner/Codex diferenciados. Las decisiones anteriores no incompatibles permanecen; no cambia roadmap ni progreso real.
