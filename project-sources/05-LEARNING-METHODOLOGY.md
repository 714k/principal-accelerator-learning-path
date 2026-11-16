# Metodología académica y aprendizaje profundo (v13)

**Contrato v13 vigente:** Sources 18 (orden y alcance), 19 (HTML incremental), 20 (validación no bloqueante), 21 (entregables), 22 (profundidad) y 17 (Studio 5/3/5) prevalecen sobre cualquier formulación anterior incompatible. No comprimir capítulos ni impedir crear, revisar, editar, traducir o consolidar por estados previos. Las puertas de aprobación/pruebas son exclusivamente de publicación canónica.


## Autoría en secciones; el conocimiento no se produce a partir de etiquetas

El índice de la sesión es un contrato de cobertura y orden, no la lección. El contenido se desarrolla en bloques aprobados por el estudiante: Tema principal, cada Subtema, casos, ejemplo de producción, práctica y materiales. Se garantiza la preservación del texto aceptado, no una reescritura automática de contenidos al preparar la página.

## Conceptos atómicos y conceptos locales

Un epígrafe compuesto como «Aplicación, sistema, plataforma y ecosistema» exige cuatro definiciones conceptuales independientes, cada una **con mecanismo, ejemplo propio, contraejemplo y preguntas**, antes de comparar categorías. Los conceptos también se enseñan en el Tema principal y en cada Subtema donde se usan, incluso si ya tuvieron una introducción en «Conceptos». Repetir el mismo glosario sin explicar el nuevo mecanismo es incumplimiento.

El manifiesto técnico conserva identificadores semánticos estables ES/EN y referencias; la persona solo ve **término y explicación normal**. El inventario editorial inicial utiliza **Aplicación: software que ...** y NO `Aplicación (scope.application)`. Preguntas, flashcards y tarjetas visibles tampoco imprimen IDs técnicos.

## Calidad de una mini-lección

Una explicación cumple si responde, con precisión y lenguaje comprensible:

1. ¿Qué es el concepto y qué queda fuera de su alcance?
2. ¿Qué problema técnico específico motiva su empleo?
3. ¿Qué elementos reales participan: función, componente, interfaz, servicio, tabla, evento, usuario o proveedor?
4. ¿Qué dato o control entra y en qué estado? ¿Qué regla, dependencia o contrato lo transforma? ¿Cuál es el resultado observable?
5. ¿Qué pasa cuando cambia la entrada, un consumidor o falla la dependencia? ¿Cómo se propaga el fallo y qué estado debe permanecer válido?
6. ¿Qué alternativa existe, cuáles son sus ventajas y costes y qué restricciones cambian la decisión?
7. ¿Cómo puede comprobarse en código, prueba, traza, arquitectura o una fuente primaria?
8. ¿Qué pregunta de recuperación específica exige aplicar el mecanismo y cuál es la respuesta explicativa?

**No responder con repeticiones teleológicas** como «comprender cómo la petición llega al usuario». Una explicación del router debe indicar ruta real de ejemplo, quién navega, contrato de matching, componente seleccionado, fallos (no route, deep link, auth), modificación de URL y pruebas. Etiquetar el ejemplo como hipotético salvo fuente real.

## Tres carriles de profundidad profesional

Staff → Principal: ingeniería y decisiones, límites, calidad, operación, influencia y gobierno (evitar afirmar que roles son universales). FPA: navegador, renderización, componentes, plataforma, consumidores y arquitectura de experiencia. AIPE: producto con IA, contratos, variabilidad, retrieval, evaluation, seguridad y operación. Enseñar primero por separado y realizar síntesis únicamente si existe relación técnico-organizacional real. No exigir un concepto en los tres carriles si solo pertenece a uno.

## Selección adaptativa según tipo de conocimiento

- **Conceptual:** definición y contraste; contraejemplos/malentendidos; recuperación de distinciones.
- **Estructural:** mapa de dependencias o límites, relaciones etiquetadas, propagación de cambio.
- **Causal:** predecir→revelar y explicar estado/entrada→mecanismo→resultado→fallo.
- **Procedimental:** ejemplo trabajado→ejercicio con guía decreciente→resolución autónoma.
- **Decisional:** matriz de opciones, supuestos, restricciones, trade-offs, casos de transferencia y defensa.

