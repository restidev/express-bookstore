const Book = require('../models/bookModel');

// ============================================================
// GET /api/books - Menampilkan semua data buku
// ============================================================
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAll();

    // Response JSON Standard (sesuai materi Bagian 03)
    return res.status(200).json({
      success: true,
      message: 'Data buku berhasil diambil',
      total: books.length,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

// ============================================================
// GET /api/books/:id - Menampilkan satu buku berdasarkan ID
// ============================================================
const getBookById = async (req, res) => {
  try {
    const { id } = req.params; // Path Params: akses via req.params.id
    const book = await Book.getById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Buku dengan ID ${id} tidak ditemukan`,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data buku berhasil diambil',
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

// ============================================================
// POST /api/books - Menambah buku baru
// ============================================================
const createBook = async (req, res) => {
  try {
    // Body JSON: akses data dari request body via req.body
    const { title, author, price, stock } = req.body;

    // Validasi input
    if (!title || !author || price === undefined || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Semua field wajib diisi: title, author, price, stock',
        data: null,
      });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Harga (price) harus berupa angka positif',
        data: null,
      });
    }

    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stok (stock) harus berupa angka positif',
        data: null,
      });
    }

    const result = await Book.create({ title, author, price, stock });

    // Ambil data buku yang baru dibuat
    const newBook = await Book.getById(result.insertId);

    return res.status(201).json({
      success: true,
      message: 'Buku berhasil ditambahkan',
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

// ============================================================
// PUT /api/books/:id - Update data buku
// ============================================================
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, stock } = req.body;

    // Cek apakah buku ada
    const existingBook = await Book.getById(id);
    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: `Buku dengan ID ${id} tidak ditemukan`,
        data: null,
      });
    }

    // Gunakan data lama jika field tidak dikirim
    const updatedData = {
      title: title || existingBook.title,
      author: author || existingBook.author,
      price: price !== undefined ? price : existingBook.price,
      stock: stock !== undefined ? stock : existingBook.stock,
    };

    await Book.update(id, updatedData);
    const updatedBook = await Book.getById(id);

    return res.status(200).json({
      success: true,
      message: 'Buku berhasil diperbarui',
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

// ============================================================
// DELETE /api/books/:id - Hapus buku
// ============================================================
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBook = await Book.getById(id);
    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: `Buku dengan ID ${id} tidak ditemukan`,
        data: null,
      });
    }

    await Book.delete(id);

    return res.status(200).json({
      success: true,
      message: `Buku "${existingBook.title}" berhasil dihapus`,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
