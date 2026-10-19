# Paquete v6 — instrucciones de instalación

1. En **Project → Settings → Instructions**, sustituir el texto por `PROJECT-INSTRUCTIONS-SETTINGS.md` (no solo añadirlo al final del texto anterior).
2. En **Project → Sources**, reemplazar los documentos 00–14 correspondientes por este paquete y **añadir** `15-ADAPTIVE-LEARNING-EXPERIENCE.md`. Al cargar, retirar versiones duplicadas obsoletas para evitar ambigüedad.
3. Usar `CODEX-SESSION-MASTER-PROMPT.md` como plantilla v6, no como prompt ya rellenado; una sesión PA-Sxxx requiere teoría ES/EN completa y un handoff específico.
4. El repositorio existente no ha sido editado ni verificado por este paquete. Los scripts `.py` conservados son checks heurísticos y pueden necesitar actualización para nuevas gates.
5. Prueba manual de aceptación: iniciar una conversación con `PA-S001` y confirmar que entrega un prompt de Codex con teoría canónica íntegra y transportable (o un error honesto), no solo los dos archivos Study-only. Verificar después PA-S008 para un simulador justificado y un concepto sin simulador.
