document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality - removed duplicate code
  
  // Hero section animations and interactivity (mobile optimized)
  const playButton = document.querySelector('.play-button-circle');
  const floatingElements = document.querySelectorAll('.floating-element');
  let isMobile = window.innerWidth < 768;
  
  // Update mobile detection on resize
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth < 768;
  });
  
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

  // Track if navigation is currently in progress to prevent animation flashes
  let isNavigating = false;
  let activeLink = null;
  
  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Close the mobile menu when a link is clicked
      if (navTrigger) {
        navTrigger.checked = false;
      }
      
      // Only prevent default for internal links
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Clear all active classes first
          navLinks.forEach(l => l.classList.remove('active'));
        
          // Set this link as active
          link.classList.add('active');
          activeLink = link;
          
          // Set navigating flag to prevent scroll handler from changing active class
          isNavigating = true;
          
          // Close mobile menu if open
          navTrigger.checked = false;
          document.body.style.overflow = '';
        
          // Calculate scroll position with different offset for mobile
          const scrollOffset = isMobile ? 40 : 60;
          
          // Smooth scroll to the section
          window.scrollTo({
            top: targetSection.offsetTop - scrollOffset,
            behavior: 'smooth'
          });
          
          // For mobile, use a longer timeout to ensure animation completes
          const animationDuration = isMobile ? 1500 : 1000;
          
          // Reset the navigating flag after animation completes
          setTimeout(() => {
            isNavigating = false;
          }, animationDuration);
        }
      }
    });
  });
  navTrigger.addEventListener('change', () => {
    document.body.style.overflow = navTrigger.checked ? 'hidden' : '';
  });

  // Throttle function to limit how often the scroll handler runs
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

  // Use throttled scroll event with different thresholds for mobile/desktop
  window.addEventListener('scroll', throttle(() => {
    // Skip updating active class if user is currently navigating via click
    if (isNavigating) return;
    
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('.custom-header')?.offsetHeight || 0;
    let current = '';

    // Use a more aggressive throttle for mobile to prevent rapid changes
    if (isMobile) {
      // On mobile, only update when scrolling has mostly stopped
      clearTimeout(window.scrollEndTimer);
      window.scrollEndTimer = setTimeout(() => {
        updateActiveSection(sections, headerHeight);
      }, 100);
      return;
    }
    
    // For desktop, update more responsively
    updateActiveSection(sections, headerHeight);
    
    // Helper function to update the active section
    function updateActiveSection(sections, headerHeight) {
      let current = '';
      
      sections.forEach(section => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Different calculation for mobile vs desktop
        const offset = isMobile ? 40 : 100;
        const scrollPosition = window.scrollY + headerHeight + offset;
        
        // More forgiving threshold for mobile
        const threshold = isMobile ? sectionHeight / 4 : sectionHeight / 3;
        
        if (scrollPosition >= (sectionTop - threshold) && 
            scrollPosition < (sectionTop + sectionHeight)) {
          current = section.getAttribute('id');
        }
      });

      // Only update if we have a current section and it's different from active link
      if (current) {
        const currentLink = document.querySelector(`.nav-link[href="#${current}"]`);
        
        // Only update if the active link has changed
        if (currentLink && (!activeLink || activeLink !== currentLink)) {
          navLinks.forEach(link => link.classList.remove('active'));
          currentLink.classList.add('active');
          activeLink = currentLink;
        }
      }
    }
  }, isMobile ? 200 : 100)); // More aggressive throttle for mobile

  // Contact form handling with validation and improved feedback
  const contactForm = document.getElementById('contactForm');
  const popupMessage = document.getElementById('popupMessage');
  const closePopupBtn = document.getElementById('closePopup');

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
      
      // Show success message
      popupMessage.style.display = 'flex';
      
      // Reset form
      contactForm.reset();
      
      // Automatically close the popup after 5 seconds
      setTimeout(() => {
        closePopup();
      }, 5000);
    });
    
    // Function to close popup and restore scrolling
    function closePopup() {
      popupMessage.style.display = 'none';
    }
    
    // Close popup button handler
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

