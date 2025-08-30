import {openModal} from '../components/modals.js';
import {getDoctors, filterDoctors, saveDoctor} './services/doctorServices.js';
import {createDoctorCard} from './components/doctorCard.js';

document.getElementById('addDocBtn').addEventListener('click', () => {
    openModal('addDoctor');
});

document.getElementById('saveDoctorBtn').addEventListener('click', () =>{
    adminAddDoctor();
})

document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);

window.onload = function (){
    loadDoctorCards();
    
}

function loadDoctorCards(){
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    }catch(error){
        console.error('Failed to loadDoctorCards', error);
    }
}

function filterDoctorsOnChange(){
    try {
        const name = document.getElementById("searchBar").value ; 
        const time = document.getElementById("filterTime").value;
        const specialty = document.getElementById("filterSpecialty").value;

        const safeName = name && name.trim() !== "" ? name : null;
        const safeTime = time && time.trim() !== "" ? time : null;
        const safeSpecialty = specialty && specialty.trim() !== "" ? specialty : null;

        doctors = await filterDoctors(safeName, safeTime, safeSpecialty);
        if(doctors == []){
            content.innerHTML = "<p> No doctors found with the given filters.</p>";
            return;
        }
        renderDoctorCards(doctors);

    }catch(error){
        alert("Failed to filter doctors");
    }
}

function renderDoctorCards(doctors){
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";
    
    docotrs.forEach((doctor) => 
        const doctorCard = createDoctorCard(doctor);
        contentDiv.appendChild(doctorCard);
    }
}
/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form


  Attach a click listener to the "Add Doctor" button
  When clicked, it opens a modal form using openModal('addDoctor')


  When the DOM is fully loaded:
    - Call loadDoctorCards() to fetch and display all doctors


  Function: loadDoctorCards
  Purpose: Fetch all doctors and display them as cards

    Call getDoctors() from the service layer
    Clear the current content area
    For each doctor returned:
    - Create a doctor card using createDoctorCard()
    - Append it to the content div

    Handle any fetch errors by logging them


  Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  On any input change, call filterDoctorsOnChange()


  Function: filterDoctorsOnChange
  Purpose: Filter doctors based on name, available time, and specialty

    Read values from the search bar and filters
    Normalize empty values to null
    Call filterDoctors(name, time, specialty) from the service

    If doctors are found:
    - Render them using createDoctorCard()
    If no doctors match the filter:
    - Show a message: "No doctors found with the given filters."

    Catch and display any errors with an alert


  Function: renderDoctorCards
  Purpose: A helper function to render a list of doctors passed to it

    Clear the content area
    Loop through the doctors and append each card to the content area


  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor to the system

    Collect input values from the modal form
    - Includes name, email, phone, password, specialty, and available times

    Retrieve the authentication token from localStorage
    - If no token is found, show an alert and stop execution

    Build a doctor object with the form values

    Call saveDoctor(doctor, token) from the service

    If save is successful:
    - Show a success message
    - Close the modal and reload the page

    If saving fails, show an error message
*/

function adminAddDoctor(){
    const nameEl = document.getElementById('doctorName');
    const specialtyEl = document.getElementById('specialization');
    const emailEl = document.getElementById('doctorEmail');
    const passwordEl = document.getElementById('doctorPassword');
    const phoneEl = document.getElementById('doctorPhone');
    const availabilityEl= document.querySelectorAll('input[name="availability"]:checked');

    const name = nameEl?.value?.trim() || '';
    const email = emailEl?.value?.trim() || '';
    const phone = phoneEl?.value?.trim() || '';
    const password = passwordEl?.value || '';
    const specialty = specialtyEl?.value?.trim() || '';
    const availability = Array.from(availabilityEl).map(box => box.value) || [];

    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not authenticated. Please log in as admin first.');
        return; // stop execution
    }

    const doctor = {
        'name': name,
        'email': email,
        'phone': phone,
        'password': password,
        'specialty': specialty,
        'availability': availability
    }

    try{
        const result = await saveDoctor(doctor);

        if(result.success){
            alert(result.message);
            const modal = document.getElementById('addDoctorModal');
            if (modal) modal.style.display = 'none';
            location.reload();
        }else {
            alert(result.message);
        }

    }catch(error){
        console.error('Error saving doctor:', err);
        alert('An error occurred while saving the doctor. Please try again.');
    }




}
