// Scroll Animations using GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  // Animate sections on scroll
  initSectionAnimations();
  
  // Animate stat cards (counter animation)
  initStatCounters();
  
  // Animate tech cards
  initTechCards();
  
  // Animate project cards (holographic effect)
  initProjectCards();
  
  // Parallax effects
  initParallax();
}

function initSectionAnimations() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    gsap.fromTo(section, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

function initStatCounters() {
  const statCards = document.querySelectorAll('.stat-card');
  
  statCards.forEach(card => {
    const targetValue = parseInt(card.dataset.value, 10);
    const numberElement = card.querySelector('.stat-card__number');
    
    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ value: 0 }, {
          value: targetValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            numberElement.textContent = Math.round(this.targets()[0].value);
          }
        });
      }
    });
  });
}

function initTechCards() {
  const techCards = document.querySelectorAll('.tech-card');
  
  techCards.forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    // Initial state
    gsap.fromTo(card,
      { opacity: 0, y: 50, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Add 3D tilt effect on scroll
    ScrollTrigger.create({
      trigger: card,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        const rotation = (progress - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateY(${rotation}deg)`;
      }
    });
  });
}

function initParallax() {
  // Parallax for hero grid
  const heroGrid = document.querySelector('.hero__grid');
  if (heroGrid) {
    gsap.to(heroGrid, {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
  
  // Parallax for background elements
  const backgrounds = document.querySelectorAll('.about, .tech, .contact');
  backgrounds.forEach(bg => {
    gsap.fromTo(bg,
      { backgroundPosition: '50% 0%' },
      {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: bg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });
}

// Additional entrance animations for elements
export function initEntranceAnimations() {
  // Hero content animation
  const heroContent = document.querySelector('.hero__content');
  if (heroContent && !document.body.classList.contains('loaded')) {
    gsap.fromTo(heroContent.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: 'power3.out'
      }
    );
  }
}
