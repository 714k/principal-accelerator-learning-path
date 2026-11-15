# Instalación v11 — reemplazo completo de reglas

1. Descargar el ZIP y hacer copia de Sources 00–16 e instrucciones actuales.
2. Reemplazar en Project → Sources **exactamente 17** ficheros numerados 00–16 con los de v11; evitar duplicados v9/v10. Los auxiliares NO van en Sources.
3. Reemplazar íntegramente Project → Settings → Instructions con `PROJECT-INSTRUCTIONS-SETTINGS.md`. No concatenar v10/v11. Su tamaño se comprueba en `CURRENT-VERIFICATION.md`.
4. No modificar contenido canónico o Git automáticamente: el ZIP cambia **contratos**, no ejecuta el build del sitio ni cambia teoría aprobada.
5. Para la prueba, utilizar PA-S002 como único caso: revisar el inventario, pedir el Subtema 7 con síntesis local, conceptos+ejemplo, diagrama, ejercicio, tarjetas, Studio, recursos; comprobar la leyenda única y anchors legibles.
6. Al solicitar Codex, proporcionar teorías canónicas aprobadas ES/EN realmente disponibles. Aplicar pruebas a HTML generado, incluyendo `#subtopic-7` y enlaces de recursos, sin tocar lógica de aplicación. El `PA-S002-SEMANTIC-HTML-REFERENCE.html` ilustra el marcado; NO es la página publicada ni está aprobado.
7. Ejecutar `python VERIFY-V11.py`. Opcionalmente `python VERIFY-V11.py --html path/a/PA-S002/index.html` para controles parciales del HTML real. Revisar manualmente teclado, touch, zoom, responsive, no-JS, reduced-motion, enlaces HTTP y calidad académica.

**Limitación:** la página de GitHub Pages enviada no se pudo leer mediante la herramienta web; se recuperaron del repositorio GitHub el Markdown canónico PA-S002 en español y su renderizador. No se inspeccionó ninguna otra sesión del sitio en esta revisión.
