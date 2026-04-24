const mysql = require('mysql2');
require('dotenv').config();

// Menggunakan Connection Pool untuk performa lebih baik
// Mengelola banyak koneksi secara efisien (sesuai materi Bagian 04)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bookstore_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Ekspor pool dengan Promise API (async/await support)
module.exports = pool.promise();
