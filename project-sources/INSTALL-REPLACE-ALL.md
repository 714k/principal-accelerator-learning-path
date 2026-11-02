# Instalación — Reemplazo completo v10

1. Haz copia local de los Sources y Project Instructions previos antes de retirar documentos de la interfaz.
2. Abre el ZIP v10 y sube **únicamente `00-README.md` a `16-EDITORIAL-REVIEW-PROTOCOL.md`** como los 17 Sources del proyecto. Retira copias duplicadas de v7/v8/v9 para evitar colisión de reglas. Esta acción requiere realizarse manualmente en la interfaz del proyecto; no ha sido ejecutada por este archivo.
3. En **Project → Settings → Instructions**, reemplaza todo el texto anterior por el contenido íntegro de `PROJECT-INSTRUCTIONS-SETTINGS.md`. No concatenarlo con versiones previas: algunas exigían handoff inmediato y contradicen la revisión por bloques solicitada después.
4. Conserva `CODEX-SESSION-MASTER-PROMPT.md`, los CSV y ejemplos como referencia descargable o en Git, **no como Sources duplicados**. `PA-S001-QUALITY-REFERENCE.md` es una muestra no aprobada y no debe publicarse como teoría.
5. Valida `PA-S001` (solo inventario, definiciones breves, sin IDs visibles). Luego «muéstrame el tema principal» (solo capítulo), revisa y acepta. Pide expresamente una sesión íntegra solo cuando quieras evaluar un borrador completo no aprobado.
6. Valida PA-S004: inventario contempla Design System + Storybook ejecutable aparte del Portfolio y Learning Site; la entrega real debe probarlo cuando se autorice Codex.
7. Ejecuta `python VERIFY-V10.py` en la carpeta descomprimida; lee `CURRENT-VERIFICATION.md`. Estas pruebas estructurales NO certifican rigor pedagógico ni revisión del repositorio.

**Importante:** el paquete cambia Sources e instrucciones; **no modifica Git**, las apps ni el estado de progreso real. La versión ES/EN canónica de PA-S001 no se considera aprobada por haber mostrado un borrador en conversación.
