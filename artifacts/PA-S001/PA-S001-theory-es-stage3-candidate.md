# PA-S001 — Fundamentos de ingeniería, arquitectura de plataforma frontend e ingeniería de producto con IA

**Fase:** F0 — Plataforma Accelerator. **Carriles:** Staff→Principal, Frontend Platform Architecture (FPA), AI Product Engineering (AIPE). **Prerrequisito:** lectura básica de componentes, rutas e interfaces de programación; ninguno de los anteriores exige acreditar otra sesión. **Sistema longitudinal:** P0, portafolio profesional en `apps/portfolio/` y sitio de aprendizaje separado en `site/`. **Artefacto previsto, aún no producido:** primer corte ejecutable y capítulo bilingüe. **Tiempo orientativo de estudio y práctica:** 3 h 20 min–5 h 10 min; estimación, no medición.

> **SÍNTESIS EN 30 SEGUNDOS**
> 1. La ingeniería de software abarca el ciclo de vida; la arquitectura describe decisiones estructurales que condicionan cambios y atributos de calidad.
> 2. Una aplicación entrega un caso de uso, un sistema coordina elementos, una plataforma ofrece capacidades reutilizables y un ecosistema incluye actores y relaciones externas.
> 3. En P0, los límites entre portafolio, sitio de aprendizaje y posibles funciones de IA deben justificarse con pruebas y restricciones, no con títulos de puesto ni casillas marcadas.

## Objetivo

Explicar y distinguir los conceptos de alcance, identificar una frontera y sus dependencias, razonar sobre un atributo de calidad bajo una restricción, y defender un primer límite para P0. La evidencia futura debe mostrar decisiones, funcionamiento y resultados comprobados; leer esta teoría no acredita dominio.

## Vista previa del aprendizaje

Primero estudiarás ingeniería, arquitectura, cuatro escalas de alcance, calidad, restricciones, frontera, acoplamiento y cohesión en el carril Staff→Principal. Después estudiarás la plataforma frontend y, de manera independiente, el producto con inteligencia artificial. La pregunta conductora es: **¿qué responsabilidades conviene reunir y cuáles conviene separar cuando arrancan varios productos?** El ejercicio de aplicación analiza `apps/portfolio/`, `site/` y una hipotética función de resumen asistido, sin presumir que esta última exista. “Contrato” significa aquí una expectativa observable entre componentes: por ejemplo, formato de entrada, salida y errores.

## Conceptos

### Carril Staff → Principal: fundamentos de ingeniería y alcance

#### `engineering.software` — Ingeniería de software

**Nivel 1 — Fundamento.** Es la disciplina de especificar, diseñar, construir, verificar, operar y mantener software con métodos justificables; este alcance sintetiza las áreas de conocimiento de SWEBOK [R1]. Ejemplo: al añadir una ruta `/es/projects/`, implementar el HTML es una parte; revisar requisitos, accesibilidad, pruebas y evolución también es trabajo de ingeniería. Una lista de tecnologías, por sí sola, no define el ciclo de vida.

**Nivel 2 — Mecanismo.** **Entrada:** necesidad de navegar proyectos

**Proceso:** convertirla en contrato de ruta, implementación y comprobaciones

**Resultado:** una página cuyo enlace y comportamiento pueden verificarse

**Regla contextual:** cerrar el ciclo incluye observar fallos tras el cambio. Representación: `necesidad → contrato → implementación → prueba → operación`.

**Recuperación:** ¿un componente que compila prueba que la necesidad se cumplió? **Respuesta:** no; hace falta contrastarlo con el requisito y su comportamiento.

**Nivel 3 — Profundización (opcional).** Más comprobaciones tienen coste; selecciona las que cubran riesgos reales. Un test de ruta no confirma que una persona pueda operar la navegación por teclado. Tipo: procedimental; objetivo: trazar cambio a verificación; técnica: recorrido resuelto y posterior práctica independiente; fuente [R1]; revisión: explicar de nuevo después de construir P0. Interacción: no aplica, porque una secuencia textual y una prueba real bastan.

#### `engineering.architecture` — Arquitectura de software

**Nivel 1 — Fundamento.** Es el razonamiento sobre elementos, relaciones y principios estructurales de un sistema; una *descripción arquitectónica* documenta ese razonamiento y sus preocupaciones, pero no es la estructura ejecutada [R2]. Ejemplo: separar `apps/portfolio/` de `site/` evita que una decisión de navegación editorial determine automáticamente la navegación profesional. Un diagrama sin correspondencia con dependencias reales es descripción incorrecta, no arquitectura comprobada.

**Nivel 2 — Mecanismo.** Una decisión asigna responsabilidades y contratos; esos límites determinan dónde se propaga un cambio. Representación: `site/content → renderer → HTML`, mientras `apps/portfolio → portfolio UI`; una importación directa entre ambos rompe la separación propuesta.

**Recuperación:** si el sitio y la app viven en el mismo repositorio, ¿son el mismo producto? **Respuesta:** no; ubicación Git y responsabilidad arquitectónica son dimensiones distintas.

**Nivel 3 — Profundización (opcional).** Documenta contexto, alternativas, consecuencia y forma de validar una decisión; no deduzcas calidad solo por tener carpetas distintas. Tipo: estructural y decisional; objetivo: relacionar límites con propagación; técnica: mapa de dependencias y contraejemplo; fuentes [R1, R2]; revisión: comprobar imports y rutas tras P0. Interacción sugerida: selector de una dependencia, que resalte consumidores alcanzables *solo si* se deriva del grafo real; alternativa sin JavaScript: mapa estático.

#### `scope.application` — Aplicación

**Nivel 1 — Fundamento.** Una aplicación es software ensamblado para tareas de sus usuarios en un contexto determinado; aquí se usa como **definición operativa del programa**, no como taxonomía normativa de ISO. `apps/portfolio/` presenta trabajos y contacto a un visitante. Una librería de botones usada por varias interfaces, sin caso de uso propio, no es por ello una segunda aplicación.

**Nivel 2 — Mecanismo.** La petición `/work/` llega al router, éste selecciona una página y el navegador muestra el caso de estudio. Si se cambia una URL, deben revisarse enlaces entrantes y navegación.

**Recuperación:** ¿un nuevo paquete de estilos constituye una aplicación? **Respuesta:** no necesariamente; hace falta una experiencia de usuario identificable.

**Nivel 3 — Profundización (opcional).** Una aplicación puede contener servicios y una organización puede llamar “app” a algo distinto: declara el alcance antes de dibujarla. Tipo: conceptual; objetivo: identificar responsabilidad de usuario; técnica: contraste con librería; fuentes [R1, R2] y convención P0 [P1]; revisión: clasificar `apps/portfolio/` al implementarlo. Interacción: no aplica.

#### `scope.system` — Sistema

**Nivel 1 — Fundamento.** Un sistema es un conjunto delimitado de elementos que interactúan para cumplir un propósito; su frontera depende de la pregunta de análisis [R2]. Para analizar publicación, el generador, archivos de contenido y HTML generado pueden formar un sistema; para analizar la experiencia del visitante, el navegador y la red también importan. Una carpeta por sí sola no define esa frontera.

**Nivel 2 — Mecanismo.** **Entrada:** un Markdown canónico

