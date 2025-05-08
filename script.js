// Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const navTrigger = document.querySelector('.nav-trigger');
  const navLinks = document.querySelectorAll('.nav-link');

  // Handle navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        navTrigger.checked = false;
        document.body.style.overflow = '';
        
        setTimeout(() => {
          window.scrollTo({
            top: targetSection.offsetTop - 60,
            behavior: 'smooth'
          });
        }, 300);
      }
    });
  });

  // Lock body scroll when menu is open
  navTrigger.addEventListener('change', () => {
    document.body.style.overflow = navTrigger.checked ? 'hidden' : '';
  });

  // Handle scroll events for active state
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    navLinks.forEach(link => {
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const sectionTop = targetSection.offsetTop - 100;
        const sectionBottom = sectionTop + targetSection.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });
});

// Add scroll event listener for active state
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  let current = '';

  sections.forEach(section => {
    if (!section) return;
    
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector('.custom-header')?.offsetHeight || 0;
    
    if (window.pageYOffset >= sectionTop - headerHeight && window.pageYOffset < sectionTop + sectionHeight - headerHeight) {
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

// Handle scroll for smooth transitions
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    section.style.scrollMarginTop = `${document.querySelector('.custom-header').offsetHeight}px`;
  });
});

// Handle outside clicks
function closeMenuOnOutsideClick(e) {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    toggleMenu(false);
  }
}

// Add event listeners for both click and touchstart
document.addEventListener('click', closeMenuOnOutsideClick);
document.addEventListener('touchstart', closeMenuOnOutsideClick);

// Handle scroll for active state
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector('.custom-header').offsetHeight;
    
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

// Handle scroll for smooth transitions
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    section.style.scrollMarginTop = `${document.querySelector('.custom-header').offsetHeight}px`;
  });
});

// Prevent unintended highlighting
navLinks.forEach(link => {
  link.addEventListener('mouseover', (e) => {
    e.preventDefault();
  });
});

// Prevent unintended menu open
navToggle.addEventListener('mouseover', (e) => {
  e.preventDefault();
});

// Close menu when tapping outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    toggleMenu(false);
  }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const popupMessage = document.getElementById('popupMessage');

if (contactForm && popupMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    popupMessage.style.display = 'block';
    toggleMenu(false); // Close menu if open
    contactForm.reset();
    setTimeout(() => {
      popupMessage.style.display = 'none';
    }, 3000);
  });
}

// Initialize tilt effect
try {
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5
  });
} catch (error) {
  console.error('Tilt effect initialization failed:', error);
}
