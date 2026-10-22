# PA-S001 — Auditoría de mecanismos y contrato de diagramas (Etapa 3.1)

**Base verificada:** `main` @ `ed647d55117660e443198af8fdb5fb7accb514a0` (21 oct 2026). **Estado:** auditoría inicial; no se han sustituido las teorías canónicas ni modificado el renderer. PR de trabajo debe permanecer en Draft.

## Hallazgos verificables

- Las teorías `site/content/canonical/PA-S001-theory-{es,en}.md` contienen **17 conceptos atómicos** cada una, todos con Nivel 2 / Level 2. La inspección de sus 17 secciones de concepto encontró **0 bloques Mermaid**; por tanto, el renderer no puede generar SVG contextuales a partir de diagramas Mermaid dentro de esos conceptos.
- Cada idioma contiene **7 bloques \`\`\`text** en el archivo canónico completo. Son candidatos a migración de diagramas ASCII, pero se deben clasificar: no convertir ejemplos de código o salidas literales en diagramas sin justificarlo.
- El ejemplo de acoplamiento expone cambio de contrato, consumidor incompatible y efecto, pero la captura móvil confirma que el lector ve etiquetas con iconos y recuperación pegada al mecanismo. El contenido no establece primero el objetivo causal ni un diagrama de productor → contrato → consumidor.
- No basta con separar por CSS los tokens «Causa», «Mecanismo» y «Resultado»: debe existir secuencia didáctica completa, contexto, mecanismo observable, límites, decisión y recuperación separada.

## Inventario completo de conceptos a revisar

| ID estable (solo autoría) | Concepto visible | Tipo principal | Representación candidata |
|---|---|---|---|
| engineering.software | Ingeniería de software | Procedimental | Ciclo de cambio; ejemplo trabajado |
| engineering.architecture | Arquitectura de software | Estructural/decisional | Componentes, contratos y fronteras |
| scope.application | Aplicación | Conceptual | Contraste con plataforma |
| scope.system | Sistema | Estructural | Límite y componentes participantes |
| scope.platform | Plataforma | Estructural/decisional | Capacidad, contrato y consumidores |
| scope.ecosystem | Ecosistema | Estructural | Actores y dependencias externas |
| quality.attribute | Atributo de calidad | Decisional | Escenario → observación → evidencia |
| quality.constraint | Restricción | Decisional | Opciones permitidas vs descartadas |
| design.boundary | Frontera | Estructural | Límite explícito y contratos |
| design.coupling | Acoplamiento | Causal | Antes/después del cambio de contrato |
| design.cohesion | Cohesión | Conceptual/decisional | Responsabilidades relacionadas vs ajenas |
| role.staff | Alcance Staff | Decisional | Decisión, colaboración y evidencia |
| role.principal | Alcance Principal | Decisional | Evolución multisistema y gobernanza |
| fpa.frontend-platform | Plataforma frontend | Procedimental/estructural | Autor → build → HTML/SVG → lector |
| aipe.ai-product | Producto con IA | Causal/decisional | Autorización → borrador → verificación → revisión |
| learning.evidence | Evidencia | Conceptual/decisional | Marca de estudio ≠ evidencia |
| learning.levels | Niveles L1–L5 | Estructural | Evidencia distinta para cada nivel |

Las representaciones son **candidatas**, no una orden de añadir 17 widgets idénticos. Mantener las tres líneas de aprendizaje separadas y síntesis identificada.

## Contrato pedagógico para cada Nivel 2

1. **Título humano:** «Cómo se propaga un cambio de contrato», no «Nivel 2 — Mecanismo» aislado.
2. **Propósito en una frase:** qué puede explicar el lector después.
3. **Estado inicial:** actores, entradas, contratos y condiciones, con definiciones accesibles.
4. **Cambio o decisión:** qué varía y bajo qué supuestos.
5. **Mecanismo:** pasos con relación explícita causa → interacción → efecto; no usar emoji como sustituto de un diagrama.
6. **Diagrama Mermaid contextual**, solo cuando represente mejor la relación que un contraste o ejemplo; en cada bloque de flujo/arquitectura existente debe sustituir al ASCII.
7. **Ejemplo resuelto y contraejemplo:** incluir caso límite y dependencia de compilación/ejecución cuando corresponda.
8. **Producción y alternativas:** cómo verificarlo y trade-offs, sin atribuir fallos o mejoras observadas no medidos.
9. **Recuperación separada:** pregunta primero y respuesta con explicación después; no mezclarla en el mismo párrafo.
10. **Fuente trazable y glosario corto:** nombres legibles, IDs internos no visibles.

Mantener Nivel 1 Fundación y Nivel 3 Profundización opcional con alternativa no-JS; ninguna teoría desaparece detrás de un control.

## Mermaid → SVG: requisitos no negociables

- Inventariar los **7 bloques text por idioma** y clasificarlos como diagramas o literales. Convertir **todos los diagramas ASCII** (incluidos los que aparezcan fuera de conceptos, en tema, subtemas y ejemplo real) a bloques Mermaid con nodos legibles en ES/EN; preservar semántica, dirección y límites de las relaciones.
- Compilar Mermaid **en build** a SVG reales; el HTML inicial debe incluir SVG accesible sin depender de JS del navegador. Conservar fuente Mermaid editable y una descripción textual cercana.
- SVG: `role="img"` o semántica equivalente, `title` y `desc` vinculados, tamaño responsive, etiquetas legibles en 360/390 px, sin desbordamiento de página; permitir zoom o scroll **interno del diagrama** si hace falta. No alterar tokens de paleta.
- No inventar dependencias observadas: distinguir «modelo didáctico» y «grafo verificado». No mostrar propagación hipotética como fallo real.
- Verificar que no quede ningún **diagrama ASCII** publicado, sin prohibir bloques de código que sean ejemplos legítimos de texto o terminal.

## Gates antes de publicar

- Auditoría completa de los 17 mecanismos, tema principal, seis subtemas y diagramas en cada idioma, con brechas y trazabilidad de fuentes.
- ChatGPT es autor del contenido académico ES/EN; Codex solo integra y renderiza. No comprimir, reescribir o sintetizar contenido faltante con código.
- Paridad ES/EN por concepto y diagrama; IDs estables y referencias completas.
- Pruebas: integridad byte/SHA actualizada tras aprobación, validación Mermaid, inspección del HTML y SVG generado, no-JS, teclado, foco, tarjetas, cuatro exploradores, ocho criterios de éxito y ocho checks previos; responsive 360/390/768/1440, light/dark, 20–22px base móvil.
- No declarar éxito por pasar `npm run check` solamente: incluir inspección instruccional y lectura real en móvil.
- **NO MERGE:** el PR permanece Draft hasta aprobación explícita del usuario.

## Próxima entrega

Crear las teorías corregidas ES/EN en archivos de propuesta separados de los canónicos y el manifiesto Mermaid, con cada relación verificada académicamente; solo entonces entregar un handoff de implementación a Codex. Esta auditoría no pretende certificar la calidad de las 17 explicaciones ni el funcionamiento de SVGs aún inexistentes.