**Proceso:** renderer y conversión de diagrama producen artefactos

**Resultado:** página HTML y SVG para el lector. Si el convertidor falla, el sistema de publicación no debe presentar una página incompleta como éxito.

**Recuperación:** ¿la aplicación de portafolio es siempre todo el sistema? **Respuesta:** depende del propósito y de qué interacciones se estudien.

**Nivel 3 — Profundización (opcional).** Explicita inclusiones, exclusiones y entorno para evitar atribuir fallas externas al componente equivocado. Tipo: estructural; objetivo: dibujar la frontera del sistema de publicación; técnica: mapa de elementos y fallo; fuentes [R2, P1]; revisión: repetir el mapa con una falla real. Interacción: no aplica.

#### `scope.platform` — Plataforma

**Nivel 1 — Fundamento.** En este programa, plataforma es un producto de capacidades compartidas con contratos y consumidores; la literatura de CNCF describe las plataformas internas como oferta de autoservicio para equipos [R4]. Una capa de contenido bilingüe, tokens visuales y pipeline Mermaid→SVG puede servir a numerosas sesiones; un componente copiado una sola vez aún no demuestra una plataforma útil.

**Nivel 2 — Mecanismo.** Un autor entrega teoría y diagrama al contrato del sitio; la plataforma renderiza, valida y publica sin repetir esa maquinaria por sesión. `sesión → esquema estable → renderer común → páginas ES/EN` representa consumo, no garantía de adopción.

**Recuperación:** ¿varias carpetas compartidas prueban valor de plataforma? **Respuesta:** no; hay que comprobar uso, soporte y adecuación del contrato.

**Nivel 3 — Profundización (opcional).** Abstraer demasiado temprano puede imponer convenciones costosas; un consumidor divergente puede requerir extensión o un límite distinto. Tipo: estructural y decisional; objetivo: evaluar capacidad reusable frente a coste; técnica: matriz de consumidores y trade-off; fuentes [R4, P1]; revisión: observar una segunda sesión antes de generalizar. Interacción: no aplica.

#### `scope.ecosystem` — Ecosistema

**Nivel 1 — Fundamento.** Ecosistema es la red de productos, personas, equipos, normas e integraciones que condicionan una solución; es una **abstracción de análisis**, no una jerarquía formal garantizada por [R2]. En P0 incluiría autor del contenido, aprendiz, hospedaje, navegador, herramientas de prueba y visitantes del portafolio. No equivale a “un repositorio muy grande”.

**Nivel 2 — Mecanismo.** Un cambio en el esquema de sesión exige coordinación entre autores, renderer, traducción y publicación, aunque no todos esos participantes compartan código. Representación: tabla actor → contrato → efecto del cambio.

**Recuperación:** si un proveedor externo cambia, ¿deja de importar porque está fuera del repositorio? **Respuesta:** no; puede atravesar la frontera operativa del producto.

**Nivel 3 — Profundización (opcional).** El límite de ecosistema es una decisión de análisis: incluir todo vuelve el modelo inútil; excluir dependencias críticas oculta riesgos. Tipo: estructural; objetivo: identificar actores y contratos; técnica: mapa de cambio; fuentes [R2, P1]; revisión: añadir dependencias reales cuando existan. Interacción: no aplica.

#### `quality.attribute` — Atributo de calidad

**Nivel 1 — Fundamento.** Es una propiedad de calidad que se especifica y evalúa para un producto; ISO/IEC 25010:2023 ofrece un modelo de referencia, no una nota automática para nuestro sitio [R3]. En P0, accesibilidad y desempeño son preocupaciones distintas: una página puede cargar rápido y aun así tener controles imposibles de usar con teclado [R5, R6].

**Nivel 2 — Mecanismo.** Expresa una propiedad como escenario comprobable: “dada la vista de sesión en pantalla pequeña, una persona navega el índice con teclado, sin perder foco ni ocultar contenido”. Una prueba manual observa el foco; una captura sola no lo confirma.

**Recuperación:** ¿“sitio de alta calidad” es criterio verificable? **Respuesta:** no; faltan contexto, estímulo y observación.

**Nivel 3 — Profundización (opcional).** Atributos pueden entrar en tensión: cargar widgets puede afectar el tiempo de respuesta; comprueba ambos con mediciones antes de optimizar. Tipo: decisional; objetivo: formular escenario de prueba; técnica: ejemplo resuelto y comparación; fuentes [R3, R5, R6]; revisión: revalidar tras cambios del sitio. Interacción: no aplica.

#### `quality.constraint` — Restricción de ingeniería

**Nivel 1 — Fundamento.** Es una condición que reduce las soluciones admisibles; se distingue del atributo que intentamos lograr. “Debe publicarse como HTML estático legible sin JavaScript” restringe el diseño de `site/`; “ser accesible” designa una propiedad que debe concretarse en criterios. Una preferencia del equipo no se convierte automáticamente en restricción.

**Nivel 2 — Mecanismo.** **Causa:** requisito de lectura sin JavaScript

**Mecanismo:** respuestas de tarjetas están en HTML y el script solo cambia su presentación

**Resultado:** el contenido sigue accesible cuando el script falla.

**Recuperación:** ¿“usar React” es por sí mismo atributo de calidad? **Respuesta:** no, es una elección tecnológica que debe justificarse.

**Nivel 3 — Profundización (opcional).** Registra origen y dueño de cada restricción; una restricción falsa puede descartar una opción mejor. Tipo: decisional; objetivo: separar objetivo y condición; técnica: clasificación con justificación; fuentes [R3, P1]; revisión: consultar los criterios del repo real. Interacción: no aplica.

#### `design.boundary` — Frontera

**Nivel 1 — Fundamento.** Una frontera delimita responsabilidad y la interacción permitida entre partes [R2]. `apps/portfolio/` contiene comunicación profesional; `site/` contiene teoría completa y estado de estudio. Un enlace público entre ambos puede ser apropiado; importar el estado privado de estudio al portafolio podría violar el propósito de éste.

**Nivel 2 — Mecanismo.** Cuando el sitio cambia su esquema de flashcards, debería cambiar su renderer y pruebas, no el portafolio. Mapa: `portafolio --enlace público--> sitio`; ambos conservan pipelines de contenido propios.

**Recuperación:** ¿una frontera impide cualquier comunicación? **Respuesta:** no; explicita contratos permitidos.

**Nivel 3 — Profundización (opcional).** La separación trae duplicación potencial de estilos y trabajo de despliegue; compartir tokens solo cuando su contrato sea estable. Tipo: estructural; objetivo: anticipar propagación; técnica: cambio hipotético y mapa; fuentes [R2, P1]; revisión: inspeccionar diferencias reales de importación. Interacción: no aplica.

#### `design.coupling` — Acoplamiento

**Nivel 1 — Fundamento.** El [acoplamiento:: Dependencia entre partes que propaga cambios] es el grado y la forma de dependencia entre elementos; para este ejercicio interesa **qué cambio exige cambiar a otro consumidor**, sin inventar un índice numérico [R1]. Si el portafolio lee directamente el JSON interno del sitio, una renombrada de campo podría romperlo.

**Nivel 2 — Mecanismo.** **Causa:** renombrar `page.title` a `page.heading`

