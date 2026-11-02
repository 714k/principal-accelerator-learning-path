F0 · PA-S001 · Staff → Principal / Frontend Platform Architecture / AI Product Engineering

# Fundamentos de ingeniería de software: arquitectura, plataforma y alcance Staff → Principal

## Síntesis en 30 segundos

1. Ingeniería de software abarca cómo se construye, verifica y mantiene software; arquitectura estudia estructuras y decisiones que condicionan su evolución.
2. Aplicación, sistema, plataforma y ecosistema responden a preguntas distintas acerca de propósito, elementos y consumidores.
3. Staff/Principal requieren justificar mecanismos, riesgos, compromisos y evidencia más allá de producir código funcional.

## Objetivo

Analizar un sistema externo, identificar responsabilidades, dependencias y restricciones, y justificar decisiones de arquitectura, FPA e integración de IA cuando correspondan.

## Vista previa

La sesión enseña los fundamentos con sistemas empresariales documentados y un diseño técnico externo reproducible; solo en «Teoría→Práctica» se conectarán con Portfolio y Learning Site del programa.

## Conceptos iniciales, por dominio

**Staff → Principal**

**Responsabilidad técnica:** parte del comportamiento o evolución de un sistema que un componente o equipo debe atender.

**Contrato:** conjunto de operaciones, datos, errores y garantías que un proveedor ofrece a sus consumidores.

**Decisión arquitectónica:** elección estructural que afecta relaciones, calidad u opciones de evolución.

**FPA**

**Plataforma frontend:** capacidades y contratos compartidos para varios productos de interfaz.

**Consumidor:** aplicación o equipo que utiliza una capacidad expuesta por otro sistema.

**AIPE**

**Funcionalidad con IA:** operación de producto que utiliza resultados de un modelo dentro de reglas y controles.

**Evaluación:** comprobación de resultados de IA frente a criterios pertinentes para una tarea.

## Tema principal — De una necesidad a una arquitectura justificable

**Necesidad de producto:** problema o tarea que motiva el sistema.

**Requisito:** comportamiento o condición que debe satisfacer el producto.

**Componente:** parte de software con responsabilidades y relaciones reconocibles.

**Dependencia:** relación que obliga a una parte a necesitar servicios, datos o contratos de otra.

**Atributo de calidad:** propiedad evaluable del producto, como seguridad o confiabilidad.

**Restricción:** condición que limita alternativas de diseño.

**Verificación:** actividad que contrasta comportamiento observable con criterios definidos.

## Subtemas

### Ingeniería de software, arquitectura y diseño detallado

**Ingeniería de software:** actividades disciplinadas para especificar, construir, comprobar, operar y mantener software.

**Arquitectura:** estructuras y decisiones que organizan un sistema y su evolución.

**Diseño detallado:** organización de funciones, interfaces, algoritmos y datos dentro de los límites establecidos.

### Aplicación, sistema, plataforma y ecosistema

**Aplicación:** software destinado a realizar tareas reconocibles de sus usuarios.

**Sistema:** elementos que interactúan para cumplir un propósito bajo una frontera de análisis.

**Plataforma:** capacidades ofrecidas mediante contratos a otros productos o equipos consumidores.

**Ecosistema:** actores, organizaciones y tecnologías cuyas relaciones condicionan un resultado.

### Atributos de calidad, restricciones y escenarios

**Atributo de calidad:** propiedad que importa evaluar en un contexto determinado.

**Escenario de calidad:** estímulo y condiciones con respuesta del sistema que pueden comprobarse.

**Restricción:** condición técnica, contractual, operativa o normativa que limita soluciones.

### Fronteras, acoplamiento y cohesión

**Frontera:** separación de responsabilidad e interacciones permitidas entre partes.

**Acoplamiento:** forma y grado en que elementos dependen de otros y transmiten cambios.

**Cohesión:** relación entre las responsabilidades internas de un módulo y su propósito.

### Arquitectura de plataforma frontend

**Capacidad compartida:** funcionalidad expuesta a consumidores con un propósito común.

**API de componente:** propiedades, eventos y comportamiento público consumible por otros componentes o aplicaciones.

**Evolución de plataforma:** estrategia de compatibilidad, versiones, migración y soporte a consumidores.

### Ingeniería de Producto con IA

**Inferencia:** ejecución de un modelo entrenado para producir una salida.

**Resultado fundamentado:** afirmación relacionada con evidencia identificable y pertinente.

**Abstención:** decisión del sistema de no responder como si supiera cuando faltan pruebas suficientes.

### Alcance Staff y Principal

**Staff:** alcance técnico transversal cuyo efecto depende de problemas resueltos y adopción, no del nombre del título.

**Principal:** alcance técnico entre sistemas/equipos y dirección de evolución, dependiente de la organización.

## Caso real propuesto

**Netflix Open Connect:** comprobar y citar la documentación oficial de distribución de contenido y colaboraciones con ISP; distinguir hechos publicados, límites e interpretación pedagógica. Estado inicial: **candidato pendiente de revisión específica de fuentes**.

## Ejemplo de producción propuesto

**Venta de entradas con reservas concurrentes**, modelo externo hipotético y no probado: frontend, API, PostgreSQL, pago externo, transacciones, conflicto 409, idempotencia, expiración, reconciliación, seguridad, pruebas concurrentes y despliegue/observabilidad. Estado: **diseño de referencia propuesto, no validado**.

## Materiales y ejercicios previstos

Diagramas de frontera y secuencia junto a mecanismos, tabla aplicación/sistema/plataforma/ecosistema, comparación de estrategias de reserva, mapa mental y tarjetas de recuperación; ejercicios de clasificación, trazado de contratos, diagnóstico de fallos, escenarios de calidad y decisiones transferibles. Fuentes previstas: SWEBOK, ISO/IEC/IEEE 42010, ISO 25010, CNCF, Netflix Open Connect, PostgreSQL, NIST y W3C cuando resulten pertinentes. Recuperación espaciada y respuestas explicativas. Tiempo **por estimar después de alcance acordado**.

## Teoría a práctica y destino de ingeniería

P0: Portfolio profesional y Learning Site ES/EN independientes; dashboard real/estado vacío, navegación, accesibilidad, tracking y Studio. No se presume código ni resultados existentes. Al finalizar, checklist y criterios medibles de explicación, implementación, operación y decisión; mastery necesita evidencia posterior.

## Estado editorial

**Todos los apartados: PENDIENTE de revisión y aceptación explícita.** Este documento es un **inventario**, no la teoría completa ni autorización de Codex.
