# 📚 API & Dokumentasi Teknis - Warung Pintar

Dokumentasi lengkap untuk fungsi-fungsi JavaScript dan struktur data yang digunakan.

## 🔧 Fungsi JavaScript Utama

### Data Management

#### `loadMenuData()`
Memuat data menu dari file JSON.
```javascript
loadMenuData()
- Return: Promise<Array>
- Throws: Error jika gagal load JSON
- Usage: await loadMenuData()
```

#### `saveCart()`
Menyimpan keranjang belanja ke localStorage.
```javascript
saveCart()
- Saves cart array to localStorage key 'cart'
- Automatic call setiap kali cart berubah
```

### Menu Rendering

#### `renderMenuGrid(menus = menuData)`
Menampilkan grid menu di halaman utama.
```javascript
renderMenuGrid(menus)
- Parameter: menus (Array) - Array menu yang ditampilkan
- Updates: DOM element #menuGrid
- Features: Responsive grid dengan card animation
```

#### `renderDetailPage()`
Menampilkan detail halaman menu individual.
```javascript
renderDetailPage()
- Parameters: Menggunakan sessionStorage.selectedMenuId
- Updates: DOM element #detailContainer
- Includes: Image, description, price, rating, quantity selector
```

#### `renderAdminTable()`
Menampilkan tabel menu di panel admin.
```javascript
renderAdminTable()
- Updates: DOM element #adminTableBody
- Includes: Edit dan delete buttons untuk setiap row
```

### Search & Filter

#### `performSearch()`
Mencari menu berdasarkan keyword.
```javascript
performSearch()
- Search: Nama menu atau deskripsi (case-insensitive)
- Triggered: Click button atau Enter di search input
- Updates: Menu grid dengan hasil pencarian
```

#### `initializeFilterButtons()`
Inisialisasi filter kategori buttons.
```javascript
initializeFilterButtons()
- Categories: Semua, Makanan, Minuman, Dessert
- Triggered: Click tombol filter
- Updates: Active state dan menu grid
```

### Cart Management

#### `addToCart(menuId, quantity = 1)`
Menambah item ke keranjang.
```javascript
addToCart(menuId, quantity)
- Parameters: 
  - menuId (Number): ID menu
  - quantity (Number): Jumlah (default 1)
- Logic: Update qty jika sudah ada, tambah baru jika belum
- Side Effects: Save cart, update badge, show alert
```

#### `removeFromCart(menuId)`
Menghapus item dari keranjang.
```javascript
removeFromCart(menuId)
- Parameters: menuId (Number)
- Updates: Cart array, cart display, badge
```

#### `updateQuantity(menuId, newQuantity)`
Update jumlah item di keranjang.
```javascript
updateQuantity(menuId, newQuantity)
- Parameters: 
  - menuId (Number)
  - newQuantity (Number)
- Logic: Remove jika qty < 1, update jika valid
```

#### `updateCartDisplay()`
Update tampilan keranjang sidebar.
```javascript
updateCartDisplay()
- Updates: HTML cartItems dan cart total
- Shows: Empty state jika keranjang kosong
- Calculates: Total harga otomatis
```

#### `updateCartBadge()`
Update badge angka di ikon keranjang.
```javascript
updateCartBadge()
- Calculates: Total quantity semua items
- Updates: Cart badge element
- Visibility: Hide jika quantity = 0
```

#### `checkout()`
Proses checkout dan pembuatan pesanan.
```javascript
checkout()
- Validation: Keranjang tidak kosong
- Logic: Generate order number, confirm pesanan
- Side Effects: Clear cart, show confirmation
```

#### `toggleCartModal()` & `closeCartModal()`
Toggle atau close cart sidebar.
```javascript
toggleCartModal()
- Toggle: Active class pada cartModal

closeCartModal()
- Action: Remove active class dan tutup modal
```

### Detail Page Functions

