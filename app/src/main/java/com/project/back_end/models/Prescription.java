package com.project.back_end.models;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Size;
import org.springframework.data.mongodb.core.mapping.Field;
import com.fasterxml.jackson.annotation.JsonInclude;

@Document(collection = "prescriptions")
public class Prescription {

  // @Document annotation:
//    - Marks the class as a MongoDB document (a collection in MongoDB).
//    - The collection name is specified as "prescriptions" to map this class to the "prescriptions" collection in MongoDB.

// 1. 'id' field:
//    - Type: private String
//    - Description:
//      - Represents the unique identifier for each prescription.
//      - The @Id annotation marks it as the primary key in the MongoDB collection.
//      - The id is of type String, which is commonly used for MongoDB's ObjectId as it stores IDs as strings in the database.
@Id
private String id;

// 2. 'patientName' field:
//    - Type: private String
//    - Description:
//      - Represents the name of the patient receiving the prescription.
//      - The @NotNull annotation ensures that the patient name is required.
//      - The @Size(min = 3, max = 100) annotation ensures that the name length is between 3 and 100 characters, ensuring a reasonable name length.
@NotNull
@Size(min = 3, max = 100)
private String patientName;

// 3. 'appointmentId' field:
//    - Type: private Long
//    - Description:
//      - Represents the ID of the associated appointment where the prescription was given.
//      - The @NotNull annotation ensures that the appointment ID is required for the prescription.
@NotNull
private Long appointmentId;

// 4. 'medication' field:
//    - Type: private String
//    - Description:
//      - Represents the medication prescribed to the patient.
//      - The @NotNull annotation ensures that the medication name is required.
//      - The @Size(min = 3, max = 100) annotation ensures that the medication name is between 3 and 100 characters, which ensures meaningful medication names.
@NotNull
@Size(min = 3, max = 100)
private String medication;

// 5. 'dosage' field:
//    - Type: private String
//    - Description:
//      - Represents the dosage information for the prescribed medication.
//      - The @NotNull annotation ensures that the dosage information is provided.
@NotNull
@Size(min =3, max = 20)
private String dosage;

// 6. 'doctorNotes' field:
//    - Type: private String
//    - Description:
//      - Represents any additional notes or instructions from the doctor regarding the prescription.
//      - The @Size(max = 200) annotation ensures that the doctor's notes do not exceed 200 characters, providing a reasonable limit for additional notes.
@Size(max = 200)
private String doctorNotes;

@Field("meta")
private Metadata metadata;

@JsonInclude(JsonInclude.Include.NON_NULL)
public static class Metadata {
    private Instant createdAt;
    private Instant lastUpdated;
    private String createdBy;
    private String sourceSystem;
    private String pharmacyId;
    private List<String> tags;
    private String status;
    private String notes;

    // Getters and Setters

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getSourceSystem() {
        return sourceSystem;
    }

    public void setSourceSystem(String sourceSystem) {
        this.sourceSystem = sourceSystem;
    }

    public String getPharmacyId() {
        return pharmacyId;
    }

    public void setPharmacyId(String pharmacyId) {
        this.pharmacyId = pharmacyId;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}


// 7. Constructors:
//    - The class includes a no-argument constructor (default constructor) and a parameterized constructor that initializes the fields: patientName, medication, dosage, doctorNotes, and appointmentId.

// 8. Getters and Setters:
//    - Standard getter and setter methods are provided for all fields: id, patientName, medication, dosage, doctorNotes, and appointmentId.
//    - These methods allow access and modification of the fields of the Prescription class.

public String getId(){
    return id;
}

public void setId(String id){
    this.id = id;
}

public String getPatientName(){
    return patientName;
}

public void setPatientName(String patientName){
    this.patientName = patientName;
}

public Long getAppointmentId(){
    return appointmentId;
}

public void setAppointmentId(Long appointmentId){
    this.appointmentId = appointmentId;
}

public String getmedication(){
    return medication;
}

public void setMedication(String medication){
    this.medication = medication;
}

public String getDosage(){
    return dosage;
}

public void setDosage(String dosage){
    this.dosage = dosage;
}

public String getDoctorNotes(){
    return doctorNotes;
}

public void setDoctorNotes(String doctorNotes){
    this.doctorNotes = doctorNotes;
}
}
