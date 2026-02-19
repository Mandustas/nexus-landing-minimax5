// Three.js 3D Scene for Hero Section
import * as THREE from 'three';

let scene, camera, renderer;
let geometry, material, mesh;
let animationId;
let mouseX = 0;
let mouseY = 0;

export function initThreeJS() {
  const container = document.getElementById('hero-3d');
  if (!container) return;
  
  // Check if WebGL is available
  if (!window.WebGLRenderingContext) {
    console.warn('WebGL not supported');
    return;
  }
  
  // Scene setup
  scene = new THREE.Scene();
  
  // Camera
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  // Create geometric shape (Icosahedron - futuristic look)
  geometry = new THREE.IcosahedronGeometry(2, 1);
  
  // Custom shader material for holographic effect
  material = new THREE.MeshBasicMaterial({
    color: 0x00F0FF,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  // Add glow effect with point lights
  const light1 = new THREE.PointLight(0x00F0FF, 1, 10);
  light1.position.set(2, 2, 2);
  scene.add(light1);
  
  const light2 = new THREE.PointLight(0x7B2CBF, 0.8, 10);
  light2.position.set(-2, -2, 2);
  scene.add(light2);
  
  // Add floating particles around the main shape
  addFloatingParticles();
  
  // Handle resize
  window.addEventListener('resize', onWindowResize);
  
  // Mouse movement for parallax
  document.addEventListener('mousemove', onMouseMove);
  
  // Start animation
  animate();
}

function addFloatingParticles() {
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 100;
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00F0FF,
    transparent: true,
    opacity: 0.6
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
}

function onWindowResize() {
  const container = document.getElementById('hero-3d');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  animationId = requestAnimationFrame(animate);
  
  // Rotate mesh
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.005;
  
  // Mouse parallax effect
  mesh.rotation.x += mouseY * 0.01;
  mesh.rotation.y += mouseX * 0.01;
  
  // Gentle scale breathing effect
  const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
  mesh.scale.set(scale, scale, scale);
  
  // Update wireframe color for holographic effect
  const time = Date.now() * 0.001;
  const hue = (time * 0.1) % 1;
  material.color.setHSL(hue * 0.1 + 0.5, 1, 0.5);
  
  renderer.render(scene, camera);
}

// Cleanup function
export function destroyThreeJS() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
  
  if (geometry) geometry.dispose();
  if (material) material.dispose();
  
  window.removeEventListener('resize', onWindowResize);
  document.removeEventListener('mousemove', onMouseMove);
}
