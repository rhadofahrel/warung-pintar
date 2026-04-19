# ❓ FAQ & Troubleshooting - Warung Pintar

Jawaban untuk pertanyaan umum dan solusi masalah yang sering terjadi.

## ❓ Pertanyaan Umum

### Q: Bagaimana cara menjalankan aplikasi?
**A:** Buka file `index.html` dengan browser atau gunakan Live Server di VS Code.

### Q: Apakah perlu server untuk menjalankan?
**A:** Tidak untuk development lokal. Gunakan Live Server atau Python SimpleHTTPServer untuk CORS.

### Q: Data saya hilang setelah refresh, kenapa?
**A:** Data menu disimpan di localStorage browser. Jika cache dihapus, data akan hilang. Untuk permanent, gunakan database MySQL.

### Q: Bagaimana cara menghubungkan ke database?
**A:** Edit `script.js` untuk fetch dari API backend daripada file JSON.

### Q: Bisa customize warna?
**A:** Ya! Edit variable CSS di `css/style.css` baris 9-17.

### Q: Apakah responsif untuk mobile?
**A:** Ya! 100% responsive. Coba di device berbeda.

### Q: Bagaimana cara menambah menu baru?
**A:** Dua cara:
1. Edit `data/menu.json` dan refresh
2. Gunakan Panel Admin di `admin.html`

### Q: Apakah aman untuk production?
**A:** Belum sepenuhnya. Butuh:
- Setup database MySQL
- Create backend API
- Implement authentication
- Setup HTTPS
- Sanitize input

---

## 🐛 Troubleshooting

### ❌ Menu tidak muncul
**Penyebab & Solusi:**
```
1. File menu.json tidak ditemukan
   └─ Pastikan path: data/menu.json
   
2. JSON syntax error
   └─ Validate di jsonlint.com
   
3. CORS error
   └─ Gunakan Live Server, bukan open file
   
4. Browser cache
   └─ Ctrl+Shift+Delete, clear cache
```

**Test:**
```javascript
// Buka console (F12), ketik:
fetch('./data/menu.json')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

### ❌ Keranjang tidak tersimpan
**Penyebab & Solusi:**
```
1. localStorage disabled
   └─ Enable di browser settings
   
2. Private/Incognito mode
   └─ localStorage tidak work di mode ini
   
3. Quota exceeded
   └─ Clear browser data dan retry
   
4. Cross-origin issue
   └─ Gunakan server lokal, bukan file://
```

**Test:**
```javascript
// Buka console, ketik:
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test'));
```

---

### ❌ Gambar tidak muncul
**Penyebab & Solusi:**
```
1. URL gambar tidak valid
   └─ Test URL di tab baru
   └─ Pastikan bukan local path
   
2. CORS issue
   └─ Gunakan CORS-enabled image service
   └─ Atau setup backend proxy
   
3. Image kadaluarsa
   └─ Update URL di JSON
   
4. Browser cache
   └─ Hard refresh: Ctrl+Shift+R
```

**Test URL:**
```javascript
// Di console, ketik:
let img = new Image();
img.src = 'https://...';
img.onerror = () => console.log('Error loading image');
```

---

### ❌ Search/Filter tidak bekerja
**Penyebab & Solusi:**
```
1. Keyword tidak cocok
   └─ Case-insensitive, tapi harus exact word
   
2. menuData kosong
   └─ Tunggu loadMenuData() selesai
   
3. Event listener tidak attach
   └─ Check console untuk error
   
4. Input placeholder bingung
   └─ Klik di dalam input, pastikan cursor ada
```

**Test:**
```javascript
// Di console, ketik:
console.log('Menu count:', menuData.length);
console.log('Cart count:', cart.length);
```

---

### ❌ Admin form tidak save
**Penyebab & Solusi:**
```
1. Field tidak lengkap
   └─ * field harus diisi
   
2. Validation gagal
   └─ Check alert message
   
3. localStorage penuh
   └─ Clear old data
   
4. JavaScript error
   └─ Check console (F12)
```

**Required Fields:**
- Nama Menu: Text
- Harga: Number > 0
- Deskripsi: Text
- Kategori: Select salah satu

---

### ❌ Checkout error / Pesanan tidak terbuat
**Penyebab & Solusi:**
```
1. Keranjang kosong
   └─ Tambah item dulu
   
2. Reject konfirmasi
   └─ Klik OK di dialog confirm
   
3. Browser alert disabled
   └─ Enable JavaScript alerts
```

**Manual Test:**
```javascript
// Di console, ketik:
cart = [{id: 1, nama: 'Test', harga: 1000, gambar: '', quantity: 1}];
checkout();
```

---

### ❌ Page layout berantakan
**Penyebab & Solusi:**
```
1. CSS tidak load
   └─ Check network tab (F12)
   └─ Pastikan path: ./css/style.css
   
2. Browser zoom
   └─ Reset zoom: Ctrl+0
   
3. Window terlalu sempit
   └─ Responsive design untuk width < 320px
   
4. Font tidak match
   └─ Browser fallback ke default
```

---

### ❌ Slow performance
**Penyebab & Solusi:**
```
1. Gambar besar
   └─ Optimize gambar atau ganti URL
   
