# 14 — Módulo canónico: aprendizaje acelerado y experiencia cognitiva (ES/EN)

**Status:** obligatorio para ChatGPT como autor de contenido académico y para todos los prompts de Codex que publican teoría. **Alcance:** contenido docente, presentación y componentes de lectura. **Fuera de alcance:** modificación automática de algoritmos, lógica de negocio, interfaces de programación, pruebas o resultados para conseguir un efecto visual. Los principios de escaneabilidad/carga cognitiva son heurísticas de diseño; no prometen una velocidad de aprendizaje medida ni se presentan como hallazgos neurocientíficos universales.

## Precedencia e integración con contratos anteriores

- ChatGPT redacta y mantiene los artefactos canónicos `PA-Sxxx-theory-es.md` y `PA-Sxxx-theory-en.md`. Codex no fabrica teoría a partir del roadmap o de encabezados. Ante falta de archivos: `MISSING_CANONICAL_THEORY_PAYLOAD`; ante cobertura faltante de conceptos: `MISSING_ATOMIC_CONCEPT_COVERAGE`.
- La secuencia pedagógica es **dominio separado → concepto atómico separado → teoría/mecanismo → síntesis/comparación entre conceptos → integración entre dominios cuando corresponda**. Las tres capas descritas abajo son niveles de profundidad DENTRO de cada concepto desarrollado, no sustituyen los dominios.
- Este módulo tiene prioridad sobre instrucciones previas que favorezcan bloques largos de exposición, fichas poco sustanciales o negritas decorativas. No reemplaza rigor académico, trazabilidad de fuentes, contraejemplos, ejercicios ni Visual Learning Studio.
- Cuando el contenido canónico existente todavía no tiene este formato, **ChatGPT debe reformatearlo y sincronizar las versiones ES/EN antes del Build**. Codex no debe reautorarlo: transforma solo su representación (markup, acordeones, tooltip, componentes) sin cambiar el contenido ni el orden del razonamiento.

## 1. Síntesis de 30 segundos y anclaje visual

- Inmediatamente después del título/metadatos de CADA documento teórico —antes del Objetivo o Learning Preview— incluir un bloque semántico destacado, SIN caja de color ornamental:

  ```md
  > **SÍNTESIS EN 30 SEGUNDOS**
  > 1. [Primera conclusión esencial de la sesión]
  > 2. [Segunda distinción o mecanismo importante]
  > 3. [Tercera implicación práctica]
  ```

- Versión inglesa: **30-SECOND SYNTHESIS**, mismos tres significados; no copiar literalmente el encabezado español en el artefacto EN.
- La síntesis anticipa el contenido, **nunca se usa como sustituto** de definiciones, mecanismos, fuentes, ejemplos, tablas, diagramas o desarrollo de Main Topic/Subtopics. Puede haber un resumen de una frase al abrir secciones extensas, pero no repetir tres viñetas artificialmente por concepto.
- Comenzar la oración tópica de cada párrafo principal con una expresión **breve y discriminativa en negrita** cuando contribuya al barrido visual: `**La plataforma** provee capacidades reutilizables...`. NO poner en negrita las primeras palabras de TODAS las oraciones, ni párrafos enteros; esto competiría con el señalamiento de conceptos importantes. El mensaje clave está al inicio del párrafo y se desarrolla inmediatamente.

## 2. Revelación progresiva en tres capas (cada concepto sustancial)

1. **Nivel 1 — Fundamento:** definición precisa, alcance, qué no es, intuición y ejemplo de software realista. Presentar cada término atómico antes de la relación compuesta. Las primeras definiciones no deben depender de jerga no introducida.
2. **Nivel 2 — Mecanismo:** elementos concretos, secuencia causal, entradas, transformaciones, salidas, contrato y consecuencias; un diagrama/tabla/flujo/fragmento de código explicado y próximo cuando contribuya a entender el mecanismo; comparación, fallo y autoprueba breve con respuesta.
3. **Nivel 3 — Profundización:** trade-offs, casos borde, complejidad, código anotado, matemática, seguridad, pruebas, operaciones o gobernanza cuando sea pertinente. No inventar matemáticas ni casos borde para rellenar. Contenido del nivel 3 disponible en el Markdown canónico; el sitio puede convertirlo en un acordeón **abierto por control del lector** con resumen significativo. Preservar fuentes, accesibilidad y la opción de leerlo sin JavaScript. No ocultar en nivel 3 información indispensable para entender niveles 1 y 2.

Para un concepto largo, secciones reconocibles: `#### Nivel 1 — Fundamento`, `#### Nivel 2 — Mecanismo`, `#### Nivel 3 — Profundización (opcional)` (EN equivalents). Para un concepto corto, la jerarquía puede ser más compacta pero las tres funciones deben poder identificarse; los conceptos solo auxiliares se explican al primer uso.

## 3. Chunking causal con etiquetas semánticas

Usar las etiquetas **solo para un proceso/causa real**, junto a prosa explicativa, no decorar cada párrafo:

- `📥 [ENTRADA / CAUSA]` — qué estímulo, dato, condición, fallo o cambio inicia el proceso.
- `⚙️ [PROCESO / MECANISMO]` — paso verificable que transforma el estado o dato.
- `📤 [SALIDA / RESULTADO]` — resultado observable, contrato o efecto.
- `💡 [INSIGHT / REGLA DE ORO]` — implicación contextual, no slogan universal.

EN: `INPUT / CAUSE`, `PROCESS / MECHANISM`, `OUTPUT / RESULT`, `INSIGHT / RULE OF THUMB`. Siempre mantener texto además de emoji, para lectores de pantalla y semántica independiente de color. Si el tema no contiene un proceso causal útil, no introducir un flujo falso; usar una tabla de distinciones, mapa conceptual o modelo de estados apropiado.

