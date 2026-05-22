# Restify - Hotel Booking Backend API

Backend API untuk aplikasi hotel booking Restify menggunakan Laravel 12 dan PostgreSQL.

---

# Tech Stack

- Laravel 12
- PostgreSQL
- Sanctum Authentication
- Midtrans Payment Gateway
- REST API

---

# Clone Repository
- git clone <LINK_GITHUB>
- cd BE-Restify

---

**Install Dependency**
- composer install

---

**Setup Environment**
Copy file environment:
- cp .env.example .env

---

**Generate Laravel APP_KEY:**
- php artisan key:generate

---

**Database Configuration**
Atur database di file .env
Contoh:
- DB_CONNECTION=pgsql
- DB_HOST=127.0.0.1
- DB_PORT=5432
- DB_DATABASE=restify_db
- DB_USERNAME=postgres
- DB_PASSWORD=yourpassword

---

**Run Migration & Seeder**
- php artisan migrate --seed

---

**Storage Link**
Wajib dijalankan untuk upload image/profile picture.
- php artisan storage:link

---

**Run Laravel Server**
- php artisan serve

---

**Server berjalan di:**
- http://127.0.0.1:8000

---

**Run Scheduler**
Untuk auto cancel expired booking:
- php artisan schedule:work
---

Features
- Authentication Sanctum
- Role Admin / Receptionist / User
- Hotel & Room Management
- Booking Hotel
- Booking Cancellation
- Payment Midtrans
- Auto Cancel Expired Booking
- Upload Profile Picture
- Rating Hotel


---
**Important Notes**
Jika image tidak tampil:
- php artisan storage:link

Jika terdapat error dependency:
- composer install

---

**API Testing**
Gunakan:
- Postman
- Thunder Client
  
**Default Roles**
- Admin
- Receptionist
- User
