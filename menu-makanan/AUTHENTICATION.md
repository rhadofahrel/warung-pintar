# 🔐 Authentication Guide - Warung Pintar

Panduan lengkap untuk sistem login, register, dan manajemen user dengan role-based access.

## 📋 Daftar Isi

- [Fitur Autentikasi](#fitur-autentikasi)
- [Akun Demo](#akun-demo)
- [Flow Autentikasi](#flow-autentikasi)
- [API Fungsi](#api-fungsi)
- [Implementasi](#implementasi)
- [Keamanan](#keamanan)
- [Troubleshooting](#troubleshooting)

---

## ✨ Fitur Autentikasi

### 🔑 Login
```
✓ Login dengan username atau email
✓ Remember me functionality
✓ Password validation
✓ Session management dengan token
✓ Redirect otomatis berdasarkan role
```

### 📝 Register
```
✓ Validasi form lengkap
✓ Password strength indicator
✓ Konfirmasi password
✓ Role selection (Admin/Customer)
✓ Unique username & email check
✓ Terms & conditions agreement
```

### 👥 Role-Based Access
```
Admin:
  ✓ Akses ke halaman admin.html
  ✓ Bisa manage menu (CRUD)
  ✓ Full control

Customer:
  ✓ Akses ke index.html & detail.html
  ✓ Bisa belanja
  ✓ Dapat melihat catalog
  ✗ Tidak bisa akses admin
```

### 🔒 Session Management
```
✓ Token-based authentication
✓ localStorage persistence
✓ Auto-logout setelah 24 jam
✓ Remember me option
```

---

## 🧪 Akun Demo

### Admin Account
```
Username: admin
Email: admin@warungpintar.com
Password: admin123
Role: Admin
```

### Customer Account
```
Username: customer
Email: customer@example.com
Password: customer123
Role: Customer
```

---

## 🔄 Flow Autentikasi

### 1. Register Flow
```
User ke register.html
    ↓
Input data (nama, email, username, password, role)
    ↓
Validasi input & check duplicate username/email
    ↓
Hash password (di production)
    ↓
Save user ke localStorage (registeredUsers)
    ↓
Redirect ke login.html
```

### 2. Login Flow
```
User ke login.html
    ↓
Input username/password + remember me option
    ↓
Validate credentials
    ↓
Generate token
    ↓
Save user data + token ke localStorage (currentUser)
    ↓
Redirect ke admin.html atau index.html (sesuai role)
```

### 3. Access Check Flow
```
User ke index.html / admin.html / detail.html
    ↓
Script check localStorage (currentUser)
    ↓
Jika tidak ada → Redirect ke login.html
    ↓
Jika ada tapi role tidak sesuai → Reject & redirect
    ↓
Jika valid → Tampilkan halaman + user info
```

### 4. Logout Flow
```
User klik tombol Logout
    ↓
Clear localStorage (currentUser, rememberMe, savedUsername)
    ↓
Redirect ke login.html
```

---

## 🔧 API Fungsi

### Auth Functions (js/auth.js)

#### `getCurrentUser()`
Dapatkan current user dari localStorage
```javascript
const user = getCurrentUser();
// Returns: {id, username, email, role, token, loginTime}
// atau null jika belum login
```

#### `isAdmin()`
Cek apakah user adalah admin
```javascript
if (isAdmin()) {
    // User adalah admin
}
```

#### `isCustomer()`
Cek apakah user adalah customer
```javascript
if (isCustomer()) {
    // User adalah customer
}
```

#### `requireAuth(requiredRole)`
Cek autentikasi - redirect jika belum login
```javascript
requireAuth('admin');     // Hanya admin
requireAuth('customer');  // Hanya customer
requireAuth('any');       // Siapa saja (default)

// Returns: true jika valid, false jika redirect
```

#### `logout()`
Logout user
```javascript
logout();  // Clear data & redirect ke login.html
```

#### `generateToken()`
Generate random token untuk user
```javascript
const token = generateToken();
// Returns: "token_xxxxx_1234567890"
```

#### `getRegisteredUsers()`
Dapatkan semua user terdaftar
```javascript
const users = getRegisteredUsers();
// Returns: Array of user objects
```

#### `formatDate(dateStr)`
Format tanggal ke format lokal
```javascript
const formatted = formatDate('2024-04-19T10:30:00Z');
// Returns: "19 April 2024 10:30"
```

#### `updateUserInfo()`
Update display user info di navbar
```javascript
updateUserInfo();  // Otomatis dipanggil saat DOMContentLoaded
// Menampilkan username + logout button
```

---

## 📁 File Structure

```
menu-makanan/
├── login.html              (Halaman login)
├── register.html           (Halaman register)
├── index.html              (Home - Customer)
├── detail.html             (Detail menu - Customer)
├── admin.html              (Admin panel - Admin only)
├── js/
│   ├── auth.js             (Auth utilities)
│   └── script.js           (Menu logic + auth check)
└── ...
```

---

## 💻 Implementasi

### 1. Halaman yang Memerlukan Auth

Tambahkan di akhir HTML sebelum `</body>`:

```html
<script src="./js/auth.js"></script>
<script src="./js/script.js"></script>
<script>
    // Redirect jika belum login
    document.addEventListener('DOMContentLoaded', () => {
        if (!getCurrentUser()) {
            window.location.href = './login.html';
        }
    });
</script>
```

### 2. Halaman Admin Only

```html
<script src="./js/auth.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        requireAuth('admin');  // Hanya admin yang boleh
    });
</script>
```

### 3. Tampilkan User Info di Navbar

```html
<div id="userInfo"></div>

<script src="./js/auth.js"></script>
```

updateUserInfo() akan otomatis menampilkan username + logout button.

### 4. Akses User Data di Script

```javascript
const user = getCurrentUser();
console.log(user.username);  // "admin"
console.log(user.role);      // "admin"
console.log(isAdmin());      // true
```

---

## 🔐 Keamanan

### Current Implementation (Development)
```
✓ Password disimpan plain text di localStorage
✓ Token adalah random string
⚠️ TIDAK SECURE untuk production!
```

### Recommendations untuk Production

#### 1. **Password Hashing**
```javascript
// Gunakan bcryptjs library
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

#### 2. **JWT Tokens**
```javascript
// Gunakan jsonwebtoken library
import jwt from 'jsonwebtoken';

const token = jwt.sign(
    { id: user.id, role: user.role },
    'SECRET_KEY',
    { expiresIn: '24h' }
);
```

#### 3. **HTTPS**
```
Gunakan HTTPS untuk semua koneksi
Simpan token di httpOnly cookie
```

#### 4. **Backend Validation**
```javascript
// Jangan percaya client-side validation saja
// Validate password & credentials di backend
// Verifikasi token di setiap request
```

#### 5. **Environment Variables**
```
REACT_APP_API_URL=...
REACT_APP_SECRET_KEY=...
// Tidak hardcoded di frontend
```

---

## 📝 localStorage Schema

### Key: `currentUser`
```json
{
    "id": 1,
    "username": "admin",
    "email": "admin@warungpintar.com",
    "role": "admin",
    "token": "token_abc123_1234567890",
    "loginTime": "2024-04-19T10:30:00Z"
}
```

### Key: `registeredUsers`
```json
[
    {
        "id": 1,
        "fullname": "Admin User",
        "email": "admin@warungpintar.com",
        "username": "admin",
        "phone": "+6281234567890",
        "password": "admin123",
        "role": "admin",
        "createdAt": "2024-01-01T00:00:00Z"
    },
    ...
]
```

### Key: `rememberMe`
```
true atau tidak ada
```

### Key: `savedUsername`
```
"admin" atau username yang disimpan
```

---

## 🐛 Troubleshooting

### Problem: Redirect loop ke login
**Solusi:**
```javascript
// Check console apakah currentUser ada
console.log(localStorage.getItem('currentUser'));

// Clear dan login ulang
localStorage.clear();
window.location.href = './login.html';
```

### Problem: Cannot read property 'role' of null
**Solusi:**
```javascript
const user = getCurrentUser();
if (user && user.role === 'admin') {
    // Safe check
}
```

### Problem: Remember me tidak bekerja
**Solusi:**
```javascript
// Check apakah localStorage enabled
try {
    localStorage.setItem('test', 'value');
    localStorage.removeItem('test');
} catch (e) {
    console.log('localStorage disabled');
}
```

### Problem: Auto-logout tidak berfungsi
**Solusi:**
```javascript
// Check interval di console
setInterval(() => {
    console.log('Checking auth timeout...');
}, 60000);
```

---

## 🔄 Contoh Implementasi

### Login di Custom Page

```html
<!DOCTYPE html>
<html>
<head>
    <title>Custom Login</title>
</head>
<body>
    <form id="customLoginForm">
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button type="submit">Login</button>
    </form>

    <script src="./js/auth.js"></script>
    <script>
        document.getElementById('customLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const users = getRegisteredUsers();
            const user = users.find(u => 
                (u.username === username || u.email === username) &&
                u.password === password
            );
            
            if (user) {
                const userData = {
                    ...user,
                    token: generateToken(),
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('currentUser', JSON.stringify(userData));
                window.location.href = user.role === 'admin' ? './admin.html' : './index.html';
            } else {
                alert('Login gagal!');
            }
        });
    </script>
</body>
</html>
```

### Protected Route Component

```javascript
function ProtectedRoute({ component: Component, requiredRole = 'any' }) {
    return function() {
        const user = getCurrentUser();
        
        if (!user) {
            window.location.href = './login.html';
            return null;
        }
        
        if (requiredRole !== 'any' && user.role !== requiredRole) {
            alert('Akses ditolak!');
            window.location.href = './index.html';
            return null;
        }
        
        return <Component />;
    };
}
```

---

## 📚 Referensi

- [MDN - Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [JWT Introduction](https://jwt.io/introduction)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

**Status:** Development Ready  
**Security Level:** ⚠️ Development only - Upgrade untuk production  
**Last Updated:** 2024-04-19
