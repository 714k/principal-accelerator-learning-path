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

**Nivel 2 — Mecanismo.** 📥 **Entrada:** necesidad de navegar proyectos; ⚙️ **Proceso:** convertirla en contrato de ruta, implementación y comprobaciones; 📤 **Resultado:** una página cuyo enlace y comportamiento pueden verificarse; 💡 **Regla contextual:** cerrar el ciclo incluye observar fallos tras el cambio. Representación: `necesidad → contrato → implementación → prueba → operación`. **Recuperación:** ¿un componente que compila prueba que la necesidad se cumplió? **Respuesta:** no; hace falta contrastarlo con el requisito y su comportamiento.

**Nivel 3 — Profundización (opcional).** Más comprobaciones tienen coste; selecciona las que cubran riesgos reales. Un test de ruta no confirma que una persona pueda operar la navegación por teclado. Tipo: procedimental; objetivo: trazar cambio a verificación; técnica: recorrido resuelto y posterior práctica independiente; fuente [R1]; revisión: explicar de nuevo después de construir P0. Interacción: no aplica, porque una secuencia textual y una prueba real bastan.

#### `engineering.architecture` — Arquitectura de software

**Nivel 1 — Fundamento.** Es el razonamiento sobre elementos, relaciones y principios estructurales de un sistema; una *descripción arquitectónica* documenta ese razonamiento y sus preocupaciones, pero no es la estructura ejecutada [R2]. Ejemplo: separar `apps/portfolio/` de `site/` evita que una decisión de navegación editorial determine automáticamente la navegación profesional. Un diagrama sin correspondencia con dependencias reales es descripción incorrecta, no arquitectura comprobada.

**Nivel 2 — Mecanismo.** Una decisión asigna responsabilidades y contratos; esos límites determinan dónde se propaga un cambio. Representación: `site/content → renderer → HTML`, mientras `apps/portfolio → portfolio UI`; una importación directa entre ambos rompe la separación propuesta. **Recuperación:** si el sitio y la app viven en el mismo repositorio, ¿son el mismo producto? **Respuesta:** no; ubicación Git y responsabilidad arquitectónica son dimensiones distintas.

**Nivel 3 — Profundización (opcional).** Documenta contexto, alternativas, consecuencia y forma de validar una decisión; no deduzcas calidad solo por tener carpetas distintas. Tipo: estructural y decisional; objetivo: relacionar límites con propagación; técnica: mapa de dependencias y contraejemplo; fuentes [R1, R2]; revisión: comprobar imports y rutas tras P0. Interacción sugerida: selector de una dependencia, que resalte consumidores alcanzables *solo si* se deriva del grafo real; alternativa sin JavaScript: mapa estático.

#### `scope.application` — Aplicación

**Nivel 1 — Fundamento.** Una aplicación es software ensamblado para tareas de sus usuarios en un contexto determinado; aquí se usa como **definición operativa del programa**, no como taxonomía normativa de ISO. `apps/portfolio/` presenta trabajos y contacto a un visitante. Una librería de botones usada por varias interfaces, sin caso de uso propio, no es por ello una segunda aplicación.

**Nivel 2 — Mecanismo.** La petición `/work/` llega al router, éste selecciona una página y el navegador muestra el caso de estudio. Si se cambia una URL, deben revisarse enlaces entrantes y navegación. **Recuperación:** ¿un nuevo paquete de estilos constituye una aplicación? **Respuesta:** no necesariamente; hace falta una experiencia de usuario identificable.

**Nivel 3 — Profundización (opcional).** Una aplicación puede contener servicios y una organización puede llamar “app” a algo distinto: declara el alcance antes de dibujarla. Tipo: conceptual; objetivo: identificar responsabilidad de usuario; técnica: contraste con librería; fuentes [R1, R2] y convención P0 [P1]; revisión: clasificar `apps/portfolio/` al implementarlo. Interacción: no aplica.

#### `scope.system` — Sistema

**Nivel 1 — Fundamento.** Un sistema es un conjunto delimitado de elementos que interactúan para cumplir un propósito; su frontera depende de la pregunta de análisis [R2]. Para analizar publicación, el generador, archivos de contenido y HTML generado pueden formar un sistema; para analizar la experiencia del visitante, el navegador y la red también importan. Una carpeta por sí sola no define esa frontera.

