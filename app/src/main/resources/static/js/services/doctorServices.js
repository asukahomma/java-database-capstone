import { API_BASE_URL } from '../config/config.js';

const DOCTOR_API = API_BASE_URL + '/doctor';


export async function getDoctors(){
    try{
        const response = await fetch(DOCTOR_API, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if(!response.ok){
            console.error('Failed to fetch doctors:', response.statusText);
            return [];
        }

        const data = await response.json();
        return data.doctors || [];
    }catch(error){
        console.error('Failed to fetch doctors:', error);
        return [];
    }
}

export async function deleteDoctor(id, token){
    try{
        const response = fetch(`${DOCTOR_API}/${id}/${token}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'}
        });

        if(!response.ok){
            return {
                'success': false,
                'message': 'Faoled to delete doctor'
            }
        }

        const data = await response.json();
        return {
            'success': true,
            'message': data.message 
        }

    }catch(error){
        console.error('Failed to delete doctor', error);
        return {
            'success': false,
            'message': 'Faoled to delete doctor'
        }
    }
}

export async function saveDoctor(doctor , token){
    try{
        const response = await fetch(`${DOCTOR_API}/${token}`,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(doctor)
        });

        if(!response.ok){
            return {
                'success': false,
                'message': 'Failed to save a new doctor.'
            }
        }

        const data = await response.json();
        return {
            'success': true,
            'message':data.message
        }

    }catch(error){
        console.error('Failed to save a new  doctor', error);
        return {
            'success': false,
            'message': 'Failed to save a new doctor.'
        }
    }
}

export async function filterDoctors(name ,time ,specialty) {
    try {
      const response = await fetch(`${DOCTOR_API}/filter/${name}/${time}/${specialty}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data; 
        
      } else {
        console.error("Failed to fetch doctors:", response.statusText);
        return { doctors: [] };
        
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
      return { doctors: [] }; 
    }
  }


