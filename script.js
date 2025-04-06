document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("show");
});

document.querySelectorAll("#mainNav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav").classList.remove("show");
  });
});
