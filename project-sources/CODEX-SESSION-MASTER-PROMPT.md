# Handoff maestro de Codex — versión v12 (solo tras solicitud explícita)

**NO es un prompt de una sesión listo para ejecutar:** debe rellenarse con la sesión real, estado de Git y **DOS contenidos académicos canónicos aprobados**.

## Autoridad y preflight

- Sesión `{PA-Sxxx}`; tema oficial de Source 03; ámbitos y objetivo específicos.
- Destino ejecutable de Source 09: `{app/lab/proyecto}` + `{INITIALIZE/EXTEND/COMPARE/REVIEW}`; distinguiendo ruta real verificada de ruta propuesta.
- Inspección real: `git status`, estructura del repo, Technology Radar, `/ui-reference/`, capacidades anteriores del piloto/otras sesiones, dependencias, pruebas y decisiones.
- Archivos/payload **reales y completos**: `{ABS_PATH_ES_EN_WORKSPACE}` y `{ABS_PATH_EN_EN_WORKSPACE}`; `{ES_BYTES, ES_SHA256}` / `{EN_BYTES, EN_SHA256}`. Un `sandbox:/mnt/data` no prueba acceso desde Codex; si paths no accesibles, incluir literalmente el payload, sin resumir.
- Gate: `MISSING_CANONICAL_THEORY_PAYLOAD` si falta alguna teoría o aprobación. `MISSING_ATOMIC_CONCEPT_COVERAGE` si conceptos, mechanisms, citas, respuestas o paridad faltan. `MISSING_SESSION_APP_TARGET` si el proyecto ejecutable necesario se omite.

## Contratos innegociables

`PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY.`
`DO NOT CHANGE APPLICATION CODE LOGIC FOR PRESENTATION.`

ChatGPT escribe la teoría; Codex no inventa, reescribe, comprime ni fusiona conceptos. Un H1 visible por idioma. IDs técnicos únicamente como metadata/anclas no impresas, y nada de «Nivel 1/2/3» como títulos pedagógicos. Conservar conceptos individuales **dentro de Tema principal y cada Subtema**, mecanismos concretos, ejemplos externos, errores, operaciones, respuestas, diagramas/tables/código, fuentes, recursos y éxito. Solo Teoría→Práctica puede utilizar el proyecto Accelerator como ejemplo.

## Producto + publicación separados

Implementar el destino de aplicación/lab Source 09 + teoría ES/EN y páginas de proyecto por separado. PA-S001 Portfolio y site son productos distintos; PA-S004 necesita Design System + Storybook ejecutable (stories, componentes y tokens pertinentes, accesibilidad y tests) y no basta con Portfolio+teoría; PA-S039 evoluciona la biblioteca. Preservar rutas y funciones previas y variantes independientes. No crear `apps/book/`.

## CODEX-OWNED / LEARNER-OWNED

CODEX-OWNED: scaffolding y tareas repetitivas delimitadas, tests/harness, integración de contenido, UI, nav, diagrams, documentación técnica, calidad del build. LEARNER-OWNED: decisiones clave, algoritmo aprendido, revisión de tradeoffs y evidencia de operación/liderazgo. Seleccionar modo Scaffold/Pair/Build y respetar excepciones de script: `.sh` solo scaffold de sistema completamente nuevo desde cero.

## Design → Build → Prove → Think → Publish

**Design:** inventariar baseline, límites, decisiones, riesgos y planes de pruebas. **Build:** ejecutar cambios autorizados y renderizar teoría sin reautoría. **Prove:** comparar fuentes aprobadas ES/EN con HTML, IDs internos, conceptos, anclas, citas, simetría, H1 único y sin IDs impresos; mind map Mermaid `.mmd` a SVG responsive/access; flashcards completas y accesibles; widgets justificados; no-JS; dashboards ES/EN con datos reales/empty state, estudio reversible/persistido, sin apropiación de mastery L1–L5, light/dark mobile-first; pruebas de app/Storybook, regresiones y `git diff`. **Think:** explicar alternativas y límites de evidencia/CI. **Publish:** reportar cambios, comandos/resultados ejecutados, rutas/URLs observadas, evidencia, decisiones y pendientes; sin inventar cifras.