**Nivel 2 — Mecanismo.** 📥 **Entrada:** un Markdown canónico; ⚙️ **Proceso:** renderer y conversión de diagrama producen artefactos; 📤 **Resultado:** página HTML y SVG para el lector. Si el convertidor falla, el sistema de publicación no debe presentar una página incompleta como éxito. **Recuperación:** ¿la aplicación de portafolio es siempre todo el sistema? **Respuesta:** depende del propósito y de qué interacciones se estudien.

**Nivel 3 — Profundización (opcional).** Explicita inclusiones, exclusiones y entorno para evitar atribuir fallas externas al componente equivocado. Tipo: estructural; objetivo: dibujar la frontera del sistema de publicación; técnica: mapa de elementos y fallo; fuentes [R2, P1]; revisión: repetir el mapa con una falla real. Interacción: no aplica.

#### `scope.platform` — Plataforma

**Nivel 1 — Fundamento.** En este programa, plataforma es un producto de capacidades compartidas con contratos y consumidores; la literatura de CNCF describe las plataformas internas como oferta de autoservicio para equipos [R4]. Una capa de contenido bilingüe, tokens visuales y pipeline Mermaid→SVG puede servir a numerosas sesiones; un componente copiado una sola vez aún no demuestra una plataforma útil.

**Nivel 2 — Mecanismo.** Un autor entrega teoría y diagrama al contrato del sitio; la plataforma renderiza, valida y publica sin repetir esa maquinaria por sesión. `sesión → esquema estable → renderer común → páginas ES/EN` representa consumo, no garantía de adopción. **Recuperación:** ¿varias carpetas compartidas prueban valor de plataforma? **Respuesta:** no; hay que comprobar uso, soporte y adecuación del contrato.

**Nivel 3 — Profundización (opcional).** Abstraer demasiado temprano puede imponer convenciones costosas; un consumidor divergente puede requerir extensión o un límite distinto. Tipo: estructural y decisional; objetivo: evaluar capacidad reusable frente a coste; técnica: matriz de consumidores y trade-off; fuentes [R4, P1]; revisión: observar una segunda sesión antes de generalizar. Interacción: no aplica.

#### `scope.ecosystem` — Ecosistema

**Nivel 1 — Fundamento.** Ecosistema es la red de productos, personas, equipos, normas e integraciones que condicionan una solución; es una **abstracción de análisis**, no una jerarquía formal garantizada por [R2]. En P0 incluiría autor del contenido, aprendiz, hospedaje, navegador, herramientas de prueba y visitantes del portafolio. No equivale a “un repositorio muy grande”.

**Nivel 2 — Mecanismo.** Un cambio en el esquema de sesión exige coordinación entre autores, renderer, traducción y publicación, aunque no todos esos participantes compartan código. Representación: tabla actor → contrato → efecto del cambio. **Recuperación:** si un proveedor externo cambia, ¿deja de importar porque está fuera del repositorio? **Respuesta:** no; puede atravesar la frontera operativa del producto.

**Nivel 3 — Profundización (opcional).** El límite de ecosistema es una decisión de análisis: incluir todo vuelve el modelo inútil; excluir dependencias críticas oculta riesgos. Tipo: estructural; objetivo: identificar actores y contratos; técnica: mapa de cambio; fuentes [R2, P1]; revisión: añadir dependencias reales cuando existan. Interacción: no aplica.

#### `quality.attribute` — Atributo de calidad

**Nivel 1 — Fundamento.** Es una propiedad de calidad que se especifica y evalúa para un producto; ISO/IEC 25010:2023 ofrece un modelo de referencia, no una nota automática para nuestro sitio [R3]. En P0, accesibilidad y desempeño son preocupaciones distintas: una página puede cargar rápido y aun así tener controles imposibles de usar con teclado [R5, R6].

**Nivel 2 — Mecanismo.** Expresa una propiedad como escenario comprobable: “dada la vista de sesión en pantalla pequeña, una persona navega el índice con teclado, sin perder foco ni ocultar contenido”. Una prueba manual observa el foco; una captura sola no lo confirma. **Recuperación:** ¿“sitio de alta calidad” es criterio verificable? **Respuesta:** no; faltan contexto, estímulo y observación.

