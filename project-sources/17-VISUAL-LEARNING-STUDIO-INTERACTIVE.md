# Source 17 — Visual Learning Studio interactivo (v14)

**Contrato v14 vigente:** Sources 23 (generación integral), 18 (orden y alcance), 19 (HTML incremental), 20 (validación no bloqueante), 21 (entregables), 22 (profundidad) y 17 (Studio 5/3/5) prevalecen sobre cualquier formulación anterior incompatible. No comprimir capítulos ni impedir crear, revisar, editar, traducir o consolidar por estados previos. Las puertas de aprobación/pruebas son exclusivamente de publicación canónica.


**Contrato obligatorio, no opcional.** Aplicar a las 120 sesiones del Principal Accelerator Learning Path, a partir de su inventario editorial, sus temas principales, cada subtema, el Studio global y su publicación futura en Learning Site. Source 16 gobierna el flujo de revisión y aprobación; Source 17 gobierna la generación y aceptación de recursos interactivos. Source 14 aporta metodología y UX, Source 13 auditoría, Source 06 estándares técnicos. Este archivo no altera teoría aprobada, roadmap, aplicaciones ni evidencias.

## 1. Instrucción de ejecución

Antes de responder a cualquier solicitud de sesión, tema principal, subtema o Visual Learning Studio, consultar íntegramente este Source. No esperar que el estudiante repita el prompt. Si no está disponible, indicar la limitación y no afirmar cumplimiento.

- Si el mensaje es solo `PA-Sxxx`, generar los Studios de cada capítulo y el global dentro del HTML integral (Source 23). Solo introducción/modo progresivo explícito se detiene en 1–6.
- Cuando se solicita Tema principal o Subtema N, desarrollar exclusivamente ese capítulo y **incorporar recursos interactivos funcionales al HTML de la sesión**, integrados en su Studio local. No entregar código, promesas ni instrucciones de construcción en su lugar.
- Si se solicita explícitamente generar o regenerar solo el Visual Learning Studio, mostrar exclusivamente el Studio del capítulo solicitado; preservar intacta la teoría previamente aprobada, sin regenerar la sesión ni anticipar Codex.
- En el handoff autorizado, Codex implementa los comportamientos aprobados en el Learning Site ES/EN con paridad funcional, preservación de teoría y accesibilidad.

## 2. Cantidades y cobertura obligatorias

| Bloque | Tipo y mínimo |
| --- | --- |
| Tema principal | Cinco recursos distintos: mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión. |
| Cada subtema | Tres recursos distintos como mínimo: mapa mental, flashcards y al menos un simulador, explorador o matriz según el objetivo. |
| Studio global | Adicional a todos los locales: los cinco modos funcionales integradores que cubran la sesión completa. |

Una baraja y un mapa cuentan como un recurso cada uno. Agregar más cuando mejoren el aprendizaje; no imponer cantidad de tarjetas o nodos. Recursos genéricos, repetidos sin adaptar, diagramas estáticos, tablas estáticas, código, especificaciones y fallback sin JS **no cuentan**. No sustituir diagramas técnicos explicativos junto al mecanismo por Studio.

## 3. Comportamiento de los cinco recursos

### 3.1. Mapa mental interactivo

- Grafo de nodos y ramificaciones que representen relaciones reales entre conceptos de la sección.
- Los nodos deben poder seleccionarse por clic/toque y teclado; resaltar el nodo activo y sus relaciones pertinentes.
- Panel dinámico con definición, ejemplo de software, relaciones y referencias del concepto seleccionado.
- Al seleccionar otro nodo, actualizar resaltado y panel de forma observable.
- Finalidad: explorar jerarquías, dependencias y conexiones conceptuales.

**Prueba de aceptación:** seleccionar dos nodos distintos y comprobar que gráfico y panel corresponden al nodo activo, incluida navegación accesible.

### 3.2. Flashcards interactivas

- Tarjetas individuales, nunca tablas: pregunta, respuesta explicada y ejemplo/razonamiento.
- Giro o revelado real de la respuesta; navegación anterior/siguiente y contador de posición/total.
- Cubrir todos los conceptos de la sección, incluyendo distinciones y contraejemplos cuando aporten valor.
- La respuesta no puede ocultar información necesaria en el fallback, ni ser visible como respuesta inicial del juego; la versión accesible sin JS debe permitir consultarla.

**Prueba:** girar una tarjeta, avanzar/retroceder y comprobar contenido, posición, límites de navegación y manejo accesible del estado.

### 3.3. Simulador interactivo

- Controles reales para modificar variables y escenarios, no botones decorativos.
- Diagramas, estados, salidas y resultados reaccionan a los cambios de entrada.
- Explicar dinámicamente las consecuencias técnicas y el mecanismo: por qué la salida cambia.
- Mostrar escenarios de éxito/error/casos límite cuando correspondan; distinguir resultados reales de ejemplos hipotéticos.
- Hacer explícitos datos de entrada, unidades, supuestos, reglas o fórmulas; evitar falsos números de producción.

