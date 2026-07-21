/**
 * components.js
 * Componentes personalizados de A-Frame para el Museo del Sistema Solar
 * A-Frame 1.5.0
 */

/* ================================================================
   ORBIT - Rotación orbital continua alrededor del eje Y local
   Uso: <a-entity orbit="speed: 1.0; from: 90">
   ================================================================ */
AFRAME.registerComponent('orbit', {
  schema: {
    speed: { type: 'number', default: 1.0 },
    from:  { type: 'number', default: 0 }
  },

  init: function () {
    this.angle = THREE.MathUtils.degToRad(this.data.from);
    this.el.object3D.rotation.y = this.angle;
  },

  tick: function (time, delta) {
    var dt = delta / 1000;
    if (dt <= 0 || dt > 0.5) return;
    this.angle += this.data.speed * dt;
    this.el.object3D.rotation.y = this.angle;
  }
});


/* ================================================================
   SELF-ROT - Rotación del planeta sobre su propio eje
   Uso: <a-entity self-rot="speed: 2.0">
   ================================================================ */
AFRAME.registerComponent('self-rot', {
  schema: {
    speed: { type: 'number', default: 1.0 }
  },

  init: function () {
    this.angle = 0;
  },

  tick: function (time, delta) {
    var dt = delta / 1000;
    if (dt <= 0 || dt > 0.5) return;
    this.angle += this.data.speed * dt;
    this.el.object3D.rotation.y = this.angle;
  }
});


/* ================================================================
   GLOW - Efecto de brillo pulsante (para el Sol)
   Uso: <a-entity glow="base: 2.5; amplitude: 0.5; speed: 1.2">
   ================================================================ */
AFRAME.registerComponent('glow', {
  schema: {
    base:      { type: 'number', default: 2.5 },
    amplitude: { type: 'number', default: 0.5 },
    speed:     { type: 'number', default: 1.2 }
  },

  init: function () {
    this.timeAcc = 0;
  },

  tick: function (time, delta) {
    var dt = delta / 1000;
    if (dt <= 0 || dt > 0.5) return;
    this.timeAcc += dt * this.data.speed;
    var val = this.data.base + Math.sin(this.timeAcc) * this.data.amplitude;
    this.el.setAttribute('material', 'emissiveIntensity', val);
  }
});


/* ================================================================
   GAZE-INFO - Muestra panel al mirar fijamente 2 segundos
   Uso: <a-entity gaze-info="planet: mercury">
   ================================================================ */
AFRAME.registerComponent('gaze-info', {
  schema: {
    planet: { type: 'string', default: '' }
  },

  init: function () {
    var self = this;
    this.el.addEventListener('click', function () {
      self.showInfo();
    });
    // Evento mouseenter/mouseleave para PC sin fuse
    this.el.addEventListener('mouseenter', function () {
      self.el.setAttribute('material', 'emissive', '#333333');
      self.el.setAttribute('material', 'emissiveIntensity', '0.3');
    });
    this.el.addEventListener('mouseleave', function () {
      self.el.setAttribute('material', 'emissive', '#000000');
      self.el.setAttribute('material', 'emissiveIntensity', '0');
    });
  },

  showInfo: function () {
    var planetId = this.data.planet;
    if (typeof window.showPlanetInfo === 'function') {
      window.showPlanetInfo(planetId);
    }
  }
});


/* ================================================================
   WALL-COLLISION - Evita atravesar las paredes del museo
   Uso: <a-entity wall-collision="bounds: 40,40,25">
   ================================================================ */
AFRAME.registerComponent('wall-collision', {
  schema: {
    bounds: { type: 'vec3', default: { x: 40, y: 25, z: 40 } }
  },

  init: function () {
    this._worldPos = new THREE.Vector3();
  },

  tick: function () {
    var obj = this.el.object3D;
    obj.getWorldPosition(this._worldPos);
    var b = this.data.bounds;
    var clamped = false;

    if (Math.abs(this._worldPos.x) > b.x) {
      obj.position.x -= (this._worldPos.x - Math.sign(this._worldPos.x) * b.x);
      clamped = true;
    }
    if (Math.abs(this._worldPos.z) > b.z) {
      obj.position.z -= (this._worldPos.z - Math.sign(this._worldPos.z) * b.z);
      clamped = true;
    }
    if (this._worldPos.y > b.y) {
      obj.position.y -= (this._worldPos.y - b.y);
      clamped = true;
    }
    if (this._worldPos.y < 0.1) {
      obj.position.y += (0.1 - this._worldPos.y);
      clamped = true;
    }

    return clamped;
  }
});


