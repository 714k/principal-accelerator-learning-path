# Instalación v12 — reemplazo completo de reglas

1. Descargar el ZIP y hacer copia de Sources 00–16 e instrucciones actuales.
2. Reemplazar en Project → Sources **exactamente 17** ficheros numerados 00–16 con los de v12; evitar duplicados de versiones anteriores. Los auxiliares NO van en Sources.
3. Reemplazar íntegramente Project → Settings → Instructions con `PROJECT-INSTRUCTIONS-SETTINGS.md`. No concatenar versiones anteriores. Su tamaño se comprueba en `CURRENT-VERIFICATION.md`.
4. No modificar contenido canónico o Git automáticamente: el ZIP cambia **contratos**, no ejecuta el build del sitio ni cambia teoría aprobada.
5. Para la prueba, utilizar PA-S002 como único caso: revisar el inventario, pedir el Subtema 7 con síntesis local, conceptos+ejemplo, diagrama, ejercicio, tarjetas, Studio, recursos; comprobar la leyenda única y anchors legibles.
6. Al solicitar Codex, proporcionar teorías canónicas aprobadas ES/EN realmente disponibles. Aplicar pruebas a HTML generado, incluyendo `#subtopic-7` y enlaces de recursos, sin tocar lógica de aplicación. El `PA-S002-SEMANTIC-HTML-REFERENCE.html` ilustra el marcado; NO es la página publicada ni está aprobado.
7. Ejecutar `python VERIFY-V12.py` en el directorio project-sources. Verificar por separado el HTML generado, teclado, touch, zoom, responsive, no-JS, reduced-motion, enlaces HTTP y calidad académica.

**Limitación:** la página de GitHub Pages enviada no se pudo leer mediante la herramienta web; se recuperaron del repositorio GitHub el Markdown canónico PA-S002 en español y su renderizador. No se inspeccionó ninguna otra sesión del sitio en esta revisión.

8. Comprobar la v12 en una sesión: bare PA-Sxxx produce solo inventario numerado; solicitar tema principal (5 recursos interactivos) y subtema (mínimo 3), probar controles y revisar Entregables. Las referencias v11 son parciales e históricas; no son implementación v12.
