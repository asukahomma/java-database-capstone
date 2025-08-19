## MySQL Database Design

#### Table: patients
- id: INT UNSIGNED, Primary Key, Auto Incrememt
- email: VARCHAR(100), Unique, Not Null
- password: VARCHAR(255), Not Null
- name: VARCHAR(50), Not Null
- date_of_birth: DATE, Not Null
- sex: TINYINT(1) (0 = male, 1 = femail), Not Null
- initial_password_flg: INT (0 = False, 1 = True), Not Null
- deleted_at: DATETIME
- created_at: DATETIME, Not Null, DEFAULT CURRENT_TIMESTAMP
- updated_at: DATETIME, Not Null, DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP

### Table: doctors
- id: INT UNSIGNED, Primary Key, Auto Increment
- email: VARCHAR(100), Unique, Not Null
- password: VARCHAR(255), Not Null
- name: VARCHAR(50), Not Null
- date_of_birth: DATE, Not Null
- sex: TINYINT(1) (0 = male, 1 = femail), Not Null
- specialization: VARCHAR(50), Not Null
- comment: VARCHAR(300)
- initial_password_flg: INT (0 = False, 1 = True), Not Null
- created_by: INT, Not Null , Foreign Key → admin(id) ON DELETE SET NULL
- updated_by: INT, Not Null , Foreign Key → admin(id) ON DELETE SET NULL
- deleted_at: DATETIME
- created_at: DATETIME, Not Null, DEFAULT CURRENT_TIMESTAMP
- updated_at: DATETIME, Not Null, DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP

### Table: appointments
- id: INT UNSIGNED, Primary Key, Auto Increment
- doctor_id: INT UNSIGNED, Foreign Key → doctors(id) ON DELETE RESTRICT
- patient_id: INT UNSIGNED, Foreign Key → patients(id) ON DELETE RESTRICT
- appointment_time: DATETIME, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)
- created_at: DATETIME, Not Null, DEFAULT CURRENT_TIMESTAMP
- updated_at: DATETIME, Not Null, DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP
- Constraint: Unique(doctor_id, appointment_time)

### Table: admin
- id: INT UNSIGNED, Primary Key, Auto Increment
- email: VARCHAR(100), Not Null, Unique
- password: VARCHAR(255), Not Null

### Table: unavailable_slots
- id: INT UNSIGNED, Primary Key, Auto Increment
- doctor_id: INT UNSIGNED, Not Null, Foreign Key → doctors(id) ON DELETE CASCADE
- unavailable_slot: DATETIME, Not Null
- Constraint: Unique(doctor_id,unavailable_slot)

## MongoDB Collection Design

### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "patientId": 12,
  "doctorId": 30,
  "appointmentId": 51,
  "medications": [
    {
      "drug": "Paracetamol",
      "dosage": "500mg",
      "doctorNotes": "Take 1 tablet every 6 hours.",
    },
    {
      "drug": "Vitamin",
      "dosage": "300mg",
      "doctorNotes": "Take 2 tablet every 12 hours.",
    }
  ],
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  },
  "tags": ["chronic", "cardio"],
  "meta": {
    "createdAt": "2025-08-05T10:21:00Z",
    "updatedAt": "2025-08-10T09:02:00Z",
    "createdBy": "system_api",
    "source": "doctor_dashboard_v2"
  }
}
