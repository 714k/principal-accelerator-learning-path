# Source 23 — Generación integral por bloques (v14)

Vigente para las 120 sesiones. Sustituye el disparador v13 que detenía la petición bare ID en seis secciones. Mantiene los contratos de profundidad, Studios, revisión no bloqueante, publicación y currículo. Correcciones explícitas del estudiante prevalecen.

## 1. Activación

| Solicitud | Alcance |
| --- | --- |
| PA-Sxxx | Generar o completar la sesión integral, HTML académico ES y plano B de ingeniería separado. |
| PA-Sxxx — Solo introducción | Título, capacidad y secciones 1–6 únicamente. |
| PA-Sxxx — Modo progresivo | Inicio 1–6; continuar bloques solo a petición. |
| PA-Sxxx — Actualiza el subtema N | Modificar exclusivamente el bloque pedido y sus dependencias explícitas de coherencia; preservar lo demás. |
| PA-Sxxx — Regenera Visual Learning Studio | Generar solo Studio solicitado, local o global; preservar teoría. |
| PA-Sxxx — Audita la sesión | Inspección sin mutar salvo solicitud expresa de corrección. |
| Continúa | Retomar el último checkpoint de la misma sesión y estado, no regenerar ni pedir repetir instrucciones. |

EN solo cuando se solicita. No confundir borrador íntegro con aprobación ni una solicitud de sesión con autorización de publicar, ejecutar Codex, modificar Git o crear apps. El prompt de implementación se prepara como borrador independiente; su ejecución/handoff operativo requiere solicitud expresa.

## 2. Artefactos y límites

Plano A: un `PA-Sxxx-ES.html` autocontenido, solo material académico del Learning Site, 19 secciones de Source 18; H1 técnico seguido de capacidad adquirida; tiempo estimado en tabla sencilla Actividad/Tiempo/Total; subtemas anidados en 7. Incluir descripciones académicas de prácticas/entregables, no sus implementaciones ni fichas operativas completas.

Plano B: `PA-Sxxx-DELIVERABLES.md`, `PA-Sxxx-CODEX-PROMPT.md` (borrador, no autorización de ejecución) y `PA-Sxxx-AUDIT.md` según Source 21. Separar app/lab, site, Portfolio, documentación y ADR/RFC, trabajo de Victor y Codex, pruebas y evidencias. No crear artefactos irrelevantes por cuota; identificar N/A con justificación. Código real fuera del HTML, en Git cuando se autorice. Ejemplos de código didáctico sí pertenecen al HTML.

## 3. Pipeline de ejecución (una solicitud, múltiples bloques internos)

1. Leer Sources 00/01/03/04/05/09/16–23 y rutas adicionales de Settings, resolver sesión y subtemas reales, objetivos, conceptos por área y destino ingenieril. Consultar Git para estado real cuando accesible; no inventar.
2. Recuperar documento existente por sesión/idioma y estado; si no existe, crear base del HTML y plan de bloques. No sobrescribir versión inaccesible ni contenido aprobado.
3. Materializar encabezado y secciones 1–6 conforme a Source 18; guardar checkpoint verificable.
4. Desarrollar el Tema principal como capítulo completo según Source 22 y su Studio de 5 modos con diagramas adicionales; revisar cobertura, corregir omisiones y guardar.
5. Recorrer cada subtema en orden del temario, como unidad independiente con mecanismos, ejemplos, fallos, decisiones, práctica, fuentes y Studio local mínimo de 3; revisar y guardar cada bloque. Dividir un bloque grande en incrementos sin compresión. No sustituir contenido con títulos.
6. Desarrollar secciones 8–19; Studio global de 5 modos adicionales e integradores en 12. Completar fuentes verificadas, ejercicios y soluciones, criterios evaluables y resumen de entregables en 16; guardar por bloque.
7. Construir plano B independiente, fichas específicas y prompt borrador, sin afirmar implementaciones. Separar evidencia pendiente de ejecutada.
8. Validar estructura, profundidad, fuentes, contenido y comportamiento según Source 20; corregir dentro del alcance sin perder bloques aprobados. Ejecutar pruebas de interacción sobre HTML real cuando disponible, no solo fixture. Mínimo 10+3N widgets distintos por scope y al menos un diagrama técnico por capítulo, adicionales.
9. Entregar enlaces al HTML consolidado y documentos B, estado de cada revisión, limitaciones y evidencia real de validación. No entregar código fuente del HTML como sustituto de la experiencia.

No solicitar aprobación ni un turno del estudiante entre etapas automáticamente. El límite es la capacidad real de ejecución: avanzar todo lo posible en el turno. Si se agota, entregar archivo parcial útil y checkpoint, decir qué falta y cómo reanudar; nunca afirmar que una tarea seguirá ejecutándose en segundo plano sin mecanismo real.

## 4. Checkpoint y reanudación

Persistir tras cada unidad de autoría. Registrar sesión, idioma, identidad/ruta y revisión del HTML, inventario previsto (incluidos IDs de subtemas), bloques terminados/pendientes, próximos pasos, artefactos B y estado de pruebas. Mantener registro fuera de la prosa de estudio (metadatos internos o auditoría externa). Verificar guardado; si no es posible, entregar material parcial y explicar limitación. Retomar bloques incompletos sin reautoría de los existentes; modificar solo alcance pedido y preservar versiones. Nunca bloquear edición por estado pendiente.

## 5. Criterio de salida

Completo en contenido solo cuando estén las 19 secciones y todos los subtemas del roadmap, satisfagan profundidad 22, conteos/coberturas 17, y estén los documentos B pertinentes. Completo funcionalmente solo tras pruebas de los widgets reales. Publicación canónica es estado posterior con aceptación explícita y validaciones de Sources 11–13. Registrar por separado estructura, profundidad, comportamiento, aprobación y evidencias; FAIL/PENDING no bloquea autoría, impide afirmar cumplimiento no verificado.