**Nivel 3 — Profundización (opcional).** Atributos pueden entrar en tensión: cargar widgets puede afectar el tiempo de respuesta; comprueba ambos con mediciones antes de optimizar. Tipo: decisional; objetivo: formular escenario de prueba; técnica: ejemplo resuelto y comparación; fuentes [R3, R5, R6]; revisión: revalidar tras cambios del sitio. Interacción: no aplica.

#### `quality.constraint` — Restricción de ingeniería

**Nivel 1 — Fundamento.** Es una condición que reduce las soluciones admisibles; se distingue del atributo que intentamos lograr. “Debe publicarse como HTML estático legible sin JavaScript” restringe el diseño de `site/`; “ser accesible” designa una propiedad que debe concretarse en criterios. Una preferencia del equipo no se convierte automáticamente en restricción.

**Nivel 2 — Mecanismo.** 📥 **Causa:** requisito de lectura sin JavaScript; ⚙️ **Mecanismo:** respuestas de tarjetas están en HTML y el script solo cambia su presentación; 📤 **Resultado:** el contenido sigue accesible cuando el script falla. **Recuperación:** ¿“usar React” es por sí mismo atributo de calidad? **Respuesta:** no, es una elección tecnológica que debe justificarse.

**Nivel 3 — Profundización (opcional).** Registra origen y dueño de cada restricción; una restricción falsa puede descartar una opción mejor. Tipo: decisional; objetivo: separar objetivo y condición; técnica: clasificación con justificación; fuentes [R3, P1]; revisión: consultar los criterios del repo real. Interacción: no aplica.

#### `design.boundary` — Frontera

**Nivel 1 — Fundamento.** Una frontera delimita responsabilidad y la interacción permitida entre partes [R2]. `apps/portfolio/` contiene comunicación profesional; `site/` contiene teoría completa y estado de estudio. Un enlace público entre ambos puede ser apropiado; importar el estado privado de estudio al portafolio podría violar el propósito de éste.

**Nivel 2 — Mecanismo.** Cuando el sitio cambia su esquema de flashcards, debería cambiar su renderer y pruebas, no el portafolio. Mapa: `portafolio --enlace público--> sitio`; ambos conservan pipelines de contenido propios. **Recuperación:** ¿una frontera impide cualquier comunicación? **Respuesta:** no; explicita contratos permitidos.

**Nivel 3 — Profundización (opcional).** La separación trae duplicación potencial de estilos y trabajo de despliegue; compartir tokens solo cuando su contrato sea estable. Tipo: estructural; objetivo: anticipar propagación; técnica: cambio hipotético y mapa; fuentes [R2, P1]; revisión: inspeccionar diferencias reales de importación. Interacción: no aplica.

#### `design.coupling` — Acoplamiento

**Nivel 1 — Fundamento.** El [acoplamiento:: Dependencia entre partes que propaga cambios] es el grado y la forma de dependencia entre elementos; para este ejercicio interesa **qué cambio exige cambiar a otro consumidor**, sin inventar un índice numérico [R1]. Si el portafolio lee directamente el JSON interno del sitio, una renombrada de campo podría romperlo.

**Nivel 2 — Mecanismo.** 📥 **Causa:** renombrar `page.title` a `page.heading`; ⚙️ **Mecanismo:** el importador depende de la forma interna; 📤 **Resultado:** falla el render hasta actualizar al consumidor. Un enlace a una URL pública estable limita esa clase particular de propagación, aunque añade una dependencia de disponibilidad. **Recuperación:** ¿menos imports significa necesariamente cero acoplamiento? **Respuesta:** no; también hay contratos de red, datos y operación.

**Nivel 3 — Profundización (opcional).** La dirección y estabilidad de la dependencia importan más que contar imports; verifica la ruptura con una prueba de contrato antes de concluir. Tipo: causal/estructural; objetivo: predecir impacto del cambio; técnica: predict→reveal con dos grafos; fuentes [R1, R2]; revisión: ejecutar un cambio controlado. Interacción editorial posible: elegir una arista y resaltar consumidores transitivos del grafo explícito; sin grafo real, usar dos dibujos estáticos.

