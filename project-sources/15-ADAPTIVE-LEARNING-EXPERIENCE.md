# 15 — Adaptive Learning Experience Contract (v6)

**Estado: ACEPTADO por solicitud del usuario, 2026-10-18.** Este contrato prevalece sobre TODAS las reglas v5 incompatibles en los archivos 00–14, plantillas de Codex y Project Settings. No elimina requisitos académicos, de seguridad, accesibilidad, código, pruebas ni evidencia existentes.

## A. Nuevo disparador de sesiones PA-S001 … PA-S120

Una entrada que sea únicamente `PA-Sxxx` (tres dígitos y sesión válida del roadmap) **solicita inmediatamente un handoff de Codex**, en lugar de la antigua respuesta Study-only. No responder solamente con dos enlaces de teoría; no esperar otro mensaje para crear el prompt. No solicitar que el usuario vuelva a pedir Build. La petición autoriza **preparar el prompt**, no autoriza afirmar que Codex ya ejecutó cambios ni correr Build en este chat.

**Respuesta estándar:** presentar un único prompt completo de Codex, copiable y específico de la sesión, y facilitar los dos archivos canónicos ES/EN como anexos cuando puedan materializarse. El prompt nunca dependerá de un supuesto archivo en el repositorio ni de un enlace `sandbox:` que Codex no pueda abrir. Antes de entregar el prompt, ChatGPT debe **autorizar/autorar efectivamente** la teoría ES/EN completa con la estructura de 04, usando Sources 03/05/06, sin delegarla a Codex; transportar las dos versiones como payload literal dentro del prompt o en archivos cuya ruta concreta y disponibilidad estén comprobadas para el entorno de Codex. No basta con mencionar el nombre del archivo. Para un payload excesivamente largo, se permiten partes numeradas completas y ordenadas, nunca resúmenes; el prompt debe describir la concatenación determinista. Si no es posible transportar el contenido íntegro, declarar `MISSING_CANONICAL_THEORY_PAYLOAD` y no emitir un prompt que prometa publicar la teoría. En un chat ordinario, los documentos canónicos pueden ser adjuntos, pero Codex debe recibirlos de forma verificable (por ejemplo, copiándolos explícitamente al workspace).

La entrega del prompt incorpora la intención explícita del usuario de ejecutar esa sesión mediante Codex. Una sesión nueva inicializa solo lo que realmente falta; una ya existente extiende sin sustituir capacidades valiosas. `.sh` únicamente para scaffold determinista inicial de un repositorio/app/lab/sistema nuevo desde cero. No exigir prueba de finalización de sesiones previas.

## B. Programa pedagógico transversal, sin exigir widgets indiscriminados

TODAS las 120 sesiones deben enseñar primero Concepts/Theory a través de dominios separados: Staff→Principal, Frontend Platform Architecture (FPA), AI Product Engineering (AIPE), omitiendo relleno cuando un dominio no aporta conceptos. Para cada Main Topic/Subtopic: descomponer conceptos atómicos con IDs ES/EN compartidos; definir y enseñar cada uno por separado con fuente, alcance, mecanismo, ejemplo concreto, contraejemplo/trade-off, visual contextual cuando corresponda y recuperación con respuesta ANTES de la integración.

### Reglas base por sesión
- Pretraining contextual cuando un concepto requiere conocimientos nuevos; vocabulario accesible al primer uso.
- Señalización semántica y segmentación de contenido complejo; introducción de exactamente tres puntos en 30 segundos.
- Fundamento → mecanismo → profundización opcional; mantener el contenido crítico accesible sin JS.
- Ejemplos concretos, explicaciones causales, chequeo de comprensión y recuperación con retroalimentación (nunca sustituir teoría por flashcards).
- Práctica espaciada y revisitas **como oportunidades de repaso**, con agenda explícita y estado separado de mastery; no inventar calendario óptimo universal, puntuaciones ni resultados.
- Autoexplicación y reflexión sobre errores cuando están justificadas.

### Selección por objetivo/conocimiento, no por apariencia
| Knowledge type | Métodos y componentes candidatos | Criterio de selección |
|---|---|---|
| Conceptual / distinction | contraste, analogía limitada, misconception check, retrieval | cuando hay ideas próximas fáciles de confundir |
| Structural / dependency | boundary/dependency map, change propagation, conceptual explorer | cuando importan relaciones o alcance del cambio |
| Causal / stateful | predict→reveal, sequence, state visual, causal simulator | existe modelo causal claro; exponer supuestos y casos borde |
| Procedural / algorithm | worked→faded→independent, code walkthrough, self-explanation | hay procedimiento reproducible que practicar |
| Decision / trade-off | decision matrix, interleaving, failure analysis, transfer task | existen alternativas, restricciones y criterios verificables |
| Longitudinal retention | spaced retrieval, revisit queue, confidence calibration | depende de histórico real y tests, no mero tiempo leyendo |

**Prohibido:** insertar todas las técnicas en cada concepto; crear controles inertes, métricas inventadas, simulaciones con causalidad falsa, clasificación visual/auditivo/kinestésica como diagnóstico, promesas de aprendizaje acelerado cuantificadas sin experimento; interpretar Programación Neurolingüística como fundamento validado. Registrar para cada selección: objetivo, técnica, justificación, input/control → mecanismo → salida, datos requeridos, fuente, limitaciones, interacción accesible y fallback sin JS.

