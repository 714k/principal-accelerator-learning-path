# Plantilla editorial y de estudio — PA-Sxxx (v12)

## Activación — Etapa 0

En un mensaje que contenga únicamente PA-Sxxx, presentar **una planificación revisable, no teoría completa ni Codex**: encabezado H1 único, metadatos (fase, ámbitos y proyecto), síntesis provisional de tres ideas, objetivo, tabla de contenido, concepto global por dominio como **término: definición breve**, Tema principal con conceptos locales presentados igual, lista completa de Subtemas con términos/definiciones, caso real propuesto+estado de fuente, diseño de producción propuesto y sus componentes, Studio, ejercicios y materiales, app/lab, revisión de evidencias y un registro de aceptación inicial `PENDIENTE`.

**En esta etapa ninguna definición breve sustituye la lección extensa posterior.** No listar `scope.application` ni otros IDs de máquina. No imprimir un encabezado de «conceptos, en orden: ...»: usar cada término como inicio de una definición legible.

## Encabezado de documento final

```markdown
<!-- session_id, section_id, concept_id, source_refs y tracking_id son metadatos no visibles -->
Fase 0 · PA-S001 · Staff → Principal / FPA / AIPE
# Fundamentos de ingeniería de software: arquitectura, plataforma y alcance Staff → Principal

Analizar las decisiones de arquitectura y sus consecuencias en sistemas reales.
```

La descripción debajo del H1 no es otro título. No añadir marcadores vacíos en el documento final. Un H1 máximo; `PA-S001` queda en metadatos/breadcrumb. Sin títulos con `PA-S001 —` repetidos.

## Esqueleto del documento español final

1. Estructura numerada completa — después del título, todos los apartados y subtemas.
2. Síntesis en 30 segundos — exactamente tres ideas, no reemplaza teoría.
3. Objetivo — aprendizaje y decisiones técnicas que podrán comprobarse.
4. Vista previa del aprendizaje — dominios, conceptos necesarios, preguntas, actividades y dependencias.
5. Conceptos — conceptos fundacionales enseñados según su dominio (Staff→Principal, FPA, AIPE), sin mezclar carreras ni llenar carriles artificialmente. Cada término explicado, no IDs impresos.
6. Tema principal — conceptos locales individuales, definición/alcance, mecanismo concreto, ejemplo explicado, contraejemplo, alternativas, calidad y verificaciones, diagrama/tabla/code cuando agrega valor, respuesta de recuperación.
7. Subtemas — exactamente los determinados por Source 03 más conceptos implícitos necesarios. Cada uno mini-capítulo autosuficiente con fundamentos locales, mecanismo, caso, fallos, producción y comprobación.
8. Integración entre dominios — solo si la conexión es útil y después de enseñar por separado.
9. Teoría → Práctica — el único bloque teórico destinado a trasladar al Portfolio, Learning Site o app de la sesión.
10. Tiempo — **estimación**, entradas y suma; no confundir con horas medidas.
11. Ejemplo del mundo real — entidad identificable, fuente oficial, problema, mecanismo publicado, alternativas/limitaciones, distinción hecho/inferencia y lección.
12. Ejemplo listo para producción — referencia implementable en dominio externo: componentes, flujo de datos y control, API, estados, contrato de errores, autenticación/autorización, seguridad, concurrencia/idempotencia si aplica, pruebas, despliegue, observabilidad, fallos/operación; decir **no validado** si no se ejecutó.
13. Visual Learning Studio — mapa mental Mermaid source-linked de Concepts/Tema/Subtemas y flashcards de cobertura total con pregunta, respuesta razonada y referencias; otras formas adaptativas solo cuando correspondan.
14. Ejercicios — casos concretos, criterios, respuesta/solución explicativa, transferencia y fallos; distinta dificultad según contenido.
15. Fuentes verificadas — referencias específicas utilizadas y enlaces a evidencias reales, no bibliografía decorativa.
16. Recursos complementarios — lectura/curso específico, propósito y apartado útil, sin placeholders.
17. Entregables de la sesión — site, artefacto de ingeniería, Portfolio si aplica, tareas y evidencia con instrucciones y rutas.
18. Checklist de estudio — acciones reversibles y accesibles, independientes de evidencia.
19. Criterios de éxito — resultados evaluables, evidencia requerida para L1–L5 sin otorgarla automáticamente.
20. Puente — conexión conceptual y técnica con PA-Sxxx siguiente.

