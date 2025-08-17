# User Story Template

**Title:**
_As a [user role], I want [feature/goal], so that [reason]._

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Priority:** [High/Medium/Low]
**Story Points:** [Estimated Effort in Points]
**Notes:**
- [Additional information or edge cases]

---
## Admin User Stories

## 1. Admin Login

**Title:** 
_As an Admin, I want to log into the portal with my username and password, so that I can manage the platform securely._  

**Acceptance Criteria:**
1. Admin must provide a valid username and password.
2. Login fails with an error message if credentails are invalid.
3. Successfull Login redirects to the Admin Dashboard.

**Priority:** High
**Story Points:** 3
**Notes:**
- Passwords must be stored securely (hashed).  
- Support account lockout after multiple failed attempts.

---

## 2. Admin Logout
**Title:**  
_As an Admin, I want to log out of the portal, so that I can protect system access._  

**Acceptance Criteria:**  
1. Logout ends the active session.  
2. After logout, admin cannot access restricted pages without logging in again.  
3. A confirmation message is displayed on logout.  

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Expired sessions should automatically log the admin out.  

---

## 3. Add Doctor
**Title:**  
_As an Admin, I want to add doctors to the portal, so that doctors can access and manage their appointments._  

**Acceptance Criteria:**  
1. Admin can add a new doctor with required details (name, specialization, email).  
2. System validates that email is unique.  
3. A doctor account is created and login credentials are generated.  

**Priority:** High  
**Story Points:** 5  
**Notes:**  
- Doctor accounts should default to "active" status.  

---

## 4. Delete Doctor
**Title:**  
_As an Admin, I want to delete a doctor’s profile from the portal, so that inactive or invalid accounts can be removed._  

**Acceptance Criteria:**  
1. Admin can select and delete a doctor profile.  
2. Deletion removes login access for the doctor.  
3. A warning prompt is shown before deletion.  

**Priority:** Medium  
**Story Points:** 3  
**Notes:**  
- Consider whether appointments linked to the doctor should also be archived or reassigned.  

---

## 5. Run Reports in MySQL
**Title:**  
_As an Admin, I want to run a stored procedure in MySQL CLI to get the number of appointments per month, so that I can track usage statistics._  

**Acceptance Criteria:**  
1. A stored procedure exists to return appointment counts per month.  
2. Admin can execute the procedure from MySQL CLI.  
3. Results show month names and appointment counts clearly.  

**Priority:** Medium  
**Story Points:** 5  
**Notes:**  
- Consider extending reports to support filtering by doctor or patient.

---

## Patient User Stories

## 1. View Doctors Without Login
**Title:**  
_As a Patient, I want to view a list of doctors without logging in, so that I can explore options before registering._  

**Acceptance Criteria:**  
1. Patients can see a public list of available doctors.  
2. The list includes doctor name, specialization, and availability.  
3. No login or registration is required.  

**Priority:** Medium  
**Story Points:** 3  
**Notes:**  
- Only limited info is shown publicly (no private data).  

---

## 2. Patient Registration
**Title:**  
_As a Patient, I want to sign up using my email and password, so that I can book appointments._  

**Acceptance Criteria:**  
1. Patients must provide a unique email and a secure password.  
2. Registration fails if email already exists.  
3. Successful registration creates a patient profile.  

**Priority:** High  
**Story Points:** 5  
**Notes:**  
- Password must meet minimum security standards.  

---

## 3. Patient Login
**Title:**  
_As a Patient, I want to log into the portal, so that I can manage my bookings._  

**Acceptance Criteria:**  
1. Patients can log in with registered email and password.  
2. Invalid credentials display an error message.  
3. Successful login redirects to the Patient Dashboard.  

**Priority:** High  
**Story Points:** 3  
**Notes:**  
- Session management should prevent multiple concurrent logins from the same account.  

---

## 4. Patient Logout
**Title:**  
_As a Patient, I want to log out of the portal, so that I can secure my account._  

**Acceptance Criteria:**  
1. Logout ends the current session.  
2. After logout, patient cannot access protected pages.  
3. A confirmation message is displayed on logout.  

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Session timeout should also log the patient out automatically.  

---

## 5. Book Appointment
**Title:**  
_As a Patient, I want to book an hour-long appointment, so that I can consult with a doctor._  

**Acceptance Criteria:**  
1. Patients can select a doctor and choose a time slot.  
2. Appointment duration is fixed at 1 hour.  
3. Booking fails if the slot is already taken.  

**Priority:** High  
**Story Points:** 8  
**Notes:**  
- Confirmation email/notification should be sent after booking.  

---

## 6. View Upcoming Appointments
**Title:**  
_As a Patient, I want to view my upcoming appointments, so that I can prepare accordingly._  

**Acceptance Criteria:**  
1. Patients can view a list of their scheduled appointments.  
2. Appointments are sorted by date and time.  
3. Cancelled or past appointments are excluded from the list.  

**Priority:** Medium  
**Story Points:** 4  
**Notes:**  
- Consider adding filtering options (by doctor or date).  

---

## Doctor User Stories

## 1. Doctor Login
**Title:**  
_As a Doctor, I want to log into the portal, so that I can manage my appointments._  

**Acceptance Criteria:**  
1. Doctor can log in with valid email and password.  
2. Invalid credentials show an error message.  
3. Successful login redirects to the Doctor Dashboard.  

**Priority:** High  
**Story Points:** 3  
**Notes:**  
- Sessions must be secure, with password encryption.  

---

## 2. Doctor Logout
**Title:**  
_As a Doctor, I want to log out of the portal, so that I can protect my data._  

**Acceptance Criteria:**  
1. Logout ends the current session.  
2. After logout, doctor cannot access restricted pages.  
3. A confirmation message is shown after logout.  

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Automatic logout should occur on session timeout.  

---

## 3. View Appointment Calendar
**Title:**  
_As a Doctor, I want to view my appointment calendar, so that I can stay organized._  

**Acceptance Criteria:**  
1. Doctor can view a calendar of scheduled appointments.  
2. Appointments display patient name, date, and time.  
3. Calendar is updated automatically when new appointments are booked.  

**Priority:** High  
**Story Points:** 5  
**Notes:**  
- Calendar should allow daily, weekly, and monthly views.  

---

## 4. Mark Unavailability
**Title:**  
_As a Doctor, I want to mark my unavailability, so that patients can only book available slots._  

**Acceptance Criteria:**  
1. Doctor can block out specific dates/times.  
2. Blocked slots are hidden from patient booking.  
3. Confirmation is shown after saving unavailability.  

**Priority:** High  
**Story Points:** 5  
**Notes:**  
- Support recurring unavailability (e.g., every Friday afternoon).  

---

## 5. Update Profile
**Title:**  
_As a Doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._  

**Acceptance Criteria:**  
1. Doctor can edit specialization and contact details.  
2. Updated profile information is visible to patients.  
3. Invalid data is rejected with an error message.  

**Priority:** Medium  
**Story Points:** 3  
**Notes:**  
- Consider adding profile picture support in future.  

---

## 6. View Patient Details
**Title:**  
_As a Doctor, I want to view the patient details for upcoming appointments, so that I can be prepared._  

**Acceptance Criteria:**  
1. Doctor can access basic patient details (name, age, medical history summary).  
2. Patient details are shown alongside appointment information.  
3. Access is restricted to only patients who have booked with this doctor.  

**Priority:** High  
**Story Points:** 5  
**Notes:**  
- Sensitive data must comply with privacy regulations. 
  