**Mecanismo:** el importador depende de la forma interna

**Resultado:** falla el render hasta actualizar al consumidor. Un enlace a una URL pública estable limita esa clase particular de propagación, aunque añade una dependencia de disponibilidad.

**Recuperación:** ¿menos imports significa necesariamente cero acoplamiento? **Respuesta:** no; también hay contratos de red, datos y operación.

**Nivel 3 — Profundización (opcional).** La dirección y estabilidad de la dependencia importan más que contar imports; verifica la ruptura con una prueba de contrato antes de concluir. Tipo: causal/estructural; objetivo: predecir impacto del cambio; técnica: predict→reveal con dos grafos; fuentes [R1, R2]; revisión: ejecutar un cambio controlado. Interacción editorial posible: elegir una arista y resaltar consumidores transitivos del grafo explícito; sin grafo real, usar dos dibujos estáticos.

#### `design.cohesion` — Cohesión

**Nivel 1 — Fundamento.** Expresa cuánto contribuyen las responsabilidades de un módulo a un propósito reconocible [R1]. Un módulo `session-renderer` que organiza secciones, citas y diagramas de sesiones tiene un propósito relacionado; si además gestiona contactos del portafolio y secretos del proveedor de IA, mezcla cambios por razones independientes.

**Nivel 2 — Mecanismo.** Compara motivos de cambio: editar el esquema de citas afecta al renderer; cambiar el formulario de contacto afecta al portafolio. Si ambos requieren editar siempre el mismo módulo, revisa su reparto de responsabilidades.

**Recuperación:** ¿crear un archivo por función garantiza cohesión? **Respuesta:** no; la cohesión depende de responsabilidades y motivos de cambio, no del tamaño del archivo.

**Nivel 3 — Profundización (opcional).** Separar en exceso crea interfaces y coordinación adicionales; comprueba casos reales antes de extraer módulos. Tipo: conceptual/decisional; objetivo: agrupar responsabilidades; técnica: contraste de cambios; fuente [R1]; revisión: revisar el primer diff de P0. Interacción: no aplica.

#### `role.staff` — Alcance Staff

**Nivel 1 — Fundamento.** Para este programa, Staff significa resolver problemas que cruzan equipos o dominios mediante decisiones técnicas explicables, entrega y mentoría. Es una **convención curricular**, no una definición universal de empleo [P1]. Ejemplo: acordar el contrato de navegación del sitio y ayudar a dos autores a utilizarlo.

**Nivel 2 — Mecanismo.** Detecta una incompatibilidad, propone opciones, acuerda responsables, publica un contrato y observa adopción con evidencia.

**Recuperación:** ¿escribir más código individual prueba mayor alcance Staff? **Respuesta:** no; la influencia y el resultado compartido requieren pruebas distintas.

**Nivel 3 — Profundización (opcional).** El título no certifica competencia; diferenciar propuesta de adopción real evita atribuir liderazgo no observado. Tipo: decisional; objetivo: formular evidencia; técnica: análisis de caso; fuente [P1]; revisión: documentar decisión y feedback real. Interacción: no aplica.

#### `role.principal` — Alcance Principal

**Nivel 1 — Fundamento.** En el modelo del programa, Principal agrega decisiones y dirección técnica a escala de varios sistemas, con consecuencias de evolución y gobernanza explícitas [P1]. Ejemplo: evaluar si el contrato bilingüe de P0 puede sostener los 120 capítulos sin imponer una herramienta obligatoria a proyectos ajenos.

**Nivel 2 — Mecanismo.** Identifica alternativas, restricciones y costos de migración; pacta una regla revisable y observa si múltiples equipos/sistemas pueden seguirla.

**Recuperación:** ¿decidir un framework para una sola página prueba impacto Principal? **Respuesta:** no; harían falta alcance, adopción y resultados pertinentes.

**Nivel 3 — Profundización (opcional).** El alcance depende de organización y contexto; aquí es objetivo de aprendizaje, no pronóstico de carrera. Tipo: decisional; objetivo: comparar radio de decisión; técnica: matriz de alcances; fuente [P1]; revisión: contrastar decisión P0 y su evolución en PA-S002. Interacción: no aplica.

### Carril Frontend Platform Architecture (FPA)

#### `fpa.frontend-platform` — Arquitectura de plataforma frontend

**Nivel 1 — Fundamento.** Es el diseño de capacidades frontend compartidas, sus contratos, consumidores y evolución: por ejemplo, shell de navegación, esquema de sesión, tema, componentes accesibles y compilación de diagramas. Es una **síntesis del programa** sobre plataforma [R4], arquitectura [R2] y accesibilidad [R5]. Una página de marketing aislada puede usar un componente compartido sin convertirse por ello en plataforma.

**Nivel 2 — Mecanismo.** El capítulo define IDs de secciones; el renderer produce navegación y HTML; el estado de estudio usa IDs estables en ambos idiomas, mientras los registros de dominio quedan separados. Una traducción cambia texto visible, no claves persistidas.

**Recuperación:** ¿guardar una casilla marcada debe incrementar L1–L5? **Respuesta:** no; seguimiento de estudio y evidencia de dominio tienen contratos distintos [P1].

**Nivel 3 — Profundización (opcional).** Considera fallo de JavaScript, compatibilidad de esquema, foco, contraste y peso de scripts; no declare “accesible” una página solo por pasar un escáner. Tipo: estructural/procedimental; objetivo: seguir contrato autor→lector; técnica: diagrama y prueba de teclado; fuentes [R2, R4, R5, P1]; revisión: segunda sesión bilingüe. Interacción: selector de idioma para ver que ID y estado permanecen, únicamente si el sitio implementa la persistencia real; alternativa sin JS: tabla de IDs.

### Carril AI Product Engineering (AIPE)

#### `aipe.ai-product` — Ingeniería de producto con inteligencia artificial

**Nivel 1 — Fundamento.** Trata una función de IA como parte de un flujo de producto con contexto de uso, entradas permitidas, salida, riesgos y evaluación; el marco voluntario AI RMF del NIST organiza la gestión en Govern, Map, Measure y Manage [R7]. Ejemplo **hipotético**: un resumen asistido de un caso público del portafolio; no existe evidencia de que P0 lo tenga o lo necesite.

**Nivel 2 — Mecanismo.** **Entrada:** texto público elegido por el usuario

**Proceso:** un servicio delimita datos, solicita una propuesta al modelo, valida forma y permite revisión humana

**Resultado:** borrador etiquetado para aprobar o descartar, no una afirmación publicada automáticamente.

**Recuperación:** ¿una respuesta fluida acredita exactitud? **Respuesta:** no; verifica contra el texto fuente y casos de prueba pertinentes [R7].

**Nivel 3 — Profundización (opcional).** Salidas pueden variar y contener datos incorrectos; delimitar privacidad, fallos, costo y evaluación antes de un despliegue. Tipo: causal/decisional; objetivo: distinguir demostración de producto; técnica: recorrido de fallo y decisión con criterios; fuentes [R7, R8]; revisión: solo si aparece un caso de uso real. Interacción: no aplica ahora; no hay modelo ni dataset aprobado para simular calidad.

### Mecanismo de aprendizaje y evidencia (auxiliar, separado de los carriles)

