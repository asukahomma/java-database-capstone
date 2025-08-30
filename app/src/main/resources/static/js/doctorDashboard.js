import {getAllAppointments} from '/services/appointmentRecordService.js';
import {createPatientRow} from './components/patientRows.js';

var patientTableBody = document.getElementById('patientTableBody');
var selectedDate = todayYYYYMMDD();
var token = localStorage.getItem('token');
var patientName = null;

document.getElementById('searchBar').addEventListener('input', (e) =>{
    const val = e.target.value?.trim() || '';
    patientName = val === '' ? 'null' : val;
    loadAppointments();
});

document.getElementById('todayButton').addEventListener('click', (e) =>{
    selectedDate = todayYYYYMMDD();
    document.getElementById('datePicker').value = selectedDate;
    loadAppointments();
});

document.getElementById('datePicker').addEventListener('change', (e) =>{
    selectedDate = e.target.value;
    loadAppointments();
});

function loadAppointments(){

    try {
        const appointments = await getAllAppointments(selectedDate, patientName, token);
        patientTableBody.innerHTML = '';

        if(!appointments || appointments == []){
            patientTableBody.appendChild(messageRow('No Appointments found for today.'));
            return;
        }else {
            appointments.forEach(appointment =>{
                patientTableBody.appendChild(createPatientRow(appointment));
            });
        }
    }catch(error){
        patientTableBody.appendChild(messageRow('Error loading appointments. Try again later.'));
    }

}


// ---- Helpers ----
function todayYYYYMMDD() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function messageRow(text) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 5; // matches your table's 5 columns
    td.textContent = text;
    td.className = 'table-message';
    tr.appendChild(td);
    return tr;
}

document.addEventListener('DOMContentLoaded', () => {
    // Render common layout
    renderContent();
  
    // Sync date picker to today on load
    document.getElementById('datePicker').value = selectedDate;
  
    // Initial load for today
    loadAppointments();
  });
  



/*
  Import getAllAppointments to fetch appointments from the backend
  Import createPatientRow to generate a table row for each patient appointment


  Get the table body where patient rows will be added
  Initialize selectedDate with today's date in 'YYYY-MM-DD' format
  Get the saved token from localStorage (used for authenticated API calls)
  Initialize patientName to null (used for filtering by name)


  Add an 'input' event listener to the search bar
  On each keystroke:
    - Trim and check the input value
    - If not empty, use it as the patientName for filtering
    - Else, reset patientName to "null" (as expected by backend)
    - Reload the appointments list with the updated filter


  Add a click listener to the "Today" button
  When clicked:
    - Set selectedDate to today's date
    - Update the date picker UI to match
    - Reload the appointments for today


  Add a change event listener to the date picker
  When the date changes:
    - Update selectedDate with the new value
    - Reload the appointments for that specific date


  Function: loadAppointments
  Purpose: Fetch and display appointments based on selected date and optional patient name

  Step 1: Call getAllAppointments with selectedDate, patientName, and token
  Step 2: Clear the table body content before rendering new rows

  Step 3: If no appointments are returned:
    - Display a message row: "No Appointments found for today."

  Step 4: If appointments exist:
    - Loop through each appointment and construct a 'patient' object with id, name, phone, and email
    - Call createPatientRow to generate a table row for the appointment
    - Append each row to the table body

  Step 5: Catch and handle any errors during fetch:
    - Show a message row: "Error loading appointments. Try again later."


  When the page is fully loaded (DOMContentLoaded):
    - Call renderContent() (assumes it sets up the UI layout)
    - Call loadAppointments() to display today's appointments by default
*/
