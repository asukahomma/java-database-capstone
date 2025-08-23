function renderHeader()
{
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;

    const path = window.location.pathname || "";
    const isRoot =
        path.endsWith("/") ||
        path.endsWith("/index.html");

    if (isRoot) {
        localStorage.removeItem("userRole");
        let bareHeader = `
            <header class="header">
                <div class="logo-section">
                    <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
                    <span class="logo-title">Hospital CMS</span>
                </div>
            </header>
        `;
        headerDiv.innerHTML = bareHeader;
        return;
    }

  const role = localStorage.getItem("userRole");        // "admin", "doctor", "patient", "loggedPatient"
  const token = localStorage.getItem("token");          // generic auth token (string)

  let headerContent = `
    <header class="header">
      <div class="logo-section" onclick="navigateHome()" style="cursor:pointer" title="Go Home">
        <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav class="header-actions">
  `;

  // 6) Session expiry/invalid login handling
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  // 7) Role-specific UI
  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn" title="Add a new doctor">Add Doctor</button>
      <a href="#" id="logoutLink" class="logout-link">Logout</a>
    `;
  } else if (role === "doctor") {
    headerContent += `
      <button id="doctorHomeBtn" class="adminBtn" title="Doctor Home">Home</button>
      <a href="#" id="logoutLink" class="logout-link">Logout</a>
    `;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>
    `;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn" title="Home">Home</button>
      <button id="patientAppointments" class="adminBtn" title="Appointments">Appointments</button>
      <a href="#" id="logoutPatientLink" class="logout-link">Logout</a>
    `;
  } else {
    // No role set: show generic login options (acts like "patient")
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>
    `;
  }

  // 9) Close header section
  headerContent += `
      </nav>
    </header>
  `;

  // 10) Render
  headerDiv.innerHTML = headerContent;

  // 11) Wire up events for newly injected elements
  attachHeaderButtonListeners();

}

/* ==============================
   Helper Functions
============================== */
function attachHeaderButtonListeners() {
    // Admin: Add Doctor opens modal
    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
      addDocBtn.addEventListener("click", () => openModal("addDoctor"));
    }
  
    // Shared logout for admin/doctor
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
    }
  
    // Patient unauthenticated: open modals for login/signup
    const patientLogin = document.getElementById("patientLogin");
    if (patientLogin) {
      patientLogin.addEventListener("click", () => openModal("patientLogin"));
    }
  
    const patientSignup = document.getElementById("patientSignup");
    if (patientSignup) {
      patientSignup.addEventListener("click", () => openModal("patientSignup"));
    }
  
    // Logged patient: navigation + logout
    const homeBtn = document.getElementById("home");
    if (homeBtn) {
      homeBtn.addEventListener("click", () => {
        window.location.href = "/pages/loggedPatientDashboard.html";
      });
    }
  
    const appointmentsBtn = document.getElementById("patientAppointments");
    if (appointmentsBtn) {
      appointmentsBtn.addEventListener("click", () => {
        window.location.href = "/pages/patientAppointments.html";
      });
    }
  
    const logoutPatientLink = document.getElementById("logoutPatientLink");
    if (logoutPatientLink) {
      logoutPatientLink.addEventListener("click", (e) => {
        e.preventDefault();
        logoutPatient();
      });
    }
  
    // Doctor: home shortcut (if you prefer route change vs. role select)
    const doctorHomeBtn = document.getElementById("doctorHomeBtn");
    if (doctorHomeBtn) {
      doctorHomeBtn.addEventListener("click", () => {
        // Navigate to doctor dashboard (adjust path as needed)
        window.location.href = "/pages/doctorDashboard.html";
      });
    }
  }

  function logout() {
    // Clear all session data relevant to admin/doctor
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  
  function logoutPatient() {
    // Remove patient token and role, then redirect to a suitable page
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/"; // or "/pages/patientLogin.html"
  }
  
  function navigateHome() {
    // If you want role-aware home behavior:
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      window.location.href = "/pages/adminDashboard.html";
    } else if (role === "doctor") {
      window.location.href = "/pages/doctorDashboard.html";
    } else if (role === "loggedPatient") {
      window.location.href = "/pages/loggedPatientDashboard.html";
    } else {
      window.location.href = "/";
    }
  }

  /* ==============================
   Fallbacks / Stubs
============================== */
// If your app defines openModal elsewhere, this will be ignored.
// This simple fallback enables basic demo behavior.
if (typeof window.openModal !== "function") {
    window.openModal = function (type) {
      // Expect a modal overlay pattern with ids: modalOverlay, modalBody
      const overlay = document.getElementById("modalOverlay");
      const body = document.getElementById("modalBody") || document.getElementById("modal-body");
      if (!overlay) {
        console.warn("Modal overlay element (#modalOverlay) not found.");
        return;
      }
      if (body) {
        body.innerHTML = `<h3 style="margin-top:0">Open modal: ${type}</h3>
          <p>This is a placeholder modal content for <code>${type}</code>.</p>`;
      }
      overlay.classList.add("active");
      overlay.style.display = "flex";
      overlay.setAttribute("aria-hidden", "false");
  
      // Wire close button if present
      const closeBtn = document.getElementById("closeModal");
      if (closeBtn) {
        closeBtn.onclick = closeModal;
      }
    };
  }
  
  function closeModal() {
    const overlay = document.getElementById("modalOverlay");
    if (!overlay) return;
    overlay.classList.remove("active");
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
  }
  
  /* ==============================
     Initialize
  ============================== */
  window.addEventListener("DOMContentLoaded", renderHeader);
  
  // Also expose for manual re-rendering after auth/role changes
  window.renderHeader = renderHeader;
  window.logout = logout;
  window.logoutPatient = logoutPatient;