#### `learning.evidence` — Evidencia y estado de estudio

**Nivel 1 — Fundamento.** En el programa, evidencia es un artefacto o una observación trazable a una afirmación de capacidad; una casilla de ejercicio indica actividad declarada, no resultado validado [P1]. Ejemplo: “leí sobre navegación por teclado” es estado de estudio; registro de prueba y revisión humana de la ruta es evidencia.

**Nivel 2 — Mecanismo.** Registrar `PA-S001.exercise.boundary-map = checked` altera solamente el almacenamiento de estudio. Una referencia a prueba real y su resultado se registra por otro canal; el dashboard no deriva dominio de la casilla.

**Recuperación:** ¿marcar la checklist otorga L2? **Respuesta:** no; L2 exige implementar y mostrar evidencia distinta.

**Nivel 3 — Profundización (opcional).** Sin artefacto o criterio observable, el nivel queda pendiente; también cabe “no se puede determinar”. Tipo: conceptual/decisional; objetivo: separar estados; técnica: clasificación y feedback; fuente [P1]; revisión: tras construir y revisar. Interacción: controles de estudio reversibles porque la variable es declaración de seguimiento; sin JS mostrar estado no editable, sin falsas afirmaciones.

#### `learning.levels` — Niveles L1–L5

**Nivel 1 — Fundamento.** El programa distingue L1 Explicar, L2 Implementar, L3 Operar, L4 Decidir y L5 Liderar [P1]. No son porcentajes ni equivalen a las tres **capas de lectura** de un concepto. Ejemplo: explicar por qué un mapa distingue sitio y portafolio puede apoyar L1, pero no prueba que esa frontera se aplique en código.

**Nivel 2 — Mecanismo.** Para L2 se inspecciona implementación y pruebas; para L3 incidentes/operación observados; para L4 alternativas y resultados de decisión; para L5 adopción e influencia comprobadas.

**Recuperación:** ¿un tutorial completado demuestra L5? **Respuesta:** no; cada nivel exige evidencia diferente.

**Nivel 3 — Profundización (opcional).** Puede haber evidencia parcial o contradictoria; registra el alcance y no infieras niveles superiores. Tipo: estructural; objetivo: vincular afirmación a prueba; técnica: matriz evidencia→nivel; fuente [P1]; revisión: reevaluar tras nuevos artefactos. Interacción: no aplica hasta contar con registros reales.

### Manifiesto de cobertura atómica

Cada fila enlaza el ID semántico con su apartado `####` del mismo nombre, que contiene definición, mecanismo, ejemplo, recuperación, respuesta, fuente, técnica y revisión. Los prerrequisitos son conceptuales, no bloqueos de acceso. “Visual” indica representación cercana o propuesta condicional; una anotación no prueba widget construido.

| ID (sección fuente) | Carril / tipo de conocimiento | Prerrequisito | Fuente | Representación o técnica |
|---|---|---|---|---|
| `engineering.software` | Staff→Principal / procedimental | ninguno | R1 | ciclo y recorrido resuelto |
| `engineering.architecture` | Staff→Principal / estructural, decisional | `engineering.software` | R1,R2 | mapa de dependencias |
| `scope.application` | Staff→Principal / conceptual | `engineering.software` | R1,R2,P1 | contraste con librería |
| `scope.system` | Staff→Principal / estructural | `scope.application` | R2,P1 | frontera y flujo |
| `scope.platform` | Staff→Principal / estructural, decisional | `scope.system` | R4,P1 | consumidor→contrato |
| `scope.ecosystem` | Staff→Principal / estructural | `scope.system` | R2,P1 | actor→contrato |
| `quality.attribute` | Staff→Principal / decisional | `engineering.architecture` | R3,R5,R6 | escenario y prueba |
| `quality.constraint` | Staff→Principal / decisional | `quality.attribute` | R3,P1 | condición→opción |
| `design.boundary` | Staff→Principal / estructural | `scope.system` | R2,P1 | mapa de contratos |
| `design.coupling` | Staff→Principal / causal, estructural | `design.boundary` | R1,R2 | cambio→propagación |
| `design.cohesion` | Staff→Principal / conceptual, decisional | `design.boundary` | R1 | motivos de cambio |
| `role.staff` | Staff→Principal / decisional | `engineering.software` | P1 | caso y evidencia |
| `role.principal` | Staff→Principal / decisional | `role.staff` | P1 | matriz de alcance |
| `fpa.frontend-platform` | FPA / estructural, procedimental | `scope.platform`, `design.boundary` | R2,R4,R5,P1 | autor→renderer→lector |
| `aipe.ai-product` | AIPE / causal, decisional | `quality.constraint`, `design.boundary` | R7,R8 | flujo de borrador y fallo |
| `learning.evidence` | Auxiliar / conceptual, decisional | ninguno | P1 | estado ≠ evidencia |
| `learning.levels` | Auxiliar / estructural | `learning.evidence` | P1 | evidencia→nivel |

## Tema principal — Decidir los límites iniciales de P0

**Concepto central.** Diseñar la arquitectura inicial de P0 significa **delimitar responsabilidades, contratos y criterios de cambio** para que el portafolio profesional y la plataforma de aprendizaje puedan evolucionar sin acoplar sus decisiones internas. No consiste en escoger microservicios, un framework o una estructura de carpetas por costumbre. Una frontera arquitectónica se evalúa por lo que permite cambiar, por lo que impide accidentalmente y por la evidencia que necesitamos para revisarla [R1, R2, P1].

**Tres responsabilidades distintas.** El portafolio sirve a visitantes que consultan trabajos profesionales. El sitio educativo sirve a lectores y estudiantes que necesitan teoría completa en español e inglés, navegación, diagramas y seguimiento personal. Una función de IA para resumir documentos es todavía una **hipótesis de producto**: no debe entrar en la arquitectura ejecutable únicamente para ilustrar el carril AIPE. Esta separación no prohíbe enlaces públicos entre productos; sí exige que cada dependencia interna tenga un propósito y un contrato explícito.

**Mecanismo de la decisión.** Primero identifica el resultado para el usuario y sus restricciones. Después delimita quién es dueño de cada cambio: edición del capítulo, renderizado, estado de estudio, presentación profesional y posible tratamiento de datos para IA. A continuación establece contratos observables entre responsables, como identificadores de sección que no cambian al traducir un texto. Por último prueba el límite mediante un cambio representativo: corrige una cita en español y comprueba que no reinicie las marcas de lectura en inglés ni obligue a modificar el portafolio. Esta secuencia describe **cómo validar el diseño**, no un resultado ya observado.

**Ejemplo trabajado.** Una sesión tiene el identificador estable `PA-S001` y ambos idiomas utilizan la misma clave de concepto. El autor corrige la definición española sin modificar esa clave; el renderer produce la página ES y conserva la navegación EN; el seguimiento local sigue asociado al identificador, no a las palabras traducidas. Si el cambio de texto obliga a migrar el almacenamiento, probablemente se mezclaron identidad semántica y presentación. El siguiente paso sería inspeccionar código y pruebas antes de diagnosticar la dependencia exacta.

