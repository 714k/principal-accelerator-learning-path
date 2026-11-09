# Codex — límites, handoff y verificación (v10)

## Cuándo se autoriza

El disparador `PA-Sxxx` **no** autoriza por sí solo un handoff técnico en este contrato editorial. Codex se solicita expresamente después de aprobar y consolidar las teorías ES/EN. Si el usuario pide «Codex» antes y faltan payloads, responder `MISSING_CANONICAL_THEORY_PAYLOAD` y detener publicación, sin pedir a Codex que escriba o resuma teoría. Un borrador íntegro mostrado en chat sin aprobación no es payload canónico aprobado.

## Dos superficies y un destino de ingeniería

Consultar Source 03 + Source 09 + Git. Definir app/lab/producto ejecutable (o revisión fundamentada) **además** de la publicación en Learning Site `/es/` y `/en/`. Especificar nueva/extensión/comparación/revisión y distinguir rutas existentes verificadas de rutas propuestas. PA-S001: Portfolio y sitio separados. PA-S004: Design System + Storybook real; una teoría+Portfolio sin workbench ejecutable → `MISSING_SESSION_APP_TARGET`. PA-S039 reutiliza/extiende capacidades previas. Variantes arquitectónicas P1 independientes, no sobrescribirlas.

## Contrato de autoría

`PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY.`

ChatGPT autoró ES y EN aceptados; Codex solo crea/actualiza contenido transformado, anchors internos, layout, SVG, estilos, controles didácticos y pruebas. No inventa conceptos, definiciones, mecanismos, ejemplos, fuentes ni respuestas faltantes. Un archivo dentro de sandbox **no prueba acceso al repo de Codex**. Proporcionar rutas concretas reales de workspace o bytes literales con SHA-256 confirmado y checks de integridad. Validar cobertura atómica y paridad semántica sin reducciones.

`DO NOT CHANGE APPLICATION CODE LOGIC FOR PRESENTATION.`

Una mejora editorial no permite cambiar reglas de negocio, algoritmos, base de datos, autorización, estado ni contratos de runtime. Distinguir cambios de aplicación explícitamente autorizados de ajustes de renderización.

## Responsabilidades

**CODEX-OWNED:** scaffolding mecánico cuando proceda, componentes secundarios, configuración, navegación, estilos, UI, build/CI, herramientas, fixtures, documentación, tests automáticos y publicación fiel.

**LEARNER-OWNED:** decisiones clave, núcleo pedagógico que necesita practicar, revisión de arquitectura, trade-offs, diagnóstico y evidencia de liderazgo. No ocultar el problema principal dentro del scaffolding.

Cada sesión selecciona modo Scaffold, Pair o Build contextual. Scripts `.sh` solamente en scaffold inicial determinista de un repositorio/app/lab/sistema **nuevo desde cero**; cambios existentes se implementan directamente con Codex.

## Protocolo Design→Build→Prove→Think→Publish

**Design:** inspeccionar `git status`, ramas, Technology Radar, `/ui-reference/`, apps previas, rutas, pruebas, dependencias, accesibilidad y decisiones; hacer inventario de preservación. No asumir estado de Git a partir de documentos de Sources.

**Build:** implementar el objetivo ejecutable, conservar productos existentes y publicar teoría completa aprobada ES/EN. Una sola etiqueta `<h1>` visible; sin IDs tipo `engineering.software` impresos; no encabezados visibles «Nivel 1/2/3»; mecanismos y ejemplos sin compresión; casos externos atribuibles. No sustituir contenido por tarjetas/resúmenes.

**Prove:** tests y build reales; comparar bytes/semántica de origen con HTML visible; verificar anclas, todos los conceptos, tema y subtemas, citas, tablas, código, respuestas, validaciones ES/EN; Mermaid `.mmd` fuente + SVG accesible responsive; flashcards cobertura completa con flip, prev/next, counter, keyboard, no-JS, reduced-motion; otras interacciones con X→mecanismo→Y y fallback. Dashboard `/es/` `/en/` basado en datos reales o empty state, tracking reversible/persistido ES/EN-shared y separado L1–L5, navigation/responsive/a11y, Portfolio distinto de `site/`, Storybook ejecutable cuando aplique. Inspeccionar `git diff` y HTML final.

**Think:** explicar trade-offs, qué verificó cada test y qué no; clasificar hallazgos del piloto universal/configurable/session-specific/undecided. No atribuir mastery ni learning gains.

**Publish:** páginas y artefactos, estado real, comandos ejecutados/resultados, cambios, riesgos, pruebas de dispositivo pendientes, URLs solo verificadas y desviaciones. CI verde no certifica calidad pedagógica ni UX física.

## Errores que detienen publicación

`MISSING_CANONICAL_THEORY_PAYLOAD`; `MISSING_ATOMIC_CONCEPT_COVERAGE`; `MISSING_SESSION_APP_TARGET`. Un borrador sin aprobación o versión EN semánticamente incompleta no puede publicarse como canónico.