Estas son opciones, no componentes de UI obligatorios. Una interacción se agrega solo si hace visible una consecuencia real fundamentada. Todo widget tiene fallback textual y acceso por teclado/touch. No fingir dinámica, cifras o evidencias.

## Ejemplos y rigor epistemológico

- **Fundamento/definición**: de normas y literatura profesional/academia; los estándares ISO pueden tener contenido no accesible públicamente: no atribuirles cláusulas sin comprobar.
- **Ejemplo conceptual**: escenario construido de un dominio externo al proyecto; decirlo claramente y mostrar contratos, secuencia, fallos y verificación.
- **Caso real**: publicación oficial específica de entidad real, qué hace y qué no evidencia, fecha/edición cuando disponible, fuente junto al mecanismo. CNCF «así es una plataforma» NO equivale a caso observado de Netflix o Google.
- **Ejemplo de producción**: diseño de referencia con API, estados, seguridad, operación, verificación; nunca llamar producción probada hasta ejecutar pruebas verificables.
- **Transferencia**: solo aquí se usan detalles de `apps/portfolio/`, `site/`, Storybook del Accelerator o sus sesiones.

## Filtros editoriales antiabstracto

Rechazar párrafos sin actores/datos/mecanismo, «mecanismo resuelto» sin ejecución explicada, efectos sin contrato, diagramas decorativos, etiquetas de niveles pedagógicos impresas, listas sin narrativa, vocabulario sin definición, flashcards cuyo reverso no responde a la pregunta y ejemplos del proyecto usados como fuente académica. Exigir una inspección humana además de regex/tests.

## Repaso y evidencia

Cada concepto importante incluye recuperación con solución y oportunidad futura de revisión. Estudiar, responder preguntas o marcar casillas puede registrar actividad; mastery L1–L5 se atribuye solo con evidencia separada. Aprobación editorial ≠ dominio.

## v11 — Distribución de aprendizaje a escala de capítulo

Cada Tema principal y Subtema es un capítulo autosuficiente, no un fragmento de una única sección «ejercicios/flashcards/resources» situada al final. Debe contener tres ideas de síntesis local, conceptos con definición y **un ejemplo distinto y pertinente por concepto**, una visualización diagramática obligatoria (sin datos inventados), ejercicios resueltos, tarjetas con respuestas, recursos de esa sección y su propio Studio. Las secciones globales de la sesión reúnen cobertura y repaso, sin borrar ni duplicar automáticamente los materiales locales.

Los ejemplos de un concepto deben mostrar por qué lo representan: **actor + operación concreta + objeto/estado + resultado** según el tipo de conocimiento. Un ejemplo de *ownership* muestra quién revisa o mantiene; uno de *compatibilidad* muestra qué contrato anterior sigue funcionando; uno de *excepción* muestra desviación, plazo y responsable. Si no se puede explicar esa vinculación, revisar el ejemplo.

La vista previa presenta un **recorrido vertical**, con grupos de ámbito profesional separados; no usar carruseles, rejillas horizontales ni tablas multicolumna para la secuencia conceptual. Tablas comparativas dentro de la explicación sí son admisibles cuando aportan contraste.

Variar los elementos visuales **por objetivo didáctico**: en un capítulo estructural, mapa de dependencias + comparación; en uno causal, diagrama de secuencia + predecir/revelar; en uno procedimental, ejemplo trabajado + pasos incompletos; en uno decisional, matriz + escenarios de elección. Todo recurso incluye su premisa, mecanismo, límite y respuesta/interpretación, sin simular aprendizaje medido.

## v13 — Enseñanza local y recursos funcionales

Todos los conceptos globales y locales, incluso en el inventario, se organizan verticalmente por Staff → Principal, FPA y AIPE (indicar cuando no aplique). Cada entrada es `Concepto: definición` y un párrafo independiente `Ejemplo:` propio y contextualizado en software; nunca tabla, grid horizontal, comillas angulares o ID visible. Flashcards individuales, nunca tablas.

**Mínimos obligatorios v13:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional exige los cinco modos integradores de cobertura integral (5/3/5; 10 + 3N como mínimo). Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.

Cada recurso reutiliza un mecanismo, ejemplo o decisión concreta del capítulo; no sustituye la teoría. Elegir escenarios verificables o hipotéticos etiquetados, no inventar métricas ni usar herramientas decorativas.
