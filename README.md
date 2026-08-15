# e-RumahSakit REST API

A backend RESTful API for hospital management systems, built with **Laravel**. The application provides structured API endpoints for managing authentication, doctors, patients, appointments, medical records, and prescriptions.

This project is developed as a **backend-only service**, independent of any frontend framework, making the API consumable by web applications, mobile applications, or other client services.

---

## Overview

**e-RumahSakit REST API** provides a centralized backend service for managing hospital-related operations through RESTful HTTP endpoints.

The system is designed around standard backend development practices, including:

* RESTful API architecture
* Token-based authentication
* Request validation
* Relational database design
* Eloquent ORM
* Protected API routes
* Structured JSON responses
* Separation of concerns between routing, controllers, models, and validation

The API communicates using **JSON** and can be consumed by any HTTP-compatible client.

---

## Features

### Authentication

* User registration
* User login
* User logout
* Token-based authentication using Laravel Sanctum
* Protected API routes
* Authentication middleware
* Password hashing

### Doctor Management

* Create doctor records
* Retrieve doctor collections
* Retrieve doctor details
* Update doctor records
* Delete doctor records

### Patient Management

* Create patient records
* Retrieve patient collections
* Retrieve patient details
* Update patient records
* Delete patient records

### Appointment Management

* Create appointments
* Retrieve appointments
* Retrieve appointment details
* Update appointments
* Update appointment status
* Delete appointments

### Medical Record Management

* Create medical records
* Retrieve medical records
* Retrieve medical record details
* Update medical records
* Delete medical records
* Patient and doctor relationship management

### Prescription Management

* Create prescriptions
* Retrieve prescriptions
* Retrieve prescription details
* Update prescriptions
* Delete prescriptions
* Medical record relationship management

---

## Technology Stack

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| PHP             | Backend programming language |
| Laravel         | REST API framework           |
| Laravel Sanctum | API authentication           |
| MySQL           | Relational database          |
| Eloquent ORM    | Database abstraction         |
| Composer        | PHP dependency management    |
| Postman         | API testing                  |

---

## Architecture

The application follows a layered REST API architecture:

```text
Client
  │
  │ HTTP Request
  ▼
┌──────────────────────────────┐
│          API Routes          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Middleware           │
│ Authentication / Validation  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Controllers          │
│     Business Operations      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Models / Eloquent      │
│      Database Relations      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│            MySQL             │
└──────────────────────────────┘
               │
               ▼
        JSON Response
```

The backend does not depend on a specific frontend technology.

It can be integrated with:

* React
* Vue
* Angular
* Next.js
* Mobile applications
* Desktop applications
* Third-party services

---

## Project Structure

```text
e-rumahsakit/
│
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   │
│   ├── Models/
│   └── Providers/
│
├── bootstrap/
│
├── config/
│
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
│
├── public/
│
├── resources/
│
├── routes/
│   ├── api.php
│   ├── console.php
│   └── web.php
│
├── storage/
│
├── tests/
│
├── .env.example
├── artisan
├── composer.json
├── composer.lock
└── README.md
```

---

## Requirements

Before installing the application, ensure the following dependencies are available:

* PHP 8.2 or higher
* Composer
* MySQL 8.0 or higher
* Git

Required PHP extensions should include:

* OpenSSL
* PDO
* Mbstring
* Tokenizer
* XML
* Ctype
* JSON
* BCMath

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MasMuham24/Rest-Api-e-rumahsakit.git

cd Rest-Api-e-rumahsakit
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Configure Environment

Copy the example environment configuration:

```bash
cp .env.example .env
```

For Windows:

```bash
copy .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

---

## Database Configuration

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

Update the credentials according to your environment.

---

## Database Migration

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

For a complete database reset during development:

```bash
php artisan migrate:fresh --seed
```

> `migrate:fresh` removes all existing tables and data. Use it only in development environments.

---

## Authentication

The API uses **Laravel Sanctum** for token-based authentication.

After a successful login, the API returns an access token that must be included when accessing protected resources.

### Authorization Header

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Example:

```http
GET /api/appointments
Accept: application/json
Authorization: Bearer 1|xxxxxxxxxxxxxxxx
```

Protected routes are handled through Laravel authentication middleware.

---

# API Reference

Base URL:

```text
http://127.0.0.1:8000/api
```

---

## Authentication

| Method | Endpoint    | Auth | Description                             |
| ------ | ----------- | ---: | --------------------------------------- |
| POST   | `/register` |   No | Register a new user                     |
| POST   | `/login`    |   No | Authenticate a user                     |
| POST   | `/logout`   |  Yes | Revoke the current authentication token |

---

## Doctors

| Method | Endpoint        | Auth | Description          |
| ------ | --------------- | ---: | -------------------- |
| GET    | `/doctors`      |  Yes | Retrieve all doctors |
| POST   | `/doctors`      |  Yes | Create a doctor      |
| GET    | `/doctors/{id}` |  Yes | Retrieve a doctor    |
| PUT    | `/doctors/{id}` |  Yes | Update a doctor      |
| DELETE | `/doctors/{id}` |  Yes | Delete a doctor      |

---

## Patients

| Method | Endpoint         | Auth | Description           |
| ------ | ---------------- | ---: | --------------------- |
| GET    | `/patients`      |  Yes | Retrieve all patients |
| POST   | `/patients`      |  Yes | Create a patient      |
| GET    | `/patients/{id}` |  Yes | Retrieve a patient    |
| PUT    | `/patients/{id}` |  Yes | Update a patient      |
| DELETE | `/patients/{id}` |  Yes | Delete a patient      |

---

## Appointments

| Method | Endpoint             | Auth | Description             |
| ------ | -------------------- | ---: | ----------------------- |
| GET    | `/appointments`      |  Yes | Retrieve appointments   |
| POST   | `/appointments`      |  Yes | Create an appointment   |
| GET    | `/appointments/{id}` |  Yes | Retrieve an appointment |
| PUT    | `/appointments/{id}` |  Yes | Update an appointment   |
| DELETE | `/appointments/{id}` |  Yes | Delete an appointment   |

---

## Medical Records

| Method | Endpoint                | Auth | Description               |
| ------ | ----------------------- | ---: | ------------------------- |
| GET    | `/medical-records`      |  Yes | Retrieve medical records  |
| POST   | `/medical-records`      |  Yes | Create a medical record   |
| GET    | `/medical-records/{id}` |  Yes | Retrieve a medical record |
| PUT    | `/medical-records/{id}` |  Yes | Update a medical record   |
| DELETE | `/medical-records/{id}` |  Yes | Delete a medical record   |

---

## Prescriptions

| Method | Endpoint              | Auth | Description             |
| ------ | --------------------- | ---: | ----------------------- |
| GET    | `/prescriptions`      |  Yes | Retrieve prescriptions  |
| POST   | `/prescriptions`      |  Yes | Create a prescription   |
| GET    | `/prescriptions/{id}` |  Yes | Retrieve a prescription |
| PUT    | `/prescriptions/{id}` |  Yes | Update a prescription   |
| DELETE | `/prescriptions/{id}` |  Yes | Delete a prescription   |

---

# API Response Format

Successful responses follow a consistent JSON structure.

Example:

```json
{
    "success": true,
    "message": "Data retrieved successfully",
    "data": []
}
```

### Error Response

Validation errors are returned in a structured format:

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

---

# Example Authentication Flow

The typical authentication flow is:

```text
POST /register
       │
       ▼