#### `goToDetail(menuId)`
Navigate ke halaman detail.
```javascript
goToDetail(menuId)
- Parameters: menuId (Number)
- Action: Save ke sessionStorage, redirect ke detail.html
```

#### `addDetailToCart(menuId)`
Tambah menu dari halaman detail ke keranjang.
```javascript
addDetailToCart(menuId)
- Gets: Quantity dari input #detailQty
- Action: Call addToCart dengan quantity
- Reset: Clear quantity input ke 1
```

#### `increaseQty()` & `decreaseQty()`
Ubah jumlah di halaman detail.
```javascript
increaseQty()
- Action: Increment #detailQty value

decreaseQty()
- Condition: Minimum quantity = 1
- Action: Decrement #detailQty value
```

### Admin Functions

#### `initializeAdminForm()`
Setup event listeners untuk admin form.
```javascript
initializeAdminForm()
- Events: Submit form, reset button
- Validation: Form validation lengkap
```

#### `saveMenu()`
Simpan menu baru atau update menu yang ada.
```javascript
saveMenu()
- Validation: All required fields
- Logic: 
  - If currentEditId: Update menu
  - Else: Create new menu
- Side Effects: Update table, clear form, save to localStorage
```

#### `editMenu(menuId)`
Load menu ke form untuk editing.
```javascript
editMenu(menuId)
- Parameters: menuId (Number)
- Action: 
  - Populate form dengan data menu
  - Set currentEditId
  - Scroll ke form
- Focus: Set focus ke input nama
```

#### `deleteMenu(menuId)`
Hapus menu dari daftar.
```javascript
deleteMenu(menuId)
- Confirmation: Ask user confirmation
- Action: Filter menu array, update table
- Save: Update localStorage
```

### Utility Functions

#### `formatPrice(price)`
Format harga ke format Rupiah.
```javascript
formatPrice(price)
- Parameters: price (Number)
- Return: String (formatted Rp)
- Example: 35000 → "35.000"
```

#### `showAlert(message, type = 'info')`
Tampilkan alert notification.
```javascript
showAlert(message, type)
- Parameters:
  - message (String): Pesan alert
  - type (String): 'success', 'danger', 'warning', 'info'
- Features: Auto-hide setelah 4 detik
- Animation: Fade in effect
```

## 📊 Struktur Data

### Menu Object
```javascript
{
    id: Number,              // Unique identifier
    nama: String,            // Menu name
    harga: Number,           // Price in Rp
    deskripsi: String,       // Description
    kategori: String,        // 'Makanan' | 'Minuman' | 'Dessert'
    gambar: String,          // Image URL
    rating: Number           // 0-5 rating
}
```

### Cart Item Object
```javascript
{
    id: Number,              // Menu ID
    nama: String,            // Menu name
    harga: Number,           // Price in Rp
    gambar: String,          // Image URL
    quantity: Number         // Quantity in cart
}
```

### Pesanan Object
```javascript
{
    id: Number,              // Auto increment
    nomor_pesanan: String,   // Generated: ORD-{timestamp}
    tanggal_pesanan: DateTime, // Current timestamp
    total_harga: Number,     // Total in Rp
    status: String           // 'Pending' | 'Diproses' | 'Selesai' | 'Batal'
}
```

## 🌐 Global Variables

```javascript
let menuData = [];              // Array semua menu
let cart = [];                  // Array items di keranjang
let currentEditId = null;       // ID menu yang sedang diedit (admin)
```

## 💾 LocalStorage Keys

```javascript
'cart'          // Simpan cart items
'menuData'      // Simpan menu data (admin only)
'selectedMenuId'// Session-only, untuk detail page
```

## 📡 API Endpoints (Untuk Production Backend)

### GET /api/menus
Ambil semua menu.
```
GET /api/menus
Response: {
    success: true,
    data: [{menu objects}]
}
```

### GET /api/menus/:id
Ambil detail menu.
```
GET /api/menus/:id
Response: {menu object}
```

