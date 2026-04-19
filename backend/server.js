const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const authRoutes = require("./routes/auth");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files dari folder frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Koneksi database SQLite
const db = new sqlite3.Database('./warung_pintar.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Buat tabel jika belum ada
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )`, (err) => {
        if (err) throw err;
        console.log('Table users created or already exists');
    });

    db.run(`CREATE TABLE IF NOT EXISTS produk (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama_produk TEXT,
        harga INTEGER
    )`, (err) => {
        if (err) throw err;
        console.log('Table produk created or already exists');
    });

    // Insert data dummy jika belum ada
    db.get("SELECT COUNT(*) as count FROM users WHERE username = 'admin'", (err, row) => {
        if (err) throw err;
        if (row.count === 0) {
            db.run("INSERT INTO users (username, password) VALUES ('admin', '123')");
        }
    });

    db.get("SELECT COUNT(*) as count FROM produk", (err, row) => {
        if (err) throw err;
        if (row.count === 0) {
            db.run("INSERT INTO produk (nama_produk, harga) VALUES ('Nasi Goreng', 15000)");
            db.run("INSERT INTO produk (nama_produk, harga) VALUES ('Ayam Bakar', 20000)");
            db.run("INSERT INTO produk (nama_produk, harga) VALUES ('Es Teh', 5000)");
        }
    });
});

app.use("/", authRoutes);

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});