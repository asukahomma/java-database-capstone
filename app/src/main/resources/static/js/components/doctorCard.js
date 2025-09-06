// doctorCard.js
// Builds a single doctor card element with role-aware actions (admin delete, patient booking).

/*
  Imports
  - Overlay for booking (logged-in patient)
  - deleteDoctor API (admin)
  - fetchPatientDetails API (patient info before booking)
*/
import { showBookingOverlay } from "../loggedPatient.js";
import { deleteDoctor } from "../services/doctorServices.js"
import { getPatientData } from "../services/patientServices.js";

/**
 * Create a DOM element for a single doctor card.
 * @param {Object} doctor - Doctor object with fields like id, name, specialization, email, availableTimes/availableSlots.
 * @returns {HTMLElement} - Fully composed card node.
 */
export function createDoctorCard(doctor) {
  // --- Container ---
  const card = document.createElement("div");
  card.className = "card doctor-card";
  card.dataset.doctorId = String(doctor?.id ?? doctor?._id ?? "");

  // Role and tokens
  const role = localStorage.getItem("userRole"); // "admin" | "patient" | "loggedPatient" | "doctor" | null
  const token = localStorage.getItem("token");   // generic auth token

  // --- Info wrapper ---
  const info = document.createElement("div");
  info.className = "card-info";

  // Name
  const nameEl = document.createElement("h3");
  nameEl.className = "doctor-name";
  nameEl.textContent = doctor?.name ?? "Unnamed Doctor";

  // Specialization
  const specEl = document.createElement("div");
  specEl.className = "doctor-specialization meta";
  specEl.textContent = doctor?.specialization ?? doctor?.speciality ?? "General";

  // Email
  const emailEl = document.createElement("div");
  emailEl.className = "doctor-email meta";
  emailEl.textContent = doctor?.email ?? "no-email@example.com";

  // Available times
  const timesEl = document.createElement("ul");
  timesEl.className = "doctor-times";
  const timeList = normalizeTimes(doctor);
  if (timeList.length) {
    timeList.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      timesEl.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = "No available times";
    timesEl.appendChild(li);
  }

  // Append info
  info.appendChild(nameEl);
  info.appendChild(specEl);
  info.appendChild(emailEl);
  info.appendChild(timesEl);

  // --- Actions wrapper ---
  const actions = document.createElement("div");
  actions.className = "actions";

  // =========================
  // ADMIN ROLE ACTIONS
  // =========================
  if (role === "admin") {
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "adminBtn delete-btn";
    delBtn.textContent = "Delete";
    delBtn.title = "Delete this doctor";

    delBtn.addEventListener("click", async () => {
      const adminToken = localStorage.getItem("token");
      if (!adminToken) {
        alert("Admin session expired. Please log in again.");
        window.location.href = "/";
        return;
      }

      const confirmDelete = confirm(`Delete doctor "${doctor?.name}"? This cannot be undone.`);
      if (!confirmDelete) return;

      try {
        const doctorId = doctor?.id ?? doctor?._id;
        if (!doctorId) throw new Error("Missing doctor ID.");
        await deleteDoctor(doctorId, adminToken);
        // remove card on success
        card.remove();
        toast("Doctor deleted successfully.");
      } catch (err) {
        console.error(err);
        alert(`Failed to delete doctor: ${err?.message ?? "Unknown error"}`);
      }
    });

    actions.appendChild(delBtn);
  }

  // =========================
  // PATIENT (NOT LOGGED-IN) ACTIONS
  // =========================
  else if (role === "patient" || role == null) {
    const bookBtn = document.createElement("button");
    bookBtn.type = "button";
    bookBtn.className = "button book-btn";
    bookBtn.textContent = "Book Now";

    bookBtn.addEventListener("click", () => {
      alert("Please log in to book an appointment.");
      // Optionally open login modal if present:
      if (typeof window.openModal === "function") {
        window.openModal("patientLogin");
      }
    });

    actions.appendChild(bookBtn);
  }

  // =========================
  // LOGGED-IN PATIENT ACTIONS
  // =========================
  else if (role === "loggedPatient") {
    const bookBtn = document.createElement("button");
    bookBtn.type = "button";
    bookBtn.className = "button book-btn";
    bookBtn.textContent = "Book Now";

    bookBtn.addEventListener("click", async () => {
      // Ensure token
      const patientToken = localStorage.getItem("token");
      if (!patientToken) {
        alert("Session expired. Please log in again.");
        window.location.href = "/";
        return;
      }

      try {
        // Fetch patient data
        const patient = await getPatientData(patientToken);
        if (!patient) throw new Error("Unable to fetch patient data.");

        // Show booking overlay with doctor & patient
        const payload = {
          doctor: {
            id: doctor?.id ?? doctor?._id,
            name: doctor?.name,
            email: doctor?.email,
            specialization: doctor?.specialization ?? doctor?.speciality,
            times: timeList
          },
          patient: {
            id: patient?.id ?? patient?._id,
            name: patient?.name ?? `${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`.trim(),
            email: patient?.email
          }
        };
        showBookingOverlay(payload);
      } catch (err) {
        console.error(err);
        alert(`Could not start booking: ${err?.message ?? "Unknown error"}`);
      }
    });

    actions.appendChild(bookBtn);
  }

  // (Optional) Doctor role or others: no special actions

  // Compose card
  card.appendChild(info);
  card.appendChild(actions);

  return card;
}

