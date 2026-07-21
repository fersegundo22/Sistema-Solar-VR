/**
 * planets.js
 * Datos planetarios, generación de texturas procedurales
 * y creación del sistema solar completo en la escena A-Frame
 */

/* ================================================================
   DATOS PLANETARIOS
   ================================================================ */
var PLANET_DATA = {
  mercury: {
    name: 'Mercurio',
    nameEn: 'Mercury',
    type: 'planet',
    orbitalRadius: 9,
    size: 0.35,
    orbitSpeed: 3.2,
    rotSpeed: 0.4,
    tilt: 7,
    colorBase: '#B8B8B8',
    info: {
      distance: '57.9 millones km (0.39 UA)',
      radius: '2,440 km',
      mass: '3.30 &times; 10<sup>23</sup> kg',
      gravity: '3.7 m/s&sup2;',
      temperature: '-180&deg;C a 430&deg;C',
      day: '58.6 d&iacute;as terrestres (1,408 h)',
      year: '88 d&iacute;as terrestres',
      satellites: '0',
      type: 'Planeta rocoso (terrestre)',
      curiosity: 'Es el planeta m&aacute;s peque&ntilde;o del sistema solar. No tiene atm&oacute;sfera significativa y su superficie est&aacute; cubierta de cr&aacute;teres, similar a la Luna.'
    }
  },

  venus: {
    name: 'Venus',
    nameEn: 'Venus',
    type: 'planet',
    orbitalRadius: 12.5,
    size: 0.85,
    orbitSpeed: 1.3,
    rotSpeed: -0.2,
    tilt: 3.4,
    colorBase: '#F0D0A0',
    info: {
      distance: '108.2 millones km (0.72 UA)',
      radius: '6,052 km',
      mass: '4.87 &times; 10<sup>24</sup> kg',
      gravity: '8.87 m/s&sup2;',
      temperature: '462&deg;C (promedio)',
      day: '243 d&iacute;as terrestres (retr&oacute;grado)',
      year: '225 d&iacute;as terrestres',
      satellites: '0',
      type: 'Planeta rocoso (terrestre)',
      curiosity: 'Es el planeta m&aacute;s caliente del sistema solar debido a su densa atm&oacute;sfera de CO<sub>2</sub> que genera un efecto invernadero extremo. Gira en sentido contrario a la mayor&iacute;a de los planetas.'
    }
  },

  earth: {
    name: 'Tierra',
    nameEn: 'Earth',
    type: 'planet',
    orbitalRadius: 16.5,
    size: 0.9,
    orbitSpeed: 0.8,
    rotSpeed: 1.8,
    tilt: 0,
    colorBase: '#2266FF',
    hasMoon: true,
    moonData: {
      size: 0.24,
      distance: 2.0,
      speed: 2.5,
      color: '#D8D8D8'
    },
    info: {
      distance: '149.6 millones km (1 UA)',
      radius: '6,371 km',
      mass: '5.97 &times; 10<sup>24</sup> kg',
      gravity: '9.81 m/s&sup2;',
      temperature: '-89&deg;C a 57&deg;C',
      day: '24 horas',
      year: '365.25 d&iacute;as',
      satellites: '1 (Luna)',
      type: 'Planeta rocoso (terrestre)',
      curiosity: '&Uacute;nico planeta conocido con vida. El 71% de su superficie est&aacute; cubierta por agua l&iacute;quida. Su atm&oacute;sfera de nitr&oacute;geno y ox&iacute;geno es &uacute;nica en el sistema solar.'
    }
  },

  mars: {
    name: 'Marte',
    nameEn: 'Mars',
    type: 'planet',
    orbitalRadius: 21,
    size: 0.5,
    orbitSpeed: 0.42,
    rotSpeed: 1.9,
    tilt: 1.85,
    colorBase: '#DD4422',
    info: {
      distance: '227.9 millones km (1.52 UA)',
      radius: '3,390 km',
      mass: '6.42 &times; 10<sup>23</sup> kg',
      gravity: '3.72 m/s&sup2;',
      temperature: '-140&deg;C a 20&deg;C',
      day: '24.6 horas',
      year: '687 d&iacute;as terrestres',
      satellites: '2 (Fobos, Deimos)',
      type: 'Planeta rocoso (terrestre)',
      curiosity: 'Conocido como el Planeta Rojo. Tiene el volc&aacute;n m&aacute;s grande del sistema solar: el Monte Olimpo (21.9 km de altura).'
    }
  },

  jupiter: {
    name: 'J&uacute;piter',
    nameEn: 'Jupiter',
    type: 'planet',
    orbitalRadius: 26,
    size: 2.1,
    orbitSpeed: 0.065,
    rotSpeed: 3.0,
    tilt: 1.3,
    colorBase: '#D4B896',
    hasMoons: true,
    moons: [
      { size: 0.19, distance: 3.0, speed: 3.5, from: 0,    color: '#E8E8E8' },
      { size: 0.16, distance: 3.4, speed: 2.8, from: 120,  color: '#D4D4D4' },
      { size: 0.17, distance: 3.8, speed: 2.2, from: 240,  color: '#DDDDDD' },
      { size: 0.15, distance: 4.1, speed: 1.8, from: 60,   color: '#CCCCCC' }
    ],
    info: {
      distance: '778.6 millones km (5.2 UA)',
      radius: '69,911 km',
      mass: '1.90 &times; 10<sup>27</sup> kg',
      gravity: '24.79 m/s&sup2;',
      temperature: '-108&deg;C (nubes)',
      day: '9.9 horas',
      year: '11.86 a&ntilde;os terrestres',
      satellites: '95+ (4 principales: &Iacute;o, Europa, Gan&iacute;medes, Calisto)',
      type: 'Gigante gaseoso',
      curiosity: 'Es el planeta m&aacute;s grande del sistema solar. La Gran Mancha Roja es una tormenta m&aacute;s grande que la Tierra que lleva activa m&aacute;s de 350 a&ntilde;os.'
    }
  },

  saturn: {
    name: 'Saturno',
    nameEn: 'Saturn',
    type: 'planet',
    orbitalRadius: 31,
    size: 1.7,
    orbitSpeed: 0.028,
    rotSpeed: 2.5,
    tilt: 2.49,
    colorBase: '#F2E0B0',
    hasRings: true,
    info: {
      distance: '1,434 millones km (9.5 UA)',
      radius: '58,232 km',
      mass: '5.68 &times; 10<sup>26</sup> kg',
      gravity: '10.44 m/s&sup2;',
      temperature: '-139&deg;C',
      day: '10.7 horas',
      year: '29.46 a&ntilde;os terrestres',
      satellites: '146+ (Tit&aacute;n el m&aacute;s grande)',
      type: 'Gigante gaseoso',
      curiosity: 'Famoso por su espectacular sistema de anillos compuestos de hielo y roca. Es el planeta menos denso: flotar&iacute;a en agua.'
    }
  },

  uranus: {
    name: 'Urano',
    nameEn: 'Uranus',
    type: 'planet',
    orbitalRadius: 35,
    size: 1.25,
    orbitSpeed: 0.009,
    rotSpeed: 2.0,
    tilt: 0.77,
    colorBase: '#80D8F4',
    hasRings: true,
    ringsFaint: true,
    info: {
      distance: '2,871 millones km (19.2 UA)',
      radius: '25,362 km',
      mass: '8.68 &times; 10<sup>25</sup> kg',
      gravity: '8.87 m/s&sup2;',
      temperature: '-197&deg;C',
      day: '17.2 horas',
      year: '84 a&ntilde;os terrestres',
      satellites: '27',
      type: 'Gigante de hielo',
      curiosity: 'Gira completamente inclinado de lado (97.8&deg;). Sus anillos son verticales respecto a su &oacute;rbita. Fue el primer planeta descubierto con telescopio (1781).'
    }
  },

  neptune: {
    name: 'Neptuno',
    nameEn: 'Neptune',
    type: 'planet',
    orbitalRadius: 38.5,
    size: 1.2,
    orbitSpeed: 0.0045,
    rotSpeed: 2.2,
    tilt: 1.77,
    colorBase: '#3355FF',
    info: {
      distance: '4,495 millones km (30.1 UA)',
      radius: '24,622 km',
      mass: '1.02 &times; 10<sup>26</sup> kg',
      gravity: '11.15 m/s&sup2;',
      temperature: '-201&deg;C',
      day: '16.1 horas',
      year: '164.8 a&ntilde;os terrestres',
      satellites: '16 (Trit&oacute;n el m&aacute;s grande)',
      type: 'Gigante de hielo',
      curiosity: 'Es el planeta m&aacute;s ventoso del sistema solar con vientos de hasta 2,100 km/h. Fue descubierto por predicci&oacute;n matem&aacute;tica antes de ser observado.'
    }
  }
};

/* ================================================================
   GENERADOR DE TEXTURAS PROCEDURALES
   Cada textura imita el aspecto real del planeta usando Canvas 2D
   ================================================================ */
