const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

const navLinks = document.querySelectorAll('.nav-menu ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});

const contactForm = document.getElementById('contactForm');
const popupMessage = document.getElementById('popupMessage');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  popupMessage.style.display = 'block';
  contactForm.reset();
  setTimeout(() => {
    popupMessage.style.display = 'none';
  }, 3000);
});
