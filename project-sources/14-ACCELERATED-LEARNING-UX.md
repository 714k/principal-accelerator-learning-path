# Experiencia de aprendizaje acelerado — v13

**Contrato v13 vigente:** Sources 18 (orden y alcance), 19 (HTML incremental), 20 (validación no bloqueante), 21 (entregables), 22 (profundidad) y 17 (Studio 5/3/5) prevalecen sobre cualquier formulación anterior incompatible. No comprimir capítulos ni impedir crear, revisar, editar, traducir o consolidar por estados previos. Las puertas de aprobación/pruebas son exclusivamente de publicación canónica.


## Principios comunes sin UI idéntica

La persona debe comprender rápido **sin sustituir la profundidad**. Abrir con síntesis de tres puntos, señalización selectiva de ideas importantes y preentrenamiento breve de vocabulario. Mantener explicaciones autosuficientes de cómo operan los mecanismos reales y variación de recursos según tipo de concepto. El fin no es aumentar velocidad aparente, sino reducir barreras y permitir transferencia.

## Lectura progresiva interna

La pedagogía puede organizarse internamente como explicación accesible, mecanismo profundo y profundización opcional; **NO imprimir etiquetas «Nivel 1/2/3» como títulos visibles**. Usar títulos naturales cuando ayuden: «Concepto», «Cómo funciona», «Ejemplo resuelto», «Qué sucede cuando falla», «Profundización». La parte sustancial siempre legible sin JS; detalles opcionales accesibles con `details/summary` u opción equivalente compatible con teclado, touch y reduced-motion.

## Explicación y señalización

Una idea dominante por párrafo, primeras palabras útiles en negritas solo cuando aporten orientación, términos definidos antes de uso. Evitar repetir el objetivo («Comprender cómo…») como si fuera un mecanismo. Las entradas y salidas de una secuencia deben tener ejemplos reales de contratos/estado, no solo flechas sin comportamiento. La notación causa→proceso→efecto solo para relaciones realmente causales; diagramas de estructura no requieren flechas causales artificiales.

Glosas de contexto con máximo **10 palabras**, dentro del texto y accesibles al teclado/touch; sin parsear bloques de código ni URL. Si no se justifica la anotación, definir el término en prosa normal. Los IDs de metadata son invisibles para lector y no forman parte del título.

## Formatos aptos para cada objetivo

- Contraste conceptual: tabla comparativa con explicación de límites/no-ejemplos.
- Estructura: diagrama de fronteras/dependencias/estados con relaciones etiquetadas.
- Causalidad: secuencia o flujo de datos con entrada, transformación, condiciones y fallo.
- Procedimiento: ejemplo resuelto y luego práctica con menor guía.
- Decisión: alternativas, restricciones, matriz y escenario de transferencia.

El Visual Learning Studio obligatorio tiene mind map con cobertura completa de Conceptos/Tema/Subtemas y flashcards con preguntas, explicaciones y referencias; las visualizaciones que enseñan un mecanismo se colocan además **junto al texto**. Simuladores adicionales solo si X, mecanismo, Y, límites y fuente son explicables y verificables. No construir un widget inerte como decoración.

## Verificación editorial

Comprobar con muestra humana: ¿un ingeniero que desconoce el capítulo puede reproducir el mecanismo sin adivinar? ¿La fuente respalda la atribución? ¿La pregunta de recuperación evalúa el concepto enseñado y la respuesta responde exactamente? ¿El diagrama está explicado? ¿Se distingue la hipótesis de los resultados observados? Sin ello, no publicar aunque haya HTML correcto.

## v11 — Visualización local por capítulo, sin duplicación ornamental

**Cada Tema principal y Subtema abre con síntesis propia** de tres ideas en 30 segundos. El recorrido inicial de conceptos es **vertical** y agrupado visualmente por Staff→Principal, Arquitectura de Plataforma Frontend e Ingeniería de Producto con IA, sin presentar dichos carriles como una tabla de tres columnas. Evitar repetir varias veces `Fase N · PA-Sxxx`: mostrar una única etiqueta contextual.

**Conceptos del tema principal / Conceptos del subtema N** son encabezados literales y localizados. Cada entrada une término, definición sencilla y ejemplo pertinente. No envolver la entrada en comillas angulares.

**El capítulo integra visualizaciones locales**: un diagrama Mermaid→SVG propio con pie y explicación, y los recursos interactivos mínimos definidos en v13 (comparación estructural, línea de estados, predecir/revelar con respuesta, explorador de incompatibilidades, trazado de impacto o matriz de decisión). Cada capítulo incluye también ejercicio resuelto, tarjetas de estudio y recursos que se relacionen con ese mecanismo. Studio global = consolidación e interconexión, no depósito exclusivo de materiales visuales.

Cada recurso tiene texto explicativo y controles accesibles; sin JS la teoría, respuestas, diagramas y enlaces deben permanecer disponibles. No forzar múltiples simuladores si solo repetirían el texto.

## v13 — Estándar visual interactivo obligatorio en HTML y site

**Consulta obligatoria:** `17-VISUAL-LEARNING-STUDIO-INTERACTIVE.md` es el contrato detallado de generación, comportamientos, renderizado y aceptación. Esta sección complementa su UX; no reemplaza su lectura íntegra.

**Mínimos obligatorios v13:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional exige los cinco modos integradores de cobertura integral (5/3/5; 10 + 3N como mínimo). Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.

### Comportamiento verificable de cada recurso

1. **Mapa mental:** grafo de nodos y ramificaciones etiquetadas; al seleccionar nodo, resaltarlo y mostrar definición, ejemplo y relaciones/fuentes del concepto. Navegación por teclado/touch, no lista estática que simula grafo.
2. **Flashcards:** tarjetas individuales (nunca tabla), pregunta, giro/revelado, anterior/siguiente y contador; respuesta explicada y referencias; cubrir los conceptos locales.
3. **Simulador:** controles de escenario/variables modificables; grafo, estados y salidas que reaccionan inmediatamente; explicar mecanismo y consecuencias, éxito/error/límites aplicables; transparentar unidades, fórmula, entradas e hipótesis.
4. **Explorador de arquitectura:** grafo de componentes/capas/servicios/conexiones etiquetadas; selección y resaltado de componente y dependencias; panel dinámico de responsabilidades, entradas/salidas, contratos y decisiones.
5. **Matriz de decisión:** criterios y pesos ajustables, alternativas contextualizadas, puntuaciones base y cálculo transparente (ponderación normalizada o fórmula declarada), comparación gráfica/barras y ranking recalculados; supuestos, trade-offs y caso de pesos nulos explícitos.

Cada widget incluye instrucciones de uso, estado inicial, controles reales y feedback que varía con la interacción. Adaptar al conocimiento, no repetir el mismo dato sin valor. No inventar métricas de empresa, etiquetar escenarios hipotéticos. Mostrar aquí en conversación componentes visuales funcionales, no código fuente ni instrucciones para Codex en su lugar; cuando el cliente no los soporte, declarar qué quedó sin entregar. En el site conservar fallback accesible sin JS, pero no contabilizarlo como interacción. Verificar antes de presentar como completo (Source 13).
