document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("show");
});

document.querySelectorAll("#mainNav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("show");
  });
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const popup = document.getElementById("popupMessage");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
  this.reset();
});
