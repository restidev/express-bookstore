const db = require('../config/db');

const Book = {
  // Ambil semua buku dari database
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM books ORDER BY id ASC');
    return rows;
  },

  // Ambil satu buku berdasarkan ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  },

  // Tambah buku baru - menggunakan prepared statement untuk mencegah SQL Injection
  create: async (bookData) => {
    const { title, author, price, stock } = bookData;
    const [result] = await db.query(
      'INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)',
      [title, author, price, stock]
    );
    return result;
  },

  // Update data buku
  update: async (id, bookData) => {
    const { title, author, price, stock } = bookData;
    const [result] = await db.query(
      'UPDATE books SET title = ?, author = ?, price = ?, stock = ? WHERE id = ?',
      [title, author, price, stock, id]
    );
    return result;
  },

  // Hapus buku
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
    return result;
  },
};

module.exports = Book;