## 4. Glosarios en contexto y tooltips accesibles

Sintaxis canónica de anotación en texto **fuera de bloques de código**:

`[Término Complejo:: Definición breve de un máximo de diez palabras]`

- La definición debe ser correcta, concreta y contar **≤10 palabras** (separadas por espacios), en el idioma correspondiente. No reemplaza la definición profunda a la primera aparición ni las fuentes: es una ayuda contextual adicional.
- En Markdown sin interactividad, la anotación conserva el término **y su definición legibles**. El renderer debe transformar la anotación en un tooltip/popover compatible con ratón, teclado, foco, touch y lector de pantalla; debe proporcionar mecanismo de cierre y no depender exclusivamente de hover. La definición no se pierde si JavaScript está deshabilitado.
- Nunca interpretar esta sintaxis en fragmentos de código, expresiones literales de TypeScript, JSON, comandos shell, links o URLs. El parser debe soportar escaping y no romper Markdown, MDX ni traducciones.

## 5. Interacciones contextualizadas, sin widgets inventados

Cuando haya una variable que realmente se pueda explorar, ChatGPT puede insertar la anotación editorial:

`[Componente Interactivo Recomendado: Slider para ajustar tasa de errores y observar número de reintentos en un modelo simulado]`

- Explicitar **control X, efecto Y y mecanismo**. Otros ejemplos: Toggle para cambiar entre validación estricta/flexible y observar errores de contrato; simulador de propagación de dependencias. Elegir un componente solamente si clarifica una relación importante de esa sesión.
- El prompt de Codex conserva la ubicación e interpreta la anotación como **propuesta, no orden de inventar datos ni resultados**. Solo implementa cuando el Build solicitado, la teoría canónica y las dependencias aprobadas soporten el modelo. Etiquetar datos hipotéticos como simulación. En ausencia de widget funcional, presentar explicación/tabla estática accesible y señalizar que se trata de propuesta editorial, no una interacción existente.
- Nunca introducir porcentajes, costes, métricas, benchmarks ni evidencia de mastery sin mediciones. Todos los controles deben tener etiquetas, valores explicados, comportamiento por teclado/touch, reduced motion y alternativa textual.

## 6. Instrucciones para TODOS los prompts de Codex de sesión

Copiar LITERALMENTE un bloque con estas cinco reglas en todo handoff `PA-Sxxx` que cree o publique teoría. **No basta con enlazar o citar esta fuente.** Los prompts de regeneración del `site/` también lo llevan completo:

1. `SÍNTESIS EN 30 SEGUNDOS / 30-SECOND SYNTHESIS`: exactamente 3 ideas al comienzo de cada teoría canónica ES/EN (después de metadatos), presentada como bloque semántico discreto.
2. `KEYWORD SIGNALING`: frase tópica al inicio, enfatizar selectivamente sus primeras palabras realmente informativas; no negrita indiscriminada.
3. `THREE-LAYER READING`: Nivel 1 Fundamento, Nivel 2 Mecanismo, Nivel 3 Profundización colapsable accesible (con fallback estático). Ni ocultar fundamentos ni sustituir desarrollo por UI.
4. `CAUSAL CHUNKS + CONTEXT HELP`: 📥 entrada/causa, ⚙️ proceso/mecanismo, 📤 salida/resultado, 💡 insight solo cuando exista causalidad real; tooltips `[Término:: Definición <=10 palabras]` con soporte hover/foco/touch y fallback.
5. `CONTEXTUAL WIDGET ANNOTATIONS`: `[Componente Interactivo Recomendado: ...]` con X→Y, solo si está fundamentado; no falsificar métricas ni reescribir código.

Y siempre adjuntar el firewall `PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY` y `DO NOT CHANGE APPLICATION CODE LOGIC FOR PRESENTATION`. La publicación debe preservar carriles Staff→Principal/FPA/AIPE y conceptos atómicos ES/EN con IDs estables, así como el dashboard/Studio/tracking existentes. La actividad de Build propiamente autorizada puede crear/modificar implementación necesaria **según el alcance específico aprobado**; este módulo, por sí mismo, nunca la autoriza.

## 7. Criterios de aceptación / pruebas

- En ambos idiomas existe y precede al Objetivo la síntesis de exactamente tres ideas semánticamente equivalentes.
- Se pueden distinguir los niveles 1/2/3 en los conceptos importantes sin perder ninguna explicación, ejemplo, cita o sección canónica; el nivel 3 está legible con JavaScript desactivado.
- En procesos apropiados las etiquetas muestran causalidad genuina y están explicadas, no son decoración.
- La anotación tooltip tiene definición ≤10 palabras y funciona en mouse, focus, touch y modo estático; no altera fragmentos de código.
- Las anotaciones de widgets indican control/resultado; las simulaciones se etiquetan, y no se muestran controles inertes como si funcionaran.
- El visual learner ve listados, tablas, diagramas y explicaciones ADYACENTES al concepto que representan. La vista de Visual Learning Studio sigue complementando la teoría, sin reemplazarla.
- El comparador de publicación comprueba preservación de párrafos, orden, referencias y semántica de ambos artefactos. Verificar HTML renderizado: un test de presencia de encabezados NO certifica calidad didáctica.
- `git diff` confirma que los cambios realizados **solo por la adopción de este módulo** no alteran lógica de negocio, algoritmos o contratos de runtime. Mostrar tests ejecutados y diferencias explícitamente. Nunca afirmar pruebas o métricas no ejecutadas.
