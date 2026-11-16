# Source 18 — Contrato de entrega de sesiones (v13)

Vigente para las 120 sesiones. Esta fuente determina orden, alcance y contenido visible; sustituye el orden e inventario inicial v12 donde sean incompatibles. Source 16 rige las solicitudes y estados no bloqueantes; 19 HTML; 20 validación; 21 entregables; 22 profundidad; 17 interacciones. Las correcciones expresas del estudiante prevalecen. Conservar roadmap, destinos, requisitos no sustituidos y textos aprobados.

## Primera respuesta: alcance exacto

Ante únicamente `PA-Sxxx`, consultar 03, 09 y los contratos aplicables. Mostrar en la conversación SOLO el título humano (un H1), una leyenda de fase/sesión y los siguientes seis apartados en orden. No añadir un resumen de los capítulos posteriores, previews de widgets, casos, entregables detallados, ni prompts Codex. El índice sí enumera todos los apartados con sus títulos. Detenerse tras Conceptos; no pedir aprobación como condición para seguir.

1. **Estructura de la sesión**: lista numerada completa, nombres concretos de los subtemas anidados bajo Tema principal (7.1, 7.2...); no contar cada subtema como sección global. La lista anticipa las secciones futuras sin desarrollarlas.
2. **Tiempo estimado de aprendizaje**: inmediatamente después de la estructura; desglose por teoría, Studio, fuentes, ejercicios, implementación, documentación y validación según alcance; suma y unidades; distinguir estimado de medido y explicar supuestos. No reducir alcance artificialmente.
3. **Síntesis en 30 segundos**: exactamente tres ideas sustantivas.
4. **Objetivo**: conocimiento, problemas, decisiones, competencias y resultados esperados evaluables.
5. **Vista previa del aprendizaje**: recorrido vertical Staff → Principal, Frontend Platform Architecture (FPA) y AI Product Engineering (AIPE), por dominio pertinente; indicar N/A justificado, no rellenar artificialmente.
6. **Conceptos**: inventario global y correspondencia temática por área, en formato literal `Concepto: definición`, seguido de párrafo `Ejemplo:` propio y significativo. Nunca tablas, carruseles, grids horizontales, comillas angulares ni códigos visibles. No listar vocabulario sin definición/ejemplo. La elaboración local posterior no se sustituye por esta introducción.

## Orden universal del documento de estudio

Título fuera de numeración, leyenda de fase una vez, H1 único. Índice anidado y anchors únicos en HTML. Los siguientes son los números de sección (no variar según número de subtemas):

1. Estructura de la sesión
2. Tiempo estimado de aprendizaje
3. Síntesis en 30 segundos
4. Objetivo
5. Vista previa del aprendizaje
6. Conceptos
7. Tema principal: título específico
   1. Subtema 1: título específico
   2. Subtema 2: título específico
   3. ... hasta el último subtema del roadmap, refinado editorialmente según alcance
8. Integración entre áreas de conocimiento
9. Teoría → Práctica
10. Ejemplo del mundo real
11. Ejemplo listo para producción
12. Visual Learning Studio global
13. Ejercicios
14. Fuentes de conocimiento
15. Recursos de trabajo
16. Entregables de la sesión
17. Checklist de revisión
18. Criterios de éxito
19. Puente hacia la siguiente sesión

En 7 desarrollar primero el capítulo del Tema principal como unidad didáctica; cada subtema es sección hija con encabezado propio `Subtema N: ...`, no otro H1. Cada uno se puede solicitar en cualquier orden. El encabezado de 8 se conserva, con N/A explicado si no existe integración relevante; para PA-S003 integrar AIPE/Staff/FPA (antes §13, ahora §8), no confundir con integración de aplicaciones. No hay cantidad universal de subtemas ni componentes.

## Contrato de cada capítulo

Tema principal y **cada** Subtema: título, síntesis local de tres ideas, objetivo, `Conceptos del tema principal` o `Conceptos del subtema N`, conceptos separados por dominio con definición y ejemplo propio, desarrollo profundo según 22, al menos un diagrama técnico propio junto al mecanismo (Mermaid fuente → SVG accesible), ejemplos concretos y código/contratos pertinentes, ejemplo resuelto, fallos y casos límite, alternativas y trade-offs, implicaciones de producción y verificaciones, ejercicios con soluciones razonadas, tarjetas individuales con respuestas, Studio local 5/3 según 17, recursos específicos con URLs verificadas y `Comprueba lo aprendido` con respuestas. No rellenar mecánicamente encabezados ni reducir profundidad para caber en un turno. Puede intercalar visuales en el desarrollo. Si necesita partes, conservarlas progresivamente en el mismo HTML, registrar qué falta y continuar a solicitud.

## Secciones integradoras

- 8: responsabilidades, fronteras, dependencias, decisiones y efectos técnicos/organizacionales entre dominios, después de las bases; si se solicita antes, desarrollar lo posible con dependencias explícitas.
- 9: transferencia al Accelerator: proyecto, cambios, decisiones del estudiante, tareas Codex y resultados. No usar el propio Accelerator como prueba académica universal.
- 10: caso externo realmente documentado, fuente primaria específica próxima a cada afirmación, contexto, problema, mecanismo, decisiones, resultados publicados, límites e inferencias.
- 11: referencia externa implementable: requisitos, componentes, API, datos/estados/invariantes, contratos/error, código esencial, seguridad, concurrencia/idempotencia cuando proceda, accesibilidad, rendimiento, observabilidad, pruebas, despliegue, rollback y trade-offs. Etiquetar diseño no validado hasta ejecutar pruebas; no inventar evidencia.
- 12: los cinco modos funcionales obligatorios, integradores y adicionales a los locales (Source 17).
- 13: ejercicios de comprensión, decisión, implementación, diagnóstico y liderazgo según pertinencia, con objetivo, contexto, instrucciones, restricciones, resultado, solución razonada y evaluación.
- 14: documentación oficial, artículos de ingeniería, academia/universidades, libros, vídeos, conferencias o cursos curados; variedad relevante, título/autor/institución, URL comprobada, descripción, capítulo y razón de consulta. No inventar referencias ni imponer cuotas.
- 15: recursos de trabajo (plantillas, repos, herramientas, datos, fixtures, documentos); por recurso qué es, origen, existe o propuesto, quién lo crea, cómo usarlo y resultado.
- 16: Source 21. Describir tareas dentro/fuera de site; no insertar apps o Portfolio completos en HTML.
- 17: estudio interactivo reversible/persistido cuando soportado, sin inferir mastery.
- 18: criterios observables y evidencias pertinentes L1–L5; no certificar dominio por lectura, clic o aprobación.
- 19: conocimientos reutilizados, dependencias y evolución de proyectos según próxima sesión; sin bloquear avance.

## Presentación y revisión

HTML es exclusivamente el documento académico destinado al Learning Site; las descripciones de práctica y entregables son material de estudio, sus implementaciones viven fuera. Ante `Crea el HTML`, materializar el documento inicial; ante cada capítulo solicitado, desarrollar con profundidad y agregar/revisar solo su bloque en ese mismo documento si está disponible. Si aún no existe, crear base parcial segura o entregar bloque identificado y ofrecer integración; jamás negar autoría por falta de aprobación. Source 19 gobierna persistencia y recuperación. Solicitud explícita de sesión completa permite borrador íntegro, preferentemente desarrollado por partes sin compresión, no aprobado automáticamente.
