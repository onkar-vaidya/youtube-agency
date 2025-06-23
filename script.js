document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.querySelector('.play-button-circle');
  const floatingElements = document.querySelectorAll('.floating-element');
  let isMobile = window.innerWidth < 768;
  
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth < 768;
  });
  
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(floatingElements, {
      max: isMobile ? 8 : 15,
      speed: isMobile ? 300 : 400,
      glare: !isMobile,
      "max-glare": 0.3,
      scale: isMobile ? 1.02 : 1.05,
      gyroscope: true,
      gyroscopeMinAngleX: -10,
      gyroscopeMaxAngleX: 10,
      gyroscopeMinAngleY: -10,
      gyroscopeMaxAngleY: 10
    });
  }
  
  if (playButton) {
    playButton.addEventListener('click', function() {
      alert('Video feature coming soon!');
    });
  }
  
  const heroScrollIndicator = document.querySelector('.hero-scroll-indicator a');
  if (heroScrollIndicator) {
    heroScrollIndicator.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const scrollOffset = isMobile ? 40 : 60;
        window.scrollTo({
          top: targetSection.offsetTop - scrollOffset,
          behavior: 'smooth'
        });
      }
    });
  }
  
  document.addEventListener('aos:init', function() {
    if (isMobile) {
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach(el => {
        const currentDuration = el.getAttribute('data-aos-duration');
        if (currentDuration && parseInt(currentDuration) > 600) {
          el.setAttribute('data-aos-duration', '600');
        }
        
        const currentDelay = el.getAttribute('data-aos-delay');
        if (currentDelay && parseInt(currentDelay) > 200) {
          el.setAttribute('data-aos-delay', '200');
        }
      });
    }
  });
  const navTrigger = document.querySelector('.nav-trigger');
  const navLinks = document.querySelectorAll('.nav-link');

  let isNavigating = false;
  let activeLink = null;
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (navTrigger) {
        navTrigger.checked = false;
      }
      
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          navLinks.forEach(l => l.classList.remove('active'));
        
          link.classList.add('active');
          activeLink = link;
          
          isNavigating = true;
          
          navTrigger.checked = false;
          document.body.style.overflow = '';
        
          const scrollOffset = isMobile ? 40 : 60;
          
          window.scrollTo({
            top: targetSection.offsetTop - scrollOffset,
            behavior: 'smooth'
          });
          
          const animationDuration = isMobile ? 1500 : 1000;
          
          setTimeout(() => {
            isNavigating = false;
          }, animationDuration);
        }
      }
    });
  });
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideNav = document.querySelector('.site-nav').contains(e.target);
    const isHamburger = e.target.closest('.nav-trigger, label[for="nav-trigger"]');
    
    if (navTrigger.checked && !isClickInsideNav && !isHamburger) {
      navTrigger.checked = false;
      document.body.style.overflow = '';
    }
  });

  // Prevent event propagation on the menu itself to avoid immediate closing
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    siteNav.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Toggle body overflow when menu is toggled
  navTrigger.addEventListener('change', () => {
    document.body.style.overflow = navTrigger.checked ? 'hidden' : '';
  });

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  window.addEventListener('scroll', throttle(() => {
    if (isNavigating) return;
    
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('.custom-header')?.offsetHeight || 0;
    let current = '';

    if (isMobile) {
      clearTimeout(window.scrollEndTimer);
      window.scrollEndTimer = setTimeout(() => {
        updateActiveSection(sections, headerHeight);
      }, 100);
      return;
    }
    
    updateActiveSection(sections, headerHeight);
    
    function updateActiveSection(sections, headerHeight) {
      let current = '';
      
      sections.forEach(section => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        const offset = isMobile ? 40 : 100;
        const scrollPosition = window.scrollY + headerHeight + offset;
        
        const threshold = isMobile ? sectionHeight / 4 : sectionHeight / 3;
        
        if (scrollPosition >= (sectionTop - threshold) && 
            scrollPosition < (sectionTop + sectionHeight)) {
          current = section.getAttribute('id');
        }
      });

      if (current) {
        const currentLink = document.querySelector(`.nav-link[href="#${current}"]`);
        
        if (currentLink && (!activeLink || activeLink !== currentLink)) {
          navLinks.forEach(link => link.classList.remove('active'));
          currentLink.classList.add('active');
          activeLink = currentLink;
        }
      }
    }
  }, isMobile ? 200 : 100));

  // Header scroll behavior
  const header = document.querySelector('.custom-header');
  let lastScroll = 0;
  const scrollThreshold = 100; // Minimum scroll amount before header hides
  
  window.addEventListener('scroll', throttle(() => {
    if (isNavigating) return;
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      // At the top of the page
      header.classList.remove('hide-header');
      header.classList.add('show-header');
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      // Scrolling down
      header.classList.add('hide-header');
      header.classList.remove('show-header');
    } else if (currentScroll < lastScroll) {
      // Scrolling up
      header.classList.remove('hide-header');
      header.classList.add('show-header');
    }
    
    lastScroll = currentScroll;
  }, 100));

  const contactForm = document.getElementById('contactForm');
  const popupMessage = document.getElementById('popupMessage');
  const closePopupBtn = document.getElementById('closePopup');
  // Google Sheets endpoint generated by Apps Script (replace with your deployed URL)
  const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzQwRBQd4gKgC59M4JG6cBVquWZ0j8W5QKU90r4YLtKJXsch-1rrMdPs-jQpafbrNyx/exec';

  if (contactForm && popupMessage) {
    // Form submission handler
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      // Basic form validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (name === '' || email === '' || message === '') {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Submit to Google Sheets via Apps Script
      const phone = document.getElementById('phone').value.trim();
      const payload = {
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      };

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Show success message after a short delay
      setTimeout(() => {
        popupMessage.style.display = 'flex';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        setTimeout(() => closePopup(), 3000);
      }, 500);

      // Send data to Google Sheets in the background
      // Using no-cors mode since we can't control the server's CORS headers
      // In this mode, we can't read the response, but the request will still go through
      fetch(SHEET_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      // In no-cors mode, we can't read the response or catch network errors
      // So we'll assume the submission was successful if we get here
      .then(() => {
        console.log('Form submission attempted (response not readable in no-cors mode)');
        // No need to show error since we can't determine success/failure
      })
      .catch((err) => {
        console.error('Form submission error:', err);
        // This will only catch network errors, not HTTP errors
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.color = 'red';
        errorMsg.style.marginTop = '10px';
        errorMsg.style.textAlign = 'center';
        errorMsg.style.padding = '10px';
        errorMsg.style.borderRadius = '5px';
        errorMsg.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        errorMsg.textContent = 'Network error. Please check your connection and try again.';
        
        // Only show one error message at a time
        const existingError = contactForm.querySelector('.error-message');
        if (existingError) {
          contactForm.removeChild(existingError);
        }
        
        contactForm.appendChild(errorMsg);
        setTimeout(() => {
          if (errorMsg.parentNode === contactForm) {
            contactForm.removeChild(errorMsg);
          }
        }, 5000);
      });
    });
    
        function closePopup() {
      popupMessage.style.display = 'none';
    }
    
    if (closePopupBtn) {
      closePopupBtn.addEventListener('click', () => {
        closePopup();
      });
    }
    
    // Close popup when clicking outside the content
    popupMessage.addEventListener('click', (event) => {
      if (event.target === popupMessage) {
        closePopup();
      }
    });
  }
});

