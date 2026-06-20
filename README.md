# 🏥 Online Hospital REST API

A RESTful API built with Laravel for managing hospital operations digitally. This project provides secure authentication and complete CRUD functionality for administrators, doctors, patients, medical records, and prescriptions.

## 🚀 Features

### Authentication

* User Registration
* User Login
* User Logout
* Token-Based Authentication

### Admin Management

* Create Admin
* View Admin List
* View Admin Details
* Update Admin Information
* Delete Admin

### Doctor Management

* Create Doctor
* View Doctor List
* View Doctor Details
* Update Doctor Information
* Delete Doctor

### Patient Management

* Create Patient
* View Patient List
* View Patient Details
* Update Patient Information
* Delete Patient

### Medical Record Management

* Create Medical Record
* View Medical Records
* View Medical Record Details
* Update Medical Record
* Delete Medical Record

### Prescription Management

* Create Prescription
* View Prescriptions
* View Prescription Details
* Update Prescription
* Delete Prescription

---

## 🛠️ Tech Stack

* PHP 8+
* Laravel 11
* MySQL
* Laravel Sanctum
* RESTful API Architecture

---

## 📂 API Endpoints

### Authentication

| Method | Endpoint        | Description               |
| ------ | --------------- | ------------------------- |
| POST   | `/api/register` | Register a new user       |
| POST   | `/api/login`    | Authenticate user         |
| POST   | `/api/logout`   | Logout authenticated user |

### Admin

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | `/api/admins`      |
| POST   | `/api/admins`      |
| GET    | `/api/admins/{id}` |
| PUT    | `/api/admins/{id}` |
| DELETE | `/api/admins/{id}` |

### Doctors

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/doctors`      |
| POST   | `/api/doctors`      |
| GET    | `/api/doctors/{id}` |
| PUT    | `/api/doctors/{id}` |
| DELETE | `/api/doctors/{id}` |

### Patients

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | `/api/patients`      |
| POST   | `/api/patients`      |
| GET    | `/api/patients/{id}` |
| PUT    | `/api/patients/{id}` |
| DELETE | `/api/patients/{id}` |

### Medical Records

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | `/api/medical-records`      |
| POST   | `/api/medical-records`      |
| GET    | `/api/medical-records/{id}` |
| PUT    | `/api/medical-records/{id}` |
| DELETE | `/api/medical-records/{id}` |

### Prescriptions

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/api/prescriptions`      |
| POST   | `/api/prescriptions`      |
| GET    | `/api/prescriptions/{id}` |
| PUT    | `/api/prescriptions/{id}` |
| DELETE | `/api/prescriptions/{id}` |

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/Rest-Api-e-rumahsakit.git
cd Rest-Api-e-rumahsakit
```

### Install Dependencies

```bash
composer install
```

### Configure Environment

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Configure your database credentials in the `.env` file.

### Run Database Migrations

```bash
php artisan migrate
```

### Start Development Server

```bash
php artisan serve
```

The API will be available at:

```text
http://127.0.0.1:8000
```

---

## 🔒 Authentication

This API uses Laravel Sanctum for authentication.

After logging in, include the access token in your request headers:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🧪 API Testing

You can test the API using:

* Postman
* Insomnia
* Thunder Client

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Muhammad Syafi'i

Backend Developer | Laravel Enthusiast
