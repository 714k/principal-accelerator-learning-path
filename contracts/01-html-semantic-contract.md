# Contrato 01 — HTML semántico de sesiones

Este contrato se aplica a toda sesión `PA-S00X` antes de normalizar su presentación. El contenido del Project Source gobierna el currículo; la semántica puede cambiar la estructura de marcado, pero no la redacción.

## Integridad del contenido

- Rescatar el 100 % del contenido textual, código, enlaces, tablas, diagramas, ejemplos, ejercicios y bloques del HTML de entrada. No resumir, parafrasear, corregir, traducir dentro del mismo locale ni borrar contenido.
- Mantener la versión en español y su equivalente en inglés con la misma estructura, interacciones y contenido equivalente. La única diferencia intencional es el idioma.
- El TOC es la representación de la estructura de navegación. No duplicarlo como una sección editorial en el cuerpo. Usar listas `<ol>` anidadas para que la numeración jerárquica, incluidos los subtemas, quede fuera de los enlaces y no se duplique en sus etiquetas. No representar subtemas como viñetas.

## Landmarks y encabezados

- Usar un único `<main id="main-content">` para el contenido principal y un skip-link cuyo destino sea `#main-content`.
- Mantener un único `<h1>` en toda la página para el título principal de la sesión. No usar encabezados solo por su apariencia.
- Representar el TOC como `<nav aria-labelledby="toc-heading">` con `<h2 id="toc-heading">Tabla de contenido</h2>` en español y `<h2 id="toc-heading">Table of contents</h2>` en inglés, seguido de una lista `<ol>` de enlaces a IDs válidos.
- Mapear cada elemento estructural del TOC a un `<section id="slug" aria-labelledby="heading-id">` cuyo encabezado exista y tenga un ID único. Los cuatro componentes introductorios definidos en el contrato UI pueden conservar enlaces del TOC como anclas a sus contenedores, sin convertirlos en secciones.
- Las secciones de primer nivel usan `<h2>`. Los subtemas, anidados en la sección del tema principal, usan `<section>` y `<h3>`. Los encabezados internos usan `<h4>`, `<h5>` y, cuando haga falta, `<h6>` sin saltar niveles.
- No reutilizar IDs. Verificar que todos los fragmentos del TOC y atributos `aria-labelledby`, `aria-controls` y `aria-describedby` apunten a elementos existentes.

## Semántica del contenido

- Presentar conceptos como `<dl>`; usar `<dt>` solo para el término y `<dd>` para la definición y el ejemplo. Cuando la fuente marque ejemplos con `Ejemplo:` / `Example:`, normalizar el disclosure como `<details><summary>Ejemplo</summary>…</details>` dentro del `<dd>`, quitando los dos puntos del término y del rótulo, sin cambiar el texto del ejemplo.
- Usar `<table>` para relaciones tabulares. Cada tabla tiene un `<caption>` descriptivo; cada encabezado usa `scope="col"` para columnas o `scope="row"` para filas, según corresponda.
- Envolver cada diagrama Mermaid en `<figure>` con `<figcaption>`. El SVG accesible lleva `role="img"` y un `<title>` descriptivo. Su fuente Mermaid permanece disponible dentro de `<details><summary>…</summary>`.
- Usar listas nativas `<ol>` o `<ul>` según la relación y secuencia del contenido. No emular listas con texto, iconos o saltos de línea.
- Renderizar cada criterio bajo “Criterios de éxito de la sesión” / “End-of-session success criteria” como checkbox reversible con identificador estable de estudio.

## Interacción y ARIA

- Los controles accionables son `<button type="button">`. Un nodo seleccionable de mapa o explorador expone `aria-pressed="true|false"` y sincroniza el valor con la selección visible.
- Los botones de flashcard y cualquier botón que expanda o contraiga contenido exponen `aria-expanded="true|false"`, sincronizado con el estado real. Preferir `<details><summary>` para pregunta/respuesta que no requiera comportamiento personalizado.
- Agrupar los selectores relacionados de un simulador en `<fieldset>` con `<legend>` descriptivo. Si el legend es redundante con un título visible, puede llevar la clase compartida `sr-only`.
- Las salidas que cambian tras una interacción usan `aria-live="polite"` (o un rol de estado equivalente cuando corresponda). No marcar como live un contenedor que reescriba demasiado contenido.
- Los controles deben funcionar con teclado nativo; no asignar roles ARIA que dupliquen la semántica nativa.
- Cada enlace externo decorado con `↗` incluye `<span aria-hidden="true">↗</span>` y `<span class="sr-only">(se abre en una nueva pestaña)</span>`; en inglés se localiza el texto accesible. El enlace abre en una pestaña nueva y declara `rel="noopener noreferrer"`.

## Verificación

- Validar el HTML generado en ambos locales: un `<main>`, un `<h1>`, encabezados sin saltos, IDs únicos, destinos del TOC existentes, captions y scopes de tablas, controles con estado accesible y cero referencias ARIA rotas.
- Ejecutar `npm run check`. Para la página generada, auditar WCAG 2.1 AA con axe-core, navegación por teclado y viewport estrecho. Informar hallazgos que dependan de interpretación visual o del navegador.
