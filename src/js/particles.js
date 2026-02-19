// Particle Flow Background - Interactive particles reacting to cursor
let canvas, ctx;
let particles = [];
let mouse = { x: null, y: null, radius: 150 };
let animationId;

const PARTICLE_COUNT = 80;
const PARTICLE_COLOR = '#00F0FF';
const PARTICLE_SECONDARY_COLOR = '#7B2CBF';

export function initParticles() {
  canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  ctx = canvas.getContext('2d');
  
  resizeCanvas();
  createParticles();
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  animate();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: Math.random() > 0.5 ? PARTICLE_COLOR : PARTICLE_SECONDARY_COLOR,
      opacity: Math.random() * 0.5 + 0.2,
      baseOpacity: Math.random() * 0.5 + 0.2
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((particle, index) => {
    // Update position
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    // Bounce off edges
    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    
    // Check distance to mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        // Calculate force
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        
        // Push particles away from mouse
        particle.x -= Math.cos(angle) * force * 2;
        particle.y -= Math.sin(angle) * force * 2;
        
        // Increase opacity near mouse
        particle.opacity = particle.baseOpacity + force * 0.5;
      } else {
        particle.opacity = particle.baseOpacity;
      }
    }
    
    // Draw particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  
  // Draw connections between nearby particles
  drawConnections();
  
  animationId = requestAnimationFrame(animate);
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 120) {
        const opacity = (1 - distance / 120) * 0.15;
        
        ctx.beginPath();
        ctx.strokeStyle = PARTICLE_COLOR;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}

// Cleanup function
export function destroyParticles() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('mousemove', () => {});
}
