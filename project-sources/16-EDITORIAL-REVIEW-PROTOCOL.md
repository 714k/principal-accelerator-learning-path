# Protocolo editorial de revisión por bloques — v10 (vigente)

## Antecedentes y decisiones

El estudiante revisó el piloto PA-S001–PA-S005 y rechazó: dos títulos principales, definiciones y mecanismos abstractos, encabezados visibles de niveles de lectura, glosarios de apertura que sustituyen conceptos locales, casos del propio Accelerator como teoría, ejemplos reales no documentados y production-ready incompletos. Posteriormente corrigió de nuevo la salida de PA-S001 porque se imprimieron códigos como `engineering.software` y se anunciaron conceptos solo por nombre. La solicitud de mostrar toda la sesión en un turno autoriza **una muestra íntegra para evaluación**, no aprobación automática.

Este Source 16 gobierna el **flujo editorial y la visualización** frente a instrucciones históricas contradictorias en 00–15. Los contratos técnicos y de preservación no afectados siguen vigentes. No corregir la misma falla por enésima vez: ejecutar la preflight antes de cada bloque.

## Etapa 0 — INVENTARIO (bare `PA-Sxxx`)

La primera salida se presenta como una sola página de planificación **sin desarrollar toda la teoría**. Contiene:

- Un único H1 de título humano, ID/fase fuera del H1, síntesis de tres ideas, objetivo y preguntas que guiarán el capítulo.
- Índice de secciones y ámbitos profesionales que sean pertinentes.
- **Conceptos locales en lenguaje natural con definición inmediata**: «Aplicación: software que permite a una persona efectuar una tarea concreta». No mostrar solo «aplicación», una lista «Conceptos, en orden: ...», ni `scope.application` en paréntesis.
- Tema principal y todos los Subtemas con sus conceptos necesarios y definiciones breves, sin repetir texto genérico. Su desarrollo profundo ocurre en la etapa de redacción.
- Caso real propuesto con fuente primaria concreta o estado «pendiente de verificar». Diferenciar empresa real documentada de un ejemplo hipotético. Evitar usar Accelerator como materia de teoría.
- Ejemplo de producción externo: dominio, actores, datos/contratos, invariantes, seguridad, concurrencia si aplica, fallos, pruebas, observabilidad, despliegue y estado no verificado.
- Visuales cercanos previstos, mapa mental total, flashcards con respuestas, ejercicios, bibliografía y recursos, time estimate, Theory→Practice, resultados de app/lab separados de site.
- Registro de estado por sección **PENDIENTE**, sin fingir aceptaciones.

**DETENERSE AL CERRAR INVENTARIO.** No pedir permiso para lo que ya se sabe, pero no avanzar al Tema principal sin solicitud posterior.

## Etapas siguientes — AUTORÍA Y REVISIÓN

1. «Muéstrame el tema principal»: redactar solo el Tema principal íntegro en español, con todos sus conceptos desarrollados individualmente y luego síntesis, diagramas pertinentes y recuperación con respuestas. Finalizar sin adelantar el siguiente bloque.
2. Usuario corrige: corregir ese mismo bloque completo, conservar correcciones anteriores, responder con el texto revisado. Se detiene hasta aprobación **explícita**.
3. «Subtema 1» (y 2, ..., N): desarrollar cada mini-capítulo con la misma calidad, esperando revisión/aprobación en cada etapa.
4. Casos reales, ejemplo de producción, ejercicios y Studio: cada uno también puede revisarse en bloque; completar las restantes secciones obligatorias.
5. «Dame el contenido completo en español»: consolidar **solo texto aprobado** en un documento con único H1, metadatos internos invisibles y contenido íntegro. Si todavía falta material, identificar exactamente el bloque ausente y no declarar aprobación.
6. Traducción inglesa: equivalencia semántica de definiciones, mecanismos, código, casos, límites, respuestas, diagramas, recursos y criterios; permitir revisión de EN cuando se solicite.
7. «Genera el prompt de Codex»: solo cuando ES/EN estén íntegros y realmente disponibles para Codex; respetar destino de aplicación Source 09 y firewall de publicación.