POST /login
       │
       ▼
Receive Access Token
       │
       ▼
Authorization: Bearer TOKEN
       │
       ▼
Access Protected Resources
```

Example login request:

```http
POST /api/login
Content-Type: application/json
Accept: application/json
```

```json
{
    "email": "admin@example.com",
    "password": "password"
}
```

---

# Database Relationships

The system uses relational database modeling through Laravel Eloquent.

The main entities are connected conceptually as follows:

```text
                 ┌──────────────┐
                 │    User      │
                 └──────┬───────┘
                        │
              ┌─────────┴─────────┐
              │                   │
              ▼                   ▼
        ┌──────────┐        ┌──────────┐
        │  Doctor  │        │ Patient  │
        └────┬─────┘        └────┬─────┘
             │                   │
             └────────┬──────────┘
                      │
                      ▼
              ┌──────────────┐
              │ Appointment  │
              └──────┬───────┘
                     │
                     ▼
             ┌─────────────────┐
             │ Medical Record  │
             └────────┬────────┘
                      │
                      ▼
              ┌──────────────┐
              │ Prescription │
              └──────────────┘
```

Relationships are implemented using Laravel Eloquent relationship methods.

---

# API Testing

The API can be tested using:

* Postman
* Insomnia
* Bruno
* Hoppscotch
* cURL

Recommended workflow:

```text
1. Register
      ↓
2. Login
      ↓
3. Copy Access Token
      ↓
4. Set Bearer Token
      ↓
5. Test Protected Endpoints
      ↓
6. Perform CRUD Operations
```

---

# Development Commands

### Start Development Server

```bash
php artisan serve
```

### List API Routes

```bash
php artisan route:list --path=api
```

### Clear Application Cache

```bash
php artisan optimize:clear
```

### Run Migrations

```bash
php artisan migrate
```

### Run Seeders

```bash
php artisan db:seed
```

### Run Tests

```bash
php artisan test
```

---

# Security Considerations

The application follows several backend security practices:

* Authentication through Laravel Sanctum
* Protected API endpoints
* Password hashing
* Request validation
* Authentication middleware
* Environment-based configuration
* Database relationship constraints

Sensitive configuration must never be committed to the repository.

The `.env` file should remain excluded through `.gitignore`.

---

# Future Improvements

Potential improvements for future releases:

* [ ] OpenAPI / Swagger API documentation
* [ ] API versioning
* [ ] Pagination
* [ ] Advanced filtering and searching
* [ ] Role and permission management
* [ ] Rate limiting
* [ ] Automated feature tests
* [ ] Unit testing
* [ ] API request logging
* [ ] Docker support
* [ ] CI/CD pipeline
* [ ] Hospital queue management
* [ ] Doctor scheduling
* [ ] Billing management
* [ ] Notification service

---

# Project Objectives

This project was developed to demonstrate practical backend engineering capabilities, particularly in:

* RESTful API development
* Laravel application architecture
* Authentication and authorization
* Database relationship modeling
* CRUD implementation
* Request validation
* Eloquent ORM
* API response design
* Backend security practices
* API testing

---

# License

This project is licensed under the **Apache License 2.0**.

See the [`LICENSE`](./LICENSE) file for details.

---

# Author

**MasMuham24**

Backend / Fullstack Developer

### Core Technologies

```text
PHP
Laravel
REST API
MySQL
Laravel Sanctum
Eloquent ORM
Git
GitHub
```

---

# Repository

GitHub:

https://github.com/MasMuham24/Rest-Api-e-rumahsakit

---

<p align="center">
  <strong>e-RumahSakit REST API</strong>
  <br>
  Backend service built with Laravel
</p>
