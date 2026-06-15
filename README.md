# 🏥 REST API Rumah Sakit Online

REST API Rumah Sakit Online adalah backend berbasis Laravel yang menyediakan layanan manajemen data rumah sakit secara terpusat. API ini mendukung autentikasi pengguna, pengelolaan data dokter, pasien, rekam medis, resep obat, serta manajemen akun admin.

## ✨ Fitur Utama

### 🔐 Authentication

* Register akun
* Login pengguna
* Logout pengguna
* Token-based authentication

### 👨‍💼 Manajemen Admin

* Menampilkan daftar admin
* Menambahkan admin baru
* Melihat detail admin
* Mengubah data admin
* Menghapus admin

### 👨‍⚕️ Manajemen Dokter

* Menampilkan daftar dokter
* Menambahkan dokter baru
* Melihat detail dokter
* Mengubah data dokter
* Menghapus dokter

### 🧑‍🤝‍🧑 Manajemen Pasien

* Menampilkan daftar pasien
* Menambahkan pasien baru
* Melihat detail pasien
* Mengubah data pasien
* Menghapus pasien

### 📋 Medical Record

* Menampilkan seluruh rekam medis
* Menambahkan rekam medis baru
* Melihat detail rekam medis
* Mengubah data rekam medis
* Menghapus rekam medis

### 💊 Prescription

* Menampilkan seluruh resep obat
* Menambahkan resep baru
* Melihat detail resep
* Mengubah data resep
* Menghapus resep

---

## 🛠️ Tech Stack

* PHP 8+
* Laravel 11
* MySQL
* Laravel Sanctum
* RESTful API

---

## 📁 Struktur Modul

### Authentication

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| POST   | /api/register | Register user |
| POST   | /api/login    | Login user    |
| POST   | /api/logout   | Logout user   |

### Admin

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/admin      |
| POST   | /api/admin      |
| GET    | /api/admin/{id} |
| PUT    | /api/admin/{id} |
| DELETE | /api/admin/{id} |

### Doctor

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/doctors      |
| POST   | /api/doctors      |
| GET    | /api/doctors/{id} |
| PUT    | /api/doctors/{id} |
| DELETE | /api/doctors/{id} |

### Patient

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /api/patients      |
| POST   | /api/patients      |
| GET    | /api/patients/{id} |
| PUT    | /api/patients/{id} |
| DELETE | /api/patients/{id} |

### Medical Record

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | /api/medical-record      |
| POST   | /api/medical-record      |
| GET    | /api/medical-record/{id} |
| PUT    | /api/medical-record/{id} |
| DELETE | /api/medical-record/{id} |

### Prescription

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | /api/prescriptions      |
| POST   | /api/prescriptions      |
| GET    | /api/prescriptions/{id} |
| PUT    | /api/prescriptions/{id} |
| DELETE | /api/prescriptions/{id} |

---

## ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/your-username/Rest-Api-e-rumahsakit.git
```

Masuk ke folder project:

```bash
cd Rest-Api-e-rumahsakit
```

Install dependency:

```bash
composer install
```

Copy environment:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Konfigurasi database pada file `.env`.

Jalankan migrasi database:

```bash
php artisan migrate
```

Jalankan server:

```bash
php artisan serve
```

Server akan berjalan pada:

```text
http://127.0.0.1:8000
```

---

## 📖 API Testing

API dapat diuji menggunakan:

* Postman
* Insomnia
* Thunder Client (VS Code)

---

## 👨‍💻 Author

Muhammad Syafi'i

---

## 📜 License

This project is licensed under the MIT License.
