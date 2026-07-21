/**
 * ui.js
 * Sistema de UI: paneles flotantes, interacción por mirada,
 * overlay HTML, cursor VR, y gestión de información.
 */

/* ================================================================
   ESTADO GLOBAL DE UI
   ================================================================ */
var UI_STATE = {
  activePanel: null,
  activePlanet: null,
  paintingVisible: false,
  paintingPlanet: null,
  floatingPanel: null
};


/* ================================================================
   INICIALIZAR UI
   ================================================================ */
function initUI() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(initUI, 200); return; }

  createFloatingPanelContainer(scene);
  setupKeyboardControls();
  setupResizeHandler();

  // Exponer funciones globales para los componentes
  window.showPlanetInfo = showPlanetInfo;
  window.showPaintingInfo = showPaintingInfo;
  window.hidePlanetInfo = hidePlanetInfo;
}


/* ================================================================
   CONTENEDOR DE PANELES FLOTANTES (en 3D)
   ================================================================ */
function createFloatingPanelContainer(scene) {
  var container = document.getElementById('ui-panels');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'ui-panels';
    scene.appendChild(container);
  }
}


/* ================================================================
   MOSTRAR PANEL FLOTANTE DE PLANETA (al mirar fijamente)
   ================================================================ */
function showPlanetInfo(planetId) {
  var data = planetId === 'sun' ? getSunData() : (window.PLANET_DATA ? window.PLANET_DATA[planetId] : null);
  if (!data) return;

  var scene = document.querySelector('a-scene');
  var container = document.getElementById('ui-panels');

  // Eliminar panel anterior
  hidePlanetInfo();

  // Encontrar la posición del planeta en el mundo
  var planetEl = findPlanetInScene(planetId);
  var worldPos = new THREE.Vector3(0, 3, -5);
  if (planetEl) {
    worldPos.setFromMatrixPosition(planetEl.object3D.matrixWorld);
    // Desplazar el panel hacia arriba y hacia la cámara
    var camEl = document.querySelector('[camera]');
    if (camEl) {
      var camPos = camEl.object3D.getWorldPosition(new THREE.Vector3());
      var dirToCamera = camPos.clone().sub(worldPos).normalize();
      worldPos.y += data.size ? data.size * 1.5 : 6;
      worldPos.add(dirToCamera.multiplyScalar(1.0));
    } else {
      worldPos.y += data.size ? data.size * 1.5 : 6;
    }
  }

  // Panel de fondo
  var panelW = 2.4;
  var panelH = 3.2;

  var panel = document.createElement('a-entity');
  panel.id = 'floating-panel';
  panel.setAttribute('position', worldPos.x + ' ' + worldPos.y + ' ' + worldPos.z);

  // Orienta el panel hacia la cámara (billboard)
  panel.setAttribute('look-at', '[camera]');

  // Fondo del panel
  var bg = document.createElement('a-plane');
  bg.setAttribute('width', panelW.toString());
  bg.setAttribute('height', panelH.toString());
  bg.setAttribute('material', 'shader: standard; color: #0A0A2E; roughness: 0.5; metalness: 0.2; opacity: 0.88; transparent: true; emissive: #112244; emissiveIntensity: 0.3');
  panel.appendChild(bg);

  // Borde
  var border = document.createElement('a-plane');
  border.setAttribute('width', (panelW + 0.1).toString());
  border.setAttribute('height', (panelH + 0.1).toString());
  border.setAttribute('position', '0 0 -0.01');
  border.setAttribute('material', 'shader: flat; color: #3355AA; opacity: 0.7; transparent: true; depthTest: false');
  panel.appendChild(border);

  // Texto del panel (canvas)
  var textCanvas = createInfoPanelCanvas(data, planetId);
  var textImg = document.createElement('img');
  textImg.id = 'tex-floating-panel';
  textImg.src = textCanvas.toDataURL();
  var assets = document.getElementById('assets');
  if (assets) {
    var old = document.getElementById('tex-floating-panel');
    if (old) old.remove();
    assets.appendChild(textImg);
  }

  var textPlane = document.createElement('a-plane');
  textPlane.setAttribute('width', (panelW - 0.2).toString());
  textPlane.setAttribute('height', (panelH - 0.2).toString());
  textPlane.setAttribute('position', '0 0 0.005');
  textPlane.setAttribute('material', 'shader: standard; src: #tex-floating-panel; roughness: 0.5; metalness: 0; depthTest: false');
  panel.appendChild(textPlane);

  container.appendChild(panel);
  UI_STATE.floatingPanel = panel;
  UI_STATE.activePlanet = planetId;

  // Auto-ocultar después de 45 segundos
  clearTimeout(UI_STATE._hideTimeout);
  UI_STATE._hideTimeout = setTimeout(function () {
    hidePlanetInfo();
  }, 45000);
}


