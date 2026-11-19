# Artefactos y publicación — v14

**Contrato v14 vigente:** Sources 23 (generación integral), 18 (orden y alcance), 19 (HTML incremental), 20 (validación no bloqueante), 21 (entregables), 22 (profundidad) y 17 (Studio 5/3/5) prevalecen sobre cualquier formulación anterior incompatible. No comprimir capítulos ni impedir crear, revisar, editar, traducir o consolidar por estados previos. Las puertas de aprobación/pruebas son exclusivamente de publicación canónica.


## Regla de integridad

La fase editorial genera bloques revisables, no un build automático. Se consolida borrador integral por defecto (Source 23) o cuando se solicita; para publicación canónica, con todos aprobados se genera exactamente un `.md` canónico ES y un `.md` EN semánticamente equivalente. El borrador íntegro no implica aprobación. Codex debe publicar el contenido de ambas fuentes sin abreviar ni reescribir; sus transformaciones son estructurales, no académicas.

## Jerarquía y presentación

Un único H1 visible por idioma; breadcrumb y código de sesión en metadatos; subtítulos naturales. Los IDs semánticos del esquema sirven para citas, anclas, seguimiento e integridad, pero **jamás aparecen ante el lector** como prefijos, códigos con puntos o rótulos de concepto. Aplicación: ... es una definición visible válida; `Aplicación (scope.application)` no lo es. No imprimir «Nivel 1 — Fundamento», «Nivel 2 — Mecanismo» ni otras capas. La diferenciación entre L1–L5 queda exclusivamente en progreso/mastery.

## Secciones obligatorias

Orden único: 1 Estructura; 2 Tiempo estimado; 3 Síntesis; 4 Objetivo; 5 Vista previa; 6 Conceptos; 7 Tema principal (7.1…7.N Subtemas anidados); 8 Integración entre áreas; 9 Teoría → Práctica; 10 Ejemplo del mundo real; 11 Ejemplo listo para producción; 12 Studio global; 13 Ejercicios; 14 Fuentes; 15 Recursos de trabajo; 16 Entregables; 17 Checklist; 18 Criterios de éxito; 19 Puente. Source 18 define los encabezados y contenido exactos.

## Casos reales y referencias

Cada caso nombrado como real exige una fuente primaria/academic específica cuyo texto apoye el problema, mecanismo, arquitectura y consecuencias descritas. Citar cerca de afirmación. Identificar límites: una publicación no demuestra métricas ni decisiones internas que no menciona. Un white paper general de una práctica no equivale automáticamente a un estudio de caso de una empresa real.

Un ejemplo de producción contiene componentes, estado, invariantes, contratos de entrada/salida/error, código esencial, fallos normales/adversariales, seguridad, idempotencia/concurrencia cuando aplique, pruebas reproducibles o planes honestos, observabilidad, despliegue, migraciones, rollback, decisión y trade-offs. **No calificarlo como verificado si solo se escribió el diseño**. Fuente para comportamiento de tecnologías en documentación oficial correspondiente.

## Site y portfolio separados

`site/` es el sitio público de aprendizaje, con `/es/` y `/en/` dashboards, session/project pages, navegación de fases/proyectos, TOC por página, Light/Dark, responsive phone→tablet→desktop, citas, ejemplos y estudio interactivo. `apps/portfolio/` es el producto profesional con casos y evidencia pública autorizada; no es el repositorio de teoría completa. No crear `apps/book/`.

Los proyectos P1–P6 se implementan según Source 09. Storybook/Design System en PA-S004 es un producto/laboratorio **además** de site y portafolio. Versionar/compatibilizar por consumidores; no borrar variantes arquitectónicas comparables.

## Visual Learning Studio

Para cada sesión de teoría: mapa mental Mermaid fuente enlazado a todos los conceptos del índice, Tema principal y Subtemas, compilado a SVG responsive accesible con `viewBox`, título/desc, alt y lectura sin JS. Flashcards con cobertura completa de mismas secciones; tarjeta = pregunta, respuesta específica, explicación y fuente; navegación anterior/siguiente, flip, contador, touch/teclado y `prefers-reduced-motion`, fallback sin JS. Simulador, explorador y matriz también son obligatorios en el Studio global; no tabs fijos ni simuladores inertes.

El diagrama de secuencia, tabla de contraste o código que enseña una relación también debe ir junto a su explicación, no exclusivamente en el Studio. La cobertura se verifica en HTML visible además de metadatos. La cantidad de tarjetas depende del inventario real, sin cuota universal.

## Tracking y evidencia

Checkboxes de ejercicios y lista de estudio: habilitados, reversibles, persistidos y con identificadores compartidos ES/EN invisibles. Estado de estudio ≠ dominio ≠ `Completed`. L1 Explain, L2 Implement, L3 Operate, L4 Decide, L5 Lead exigen evidencia distinta y auditada. No publicar porcentajes o métricas inventados: mostrar estado vacío explícito cuando no hay datos.

## Artefactos durables

Por sesión: teoría canónica bilingüe aprobada, páginas publicadas, artefacto de app/lab/arquitectura, ADR/RFC si aplica, fuentes y recursos, diagramas, ejercicios, registro de evaluación y evidencia real separada. No publicar secretos ni evidencia privada de empleadores. Los paths definitivos deben verificarse en Git.

## Publicación y reporte