var TextureGen = {
  _cache: {},

  /** Mezcla de colores aleatoria para ruido */
  _randomBetween: function (a, b) {
    return a + Math.random() * (b - a);
  },

  /** Obtener o generar una textura */
  get: function (id) {
    if (this._cache[id]) return this._cache[id];
    var fn = this['_gen_' + id];
    if (!fn) return null;
    var canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    canvas.id = 'tex-' + id;
    fn.call(this, canvas, canvas.getContext('2d'));
    this._cache[id] = canvas;
    return canvas;
  },

  /* ---- SOL ---- */
  _gen_sun: function (c, ctx) {
    // Gradiente radial de fuego
    var grad = ctx.createRadialGradient(256, 128, 10, 256, 128, 260);
    grad.addColorStop(0,    '#FFFFF0');
    grad.addColorStop(0.05, '#FFFF80');
    grad.addColorStop(0.15, '#FFDD00');
    grad.addColorStop(0.3,  '#FF9900');
    grad.addColorStop(0.5,  '#FF6600');
    grad.addColorStop(0.7,  '#FF4400');
    grad.addColorStop(0.85, '#FF2200');
    grad.addColorStop(1,    '#CC1100');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Manchas solares y brillos
    for (var i = 0; i < 120; i++) {
      var x = Math.random() * 512;
      var y = Math.random() * 256;
      var r = Math.random() * 18 + 2;
      var alpha = Math.random() * 0.35;
      var bright = Math.random() > 0.6;
      if (bright) {
        ctx.fillStyle = 'rgba(255, 255, 200, ' + (alpha * 0.6) + ')';
      } else {
        var dark = Math.floor(Math.random() * 120);
        ctx.fillStyle = 'rgba(' + dark + ', ' + Math.floor(dark * 0.4) + ', 0, ' + alpha + ')';
      }
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Filamentos solares (curvas brillantes)
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = '#FFFFCC';
    ctx.lineWidth = 1.5;
    for (var j = 0; j < 40; j++) {
      var sx = Math.random() * 512;
      var sy = Math.random() * 256;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      var cx1 = sx + (Math.random() - 0.5) * 80;
      var cy1 = sy + (Math.random() - 0.5) * 80;
      var cx2 = sx + (Math.random() - 0.5) * 120;
      var cy2 = sy + (Math.random() - 0.5) * 120;
      var ex = sx + (Math.random() - 0.5) * 100;
      var ey = sy + (Math.random() - 0.5) * 100;
      ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  },

  /* ---- MERCURIO ---- */
  _gen_mercury: function (c, ctx) {
    // Base gris
    ctx.fillStyle = '#A8A8A8';
    ctx.fillRect(0, 0, 512, 256);

    // Ruido de superficie
    var imageData = ctx.getImageData(0, 0, 512, 256);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var noise = (Math.random() - 0.5) * 30;
      data[i]     = Math.min(255, Math.max(40, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(40, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(40, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    // Cráteres
    for (var j = 0; j < 200; j++) {
      var cx = Math.random() * 512;
      var cy = Math.random() * 256;
      var cr = Math.random() * 10 + 1;
      ctx.fillStyle = 'rgba(80, 80, 80, 0.5)';
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
      // Borde del cráter
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, cr + 1, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Cuencas más grandes
    for (var k = 0; k < 15; k++) {
      var bx = Math.random() * 512;
      var by = Math.random() * 256;
      var br = Math.random() * 20 + 8;
      var grad = ctx.createRadialGradient(bx, by, br * 0.3, bx, by, br);
      grad.addColorStop(0, 'rgba(70, 70, 70, 0.6)');
      grad.addColorStop(1, 'rgba(160, 160, 160, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bx, by, br, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  /* ---- VENUS ---- */
  _gen_venus: function (c, ctx) {
    ctx.fillStyle = '#E8CDA0';
    ctx.fillRect(0, 0, 512, 256);

    // Nubes atmosféricas (bandas curvas)
    for (var i = 0; i < 30; i++) {
      var y = Math.random() * 256;
      ctx.strokeStyle = 'rgba(255, 240, 200, ' + (Math.random() * 0.25 + 0.1) + ')';
      ctx.lineWidth = Math.random() * 20 + 5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      var cp1y = y + (Math.random() - 0.5) * 40;
      var cp2y = y + (Math.random() - 0.5) * 40;
      var ey = y + (Math.random() - 0.5) * 30;
      ctx.bezierCurveTo(128, cp1y, 384, cp2y, 512, ey);
      ctx.stroke();
    }

    // Manchas más oscuras
    for (var j = 0; j < 20; j++) {
      var dx = Math.random() * 512;
      var dy = Math.random() * 256;
      var grad = ctx.createRadialGradient(dx, dy, 0, dx, dy, Math.random() * 50 + 20);
      grad.addColorStop(0, 'rgba(180, 140, 100, 0.4)');
      grad.addColorStop(1, 'rgba(232, 205, 160, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(dx, dy, Math.random() * 50 + 20, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  /* ---- TIERRA ---- */
  _gen_earth: function (c, ctx) {
    // Océano
    var oceanGrad = ctx.createLinearGradient(0, 0, 0, 256);
    oceanGrad.addColorStop(0,   '#1166AA');
    oceanGrad.addColorStop(0.3, '#2266DD');
    oceanGrad.addColorStop(0.5, '#2255CC');
    oceanGrad.addColorStop(0.7, '#2266DD');
    oceanGrad.addColorStop(1,   '#1166AA');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Función para dibujar continentes
    function drawContinent(cx, cy, rx, ry, color, rotation) {
      ctx.save();
      ctx.translate(cx, cy);
      if (rotation) ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      // Agregar irregularidad
      for (var i = 0; i < 8; i++) {
        var angle = (i / 8) * Math.PI * 2;
        var px = Math.cos(angle) * rx * 0.7;
        var py = Math.sin(angle) * ry * 0.7;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, Math.random() * rx * 0.3 + 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Norteamérica
    drawContinent(130, 60,  70, 55, '#55AA44', -0.2);
    drawContinent(110, 70,  30, 25, '#66BB55', 0.1);

    // Sudamérica
    drawContinent(140, 165, 25, 50, '#44AA33', 0.1);

    // Europa
    drawContinent(265, 52,  35, 28, '#66BB55', 0);

    // África
    drawContinent(275, 140, 30, 65, '#55AA44', 0);
    drawContinent(280, 120, 35, 30, '#77CC66', 0);

    // Asia
    drawContinent(360, 55,  80, 45, '#55BB44', 0);
    drawContinent(400, 80,  40, 30, '#66AA55', 0.2);

    // Sudeste asiático / islas
    ctx.fillStyle = '#55AA44';
    for (var i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.arc(420 + Math.random() * 50, 100 + Math.random() * 50, Math.random() * 8 + 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Australia
    drawContinent(430, 170, 22, 18, '#CC8833', 0);

    // Groenlandia
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.ellipse(220, 35, 25, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hielo polar norte
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillRect(0, 0, 512, 18);
    // Hielo polar sur
    ctx.fillRect(0, 238, 512, 18);

    // Antártida
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(0, 242, 512, 14);

    // Nubes
    for (var k = 0; k < 50; k++) {
      var wx = Math.random() * 512;
      var wy = Math.random() * 256;
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (Math.random() * 0.25) + ')';
      ctx.beginPath();
      ctx.ellipse(wx, wy, Math.random() * 30 + 5, Math.random() * 8 + 3, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  /* ---- MARTE ---- */
  _gen_mars: function (c, ctx) {
    var grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0,   '#CC4422');
    grad.addColorStop(0.3, '#DD5533');
    grad.addColorStop(0.5, '#CC4422');
    grad.addColorStop(0.7, '#BB3311');
    grad.addColorStop(1,   '#CC4422');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Ruido superficial
    var imageData = ctx.getImageData(0, 0, 512, 256);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var noise = (Math.random() - 0.5) * 25;
      data[i]     = Math.min(255, Math.max(40, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(20, data[i + 1] + noise * 0.5));
      data[i + 2] = Math.min(255, Math.max(10, data[i + 2] + noise * 0.3));
    }
    ctx.putImageData(imageData, 0, 0);

    // Regiones más oscuras (tierras altas)
    for (var j = 0; j < 12; j++) {
      var dx = Math.random() * 512;
      var dy = Math.random() * 256;
      var grad2 = ctx.createRadialGradient(dx, dy, 0, dx, dy, Math.random() * 60 + 30);
      grad2.addColorStop(0, 'rgba(140, 30, 10, 0.5)');
      grad2.addColorStop(1, 'rgba(204, 68, 34, 0)');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(dx, dy, Math.random() * 60 + 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cráteres
    for (var k = 0; k < 80; k++) {
      var cx = Math.random() * 512;
      var cy = Math.random() * 256;
      var cr = Math.random() * 5 + 1;
      ctx.fillStyle = 'rgba(120, 30, 10, 0.4)';
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(240, 180, 150, 0.3)';
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.arc(cx, cy, cr + 1, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Casquete polar norte
    var poleGrad = ctx.createLinearGradient(0, 0, 0, 40);
    poleGrad.addColorStop(0, 'rgba(255, 245, 235, 0.9)');
    poleGrad.addColorStop(1, 'rgba(255, 245, 235, 0)');
    ctx.fillStyle = poleGrad;
    ctx.fillRect(0, 0, 512, 40);

    // Casquete polar sur
    var poleGrad2 = ctx.createLinearGradient(0, 256, 0, 216);
    poleGrad2.addColorStop(0, 'rgba(255, 245, 235, 0.9)');
    poleGrad2.addColorStop(1, 'rgba(255, 245, 235, 0)');
    ctx.fillStyle = poleGrad2;
    ctx.fillRect(0, 216, 512, 40);
  },

  /* ---- JUPITER ---- */
  _gen_jupiter: function (c, ctx) {
    // Color base beige
    ctx.fillStyle = '#D4B896';
    ctx.fillRect(0, 0, 512, 256);

    // Bandas horizontales
    var bands = [
      { y: 0,   h: 18, color: '#C4956A' },
      { y: 18,  h: 14, color: '#E0D0B5' },
      { y: 32,  h: 16, color: '#B8845A' },
      { y: 48,  h: 12, color: '#D4C4A8' },
      { y: 60,  h: 20, color: '#C09060' },
      { y: 80,  h: 18, color: '#E8D8C0' },
      { y: 98,  h: 14, color: '#B87848' },
      { y: 112, h: 22, color: '#D4C0A0' },
      { y: 134, h: 16, color: '#C89568' },
      { y: 150, h: 18, color: '#E0D0B0' },
      { y: 168, h: 14, color: '#B07050' },
      { y: 182, h: 20, color: '#D4B896' },
      { y: 202, h: 16, color: '#C08858' },
      { y: 218, h: 18, color: '#E0D4B8' },
      { y: 236, h: 20, color: '#B8845A' },
    ];

    bands.forEach(function (b) {
      ctx.fillStyle = b.color;
      ctx.fillRect(0, b.y, 512, b.h);
    });

    // Turbulencia entre bandas
    for (var i = 0; i < bands.length; i++) {
      var by = bands[i].y;
      ctx.strokeStyle = 'rgba(180, 130, 90, 0.4)';
      ctx.lineWidth = 1;
      for (var x = 0; x < 512; x += 4) {
        var wobble = Math.sin(x * 0.05 + i) * 2;
        var alpha = Math.abs(Math.sin(x * 0.03 + i)) * 0.3;
        ctx.strokeStyle = 'rgba(180, 130, 90, ' + alpha + ')';
        ctx.beginPath();
        ctx.moveTo(x, by + wobble - 1);
        ctx.lineTo(x + 4, by + Math.sin((x + 4) * 0.05 + i) * 2 - 1);
        ctx.stroke();
      }
    }

    // Gran Mancha Roja
    var spotX = 350, spotY = 140;
    var spotGrad = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 30);
    spotGrad.addColorStop(0,   '#D4785A');
    spotGrad.addColorStop(0.4, '#CC6850');
    spotGrad.addColorStop(0.7, '#C06048');
    spotGrad.addColorStop(1,   'rgba(200, 150, 120, 0)');
    ctx.fillStyle = spotGrad;
    ctx.beginPath();
    ctx.ellipse(spotX, spotY, 35, 15, 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Manchas blancas/ovaladas (tormentas)
    for (var j = 0; j < 8; j++) {
      var ox = Math.random() * 400 + 50;
      var oy = 30 + Math.random() * 200;
      ctx.fillStyle = 'rgba(255, 250, 230, ' + (Math.random() * 0.3 + 0.1) + ')';
      ctx.beginPath();
      ctx.ellipse(ox, oy, Math.random() * 15 + 5, Math.random() * 5 + 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  },

  /* ---- SATURNO ---- */
  _gen_saturn: function (c, ctx) {
    ctx.fillStyle = '#F0DDA8';
    ctx.fillRect(0, 0, 512, 256);

    // Bandas sutiles
    var satBands = [
      { y: 0,   h: 25, color: '#E8D090' },
      { y: 25,  h: 18, color: '#F0DDA8' },
      { y: 43,  h: 14, color: '#E0CC88' },
      { y: 57,  h: 20, color: '#F2E0B0' },
      { y: 77,  h: 15, color: '#E8D498' },
      { y: 92,  h: 22, color: '#F0DDA0' },
      { y: 114, h: 16, color: '#E4CC90' },
      { y: 130, h: 20, color: '#F2E4B8' },
      { y: 150, h: 18, color: '#E8D498' },
      { y: 168, h: 22, color: '#F0DEA8' },
      { y: 190, h: 16, color: '#DEC888' },
      { y: 206, h: 20, color: '#F0DDA8' },
      { y: 226, h: 30, color: '#E4CC90' },
    ];

    satBands.forEach(function (b) {
      ctx.fillStyle = b.color;
      ctx.fillRect(0, b.y, 512, b.h);
    });

    // Suavizado entre bandas
    for (var i = 0; i < satBands.length - 1; i++) {
      var yLine = satBands[i].y + satBands[i].h;
      var grad = ctx.createLinearGradient(0, yLine - 3, 0, yLine + 3);
      grad.addColorStop(0, satBands[i].color);
      grad.addColorStop(1, satBands[i + 1].color);
      ctx.fillStyle = grad;
      ctx.fillRect(0, yLine - 3, 512, 6);
    }
  },

  /* ---- URANO ---- */
  _gen_uranus: function (c, ctx) {
    var grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0,   '#70C8E4');
    grad.addColorStop(0.3, '#88D8F4');
    grad.addColorStop(0.5, '#80D8F0');
    grad.addColorStop(0.7, '#70C8E4');
    grad.addColorStop(1,   '#60B8D4');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Bandas muy sutiles
    for (var i = 0; i < 10; i++) {
      var by = Math.random() * 256;
      ctx.fillStyle = 'rgba(160, 230, 250, ' + (Math.random() * 0.08) + ')';
      ctx.fillRect(0, by, 512, Math.random() * 15 + 5);
    }
  },

  /* ---- NEPTUNO ---- */
  _gen_neptune: function (c, ctx) {
    var grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0,   '#2244DD');
    grad.addColorStop(0.3, '#3355FF');
    grad.addColorStop(0.5, '#3355EE');
    grad.addColorStop(0.7, '#2244DD');
    grad.addColorStop(1,   '#1133BB');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Bandas claras tenues
    for (var i = 0; i < 8; i++) {
      var by = Math.random() * 256;
      ctx.fillStyle = 'rgba(100, 140, 255, ' + (Math.random() * 0.12) + ')';
      ctx.fillRect(0, by, 512, Math.random() * 12 + 4);
    }

    // Gran Mancha Oscura (similar a la de Neptuno)
    var darkX = 280, darkY = 130;
    var darkGrad = ctx.createRadialGradient(darkX, darkY, 0, darkX, darkY, 25);
    darkGrad.addColorStop(0,   'rgba(10, 20, 120, 0.7)');
    darkGrad.addColorStop(0.5, 'rgba(20, 40, 160, 0.5)');
    darkGrad.addColorStop(1,   'rgba(51, 85, 255, 0)');
    ctx.fillStyle = darkGrad;
    ctx.beginPath();
    ctx.ellipse(darkX, darkY, 28, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  },

  /* ---- LUNA ---- */
  _gen_moon: function (c, ctx) {
    ctx.fillStyle = '#C8C8C8';
    ctx.fillRect(0, 0, 512, 256);

    var imageData = ctx.getImageData(0, 0, 512, 256);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var noise = (Math.random() - 0.5) * 25;
      data[i]     = Math.min(255, Math.max(60, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(60, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(60, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    // Cráteres lunares
    for (var j = 0; j < 250; j++) {
      var cx = Math.random() * 512;
      var cy = Math.random() * 256;
      var cr = Math.random() * 6 + 0.5;
      ctx.fillStyle = 'rgba(100, 100, 100, 0.4)';
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mares lunares (zonas oscuras)
    for (var k = 0; k < 12; k++) {
      var mx = Math.random() * 512;
      var my = Math.random() * 256;
      var mr = Math.random() * 50 + 20;
      var mGrad = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
      mGrad.addColorStop(0, 'rgba(100, 100, 100, 0.5)');
      mGrad.addColorStop(1, 'rgba(200, 200, 200, 0)');
      ctx.fillStyle = mGrad;
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};


/* ================================================================
   CREAR TEXTURA THREE.JS DESDE CANVAS
   ================================================================ */
function createThreeTexture(id) {
  var canvas = TextureGen.get(id);
  if (!canvas) return null;
  var texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapU = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}


/* ================================================================
   CONSTRUIR EL SISTEMA SOLAR EN LA ESCENA
   ================================================================ */
function initSolarSystem() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(initSolarSystem, 200); return; }

  var container = document.getElementById('solar-system');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'solar-system';
    scene.appendChild(container);
  }

  // --- SOL ---
  createSun(container);

  // --- PLANETAS ---
  var planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  planetIds.forEach(function (id) {
    createPlanet(container, id);
  });

  // --- LÍNEAS DE ÓRBITA ---
  createOrbitLines(container);

  // --- ESTRELLAS DE FONDO (skybox) ---
  createStarfield(scene);
}

/* ================================================================
   CREAR EL SOL
   ================================================================ */
function createSun(container) {
  var sunGroup = document.createElement('a-entity');
  sunGroup.id = 'sun-group';
  sunGroup.setAttribute('position', '0 1.5 0');

  var sunImg = document.createElement('img');
  sunImg.id = 'tex-sun';
  sunImg.src = TextureGen.get('sun').toDataURL();
  var assets = document.getElementById('assets');
  if (assets) assets.appendChild(sunImg);

  var core = document.createElement('a-entity');
  core.setAttribute('geometry', 'primitive: sphere; radius: 4.5; segmentsWidth: 64; segmentsHeight: 64');
  core.setAttribute('material', 'shader: standard; emissive: #FF5500; emissiveIntensity: 3.5; color: #FF8800; roughness: 0.2; metalness: 0');
  core.setAttribute('glow', 'base: 3.0; amplitude: 0.8; speed: 1.3');
  core.setAttribute('pulse-scale', 'base: 1; amplitude: 0.03; speed: 1.5');
  core.setAttribute('gaze-info', 'planet: sun');
  core.classList.add('clickable');
  sunGroup.appendChild(core);

  var glow1 = document.createElement('a-entity');
  glow1.setAttribute('geometry', 'primitive: sphere; radius: 5.0; segmentsWidth: 32; segmentsHeight: 32');
  glow1.setAttribute('material', 'shader: flat; color: #FF7700; opacity: 0.25; transparent: true; depthWrite: false');
  glow1.setAttribute('pulse-scale', 'base: 1; amplitude: 0.06; speed: 1.8');
  sunGroup.appendChild(glow1);

  var glow2 = document.createElement('a-entity');
  glow2.setAttribute('geometry', 'primitive: sphere; radius: 5.5; segmentsWidth: 32; segmentsHeight: 32');
  glow2.setAttribute('material', 'shader: flat; color: #FFAA33; opacity: 0.12; transparent: true; depthWrite: false');
  glow2.setAttribute('pulse-scale', 'base: 1; amplitude: 0.04; speed: 2.2');
  sunGroup.appendChild(glow2);

  var glow3 = document.createElement('a-entity');
  glow3.setAttribute('geometry', 'primitive: sphere; radius: 6.2; segmentsWidth: 32; segmentsHeight: 32');
  glow3.setAttribute('material', 'shader: flat; color: #FF3300; opacity: 0.04; transparent: true; depthWrite: false');
  sunGroup.appendChild(glow3);

  var sunLight = document.createElement('a-light');
  sunLight.setAttribute('type', 'point');
  sunLight.setAttribute('intensity', '5');
  sunLight.setAttribute('color', '#FFE8C0');
  sunLight.setAttribute('distance', '140');
  sunLight.setAttribute('decay', '1');
  sunGroup.appendChild(sunLight);

  var particles = document.createElement('a-entity');
  particles.setAttribute('solar-particles', 'count: 300; radius: 6; height: 3');
  sunGroup.appendChild(particles);

  container.appendChild(sunGroup);
}

/* ================================================================
   CREAR UN PLANETA CON SU ÓRBITA
   ================================================================ */
function createPlanet(container, planetId) {
  var data = PLANET_DATA[planetId];
  if (!data) return;

  // Entidad órbita (rota alrededor del Sol)
  var orbitEntity = document.createElement('a-entity');
  orbitEntity.setAttribute('orbit', 'speed: ' + data.orbitSpeed + '; from: ' + (Math.random() * 360).toFixed(1));
  orbitEntity.setAttribute('rotation', data.tilt + ' 0 0');
  orbitEntity.classList.add('orbit-' + planetId);

  // Entidad posición (distancia orbital)
  var posEntity = document.createElement('a-entity');
  posEntity.setAttribute('position', data.orbitalRadius + ' 1.5 0');

  // Planeta
  var planet = document.createElement('a-entity');

  // Textura
  var texCanvas = TextureGen.get(planetId);
  var texImg = document.createElement('img');
  texImg.id = 'tex-' + planetId;
  texImg.src = texCanvas.toDataURL();
  var assets = document.getElementById('assets');
  if (assets) assets.appendChild(texImg);

  planet.setAttribute('geometry', 'primitive: sphere; radius: ' + data.size + '; segmentsWidth: 64; segmentsHeight: 64');
  planet.setAttribute('material', 'shader: standard; src: #tex-' + planetId + '; roughness: 0.55; metalness: 0.05; emissive: #333333; emissiveIntensity: 0.3');
  planet.setAttribute('self-rot', 'speed: ' + data.rotSpeed);
  planet.setAttribute('gaze-info', 'planet: ' + planetId);
  planet.classList.add('clickable');
  posEntity.appendChild(planet);

  // Luna terrestre
  if (data.hasMoon) {
    createMoon(posEntity, data.moonData, planetId + '-moon');
  }

  // Lunas de Júpiter
  if (data.hasMoons && data.moons) {
    data.moons.forEach(function (moon, idx) {
      createMoon(posEntity, moon, planetId + '-moon-' + idx);
    });
  }

  // Anillos de Saturno
  if (data.hasRings && !data.ringsFaint) {
    createRings(posEntity, data);
  }

  // Anillo tenue de Urano
  if (data.hasRings && data.ringsFaint) {
    createFaintRing(posEntity, data);
  }

  orbitEntity.appendChild(posEntity);
  container.appendChild(orbitEntity);
}

/* ================================================================
   CREAR LUNA
   ================================================================ */
function createMoon(parentEntity, moonData, moonId) {
  var moonOrbit = document.createElement('a-entity');
  moonOrbit.setAttribute('orbit', 'speed: ' + moonData.speed + '; from: ' + (moonData.from || 0));

  var moonPos = document.createElement('a-entity');
  moonPos.setAttribute('position', moonData.distance + ' 0 0');

  var moonTexCanvas = TextureGen.get('moon');
  var moonTexImg = document.createElement('img');
  moonTexImg.id = 'tex-' + moonId;
  moonTexImg.src = moonTexCanvas.toDataURL();
  var assets = document.getElementById('assets');
  if (assets) {
    // Verificar si ya existe
    if (!document.getElementById('tex-' + moonId)) {
      assets.appendChild(moonTexImg);
    }
  }

  var moon = document.createElement('a-entity');
  moon.setAttribute('geometry', 'primitive: sphere; radius: ' + moonData.size + '; segmentsWidth: 32; segmentsHeight: 32');
  moon.setAttribute('material', 'shader: standard; src: #tex-' + moonId + '; roughness: 0.5; metalness: 0.05; emissive: #222222; emissiveIntensity: 0.25');
  moonPos.appendChild(moon);

  moonOrbit.appendChild(moonPos);
  parentEntity.appendChild(moonOrbit);
}

/* ================================================================
   CREAR ANILLOS DE SATURNO
   ================================================================ */
function createRings(posEntity, data) {
  var ringsContainer = document.createElement('a-entity');
  ringsContainer.setAttribute('rotation', '-22 0 0');

  var ringDefs = [
    { inner: data.size * 1.2,  outer: data.size * 1.55, color: '#E8D090', opacity: 0.75 },
    { inner: data.size * 1.6,  outer: data.size * 2.0,  color: '#D0BA78', opacity: 0.45 },
    { inner: data.size * 1.05, outer: data.size * 1.15, color: '#F2E4B8', opacity: 0.55 }
  ];

  ringDefs.forEach(function (def) {
    var ring = document.createElement('a-ring');
    ring.setAttribute('radius-inner', def.inner);
    ring.setAttribute('radius-outer', def.outer);
    ring.setAttribute('color', def.color);
    ring.setAttribute('side', 'double');
    ring.setAttribute('rotation', '90 0 0');
    ring.setAttribute('opacity', def.opacity);
    ring.setAttribute('material', 'shader: standard; transparent: true; roughness: 0.3; depthWrite: false');
    ring.setAttribute('segments-theta', '96');
    ringsContainer.appendChild(ring);
  });

  posEntity.appendChild(ringsContainer);
}

/* ================================================================
   CREAR ANILLO TENUE DE URANO
   ================================================================ */
function createFaintRing(posEntity, data) {
  var ringContainer = document.createElement('a-entity');
  ringContainer.setAttribute('rotation', '0 0 97');

  var ring = document.createElement('a-ring');
  ring.setAttribute('radius-inner', data.size * 1.15);
  ring.setAttribute('radius-outer', data.size * 1.45);
  ring.setAttribute('color', '#99DDF8');
  ring.setAttribute('side', 'double');
  ring.setAttribute('rotation', '90 0 0');
  ring.setAttribute('opacity', '0.3');
  ring.setAttribute('material', 'shader: standard; transparent: true; roughness: 0.3; depthWrite: false');
  ring.setAttribute('segments-theta', '64');
  ringContainer.appendChild(ring);

  posEntity.appendChild(ringContainer);
}

/* ================================================================
   CREAR LÍNEAS DE ÓRBITA
   ================================================================ */
function createOrbitLines(container) {
  var planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

  planetIds.forEach(function (id) {
    var data = PLANET_DATA[id];
    if (!data) return;
    var r = data.orbitalRadius;

    var ring = document.createElement('a-ring');
    ring.setAttribute('radius-inner', (r - 0.08));
    ring.setAttribute('radius-outer', (r + 0.08));
    ring.setAttribute('color', '#2A3A55');
    ring.setAttribute('side', 'double');
    ring.setAttribute('rotation', '90 0 0');
    ring.setAttribute('position', '0 1.5 0');
    ring.setAttribute('opacity', '0.45');
    ring.setAttribute('material', 'shader: standard; transparent: true; depthWrite: false');
    ring.setAttribute('segments-theta', '128');
    container.appendChild(ring);
  });
}

/* ================================================================
   CREAR SKYBOX DE ESTRELLAS PROCEDURALES
   ================================================================ */
function createStarfield(scene) {
  var container = document.createElement('a-entity');
  container.id = 'starfield';

  // Skybox interno con 6 caras
  var skyGeo = new THREE.SphereGeometry(90, 64, 32);
  var skyCanvas = document.createElement('canvas');
  skyCanvas.width = 1024;
  skyCanvas.height = 512;
  var skyCtx = skyCanvas.getContext('2d');

  // Fondo negro profundo
  skyCtx.fillStyle = '#000008';
  skyCtx.fillRect(0, 0, 1024, 512);

  // Nebulosas sutiles
  for (var n = 0; n < 6; n++) {
    var nx = Math.random() * 1024;
    var ny = Math.random() * 512;
    var nr = Math.random() * 100 + 50;
    var nebGrad = skyCtx.createRadialGradient(nx, ny, 0, nx, ny, nr);
    var nebHue = Math.random() * 360;
    nebGrad.addColorStop(0, 'hsla(' + nebHue + ', 60%, 30%, 0.03)');
    nebGrad.addColorStop(1, 'rgba(0, 0, 8, 0)');
    skyCtx.fillStyle = nebGrad;
    skyCtx.beginPath();
    skyCtx.arc(nx, ny, nr, 0, Math.PI * 2);
    skyCtx.fill();
  }

  // Miles de estrellas
  for (var s = 0; s < 3000; s++) {
    var sx = Math.random() * 1024;
    var sy = Math.random() * 512;
    var sr = Math.random() * 1.2 + 0.2;
    var brightness = Math.floor(Math.random() * 130 + 125);
    var starColor;
    var colorRand = Math.random();
    if (colorRand < 0.1) {
      starColor = 'rgba(150, 180, 255, ' + (Math.random() * 0.5 + 0.5) + ')';
    } else if (colorRand < 0.18) {
      starColor = 'rgba(255, 200, 100, ' + (Math.random() * 0.5 + 0.5) + ')';
    } else if (colorRand < 0.22) {
      starColor = 'rgba(255, 255, 200, ' + (Math.random() * 0.6 + 0.4) + ')';
    } else {
      starColor = 'rgba(255, 255, 255, ' + (Math.random() * 0.4 + 0.3) + ')';
    }
    skyCtx.fillStyle = starColor;
    skyCtx.beginPath();
    skyCtx.arc(sx, sy, sr, 0, Math.PI * 2);
    skyCtx.fill();

    // Brillo extra para estrellas más grandes
    if (sr > 0.8) {
      skyCtx.fillStyle = starColor.replace(/[\d.]+\)$/, (Math.random() * 0.15 + 0.05) + ')');
      skyCtx.beginPath();
      skyCtx.arc(sx, sy, sr * 2.5, 0, Math.PI * 2);
      skyCtx.fill();
    }
  }

  var skyTex = new THREE.CanvasTexture(skyCanvas);
  skyTex.colorSpace = THREE.SRGBColorSpace;
  var skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, depthWrite: false });
  var skyMesh = new THREE.Mesh(skyGeo, skyMat);
  container.object3D.add(skyMesh);

  scene.appendChild(container);

  // Estrellas 3D adicionales en esfera (más cercanas)
  var stars3D = document.createElement('a-entity');
  stars3D.id = 'stars-3d';
  var starFrag = document.createDocumentFragment();
  for (var i = 0; i < 2000; i++) {
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.acos(2 * Math.random() - 1);
    var r = 65 + Math.random() * 25;
    var x = (r * Math.sin(phi) * Math.cos(theta)).toFixed(1);
    var y = (r * Math.sin(phi) * Math.sin(theta)).toFixed(1);
    var z = (r * Math.cos(phi)).toFixed(1);
    var sz = (Math.random() * 0.08 + 0.02).toFixed(3);
    var b = Math.floor(Math.random() * 80 + 170);
    var el = document.createElement('a-entity');
    el.setAttribute('geometry', 'primitive: sphere; radius: ' + sz);
    el.setAttribute('position', x + ' ' + y + ' ' + z);
    el.setAttribute('material', 'shader: flat; color: #' + b.toString(16).repeat(3) + '; depthWrite: false');
    starFrag.appendChild(el);
  }
  stars3D.appendChild(starFrag);
  scene.appendChild(stars3D);
}


/* ================================================================
   CREAR NAVES (3 humanas + 3 extraterrestres)
   ================================================================ */
function createShips() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createShips, 300); return; }

  var shipsContainer = document.getElementById('ships');
  if (!shipsContainer) {
    shipsContainer = document.createElement('a-entity');
    shipsContainer.id = 'ships';
    scene.appendChild(shipsContainer);
  }

  // --- 3 NAVES HUMANAS (estilo angular, blanco/gris) ---
  for (var i = 0; i < 3; i++) {
    createHumanShip(shipsContainer, i);
  }

  // --- 3 NAVES EXTRATERRESTRES (estilo orgánico/redondo, oscuro con glow) ---
  for (var j = 0; j < 3; j++) {
    createAlienShip(shipsContainer, j);
  }
}


/* ================================================================
   NAVE HUMANA (caza estelar)
   ================================================================ */
function createHumanShip(container, index) {
  var ship = document.createElement('a-entity');
  ship.id = 'human-ship-' + index;
  ship.setAttribute('position',
    ((Math.random() - 0.5) * 60) + ' ' +
    (4 + Math.random() * 16) + ' ' +
    ((Math.random() - 0.5) * 60)
  );
  ship.setAttribute('patrol', 'speed: ' + (3.5 + Math.random() * 4) +
    '; bounds: 37 22 37; minY: 3; maxY: 20; turnRate: ' + (1.8 + Math.random() * 1.5));

  // Fuselaje principal (cilindro alargado)
  var body = document.createElement('a-entity');
  body.setAttribute('geometry', 'primitive: cylinder; radius: 0.25; height: 2.5');
  body.setAttribute('position', '0 0 0');
  body.setAttribute('rotation', '90 0 0');
  body.setAttribute('material', 'shader: standard; color: #D0D5E0; roughness: 0.35; metalness: 0.8');
  ship.appendChild(body);

  // Cabina (esfera)
  var cockpit = document.createElement('a-entity');
  cockpit.setAttribute('geometry', 'primitive: sphere; radius: 0.3');
  cockpit.setAttribute('position', '0 0.25 1');
  cockpit.setAttribute('material', 'shader: standard; color: #88CCFF; roughness: 0.2; metalness: 0.1; emissive: #4488CC; emissiveIntensity: 0.6; opacity: 0.75; transparent: true');
  ship.appendChild(cockpit);

  // Nariz (cono)
  var nose = document.createElement('a-entity');
  nose.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.25; radiusTop: 0; height: 0.6');
  nose.setAttribute('position', '0 0 1.55');
  nose.setAttribute('rotation', '-90 0 0');
  nose.setAttribute('material', 'shader: standard; color: #B0B8CC; roughness: 0.3; metalness: 0.85');
  ship.appendChild(nose);

  // Motor (cono trasero)
  var engine = document.createElement('a-entity');
  engine.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.2; radiusTop: 0.05; height: 0.5');
  engine.setAttribute('position', '0 0 -1.3');
  engine.setAttribute('rotation', '90 0 0');
  engine.setAttribute('material', 'shader: standard; color: #555555; roughness: 0.3; metalness: 0.9; emissive: #331111; emissiveIntensity: 0.4');
  ship.appendChild(engine);

  // Ala izquierda
  var wingL = document.createElement('a-entity');
  wingL.setAttribute('geometry', 'primitive: box; width: 0.08; height: 0.5; depth: 1.8');
  wingL.setAttribute('position', '-0.55 0 0.3');
  wingL.setAttribute('rotation', '0 0 10');
  wingL.setAttribute('material', 'shader: standard; color: #9098AA; roughness: 0.3; metalness: 0.8');
  ship.appendChild(wingL);

  // Ala derecha
  var wingR = document.createElement('a-entity');
  wingR.setAttribute('geometry', 'primitive: box; width: 0.08; height: 0.5; depth: 1.8');
  wingR.setAttribute('position', '0.55 0 0.3');
  wingR.setAttribute('rotation', '0 0 -10');
  wingR.setAttribute('material', 'shader: standard; color: #9098AA; roughness: 0.3; metalness: 0.8');
  ship.appendChild(wingR);

  // Estela del motor (luz)
  var trail = document.createElement('a-light');
  trail.setAttribute('type', 'point');
  trail.setAttribute('color', '#FF8844');
  trail.setAttribute('intensity', '0.5');
  trail.setAttribute('distance', '3');
  trail.setAttribute('position', '0 0 -1.8');
  ship.appendChild(trail);

  // Luz de posición
  var navLight = document.createElement('a-light');
  navLight.setAttribute('type', 'point');
  navLight.setAttribute('color', '#FF4444');
  navLight.setAttribute('intensity', '0.2');
  navLight.setAttribute('distance', '2');
  navLight.setAttribute('position', '0 0.3 0');
  ship.appendChild(navLight);

  container.appendChild(ship);
}


/* ================================================================
   NAVE EXTRATERRESTRE (OVNI / orgánico)
   ================================================================ */
function createAlienShip(container, index) {
  var ship = document.createElement('a-entity');
  ship.id = 'alien-ship-' + index;
  ship.setAttribute('position',
    ((Math.random() - 0.5) * 60) + ' ' +
    (4 + Math.random() * 18) + ' ' +
    ((Math.random() - 0.5) * 60)
  );
  ship.setAttribute('patrol', 'speed: ' + (2.5 + Math.random() * 3.5) +
    '; bounds: 37 22 37; minY: 2; maxY: 21; turnRate: ' + (1.5 + Math.random() * 1.2));

  // Disco principal (cilindro achatado)
  var disc = document.createElement('a-entity');
  disc.setAttribute('geometry', 'primitive: cylinder; radius: 1.0; height: 0.35');
  disc.setAttribute('position', '0 0 0');
  disc.setAttribute('material', 'shader: standard; color: #1A1A2E; roughness: 0.2; metalness: 0.95; emissive: #0A0A1A; emissiveIntensity: 0.3');
  ship.appendChild(disc);

  // Cúpula superior
  var dome = document.createElement('a-entity');
  dome.setAttribute('geometry', 'primitive: sphere; radius: 0.5; segmentsWidth: 32; segmentsHeight: 16; phiStart: 0; phiLength: 360; thetaStart: 0; thetaLength: 90');
  dome.setAttribute('position', '0 0.15 0');
  dome.setAttribute('material', 'shader: standard; color: #223344; roughness: 0.15; metalness: 0.9; opacity: 0.6; transparent: true');
  ship.appendChild(dome);

  // Anillo de luces (torus)
  var ring = document.createElement('a-entity');
  ring.setAttribute('geometry', 'primitive: torus; radius: 0.95; radiusTubular: 0.06; segmentsTubular: 16');
  ring.setAttribute('position', '0 0.02 0');
  ring.setAttribute('material', 'shader: standard; color: #44FF88; roughness: 0.2; metalness: 0.1; emissive: #44FF88; emissiveIntensity: 2.5');
  ring.setAttribute('emissive-pulse', 'color: #44FF88; min: 1.8; max: 3.2; speed: 2.5');
  ship.appendChild(ring);

  // Luces inferiores (pequeñas esferas)
  for (var i = 0; i < 4; i++) {
    var angle = (i / 4) * Math.PI * 2;
    var light = document.createElement('a-entity');
    light.setAttribute('geometry', 'primitive: sphere; radius: 0.08');
    light.setAttribute('position',
      (Math.cos(angle) * 0.7).toFixed(2) + ' -0.18 ' + (Math.sin(angle) * 0.7).toFixed(2)
    );
    light.setAttribute('material', 'shader: standard; emissive: #FF4488; emissiveIntensity: 2; color: #FF4488; roughness: 0.1; metalness: 0');
    light.setAttribute('emissive-pulse', 'color: #FF4488; min: 1.5; max: 3; speed: ' + (1.8 + i * 0.4));
    ship.appendChild(light);
  }

  // Antenas / tentáculos
  for (var j = 0; j < 3; j++) {
    var ang = (j / 3) * Math.PI * 2 + 0.5;
    var tentacle = document.createElement('a-entity');
    tentacle.setAttribute('geometry', 'primitive: cylinder; radius: 0.04; height: 0.6');
    tentacle.setAttribute('position',
      (Math.cos(ang) * 0.85).toFixed(2) + ' -0.5 ' + (Math.sin(ang) * 0.85).toFixed(2)
    );
    tentacle.setAttribute('rotation', '15 ' + (j * 120) + ' 0');
    tentacle.setAttribute('material', 'shader: standard; color: #1A1A2E; roughness: 0.2; metalness: 0.9');
    ship.appendChild(tentacle);

    // Luz en punta del tentáculo
    var tip = document.createElement('a-entity');
    tip.setAttribute('geometry', 'primitive: sphere; radius: 0.06');
    tip.setAttribute('position',
      (Math.cos(ang) * 0.85).toFixed(2) + ' -0.8 ' + (Math.sin(ang) * 0.85).toFixed(2)
    );
    tip.setAttribute('material', 'shader: standard; emissive: #88FF44; emissiveIntensity: 2.5; color: #88FF44; roughness: 0.1');
    tip.setAttribute('emissive-pulse', 'color: #88FF44; min: 1.5; max: 3.5; speed: ' + (2 + j * 0.6));
    ship.appendChild(tip);
  }

  // Núcleo central brillante
  var core = document.createElement('a-entity');
  core.setAttribute('geometry', 'primitive: sphere; radius: 0.18');
  core.setAttribute('position', '0 0 0');
  core.setAttribute('material', 'shader: standard; emissive: #FFFFFF; emissiveIntensity: 3; color: #CCFFEE; roughness: 0.1; metalness: 0');
  core.setAttribute('emissive-pulse', 'color: #CCFFEE; min: 2.5; max: 4; speed: 3');
  ship.appendChild(core);

  container.appendChild(ship);
}


/* ================================================================
   CINTURÓN DE ASTEROIDES (entre Marte y Júpiter)
   ================================================================ */
function createAsteroidBelt() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createAsteroidBelt, 300); return; }

  var container = document.getElementById('asteroid-belt');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'asteroid-belt';
    scene.appendChild(container);
  }

  var innerR = 22;
  var outerR = 25;
  var count = 600;
  var frag = document.createDocumentFragment();

  var rockColors = [
    '#887766', '#998877', '#776655', '#AA9988',
    '#665544', '#BBAA99', '#887766', '#998877',
    '#777766', '#666655', '#999988', '#888877',
    '#555555', '#666666', '#777777'
  ];

  for (var i = 0; i < count; i++) {
    var angle = Math.random() * Math.PI * 2;
    var radius = innerR + Math.random() * (outerR - innerR);
    var x = Math.cos(angle) * radius;
    var z = Math.sin(angle) * radius;
    var y = 1.5 + (Math.random() - 0.5) * 3.5;

    var size = 0.03 + Math.random() * 0.22;
    var color = rockColors[Math.floor(Math.random() * rockColors.length)];

    var rock = document.createElement('a-entity');
    rock.setAttribute('position', x.toFixed(2) + ' ' + y.toFixed(2) + ' ' + z.toFixed(2));
    rock.setAttribute('rotation',
      (Math.random() * 360).toFixed(0) + ' ' +
      (Math.random() * 360).toFixed(0) + ' ' +
      (Math.random() * 360).toFixed(0)
    );

    if (Math.random() > 0.5) {
      rock.setAttribute('geometry', 'primitive: icosahedron; radius: ' + size.toFixed(3) + '; detail: 0');
    } else {
      rock.setAttribute('geometry', 'primitive: tetrahedron; radius: ' + size.toFixed(3));
    }

    var roughness = 0.5 + Math.random() * 0.5;
    rock.setAttribute('material', 'shader: standard; color: ' + color + '; roughness: ' + roughness.toFixed(2) + '; metalness: ' + (Math.random() * 0.3).toFixed(2));

    frag.appendChild(rock);
  }

  container.appendChild(frag);

  // Partículas de polvo en el cinturón
  var dustCount = 800;
  var dustGeo = new THREE.BufferGeometry();
  var dustPositions = new Float32Array(dustCount * 3);
  var dustColors = new Float32Array(dustCount * 3);

  for (var j = 0; j < dustCount; j++) {
    var dAngle = Math.random() * Math.PI * 2;
    var dRadius = innerR + Math.random() * (outerR - innerR);
    dustPositions[j * 3] = Math.cos(dAngle) * dRadius;
    dustPositions[j * 3 + 1] = 1.5 + (Math.random() - 0.5) * 3;
    dustPositions[j * 3 + 2] = Math.sin(dAngle) * dRadius;
    dustColors[j * 3] = 0.8 + Math.random() * 0.2;
    dustColors[j * 3 + 1] = 0.7 + Math.random() * 0.2;
    dustColors[j * 3 + 2] = 0.6 + Math.random() * 0.2;
  }

  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

  var dustMat = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.5
  });

  var dustPoints = new THREE.Points(dustGeo, dustMat);
  container.object3D.add(dustPoints);

  // El cinturón rota lentamente
  container.setAttribute('orbit', 'speed: 0.015; from: 0');
}


/* ================================================================
   CREAR COMETAS
   ================================================================ */
function createComets() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createComets, 300); return; }

  var container = document.getElementById('comets');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'comets';
    scene.appendChild(container);
  }

  var cometColors = [
    { coma: '#FFEEAA', tail: '#FFCC66', inner: '#FFFFFF' },
    { coma: '#AAEEFF', tail: '#88CCFF', inner: '#EEFFFF' },
    { coma: '#FFCCDD', tail: '#FFAACC', inner: '#FFEEF0' },
    { coma: '#DDFFCC', tail: '#BBFFAA', inner: '#EEFFEE' },
    { coma: '#FFDD88', tail: '#FFBB44', inner: '#FFF8E0' },
    { coma: '#CCAAFF', tail: '#AA88FF', inner: '#F0E8FF' },
    { coma: '#88FFDD', tail: '#66FFBB', inner: '#E0FFF8' },
    { coma: '#FF88AA', tail: '#FF6688', inner: '#FFE0E8' },
    { coma: '#88CCFF', tail: '#66AAFF', inner: '#E0EEFF' },
    { coma: '#FFBB66', tail: '#FF9933', inner: '#FFF0DD' }
  ];

  for (var i = 0; i < 10; i++) {
    var c = cometColors[i % cometColors.length];
    var comet = document.createElement('a-entity');
    comet.id = 'comet-' + i;
    comet.setAttribute('position',
      ((Math.random() - 0.5) * 60) + ' ' +
      (6 + Math.random() * 16) + ' ' +
      ((Math.random() - 0.5) * 60)
    );
    comet.setAttribute('comet',
      'speed: ' + (5 + Math.random() * 7) +
      '; bounds: 37 22 37; trailLen: 50'
    );
    comet.setAttribute('gaze-info', 'planet: comet');
    comet.classList.add('clickable');

    // Núcleo (esfera brillante)
    var nucleus = document.createElement('a-entity');
    nucleus.setAttribute('geometry', 'primitive: sphere; radius: 0.2; segmentsWidth: 16; segmentsHeight: 16');
    nucleus.setAttribute('material', 'shader: standard; emissive: ' + c.inner + '; emissiveIntensity: 2.5; color: ' + c.coma + '; roughness: 0.1; metalness: 0');
    comet.appendChild(nucleus);

    // Coma (halo alrededor del núcleo)
    var coma = document.createElement('a-entity');
    coma.setAttribute('geometry', 'primitive: sphere; radius: 0.5; segmentsWidth: 16; segmentsHeight: 16');
    coma.setAttribute('material', 'shader: standard; color: ' + c.coma + '; opacity: 0.35; transparent: true; emissive: ' + c.coma + '; emissiveIntensity: 0.8; roughness: 0.5; depthWrite: false');
    comet.appendChild(coma);

    // Halo externo
    var halo = document.createElement('a-entity');
    halo.setAttribute('geometry', 'primitive: sphere; radius: 0.75; segmentsWidth: 16; segmentsHeight: 16');
    halo.setAttribute('material', 'shader: standard; color: ' + c.tail + '; opacity: 0.15; transparent: true; emissive: ' + c.tail + '; emissiveIntensity: 0.4; roughness: 0.5; depthWrite: false');
    comet.appendChild(halo);

    // Luz puntual
    var light = document.createElement('a-light');
    light.setAttribute('type', 'point');
    light.setAttribute('color', c.coma);
    light.setAttribute('intensity', '1.5');
    light.setAttribute('distance', '8');
    light.setAttribute('decay', '1.5');
    comet.appendChild(light);

    container.appendChild(comet);
  }
}


/* ================================================================
   EXPORTAR DATOS PARA USO EN OTROS MÓDULOS
   ================================================================ */
window.PLANET_DATA = PLANET_DATA;
window.TextureGen = TextureGen;
window.initSolarSystem = initSolarSystem;
window.createShips = createShips;
window.createComets = createComets;
window.createAsteroidBelt = createAsteroidBelt;
window.createBlackHole = createBlackHole;
window.createNebulae = createNebulae;
window.createAstronaut = createAstronaut;
window.createMilkyWay = createMilkyWay;
window.createSupernova = createSupernova;
window.createPulsar = createPulsar;
window.createWormhole = createWormhole;
window.createTwinklingStars = createTwinklingStars;


/* ================================================================
   CREAR ESTRELLAS QUE PARPADEAN POR TODO EL MUSEO
   ================================================================ */
function createTwinklingStars() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createTwinklingStars, 300); return; }

  var container = document.getElementById('twinkling-stars');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'twinkling-stars';
    scene.appendChild(container);
  }

  var count = 500;
  var frag = document.createDocumentFragment();
  var bounds = 38;

  for (var i = 0; i < count; i++) {
    var x = (Math.random() - 0.5) * bounds * 2;
    var y = 0.3 + Math.random() * 22;
    var z = (Math.random() - 0.5) * bounds * 2;

    // Evitar el centro (zona del sistema solar)
    var distCenter = Math.sqrt(x * x + z * z);
    if (distCenter < 10 && y < 8) continue;

    var size = (Math.random() * 0.06 + 0.02).toFixed(3);
    var speed = (0.8 + Math.random() * 3).toFixed(1);
    var phase = Math.random() * Math.PI * 2;

    // Color: mayormente blanco/azul, algunos amarillos/rojos
    var colorRand = Math.random();
    var color;
    if (colorRand < 0.7) {
      color = '#CCDDFF';
    } else if (colorRand < 0.85) {
      color = '#FFEEBB';
    } else if (colorRand < 0.95) {
      color = '#FFCCCC';
    } else {
      color = '#CCFFCC';
    }

    var star = document.createElement('a-entity');
    star.setAttribute('geometry', 'primitive: sphere; radius: ' + size + '; segmentsWidth: 6; segmentsHeight: 6');
    star.setAttribute('position', x.toFixed(1) + ' ' + y.toFixed(1) + ' ' + z.toFixed(1));
    star.setAttribute('material', 'shader: standard; emissive: ' + color + '; emissiveIntensity: 0; color: ' + color + '; roughness: 0.3; metalness: 0; depthWrite: false');
    star.setAttribute('emissive-pulse', 'color: ' + color + '; min: 0; max: ' + (1 + Math.random() * 2).toFixed(1) + '; speed: ' + speed);
    star.setAttribute('data-phase', phase.toFixed(2));
    frag.appendChild(star);
  }

  container.appendChild(frag);
}


/* ================================================================
   CREAR PÚLSAR (estrella de neutrones giratoria con haces)
   ================================================================ */
function createPulsar() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createPulsar, 300); return; }

  var container = document.getElementById('pulsar');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'pulsar';
    scene.appendChild(container);
  }

  var pulsar = document.createElement('a-entity');
  pulsar.setAttribute('position', '28 6 28');

  // === ESTRELLA DE NEUTRONES (esfera pequeña y densa) ===
  var star = document.createElement('a-entity');
  star.setAttribute('geometry', 'primitive: sphere; radius: 0.5; segmentsWidth: 32; segmentsHeight: 32');
  star.setAttribute('material', 'shader: standard; emissive: #EEEEFF; emissiveIntensity: 3; color: #CCDDFF; roughness: 0; metalness: 0');
  star.setAttribute('emissive-pulse', 'color: #FFFFFF; min: 2.5; max: 4; speed: 6');
  pulsar.appendChild(star);

  // Corona azul
  var corona = document.createElement('a-entity');
  corona.setAttribute('geometry', 'primitive: sphere; radius: 0.75; segmentsWidth: 32; segmentsHeight: 32');
  corona.setAttribute('material', 'shader: standard; color: #6688FF; opacity: 0.3; transparent: true; roughness: 0.3; metalness: 0; emissive: #4466FF; emissiveIntensity: 1.5; depthWrite: false');
  pulsar.appendChild(corona);

  // === HACES DE LUZ (chorros polares) ===
  function createBeam(yDir) {
    var beamGroup = document.createElement('a-entity');
    beamGroup.setAttribute('position', '0 ' + (yDir * 0.5) + ' 0');

    // Haz principal
    var beam1 = document.createElement('a-entity');
    beam1.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.15; radiusTop: 0.01; height: 8; segmentsRadial: 12');
    beam1.setAttribute('position', '0 ' + (yDir * 4.2) + ' 0');
    beam1.setAttribute('material', 'shader: standard; emissive: #88AAFF; emissiveIntensity: 2; color: #AACCFF; roughness: 0.1; metalness: 0; opacity: 0.5; transparent: true; depthWrite: false');
    beamGroup.appendChild(beam1);

    // Haz interior más brillante
    var beam2 = document.createElement('a-entity');
    beam2.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.08; radiusTop: 0.005; height: 7; segmentsRadial: 8');
    beam2.setAttribute('position', '0 ' + (yDir * 3.7) + ' 0');
    beam2.setAttribute('material', 'shader: standard; emissive: #FFFFFF; emissiveIntensity: 2.5; color: #FFFFFF; roughness: 0; metalness: 0; opacity: 0.4; transparent: true; depthWrite: false');
    beamGroup.appendChild(beam2);

    return beamGroup;
  }

  pulsar.appendChild(createBeam(1));   // haz superior
  pulsar.appendChild(createBeam(-1));  // haz inferior

  // === PARTÍCULAS EN LOS HACES ===
  var beamParticles = 500;
  var bpGeo = new THREE.BufferGeometry();
  var bpPos = new Float32Array(beamParticles * 3);
  var bpCol = new Float32Array(beamParticles * 3);
  var bpData = [];

  for (var i = 0; i < beamParticles; i++) {
    var yDir = Math.random() > 0.5 ? 1 : -1;
    var dist = 0.5 + Math.random() * 7.5;
    var spread = (Math.random() - 0.5) * (0.1 + dist * 0.04);
    bpPos[i * 3] = spread;
    bpPos[i * 3 + 1] = yDir * dist;
    bpPos[i * 3 + 2] = (Math.random() - 0.5) * (0.1 + dist * 0.04);
    bpCol[i * 3] = 0.6 + Math.random() * 0.4;
    bpCol[i * 3 + 1] = 0.7 + Math.random() * 0.3;
    bpCol[i * 3 + 2] = 1;
    bpData.push({ yDir: yDir, maxDist: dist, speed: 0.5 + Math.random() * 2, phase: Math.random() * Math.PI * 2 });
  }

  bpGeo.setAttribute('position', new THREE.BufferAttribute(bpPos, 3));
  bpGeo.setAttribute('color', new THREE.BufferAttribute(bpCol, 3));

  var bpMat = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.7
  });

  var bpPoints = new THREE.Points(bpGeo, bpMat);
  pulsar.object3D.add(bpPoints);

  // Animación de partículas en los haces
  (function beamTick() {
    var arr = bpGeo.attributes.position.array;
    for (var i = 0; i < beamParticles; i++) {
      var bd = bpData[i];
      bd.phase += bd.speed * 0.016 * 0.8;
      if (bd.phase > Math.PI * 2) bd.phase -= Math.PI * 2;
      var t = (Math.sin(bd.phase) * 0.5 + 0.5);
      arr[i * 3 + 1] = bd.yDir * (0.5 + t * bd.maxDist);
    }
    bpGeo.attributes.position.needsUpdate = true;
    requestAnimationFrame(beamTick);
  })();

  // === ANILLOS MAGNÉTICOS (líneas de campo) ===
  for (var r = 0; r < 5; r++) {
    var ring = document.createElement('a-torus');
    ring.setAttribute('radius', (1.0 + r * 0.5).toString());
    ring.setAttribute('radius-tubular', '0.015');
    ring.setAttribute('rotation', '90 0 0');
    ring.setAttribute('segments-tubular', '8');
    ring.setAttribute('material', 'shader: standard; emissive: #6688FF; emissiveIntensity: ' + (1.2 - r * 0.2) + '; color: #6688FF; roughness: 0.2; metalness: 0; opacity: ' + (0.5 - r * 0.08) + '; transparent: true; depthWrite: false');
    pulsar.appendChild(ring);
  }

  // Rotación rápida del púlsar
  pulsar.setAttribute('self-rot', 'speed: 5');

  // Luz
  var pLight = document.createElement('a-light');
  pLight.setAttribute('type', 'point');
  pLight.setAttribute('color', '#AACCFF');
  pLight.setAttribute('intensity', '2.5');
  pLight.setAttribute('distance', '20');
  pLight.setAttribute('decay', '1.2');
  pulsar.appendChild(pLight);

  container.appendChild(pulsar);
}


/* ================================================================
   CREAR AGUJERO DE GUSANO (túnel espaciotemporal)
   ================================================================ */
function createWormhole() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createWormhole, 300); return; }

  var container = document.getElementById('wormhole');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'wormhole';
    scene.appendChild(container);
  }

  var wh = document.createElement('a-entity');
  wh.setAttribute('position', '-15 -2 -35');
  wh.setAttribute('rotation', '80 0 0');

  // === BOCA DEL AGUJERO DE GUSANO (anillo exterior) ===
  var mouthOuter = document.createElement('a-torus');
  mouthOuter.setAttribute('radius', '3.0');
  mouthOuter.setAttribute('radius-tubular', '0.25');
  mouthOuter.setAttribute('rotation', '90 0 0');
  mouthOuter.setAttribute('segments-tubular', '24');
  mouthOuter.setAttribute('material', 'shader: standard; emissive: #4488FF; emissiveIntensity: 2.5; color: #66AAFF; roughness: 0.15; metalness: 0.1');
  mouthOuter.setAttribute('emissive-pulse', 'color: #4488FF; min: 2; max: 3.5; speed: 2');
  wh.appendChild(mouthOuter);

  // Boca interior
  var mouthInner = document.createElement('a-torus');
  mouthInner.setAttribute('radius', '2.7');
  mouthInner.setAttribute('radius-tubular', '0.12');
  mouthInner.setAttribute('rotation', '90 0 0');
  mouthInner.setAttribute('segments-tubular', '16');
  mouthInner.setAttribute('material', 'shader: standard; emissive: #FFFFFF; emissiveIntensity: 3; color: #CCEEFF; roughness: 0.1; metalness: 0');
  mouthInner.setAttribute('emissive-pulse', 'color: #FFFFFF; min: 2.5; max: 4; speed: 3.5');
  wh.appendChild(mouthInner);

  // === TÚNEL INTERIOR (capas de cilindros hacia adentro) ===
  var tunnelLayers = [
    { radius: 2.5, height: 6, color: '#4488FF', opacity: 0.25, emissive: '#4488FF', eInt: 1.5 },
    { radius: 1.8, height: 5, color: '#88BBFF', opacity: 0.2, emissive: '#88BBFF', eInt: 1.8 },
    { radius: 1.0, height: 4, color: '#CCEEFF', opacity: 0.15, emissive: '#CCEEFF', eInt: 2 },
    { radius: 0.4, height: 3, color: '#FFFFFF', opacity: 0.12, emissive: '#FFFFFF', eInt: 2.5 },
    { radius: 0.1, height: 2, color: '#FFFFFF', opacity: 0.1, emissive: '#FFFFFF', eInt: 3 }
  ];

  tunnelLayers.forEach(function (layer, idx) {
    var cyl = document.createElement('a-entity');
    cyl.setAttribute('geometry', 'primitive: cylinder; radius: ' + layer.radius + '; height: ' + layer.height + '; segmentsRadial: 32; openEnded: true');
    cyl.setAttribute('material', 'shader: standard; color: ' + layer.color + '; opacity: ' + layer.opacity + '; transparent: true; roughness: 0.4; metalness: 0; emissive: ' + layer.emissive + '; emissiveIntensity: ' + layer.eInt + '; depthWrite: false; side: double');
    wh.appendChild(cyl);
  });

  // === PARTÍCULAS ESPIRALANDO HACIA EL CENTRO ===
  var whParticleCount = 800;
  var whGeo = new THREE.BufferGeometry();
  var whPos = new Float32Array(whParticleCount * 3);
  var whCol = new Float32Array(whParticleCount * 3);
  var whData = [];

  for (var i = 0; i < whParticleCount; i++) {
    var inner = Math.random() > 0.3;
    var maxR = inner ? 1.5 : 3.5;
    var angle = Math.random() * Math.PI * 2;
    var r = 0.3 + Math.random() * maxR;
    var y = (Math.random() - 0.5) * 6;
    whPos[i * 3] = Math.cos(angle) * r;
    whPos[i * 3 + 1] = y;
    whPos[i * 3 + 2] = Math.sin(angle) * r;
    whCol[i * 3] = 0.5 + Math.random() * 0.5;
    whCol[i * 3 + 1] = 0.6 + Math.random() * 0.4;
    whCol[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    whData.push({
      r: r, angle: angle, maxR: maxR, y: y,
      speed: 0.3 + Math.random() * 1.5,
      ySpeed: (Math.random() - 0.5) * 0.3
    });
  }

  whGeo.setAttribute('position', new THREE.BufferAttribute(whPos, 3));
  whGeo.setAttribute('color', new THREE.BufferAttribute(whCol, 3));

  var whSprite = document.createElement('canvas');
  whSprite.width = 16; whSprite.height = 16;
  var whCtx = whSprite.getContext('2d');
  var whGrad = whCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
  whGrad.addColorStop(0, 'rgba(255,255,255,1)');
  whGrad.addColorStop(0.4, 'rgba(200,220,255,0.5)');
  whGrad.addColorStop(1, 'rgba(0,0,0,0)');
  whCtx.fillStyle = whGrad;
  whCtx.fillRect(0, 0, 16, 16);
  var whTex = new THREE.CanvasTexture(whSprite);

  var whMat = new THREE.PointsMaterial({
    size: 0.2,
    map: whTex,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.8
  });

  var whPoints = new THREE.Points(whGeo, whMat);
  wh.object3D.add(whPoints);

  // Animación de partículas en espiral
  (function whTick() {
    var arr = whGeo.attributes.position.array;
    for (var i = 0; i < whParticleCount; i++) {
      var wd = whData[i];
      wd.angle += wd.speed * 0.016;
      wd.r += (wd.maxR * 0.3 - wd.r) * 0.01;
      wd.y += wd.ySpeed * 0.016;
      if (Math.abs(wd.y) > 3) wd.ySpeed *= -1;
      if (wd.r < 0.05) wd.r = wd.maxR;
      arr[i * 3] = Math.cos(wd.angle) * wd.r;
      arr[i * 3 + 1] = wd.y;
      arr[i * 3 + 2] = Math.sin(wd.angle) * wd.r;
    }
    whGeo.attributes.position.needsUpdate = true;
    requestAnimationFrame(whTick);
  })();

  // Luz
  var whLight = document.createElement('a-light');
  whLight.setAttribute('type', 'point');
  whLight.setAttribute('color', '#88BBFF');
  whLight.setAttribute('intensity', '3');
  whLight.setAttribute('distance', '22');
  whLight.setAttribute('decay', '1');
  wh.appendChild(whLight);

  container.appendChild(wh);
}