#### `design.cohesion` — Cohesión

**Nivel 1 — Fundamento.** Expresa cuánto contribuyen las responsabilidades de un módulo a un propósito reconocible [R1]. Un módulo `session-renderer` que organiza secciones, citas y diagramas de sesiones tiene un propósito relacionado; si además gestiona contactos del portafolio y secretos del proveedor de IA, mezcla cambios por razones independientes.

**Nivel 2 — Mecanismo.** Compara motivos de cambio: editar el esquema de citas afecta al renderer; cambiar el formulario de contacto afecta al portafolio. Si ambos requieren editar siempre el mismo módulo, revisa su reparto de responsabilidades. **Recuperación:** ¿crear un archivo por función garantiza cohesión? **Respuesta:** no; la cohesión depende de responsabilidades y motivos de cambio, no del tamaño del archivo.

**Nivel 3 — Profundización (opcional).** Separar en exceso crea interfaces y coordinación adicionales; comprueba casos reales antes de extraer módulos. Tipo: conceptual/decisional; objetivo: agrupar responsabilidades; técnica: contraste de cambios; fuente [R1]; revisión: revisar el primer diff de P0. Interacción: no aplica.

#### `role.staff` — Alcance Staff

**Nivel 1 — Fundamento.** Para este programa, Staff significa resolver problemas que cruzan equipos o dominios mediante decisiones técnicas explicables, entrega y mentoría. Es una **convención curricular**, no una definición universal de empleo [P1]. Ejemplo: acordar el contrato de navegación del sitio y ayudar a dos autores a utilizarlo.

**Nivel 2 — Mecanismo.** Detecta una incompatibilidad, propone opciones, acuerda responsables, publica un contrato y observa adopción con evidencia. **Recuperación:** ¿escribir más código individual prueba mayor alcance Staff? **Respuesta:** no; la influencia y el resultado compartido requieren pruebas distintas.

**Nivel 3 — Profundización (opcional).** El título no certifica competencia; diferenciar propuesta de adopción real evita atribuir liderazgo no observado. Tipo: decisional; objetivo: formular evidencia; técnica: análisis de caso; fuente [P1]; revisión: documentar decisión y feedback real. Interacción: no aplica.

#### `role.principal` — Alcance Principal

**Nivel 1 — Fundamento.** En el modelo del programa, Principal agrega decisiones y dirección técnica a escala de varios sistemas, con consecuencias de evolución y gobernanza explícitas [P1]. Ejemplo: evaluar si el contrato bilingüe de P0 puede sostener los 120 capítulos sin imponer una herramienta obligatoria a proyectos ajenos.

**Nivel 2 — Mecanismo.** Identifica alternativas, restricciones y costos de migración; pacta una regla revisable y observa si múltiples equipos/sistemas pueden seguirla. **Recuperación:** ¿decidir un framework para una sola página prueba impacto Principal? **Respuesta:** no; harían falta alcance, adopción y resultados pertinentes.

**Nivel 3 — Profundización (opcional).** El alcance depende de organización y contexto; aquí es objetivo de aprendizaje, no pronóstico de carrera. Tipo: decisional; objetivo: comparar radio de decisión; técnica: matriz de alcances; fuente [P1]; revisión: contrastar decisión P0 y su evolución en PA-S002. Interacción: no aplica.

### Carril Frontend Platform Architecture (FPA)

#### `fpa.frontend-platform` — Arquitectura de plataforma frontend

**Nivel 1 — Fundamento.** Es el diseño de capacidades frontend compartidas, sus contratos, consumidores y evolución: por ejemplo, shell de navegación, esquema de sesión, tema, componentes accesibles y compilación de diagramas. Es una **síntesis del programa** sobre plataforma [R4], arquitectura [R2] y accesibilidad [R5]. Una página de marketing aislada puede usar un componente compartido sin convertirse por ello en plataforma.

**Nivel 2 — Mecanismo.** El capítulo define IDs de secciones; el renderer produce navegación y HTML; el estado de estudio usa IDs estables en ambos idiomas, mientras los registros de dominio quedan separados. Una traducción cambia texto visible, no claves persistidas. **Recuperación:** ¿guardar una casilla marcada debe incrementar L1–L5? **Respuesta:** no; seguimiento de estudio y evidencia de dominio tienen contratos distintos [P1].

