# Verificación estructural — v11 (14 de noviembre de 2026)

## Resultado del verificador local

`python VERIFY-V11.py`: **PASS** (en archivos entregados). Este verificador comprueba presencia de Sources y auxiliares, 120 IDs, longitud de Settings y estructura HTML de **una muestra**, además de condiciones estáticas. No demuestra calidad académica, cumplimiento efectivo del renderer ni accesibilidad de la publicación.

```text
V11 STATIC STRUCTURAL CHECK: PASS
 + 17 numbered sources 00..16
 + auxiliary and install files exist
 + settings <=8000 Unicode characters, actual=7941
 + settings <=8000 UTF-16 units
 + 120 consecutive session app targets
 + roadmap contains all 120 sessions
 + 01-PROJECT-INSTRUCTIONS.md: v11 contract present
 + 04-SESSION-TEMPLATE.md: v11 contract present
 + 06-TECHNICAL-STANDARDS.md: v11 contract present
 + 11-CODEX-GUIDELINES.md: v11 contract present
 + 12-ARTIFACT-AND-PUBLISHING-STANDARD.md: v11 contract present
 + 13-CANONICAL-SESSION-AUDIT.md: v11 contract present
 + 16-EDITORIAL-REVIEW-PROTOCOL.md: v11 contract present
 + PROJECT-INSTRUCTIONS-SETTINGS.md: authoring firewall
 + PROJECT-INSTRUCTIONS-SETTINGS.md: code firewall
 + 11-CODEX-GUIDELINES.md: authoring firewall
 + 11-CODEX-GUIDELINES.md: code firewall
 + CODEX-SESSION-MASTER-PROMPT.md: authoring firewall
 + CODEX-SESSION-MASTER-PROMPT.md: code firewall
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: exactly one H1
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: single full phase+session label
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: no abbreviated F0
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: no guillemet concept definitions
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: unique IDs
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: fragment anchors resolve
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: semantic tags present
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: local concept heading
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: local synthesis
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: local studio
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: local flashcards
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: local resources
 + PA-S002-SEMANTIC-HTML-REFERENCE.html: subtopic-7 anchor wired
NOT CHECKED: LIVE PAGE, URLs HTTP, pedagogy, actual build, SVG compilation, ES/EN parity, Git changes, keyboard, mobile, or prior approval.
```

## Inspección real y limitaciones

- **Confirmado en GitHub conectado:** repositorio `714k/principal-accelerator-learning-path` en rama principal; solo se leyó el contenido español `site/content/canonical/PA-S002-theory-es.md` y el código del renderizador `site/tooling/pa-s002.ts` como contenido de una sesión.
- **Confirmado en la fuente PA-S002:** contiene definiciones con comillas angulares y capítulos sin todos los elementos locales v11; el Subtema 7 presenta conceptos, explicaciones, ejercicio y cierre, pero no incluye allí su propia síntesis en 30 segundos, diagrama contextual, flashcards, Studio ni recursos específicos completos. El material global en el documento no sustituye esa cobertura local.
- **Confirmado en el renderizador PA-S002:** `conceptList` acepta definiciones delimitadas por `« »` y `laneDefinitionList` extrae definiciones de frases con ese formato; v11 requiere fuente estructurada o conversión a formato natural sin depender de esas comillas en el HTML visible.
- **No comprobado:** HTML **publicado** en `https://714k.github.io/principal-accelerator-learning-path/es/sessions/PA-S002/#subtopic-7` (el acceso vía herramienta web devolvió cache miss), render visual en teléfono/tableta/escritorio, compilación Mermaid→SVG del sitio real, navegación real de anchors, tests de aplicaciones, estado del working tree local, paridad ES/EN y ninguna aprobación editorial posterior.
- **URLs externas comprobadas mediante lectura web:** páginas oficiales de GitHub CODEOWNERS, TypeScript Modules y npm `package.json` (sección `exports`). Las redirecciones y disponibilidad futura de los enlaces deben volver a revisarse al publicar.
- **Git:** no se cambió código, archivos del repo, teorías canónicas, Storybook, dashboard ni configuración de despliegue. Tampoco se certificaron mejoras en aprendizaje.

## Criterio de prueba de aceptación

1. Sustituir Sources 00–16 e instrucciones. Generar el inventario PA-S002 solo si se solicita la sesión inicial, o el Subtema 7 cuando se solicite expresamente; no reescribir lo aprobado sin reconfirmación.
2. Validar en el **HTML construido** exactamente una leyenda `Fase 0 · PA-S002`, único H1, vista conceptual vertical, ámbitos separados y conceptos término:definición+ejemplo.
3. Verificar Subtema 7: síntesis local, conceptos, diagramas SVG reales, ejercicios con soluciones, tarjetas, Studio local y fuentes; enlaces internos (incluido `#subtopic-7`) y externos.
4. Ejecutar `python VERIFY-V11.py --html ruta-del-html` sobre el HTML generado; inspeccionar manualmente la página en móvil, tableta y desktop, con teclado, JS desactivado y modo de movimiento reducido.
5. Comparar contenido con los bloques aprobados y registrar explícitamente cualquier diferencia; no publicar contenido adicional que falte aprobar.

## Nivel de confianza

**Alto en empaquetado e integridad estructural**; **medio en la utilidad del contrato**, sujeto a que Codex y el usuario comprueben el render real; **insuficiente para certificar la página de GitHub Pages actual**, que no pudo inspeccionarse mediante la URL directa.
