# e-RumahSakit REST API

A production-oriented **RESTful API for hospital management systems**, built with **Laravel 12**.

e-RumahSakit provides a backend service for managing essential hospital operations, including authentication, user accounts, doctors, patients, appointments, medical records, and prescriptions.

The application is designed as a **backend-only REST API**, making it independent of any frontend framework and suitable for consumption by web applications, mobile applications, or other client services through HTTP requests and JSON responses.

---

## Overview

e-RumahSakit is designed to demonstrate the implementation of a structured hospital management backend using modern Laravel development practices.

The API implements:

* RESTful API architecture
* Laravel Sanctum authentication
* Role-based authorization
* CRUD operations
* Request validation
* API Resources
* Eloquent ORM
* Relational database relationships
* Protected API endpoints
* Consistent JSON responses
* Postman API testing

### Core Modules

| Module                 | Description                                       |
| ---------------------- | ------------------------------------------------- |
| Authentication         | Register, login, logout, and token authentication |
| Account Management     | Administrative account management                 |
| Doctor Management      | CRUD operations for doctors                       |
| Patient Management     | CRUD operations for patients                      |
| Appointment Management | Hospital appointment management                   |
| Medical Records        | Patient medical record management                 |
| Prescriptions          | Prescription management                           |

---

# Technology Stack

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| PHP 8.2+        | Backend programming language |
| Laravel 12      | Backend framework            |
| Laravel Sanctum | Token-based authentication   |
| MySQL           | Relational database          |
| Eloquent ORM    | Database interaction         |
| Composer        | Dependency management        |
| REST API        | Application architecture     |
| JSON            | API response format          |
| Postman         | API testing                  |
| Git / GitHub    | Version control              |

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
│   Form Requests /     │
│      Validation       │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│    API Resources      │
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

The API does not depend on a specific frontend implementation.

---

# Role-Based Access Control

The API implements role-based authorization using two administrative roles.

| Resource           | Super Admin | Admin |
| ------------------ | :---------: | :---: |
| Account Management |      ✅      |   ❌   |
| Doctor Management  |      ✅      |   ✅   |
| Patient Management |      ✅      |   ✅   |
| Medical Records    |      ✅      |   ✅   |
| Appointments       |      ✅      |   ✅   |
| Prescriptions      |      ✅      |   ✅   |

### Super Admin

The Super Admin has the highest administrative privileges.

Responsibilities include:

* Managing user accounts
* Managing doctors
* Managing patients
* Managing appointments
* Managing medical records
* Managing prescriptions

### Admin

The Admin is responsible for operational hospital data.

Admin permissions include:

* Managing doctors
* Managing patients
* Managing appointments
* Managing medical records
* Managing prescriptions

Account management remains restricted to the Super Admin.

---

# Features

## Authentication

The authentication system is implemented using Laravel Sanctum.

Features:

* User registration
* User login
* User logout
* Token-based authentication
* Protected API routes
* Authentication middleware
* Bearer token authentication

---

## Account Management

Restricted to **Super Admin**.

Features:

* Create account
* Retrieve accounts
* Retrieve account details
* Update account
* Delete account

---

## Doctor Management

Available to **Admin** and **Super Admin**.

Features:

* Create doctor
* Retrieve doctors
* Retrieve doctor details
* Update doctor
* Delete doctor

---

## Patient Management

Available to **Admin** and **Super Admin**.

Features:

* Create patient
* Retrieve patients
* Retrieve patient details
* Update patient
* Delete patient

---

## Appointment Management

Available to **Admin** and **Super Admin**.

Features:

* Create appointment
* Retrieve appointments
* Retrieve appointment details
* Update appointment
* Update appointment status
* Delete appointment

Appointments connect patients with doctors and provide a structured workflow for managing scheduled consultations.

---

## Medical Records

Available to **Admin** and **Super Admin**.

Features:

* Create medical records
* Retrieve medical records
* Retrieve medical record details
* Update medical records
* Delete medical records
* Patient relationship
* Doctor relationship