**Contraejemplo y trade-off.** Convertir cada componente en un paquete autónomo añade fronteras, pero también contratos y mantenimiento. Centralizar todo en un módulo gigante simplifica algunos cambios iniciales, pero propaga responsabilidades no relacionadas. La elección no es «más separación siempre es mejor»: hay que comparar costes de evolución, consumidores reales, reversibilidad y calidad observable. Llamar «plataforma» al primer repositorio tampoco demuestra que exista una capacidad usada por varios consumidores [R4].

**Práctica y recuperación.** Dibuja tres límites —portafolio, publicación educativa y función hipotética de IA— y explica qué información puede atravesar cada uno. Predice qué tocarías al renombrar un campo del esquema editorial y qué tocarías al modificar un texto de contacto; contrasta después tus hipótesis con las dependencias reales. **Recuperación:** ¿qué evidencia hace defendible un límite inicial? **Respuesta:** responsabilidades explícitas, contratos inspeccionables y pruebas de cambios representativos; la ubicación de archivos por sí sola no basta.

## Subtemas

### `sub.software-vs-architecture` — Ingeniería de software y arquitectura

**Conceptos y alcance.** La ingeniería de software abarca todo el trabajo necesario para entregar y mantener un comportamiento útil: comprender la necesidad, diseñar, implementar, comprobar, desplegar y corregir [R1]. La arquitectura de software es la parte del razonamiento que organiza elementos, relaciones y decisiones estructurales que condicionan evolución y calidad [R2]. No son disciplinas rivales: una decisión arquitectónica debe sostenerse con implementación, pruebas y operación; escribir código correcto no demuestra automáticamente que el diseño sea extensible.

**Mecanismo paso a paso.** Considera el requisito «un alumno debe abrir PA-S002 sin perder el seguimiento de PA-S001». Ingeniería traduce ese requisito en comportamiento observable, casos de prueba y verificación de persistencia. Arquitectura identifica contratos duraderos entre la sesión, el renderer y la clave de seguimiento. Si cambia el esquema que consume el renderer, los componentes dependientes pueden necesitar migración; si cambia un espaciado tipográfico, el contrato semántico no debería alterarse. La relación importante es **decisión estructural → superficie de cambio → pruebas de compatibilidad**.

**Ejemplo trabajado y alternativa.** Opción A: duplicar el HTML de cada sesión y corregir manualmente sus enlaces. Opción B: generar las páginas mediante un renderer compartido con identificadores estables. La segunda reduce duplicación editorial, pero introduce un contrato común que habrá que versionar. Para elegir, inspecciona los consumidores reales, la frecuencia de cambio y las pruebas que detectan regresiones. No atribuyas reducción de tiempo o defectos sin medirla.

**Fallo y aplicación en producción.** Un diagrama elegante no sustituye comprobar enlaces, foco de teclado o datos persistidos. Un build verde demuestra únicamente las propiedades cubiertas por sus verificaciones. Dibuja el ciclo requisito → contrato → implementación → prueba → operación, y señala en qué punto se descubriría una traducción que rompe un ID compartido. **Recuperación:** ¿puede funcionar una página y ser difícil de evolucionar? **Respuesta:** sí. El comportamiento actual y la capacidad de cambiar estructuras son preocupaciones relacionadas pero diferentes; evalúa ambas.

### `sub.scope-layers` — Aplicación, sistema, plataforma y ecosistema

**Conceptos y distinciones.** Una **aplicación** entrega una tarea reconocible a un usuario. Un **sistema** delimita elementos que colaboran para un propósito de análisis. Una **plataforma** ofrece capacidades y contratos reutilizables a consumidores identificables. Un **ecosistema** amplía la mirada hacia personas, productos, servicios y normas que condicionan la solución [R2, R4]. No son cuatro tamaños fijos del mismo objeto: una aplicación puede formar parte de un sistema y estar conectada a una plataforma sin convertirse ella misma en una plataforma.

**Mecanismo: cambiar la pregunta cambia la frontera.** Para revisar la experiencia del visitante, observa el portafolio como aplicación: rutas, contenido y navegación. Para comprender por qué una sesión no se publica, observa el sistema formado por archivos fuente, validación, renderer, HTML y despliegue. Para evaluar reutilización, pregunta qué contrato consumen realmente PA-S001 y PA-S002. Para estudiar una caída de hosting o un cambio normativo, amplía la frontera al ecosistema. Cada perspectiva revela unos riesgos y oculta otros.

**Ejemplo trabajado.** Una librería de botones sirve a varias páginas, pero por sí sola no justifica llamar «plataforma» al proyecto. Si existe un contrato editorial documentado, consumidores independientes, cambios versionados y un responsable de soporte, ya puedes investigar si se ofrece una capacidad de plataforma. En el caso contrario, la etiqueta sería prematura. El escenario no atribuye madurez ni adopción real a P0 sin comprobarlas.

**Error frecuente y práctica.** Confundir «comparten repositorio» con «son el mismo sistema» elimina una pregunta esencial: ¿qué problema estamos investigando? Cambia entre las cuatro perspectivas sobre el mismo ejemplo y dibuja qué entra y qué queda fuera; explica por qué elegiste esos límites. **Recuperación:** ¿un sistema necesita ofrecer autoservicio para ser sistema? **Respuesta:** no. Un sistema puede coordinar elementos sin ofrecer capacidades reutilizables a consumidores; ese requisito corresponde al concepto de plataforma adoptado aquí.

### `sub.quality-constraints` — Atributos de calidad y restricciones

**Conceptos y alcance.** Un atributo de calidad es una propiedad deseada que necesita un escenario para poder evaluarse: accesibilidad, desempeño, mantenibilidad u otra preocupación relevante [R3]. Una restricción es una condición que limita las soluciones admisibles. «Debe leerse la teoría sin JavaScript» es una restricción de entrega; «la navegación debe poder operarse con teclado» exige escenarios observables de accesibilidad [R5]. «Usaremos React» no es por sí mismo un atributo de calidad ni una prueba de que se satisfaga uno.

**Mecanismo verificable.** Formula la calidad como situación → estímulo → respuesta observable. Ejemplo: «En un teléfono de 390 píxeles, con el contenido ya cargado, al avanzar por teclado desde el encabezado al índice, el foco permanece visible y no desaparecen controles». Selecciona una forma de probarlo en navegador y registra el resultado. Por separado, desactiva JavaScript para comprobar que las explicaciones sigan en el HTML inicial; no confundas que el texto se lea con que todos los controles guarden estado.

**Ejemplo de causa, mecanismo y consecuencia.** **Condición:** el dispositivo no ejecuta JavaScript. **Mecanismo correcto:** el servidor o build ya entregó la explicación y respuestas dentro del HTML; JavaScript solo mejora interacción. **Consecuencia esperada:** el estudiante puede leer la teoría, aunque no usar ciertas mejoras dinámicas. **Contraste:** si todo el texto se crea exclusivamente desde JS, la misma condición impide presentar la lección. Es un modelo conceptual: no certifica accesibilidad universal ni cuantifica rendimiento.

**Decisión y práctica.** La restricción sin JS excluye ciertas soluciones, pero permite varias implementaciones. Comparar estas alternativas revela costes y riesgos: más HTML inicial puede simplificar disponibilidad del texto; interacciones enriquecidas necesitan fallback y pruebas adicionales. Escribe un escenario verificable y sepáralo de la restricción y de la tecnología elegida. **Recuperación:** ¿una puntuación visual o una captura prueban accesibilidad? **Respuesta:** no. Debes observar el comportamiento bajo condiciones relevantes, incluyendo navegación por teclado y contenido realmente disponible.