## Informe final obligatorio

- Entradas canónicas: rutas, bytes, sha256, estado de aceptación editorial, conceptos y fuentes realmente representados.
- App/lab: creación/extensión, paths y demostración ejecutable o razón no-app.
- Theory site: ES/EN, index, dashboard, Diagram SVG, flashcards, citas, y preservación.
- Tests: comandos reales, resultados, alcance, HTML inspeccionado, a11y/responsive, regresiones y `git diff`.
- Excepciones/desviaciones, riesgo, correcciones y tareas LEARNER-OWNED pendientes.

## Addendum v11 — Solo Learning Site (sin reautoría de teoría)

Al aplicar el estilo educativo v11, inspeccionar contenido canónico de la sesión autorizada y su renderer, sin leer otras sesiones si el usuario limitó la revisión a PA-S002. Conservar texto aprobado y proteger lógica de las aplicaciones. Publicar semántica: una sola leyenda `Fase N · PA-Sxxx`, H1 único; vista previa vertical separada por dominio; conceptos `Nombre: definición` con ejemplo propio, sin « »; `Conceptos del tema principal` y `Conceptos del subtema N`; síntesis de tres ideas por capítulo; diagrama Mermaid→SVG propio contextual, ejercicio y solución, flashcards, Studio local y recursos legibles por capítulo; Studio global sin pérdida. Render HTML nativo (`p`, `ol/li`, `ul/li`, `dl/dt/dd`, `strong`, `em`, `figure/figcaption`, `fieldset/legend`); probar anchors únicos y existentes, incluyendo `#subtopic-7` y base GitHub Pages. Adjuntar evidencia de HTML realmente generado, no solo chequeos textuales. Para contenido adicional no aprobado, detener publicación y solicitar aceptación editorial.

## Addendum v12 — Contrato de entrega y renderizado

Todos los conceptos globales y locales, incluso en el inventario, se organizan verticalmente por Staff → Principal, FPA y AIPE (indicar cuando no aplique). Cada entrada es `Concepto: definición` y un párrafo independiente `Ejemplo:` propio y contextualizado en software; nunca tabla, grid horizontal, comillas angulares o ID visible. Flashcards individuales, nunca tablas.

**Mínimos obligatorios v12:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional conserva mapa y tarjetas de cobertura integral. Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.

Incluir `Entregables de la sesión` antes del Checklist y anticiparlo en el inventario. Separar Learning Site ES/EN, app/lab/package/tool o artefacto de diseño/revisión de Source 09, contribución al Portfolio (o N/A justificado), tareas CODEX-OWNED/LEARNER-OWNED y pruebas/evidencia. Para cada entregable: propósito, instrucciones numeradas de qué crear/modificar, comandos verificados si existen, resultado esperado, ruta relativa al monorepo (verificada o propuesta), responsable y criterio de aceptación/verificación. Consultar Git, Sources 03/09 y SESSION-OUTPUTS-120; ninguna página teórica sustituye el objetivo de ingeniería.

Código legible y mantenible en todo el monorepo (apps, Portfolio, Learning Site y paquetes): nombres claros, módulos y tipos; prohibido ofuscar/minimizar código autorado o salida propia; preservar archivos de terceros y no usar bundles minificados como fuente. Usar configuración e ignore Prettier de raíz para JS/TS/JSX/TSX, HTML, CSS/SCSS/Sass (parser/plugin compatible), Markdown, JSON y otros formatos soportados; ejecutar formato y `prettier --check` en CI. Reportar comandos/resultados reales y no alterar semántica, convenciones ni teoría aprobada.

Implementar los cinco modos interactivos según Source 14, a partir del material aprobado ES/EN; sin reautoría. Reportar pruebas de cada modo, cobertura 5/3, paridad, accesibilidad/fallback, comandos y resultados reales, rutas y responsables. Si falta payload o interacción aprobada, reportar bloqueo y no declarar publicación completa. No confundir especificación, código, imagen estática o fallback con widget interactivo.