2. Banyak re-render
   └─ Minimize DOM updates
   
3. localStorage penuh
   └─ Clear unnecessary data
   
4. Browser extension
   └─ Disable extension yang interfere
```

**Check Performance:**
```javascript
// Di console, ketik:
console.time('Load');
loadMenuData().then(() => {
  console.timeEnd('Load');
});
```

---

## 🔍 Debug Tips

### Konsol Browser (F12)
```javascript
// Lihat semua menu
console.table(menuData);

// Lihat keranjang
console.table(cart);

// Lihat localStorage
console.log(localStorage);

// Lihat specific item
console.log(menuData.find(m => m.id === 1));
```

### Chrome DevTools
```
1. Buka DevTools: F12
2. Tab Console: Lihat error & log
3. Tab Network: Lihat request
4. Tab Application: Lihat localStorage
5. Tab Elements: Inspect HTML
```

### Breakpoints (Debug Line by Line)
```javascript
// Tambah di script.js:
debugger; // Pause execution di sini

// Atau di DevTools:
// Klik line number untuk set breakpoint
```

---

## 📊 Local Storage Inspector

### View Data
```javascript
// Di console:
JSON.parse(localStorage.getItem('cart'))
```

### Clear Data
```javascript
// Hapus specific:
localStorage.removeItem('cart');

// Hapus semua:
localStorage.clear();
```

### Edit Data Manual
```javascript
// Di console:
const newCart = [{id: 1, nama: 'Test', quantity: 1}];
localStorage.setItem('cart', JSON.stringify(newCart));
location.reload();
```

---

## 🎯 Common Mistakes

### ❌ Copy-paste dari file lain
- Pastikan path relatif correct
- Check file location di folder

### ❌ Gunakan absolute path
```javascript
// ❌ Salah:
fetch('/data/menu.json')

// ✓ Benar:
fetch('./data/menu.json')
```

### ❌ Edit HTML tanpa backup
- Always backup sebelum edit besar
- Gunakan version control (Git)

### ❌ Lupa clear browser cache
- Ctrl+Shift+Delete untuk clear cache
- Hard refresh: Ctrl+Shift+R

### ❌ Tidak validate JSON
- Gunakan jsonlint.com untuk validate
- Check console untuk error message

---

## ✅ Testing Checklist

### Functionality Testing
- [ ] Load halaman utama
- [ ] Lihat semua menu muncul
- [ ] Search bekerja
- [ ] Filter kategori bekerja
- [ ] Klik detail ke halaman detail
- [ ] Tambah ke keranjang
- [ ] Buka/tutup keranjang
- [ ] Update quantity di keranjang
- [ ] Hapus dari keranjang
- [ ] Checkout
- [ ] Ke admin panel
- [ ] Tambah menu
- [ ] Edit menu
- [ ] Hapus menu

### Responsive Testing
- [ ] Desktop 1920px
- [ ] Laptop 1366px
- [ ] Tablet 768px
- [ ] Mobile 375px
- [ ] Touch interaction works

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Performance Testing
- [ ] Page load < 2s
- [ ] Smooth scroll
- [ ] No lag on click
- [ ] Animation smooth

---

## 📞 Ketika Stuck

### Step 1: Check Console
```
Buka F12 → Console → Lihat error
```

### Step 2: Clear Cache
```
Ctrl+Shift+Delete → Clear cache → Refresh
```

### Step 3: Reload Page
```
Ctrl+F5 (hard refresh)
atau
Ctrl+Shift+R
```

### Step 4: Check File Path
```
Pastikan semua file ada di lokasi benar
```

### Step 5: View Page Source
```
Ctrl+U → Check HTML structure
```

### Step 6: Check Network Tab
```
F12 → Network → Reload → Check requests
```

---

## 📖 Helpful Resources

### MDN References
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

### Validation Tools
- JSON Validator: [jsonlint.com](https://jsonlint.com)
- CSS Validator: [jigsaw.w3.org](https://jigsaw.w3.org/css-validator)
- HTML Validator: [validator.w3.org](https://validator.w3.org)

### Testing Tools
- Chrome DevTools: Built-in (F12)
- Firefox Inspector: Built-in (F12)
- Lighthouse: Chrome built-in
- WebPageTest: [webpagetest.org](https://webpagetest.org)

---

## 🎓 Learning Resources

### JavaScript
- [JavaScript Tutorial](https://javascript.info)
- [ES6 Guide](https://es6.io)

### Web Development
- [MDN Web Docs](https://developer.mozilla.org)
- [freeCodeCamp](https://freecodecamp.org)

### Database
- [MySQL Tutorial](https://dev.mysql.com/doc)
- [SQL Tutorial](https://sqlzoo.net)

---

## 📝 Report Issue

Jika menemukan bug:
1. Deskripsi masalah dengan detail
2. Screenshot atau error message
3. Steps untuk reproduce
4. Browser & OS yang digunakan
5. Version aplikasi

Email: info@warungpintar.com

---

**Semoga troubleshooting ini membantu! 🙏**

Jika masih ada pertanyaan, silahkan hubungi support kami.