**Nivel 3 — Profundización (opcional).** Considera fallo de JavaScript, compatibilidad de esquema, foco, contraste y peso de scripts; no declare “accesible” una página solo por pasar un escáner. Tipo: estructural/procedimental; objetivo: seguir contrato autor→lector; técnica: diagrama y prueba de teclado; fuentes [R2, R4, R5, P1]; revisión: segunda sesión bilingüe. Interacción: selector de idioma para ver que ID y estado permanecen, únicamente si el sitio implementa la persistencia real; alternativa sin JS: tabla de IDs.

### Carril AI Product Engineering (AIPE)

#### `aipe.ai-product` — Ingeniería de producto con inteligencia artificial

**Nivel 1 — Fundamento.** Trata una función de IA como parte de un flujo de producto con contexto de uso, entradas permitidas, salida, riesgos y evaluación; el marco voluntario AI RMF del NIST organiza la gestión en Govern, Map, Measure y Manage [R7]. Ejemplo **hipotético**: un resumen asistido de un caso público del portafolio; no existe evidencia de que P0 lo tenga o lo necesite.

**Nivel 2 — Mecanismo.** 📥 **Entrada:** texto público elegido por el usuario; ⚙️ **Proceso:** un servicio delimita datos, solicita una propuesta al modelo, valida forma y permite revisión humana; 📤 **Resultado:** borrador etiquetado para aprobar o descartar, no una afirmación publicada automáticamente. **Recuperación:** ¿una respuesta fluida acredita exactitud? **Respuesta:** no; verifica contra el texto fuente y casos de prueba pertinentes [R7].

**Nivel 3 — Profundización (opcional).** Salidas pueden variar y contener datos incorrectos; delimitar privacidad, fallos, costo y evaluación antes de un despliegue. Tipo: causal/decisional; objetivo: distinguir demostración de producto; técnica: recorrido de fallo y decisión con criterios; fuentes [R7, R8]; revisión: solo si aparece un caso de uso real. Interacción: no aplica ahora; no hay modelo ni dataset aprobado para simular calidad.

### Mecanismo de aprendizaje y evidencia (auxiliar, separado de los carriles)

#### `learning.evidence` — Evidencia y estado de estudio

**Nivel 1 — Fundamento.** En el programa, evidencia es un artefacto o una observación trazable a una afirmación de capacidad; una casilla de ejercicio indica actividad declarada, no resultado validado [P1]. Ejemplo: “leí sobre navegación por teclado” es estado de estudio; registro de prueba y revisión humana de la ruta es evidencia.

**Nivel 2 — Mecanismo.** Registrar `PA-S001.exercise.boundary-map = checked` altera solamente el almacenamiento de estudio. Una referencia a prueba real y su resultado se registra por otro canal; el dashboard no deriva dominio de la casilla. **Recuperación:** ¿marcar la checklist otorga L2? **Respuesta:** no; L2 exige implementar y mostrar evidencia distinta.

**Nivel 3 — Profundización (opcional).** Sin artefacto o criterio observable, el nivel queda pendiente; también cabe “no se puede determinar”. Tipo: conceptual/decisional; objetivo: separar estados; técnica: clasificación y feedback; fuente [P1]; revisión: tras construir y revisar. Interacción: controles de estudio reversibles porque la variable es declaración de seguimiento; sin JS mostrar estado no editable, sin falsas afirmaciones.

#### `learning.levels` — Niveles L1–L5

**Nivel 1 — Fundamento.** El programa distingue L1 Explicar, L2 Implementar, L3 Operar, L4 Decidir y L5 Liderar [P1]. No son porcentajes ni equivalen a las tres **capas de lectura** de un concepto. Ejemplo: explicar por qué un mapa distingue sitio y portafolio puede apoyar L1, pero no prueba que esa frontera se aplique en código.

**Nivel 2 — Mecanismo.** Para L2 se inspecciona implementación y pruebas; para L3 incidentes/operación observados; para L4 alternativas y resultados de decisión; para L5 adopción e influencia comprobadas. **Recuperación:** ¿un tutorial completado demuestra L5? **Respuesta:** no; cada nivel exige evidencia diferente.

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