## Capítulo desarrollado — patrón pedagógico adaptable

- Concepto contextualizado explicado con término natural, alcance y no-ejemplo si aporta.
- Problema de ingeniería que resuelve y actores/componentes/contratos reales de la demostración.
- Mecanismo **paso a paso**: entrada, estado antes, comprobaciones, transformación, salida, estados después, propagación y fallo. No forzar este formato causal en conceptos puramente estructurales.
- Ejemplo resuelto con datos o fragmentos reales de API/código; explicar qué ejecuta, bajo qué supuestos y qué no garantiza.
- Contraste, alternativa y trade-off situados en contexto; resultados no medidos se etiquetan hipótesis.
- Implicaciones en producción, seguridad, observabilidad y equipos cuando sean pertinentes.
- Tabla, diagrama de secuencia, dependencia, decisión o código **al lado** de su explicación.
- Recuperación sobre ese concepto en escenario diferente, con **respuesta razonada**.

**No poner «Nivel 1 — Fundamento», «Nivel 2 — Mecanismo», «Nivel 3 — Profundización».** Opcionalmente «Concepto», «Cómo funciona», «Ejemplo resuelto», «Fallo y alternativa» y «Profundización» en títulos visibles. No usar plantilla que produzca la misma estructura, párrafos o widgets para cada concepto.

## Estado editorial y bloqueos

`PENDIENTE → EN REVISIÓN → APROBADO (usuario) → CONSOLIDADO ES → EN VALIDADO → PUBLICADO (si Codex ejecutó)`. Cada transición exige la evidencia que indica; generar teoría no autoriza aceptar ni publicar. Mantener historial de correcciones; si un cambio afecta material aprobado, solicitar reconfirmación para esa parte y sincronizar EN. El avance entre sesiones nunca se bloquea por estado previo.

## v11 — Plantilla obligatoria de capítulo autosuficiente (Tema principal y cada Subtema)

Conservar el orden de secciones de la sesión. Dentro de **cada** capítulo desarrollado, usar este contrato, sin reemplazar el aprendizaje profundo por una rejilla de tarjetas:

1. Título natural `Tema principal: ...` o `Subtema N: ...` (H2/H3 según jerarquía, nunca H1 adicional).
2. `Síntesis en 30 segundos`: **tres ideas propias de ese capítulo**, no las tres de la sesión repetidas.
3. Objetivo propio del capítulo y conocimientos necesarios, solo cuando aporten.
4. `Conceptos del tema principal` o `Conceptos del subtema N`: cada concepto aparece como `Nombre: definición`, más **ejemplo propio inequívoco** que muestra ese concepto en un sistema externo concreto; diferenciarlos entre Staff→Principal, FPA y AIPE cuando sean pertinentes sin mezclarlos en una lista horizontal.
5. Teoría desarrollada: componentes, entradas, estados, contratos, mecanismos, respuestas y excepciones, alternativas y trade-offs, con explicaciones secuenciales y código cuando corresponda.
6. **Al menos un diagrama propio, técnico, explicado y situado junto al mecanismo de ese capítulo**, escrito en Mermaid fuente y publicado como SVG responsive accesible; diagramas adicionales para mecanismos complejos. No sustituirlo con el mapa general.
7. Ejemplo resuelto en un dominio externo, consecuencias de producción y verificación.
8. `Ejercicios del tema principal` o `Ejercicios del subtema N`: una o más actividades pertinentes con solución/criterio y alternativa incorrecta explicada.
9. `Tarjetas de estudio del tema principal` o `Tarjetas de estudio del subtema N`: preguntas que exijan recordar/decidir, respuesta y explicación (sin inventar respuestas de otras secciones).
10. `Visual Learning Studio del tema principal` o `Visual Learning Studio del subtema N`: además del diagrama, mínimo 5 recursos interactivos para el Tema principal y 3 para cada Subtema según Source 16; comportamientos verificables según Source 14, fallback sin JS adicional.
11. `Recursos del tema principal` o `Recursos del subtema N`: enlaces específicos de esa sección, texto descriptivo, y justificación de lectura. Mantener también bibliografía general curada de la sesión.
12. `Comprueba lo aprendido`: pregunta(s) propias del bloque con respuesta(s) razonadas. No usar `Recuperación` como título visible.