### POST /api/menus
Buat menu baru.
```
POST /api/menus
Body: {nama, harga, deskripsi, kategori, gambar, rating}
Response: {success, data: {new menu object}}
```

### PUT /api/menus/:id
Update menu.
```
PUT /api/menus/:id
Body: {nama, harga, deskripsi, kategori, gambar, rating}
Response: {success, data: {updated menu object}}
```

### DELETE /api/menus/:id
Hapus menu.
```
DELETE /api/menus/:id
Response: {success, message}
```

### POST /api/pesanan
Buat pesanan baru.
```
POST /api/pesanan
Body: {items: [{menu_id, quantity}], total_harga}
Response: {success, data: {pesanan object}}
```

## 🎯 Event Listeners

### Header
```javascript
document.getElementById('cartIcon')     // Click: toggleCartModal()
```

### Home Page
```javascript
#searchBtn                              // Click: performSearch()
#searchInput                            // Keypress Enter: performSearch()
.filter-btn                             // Click: Filter kategori
.btn-detail                             // Click: goToDetail(id)
.btn-cart                               // Click: addToCart(id, 1)
```

### Detail Page
```javascript
.qty-btn                                // Click: increaseQty/decreaseQty
.btn-add-cart                           // Click: addDetailToCart(id)
```

### Cart Sidebar
```javascript
.cart-close                             // Click: closeCartModal()
.qty-btn (in cart)                      // Click: updateQuantity
.cart-remove                            // Click: removeFromCart(id)
.btn-checkout                           // Click: checkout()
```

### Admin Page
```javascript
#adminForm                              // Submit: saveMenu()
.btn-reset                              // Click: Reset form
.btn-edit                               // Click: editMenu(id)
.btn-delete                             // Click: deleteMenu(id)
```

## 🔐 Form Validation

### Admin Form Validation
```javascript
menuNama       // Required, string
menuHarga      // Required, number, min 0
menuDeskripsi  // Required, text
menuKategori   // Required, enum
menuGambar     // Optional, URL
menuRating     // Optional, number 0-5
```

## 🚨 Error Handling

### Try-Catch Blocks
```javascript
try {
    const data = await fetch('./data/menu.json');
    // Process data
} catch (error) {
    console.error('Error:', error);
    showAlert('Gagal memuat data', 'danger');
}
```

### Validation Messages
```javascript
if (!field) {
    showAlert('Field wajib diisi', 'warning');
    return;
}

if (data.length === 0) {
    showAlert('Tidak ada hasil', 'info');
}
```

## ⚡ Performance Tips

1. **Lazy Load Images**
   ```javascript
   img.loading = "lazy"
   ```

2. **Debounce Search**
   ```javascript
   // Untuk production, gunakan debounce
   ```

3. **Cache Data**
   ```javascript
   localStorage.setItem('menuData', JSON.stringify(menuData))
   ```

4. **Minify CSS/JS**
   ```bash
   # Gunakan build tools seperti Webpack, Gulp
   ```

## 📱 Responsive Breakpoints

```css
Desktop:    > 768px   (3 columns)
Tablet:     768px     (2 columns)
Mobile:     < 480px   (1 column)
```

## 🔗 File Dependencies

```
index.html
├── css/style.css
├── js/script.js
└── data/menu.json

detail.html
├── css/style.css
├── js/script.js
└── data/menu.json

admin.html
├── css/style.css
├── js/script.js
└── data/menu.json
```

## 🐛 Debug Mode

Untuk debug, tambahkan di console:
```javascript
// Lihat semua menu
console.log(menuData);

// Lihat keranjang
console.log(cart);

// Lihat localStorage
console.log(localStorage.getItem('cart'));

// Test function
addToCart(1, 2);
updateCartDisplay();
```

## 📖 Referensi Tambahan

- [MDN Web Docs - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN Web Docs - DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [CSS Grid Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Production Ready