/* ================================================================
   PROXIMITY-INFO - Muestra info ampliada al acercarse a un cuadro
   Uso: <a-entity proximity-info="planet: mercury; distance: 8">
   ================================================================ */
AFRAME.registerComponent('proximity-info', {
  schema: {
    planet:   { type: 'string',  default: '' },
    distance: { type: 'number',  default: 8 }
  },

  init: function () {
    this.camera = document.querySelector('[camera]');
    this.active = false;
  },

  tick: function () {
    if (!this.camera) return;
    var camPos = this.camera.object3D.position;
    var myPos  = this.el.object3D.position;
    var dist   = camPos.distanceTo(myPos);
    var wasActive = this.active;

    if (dist < this.data.distance) {
      if (!this.active) {
        this.active = true;
        if (typeof window.showPaintingInfo === 'function') {
          window.showPaintingInfo(this.data.planet, true);
        }
      }
    } else {
      if (this.active) {
        this.active = false;
        if (typeof window.showPaintingInfo === 'function') {
          window.showPaintingInfo(this.data.planet, false);
        }
      }
    }
  }
});


/* ================================================================
   SOLAR-PARTICLES - Partículas alrededor del Sol
   Uso: <a-entity solar-particles="count: 200; radius: 5.5; height: 2">
   ================================================================ */
AFRAME.registerComponent('solar-particles', {
  schema: {
    count:  { type: 'number', default: 200 },
    radius: { type: 'number', default: 5.5 },
    height: { type: 'number', default: 2 }
  },

  init: function () {
    var geo = new THREE.BufferGeometry();
    var positions = new Float32Array(this.data.count * 3);
    var colors    = new Float32Array(this.data.count * 3);
    this.particleData = [];

    for (var i = 0; i < this.data.count; i++) {
      var theta = Math.random() * Math.PI * 2;
      var phi   = Math.acos(2 * Math.random() - 1);
      var r     = this.data.radius + (Math.random() - 0.5) * 2;
      var x = r * Math.sin(phi) * Math.cos(theta);
      var y = r * Math.sin(phi) * Math.sin(theta) * 0.3;
      var z = r * Math.cos(phi);

      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3]     = 1.0;
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.5;
      colors[i * 3 + 2] = Math.random() * 0.2;

      this.particleData.push({
        baseX: x, baseY: y, baseZ: z,
        theta: theta, r: r,
        speed: 0.3 + Math.random() * 1.5,
        amplitude: 0.1 + Math.random() * 0.5
      });
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    var mat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.7
    });

    this.particles = new THREE.Points(geo, mat);
    this.el.object3D.add(this.particles);
  },

  tick: function (time, delta) {
    if (!this.particles) return;
    var dt = delta / 1000;
    if (dt <= 0 || dt > 0.5) return;

    var pos = this.particles.geometry.attributes.position;
    for (var i = 0; i < this.data.count; i++) {
      var pd = this.particleData[i];
      pd.theta += pd.speed * dt * 0.5;
      var yOff = Math.sin(time * 0.001 * pd.speed + i) * pd.amplitude;
      pos.array[i * 3]     = pd.r * Math.sin(pd.baseY / pd.r + 1) * Math.cos(pd.theta);
      pos.array[i * 3 + 1] = yOff;
      pos.array[i * 3 + 2] = pd.r * Math.cos(pd.theta);
    }
    pos.needsUpdate = true;
  }
});


/* ================================================================
   PULSE-SCALE - Escala pulsante suave
   ================================================================ */
AFRAME.registerComponent('pulse-scale', {
  schema: {
    base:      { type: 'number', default: 1.0 },
    amplitude: { type: 'number', default: 0.03 },
    speed:     { type: 'number', default: 1.5 }
  },

  init: function () {
    this.timeAcc = Math.random() * Math.PI * 2;
  },

  tick: function (time, delta) {
    var dt = delta / 1000;
    if (dt <= 0 || dt > 0.5) return;
    this.timeAcc += dt * this.data.speed;
    var s = this.data.base + Math.sin(this.timeAcc) * this.data.amplitude;
    this.el.object3D.scale.set(s, s, s);
  }
});


/* ================================================================
   TELEPORT-CONTROL - Teletransporte VR con raycasting
   Activa en entidades con laser-controls
   ================================================================ */
