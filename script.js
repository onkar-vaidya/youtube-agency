document.addEventListener('DOMContentLoaded', function() {
  const navTrigger = document.querySelector('.nav-trigger');
  const navLinks = document.querySelectorAll('.nav-link');

  // Handle smooth scrolling and menu closing
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

  // Toggle body scroll when menu is open/closed
  navTrigger.addEventListener('change', () => {
    document.body.style.overflow = navTrigger.checked ? 'hidden' : '';
  });

  // Handle active menu item on scroll
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

  // Set up contact form
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