**Pregunta guía:** ¿cómo separar responsabilidades desde el primer corte sin convertir una carpeta en una “plataforma” imaginaria? **Definición y alcance:** arquitectura inicial significa elegir elementos, interacciones y principios revisables que permitan entregar el portafolio y publicar teoría bilingüe [R2, P1]. La necesidad compartida es una entrega comprobable; las restricciones incluyen contenido disponible sin JavaScript y no inventar evidencias. El mapa se construye después de las definiciones individuales anteriores:

| Elemento | Propósito inmediato | Consumidor / límite | Cambio que debería contener |
|---|---|---|---|
| Aplicación `apps/portfolio/` | Presentar trabajo profesional | Visitantes, enlaces públicos | Una nueva ficha profesional |
| Sistema de publicación `site/` | Publicar capítulos ES/EN | Aprendiz y lector | Nuevo concepto o cita |
| Plataforma editorial potencial | Esquema y renderer reutilizables | Sesiones posteriores | Nueva sesión sin duplicar renderer |
| Ecosistema P0 | Personas, repositorio, hospedaje, navegador | Varios actores | Cambio de norma o servicio externo |

**Ejemplo resuelto.** Si cambia el texto ES de una sesión, el autor edita el contenido ES; el renderer conserva el mismo ID en EN y el portafolio permanece igual salvo que quiera actualizar un enlace. Si un cambio de traducción reinicia checkboxes, el ID dependía probablemente del texto traducido: la frontera entre presentación y seguimiento quedó mal elegida. La arquitectura propuesta se contrasta inspeccionando código y HTML; hoy es **diseño, no resultado probado**.

**Contraejemplo.** Declarar “microservicios para todos” sin requisito operativo introduce despliegue, contratos y fallos adicionales. También es insuficiente poner ambos productos en carpetas separadas si intercambian datos internos sin contrato. El coste de una frontera se paga en integración; el de no definirla aparece al propagar cambios. **Respuesta a la pregunta guía:** partir de responsabilidades y contratos verificables, compartir una capacidad después de observar consumidores reales, y revisar las dependencias tras el primer corte.

## Subtemas

### `sub.software-vs-architecture` — Ingeniería de software y arquitectura

**Pregunta guía:** ¿qué decide cada una cuando añadimos una sesión? Ingeniería cubre requisito, diseño, implementación, prueba y mantenimiento [R1]; arquitectura concentra elementos y relaciones que afectan el cambio [R2]. Ejemplo: que el enlace abra una página es un comportamiento a verificar; que cada sesión use un esquema común es decisión estructural. **Mecanismo:** cambiar un campo del esquema obliga a migrar todos los consumidores, mientras una corrección tipográfica local no debería hacerlo. Un diagrama correcto pero sin test de enlaces no entrega el comportamiento; una página que “funciona” sin contrato puede ser difícil de extender. **Trade-off:** documentar toda decisión es costoso; registra las que afectan consumidores o calidad. **Recuperación:** ¿el build en verde prueba idoneidad arquitectónica? **Respuesta:** no, solo las propiedades cubiertas por esas pruebas. **Resolución:** ingeniería gestiona el ciclo completo; arquitectura examina la estructura y evolución dentro de él.

### `sub.scope-layers` — Aplicación, sistema, plataforma y ecosistema

**Pregunta guía:** ¿son cuatro tamaños crecientes del mismo objeto? No: son **perspectivas distintas**. La aplicación identifica experiencia; el sistema define elementos para analizar un propósito; la plataforma ofrece capacidades con consumidores; el ecosistema incluye también agentes y dependencias externos. En P0 una app de portafolio puede ser parte del sistema de entrega pública, el sitio puede ofrecer capacidad editorial para múltiples sesiones y el entorno de hospedaje influye sin ser módulo interno. **Contraejemplo:** llamar “plataforma” a un botón compartido no establece producto, soporte ni consumidores. **Trade-off:** ampliar el sistema bajo estudio revela interacciones pero vuelve más complejas las pruebas. **Recuperación:** ¿se puede ser sistema sin ser plataforma? **Respuesta:** sí; un conjunto de elementos puede cumplir un propósito sin ofrecer autoservicio reusable. **Resolución:** elige cada término según la pregunta y dibuja qué incluye la frontera.

