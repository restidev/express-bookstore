const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

// ============================================================
// Definisi Endpoint API Bookstore
// Sesuai struktur MVC (Bagian 02) dan HTTP Methods (Bagian 03)
// ============================================================

// GET    /api/books        → Ambil semua buku
// GET    /api/books/:id    → Ambil satu buku by ID
// POST   /api/books        → Tambah buku baru
// PUT    /api/books/:id    → Update buku by ID
// DELETE /api/books/:id    → Hapus buku by ID

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
