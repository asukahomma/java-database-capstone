# Smart Clinic – Architecture Design

## Section 1: Architecture Summary
The Smart Clinic application is a Spring Boot–based system that follows a layered architecture with clear separation of concerns. It supports both **MVC-style dashboards** (Admin and Doctor) built with **Thymeleaf templates** and **RESTful APIs** used by patient-facing modules and external clients.  

At the backend, requests are handled by **controllers** (either MVC or REST), which delegate all business operations to a centralized **service layer**. The service layer applies business rules and workflows before passing requests to the **repository layer** for data access.  

The application integrates with **two databases**. **MySQL** is used for relational, structured data such as patients, doctors, appointments, and admin information, leveraging Spring Data JPA and JPA entities. **MongoDB** is used for flexible, document-oriented data such as prescriptions, handled through Spring Data MongoDB and document models.  

This architecture ensures maintainability, testability, and scalability by isolating each responsibility into distinct layers while leveraging the strengths of both relational and NoSQL databases.  

---

## Section 2: Numbered Flow of Data and Control

1. A user accesses the system either through a **Thymeleaf dashboard** (AdminDashboard or DoctorDashboard) or through a **REST API client** (such as PatientDashboard, PatientRecord, or Appointment modules).  
2. The incoming request is routed to the appropriate **controller**. Thymeleaf controllers return HTML views, while REST controllers handle API requests and return JSON responses.  
3. Each controller delegates processing to the **service layer**, which enforces business rules, validations, and workflows (e.g., verifying doctor availability before scheduling an appointment).  
4. The service layer communicates with the **repository layer** to fetch or persist data. MySQL repositories handle relational entities, while the MongoDB repository manages document-based prescriptions.  
5. The repositories interact directly with their respective **databases**: MySQL for structured, relational data and MongoDB for flexible, unstructured data.  
6. Retrieved data is mapped into **Java model classes**: JPA entities for MySQL and `@Document` models for MongoDB. This model binding provides a consistent, object-oriented representation of the data.  
7. The bound models are returned to the user interface: either passed into Thymeleaf templates for dynamic HTML rendering or serialized into JSON objects for REST API responses.  
