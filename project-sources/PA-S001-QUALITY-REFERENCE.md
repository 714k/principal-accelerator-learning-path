# Referencia de calidad editorial — PA-S001 (no aprobada)

**Este archivo NO es la teoría completa de PA-S001, ni copia exacta de la última respuesta de chat, ni documento autorizado para publicar.** Su propósito es probar que las reglas v10 impiden los errores detectados antes de preparar un payload canónico.

## Ejemplo del problema: definición corta vs mecanismo enseñado

**Acoplamiento:** grado y forma en que un elemento de software depende de otro, por datos, operaciones o comportamiento.

Dos servicios intercambian respuestas de inventario. La API devuelve `{"availableUnits": 3}` y el frontend ejecuta `product.availableUnits > 0` para habilitar el botón de compra. El equipo de inventario renombra el campo a `stock` sin una migración. La respuesta pasa a `{"stock": 3}`; el frontend todavía lee `availableUnits` y obtiene `undefined`. En JavaScript, `undefined > 0` produce `false`, por lo que el botón puede quedar deshabilitado aunque existan unidades. Este ejemplo es **hipotético** y depende de ese código concreto; otra implementación podría mostrar un error o utilizar validación de esquema.

**Mecanismo:** el consumidor depende del nombre, tipo y semántica de un campo del proveedor. El cambio de contrato cruza la frontera API y modifica el resultado de la comparación. Un adaptador, esquema versionado o estrategia de compatibilidad puede evitar que una renombrada interna afecte al consumidor, pero introduce trabajo de migración y mantenimiento.

**Prueba:** una prueba contractual valida `availableUnits` y su tipo según el contrato vigente; una prueba de interacción valida que la disponibilidad correcta habilita la compra. Modificar el proveedor debe activar la prueba, no depender de descubrirlo en producción.

**Pregunta:** ¿eliminar una importación JavaScript entre equipos elimina todo acoplamiento? **Respuesta:** no. El contrato HTTP, sus campos y sus garantías semánticas siguen creando una dependencia aunque los módulos no se importen entre sí.

## Checklist de esta referencia

- Un H1 único, sin código de identificador como prefijo.
- Término visible seguido de definición, no listado de código interno.
- Elementos/contrato/datos/estado concretos y efecto comprobable.
- Ejemplo externo ficticio claramente etiquetado, nunca presentado como práctica real de una empresa.
- Contraejemplo, alternativa, prueba y recuperación con respuesta.
- No incluye el Accelerator como explicación técnica.
- No contiene encabezados «Nivel 1/2/3».

## Próximo paso editorial

Comparar los cinco pilotos para graduar un contrato general, preservando su variación pedagógica. El contenido real de PA-S001 debe revisarse y aceptarse por capítulos; no atribuir aceptación a las respuestas antiguas del chat.
