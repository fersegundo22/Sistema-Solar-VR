/**
 * museum.js
 * Construcción de la sala del museo: paredes, suelo, techo,
 * cuadros informativos con datos de planetas, e iluminación.
 */

var MUSEUM_CONFIG = {
  width:  80,   // metros (x)
  depth:  80,   // metros (z)
  height: 24,   // metros (y)
  wallThickness: 0.3,
  paintingWidth:  10,
  paintingHeight: 7.5,
  paintingY:      6.5   // altura del centro desde el suelo
};

/* ================================================================
   INICIALIZAR MUSEO
   ================================================================ */
function initMuseum() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(initMuseum, 200); return; }

  var museumContainer = document.getElementById('museum');
  if (!museumContainer) {
    museumContainer = document.createElement('a-entity');
    museumContainer.id = 'museum';
    scene.appendChild(museumContainer);
  }

  var cfg = MUSEUM_CONFIG;
  var hw = cfg.width / 2;   // 40
  var hd = cfg.depth / 2;   // 40

  createFloor(museumContainer, cfg);
  createCeiling(museumContainer, cfg);
  createWalls(museumContainer, cfg);
  createPaintings(museumContainer, cfg);
  createLighting(museumContainer, cfg);
  createDecorativeElements(museumContainer, cfg);
}


/* ================================================================
   SUELO
   ================================================================ */
function createFloor(container, cfg) {
  var floor = document.createElement('a-entity');

  // Plano principal del suelo
  var floorPlane = document.createElement('a-plane');
  floorPlane.setAttribute('width', cfg.width);
  floorPlane.setAttribute('height', cfg.depth);
  floorPlane.setAttribute('rotation', '-90 0 0');
  floorPlane.setAttribute('position', '0 0 0');
  floorPlane.setAttribute('material', 'shader: standard; color: #1A1A2E; roughness: 0.4; metalness: 0.6');
  floorPlane.classList.add('floor');
  floor.appendChild(floorPlane);

  // Rejilla decorativa (grid lines)
  var gridCanvas = document.createElement('canvas');
  gridCanvas.width = 512;
  gridCanvas.height = 512;
  var gctx = gridCanvas.getContext('2d');
  gctx.fillStyle = '#151520';
  gctx.fillRect(0, 0, 512, 512);
  gctx.strokeStyle = 'rgba(40, 60, 100, 0.25)';
  gctx.lineWidth = 1;
  var gridSpacing = 512 / 20;
  for (var i = 0; i <= 20; i++) {
    var pos = i * gridSpacing;
    gctx.beginPath();
    gctx.moveTo(pos, 0);
    gctx.lineTo(pos, 512);
    gctx.stroke();
    gctx.beginPath();
    gctx.moveTo(0, pos);
    gctx.lineTo(512, pos);
    gctx.stroke();
  }

  var gridImg = document.createElement('img');
  gridImg.id = 'tex-floor-grid';
  gridImg.src = gridCanvas.toDataURL();
  var assets = document.getElementById('assets');
  if (assets) assets.appendChild(gridImg);

  var floorOverlay = document.createElement('a-plane');
  floorOverlay.setAttribute('width', cfg.width);
  floorOverlay.setAttribute('height', cfg.depth);
  floorOverlay.setAttribute('rotation', '-90 0 0');
  floorOverlay.setAttribute('position', '0 0.01 0');
  floorOverlay.setAttribute('material', 'shader: standard; src: #tex-floor-grid; roughness: 0.5; metalness: 0.3; opacity: 0.6; transparent: true; depthWrite: false');
  floor.appendChild(floorOverlay);

  container.appendChild(floor);
}


/* ================================================================
   TECHO
   ================================================================ */