/* ================================================================
   CREAR SUPERNOVA (explosión estelar continua con partículas)
   ================================================================ */
function createSupernova() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createSupernova, 300); return; }

  var container = document.getElementById('supernova');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'supernova';
    scene.appendChild(container);
  }

  var snGroup = document.createElement('a-entity');
  snGroup.setAttribute('position', '-28 6 28');

  // === NÚCLEO CENTRAL (esfera pulsante) ===
  var core = document.createElement('a-entity');
  core.setAttribute('geometry', 'primitive: sphere; radius: 0.6; segmentsWidth: 32; segmentsHeight: 32');
  core.setAttribute('material', 'shader: standard; emissive: #FFFFFF; emissiveIntensity: 4; color: #FFFFFF; roughness: 0; metalness: 0');
  core.setAttribute('emissive-pulse', 'color: #FFFFFF; min: 3; max: 5; speed: 4');
  core.setAttribute('pulse-scale', 'base: 1; amplitude: 0.15; speed: 4');
  snGroup.appendChild(core);

  // Corona interior (capa naranja/blanca caliente)
  var corona1 = document.createElement('a-entity');
  corona1.setAttribute('geometry', 'primitive: sphere; radius: 1.0; segmentsWidth: 32; segmentsHeight: 32');
  corona1.setAttribute('material', 'shader: standard; color: #FFCC88; opacity: 0.35; transparent: true; roughness: 0.3; metalness: 0; emissive: #FF8800; emissiveIntensity: 2; depthWrite: false');
  corona1.setAttribute('pulse-scale', 'base: 1; amplitude: 0.12; speed: 3.5');
  snGroup.appendChild(corona1);

  // Corona media (naranja/roja)
  var corona2 = document.createElement('a-entity');
  corona2.setAttribute('geometry', 'primitive: sphere; radius: 1.6; segmentsWidth: 32; segmentsHeight: 32');
  corona2.setAttribute('material', 'shader: standard; color: #FF6644; opacity: 0.2; transparent: true; roughness: 0.4; metalness: 0; emissive: #FF4400; emissiveIntensity: 1.2; depthWrite: false');
  corona2.setAttribute('pulse-scale', 'base: 1; amplitude: 0.08; speed: 2.8');
  snGroup.appendChild(corona2);

  // Corona externa (roja/azul)
  var corona3 = document.createElement('a-entity');
  corona3.setAttribute('geometry', 'primitive: sphere; radius: 2.2; segmentsWidth: 32; segmentsHeight: 32');
  corona3.setAttribute('material', 'shader: standard; color: #FF3322; opacity: 0.1; transparent: true; roughness: 0.5; metalness: 0; emissive: #CC2200; emissiveIntensity: 0.6; depthWrite: false');
  corona3.setAttribute('pulse-scale', 'base: 1; amplitude: 0.05; speed: 2.2');
  snGroup.appendChild(corona3);

  // === ONDAS DE CHOQUE (anillos expansivos) ===
  for (var w = 0; w < 3; w++) {
    var wave = document.createElement('a-torus');
    wave.setAttribute('radius', (2.5 + w * 1.5).toString());
    wave.setAttribute('radius-tubular', (0.04 + w * 0.03).toString());
    wave.setAttribute('rotation', (w * 25) + ' ' + (w * 30) + ' 0');
    wave.setAttribute('segments-tubular', '8');
    wave.setAttribute('material', 'shader: standard; emissive: #FF8844; emissiveIntensity: ' + (1.0 - w * 0.25) + '; color: #FF8844; roughness: 0.2; metalness: 0; opacity: ' + (0.6 - w * 0.15) + '; transparent: true; depthWrite: false');
    wave.setAttribute('pulse-scale', 'base: ' + (1 - w * 0.15) + '; amplitude: 0.2; speed: ' + (2 + w));
    snGroup.appendChild(wave);
  }

  // === PARTÍCULAS DE EXPLOSIÓN ===
  var partCount = 1200;
  var partGeo = new THREE.BufferGeometry();
  var partPositions = new Float32Array(partCount * 3);
  var partColors = new Float32Array(partCount * 3);
  var partSizes = new Float32Array(partCount);

  // Datos por partícula para animación
  var particleData = [];
  for (var i = 0; i < partCount; i++) {
    var theta = Math.random() * Math.PI * 2;
    var phi = Math.acos(2 * Math.random() - 1);
    var speed = 1.5 + Math.random() * 6;
    var maxRadius = 3 + Math.random() * 7;
    var phase = Math.random() * Math.PI * 2;

    particleData.push({
      theta: theta,
      phi: phi,
      speed: speed,
      maxR: maxRadius,
      phase: phase,
      baseR: 1.5
    });

    partPositions[i * 3] = 0;
    partPositions[i * 3 + 1] = 0;
    partPositions[i * 3 + 2] = 0;

    // Color: blanco→naranja→rojo→azul según distancia/speed
    var t = speed / 7;
    if (t < 0.3) {
      partColors[i * 3] = 1;
      partColors[i * 3 + 1] = 0.9;
      partColors[i * 3 + 2] = 0.7;
    } else if (t < 0.6) {
      partColors[i * 3] = 1;
      partColors[i * 3 + 1] = 0.5;
      partColors[i * 3 + 2] = 0.2;
    } else {
      partColors[i * 3] = 0.3;
      partColors[i * 3 + 1] = 0.4;
      partColors[i * 3 + 2] = 1;
    }
    partSizes[i] = 0.04 + Math.random() * 0.12;
  }

  partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
  partGeo.setAttribute('color', new THREE.BufferAttribute(partColors, 3));
  partGeo.setAttribute('size', new THREE.BufferAttribute(partSizes, 1));

  // Sprite textura para partículas
  var spriteCan = document.createElement('canvas');
  spriteCan.width = 32;
  spriteCan.height = 32;
  var spCtx = spriteCan.getContext('2d');
  var spGrad = spCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  spGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  spGrad.addColorStop(0.15, 'rgba(255, 255, 200, 0.7)');
  spGrad.addColorStop(0.4, 'rgba(255, 150, 50, 0.2)');
  spGrad.addColorStop(0.7, 'rgba(100, 50, 200, 0.05)');
  spGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  spCtx.fillStyle = spGrad;
  spCtx.fillRect(0, 0, 32, 32);
  var spTex = new THREE.CanvasTexture(spriteCan);

  var partMat = new THREE.PointsMaterial({
    size: 0.25,
    map: spTex,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.8
  });

  var particles = new THREE.Points(partGeo, partMat);
  snGroup.object3D.add(particles);

  // Animación de partículas
  var tickFn = function (time, delta) {
    var dt = Math.min(delta / 1000, 0.1);
    if (dt <= 0) return;

    var posArr = partGeo.attributes.position.array;
    var colArr = partGeo.attributes.color.array;
    var sizArr = partGeo.attributes.size.array;

    for (var i = 0; i < partCount; i++) {
      var pd = particleData[i];
      pd.phase += pd.speed * dt * 0.6;
      if (pd.phase > Math.PI * 2) pd.phase -= Math.PI * 2;

      var r = pd.baseR + Math.abs(Math.sin(pd.phase)) * pd.maxR;
      var fade = Math.abs(Math.sin(pd.phase));

      posArr[i * 3] = Math.sin(pd.phi) * Math.cos(pd.theta) * r;
      posArr[i * 3 + 1] = Math.sin(pd.phi) * Math.sin(pd.theta) * r;
      posArr[i * 3 + 2] = Math.cos(pd.phi) * r;

      colArr[i * 3 + 1] *= (0.7 + fade * 0.3);
      colArr[i * 3 + 2] *= (0.5 + fade * 0.5);

      sizArr[i] = (0.04 + Math.random() * 0.01) + fade * 0.15;
    }
    partGeo.attributes.position.needsUpdate = true;
    partGeo.attributes.color.needsUpdate = true;
    partGeo.attributes.size.needsUpdate = true;

    requestAnimationFrame(function () { tickFn(performance.now(), 16); });
  };

  // Iniciar animación
  snGroup.addEventListener('loaded', function () {
    tickFn(performance.now(), 16);
  });
  // Fallback si loaded no dispara
  setTimeout(function () { tickFn(performance.now(), 16); }, 500);

  // === FILAMENTOS DE GAS (arcos brillantes) ===
  for (var f = 0; f < 6; f++) {
    var fAngle = (f / 6) * Math.PI * 2;
    var filament = document.createElement('a-torus');
    filament.setAttribute('radius', (2.8 + Math.random() * 1.5).toString());
    filament.setAttribute('radius-tubular', (0.02 + Math.random() * 0.04).toString());
    filament.setAttribute('segments-tubular', '8');
    filament.setAttribute('arc', (120 + Math.random() * 120).toString());
    filament.setAttribute('rotation', (Math.random() * 60).toFixed(0) + ' ' + (fAngle * 180 / Math.PI).toFixed(0) + ' ' + (Math.random() * 30).toFixed(0));
    filament.setAttribute('material', 'shader: standard; emissive: #FF4422; emissiveIntensity: 0.8; color: #FF4422; roughness: 0.2; metalness: 0; opacity: 0.3; transparent: true; depthWrite: false');
    filament.setAttribute('pulse-scale', 'base: 1; amplitude: 0.1; speed: ' + (1.5 + Math.random()));
    snGroup.appendChild(filament);
  }

  // === LUZ DE LA SUPERNOVA ===
  var snLight = document.createElement('a-light');
  snLight.setAttribute('type', 'point');
  snLight.setAttribute('color', '#FFCCAA');
  snLight.setAttribute('intensity', '4');
  snLight.setAttribute('distance', '25');
  snLight.setAttribute('decay', '1');
  snGroup.appendChild(snLight);

  // Segunda luz (flash azulado)
  var snLight2 = document.createElement('a-light');
  snLight2.setAttribute('type', 'point');
  snLight2.setAttribute('color', '#CCDDFF');
  snLight2.setAttribute('intensity', '1.5');
  snLight2.setAttribute('distance', '20');
  snLight2.setAttribute('decay', '1.2');
  snGroup.appendChild(snLight2);

  container.appendChild(snGroup);
}


