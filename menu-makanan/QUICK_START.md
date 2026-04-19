# 🚀 Quick Start Guide - Warung Pintar

Panduan cepat untuk memulai aplikasi Warung Pintar dalam 5 menit.

## ⚡ Mulai Cepat

### 1. Buka Aplikasi (30 detik)
```
1. Buka file: index.html
2. Atau: Klik kanan index.html → "Open with Live Server"
3. Browser akan membuka aplikasi secara otomatis
```

### 2. Jelajahi Menu (2 menit)
```
✓ Scroll halaman untuk melihat semua menu
✓ Lihat gambar, nama, harga, dan rating
✓ Hover card untuk efek zoom
```

### 3. Gunakan Fitur Pencarian (1 menit)
```
1. Ketik di search box: "Nasi" atau "Goreng"
2. Klik tombol "Cari" atau tekan Enter
3. Hasil pencarian akan ditampilkan
```

### 4. Filter Kategori (30 detik)
```
1. Klik tombol kategori: "Makanan", "Minuman", atau "Dessert"
2. Menu akan diupdate otomatis
3. Klik "Semua" untuk reset filter
```

### 5. Belanja (1 menit)
```
1. Klik "Detail" untuk melihat detail menu
2. Ubah jumlah dengan selector ➕ ➖
3. Klik "Tambah ke Keranjang"
4. Klik ikon 🛒 di header untuk buka keranjang
5. Manage jumlah atau hapus item
6. Klik "Proses Pembayaran" untuk checkout
```

## 📌 Menu Cepat

| Halaman | URL | Fungsi |
|---------|-----|--------|
| Home | `index.html` | Lihat semua menu |
| Detail | `detail.html` | Detail menu individual |
| Admin | `admin.html` | Kelola menu |

## 🎯 Fitur Utama

### Pencarian & Filter
- 🔍 **Search**: Cari nama atau deskripsi menu
- 🏷️ **Filter**: Makanan, Minuman, Dessert
- ⭐ **Rating**: Lihat rating dari pengguna

### Keranjang Belanja
- 🛒 **Tambah**: Klik tombol atau icon keranjang
- ➕ **Tambah Qty**: Increment jumlah item
- ➖ **Kurang Qty**: Decrement jumlah item
- 🗑️ **Hapus**: Remove item dari keranjang
- 💳 **Checkout**: Proses pembayaran

### Panel Admin
- ➕ **Tambah Menu**: Form untuk menu baru
- ✏️ **Edit Menu**: Klik edit di tabel
- 🗑️ **Hapus Menu**: Klik hapus dengan konfirmasi
- 📋 **Kelola Daftar**: Tabel lengkap semua menu

## 💡 Tips Berguna

### Untuk Pembeli
```
✓ Gunakan search untuk cepat menemukan
✓ Hover card untuk preview lebih besar
✓ Klik Detail untuk info lengkap
✓ Keranjang auto-save ke browser
✓ Bisa lanjut belanja setelah checkout
```

### Untuk Admin
```
✓ Isi semua field dengan * sebelum save
✓ Gunakan URL gambar valid dari web
✓ Rating default 4.5 jika tidak diisi
✓ Data disimpan ke localStorage
✓ Edit dengan klik tombol Edit di tabel
```

## 🔧 Troubleshooting Cepat

### Masalah: Menu tidak muncul
```
✓ Refresh halaman (F5)
✓ Clear browser cache
✓ Check console (F12) untuk error
```

### Masalah: Keranjang tidak tersimpan
```
✓ Pastikan localStorage enabled
✓ Check privacy mode, disable kalau ada
✓ Clear cache dan refresh
```

### Masalah: Image tidak muncul
```
✓ Gunakan URL image yang valid
✓ URL harus dimulai dengan https://
✓ Test URL di browser tab baru
```

### Masalah: Search tidak bekerja
```
✓ Pastikan file menu.json ada
✓ Check spelling nama menu
✓ Coba search dengan nama lengkap
```

## 📱 Akses Mobile

```
1. Buka di mobile browser
2. Aplikasi fully responsive
3. Touch-friendly buttons
4. Scroll smooth ke detail
5. Modal keranjang fullscreen
```

## 🎨 Kustomisasi Cepat

### Ubah Warna
Edit file `css/style.css`, baris 9-17:
```css
--primary-color: #FF6B35;      /* Orange */
--secondary-color: #F7931E;    /* Yellow */
```

### Ubah Logo
Edit di `index.html`, `detail.html`, `admin.html`:
```html
<div class="logo">🍽️ Warung Pintar</div>
<!-- Ganti emoji atau text -->
```

### Ubah Data Menu
Edit file `data/menu.json` atau gunakan Admin Panel.

## 📊 Data Menu Demo

Aplikasi sudah include 8 menu contoh:
```
1. Nasi Goreng Spesial (Rp 35.000)
2. Soto Ayam (Rp 28.000)
3. Iced Lemon Tea (Rp 18.000)
4. Kue Lapis Legit (Rp 32.000)
5. Mie Goreng Pedas (Rp 30.000)
6. Kopi Arabica (Rp 25.000)
7. Lumpia Shanghai (Rp 22.000)
8. Brownies Cokelat (Rp 20.000)
```

## 🔐 Keamanan Dasar

```
✓ Password protect admin page
✓ Validasi form input
✓ Sanitize data sebelum display
✓ Use HTTPS untuk production
```

## 📚 File Penting

```
index.html          → Halaman utama (wajib dibuka)
detail.html         → Halaman detail menu
admin.html          → Panel admin
css/style.css       → Styling (jangan edit jika tidak perlu)
js/script.js        → Logika (jangan edit jika tidak perlu)
data/menu.json      → Data menu (aman diedit)
database/menu.sql   → SQL schema (untuk production)
```

## ✅ Checklist Sebelum Production

- [ ] Test semua fitur di browser berbeda
- [ ] Test responsive design di mobile
- [ ] Clear browser cache
- [ ] Optimize gambar
- [ ] Minify CSS dan JS
- [ ] Setup database MySQL
- [ ] Setup backend API
- [ ] Implementasi payment gateway
- [ ] Setup HTTPS
- [ ] Test loading speed

## 🚀 Deployment Cepat

### GitHub Pages
```
1. Push ke GitHub
2. Enable GitHub Pages di settings
3. Deploy otomatis
```

### Netlify
```
1. Drag and drop folder ke Netlify
2. Deploy instant
3. Get live URL
```

### Server Sendiri
```
1. Upload files ke hosting
2. Set index.html sebagai default
3. Ensure data/menu.json accessible
4. Test di browser
```

## 📞 Support

Jika ada pertanyaan:
```
Email: info@warungpintar.com
Phone: +62 812-3456-7890
```

## 🎓 Belajar Lebih Lanjut

Baca file dokumentasi:
- `README.md` - Panduan lengkap
- `API_DOCUMENTATION.md` - Referensi teknis
- `database/menu.sql` - Database schema

---

**Selamat! Anda sudah siap menggunakan Warung Pintar! 🎉**

Mulai jelajahi menu sekarang! 👉 **Buka `index.html`**