**Solicitud excepcional** «muéstrame la sesión entera aquí»: mostrar toda la sesión como **borrador no aprobado**. La longitud de la petición no justifica convertir cada subtema en tres definiciones o saltar ejemplos. Si el texto resulta incompleto, declarar qué falta y no usarlo como canónico. No cambiar a un flujo diferente para siguientes sesiones sin decisión explícita.

## Formato visible — rechazo inmediato por regresión

- EXACTAMENTE **un H1** en cada idioma; código de sesión en navegación/metadatos, no duplicado.
- Nada de IDs de máquina tipo `engineering.software` en encabezados, listas de conceptos, glosas, tablas o flashcards. Mantener IDs en HTML attributes/frontmatter/manifiesto no visible y en pruebas técnicas, no en el aprendizaje publicado.
- Nada de encabezados «Nivel 1/2/3/4/5 — Fundamento/Mecanismo/Profundización». La secuencia de profundidad es interna; usar «Concepto», «Mecanismo», «Cómo funciona», etc. si mejoran lectura. L1–L5 competencial solo en evidencia.
- Tema principal y cada Subtema definen sus propios conceptos en contexto ANTES de integrarlos. Nada de decir «más adelante aprenderás» cuando se pidió desarrollar un capítulo.
- No abstracto: indicar quién produce qué solicitud, el contrato preciso, dato/estado, dependencia, transformación, respuesta, fallo y una prueba observable. Un «mecanismo» que solo repite el objetivo es incompleto.
- Fuente autoritativa cerca de afirmación; casos de empresa real solo hechos acreditados. Diagramas locales junto a prosa y explicados. No inventar métricas, arquitectura propietaria ni resultados de pruebas.
- Nunca marcadores como `Contenido pendiente`, `[...conceptos no incluidos...]`, preguntas sin respuestas o tarjetas con reversos que tratan otro concepto.

## Estados de aceptación y conservación

La sesión mantiene inventario de bloques y un registro de decisiones del usuario: `PENDIENTE`, `EN REVISIÓN`, `APROBADO`, `CONSOLIDADO ES`, `EN VALIDADO`, `PUBLICADO` (este último solo con build y evidencia). Ante cambios en bloques aprobados, se expone **diff conceptual**, se solicita reconfirmación de lo afectado y se actualiza EN después de corregir ES. No conceder mastery por aprobación editorial ni por casillas de estudio.

## Casos, plataforma y apps

Ejemplo externo: documentación de ingeniería real (Google, Netflix, Cloudflare, etc.), papers o estándar. El caso empresarial documentado explica hechos específicos, no publicidad de empresa. Production-ready es un sistema externo reproducible con API, datos, estados, fallos, seguridad, pruebas, despliegue y observabilidad; **si no se ejecutó, «diseño no verificado»**. El Accelerator solo en Theory→Practice. En handoff posterior separar app/lab del `site/`. PA-S004 debe ser Design System + Storybook funcional; no fijar N componentes ni reemplazar Portfolio. Piloto S001–S005 preservar antes de generalizar.

## Comprobación editorial antes de emitir un bloque

1. ¿Solo se entrega el bloque solicitado o se trata de un borrador integral expresamente pedido?
2. ¿Hay H1 único, encabezados naturales y ninguna cadena de ID de máquina visible?
3. ¿El listado de conceptos contiene inmediatamente definiciones, y su desarrollo local es real, no un glosario?
4. ¿Cada mecanismo identifica entradas, componentes, secuencia, efectos, fallos y verificación cuando corresponden?
5. ¿Hay contrastes, límites, producción, respuesta de recuperación y fuentes junto a afirmaciones?
6. ¿Los casos reales están documentalmente sustentados y distinguen inferencia de hecho?
7. ¿Se conserva todo texto aprobado y la nueva corrección, sin nuevas regresiones?
8. ¿Se evita usar nuestro proyecto como ejemplo de teoría?
9. ¿El destino de app y la publicación se mantienen separados?
10. ¿Está claro qué está propuesto, qué se aprobó y qué se comprobó?

Sin superar esta preflight, no presentar el bloque como completo.
