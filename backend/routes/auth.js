const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Koneksi database SQLite
const db = new sqlite3.Database('./warung_pintar.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        if (row) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Route untuk mendapatkan produk
router.get("/produk", (req, res) => {
    db.all('SELECT * FROM produk', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(rows);
    });
});

module.exports = router;