// ========================================
// GLOBAL VARIABLES & STATE
// ========================================
let menuData = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentEditId = null;

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    // Update user info di navbar
    updateUserInfo();
    
    // Load menu data
    await loadMenuData();
    
    // Render menus on home page
    if (document.getElementById('menuGrid')) {
        renderMenuGrid(menuData);
        initializeFilterButtons();
        initializeSearchBox();
    }
    
    // Render cart on cart page
    if (document.getElementById('cartModal')) {
        updateCartDisplay();
    }
    
    // Render admin page
    if (document.getElementById('adminForm')) {
        renderAdminTable();
        initializeAdminForm();
    }
    
    // Render detail page
    if (document.getElementById('detailContainer')) {
        renderDetailPage();
    }
    
    // Update cart badge
    updateCartBadge();
});

// ========================================
// LOAD MENU DATA FROM JSON
// ========================================
async function loadMenuData() {
    try {
        const response = await fetch('./data/menu.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        menuData = data.menus;
        return menuData;
    } catch (error) {
        console.error('Error loading menu data:', error);
        showAlert('Gagal memuat data menu', 'danger');
        return [];
    }
}

// ========================================
// RENDER MENU GRID (HOME PAGE)
// ========================================
function renderMenuGrid(menus = menuData) {
    const menuGrid = document.getElementById('menuGrid');
    
    if (!menuGrid) return;
    
    if (menus.length === 0) {
        menuGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">🔍</div>
                <h2>Menu Tidak Ditemukan</h2>
                <p>Coba gunakan kata kunci pencarian yang berbeda</p>
            </div>
        `;
        return;
    }
    
    menuGrid.innerHTML = menus.map(menu => `
        <div class="menu-card" data-id="${menu.id}">
            <img src="${menu.gambar}" alt="${menu.nama}" class="card-image" onerror="this.src='https://via.placeholder.com/300x200?text=${menu.nama}'">
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${menu.nama}</h3>
                    <span class="card-category">${menu.kategori}</span>
                </div>
                <p class="card-description">${menu.deskripsi}</p>
                <div class="card-footer">
                    <div>
                        <div class="card-price">Rp ${formatPrice(menu.harga)}</div>
                        <div class="card-rating">⭐ ${menu.rating}</div>
                    </div>
                </div>
                <div class="card-buttons">
                    <button class="btn-detail" onclick="goToDetail(${menu.id})">Detail</button>
                    <button class="btn-cart" onclick="addToCart(${menu.id}, 1)">🛒</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function initializeSearchBox() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!searchInput || !searchBtn) return;
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderMenuGrid(menuData);
        return;
    }
    
    const filtered = menuData.filter(menu =>
        menu.nama.toLowerCase().includes(searchTerm) ||
        menu.deskripsi.toLowerCase().includes(searchTerm)
    );
    
    renderMenuGrid(filtered);
}

// ========================================
// FILTER BY CATEGORY
// ========================================
function initializeFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Filter menus
            const category = e.target.dataset.category;
            
            if (category === 'semua') {
                renderMenuGrid(menuData);
            } else {
                const filtered = menuData.filter(menu => menu.kategori === category);
                renderMenuGrid(filtered);
            }
        });
    });
}

