// NEXUS Game Studio Landing - Main Entry Point
import './style.scss';
import { initParticles } from './js/particles.js';
import { initThreeJS } from './js/threejs-scene.js';
import { initGlitchEffects } from './js/glitch.js';
import { initScrollAnimations } from './js/scroll-animations.js';
import { initNavigation } from './js/navigation.js';
import { initForm } from './js/forms.js';

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Loader
  initLoader();
  
  // Initialize all modules
  initParticles();
  initThreeJS();
  initGlitchEffects();
  initScrollAnimations();
  initNavigation();
  initForm();
  
  // Hide loader after everything is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      hideLoader();
    }, 1500);
  });
});

// Loader functionality
function initLoader() {
  const loader = document.getElementById('loader');
  const progressBar = loader.querySelector('.loader__progress-bar');
  const terminalText = loader.querySelector('.loader__text');
  
  const messages = [
    'INITIALIZING SYSTEMS...',
    'LOADING ASSETS...',
    'RENDERING INTERFACE...',
    'ALMOST READY...'
  ];
  
  let progress = 0;
  let messageIndex = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    
    // Change message at certain progress points
    if (progress > 25 && messageIndex === 0) {
      messageIndex = 1;
      terminalText.textContent = messages[1];
    } else if (progress > 50 && messageIndex === 1) {
      messageIndex = 2;
      terminalText.textContent = messages[2];
    } else if (progress > 75 && messageIndex === 2) {
      messageIndex = 3;
      terminalText.textContent = messages[3];
    }
    
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 200);
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('loaded');
  
  // Trigger entrance animations after loader is hidden
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);
}

// Handle smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