function createCeiling(container, cfg) {
  var ceiling = document.createElement('a-plane');
  ceiling.setAttribute('width', cfg.width);
  ceiling.setAttribute('height', cfg.depth);
  ceiling.setAttribute('rotation', '90 0 0');
  ceiling.setAttribute('position', '0 ' + cfg.height + ' 0');
  ceiling.setAttribute('material', 'shader: standard; color: #0D0D1A; roughness: 0.5; metalness: 0.4');
  ceiling.setAttribute('side', 'double');
  container.appendChild(ceiling);

  // Tiras de luz en el techo (rectángulos emisivos)
  var stripPositions = [
    { x: -35, z: 0 },
    { x: 35,  z: 0 },
    { x: 0,   z: -35 },
    { x: 0,   z: 35 }
  ];

  stripPositions.forEach(function (pos) {
    var strip = document.createElement('a-plane');
    strip.setAttribute('width', '60');
    strip.setAttribute('height', '0.3');
    strip.setAttribute('rotation', '90 0 0');
    strip.setAttribute('position', pos.x + ' ' + (cfg.height - 0.1) + ' ' + pos.z);
    strip.setAttribute('material', 'shader: standard; emissive: #5566AA; emissiveIntensity: 2.5; color: #445599; roughness: 0.6; metalness: 0.3; depthWrite: false');
    container.appendChild(strip);
  });
}


/* ================================================================
   PAREDES
   ================================================================ */
function createWalls(container, cfg) {
  var hw = cfg.width / 2;   // 40
  var hd = cfg.depth / 2;   // 40
  var wallMat = 'shader: standard; color: #12122A; roughness: 0.55; metalness: 0.5';

  var walls = [
    { name: 'north', pos: '0 ' + (cfg.height / 2) + ' ' + (-hd), rot: '0 0 0',   w: cfg.width, h: cfg.height },
    { name: 'south', pos: '0 ' + (cfg.height / 2) + ' ' + hd,    rot: '0 180 0', w: cfg.width, h: cfg.height },
    { name: 'east',  pos: hw + ' ' + (cfg.height / 2) + ' 0',    rot: '0 -90 0', w: cfg.depth, h: cfg.height },
    { name: 'west',  pos: (-hw) + ' ' + (cfg.height / 2) + ' 0', rot: '0 90 0',  w: cfg.depth, h: cfg.height }
  ];

  walls.forEach(function (w) {
    var wall = document.createElement('a-plane');
    wall.setAttribute('width', w.w);
    wall.setAttribute('height', w.h);
    wall.setAttribute('position', w.pos);
    wall.setAttribute('rotation', w.rot);
    wall.setAttribute('material', wallMat);
    wall.setAttribute('side', 'double');
    wall.classList.add('wall');
    container.appendChild(wall);

    // Panel decorativo en cada pared (textura de panel tecnológico)
    var panelCanvas = document.createElement('canvas');
    panelCanvas.width = 512;
    panelCanvas.height = 512;
    var pctx = panelCanvas.getContext('2d');
    pctx.fillStyle = '#0F0F22';
    pctx.fillRect(0, 0, 512, 512);

    // Líneas horizontales sutiles
    for (var i = 0; i < 40; i++) {
      var ly = i * 13;
      pctx.strokeStyle = 'rgba(40, 50, 80, ' + (0.12 + Math.random() * 0.08) + ')';
      pctx.lineWidth = 0.5 + Math.random() * 1;
      pctx.beginPath();
      pctx.moveTo(0, ly);
      pctx.lineTo(512, ly);
      pctx.stroke();
    }

    var panelImg = document.createElement('img');
    panelImg.id = 'tex-wall-panel-' + w.name;
    panelImg.src = panelCanvas.toDataURL();
    var assets = document.getElementById('assets');
    if (assets && !document.getElementById('tex-wall-panel-' + w.name)) {
      assets.appendChild(panelImg);
    }

    var panelPlane = document.createElement('a-plane');
    panelPlane.setAttribute('width', w.w);
    panelPlane.setAttribute('height', w.h);
    panelPlane.setAttribute('position', w.pos);
    panelPlane.setAttribute('rotation', w.rot);
    panelPlane.setAttribute('material', 'shader: standard; src: #tex-wall-panel-' + w.name + '; roughness: 0.6; metalness: 0.3; opacity: 0.5; transparent: true; depthWrite: false');

    // Desplazar ligeramente para evitar z-fighting
    var dir = getWallDirection(w.name);
    var px = parseFloat(w.pos.split(' ')[0]) + dir.x * 0.05;
    var pz = parseFloat(w.pos.split(' ')[2]) + dir.z * 0.05;
    panelPlane.setAttribute('position', px + ' ' + (cfg.height / 2) + ' ' + pz);
    container.appendChild(panelPlane);
  });
}