// ========================================
// CART FUNCTIONALITY
// ========================================
function addToCart(menuId, quantity = 1) {
    const menu = menuData.find(m => m.id === menuId);
    if (!menu) return;
    
    const existingItem = cart.find(item => item.id === menuId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: menu.id,
            nama: menu.nama,
            harga: menu.harga,
            gambar: menu.gambar,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartBadge();
    showAlert(`${menu.nama} ditambahkan ke keranjang`, 'success');
}

function removeFromCart(menuId) {
    cart = cart.filter(item => item.id !== menuId);
    saveCart();
    updateCartDisplay();
    updateCartBadge();
}

function updateQuantity(menuId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(menuId);
        return;
    }
    
    const item = cart.find(item => item.id === menuId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartDisplay();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (badge) {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.querySelector('.cart-total span:last-child');
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <h3>Keranjang Kosong</h3>
                <p>Mulai belanja sekarang!</p>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = 'Rp 0';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.gambar}" alt="${item.nama}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.nama}</div>
                <div class="cart-item-price">Rp ${formatPrice(item.harga)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-remove" onclick="removeFromCart(${item.id})">Hapus</div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.harga * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = `Rp ${formatPrice(total)}`;
    if (checkoutBtn) checkoutBtn.disabled = false;
}

function toggleCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.toggle('active');
    }
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('active');
    }
}

function checkout() {
    if (cart.length === 0) {
        showAlert('Keranjang masih kosong', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.harga * item.quantity), 0);
    const orderNumber = `ORD-${Date.now()}`;
    
    const confirmMsg = `Pesanan Anda:\n\n${cart.map(item => `${item.nama} x${item.quantity} = Rp ${formatPrice(item.harga * item.quantity)}`).join('\n')}\n\nTotal: Rp ${formatPrice(total)}\n\nNomor Pesanan: ${orderNumber}\n\nLanjutkan ke pembayaran?`;
    
    if (confirm(confirmMsg)) {
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartBadge();
        closeCartModal();
        showAlert(`Pesanan berhasil dibuat! Nomor pesanan: ${orderNumber}`, 'success');
    }
}

// ========================================
// DETAIL PAGE
// ========================================
function goToDetail(menuId) {
    sessionStorage.setItem('selectedMenuId', menuId);
    window.location.href = './detail.html';
}

function renderDetailPage() {
    const menuId = parseInt(sessionStorage.getItem('selectedMenuId'));
    const menu = menuData.find(m => m.id === menuId);
    
    if (!menu) {
        document.getElementById('detailContainer').innerHTML = `
            <div class="empty-state" style="padding: 4rem;">
                <div class="empty-state-icon">❌</div>
                <h2>Menu Tidak Ditemukan</h2>
                <p><a href="./index.html" style="color: var(--primary-color);">← Kembali ke menu</a></p>
            </div>
        `;
        return;
    }
    
    const detailContainer = document.getElementById('detailContainer');
    detailContainer.innerHTML = `
        <div class="detail-grid">
            <img src="${menu.gambar}" alt="${menu.nama}" class="detail-image" onerror="this.src='https://via.placeholder.com/400x400?text=${menu.nama}'">
            <div class="detail-info">
                <h1>${menu.nama}</h1>
                <span class="detail-category">${menu.kategori}</span>
                <div class="detail-price">Rp ${formatPrice(menu.harga)}</div>
                <div class="detail-rating">⭐ ${menu.rating} / 5</div>
                <p class="detail-description">${menu.deskripsi}</p>
                
                <div class="detail-actions">
                    <div class="qty-selector">
                        <button onclick="decreaseQty()">−</button>
                        <input type="number" id="detailQty" value="1" min="1">
                        <button onclick="increaseQty()">+</button>
                    </div>
                    <button class="btn-add-cart" onclick="addDetailToCart(${menu.id})">Tambah ke Keranjang</button>
                </div>
                
                <a href="./index.html" class="btn-detail" style="display: block; text-align: center;">← Kembali ke Menu</a>
            </div>
        </div>
    `;
}

function addDetailToCart(menuId) {
    const qtyInput = document.getElementById('detailQty');
    const quantity = parseInt(qtyInput.value) || 1;
    addToCart(menuId, quantity);
    qtyInput.value = '1';
}

function increaseQty() {
    const qtyInput = document.getElementById('detailQty');
    qtyInput.value = (parseInt(qtyInput.value) || 1) + 1;
}

function decreaseQty() {
    const qtyInput = document.getElementById('detailQty');
    const current = parseInt(qtyInput.value) || 1;
    if (current > 1) {
        qtyInput.value = current - 1;
    }
}

