# Artefactos y publicación — v10

## Regla de integridad

La fase editorial genera bloques revisados por el usuario, no un build automático. Cuando todos estén aprobados, se consolida exactamente un `.md` canónico ES y un `.md` EN semánticamente equivalente. Si el usuario solicita una muestra entera antes, se etiqueta **borrador, no aprobado**. Codex debe publicar el contenido de ambas fuentes sin abreviar ni reescribir; sus transformaciones son estructurales, no académicas.

## Jerarquía y presentación

Un único H1 visible por idioma; breadcrumb y código de sesión en metadatos; subtítulos naturales. Los IDs semánticos del esquema sirven para citas, anclas, seguimiento e integridad, pero **jamás aparecen ante el lector** como prefijos, códigos con puntos o rótulos de concepto. «Aplicación: ...» es una definición visible válida; «Aplicación (scope.application)» no lo es. No imprimir «Nivel 1 — Fundamento», «Nivel 2 — Mecanismo» ni otras capas. La diferenciación entre L1–L5 queda exclusivamente en progreso/mastery.

## Secciones obligatorias

Síntesis en tres ideas → Objetivo → Preview → Conceptos → Tema principal → todos los Subtemas → Integración si procede → Theory→Practice → Time → Real-World Example → Production-Ready Example → Visual Learning Studio → Exercises → Sources → Resources → Checklist → Success Criteria → Bridge. No vaciar capítulos, colocar «contenido pendiente» ni sustituir mecanismo con listas/cajas. Conceptos locales se enseñan dentro de sus secciones.

## Casos reales y referencias

Cada caso nombrado como real exige una fuente primaria/academic específica cuyo texto apoye el problema, mecanismo, arquitectura y consecuencias descritas. Citar cerca de afirmación. Identificar límites: una publicación no demuestra métricas ni decisiones internas que no menciona. Un white paper general de una práctica no equivale automáticamente a un estudio de caso de una empresa real.

Un ejemplo de producción contiene componentes, estado, invariantes, contratos de entrada/salida/error, código esencial, fallos normales/adversariales, seguridad, idempotencia/concurrencia cuando aplique, pruebas reproducibles o planes honestos, observabilidad, despliegue, migraciones, rollback, decisión y trade-offs. **No calificarlo como verificado si solo se escribió el diseño**. Fuente para comportamiento de tecnologías en documentación oficial correspondiente.

## Site y portfolio separados

`site/` es el sitio público de aprendizaje, con `/es/` y `/en/` dashboards, session/project pages, navegación de fases/proyectos, TOC por página, Light/Dark, responsive phone→tablet→desktop, citas, ejemplos y estudio interactivo. `apps/portfolio/` es el producto profesional con casos y evidencia pública autorizada; no es el repositorio de teoría completa. No crear `apps/book/`.

Los proyectos P1–P6 se implementan según Source 09. Storybook/Design System en PA-S004 es un producto/laboratorio **además** de site y portafolio. Versionar/compatibilizar por consumidores; no borrar variantes arquitectónicas comparables.

## Visual Learning Studio

Para cada sesión de teoría: mapa mental Mermaid fuente enlazado a todos los conceptos del índice, Tema principal y Subtemas, compilado a SVG responsive accesible con `viewBox`, título/desc, alt y lectura sin JS. Flashcards con cobertura completa de mismas secciones; tarjeta = pregunta, respuesta específica, explicación y fuente; navegación anterior/siguiente, flip, contador, touch/teclado y `prefers-reduced-motion`, fallback sin JS. Modos adicionales según contenido, no tabs fijos ni simuladores inertes.

El diagrama de secuencia, tabla de contraste o código que enseña una relación también debe ir junto a su explicación, no exclusivamente en el Studio. La cobertura se verifica en HTML visible además de metadatos. La cantidad de tarjetas depende del inventario real, sin cuota universal.

## Tracking y evidencia

Checkboxes de ejercicios y lista de estudio: habilitados, reversibles, persistidos y con identificadores compartidos ES/EN invisibles. Estado de estudio ≠ dominio ≠ `Completed`. L1 Explain, L2 Implement, L3 Operate, L4 Decide, L5 Lead exigen evidencia distinta y auditada. No publicar porcentajes o métricas inventados: mostrar estado vacío explícito cuando no hay datos.

## Artefactos durables

Por sesión: teoría canónica bilingüe aprobada, páginas publicadas, artefacto de app/lab/arquitectura, ADR/RFC si aplica, fuentes y recursos, diagramas, ejercicios, registro de evaluación y evidencia real separada. No publicar secretos ni evidencia privada de empleadores. Los paths definitivos deben verificarse en Git.

## Publicación y reporte

Verificar `git diff`, tests ejecutados, build, HTML ES/EN, cobertura atómica, accesibilidad relevante, Mermaid→SVG, flashcards, controles de UI, tests de regresión de sesiones anteriores y Storybook cuando corresponda. Reportar salida observada y límites, no afirmar resultados no ejecutados. Registrar diferencias entre texto aprobado y render, y detener si se modifican hechos o desaparecen mecanismos.