function getWallDirection(name) {
  switch (name) {
    case 'north': return { x: 0,  z: 1 };
    case 'south': return { x: 0,  z: -1 };
    case 'east':  return { x: -1, z: 0 };
    case 'west':  return { x: 1,  z: 0 };
    default:      return { x: 0,  z: 0 };
  }
}


/* ================================================================
   CUADROS INFORMATIVOS EN PAREDES
   Cada pared tiene 2 cuadros (8 planetas en total)
   ================================================================ */
function createPaintings(container, cfg) {
  var hw = cfg.width / 2;
  var hd = cfg.depth / 2;

  // Distribución de planetas en las 4 paredes
  // Norte (z=-40): Mercurio, Venus
  // Sur (z=40): Júpiter, Saturno
  // Este (x=40): Tierra, Marte
  // Oeste (x=-40): Urano, Neptuno

  var paintingLayout = [
    { wall: 'north', planetId: 'mercury', offset: -18, rot: '0 0 0' },
    { wall: 'north', planetId: 'venus',   offset: 18,  rot: '0 0 0' },
    { wall: 'south', planetId: 'jupiter', offset: -18, rot: '0 180 0' },
    { wall: 'south', planetId: 'saturn',  offset: 18,  rot: '0 180 0' },
    { wall: 'east',  planetId: 'earth',   offset: -18, rot: '0 -90 0' },
    { wall: 'east',  planetId: 'mars',    offset: 18,  rot: '0 -90 0' },
    { wall: 'west',  planetId: 'uranus',  offset: -18, rot: '0 90 0' },
    { wall: 'west',  planetId: 'neptune', offset: 18,  rot: '0 90 0' }
  ];

  paintingLayout.forEach(function (layout) {
    createPainting(container, cfg, layout);
  });
}

