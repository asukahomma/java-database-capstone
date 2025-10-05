import {getAllAppointments} from './services/appointmentRecordService.js';
import {createPatientRow} from './components/patientRows.js';

const tableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split('T')[0];
let token = localStorage.getItem("token");
let patientName = null;

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

async function loadAppointments() {

    try {
      const response = await getAllAppointments(selectedDate, patientName, token);
      const appointments = response.appointments || [];
      
      tableBody.innerHTML = "";
  
      if (appointments.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">No Appointments found for today.</td></tr>`;
        return;
      }
      console.log(appointments)
      appointments.forEach(appointment => {
        const patient = {
          id: appointment.patientId,
          name: appointment.patientName,
          phone: appointment.patientPhone,
          email: appointment.patientEmail,
        };
        console.log(appointment.doctorId)
        const row = createPatientRow(patient,appointment.id,appointment.doctorId);
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error loading appointments:", error);
      tableBody.innerHTML = `<tr><td colspan="5">Error loading appointments. Try again later.</td></tr>`;
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

