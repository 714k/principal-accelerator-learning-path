# Prompt maestro de Codex para CUALQUIER PA-Sxxx — Build explícito (v5 + aprendizaje acelerado)

> **Uso:** Sustituye los placeholders `{...}` antes de ejecutar. Este prompt es un **template de Build**, no parte de una sesión invocada solo con `PA-Sxxx`. Debe emitirse con los cinco hard gates *inline* y adjuntar el texto completo ES/EN o las rutas reales y ya existentes; no permite que Codex escriba la teoría.

## Entrada y autorización
- Sesión: `{PA-Sxxx}`; título oficial: `{título}`; alcance Build aprobado por el learner: `{alcance concreto}`.
- Estado de repositorio/implementation: `{contexto confirmado tras inspección}`; proyectos/apps/labs objetivos: `{rutas autorizadas}`.
- **Contenido canónico ES:** `{RUTA_REAL_EXACTA_PA-Sxxx-theory-es.md_O_PAYLOAD_COMPLETO}`.
- **Contenido canónico EN:** `{RUTA_REAL_EXACTA_PA-Sxxx-theory-en.md_O_PAYLOAD_COMPLETO}`.
- Si una ruta no existe y no se proporciona el payload exacto: **`MISSING_CANONICAL_THEORY_PAYLOAD` y STOP**, no reconstruir desde Sources/roadmap.
- Si faltan conceptos atómicos requeridos o alguno aparece solo en síntesis: **`MISSING_ATOMIC_CONCEPT_COVERAGE` y STOP**; pedir actualización a ChatGPT.
- `PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY`.
- `DO NOT CHANGE APPLICATION CODE LOGIC FOR PRESENTATION`.

## Preserva lo existente
Inventaria Git/`site/`/apps/tests/current UI/`/ui-reference/`/Technology Radar y ADRs antes de editar. Conserva dashboard bilingüe real, global navigation, checkboxes estudio habilitados/persistidos con IDs ES/EN, Studio adaptativo (Mermaid→SVG y flashcards completas), responsive Light/Dark y accesibilidad. Nunca reintroduzcas `apps/book/` como arquitectura actual; `apps/portfolio/` es producto separado. `.sh` únicamente para scaffolding nuevo desde cero; si ya hay repo, Codex crea directamente todos los deliverables.

## HARD GATES — aprendizaje acelerado: INLINE EN ESTE PROMPT
1. **SÍNTESIS EN 30 SEGUNDOS / 30-SECOND SYNTHESIS**: exactamente 3 conclusiones clave, después del título/metadatos de cada teoría ES/EN, antes de Objective. Es introducción y nunca sustituye el desarrollo de teoría/conceptos/subtemas.
2. **KEYWORD SIGNALING**: la idea principal aparece temprano; enfatizar selectivamente con negrita sus primeras palabras relevantes en párrafos principales, no todas las frases. Evitar filler, paredes de texto y bullet-only/card-soup.
3. **THREE-LAYER READING**: cada concepto sustancial presenta Nivel 1 Fundamento (definición+ejemplo), Nivel 2 Mecanismo (elementos+pasos causales+visual próxima+retrieval+respuesta), Nivel 3 Profundización (casos borde, código, matemática y/o operaciones cuando justificados). Publicar Nivel 3 con acordeón accesible y contenido completo disponible sin JavaScript. L1/L2 siempre visibles. Ningún dato, fuente, diagrama o conclusión canónica se comprime.
4. **CAUSAL CHUNKS + CONTEXT HELP**: para mecanismos verdaderos mostrar 📥 ENTRADA / CAUSA → ⚙️ PROCESO / MECANISMO → 📤 SALIDA / RESULTADO → 💡 INSIGHT / REGLA DE ORO cuando aporte causalidad. Las anotaciones `[Término Complejo:: Definición corta de hasta 10 palabras]` se transforman en tooltip con hover, foco, teclado y touch, fallback visible accesible. No parsear código ni URLs.
5. **CONTEXTUAL INTERACTIVE RECOMMENDATIONS**: conservar `[Componente Interactivo Recomendado: Slider / Toggle / Simulador para ajustar X y ver Y]` cuando existe relación X→Y demostrable en el contenido. No generar métricas/evidencia falsas, ni controles de apariencia interactiva sin función. Construir widget solo si el Build explícitamente lo permite y el modelo está fundado; si no, renderizar una alternativa estática fiel y una etiqueta de sugerencia.