### `sub.boundary-dependencies` — Fronteras, acoplamiento y cohesión

**Conceptos y relaciones.** Una frontera expresa qué responsabilidad pertenece a un componente y qué intercambios admite. El acoplamiento describe dependencias que pueden transmitir cambios. La cohesión evalúa si las responsabilidades reunidas en un módulo sirven a un propósito reconocible [R1, R2]. Son conceptos relacionados, pero ninguno se mide contando carpetas. Una frontera útil conserva contratos explícitos y evita que un cambio localizado obligue a comprender módulos ajenos.

**Mecanismo explicado.** Supón dos cambios: A, renombrar un campo obligatorio del esquema editorial; B, corregir la biografía pública del portafolio. En el escenario A habría que revisar los consumidores que interpretan ese campo —validación, renderer y contenido— y verificar compatibilidad; en B deberían revisarse la vista profesional y sus enlaces. **Estas son hipótesis de trabajo**, no afirmaciones sobre el grafo real. Solo inspeccionar imports, contratos y tests permite identificar consumidores efectivamente alcanzables.

**Contraste visual y fallo.** Utiliza dos diagramas **estáticos y claramente ilustrativos**: flujo editorial (fuente → validación → renderer → HTML) y flujo del portafolio (contenido profesional → página pública). No resaltes nodos hipotéticos como si se hubiera medido un fallo. Una importación interna innecesaria entre ambos aumenta puntos potenciales de coordinación; un enlace público deliberado no viola necesariamente la frontera. Separar cada función en un paquete también puede empeorar la cohesión y añadir interfaces sin ventaja.

**Práctica y recuperación.** Antes de inspeccionar el código, predice el alcance de A y B; después compara tu hipótesis con los archivos e imports reales. Argumenta qué responsabilidad cambiarías de lugar y qué prueba protegería ese contrato. **Recuperación:** ¿menos importaciones siempre significa menor acoplamiento? **Respuesta:** no. También existen dependencias de datos, contratos públicos, despliegue y operación; examina su estabilidad y dirección.

### `sub.frontend-platform` — Primer corte de plataforma frontend

**Concepto y producto.** La arquitectura de plataforma frontend organiza capacidades que otras experiencias pueden consumir sin reconstruirlas: estructura de página, navegación, accesibilidad, tema, traducción, esquema editorial, renderizado de diagramas y controles de estudio [R2, R4, R5, P1]. En P0 estas capacidades pertenecen al sitio educativo; el portafolio continúa como aplicación separada con otras necesidades de usuario. Que ambos se construyan desde el mismo repositorio no justifica importar todos sus detalles internos.

**Mecanismo del contrato bilingüe.** La autoría produce teoría ES/EN con claves de sección estables. La validación comprueba presencia, orden y cobertura; el renderer transforma el contenido en HTML semántico y referencia SVG accesibles; el navegador ofrece lectura y controles. El seguimiento se vincula a IDs compartidos en ambos idiomas. Cambiar una traducción no debe cambiar la clave guardada. Una marca de estudio nunca produce por sí sola evidencia de dominio L1–L5.

**Ejemplo paso a paso.** Publicar PA-S002 debería consistir en aportar el contenido canónico propio, su manifiesto y las visualizaciones justificadas, sin copiar el renderer ni recrear navegación. Una ampliación del esquema exige verificar compatibilidad con PA-S001. Si un concepto necesita un simulador, se conecta una experiencia documentada con inputs, reglas y alternativa sin JS; si basta una tabla comparativa, no se agrega un control decorativo.

**Contraejemplo, decisión y práctica.** Un mapa Mermaid que permanece como código sin SVG accesible, una respuesta de flashcard que desaparece sin JS o un checkbox deshabilitado indican que la capacidad compartida no satisface su contrato. Recorre fuente → validación → HTML/SVG → lector y ubica qué test detectaría cada ruptura. **Recuperación:** ¿un dashboard sin actividad debe mostrar porcentajes de dominio? **Respuesta:** no. Muestra estados reales o vacíos, y conserva estudio y evidencia acreditada por separado.

### `sub.ai-product` — Límite de una función de IA

**Concepto y alcance.** Ingeniería de producto con IA significa diseñar el flujo completo alrededor de una capacidad probabilística, no limitarse a llamar a un modelo: propósito del usuario, origen y permiso de datos, resultado esperado, riesgos, evaluación, revisión y operación [R7, R8]. Para PA-S001 no existe un requisito verificado que justifique integrar un proveedor de IA. Un ejemplo hipotético ayuda a pensar las decisiones; no convierte la función en parte del producto real.

**Mecanismo por fases.** Si en el futuro el estudiante quiere resumir un documento público: 1) definir qué texto puede enviarse; 2) evaluar si búsqueda o resumen manual resuelven mejor la necesidad; 3) producir un **borrador**, no un hecho certificado; 4) contrastar citas y afirmaciones con el texto de origen; 5) ofrecer revisión y rechazo humano; 6) registrar errores y condiciones operativas antes de considerar publicación. Es un flujo de diseño y control, no una integración ejecutada.

**Escenarios y trade-offs.** Con datos no autorizados, el flujo se detiene antes del envío. Con citas sin comprobar, la salida sigue sin respaldo. Sin revisión humana, este ejercicio bloquea publicación automática. Incluso con las tres condiciones favorables, el documento solo está **listo para revisión**, no necesariamente aprobado ni correcto. La posible automatización debe compararse con coste, variabilidad y daño de una afirmación equivocada.

**Ejemplo trabajado, práctica y recuperación.** Propón un resumen de un documento de estudio ficticio y especifica qué afirmaciones exigirían cita. Explica qué harías si un revisor encontrara una atribución inexistente y cómo impedirías que el usuario confundiera la propuesta con una respuesta verificada. Describe una alternativa sin IA. **Recuperación:** ¿una demostración convincente prueba que la función está lista para producción? **Respuesta:** no. Hacen falta requisitos reales, controles, pruebas y evidencia operativa; en PA-S001 la función permanece hipotética.

### Síntesis entre dominios (después de los tres carriles)

Staff→Principal define quién argumenta y revisa decisiones de alcance; FPA define contratos compartidos y comportamiento del navegador; AIPE agrega control de entradas, variabilidad de salidas y evaluación únicamente si hay una función real. La relación es una **síntesis de diseño**: un criterio de publicación accesible afecta tanto el capítulo como cualquier borrador generado, pero un resultado de IA no convierte por sí solo una app en plataforma.

## Mapa de teoría a práctica

La tabla vincula conceptos académicos con una decisión o comprobación posterior. **Las señales son entregables a verificar**, no resultados obtenidos ni niveles de dominio atribuidos.

