# 🍽️ Warung Pintar - Aplikasi Menu Makanan Digital

Aplikasi web modern untuk manajemen dan pembelian menu makanan dan minuman secara digital dengan antarmuka yang user-friendly, responsif, dan menarik.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Fitur Tambahan](#fitur-tambahan)
- [Struktur Project](#struktur-project)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Panduan Instalasi](#panduan-instalasi)
- [Cara Menggunakan](#cara-menggunakan)
- [Fitur Detail](#fitur-detail)
- [Database Schema](#database-schema)
- [Tips & Trik](#tips--trik)

## ✨ Fitur Utama

### 1. **Halaman Utama (Home)**
- 📱 Tampilan grid responsive dengan card menu
- 🔍 Fitur pencarian menu real-time
- 🏷️ Filter berdasarkan kategori (Makanan, Minuman, Dessert)
- 💳 Keranjang belanja dengan modal sidebar
- ⭐ Rating dan harga untuk setiap menu
- 🎨 Desain modern dengan animasi hover

### 2. **Halaman Detail Menu**
- 📸 Gambar menu yang besar dan jelas
- 📝 Deskripsi lengkap menu
- 💰 Harga dan informasi rating
- ⚙️ Selector jumlah pembelian
- 🛒 Tombol tambah ke keranjang
- 🔙 Navigasi breadcrumb untuk kembali

### 3. **Keranjang Belanja**
- 📦 Manajemen keranjang dengan localStorage
- ➕➖ Tombol increment/decrement jumlah
- 🗑️ Opsi hapus item dari keranjang
- 💵 Perhitungan total otomatis
- 💳 Proses checkout dengan konfirmasi
- 🔔 Notifikasi pesanan berhasil

### 4. **Panel Admin**
- ➕ Tambah menu baru
- ✏️ Edit menu yang sudah ada
- 🗑️ Hapus menu dari daftar
- 📋 Tabel lengkap dengan manajemen data
- ✅ Form validation lengkap
- 💾 Penyimpanan ke localStorage

## 🎁 Fitur Tambahan

- ✨ Animasi smooth pada card dan button
- 📱 Desain fully responsive (mobile, tablet, desktop)
- 🎯 Filter kategori yang intuitif
- 🔔 Sistem notifikasi/alert
- 💾 Penyimpanan data lokal (localStorage)
- 🎨 Tema warna modern dan konsisten
- ⚡ Loading spinner untuk UX yang baik
- 🌐 Support untuk berbagai browser

## 📁 Struktur Project

```
menu-makanan/
├── index.html              # Halaman utama
├── detail.html             # Halaman detail menu
├── admin.html              # Panel admin
├── css/
│   └── style.css           # Styling lengkap (5000+ lines)
├── js/
│   └── script.js           # Logika JavaScript
├── data/
│   └── menu.json           # Data menu (8 item)
├── database/
│   └── menu.sql            # SQL schema dan data
├── images/                 # Folder untuk gambar lokal
└── README.md               # Dokumentasi ini
```

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur semantic
- **CSS3** - Grid, Flexbox, Media Query
- **JavaScript (ES6+)** - DOM Manipulation, Fetch API, localStorage
- **Responsive Design** - Mobile-first approach

### Backend (Optional)
- **MySQL** - Database
- **SQL** - Query untuk manajemen data

### Fitur Khusus
- **JSON** - Format data menu
- **LocalStorage** - Penyimpanan keranjang belanja
- **Fetch API** - Load data JSON

## 🚀 Panduan Instalasi

### Persyaratan
- Browser modern (Chrome, Firefox, Safari, Edge)
- Text Editor (VS Code, Sublime, dll)
- Server lokal (Live Server atau Python SimpleHTTPServer)

### Langkah-langkah

1. **Clone atau download project**
   ```bash
   git clone https://github.com/username/warung-pintar.git
   cd warung-pintar/menu-makanan
   ```

2. **Buka dengan Live Server**
   - Di VS Code: Klik kanan `index.html` → "Open with Live Server"
   - Atau buka browser dan akses `http://localhost:5500`

3. **Alternatif: Gunakan Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Kemudian buka http://localhost:8000
   ```

4. **Setup Database (Optional untuk production)**
   ```bash
   mysql -u root -p
   source database/menu.sql
   ```

## 📖 Cara Menggunakan

### Untuk Pembeli (User)

1. **Menjelajahi Menu**
   - Buka halaman utama (`index.html`)
   - Scroll untuk melihat semua menu
   - Gunakan pencarian untuk menemukan menu spesifik

2. **Filter Menu**
   - Klik tombol kategori (Semua, Makanan, Minuman, Dessert)
   - Menu akan diperbarui secara otomatis

3. **Melihat Detail Menu**
   - Klik tombol "Detail" pada kartu menu
   - Lihat gambar besar, deskripsi lengkap, dan rating
   - Ubah jumlah pembelian dengan selector

4. **Belanja**
   - Klik tombol "🛒" untuk tambah ke keranjang
   - Klik ikon keranjang di header untuk membuka sidebar
   - Kelola jumlah item atau hapus jika perlu
   - Klik "Proses Pembayaran" untuk checkout

### Untuk Admin

1. **Mengakses Panel Admin**
   - Buka `admin.html`
   - Atau klik "Admin" di navigasi

2. **Menambah Menu Baru**
   - Isi semua form field
   - Klik tombol "Simpan Menu"

3. **Mengedit Menu**
   - Klik tombol "Edit" di tabel
   - Form otomatis terisi dengan data lama
   - Ubah data yang diperlukan
   - Klik "Simpan Menu" untuk update

4. **Menghapus Menu**
   - Klik tombol "Hapus" di tabel
   - Konfirmasi penghapusan
   - Menu akan dihapus dari daftar

## 🔍 Fitur Detail

### Pencarian (Search)
```javascript
- Real-time search
- Cari berdasarkan nama atau deskripsi
- Case-insensitive
- Clear input untuk reset
```

### Filter Kategori
```javascript
- Filter: Semua, Makanan, Minuman, Dessert
- Active state untuk filter yang dipilih
- Update grid secara otomatis
```

### Keranjang Belanja
```javascript
- Simpan di localStorage
- Persist saat refresh halaman
- Increment/decrement jumlah
- Hapus item individual
- Total otomatis
```

### Validasi Form Admin
```javascript
- Nama menu: required
- Harga: required, numeric
- Deskripsi: required
- Kategori: required
- Rating: optional (default 4.5)
- URL gambar: optional
```

### Notifikasi
```javascript
- Tambah ke keranjang: Success
- Produk tidak ditemukan: Danger
- Form tidak lengkap: Warning
- Aksi berhasil: Info
```

## 🗄️ Database Schema

### Tabel: menu
```sql
CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL UNIQUE,
    harga INT NOT NULL,
    deskripsi TEXT NOT NULL,
    kategori ENUM('Makanan', 'Minuman', 'Dessert') NOT NULL,
    gambar VARCHAR(255),
    rating DECIMAL(2,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabel: pesanan
```sql
CREATE TABLE pesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_pesanan VARCHAR(50) UNIQUE NOT NULL,
    tanggal_pesanan DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_harga INT NOT NULL,
    status ENUM('Pending', 'Diproses', 'Selesai', 'Batal') DEFAULT 'Pending'
);
```

### Tabel: detail_pesanan
```sql
CREATE TABLE detail_pesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pesanan_id INT NOT NULL,
    menu_id INT NOT NULL,
    jumlah INT NOT NULL,
    subtotal INT NOT NULL,
    FOREIGN KEY (pesanan_id) REFERENCES pesanan(id),
    FOREIGN KEY (menu_id) REFERENCES menu(id)
);
```

## 📊 Data Menu Awal

Aplikasi ini dilengkapi dengan 8 menu contoh:

1. **Nasi Goreng Spesial** - Rp 35.000 (Makanan) ⭐4.8
2. **Soto Ayam Tradisional** - Rp 28.000 (Makanan) ⭐4.7
3. **Iced Lemon Tea** - Rp 18.000 (Minuman) ⭐4.6
4. **Kue Lapis Legit** - Rp 32.000 (Dessert) ⭐4.9
5. **Mie Goreng Pedas** - Rp 30.000 (Makanan) ⭐4.7
6. **Kopi Arabica Premium** - Rp 25.000 (Minuman) ⭐4.8
7. **Lumpia Shanghai** - Rp 22.000 (Makanan) ⭐4.6
8. **Brownies Cokelat** - Rp 20.000 (Dessert) ⭐4.9

## 🎨 Palet Warna

```
Primary (Orange):     #FF6B35
Secondary (Yellow):   #F7931E
Dark (Text):          #1a1a1a
Light (Background):   #f5f5f5
Success (Green):      #4CAF50
Danger (Red):         #f44336
Warning (Orange):     #ff9800
```

## ⚙️ Tips & Trik

### Optimasi Performa
1. Gunakan lazy loading untuk gambar
2. Minify CSS dan JS untuk production
3. Cache data menu di localStorage
4. Gunakan defer attribute untuk script

### Keamanan
1. Validasi input di frontend dan backend
2. Escape HTML untuk prevent XSS
3. Gunakan HTTPS untuk production
4. Implementasikan authentication untuk admin

### Pengembangan Lebih Lanjut
1. Integrasikan dengan API backend
2. Tambahkan user authentication
3. Implementasikan payment gateway
4. Tambahkan order tracking
5. Create mobile app dengan React Native/Flutter
6. Implementasikan push notification
7. Tambahkan review dan rating sistem
8. Create loyalty program

### Troubleshooting

**Masalah: Data menu tidak muncul**
- Pastikan file `data/menu.json` ada
- Check browser console untuk error
- Verifikasi path relatif file

**Masalah: Keranjang tidak tersimpan**
- Check localStorage di browser
- Pastikan localStorage tidak disabled
- Clear cache dan refresh

**Masalah: Image tidak muncul**
- Verifikasi URL gambar valid
- Gunakan placeholder image
- Check CORS settings jika dari domain lain

## 📝 Lisensi

Project ini bebas digunakan untuk keperluan pribadi dan komersial.

## 👨‍💻 Author

Dibuat dengan ❤️ untuk pembelajaran dan pengembangan web modern.

## 📞 Kontak & Support

- Email: info@warungpintar.com
- Phone: +62 812-3456-7890
- Alamat: Jl. Merdeka No. 123

---

**Selamat menggunakan Warung Pintar! 🎉**

Untuk informasi lebih lanjut atau pertanyaan, silahkan hubungi tim support kami.
