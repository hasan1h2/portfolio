# Mastering 60 FPS WebGL Animations with Three.js & GSAP

Creating immersive 3D canvas experiences without degrading CPU frame rates requires strict WebGL memory management and hardware-accelerated shader configurations.

## 1. BufferGeometry Optimization

Always favor `BufferGeometry` over legacy geometry representations to pass raw Float32 data directly to the GPU.

```javascript
// Efficient Particle Buffer Construction
const particleCount = 1000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ size: 0.05, color: 0x00e5ff });
const particles = new THREE.Points(geometry, material);
```

## 2. Page Visibility API Listener

Pause requestAnimationFrame loops when browser tabs are hidden or inactive to conserve laptop battery life and prevent CPU throttling:

```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseRenderLoop();
  } else {
    resumeRenderLoop();
  }
});
```

## 3. Conclusion

Integrating page visibility listeners and buffer geometries guarantees silky smooth 60 FPS 3D canvas animations on any modern browser.
