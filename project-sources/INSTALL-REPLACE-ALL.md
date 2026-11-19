# Instalación v14

1. Extraer el ZIP de Sources: exactamente 25 archivos, 24 contratos numerados 00–23 y `SESSION-HTML-REFERENCE.html`. Reemplazar los Sources v13 por esos archivos, evitando duplicados. Retirar `SESSION-SCHEMA.json` de Sources (su contenido íntegro ahora está en Source 19; sigue en Git). No subir auxiliares históricos ni scripts. Subir en lotes de hasta 10.
2. Sustituir íntegramente Project Settings → Instructions por `PROJECT-INSTRUCTIONS-SETTINGS.md` v14. Este archivo NO forma parte del ZIP.
3. Comprobar con PA-Sxxx: HTML integral 19 secciones, H1 + capacidad, índice anidado, tabla de tiempo inmediatamente después, plano B separado. Verificar que introducción/modo progresivo explícito se detiene en seis secciones; probar edición local y reanudación. Studio global: cinco modos adicionales; mínimo 10+3N.
4. En Git ejecutar `python3 project-sources/VERIFY-V14.py`, `python3 project-sources/VALIDATE-SESSION.py project-sources/SESSION-HTML-REFERENCE.html --complete` y `node project-sources/TEST-SESSION-INTERACTIONS.cjs project-sources/SESSION-HTML-REFERENCE.html`. Requiere Node, Playwright y Chromium; CHROMIUM_PATH opcional. Referencia no certifica contenido ni mastery.
5. Ningún estado editorial bloquea autoría; los pendientes limitan completitud y publicación canónica, no el aprendizaje.
