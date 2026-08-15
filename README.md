# e-RumahSakit REST API

A RESTful API for hospital management systems, built with **Laravel 11**.

e-RumahSakit provides a backend service for managing hospital operations, including authentication, user accounts, doctors, patients, appointments, medical records, and prescriptions.

The application is designed as a **backend-only REST API** and is independent of any frontend framework. It can be consumed by web applications, mobile applications, or other services through HTTP requests and JSON responses.

---

## Overview

The system provides a structured backend for managing healthcare-related data while implementing authentication and role-based authorization.

The API follows RESTful principles and uses **Laravel Sanctum** for token-based authentication.

### Core Capabilities

* Authentication and authorization
* Role-based access control
* Account management
* Doctor management
* Patient management
* Appointment management
* Medical record management
* Prescription management
* Relational database management
* Request validation
* Protected API endpoints

---

## Technology Stack

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| PHP 8.2+        | Backend programming language |
| Laravel 11      | Backend framework            |
| Laravel Sanctum | Token-based authentication   |
| MySQL           | Relational database          |
| Eloquent ORM    | Database interaction         |
| Composer        | Dependency management        |
| REST API        | Application architecture     |
| JSON            | API response format          |
| Postman         | API testing                  |

---

# Architecture

The application follows a RESTful backend architecture:

```text
Client Application
       │
       │ HTTP Request
       ▼
┌───────────────────────┐
│      API Routes       │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│      Middleware       │
│ Authentication / Role │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│      Controllers      │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│       Requests        │
│      Validation       │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│   Models / Eloquent   │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│        MySQL          │
└───────────────────────┘
```

The API does not depend on a specific client implementation.

---

# Role-Based Access Control

The application implements role-based authorization with two primary roles.

| Resource           | Super Admin |               Admin              |
| ------------------ | :---------: | :------------------------------: |
| Account Management |      ✅      |                 ❌                |
| Doctor Management  |      ✅      |                 ✅                |
| Patient Management |      ✅      |                 ✅                |
| Medical Records    |      ✅      |                 ✅                |
| Appointments       |      ✅      |                 ✅                |
| Prescriptions      |      ✅      | According to authorization rules |

### Super Admin

The Super Admin has the highest level of administrative access and is responsible for managing user accounts and hospital resources.

### Admin

The Admin can manage operational hospital data but does not have permission to manage system accounts.

This separation prevents regular administrators from modifying account-level access and keeps sensitive authorization operations restricted to the Super Admin.

---

# Features

## Authentication

* User registration
* User login
* User logout
* Token-based authentication
* Laravel Sanctum
* Protected API routes
* Authentication middleware

## Account Management

Restricted to the **Super Admin**.

* Create account
* Retrieve accounts
* Retrieve account details
* Update account
* Delete account

## Doctor Management

Available to authorized administrators.

* Create doctor
* Retrieve doctors
* Retrieve doctor details
* Update doctor
* Delete doctor

## Patient Management

Available to authorized administrators.

* Create patient
* Retrieve patients
* Retrieve patient details
* Update patient
* Delete patient

## Appointment Management

* Create appointment
* Retrieve appointments
* Retrieve appointment details
* Update appointment
* Update appointment status
* Delete appointment

## Medical Records

* Create medical records
* Retrieve medical records
* Retrieve medical record details
* Update medical records
* Delete medical records
* Patient relationship
* Doctor relationship

## Prescriptions

* Create prescriptions
* Retrieve prescriptions
* Retrieve prescription details
* Update prescriptions
* Delete prescriptions
* Medical record relationship

---

# Project Structure

The repository contains the Laravel backend application inside the `backend` directory.

```text
Rest-Api-e-rumahsakit/
│
├── backend/
│   │
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Middleware/
│   │   │   └── Requests/
│   │   │
│   │   ├── Models/
│   │   └── Providers/
│   │
│   ├── bootstrap/
│   │
│   ├── config/
│   │
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   ├── public/
│   ├── resources/
│   │
│   ├── routes/
│   │   ├── api.php
│   │   ├── console.php
│   │   └── web.php
│   │
│   ├── storage/
│   ├── tests/
│   │
│   ├── .env.example
│   ├── artisan
│   ├── composer.json
│   └── composer.lock
│
├── LICENSE
└── README.md
```

---

# Requirements

Before running the application, make sure the following are installed:

* PHP 8.2 or higher
* Composer
* MySQL 8.0+ or compatible MySQL server
* Git

Recommended PHP extensions:

