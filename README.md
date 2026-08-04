# 🏥 e-Hospital: Fullstack Hospital Management System

`e-Hospital` is a complete web-based Hospital Management System built as a fullstack application. This project uses **Laravel 11** as the RESTful API (backend) and **React + Vite + Tailwind CSS** (frontend) to deliver a modern, responsive, and interactive user experience.

The system provides secure authentication and complete CRUD functionality for managing administrators, doctors, patients, medical records, and prescriptions.

---

## 📂 Project Structure

The project is divided into two main parts:

- `backend/` - RESTful API built with Laravel 11.
- `frontend/` - Single Page Application (SPA) built with React, Vite, Tailwind CSS, React Router, TanStack Query, and Zustand.

---

## 🛠️ Tech Stack

### Backend

- **Framework:** Laravel 11
- **Language:** PHP 8+
- **Database:** MySQL / MariaDB
- **Authentication:** Laravel Sanctum (Token-Based)
- **Architecture:** RESTful API

### Frontend

- **Bundler & Dev Server:** Vite
- **Library:** React 19
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **State Management:** Zustand v5
- **Data Fetching:** TanStack React Query v5
- **HTTP Client:** Axios

---

## 🚀 Key Features

### 🔐 Authentication & Authorization

- User Registration
- User Login & Logout
- Token-Based Authentication using Laravel Sanctum

### 👤 Administrator Management

- Create, Read, Update, and Delete (CRUD) administrators

### 🥼 Doctor Management

- Create, Read, Update, and Delete (CRUD) doctors

### 👥 Patient Management

- Create, Read, Update, and Delete (CRUD) patients

### 📝 Medical Records Management

- Create medical records for patients by doctors or administrators
- View complete patient medical history

### 💊 Prescription Management

- Create and manage prescriptions linked directly to medical records

---

## ⚙️ Installation Guide

### 1. Prerequisites

Make sure the following software is installed on your computer:

- PHP 8.2 or later
- Composer
- Node.js 18 or later
- npm
- MySQL or XAMPP

---

### 2. Backend Setup (Laravel)

Navigate to the backend directory:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Copy the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database in the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_rumahsakit
DB_USERNAME=root
DB_PASSWORD=
```

Run database migrations:

```bash
php artisan migrate
```

Start the Laravel development server:

```bash
php artisan serve
```

The backend API will be available at:

```
http://127.0.0.1:8000
```

---

### 3. Frontend Setup (React)

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install JavaScript dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend application will be available at:

```
http://localhost:5173
```

---

## 🔒 API Endpoints (Overview)

All backend endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Authenticate user and generate access token |
| POST | `/api/logout` | Logout user and revoke access token |

### Resource Management (CRUD)

#### Administrators

```
GET    /api/admins
POST   /api/admins
PUT    /api/admins/{id}
DELETE /api/admins/{id}
```

#### Doctors

```
GET    /api/doctors
POST   /api/doctors
PUT    /api/doctors/{id}
DELETE /api/doctors/{id}
```

#### Patients

```
GET    /api/patients
POST   /api/patients
PUT    /api/patients/{id}
DELETE /api/patients/{id}
```

#### Medical Records

```
GET    /api/medical-records
POST   /api/medical-records
PUT    /api/medical-records/{id}
DELETE /api/medical-records/{id}
```

#### Prescriptions

```
GET    /api/prescriptions
POST   /api/prescriptions
PUT    /api/prescriptions/{id}
DELETE /api/prescriptions/{id}
```

> **Note:** All endpoints except **Register** and **Login** require an authentication token in the request header:

```http
Authorization: Bearer <TOKEN>
```

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Muhammad Syafi'i**

Backend & Frontend Developer • Laravel & React Enthusiast
