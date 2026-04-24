# 📚 Bookstore REST API

REST API untuk manajemen toko buku digital menggunakan **Express.js** dan **MySQL**.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Driver**: mysql2 (Promise API / async-await)
- **Tools**: Postman, MySQL Workbench

---

## 📁 Struktur Project (MVC)

```
express-bookstore/
├── config/
│   └── db.js              # Koneksi database (Connection Pool)
├── controllers/
│   └── bookController.js  # Logika bisnis & response JSON
├── models/
│   └── bookModel.js       # Query SQL CRUD
├── routes/
│   └── bookRoutes.js      # Definisi endpoint API
├── .env                   # Variabel lingkungan (tidak di-commit)
├── .env.example           # Template konfigurasi
├── .gitignore
├── database.sql           # Script setup database & tabel
├── index.js               # Entry point aplikasi
└── package.json
```

---

## ⚙️ Cara Menjalankan

### 1. Clone & Install Dependensi
```bash
git clone <url-repo>
cd express-bookstore
npm install
```

### 2. Setup Database
Buka MySQL Workbench / phpMyAdmin, lalu jalankan script:
```sql
-- Salin isi file database.sql dan jalankan
```

### 3. Konfigurasi .env
```bash
cp .env.example .env
```
Edit file `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_mysql_kamu
DB_NAME=bookstore_db
PORT=3000
```

### 4. Jalankan Server
```bash
# Mode produksi
npm start

# Mode development (auto-restart)
npm run dev
```

Server berjalan di: `http://localhost:3000`

---

## 🔌 API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint           | Deskripsi               |
|--------|--------------------|-------------------------|
| GET    | `/`                | Info & daftar endpoint  |
| GET    | `/api/books`       | Ambil semua buku        |
| GET    | `/api/books/:id`   | Ambil buku by ID        |
| POST   | `/api/books`       | Tambah buku baru        |
| PUT    | `/api/books/:id`   | Update buku by ID       |
| DELETE | `/api/books/:id`   | Hapus buku by ID        |

---

## 📋 Contoh Request & Response

### GET `/api/books`
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Data buku berhasil diambil",
  "total": 5,
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "price": "125000.00",
      "stock": 15
    }
  ]
}
```

### POST `/api/books`
**Request Body (JSON):**
```json
{
  "title": "Express.js in Action",
  "author": "Evan Hahn",
  "price": 110000,
  "stock": 12
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 6,
    "title": "Express.js in Action",
    "author": "Evan Hahn",
    "price": "110000.00",
    "stock": 12
  }
}
```

### GET `/api/books/:id`
**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Buku dengan ID 99 tidak ditemukan",
  "data": null
}
```

---

## 🔒 Keamanan

- Menggunakan **prepared statements** (`?`) untuk mencegah SQL Injection
- Kredensial database disimpan di file `.env` (tidak di-commit ke Git)
- Validasi input pada setiap endpoint POST/PUT

---

## 📦 Dependensi

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```
