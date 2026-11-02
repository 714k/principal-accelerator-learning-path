# Principal Accelerator Learning Path — Sources v10

**Edición consolidada:** 31 de octubre de 2026. **Estado:** paquete documental preparado para instalar; no representa cambios en Git, aprendizaje acreditado ni publicación efectuada.

## Propósito y autoridad

Formar al estudiante desde Staff hacia Principal Software Engineering, Frontend Platform Architecture (FPA) y AI Product Engineering (AIPE). Backend, datos, nube, seguridad, arquitectura distribuida y confiabilidad son disciplinas complementarias. El roadmap y la pedagogía son fuentes curriculares; **el repositorio Git real gobierna el código**.

## Orden de precedencia

1. Correcciones explícitas posteriores del usuario, incorporadas aquí como decisiones vigentes.
2. Source **16 — Protocolo editorial**: activación y revisión de bloques, formato visible, verificación humana y estado de aprobación.
3. Source **15 — Aprendizaje adaptativo** y **14 — Experiencia de estudio**: técnicas justificadas por tipo de conocimiento, sin rótulos de niveles de lectura visibles.
4. Sources **03** y **09**: temario y destino de app/lab/sistema de PA-S001–PA-S120.
5. Sources **01**, **04**, **05**, **06**, **10**, **11**, **12** y **13**: ejecución, calidad, decisiones, Codex y aceptación.
6. Sources **02**, **07** y **08**: contexto, progreso no bloqueante y competencias.

**Activación editorial:** `PA-Sxxx` por sí solo abre el inventario verificable de esa sesión. El usuario puede solicitar expresamente una sección, su revisión, una muestra íntegra no aprobada, la consolidación ES, EN o el handoff de Codex. Nunca inferir aprobación ni finalización. No pedir al usuario que reexplique contexto documentado.

## Contratos principales

- **Un solo H1** legible por documento ES/EN; sesión/fase en metadatos y breadcrumb.
- **Nunca imprimir IDs de implementación** como `engineering.software`, `scope.application`, claves de tracking o códigos `Sxxx-Cnn` en prosa, encabezados, tablas académicas, flashcards o listas de conceptos. Conservarlos únicamente en metadatos y anchors técnicos no visibles.
- **Inventario inicial: nombre del concepto + definición breve comprensible** en cada lugar donde se necesitará, no una lista críptica de nombres y referencias. Conceptos desarrollados localmente en cada tema/subtema.
- **Capítulos completos**: definiciones → mecanismo concreto con actores, datos, estados y contratos → consecuencias → fallos/alternativas → comprobación → recuperación con respuesta explicativa; no eslóganes ni párrafos vacíos.
- **Ejemplos externos** para la enseñanza: documentos oficiales de empresas reales (Netflix, Google, Stripe, Cloudflare, etc.) o investigaciones verificadas, atribuyendo solo lo demostrado. Nuestro Accelerator se utiliza como transferencia práctica, nunca como autoridad académica.
- **Ejemplo production-ready**: sistema de referencia externo reproducible; llamarlo *diseño no verificado* mientras no existan código, pruebas y ejecución acreditada.
- **No imprimir «Nivel 1/2/3» como etiquetas didácticas**. Niveles L1–L5 sí aparecen únicamente como modelo de competencia/evidencia.
- **Aprobación por bloques** y preservación exacta del contenido ya aceptado; traducción EN sin compresión; Codex no reescribe teoría.
- **Aplicación ejecutable y sitio teórico son entregables diferentes**. PA-S004 debe contener Design System + Storybook funcional; PA-S039 lo evoluciona. No imponer números fijos de componentes.
- **Piloto PA-S001–PA-S005:** conservar capacidades antes de extraer plantilla común para PA-S006–PA-S120; contratos universales, representaciones pedagógicas variables.

## Archivos Sources (subir exactamente estos 17)

`00-README.md`, `01-PROJECT-INSTRUCTIONS.md`, `02-LEARNER-CONTEXT.md`, `03-MASTER-ROADMAP.md`, `04-SESSION-TEMPLATE.md`, `05-LEARNING-METHODOLOGY.md`, `06-TECHNICAL-STANDARDS.md`, `07-PROGRESS.md`, `08-COMPETENCY-MATRIX.md`, `09-PROJECTS-AND-APPS.md`, `10-DECISION-LOG.md`, `11-CODEX-GUIDELINES.md`, `12-ARTIFACT-AND-PUBLISHING-STANDARD.md`, `13-CANONICAL-SESSION-AUDIT.md`, `14-ACCELERATED-LEARNING-UX.md`, `15-ADAPTIVE-LEARNING-EXPERIENCE.md`, `16-EDITORIAL-REVIEW-PROTOCOL.md`.

## Auxiliares (NO cargar como Sources duplicados)

- `PROJECT-INSTRUCTIONS-SETTINGS.md`: texto exacto para Project → Settings → Instructions.
- `CODEX-SESSION-MASTER-PROMPT.md`: contrato para preparar un handoff bajo petición explícita, no prompt prellenado.
- `SESSION-APP-TARGETS-120.csv`: mapa planificado de aplicaciones por sesión; consultar Git para confirmar estado real.
- `SESSION-OUTPUTS-120.md`: entregables orientativos por sesión; no evidencia de implementación.
- `EXAMPLE-PA-S001-INVENTORY.md`: muestra de la etapa editorial 0, **no teoría final aprobada**.
- `PA-S001-QUALITY-REFERENCE.md`: ejemplo de redacción y control de calidad; **no sustituye la teoría íntegra**.
- `VERIFY-V10.py` y `CURRENT-VERIFICATION.md`: auditoría estructural y límites.
- `INSTALL-REPLACE-ALL.md`: reemplazo de la versión previa.

**Precedencia sobre documentos históricos:** se eliminan los disparadores contradictorios de handoff inmediato, las instrucciones de entrega total de teoría sin aprobación y las etiquetas didácticas «Nivel 1/2/3». El usuario puede pedir explícitamente una muestra completa no aprobada; ello no altera el estado editorial.