/* ================================================================
   CREAR VÍA LÁCTEA (galaxia espiral flotante)
   ================================================================ */
function createMilkyWay() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createMilkyWay, 300); return; }

  var container = document.getElementById('milky-way');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'milky-way';
    scene.appendChild(container);
  }

  var galaxy = document.createElement('a-entity');
  galaxy.setAttribute('position', '0 16 -30');
  galaxy.setAttribute('rotation', '55 15 0');
  galaxy.setAttribute('self-rot', 'speed: 0.02');

  // === PARTÍCULAS DE LA GALAXIA ===
  var totalParticles = 8000;
  var geo = new THREE.BufferGeometry();
  var positions = new Float32Array(totalParticles * 3);
  var colors = new Float32Array(totalParticles * 3);
  var sizes = new Float32Array(totalParticles);

  var armCount = 4;
  var armSpread = 0.45;
  var galaxyRadius = 16;
  var barLength = 5;

  for (var i = 0; i < totalParticles; i++) {
    var arm = i % armCount;
    var armAngle = (arm / armCount) * Math.PI * 2;

    // Distancia desde el centro con distribución logarítmica en espiral
    var t = Math.random();
    var r = t * galaxyRadius;

    // Ángulo en espiral logarítmica
    var spiralAngle = armAngle + (r / galaxyRadius) * Math.PI * 3.5;
    var spread = (Math.random() - 0.5) * armSpread * (1 + t * 2);

    // Barra central (para r < barLength)
    if (r < barLength && Math.random() < 0.5) {
      var barDir = Math.random() > 0.5 ? 1 : -1;
      var bx = (Math.random() - 0.5) * barLength * 2;
      var by = (Math.random() - 0.5) * 0.8;
      var bz = (Math.random() - 0.5) * 1.5;
      positions[i * 3] = bx;
      positions[i * 3 + 1] = by;
      positions[i * 3 + 2] = bz;
      // Color de la barra: amarillento
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.5 + Math.random() * 0.3;
      sizes[i] = 0.08 + Math.random() * 0.12;
    } else {
      var x = Math.cos(spiralAngle) * r + spread * Math.cos(spiralAngle + Math.PI / 2);
      var z = Math.sin(spiralAngle) * r + spread * Math.sin(spiralAngle + Math.PI / 2);
      var y = (Math.random() - 0.5) * (0.3 + t * 0.6);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color: azul/blanco en centro → más amarillo/rosa en bordes
      var tColor = r / galaxyRadius;
      colors[i * 3] = 0.6 + tColor * 0.4;
      colors[i * 3 + 1] = 0.6 + tColor * 0.3;
      colors[i * 3 + 2] = 0.8 + (1 - tColor) * 0.2;

      // Nebulosas rosas en algunos brazos
      if (arm === 1 || arm === 2) {
        colors[i * 3] += 0.2;
      }

      sizes[i] = 0.03 + (1 - tColor) * 0.1 + Math.random() * 0.04;
    }
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // Material de partículas con textura
  var spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 32;
  spriteCanvas.height = 32;
  var sctx = spriteCanvas.getContext('2d');
  var grad = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.1, 'rgba(255, 255, 255, 0.8)');
  grad.addColorStop(0.3, 'rgba(200, 220, 255, 0.4)');
  grad.addColorStop(0.6, 'rgba(100, 150, 255, 0.1)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 32, 32);
  var spriteTex = new THREE.CanvasTexture(spriteCanvas);

  var mat = new THREE.PointsMaterial({
    size: 0.35,
    map: spriteTex,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.85
  });

  galaxy.object3D.add(new THREE.Points(geo, mat));

  // === BULBO CENTRAL (esferas brillantes) ===
  for (var b = 0; b < 3; b++) {
    var bulge = document.createElement('a-entity');
    bulge.setAttribute('geometry', 'primitive: sphere; radius: ' + (1.2 + b * 0.8).toFixed(1) + '; segmentsWidth: 32; segmentsHeight: 32');
    bulge.setAttribute('material', 'shader: standard; color: #FFFFFF; opacity: ' + (0.12 - b * 0.03).toFixed(2) + '; transparent: true; roughness: 0.5; metalness: 0; emissive: #FFEECC; emissiveIntensity: ' + (0.6 - b * 0.15).toFixed(1) + '; depthWrite: false; side: double');
    galaxy.appendChild(bulge);
  }

  // === NEBULOSAS EN LOS BRAZOS (esferas de color) ===
  var nebulaSpots = [
    { x: 8, z: 3, y: 0, color: '#FF6688', radius: 2.5, opacity: 0.08 },
    { x: -6, z: -5, y: 0.3, color: '#FF3366', radius: 2.0, opacity: 0.06 },
    { x: 10, z: -4, y: -0.2, color: '#FF88AA', radius: 3.0, opacity: 0.07 },
    { x: -10, z: 2, y: 0.1, color: '#FF4466', radius: 2.2, opacity: 0.05 },
    { x: 5, z: 7, y: -0.3, color: '#6699FF', radius: 2.8, opacity: 0.07 },
    { x: -8, z: -6, y: 0.2, color: '#4488FF', radius: 2.5, opacity: 0.06 }
  ];

  nebulaSpots.forEach(function (spot) {
    var neb = document.createElement('a-entity');
    neb.setAttribute('geometry', 'primitive: sphere; radius: ' + spot.radius + '; segmentsWidth: 16; segmentsHeight: 16');
    neb.setAttribute('position', spot.x + ' ' + spot.y + ' ' + spot.z);
    neb.setAttribute('material', 'shader: standard; color: ' + spot.color + '; opacity: ' + spot.opacity + '; transparent: true; roughness: 0.6; metalness: 0; emissive: ' + spot.color + '; emissiveIntensity: 0.4; depthWrite: false; side: double');
    galaxy.appendChild(neb);
  });

  // === GLÓBULOS (cúmulos estelares en los brazos) ===
  for (var g = 0; g < 3; g++) {
    var gAngle = (g / 3) * Math.PI * 2 + 0.5;
    var gDist = 8 + Math.random() * 7;
    var gx = Math.cos(gAngle) * gDist;
    var gz = Math.sin(gAngle) * gDist;

    var cluster = document.createElement('a-entity');
    cluster.setAttribute('geometry', 'primitive: sphere; radius: ' + (0.5 + Math.random() * 0.8).toFixed(1) + '; segmentsWidth: 16; segmentsHeight: 16');
    cluster.setAttribute('position', gx.toFixed(1) + ' ' + ((Math.random() - 0.5) * 0.5).toFixed(1) + ' ' + gz.toFixed(1));
    cluster.setAttribute('material', 'shader: standard; color: #FFFFFF; opacity: 0.2; transparent: true; roughness: 0.5; metalness: 0; emissive: #CCDDFF; emissiveIntensity: 0.5; depthWrite: false; side: double');
    galaxy.appendChild(cluster);
  }

  container.appendChild(galaxy);

  // Luz suave ambiental de la galaxia
  var galLight = document.createElement('a-light');
  galLight.setAttribute('type', 'point');
  galLight.setAttribute('color', '#CCDDFF');
  galLight.setAttribute('intensity', '1.5');
  galLight.setAttribute('distance', '30');
  galLight.setAttribute('decay', '1.5');
  galLight.setAttribute('position', '0 16 -30');
  container.appendChild(galLight);
}


