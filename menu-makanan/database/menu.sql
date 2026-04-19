-- Buat Database
CREATE DATABASE IF NOT EXISTS warung_pintar;
USE warung_pintar;

-- Tabel Menu Makanan
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    harga INT NOT NULL,
    deskripsi TEXT NOT NULL,
    kategori ENUM('Makanan', 'Minuman', 'Dessert') NOT NULL,
    gambar VARCHAR(255),
    rating DECIMAL(2,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_nama (nama)
);

-- Tabel Pesanan
CREATE TABLE IF NOT EXISTS pesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomor_pesanan VARCHAR(50) UNIQUE NOT NULL,
    tanggal_pesanan DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_harga INT NOT NULL,
    status ENUM('Pending', 'Diproses', 'Selesai', 'Batal') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel Detail Pesanan
CREATE TABLE IF NOT EXISTS detail_pesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pesanan_id INT NOT NULL,
    menu_id INT NOT NULL,
    jumlah INT NOT NULL,
    subtotal INT NOT NULL,
    FOREIGN KEY (pesanan_id) REFERENCES pesanan(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);

-- Insert Data Menu
INSERT INTO menu (nama, harga, deskripsi, kategori, gambar, rating) VALUES
('Nasi Goreng Spesial', 35000, 'Nasi goreng dengan telur, ayam, udang, dan sayuran pilihan. Rasanya gurih dan lezat dengan bumbu khas restoran.', 'Makanan', 'https://images.unsplash.com/photo-1609501676725-7186f017a4b2?w=300&h=300&fit=crop', 4.8),
('Soto Ayam Tradisional', 28000, 'Soto ayam dengan kuah tradisional, telur, wortel, dan kentang. Kehangatan dalam setiap gigitan.', 'Makanan', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop', 4.7),
('Iced Lemon Tea', 18000, 'Teh lemon segar dengan es batu. Minuman penyejuk yang sempurna untuk hari yang panas.', 'Minuman', 'https://images.unsplash.com/photo-1563227812-0ea4c4c2e7a8?w=300&h=300&fit=crop', 4.6),
('Kue Lapis Legit', 32000, 'Kue tradisional berlapis-lapis yang nikmat dan kaya rasa. Dibuat dengan resep turun temurun.', 'Dessert', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop', 4.9),
('Mie Goreng Pedas', 30000, 'Mie goreng dengan level pedas yang dapat disesuaikan. Dilengkapi telur, bakso, dan sayuran segar.', 'Makanan', 'https://images.unsplash.com/photo-1612874472603-ee55e21f4ec7?w=300&h=300&fit=crop', 4.7),
('Kopi Arabica Premium', 25000, 'Kopi arabica pilihan dari perkebunan terbaik. Aroma kuat dan cita rasa yang kompleks.', 'Minuman', 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=300&h=300&fit=crop', 4.8),
('Lumpia Shanghai', 22000, 'Lumpia goreng dengan isian daging, sayuran, dan udang. Gurih, renyah, dan sangat menggugah selera.', 'Makanan', 'https://images.unsplash.com/photo-1559329007-40790c361d38?w=300&h=300&fit=crop', 4.6),
('Brownies Cokelat', 20000, 'Brownies homemade dengan cokelat premium. Tekstur lembut dan rasa cokelat yang kaya.', 'Dessert', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&h=300&fit=crop', 4.9);

-- Index untuk performa
CREATE INDEX idx_kategori ON menu(kategori);
CREATE INDEX idx_pesanan_status ON pesanan(status);
