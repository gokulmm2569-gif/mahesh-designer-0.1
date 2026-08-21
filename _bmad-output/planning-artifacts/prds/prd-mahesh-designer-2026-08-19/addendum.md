# Addendum: MAHESH DESIGNER Technical & Design Specifications

*Preserved from `_bmad/scripts/course.md` for downstream architecture (`bmad-architecture`), UX (`bmad-ux`), and engineering (`bmad-build`).*

---

## 1. Technology Stack Architecture

### Frontend
- **Framework:** React with React Router
- **Architecture:** Component-based modular design (Navbar, Hero, ProductCard, FilterDrawer, PDPGallery, CartSummary, AdminTable, Modal, Toast)
- **Styling:** Custom Vanilla CSS Design System with CSS variables / design tokens matching the luxury palette
- **State Management:** Context API / React State for Auth, Cart, Wishlist, Filter states
- **API Client:** Fetch / Axios integration with backend REST endpoints

### Backend
- **Framework:** Python (FastAPI / Flask)
- **Architecture:** RESTful API with structured routing (`/auth`, `/products`, `/categories`, `/wishlist`, `/cart`, `/orders`, `/reviews`, `/admin`)
- **Authentication & Security:** JWT or session tokens, password hashing (bcrypt), RBAC middleware (`role: customer | admin`)
- **File Uploads:** Multi-part form handling with MIME type validation (`.jpg`, `.jpeg`, `.png`, `.webp`), size restrictions, and unique file naming

### Database
- **Engine:** MySQL Relational Database
- **Structure:** Normalized schema with Primary Keys, Foreign Keys, unique constraints, and indexed lookup columns (`category_id`, `status`, `user_id`, `order_id`)

---

## 2. Recommended Relational Database Schema

```sql
-- Users & Authentication
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    image_url VARCHAR(255) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
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
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Product Images
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Sizes
CREATE TABLE product_sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    size_label VARCHAR(20) NOT NULL, -- e.g., 'XS', 'S', 'M', 'L', 'XL', 'Custom'
    stock_count INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Wishlist
CREATE TABLE wishlist_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_product_wishlist (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Cart
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
);

-- Orders
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
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Order Items
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    size_label VARCHAR(20) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Reviews
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 3. REST API Endpoint Specification

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create customer account
- `POST /api/auth/login` - Authenticate customer/admin, issue token
- `POST /api/auth/logout` - Invalidate session token
- `GET /api/auth/profile` - Fetch current user profile & addresses
- `PUT /api/auth/profile` - Update profile & delivery info

### Catalog (`/api/products`, `/api/categories`)
- `GET /api/categories` - List all active categories
- `GET /api/products` - List products with filter (`category`, `price_min`, `price_max`, `color`, `fabric`, `embroidery`, `size`, `in_stock`), sort (`newest`, `price_asc`, `price_desc`, `popular`), and search
- `GET /api/products/:id` or `:slug` - Fetch rich product details, gallery images, sizes, reviews, related items
- `GET /api/products/featured` - Fetch curated homepage featured products

### Customer Utilities (`/api/wishlist`, `/api/cart`)
- `GET /api/wishlist` - Fetch user's wishlist
- `POST /api/wishlist` - Add item to wishlist `{ product_id }`
- `DELETE /api/wishlist/:productId` - Remove item from wishlist
- `GET /api/cart` - Fetch active customer cart with calculated totals
- `POST /api/cart` - Add item to cart `{ product_id, size_label, quantity }`
- `PUT /api/cart/:itemId` - Update quantity
- `DELETE /api/cart/:itemId` - Remove cart item

### Orders (`/api/orders`)
- `POST /api/orders` - Place new order from cart with delivery address
- `GET /api/orders` - List current customer's order history
- `GET /api/orders/:id` - Fetch single order details & tracking status

### Reviews (`/api/reviews`)
- `GET /api/products/:id/reviews` - List approved reviews for a product
- `POST /api/products/:id/reviews` - Submit review (verified buyer check)

### Back-Office Administration (`/api/admin/*` - Protected: Admin Role Only)
- `GET /api/admin/dashboard/stats` - Fetch total products, categories, users, orders, stock alerts, revenue
- `POST /api/admin/products` - Create product with multi-image uploads
- `PUT /api/admin/products/:id` - Edit product attributes & stock
- `DELETE /api/admin/products/:id` - Delete/archive product
- `POST /api/admin/categories` - Create new category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `GET /api/admin/orders` - List all orders across all customers with filter by status
- `PUT /api/admin/orders/:id/status` - Update order lifecycle status (`pending`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`)
- `GET /api/admin/users` - List registered customer accounts
- `PUT /api/admin/users/:id/status` - Toggle user active status
- `GET /api/admin/reviews` - List all customer reviews
- `DELETE /api/admin/reviews/:id` - Delete/moderate inappropriate review

---

## 4. Editorial Fashion Photography & AI Asset Generation Matrix

| Asset Code | Concept & Subject | Key Attributes | Recommended Prompt Description |
| :--- | :--- | :--- | :--- |
| `HERO_BRIDAL_01` | High-End Bridal Lehenga & Blouse | Deep Red / Gold, Intricate Aari Embroidery, Warm studio lighting | Full-length adult Indian bride in luxury deep red and antique gold Aari embroidered bridal lehenga, elegant jewelry, editorial soft diffused lighting, luxury warm neutral background. |
| `BLOUSE_AARI_01` | Hand-Embroidered Bridal Blouse | Maroon Silk, Gold Zari, Beads, Sequins | Premium Indian bridal blouse, rich maroon raw silk with intricate hand-embroidered gold zari Aari work, beads and sequins, worn by adult Indian model, sharp macro embroidery focus, neutral luxury studio backdrop. |
| `GOWN_RECEPTION_01` | Indian Fusion Reception Gown | Emerald Green / Royal Blue / Jewel Tones, Floor-length | High-fashion Indian fusion reception evening gown, floor-length silhouette, delicate zardozi and aari accents, modern styling, soft editorial studio lighting. |
| `FABRIC_MACRO_01` | Aari Craftsmanship Macro Shot | Gold thread, silk weave, artisan detail | Extreme macro close-up photography of authentic Indian Aari embroidery on maroon silk fabric, showing sharp gold zari threads, beads, sequins, and fine craftsmanship texture. |
| `FLATLAY_SHOWCASE_01` | Brand Editorial Showcase Flat-lay | Blouse, swatches, thread spools, brand card | Luxury top-down flat-lay composition on neutral linen fabric: folded bridal blouse, antique gold thread spools, aari needle, fabric swatches, and elegant card with 'MAHESH DESIGNER'. |