Medical records provide a structured connection between patients, doctors, and healthcare history.

---

## Prescriptions

Available to authenticated and authorized users according to the configured role permissions.

Features:

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
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   │
│   │   ├── Models/
│   │   └── Providers/
│   │
│   ├── bootstrap/
│   ├── config/
│   │
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   ├── public/
│   ├── resources/
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

Navigate to the backend directory:

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

Copy the environment configuration file.

### Windows

```bash
copy .env.example .env
```

### Linux / macOS

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

---

# Database Configuration

Create a MySQL database:

```text
e_rumahsakit
```

Configure the database connection inside `.env`:

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

Or run migrations and seeders together:

```bash
php artisan migrate --seed
```

For a complete development database reset:

```bash
php artisan migrate:fresh --seed
```

> **Warning:** `migrate:fresh` removes all existing tables and data. Use it only when resetting a development database.

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

After successful authentication, an access token can be used to access protected endpoints.

Include the token using the Bearer authentication scheme:

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

All endpoints are prefixed with:

```text
/api
```

## Authentication

| Method | Endpoint    | Auth | Description            |
| ------ | ----------- | :--: | ---------------------- |
| POST   | `/register` |   ❌  | Register a new account |
| POST   | `/login`    |   ❌  | Authenticate user      |
| POST   | `/logout`   |   ✅  | Logout current user    |

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

| Method | Endpoint              | Role            | Description            |
| ------ | --------------------- | --------------- | ---------------------- |
| GET    | `/prescriptions`      | Authorized User | Retrieve prescriptions |
| POST   | `/prescriptions`      | Authorized User | Create prescription    |
| GET    | `/prescriptions/{id}` | Authorized User | Retrieve prescription  |
| PUT    | `/prescriptions/{id}` | Authorized User | Update prescription    |
| DELETE | `/prescriptions/{id}` | Authorized User | Delete prescription    |

> Actual authorization is enforced by the application's configured middleware and role rules.

---

# API Response Format

The API uses JSON for request and response payloads.

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

Authorization is handled through authentication middleware and role-based access control.

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
              ├── Appointments        ├── Medical Records
              ├── Medical Records     └── Prescriptions
              └── Prescriptions
```

This authorization structure prevents unauthorized users from accessing administrative operations.

---

# Database Relationships

The application uses relational database modeling through Eloquent ORM.

Core entities include:

```text
User
 │
 ├─────────────────────┐
 │                     │
 ▼                     ▼
Doctor               Patient
 │                     │
 └──────────┬──────────┘
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

These relationships allow hospital data to be connected across:

* Users
* Doctors
* Patients
* Appointments
* Medical Records
* Prescriptions

Foreign key constraints are used to maintain relational data integrity.

---

# API Testing

The API has been tested using **Postman**.

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
* Appointment management
* Medical record management
* Prescription management

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
* Foreign key constraints
* Environment-based configuration
* Eloquent ORM

Sensitive configuration should never be committed to the repository.

The `.env` file must remain excluded through `.gitignore`.

---

# Development Commands

Start the development server:

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

Run the test suite:

```bash
php artisan test
```

---

# Project Objectives

This project demonstrates practical backend development capabilities in:

* RESTful API development
* Laravel 12 application architecture
* Laravel Sanctum authentication
* Role-based access control
* CRUD operations
* Relational database design
* Eloquent ORM
* Request validation
* API Resources
* JSON API response design
* Backend security
* API testing with Postman
* Database relationship management

---

# Project Status

**Version:** `V1.0`

**Status:** `Completed`

The V1 release focuses on the core backend functionality required for a hospital management REST API.

Future versions may introduce additional hospital modules such as doctor scheduling, pharmacy management, queue management, billing, notifications, and other advanced healthcare workflows.

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

# Repository

[GitHub Repository](https://github.com/MasMuham24/Rest-Api-e-rumahsakit)

---

<p align="center">
  <strong>e-RumahSakit REST API</strong>
  <br>
  Create by Muhammad Syafi'i
</p>
