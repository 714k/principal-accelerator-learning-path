# Protocolo editorial de revisión por bloques — v14 (vigente)

**Contrato v14 vigente:** Sources 23 (generación integral), 18 (orden y alcance), 19 (HTML incremental), 20 (validación no bloqueante), 21 (entregables), 22 (profundidad) y 17 (Studio 5/3/5) prevalecen sobre cualquier formulación anterior incompatible. No comprimir capítulos ni impedir crear, revisar, editar, traducir o consolidar por estados previos. Las puertas de aprobación/pruebas son exclusivamente de publicación canónica.


## Antecedentes y decisiones

El estudiante revisó el piloto PA-S001–PA-S005 y rechazó: dos títulos principales, definiciones y mecanismos abstractos, encabezados visibles de niveles de lectura, glosarios de apertura que sustituyen conceptos locales, casos del propio Accelerator como teoría, ejemplos reales no documentados y production-ready incompletos. Posteriormente corrigió de nuevo la salida de PA-S001 porque se imprimieron códigos como `engineering.software` y se anunciaron conceptos solo por nombre. La solicitud de mostrar toda la sesión en un turno autoriza **una muestra íntegra para evaluación**, no aprobación automática.

Este Source 16 gobierna el **flujo editorial y la visualización** frente a instrucciones históricas contradictorias en 00–15. Los contratos técnicos y de preservación no afectados siguen vigentes. No corregir la misma falla por enésima vez: ejecutar la preflight antes de cada bloque.

## Activación — sesión integral o inventario explícito

Un identificador `PA-Sxxx` sin modificadores activa la sesión integral de Source 23: HTML académico ES con las 19 secciones y Studio 5/3/5, más entregables de ingeniería separados de Source 21. Generar por bloques y continuar sin esperar aprobaciones; si hay límites, guardar un checkpoint y reanudar con «Continúa». Solo «Solo introducción» o «Modo progresivo» limita el inicio a 1–6; una solicitud de bloque modifica exclusivamente ese bloque.

## Autoría y revisión no bloqueantes

A solicitud del estudiante, consolidar lo disponible en ES o traducir EN sin bloquear por estados previos; distinguir borrador de canónico. Codex solo bajo solicitud expresa: permitir handoff de borrador identificado con pendientes; prohibir publicación canónica sin aprobación y payloads ES/EN íntegros, accesibles y equivalentes. Nunca pedir a Codex reautoría ni fingir evidencia. Registrar MISSING_CANONICAL_THEORY_PAYLOAD, MISSING_ATOMIC_CONCEPT_COVERAGE o MISSING_SESSION_APP_TARGET como diagnósticos de publicación, no bloqueos de autoría.

Cada capítulo se desarrolla como unidad profunda según Source 22. En modo integral avanzar automáticamente; en modo progresivo o solicitud local detenerse al terminar el alcance pedido. El estudiante puede pedir cualquiera, corregir aprobado, generar HTML, traducir, consolidar o pedir handoff aun con pendientes. Actualizar solo el bloque pedido y conservar los demás. Una sesión completa explícita es borrador no aprobado; dividir en incrementos si hace falta.

## Formato visible — rechazo inmediato por regresión

- EXACTAMENTE **un H1** en cada idioma; código de sesión en navegación/metadatos, no duplicado.
- Nada de IDs de máquina tipo `engineering.software` en encabezados, listas de conceptos, glosas, tablas o flashcards. Mantener IDs en HTML attributes/frontmatter/manifiesto no visible y en pruebas técnicas, no en el aprendizaje publicado.
- Nada de encabezados «Nivel 1/2/3/4/5 — Fundamento/Mecanismo/Profundización». La secuencia de profundidad es interna; usar «Concepto», «Mecanismo», «Cómo funciona», etc. si mejoran lectura. L1–L5 competencial solo en evidencia.
- Tema principal y cada Subtema definen sus propios conceptos en contexto ANTES de integrarlos. Nada de decir «más adelante aprenderás» cuando se pidió desarrollar un capítulo.
- No abstracto: indicar quién produce qué solicitud, el contrato preciso, dato/estado, dependencia, transformación, respuesta, fallo y una prueba observable. Un «mecanismo» que solo repite el objetivo es incompleto.
- Fuente autoritativa cerca de afirmación; casos de empresa real solo hechos acreditados. Diagramas locales junto a prosa y explicados. No inventar métricas, arquitectura propietaria ni resultados de pruebas.
- Nunca marcadores como `Contenido pendiente`, `[...conceptos no incluidos...]`, preguntas sin respuestas o tarjetas con reversos que tratan otro concepto.

