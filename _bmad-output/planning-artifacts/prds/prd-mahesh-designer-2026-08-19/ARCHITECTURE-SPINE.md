---
title: MAHESH DESIGNER - System Architecture Spine
status: final
created: 2026-08-19
updated: 2026-08-19
author: Winston (System Architect)
paradigm: Layered Decoupled Client-Server REST Architecture
stack:
  frontend: React.js (Vite, React Router v6, Context API, Vanilla CSS)
  backend: Python FastAPI (Uvicorn, Pydantic v2, SQLAlchemy Core/ORM, PyMySQL, Python-Jose JWT, Passlib/Bcrypt)
  database: MySQL 8.0+ (InnoDB, UTF8mb4, Normalized Relational Schema)
  api: JSON REST over HTTP/1.1 (CORS enabled)
---

# MAHESH DESIGNER — Technical Architecture Spine

## 1. System Overview & Architecture Paradigm

The MAHESH DESIGNER e-commerce platform is architected as a **decoupled, modular client-server system** adhering to clear boundary separation between the presentation tier (React SPA), API services tier (Python FastAPI async backend), and relational persistence tier (MySQL).

```mermaid
graph TD
    subgraph Client Tier [Frontend - React SPA :5173]
        A[Storefront UI & Pages] --> B[React Router & State Context]
        B --> C[API Client Service Layer]
        D[Admin Portal UI] --> B
    end

    subgraph Service Tier [Backend - Python FastAPI :8000]
        C -->|REST JSON / HTTP| E[FastAPI Application Gateway]
        E --> F[Auth Middleware & RBAC Router]
        F --> G[Domain Routers: /auth, /products, /cart, /orders, /admin]
        G --> H[Pydantic Validation Schemas]
        G --> I[Business Logic & Service Layer]
        I --> J[SQLAlchemy DB Session Manager]
        I --> K[Media Upload Handler]
    end

    subgraph Persistence & Storage Tier
        J -->|PyMySQL Connection Pool| L[(MySQL Database :3306)]
        K --> M[Static Uploads Storage /uploads]
    end
```

---

## 2. Project Directory Structure

```
cake-shop-bmad/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  # FastAPI app entry point & CORS
│   │   ├── config.py                # Environment variables & DB settings
│   │   ├── database.py              # MySQL engine & session factory
│   │   ├── models/                  # SQLAlchemy ORM models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   ├── category.py
│   │   │   ├── cart.py
│   │   │   ├── order.py
│   │   │   └── review.py
│   │   ├── schemas/                 # Pydantic request/response contracts
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   ├── cart.py
│   │   │   ├── order.py
│   │   │   └── review.py
│   │   ├── routers/                 # REST API endpoints
│   │   │   ├── __init__.py
│   │   │   ├── auth.py              # /api/auth (register, login, profile)
│   │   │   ├── products.py          # /api/products (filter, search, PDP)
│   │   │   ├── categories.py        # /api/categories
│   │   │   ├── wishlist.py          # /api/wishlist
│   │   │   ├── cart.py              # /api/cart
│   │   │   ├── orders.py            # /api/orders
│   │   │   ├── reviews.py           # /api/reviews
│   │   │   └── admin.py             # /api/admin (protected back-office CRUD)
│   │   ├── services/                # Core business logic
│   │   │   ├── auth_service.py      # Password hashing & JWT issuance
│   │   │   ├── product_service.py
│   │   │   └── order_service.py
│   │   └── utils/
│   │       ├── security.py          # JWT & RBAC dependency injection
│   │       └── file_storage.py      # Image validation & disk persistence
│   ├── uploads/                     # Static uploaded product imagery
│   ├── requirements.txt             # Python backend dependencies
│   └── seed_data.py                 # Initial catalog & admin seeder
│
├── frontend/
│   ├── public/                      # Static brand assets & icons
│   ├── src/
│   │   ├── assets/                  # CSS styles, brand assets
│   │   │   └── index.css            # Design tokens from DESIGN.md
│   │   ├── components/              # Reusable luxury UI components
│   │   │   ├── layout/              # Navbar, TopBar, Footer, MobileDrawer
│   │   │   ├── storefront/          # HeroSection, CollectionCard, ProductCard, PDPModal
│   │   │   ├── cart/                # CartDrawer, CartItemRow, CheckoutModal
│   │   │   ├── admin/               # AdminSidebar, StatCard, OrderTable, ProductForm
│   │   │   └── common/              # Toast, Button, Badge, Modal, Skeleton
│   │   ├── context/                 # Global state management
│   │   │   ├── AuthContext.jsx      # User session & admin role state
│   │   │   ├── CartContext.jsx      # Cart items, qty, and pricing
│   │   │   └── WishlistContext.jsx  # Wishlist persistence
│   │   ├── pages/                   # Top-level screen views
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx     # Filterable PLP
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── WishlistPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrderHistoryPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── AdminDashboardPage.jsx
│   │   ├── services/                # API client adapters
│   │   │   ├── api.js               # Base fetch/axios client with JWT interceptor
│   │   │   ├── authApi.js
│   │   │   ├── productApi.js
│   │   │   ├── orderApi.js
│   │   │   └── adminApi.js
│   │   ├── App.jsx                  # Route definitions
│   │   └── main.jsx                 # React root mount
│   ├── package.json
│   ├── index.html
│   └── vite.config.js
│
└── database/
    ├── schema.sql                   # MySQL DDL table creation script
    └── seed.sql                     # Seed script with default categories & admin
```