AFRAME.registerComponent('teleport-control', {
  schema: {
    collisionEntities: { type: 'string', default: '.floor' },
    hitEntity:        { type: 'string', default: '.floor' },
    hitCylinderColor: { type: 'string', default: '#44aaff' },
    hitCylinderRadius: { type: 'number', default: 0.3 },
    hitCylinderHeight: { type: 'number', default: 0.01 },
    interval: { type: 'number', default: 100 },
    curveShootingSpeed: { type: 'number', default: 8 },
    landingNormal: { type: 'vec3', default: { x: 0, y: 1, z: 0 } },
    landingMaxAngle: { type: 'number', default: 45 }
  },

  init: function () {
    this.cameraRig = document.getElementById('player');
    this.isDown = false;
    this.active = false;
    this.raycaster = new THREE.Raycaster();

    var self = this;
    this.el.addEventListener('thumbstickdown', function () { self.startTeleport(); });
    this.el.addEventListener('thumbstickup',   function () { self.endTeleport(); });
  },

  startTeleport: function () {
    this.active = true;
    if (!this.hitEntity) {
      this.createHitEntity();
    }
  },

  endTeleport: function () {
    if (this.active && this.hitEntity) {
      var pos = this.hitEntity.object3D.position;
      if (this.cameraRig) {
        this.cameraRig.object3D.position.set(pos.x, pos.y + 1.6, pos.z);
      }
    }
    this.active = false;
    if (this.hitEntity) {
      this.hitEntity.object3D.visible = false;
    }
  },

  createHitEntity: function () {
    var el = document.createElement('a-entity');
    el.setAttribute('geometry', 'primitive: cylinder; radius: ' + this.data.hitCylinderRadius + '; height: ' + this.data.hitCylinderHeight);
    el.setAttribute('material', 'color: ' + this.data.hitCylinderColor + '; shader: flat; transparent: true; opacity: 0.8');
    el.classList.add('teleport-hit');
    this.el.sceneEl.appendChild(el);
    this.hitEntity = el;
  },

  tick: function () {
    if (!this.active) return;
    var direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(this.el.object3D.quaternion);
    var origin = this.el.object3D.position.clone();

    this.raycaster.set(origin, direction);
    var floor = document.querySelector(this.data.hitEntity);
    if (!floor) return;

    var obj3D = floor.object3D;
    var intersects = this.raycaster.intersectObject(obj3D, true);

    if (intersects.length > 0) {
      var point = intersects[0].point;
      if (this.hitEntity) {
        this.hitEntity.object3D.position.copy(point);
        this.hitEntity.object3D.visible = true;
      }
    } else if (this.hitEntity) {
      this.hitEntity.object3D.visible = false;
    }
  }
});


/* ================================================================
   EMISSIVE-PULSE - Pulso de color emissive
   ================================================================ */
AFRAME.registerComponent('emissive-pulse', {
  schema: {
    color: { type: 'color', default: '#FF6600' },
    min:   { type: 'number', default: 0.8 },
    max:   { type: 'number', default: 1.2 },
    speed: { type: 'number', default: 1.0 }
  },

  init: function () {
    this.timeAcc = 0;
  },

  tick: function (time, delta) {
    var dt = delta / 1000;
    if (dt <= 0 || dt > 0.5) return;
    this.timeAcc += dt * this.data.speed;
    var range = this.data.max - this.data.min;
    var val = this.data.min + (Math.sin(this.timeAcc) * 0.5 + 0.5) * range;
    this.el.setAttribute('material', 'emissiveIntensity', val.toFixed(2));
  }
});


/* ================================================================
   PATROL - Movimiento de patrulla por waypoints aleatorios
   Uso: <a-entity patrol="speed: 3; bounds: 38,22,38; turnRate: 2">
   ================================================================ */
AFRAME.registerComponent('patrol', {
  schema: {
    speed:    { type: 'number', default: 3 },
    bounds:   { type: 'vec3',   default: { x: 38, y: 22, z: 38 } },
    turnRate: { type: 'number', default: 2 },
    minY:     { type: 'number', default: 3 },
    maxY:     { type: 'number', default: 20 }
  },

  init: function () {
    this._target = new THREE.Vector3();
    this._direction = new THREE.Vector3();
    this._pickTarget();
  },

  _pickTarget: function () {
    var b = this.data.bounds;
    this._target.set(
      (Math.random() - 0.5) * 2 * b.x,
      this.data.minY + Math.random() * (this.data.maxY - this.data.minY),
      (Math.random() - 0.5) * 2 * b.z
    );
  },

  tick: function (time, delta) {
    var dt = Math.min(delta / 1000, 0.1);
    if (dt <= 0) return;

    var pos = this.el.object3D.position;
    this._direction.copy(this._target).sub(pos);
    var dist = this._direction.length();

    if (dist < 1.5) {
      this._pickTarget();
      return;
    }

    this._direction.normalize();

    // Mover
    var step = this.data.speed * dt;
    if (step > dist) step = dist;
    pos.x += this._direction.x * step;
    pos.y += this._direction.y * step;
    pos.z += this._direction.z * step;

    // Rotar suavemente hacia la dirección de movimiento
    var targetQuat = new THREE.Quaternion();
    var lookDir = this._direction.clone();
    // La nave apunta su nariz (eje Z negativo o positivo) hacia donde va
    var up = new THREE.Vector3(0, 1, 0);
    var m4 = new THREE.Matrix4().lookAt(
      new THREE.Vector3(0, 0, 0),
      lookDir,
      up
    );
    targetQuat.setFromRotationMatrix(m4);

    this.el.object3D.quaternion.slerp(targetQuat, this.data.turnRate * dt);
  }
});