## Estados de aceptación y conservación

La sesión mantiene inventario de bloques y un registro de decisiones del usuario: `PENDIENTE`, `EN REVISIÓN`, `APROBADO`, `CONSOLIDADO ES`, `EN VALIDADO`, `PUBLICADO` (este último solo con build y evidencia). Ante cambios en bloques aprobados, se expone **diff conceptual**, se solicita reconfirmación de lo afectado y se actualiza EN después de corregir ES. No conceder mastery por aprobación editorial ni por casillas de estudio.

## Casos, plataforma y apps

Ejemplo externo: documentación de ingeniería real (Google, Netflix, Cloudflare, etc.), papers o estándar. El caso empresarial documentado explica hechos específicos, no publicidad de empresa. Production-ready es un sistema externo reproducible con API, datos, estados, fallos, seguridad, pruebas, despliegue y observabilidad; **si no se ejecutó, «diseño no verificado»**. El Accelerator solo en Theory→Practice. En handoff posterior separar app/lab del `site/`. PA-S004 debe ser Design System + Storybook funcional; no fijar N componentes ni reemplazar Portfolio. Piloto S001–S005 preservar antes de generalizar.

## Comprobación editorial antes de emitir un bloque

1. ¿Solo se entrega el bloque solicitado o se trata de un borrador integral expresamente pedido?
2. ¿Hay H1 único, encabezados naturales y ninguna cadena de ID de máquina visible?
3. ¿El listado de conceptos contiene inmediatamente definiciones, y su desarrollo local es real, no un glosario?
4. ¿Cada mecanismo identifica entradas, componentes, secuencia, efectos, fallos y verificación cuando corresponden?
5. ¿Hay contrastes, límites, producción, respuesta de recuperación y fuentes junto a afirmaciones?
6. ¿Los casos reales están documentalmente sustentados y distinguen inferencia de hecho?
7. ¿Se conserva todo texto aprobado y la nueva corrección, sin nuevas regresiones?
8. ¿Se evita usar nuestro proyecto como ejemplo de teoría?
9. ¿El destino de app y la publicación se mantienen separados?
10. ¿Está claro qué está propuesto, qué se aprobó y qué se comprobó?

Sin superar esta preflight, no presentar el bloque como completo.

## v11 — Autoridad editorial específica del Learning Site (prevalece sobre v10)

Esta sección incorpora el feedback de 14 de noviembre de 2026 sobre la **única sesión inspeccionada: PA-S002**. Sus reglas se aplican a nuevos contenidos de todas las sesiones, pero **no reescriben silenciosamente bloques aprobados**. Para migrar PA-S002 u otra teoría existente, primero presentar diferencias, solicitar revisión y conservar el contenido validado. La URL de GitHub Pages proporcionada fue inaccesible desde la herramienta web en esta auditoría; sí se leyó la fuente canónica ES y el renderizador PA-S002 del repositorio GitHub conectado. No afirmar inspección visual del HTML publicado.

### Identidad y navegación

