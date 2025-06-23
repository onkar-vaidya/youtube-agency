// js/include-footer.js
// Loads the shared blog footer into any page with <div id="footer-include"></div>
document.addEventListener("DOMContentLoaded", function() {
  fetch("../blog/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-include").innerHTML = data;
    });
});