Verificar `git diff`, tests ejecutados, build, HTML ES/EN, cobertura atómica, accesibilidad relevante, Mermaid→SVG, flashcards, controles de UI, tests de regresión de sesiones anteriores y Storybook cuando corresponda. Reportar salida observada y límites, no afirmar resultados no ejecutados. Registrar diferencias entre texto aprobado y render, y detener si se modifican hechos o desaparecen mecanismos.

## v11 — Contrato semántico de la página educativa

Publicar encabezado de contexto **una sola vez**: `Fase 0 · PA-S002` para la sesión de referencia, y de manera equivalente `Fase N · PA-Sxxx` en otras. El nombre de fase se escribe completo; el único H1 es el título académico. Breadcrumb puede contener una referencia de navegación corta, sin duplicar la leyenda compuesta. Ninguna «comilla angular» envuelve definiciones.

- **Vista previa:** recorrido conceptual **vertical**, secciones distintas para Staff→Principal, FPA y AIPE cuando realmente aplican. Términos en formato visible `Concepto: definición`; ejemplo concreto dentro de su `dd`/bloque semántico.
- **Capítulo Tema principal y cada Subtema:** `section` con `aria-labelledby` y ancla propia; síntesis propia de tres ideas (p. ej. `ol`); `Conceptos del tema principal` o `Conceptos del subtema N` con `dl/dt/dd`; desarrollo técnico; figura Mermaid→SVG accesible propia, junto a prosa explicativa; ejemplo, ejercicio/solución, preguntas/flashcards locales, Studio local, recursos con URLs verificadas y `Comprueba lo aprendido` con respuestas. El Visual Learning Studio integral exige los cinco modos con cobertura de la sesión completa.
- **Semántica HTML:** `p` párrafos, `ol/li` secuencias, `ul/li` colecciones, `strong` énfasis, `em` matiz, `figure/figcaption` visual, `pre/code` código, `fieldset/legend` grupos de preguntas, `table/caption/th[scope]` si hay datos comparables. Jamás `p` repetidos para simular pasos ni `br` como viñeta.
- **Enlaces:** mostrar rótulos legibles, `a[href="#subtopic-7"]` solo si existe un `id="subtopic-7"`, IDs sin duplicados; resolver rutas internas con `BASE_PATH` y probar anchors de URL directa. Enlaces externos a recursos concretos, con dominio oficial y lectura útil (no URL falsa o decorativa).
- **Visuales:** además de los diagramas obligatorios por capítulo, usar contraste, dependencias, secuencia, estado, predict/reveal, ejemplo trabajado, matriz de decisión, errores guiados o simulación honesta según el concepto. Cada interacción debe tener una finalidad didáctica, feedback y alternativa accesible/no-JS.

**Publicación fiel:** si falta contenido canónico en un capítulo, no inventarlo en el renderer. Marcar `MISSING_LOCAL_CHAPTER_COVERAGE` en auditoría editorial y devolverlo a revisión. Si un cambio de estructura altera teoría aprobada, pedir reconfirmación. ES/EN equivalente y sin cambios encubiertos de lógica de negocio.

## v14 — Contrato de artefactos y Studio

Todos los conceptos globales y locales, incluso en el inventario, se organizan verticalmente por Staff → Principal, FPA y AIPE (indicar cuando no aplique). Cada entrada es `Concepto: definición` y un párrafo independiente `Ejemplo:` propio y contextualizado en software; nunca tabla, grid horizontal, comillas angulares o ID visible. Flashcards individuales, nunca tablas.

**Mínimos obligatorios v14:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional exige los cinco modos integradores de cobertura integral (5/3/5; 10 + 3N como mínimo). Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.

Incluir `Entregables de la sesión` antes del Checklist como explicación académica; en modo integral producir el plano B separado (Source 21). En modo introducción, listar solo su encabezado en el índice. Separar Learning Site ES/EN, app/lab/package/tool o artefacto de diseño/revisión de Source 09, contribución al Portfolio (o N/A justificado), tareas CODEX-OWNED/LEARNER-OWNED y pruebas/evidencia. Para cada entregable: propósito, instrucciones numeradas de qué crear/modificar, comandos verificados si existen, resultado esperado, ruta relativa al monorepo (verificada o propuesta), responsable y criterio de aceptación/verificación. Consultar Git, Sources 03/09 y SESSION-OUTPUTS-120; ninguna página teórica sustituye el objetivo de ingeniería.

Código legible y mantenible en todo el monorepo (apps, Portfolio, Learning Site y paquetes): nombres claros, módulos y tipos; prohibido ofuscar/minimizar código autorado o salida propia; preservar archivos de terceros y no usar bundles minificados como fuente. Usar configuración e ignore Prettier de raíz para JS/TS/JSX/TSX, HTML, CSS/SCSS/Sass (parser/plugin compatible), Markdown, JSON y otros formatos soportados; ejecutar formato y `prettier --check` en CI. Reportar comandos/resultados reales y no alterar semántica, convenciones ni teoría aprobada.

El handoff identifica los recursos por sección, los datos y supuestos aprobados, la interacción esperada, sus respuestas y fallback. El HTML autónomo debe mostrar recursos utilizables directamente; el site implementa la misma semántica interactiva ES/EN. Si un recurso no se puede renderizar en HTML o site, informar, no contarlo ni afirmar completitud. No usar IDs visibles ni reautorizar teoría.