---

## 3. Architectural Decisions (ADs)

### AD-1: [ADOPTED] Decoupled React SPA + Python FastAPI REST API
- **Binds:** Presentation tier to React SPA and Backend tier to Python FastAPI.
- **Prevents:** Monolithic template coupling (Jinja2/Django templates) and allows seamless independent frontend iteration.
- **Rule:** All communication occurs via structured JSON payloads over RESTful HTTP endpoints.

### AD-2: [ADOPTED] MySQL 8 Relational Database with ACID Constraints
- **Binds:** Persistence tier to MySQL database (`user: root, password: admin123`).
- **Prevents:** Inconsistent inventory states, orphaned cart items, or unconstrained order records.
- **Rule:** Foreign keys with `ON DELETE CASCADE` or `RESTRICT` are enforced at the database level.

### AD-3: [ADOPTED] JWT Authentication & Role-Based Access Control (RBAC)
- **Binds:** API security to JSON Web Tokens containing `sub` (user_id) and `role` (`customer` | `admin`).
- **Prevents:** Privilege escalation and unauthorized access to `/api/admin/*` routes.
- **Rule:** FastAPI `Depends(get_current_admin_user)` is mandatory on every administrative route. Frontend route guards mirror these permissions.

### AD-4: [ADOPTED] Deterministic Order State Progression
- **Binds:** Order fulfillment lifecycle to deterministic state machine:
  `pending` → `confirmed` → `processing` → `shipped` → `delivered` (or `cancelled`).
- **Prevents:** Arbitrary illegal transitions (e.g. `delivered` → `pending`).
- **Rule:** Order status updates must validate allowable transitions before updating MySQL.

### AD-5: [ADOPTED] Standardized REST Error & Response Envelope
- **Binds:** Error and success responses across all endpoints.
- **Prevents:** Inconsistent error parsing on the frontend.
- **Rule:**
  - Success: Direct JSON entity or list with HTTP 200/201.
  - Error: `{"detail": "Descriptive human-readable error message"}` with appropriate HTTP status (400, 401, 403, 404, 422, 500).

### AD-6: [ADOPTED] Centralized CSS Variables Design Tokens
- **Binds:** Styling to Vanilla CSS custom properties matching [`DESIGN.md`](file:///d:/cake%20shop%20bmad/_bmad-output/planning-artifacts/DESIGN.md).
- **Prevents:** Style fragmentation, ad-hoc inline styles, or non-brand colors.
- **Rule:** All components consume `--maroon`, `--gold`, `--cream`, `--warm-white`, `--font-heading`, and `--font-body`.

---

## 4. Database Connection & Environment Config

```python
# backend/app/config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "MAHESH DESIGNER API"
    DATABASE_URL: str = "mysql+pymysql://root:admin123@localhost:3306/mahesh_designer_db"
    JWT_SECRET_KEY: str = "mahesh_designer_super_secret_jwt_key_2026"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    UPLOAD_DIR: str = "uploads"
    CORS_ORIGINS: list = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000"
    ]

    class Config:
        env_file = ".env"

settings = Settings()
```

---

## 5. Security & Invariant Verification Plan

1. **RBAC Endpoint Gate:** Automated test verifying that requests without an `admin` JWT claim to `/api/admin/orders` or `/api/admin/products` return `HTTP 403 Forbidden`.
2. **Password Security:** Automated test verifying passwords stored in `users` table are hashed with bcrypt.
3. **Cart Stock Integrity:** Automated test ensuring adding an out-of-stock item or quantity exceeding available inventory returns `HTTP 400 Bad Request`.
4. **CORS Isolation:** CORS configured exclusively for trusted local development and production storefront origins.
