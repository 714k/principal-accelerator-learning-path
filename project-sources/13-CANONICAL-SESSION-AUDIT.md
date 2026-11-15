# Auditoría de aceptación — v12

## 0. Enrutamiento y flujo editorial

- [ ] Bare PA-Sxxx devolvió SOLO el inventario editorial en idioma solicitado, sin Codex ni capítulo completo.
- [ ] Solicitud explícita de capítulo devolvió ÚNICAMENTE ese capítulo completo.
- [ ] Solicitud explícita de toda la sesión devolvió borrador íntegro claramente **no aprobado** (nunca aprobación asumida).
- [ ] Aprobaciones emitidas realmente por el usuario; correcciones afectan solo el bloque pertinente; cambios a bloque aprobado requieren reconfirmación.
- [ ] Se preservan historial/estado por sección y fuente; ES/EN posterior equivalente.

## 1. Presentación visible

- [ ] Exactamente **un H1** por documento y páginas publicadas; sesión/fase en metadatos/breadcrumb.
- [ ] No hay segundo título equivalente ni IDs impresos como `engineering.software`, `scope.application` o `Sxxx-C01` en textos académicos visibles.
- [ ] Todos los conceptos del inventario se muestran **término: definición breve**, no listados solos ni con código de máquina.
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
- [ ] Se elige la técnica por concepto (contraste, dependencia, predecir/revelar, ejemplo trabajado, matriz decisional), respetando el mínimo obligatorio v12 de recursos interactivos por capítulo.
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

## v11 — Checklist de aceptación específico del Learning Site (PA-S002 es único caso inspeccionado)

### Editorial
- [ ] Un solo rótulo contextual visible `Fase N · PA-Sxxx`; no repetir combinación ni usar `F0` en texto visible.
- [ ] Exactamente un H1 humano, sin machine IDs ni comillas angulares en definiciones.
- [ ] Vista previa de conceptos en secuencia **vertical**, separada por ámbito profesional, sin mezclar listas de FPA/AIPE/Staff.
- [ ] TODOS los conceptos aparecen como `Término: definición`, y cada uno tiene ejemplo pertinente inmediatamente próximo y distinguible de su definición.
- [ ] Cada Tema principal y cada Subtema incluye síntesis **local** en 30 segundos (tres ideas), encabezado explícito `Conceptos del tema principal`/`Conceptos del subtema N`, mecanismo profundo y ejemplo.
- [ ] Hay al menos un diagrama propio, explicativo y contiguo a la teoría de **cada** Tema principal/Subtema; no se acepta como sustituto el mapa mental final.
- [ ] Cada capítulo contiene ejercicios con soluciones, tarjetas con respuestas, Visual Learning Studio local con cobertura interactiva 5/3 y recursos específicos con links verificados. El Studio general cubre además los conceptos globales y todos los capítulos.

### HTML, URLs y comportamiento
- [ ] HTML semántico validado: `article/section`, `p`, pasos `ol/li`, conjuntos `ul/li`, términos `dl/dt/dd`, `figure/figcaption`, énfasis `strong/em`, `fieldset/legend` cuando se agrupan controles, código `pre/code` y tablas con encabezados.
- [ ] Ninguna lista lógica convertida en párrafos + saltos, ni elementos `li` fuera de `ol/ul`.
- [ ] Todas las anclas `href="#..."` apuntan a destinos presentes con `id` único, incluido `#subtopic-7` cuando se inspecciona PA-S002; links externos con texto legible y URL verificable.
- [ ] Enlaces entre rutas funcionan bajo el prefijo de GitHub Pages y en carga directa de una URL con fragmento.
- [ ] SVG accesibles con fuente Mermaid conservada, sin fallos de responsive/teclado/touch/no-JS/reduced-motion.
- [ ] ES/EN tienen la misma cobertura de conceptos, ejemplos, diagramas, actividades, recursos y anclas semánticas.
- [ ] En auditoría de sitio, registrar página/versión Git exacta, HTML generado examinado, comandos y resultados; no dar por aprobada una prueba por estar escrita en el contrato.

**Gates editorial/publicación:** `MISSING_LOCAL_CHAPTER_COVERAGE` para capítulos sin síntesis/definiciones+ejemplos/diagrama/ejercicios/flashcards/Studio local/recursos; `INVALID_SEMANTIC_MARKUP` para estructura de HTML; `BROKEN_ANCHOR` para enlaces fragmentarios; `DUPLICATE_SESSION_CONTEXT` para rótulo compuesto repetido. Verificador auxiliar `VERIFY-V12.py` ofrece revisión parcial automática; no sustituye prueba física o evaluación académica.

## v12 — Gates de auditoría adicionales

- [ ] Inventario inicial: estructura numerada después del título; solo inventario y STOP si petición bare PA-Sxxx.
- [ ] Conceptos agrupados por Staff→Principal/FPA/AIPE en vertical, cada uno con definición y párrafo `Ejemplo:`; sin tablas, IDs, comillas angulares. Flashcards no tabulares.
- [ ] Tema principal: 5 modos distintos (mapa, tarjetas, simulador, explorador, matriz); cada Subtema: 3 como mínimo (mapa, tarjetas, otro de los tres). Studio global adicional.
- [ ] Cada control produce respuesta visible; nodos seleccionables y resaltados, tarjetas navegables, simulador cambia resultado, explorador revela contrato/dependencias, matriz recalcula scores/ranking. Contar recursos funcionales, no estáticos, fallback, código ni promesas. Verificar manualmente, documentar limitaciones sin declarar PASS ficticio.
- [ ] Studio/diagramas/recursos locales cubren los conceptos de esa sección; pruebas ES/EN, teclado/touch/no-JS, responsive y reduced-motion.
- [ ] Entregables antes del Checklist: site ES/EN, objetivo Source 09, Portfolio si aplica, instrucciones numeradas, comandos comprobados, rutas, responsables y aceptación/evidencia.
- [ ] Código legible sin ofuscación/minificación propia; Prettier y check/CI ejecutados cuando hay implementación; preservar semántica y fuentes aprobadas.
- [ ] PA-S003 punto 13 es integración transversal de AIPE/Staff/FPA.

Bloquear completitud editorial si falta cobertura funcional, no confundir verificación documental con prueba de navegador o aprendizaje. Sources 14 y 16 definen los comportamientos.
