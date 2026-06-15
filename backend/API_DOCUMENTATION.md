# E-Rumahsakit API Documentation

## Overview
E-Rumahsakit adalah sistem manajemen rumah sakit dengan fitur lengkap untuk mengelola pasien, dokter, jadwal appointment, medical records, dan resep obat.

**Base URL:** `{{BASE_URL}}/api`
**API Version:** v1

---

## Table of Contents
1. [Authentication](#authentication)
2. [Auth Endpoints](#auth-endpoints)
3. [Admin Endpoints](#admin-endpoints)
4. [Doctor Endpoints](#doctor-endpoints)
5. [Patient Endpoints](#patient-endpoints)
6. [Appointment Endpoints](#appointment-endpoints)
7. [Medical Record Endpoints](#medical-record-endpoints)
8. [Prescription Endpoints](#prescription-endpoints)
9. [Response Format](#response-format)
10. [Error Handling](#error-handling)

---

## Authentication

### Method
API menggunakan **Laravel Sanctum** untuk token-based authentication.

### How to Get Token
1. Login dengan credentials yang valid.
2. Simpan token dari response.
3. Gunakan token di header `Authorization` untuk request berikutnya.

### Required Headers
```http
Authorization: Bearer YOUR_TOKEN_HERE
Accept: application/json
Content-Type: application/json
```

---

## Auth Endpoints

### 1. Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

### 2. Get Profile
**Endpoint:** `GET /api/auth/profile`

### 3. Logout
**Endpoint:** `POST /api/auth/logout`

---

## Admin Endpoints

### 1. List Admins
**Endpoint:** `GET /api/admin`

### 2. Create Admin
**Endpoint:** `POST /api/admin`

### 3. Show Admin
**Endpoint:** `GET /api/admin/{id}`

### 4. Update Admin
**Endpoint:** `PUT /api/admin/{id}`

### 5. Delete Admin
**Endpoint:** `DELETE /api/admin/{id}`

---

## Doctor Endpoints

### 1. List Doctors
**Endpoint:** `GET /api/doctors`

### 2. Create Doctor
**Endpoint:** `POST /api/doctors`

### 3. Show Doctor
**Endpoint:** `GET /api/doctors/{id}`

### 4. Update Doctor
**Endpoint:** `PUT /api/doctors/{id}`

### 5. Delete Doctor
**Endpoint:** `DELETE /api/doctors/{id}`

---

## Patient Endpoints

### 1. List Patients
**Endpoint:** `GET /api/patients`

### 2. Create Patient
**Endpoint:** `POST /api/patients`

### 3. Show Patient
**Endpoint:** `GET /api/patients/{id}`

### 4. Update Patient
**Endpoint:** `PUT /api/patients/{id}`

### 5. Delete Patient
**Endpoint:** `DELETE /api/patients/{id}`

---

## Appointment Endpoints

### 1. List Appointments
**Endpoint:** `GET /api/appointments`

### 2. Create Appointment
**Endpoint:** `POST /api/appointments`

### 3. Show Appointment
**Endpoint:** `GET /api/appointments/{id}`

### 4. Update Appointment
**Endpoint:** `PUT /api/appointments/{id}`

### 5. Delete Appointment
**Endpoint:** `DELETE /api/appointments/{id}`

---

## Medical Record Endpoints

### 1. List Medical Records
**Endpoint:** `GET /api/medical-record`

### 2. Create Medical Record
**Endpoint:** `POST /api/medical-record`

### 3. Show Medical Record
**Endpoint:** `GET /api/medical-record/{id}`

### 4. Update Medical Record
**Endpoint:** `PUT /api/medical-record/{id}`

### 5. Delete Medical Record
**Endpoint:** `DELETE /api/medical-record/{id}`

---

## Prescription Endpoints

### 1. List Prescriptions
**Endpoint:** `GET /api/prescriptions`

### 2. Create Prescription
**Endpoint:** `POST /api/prescriptions`

### 3. Show Prescription
**Endpoint:** `GET /api/prescriptions/{id}`

### 4. Update Prescription
**Endpoint:** `PUT /api/prescriptions/{id}`

### 5. Delete Prescription
**Endpoint:** `DELETE /api/prescriptions/{id}`

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* resource data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Testing dengan Postman

### 1. Setup Environment
- **Base URL:** `{{BASE_URL}}/api`
- **Token:** `{{TOKEN}}`

### 2. Login Flow
1. `POST {{BASE_URL}}/api/auth/login`
2. Set variable: `TOKEN` = `response.data.token`

### 3. Header
```http
Authorization: Bearer {{TOKEN}}
Content-Type: application/json
Accept: application/json
```

---

**Last Updated:** 2026-06-13
**API Version:** v1
