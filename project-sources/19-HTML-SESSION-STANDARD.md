# Source 19 — HTML de aprendizaje progresivo (v14)

## Superficie y autoridad

Un archivo HTML autocontenido por sesión e idioma, `PA-Sxxx-ES.html` inicialmente y `PA-Sxxx-EN.html` cuando el estudiante solicite traducción. Contiene únicamente material destinado al Learning Site, incluido contenido de instrucciones de práctica, estudios de caso, recursos y descripción de entregables; no es la implementación del site, la app, el Portfolio, ni un sustituto de sus archivos. Los Markdown canónicos ES/EN se consolidan del contenido aprobado para handoff; no duplicar a mano la teoría ni convertir HTML a resumen.

El HTML es la superficie principal para todos los interactivos y gráficos. No depender del renderizado de chat. Adjuntar/enlazar el archivo real, no pegar código como entrega didáctica. La vista de chat puede servir para previsualizar o revisar un bloque a solicitud explícita. Si previsualización restringe JavaScript, ofrecer descarga y apertura en navegador normal; comprobar ejecución donde sea posible y declarar limitaciones. No contar estáticos ni promesas como widgets.

## Ciclo de vida no bloqueante

1. Bare PA-Sxxx: iniciar o retomar el HTML integral de Source 23, persistir cada capítulo y continuar automáticamente mientras sea posible. En modo introductorio/progresivo explícito, persistir solo los seis apartados iniciales si se pide el HTML. El índice puede anunciar capítulos pendientes sin simular que existen ni enlazar a fragmentos inexistentes (usar texto hasta incorporarlos). Entregar un HTML por idioma, nunca partes finales separadas.
2. Cada solicitud de capítulo activa Sources 18/22/17, sin pedir al usuario repetir instrucciones. Recuperar el HTML existente por sesión/idioma, leer su contenido y localizar la sección por identificador estable. Trabajar con fragmentos delimitados y conservar fuera del alcance texto, ejemplos, datos, controles y estilo. Si el capítulo no existe, insertarlo en orden semántico, aunque otros no existan. Generar base parcial si se necesita.
3. Si el documento previo no es accesible, no sobreescribir ni afirmar recuperación. Entregar el bloque solicitado como revisión parcial claramente identificada; recuperar el original antes de fusionar. Nunca negar la autoría por falta de documento/estado/aprobación. Si el usuario pide corregir bloque aprobado, hacerlo; distinguir revisión nueva de la anterior y actualizar estado solo del bloque modificado.
4. Persistir después de cada bloque; comprobar archivo y actualización. Registrar identidad/revisión/estado de bloques en metadatos internos, informe externo o mecanismo equivalente. Conservar contenido no solicitado mediante comparación estructural o hashes de segmentos; no reserializar/truncar bloques aprobados por ahorrar contexto. Evitar regenerar toda la sesión por un cambio local. No afirmar persistencia si no se confirmó el guardado.
5. `Consolida la sesión`: ensamblar lo disponible, señalar cobertura/partes pendientes como estado externo, no presentar huecos como lecciones concluidas. Si falta longitud/capacidad, entregar incrementos completos y conservarlos. Traducción EN puede iniciar aun con partes pendientes; equivalencia y aprobación completas solo al publicar canónicamente.

## Presentación y semántica

Usar HTML5 válido: `main/article/section`, un H1 humano, label fase una vez, `nav` con `ol` anidado e índice, H2 de secciones y H3 de subtemas, `dl/dt/dd` por concepto (término con dos puntos, definición, párrafo propio Ejemplo), `p`, `ol/li`, `ul/li`, `figure/figcaption`, `pre/code`, `strong/em`, `fieldset/legend` y `table` solo para datos comparables. No tablas de conceptos/flashcards ni IDs técnicos impresos. Anclas semánticas estables, únicas, resolubles. En borrador no enlazar destinos aún ausentes; actualizar el índice cuando se añadan. Glosas ≤10 palabras cuando útiles; expandir siglas. Diseño mobile-first, ancho legible, Light/Dark, foco visible, contraste, teclado, touch, reduced-motion; no decoración rosa/morada/arcoíris sin justificación. Consultar `/ui-reference/` antes de implementar el site real, no afirmar inspección si no se hizo.

