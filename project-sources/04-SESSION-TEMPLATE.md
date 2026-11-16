# Plantilla editorial y de estudio — PA-Sxxx (v13)

**Contrato v13 vigente:** Sources 18 (orden y alcance), 19 (HTML incremental), 20 (validación no bloqueante), 21 (entregables), 22 (profundidad) y 17 (Studio 5/3/5) prevalecen sobre cualquier formulación anterior incompatible. No comprimir capítulos ni impedir crear, revisar, editar, traducir o consolidar por estados previos. Las puertas de aprobación/pruebas son exclusivamente de publicación canónica.


## Activación — Etapa 0

Tras título/contexto, bare `PA-Sxxx` entrega exclusivamente las secciones 1–6 de Source 18: estructura completa con Subtemas anidados bajo 7, tiempo estimado inmediatamente después, síntesis de tres ideas, objetivo, vista previa y conceptos con definición y ejemplo. Detenerse sin desarrollar capítulos ni Codex. Cada solicitud posterior desarrolla a profundidad solo el bloque pedido, en cualquier orden y sin depender de aprobación previa; crear o actualizar el HTML progresivo según Source 19.

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

Orden único: 1 Estructura; 2 Tiempo estimado; 3 Síntesis; 4 Objetivo; 5 Vista previa; 6 Conceptos; 7 Tema principal (7.1…7.N Subtemas anidados); 8 Integración entre áreas; 9 Teoría → Práctica; 10 Ejemplo del mundo real; 11 Ejemplo listo para producción; 12 Studio global; 13 Ejercicios; 14 Fuentes; 15 Recursos de trabajo; 16 Entregables; 17 Checklist; 18 Criterios de éxito; 19 Puente. Source 18 define los encabezados y contenido exactos.

Leer Source 18 para cada sección; aplicar Source 22 a cada capítulo, Source 19 al HTML y Source 21 a entregables.

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

## Estado editorial sin bloqueos

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
10. `Visual Learning Studio del tema principal` o `Visual Learning Studio del subtema N`: además del diagrama, mínimo 5 recursos interactivos para el Tema principal y 3 para cada Subtema. Leer y aplicar obligatoriamente Source 17 íntegro antes de entregar el bloque; Source 14 aporta UX, fallback sin JS adicional.
11. `Recursos del tema principal` o `Recursos del subtema N`: enlaces específicos de esa sección, texto descriptivo, y justificación de lectura. Mantener también bibliografía general curada de la sesión.
12. `Comprueba lo aprendido`: pregunta(s) propias del bloque con respuesta(s) razonadas. No usar `Recuperación` como título visible.

**No fijar la cantidad de conceptos, tarjetas, ejercicios o diagramas más allá del mínimo de un diagrama por capítulo y la síntesis de tres ideas**. La profundidad de cada mecanismo y la selección visual dependen del tema. No mostrar el contenido global de toda la sesión si el usuario pidió un capítulo.

### Ejemplo de escritura visible (sin IDs ni comillas angulares)

**Ownership:** responsabilidad identificable de mantener y revisar un componente. **Ejemplo:** el equipo responsable de una API pública revisa un cambio de campo antes de publicarlo porque tres clientes dependen de él.

**Excepción documentada:** permiso acotado para no cumplir temporalmente una regla general, con causa, responsable y revisión. **Ejemplo:** un consumidor heredado conserva un import interno durante una migración registrada y con fecha de revisión.

El primer ejemplo enseña *responsabilidad* y el segundo enseña *excepción*; no intercambiar ejemplos o repetir una misma descripción para todos los conceptos.

## v13 — Inventario, conceptos y entregables

Tras título/contexto, bare `PA-Sxxx` entrega exclusivamente las secciones 1–6 de Source 18: estructura completa con Subtemas anidados bajo 7, tiempo estimado inmediatamente después, síntesis de tres ideas, objetivo, vista previa y conceptos con definición y ejemplo. Detenerse sin desarrollar capítulos ni Codex. Cada solicitud posterior desarrolla a profundidad solo el bloque pedido, en cualquier orden y sin depender de aprobación previa; crear o actualizar el HTML progresivo según Source 19.

Todos los conceptos globales y locales, incluso en el inventario, se organizan verticalmente por Staff → Principal, FPA y AIPE (indicar cuando no aplique). Cada entrada es `Concepto: definición` y un párrafo independiente `Ejemplo:` propio y contextualizado en software; nunca tabla, grid horizontal, comillas angulares o ID visible. Flashcards individuales, nunca tablas.

**Mínimos obligatorios v13:** Tema principal: 5 recursos interactivos distintos (mapa mental, flashcards, simulador, explorador de arquitectura y matriz de decisión). Cada Subtema: al menos 3 (mapa mental, flashcards y simulador/explorador/matriz según objetivo). El Studio global adicional exige los cinco modos integradores de cobertura integral (5/3/5; 10 + 3N como mínimo). Una baraja o mapa cuenta una vez; un diagrama estático, tabla convencional, especificación, código, promesa o fallback sin JS no cuenta. Los diagramas explicativos junto al mecanismo se mantienen aparte.

Incluir `Entregables de la sesión` antes del Checklist y listar solo su encabezado en el índice inicial; desarrollar a solicitud. Separar Learning Site ES/EN, app/lab/package/tool o artefacto de diseño/revisión de Source 09, contribución al Portfolio (o N/A justificado), tareas CODEX-OWNED/LEARNER-OWNED y pruebas/evidencia. Para cada entregable: propósito, instrucciones numeradas de qué crear/modificar, comandos verificados si existen, resultado esperado, ruta relativa al monorepo (verificada o propuesta), responsable y criterio de aceptación/verificación. Consultar Git, Sources 03/09 y SESSION-OUTPUTS-120; ninguna página teórica sustituye el objetivo de ingeniería.

PA-S003, sección 8 (antes punto 13): **Integración entre AI Product Engineering, Staff Software Engineer y Frontend Platform Architect**. Síntesis transversal de conceptos, mecanismos, fronteras, arquitectura y responsabilidades después de enseñar cada área; integración del Portfolio/site corresponde a aplicación posterior, no a esta teoría.

### Ejemplo de formato de concepto

**Frontend Platform Architecture**

**Contrato de componente:** interfaz pública que establece las entradas, eventos y comportamiento que un consumidor puede utilizar.

**Ejemplo:** un botón de un Design System recibe el estado deshabilitado y emite un evento de activación; una aplicación consumidora no necesita acceder a su implementación interna.
