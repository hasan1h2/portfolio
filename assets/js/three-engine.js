/* ==========================================================================
   PREMIUM 3D INTERACTION ENGINE - THREE.JS NEURAL CONSTELLATION SCENE
   ========================================================================== */

const InteractionEngine3D = {
  container: null,
  scene: null,
  camera: null,
  renderer: null,
  particles: null,
  linesMesh: null,
  nodesGroup: null,
  isRendering: false,
  isMobile: false,

  // Theme & Accent Color Maps
  accentColors: {
    cyan: 0x00e5ff,
    purple: 0x7b61ff,
    emerald: 0x10b981,
    blue: 0x3b82f6,
    orange: 0xf97316,
    pink: 0xec4899
  },

  currentAccent: 'cyan',
  currentTheme: 'dark',

  init() {
    this.container = document.querySelector('#hero-canvas, .three-canvas-container, #three-container');
    if (!this.container || typeof THREE === 'undefined') return;

    this.isMobile = window.innerWidth < 768;

    this.initThreeScene();
    this.bindEvents();
  },

  /**
   * Initialize Three.js Scene, Camera, Renderer, Nodes & Constellation Lines
   */
  initThreeScene() {
    if (this.renderer) this.destroyScene();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !this.isMobile, powerPreference: 'high-performance' });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.z = 6;

    // Build Neural Network Nodes & Constellation
    this.createNeuralNetwork();
    this.updateTheme(this.currentTheme, this.currentAccent);

    this.resumeRendering();
  },

  /**
   * Create Neural Network Nodes & Constellation Lines
   */
  createNeuralNetwork() {
    const nodeCount = this.isMobile ? 35 : 80;
    this.nodesGroup = new THREE.Group();
    this.nodePositions = [];

    const bounds = 8;
    const geometry = new THREE.SphereGeometry(0.04, 8, 8);
    const primaryHex = this.accentColors[this.currentAccent] || 0x00e5ff;
    const material = new THREE.MeshBasicMaterial({ color: primaryHex, transparent: true, opacity: 0.85 });

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * bounds,
        (Math.random() - 0.5) * bounds,
        (Math.random() - 0.5) * bounds
      );
      mesh.position.copy(pos);
      this.nodesGroup.add(mesh);
      this.nodePositions.push(pos);
    }

    this.scene.add(this.nodesGroup);

    // Dynamic Connecting Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: primaryHex,
      transparent: true,
      opacity: 0.2
    });

    const linePositions = [];
    const maxDistance = 2.5;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = this.nodePositions[i].distanceTo(this.nodePositions[j]);
        if (dist < maxDistance) {
          linePositions.push(
            this.nodePositions[i].x, this.nodePositions[i].y, this.nodePositions[i].z,
            this.nodePositions[j].x, this.nodePositions[j].y, this.nodePositions[j].z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    this.linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.scene.add(this.linesMesh);
  },

  /**
   * Toggle Particles / Neural Nodes Visibility
   */
  toggleParticles(enable = true) {
    if (this.nodesGroup) this.nodesGroup.visible = enable;
    if (this.linesMesh) this.linesMesh.visible = enable;
  },

  /**
   * Dynamic Theme & Accent Color Sync API
   */
  updateTheme(theme, accent) {
    this.currentTheme = theme || this.currentTheme;
    this.currentAccent = accent || this.currentAccent;

    const primaryHex = this.accentColors[this.currentAccent] || 0x00e5ff;

    if (this.nodesGroup) {
      this.nodesGroup.children.forEach(mesh => {
        if (mesh.material) mesh.material.color.setHex(primaryHex);
      });
    }

    if (this.linesMesh && this.linesMesh.material) {
      this.linesMesh.material.color.setHex(primaryHex);
      this.linesMesh.material.opacity = this.currentTheme === 'light' ? 0.35 : 0.2;
    }
  },

  /**
   * Pause Rendering Loop (Page Visibility API & Scroll Observer)
   */
  pauseRendering() {
    this.isRendering = false;
  },

  /**
   * Resume Rendering Loop
   */
  resumeRendering() {
    if (!this.isRendering) {
      this.isRendering = true;
      this.animate();
    }
  },

  /**
   * Clean up WebGL Memory & Dispose Geometries
   */
  destroyScene() {
    this.pauseRendering();
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement) this.renderer.domElement.remove();
      this.renderer = null;
    }
  },

  /**
   * Event Listeners & Observers
   */
  bindEvents() {
    // Mouse Parallax Targets
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;

    document.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - window.innerWidth / 2) * 0.0006;
      this.mouseY = (e.clientY - window.innerHeight / 2) * 0.0006;
    });

    // Theme & Accent Reactive Event Listeners
    window.addEventListener('ds-theme-change', (e) => {
      this.updateTheme(e.detail ? e.detail.theme : 'dark', this.currentAccent);
    });

    window.addEventListener('ds-accent-change', (e) => {
      this.updateTheme(this.currentTheme, e.detail ? e.detail.accent : 'cyan');
    });

    // Page Visibility Observer for Battery & 60 FPS Optimization
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseRendering();
      } else {
        this.resumeRendering();
      }
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
  },

  /**
   * Main 60 FPS Render Loop
   */
  animate() {
    if (!this.isRendering || !this.renderer || !this.scene || !this.camera) return;

    requestAnimationFrame(() => this.animate());

    this.targetX += (this.mouseX - this.targetX) * 0.05;
    this.targetY += (this.mouseY - this.targetY) * 0.05;

    if (this.nodesGroup) {
      this.nodesGroup.rotation.y += 0.001;
      this.nodesGroup.rotation.x += 0.0005;

      this.nodesGroup.rotation.y += this.targetX * 0.1;
      this.nodesGroup.rotation.x += this.targetY * 0.1;
    }

    if (this.linesMesh) {
      this.linesMesh.rotation.y += 0.001;
      this.linesMesh.rotation.x += 0.0005;
    }

    this.renderer.render(this.scene, this.camera);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  InteractionEngine3D.init();
});

if (typeof window !== 'undefined') {
  window.InteractionEngine3D = InteractionEngine3D;
}