function createPainting(container, cfg, layout) {
  var data = window.PLANET_DATA ? window.PLANET_DATA[layout.planetId] : null;
  if (!data) return;

  var hw = cfg.width / 2;
  var hd = cfg.depth / 2;
  var pw = cfg.paintingWidth;
  var ph = cfg.paintingHeight;
  var py = cfg.paintingY;

  // Calcular posición en la pared
  var dir = getWallDirection(layout.wall);
  var wallZ, wallX, offsetX, offsetZ;

  switch (layout.wall) {
    case 'north':
      wallZ = -hd + 0.08;
      wallX = layout.offset;
      offsetX = 0; offsetZ = dir.z * 0.02;
      break;
    case 'south':
      wallZ = hd - 0.08;
      wallX = layout.offset;
      offsetX = 0; offsetZ = dir.z * 0.02;
      break;
    case 'east':
      wallX = hw - 0.08;
      wallZ = layout.offset;
      offsetX = dir.x * 0.02; offsetZ = 0;
      break;
    case 'west':
      wallX = -hw + 0.08;
      wallZ = layout.offset;
      offsetX = dir.x * 0.02; offsetZ = 0;
      break;
  }

  // --- Marco del cuadro ---
  var frame = document.createElement('a-plane');
  frame.setAttribute('width', (pw + 0.6).toString());
  frame.setAttribute('height', (ph + 0.6).toString());
  frame.setAttribute('position', (wallX + offsetX) + ' ' + py + ' ' + (wallZ + offsetZ));
  frame.setAttribute('rotation', layout.rot);
  frame.setAttribute('material', 'shader: standard; color: #3A3A55; roughness: 0.3; metalness: 0.85; emissive: #222244; emissiveIntensity: 0.5');
  container.appendChild(frame);

  // --- Lienzo del cuadro (textura generada) ---
  var paintingCanvas = generatePaintingTexture(layout.planetId, data);
  var paintImg = document.createElement('img');
  paintImg.id = 'tex-painting-' + layout.planetId;
  paintImg.src = paintingCanvas.toDataURL();

  var assets = document.getElementById('assets');
  if (assets) assets.appendChild(paintImg);

  var painting = document.createElement('a-plane');
  painting.setAttribute('width', pw.toString());
  painting.setAttribute('height', ph.toString());
  painting.setAttribute('position', (wallX + offsetX) + ' ' + py + ' ' + (wallZ + offsetZ));
  painting.setAttribute('rotation', layout.rot);
  painting.setAttribute('material', 'shader: standard; src: #tex-painting-' + layout.planetId + '; roughness: 0.4; metalness: 0.05; emissive: #334466; emissiveIntensity: 0.55');

  // Componente de proximidad
  painting.setAttribute('proximity-info', 'planet: ' + layout.planetId + '; distance: 10');
  container.appendChild(painting);

  // --- Foco de luz para el cuadro ---
  var spotlight = document.createElement('a-light');
  spotlight.setAttribute('type', 'spot');
  spotlight.setAttribute('intensity', '4.5');
  spotlight.setAttribute('color', '#E0EEFF');
  spotlight.setAttribute('distance', '20');
  spotlight.setAttribute('angle', '40');
  spotlight.setAttribute('penumbra', '0.6');
  spotlight.setAttribute('decay', '0.8');

  // Posicionar el foco frente al cuadro
  var spotDist = 4;
  var spotX = wallX + dir.x * (-spotDist);
  var spotZ = wallZ + dir.z * (-spotDist);
  spotlight.setAttribute('position', spotX + ' ' + (py + 0.5) + ' ' + spotZ);
  spotlight.setAttribute('target', '#' + layout.planetId + '-painting-target');

  // Target para el foco
  var target = document.createElement('a-entity');
  target.id = layout.planetId + '-painting-target';
  target.setAttribute('position', (wallX + offsetX) + ' ' + py + ' ' + (wallZ + offsetZ));

  container.appendChild(spotlight);
  container.appendChild(target);
}


/* ================================================================
   GENERAR TEXTURA DEL CUADRO (CANVAS)
   ================================================================ */
