# Principal Accelerator Learning Path — Sources v13

**Contrato v13 vigente:** Sources 18 (orden y alcance), 19 (HTML incremental), 20 (validación no bloqueante), 21 (entregables), 22 (profundidad) y 17 (Studio 5/3/5) prevalecen sobre cualquier formulación anterior incompatible. No comprimir capítulos ni impedir crear, revisar, editar, traducir o consolidar por estados previos. Las puertas de aprobación/pruebas son exclusivamente de publicación canónica.


**Edición vigente: v13, 16 de noviembre de 2026.** Contratos acumulativos, HTML progresivo, profundidad y validación. Sin cambio de roadmap, apps ni teoría aprobada.


**Edición consolidada:** 31 de octubre de 2026. **Estado:** paquete documental preparado para instalar; no representa cambios en Git, aprendizaje acreditado ni publicación efectuada.

## Propósito y autoridad

Formar al estudiante desde Staff hacia Principal Software Engineering, Frontend Platform Architecture (FPA) y AI Product Engineering (AIPE). Backend, datos, nube, seguridad, arquitectura distribuida y confiabilidad son disciplinas complementarias. El roadmap y la pedagogía son fuentes curriculares; **el repositorio Git real gobierna el código**.

## Orden de precedencia

**Gobernanza de instrucciones:** Settings es exclusivamente un índice de enrutamiento, lectura y precedencia. Los Sources son el contrato canónico acumulativo. Una nueva corrección aceptada se incorpora íntegramente al Source temático correspondiente y al Source 10 (registro de decisiones), con referencias y comprobaciones en los documentos afectados. Conservar todas las reglas no sustituidas expresamente; no recortar instrucciones pedagógicas ni técnicas al editar Settings para satisfacer el límite de caracteres. Añadir una referencia en Settings solo cuando cambie el enrutamiento o se cree un Source. No afirmar que se actualizó Project Settings, Sources o Git sin verificarlo.

1. Correcciones explícitas posteriores del usuario, incorporadas aquí como decisiones vigentes.
2. Sources **18–22** y **17**: contratos de entrega, HTML, validación, entregables, profundidad e interacciones v13. Source **16 — Protocolo editorial**: activación y revisión de bloques, formato visible, verificación humana y estado de aprobación. Source **17 — Visual Learning Studio interactivo**: autoridad específica sobre generación, comportamiento y aceptación de los recursos; se consulta íntegramente en cada solicitud de sesión, capítulo o Studio.
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
- **No imprimir `Nivel 1/2/3` como etiquetas didácticas**. Niveles L1–L5 sí aparecen únicamente como modelo de competencia/evidencia.
- **Aprobación por bloques** y preservación exacta del contenido ya aceptado; traducción EN sin compresión; Codex no reescribe teoría.
- **Aplicación ejecutable y sitio teórico son entregables diferentes**. PA-S004 debe contener Design System + Storybook funcional; PA-S039 lo evoluciona. No imponer números fijos de componentes.
- **Piloto PA-S001–PA-S005:** conservar capacidades antes de extraer plantilla común para PA-S006–PA-S120; contratos universales, representaciones pedagógicas variables.

## Archivos Sources (subir exactamente estos 25 archivos)

`00-README.md`, `01-PROJECT-INSTRUCTIONS.md`, `02-LEARNER-CONTEXT.md`, `03-MASTER-ROADMAP.md`, `04-SESSION-TEMPLATE.md`, `05-LEARNING-METHODOLOGY.md`, `06-TECHNICAL-STANDARDS.md`, `07-PROGRESS.md`, `08-COMPETENCY-MATRIX.md`, `09-PROJECTS-AND-APPS.md`, `10-DECISION-LOG.md`, `11-CODEX-GUIDELINES.md`, `12-ARTIFACT-AND-PUBLISHING-STANDARD.md`, `13-CANONICAL-SESSION-AUDIT.md`, `14-ACCELERATED-LEARNING-UX.md`, `15-ADAPTIVE-LEARNING-EXPERIENCE.md`, `16-EDITORIAL-REVIEW-PROTOCOL.md`.

`17-VISUAL-LEARNING-STUDIO-INTERACTIVE.md` — contrato obligatorio y detallado de los cinco recursos interactivos. Consultar íntegramente antes de cada inventario, capítulo o solicitud de Studio; prevalece para comportamiento y aceptación de Studio. Source 16 conserva el flujo editorial.

`18-SESSION-DELIVERY-CONTRACT.md`, `19-HTML-SESSION-STANDARD.md`, `20-SESSION-VALIDATION-CONTRACT.md`, `21-SESSION-DELIVERABLES-CONTRACT.md`, `22-ACADEMIC-DEPTH-CONTRACT.md`. Referencias adicionales en Sources: `SESSION-SCHEMA.json` y `SESSION-HTML-REFERENCE.html` (fixture, no teoría).

