# Experiencia de aprendizaje acelerado — v10

## Principios comunes sin UI idéntica

La persona debe comprender rápido **sin sustituir la profundidad**. Abrir con síntesis de tres puntos, señalización selectiva de ideas importantes y preentrenamiento breve de vocabulario. Mantener explicaciones autosuficientes de cómo operan los mecanismos reales y variación de recursos según tipo de concepto. El fin no es aumentar velocidad aparente, sino reducir barreras y permitir transferencia.

## Lectura progresiva interna

La pedagogía puede organizarse internamente como explicación accesible, mecanismo profundo y profundización opcional; **NO imprimir etiquetas «Nivel 1/2/3» como títulos visibles**. Usar títulos naturales cuando ayuden: «Concepto», «Cómo funciona», «Ejemplo resuelto», «Qué sucede cuando falla», «Profundización». La parte sustancial siempre legible sin JS; detalles opcionales accesibles con `details/summary` u opción equivalente compatible con teclado, touch y reduced-motion.

## Explicación y señalización

Una idea dominante por párrafo, primeras palabras útiles en negritas solo cuando aporten orientación, términos definidos antes de uso. Evitar repetir el objetivo («Comprender cómo…») como si fuera un mecanismo. Las entradas y salidas de una secuencia deben tener ejemplos reales de contratos/estado, no solo flechas sin comportamiento. La notación causa→proceso→efecto solo para relaciones realmente causales; diagramas de estructura no requieren flechas causales artificiales.

Glosas de contexto con máximo **10 palabras**, dentro del texto y accesibles al teclado/touch; sin parsear bloques de código ni URL. Si no se justifica la anotación, definir el término en prosa normal. Los IDs de metadata son invisibles para lector y no forman parte del título.

## Formatos aptos para cada objetivo

- Contraste conceptual: tabla comparativa con explicación de límites/no-ejemplos.
- Estructura: diagrama de fronteras/dependencias/estados con relaciones etiquetadas.
- Causalidad: secuencia o flujo de datos con entrada, transformación, condiciones y fallo.
- Procedimiento: ejemplo resuelto y luego práctica con menor guía.
- Decisión: alternativas, restricciones, matriz y escenario de transferencia.

El Visual Learning Studio obligatorio tiene mind map con cobertura completa de Conceptos/Tema/Subtemas y flashcards con preguntas, explicaciones y referencias; las visualizaciones que enseñan un mecanismo se colocan además **junto al texto**. Simuladores adicionales solo si X, mecanismo, Y, límites y fuente son explicables y verificables. No construir un widget inerte como decoración.

## Verificación editorial

Comprobar con muestra humana: ¿un ingeniero que desconoce el capítulo puede reproducir el mecanismo sin adivinar? ¿La fuente respalda la atribución? ¿La pregunta de recuperación evalúa el concepto enseñado y la respuesta responde exactamente? ¿El diagrama está explicado? ¿Se distingue la hipótesis de los resultados observados? Sin ello, no publicar aunque haya HTML correcto.
