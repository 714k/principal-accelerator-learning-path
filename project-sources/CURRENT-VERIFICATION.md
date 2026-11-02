# Verificación estructural de v10 — 31 de octubre de 2026

## Comprobaciones ejecutadas (resultado real)

- `python VERIFY-V10.py`: **PASS**. Script disponible para ejecución local.
- Sources numerados: **17**, del `00` al `16`, sin duplicados en el paquete.
- Mapa `SESSION-APP-TARGETS-120.csv`: **120 sesiones consecutivas**, de PA-S001 a PA-S120.
- Roadmap `03`: contiene las 120 sesiones.
- PA-S004: destino ejecutable **Design System + Storybook**; PA-S039 evoluciona la plataforma.
- Instrucciones: **6399 caracteres** (`PROJECT-INSTRUCTIONS-SETTINGS.md`), debajo de 8000.
- Los dos ejemplos PA-S001 se revisaron estructuralmente: un H1, sin IDs de conceptos unidos por puntos.
- Firewalls de autoría/código presentes en instrucciones, Codex y prompt maestro.
- Los archivos y hashes SHA-256 se registran en `SHA256SUMS.txt` y `MANIFEST.json`.

## Límites que NO se han verificado

Esta auditoría estructural **no** revisó ni modificó el repositorio Git, no ejecutó tests del sitio ni de Storybook, no certificó paridad semántica ES/EN de una teoría final, no confirmó casos externos mediante búsquedas nuevas, no evaluó la calidad pedagógica completa y no registró aprobaciones editoriales nuevas. La teoría canónica completa de PA-S001 **no se adjunta como aprobada**; el último texto mostrado en el chat permanece un borrador para revisión. `07-PROGRESS` contiene un estado histórico no verificado contra el repositorio.

## Instalación

Subir **solo** los 17 archivos `00`–`16` como Sources, retirar duplicados antiguos y sustituir el campo Project Instructions con `PROJECT-INSTRUCTIONS-SETTINGS.md`. Seguir `INSTALL-REPLACE-ALL.md`.