/* ================================================================
   COMET - Cometa con estela de partículas
   Uso: <a-entity comet="speed: 6; bounds: 37,22,37">
   ================================================================ */
AFRAME.registerComponent('comet', {
  schema: {
    speed:    { type: 'number', default: 5 },
    bounds:   { type: 'vec3',   default: { x: 37, y: 22, z: 37 } },
    trailLen: { type: 'number', default: 40 }
  },

  init: function () {
    this._target = new THREE.Vector3();
    this._direction = new THREE.Vector3();
    this._history = [];
    this._pickTarget();

    // Crear sistema de partículas para la cola
    var trailGeo = new THREE.BufferGeometry();
    var trailCount = this.data.trailLen;
    var positions = new Float32Array(trailCount * 3);
    var colors = new Float32Array(trailCount * 3);
    var sizes = new Float32Array(trailCount);

    for (var i = 0; i < trailCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.7 + 0.3 * (1 - i / trailCount);
      colors[i * 3 + 2] = 0.2 + 0.3 * (1 - i / trailCount);
      sizes[i] = 0.25 * (1 - i / trailCount);
    }

    trailGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    trailGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    trailGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    var trailMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8
    });

    this._trailPoints = new THREE.Points(trailGeo, trailMat);
    this.el.object3D.add(this._trailPoints);
  },

  _pickTarget: function () {
    var b = this.data.bounds;
    this._target.set(
      (Math.random() - 0.5) * 2 * b.x,
      5 + Math.random() * 16,
      (Math.random() - 0.5) * 2 * b.z
    );
  },

  tick: function (time, delta) {
    var dt = Math.min(delta / 1000, 0.1);
    if (dt <= 0) return;

    var pos = this.el.object3D.position;

    // Guardar posición en historial
    this._history.push(pos.clone());
    if (this._history.length > this.data.trailLen) {
      this._history.shift();
    }

    // Actualizar posiciones de la cola
    var trailGeo = this._trailPoints.geometry;
    var trailPos = trailGeo.attributes.position;
    var trailCol = trailGeo.attributes.color;
    var trailSiz = trailGeo.attributes.size;
    var len = this._history.length;

    for (var i = 0; i < this.data.trailLen; i++) {
      if (i < len) {
        var hp = this._history[len - 1 - i];
        var localHp = this.el.object3D.worldToLocal(hp.clone());
        trailPos.array[i * 3] = localHp.x;
        trailPos.array[i * 3 + 1] = localHp.y;
        trailPos.array[i * 3 + 2] = localHp.z;
        var fade = 1 - i / this.data.trailLen;
        trailCol.array[i * 3] = 1;
        trailCol.array[i * 3 + 1] = 0.5 + 0.5 * fade;
        trailCol.array[i * 3 + 2] = 0.1 + 0.4 * fade;
        trailSiz.array[i] = 0.3 * fade;
      } else {
        trailPos.array[i * 3] = 0;
        trailPos.array[i * 3 + 1] = 0;
        trailPos.array[i * 3 + 2] = 0;
        trailSiz.array[i] = 0;
      }
    }
    trailPos.needsUpdate = true;
    trailCol.needsUpdate = true;
    trailSiz.needsUpdate = true;

    // Movimiento hacia el target
    this._direction.copy(this._target).sub(pos);
    var dist = this._direction.length();
    if (dist < 2) {
      this._pickTarget();
      return;
    }
    this._direction.normalize();
    var step = this.data.speed * dt;
    if (step > dist) step = dist;
    pos.x += this._direction.x * step;
    pos.y += this._direction.y * step;
    pos.z += this._direction.z * step;

    // Rotar hacia dirección de movimiento
    var lookDir = this._direction.clone();
    var m4 = new THREE.Matrix4().lookAt(
      new THREE.Vector3(0, 0, 0), lookDir, new THREE.Vector3(0, 1, 0)
    );
    var tq = new THREE.Quaternion().setFromRotationMatrix(m4);
    this.el.object3D.quaternion.slerp(tq, 2.5 * dt);
  }
});
