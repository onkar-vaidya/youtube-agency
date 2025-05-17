document.addEventListener('DOMContentLoaded', function() {
  // Hero section animations and interactivity (mobile optimized)
  const playButton = document.querySelector('.play-button-circle');
  const floatingElements = document.querySelectorAll('.floating-element');
  const isMobile = window.innerWidth < 768;
  
  // Add lighter tilt effect for mobile devices
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(floatingElements, {
      max: isMobile ? 8 : 15,
      speed: isMobile ? 300 : 400,
      glare: !isMobile, // Disable glare on mobile for performance
      "max-glare": 0.3,
      scale: isMobile ? 1.02 : 1.05,
      gyroscope: true,  // Use device orientation on mobile
      gyroscopeMinAngleX: -10,
      gyroscopeMaxAngleX: 10,
      gyroscopeMinAngleY: -10,
      gyroscopeMaxAngleY: 10
    });
  }
  
  // Add click event to play button
  if (playButton) {
    playButton.addEventListener('click', function() {
      // Here you can add video popup functionality if needed
      alert('Video feature coming soon!');
    });
  }
  
  // Add scroll animation for hero section
  const heroScrollIndicator = document.querySelector('.hero-scroll-indicator a');
  if (heroScrollIndicator) {
    heroScrollIndicator.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Adjust scroll offset for mobile
        const scrollOffset = isMobile ? 40 : 60;
        window.scrollTo({
          top: targetSection.offsetTop - scrollOffset,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Optimize AOS animations for mobile
  document.addEventListener('aos:init', function() {
    if (isMobile) {
      // Reduce animation duration on mobile for better performance
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach(el => {
        const currentDuration = el.getAttribute('data-aos-duration');
        if (currentDuration && parseInt(currentDuration) > 600) {
          el.setAttribute('data-aos-duration', '600');
        }
        
        // Reduce delay on mobile
        const currentDelay = el.getAttribute('data-aos-delay');
        if (currentDelay && parseInt(currentDelay) > 200) {
          el.setAttribute('data-aos-delay', '200');
        }
      });
    }
  });
  const navTrigger = document.querySelector('.nav-trigger');
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        navTrigger.checked = false;
        document.body.style.overflow = '';
        
        window.scrollTo({
          top: targetSection.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });
  navTrigger.addEventListener('change', () => {
    document.body.style.overflow = navTrigger.checked ? 'hidden' : '';
  });

  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('.custom-header')?.offsetHeight || 0;
    let current = '';

    sections.forEach(section => {
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - headerHeight - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  const popupMessage = document.getElementById('popupMessage');

  if (contactForm && popupMessage) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      popupMessage.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        popupMessage.style.display = 'none';
      }, 3000);
    });
  }
});