**No fijar la cantidad de conceptos, tarjetas, ejercicios o diagramas más allá del mínimo de un diagrama por capítulo y la síntesis de tres ideas**. La profundidad de cada mecanismo y la selección visual dependen del tema. No mostrar el contenido global de toda la sesión si el usuario pidió un capítulo.

### Ejemplo de escritura visible (sin IDs ni comillas angulares)

**Ownership:** responsabilidad identificable de mantener y revisar un componente. **Ejemplo:** el equipo responsable de una API pública revisa un cambio de campo antes de publicarlo porque tres clientes dependen de él.

**Excepción documentada:** permiso acotado para no cumplir temporalmente una regla general, con causa, responsable y revisión. **Ejemplo:** un consumidor heredado conserva un import interno durante una migración registrada y con fecha de revisión.

El primer ejemplo enseña *responsabilidad* y el segundo enseña *excepción*; no intercambiar ejemplos o repetir una misma descripción para todos los conceptos.

## v12 — Inventario, conceptos y entregables

Tras título/contexto mostrar la **estructura completa y numerada** de la sesión, incluidos los subtemas del roadmap y las restantes secciones; si la petición es solo PA-Sxxx, entregar únicamente inventario, no desarrollar teoría ni Codex, y detenerse. Después desarrollar exclusivamente el bloque solicitado y esperar aprobación explícita.

Todos los conceptos globales y locales, incluso en el inventario, se organizan verticalmente por Staff → Principal, FPA y AIPE (indicar cuando no aplique). Cada entrada es `Concepto: definición` y un párrafo independiente `Ejemplo:` propio y contextualizado en software; nunca tabla, grid horizontal, comillas angulares o ID visible. Flashcards individuales, nunca tablas.

**Mínimos obligatorios v12:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional conserva mapa y tarjetas de cobertura integral. Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.

Incluir `Entregables de la sesión` antes del Checklist y anticiparlo en el inventario. Separar Learning Site ES/EN, app/lab/package/tool o artefacto de diseño/revisión de Source 09, contribución al Portfolio (o N/A justificado), tareas CODEX-OWNED/LEARNER-OWNED y pruebas/evidencia. Para cada entregable: propósito, instrucciones numeradas de qué crear/modificar, comandos verificados si existen, resultado esperado, ruta relativa al monorepo (verificada o propuesta), responsable y criterio de aceptación/verificación. Consultar Git, Sources 03/09 y SESSION-OUTPUTS-120; ninguna página teórica sustituye el objetivo de ingeniería.

PA-S003, punto 13: **Integración entre AI Product Engineering, Staff Software Engineer y Frontend Platform Architect**. Síntesis transversal de conceptos, mecanismos, fronteras, arquitectura y responsabilidades después de enseñar cada área; integración del Portfolio/site corresponde a aplicación posterior, no a esta teoría.

### Ejemplo de formato de concepto

**Frontend Platform Architecture**

**Contrato de componente:** interfaz pública que establece las entradas, eventos y comportamiento que un consumidor puede utilizar.

**Ejemplo:** un botón de un Design System recibe el estado deshabilitado y emite un evento de activación; una aplicación consumidora no necesita acceder a su implementación interna.
