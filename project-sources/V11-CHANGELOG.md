# Registro de cambios — v10 a v11

**Alcance:** contratos editoriales y renderizado del contenido educativo de `site/`; referencia exclusiva PA-S002. No hay cambio de roadmap, app targets, resultados ni teoría canónica; no se tocó Git.

1. Rótulo `Fase N · PA-Sxxx` visible una sola vez, sin `F0` abreviado.
2. Vista previa de conceptos vertical, ámbitos profesionales diferenciados.
3. Conceptos siempre `Término: definición` con ejemplo contextual propio; sin `« »` y sin machine IDs.
4. Encabezados locales `Conceptos del tema principal` y `Conceptos del subtema N`.
5. Cada Tema principal/Subtema con tres ideas de síntesis local, ejemplo trabajado, Mermaid→SVG propio explicado, ejercicios y solución, tarjetas, Studio local y recursos vinculados. Studio integral intacto.
6. Variedad de visualización seleccionada por función pedagógica (estructura, flujo, contraste, decisión y predicción) y compatible con no-JS.
7. HTML semántico para párrafos, secuencias, colecciones, términos, diagramas, controles y código.
8. Anclas únicas `href="#id"`, rutas base correctas y texto de enlace legible.
9. Nuevos gates editoriales/DOM y verificador reproducible, pero no sustituyen validación de publicación real.
10. Fuente S002 inspeccionada: `site/content/canonical/PA-S002-theory-es.md`, renderizador `site/tooling/pa-s002.ts`. El HTML publicado de GitHub Pages no fue accesible, por lo que el diagnóstico visual de esa URL queda pendiente.

## Tensión con v10 que queda resuelta

Source 16 v11 prevalece sobre muestras históricas que muestran guillemets en definiciones y `F0`. Algunos archivos normativos conservan descripciones históricas de errores para trazabilidad; esas descripciones no son permiso de renderizar el formato rechazado.
