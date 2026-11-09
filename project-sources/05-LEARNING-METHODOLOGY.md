# Metodología académica y aprendizaje profundo (v10)

## Autoría en secciones; el conocimiento no se produce a partir de etiquetas

El índice de la sesión es un contrato de cobertura y orden, no la lección. El contenido se desarrolla en bloques aprobados por el estudiante: Tema principal, cada Subtema, casos, ejemplo de producción, práctica y materiales. Se garantiza la preservación del texto aceptado, no una reescritura automática de contenidos al preparar la página.

## Conceptos atómicos y conceptos locales

Un epígrafe compuesto como «Aplicación, sistema, plataforma y ecosistema» exige cuatro definiciones conceptuales independientes, cada una **con mecanismo, ejemplo propio, contraejemplo y preguntas**, antes de comparar categorías. Los conceptos también se enseñan en el Tema principal y en cada Subtema donde se usan, incluso si ya tuvieron una introducción en «Conceptos». Repetir el mismo glosario sin explicar el nuevo mecanismo es incumplimiento.

El manifiesto técnico conserva identificadores semánticos estables ES/EN y referencias; la persona solo ve **término y explicación normal**. El inventario editorial inicial utiliza **«Aplicación: software que ...»** y NO «Aplicación (scope.application)». Preguntas, flashcards y tarjetas visibles tampoco imprimen IDs técnicos.

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
