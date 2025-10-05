/*
  footer.js
  Dynamically renders the footer content for all pages.

  - Selects #footer element
  - Injects structured footer HTML (logo, copyright,
    company/support/legal links)
  - Ensures consistent footer across pages
*/

function renderFooter() {
    const footerDiv = document.getElementById("footer");
    if (!footerDiv) return;
  
    footerDiv.innerHTML = `
      <footer class="footer">
        <div class="footer-container">
          <!-- Logo + copyright -->
          <div class="footer-logo">
            <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo" class="footer-logo-img">
            <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
          </div>
  
          <!-- Links Section -->
          <div class="footer-links">
            <!-- Company -->
            <div class="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>
  
            <!-- Support -->
            <div class="footer-column">
              <h4>Support</h4>
              <a href="#">Account</a>
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
            </div>
  
            <!-- Legals -->
            <div class="footer-column">
              <h4>Legals</h4>
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Licensing</a>
            </div>
          </div> <!-- End of footer-links -->
        </div> <!-- End of footer-container -->
      </footer>
    `;
  }
  
  // Initialize footer rendering after DOM loads
  window.addEventListener("DOMContentLoaded", renderFooter);
  
  // Expose for manual calls if needed
  window.renderFooter = renderFooter;

