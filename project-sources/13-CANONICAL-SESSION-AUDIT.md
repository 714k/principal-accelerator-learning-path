# Auditoría de aceptación — v10

## 0. Enrutamiento y flujo editorial

- [ ] Bare PA-Sxxx devolvió SOLO el inventario editorial en idioma solicitado, sin Codex ni capítulo completo.
- [ ] Solicitud explícita de capítulo devolvió ÚNICAMENTE ese capítulo completo.
- [ ] Solicitud explícita de toda la sesión devolvió borrador íntegro claramente **no aprobado** (nunca aprobación asumida).
- [ ] Aprobaciones emitidas realmente por el usuario; correcciones afectan solo el bloque pertinente; cambios a bloque aprobado requieren reconfirmación.
- [ ] Se preservan historial/estado por sección y fuente; ES/EN posterior equivalente.

## 1. Presentación visible

- [ ] Exactamente **un H1** por documento y páginas publicadas; sesión/fase en metadatos/breadcrumb.
- [ ] No hay segundo título equivalente ni IDs impresos como `engineering.software`, `scope.application` o `Sxxx-C01` en textos académicos visibles.
- [ ] Todos los conceptos del inventario se muestran **«término: definición breve»**, no listados solos ni con código de máquina.
- [ ] No hay etiquetas «Nivel 1/2/3/4/5» como estructura pedagógica; L1–L5 solo para competencias en sección pertinente.
- [ ] No hay placeholders, secciones vacías, listas sin prosa suficiente ni «mecanismos resueltos» sin ejecución explicada.

## 2. Profundidad y atómica

- [ ] Conceptos del Tema principal inventariados y enseñados **localmente**, individualmente antes de síntesis.
- [ ] Cada Subtema enseña sus conceptos locales, no depende de un glosario inicial ni de una tabla compuesta.
- [ ] Término, alcance y qué no es; actores/componentes concretos; datos, estados, contratos y mecanismo real; fallos, alternativas, trade-offs, producción y verificación.
- [ ] Al menos un ejemplo trazable y específico por concepto importante, con preguntas de recuperación concretas y **respuestas explicativas correctas**.
- [ ] Diagrama/tabla/código próximo al texto que representa y explicado; sin métricas o causalidad inventadas.
- [ ] Enfoque Staff → Principal / FPA / AIPE separado cuando aplica, síntesis posterior justificada.

## 3. Ejemplos y fuentes

- [ ] Ejemplo académico NO usa el propio Accelerator como explicación; solo se menciona en Theory→Practice o Build.
- [ ] Caso Real-World basado en empresa/publicación específica y fuente primaria comprobada; distinguir hechos, inferencias y límites de evidencia.
- [ ] Production-Ready Example externo con requerimientos, componentes, contratos, input/output/errores, código esencial, estados, casos adversos, autenticación/autorización, datos, idempotencia/concurrencia si aplica, pruebas, despliegue, migraciones, observabilidad y rollback según el dominio.
- [ ] Se dice `diseño no validado` si no hay resultados reales de ejecución; «listo para producción» es objetivo de calidad, no certificación automática.
- [ ] Fuentes cercanas a afirmaciones; bibliografía realmente utilizada; recursos específicos sin enlaces decorativos.

## 4. Aprendizaje adaptativo y Studio

- [ ] Síntesis de tres ideas; glosas ≤10 palabras cuando útiles; progresión comprensión→mecanismo→profundización opcional sin «niveles» impresos.
- [ ] Se elige la técnica por concepto (contraste, dependencia, predecir/revelar, ejemplo trabajado, matriz decisional), sin widgets obligatorios.
- [ ] Recuperación y explicación por concepto, repaso de transferencia, mecanismos de interacción accesibles con fallback.
- [ ] Mapa mental Mermaid cubre todos los Conceptos/Tema/Subtemas; `.mmd` y SVG legible, responsive, accesible; flashcards cubren todo con respuestas, fuentes y teclado/touch/no-JS.

## 5. App, código y regresiones

- [ ] Source 03 / Source 09 identifican app ejecutable o revisión, con modalidad y entregables separados del site ES/EN.
- [ ] PA-S004 incluye Design System + Storybook runnable, no solamente teoría y Portfolio.
- [ ] PA-S001–PA-S005 preservan capacidades de sesiones previas; revisión cruzada antes de plataforma general S006.
- [ ] Git, Technology Radar y `/ui-reference/` inspeccionados antes de decisiones de implementación.
- [ ] Codex no reescribió teoría aprobada, ni cambió lógica de aplicación para presentación.
- [ ] Build/tests/HTML ES/EN/nav/dashboard/checkboxes/diagramas/flashcards/a11y/responsivo/light-dark/Storybook según aplique, y `git diff` realmente ejecutados, evidencia preservada.
- [ ] No se inventó progreso, desempeño, dominio L1–L5 o resultados CI; reportar qué comandos se ejecutaron realmente y limitaciones.

## 6. Gates

- Faltan textos canónicos ES y EN completos o accesibles → `MISSING_CANONICAL_THEORY_PAYLOAD`.
- Faltan conceptos atómicos, definiciones profundas, retrieval o paridad semántica → `MISSING_ATOMIC_CONCEPT_COVERAGE`.
- Falta app ejecutable obligatoria → `MISSING_SESSION_APP_TARGET`.
- Falla precisión de caso empresarial o ejemplo production-ready → devolver al bloque editorial; **no publicar**.

**Cobertura por grep/script, presencia de heading y CI verde no certifican calidad pedagógica ni comportamiento de dispositivos físicos. Revisión humana indispensable.**