* OpenSSL
* PDO
* Mbstring
* Tokenizer
* XML
* Ctype
* JSON
* BCMath

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/MasMuham24/Rest-Api-e-rumahsakit.git
```

Navigate to the backend:

```bash
cd Rest-Api-e-rumahsakit/backend
```

---

## 2. Install Dependencies

```bash
composer install
```

---

## 3. Configure Environment

Copy the environment configuration:

### Windows

```bash
copy .env.example .env
```

### Linux / macOS

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

---

# Database Configuration

Create a MySQL database:

```text
e_rumahsakit
```

Configure the database connection in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_rumahsakit
DB_USERNAME=root
DB_PASSWORD=
```

Update the credentials according to your local environment.

---

# Database Migration

Run the migrations:

```bash
php artisan migrate
```

If seeders are available:

```bash
php artisan db:seed
```

Or:

```bash
php artisan migrate --seed
```

For development environments where the database needs to be completely rebuilt:

```bash
php artisan migrate:fresh --seed
```

> `migrate:fresh` deletes all existing tables and data. Use it only when resetting a development database.

---

# Running the API

Start the Laravel development server:

```bash
php artisan serve
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

API base URL:

```text
http://127.0.0.1:8000/api
```

---

# Authentication

The API uses **Laravel Sanctum** for token-based authentication.

After a successful login, the API returns an access token.

The token must be included in protected requests using the Bearer authentication scheme.

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
Accept: application/json
```

Example:

```http
GET /api/doctors
Authorization: Bearer 1|xxxxxxxxxxxxxxxx
Accept: application/json
```

---

# API Endpoints

All API endpoints are prefixed with:

```text
/api
```

## Authentication

| Method | Endpoint    | Authentication | Description            |
| ------ | ----------- | -------------: | ---------------------- |
| POST   | `/register` |             No | Register a new account |
| POST   | `/login`    |             No | Authenticate user      |
| POST   | `/logout`   |            Yes | Logout current user    |

---

## Account Management

> Restricted to Super Admin.

| Method | Endpoint       | Role        | Description       |
| ------ | -------------- | ----------- | ----------------- |
| GET    | `/admins`      | Super Admin | Retrieve accounts |
| POST   | `/admins`      | Super Admin | Create account    |
| GET    | `/admins/{id}` | Super Admin | Retrieve account  |
| PUT    | `/admins/{id}` | Super Admin | Update account    |
| DELETE | `/admins/{id}` | Super Admin | Delete account    |

---

## Doctors

| Method | Endpoint        | Role                | Description      |
| ------ | --------------- | ------------------- | ---------------- |
| GET    | `/doctors`      | Admin / Super Admin | Retrieve doctors |
| POST   | `/doctors`      | Admin / Super Admin | Create doctor    |
| GET    | `/doctors/{id}` | Admin / Super Admin | Retrieve doctor  |
| PUT    | `/doctors/{id}` | Admin / Super Admin | Update doctor    |
| DELETE | `/doctors/{id}` | Admin / Super Admin | Delete doctor    |

---

## Patients

| Method | Endpoint         | Role                | Description       |
| ------ | ---------------- | ------------------- | ----------------- |
| GET    | `/patients`      | Admin / Super Admin | Retrieve patients |
| POST   | `/patients`      | Admin / Super Admin | Create patient    |
| GET    | `/patients/{id}` | Admin / Super Admin | Retrieve patient  |
| PUT    | `/patients/{id}` | Admin / Super Admin | Update patient    |
| DELETE | `/patients/{id}` | Admin / Super Admin | Delete patient    |

---

## Appointments

| Method | Endpoint             | Role                | Description           |
| ------ | -------------------- | ------------------- | --------------------- |
| GET    | `/appointments`      | Admin / Super Admin | Retrieve appointments |
| POST   | `/appointments`      | Admin / Super Admin | Create appointment    |
| GET    | `/appointments/{id}` | Admin / Super Admin | Retrieve appointment  |
| PUT    | `/appointments/{id}` | Admin / Super Admin | Update appointment    |
| DELETE | `/appointments/{id}` | Admin / Super Admin | Delete appointment    |

---

## Medical Records

| Method | Endpoint                | Role                | Description              |
| ------ | ----------------------- | ------------------- | ------------------------ |
| GET    | `/medical-records`      | Admin / Super Admin | Retrieve medical records |
| POST   | `/medical-records`      | Admin / Super Admin | Create medical record    |
| GET    | `/medical-records/{id}` | Admin / Super Admin | Retrieve medical record  |
| PUT    | `/medical-records/{id}` | Admin / Super Admin | Update medical record    |
| DELETE | `/medical-records/{id}` | Admin / Super Admin | Delete medical record    |

