-- ==========================================================
-- MAHESH DESIGNER - MySQL Database Schema & Seed Data
-- Database: MySQL 8.0+
-- Credentials: root / admin123
-- ==========================================================

CREATE DATABASE IF NOT EXISTS mahesh_designer_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mahesh_designer_db;

-- 1. Users & Roles
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS wishlist_items;
DROP TABLE IF EXISTS product_sizes;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    mobile VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    address TEXT NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) NULL,
    pincode VARCHAR(20) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_username (username),
    INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    image_url VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    fabric_type VARCHAR(100) NOT NULL,
    fabric_color VARCHAR(100) NOT NULL,
    embroidery_type VARCHAR(100) NOT NULL,
    original_price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2) NULL,
    stock INT NOT NULL DEFAULT 0,
    is_customization_available BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_products_category (category_id),
    INDEX idx_products_status (status),
    INDEX idx_products_featured (is_featured),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Product Images
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    INDEX idx_product_images_pid (product_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Product Sizes
CREATE TABLE product_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    size_label VARCHAR(20) NOT NULL,
    stock_count INT DEFAULT 0,
    INDEX idx_product_sizes_pid (product_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Wishlist Items
CREATE TABLE wishlist_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_product_wishlist (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Cart Items
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    size_label VARCHAR(20) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_product_size_cart (user_id, product_id, size_label),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    final_amount DECIMAL(10, 2) NOT NULL,
    shipping_name VARCHAR(150) NOT NULL,
    shipping_mobile VARCHAR(20) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state VARCHAR(100) NOT NULL,
    shipping_pincode VARCHAR(20) NOT NULL,
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50) DEFAULT 'cod',
    payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_orders_user (user_id),
    INDEX idx_orders_status (status),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Order Items
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    size_label VARCHAR(20) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    INDEX idx_order_items_oid (order_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Reviews
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_reviews_product (product_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- SEED DATA
-- ==========================================================

-- Admin User: admin / admin123 (bcrypt hash)
-- Customer: customer / customer123
INSERT INTO users (full_name, username, email, mobile, password_hash, role, address, city, state, pincode) VALUES
('Mahesh Admin', 'admin', 'admin@maheshdesigner.com', '9876543210', '$2b$12$4v0P1H7tB8CfZjG4cZ4wve1.jLw43r0m2bN3q8H3S5G.r3u8Y4YvK', 'admin', 'Boutique Studio 1', 'Chennai', 'Tamil Nadu', '600001'),
('Ananya Sharma', 'ananya', 'ananya@example.com', '9876543211', '$2b$12$4v0P1H7tB8CfZjG4cZ4wve1.jLw43r0m2bN3q8H3S5G.r3u8Y4YvK', 'customer', 'Flat 402, Royal Palms', 'Mumbai', 'Maharashtra', '400001');

-- Categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Bridal Blouses', 'bridal-blouses', 'Exquisite handcrafted bridal blouses featuring intricate Aari needlework and antique gold zari.', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80'),
('Bridal Lehengas', 'bridal-lehengas', 'Royal wedding lehengas woven in rich silks, velvets, and heritage peacock motifs.', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80'),
('Reception Gowns', 'reception-gowns', 'Modern Indian fusion gowns with floor-length silhouettes and subtle zardozi accents.', 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=700&q=80'),
('Aari Kurtis', 'aari-kurtis', 'Everyday luxury and festive kurtis with delicate neckline and sleeve embroidery.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80');

-- Products
INSERT INTO products (category_id, name, slug, description, fabric_type, fabric_color, embroidery_type, original_price, discount_price, stock, is_customization_available, is_featured, status) VALUES
(1, 'Aari Maroon Silk Bridal Blouse', 'aari-maroon-silk-bridal-blouse', 'Handcrafted masterpiece executed on pure raw mulberry silk with intricate antique gold zari, pearl beads, and micro-sequins.', 'Pure Raw Silk', 'Maroon', 'Heavy Aari Hand Embroidery', 24000.00, 18500.00, 12, TRUE, TRUE, 'active'),
(2, 'Royal Emerald Peacock Lehenga', 'royal-emerald-peacock-lehenga', 'Regal wedding lehenga featuring dense peacock embroidery, zardozi borders, and gold tissue organza dupatta.', 'Silk Velvet & Organza', 'Emerald Green', 'Aari & Zardozi Zari', 75000.00, 62000.00, 5, TRUE, TRUE, 'active'),
(3, 'Crimson Rose Fusion Reception Gown', 'crimson-rose-fusion-reception-gown', 'Floor-length contemporary silhouette in georgette silk with delicate zardozi border and hand-embroidered bodice.', 'Georgette Silk', 'Deep Red', 'Micro-sequin Aari Border', 42000.00, 34500.00, 8, TRUE, TRUE, 'active'),
(1, 'Antique Gold Zari Bridal Blouse', 'antique-gold-zari-bridal-blouse', 'Heavy bridal cutwork blouse with temple jewelry motifs and antique bullion gold thread.', 'Raw Silk', 'Antique Gold', 'Temple Motif Aari Work', 28000.00, 22000.00, 7, TRUE, FALSE, 'active');

-- Product Images
INSERT INTO product_images (product_id, image_url, is_primary, display_order) VALUES
(1, 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80', TRUE, 1),
(1, 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80', FALSE, 2),
(2, 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80', TRUE, 1),
(3, 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80', TRUE, 1);

-- Product Sizes
INSERT INTO product_sizes (product_id, size_label, stock_count) VALUES
(1, '34 (S)', 4),
(1, '36 (M)', 5),
(1, '38 (L)', 3),
(2, 'S', 2),
(2, 'M', 2),
(2, 'L', 1),
(3, 'S', 3),
(3, 'M', 3),
(3, 'L', 2);
