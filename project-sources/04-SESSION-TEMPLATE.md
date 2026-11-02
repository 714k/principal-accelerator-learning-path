# Plantilla editorial y de estudio — PA-Sxxx (v10)

## Activación — Etapa 0

En un mensaje que contenga únicamente PA-Sxxx, presentar **una planificación revisable, no teoría completa ni Codex**: encabezado H1 único, metadatos (fase, ámbitos y proyecto), síntesis provisional de tres ideas, objetivo, tabla de contenido, concepto global por dominio como **término: definición breve**, Tema principal con conceptos locales presentados igual, lista completa de Subtemas con términos/definiciones, caso real propuesto+estado de fuente, diseño de producción propuesto y sus componentes, Studio, ejercicios y materiales, app/lab, revisión de evidencias y un registro de aceptación inicial `PENDIENTE`.

**En esta etapa ninguna definición breve sustituye la lección extensa posterior.** No listar `scope.application` ni otros IDs de máquina. No imprimir un encabezado de «conceptos, en orden: ...»: usar cada término como inicio de una definición legible.

## Encabezado de documento final

```markdown
<!-- session_id, section_id, concept_id, source_refs y tracking_id son metadatos no visibles -->
F0 · PA-S001 · Staff → Principal / FPA / AIPE
# Fundamentos de ingeniería de software: arquitectura, plataforma y alcance Staff → Principal

Analizar las decisiones de arquitectura y sus consecuencias en sistemas reales.
```

La descripción debajo del H1 no es otro título. No añadir marcadores vacíos en el documento final. Un H1 máximo; `PA-S001` queda en metadatos/breadcrumb. Sin títulos con `PA-S001 —` repetidos.

## Esqueleto del documento español final

1. Síntesis en 30 segundos — exactamente tres ideas, no reemplaza teoría.
2. Objetivo — aprendizaje y decisiones técnicas que podrán comprobarse.
3. Vista previa del aprendizaje — dominios, conceptos necesarios, preguntas, actividades y dependencias.
4. Conceptos — conceptos fundacionales enseñados según su dominio (Staff→Principal, FPA, AIPE), sin mezclar carreras ni llenar carriles artificialmente. Cada término explicado, no IDs impresos.
5. Tema principal — conceptos locales individuales, definición/alcance, mecanismo concreto, ejemplo explicado, contraejemplo, alternativas, calidad y verificaciones, diagrama/tabla/code cuando agrega valor, respuesta de recuperación.
6. Subtemas — exactamente los determinados por Source 03 más conceptos implícitos necesarios. Cada uno mini-capítulo autosuficiente con fundamentos locales, mecanismo, caso, fallos, producción y comprobación.
7. Integración entre dominios — solo si la conexión es útil y después de enseñar por separado.
8. Teoría → Práctica — el único bloque teórico destinado a trasladar al Portfolio, Learning Site o app de la sesión.
9. Tiempo — **estimación**, entradas y suma; no confundir con horas medidas.
10. Ejemplo del mundo real — entidad identificable, fuente oficial, problema, mecanismo publicado, alternativas/limitaciones, distinción hecho/inferencia y lección.
11. Ejemplo listo para producción — referencia implementable en dominio externo: componentes, flujo de datos y control, API, estados, contrato de errores, autenticación/autorización, seguridad, concurrencia/idempotencia si aplica, pruebas, despliegue, observabilidad, fallos/operación; decir **no validado** si no se ejecutó.
12. Visual Learning Studio — mapa mental Mermaid source-linked de Concepts/Tema/Subtemas y flashcards de cobertura total con pregunta, respuesta razonada y referencias; otras formas adaptativas solo cuando correspondan.
13. Ejercicios — casos concretos, criterios, respuesta/solución explicativa, transferencia y fallos; distinta dificultad según contenido.
14. Fuentes verificadas — referencias específicas utilizadas y enlaces a evidencias reales, no bibliografía decorativa.
15. Recursos complementarios — lectura/curso específico, propósito y apartado útil, sin placeholders.
16. Checklist de estudio — acciones reversibles y accesibles, independientes de evidencia.
17. Criterios de éxito — resultados evaluables, evidencia requerida para L1–L5 sin otorgarla automáticamente.
18. Puente — conexión conceptual y técnica con PA-Sxxx siguiente.

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
