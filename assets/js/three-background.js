/* ==========================================================================
   ANIMATION ENGINE - THREE.JS 3D PARTICLE UNIVERSE BACKGROUND
   ========================================================================== */

const ThreeBackgroundEngine = {
  init() {
    const container = document.querySelector('#hero-canvas, .three-canvas-container, #three-container');
    if (!container || typeof THREE === 'undefined') return;

    this.container = container;
    this.isMobile = window.innerWidth < 768;
    this.particleCount = this.isMobile ? 250 : 600;

    this.setupScene();
    this.createParticles();
    this.bindMouseParallax();
    this.bindResize();
    this.animate();
  },

  setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !this.isMobile, powerPreference: 'high-performance' });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    
    // Clear existing canvas
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;
  },

  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    // Cyan (#00E5FF) and Secondary (#7B61FF) color scheme
    const colorCyan = new THREE.Color(0x00e5ff);
    const colorPurple = new THREE.Color(0x7b61ff);

    for (let i = 0; i < this.particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const mixedColor = Math.random() > 0.5 ? colorCyan : colorPurple;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: this.isMobile ? 0.04 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  },

  bindMouseParallax() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;

    document.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      this.mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    });
  },

  bindResize() {
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
  },

  animate() {
    if (!this.renderer || !this.scene || !this.camera) return;

    requestAnimationFrame(() => this.animate());

    this.targetX += (this.mouseX - this.targetX) * 0.05;
    this.targetY += (this.mouseY - this.targetY) * 0.05;

    if (this.particles) {
      this.particles.rotation.y += 0.0012;
      this.particles.rotation.x += 0.0006;

      this.particles.rotation.y += this.targetX * 0.1;
      this.particles.rotation.x += this.targetY * 0.1;
    }

    this.renderer.render(this.scene, this.camera);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ThreeBackgroundEngine.init();
});

if (typeof window !== 'undefined') {
  window.ThreeBackgroundEngine = ThreeBackgroundEngine;
}
