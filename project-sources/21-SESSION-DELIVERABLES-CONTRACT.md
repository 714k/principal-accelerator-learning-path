# Source 21 — Entregables y trabajo fuera del Learning Site (v14)

## Separación de planos

HTML de estudio contiene explicación e instrucciones; no implementa el producto de ingeniería. Cada sesión resuelve por 03/09/SESSION-OUTPUTS-120/Git el destino principal ejecutable o artefacto durable de arquitectura y modalidad INITIALIZE/EXTEND/COMPARE/REVIEW/DESIGN, además de site bilingüe. Portfolio tiene contribución profesional o N/A justificado. No crear nueva app/ADR/RFC en cada sesión por cuota; determinar según objetivo. No omitir app requerida. PA-S004 Design System + Storybook runnable, PA-S039 evolución; conservar piloto PA-S001–S005; todos en monorepo según Git. `apps/book/` obsoleto.

## Sección 16 del documento

Desarrollar en modo integral automáticamente o cuando se solicite el bloque, independientemente de si otras secciones aprobaron. Separar explícitamente:

- **Material académico (ChatGPT):** HTML de estudio ES y EN solicitado, teoría Markdown canónica aprobada, diagramas fuente y SVG, datos/escenarios y respuestas de interactivos, fuentes y ejercicios; no reautoría por Codex.
- **Learning Site (Codex):** páginas ES/EN, navegación y contenido fiel, interactivos 5/3/5, tracking y pruebas de integración, proyecto cuando aplica.
- **Producto/lab/package/revisión (Victor + Codex):** solución prevista por 09, código, contratos, configuraciones, pruebas y demostración ejecutable si corresponde. Modo de trabajo y dependencias reales.
- **Portfolio (Victor + Codex):** caso, evidencia/ADR, diagrama u otro resultado público autorizado; no publicar información privada ni duplicar teoría; N/A justificado cuando no aporta.
- **Victor / LEARNER-OWNED:** qué investigar, diseñar, decidir, documentar, implementar como práctica nuclear, comparar, revisar y validar, con criterios concretos; no delegar razonamiento a Codex.
- **Codex / CODEX-OWNED:** tareas mecánicas, scaffold nuevo cuando corresponda, configuración, integración, automatización, estilo y pruebas, preservación de código y Prettier.
- **Evidencia:** resultados reales de comandos, fixtures, experimentos, mediciones y decisiones, no inventar. Distinguir propuestas, evidencia pendiente y observada; estudio no equivale a mastery.

## Plano B — documento independiente de ingeniería

En modo integral entregar `PA-Sxxx-DELIVERABLES.md` separado del HTML. Mantener los apartados B.1–B.11 identificados, con fichas operativas concretas según pertinencia:

| Apartado | Contenido |
| --- | --- |
| B.1 Aplicación o laboratorio | Objetivo, modo, arquitectura, capacidades, código y demostración prevista. |
| B.2 Implementación del Learning Site | Integrar fielmente contenido ES/EN aprobado, navegación, Studio y tracking. |
| B.3 Portfolio profesional | Caso, contribución, decisiones y evidencia publicable autorizada. |
| B.4 Documentación técnica | Contratos, especificaciones y diagramas. |
| B.5 Decisiones arquitectónicas | ADR/RFC y alternativas cuando aporten valor. |
| B.6 Entregables de Victor | Razonamiento, decisiones, práctica y evidencia propios. |
| B.7 Entregables de Codex | Implementación mecánica y verificaciones delegables. |
| B.8 Prompts para Codex | Objetivos, alcance, restricciones y aceptación; preparar `PA-Sxxx-CODEX-PROMPT.md` como borrador separado, no ejecutar ni publicar por defecto. Handoff operativo solo a solicitud expresa con las condiciones de Sources 11–13. |
| B.9 Estrategia de pruebas | Pruebas y criterios reproducibles. |
| B.10 Evidencias y resultados | Evidencia observada o pendiente, nunca inventada. |
| B.11 Auditoría y validación | `PA-Sxxx-AUDIT.md` separado con resultados reales y limitaciones. |

Cada apartado no pertinente se identifica N/A con justificación. El documento define el trabajo; no equivale a construir las aplicaciones, modificar Git, aprobar teoría o publicar el site/Portfolio. No incluir estos artefactos completos en el HTML. El prompt borrador puede contener insumos pendientes identificados; no presentarlo como handoff canónico listo.

## Ficha por entregable

Nombre, propósito, descripción, conocimientos aplicados, instrucciones numeradas precisas (incluidas herramientas/insumos y comandos verificados si existen), recursos (origen y responsable), archivos que crear/modificar, ruta relativa a monorepo verificada o explícitamente propuesta, resultado esperado, responsable, criterios de aceptación y evidencia/validación reproducible. En lista o tabla cuando facilite trabajo, nunca tabla de conceptos o flashcards. Source 06 gobierna legibilidad/Prettier. Sin permiso o Git inaccesible: desarrollar el plan con rutas propuestas y verificaciones pendientes, no bloquear sesión ni fingir implementación. En el HTML explicar los entregables; las fichas operativas completas pertenecen al plano B separado. En modo introductorio solo su nombre en el índice.