/*
  Step-by-Step Explanation of Header Section Rendering

  This code dynamically renders the header section of the page based on the user's role, session status, and available actions (such as login, logout, or role-switching).

  1. Define the `renderHeader` Function

     * The `renderHeader` function is responsible for rendering the entire header based on the user's session, role, and whether they are logged in.

  2. Select the Header Div

     * The `headerDiv` variable retrieves the HTML element with the ID `header`, where the header content will be inserted.
       ```javascript
       const headerDiv = document.getElementById("header");
       ```

  3. Check if the Current Page is the Root Page

     * The `window.location.pathname` is checked to see if the current page is the root (`/`). If true, the user's session data (role) is removed from `localStorage`, and the header is rendered without any user-specific elements (just the logo and site title).
       ```javascript
       if (window.location.pathname.endsWith("/")) {
         localStorage.removeItem("userRole");
         headerDiv.innerHTML = `
           <header class="header">
             <div class="logo-section">
               <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
               <span class="logo-title">Hospital CMS</span>
             </div>
           </header>`;
         return;
       }
       ```

  4. Retrieve the User's Role and Token from LocalStorage

     * The `role` (user role like admin, patient, doctor) and `token` (authentication token) are retrieved from `localStorage` to determine the user's current session.
       ```javascript
       const role = localStorage.getItem("userRole");
       const token = localStorage.getItem("token");
       ```

  5. Initialize Header Content

     * The `headerContent` variable is initialized with basic header HTML (logo section), to which additional elements will be added based on the user's role.
       ```javascript
       let headerContent = `<header class="header">
         <div class="logo-section">
           <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
           <span class="logo-title">Hospital CMS</span>
         </div>
         <nav>`;
       ```

  6. Handle Session Expiry or Invalid Login

     * If a user with a role like `loggedPatient`, `admin`, or `doctor` does not have a valid `token`, the session is considered expired or invalid. The user is logged out, and a message is shown.
       ```javascript
       if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
         localStorage.removeItem("userRole");
         alert("Session expired or invalid login. Please log in again.");
         window.location.href = "/";   or a specific login page
         return;
       }
       ```

  7. Add Role-Specific Header Content

     * Depending on the user's role, different actions or buttons are rendered in the header:
       - **Admin**: Can add a doctor and log out.
       - **Doctor**: Has a home button and log out.
       - **Patient**: Shows login and signup buttons.
       - **LoggedPatient**: Has home, appointments, and logout options.
       ```javascript
       else if (role === "admin") {
         headerContent += `
           <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
           <a href="#" onclick="logout()">Logout</a>`;
       } else if (role === "doctor") {
         headerContent += `
           <button class="adminBtn"  onclick="selectRole('doctor')">Home</button>
           <a href="#" onclick="logout()">Logout</a>`;
       } else if (role === "patient") {
         headerContent += `
           <button id="patientLogin" class="adminBtn">Login</button>
           <button id="patientSignup" class="adminBtn">Sign Up</button>`;
       } else if (role === "loggedPatient") {
         headerContent += `
           <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
           <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
           <a href="#" onclick="logoutPatient()">Logout</a>`;
       }
       ```



  9. Close the Header Section



  10. Render the Header Content

     * Insert the dynamically generated `headerContent` into the `headerDiv` element.
       ```javascript
       headerDiv.innerHTML = headerContent;
       ```

  11. Attach Event Listeners to Header Buttons

     * Call `attachHeaderButtonListeners` to add event listeners to any dynamically created buttons in the header (e.g., login, logout, home).
       ```javascript
       attachHeaderButtonListeners();
       ```


  ### Helper Functions

  13. **attachHeaderButtonListeners**: Adds event listeners to login buttons for "Doctor" and "Admin" roles. If clicked, it opens the respective login modal.

  14. **logout**: Removes user session data and redirects the user to the root page.

  15. **logoutPatient**: Removes the patient's session token and redirects to the patient dashboard.

  16. **Render the Header**: Finally, the `renderHeader()` function is called to initialize the header rendering process when the page loads.
*/
   
