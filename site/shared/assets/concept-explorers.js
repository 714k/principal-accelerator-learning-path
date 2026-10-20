/* Four instructional reference patterns; all outcomes are deterministic, not measurements. */
(() => {
  const es=document.documentElement.lang==='es';
  const t=(a,b)=>es?a:b;
  const scenarios={
    application:{title:t('Aplicación','Application'),definition:t('Entrega una tarea reconocible a una persona usuaria.','Delivers a recognizable user task.'),example:t('El portafolio muestra proyectos a visitantes.','The portfolio shows work to visitors.'),limit:t('Una biblioteca de botones por sí sola no es una aplicación.','A button library alone is not an application.')},
    system:{title:t('Sistema','System'),definition:t('Elementos coordinados para un propósito dentro de una frontera de análisis.','Coordinated elements serving a purpose inside an analytical boundary.'),example:t('Contenido, generador y HTML publicado forman un sistema de publicación.','Content, generator and published HTML form a publishing system.'),limit:t('Su frontera cambia con la pregunta; no es necesariamente un producto desplegable.','Its boundary depends on the question; it need not be one deployed product.')},
    platform:{title:t('Plataforma','Platform'),definition:t('Capacidades reutilizables con contratos y consumidores identificables.','Reusable capabilities with contracts and identifiable consumers.'),example:t('Un renderer compartido puede servir a múltiples sesiones.','A shared renderer can serve multiple sessions.'),limit:t('Compartir un componente no demuestra que exista una plataforma madura.','Sharing one component does not establish a mature platform.')},
    ecosystem:{title:t('Ecosistema','Ecosystem'),definition:t('Personas, productos, servicios y reglas externas que condicionan la solución.','People, products, services and external rules shaping the solution.'),example:t('Autor, aprendiz, navegador, repositorio y hospedaje interactúan.','Author, learner, browser, repository and hosting interact.'),limit:t('No todo actor externo es parte del sistema que se está probando.','Not every external actor belongs inside the system under test.')}
  };
  document.querySelectorAll('[data-explorer="conceptual"]').forEach(root=>{
    const buttons=[...root.querySelectorAll('[data-choice]')],out=root.querySelector('[data-explorer-output]');
    const show=id=>{const v=scenarios[id];if(!v)return;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.choice===id)));out.replaceChildren();const h=document.createElement('h5');h.textContent=v.title;out.append(h);for(const [label,value] of [[t('Definición','Definition'),v.definition],[t('Ejemplo','Example'),v.example],[t('Límite del concepto','Concept boundary'),v.limit]]){const p=document.createElement('p'),strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(value));out.append(p);}};
    buttons.forEach(b=>b.addEventListener('click',()=>show(b.dataset.choice)));show('application');
  });
  const graphs={
    contract:{renderer:['schema'],schema:['es','en'],es:[],en:[],portfolio:[]},
    shared:{renderer:['schema','portfolio'],schema:['es','en'],es:[],en:[],portfolio:[]}
  };
  document.querySelectorAll('[data-explorer="structural"]').forEach(root=>{
    const choice=root.querySelector('select'),out=root.querySelector('[data-explorer-output]');
    const show=()=>{const g=graphs[choice.value],visited=new Set(),queue=['renderer'];while(queue.length){const x=queue.shift();if(visited.has(x))continue;visited.add(x);queue.push(...g[x]);}
      const labels={renderer:t('Renderer','Renderer'),schema:t('Esquema','Schema'),es:t('Sesión ES','ES session'),en:t('Sesión EN','EN session'),portfolio:t('Portafolio','Portfolio')};
      out.textContent=t('Cambio hipotético en el renderer → consumidores alcanzables: ','Hypothetical renderer change → reachable consumers: ')+[...visited].map(x=>labels[x]).join(' → ')+'. '+(visited.has('portfolio')?t('El portafolio también depende del renderer: mayor propagación posible.','Portfolio also depends on the renderer: broader possible propagation.'):t('El portafolio queda fuera de este grafo declarado.','Portfolio is outside this declared graph.'));};
    choice.addEventListener('change',show);show();
  });
  document.querySelectorAll('[data-explorer="causal"]').forEach(root=>{
    const js=root.querySelector('[data-js]'),keyboard=root.querySelector('[data-keyboard]'),out=root.querySelector('[data-explorer-output]');
    const show=()=>{const nojs=js.value==='off',nokeyboard=keyboard.value==='fail';out.textContent=(nojs?t('El contenido crítico debe seguir disponible en HTML sin JavaScript. ','Critical content must remain available in HTML without JavaScript. '):t('JavaScript disponible no demuestra accesibilidad. ','JavaScript availability does not prove accessibility. '))+(nokeyboard?t('El control no puede operarse con teclado: falla el escenario de accesibilidad.','The control cannot be operated by keyboard: the accessibility scenario fails.'):t('El control se declara operable con teclado: falta verificarlo en navegador.','The control is declared keyboard-operable: browser verification is still required.'))+' '+t('Esta es una evaluación lógica de condiciones, no una prueba de navegador.','This is a logical conditions exercise, not a browser test.');};
    [js,keyboard].forEach(x=>x.addEventListener('change',show));show();
  });
  document.querySelectorAll('[data-explorer="decisional"]').forEach(root=>{
    const fields=[...root.querySelectorAll('select')],out=root.querySelector('[data-explorer-output]');
    const show=()=>{const [data,citations,review]=fields.map(x=>x.value);const issues=[];
      if(data==='sensitive')issues.push(t('Datos privados no autorizados: detener el envío.','Unauthorized private data: stop transfer.'));
      if(citations==='no')issues.push(t('Las citas no están verificadas: no afirmar hechos.','Citations are unchecked: do not assert facts.'));
      if(review==='no')issues.push(t('No hay revisión humana: no publicar.','No human review: do not publish.'));
      out.textContent=issues.length?t('Resultado del caso hipotético: ','Hypothetical case outcome: ')+issues.join(' '):t('Puede prepararse un borrador para revisión humana; no se autoriza publicación automática.','A draft may be prepared for human review; automatic publication is not authorized.');
    };fields.forEach(x=>x.addEventListener('change',show));show();
  });
})();
