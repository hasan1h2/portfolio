/* ==========================================================================
   HABIB HASAN PORTFOLIO - THREE.JS 3D HERO INTERACTIVE SCENE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvasContainer = document.getElementById('three-canvas');
  if (!canvasContainer) return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.appendChild(renderer.domElement);

  // 1. Central 3D Geometry: Glowing Wireframe Icosahedron / Geodesic Sphere
  const geometry = new THREE.IcosahedronGeometry(12, 2);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00e5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    roughness: 0.2,
    metalness: 0.8
  });
  const mainMesh = new THREE.Mesh(geometry, material);
  scene.add(mainMesh);

  // 2. Inner Glowing Core
  const coreGeometry = new THREE.IcosahedronGeometry(6, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x7b61ff,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(coreMesh);

  // 3. Floating Particles Ring / Galaxy
  const particlesCount = 400;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  const color1 = new THREE.Color(0x00e5ff); // Cyan
  const color2 = new THREE.Color(0x7b61ff); // Purple
  const color3 = new THREE.Color(0x00ffa3); // Green

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Random position in a spherical cloud around origin
    const radius = 25 + Math.random() * 25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    // Pick random color mix
    const mixedColor = Math.random() > 0.5 ? color1 : (Math.random() > 0.5 ? color2 : color3);
    colors[i] = mixedColor.r;
    colors[i + 1] = mixedColor.g;
    colors[i + 2] = mixedColor.b;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleSystem);

  // 4. Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00e5ff, 2, 100);
  pointLight1.position.set(20, 20, 20);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x7b61ff, 2, 100);
  pointLight2.position.set(-20, -20, -20);
  scene.add(pointLight2);

  // 5. Mouse Interaction Tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX) * 0.001;
    mouseY = (e.clientY - windowHalfY) * 0.001;
  });

  // 6. Window Resize Listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 7. Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotate meshes
    mainMesh.rotation.y = elapsedTime * 0.15;
    mainMesh.rotation.x = elapsedTime * 0.1;
    coreMesh.rotation.y = -elapsedTime * 0.25;
    coreMesh.rotation.z = elapsedTime * 0.15;
    particleSystem.rotation.y = elapsedTime * 0.05;

    // Smooth Mouse parallax effect
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    scene.rotation.y = targetX * 1.5;
    scene.rotation.x = targetY * 1.5;

    renderer.render(scene, camera);
  }

  animate();
});
