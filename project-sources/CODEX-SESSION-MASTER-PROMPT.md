# Handoff maestro de Codex — versión v10 (solo tras solicitud explícita)

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