### `sub.quality-constraints` — Atributos de calidad y restricciones

**Pregunta guía:** ¿cómo se decide si una interfaz “es buena”? Separa propiedad deseada, escenario verificable y condición obligatoria. ISO ofrece un modelo de calidad [R3]; W3C especifica criterios de accesibilidad [R5]; el proyecto pide acceso sin JavaScript [P1]. **Ejemplo resuelto:** “el índice se opera con teclado en teléfono” define situación, acción y observación; “contenido legible sin JS” condiciona la solución. Prueba con teclado y revisión HTML dan evidencia limitada a esos escenarios, no certificación universal. **Fallo:** una puntuación inventada de “95% de dominio” confunde calidad de interfaz con evidencia del aprendiz. **Trade-off:** validar más escenarios consume tiempo; prioriza requisitos explícitos y riesgos. **Recuperación:** ¿un atributo es una implementación? **Respuesta:** no; varias soluciones pueden satisfacerlo. **Resolución:** formula un criterio comprobable y registra la restricción que limita opciones.

### `sub.boundary-dependencies` — Fronteras, acoplamiento y cohesión

**Pregunta guía:** ¿qué se rompe cuando el límite está mal ubicado? La frontera define contrato; el acoplamiento expone dependencias a cambios; la cohesión pregunta si el módulo reúne motivos de cambio relacionados [R1, R2]. **Ejemplo resuelto:** separar `session-renderer` de `portfolio-contact` limita la propagación de un cambio de cita. **Ejemplo atenuado:** imagina que la traducción cambia un ID de ejercicio; anota qué almacenamiento y páginas se afectarán antes de mirar la solución: si el ID proviene del texto, ambos estados divergen; un ID semántico compartido mantiene la clave. **Fallo:** separar cada línea en un paquete nuevo aumenta interfaces sin crear responsabilidades coherentes. **Recuperación:** ¿un enlace público entre productos viola la frontera? **Respuesta:** no si el contrato es intencional. **Resolución:** usa motivos de cambio y pruebas de contrato para ubicar los límites.

### `sub.frontend-platform` — Primer corte de plataforma frontend

**Pregunta guía:** ¿qué se comparte desde PA-S001? Comparte el mecanismo que varias sesiones deben usar: shell semántico, navegación por fase, plantilla de capítulo, IDs estables, tema, construcción de SVG y controles de estudio [P1]. `apps/portfolio/` sigue como producto distinto. **Mecanismo:** contenido canónico → validación → HTML y SVG accesibles → estado local de estudio; los registros L1–L5 proceden de evidencias distintas. **Fallo:** checkboxes `disabled`, tarjetas cuyo reverso solo existe tras JS o mermaid sin compilar incumplen el contrato. **Trade-off:** mantener un esquema común obliga a migrar consumidores cuando evoluciona. **Recuperación:** ¿un dashboard vacío debe inventar avances? **Respuesta:** no; debe expresar “sin evidencia registrada”. **Resolución:** comparte una base mínima usable y amplíala desde casos reales.

### `sub.ai-product` — Límite de una función de IA

**Pregunta guía:** ¿hace falta IA para el primer corte? No hay requisito verificado; una propuesta se evalúa por caso de uso, datos, riesgo, pruebas y revisión de salida [R7, P1]. **Ejemplo hipotético:** si más adelante se quiere resumir un caso de estudio público, fija texto permitido y salida de borrador; comprueba citas contra fuente y habilita rechazo humano. **Fallo:** publicar un resumen no revisado como hecho o enviar datos privados a un proveedor sin decisión explícita. **Trade-off:** automatización posible frente a variabilidad, riesgo y costo por comprobar. **Recuperación:** ¿un prototipo convincente prueba aptitud para producción? **Respuesta:** no; faltan evaluaciones y condiciones de operación. **Resolución:** PA-S001 fija la frontera conceptual y registra la función como no implementada.

### Síntesis entre dominios (después de los tres carriles)

