// Glitch Text Effect - Animated glitch on hover
export function initGlitchEffects() {
  const glitchElements = document.querySelectorAll('.glitch-text');
  
  glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('glitch-active');
    });
    
    element.addEventListener('mouseleave', () => {
      element.classList.remove('glitch-active');
    });
  });
  
  // Add glitch class for CSS animations
  addGlitchStyles();
}

function addGlitchStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .glitch-text.glitch-active::before {
      opacity: 0.8 !important;
      animation: glitch-1 0.3s infinite linear alternate-reverse !important;
    }
    
    .glitch-text.glitch-active::after {
      opacity: 0.8 !important;
      animation: glitch-2 0.3s infinite linear alternate-reverse !important;
    }
    
    @keyframes glitch-1 {
      0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 0); }
      20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 0); }
      40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 0); }
      60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 0); }
      80% { clip-path: inset(10% 0 60% 0); transform: translate(-2px, 0); }
      100% { clip-path: inset(30% 0 70% 0); transform: translate(2px, 0); }
    }
    
    @keyframes glitch-2 {
      0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, 0); }
      20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 0); }
      40% { clip-path: inset(30% 0 70% 0); transform: translate(2px, 0); }
      60% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 0); }
      80% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 0); }
      100% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 0); }
    }
  `;
  document.head.appendChild(style);
}

// Optional: Random glitch effect on scroll
export function initRandomGlitch() {
  const titles = document.querySelectorAll('.glitch-text');
  
  window.addEventListener('scroll', () => {
    titles.forEach(title => {
      const rect = title.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;
      
      if (isVisible && Math.random() > 0.98) {
        title.classList.add('glitch-active');
        setTimeout(() => {
          title.classList.remove('glitch-active');
        }, 200);
      }
    });
  });
}
