(() => {
  const session = document.querySelector('.session-page');
  if (!session) return;

  const sidebarToggle = session.querySelector('[data-sidebar-toggle]');
  const desktopDialog = sidebarToggle
    ?.closest('.site-main-column')
    ?.ownerDocument.getElementById(sidebarToggle.getAttribute('aria-controls') ?? '');
  const desktopSidebar = desktopDialog?.querySelector('.site-sidebar');
  const desktopNav = desktopSidebar?.querySelector('#desktop-curriculum');
  const sidebarClose = desktopDialog?.querySelector('[data-sidebar-close]');
  if (sidebarToggle && desktopDialog && desktopSidebar && desktopNav) {
    const labels =
      document.documentElement.lang === 'es'
        ? { open: 'Abrir navegación', close: 'Cerrar navegación' }
        : { open: 'Open navigation', close: 'Close navigation' };
    const setExpandedState = (expanded) => {
      const label = expanded ? labels.close : labels.open;
      sidebarToggle.setAttribute('aria-expanded', String(expanded));
      sidebarToggle.setAttribute('aria-label', label);
      sidebarToggle.title = label;
    };
    const closeDialog = () => {
      if (desktopDialog.open) desktopDialog.close();
    };

    sidebarToggle.hidden = false;
    sidebarToggle.addEventListener('click', () => {
      if (!desktopDialog.open) {
        desktopDialog.showModal();
        setExpandedState(true);
        sidebarClose?.focus();
      } else closeDialog();
    });
    sidebarClose?.addEventListener('click', closeDialog);
    desktopDialog.addEventListener('close', () => {
      setExpandedState(false);
      sidebarToggle.focus();
    });
    desktopDialog.addEventListener('click', (event) => {
      if (event.target === desktopDialog) closeDialog();
    });
    desktopNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDialog);
    });
    if (desktopDialog.open) desktopDialog.open = false;
    setExpandedState(false);
  }

  const makeCodeToken = (value, type) => {
    const token = document.createElement('span');
    token.className = `code-token-${type}`;
    token.textContent = value;
    return token;
  };
  const tokenizeCode = (source, pattern, classify) => {
    const fragment = document.createDocumentFragment();
    let position = 0;
    let match;
    pattern.lastIndex = 0;
    while ((match = pattern.exec(source))) {
      fragment.append(document.createTextNode(source.slice(position, match.index)));
      fragment.append(makeCodeToken(match[0], classify(match[0], match.index, source)));
      position = pattern.lastIndex;
    }
    fragment.append(document.createTextNode(source.slice(position)));
    return fragment;
  };
  const typescriptKeywords = new Set(
    'abstract as async await break case catch class const constructor continue debugger default delete do else export extends finally for from function get if implements import in instanceof interface is keyof let module namespace new of package private protected public readonly require return satisfies set static super switch this throw try type typeof var void while with yield'.split(
      ' ',
    ),
  );
  const typescriptTypes = new Set(
    'Array BigInt Boolean Date Error Map Never Number Object Promise Readonly Record Set String Symbol Unknown WeakMap WeakSet any boolean never null number object string symbol undefined unknown void'.split(
      ' ',
    ),
  );
  const typescriptPattern =
    /\/\*[\s\S]*?\*\/|\/\/[^\n]*|`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|\.\.\.|===|!==|=>|==|!=|<=|>=|&&|\|\||\?\?|[{}()[\].,:;<>?=|&+*/!-]/g;
  const highlightTypescript = (source) =>
    tokenizeCode(source, typescriptPattern, (value, index, text) => {
      if (value.startsWith('//') || value.startsWith('/*')) return 'comment';
      if (/^["'`]/.test(value)) return 'string';
      if (/^\d/.test(value)) return 'number';
      if (typescriptKeywords.has(value)) return 'keyword';
      if (typescriptTypes.has(value)) return 'type';
      if (/^[A-Z]/.test(value)) return 'type';
      const after = text.slice(index + value.length).match(/^\s*/)?.[0].length ?? 0;
      if (text.slice(index + value.length + after).startsWith('(')) return 'function';
      if (/^[A-Za-z_$]/.test(value) && /^\??\s*:/.test(text.slice(index + value.length)))
        return 'property';
      if (/^(?:\.\.\.|===|!==|=>|==|!=|<=|>=|&&|\|\||\?\?|[=|&+*/!-])$/.test(value))
        return 'operator';
      if (/^[{}()[\].,:;<>?]$/.test(value)) return 'punctuation';
      return 'identifier';
    });
  const mermaidPattern =
    /%%[^\n]*|\b(?:flowchart|graph|sequenceDiagram|stateDiagram(?:-v2)?|classDiagram|erDiagram|journey|gantt|pie|mindmap|gitGraph|timeline)\b|\b(?:participant|actor|activate|deactivate|autonumber|loop|alt|else|opt|par|and|critical|break|rect|Note|note|end|title|direction|classDef|style|subgraph)\b|-->>|<<--|->>|<<-|--x|x--|--o|o--|-\.->|<\.-|<-->|<==>|-->|<--|==>|<==|---|--|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[\da-fA-F]{3,8}\b|\b\d+(?:\.\d+)?\b|\b[\w.-]+\b|[:()[\]{};,]/g;
  const mermaidKeywords = new Set(
    'flowchart graph sequenceDiagram stateDiagram stateDiagram-v2 classDiagram erDiagram journey gantt pie mindmap gitGraph timeline participant actor activate deactivate autonumber loop alt else opt par and critical break rect Note note end title direction classDef style subgraph'.split(
      ' ',
    ),
  );
  const highlightMermaid = (source) =>
    tokenizeCode(source, mermaidPattern, (value, index, text) => {
      if (value.startsWith('%%')) return 'comment';
      if (mermaidKeywords.has(value)) return 'keyword';
      if (
        /^(?:-->>|<<--|->>|<<-|--x|x--|--o|o--|-\.->|<\.-|<-->|<==>|-->|<--|==>|<==|---|--)$/.test(
          value,
        )
      )
        return 'operator';
      if (/^["'#]/.test(value)) return 'string';
      if (/^\d/.test(value)) return 'number';
      if (/^[:()[\]{};,]$/.test(value)) return 'punctuation';
      const lineStart = text.lastIndexOf('\n', index - 1) + 1;
      const lineEnd = text.indexOf('\n', index);
      const line = text.slice(lineStart, lineEnd < 0 ? text.length : lineEnd);
      const relativeIndex = index - lineStart;
      const arrow =
        /-->>|<<--|->>|<<-|--x|x--|--o|o--|-\.->|<\.-|<-->|<==>|-->|<--|==>|<==|---|--/.exec(line);
      const separator = line.indexOf(':');
      if (
        /^\s*(?:participant|actor)\s/.test(line) &&
        relativeIndex > line.search(/(?:participant|actor)\s/)
      )
        return 'entity';
      if (
        arrow &&
        (relativeIndex < arrow.index ||
          (relativeIndex > arrow.index + arrow[0].length &&
            (separator < 0 || relativeIndex < separator)))
      )
        return 'entity';
      if (
        separator >= 0 &&
        relativeIndex > separator &&
        /^\s*\(/.test(text.slice(index + value.length))
      )
        return 'function';
      return 'identifier';
    });
  const highlightHtmlTag = (source) => {
    const fragment = document.createDocumentFragment();
    if (source.startsWith('<!--')) {
      fragment.append(makeCodeToken(source, 'comment'));
      return fragment;
    }
    const opening = /^(<\/?)([A-Za-z][\w:-]*)/.exec(source);
    if (!opening) {
      fragment.append(document.createTextNode(source));
      return fragment;
    }
    fragment.append(makeCodeToken(opening[1], 'punctuation'));
    fragment.append(makeCodeToken(opening[2], 'tag'));
    let position = opening[0].length;
    while (position < source.length) {
      const remainder = source.slice(position);
      const whitespace = /^\s+/.exec(remainder);
      if (whitespace) {
        fragment.append(document.createTextNode(whitespace[0]));
        position += whitespace[0].length;
        continue;
      }
      const character = source[position];
      if (character === '=' || character === '/' || character === '>') {
        fragment.append(makeCodeToken(character, 'punctuation'));
        position += 1;
        continue;
      }
      if (character === '"' || character === "'") {
        let end = position + 1;
        while (end < source.length && source[end] !== character) end += 1;
        if (end < source.length) end += 1;
        fragment.append(makeCodeToken(source.slice(position, end), 'string'));
        position = end;
        continue;
      }
      const word = /^[^\s=/>]+/.exec(remainder);
      const length = word?.[0].length ?? 1;
      fragment.append(makeCodeToken(source.slice(position, position + length), 'attribute'));
      position += length;
    }
    return fragment;
  };
  session.querySelectorAll('pre > code').forEach((code) => {
    if (code.dataset.syntaxEnhanced === 'highlightjs') return;
    const source = code.textContent ?? '';
    const language = [...code.classList]
      .find((className) => className.startsWith('language-'))
      ?.slice('language-'.length)
      .toLowerCase();
    const typedDeclarationPattern =
      /^\s*(?:export\s+)?(?:type|interface)\s+[A-Z_$][\w$]*(?:<[^>\n]+>)?\s*(?:=|\{)/m;
    const hasTypedDeclaration = typedDeclarationPattern.test(source);
    const hasJavaScriptSyntax =
      /^\s*(?:import\s|export\s|(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=|function\s+[A-Za-z_$][\w$]*\s*\()/m.test(
        source,
      );
    const isTypescript =
      ['ts', 'tsx', 'typescript', 'js', 'jsx', 'javascript'].includes(language) ||
      (!language && (hasTypedDeclaration || hasJavaScriptSyntax));
    const isHtml = !isTypescript && /<\/?[A-Za-z][\w:-]*(?:\s|\/?>)/.test(source);
    const hasMermaidSyntax =
      /\b(?:flowchart|graph|sequenceDiagram|stateDiagram(?:-v2)?|classDiagram|erDiagram|journey|gantt|pie|mindmap|gitGraph|timeline)\b|%%[^\n]*|-->|<-->|<==>|==>|-\.->|--o|--x|--/.test(
        source,
      );
    if (!isHtml && !isTypescript && language !== 'mermaid' && !hasMermaidSyntax) return;
    if (!isHtml && isTypescript) {
      code.replaceChildren(highlightTypescript(source));
      code.dataset.syntaxEnhanced = 'typescript';
      return;
    }
    if (!isHtml) {
      code.replaceChildren(highlightMermaid(source));
      code.dataset.syntaxEnhanced = 'mermaid';
      return;
    }
    const fragment = document.createDocumentFragment();
    const tags = /<!--[\s\S]*?-->|<\/?[A-Za-z][^<>]*>/g;
    let position = 0;
    let match;
    while ((match = tags.exec(source))) {
      fragment.append(document.createTextNode(source.slice(position, match.index)));
      fragment.append(highlightHtmlTag(match[0]));
      position = tags.lastIndex;
    }
    if (position === 0) return;
    fragment.append(document.createTextNode(source.slice(position)));
    code.replaceChildren(fragment);
    code.dataset.syntaxEnhanced = 'html';
  });

  const diagramPalette = {
    blue: { fill: '#203e61', edge: '#68aef3' },
    violet: { fill: '#403666', edge: '#b0a0f7' },
    amber: { fill: '#5b431f', edge: '#f0b54d' },
    green: { fill: '#1d503f', edge: '#55c99a' },
    cyan: { fill: '#174b5d', edge: '#55bfdc' },
    coral: { fill: '#633d37', edge: '#f28b73' },
  };
  const diagramToneLabels = document.documentElement.lang.startsWith('en')
    ? {
        blue: 'Client',
        violet: 'Architecture',
        amber: 'External service',
        green: 'Evidence',
        cyan: 'Platform service',
        coral: 'AI capability',
      }
    : {
        blue: 'Cliente',
        violet: 'Arquitectura',
        amber: 'Servicio externo',
        green: 'Evidencia',
        cyan: 'Servicio de plataforma',
        coral: 'Capacidad de IA',
      };
  const normalizeDiagramText = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  const diagramToneFor = (label, index) => {
    const value = normalizeDiagramText(label);
    if (/\b(ai|ia|inteligencia artificial|artificial intelligence|modelo|inferencia)\b/.test(value))
      return 'coral';
    if (
      /\b(evidencia|aprendizaje|learning|resultado|outcome|confirmacion|confirmation|evaluacion|evaluation|prueba|test)\b/.test(
        value,
      )
    )
      return 'green';
    if (
      /\b(proveedor|provider|externo|external|riesgo|risk|permiso|permission|rechazo|timeout|incierto)\b/.test(
        value,
      )
    )
      return 'amber';
    if (
      /\b(servicio|service|plataforma|platform|interfaz|interface|api|adaptador|adapter)\b/.test(
        value,
      )
    )
      return 'cyan';
    if (
      /\b(arquitectura|architecture|datos|data|frontera|boundary|decision|decisi[oó]n|alternativa|alternative|restriccion|constraint|documento|document)\b/.test(
        value,
      )
    )
      return 'violet';
    if (
      /\b(web|movil|mobile|persona|person|cliente|client|usuario|user|consumidor|consumer)\b/.test(
        value,
      )
    )
      return 'blue';
    return ['blue', 'cyan', 'violet', 'amber', 'green', 'coral'][index % 6];
  };
  const splitStraightPath = (source) => {
    const tokens = source.match(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?|[a-z]/gi) ?? [];
    const segments = [];
    let position = 0;
    let command = '';
    let x = 0;
    let y = 0;
    const isNumber = (token) => token !== undefined && !Number.isNaN(Number(token));
    while (position < tokens.length) {
      if (/^[a-z]$/i.test(tokens[position])) command = tokens[position++];
      const relative = command === command.toLowerCase();
      const operation = command.toUpperCase();
      if (!['M', 'L', 'H', 'V'].includes(operation)) return null;
      if (operation === 'H') {
        while (isNumber(tokens[position])) {
          const nextX = Number(tokens[position++]) + (relative ? x : 0);
          segments.push(`M${x} ${y}L${nextX} ${y}`);
          x = nextX;
        }
      } else if (operation === 'V') {
        while (isNumber(tokens[position])) {
          const nextY = Number(tokens[position++]) + (relative ? y : 0);
          segments.push(`M${x} ${y}L${x} ${nextY}`);
          y = nextY;
        }
      } else {
        let firstMove = operation === 'M';
        while (isNumber(tokens[position]) && isNumber(tokens[position + 1])) {
          const nextX = Number(tokens[position++]) + (relative ? x : 0);
          const nextY = Number(tokens[position++]) + (relative ? y : 0);
          if (!firstMove) segments.push(`M${x} ${y}L${nextX} ${nextY}`);
          x = nextX;
          y = nextY;
          firstMove = false;
        }
        if (operation === 'M') command = relative ? 'l' : 'L';
      }
      if (position < tokens.length && !/^[a-z]$/i.test(tokens[position])) return null;
    }
    return segments;
  };
  const svgNamespace = 'http://www.w3.org/2000/svg';
  session.querySelectorAll('figure[data-diagram] > svg').forEach((svg, index) => {
    const figure = svg.parentElement;
    if (!figure) return;
    const localized = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
    const markerId = `session-diagram-arrow-${index + 1}`;
    let defs = svg.querySelector(':scope > defs');
    if (!defs) {
      defs = document.createElementNS(svgNamespace, 'defs');
      svg.prepend(defs);
    }
    const marker = document.createElementNS(svgNamespace, 'marker');
    marker.id = markerId;
    marker.setAttribute('viewBox', '0 0 12 12');
    marker.setAttribute('markerWidth', '14');
    marker.setAttribute('markerHeight', '14');
    marker.setAttribute('refX', '11');
    marker.setAttribute('refY', '6');
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('markerUnits', 'userSpaceOnUse');
    const arrow = document.createElementNS(svgNamespace, 'path');
    arrow.setAttribute('d', 'M1 1 11 6 1 11 3.5 6z');
    arrow.setAttribute('fill', '#748194');
    marker.append(arrow);
    defs.append(marker);

    const authoredLegend = svg.querySelector(
      '.diagram-svg-legend, .mindmap-legend, .diagram-legend',
    );
    const authoredLegendItems = authoredLegend
      ? [...authoredLegend.querySelectorAll('.diagram-legend-item')].map((item) => ({
          tone: item.dataset.tone,
          label: item.querySelector('text')?.textContent?.trim() ?? '',
        }))
      : [];
    authoredLegend?.remove();

    const textNodes = [...svg.querySelectorAll('text')].filter((text) => !text.closest('defs'));
    const nodeShapes = [...svg.querySelectorAll('rect, circle, ellipse, polygon')].filter(
      (shape) => !shape.closest('defs, .diagram-svg-legend, .mindmap-legend, .diagram-legend'),
    );
    const pairedLabels = new Map();
    nodeShapes.forEach((shape, shapeIndex) => {
      let bounds;
      try {
        bounds = shape.getBBox();
      } catch {
        return;
      }
      const labels = textNodes.filter((text) => {
        let textBounds;
        try {
          textBounds = text.getBBox();
        } catch {
          return false;
        }
        const x = textBounds.x + textBounds.width / 2;
        const y = textBounds.y + textBounds.height / 2;
        return (
          x >= bounds.x - 2 &&
          x <= bounds.x + bounds.width + 2 &&
          y >= bounds.y - 2 &&
          y <= bounds.y + bounds.height + 2
        );
      });
      const label = labels
        .map((text) => text.textContent.trim())
        .filter(Boolean)
        .join(' ');
      const explicitTone = shape.closest('[data-tone]')?.dataset.tone;
      const tone =
        typeof explicitTone === 'string' && explicitTone in diagramPalette
          ? explicitTone
          : diagramToneFor(label, shapeIndex);
      shape.dataset.tone = tone;
      shape.classList.add('diagram-shape-node');
      if (shape.tagName.toLowerCase() === 'rect' && !shape.hasAttribute('rx'))
        shape.setAttribute('rx', '9');
      labels.forEach((text) => {
        text.dataset.nodeLabel = 'true';
        text.dataset.tone = tone;
        pairedLabels.set(text, tone);
      });
    });
    textNodes.forEach((text) => {
      if (pairedLabels.has(text)) return;
      text.dataset.messageLabel = 'true';
      text.style.setProperty('font-size', '10px', 'important');
      text.style.setProperty('font-weight', '400', 'important');
    });

    const sequenceDiagram = figure.dataset.diagram === 'order-payment-sequence';
    if (sequenceDiagram) {
      const combined = [...svg.querySelectorAll('path')].find((path) => {
        const d = path.getAttribute('d') ?? '';
        return /V\s*-?[\d.]+/i.test(d) && /H\s*-?[\d.]+/i.test(d);
      });
      if (combined) {
        const d = combined.getAttribute('d') ?? '';
        const commands = [...d.matchAll(/M\s*(-?[\d.]+)[,\s]+(-?[\d.]+)\s*([HV])\s*(-?[\d.]+)/g)];
        if (commands.length > 1) {
          const fragment = document.createDocumentFragment();
          for (const command of commands) {
            const [, x, y, axis, end] = command;
            const relation = document.createElementNS(svgNamespace, 'path');
            if (axis.toUpperCase() === 'V') {
              relation.setAttribute('d', `M${x} ${y}V${end}`);
              relation.classList.add('diagram-lifeline');
            } else {
              relation.setAttribute('d', `M${x} ${y}H${end}`);
              relation.classList.add('diagram-arrow');
              relation.setAttribute('marker-end', `url(#${markerId})`);
            }
            fragment.append(relation);
          }
          combined.replaceWith(fragment);
        }
      }
    }

    [...svg.querySelectorAll('path')].forEach((path) => {
      if (path.closest('defs, marker') || path.classList.contains('diagram-lifeline')) return;
      const d = path.getAttribute('d') ?? '';
      if (!d || /[Zz]/.test(d)) return;
      const parsedSegments = splitStraightPath(d);
      const subpaths = parsedSegments?.length
        ? parsedSegments
        : d
            .split(/(?=[Mm]\s*[-\d.])/g)
            .map((part) => part.trim())
            .filter(Boolean);
      const relations =
        subpaths.length > 1
          ? subpaths.map((part) => {
              const relation = path.cloneNode(false);
              relation.setAttribute('d', part);
              return relation;
            })
          : [path];
      if (relations.length > 1) path.replaceWith(...relations);
      relations.forEach((relation) => {
        relation.classList.add('diagram-arrow');
        relation.setAttribute('marker-end', `url(#${markerId})`);
      });
    });
    svg.querySelectorAll('line').forEach((line) => {
      if (line.classList.contains('node-line-')) return;
      line.classList.add('diagram-arrow');
      line.setAttribute('marker-end', `url(#${markerId})`);
    });

    const toneNames = [
      ...new Set([...nodeShapes.map((shape) => shape.dataset.tone)].filter(Boolean)),
    ];
    const categories = toneNames.map((tone) => ({
      tone,
      label:
        authoredLegendItems.find((item) => item.tone === tone)?.label || diagramToneLabels[tone],
    }));
    if (categories.length || svg.querySelector('.diagram-arrow')) {
      const legend = document.createElement('ul');
      legend.className = 'diagram-legend';
      legend.setAttribute(
        'aria-label',
        localized === 'en' ? 'Diagram key' : 'Leyenda del diagrama',
      );
      for (const category of categories) {
        const item = document.createElement('li');
        item.dataset.tone = category.tone;
        const label = document.createElement('span');
        label.textContent = category.label;
        item.append(label);
        legend.append(item);
      }
      if (svg.querySelector('.diagram-arrow')) {
        const item = document.createElement('li');
        item.className = 'diagram-legend-relation';
        item.dataset.directed = 'true';
        const sample = document.createElement('span');
        sample.setAttribute('aria-hidden', 'true');
        const label = document.createElement('span');
        label.textContent = localized === 'en' ? 'Directed sequence' : 'Relación dirigida';
        item.append(sample, label);
        legend.append(item);
      }
      const caption = figure.querySelector('figcaption');
      if (caption) caption.before(legend);
      else figure.append(legend);
    }
    if (figure.scrollWidth > figure.clientWidth) {
      const caption = figure.querySelector('figcaption')?.textContent?.trim();
      figure.tabIndex = 0;
      figure.setAttribute('role', 'region');
      figure.setAttribute(
        'aria-label',
        `${localized === 'en' ? 'Scrollable diagram' : 'Diagrama desplazable'}${caption ? `: ${caption}` : ''}`,
      );
    }
  });
  session.querySelectorAll('figure.diagram-card').forEach((figure) => {
    if (figure.scrollWidth <= figure.clientWidth) return;
    const caption = figure.querySelector('figcaption')?.textContent?.trim();
    figure.tabIndex = 0;
    figure.setAttribute('role', 'region');
    figure.setAttribute(
      'aria-label',
      `${document.documentElement.lang === 'es' ? 'Diagrama desplazable' : 'Scrollable diagram'}${caption ? `: ${caption}` : ''}`,
    );
  });

  const setPressedDefaults = (root) => {
    root
      .querySelectorAll(
        '.node-grid button, .mind-map-controls button, [data-widget="mind-map"] button[data-concept], [data-widget="architecture-explorer"] button',
      )
      .forEach((button) => {
        if (!button.hasAttribute('type')) button.setAttribute('type', 'button');
        if (!button.hasAttribute('aria-pressed')) button.setAttribute('aria-pressed', 'false');
      });
  };
  setPressedDefaults(session);

  const mapToneFor = (label) => {
    const text = label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    if (
      /\b(ia|ai|inteligencia artificial|artificial intelligence|modelo|inferencia|alucinacion|hallucination)\b/.test(
        text,
      )
    )
      return 'coral';
    if (
      /\b(evidencia|aprendizaje|learning|evaluador|evaluator|prueba|testing|trazabilidad|traceability|estudio)\b/.test(
        text,
      )
    )
      return 'green';
    if (
      /\b(calidad|quality|restriccion|constraint|rendimiento|performance|riesgo|risk|compatibilidad|compatibility|respuesta|response|umbral|threshold|seguridad|security|identidad|identity|permisos|permission)\b/.test(
        text,
      )
    )
      return 'amber';
    if (
      /\b(plataforma|platform|consumidor|consumer|api|ownership|producto|product|servicio|service|capacidad transversal|cross-cutting)\b/.test(
        text,
      )
    )
      return 'cyan';
    if (
      /\b(arquitectura|architecture|frontera|boundary|acoplamiento|coupling|cohesion|cohesion|diseno|design|contrato|contract|decision|trade-off|alternativa|alternative|invariante|invariant)\b/.test(
        text,
      )
    )
      return 'violet';
    return 'blue';
  };
  const mapToneLabels = {
    es: {
      blue: 'Fundamentos y contexto',
      violet: 'Arquitectura y contratos',
      amber: 'Calidad y restricciones',
      green: 'Evidencia y aprendizaje',
      cyan: 'Plataforma y consumidores',
      coral: 'Ingeniería de IA',
    },
    en: {
      blue: 'Foundations and context',
      violet: 'Architecture and contracts',
      amber: 'Quality and constraints',
      green: 'Evidence and learning',
      cyan: 'Platform and consumers',
      coral: 'AI engineering',
    },
  };
  const addMindMapLegend = (root, tones, relationshipLabel = '') => {
    if (!tones.length) return;
    const localized = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
    const legend = document.createElement('ul');
    legend.className = 'session-map-legend';
    legend.setAttribute(
      'aria-label',
      localized === 'es' ? 'Leyenda del mapa mental' : 'Mind map legend',
    );
    for (const tone of tones) {
      const item = document.createElement('li');
      item.dataset.tone = tone;
      const swatch = document.createElement('span');
      swatch.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.textContent = mapToneLabels[localized][tone];
      item.append(swatch, label);
      legend.append(item);
    }
    if (relationshipLabel) {
      const item = document.createElement('li');
      item.className = 'session-map-relation-key';
      const sample = document.createElement('span');
      sample.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.textContent = relationshipLabel;
      item.append(sample, label);
      legend.append(item);
    }
    root.append(legend);
  };
  let categoryPickerSequence = 0;
  const groupCategorizedControls = (container, buttons, localized, kind = 'architecture') => {
    const useArchitectureSelects = kind === 'architecture' && buttons.length > 3;
    const useMindMapSelects = kind === 'mind-map' && buttons.length > 3;
    if (buttons.length <= 3) return;
    const groups = new Map();
    buttons.forEach((button) => {
      const tone = button.dataset.tone;
      if (!groups.has(tone)) groups.set(tone, []);
      groups.get(tone).push(button);
    });
    if (groups.size < 2 && !useArchitectureSelects && !useMindMapSelects) return;

    const prefix = container.id || `node-category-picker-${++categoryPickerSequence}`;
    if (!useArchitectureSelects && !useMindMapSelects) {
      container.id = prefix;
      container.classList.add('categorized-node-picker');
    }
    if (useMindMapSelects) container.classList.add('categorized-node-picker');
    const tablist = document.createElement('div');
    tablist.className = 'node-category-tabs';
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute(
      'aria-label',
      kind === 'mind-map'
        ? localized === 'es'
          ? 'Categorías de conceptos'
          : 'Concept categories'
        : localized === 'es'
          ? 'Categorías de componentes'
          : 'Component categories',
    );
    const tabs = [];
    const panels = [];
    const entries = [...groups.entries()];
    const selectedTone = buttons.find((button) => button.getAttribute('aria-pressed') === 'true')
      ?.dataset.tone;
    const activeIndex = Math.max(
      0,
      entries.findIndex(([tone]) => tone === selectedTone),
    );

    if (useArchitectureSelects) {
      const picker = document.createElement('div');
      const nodeSource = document.createElement('div');
      const categorySelect = entries.length > 1 ? document.createElement('select') : null;
      const conceptSelect = document.createElement('select');
      picker.className = 'architecture-explorer-selector';
      picker.setAttribute('role', 'group');
      picker.setAttribute(
        'aria-label',
        localized === 'es'
          ? 'Explorar componentes de arquitectura'
          : 'Explore architecture components',
      );
      nodeSource.className = 'architecture-explorer-node-source';
      nodeSource.hidden = true;
      buttons.forEach((button) => {
        button.removeAttribute('role');
        button.removeAttribute('aria-controls');
        button.removeAttribute('aria-selected');
        button.removeAttribute('tabindex');
      });

      const addSelectLabel = (select, labelText, ariaLabel) => {
        const label = document.createElement('label');
        const text = document.createElement('span');
        text.textContent = labelText;
        select.setAttribute('aria-label', ariaLabel);
        label.append(text, select);
        picker.append(label);
      };

      if (categorySelect) {
        categorySelect.className = 'architecture-category-select';
        entries.forEach(([tone, members], index) => {
          const option = document.createElement('option');
          option.value = tone;
          option.textContent = `${mapToneLabels[localized][tone]} (${members.length})`;
          option.selected = index === activeIndex;
          categorySelect.append(option);
        });
        addSelectLabel(
          categorySelect,
          localized === 'es' ? 'Categoría' : 'Category',
          localized === 'es' ? 'Categoría de arquitectura' : 'Architecture category',
        );
      }

      conceptSelect.className = 'architecture-concept-select';
      addSelectLabel(
        conceptSelect,
        localized === 'es' ? 'Componente' : 'Component',
        localized === 'es' ? 'Componente de arquitectura' : 'Architecture component',
      );
      const updateConceptOptions = (categoryIndex, preserveSelection = true) => {
        const [tone, members] = entries[categoryIndex];
        const selectedButton = buttons.find(
          (button) => button.getAttribute('aria-pressed') === 'true',
        );
        const keepSelection = preserveSelection && members.includes(selectedButton);
        conceptSelect.replaceChildren();
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent =
          localized === 'es' ? 'Selecciona un componente' : 'Choose a component';
        placeholder.disabled = true;
        placeholder.selected = !keepSelection;
        conceptSelect.append(placeholder);
        members.forEach((button) => {
          const option = document.createElement('option');
          option.value = String(buttons.indexOf(button));
          option.textContent = button.dataset.concept || button.textContent.trim();
          option.selected = keepSelection && button === selectedButton;
          conceptSelect.append(option);
        });
        if (keepSelection) conceptSelect.value = String(buttons.indexOf(selectedButton));
        conceptSelect.dataset.tone = tone;
      };
      if (categorySelect) {
        categorySelect.addEventListener('change', () => {
          const index = entries.findIndex(([tone]) => tone === categorySelect.value);
          if (index >= 0) updateConceptOptions(index);
        });
      }
      conceptSelect.addEventListener('change', () => {
        const button = buttons[Number(conceptSelect.value)];
        if (button) button.click();
      });
      buttons.forEach((button) => {
        nodeSource.append(button);
        button.addEventListener('click', () => {
          const index = entries.findIndex(([, members]) => members.includes(button));
          if (index < 0) return;
          if (categorySelect) categorySelect.value = entries[index][0];
          updateConceptOptions(index);
        });
      });
      updateConceptOptions(activeIndex);
      container.id = prefix;
      container.classList.add('architecture-select-picker');
      container.setAttribute(
        'aria-label',
        localized === 'es' ? 'Controles de arquitectura' : 'Architecture controls',
      );
      container.replaceChildren(picker, nodeSource);
      return;
    }

    entries.forEach(([tone, members], index) => {
      const label = mapToneLabels[localized][tone];
      const tab = document.createElement('button');
      const panel = document.createElement('div');
      const tabId = `${prefix}-tab-${tone}`;
      const panelId = `${prefix}-panel-${tone}`;
      tab.type = 'button';
      tab.className = 'node-category-tab';
      tab.dataset.tone = tone;
      tab.id = tabId;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panelId);
      tab.setAttribute('aria-label', `${label} (${members.length})`);
      tab.setAttribute('aria-selected', String(index === activeIndex));
      tab.tabIndex = index === activeIndex ? 0 : -1;
      const tabLabel = document.createElement('span');
      tabLabel.textContent = label;
      const count = document.createElement('span');
      count.className = 'node-category-count';
      count.setAttribute('aria-hidden', 'true');
      count.textContent = String(members.length);
      tab.append(tabLabel, count);

      panel.className = 'node-category-panel';
      panel.id = panelId;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabId);
      panel.tabIndex = 0;
      panel.hidden = index !== activeIndex;
      members.forEach((button) => panel.append(button));
      tablist.append(tab);
      tabs.push(tab);
      panels.push(panel);
    });

    const activate = (index, moveFocus = false) => {
      tabs.forEach((tab, tabIndex) => {
        const selected = tabIndex === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[tabIndex].hidden = !selected;
      });
      if (useMindMapSelects) {
        tablist.hidden = true;
        panels.forEach((panel) => {
          panel.hidden = true;
        });
      }
      if (mobilePicker) {
        if (categorySelect) categorySelect.value = entries[index][0];
        updateConceptOptions(index, false);
      }
      if (moveFocus) tabs[index].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
    });
    tablist.addEventListener('keydown', (event) => {
      const current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(next, true);
    });
    let mobilePicker;
    let categorySelect;
    let conceptSelect;
    const updateConceptOptions = (categoryIndex, preserveSelection = true) => {
      if (!conceptSelect) return;
      const [tone, members] = entries[categoryIndex];
      const selectedButton = buttons.find(
        (button) => button.getAttribute('aria-pressed') === 'true',
      );
      const keepSelection = preserveSelection && members.includes(selectedButton);
      conceptSelect.replaceChildren();
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = localized === 'es' ? 'Selecciona un concepto' : 'Choose a concept';
      placeholder.disabled = true;
      placeholder.selected = !keepSelection;
      conceptSelect.append(placeholder);
      members.forEach((button) => {
        const option = document.createElement('option');
        option.value = String(buttons.indexOf(button));
        option.textContent = button.dataset.concept || button.textContent.trim();
        option.selected = keepSelection && button === selectedButton;
        conceptSelect.append(option);
      });
      if (keepSelection) conceptSelect.value = String(buttons.indexOf(selectedButton));
      conceptSelect.dataset.tone = tone;
    };
    if (kind === 'mind-map') {
      container.classList.add('has-mobile-mind-map-picker');
      mobilePicker = document.createElement('div');
      mobilePicker.className = 'mind-map-mobile-picker';
      mobilePicker.setAttribute('role', 'group');
      mobilePicker.setAttribute(
        'aria-label',
        localized === 'es' ? 'Explorar conceptos del mapa' : 'Explore map concepts',
      );
      if (entries.length > 1) {
        const categoryLabel = document.createElement('label');
        const categoryLabelText = document.createElement('span');
        categoryLabelText.textContent = localized === 'es' ? 'Categoría' : 'Category';
        categorySelect = document.createElement('select');
        categorySelect.className = 'mind-map-category-select';
        categorySelect.setAttribute(
          'aria-label',
          localized === 'es' ? 'Categoría de conceptos' : 'Concept category',
        );
        entries.forEach(([tone, members], index) => {
          const option = document.createElement('option');
          option.value = tone;
          option.textContent = `${mapToneLabels[localized][tone]} (${members.length})`;
          option.selected = index === activeIndex;
          categorySelect.append(option);
        });
        categoryLabel.append(categoryLabelText, categorySelect);
        mobilePicker.append(categoryLabel);
      }

      const conceptLabel = document.createElement('label');
      const conceptLabelText = document.createElement('span');
      conceptLabelText.textContent = localized === 'es' ? 'Concepto' : 'Concept';
      conceptSelect = document.createElement('select');
      conceptSelect.className = 'mind-map-concept-select';
      conceptSelect.setAttribute(
        'aria-label',
        localized === 'es' ? 'Concepto del mapa' : 'Map concept',
      );
      conceptLabel.append(conceptLabelText, conceptSelect);
      mobilePicker.append(conceptLabel);
      categorySelect?.addEventListener('change', () => {
        const index = entries.findIndex(([tone]) => tone === categorySelect.value);
        if (index < 0) return;
        activate(index);
        updateConceptOptions(index);
      });
      conceptSelect.addEventListener('change', () => {
        const button = buttons[Number(conceptSelect.value)];
        if (button) button.click();
      });
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const index = entries.findIndex(([, members]) => members.includes(button));
          if (index < 0) return;
          activate(index);
          updateConceptOptions(index);
        });
      });
      updateConceptOptions(activeIndex);
    }
    if (useMindMapSelects) {
      tablist.hidden = true;
      panels.forEach((panel) => {
        panel.hidden = true;
      });
    }
    container.replaceChildren(
      ...(mobilePicker ? [mobilePicker, tablist, ...panels] : [tablist, ...panels]),
    );
  };
  let mindMapScopes = {};
  try {
    mindMapScopes = JSON.parse(session.querySelector('#studio-data')?.textContent || '{}');
  } catch {
    mindMapScopes = {};
  }
  const localizedMindMap = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
  const makeSvgElement = (tag, attributes = {}, text = '') => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    if (text) element.textContent = text;
    return element;
  };
  const mapDetailPanelFor = (widget) =>
    widget.querySelector('.widget-panel, .panel, .widget-output, [aria-live="polite"]');
  const ensureMapDetailId = (widget, panel) => {
    if (!panel) return '';
    if (!panel.id) {
      const widgetId =
        widget.id || widget.dataset.widgetId || `mind-map-${++categoryPickerSequence}`;
      panel.id = `${widgetId}-detail`;
    }
    return panel.id;
  };
  const mapButtonsFor = (widget) =>
    [
      ...widget.querySelectorAll(
        '.node-grid button, .mind-graph button, .mind-map-controls button, #global-map-chapters button, [data-concept]',
      ),
    ].filter(
      (button, index, buttons) =>
        !button.classList.contains('session-map-node-button') && buttons.indexOf(button) === index,
    );
  const mapControlsFor = (button) =>
    button.closest(
      '.session-map-selector, .mind-map-controls, #global-map-chapters, .node-grid, .mind-graph',
    ) || button.parentElement;
  const mindMapSvgFor = (widget) =>
    widget.querySelector('svg.session-map-graph, :scope > svg, .node-grid > svg');
  const createConceptMapDiagram = (widget, buttons, localized) => {
    const scope = mindMapScopes[widget.dataset.studioScope];
    const terms = Array.isArray(scope?.terms) ? scope.terms : [];
    const grouped = new Map();
    buttons.forEach((button, index) => {
      const term = terms[index];
      const tone = mapToneFor(term?.area || button.textContent.trim());
      button.dataset.tone = tone;
      const groupName = term?.area || mapToneLabels[localized][tone];
      if (!grouped.has(groupName)) grouped.set(groupName, { tone, buttons: [] });
      grouped.get(groupName).buttons.push(button);
    });
    const groups = [...grouped.entries()];
    if (!groups.length) return null;
    const columns = Math.min(3, groups.length);
    const rows = Math.ceil(groups.length / columns);
    const width = columns * 300 + 40;
    const groupHeights = Array.from({ length: rows }, (_, row) => {
      const rowGroups = groups.slice(row * columns, (row + 1) * columns);
      return 150 + Math.max(...rowGroups.map(([, value]) => value.buttons.length)) * 78;
    });
    const rowOffsets = groupHeights.map((_, index) =>
      groupHeights.slice(0, index).reduce((sum, height) => sum + height, 0),
    );
    const height = groupHeights.reduce((sum, item) => sum + item, 0) + 12;
    const heading = widget.querySelector('h3, h4, h5, h6')?.textContent.trim();
    const detailId = ensureMapDetailId(widget, mapDetailPanelFor(widget));
    const svg = makeSvgElement('svg', {
      viewBox: `0 0 ${width} ${height}`,
      role: 'group',
      'aria-label': heading
        ? `${heading}${localized === 'es' ? ': diagrama interactivo' : ': interactive diagram'}`
        : localized === 'es'
          ? 'Diagrama interactivo de conceptos'
          : 'Interactive concept diagram',
      class: 'session-map-graph session-map-generated-graph',
    });
    const title = makeSvgElement(
      'title',
      {},
      heading || (localized === 'es' ? 'Diagrama de conceptos' : 'Concept diagram'),
    );
    const description = makeSvgElement(
      'desc',
      {},
      localized === 'es'
        ? 'Los conceptos se agrupan por su perspectiva compartida. Selecciona un nodo para consultar su detalle.'
        : 'Concepts are grouped by their shared area. Select a node to view its details.',
    );
    svg.append(title, description);
    groups.forEach(([groupName, group], index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      const centerX = 170 + column * 300;
      const top = rowOffsets[row] + 14;
      const headingWidth = 258;
      const header = makeSvgElement('rect', {
        x: centerX - headingWidth / 2,
        y: top,
        width: headingWidth,
        height: 42,
        rx: 8,
        class: 'session-map-group-node',
        'data-tone': group.tone,
      });
      const headerLabel = makeSvgElement(
        'text',
        {
          x: centerX,
          y: top + 26,
          'text-anchor': 'middle',
          class: 'session-map-group-label',
        },
        groupName,
      );
      svg.append(header, headerLabel);
      group.buttons.forEach((button, itemIndex) => {
        const nodeY = top + 122 + itemIndex * 78;
        const edge = makeSvgElement('path', {
          d: `M ${centerX} ${top + 48} C ${centerX} ${top + 72}, ${centerX} ${nodeY - 44}, ${centerX} ${nodeY - 30}`,
          class: 'session-map-edge',
          'data-tone': group.tone,
        });
        const foreignObject = makeSvgElement('foreignObject', {
          x: centerX - 125,
          y: nodeY - 28,
          width: 250,
          height: 56,
          class: 'session-map-node-object',
        });
        const nodeButton = document.createElement('button');
        nodeButton.type = 'button';
        nodeButton.className = 'session-map-node-button';
        nodeButton.dataset.tone = group.tone;
        nodeButton.textContent = button.dataset.concept || button.textContent.trim();
        nodeButton.setAttribute('aria-pressed', button.getAttribute('aria-pressed') === 'true');
        nodeButton.setAttribute(
          'aria-label',
          `${nodeButton.textContent}${localized === 'es' ? ', seleccionar concepto' : ', select concept'}`,
        );
        if (detailId) nodeButton.setAttribute('aria-controls', detailId);
        nodeButton.addEventListener('click', () => button.click());
        const sync = () => {
          const selected = button.getAttribute('aria-pressed') === 'true';
          nodeButton.setAttribute('aria-pressed', String(selected));
          nodeButton.classList.toggle('is-related', button.classList.contains('related'));
          edge.classList.toggle('is-active', selected || button.classList.contains('related'));
        };
        sync();
        new globalThis.MutationObserver(sync).observe(button, {
          attributes: true,
          attributeFilter: ['aria-pressed', 'class'],
        });
        foreignObject.append(nodeButton);
        svg.append(edge, foreignObject);
      });
    });
    return { svg, tones: [...new Set(groups.map(([, group]) => group.tone))] };
  };
  session.querySelectorAll('[data-widget="mind-map"]').forEach((widget) => {
    if (mindMapSvgFor(widget)) return;
    const buttons = mapButtonsFor(widget);
    if (!buttons.length) return;
    const diagram = createConceptMapDiagram(widget, buttons, localizedMindMap);
    if (!diagram) return;
    const controls = mapControlsFor(buttons[0]);
    if (controls?.matches('.node-grid, .mind-graph')) {
      controls.insertBefore(diagram.svg, controls.firstChild);
    } else if (controls) {
      const visual = document.createElement('div');
      visual.className = 'session-map-visual';
      visual.setAttribute('role', 'region');
      visual.setAttribute(
        'aria-label',
        localizedMindMap === 'es'
          ? 'Diagrama interactivo de conceptos'
          : 'Interactive concept diagram',
      );
      visual.tabIndex = 0;
      visual.append(diagram.svg);
      controls.before(visual);
      addMindMapLegend(
        visual,
        diagram.tones,
        localizedMindMap === 'es'
          ? 'Línea punteada: conceptos agrupados por función'
          : 'Dotted line: concepts grouped by function',
      );
    }
    widget.dataset.interactiveMap = 'true';
  });
  session.querySelectorAll('.node-grid').forEach((container) => {
    const svg = container.querySelector(':scope > svg');
    const buttons = [...container.querySelectorAll(':scope > button')];
    if (!svg || !buttons.length) return;

    container.classList.add('session-interactive-map');
    svg.classList.add('session-map-graph');
    const localized = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
    svg.setAttribute(
      'aria-label',
      localized === 'es'
        ? 'Mapa de conceptos relacionados. Los nombres completos y controles están disponibles debajo.'
        : 'Map of related concepts. Full names and controls are available below.',
    );
    const visual = document.createElement('div');
    visual.className = 'session-map-visual';
    visual.setAttribute('role', 'region');
    visual.setAttribute(
      'aria-label',
      localized === 'es' ? 'Visualización del mapa mental' : 'Mind map visualization',
    );
    visual.tabIndex = 0;
    container.insertBefore(visual, svg);
    visual.append(svg);

    const nodes = [...svg.querySelectorAll('circle')];
    const labels = svg.classList.contains('session-map-generated-graph')
      ? []
      : [...svg.querySelectorAll('text')];
    const labelMap = new Map();
    buttons.forEach((button, index) => {
      const fullLabel = button.textContent.trim();
      const tone = svg.classList.contains('session-map-generated-graph')
        ? button.dataset.tone || mapToneFor(fullLabel)
        : mapToneFor(fullLabel);
      button.dataset.tone = tone;
      labelMap.set(button, tone);
      const node = nodes[index];
      const text = labels[index];
      if (node) {
        const x = Number(node.getAttribute('cx'));
        const y = Number(node.getAttribute('cy'));
        const coordinates = [...nodes].map((candidate) => Number(candidate.getAttribute('cx')));
        const columns = [...new Set(coordinates)].sort((a, b) => a - b);
        const gap =
          columns.length > 1
            ? Math.min(...columns.slice(1).map((value, column) => value - columns[column]))
            : 180;
        const width = Math.max(132, Math.min(244, gap * 0.84));
        const words = fullLabel.split(/\s+/);
        const limit = Math.max(15, Math.floor((width - 24) / 7));
        const lines = [];
        let line = '';
        for (const word of words) {
          const candidate = line ? `${line} ${word}` : word;
          if (line && candidate.length > limit) {
            lines.push(line);
            line = word;
          } else line = candidate;
        }
        if (line) lines.push(line);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.classList.add('session-map-node');
        rect.dataset.tone = tone;
        rect.setAttribute('x', String(x - width / 2));
        rect.setAttribute('y', String(y - (lines.length * 16 + 18) / 2));
        rect.setAttribute('width', String(width));
        rect.setAttribute('height', String(lines.length * 16 + 18));
        rect.setAttribute('rx', '12');
        rect.setAttribute('data-node-index', String(index));
        node.replaceWith(rect);

        if (text) {
          text.replaceChildren();
          text.classList.add('session-map-node-label');
          text.dataset.tone = tone;
          text.setAttribute('x', String(x));
          text.setAttribute('y', String(y - ((lines.length - 1) * 16) / 2 + 4));
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('font-size', '12');
          lines.forEach((value, lineIndex) => {
            const span = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            span.setAttribute('x', String(x));
            if (lineIndex) span.setAttribute('dy', '16');
            span.textContent = value;
            text.append(span);
          });
        }
      }
      const syncNode = () => {
        const currentNode = svg.querySelector(`[data-node-index="${index}"]`);
        if (!currentNode) return;
        currentNode.classList.toggle('is-selected', button.getAttribute('aria-pressed') === 'true');
        currentNode.classList.toggle('is-related', button.classList.contains('related'));
      };
      syncNode();
      new globalThis.MutationObserver(syncNode).observe(button, {
        attributes: true,
        attributeFilter: ['aria-pressed', 'class'],
      });
    });
    svg.querySelectorAll('line').forEach((line) => {
      line.setAttribute('stroke', '#8493a7');
      line.setAttribute('stroke-dasharray', '4 5');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('stroke-width', '1.5');
    });
    const controls = document.createElement('div');
    controls.className = 'session-map-selector';
    controls.setAttribute('role', 'group');
    controls.setAttribute(
      'aria-label',
      localized === 'es' ? 'Seleccionar concepto del mapa' : 'Select a map concept',
    );
    buttons.forEach((button) => controls.append(button));
    container.append(controls);
    const tones = [...new Set(labelMap.values())];
    controls.id = `${container.id || `mind-map-${++categoryPickerSequence}`}-controls`;
    groupCategorizedControls(controls, buttons, localized, 'mind-map');
    addMindMapLegend(
      visual,
      tones,
      localized === 'es'
        ? 'Línea punteada: relación entre conceptos'
        : 'Dotted line: relationship between concepts',
    );
  });
  session.querySelectorAll('.mind-map-controls').forEach((controls) => {
    const localized = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
    const buttons = [...controls.querySelectorAll('button[data-concept]')];
    const tones = new Set();
    buttons.forEach((button) => {
      const tone = mapToneFor(`${button.dataset.concept} ${button.textContent}`);
      button.dataset.tone = tone;
      tones.add(tone);
    });
    groupCategorizedControls(controls, buttons, localized, 'mind-map');
    if (!controls.parentElement.querySelector('.session-map-legend'))
      addMindMapLegend(
        controls.parentElement,
        [...tones],
        localized === 'es'
          ? 'Las conexiones se describen al seleccionar un nodo'
          : 'Connections are described when a node is selected',
      );
  });
  const attachDiagramButtons = (widget, svg, buttons, localized) => {
    if (!svg || !buttons.length || svg.querySelector('.session-map-node-button')) return;
    const viewBox = (svg.getAttribute('viewBox') || '0 0 800 300')
      .trim()
      .split(/[ ,]+/)
      .map(Number);
    const viewWidth = viewBox[2] || 800;
    const viewHeight = viewBox[3] || 300;
    const detailId = ensureMapDetailId(widget, mapDetailPanelFor(widget));
    const nodes = [...svg.querySelectorAll('circle, rect[data-node-index]')];
    if (nodes.length !== buttons.length) return;
    const xValues = nodes.map((node) =>
      Number(
        node.tagName.toLowerCase() === 'circle'
          ? node.getAttribute('cx')
          : Number(node.getAttribute('x')) + Number(node.getAttribute('width')) / 2,
      ),
    );
    const columns = [...new Set(xValues)].sort((a, b) => a - b);
    const gap =
      columns.length > 1
        ? Math.min(...columns.slice(1).map((x, index) => x - columns[index]))
        : 230;
    const nodeWidth = Math.max(136, Math.min(218, gap * 0.82));
    nodes.forEach((node, index) => {
      const button = buttons[index];
      const centerX = Number(
        node.tagName.toLowerCase() === 'circle'
          ? node.getAttribute('cx')
          : Number(node.getAttribute('x')) + Number(node.getAttribute('width')) / 2,
      );
      const centerY = Number(
        node.tagName.toLowerCase() === 'circle'
          ? node.getAttribute('cy')
          : Number(node.getAttribute('y')) + Number(node.getAttribute('height')) / 2,
      );
      const nodeTone = button.dataset.tone || mapToneFor(button.textContent.trim());
      button.dataset.tone = nodeTone;
      const object = makeSvgElement('foreignObject', {
        x: Math.max(4, Math.min(viewWidth - nodeWidth - 4, centerX - nodeWidth / 2)),
        y: Math.max(4, Math.min(viewHeight - 62, centerY - 29)),
        width: nodeWidth,
        height: 58,
        class: 'session-map-node-object',
      });
      const graphButton = document.createElement('button');
      graphButton.type = 'button';
      graphButton.className = 'session-map-node-button';
      graphButton.dataset.tone = nodeTone;
      graphButton.dataset.mapNodeIndex = String(index);
      graphButton.textContent = button.dataset.concept || button.textContent.trim();
      graphButton.setAttribute('aria-pressed', button.getAttribute('aria-pressed') === 'true');
      graphButton.setAttribute(
        'aria-label',
        `${graphButton.textContent}${localized === 'es' ? ', seleccionar concepto' : ', select concept'}`,
      );
      if (detailId) graphButton.setAttribute('aria-controls', detailId);
      graphButton.addEventListener('click', () => button.click());
      const sync = () => {
        const selected = button.getAttribute('aria-pressed') === 'true';
        graphButton.setAttribute('aria-pressed', String(selected));
        graphButton.classList.toggle('is-related', button.classList.contains('related'));
      };
      sync();
      new globalThis.MutationObserver(sync).observe(button, {
        attributes: true,
        attributeFilter: ['aria-pressed', 'class'],
      });
      object.append(graphButton);
      svg.append(object);
      node.setAttribute('aria-hidden', 'true');
      node.style.opacity = '0';
    });
    svg.querySelectorAll('text').forEach((label) => {
      label.setAttribute('aria-hidden', 'true');
      label.style.opacity = '0';
    });
    svg.setAttribute('role', 'group');
  };
  const enhanceGlobalMindMap = (widget, localized) => {
    const svg = widget.querySelector('#global-map-svg');
    const source = widget.querySelector('#global-map-chapters');
    const buttons = source ? [...source.querySelectorAll(':scope > button')] : [];
    const conceptSelect = widget.querySelector('#global-map-concept');
    if (!svg || !source || !buttons.length || !conceptSelect || svg.dataset.mapEnhanced === 'true')
      return;
    svg.dataset.mapEnhanced = 'true';
    const detailId = ensureMapDetailId(widget, widget.querySelector('#global-map-panel'));
    const columnCount = 2;
    const rows = Math.ceil(buttons.length / columnCount);
    const width = 940;
    const height = rows * 100 + 48;
    svg.replaceChildren();
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('role', 'group');
    svg.setAttribute(
      'aria-label',
      localized === 'es' ? 'Diagrama interactivo de capítulos' : 'Interactive chapter diagram',
    );
    svg.classList.add('session-map-graph', 'session-map-generated-graph');
    const defs = makeSvgElement('defs');
    const marker = makeSvgElement('marker', {
      id: 'global-map-arrow',
      viewBox: '0 0 10 10',
      refX: 8,
      refY: 5,
      markerWidth: 6,
      markerHeight: 6,
      orient: 'auto-start-reverse',
    });
    marker.append(
      makeSvgElement('path', { d: 'M 0 0 L 10 5 L 0 10 z', class: 'session-map-arrow' }),
    );
    defs.append(marker);
    svg.append(
      defs,
      makeSvgElement(
        'title',
        {},
        localized === 'es' ? 'Capítulos de la sesión' : 'Session chapters',
      ),
      makeSvgElement(
        'desc',
        {},
        localized === 'es'
          ? 'Secuencia de capítulos. Selecciona un capítulo para cargar sus conceptos.'
          : 'Chapter sequence. Select a chapter to load its concepts.',
      ),
    );
    const points = buttons.map((_, index) => ({
      x: index % columnCount === 0 ? 260 : 680,
      y: 48 + Math.floor(index / columnCount) * 100,
    }));
    buttons.slice(0, -1).forEach((_, index) => {
      const from = points[index];
      const to = points[index + 1];
      const sameRow = Math.floor(index / columnCount) === Math.floor((index + 1) / columnCount);
      const path = sameRow
        ? `M ${from.x + 112} ${from.y + 25} H ${to.x - 112}`
        : `M ${from.x} ${from.y + 32} C ${from.x} ${from.y + 82}, ${to.x} ${to.y - 22}, ${to.x} ${to.y - 32}`;
      svg.append(
        makeSvgElement('path', {
          d: path,
          class: 'session-map-edge session-map-edge--directed',
          'marker-end': 'url(#global-map-arrow)',
        }),
      );
    });
    buttons.forEach((sourceButton, index) => {
      sourceButton.dataset.tone = mapToneFor(sourceButton.textContent.trim());
      const point = points[index];
      const object = makeSvgElement('foreignObject', {
        x: point.x - 112,
        y: point.y - 28,
        width: 224,
        height: 56,
        class: 'session-map-node-object',
      });
      const nodeButton = document.createElement('button');
      nodeButton.type = 'button';
      nodeButton.className = 'session-map-node-button';
      nodeButton.dataset.tone = sourceButton.dataset.tone;
      nodeButton.textContent = sourceButton.textContent.trim();
      nodeButton.setAttribute('aria-pressed', sourceButton.getAttribute('aria-pressed') || 'false');
      if (detailId) nodeButton.setAttribute('aria-controls', detailId);
      nodeButton.addEventListener('click', () => sourceButton.click());
      const sync = () => {
        const selected = sourceButton.getAttribute('aria-pressed') === 'true';
        nodeButton.setAttribute('aria-pressed', String(selected));
        nodeButton.classList.toggle('is-related', sourceButton.classList.contains('related'));
      };
      sync();
      new globalThis.MutationObserver(sync).observe(sourceButton, {
        attributes: true,
        attributeFilter: ['aria-pressed', 'class'],
      });
      object.append(nodeButton);
      svg.append(object);
    });
    const picker = document.createElement('div');
    picker.className = 'mind-map-mobile-picker session-map-picker';
    picker.setAttribute('role', 'group');
    picker.setAttribute(
      'aria-label',
      localized === 'es' ? 'Explorar capítulos y conceptos' : 'Explore chapters and concepts',
    );
    const chapterLabel = document.createElement('label');
    const chapterLabelText = document.createElement('span');
    chapterLabelText.textContent = localized === 'es' ? 'Capítulo' : 'Chapter';
    const chapterSelect = document.createElement('select');
    chapterSelect.className = 'mind-map-category-select';
    chapterSelect.setAttribute('aria-label', chapterLabelText.textContent);
    const chapterSectionIds = [
      'concepts',
      'main-topic',
      ...Array.from({ length: 7 }, (_, index) => `subtopic-${index + 1}`),
    ];
    buttons.forEach((button, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      const conceptCount =
        session.querySelector(`#${chapterSectionIds[index]}`)?.querySelectorAll('[data-concept-id]')
          .length ?? 0;
      option.textContent = `${button.textContent.trim()} (${conceptCount})`;
      option.selected = button.getAttribute('aria-pressed') === 'true';
      chapterSelect.append(option);
    });
    chapterSelect.addEventListener('change', () => buttons[Number(chapterSelect.value)]?.click());
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        chapterSelect.value = String(index);
      });
    });
    chapterLabel.append(chapterLabelText, chapterSelect);
    picker.append(chapterLabel);
    const conceptLabel = conceptSelect.closest('label');
    if (conceptLabel) picker.append(conceptLabel);
    const visual = document.createElement('div');
    visual.className = 'session-map-visual';
    visual.setAttribute('role', 'region');
    visual.setAttribute(
      'aria-label',
      localized === 'es' ? 'Diagrama de capítulos' : 'Chapter diagram',
    );
    visual.tabIndex = 0;
    svg.before(visual);
    visual.append(svg);
    source.hidden = true;
    source.classList.add('session-map-control-source');
    source.before(picker);
    const tones = [...new Set(buttons.map((button) => button.dataset.tone))];
    addMindMapLegend(
      visual,
      tones,
      localized === 'es'
        ? 'Flecha punteada: orden de los capítulos'
        : 'Dotted arrow: chapter order',
    );
  };
  session.querySelectorAll('[data-widget="mind-map"]').forEach((widget) => {
    if (widget.querySelector('#global-map-svg')) {
      enhanceGlobalMindMap(widget, localizedMindMap);
      return;
    }
    let svg = mindMapSvgFor(widget);
    const buttons = mapButtonsFor(widget);
    if (!svg && buttons.length) {
      const diagram = createConceptMapDiagram(widget, buttons, localizedMindMap);
      if (diagram) {
        svg = diagram.svg;
        const controls = mapControlsFor(buttons[0]);
        if (controls?.matches('.node-grid, .mind-graph')) {
          controls.insertBefore(svg, controls.firstChild);
        } else if (controls) {
          const visual = document.createElement('div');
          visual.className = 'session-map-visual';
          visual.setAttribute('role', 'region');
          visual.setAttribute(
            'aria-label',
            localizedMindMap === 'es'
              ? 'Diagrama interactivo de conceptos'
              : 'Interactive concept diagram',
          );
          visual.tabIndex = 0;
          visual.append(svg);
          controls.before(visual);
          addMindMapLegend(
            visual,
            diagram.tones,
            localizedMindMap === 'es'
              ? 'Línea punteada: conceptos agrupados por función'
              : 'Dotted line: concepts grouped by function',
          );
        }
        widget.dataset.interactiveMap = 'true';
      }
    }
    if (!svg || !buttons.length) return;
    if (!svg.closest('.session-map-visual')) {
      const visual = document.createElement('div');
      visual.className = 'session-map-visual';
      visual.setAttribute('role', 'region');
      visual.setAttribute(
        'aria-label',
        localizedMindMap === 'es'
          ? 'Diagrama interactivo de conceptos'
          : 'Interactive concept diagram',
      );
      visual.tabIndex = 0;
      svg.before(visual);
      visual.append(svg);
      addMindMapLegend(
        visual,
        [
          ...new Set(
            buttons.map((button) => button.dataset.tone || mapToneFor(button.textContent.trim())),
          ),
        ],
        localizedMindMap === 'es'
          ? 'Línea punteada: relación documentada entre conceptos'
          : 'Dotted line: documented relationship between concepts',
      );
    }
    svg.classList.add('session-map-graph');
    attachDiagramButtons(widget, svg, buttons, localizedMindMap);
    const controls = mapControlsFor(buttons[0]);
    if (controls && buttons.length > 3 && !controls.classList.contains('categorized-node-picker'))
      groupCategorizedControls(controls, buttons, localizedMindMap, 'mind-map');
  });
  session.querySelectorAll('[data-widget="architecture-explorer"]').forEach((explorer) => {
    const controls = [
      ...explorer.querySelectorAll(
        '.node-grid:not(.session-interactive-map) > button, #global-architecture-buttons > button, .node-grid.session-interactive-map .session-map-selector button',
      ),
    ];
    controls.forEach((button) => {
      button.dataset.tone = mapToneFor(button.textContent.trim());
      const select = () => {
        controls.forEach((candidate) => {
          const selected = candidate === button;
          candidate.setAttribute('aria-pressed', String(selected));
          candidate.classList.toggle('active', selected);
        });
      };
      button.addEventListener('click', select);
    });
    const localized = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
    const controlsByContainer = new Map();
    controls.forEach((button) => {
      const container = button.closest('.session-map-selector') || button.parentElement;
      if (!controlsByContainer.has(container)) controlsByContainer.set(container, []);
      controlsByContainer.get(container).push(button);
    });
    controlsByContainer.forEach((buttonsInContainer, container) => {
      groupCategorizedControls(container, buttonsInContainer, localized);
    });

    const svg = explorer.querySelector('#global-architecture-svg');
    if (svg) {
      svg.classList.add('architecture-explorer-graph');
      const circles = [...svg.querySelectorAll('circle')];
      const labels = [...svg.querySelectorAll('text')];
      circles.forEach((circle, index) => {
        const tone = controls[index]?.dataset.tone ?? mapToneFor(labels[index]?.textContent ?? '');
        circle.dataset.tone = tone;
        circle.classList.add('architecture-explorer-node');
        labels[index]?.setAttribute('data-tone', tone);
        const sync = () =>
          circle.classList.toggle(
            'is-selected',
            controls[index]?.getAttribute('aria-pressed') === 'true',
          );
        sync();
        controls[index]?.addEventListener('click', sync);
      });
      svg
        .querySelectorAll('path')
        .forEach((path) => path.classList.add('architecture-explorer-edge'));
    }

    if (!controls.length) return;
    const tones = [...new Set(controls.map((button) => button.dataset.tone))];
    if (!explorer.querySelector('.session-map-visual .session-map-legend'))
      addMindMapLegend(
        explorer,
        tones,
        localized === 'es'
          ? 'Las relaciones se explican en el panel'
          : 'Relationships are explained in the panel',
      );
    const legend = explorer.querySelector(':scope > .session-map-legend');
    const panel = explorer.querySelector('.widget-panel');
    if (legend && panel) panel.before(legend);
  });

  session.querySelectorAll('[data-widget="decision-matrix"]').forEach((matrix) => {
    matrix.classList.add('session-decision-matrix');
    const localized = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
    const matrixPrefix =
      matrix.id ||
      `decision-matrix-${[...session.querySelectorAll('[data-widget="decision-matrix"]')].indexOf(matrix) + 1}`;
    matrix.querySelectorAll('.range-control, fieldset, .matrix-controls').forEach((group) => {
      group.classList.add('decision-matrix-controls');
    });
    matrix.querySelectorAll('[id$="-matrix-controls"]').forEach((group) => {
      group.classList.add('decision-matrix-controls');
    });
    matrix.querySelectorAll('table').forEach((table) => {
      table.classList.add('decision-matrix-table');
    });
    const ranges = [...matrix.querySelectorAll('input[type="range"]')];
    ranges.forEach((input) => {
      const label = input.labels?.[0];
      const labelText = label?.textContent.replace(/\s+/g, ' ').trim();
      const pair = document.createElement('span');
      pair.className = 'decision-matrix-range-pair';
      const numeric = document.createElement('input');
      numeric.type = 'number';
      numeric.className = 'decision-matrix-input decision-matrix-number-input';
      numeric.min = input.min;
      numeric.max = input.max;
      numeric.step = input.step || '1';
      numeric.value = input.value;
      numeric.id = `${input.id || `${matrixPrefix}-range-${ranges.indexOf(input) + 1}`}-number`;
      numeric.setAttribute(
        'aria-label',
        `${labelText || (localized === 'es' ? 'Valor del criterio' : 'Criterion value')} (${localized === 'es' ? 'valor numérico' : 'numeric value'})`,
      );
      input.replaceWith(pair);
      pair.append(input, numeric);
      const output = input.id
        ? [...matrix.querySelectorAll('output[for]')].find(
            (candidate) => candidate.htmlFor === input.id,
          )
        : label?.nextElementSibling?.tagName === 'OUTPUT'
          ? label.nextElementSibling
          : null;
      if (output) output.hidden = true;
      const syncNumeric = () => {
        numeric.value = input.value;
      };
      input.addEventListener('input', syncNumeric);
      input.addEventListener('change', syncNumeric);
      numeric.addEventListener('input', () => {
        if (!numeric.value || !numeric.validity.valid) return;
        input.value = numeric.value;
        input.dispatchEvent(new globalThis.Event('input', { bubbles: true }));
      });
      numeric.addEventListener('change', () => {
        if (!numeric.value || !numeric.validity.valid) {
          syncNumeric();
          return;
        }
        input.value = numeric.value;
        input.dispatchEvent(new globalThis.Event('change', { bubbles: true }));
      });
    });
    matrix.querySelectorAll('input[type="range"], input[type="number"]').forEach((input) => {
      input.classList.add('decision-matrix-input');
      const updateValue = () => {
        input.dataset.value = input.value;
        const output = input.id
          ? [...matrix.querySelectorAll('output[for]')].find(
              (candidate) => candidate.htmlFor === input.id,
            )
          : null;
        if (output) output.dataset.value = input.value;
      };
      updateValue();
      input.addEventListener('input', updateValue);
      input.addEventListener('change', updateValue);
    });
    matrix.querySelectorAll('output').forEach((output) => {
      output.classList.add('decision-matrix-value');
      output.dataset.value = output.value ?? output.textContent.trim();
    });
    const liveResults = [...matrix.querySelectorAll('[aria-live="polite"]')];
    liveResults.forEach((result) => {
      result.classList.add('decision-matrix-result');
    });
    const firstControls = matrix.querySelector('.decision-matrix-controls');
    const primaryResult = liveResults[0];
    if (
      firstControls &&
      primaryResult &&
      firstControls.compareDocumentPosition(primaryResult) & 4
    ) {
      primaryResult.classList.add('decision-matrix-live-summary');
      firstControls.before(primaryResult);
    }

    const manualProgressValues = new Map();
    const installProgressEditors = () => {
      matrix
        .querySelectorAll('.decision-matrix-result progress:not([data-manual-editor])')
        .forEach((progress, index) => {
          progress.dataset.manualEditor = 'true';
          const key = progress.id || progress.getAttribute('aria-label') || `score-${index}`;
          if (manualProgressValues.has(key)) progress.value = manualProgressValues.get(key);
          const container = document.createElement('div');
          container.className = 'decision-matrix-progress-control';
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'decision-matrix-progress-toggle';
          button.textContent =
            localized === 'es' ? 'Editar valor manualmente' : 'Edit value manually';
          button.setAttribute('aria-expanded', 'false');
          const editorId = `${matrixPrefix}-score-editor-${index + 1}`;
          button.setAttribute('aria-controls', editorId);
          const editor = document.createElement('div');
          editor.className = 'decision-matrix-progress-editor';
          editor.id = editorId;
          editor.hidden = true;
          const label = document.createElement('label');
          label.htmlFor = `${editorId}-value`;
          label.textContent = localized === 'es' ? 'Valor de la barra' : 'Bar value';
          const input = document.createElement('input');
          input.type = 'number';
          input.className = 'decision-matrix-input decision-matrix-progress-input';
          input.id = `${editorId}-value`;
          input.min = '0';
          input.max = String(progress.max);
          input.step = '0.01';
          input.value = String(progress.value);
          input.setAttribute(
            'aria-label',
            `${label.textContent}: ${progress.getAttribute('aria-label') || ''}`,
          );
          const value = document.createElement('output');
          value.htmlFor = input.id;
          value.textContent = `${Number(progress.value).toFixed(2)} / ${Number(progress.max).toFixed(0)}`;
          const note = document.createElement('p');
          note.className = 'decision-matrix-manual-note';
          note.textContent =
            localized === 'es'
              ? 'Este ajuste cambia solo la barra; al modificar los criterios se restaura el cálculo.'
              : 'This changes the bar only; changing criteria restores the calculated score.';
          editor.append(label, input, value, note);
          button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') !== 'true';
            button.setAttribute('aria-expanded', String(expanded));
            editor.hidden = !expanded;
            if (expanded) input.focus();
          });
          input.addEventListener('input', () => {
            if (!input.value || !input.validity.valid) return;
            progress.value = input.value;
            manualProgressValues.set(key, progress.value);
            value.textContent = `${Number(progress.value).toFixed(2)} / ${Number(progress.max).toFixed(0)}`;
          });
          const parent = progress.parentElement;
          if (parent?.tagName === 'P') {
            parent.after(container);
            progress.remove();
          } else {
            progress.replaceWith(container);
          }
          container.append(progress, button, editor);
        });
    };
    matrix.addEventListener('input', (event) => {
      if (event.target?.matches?.('input[type="range"], .decision-matrix-number-input')) {
        manualProgressValues.clear();
      }
    });
    installProgressEditors();
    new globalThis.MutationObserver(installProgressEditors).observe(matrix, {
      childList: true,
      subtree: true,
    });
  });

  new globalThis.MutationObserver((records) => {
    for (const record of records)
      for (const node of record.addedNodes)
        if (node instanceof globalThis.Element) {
          if (node.matches('button')) setPressedDefaults(node.parentElement ?? session);
          setPressedDefaults(node);
        }
  }).observe(session, { childList: true, subtree: true });

  const sourceFlashcards = session.querySelectorAll(
    'button[id$="-card-reveal"], button[id$="-card-flip"], button.flashcard-reveal',
  );
  sourceFlashcards.forEach((button) => {
    const targetId = button.id.endsWith('-reveal')
      ? `${button.id.slice(0, -7)}-answer`
      : button.id.endsWith('-flip')
        ? `${button.id.slice(0, -5)}-back`
        : '';
    const target = targetId
      ? document.getElementById(targetId)
      : button.closest('[data-widget-id="s7-flashcards"]')?.querySelector('.flashcard-answer');
    if (!target) return;

    const sync = () => button.setAttribute('aria-expanded', String(!target.hidden));
    sync();
    new globalThis.MutationObserver(sync).observe(target, {
      attributes: true,
      attributeFilter: ['hidden'],
    });
    button.addEventListener(
      'click',
      () => {
        const before = target.hidden;
        globalThis.queueMicrotask(() => {
          if (target.hidden === before) target.hidden = !before;
          sync();
        });
      },
      { capture: true },
    );
  });

  session.querySelectorAll('[data-widget="flashcards"]').forEach((deck) => {
    const front = deck.querySelector(
      '.flashcard-prompt, [id$="-card-front"], [id$="-card-question"]',
    );
    const reveal = deck.querySelector(
      '.flashcard-reveal, [id$="-card-flip"], [id$="-card-reveal"]',
    );
    const answer = deck.querySelector(
      '.flashcard-answer, [id$="-card-back"], [id$="-card-answer"]',
    );
    if (!front || !reveal || !answer) return;

    deck.classList.add('session-flashcards');
    const originalParent = front.parentElement;
    const face = document.createElement('div');
    face.className = 'session-flashcard-face';
    face.setAttribute('role', 'group');
    face.setAttribute(
      'aria-label',
      document.documentElement.lang === 'es' ? 'Tarjeta' : 'Flashcard',
    );
    const stage = document.createElement('div');
    stage.className = 'session-flashcard-stage';
    const inner = document.createElement('div');
    inner.className = 'session-flashcard-inner';
    const frontSide = document.createElement('div');
    frontSide.className = 'session-flashcard-side session-flashcard-front';
    const backSide = document.createElement('div');
    backSide.className = 'session-flashcard-side session-flashcard-back';
    const icon = document.createElement('span');
    icon.className = 'session-flashcard-icon';
    icon.setAttribute('aria-hidden', 'true');
    const answerIcon = icon.cloneNode(true);
    originalParent?.insertBefore(face, front);
    frontSide.append(icon, front);
    backSide.append(answerIcon, answer);
    inner.append(frontSide, backSide);
    stage.append(inner);
    face.append(stage, reveal);
    reveal.classList.add('session-flashcard-toggle');
    if (answer.id) reveal.setAttribute('aria-controls', answer.id);
    frontSide.setAttribute('aria-hidden', 'false');
    backSide.setAttribute('aria-hidden', String(answer.hidden));

    const iconForQuestion = () => {
      const question = (front.textContent ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      if (/arquitect|frontera|boundary/.test(question)) return '⌘';
      if (/dependencia|acoplamiento|dependency|coupling|relacion/.test(question)) return '🔗';
      if (/contrato|api|contract/.test(question)) return '📜';
      if (/calidad|quality|escenario|scenario/.test(question)) return '🎯';
      if (/seguridad|security|acceso|permission/.test(question)) return '🔒';
      if (/rendimiento|performance|latencia|velocidad/.test(question)) return '⚡';
      if (/evaluacion|evaluation|ia|inteligencia artificial|modelo/.test(question)) return '🤖';
      if (/plataforma|platform|componente|component/.test(question)) return '🧩';
      if (/sistema|system|ecosistema|ecosystem/.test(question)) return '🌐';
      return '💡';
    };
    const syncCard = () => {
      const expanded = !answer.hidden;
      face.classList.toggle('is-flipped', expanded);
      frontSide.setAttribute('aria-hidden', String(expanded));
      backSide.setAttribute('aria-hidden', String(!expanded));
      reveal.setAttribute('aria-expanded', String(expanded));
      reveal.textContent =
        document.documentElement.lang === 'es'
          ? expanded
            ? 'Ocultar respuesta'
            : 'Revelar respuesta'
          : expanded
            ? 'Hide answer'
            : 'Reveal answer';
      icon.textContent = iconForQuestion();
      answerIcon.textContent = icon.textContent;
    };
    syncCard();
    new globalThis.MutationObserver(syncCard).observe(answer, {
      attributes: true,
      attributeFilter: ['hidden'],
    });
    new globalThis.MutationObserver(syncCard).observe(front, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    face.addEventListener('click', (event) => {
      if (event.target instanceof globalThis.Element && event.target.closest('button')) return;
      reveal.click();
    });

    const previous = deck.querySelector('.flashcard-prev, [id$="-card-prev"]');
    const next = deck.querySelector('.flashcard-next, [id$="-card-next"]');
    if (previous && next) {
      deck.classList.add('has-flashcard-navigation');
      const counter = deck.querySelector(
        '.flashcard-count, [id$="-card-count"], [id$="-card-counter"]',
      );
      counter?.classList.add('session-flashcard-count');
      const originalRow = previous.closest('p');
      const controls = document.createElement('div');
      controls.className = 'session-flashcard-controls';
      face.before(controls);
      controls.append(previous);
      if (counter) controls.append(counter);
      controls.append(next);
      [previous, next].forEach((button, index) => {
        button.setAttribute(
          'aria-label',
          document.documentElement.lang === 'es'
            ? index === 0
              ? 'Tarjeta anterior'
              : 'Tarjeta siguiente'
            : index === 0
              ? 'Previous flashcard'
              : 'Next flashcard',
        );
        const label = document.createElement('span');
        label.className = 'sr-only';
        label.textContent = button.textContent.trim();
        button.replaceChildren(label);
        button.dataset.direction = index === 0 ? 'previous' : 'next';
      });
      if (originalRow && !originalRow.textContent.trim() && !originalRow.children.length)
        originalRow.remove();
    }
  });

  session.querySelectorAll('[data-learning-studio]').forEach((studio) => {
    const controls = [...studio.querySelectorAll('[data-mode-control]')];
    const panels = [...studio.querySelectorAll('[data-visual-panel]')];
    if (!controls.length || controls.length !== panels.length) return;
    studio.dataset.enhanced = 'true';
    studio.querySelector('[data-mode-nav]')?.setAttribute('role', 'tablist');

    const select = (selected, moveFocus) => {
      controls.forEach((control, index) => {
        const active = index === selected;
        control.setAttribute('role', 'tab');
        control.setAttribute('aria-selected', String(active));
        control.setAttribute('tabindex', active ? '0' : '-1');
        control.setAttribute('aria-controls', panels[index].id);
        control.classList.toggle('is-active', active);
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', control.id);
        panels[index].hidden = !active;
      });
      if (moveFocus) controls[selected].focus();
    };

    controls.forEach((control, index) => {
      control.addEventListener('click', (event) => {
        event.preventDefault();
        select(index, false);
      });
      control.addEventListener('keydown', (event) => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % controls.length;
        else if (event.key === 'ArrowLeft') next = (index + controls.length - 1) % controls.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = controls.length - 1;
        else return;
        event.preventDefault();
        select(next, true);
      });
    });
    select(0, false);
  });

  const visualStudioWidgets = new Map();
  session.querySelectorAll('[data-studio-scope]').forEach((element) => {
    const scope = element.dataset.studioScope;
    if (!scope) return;
    if (element.matches('[data-widget]')) {
      if (!visualStudioWidgets.has(scope)) visualStudioWidgets.set(scope, []);
      visualStudioWidgets.get(scope).push(element);
      return;
    }
    const widgets = [...element.children].filter((child) => child.matches('[data-widget]'));
    if (widgets.length > 1) visualStudioWidgets.set(scope, widgets);
  });

  let visualStudioSequence = 0;
  visualStudioWidgets.forEach((widgets, scope) => {
    if (widgets.length < 2) return;
    const first = widgets[0];
    const studio = first.matches('[data-studio-scope]')
      ? document.createElement('div')
      : first.parentElement;
    if (!studio) return;

    if (studio !== first.parentElement) {
      studio.className = 'visual-learning-studio visual-learning-studio-tabs';
      studio.dataset.studioScope = scope;
      first.before(studio);
      widgets.forEach((widget) => studio.append(widget));
    } else {
      studio.classList.add('visual-learning-studio', 'visual-learning-studio-tabs');
    }

    const groupId = `visual-studio-${++visualStudioSequence}`;
    const tablist = document.createElement('div');
    tablist.className = 'visual-learning-studio-tablist';
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute(
      'aria-label',
      document.documentElement.lang.startsWith('en')
        ? 'Visual learning resources'
        : 'Recursos de aprendizaje visual',
    );

    const tabs = widgets.map((widget, index) => {
      const heading = widget.querySelector(':scope > :is(h3, h4, h5, h6)');
      const english = document.documentElement.lang.startsWith('en');
      const labels = english
        ? {
            'mind-map': 'Mind map',
            flashcards: 'Flashcards',
            simulator: 'Simulator',
            'architecture-explorer': 'Explorer',
            'decision-matrix': 'Decision matrix',
          }
        : {
            'mind-map': 'Mapa mental',
            flashcards: 'Flashcards',
            simulator: 'Simulador',
            'architecture-explorer': 'Explorador',
            'decision-matrix': 'Matriz',
          };
      const headingPrefix = heading?.textContent.trim().split(':', 1)[0] ?? '';
      const shortHeading = headingPrefix
        .replace(/^\s*\d+[.)]?\s*/, '')
        .split(/\s+/)
        .slice(0, 2)
        .join(' ');
      const label =
        labels[widget.dataset.widget] ??
        (shortHeading || (english ? `Resource ${index + 1}` : `Recurso ${index + 1}`));
      const tab = document.createElement('button');
      const tabId = `${groupId}-tab-${index + 1}`;
      const panelId = widget.id || `${groupId}-panel-${index + 1}`;
      widget.id = panelId;
      tab.type = 'button';
      tab.className = 'visual-learning-studio-tab';
      tab.id = tabId;
      tab.textContent = label;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panelId);
      tab.setAttribute('aria-selected', String(index === 0));
      tab.tabIndex = index === 0 ? 0 : -1;
      widget.setAttribute('role', 'tabpanel');
      widget.setAttribute('aria-labelledby', tabId);
      widget.tabIndex = 0;
      widget.hidden = index !== 0;
      tablist.append(tab);
      return tab;
    });
    widgets[0].before(tablist);

    const selectTab = (selected, moveFocus = false) => {
      tabs.forEach((tab, index) => {
        const active = index === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        widgets[index].hidden = !active;
      });
      if (moveFocus) tabs[selected].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(index));
    });
    tablist.addEventListener('keydown', (event) => {
      const current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(next, true);
    });
  });

  const areaTabLabels = document.documentElement.lang.startsWith('en')
    ? {
        staff: { full: 'Staff → Principal', short: 'Staff' },
        frontend: { full: 'Frontend Platform Engineer (FPA)', short: 'FPA' },
        ai: { full: 'AI Product Engineer (AIPE)', short: 'AIPE' },
      }
    : {
        staff: { full: 'Staff → Principal', short: 'Staff' },
        frontend: { full: 'Arquitectura de Plataforma Frontend (FPA)', short: 'FPA' },
        ai: { full: 'Ingeniería de Producto con IA (AIPE)', short: 'AIPE' },
      };
  const appendAreaTab = (tablist, panel, area, idPrefix) => {
    const tab = document.createElement('button');
    const fullLabel = document.createElement('span');
    const shortLabel = document.createElement('span');
    const tabId = `${idPrefix}-${area}-tab`;
    const panelId = `${idPrefix}-${area}-panel`;
    tab.type = 'button';
    tab.className = 'professional-area-tab';
    tab.id = tabId;
    tab.setAttribute('aria-label', areaTabLabels[area].full);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('aria-selected', 'false');
    tab.tabIndex = -1;
    fullLabel.className = 'professional-area-tab-full';
    fullLabel.textContent = areaTabLabels[area].full;
    shortLabel.className = 'professional-area-tab-short';
    shortLabel.textContent = areaTabLabels[area].short;
    tab.append(fullLabel, shortLabel);
    panel.className = 'professional-area-panel';
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.tabIndex = 0;
    tablist.append(tab);
  };
  const makeProfessionalAreaGroup = (entries, anchor, idPrefix) => {
    const group = document.createElement('div');
    const tablist = document.createElement('nav');
    const panels = new Map();
    group.className = 'professional-area-tabs';
    group.dataset.professionalAreaTabs = '';
    tablist.className = 'professional-area-tablist';
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute(
      'aria-label',
      document.documentElement.lang.startsWith('en') ? 'Professional areas' : 'Áreas profesionales',
    );
    tablist.hidden = true;
    for (const area of ['staff', 'frontend', 'ai']) {
      const panel = document.createElement('section');
      appendAreaTab(tablist, panel, area, idPrefix);
      panels.set(area, panel);
    }
    anchor.before(group);
    group.append(tablist);
    entries.forEach(({ area, nodes }) => {
      const panel = panels.get(area);
      group.append(panel);
      panel.append(...nodes);
    });
  };

  const paragraphArea = (paragraph) => {
    const lead = paragraph.querySelector(':scope > strong:first-child')?.textContent ?? '';
    const normalized = lead
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    if (/^staff\s*(→|->)\s*principal\s*:/.test(normalized)) return 'staff';
    if (/^(fpa|plataforma frontend)\s*:/.test(normalized)) return 'frontend';
    if (/^(aipe|producto con ia)\s*:/.test(normalized)) return 'ai';
    return null;
  };
  const groupedParagraphs = new Set();
  let areaGroupNumber = 0;
  for (const paragraph of session.querySelectorAll('.session-source p')) {
    if (groupedParagraphs.has(paragraph) || paragraphArea(paragraph) !== 'staff') continue;
    const next = paragraph.nextElementSibling;
    const last = next?.nextElementSibling;
    if (
      !next?.matches('p') ||
      !last?.matches('p') ||
      paragraphArea(next) !== 'frontend' ||
      paragraphArea(last) !== 'ai'
    )
      continue;
    const entries = [paragraph, next, last].map((node) => ({
      area: paragraphArea(node),
      nodes: [node],
    }));
    makeProfessionalAreaGroup(entries, paragraph, `professional-area-copy-${++areaGroupNumber}`);
    entries.forEach(({ nodes }) => nodes.forEach((node) => groupedParagraphs.add(node)));
  }

  const areaTypeFromHeading = (heading) => {
    const title = heading.textContent
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    if (/staff.*principal/.test(title)) return 'staff';
    if (/frontend|plataforma.*frontend/.test(title)) return 'frontend';
    if (/producto.*ia|ai product|product engineering/.test(title)) return 'ai';
    return null;
  };
  const areaConceptHeadings = [
    ...session.querySelectorAll('.session-source h3, .session-source h4, .session-source h5'),
  ];
  let areaConceptGroupNumber = 0;
  for (const firstAreaHeading of areaConceptHeadings) {
    if (firstAreaHeading.closest('[data-professional-area-tabs]')) continue;
    if (
      areaTypeFromHeading(firstAreaHeading) !== 'staff' ||
      !firstAreaHeading.nextElementSibling?.matches('dl')
    )
      continue;
    const areaEntries = [
      {
        area: 'staff',
        heading: firstAreaHeading,
        definitionList: firstAreaHeading.nextElementSibling,
      },
    ];
    let next = areaEntries[0].definitionList.nextElementSibling;
    for (const area of ['frontend', 'ai']) {
      if (
        !next?.matches(firstAreaHeading.tagName.toLowerCase()) ||
        areaTypeFromHeading(next) !== area ||
        !next.nextElementSibling?.matches('dl')
      )
        break;
      areaEntries.push({ area, heading: next, definitionList: next.nextElementSibling });
      next = next.nextElementSibling.nextElementSibling;
    }
    if (areaEntries.length !== 3) continue;

    const group = document.createElement('div');
    const tablist = document.createElement('nav');
    group.className = 'professional-area-tabs';
    group.dataset.professionalAreaTabs = '';
    tablist.className = 'professional-area-tablist';
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute(
      'aria-label',
      document.documentElement.lang.startsWith('en') ? 'Professional areas' : 'Áreas profesionales',
    );
    tablist.hidden = true;
    const panels = new Map();
    for (const area of ['staff', 'frontend', 'ai']) {
      const panel = document.createElement('section');
      appendAreaTab(tablist, panel, area, `professional-area-concepts-${++areaConceptGroupNumber}`);
      panels.set(area, panel);
    }
    firstAreaHeading.before(group);
    group.append(tablist);
    for (const { area, heading, definitionList } of areaEntries) {
      const panel = panels.get(area);
      group.append(panel);
      panel.append(heading, definitionList);
    }
  }

  session.querySelectorAll('[data-professional-area-tabs]').forEach((group) => {
    const tablist = group.querySelector('[role="tablist"]');
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) =>
      document.getElementById(tab.getAttribute('aria-controls') ?? ''),
    );
    if (!tablist || tabs.length !== 3 || panels.some((panel) => !panel)) return;

    group.dataset.enhanced = 'true';
    tablist.hidden = false;
    const activate = (selected, moveFocus = false) => {
      tabs.forEach((tab, index) => {
        const active = index === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        panels[index].hidden = !active;
      });
      if (moveFocus) tabs[selected].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(index));
    });
    tablist.addEventListener('keydown', (event) => {
      const current = tabs.indexOf(document.activeElement);
      if (current < 0) return;
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(next, true);
    });
    activate(0);
  });

  session.querySelectorAll('[data-flashcards]').forEach((deck) => {
    const cards = [...deck.querySelectorAll('[data-flashcard]')];
    const counter = deck.querySelector('[data-flashcard-count]');
    if (!cards.length) return;
    let active = 0;
    deck.dataset.enhanced = 'true';

    const flip = (card, expanded) => {
      const button = card.querySelector('[data-flash-flip]');
      card.classList.toggle('is-flipped', expanded);
      button?.setAttribute('aria-pressed', String(expanded));
      button?.setAttribute('aria-expanded', String(expanded));
      if (button)
        button.setAttribute(
          'aria-label',
          expanded ? button.dataset.hideLabel : button.dataset.revealLabel,
        );
    };
    const show = (index) => {
      active = (index + cards.length) % cards.length;
      cards.forEach((card, position) => {
        card.hidden = position !== active;
        flip(card, false);
      });
      if (counter) counter.textContent = `${active + 1} / ${cards.length}`;
    };

    deck.querySelectorAll('[data-flash-flip]').forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', () => {
        const card = button.closest('[data-flashcard]');
        if (card) flip(card, !card.classList.contains('is-flipped'));
      });
    });
    deck.querySelector('[data-flash-prev]')?.addEventListener('click', () => show(active - 1));
    deck.querySelector('[data-flash-next]')?.addEventListener('click', () => show(active + 1));
    deck.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        show(active - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        show(active + 1);
      }
    });
    show(0);
  });

  const studioData = document.getElementById('studio-data');
  if (studioData) {
    const scopes = JSON.parse(studioData.textContent ?? '{}');
    const english = document.documentElement.lang === 'en';
    const uiText = english
      ? {
          example: 'Example',
          relation: 'Relationship',
          sharedArea: 'highlighted concepts share this area.',
          question: 'What decision or mechanism explains',
          hide: 'Hide answer',
          reveal: 'Show answer',
          consumer: 'consumer',
          consumers: 'consumers',
          knownConsumers: 'known consumer(s)',
          publicContract:
            'check the public contract and relevant tests; unregistered consumers may still exist even when n=0.',
          migration:
            'require migration or temporary compatibility. Review deployments before retiring the contract.',
          hiddenDependency: 'there is a hidden dependency: the graph of',
          graphIncomplete:
            'known consumer(s) is incomplete. Search for dynamic uses and broaden validation; actual impact is undetermined.',
          incoming: 'Incoming from',
          noConsumers: 'no consumers in this diagram',
          outgoing: 'Outgoing dependencies to',
          noOutgoing: 'no declared outgoing dependency',
          contract:
            'Contract: verify direction and public entry points; highlighted relationships are direct neighbors. Hypothetical diagram.',
          hypotheticalScores: 'Hypothetical scores (coordination, autonomy, boundaries): ',
          adjust: '. Adjust criteria and compare them with real evidence.',
          allZero:
            'All weights are zero: average and ranking are undefined. Set at least one criterion.',
          tied: 'The current weights produce a tie. Review constraints or evidence before deciding.',
          first: 'First choice under these hypothetical scores: ',
          difference: '. Difference: ',
          noProductionEvidence: '; this is not production evidence.',
          editValue: 'Edit value manually',
          visualOnly: 'Visual-only override; calculated ranking is unchanged.',
          displayedValue: 'Displayed bar value',
        }
      : {
          example: 'Ejemplo',
          relation: 'Relación',
          sharedArea: 'conceptos resaltados comparten ámbito.',
          question: '¿Qué decisión o mecanismo explica',
          hide: 'Ocultar respuesta',
          reveal: 'Mostrar respuesta',
          consumer: 'consumidor',
          consumers: 'consumidores',
          knownConsumers: 'consumidor(es) conocidos',
          publicContract:
            'comprobar contrato público y tests pertinentes; si n=0 aún puede haber consumidores no registrados.',
          migration:
            'requieren migración o compatibilidad temporal. Revisar despliegues antes de retirar el contrato.',
          hiddenDependency: 'hay una dependencia oculta: el grafo de',
          graphIncomplete:
            'consumidor(es) conocidos está incompleto. Buscar usos dinámicos y ampliar validación; impacto real indeterminado.',
          incoming: 'Entradas desde',
          noConsumers: 'sin consumidor en este esquema',
          outgoing: 'Salidas/dependencias hacia',
          noOutgoing: 'sin salida declarada',
          contract:
            'Contrato: verificar dirección y entradas públicas; relaciones resaltadas son vecinas directas. Esquema hipotético.',
          hypotheticalScores: 'Puntuaciones hipotéticas (coordinación, autonomía, límites): ',
          adjust: '. Ajusta criterios y contrasta con evidencia real.',
          allZero:
            'Todos los pesos son cero: promedio y ranking indefinidos. Define al menos un criterio.',
          tied: 'Empate con pesos actuales. Revisar restricciones o evidencia antes de decidir.',
          first: 'Primera opción bajo estas puntuaciones hipotéticas: ',
          difference: '. Diferencia ',
          noProductionEvidence: '; no es evidencia de producción.',
          editValue: 'Editar valor manualmente',
          visualOnly: 'Ajuste solo visual; la clasificación calculada no cambia.',
          displayedValue: 'Valor visual de la barra',
        };
    const setPressed = (buttons, selected, related = []) => {
      buttons.forEach((button, index) => {
        const active = index === selected;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('related', related.includes(index) && !active);
      });
    };

    for (const widget of document.querySelectorAll('[data-widget]')) {
      const data = scopes[widget.dataset.studioScope];
      if (!data) continue;
      const mode = widget.dataset.widget;
      if (mode === 'mind-map') {
        const buttons = [...widget.querySelectorAll('.node')];
        const panel = widget.querySelector('.panel');
        buttons.forEach((button, index) =>
          button.addEventListener('click', () => {
            const item = data.terms[index];
            setPressed(
              buttons,
              index,
              data.terms
                .map((_, relatedIndex) => relatedIndex)
                .filter(
                  (relatedIndex) =>
                    relatedIndex !== index && data.terms[relatedIndex].area === item.area,
                ),
            );
            panel.textContent = `${item.term}: ${item.definition}. ${uiText.example}: ${item.example}. ${uiText.relation}: ${item.area}; ${uiText.sharedArea}`;
          }),
        );
      }
      if (mode === 'flashcards') {
        let index = 0;
        let shown = false;
        const question = widget.querySelector('.question');
        const answer = widget.querySelector('.answer');
        const count = widget.querySelector('.counter');
        const flip = widget.querySelector('.flip');
        const previous = widget.querySelector('.prev');
        const next = widget.querySelector('.next');
        const render = () => {
          const item = data.terms[index];
          question.textContent = `${uiText.question} ${item.term}?`;
          answer.textContent = `${item.definition}. ${uiText.example}: ${item.example}.`;
          answer.hidden = !shown;
          count.textContent = `${index + 1} / ${data.terms.length}`;
          previous.disabled = index === 0;
          next.disabled = index === data.terms.length - 1;
          flip.textContent = shown ? uiText.hide : uiText.reveal;
          flip.setAttribute('aria-expanded', String(shown));
        };
        previous.addEventListener('click', () => {
          if (index > 0) {
            index -= 1;
            shown = false;
            render();
          }
        });
        next.addEventListener('click', () => {
          if (index < data.terms.length - 1) {
            index += 1;
            shown = false;
            render();
          }
        });
        flip.addEventListener('click', () => {
          shown = !shown;
          render();
        });
        render();
      }
      if (mode === 'simulator') {
        const range = widget.querySelector('.count');
        const scenario = widget.querySelector('.scenario');
        const result = widget.querySelector('.result');
        const target = widget.querySelector('.sim-target');
        const value = widget.querySelector('.count-value');
        const render = () => {
          const count = Number(range.value);
          const kind = scenario.value;
          value.textContent = String(count);
          target.textContent = `${count} ${count === 1 ? uiText.consumer : uiText.consumers}`;
          target.style.borderColor = kind === 'compatible' ? 'var(--line)' : 'var(--accent)';
          const label = data.scenario;
          result.textContent =
            kind === 'compatible'
              ? `${label}: ${count} ${uiText.knownConsumers}: ${uiText.publicContract}`
              : kind === 'incompatible'
                ? `${label}: ${count} ${uiText.knownConsumers} ${uiText.migration}`
                : `${label}: ${uiText.hiddenDependency} ${count} ${uiText.graphIncomplete}`;
        };
        range.addEventListener('input', render);
        scenario.addEventListener('change', render);
        render();
      }
      if (mode === 'architecture-explorer') {
        const buttons = [...widget.querySelectorAll('.arch-node')];
        const panel = widget.querySelector('.panel');
        buttons.forEach((button, index) =>
          button.addEventListener('click', () => {
            const name = data.nodes[index];
            const related = data.edges.filter((pair) => pair.includes(name));
            const indices = related
              .flat()
              .filter((item) => item !== name)
              .map((item) => data.nodes.indexOf(item));
            setPressed(buttons, index, indices);
            const outgoing = related.filter((pair) => pair[0] === name).map((pair) => pair[1]);
            const incoming = related.filter((pair) => pair[1] === name).map((pair) => pair[0]);
            panel.textContent = `${name}. ${uiText.incoming}: ${incoming.join(', ') || uiText.noConsumers}. ${uiText.outgoing}: ${outgoing.join(', ') || uiText.noOutgoing}. ${uiText.contract}`;
          }),
        );
      }
      if (mode === 'decision-matrix') {
        const inputs = [...widget.querySelectorAll('[data-weight]')];
        const bars = widget.querySelector('.bars');
        const result = widget.querySelector('.result');
        const options = data.matrix.options;
        const labels = widget.querySelectorAll('.weights label');
        labels.forEach((label, index) => {
          label.firstChild.nodeValue = `${data.matrix.criteria[index]} `;
        });
        const note = [...widget.querySelectorAll('p')].find((p) =>
          /Hipótesis de puntuación|Hypothetical scoring/.test(p.textContent),
        );
        if (note)
          note.textContent = `${uiText.hypotheticalScores}${options.map((option) => `${option.name} (${Object.values(option.s).join(', ')})`).join('; ')}${uiText.adjust}`;
        const render = () => {
          const weights = Object.fromEntries(
            inputs.map((input) => [input.dataset.weight, Number(input.value)]),
          );
          inputs.forEach((input) => {
            input.nextElementSibling.textContent = input.value;
          });
          const sum = Object.values(weights).reduce((total, weight) => total + weight, 0);
          bars.replaceChildren();
          if (sum === 0) {
            result.textContent = uiText.allZero;
            return;
          }
          const scored = options
            .map((option) => ({
              name: option.name,
              score:
                Object.keys(weights).reduce(
                  (total, key) => total + weights[key] * option.s[key],
                  0,
                ) / sum,
            }))
            .sort((first, second) => second.score - first.score);
          scored.forEach((option) => {
            const row = document.createElement('div');
            const label = document.createElement('p');
            const progress = document.createElement('progress');
            const controls = document.createElement('div');
            const toggle = document.createElement('button');
            const editor = document.createElement('input');
            const note = document.createElement('p');
            row.className = 'decision-matrix-progress-control';
            label.textContent = `${option.name} ${option.score.toFixed(2)} / 5`;
            progress.max = 5;
            progress.value = option.score;
            progress.setAttribute('aria-label', `${option.name}: ${option.score.toFixed(2)} / 5`);
            toggle.type = 'button';
            toggle.className = 'decision-matrix-progress-toggle';
            toggle.textContent = uiText.editValue;
            toggle.setAttribute('aria-expanded', 'false');
            editor.type = 'number';
            editor.min = '0';
            editor.max = '5';
            editor.step = '0.01';
            editor.value = option.score.toFixed(2);
            editor.hidden = true;
            editor.setAttribute('aria-label', `${uiText.displayedValue}: ${option.name}`);
            note.className = 'decision-matrix-manual-note';
            note.textContent = uiText.visualOnly;
            note.hidden = true;
            toggle.addEventListener('click', () => {
              editor.hidden = !editor.hidden;
              note.hidden = editor.hidden;
              toggle.setAttribute('aria-expanded', String(!editor.hidden));
              if (!editor.hidden) editor.focus();
            });
            editor.addEventListener('input', () => {
              const manual = Math.min(5, Math.max(0, Number(editor.value) || 0));
              progress.value = manual;
              progress.setAttribute(
                'aria-valuetext',
                `${manual.toFixed(2)} / 5. ${uiText.visualOnly}`,
              );
            });
            controls.append(toggle, editor, note);
            row.append(label, progress, controls);
            bars.append(row);
          });
          const tied = Math.abs(scored[0].score - scored[1].score) < 1e-9;
          result.textContent = tied
            ? uiText.tied
            : `${uiText.first}${scored[0].name}${uiText.difference}${(scored[0].score - scored[1].score).toFixed(2)}${uiText.noProductionEvidence}`;
        };
        inputs.forEach((input) => input.addEventListener('input', render));
        render();
      }
    }
  }
})();