// ========================================
// ADMIN PAGE
// ========================================
function initializeAdminForm() {
    const form = document.getElementById('adminForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveMenu();
    });
    
    const resetBtn = form.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            currentEditId = null;
            document.querySelector('.form-group label').textContent = 'Tambah Menu Baru';
        });
    }
}

function renderAdminTable() {
    const adminTableBody = document.getElementById('adminTableBody');
    if (!adminTableBody) return;
    
    adminTableBody.innerHTML = menuData.map(menu => `
        <tr>
            <td>${menu.id}</td>
            <td>${menu.nama}</td>
            <td>Rp ${formatPrice(menu.harga)}</td>
            <td>${menu.kategori}</td>
            <td>
                <button class="btn-edit" onclick="editMenu(${menu.id})">Edit</button>
                <button class="btn-delete" onclick="deleteMenu(${menu.id})">Hapus</button>
            </td>
        </tr>
    `).join('');
}

function saveMenu() {
    const nama = document.getElementById('menuNama').value.trim();
    const harga = parseInt(document.getElementById('menuHarga').value);
    const deskripsi = document.getElementById('menuDeskripsi').value.trim();
    const kategori = document.getElementById('menuKategori').value;
    const gambar = document.getElementById('menuGambar').value.trim();
    const rating = parseFloat(document.getElementById('menuRating').value) || 4.5;
    
    // Validation
    if (!nama || !harga || !deskripsi || !kategori) {
        showAlert('Semua field harus diisi', 'warning');
        return;
    }
    
    if (currentEditId) {
        // Update menu
        const menu = menuData.find(m => m.id === currentEditId);
        if (menu) {
            menu.nama = nama;
            menu.harga = harga;
            menu.deskripsi = deskripsi;
            menu.kategori = kategori;
            menu.gambar = gambar;
            menu.rating = rating;
            showAlert('Menu berhasil diperbarui', 'success');
        }
    } else {
        // Add new menu
        const newId = Math.max(...menuData.map(m => m.id), 0) + 1;
        menuData.push({
            id: newId,
            nama,
            harga,
            deskripsi,
            kategori,
            gambar: gambar || 'https://via.placeholder.com/300x200?text=Menu',
            rating
        });
        showAlert('Menu baru berhasil ditambahkan', 'success');
    }
    
    // Reset form
    document.getElementById('adminForm').reset();
    currentEditId = null;
    renderAdminTable();
    
    // Save to localStorage (simulate database)
    localStorage.setItem('menuData', JSON.stringify(menuData));
}

function editMenu(menuId) {
    const menu = menuData.find(m => m.id === menuId);
    if (!menu) return;
    
    document.getElementById('menuNama').value = menu.nama;
    document.getElementById('menuHarga').value = menu.harga;
    document.getElementById('menuDeskripsi').value = menu.deskripsi;
    document.getElementById('menuKategori').value = menu.kategori;
    document.getElementById('menuGambar').value = menu.gambar;
    document.getElementById('menuRating').value = menu.rating;
    
    currentEditId = menuId;
    
    // Scroll to form
    document.getElementById('adminForm').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('menuNama').focus();
}

function deleteMenu(menuId) {
    if (!confirm('Apakah Anda yakin ingin menghapus menu ini?')) return;
    
    menuData = menuData.filter(m => m.id !== menuId);
    renderAdminTable();
    showAlert('Menu berhasil dihapus', 'success');
    
    // Save to localStorage
    localStorage.setItem('menuData', JSON.stringify(menuData));
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} fade-in`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 4000);
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const cartModal = document.getElementById('cartModal');
    if (cartModal && e.target === cartModal) {
        closeCartModal();
    }
});

// Prevent form submission on enter in input fields
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.id !== 'searchInput') {
        e.preventDefault();
    }
});