| Conceptos estudiados | Trabajo posterior | Evidencia esperada, todavía por verificar |
|---|---|---|
| Aplicación, sistema, plataforma; fronteras, acoplamiento y cohesión | Delimitar P0, identificar contratos y comprobar dependencias reales | Diagrama explicable y diferencias de código contrastadas |
| Atributos de calidad, restricciones y arquitectura de plataforma frontend | Probar idiomas, navegación por teclado, disponibilidad sin JavaScript y pantallas móviles | Reporte de pruebas ejecutadas con resultados |
| Ingeniería de producto con IA | Evaluar un caso de uso antes de escoger proveedor o modelo | Decisión documentada con datos autorizados, riesgos y alternativa sin IA |
| Evidencia, alcance Staff y Principal | Separar seguimiento de lectura, trabajo implementado y decisiones técnicas | Artefactos, observaciones y argumentos atribuibles; nunca porcentajes inventados |

## Tiempo estimado

La estimación se distribuye como guía: lectura y recuperación 60–90 min; mapa y decisión 40–60 min; primer corte y pruebas 80–130 min; reflexión 20–30 min. Suma mínima = 60+40+80+20 = **200 min (3 h 20 min)**; suma máxima = 90+60+130+30 = **310 min (5 h 10 min)**. Dependerá del estado real del repositorio y no representa tiempo medido.

## Ejemplo del mundo real

**Caso documentado: Spotify y Backstage.** Spotify desarrolló un portal interno para reducir la fragmentación de servicios, información y herramientas a medida que crecía su organización técnica. La documentación pública de Spotify explica que el esfuerzo comenzó con un catálogo de servicios y más tarde incorporó documentación técnica y plantillas para crear software. Backstage se hizo público en 2020 y evolucionó como proyecto de la Cloud Native Computing Foundation (CNCF). Este es un caso real de capacidades compartidas con consumidores, no evidencia de que P0 ya posea una plataforma madura [R4, R9, R10].

**Problema arquitectónico.** Cuando distintos equipos mantienen servicios y herramientas, descubrir quién es responsable de un componente, dónde está su documentación y cómo crear un servicio consistente requiere coordinar información dispersa. Una aplicación aislada resuelve una tarea; un portal de ingeniería aspira a conectar esa información y proporcionar contratos consumibles. La necesidad no se resuelve por bautizar una carpeta como «plataforma»: hay que identificar consumidores y la experiencia que esperan.

**Mecanismo observable descrito por las fuentes.** El **Software Catalog** centraliza metadatos y responsables; **TechDocs** conecta documentación técnica con los componentes; **Software Templates** ofrecen un camino reproducible para iniciar proyectos. Las extensiones integran sistemas existentes detrás de una experiencia común. Este diseño deja ver por qué importa una frontera: el portal reúne acceso y convenciones sin exigir que todos los servicios sean la misma aplicación. Las fuentes describen estas capacidades; no afirman que todos los equipos obtengan idénticos resultados [R9, R10].

**Decisiones y costes.** Un catálogo necesita datos mantenidos y propietarios claros; si nadie actualiza metadatos, la búsqueda devuelve una imagen engañosa. Las plantillas aceleran tareas repetibles solo cuando las convenciones resultantes son adecuadas para sus consumidores; imponerlas prematuramente puede aumentar el coste de migración. Un portal común también introduce mantenimiento, integración y gobernanza. Para evaluar valor, se necesitan indicadores medidos de adopción, experiencia y operación, no una promesa de productividad.

**Transferencia explícita a P0 (analogía, no afirmación sobre Spotify).** El contrato bilingüe y el renderer del Learning Site se parecen a una capacidad compartida solo en un aspecto: varias sesiones pueden consumir una misma maquinaria editorial. Un portafolio que enlaza al sitio educativo se parece a otro consumidor o producto conectado, no a un módulo que deba compartir todos sus estados internos. Para saber si realmente construimos una plataforma, debemos publicar PA-S002, comprobar reutilización y documentar sus costes y consumidores. Esta inferencia es nuestra; Spotify no demuestra que P0 tendrá los mismos beneficios.

**Preguntas de transferencia.** ¿Qué capacidad de Backstage corresponde a un contrato consumible? ¿Qué parte es aplicación visible al desarrollador y cuál es infraestructura de plataforma? ¿Qué fallaría si el catálogo no reflejara propietarios reales? ¿Qué evidencia exigirías antes de llamar «plataforma» a nuestro renderer de dos idiomas? Contrasta tus respuestas con los mecanismos del caso, no con el tamaño de la organización.

## Ejemplo listo para producción (diseño verificable, aún no ejecutado)

**Contexto:** publicar `PA-S001` en ES y EN, registrar lectura reversible y preservar su fuente. **Flujo normal:** archivos canónicos → esquema de IDs → comprobación de cobertura/citas → compilación Mermaid→SVG → HTML estático → controles progresivos de estudio. En ambas páginas, `PA-S001.exercise.boundary-map` designa el mismo ejercicio; la etiqueta cambia de idioma, la clave no. Un enlace a la página del portafolio no importa datos privados del sitio.

**Fallo:** si falta un ID o falla la compilación SVG, el build debe fallar con archivo y sección; no se sirve código Mermaid crudo como si fuese diagrama. Si falta JavaScript, contenido, respuestas y mapas mantienen lectura. **Contrato mínimo ilustrativo, no implementación ejecutada:**

```ts
type StudyItem = { id: "PA-S001.exercise.boundary-map"; checked: boolean };
type EvidenceRecord = { artifactId: string; claim: string; verification?: string };
// The study item does not mutate EvidenceRecord or L1–L5.
```

**Verificación requerida:** comparar IDs y párrafos ES/EN, inspeccionar HTML real, tabular foco y reversibilidad, recargar almacenamiento, desconectar JS y comprobar que ninguna casilla cambie registros de dominio. Una prueba automática de presencia de encabezados no demuestra comprensión ni accesibilidad completa. **Riesgos:** conflictos de almacenamiento entre dispositivos, enlaces externos rotos y traducciones que alteren matices; documentar limitaciones y correcciones antes de publicar.

## Guía visual de aprendizaje / Visual Learning Studio

**Mapa conceptual.** Explora las relaciones entre ingeniería de software, arquitectura, alcance, atributos de calidad y límites de los productos. Las ramas de arquitectura de plataforma frontend e ingeniería de producto con IA se estudian por separado antes de integrarse en la decisión de P0. Las conexiones muestran **prerrequisitos y relaciones de estudio**, no una causalidad física entre sistemas. El mapa permite volver a la explicación desarrollada de cada concepto y dispone de una alternativa textual en pantallas pequeñas.

**Tarjetas de recuperación.** Hay una tarjeta por cada uno de los 17 conceptos, otra del tema principal y seis de los subtemas: **24 en total**. Cada tarjeta presenta una pregunta y una respuesta con explicación; su reverso no sustituye la teoría completa. Se pueden navegar con teclado o controles táctiles; sin JavaScript, preguntas y respuestas deben seguir disponibles en la página.

**Exploraciones contextuales.** La comparación de alcances, los límites de cambio, la disponibilidad de HTML y la decisión hipotética sobre IA tienen prácticas diferenciadas porque requieren mecanismos distintos. Los escenarios declaran sus supuestos y muestran entrada, regla y consecuencia. No son mediciones del repositorio ni evidencia automática de dominio.

## Ejercicios