- Presentar solo **una** leyenda de contexto con nombre completo: `Fase 0 · PA-S002` en esta sesión y `Fase N · PA-Sxxx` para las demás; no imprimir `F0 · PA-S002` en otra parte. Breadcrumb legible sin duplicar la leyenda. Un único H1 humano.
- Enlaces internos son `href="#id"` con IDs semánticos estables, únicos y existentes; etiquetas de ancla describen la sección, nunca códigos de máquina. Comprobar `#subtopic-7` en PA-S002. Links externos HTTPS reales, rótulos de título legibles y prefijo de despliegue correcto en rutas internas.

### Conceptos y vista previa

- Vista previa **vertical**: grupos separados, cada uno con encabezado para `Staff → Principal`, `Arquitectura de Plataforma Frontend` y `Ingeniería de Producto con IA` si es aplicable. Sin grid de tres columnas ni carrusel para el recorrido.
- **Todos** los conceptos aparecen `Término: definición clara` y un ejemplo directamente asociado en su misma entrada o inmediatamente después. No utilizar `«Monorepo: ...»`, `«Polyrepo: ...»` ni otros envoltorios angulares. Los conceptos no tienen IDs técnicos visibles.
- Cada Tema principal incluye encabezado `Conceptos del tema principal`. Cada Subtema N incluye `Conceptos del subtema N`, en ES; títulos equivalentes en EN. No ocultar definiciones únicamente en la sección de conceptos general.

### Cobertura obligatoria por capítulo (Tema principal y CADA Subtema)

1. Título natural con ancla, sin H1 nuevo.
2. **Síntesis en 30 segundos** del bloque con tres ideas **diferentes a la síntesis general**.
3. Objetivo claro y conceptos locales con `Término: definición` + **ejemplo propio** de cada concepto.
4. Teoría sustantiva con componentes, contrato, datos, estados, flujo, fallos, límites, decisiones y verificación cuando corresponda.
5. **Diagrama técnico propio al lado del mecanismo**, Mermaid fuente→SVG responsive accesible, título/pie y explicación; un diagrama por Tema principal/Subtema como mínimo. No valen diagrams solamente al final.
6. Ejemplo concreto trabajado; ejercicios del capítulo con resolución/feedback; tarjetas locales con respuesta explicativa y fuente cuando haga falta.
7. **Visual Learning Studio local**: mínimo 5 recursos interactivos en el Tema principal y 3 en cada Subtema según contrato v14 de abajo; conservar Studio integral de sesión y fallback accesible adicional.
8. Recursos específicos del capítulo con links funcionales y razón de consulta; `Comprueba lo aprendido` con preguntas y respuestas del mismo bloque.

No multiplicar controles vacíos ni usar una cuota fija de tarjetas. Si una sección requiere cambios a texto previamente aceptado, registrar diff conceptual y registrar nueva revisión; solicitar aprobación solo para promoción canónica. La autorización de una sesión íntegra sigue dando un **borrador no aprobado** salvo aceptación expresa.

### Marcado semántico del HTML publicado

- `main` → `article` → `section` por capítulo/subsección cuando sea una región identificable; un `h1` y encabezados progresivos.
- Párrafos reales `p`; pasos con `ol > li`, conjuntos sin orden `ul > li`; no representar listas con varios párrafos/`br`.
- Conceptos con `dl > dt` (término) + `dd` (definición y ejemplo) o estructura equivalente justificada con etiquetas nativas; visual `Término: definición` sin comillas angulares, incluso con lector de pantalla.
- Enfatizar con `strong`; matizar con `em`; usar `span` para texto inline solo cuando corresponda; `figure/figcaption` para diagramas, `pre/code` para código, `table` con encabezados para datos tabulares, `fieldset/legend` para grupos de preguntas/controles. `div` solo si necesita layout y no reemplaza una etiqueta semántica.
- No inventar `href` o enlaces; para diagramas y controles, texto alternativo, captions, teclado, touch, reduced-motion y fallback sin JS.

### Revisión previa a salida/publicación

