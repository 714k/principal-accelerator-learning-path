Fase 0 · PA-S002

# Monorepos y estándares de ingeniería: organizar código, dependencias y calidad

## Síntesis en 30 segundos

1. Un monorepo permite cambios coordinados, pero no crea fronteras de arquitectura automáticamente.
2. Los contratos públicos y las pruebas de dependencias pueden detectar cambios incompatibles.
3. Un estándar técnico necesita responsables, excepciones y mecanismos de adopción comprobables.

## Objetivo

Distinguir organizaciones de repositorios y definir una política verificable que permita evolucionar componentes y consumidores sin depender de importaciones internas.

## Vista previa de conceptos

### Staff → Principal

**Estándar de ingeniería:** acuerdo técnico que define una práctica y cómo verificarla. **Ejemplo:** una organización prohíbe importar archivos internos de paquetes y configura un check de imports.

**Gobierno técnico:** proceso mediante el que se revisan reglas y excepciones. **Ejemplo:** un equipo registra qué consumidor puede usar temporalmente una ruta heredada, su responsable y cuándo revisarla.

### Arquitectura de Plataforma Frontend

**Contrato público:** interfaz admitida para consumir una capacidad. **Ejemplo:** tres aplicaciones importan `Button` desde la entrada exportada de la biblioteca de componentes.

**Compatibilidad:** posibilidad de evolucionar un proveedor sin romper usos admitidos. **Ejemplo:** se cambia la implementación interna de `Button` pero se conserva su API de props y manejo de foco.

### Ingeniería de Producto con IA

**Evaluación:** conjunto de comprobaciones de calidad de una tarea de IA. **Ejemplo:** una modificación del proveedor de resúmenes exige comparar respuestas con documentos de referencia autorizados.

**Límite de datos:** restricción sobre qué información puede utilizar una capacidad. **Ejemplo:** un servicio de resumen solo recupera documentos que el usuario puede consultar.

## Tema principal: del repositorio compartido a los límites comprobables

### Conceptos del tema principal

**Monorepo:** repositorio que conserva en un mismo historial código de varios proyectos. **Ejemplo:** una biblioteca UI y dos aplicaciones comparten la gestión de cambios dentro de un repositorio.

**Polyrepo:** organización en repositorios independientes. **Ejemplo:** cada producto mantiene su repositorio y consume versiones publicadas de una biblioteca común.

**Frontera arquitectónica:** límite que define dependencias y contratos permitidos. **Ejemplo:** la aplicación importa el paquete UI mediante su API pública, no rutas privadas.

**Diagrama previsto:** productor → API pública → aplicaciones consumidoras, y diferencia entre límite lógico y repositorio físico.

**Studio, ejercicios y tarjetas previstos:** comparar un cambio de API; predecir consumidores afectados; preguntas con respuestas; recursos npm workspaces y módulos TypeScript.

## Subtemas

### Subtema 1. Repositorios y fronteras

**Repositorio:** unidad de historial y versionado de código. **Ejemplo:** el equipo confirma un cambio en Git sin determinar por ello una frontera entre módulos.

**Frontera:** límite de responsabilidades e importaciones permitidas. **Ejemplo:** un test rechaza que `billing` importe archivos privados de `orders`.

**Visual:** dos grafos de módulos con el mismo repositorio pero reglas distintas.

### Subtema 2. Workspaces, aplicaciones y paquetes

**Workspace:** agrupación de paquetes que pueden gestionarse dentro de un proyecto. **Ejemplo:** npm instala dependencias declaradas en distintos paquetes de un mismo monorepo.

**Paquete:** unidad distribuible/consumible que declara puntos de entrada y dependencias. **Ejemplo:** la biblioteca `ui` exporta un botón desde su entrada pública.

**Visual:** árbol de workspace y vínculos de paquetes.

### Subtema 3. Grafo y dirección de dependencias

**Grafo de dependencias:** representación de nodos y relaciones de consumo. **Ejemplo:** `web` depende de `ui`; `ui` no debe importar desde `web`.

**Ciclo:** cadena de dependencias que regresa a su nodo de origen. **Ejemplo:** `ui` importa `web` y `web` importa `ui`, dificultando aislarlos.

**Visual:** grafo dirigido y camino de propagación de un cambio.

### Subtema 4. Grafo de tareas y construcción

**Tarea de construcción:** ejecución que transforma entradas en un resultado verificable. **Ejemplo:** `build:ui` produce una biblioteca que `build:web` consume.

**Dependencia de tareas:** relación que impone un orden de ejecución. **Ejemplo:** construir UI antes de la aplicación que la usa.

**Visual:** DAG de build y ruta crítica simplificada.

### Subtema 5. Políticas y gates de calidad

**Gate:** condición comprobable que decide si puede avanzar un cambio. **Ejemplo:** se rechaza una PR cuando una prueba contractual falla.

**Fitness function:** prueba de una propiedad arquitectónica. **Ejemplo:** un test detecta imports prohibidos entre paquetes.

**Visual:** pipeline con gates y salidas de fallo.

### Subtema 6. Contratos para frontend y productos con IA

**Contrato de datos:** especificación de campos, tipos y errores. **Ejemplo:** un servicio de resumen exige `documentId` y responde con `summary` y `sourceIds`.

**Regresión de IA:** pérdida de calidad de una función tras un cambio. **Ejemplo:** resúmenes nuevos omiten información que los tests de estructura no detectan.

**Visual:** validación de esquema frente a evaluación de respuesta.

### Subtema 7. Ownership y evolución de estándares

**Ownership:** responsabilidad explícita sobre mantenimiento y revisión de una capacidad. **Ejemplo:** un equipo revisa los cambios de una API usada por varios productos.

**Excepción documentada:** permiso acotado para incumplir temporalmente una regla. **Ejemplo:** un producto legado conserva una importación interna, con fecha y persona responsable de su eliminación.

**Migración:** transición planificada a un nuevo contrato. **Ejemplo:** se publican exports públicos, migran consumidores y al final se activa el gate.

**Visual:** diagrama de productor, consumidores y migración; ver la muestra independiente del subtema 7.

## Ejemplos y materiales previstos

**Caso real candidato:** monorepo de Google según una publicación técnica que deberá validarse específicamente antes de atribuirle decisiones o métricas.

**Producción de referencia:** repositorio de varias aplicaciones con biblioteca común, API pública, pruebas de dependencia, CI, estrategia de compatibilidad, errores y rollback. **Estado: diseño propuesto, no validado**.

**Visual Learning Studio:** mapa mental global, flashcards totales y recursos locales en cada capítulo; diagramas propios por Tema principal/Subtema; interacciones de predicción del impacto de cambios cuando aporten.

**Fuentes a consultar:** GitHub CODEOWNERS, manual de módulos de TypeScript y documentación oficial de exports de npm; se verificaron las URLs base en noviembre de 2026.

## Entregables y estado

**Ingeniería:** evolución del monorepo y contratos de dependencias, sin afirmar cambios hechos en Git. **Learning Site:** capítulos ES/EN y recursos visuales. **Estado de todos los bloques: PENDIENTE**; esto es solo un inventario de estilo para evaluar, no una versión aprobada de la sesión.
