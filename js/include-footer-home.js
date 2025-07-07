// js/include-footer-home.js
// Loads the shared blog footer into the home page with <div id="footer-include"></div>
document.addEventListener("DOMContentLoaded", function() {
  fetch("./blog/footer-home.html")
    .then(response => response.text())
    .then(data => {
      // Fix the logo path for the home page
      data = data.replace('src="./assets/brand-logo_cleaned.png"', 'src="./assets/brand-logo_cleaned.png"');
      document.getElementById("footer-include").innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading footer:", error);
    });
}); 