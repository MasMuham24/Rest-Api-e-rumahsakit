# 🏥 e-RumahSakit: Fullstack Hospital Management System

`e-RumahSakit` adalah aplikasi manajemen operasional rumah sakit berbasis web yang lengkap (fullstack). Proyek ini menggunakan **Laravel 11** sebagai RESTful API (backend) dan **React + Vite + Tailwind CSS** (frontend) untuk antarmuka pengguna yang modern dan interaktif.

Sistem ini menyediakan otentikasi aman dan fungsi CRUD lengkap untuk mengelola data administrator, dokter, pasien, rekam medis, dan resep obat.

---

## 📂 Struktur Proyek

Proyek ini dibagi menjadi dua bagian utama:
*   `backend/` - RESTful API yang dibangun menggunakan Laravel 11.
*   `frontend/` - Aplikasi Client Side (Single Page Application) menggunakan React, Vite, Tailwind CSS, React Router, TanStack Query, dan Zustand.

---

## 🛠️ Tech Stack

### Backend
*   **Framework:** Laravel 11
*   **Language:** PHP 8+
*   **Database:** MySQL / MariaDB
*   **Authentication:** Laravel Sanctum (Token-Based)
*   **Architecture:** RESTful API

### Frontend
*   **Bundler & Dev Server:** Vite
*   **Library:** React 19
*   **Styling:** Tailwind CSS v4
*   **Routing:** React Router v7
*   **State Management:** Zustand v5
*   **Data Fetching:** TanStack React Query v5
*   **HTTP Client:** Axios

---

## 🚀 Fitur Utama

### 🔐 Otentikasi & Otorisasi
*   Registrasi Pengguna baru
*   Login & Logout Pengguna
*   Otentikasi berbasis Token (Laravel Sanctum)

### 👤 Manajemen Admin
*   Tambah, Lihat, Perbarui, dan Hapus (CRUD) Administrator

### 🥼 Manajemen Dokter
*   Tambah, Lihat, Perbarui, dan Hapus (CRUD) Dokter

### 👥 Manajemen Pasien
*   Tambah, Lihat, Perbarui, dan Hapus (CRUD) Pasien

### 📝 Manajemen Rekam Medis (Medical Records)
*   Pencatatan rekam medis pasien oleh dokter/admin
*   Melihat riwayat rekam medis lengkap

### 💊 Manajemen Resep Obat (Prescriptions)
*   Pembuatan resep obat yang terhubung langsung dengan rekam medis

---

## ⚙️ Petunjuk Instalasi & Menjalankan Aplikasi

### 1. Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal perangkat lunak berikut pada komputer Anda:
*   PHP (versi 8.2 atau lebih baru)
*   Composer
*   Node.js (versi 18 atau lebih baru) dan npm
*   MySQL atau XAMPP (untuk database)

---

### 2. Konfigurasi Backend (Laravel)

Pindah ke direktori backend:
```bash
cd backend
```

Instal dependensi PHP:
```bash
composer install
```

Salin file konfigurasi environment:
```bash
cp .env.example .env
```

Generate application key:
```bash
php artisan key:generate
```

Konfigurasikan database Anda di file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=e_rumahsakit
DB_USERNAME=root
DB_PASSWORD=
```

Jalankan migrasi database:
```bash
php artisan migrate
```

Jalankan server backend:
```bash
php artisan serve
```
Backend API akan berjalan secara default di `http://127.0.0.1:8000`.

---

### 3. Konfigurasi Frontend (React)

Pindah ke direktori frontend:
```bash
cd ../frontend
```

Instal dependensi JavaScript:
```bash
npm install
```

Jalankan server development frontend:
```bash
npm run dev
```
Aplikasi frontend akan berjalan secara default di `http://localhost:5173`.

---

## 🔒 API Endpoints (Ringkasan)

Semua endpoint API backend diawali dengan `/api`.

### Authentication
*   `POST /api/register` - Pendaftaran pengguna baru
*   `POST /api/login` - Login pengguna & generate token
*   `POST /api/logout` - Logout pengguna & hapus token

### Resource Management (CRUD)
*   **Admins:** `GET|POST|PUT|DELETE` ke `/api/admins` dan `/api/admins/{id}`
*   **Doctors:** `GET|POST|PUT|DELETE` ke `/api/doctors` dan `/api/doctors/{id}`
*   **Patients:** `GET|POST|PUT|DELETE` ke `/api/patients` dan `/api/patients/{id}`
*   **Medical Records:** `GET|POST|PUT|DELETE` ke `/api/medical-records` dan `/api/medical-records/{id}`
*   **Prescriptions:** `GET|POST|PUT|DELETE` ke `/api/prescriptions` dan `/api/prescriptions/{id}`

*Catatan: Endpoint selain registrasi dan login memerlukan header `Authorization: Bearer <TOKEN>`.*

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.

---

## 👨‍💻 Penulis

**Muhammad Syafi'i**
*   Backend & Frontend Developer | Laravel & React Enthusiast