---

## Prescriptions

| Method | Endpoint              | Authentication | Description            |
| ------ | --------------------- | -------------: | ---------------------- |
| GET    | `/prescriptions`      |       Required | Retrieve prescriptions |
| POST   | `/prescriptions`      |       Required | Create prescription    |
| GET    | `/prescriptions/{id}` |       Required | Retrieve prescription  |
| PUT    | `/prescriptions/{id}` |       Required | Update prescription    |
| DELETE | `/prescriptions/{id}` |       Required | Delete prescription    |

---

# API Response Format

The API returns JSON responses.

### Success Response

```json
{
    "success": true,
    "message": "Data retrieved successfully",
    "data": []
}
```

### Validation Error

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "email": [
            "The email field is required."
        ]
    }
}
```

### Authentication Error

```json
{
    "message": "Unauthenticated."
}
```

---

# Authorization Flow

The authorization flow is based on the authenticated user's role.

```text
                    Authentication
                          │
                          ▼
                  Laravel Sanctum
                          │
                          ▼
                   Check User Role
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
        Super Admin                  Admin
              │                       │
              ▼                       ▼
      Full Administration       Operational Access
              │                       │
              ├── Accounts            ├── Doctors
              ├── Doctors             ├── Patients
              ├── Patients            ├── Appointments
              ├── Appointments         └── Medical Records
              └── Medical Records
```

This ensures account-level operations remain restricted to the Super Admin.

---

# Database Relationships

The application uses relational database modeling through Eloquent ORM.

Core entities include:

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Doctor         Patient
 │               │
 └───────┬───────┘
         │
         ▼
   Appointment
         │
         ▼
  Medical Record
         │
         ▼
   Prescription
```

The relationships allow hospital data to be connected across doctors, patients, appointments, medical records, and prescriptions.

---

# API Testing

All API endpoints have been tested using **Postman**.

Testing covers:

* Authentication
* Token generation
* Protected routes
* CRUD operations
* Request validation
* Role-based authorization
* Unauthorized access handling
* Resource relationships
* JSON response handling

Recommended testing flow:

```text
Register / Existing Account
          │
          ▼
        Login
          │
          ▼
    Receive Token
          │
          ▼
   Set Bearer Token
          │
          ▼
 Test Protected Endpoints
          │
          ▼
 Validate Role Permissions
```

---

# Security

The application implements several backend security practices:

* Laravel Sanctum authentication
* Role-based authorization
* Protected API routes
* Password hashing
* Request validation
* Authentication middleware
* Environment-based configuration
* Eloquent relationship constraints

Sensitive configuration should never be committed to the repository.

The `.env` file must remain excluded through `.gitignore`.

---

# Development Commands

Start the application:

```bash
php artisan serve
```

View registered API routes:

```bash
php artisan route:list --path=api
```

Clear application caches:

```bash
php artisan optimize:clear
```

Run migrations:

```bash
php artisan migrate
```

Run seeders:

```bash
php artisan db:seed
```

Run tests:

```bash
php artisan test
```

---

# Future Improvements

Potential improvements for future development:

* [ ] OpenAPI / Swagger documentation
* [ ] API versioning
* [ ] Pagination
* [ ] Advanced filtering and searching
* [ ] API rate limiting
* [ ] Automated feature testing
* [ ] Unit testing
* [ ] API request logging
* [ ] Docker support
* [ ] CI/CD pipeline
* [ ] Notification service
* [ ] Hospital queue management
* [ ] Doctor scheduling
* [ ] Billing management

---

# Project Objectives

This project demonstrates practical backend development capabilities in:

* RESTful API development
* Laravel application architecture
* Authentication and authorization
* Role-based access control
* CRUD operations
* Relational database design
* Eloquent ORM
* Request validation
* API response design
* Backend security
* API testing

---

# License

This project is licensed under the **Apache License 2.0**.

See the [`LICENSE`](./LICENSE) file for details.

---

# Author

**Muhammad Syafi'i**

Backend / Fullstack Developer

### Technologies

```text
PHP
Laravel
REST API
MySQL
Laravel Sanctum
Eloquent ORM
Git
GitHub
Postman
```

---

## Repository

[GitHub Repository](https://github.com/MasMuham24/Rest-Api-e-rumahsakit)

---

<p align="center">
  <strong>e-RumahSakit REST API</strong>
  <br>
  Backend service built with Laravel
</p>