/* ================================================================
   CREAR ASTRONAUTA FLOTANDO + NAVE (exhibición)
   ================================================================ */
function createAstronaut() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createAstronaut, 300); return; }

  var container = document.getElementById('astronaut');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'astronaut';
    scene.appendChild(container);
  }

  var white = 'shader: standard; color: #E8ECF0; roughness: 0.45; metalness: 0.1';
  var gray  = 'shader: standard; color: #C0C4C8; roughness: 0.4; metalness: 0.15';
  var dark  = 'shader: standard; color: #555560; roughness: 0.35; metalness: 0.2';
  var visor = 'shader: standard; color: #FFCC66; roughness: 0.1; metalness: 0.3; emissive: #FF9900; emissiveIntensity: 0.8; opacity: 0.7; transparent: true';
  var red   = 'shader: standard; color: #CC3333; roughness: 0.4; metalness: 0.1';
  var blue  = 'shader: standard; color: #3355AA; roughness: 0.4; metalness: 0.1';

  // Grupo del astronauta (flotando inclinado)
  var astro = document.createElement('a-entity');
  astro.setAttribute('position', '25 4 -28');
  astro.setAttribute('rotation', '15 200 -10');
  astro.setAttribute('animation__float', 'property: position; from: 25 3.8 -28; to: 25 4.4 -28; dur: 3000; dir: alternate; loop: true; easing: easeInOutSine');
  astro.setAttribute('animation__sway', 'property: rotation; from: 15 200 -10; to: 20 205 -5; dur: 4000; dir: alternate; loop: true; easing: easeInOutSine');

  // === CASCO ===
  var helmet = document.createElement('a-entity');
  helmet.setAttribute('position', '0 1.65 0');

  var helmetSphere = document.createElement('a-entity');
  helmetSphere.setAttribute('geometry', 'primitive: sphere; radius: 0.18; segmentsWidth: 24; segmentsHeight: 24');
  helmetSphere.setAttribute('material', white);
  helmet.appendChild(helmetSphere);

  var visorEl = document.createElement('a-entity');
  visorEl.setAttribute('geometry', 'primitive: sphere; radius: 0.17; segmentsWidth: 24; segmentsHeight: 16; phiStart: 0; phiLength: 360; thetaStart: 0; thetaLength: 120');
  visorEl.setAttribute('position', '0 0 -0.03');
  visorEl.setAttribute('rotation', '180 0 0');
  visorEl.setAttribute('material', visor);
  helmet.appendChild(visorEl);

  var visorRim = document.createElement('a-torus');
  visorRim.setAttribute('radius', '0.15');
  visorRim.setAttribute('radius-tubular', '0.02');
  visorRim.setAttribute('rotation', '90 0 0');
  visorRim.setAttribute('position', '0 0.01 -0.1');
  visorRim.setAttribute('material', 'shader: standard; color: #888; roughness: 0.3; metalness: 0.5');
  helmet.appendChild(visorRim);
  astro.appendChild(helmet);

  // === CUELLO ===
  var neck = document.createElement('a-entity');
  neck.setAttribute('geometry', 'primitive: cylinder; radius: 0.1; height: 0.08');
  neck.setAttribute('position', '0 1.46 0');
  neck.setAttribute('material', gray);
  astro.appendChild(neck);

  // === TORSO (inclinado hacia atrás) ===
  var torso = document.createElement('a-entity');
  torso.setAttribute('position', '0 1.22 0');
  torso.setAttribute('rotation', '5 0 0');

  var chest = document.createElement('a-entity');
  chest.setAttribute('geometry', 'primitive: box; width: 0.44; height: 0.48; depth: 0.28');
  chest.setAttribute('material', white);
  torso.appendChild(chest);

  var panel = document.createElement('a-entity');
  panel.setAttribute('geometry', 'primitive: box; width: 0.22; height: 0.20; depth: 0.02');
  panel.setAttribute('position', '0 0.02 -0.15');
  panel.setAttribute('material', gray);
  torso.appendChild(panel);

  var btnColors = [red, blue, '#44AA44', '#CCAA33', '#FFFFFF'];
  for (var b = 0; b < 5; b++) {
    var btn = document.createElement('a-entity');
    btn.setAttribute('geometry', 'primitive: box; width: 0.025; height: 0.025; depth: 0.02');
    btn.setAttribute('position', (-0.08 + b * 0.04) + ' 0.04 -0.16');
    btn.setAttribute('material', 'shader: standard; color: ' + btnColors[b] + '; roughness: 0.2; metalness: 0.2; emissive: ' + btnColors[b] + '; emissiveIntensity: 0.3');
    torso.appendChild(btn);
  }
  astro.appendChild(torso);

  // === MOCHILA ===
  var backpack = document.createElement('a-entity');
  backpack.setAttribute('position', '0 1.25 0.14');
  var bpBody = document.createElement('a-entity');
  bpBody.setAttribute('geometry', 'primitive: box; width: 0.36; height: 0.5; depth: 0.2');
  bpBody.setAttribute('material', white);
  backpack.appendChild(bpBody);
  var bpDetail = document.createElement('a-entity');
  bpDetail.setAttribute('geometry', 'primitive: box; width: 0.28; height: 0.3; depth: 0.05');
  bpDetail.setAttribute('position', '0 0.02 0.12');
  bpDetail.setAttribute('material', gray);
  backpack.appendChild(bpDetail);
  astro.appendChild(backpack);

  // === CINTURA ===
  var waist = document.createElement('a-entity');
  waist.setAttribute('geometry', 'primitive: cylinder; radius: 0.24; height: 0.06');
  waist.setAttribute('position', '0 0.98 0');
  waist.setAttribute('material', gray);
  astro.appendChild(waist);

  // === PELVIS ===
  var pelvis = document.createElement('a-entity');
  pelvis.setAttribute('geometry', 'primitive: box; width: 0.36; height: 0.2; depth: 0.26');
  pelvis.setAttribute('position', '0 0.88 0');
  pelvis.setAttribute('material', white);
  astro.appendChild(pelvis);

  // === PIERNAS (extendidas, separadas, flotando) ===
  function createFloatingLeg(x, z, spread) {
    var leg = document.createElement('a-entity');
    // Pivot en la cadera
    leg.setAttribute('position', x + ' 0.84 0');

    var thigh = document.createElement('a-entity');
    thigh.setAttribute('geometry', 'primitive: cylinder; radius: 0.1; height: 0.44');
    thigh.setAttribute('position', '0 -0.22 0');
    thigh.setAttribute('rotation', (spread * 15) + ' 0 0');
    thigh.setAttribute('material', white);
    leg.appendChild(thigh);

    var knee = document.createElement('a-entity');
    knee.setAttribute('geometry', 'primitive: cylinder; radius: 0.11; height: 0.06');
    knee.setAttribute('position', '0 -0.44 0');
    knee.setAttribute('material', gray);
    leg.appendChild(knee);

    var calf = document.createElement('a-entity');
    calf.setAttribute('geometry', 'primitive: cylinder; radius: 0.09; height: 0.44');
    calf.setAttribute('position', '0 -0.68 0');
    calf.setAttribute('material', gray);
    leg.appendChild(calf);

    var boot = document.createElement('a-entity');
    boot.setAttribute('geometry', 'primitive: box; width: 0.14; height: 0.08; depth: 0.24');
    boot.setAttribute('position', spread * 0.1 + ' -0.92 ' + z);
    boot.setAttribute('material', dark);
    leg.appendChild(boot);

    return leg;
  }
  astro.appendChild(createFloatingLeg('-0.1', '0.02', -1));  // pierna izq
  astro.appendChild(createFloatingLeg('0.1', '0.02', 1));    // pierna der

  // === BRAZOS (extendidos, flotando) ===
  function createFloatingArm(x, sideZ, spread) {
    var arm = document.createElement('a-entity');
    // Pivot en el hombro
    arm.setAttribute('position', x + ' 1.44 ' + sideZ);

    var shoulder = document.createElement('a-entity');
    shoulder.setAttribute('geometry', 'primitive: sphere; radius: 0.1');
    shoulder.setAttribute('position', '0 0 0');
    shoulder.setAttribute('material', gray);
    arm.appendChild(shoulder);

    var upper = document.createElement('a-entity');
    upper.setAttribute('geometry', 'primitive: cylinder; radius: 0.08; height: 0.36');
    upper.setAttribute('position', spread * 0.08 + ' -0.18 0');
    upper.setAttribute('rotation', '0 0 ' + (spread * 25));
    upper.setAttribute('material', white);
    arm.appendChild(upper);

    var elbow = document.createElement('a-entity');
    elbow.setAttribute('geometry', 'primitive: sphere; radius: 0.08');
    elbow.setAttribute('position', spread * 0.16 + ' -0.36 0');
    elbow.setAttribute('material', gray);
    arm.appendChild(elbow);

    var forearm = document.createElement('a-entity');
    forearm.setAttribute('geometry', 'primitive: cylinder; radius: 0.06; height: 0.32');
    forearm.setAttribute('position', spread * 0.2 + ' -0.54 0');
    forearm.setAttribute('material', gray);
    arm.appendChild(forearm);

    var glove = document.createElement('a-entity');
    glove.setAttribute('geometry', 'primitive: sphere; radius: 0.07');
    glove.setAttribute('position', spread * 0.22 + ' -0.7 0');
    glove.setAttribute('material', dark);
    arm.appendChild(glove);

    return arm;
  }
  astro.appendChild(createFloatingArm('-0.28', '-0.06', -1));  // brazo izq
  astro.appendChild(createFloatingArm('0.28', '-0.06', 1));    // brazo der

  // Tubos
  astro.appendChild(createAstroTube(0, 1.5, 0.12, 0, 1.48, 0.1, '#CCCCCC', 0.02));
  astro.appendChild(createAstroTube(-0.15, 1.3, -0.1, -0.12, 1.25, 0.1, '#BBBBBB', 0.015));
  astro.appendChild(createAstroTube(0.15, 1.3, -0.1, 0.12, 1.25, 0.1, '#BBBBBB', 0.015));

  container.appendChild(astro);

  // ===== NAVE ESPACIAL (cápsula orbital junto al astronauta) =====
  var shipGroup = document.createElement('a-entity');
  shipGroup.setAttribute('position', '28 4.2 -24');
  shipGroup.setAttribute('rotation', '0 45 5');
  shipGroup.setAttribute('animation__shipFloat', 'property: position; from: 28 4.0 -24; to: 28 4.6 -24; dur: 3500; dir: alternate; loop: true; easing: easeInOutSine');

  // Fuselaje (cápsula cónica)
  var capsuleBody = document.createElement('a-entity');
  capsuleBody.setAttribute('geometry', 'primitive: cone; radiusBottom: 1.0; radiusTop: 0.15; height: 3.0; segmentsRadial: 16');
  capsuleBody.setAttribute('rotation', '0 0 0');
  capsuleBody.setAttribute('material', 'shader: standard; color: #E0E4E8; roughness: 0.35; metalness: 0.5');
  shipGroup.appendChild(capsuleBody);

  // Escudo térmico (parte inferior)
  var heatShield = document.createElement('a-entity');
  heatShield.setAttribute('geometry', 'primitive: cylinder; radius: 1.05; height: 0.15');
  heatShield.setAttribute('position', '0 -1.5 0');
  heatShield.setAttribute('material', 'shader: standard; color: #333338; roughness: 0.25; metalness: 0.7; emissive: #111111; emissiveIntensity: 0.3');
  shipGroup.appendChild(heatShield);

  // Ventana (ojo de buey)
  var windowRing = document.createElement('a-torus');
  windowRing.setAttribute('radius', '0.28');
  windowRing.setAttribute('radius-tubular', '0.04');
  windowRing.setAttribute('position', '0 0.3 0.65');
  windowRing.setAttribute('rotation', '90 0 0');
  windowRing.setAttribute('material', 'shader: standard; color: #888; roughness: 0.3; metalness: 0.6');
  shipGroup.appendChild(windowRing);

  var windowGlass = document.createElement('a-entity');
  windowGlass.setAttribute('geometry', 'primitive: cylinder; radius: 0.27; height: 0.02');
  windowGlass.setAttribute('position', '0 0.3 0.65');
  windowGlass.setAttribute('rotation', '90 0 0');
  windowGlass.setAttribute('material', 'shader: standard; color: #88CCFF; roughness: 0.1; metalness: 0.1; emissive: #4488CC; emissiveIntensity: 0.5; opacity: 0.6; transparent: true');
  shipGroup.appendChild(windowGlass);

  // Antena
  var antennaPole = document.createElement('a-entity');
  antennaPole.setAttribute('geometry', 'primitive: cylinder; radius: 0.03; height: 0.8');
  antennaPole.setAttribute('position', '0 1.6 0');
  antennaPole.setAttribute('material', 'shader: standard; color: #666; roughness: 0.3; metalness: 0.7');
  shipGroup.appendChild(antennaPole);

  var antennaDish = document.createElement('a-entity');
  antennaDish.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.2; radiusTop: 0.05; height: 0.12');
  antennaDish.setAttribute('position', '0 2.05 0');
  antennaDish.setAttribute('rotation', '0 0 0');
  antennaDish.setAttribute('material', 'shader: standard; color: #AAA; roughness: 0.2; metalness: 0.8');
  shipGroup.appendChild(antennaDish);

  // Paneles solares (laterales)
  function createSolarPanel(side) {
    var panelGroup = document.createElement('a-entity');
    panelGroup.setAttribute('position', side + ' 0.3 0');

    // Panel
    var panelPlane = document.createElement('a-entity');
    panelPlane.setAttribute('geometry', 'primitive: box; width: 0.04; height: 1.8; depth: 1.2');
    panelPlane.setAttribute('material', 'shader: standard; color: #112244; roughness: 0.3; metalness: 0.5; emissive: #112244; emissiveIntensity: 0.3');
    panelGroup.appendChild(panelPlane);

    // Celdas del panel (rejilla)
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        var cell = document.createElement('a-entity');
        cell.setAttribute('geometry', 'primitive: box; width: 0.02; height: 0.5; depth: 0.32');
        cell.setAttribute('position', '0 ' + (-0.65 + r * 0.6) + ' ' + (-0.4 + c * 0.4));
        cell.setAttribute('material', 'shader: standard; color: #2244AA; roughness: 0.4; metalness: 0.3; emissive: #1133AA; emissiveIntensity: 0.2');
        panelGroup.appendChild(cell);
      }
    }

    // Brazo de conexión
    var arm = document.createElement('a-entity');
    arm.setAttribute('geometry', 'primitive: cylinder; radius: 0.04; height: 0.7');
    arm.setAttribute('position', (side === '-1.2' ? '-0.35' : '0.35') + ' 0 0');
    arm.setAttribute('rotation', '0 0 90');
    arm.setAttribute('material', 'shader: standard; color: #999; roughness: 0.3; metalness: 0.6');
    panelGroup.appendChild(arm);

    return panelGroup;
  }

  shipGroup.appendChild(createSolarPanel('1.2'));
  shipGroup.appendChild(createSolarPanel('-1.2'));

  // Propulsores con llama
  for (var p = 0; p < 4; p++) {
    var angle = (p / 4) * Math.PI * 2;
    var px = (Math.cos(angle) * 0.8).toFixed(1);
    var pz = (Math.sin(angle) * 0.8).toFixed(1);

    var thruster = document.createElement('a-entity');
    thruster.setAttribute('geometry', 'primitive: cylinder; radius: 0.08; height: 0.3');
    thruster.setAttribute('position', px + ' -1.65 ' + pz);
    thruster.setAttribute('material', 'shader: standard; color: #555; roughness: 0.3; metalness: 0.7');
    shipGroup.appendChild(thruster);

    // Llama interior (cono blanco/amarillo)
    var flameInner = document.createElement('a-entity');
    flameInner.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.06; radiusTop: 0.02; height: 0.5; segmentsRadial: 8');
    flameInner.setAttribute('position', px + ' -1.95 ' + pz);
    flameInner.setAttribute('rotation', '0 0 0');
    flameInner.setAttribute('material', 'shader: standard; emissive: #FFFFFF; emissiveIntensity: 2.5; color: #FFFFEE; roughness: 0.1; metalness: 0; opacity: 0.9; transparent: true; depthWrite: false');
    flameInner.setAttribute('pulse-scale', 'base: 1; amplitude: 0.12; speed: 8');
    shipGroup.appendChild(flameInner);

    // Llama media (cono naranja)
    var flameMid = document.createElement('a-entity');
    flameMid.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.09; radiusTop: 0.01; height: 0.9; segmentsRadial: 8');
    flameMid.setAttribute('position', px + ' -2.0 ' + pz);
    flameMid.setAttribute('rotation', '0 0 0');
    flameMid.setAttribute('material', 'shader: standard; emissive: #FF8800; emissiveIntensity: 1.5; color: #FFAA33; roughness: 0.1; metalness: 0; opacity: 0.6; transparent: true; depthWrite: false');
    flameMid.setAttribute('pulse-scale', 'base: 1; amplitude: 0.08; speed: 6');
    shipGroup.appendChild(flameMid);

    // Llama externa (cono azul tenue, más larga)
    var flameOuter = document.createElement('a-entity');
    flameOuter.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.12; radiusTop: 0.005; height: 1.5; segmentsRadial: 8');
    flameOuter.setAttribute('position', px + ' -2.1 ' + pz);
    flameOuter.setAttribute('rotation', '0 0 0');
    flameOuter.setAttribute('material', 'shader: standard; emissive: #3366FF; emissiveIntensity: 0.7; color: #4488FF; roughness: 0.1; metalness: 0; opacity: 0.3; transparent: true; depthWrite: false');
    flameOuter.setAttribute('pulse-scale', 'base: 1; amplitude: 0.05; speed: 5');
    shipGroup.appendChild(flameOuter);
  }

  // Luz de la nave (brillo de los propulsores)
  var shipLight = document.createElement('a-light');
  shipLight.setAttribute('type', 'point');
  shipLight.setAttribute('color', '#FF9944');
  shipLight.setAttribute('intensity', '2.0');
  shipLight.setAttribute('distance', '8');
  shipLight.setAttribute('decay', '1.2');
  shipLight.setAttribute('position', '0 -2.2 0');
  shipGroup.appendChild(shipLight);

  // Segunda luz (azulada por el borde de la llama)
  var shipLight2 = document.createElement('a-light');
  shipLight2.setAttribute('type', 'point');
  shipLight2.setAttribute('color', '#4466FF');
  shipLight2.setAttribute('intensity', '0.8');
  shipLight2.setAttribute('distance', '5');
  shipLight2.setAttribute('decay', '1.5');
  shipLight2.setAttribute('position', '0 -2.8 0');
  shipGroup.appendChild(shipLight2);

  // Luz de posición (roja, parpadeante)
  var beacon = document.createElement('a-entity');
  beacon.setAttribute('geometry', 'primitive: sphere; radius: 0.06');
  beacon.setAttribute('position', '0 2.2 0');
  beacon.setAttribute('material', 'shader: standard; emissive: #FF3333; emissiveIntensity: 3; color: #FF3333; roughness: 0.1');
  beacon.setAttribute('emissive-pulse', 'color: #FF3333; min: 2; max: 4; speed: 3');
  shipGroup.appendChild(beacon);

  container.appendChild(shipGroup);

  // Foco ambiental sobre la exhibición
  var exhibitLight = document.createElement('a-light');
  exhibitLight.setAttribute('type', 'spot');
  exhibitLight.setAttribute('intensity', '1.5');
  exhibitLight.setAttribute('color', '#E0EEFF');
  exhibitLight.setAttribute('distance', '15');
  exhibitLight.setAttribute('angle', '35');
  exhibitLight.setAttribute('penumbra', '0.5');
  exhibitLight.setAttribute('decay', '0.8');
  exhibitLight.setAttribute('position', '26 7 -26');
  container.appendChild(exhibitLight);
}