1. **`PA-S001.exercise.classify`:** clasifica `apps/portfolio/`, `site/`, renderer y hospedaje según los cuatro alcances; justifica dónde cambiaría tu frontera si la pregunta es accesibilidad frente a publicación. Criterio: cada etiqueta tiene propósito y contraejemplo; marcarla solo registra estudio.
2. **`PA-S001.exercise.boundary-map`:** dibuja un mapa con portafolio, sitio, esquema y estado de estudio; indica contratos y predice la propagación de renombrar un ID traducido. Compara predicción con imports y pruebas cuando exista repo.
3. **`PA-S001.exercise.quality`:** escribe un escenario de accesibilidad con contexto, acción y observación; distingue un atributo de una restricción. Valídalo en navegador con teclado y sin JavaScript cuando esté implementado.
4. **`PA-S001.exercise.ai-decision`:** defiende si el resumen hipotético pertenece al primer corte. Expón datos permitidos, alternativa sin IA, riesgo, evaluación necesaria y quién revisa la salida. No implementes proveedor solo para completar el ejercicio.

## Fuentes verificadas

- [R1] IEEE Computer Society, [SWEBOK Guide V4, áreas de ingeniería, arquitectura y diseño](https://www.computer.org/education/bodies-of-knowledge/software-engineering/topics). Se usa para el alcance de ingeniería y decisiones de diseño, sin atribuirle la taxonomía operativa exacta de P0.
- [R2] ISO/IEC/IEEE, [42010:2022, Architecture description](https://www.iso.org/standard/74393.html). La página pública describe el alcance de la descripción arquitectónica; el texto completo puede requerir licencia.
- [R3] ISO/IEC, [25010:2023, Product quality model](https://www.iso.org/standard/78176.html). La página pública confirma que el modelo tiene nueve características; aquí no se atribuye una lista específica no comprobada.
- [R4] CNCF TAG App Delivery, [Platforms White Paper](https://tag-app-delivery.cncf.io/whitepapers/platforms/) y [maturity model](https://tag-app-delivery.cncf.io/whitepapers/platform-eng-maturity-model/). Describe plataforma interna como capacidad consumible; la aplicación a contenido es inferencia del curso.
- [R5] W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Fuente normativa de principios y criterios de accesibilidad web; aquí no se afirma conformidad.
- [R6] Mozilla, [What is web performance?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/What_is_web_performance). Guía de plataforma para la distinción desempeño/experiencia.
- [R7] NIST, [AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/). Marco voluntario para gestión del riesgo de IA.
- [R8] NIST, [Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence). Perfil complementario para sistemas de IA generativa.
- [R9] Spotify for Backstage, [Backstage 101](https://backstage.spotify.com/discover/backstage-101/). Relato público de por qué surgió el portal y de la secuencia catálogo → documentación y plantillas. No permite inferir métricas particulares de P0.
- [R10] Backstage, [Technical overview](https://backstage.io/docs/overview/technical-overview/). Documentación de catálogo, integración por plugins, plantillas y TechDocs.
- [P1] Project Sources: `03-MASTER-ROADMAP` (§PA-S001), `04-SESSION-TEMPLATE`, `05-LEARNING-METHODOLOGY`, `06-TECHNICAL-STANDARDS`, `07-PROGRESS`, `08-COMPETENCY-MATRIX`, `09-PROJECTS-AND-APPS`, `10-DECISION-LOG`, `11-CODEX-GUIDELINES`, `12-ARTIFACT-AND-PUBLISHING-STANDARD`, `13-CANONICAL-SESSION-AUDIT`, `14-ACCELERATED-LEARNING-UX`, `15-ADAPTIVE-LEARNING-EXPERIENCE`. Contrato curricular local, no fuente de hechos externos.

## Recursos y método de repaso

Lee la descripción pública de [R2] y formula una frontera para P0; compara el escenario de accesibilidad con [R5], la plataforma con [R4] y la función hipotética con [R7]. Al terminar la sesión, recupera sin mirar las cuatro escalas y comprueba las respuestas en `Conceptos`; vuelve a intentarlo al iniciar PA-S002 y después de la primera modificación real del esquema. Son **oportunidades**, no un calendario óptimo ni evidencia de dominio. Registra pregunta, respuesta, error corregido y artefacto de verificación por separado.

## Lista de comprobación de estudio

Estos IDs son reversibles y compartidos ES/EN; una marca expresa seguimiento personal.

- [ ] `PA-S001.check.engineering` Explico ingeniería y arquitectura con un cambio concreto.
- [ ] `PA-S001.check.scope` Distingo aplicación, sistema, plataforma y ecosistema.
- [ ] `PA-S001.check.quality` Separo atributo, escenario verificable y restricción.
- [ ] `PA-S001.check.boundary` Predigo una propagación por acoplamiento y justifico cohesión.
- [ ] `PA-S001.check.fpa` Explico el contrato editorial bilingüe y el fallback.
- [ ] `PA-S001.check.aipe` Distingo borrador de IA y salida validada.
- [ ] `PA-S001.check.roles` Distingo alcances Staff/Principal sin inferir dominio.
- [ ] `PA-S001.check.evidence` Distingo casilla de estudio de evidencia L1–L5.

## Criterios de éxito de la sesión

Estos criterios describen **qué deberías poder demostrar después de estudiar y practicar**. Puedes marcar cada casilla para organizar tu revisión. Las marcas son reversibles, se comparten entre ES/EN mediante IDs estables y **no certifican dominio L1–L5, finalización ni calidad del trabajo**. Las pruebas reales, respuestas y decisiones deben guardarse como evidencia independiente.

- [ ] `PA-S001.success.scope` Puedo explicar aplicación, sistema, plataforma y ecosistema usando una frontera distinta para cada pregunta, y señalar un contraejemplo.
- [ ] `PA-S001.success.boundary` Puedo dibujar los límites iniciales de P0, explicar contratos y predecir dónde inspeccionaría una propagación de cambio sin inventar dependencias observadas.
- [ ] `PA-S001.success.quality` Puedo transformar un atributo de calidad en un escenario comprobable y distinguirlo de la restricción de lectura sin JavaScript.
- [ ] `PA-S001.success.fpa` Puedo describir el flujo desde contenido bilingüe hasta HTML/SVG, justificar claves estables y comprobar navegación y fallbacks.
- [ ] `PA-S001.success.aipe` Puedo defender si una función hipotética de resumen necesita IA, qué datos podría usar, cómo verificaría afirmaciones y quién revisaría la salida.
- [ ] `PA-S001.success.evidence` Puedo distinguir marcas de estudio de evidencia L1 Explicar, L2 Implementar, L3 Operar, L4 Decidir y L5 Liderar, sin atribuir niveles no evaluados.

**Cómo comprobarlo en la práctica.** Conserva un diagrama de límites con alternativas, una prueba real del HTML ES/EN y una decisión justificada sobre la función de IA. Si una prueba no se ejecutó, regístrala como pendiente; si falló, anota el error y la corrección. Un checkbox refleja tu seguimiento personal, **nunca reemplaza esa evidencia**.

## Puente a PA-S002

La siguiente sesión examina si el mismo repositorio necesita workspaces, paquetes y reglas de dependencia. Recupera primero el caso “carpeta ≠ frontera” y verifica con el grafo de importaciones si los límites propuestos sobrevivieron al primer corte.
