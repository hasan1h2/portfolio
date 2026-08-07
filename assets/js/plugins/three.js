/* ==========================================================================
   GLOBAL DESIGN SYSTEM - THREE.JS BACKGROUND CANVAS WRAPPER
   ========================================================================== */

const DSPluginThree = {
  init() {
    const container = document.querySelector('#hero-canvas, .three-canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Create particle field
    const particlesCount = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ size: 0.03, color: 0x00e5ff, transparent: true, opacity: 0.6 });
    const particleSystem = new THREE.Points(geometry, material);

    scene.add(particleSystem);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };

    animate();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSPluginThree.init();
});

if (typeof window !== 'undefined') {
  window.DSPluginThree = DSPluginThree;
}
