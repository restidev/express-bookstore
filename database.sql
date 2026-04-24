-- ============================================================
-- Script Setup Database Bookstore
-- Jalankan query ini di MySQL Workbench atau phpMyAdmin
-- ============================================================

-- Buat database
CREATE DATABASE IF NOT EXISTS bookstore_db;
USE bookstore_db;

-- Buat tabel books sesuai skema dari materi (Bagian 05)
CREATE TABLE IF NOT EXISTS books (
  id     INT          NOT NULL AUTO_INCREMENT,
  title  VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  price  DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  stock  INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- Insert data contoh
INSERT INTO books (title, author, price, stock) VALUES
  ('Clean Code', 'Robert C. Martin', 125000, 15),
  ('The Pragmatic Programmer', 'David Thomas', 145000, 10),
  ('You Don''t Know JS', 'Kyle Simpson', 95000, 20),
  ('JavaScript: The Good Parts', 'Douglas Crockford', 85000, 8),
  ('Node.js Design Patterns', 'Mario Casciaro', 165000, 5);

-- Verifikasi data
SELECT * FROM books;