- Revisar **la estructura del capítulo solicitado**, sin avanzar a otros bloques. Responder las 10 comprobaciones previas del Source 16 + las nuevas comprobaciones de semántica, diagramas locales y recursos.
- Validación del Markdown/AST → HTML final: H1 único, rótulo de fase único, contenido local íntegro, marcado semántico y anchors resolubles en ES/EN. Un chequeo por regex no reemplaza inspección DOM ni dispositivo.
- Fallo de cobertura local → `MISSING_LOCAL_CHAPTER_COVERAGE`; HTML inválido → `INVALID_SEMANTIC_MARKUP`; ancla rota → `BROKEN_ANCHOR`; rótulo repetido → `DUPLICATE_SESSION_CONTEXT`.

**PA-S002 no fue modificado en Git:** el paquete v11 solo cambia reglas y añade referencia del subtema 7 para revisión. La evidencia de implementación, build, a11y y renderizado deberá recopilarse cuando se use Codex.

## v14 — Prioridad editorial: obligatorio para todas las sesiones

Un identificador `PA-Sxxx` sin modificadores activa la sesión integral de Source 23: HTML académico ES con las 19 secciones y Studio 5/3/5, más entregables de ingeniería separados de Source 21. Generar por bloques y continuar sin esperar aprobaciones; si hay límites, guardar un checkpoint y reanudar con «Continúa». Solo «Solo introducción» o «Modo progresivo» limita el inicio a 1–6; una solicitud de bloque modifica exclusivamente ese bloque.

Todos los conceptos globales y locales, incluso en el inventario, se organizan verticalmente por Staff → Principal, FPA y AIPE (indicar cuando no aplique). Cada entrada es `Concepto: definición` y un párrafo independiente `Ejemplo:` propio y contextualizado en software; nunca tabla, grid horizontal, comillas angulares o ID visible. Flashcards individuales, nunca tablas.

**Mínimos obligatorios v14:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional exige los cinco modos integradores de cobertura integral (5/3/5; 10 + 3N como mínimo). Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.

Source 17 (`17-VISUAL-LEARNING-STUDIO-INTERACTIVE.md`) especifica los cinco comportamientos obligatorios y sus pruebas de aceptación. Consultarlo íntegramente antes de cualquier inventario, capítulo o Studio. Cada recurso se entrega en el HTML funcional y más tarde en el Learning Site; incluir controles funcionales, datos específicos del tema e instrucciones breves, reacción visible y explicación. Si la vista previa limita JavaScript, ofrecer el HTML para abrir en navegador y declarar qué pruebas faltan. No presentar el bloque como completo antes de comprobar cobertura/funcionalidad. Si se solicita solo Studio, regenerar exclusivamente ese Studio, conservar texto aprobado y no avanzar a Codex.

Incluir `Entregables de la sesión` antes del Checklist como explicación académica; en modo integral producir el plano B separado (Source 21). En modo introducción, listar solo su encabezado en el índice. Separar Learning Site ES/EN, app/lab/package/tool o artefacto de diseño/revisión de Source 09, contribución al Portfolio (o N/A justificado), tareas CODEX-OWNED/LEARNER-OWNED y pruebas/evidencia. Para cada entregable: propósito, instrucciones numeradas de qué crear/modificar, comandos verificados si existen, resultado esperado, ruta relativa al monorepo (verificada o propuesta), responsable y criterio de aceptación/verificación. Consultar Git, Sources 03/09 y SESSION-OUTPUTS-120; ninguna página teórica sustituye el objetivo de ingeniería.

PA-S003, sección 8 (antes punto 13): **Integración entre AI Product Engineering, Staff Software Engineer y Frontend Platform Architect**. Síntesis transversal de conceptos, mecanismos, fronteras, arquitectura y responsabilidades después de enseñar cada área; integración del Portfolio/site corresponde a aplicación posterior, no a esta teoría.

Preservar capítulos aprobados; cambios de contenido requieren revisión explícita. Los mínimos Studio no sustituyen la teoría, ejemplos, ejercicios, fuentes ni diagramas propios. Source 13 es la lista de comprobación y Source 06 rige código/Prettier.
