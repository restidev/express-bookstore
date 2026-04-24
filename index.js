const express = require('express');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');

// Load variabel lingkungan dari .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARE (Bagian 02 - Built-in Middleware)
// ============================================================

// Parse request body sebagai JSON
app.use(express.json());

// Parse URL-encoded body (form data)
app.use(express.urlencoded({ extended: true }));

// Middleware logging sederhana
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ============================================================
// ROUTES
// ============================================================

// Route utama - info API
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Selamat datang di Bookstore API',
    version: '1.0.0',
    endpoints: {
      books: {
        'GET /api/books': 'Ambil semua data buku',
        'GET /api/books/:id': 'Ambil buku berdasarkan ID',
        'POST /api/books': 'Tambah buku baru',
        'PUT /api/books/:id': 'Update buku berdasarkan ID',
        'DELETE /api/books/:id': 'Hapus buku berdasarkan ID',
      },
    },
  });
});

// Mount book routes di prefix /api/books
app.use('/api/books', bookRoutes);

// ============================================================
// ERROR HANDLING - 404 Not Found
// ============================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} tidak ditemukan`,
  });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log('================================================');
  console.log('   📚 Bookstore REST API - Express.js + MySQL');
  console.log('================================================');
  console.log(`🚀 Server berjalan di: http://localhost:${PORT}`);
  console.log(`📖 Dokumentasi API  : http://localhost:${PORT}/`);
  console.log(`📚 Books endpoint   : http://localhost:${PORT}/api/books`);
  console.log('================================================');
});

module.exports = app;
