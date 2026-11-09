# Aprendizaje adaptativo por tipo de conocimiento — v10

**Autoridad pedagógica:** compatible con Source 16, que gobierna flujo editorial y presentación visible. Las decisiones de técnicas no alteran ni reescriben teoría; Codex publica exactamente el contenido aprobado.

## Clasificación por concepto

Para cada concepto técnico, registrar internamente si el aprendizaje principal es conceptual, estructural, causal, procedimental o decisional (puede ser mixto). Seleccionar una técnica explicando su propósito y el tipo de error que permite detectar. El código interno de concepto se conserva en metadatos ES/EN, no se imprime al estudiante.

| Conocimiento | Representación recomendada cuando aporta | Prueba de comprensión adecuada |
|---|---|---|
| Conceptual | Definición precisa y contraejemplo contrastante | Clasificar caso ambiguo con justificación |
| Estructural | Diagrama etiquetado de módulos/relaciones | Predecir dependencias por cambio de contrato |
| Causal | Entrada/estado → proceso → resultado y fallo | Predecir efecto y explicar por qué |
| Procedimental | Procedimiento trabajado y después práctica autónoma | Ejecutar o diagnosticar un paso con datos |
| Decisional | Matriz, restricciones, opciones y costes | Elegir en escenario nuevo y defender trade-offs |

No exigir una herramienta interactiva por concepto ni la misma organización de párrafos para todos. Evitar simulaciones sin modelo válido. El fallback de la herramienta debe explicar el mismo comportamiento sin JavaScript y soportar teclado/touch. No inventar mejoras en aprendizaje, tiempos ni métricas.

## Ciclo pedagógico

1. **Preparar vocabulario:** glosas cortas para dependencias conceptuales reales.
2. **Situar el problema:** caso externo real verificado o ejemplo hipotético marcado.
3. **Explicar mecanismo:** actores/componentes, entradas, estado, contrato, transformación, salida, error y verificación.
4. **Recuperar:** pregunta específica en escenario alternativo + respuesta que explique la elección y por qué la alternativa falla.
5. **Transferir:** problema más nuevo, menor guía y justificación de trade-offs.
6. **Revisitar:** repaso posterior; seguimiento personal separado de mastery.

## Casos de realismo

Ejemplo de Netflix/Google/Cloudflare/Stripe etc solo si publicación oficial respalda la afirmación concreta. Sin citar un estudio genérico como si fuera el incidente específico. Ejemplo de producción: requerimientos y solución reproducibles fuera del proyecto, con códigos/API, estados, casos borde, seguridad, pruebas, operación y límites; el título *production-ready* no certifica ejecución. Proyectos P0–P6 sirven de aplicación en Theory→Practice, nunca como ejemplos que definan fundamentos universales.

## Enfoque Staff, FPA y AIPE

Evaluar cada carril en conceptos propios, no repetir artificialmente los tres en todo apartado. Integrar una vez desarrollados por separado y justificar la interdependencia concreta. En Staff/Principal preferir decisiones y evidencia en sistemas y organizaciones; FPA, consumidores y contratos; AIPE, datos, incertidumbre, permisos y evaluación. El grado de profundidad debe estar conectado con el objetivo del tema, no con una cantidad fija de secciones.

## Evaluación y publicación

L1 Explicar, L2 Implementar, L3 Operar, L4 Decidir, L5 Liderar son dimensiones de competencia/evidencia, NO etiquetas de lectura. El estudiante revisa y aprueba editorialmente cada bloque; una aprobación no acredita dominio. El texto ES y EN se conserva completo para Codex, con mind map y flashcards de cobertura completa, HTML sin IDs visibles, y pruebas automáticas más revisión humana.