Staff→Principal define quién argumenta y revisa decisiones de alcance; FPA define contratos compartidos y comportamiento del navegador; AIPE agrega control de entradas, variabilidad de salidas y evaluación únicamente si hay una función real. La relación es una **síntesis de diseño**: un criterio de publicación accesible afecta tanto el capítulo como cualquier borrador generado, pero un resultado de IA no convierte por sí solo una app en plataforma.

## Mapa de teoría a práctica

| Conceptos | Trabajo posterior | Señal observable |
|---|---|---|
| `scope.*`, `design.*` | Dibujar frontera P0 y comprobar imports | grafo y diff comparables |
| `quality.*`, `fpa.frontend-platform` | Probar rutas ES/EN, teclado, no-JS y móvil | reporte de pruebas efectivas |
| `aipe.ai-product` | Evaluar propuesta antes de integrar proveedor | decisión con caso de uso y riesgos |
| `learning.*`, `role.*` | Separar seguimiento de estudio y evidencia | datos y argumentos revisables |

## Tiempo estimado

La estimación se distribuye como guía: lectura y recuperación 60–90 min; mapa y decisión 40–60 min; primer corte y pruebas 80–130 min; reflexión 20–30 min. Suma mínima = 60+40+80+20 = **200 min (3 h 20 min)**; suma máxima = 90+60+130+30 = **310 min (5 h 10 min)**. Dependerá del estado real del repositorio y no representa tiempo medido.

## Ejemplo del mundo real

**Caso documentado, no evidencia sobre P0.** El white paper de CNCF presenta plataformas internas como capacidades consumibles por equipos y enfatiza autoservicio [R4]. Trasladado **por analogía de diseño** al sitio: las sesiones son consumidores del contrato editorial, no equipos de producto necesariamente independientes. La analogía falla si ninguna segunda sesión usa el renderer o si se impone una abstracción que no reduce trabajo real. Verificar valor exige observar uso y mantenimiento; la fuente no garantiza mejora en este proyecto.

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

**Mapa conceptual que deberá compilarse como SVG:** `engineering.software → engineering.architecture → {scope.application, scope.system, scope.platform, scope.ecosystem} → {quality.attribute, quality.constraint, design.boundary, design.coupling, design.cohesion, role.staff, role.principal}`; ramas independientes `fpa.frontend-platform` y `aipe.ai-product`; rama auxiliar `learning.evidence, learning.levels`; nodos `main.p0-boundaries` y los seis `sub.*`. Las flechas significan “se estudia antes de integrar”, no causalidad física. La fuente de cada nodo es el apartado con el mismo ID.

**Tarjetas de recuperación:** una tarjeta por cada uno de los 17 IDs de `Conceptos`, por `main.p0-boundaries` y por cada uno de los seis `sub.*`: **24 tarjetas en total**. Cada frente reutiliza la pregunta de recuperación o pregunta guía del apartado; cada reverso conserva respuesta y explicación. La cobertura se vincula al ID de origen y no reemplaza su texto. Prev/sig, volteo, contador, teclado, táctil, movimiento reducido y respuestas legibles sin JavaScript son requisitos de la publicación [P1].

**Modo adicional justificado:** mapa de fronteras y propagación del cambio basado en `design.boundary`, `design.coupling` y `sub.boundary-dependencies`; entrada X = elegir una dependencia declarada, salida Y = resaltar consumidores alcanzables conforme a ese grafo. No promete medir calidad ni representar el repo antes de inspeccionarlo. Alternativa accesible: tabla de aristas y consecuencias. No se requiere otro widget.

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

Se podrá revisar un mapa de límites con contratos nombrados, el primer corte ejecutable de portafolio y sitio ES/EN, una prueba de teclado/no-JS y el registro de lo que sí se ejecutó. **No se atribuye cumplimiento ahora:** el repositorio real no se entregó en este chat y `07-PROGRESS` marca “Not started”. L1–L5 se registran solo después de evidencia independiente: explicar, implementar, operar, decidir y liderar son afirmaciones diferentes [P1].

## Puente a PA-S002

La siguiente sesión examina si el mismo repositorio necesita workspaces, paquetes y reglas de dependencia. Recupera primero el caso “carpeta ≠ frontera” y verifica con el grafo de importaciones si los límites propuestos sobrevivieron al primer corte.