function createAstroTube(x1, y1, z1, x2, y2, z2, color, radius) {
  var dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
  var dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
  var midX = (x1 + x2) / 2, midY = (y1 + y2) / 2, midZ = (z1 + z2) / 2;
  var tube = document.createElement('a-entity');
  tube.setAttribute('geometry', 'primitive: cylinder; radius: ' + radius + '; height: ' + dist.toFixed(2));
  tube.setAttribute('position', midX.toFixed(2) + ' ' + midY.toFixed(2) + ' ' + midZ.toFixed(2));
  var theta = Math.atan2(dx, dy) * 180 / Math.PI;
  var phi = Math.atan2(Math.sqrt(dx*dx + dy*dy), dz) * 180 / Math.PI;
  tube.setAttribute('rotation', theta.toFixed(0) + ' 90 ' + phi.toFixed(0));
  tube.setAttribute('material', 'shader: standard; color: ' + color + '; roughness: 0.3; metalness: 0.3');
  return tube;
}


/* ================================================================
   CREAR NEBULOSAS (nubes de gas en el museo)
   ================================================================ */
function createNebulae() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createNebulae, 300); return; }

  var container = document.getElementById('nebulae');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'nebulae';
    scene.appendChild(container);
  }

  var nebulaeDefs = [
    { pos: '-28 10 25',  colors: ['#FF3366', '#FF6688', '#CC2244', '#FF88AA'], scale: 8,  name: 'nebula-rosa' },
    { pos: '30 12 -22',  colors: ['#3366FF', '#6688FF', '#2244CC', '#88AAFF'], scale: 9,  name: 'nebula-azul' },
    { pos: '-25 14 -20', colors: ['#33FF66', '#66FF88', '#22CC44', '#88FFAA'], scale: 7,  name: 'nebula-verde' },
    { pos: '32 8 28',   colors: ['#FF33CC', '#FF66DD', '#CC2299', '#FF88DD'], scale: 8,  name: 'nebula-magenta' },
    { pos: '-30 16 0',  colors: ['#FF9933', '#FFBB66', '#CC7722', '#FFCC88'], scale: 6,  name: 'nebula-naranja' },
    { pos: '20 15 -30', colors: ['#9933FF', '#BB66FF', '#7722CC', '#CC88FF'], scale: 7,  name: 'nebula-violeta' }
  ];

  nebulaeDefs.forEach(function (def) {
    var nebula = document.createElement('a-entity');
    nebula.setAttribute('position', def.pos);

    // Múltiples capas de esferas semitransparentes
    def.colors.forEach(function (color, idx) {
      var radius = def.scale * (0.6 + idx * 0.25);
      var opacity = 0.015 + idx * 0.006;
      var sphere = document.createElement('a-entity');
      sphere.setAttribute('geometry', 'primitive: sphere; radius: ' + radius.toFixed(1) + '; segmentsWidth: 32; segmentsHeight: 32');
      sphere.setAttribute('material', 'shader: standard; color: ' + color + '; opacity: ' + opacity.toFixed(3) + '; transparent: true; roughness: 0.6; metalness: 0; emissive: ' + color + '; emissiveIntensity: 0.15; depthWrite: false; side: double');
      nebula.appendChild(sphere);
    });

    // Núcleo más denso
    var core = document.createElement('a-entity');
    core.setAttribute('geometry', 'primitive: sphere; radius: ' + (def.scale * 0.35).toFixed(1) + '; segmentsWidth: 16; segmentsHeight: 16');
    core.setAttribute('material', 'shader: standard; color: #FFFFFF; opacity: 0.06; transparent: true; roughness: 0.5; metalness: 0; emissive: ' + def.colors[0] + '; emissiveIntensity: 0.3; depthWrite: false; side: double');
    nebula.appendChild(core);

    // Partículas de polvo dentro de la nebulosa (tipo estrellas)
    var partCount = 200;
    var geo = new THREE.BufferGeometry();
    var positions = new Float32Array(partCount * 3);
    for (var i = 0; i < partCount; i++) {
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      var r = def.scale * (0.2 + Math.random() * 0.8);
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      positions[i * 3 + 2] = Math.cos(phi) * r;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    var mat = new THREE.PointsMaterial({
      size: 0.08,
      color: new THREE.Color(def.colors[1]),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.2
    });
    var points = new THREE.Points(geo, mat);
    nebula.object3D.add(points);

    // Rotación lenta
    nebula.setAttribute('self-rot', 'speed: ' + (0.03 + Math.random() * 0.05));

    container.appendChild(nebula);
  });
}


