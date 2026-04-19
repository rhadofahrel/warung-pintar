// ========================================
// AUTH UTILITY FUNCTIONS
// ========================================

/**
 * Cek apakah user sudah login
 * @returns {Object|null} User object atau null
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Cek apakah user adalah admin
 * @returns {Boolean}
 */
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

/**
 * Cek apakah user adalah customer
 * @returns {Boolean}
 */
function isCustomer() {
    const user = getCurrentUser();
    return user && user.role === 'customer';
}

/**
 * Cek autentikasi - redirect jika belum login
 * @param {String} requiredRole - 'admin', 'customer', atau 'any'
 */
function requireAuth(requiredRole = 'any') {
    const user = getCurrentUser();

    if (!user) {
        // Belum login
        window.location.href = './login.html';
        return false;
    }

    if (requiredRole !== 'any' && user.role !== requiredRole) {
        // Role tidak sesuai
        alert('Anda tidak memiliki akses ke halaman ini!');
        window.location.href = './index.html';
        return false;
    }

    return true;
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('savedUsername');
    window.location.href = './login.html';
}

/**
 * Generate random token
 * @returns {String}
 */
function generateToken() {
    return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

/**
 * Get registered users dari localStorage
 * @returns {Array}
 */
function getRegisteredUsers() {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
}

/**
 * Format tanggal
 * @param {String} dateStr
 * @returns {String}
 */
function formatDate(dateStr) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
}

/**
 * Show user info di navbar
 */
function updateUserInfo() {
    const user = getCurrentUser();
    const userInfoContainer = document.getElementById('userInfo');
    
    if (!userInfoContainer) return;

    if (user) {
        userInfoContainer.innerHTML = `
            <div class="user-menu">
                <span class="user-name">${user.username}</span>
                <button class="btn-logout" onclick="logout()">Logout</button>
            </div>
        `;
    }
}

/**
 * Add auth header styles
 */
function addAuthStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .user-menu {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: white;
        }

        .user-name {
            font-weight: 600;
            font-size: 0.95rem;
        }

        .btn-logout {
            padding: 0.5rem 1rem;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid white;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-logout:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .role-badge {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            background: #FFD700;
            color: #333;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-left: 0.5rem;
        }

        .role-badge.admin {
            background: #FF6B35;
            color: white;
        }

        .role-badge.customer {
            background: #4CAF50;
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// Initialize auth
document.addEventListener('DOMContentLoaded', () => {
    addAuthStyles();
    updateUserInfo();
});

// Auto logout jika token expired (optional)
setInterval(() => {
    const user = getCurrentUser();
    if (user) {
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const diffMinutes = (now - loginTime) / (1000 * 60);

        // Logout setelah 24 jam
        if (diffMinutes > 24 * 60) {
            logout();
        }
    }
}, 60000); // Check setiap 1 menit