## Separación por dominios y conceptos
Renderiza primero Staff→Principal Software Engineering, Frontend Platform Architecture (FPA), AI Product Engineering (AIPE) como carriles reconocibles. Dentro de cada uno, enseñar cada concepto atómico propio antes de integrar los temas compuestos; síntesis entre dominios solo después y etiquetada. Preserva IDs, fuentes, definiciones, ejemplos, mecanismos, comparaciones y respuestas de recuperación de los archivos fuente. Ejemplo de validación: aplicación, sistema, plataforma y ecosistema requieren cuatro conceptos separados y luego una comparación; una tabla-resumen sola es incumplimiento.

## Code-logic firewall + límites del formatter
No alterar por estas reglas algoritmos, reglas de negocio, estados de dominio, contratos de API, tipos usados en runtime, autorización, persistencia o pruebas existentes. El alcance Build `{alcance concreto}` puede requerir cambios de código explícitos distintos a presentación; sepáralos en el reporte y no los justifiques por “UX cognitivo”. Modificaciones permitidas para el formato: schema/markup del artículo, renderer, estilos accesibles, transformaciones de anotaciones, interacciones educativas aprobadas y tests de UI/contenido. Inspeccionar `git diff`, tests de regresión y HTML generado ES/EN; no confundir checks heurísticos con validación del rigor.

## Pruebas y reporte
Validar: 3 ideas de síntesis en ambos idiomas y antes de Objective; niveles reconocibles sin ocultar contenido; tooltip accesible con foco/touch/no-JS; acordeón funcional y legible sin JS; definiciones atómicas correctas y ES/EN alineadas; diagramas/tabla próximos a texto; widgets X→Y realmente fundamentados; dashboard/tracking/Studio sin regresiones; cambios de código solo dentro del Build autorizado. Reportar las rutas/payload realmente utilizados, archivos cambiados, diferencias en comportamiento, tests ejecutados y resultados reales, inspección de HTML, límites y desviaciones. Ante falta de teoría, STOP y no inventar.

## HARD GATES DEL LEARNING SITE — también inline, no solo por referencia
- **Dashboard ES/EN real desde PA-S001:** `/es/` y `/en/` presentan avance de sesiones, seguimiento de estudio, evidencia de dominio aparte, artifacts/revisits/proyectos/actividad real o estados vacíos honestos. Un hero + dos enlaces no cumple. No inventar porcentajes ni métricas.
- **Tracking accesible:** Exercises y Knowledge Mastery Checklist mantienen IDs estables ES/EN, checkbox habilitado, reversible y persistido; checked **NO** equivale a mastery L1–L5 ni `Completed`.
- **Navegación:** nav global agrupado por fases/sesiones/proyectos/sistemas en desktop, TOC abajo o sobre el artículo, phone → tablet → desktop, sin overflow horizontal de página.
- **Autoría y contenido:** contenido canónico intacto, tres dominios enseñados por separado, conceptos atómicos antes de síntesis, definición/fundamento/mecanismo/ejemplos/fallos/trade-offs/consecuencias, referencias cerca de las afirmaciones y acrónimos expandidos al primer uso de cada página. El renderer no puede comprimir la teoría en listas, cajas ni placeholders.
- **Visual Learning Studio adaptativo:** Mermaid mind map cubre TODOS los Conceptos/Main Topic/Subtopics; flashcards cubren idéntico conjunto, con pregunta frontal, respuesta+explicación posterior, fuente, flip, teclado, prev/next, contador, reduced-motion y fallback sin JS. Otros modos solo basados en conceptos reales de la sesión. IDs/cobertura ES/EN equivalentes.
- **Mermaid→SVG:** conservar `.mmd` fuente, compilar SVG con `viewBox`, ancho ajustado a contenedor, altura proporcional, accesibilidad, sin require pan/zoom, sin raw Mermaid en UI.
- **Accesibilidad/UI:** inspeccionar `/ui-reference/`; patrones Light/Dark responsive y semánticos, diseño móvil primero; no decoraciones multicolor arbitrarias ni información codificada solo mediante color. Usar tecnología aprobada por Technology Radar y preservar funcionalidades ya existentes.
- **Pruebas:** ejecutar checks reales, validar ES/EN, inspect rendered HTML y chequear que dashboard, tracking, Studio, diagrams, acordeón nivel 3 y tooltips funcionan; comparar cada texto publicado con los `.md` canónicos, incluyendo pantalla con JS desactivado. Si falla, no declarar publicación terminada.