/* ------------------------------
   Helpers
------------------------------ */

/**
 * Normalize available time slots from a doctor object.
 * Supports common field names: availableTimes, available_slots, availableSlots, times.
 */
function normalizeTimes(doctor) {
  const candidates = [
    doctor?.availableTimes,
    doctor?.available_slots,
    doctor?.availableSlots,
    doctor?.times
  ].filter(Boolean);

  let slots = [];
  for (const c of candidates) {
    if (Array.isArray(c)) {
      slots = c;
      break;
    } else if (typeof c === "string") {
      // e.g., "09:00, 10:00, 14:30"
      slots = c.split(",").map((s) => s.trim()).filter(Boolean);
      break;
    }
  }
  return Array.isArray(slots) ? slots : [];
}

/**
 * Lightweight toast helper (non-blocking feedback).
 */
function toast(message = "") {
  try {
    const el = document.createElement("div");
    el.textContent = message;
    el.style.position = "fixed";
    el.style.bottom = "20px";
    el.style.left = "50%";
    el.style.transform = "translateX(-50%)";
    el.style.background = "#003e3e";
    el.style.color = "#fff";
    el.style.padding = "10px 16px";
    el.style.borderRadius = "10px";
    el.style.zIndex = "9999";
    el.style.boxShadow = "0 6px 16px rgba(0,0,0,.2)";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  } catch {
    // no-op fallback
  }
}

// (Optional) default export for convenience
export default createDoctorCard;


/*
Import the overlay function for booking appointments from loggedPatient.js

  Import the deleteDoctor API function to remove doctors (admin role) from docotrServices.js

  Import function to fetch patient details (used during booking) from patientServices.js

  Function to create and return a DOM element for a single doctor card
    Create the main container for the doctor card
    Retrieve the current user role from localStorage
    Create a div to hold doctor information
    Create and set the doctor’s name
    Create and set the doctor's specialization
    Create and set the doctor's email
    Create and list available appointment times
    Append all info elements to the doctor info container
    Create a container for card action buttons
    === ADMIN ROLE ACTIONS ===
      Create a delete button
      Add click handler for delete button
     Get the admin token from localStorage
        Call API to delete the doctor
        Show result and remove card if successful
      Add delete button to actions container
   
    === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
      Create a book now button
      Alert patient to log in before booking
      Add button to actions container
  
    === LOGGED-IN PATIENT ROLE ACTIONS === 
      Create a book now button
      Handle booking logic for logged-in patient   
        Redirect if token not available
        Fetch patient data with token
        Show booking overlay UI with doctor and patient info
      Add button to actions container
   
  Append doctor info and action buttons to the car
  Return the complete doctor card element
*/