**Prueba:** modificar una variable y un escenario, comprobar que se actualizan estado, resultado y explicación según el modelo declarado; probar límites y restauración si aplica.

### 3.4. Explorador de arquitectura interactivo

- Representación gráfica etiquetada de componentes, capas, servicios y conexiones reales o hipotéticas declaradas.
- Componentes seleccionables, resaltado del activo y de las dependencias pertinentes.
- Panel dinámico con responsabilidades, contratos, entradas, salidas y decisiones arquitectónicas.
- Mostrar fronteras y dirección de relaciones; no hacer pasar una lista plana por una arquitectura.

**Prueba:** seleccionar componentes diferentes, verificar que se resaltan las dependencias correctas y se actualizan responsabilidades/contratos/datos.

### 3.5. Matriz de decisión interactiva

- Alternativas técnicas reales o escenarios hipotéticos claramente identificados, con criterios relevantes.
- Criterios y pesos modificables, puntuaciones base visibles; explicar su procedencia.
- Calcular puntuaciones dinámicamente; mostrar gráficas/barras comparativas, clasificación y explicación de trade-offs y decisiones resultantes.
- Declarar escala y fórmula (p. ej., promedio ponderado con pesos normalizados); manejar empate, pesos nulos y limitaciones. No presentar el ranking como evidencia empírica si es hipotético.

**Prueba:** modificar pesos o criterios, comprobar que scores, barras y ranking se recalculan según la fórmula y que el caso de pesos nulos se maneja explícitamente.

## 4. Requisitos comunes de todos los recursos

1. Usar conceptos, mecanismos y decisiones específicas de la sección, con relación a AI Product Engineering, Frontend Platform Architecture y Staff Software Engineering cuando aplique.
2. Incluir instrucciones breves de uso y propósito educativo; estado inicial comprensible, controles visibles funcionales y feedback significativo que cambie con las acciones.
3. Permitir explorar, experimentar, analizar y comprender; evitar recursos genéricos o la repetición de mapas mentales y flashcards.
4. Renderizar widgets funcionales en el HTML de aprendizaje (Source 19); en conversación solo cuando sea posible y se solicite. Prohibido sustituir por código fuente, pseudocódigo, diagramas o tablas estáticas, descripción de futuro widget o remisión a Codex.
5. Etiquetar hipótesis y usar fuentes verificadas para atribuciones de empresa. No inventar métricas, arquitecturas empresariales ni resultados.
6. Conservar intacto el contenido aprobado; una regeneración visual no reescribe otros apartados.
7. Accesibilidad: teclado, toque, foco visible, etiquetas legibles, contraste, responsive, reduced-motion. En el site ofrecer fallback no-JS con contenido equivalente; el fallback no cuenta como interacción.
8. Si un recurso no se puede renderizar o su comportamiento no puede verificarse, distinguir lo implementado, lo no probado y lo faltante; no contabilizar como completo lo que no funciona. No afirmar pruebas ejecutadas que no se ejecutaron.

## 5. Definition of Done editorial y funcional

Antes de presentar Studio como completo, revisar intención educativa, cobertura de conceptos, tipos y cantidades, controles, reacción visible, coherencia entre datos/gráfica/panel y feedback. Verificar según capacidades disponibles; declarar limitaciones de renderizado y pruebas pendientes.

- [ ] Tema principal: los cinco tipos funcionales; Subtema: tres como mínimo con la combinación exigida; global adicional con los cinco modos.
- [ ] Cada recurso tiene contenido local pertinente y controles observables, no placeholders.
- [ ] Cada recurso satisface su prueba de aceptación o se identifica expresamente como no verificado/faltante.
- [ ] No se inventaron hechos, resultados ni evidencia.
- [ ] Se conservó teoría aprobada. Si la solicitud era solo Studio, no se emitieron otras secciones.
- [ ] En Learning Site: ES/EN, responsive y accesibilidad evaluadas; reportar pruebas reales, no promesas.

No confundir aprobación editorial, verificación funcional del cliente y dominio del estudiante.

## 6. Prompt de regeneración (reutilizable)

> Genera nuevamente el Visual Learning Studio de la sección actual según Source 17 y Settings v14. Integra al HTML de aprendizaje recursos visuales funcionales: mapa mental con nodos seleccionables y panel dinámico; flashcards que giren, naveguen y muestren contador; simulador de variables/escenarios con resultados reactivos; explorador de arquitectura con dependencias resaltadas y panel de contratos; matriz de decisión con pesos ajustables, scores, gráficas y ranking dinámicos. Tema principal y Studio global: los cinco; cada subtema: mapa, tarjetas y al menos un tercer modo. Sigue íntegramente los requisitos y pruebas de las secciones 2–5. Incluye instrucciones de uso, hipótesis claras y feedback. No entregues código, tablas estáticas, promesas o descripciones como sustitutos. Si no puedes renderizar alguno, declara la limitación y no lo cuentes. Conserva el contenido aprobado y muestra solo el Studio solicitado, sin regenerar el resto de la sesión ni avanzar a Codex.