function generatePaintingTexture(planetId, data) {
  var canvas = document.createElement('canvas');
  canvas.width = 1800;
  canvas.height = 1400;
  var ctx = canvas.getContext('2d');

  // Fondo oscuro con borde
  ctx.fillStyle = '#0A0A1E';
  ctx.fillRect(0, 0, 1800, 1400);

  // Borde interior
  ctx.strokeStyle = 'rgba(60, 100, 180, 0.5)';
  ctx.lineWidth = 6;
  ctx.strokeRect(18, 18, 1764, 1364);

  // Borde fino interior
  ctx.strokeStyle = 'rgba(80, 120, 200, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, 1736, 1336);

  // Nombre del planeta
  ctx.fillStyle = '#E0E8FF';
  ctx.font = 'bold 80px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(data.name.toUpperCase(), 900, 120);

  // Línea decorativa bajo el nombre
  var lineGrad = ctx.createLinearGradient(400, 0, 1400, 0);
  lineGrad.addColorStop(0, 'rgba(60, 100, 180, 0)');
  lineGrad.addColorStop(0.3, 'rgba(60, 100, 180, 0.8)');
  lineGrad.addColorStop(0.5, 'rgba(100, 160, 240, 1)');
  lineGrad.addColorStop(0.7, 'rgba(60, 100, 180, 0.8)');
  lineGrad.addColorStop(1, 'rgba(60, 100, 180, 0)');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(350, 150);
  ctx.lineTo(1450, 150);
  ctx.stroke();

  // Imagen del planeta (miniatura de la textura)
  if (window.TextureGen) {
    var planetTex = window.TextureGen.get(planetId);
    if (planetTex) {
      var imgSize = 360;
      var imgX = 640;
      var imgY = 200;

      ctx.save();
      ctx.beginPath();
      ctx.arc(imgX, imgY, imgSize / 2 - 3, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(planetTex, imgX - imgSize / 2, imgY - imgSize / 2, imgSize, imgSize);
      ctx.restore();

      ctx.strokeStyle = 'rgba(100, 160, 240, 0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(imgX, imgY, imgSize / 2, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Información en dos columnas
  var infoStartY = 620;
  var lineHeight = 60;
  var leftCol = 100;
  var rightCol = 950;
  var info = data.info;

  var leftItems = [
    { label: 'Distancia al Sol:', value: info.distance },
    { label: 'Radio:', value: info.radius },
    { label: 'Masa:', value: info.mass },
    { label: 'Gravedad:', value: info.gravity },
    { label: 'Temperatura:', value: info.temperature }
  ];

  var rightItems = [
    { label: 'Duraci\u00f3n del d\u00eda:', value: info.day },
    { label: 'Duraci\u00f3n del a\u00f1o:', value: info.year },
    { label: 'Sat\u00e9lites:', value: info.satellites },
    { label: 'Tipo:', value: info.type }
  ];

  leftItems.forEach(function (item, idx) {
    var y = infoStartY + idx * lineHeight;
    ctx.fillStyle = '#8899CC';
    ctx.font = '26px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(item.label, leftCol, y);
    ctx.fillStyle = '#E0E8FF';
    ctx.fillText(item.value, leftCol + 320, y);
  });

  rightItems.forEach(function (item, idx) {
    var y = infoStartY + idx * lineHeight;
    ctx.fillStyle = '#8899CC';
    ctx.font = '26px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(item.label, rightCol, y);
    ctx.fillStyle = '#E0E8FF';
    ctx.fillText(item.value, rightCol + 340, y);
  });

  // Curiosidad
  var curiosityY = infoStartY + leftItems.length * lineHeight + 80;
  ctx.fillStyle = 'rgba(60, 100, 180, 0.12)';
  ctx.fillRect(70, curiosityY - 28, 1660, 150);
  ctx.fillStyle = '#AABBEE';
  ctx.font = 'italic 26px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'left';

  var curiosityText = data.info.curiosity;
  var words = curiosityText.split(' ');
  var lines = [];
  var currentLine = '';
  words.forEach(function (word) {
    var test = currentLine + (currentLine ? ' ' : '') + word;
    if (ctx.measureText(test).width < 1600) {
      currentLine = test;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);

  lines.forEach(function (line, idx) {
    ctx.fillText(line, 100, curiosityY + idx * 40);
  });

  return canvas;
}


/* ================================================================
   ILUMINACIÓN DEL MUSEO
   ================================================================ */
function createLighting(container, cfg) {
  var hw = cfg.width / 2;
  var hd = cfg.depth / 2;

  // Luz ambiental general
  var ambient = document.createElement('a-light');
  ambient.setAttribute('type', 'ambient');
  ambient.setAttribute('color', '#2A2A55');
  ambient.setAttribute('intensity', '0.9');
  container.appendChild(ambient);

  // Luz hemisférica para simular luz de techo
  var hemi = document.createElement('a-light');
  hemi.setAttribute('type', 'hemisphere');
  hemi.setAttribute('color', '#556688');
  hemi.setAttribute('groundColor', '#1A1A30');
  hemi.setAttribute('intensity', '0.7');
  container.appendChild(hemi);

  // Focos cenitales distribuidos por el museo
  var spotPositions = [];
  for (var x = -30; x <= 30; x += 15) {
    for (var z = -30; z <= 30; z += 15) {
      if (Math.abs(x) < 12 && Math.abs(z) < 12) continue;
      spotPositions.push({ x: x, z: z });
    }
  }

  spotPositions.forEach(function (pos) {
    var spot = document.createElement('a-light');
    spot.setAttribute('type', 'spot');
    spot.setAttribute('color', '#AABBEE');
    spot.setAttribute('intensity', '1.0');
    spot.setAttribute('distance', '35');
    spot.setAttribute('angle', '45');
    spot.setAttribute('penumbra', '0.7');
    spot.setAttribute('decay', '1.0');
    spot.setAttribute('position', pos.x + ' ' + (cfg.height - 0.5) + ' ' + pos.z);
    spot.setAttribute('target', '#floor-spot-' + pos.x + '-' + pos.z);
    container.appendChild(spot);

    var target = document.createElement('a-entity');
    target.id = 'floor-spot-' + pos.x + '-' + pos.z;
    target.setAttribute('position', pos.x + ' 0 ' + pos.z);
    container.appendChild(target);
  });
}


/* ================================================================
   ELEMENTOS DECORATIVOS
   ================================================================ */
function createDecorativeElements(container, cfg) {
  var hw = cfg.width / 2;
  var hd = cfg.depth / 2;

  // Pilares en las esquinas
  var corners = [
    { x: -hw + 2, z: -hd + 2 },
    { x:  hw - 2, z: -hd + 2 },
    { x: -hw + 2, z:  hd - 2 },
    { x:  hw - 2, z:  hd - 2 }
  ];

  corners.forEach(function (corner) {
    var pillar = document.createElement('a-box');
    pillar.setAttribute('width', '1.5');
    pillar.setAttribute('height', cfg.height.toString());
    pillar.setAttribute('depth', '1.5');
    pillar.setAttribute('position', corner.x + ' ' + (cfg.height / 2) + ' ' + corner.z);
    pillar.setAttribute('material', 'shader: standard; color: #1E1E3A; roughness: 0.3; metalness: 0.7; emissive: #0A0A1A; emissiveIntensity: 0.15');
    container.appendChild(pillar);

    // Tira de luz en el pilar
    var lightStrip = document.createElement('a-box');
    lightStrip.setAttribute('width', '0.15');
    lightStrip.setAttribute('height', cfg.height.toString());
    lightStrip.setAttribute('depth', '0.05');
    lightStrip.setAttribute('position', (corner.x + 0.8) + ' ' + (cfg.height / 2) + ' ' + corner.z);
    lightStrip.setAttribute('material', 'shader: standard; emissive: #3355AA; emissiveIntensity: 2; color: #3355AA; roughness: 0.5; metalness: 0.3');
    container.appendChild(lightStrip);
  });

  // Pasarela elevada alrededor del sistema solar (para ver desde arriba)
  var walkwayY = 0.15;
  var walkwayW = 2;
  var innerR = 10;
  var outerR = innerR + walkwayW;

  // Cuatro segmentos de pasarela (N, S, E, W)
  var walkways = [
    { pos: '0 ' + walkwayY + ' ' + (-hd + 1), rot: '0 0 0',   w: cfg.width, h: walkwayW },
    { pos: '0 ' + walkwayY + ' ' + (hd - 1),  rot: '0 0 0',   w: cfg.width, h: walkwayW },
    { pos: (-hw + 1) + ' ' + walkwayY + ' 0', rot: '0 90 0',  w: cfg.depth, h: walkwayW },
    { pos: (hw - 1) + ' ' + walkwayY + ' 0',  rot: '0 90 0',  w: cfg.depth, h: walkwayW }
  ];

  walkways.forEach(function (w) {
    var walk = document.createElement('a-plane');
    walk.setAttribute('width', w.w.toString());
    walk.setAttribute('height', w.h.toString());
    walk.setAttribute('rotation', w.rot);
    walk.setAttribute('position', w.pos);
    walk.setAttribute('material', 'shader: standard; color: #1E1E3A; roughness: 0.35; metalness: 0.55; emissive: #0A0A1E; emissiveIntensity: 0.2');
    walk.classList.add('floor');
    container.appendChild(walk);
  });
}