## Auxiliares (NO cargar como Sources duplicados)

- `PROJECT-INSTRUCTIONS-SETTINGS.md`: texto exacto para Project → Settings → Instructions.
- `CODEX-SESSION-MASTER-PROMPT.md`: contrato para preparar un handoff bajo petición explícita, no prompt prellenado.
- `VISUAL-LEARNING-STUDIO-PROMPT.md`: prompt reutilizable para regenerar exclusivamente el Studio de un capítulo o global en HTML.
- `SESSION-APP-TARGETS-120.csv`: mapa planificado de aplicaciones por sesión; consultar Git para confirmar estado real.
- `SESSION-OUTPUTS-120.md`: entregables orientativos por sesión; no evidencia de implementación.
- `PA-S002-INVENTORY-REFERENCE.md`: muestra v11 de la etapa editorial 0, **no teoría final aprobada**.
- `PA-S002-SUBTOPIC-7-STRUCTURE-REFERENCE.md` y `PA-S002-SEMANTIC-HTML-REFERENCE.html`: ejemplos de escritura y marcado semántico **no aprobados ni publicados**.
- `VERIFY-V13.py`, `VALIDATE-SESSION.py`, `TEST-SESSION-INTERACTIONS.cjs` y `CURRENT-VERIFICATION.md`: auditoría estructural y límites; `VERIFY-V11.py` se conserva como histórico para snapshots v11.
- `INSTALL-REPLACE-ALL.md`: reemplazo de la versión previa.

**Precedencia sobre documentos históricos:** se eliminan los disparadores contradictorios de handoff inmediato, las instrucciones de entrega total de teoría sin aprobación y las etiquetas didácticas `Nivel 1/2/3`. El usuario puede pedir explícitamente una muestra completa no aprobada; ello no altera el estado editorial.

## Reglas críticas v13

Tras título/contexto, bare `PA-Sxxx` entrega exclusivamente las secciones 1–6 de Source 18: estructura completa con Subtemas anidados bajo 7, tiempo estimado inmediatamente después, síntesis de tres ideas, objetivo, vista previa y conceptos con definición y ejemplo. Detenerse sin desarrollar capítulos ni Codex. Cada solicitud posterior desarrolla a profundidad solo el bloque pedido, en cualquier orden y sin depender de aprobación previa; crear o actualizar el HTML progresivo según Source 19.

Todos los conceptos globales y locales, incluso en el inventario, se organizan verticalmente por Staff → Principal, FPA y AIPE (indicar cuando no aplique). Cada entrada es `Concepto: definición` y un párrafo independiente `Ejemplo:` propio y contextualizado en software; nunca tabla, grid horizontal, comillas angulares o ID visible. Flashcards individuales, nunca tablas.

**Mínimos obligatorios v13:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional exige los cinco modos integradores de cobertura integral (5/3/5; 10 + 3N como mínimo). Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.

Incluir `Entregables de la sesión` antes del Checklist y listar solo su encabezado en el índice inicial; desarrollar a solicitud. Separar Learning Site ES/EN, app/lab/package/tool o artefacto de diseño/revisión de Source 09, contribución al Portfolio (o N/A justificado), tareas CODEX-OWNED/LEARNER-OWNED y pruebas/evidencia. Para cada entregable: propósito, instrucciones numeradas de qué crear/modificar, comandos verificados si existen, resultado esperado, ruta relativa al monorepo (verificada o propuesta), responsable y criterio de aceptación/verificación. Consultar Git, Sources 03/09 y SESSION-OUTPUTS-120; ninguna página teórica sustituye el objetivo de ingeniería.

Código legible y mantenible en todo el monorepo (apps, Portfolio, Learning Site y paquetes): nombres claros, módulos y tipos; prohibido ofuscar/minimizar código autorado o salida propia; preservar archivos de terceros y no usar bundles minificados como fuente. Usar configuración e ignore Prettier de raíz para JS/TS/JSX/TSX, HTML, CSS/SCSS/Sass (parser/plugin compatible), Markdown, JSON y otros formatos soportados; ejecutar formato y `prettier --check` en CI. Reportar comandos/resultados reales y no alterar semántica, convenciones ni teoría aprobada.

PA-S003, sección 8 (antes punto 13): **Integración entre AI Product Engineering, Staff Software Engineer y Frontend Platform Architect**. Síntesis transversal de conceptos, mecanismos, fronteras, arquitectura y responsabilidades después de enseñar cada área; integración del Portfolio/site corresponde a aplicación posterior, no a esta teoría.

Las muestras v11 son referencias históricas parciales; no satisfacen por sí solas el contrato interactivo v13.