/* ================================================================
   CREAR AGUJERO NEGRO (exhibición en esquina del museo)
   ================================================================ */
function createBlackHole() {
  var scene = document.querySelector('a-scene');
  if (!scene) { setTimeout(createBlackHole, 300); return; }

  var container = document.getElementById('black-hole');
  if (!container) {
    container = document.createElement('a-entity');
    container.id = 'black-hole';
    scene.appendChild(container);
  }

  // Posicionarlo en una zona libre del museo (cerca del suelo, esquina)
  var bhGroup = document.createElement('a-entity');
  bhGroup.setAttribute('position', '-30 6 -28');

  // === Horizonte de eventos (esfera negra) ===
  var eventHorizon = document.createElement('a-entity');
  eventHorizon.setAttribute('geometry', 'primitive: sphere; radius: 1.5; segmentsWidth: 64; segmentsHeight: 64');
  eventHorizon.setAttribute('material', 'shader: standard; color: #000000; roughness: 0; metalness: 1; emissive: #000000; emissiveIntensity: 0');
  bhGroup.appendChild(eventHorizon);

  // === Anillo de fotones (brillante, pegado al horizonte) ===
  var photonRing = document.createElement('a-torus');
  photonRing.setAttribute('radius', '1.55');
  photonRing.setAttribute('radius-tubular', '0.03');
  photonRing.setAttribute('segments-tubular', '16');
  photonRing.setAttribute('rotation', '75 0 0');
  photonRing.setAttribute('material', 'shader: standard; emissive: #FF6600; emissiveIntensity: 3; color: #FF8800; roughness: 0.1; metalness: 0');
  photonRing.setAttribute('emissive-pulse', 'color: #FF6600; min: 2; max: 4; speed: 3');
  bhGroup.appendChild(photonRing);

  // === Disco de acreción (anillos de colores, inclinado) ===
  var discGroup = document.createElement('a-entity');
  discGroup.setAttribute('rotation', '65 20 0');

  var discLayers = [
    { inner: 1.7, outer: 2.6, color: '#FF4400', opacity: 0.7,  emissive: '#FF3300', eIntensity: 2.5 },
    { inner: 2.7, outer: 3.3, color: '#FF8800', opacity: 0.55, emissive: '#FF6600', eIntensity: 1.8 },
    { inner: 3.4, outer: 3.9, color: '#FFCC44', opacity: 0.4,  emissive: '#FFAA00', eIntensity: 1.2 },
    { inner: 4.0, outer: 4.5, color: '#FFDD88', opacity: 0.25, emissive: '#FFCC44', eIntensity: 0.7 },
    { inner: 4.6, outer: 5.0, color: '#FFEEBB', opacity: 0.12, emissive: '#FFDD88', eIntensity: 0.3 }
  ];

  discLayers.forEach(function (layer) {
    var ring = document.createElement('a-ring');
    ring.setAttribute('radius-inner', layer.inner);
    ring.setAttribute('radius-outer', layer.outer);
    ring.setAttribute('color', layer.color);
    ring.setAttribute('side', 'double');
    ring.setAttribute('rotation', '90 0 0');
    ring.setAttribute('opacity', layer.opacity.toString());
    ring.setAttribute('material', 'shader: standard; transparent: true; roughness: 0.3; emissive: ' + layer.emissive + '; emissiveIntensity: ' + layer.eIntensity + '; depthWrite: false');
    ring.setAttribute('segments-theta', '128');
    discGroup.appendChild(ring);
  });

  bhGroup.appendChild(discGroup);

  // === Lente gravitacional (esfera semitransparente grande) ===
  var lens = document.createElement('a-entity');
  lens.setAttribute('geometry', 'primitive: sphere; radius: 3.5; segmentsWidth: 48; segmentsHeight: 48');
  lens.setAttribute('material', 'shader: standard; color: #110022; opacity: 0.15; transparent: true; roughness: 0.3; emissive: #220044; emissiveIntensity: 0.2; depthWrite: false');
  bhGroup.appendChild(lens);

  // === Partículas orbitando (polvo del disco) ===
  var partCount = 500;
  var partGeo = new THREE.BufferGeometry();
  var partPos = new Float32Array(partCount * 3);
  var partCol = new Float32Array(partCount * 3);

  for (var i = 0; i < partCount; i++) {
    var angle = Math.random() * Math.PI * 2;
    var radius = 1.7 + Math.random() * 3.5;
    var tilt = (Math.random() - 0.5) * 1.2;
    partPos[i * 3] = Math.cos(angle) * radius;
    partPos[i * 3 + 1] = tilt;
    partPos[i * 3 + 2] = Math.sin(angle) * radius;

    var t = (radius - 1.7) / 3.5;
    partCol[i * 3] = 1;
    partCol[i * 3 + 1] = 0.2 + t * 0.6;
    partCol[i * 3 + 2] = t * 0.3;
  }

  partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
  partGeo.setAttribute('color', new THREE.BufferAttribute(partCol, 3));

  var partMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.7
  });

  var particles = new THREE.Points(partGeo, partMat);
  discGroup.object3D.add(particles);

  // === Chorro de rayos (conos arriba y abajo) ===
  var jetUp = document.createElement('a-entity');
  jetUp.setAttribute('position', '0 2 0');
  jetUp.setAttribute('rotation', '0 0 0');
  var jetUpCone = document.createElement('a-entity');
  jetUpCone.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.4; radiusTop: 0.05; height: 5');
  jetUpCone.setAttribute('material', 'shader: standard; emissive: #4466FF; emissiveIntensity: 0.6; color: #4466FF; opacity: 0.4; transparent: true; depthWrite: false');
  jetUp.appendChild(jetUpCone);
  bhGroup.appendChild(jetUp);

  var jetDown = document.createElement('a-entity');
  jetDown.setAttribute('position', '0 -2 0');
  jetDown.setAttribute('rotation', '180 0 0');
  var jetDownCone = document.createElement('a-entity');
  jetDownCone.setAttribute('geometry', 'primitive: cone; radiusBottom: 0.35; radiusTop: 0.05; height: 4.5');
  jetDownCone.setAttribute('material', 'shader: standard; emissive: #4466FF; emissiveIntensity: 0.5; color: #4466FF; opacity: 0.35; transparent: true; depthWrite: false');
  jetDown.appendChild(jetDownCone);
  bhGroup.appendChild(jetDown);

  // Luz puntual (brillo del disco)
  var bhLight = document.createElement('a-light');
  bhLight.setAttribute('type', 'point');
  bhLight.setAttribute('color', '#FF8844');
  bhLight.setAttribute('intensity', '2');
  bhLight.setAttribute('distance', '20');
  bhLight.setAttribute('decay', '1.2');
  bhGroup.appendChild(bhLight);

  container.appendChild(bhGroup);
}