/* ================================================================
   CREAR CANVAS DEL PANEL DE INFO
   ================================================================ */
function createInfoPanelCanvas(data, planetId) {
  var canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 700;
  var ctx = canvas.getContext('2d');

  // Fondo
  ctx.fillStyle = '#0A0A2E';
  ctx.fillRect(0, 0, 512, 700);

  // Cabecera con degradado
  var headerGrad = ctx.createLinearGradient(0, 0, 0, 60);
  headerGrad.addColorStop(0, '#113366');
  headerGrad.addColorStop(1, '#0A0A2E');
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, 0, 512, 60);

  // Nombre
  ctx.fillStyle = '#E0F0FF';
  ctx.font = 'bold 30px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.name.toUpperCase(), 256, 42);

  // Línea
  ctx.strokeStyle = '#4488CC';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, 55);
  ctx.lineTo(432, 55);
  ctx.stroke();

  // Textura del planeta (miniatura)
  if (planetId !== 'sun' && window.TextureGen) {
    var tex = window.TextureGen.get(planetId);
    if (tex) {
      var tx = 256, ty = 115, tr = 55;
      ctx.save();
      ctx.beginPath();
      ctx.arc(tx, ty, tr, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(tex, tx - tr, ty - tr, tr * 2, tr * 2);
      ctx.restore();
      ctx.strokeStyle = '#4488CC';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(tx, ty, tr + 1, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Info del Sol
  if (planetId === 'sun') {
    var sunTex = window.TextureGen ? window.TextureGen.get('sun') : null;
    if (sunTex) {
      var stx = 256, sty = 115, str = 55;
      ctx.save();
      ctx.beginPath();
      ctx.arc(stx, sty, str, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(sunTex, stx - str, sty - str, str * 2, str * 2);
      ctx.restore();
      ctx.strokeStyle = '#FF8800';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(stx, sty, str + 1, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Datos
  var yStart = 195;
  var lineH = 32;
  var items = getDataItems(data, planetId);

  items.forEach(function (item, idx) {
    var y = yStart + idx * lineH;
    ctx.fillStyle = '#7799CC';
    ctx.font = '15px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(item.label, 250, y);
    ctx.fillStyle = '#D0E0FF';
    ctx.textAlign = 'left';
    ctx.fillText(item.value, 260, y);
  });

  // Curiosidad
  var curY = yStart + items.length * lineH + 20;
  ctx.fillStyle = 'rgba(30, 60, 120, 0.2)';
  ctx.fillRect(30, curY - 10, 452, 130);
  ctx.fillStyle = '#99AACC';
  ctx.font = 'italic 14px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'left';

  var curiosityText = data.info ? data.info.curiosity : data.curiosity;
  if (curiosityText) {
    var words = curiosityText.split(' ');
    var lines = [];
    var currentLine = '';
    words.forEach(function (word) {
      var test = currentLine + (currentLine ? ' ' : '') + word;
      if (ctx.measureText(test).width < 430) {
        currentLine = test;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);

    lines.forEach(function (line, idx) {
      ctx.fillText(line, 50, curY + idx * 22);
    });
  }

  // Botón de cierre
  var closeY = curY + 130;
  ctx.fillStyle = '#224488';
  ctx.fillRect(180, closeY, 152, 32);
  ctx.fillStyle = '#D0E0FF';
  ctx.font = '14px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MIRA OTRO LADO PARA CERRAR', 256, closeY + 22);

  return canvas;
}

function getDataItems(data, planetId) {
  if (planetId === 'sun') {
    return [
      { label: 'Tipo:', value: 'Estrella tipo G2V' },
      { label: 'Radio:', value: '696,340 km' },
      { label: 'Masa:', value: '1.989 &times; 10<sup>30</sup> kg' },
      { label: 'Temperatura:', value: '5,500&deg;C (superficie)' },
      { label: 'Edad:', value: '~4,600 millones de a&ntilde;os' },
      { label: 'Composici&oacute;n:', value: 'Hidr&oacute;geno (74%), Helio (24%)' },
      { label: 'Luminosidad:', value: '3.828 &times; 10<sup>26</sup> W' }
    ];
  }
  var info = data.info;
  return [
    { label: 'Distancia al Sol:', value: info.distance },
    { label: 'Radio:', value: info.radius },
    { label: 'Masa:', value: info.mass },
    { label: 'Gravedad:', value: info.gravity },
    { label: 'Temperatura:', value: info.temperature },
    { label: 'Duraci&oacute;n del d&iacute;a:', value: info.day },
    { label: 'Duraci&oacute;n del a&ntilde;o:', value: info.year },
    { label: 'Sat&eacute;lites:', value: info.satellites }
  ];
}

function getSunData() {
  return {
    name: 'Sol',
    nameEn: 'Sun',
    type: 'star',
    size: 4.5,
    info: {
      curiosity: 'El Sol contiene el 99.86% de toda la masa del sistema solar. En su n&uacute;cleo, la temperatura alcanza los 15 millones de grados Celsius y fusiona 600 millones de toneladas de hidr&oacute;geno por segundo.'
    }
  };
}


/* ================================================================
   OCULTAR PANEL FLOTANTE
   ================================================================ */
function hidePlanetInfo() {
  if (UI_STATE.floatingPanel) {
    if (UI_STATE.floatingPanel.parentNode) {
      UI_STATE.floatingPanel.parentNode.removeChild(UI_STATE.floatingPanel);
    }
    UI_STATE.floatingPanel = null;
  }
  UI_STATE.activePlanet = null;
  clearTimeout(UI_STATE._hideTimeout);

  // Limpiar textura del panel
  var oldTex = document.getElementById('tex-floating-panel');
  if (oldTex && oldTex.parentNode) {
    oldTex.parentNode.removeChild(oldTex);
  }
}


/* ================================================================
   MOSTRAR / OCULTAR INFO DE CUADRO (OVERLAY HTML)
   ================================================================ */
function showPaintingInfo(planetId, show) {
  var overlay = document.getElementById('painting-overlay');
  if (!overlay) return;

  if (show && planetId) {
    var data = window.PLANET_DATA ? window.PLANET_DATA[planetId] : null;
    if (!data) return;

    var content = document.getElementById('painting-content');
    if (!content) return;

    var info = data.info;
    content.innerHTML =
      '<h3>' + data.name + '</h3>' +
      '<div class="po-row"><span class="po-label">Distancia al Sol:</span><span class="po-value">' + info.distance + '</span></div>' +
      '<div class="po-row"><span class="po-label">Radio:</span><span class="po-value">' + info.radius + '</span></div>' +
      '<div class="po-row"><span class="po-label">Masa:</span><span class="po-value">' + info.mass + '</span></div>' +
      '<div class="po-row"><span class="po-label">Gravedad:</span><span class="po-value">' + info.gravity + '</span></div>' +
      '<div class="po-row"><span class="po-label">Temperatura:</span><span class="po-value">' + info.temperature + '</span></div>' +
      '<div class="po-row"><span class="po-label">D&iacute;a:</span><span class="po-value">' + info.day + '</span></div>' +
      '<div class="po-row"><span class="po-label">A&ntilde;o:</span><span class="po-value">' + info.year + '</span></div>' +
      '<div class="po-row"><span class="po-label">Sat&eacute;lites:</span><span class="po-value">' + info.satellites + '</span></div>' +
      '<div class="po-curiosity">' + info.curiosity + '</div>';

    overlay.classList.remove('hidden');
    overlay.classList.add('visible');
    UI_STATE.paintingVisible = true;
    UI_STATE.paintingPlanet = planetId;
  } else {
    overlay.classList.add('hidden');
    overlay.classList.remove('visible');
    UI_STATE.paintingVisible = false;
    UI_STATE.paintingPlanet = null;
  }
}


/* ================================================================
   ENCONTRAR UN PLANETA EN LA ESCENA POR ID
   ================================================================ */
function findPlanetInScene(planetId) {
  if (planetId === 'sun') {
    var sunCore = document.querySelector('#sun-group [gaze-info]');
    return sunCore;
  }

  // Buscar en los elementos con gaze-info="planet: XXX"
  var elements = document.querySelectorAll('[gaze-info]');
  for (var i = 0; i < elements.length; i++) {
    var gi = elements[i].getAttribute('gaze-info');
    if (gi && gi.indexOf('planet: ' + planetId) >= 0) {
      return elements[i];
    }
  }

  // Fallback: buscar por clase
  var orbitEl = document.querySelector('.orbit-' + planetId);
  if (orbitEl) {
    var children = orbitEl.querySelectorAll('a-entity');
    for (var j = 0; j < children.length; j++) {
      var geo = children[j].getAttribute('geometry');
      if (geo && geo.indexOf('sphere') >= 0) {
        return children[j];
      }
    }
  }

  return null;
}


/* ================================================================
   CONTROLES DE TECLADO
   ================================================================ */
function setupKeyboardControls() {
  document.addEventListener('keydown', function (evt) {
    switch (evt.key.toLowerCase()) {
      case 'h':
        // Ocultar panel flotante
        hidePlanetInfo();
        break;
      case 'escape':
        // Ocultar todo
        hidePlanetInfo();
        var overlay = document.getElementById('painting-overlay');
        if (overlay) {
          overlay.classList.add('hidden');
          overlay.classList.remove('visible');
          UI_STATE.paintingVisible = false;
        }
        break;
      case 'm':
        // Mostrar/ocultar menú de ayuda
        var help = document.getElementById('help-overlay');
        if (help) {
          help.classList.toggle('hidden');
        }
        break;
      case 'f':
        // Flying mode toggle
        var cam = document.querySelector('[camera]');
        if (cam) {
          var wasd = cam.getAttribute('wasd-controls');
          if (wasd) {
            var currentFly = wasd.fly === 'true' || wasd.fly === true;
            cam.setAttribute('wasd-controls', 'fly', !currentFly);
            console.log('Fly mode: ' + (!currentFly ? 'ON' : 'OFF'));
          }
        }
        break;
    }
  });
}


/* ================================================================
   REDIMENSIONAR
   ================================================================ */
function setupResizeHandler() {
  window.addEventListener('resize', function () {
    var scene = document.querySelector('a-scene');
    if (scene && scene.renderer) {
      scene.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  });
}


/* ================================================================
   DETECTAR CLICKS FUERA DEL PANEL (para cerrarlo)
   ================================================================ */
document.addEventListener('click', function (evt) {
  // Si hay un panel flotante y se hace click en algo que no es un planeta
  if (UI_STATE.floatingPanel && evt.target) {
    var target = evt.target;
    var isPlanet = false;
    // Verificar si el clic fue en un planeta
    var el = target;
    while (el) {
      if (el.hasAttribute && el.hasAttribute('gaze-info')) {
        var gi = el.getAttribute('gaze-info');
        if (gi && gi.indexOf('planet:') >= 0 && gi.indexOf('planet: ' + UI_STATE.activePlanet) < 0) {
          // Clic en otro planeta - cambiar panel
          isPlanet = true;
        } else if (gi && gi.indexOf('planet: ' + UI_STATE.activePlanet) >= 0) {
          // Clic en el mismo planeta - mantener panel
          isPlanet = true;
        }
        break;
      }
      el = el.parentNode;
    }
    // Si no es un planeta, cerrar panel
    if (!isPlanet) {
      setTimeout(function () {
        if (UI_STATE.floatingPanel) {
          hidePlanetInfo();
        }
      }, 300);
    }
  }
});