CSS/JS legible, nombres significativos, funciones pequeñas, sin ofuscación/minificación, Prettier para formatos compatibles según Source 06. No añadir dependencias remotas obligatorias; preferir SVG y JS nativo, estilos y scripts inline en el HTML autónomo. Las referencias externas son links de consulta, no requisito de ejecución offline. SVG con viewBox y título/descripción, Mermaid fuente preservada cuando se usa, gráficos junto al mecanismo. No exponer secretos ni datos privados. Evitar `innerHTML` con contenido no confiable, eval, llamadas externas y controles decorativos.

## Estructura verificable

Usar IDs globales de `SESSION-SCHEMA.json` y `data-section` para cada capítulo, `data-studio-scope` para cada Studio, `data-widget` por tipo (`mind-map`, `flashcards`, `simulator`, `architecture-explorer`, `decision-matrix`), `data-concept` por concepto, `data-concept-id` estable ES/EN, `data-definition`, `data-example`, `data-coverage` con IDs de conceptos de cada modo, `data-diagram` por figura técnica. Mantener conceptos/ejemplos visibles y alternativa sin JS, no incluir IDs en etiquetas. Para JavaScript usar controles nativos y `aria-live`/estado accesible cuando cambian resultados. Ref de comportamiento: `SESSION-HTML-REFERENCE.html` (fixture ilustrativo, no teoría canónica), Source 17 detallado. Si los auxiliares no están disponibles, seguir contratos textuales y marcar verificación de referencia pendiente, no bloquear autoría. El validador no convierte su fixture en contenido real.

## Publicación posterior

En handoff autorizado, Codex integra contenido ES/EN semánticamente idéntico y las interacciones verificadas en `site/`, preservando arquitectura y código de negocio; no copiar indiscriminadamente CSS/JS de referencia a producción. Mantener Mermaid fuente, SVG, cobertura 5/3/5, responsive, navegación, dashboard y tracking reversible compartido ES/EN; validar build/DOM/site real. Source 12/11/06 conservan criterios de producción. No confundir HTML de estudio con código publicado ni evidencia de app ejecutable.

## Esquema DOM completo (equivalente a SESSION-SCHEMA.json)

El JSON separado es auxiliar de Git, no se necesita cargarlo en Sources. Usar el esquema incluido aquí cuando no se tenga acceso al repositorio. La copia debe permanecer idéntica al archivo de herramientas.

```json
{
  "version": "v14",
  "defaultMode": "integral",
  "requiredHeader": ["h1", "capability-paragraph"],
  "estimatedTimeColumns": ["Actividad", "Tiempo"],
  "estimatedTimeTotal": "Total",
  "sections": ["structure", "estimated-time", "summary", "objective", "preview", "concepts", "main-topic", "integration", "theory-practice", "real-world", "production-example", "global-studio", "exercises", "sources", "work-resources", "deliverables", "checklist", "success-criteria", "bridge"],
  "initialSectionCount": 6,
  "subtopicPattern": "^subtopic-[1-9][0-9]*$",
  "allModes": ["mind-map", "flashcards", "simulator", "architecture-explorer", "decision-matrix"],
  "subtopicRequiredModes": ["mind-map", "flashcards"],
  "minimumMain": 5,
  "minimumSubtopic": 3,
  "minimumGlobal": 5,
  "attributes": {"section": "data-section", "studio": "data-studio-scope", "widget": "data-widget", "concept": "data-concept", "conceptId": "data-concept-id", "definition": "data-definition", "example": "data-example", "coverage": "data-coverage", "diagram": "data-diagram"},
  "notes": "Descriptive DOM contract. Minimum 10+3*N scoped resources. Structure is not evidence of academic depth or behavior."
}
```
