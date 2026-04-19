# 🔌 Backend Integration Guide - Warung Pintar

Panduan untuk mengintegrasikan aplikasi frontend dengan backend server dan database MySQL.

## 📋 Daftar Isi

- [Arsitektur](#arsitektur)
- [Setup Backend](#setup-backend)
- [Setup Database](#setup-database)
- [API Endpoints](#api-endpoints)
- [Integration Code](#integration-code)
- [Deployment](#deployment)

## 🏗️ Arsitektur

### Sebelum Integration
```
Frontend (HTML/CSS/JS)
    ↓ (localStorage)
Browser Storage
```

### Sesudah Integration
```
Frontend (HTML/CSS/JS)
    ↓ (HTTP/REST API)
Backend Server (Node.js/PHP/Python)
    ↓ (MySQL Driver)
Database (MySQL)
```

## 🚀 Setup Backend

### Pilihan Backend

#### 1. **Node.js + Express** (Recommended)
```bash
# Install Node.js dari nodejs.org
npm init -y
npm install express mysql2 cors dotenv body-parser
```

#### 2. **PHP + PDO**
```php
<?php
$host = 'localhost';
$db = 'warung_pintar';
$user = 'root';
$pass = '';

$pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
?>
```

#### 3. **Python + Flask**
```bash
pip install flask flask-cors flask-mysqldb
```

#### 4. **Firebase (No-Backend)**
```javascript
// Alternatif tanpa server sendiri
// Bagus untuk MVP dan prototyping
```

## 💾 Setup Database

### 1. Create Database
```sql
-- Backup dari file menu.sql sudah ada
-- Execute file:
mysql -u root -p < database/menu.sql

-- Atau manual:
CREATE DATABASE warung_pintar;
USE warung_pintar;
-- Copy SQL dari menu.sql
```

### 2. Verify Tables
```sql
SHOW TABLES;
DESC menu;
DESC pesanan;
DESC detail_pesanan;

-- Test query:
SELECT * FROM menu;
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
atau
http://localhost:8000/api (sesuai port)
```

### GET /menus
Ambil semua menu
```
GET /api/menus
Headers: none required
Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nama": "Nasi Goreng Spesial",
      "harga": 35000,
      "deskripsi": "...",
      "kategori": "Makanan",
      "gambar": "...",
      "rating": 4.8
    },
    ...
  ]
}
```

### GET /menus/:id
Ambil menu spesifik
```
GET /api/menus/1
Response:
{
  "success": true,
  "data": {menu object}
}
```

### GET /menus?kategori=Makanan
Filter menu by kategori
```
GET /api/menus?kategori=Makanan
Response: Array of filtered menus
```

### POST /menus
Create menu baru
```
POST /api/menus
Content-Type: application/json
Headers: Authorization: Bearer {token}

Body:
{
  "nama": "Menu Baru",
  "harga": 25000,
  "deskripsi": "Deskripsi",
  "kategori": "Makanan",
  "gambar": "...",
  "rating": 4.5
}

Response:
{
  "success": true,
  "message": "Menu created",
  "data": {created menu object}
}
```

### PUT /menus/:id
Update menu
```
PUT /api/menus/1
Content-Type: application/json
Headers: Authorization: Bearer {token}

Body: {updated fields}

Response:
{
  "success": true,
  "message": "Menu updated",
  "data": {updated menu object}
}
```

### DELETE /menus/:id
Delete menu
```
DELETE /api/menus/1
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Menu deleted"
}
```

### POST /pesanan
Create pesanan (order)
```
POST /api/pesanan
Content-Type: application/json

Body:
{
  "items": [
    {"menu_id": 1, "quantity": 2},
    {"menu_id": 3, "quantity": 1}
  ],
  "total_harga": 89000
}

Response:
{
  "success": true,
  "data": {
    "nomor_pesanan": "ORD-20240419123456",
    "total_harga": 89000,
    "status": "Pending"
  }
}
```

## 🔌 Integration Code

### Update script.js untuk API

#### Sebelum: Load dari JSON
```javascript
async function loadMenuData() {
    const response = await fetch('./data/menu.json');
    const data = await response.json();
    menuData = data.menus;
}
```

#### Sesudah: Load dari API
```javascript
async function loadMenuData() {
    try {
        const response = await fetch('http://localhost:3000/api/menus');
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message);
        }
        
        menuData = data.data;
        return menuData;
    } catch (error) {
        console.error('Error loading menus:', error);
        showAlert('Gagal memuat menu dari server', 'danger');
        return [];
    }
}
```

### Update saveMenu untuk API
```javascript
async function saveMenu() {
    const nama = document.getElementById('menuNama').value.trim();
    const harga = parseInt(document.getElementById('menuHarga').value);
    const deskripsi = document.getElementById('menuDeskripsi').value.trim();
    const kategori = document.getElementById('menuKategori').value;
    const gambar = document.getElementById('menuGambar').value.trim();
    const rating = parseFloat(document.getElementById('menuRating').value) || 4.5;
    
    if (!nama || !harga || !deskripsi || !kategori) {
        showAlert('Semua field wajib diisi', 'warning');
        return;
    }
    
    const method = currentEditId ? 'PUT' : 'POST';
    const url = currentEditId 
        ? `http://localhost:3000/api/menus/${currentEditId}`
        : 'http://localhost:3000/api/menus';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` // Add authentication
            },
            body: JSON.stringify({
                nama,
                harga,
                deskripsi,
                kategori,
                gambar,
                rating
            })
        });
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message);
        }
        
        if (currentEditId) {
            showAlert('Menu berhasil diperbarui', 'success');
        } else {
            showAlert('Menu baru berhasil ditambahkan', 'success');
        }
        
        document.getElementById('adminForm').reset();
        currentEditId = null;
        
        // Reload data
        await loadMenuData();
        renderAdminTable();
        
    } catch (error) {
        console.error('Error saving menu:', error);
        showAlert(error.message || 'Gagal menyimpan menu', 'danger');
    }
}
```

### Update checkout untuk API
```javascript
async function checkout() {
    if (cart.length === 0) {
        showAlert('Keranjang masih kosong', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.harga * item.quantity), 0);
    const items = cart.map(item => ({
        menu_id: item.id,
        quantity: item.quantity
    }));
    
    try {
        const response = await fetch('http://localhost:3000/api/pesanan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: items,
                total_harga: total
            })
        });
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message);
        }
        
        const orderNumber = data.data.nomor_pesanan;
        
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartBadge();
        closeCartModal();
        
        showAlert(`Pesanan berhasil dibuat! Nomor pesanan: ${orderNumber}`, 'success');
        
    } catch (error) {
        console.error('Error creating order:', error);
        showAlert(error.message || 'Gagal membuat pesanan', 'danger');
    }
}
```

## 🔐 Authentication

### Token-based (JWT)
```javascript
// Simpan token setelah login
function setToken(token) {
    localStorage.setItem('auth_token', token);
}

// Ambil token
function getToken() {
    return localStorage.getItem('auth_token');
}

// Use token di request
headers: {
    'Authorization': `Bearer ${getToken()}`
}
```

### Login Endpoint
```
POST /api/auth/login
Body: {username, password}
Response: {success, token}
```

## 📦 Example Backend (Node.js)

### server.js
```javascript
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'warung_pintar',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// GET all menus
app.get('/api/menus', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM menu');
        connection.release();
        
        res.json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET single menu
app.get('/api/menus/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            'SELECT * FROM menu WHERE id = ?',
            [req.params.id]
        );
        connection.release();
        
        res.json({
            success: true,
            data: rows[0] || null
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

// POST new menu
app.post('/api/menus', async (req, res) => {
    try {
        const {nama, harga, deskripsi, kategori, gambar, rating} = req.body;
        
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO menu (nama, harga, deskripsi, kategori, gambar, rating) VALUES (?, ?, ?, ?, ?, ?)',
            [nama, harga, deskripsi, kategori, gambar, rating]
        );
        connection.release();
        
        res.json({
            success: true,
            message: 'Menu created',
            data: {id: result.insertId, ...req.body}
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

// PUT update menu
app.put('/api/menus/:id', async (req, res) => {
    try {
        const {nama, harga, deskripsi, kategori, gambar, rating} = req.body;
        
        const connection = await pool.getConnection();
        await connection.query(
            'UPDATE menu SET nama=?, harga=?, deskripsi=?, kategori=?, gambar=?, rating=? WHERE id=?',
            [nama, harga, deskripsi, kategori, gambar, rating, req.params.id]
        );
        connection.release();
        
        res.json({
            success: true,
            message: 'Menu updated'
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

// DELETE menu
app.delete('/api/menus/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM menu WHERE id=?', [req.params.id]);
        connection.release();
        
        res.json({
            success: true,
            message: 'Menu deleted'
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

// POST pesanan
app.post('/api/pesanan', async (req, res) => {
    try {
        const {items, total_harga} = req.body;
        const nomor_pesanan = `ORD-${Date.now()}`;
        
        const connection = await pool.getConnection();
        
        // Start transaction
        await connection.beginTransaction();
        
        // Insert pesanan
        const [result] = await connection.query(
            'INSERT INTO pesanan (nomor_pesanan, total_harga) VALUES (?, ?)',
            [nomor_pesanan, total_harga]
        );
        
        const pesanan_id = result.insertId;
        
        // Insert detail_pesanan
        for (const item of items) {
            const menu = await connection.query(
                'SELECT harga FROM menu WHERE id = ?',
                [item.menu_id]
            );
            
            const subtotal = menu[0][0].harga * item.quantity;
            
            await connection.query(
                'INSERT INTO detail_pesanan (pesanan_id, menu_id, jumlah, subtotal) VALUES (?, ?, ?, ?)',
                [pesanan_id, item.menu_id, item.quantity, subtotal]
            );
        }
        
        await connection.commit();
        connection.release();
        
        res.json({
            success: true,
            data: {
                nomor_pesanan,
                total_harga,
                status: 'Pending'
            }
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### .env
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=warung_pintar
PORT=3000
```

## 🚀 Deployment

### Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create warung-pintar

# Push code
git push heroku main

# View logs
heroku logs --tail
```

### VPS / Dedicated Server
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# Install PM2
npm install -g pm2

# Start app
pm2 start server.js

# Auto-start on reboot
pm2 startup
pm2 save
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```bash
# Build dan run
docker build -t warung-pintar .
docker run -p 3000:3000 warung-pintar
```

## ✅ Checklist Integration

- [ ] Setup Node.js/PHP backend
- [ ] Setup MySQL database
- [ ] Create API endpoints
- [ ] Update loadMenuData()
- [ ] Update saveMenu()
- [ ] Update deleteMenu()
- [ ] Update checkout()
- [ ] Implement authentication
- [ ] Test semua endpoints
- [ ] Setup HTTPS
- [ ] Deploy ke production
- [ ] Configure CORS
- [ ] Setup environment variables
- [ ] Database backup strategy
- [ ] Error handling & logging

---

Untuk bantuan lebih lanjut, lihat dokumentasi official dari backend framework pilihan Anda.
