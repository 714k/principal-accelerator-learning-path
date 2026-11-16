# Instalación v13

1. Extraer el ZIP de Sources: exactamente 25 archivos, 23 contratos numerados 00–22 y dos referencias (`SESSION-SCHEMA.json`, `SESSION-HTML-REFERENCE.html`). Subirlos a Project Sources, reemplazando versiones anteriores del mismo nombre y evitando duplicados. No subir auxiliares históricos ni scripts de Git.
2. Sustituir íntegramente Project Settings → Instructions por `PROJECT-INSTRUCTIONS-SETTINGS.md` v13. Este archivo NO forma parte del ZIP.
3. Comprobar PA-Sxxx: solo seis secciones, índice anidado, tiempo inmediatamente después. Solicitar HTML y subtema fuera de orden: preservar lo existente y desarrollar a profundidad. Solicitar global: cinco modos adicionales; mínimo 10+3N.
4. En Git ejecutar `python3 project-sources/VERIFY-V13.py`, `python3 project-sources/VALIDATE-SESSION.py project-sources/SESSION-HTML-REFERENCE.html --complete` y `node project-sources/TEST-SESSION-INTERACTIONS.cjs project-sources/SESSION-HTML-REFERENCE.html`. Requiere Node, Playwright y Chromium; CHROMIUM_PATH opcional. Referencia no certifica contenido ni mastery.
5. Ningún estado editorial bloquea autoría; los pendientes limitan completitud y publicación canónica, no el aprendizaje.