## C. Modelo de contenido obligatorio

Cada concepto sustancial expone: `concept-id`, `domain-lane`, `source-section-ids`, `learning-objective`, `knowledge-type`, `prerequisite-concept-ids`, `definition`, `mechanism`, `concrete-example`, `visual-representation` (solo si aplica), `retrieval-question`, `retrieval-answer-and-feedback`, `tradeoffs`, `production-implications`, `pedagogy-techniques[]`, `interaction-specs[]` (solo si justificadas), `review-items[]` y enlaces a fuentes. Identificadores semánticos estables en ES/EN. Cuando no procede una técnica, registrar `not-applicable` con causa, no generar relleno.

La experiencia principal intercala **Explain → Predict (cuando procede) → Manipulate (si modelo válido) → Observe → Explain Again → Retrieve Later** sin alterar el orden canónico de conceptos ni esconder teoría indispensable. Visual Learning Studio sigue siendo complemento: mapa mental Mermaid→SVG y flashcards completas obligatorios; modos adicionales adaptativos, no pestañas fijas.

## D. Límite de autoría / división de responsabilidad

- ChatGPT: contenido académico canónico completo, edición ES/EN, citas, diseño instruccional, especificaciones conceptuales de interacciones, handoff íntegro.
- Codex: inspección del repositorio y `/ui-reference/`, Technology Radar, componentes y publicación, persistencia de tracking, tests y verificación del HTML final; **no escribe, acorta, mezcla ni sustituye teoría**.
- Learner: decisiones relevantes, implementación crítica, revisión de resultados, defensa de trade-offs y evidencia.

**Firewall:** `PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY` y `DO NOT CHANGE APPLICATION CODE LOGIC FOR PRESENTATION`. Si faltan fuentes canónicas → `MISSING_CANONICAL_THEORY_PAYLOAD`. Si falta teoría atómica → `MISSING_ATOMIC_CONCEPT_COVERAGE`. No inventar mastery L1–L5 ni porcentajes. Study-complete != mastered.

## E. Hard gates de Codex / publicación

Todo prompt para PA-Sxxx debe reproducir **textualmente los cinco requisitos de 14** (síntesis 30s, keywords, 3 niveles, causa + ayuda contextual, widgets justificados) y **estas reglas v6**: seleccionar por conocimiento, conectar teoría con práctica/refuerzo, mantener contenido íntegro, evidenciar funcionamiento. Debe llevar metas/alcance, ownership, inputs reales, rutas ES/EN, componentes aplicables, gates de dashboard/tracking/nav/Studio/SVG/accesibilidad y test + reporte.

Build: **Design → Build → Prove → Think → Publish**. Inspeccionar Git, site/ y `/ui-reference/` antes de cambiar. Preservar dashboards ES/EN, navegación por fases, modo claro/oscuro, controles de estudio reversibles y persistidos con IDs compartidos, Visual Learning Studio, SVG responsive, soporte teclado/reduced-motion/no-JS y `apps/portfolio/` separado de `site/`. Inspeccionar el HTML renderizado y paridad de ES/EN. No sustituir sitio enriquecido por un scaffold pequeño.

### Evidencia de aprendizaje
Validar con pruebas de comprensión y transferencia cuando exista evaluación real; registrar tiempo activo y desempeño **solo si medidos**. Distinguir teoría, interacción, estudio, resultados medidos y dominio acreditado. Un widget correcto técnicamente no prueba efectividad pedagógica. Contrastar con una versión convencional mediante evaluación diferida si se quiere afirmar mejora.

## F. Condiciones de aceptación

1. Para cada PA-S001…PA-S120, el sistema produce un handoff específico de Codex, no una respuesta solo-Study, salvo falta demostrable de payload que debe declararse.
2. El prompt contiene teoría ES/EN **íntegra y accesible para Codex**, no una instrucción genérica «escribe teoría».
3. Todos los temas compuestos enseñan componentes atómicos por separado, IDs y jerarquía equivalentes.
4. Existe trazabilidad concepto → objetivo → técnicas justificadas → interacción/alternativa → fuente → recuperación → revisión.
5. Cada widget funciona, enseña relación explícita y tiene alternativa accesible; no se generan widgets porque sí.
6. Mantiene todas las capacidades actuales del site y ejecuta pruebas funcionales, semánticas, i18n, accesibilidad y HTML.
7. Documenta resultados reales, omisiones, incertidumbres y desviaciones; no declara tests no corridos.

## G. Migración y precedencia

Cualquier frase histórica en 00–14 o prompts anteriores que diga «bare PA-Sxxx is Study-only», «do not emit Codex prompt», «two artifacts only», «Build starts only after an additional request» **queda sustituida por A**. Se conserva el requisito de teoría canónica completa (ahora creada ANTES de confeccionar el prompt), la prohibición de que Codex la invente y todos los estándares no contradictorios. El archivo `15-ADAPTIVE-LEARNING-EXPERIENCE.md` debe estar en Project Sources junto a los 00–14 actualizados. Si la propia instrucción de usuario vuelve a cambiar el modo en el futuro, prevalece esa instrucción explícita.
