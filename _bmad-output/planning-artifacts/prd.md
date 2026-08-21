---
title: MAHESH DESIGNER - Premium Luxury Indian Fashion Boutique E-Commerce Platform
status: draft
created: 2026-08-19
updated: 2026-08-19
author: John (Product Manager)
source_input: _bmad/scripts/course.md
---

# PRD: MAHESH DESIGNER

## 0. Document Purpose
This Product Requirements Document (PRD) defines the functional, aesthetic, operational, and user experience requirements for **MAHESH DESIGNER**, an end-to-end premium luxury Indian fashion boutique e-commerce platform. It synthesizes all specifications established in `_bmad/scripts/course.md` into a structured, execution-ready contract for downstream design (`bmad-ux`), architecture (`bmad-architecture`), and engineering workflows (`bmad-build`). Technical stack selections (React, Python REST API, MySQL) and database/API schemas are cataloged in `addendum.md`.

---

## 1. Vision

**MAHESH DESIGNER** is a digital boutique experience designed to capture the prestige, opulence, and intimate craftsmanship of high-end Indian bridal couture and handcrafted Aari embroidery. 

Bridging the tactile artistry of traditional master artisans with the fluid elegance of modern high-fashion editorial platforms, MAHESH DESIGNER delivers a shopping experience that feels like walking into a flagship bridal salon. Through rich visual storytelling, bespoke customization discovery, multi-faceted luxury filtering, and a robust order fulfillment lifecycle, the platform elevates Indian ethnic fashion beyond ordinary transactional retail into an immersive, portfolio-grade luxury brand.

**Tagline:** *"Crafted for Your Most Beautiful Moments"*

---

## 2. Target User & Journeys

### 2.1 Jobs To Be Done (JTBD)
- **Bridal & Festive Shopper:** *"When I am preparing for my wedding or a milestone celebration, I want to explore meticulously handcrafted bridal blouses and lehengas with authentic Aari work, so that I can wear an extraordinary, bespoke outfit tailored to my exact aesthetic."*
- **Discerning Ethnic Wear Buyer:** *"When shopping for luxury Indian attire online, I want an editorial-grade browsing experience with rich fabric/embroidery details and verified reviews, so that I can invest with total confidence in authenticity and fit."*
- **Boutique Owner / Administrator:** *"When managing our boutique's digital operations, I want seamless control over our catalog, inventory, customer accounts, and order fulfillment states, so that our boutique runs efficiently with strict role security."*

### 2.2 Non-Users (v1)
- Mass-market fast-fashion discount hunters seeking generic western apparel.
- Unregistered guest checkout purchasers (v1 requires authenticated customer identity to protect custom order workflows and history).
- Multi-vendor marketplace sellers (MAHESH DESIGNER is an exclusive, single-brand boutique).

### 2.3 Key User Journeys

#### **UJ-1: Ananya discovers and orders a bespoke bridal blouse**
- **Persona + Context:** Ananya, a 28-year-old bride-to-be shopping for her reception blouse from Mumbai.
- **Entry State:** Unauthenticated on mobile web, arrives at the Homepage hero section.
- **Path:** 
  1. Ananya is captivated by the editorial hero section and taps "Explore Collection".
  2. She navigates to the Product Listing Page and filters by **Category: Bridal Blouses** and **Embroidery: Aari Work**.
  3. She selects a Maroon Silk Aari Blouse, inspects macro zoom embroidery images, checks fabric composition, and verifies available sizes.
  4. She creates an account via the registration flow and adds the blouse to her Cart.
  5. She navigates through the multi-section checkout, inputs delivery details, and places the order.
- **Climax:** The screen confirms her order with a bespoke luxury confirmation receipt, Order ID, and estimated timeline.
- **Resolution:** Ananya tracks her order status ("Confirmed" → "Processing") in her Customer Order History.
- **Edge Case:** If the selected size goes out of stock while in cart, the checkout warns her immediately with an elegant "Out of Stock" state and offers custom request / wishlist alternatives.

#### **UJ-2: Rajesh (Boutique Admin) updates seasonal collection & processes bridal orders**
- **Persona + Context:** Rajesh, Boutique Operations Manager at Mahesh Designer.
- **Entry State:** Authenticated via the dedicated Admin Login portal on desktop.
- **Path:**
  1. Accesses the Admin Dashboard, reviewing real-time KPI cards (Total Revenue, Pending Orders, Low Stock warnings).
  2. Navigates to **Products → Add Product**, uploads high-res editorial photography, inputs fabric details (Raw Silk, Antique Gold Zari), sets price & discount, marks as "Featured".
  3. Navigates to **Orders**, inspects Ananya's pending bridal blouse order, reviews custom specifications, and transitions status from `Pending` to `Processing` and then `Shipped`.
- **Climax:** Catalog updates instantly on the live storefront; customer receives real-time order status updates.
- **Resolution:** Admin logs out securely; database state and audit logs remain synchronized.

---

## 3. Glossary

- **Aari Work:** Traditional Indian chain-stitch embroidery executed with an awl-like needle, beads, zari, and sequins.
- **Bridal Blouse:** Handcrafted, bespoke upper garment tailored for wedding ceremonies featuring heavy embroidery.
- **Customized Outfit:** Garment configured with specific custom sizing, embellishment, or fabric modifications upon client request.
- **Customer Role:** Authenticated shopper authorized to browse, wishlist, cart, purchase, review, and view personal account history.
- **Admin Role:** Authorized boutique operator with administrative rights to manage products, categories, stock, orders, customers, and reviews.
- **Order Lifecycle Status:** Deterministic state machine progression: `Pending` → `Confirmed` → `Processing` → `Shipped` → `Delivered` (or `Cancelled`).
- **Product Status:** Operational visibility state: `Active` (visible and purchasable), `Inactive` (hidden from storefront), or `Out of Stock` (visible with disabled cart action).

---

## 4. Features & Functional Requirements

### 4.1 Brand Identity & Design System (Editorial Experience)
**Description:** A distinctive luxury aesthetic anchored in Indian heritage, editorial layouts, refined typography, and a curated palette. Realizes UJ-1.

#### FR-1: Brand Presentation & Uniformity
The system must render the official brand name `"MAHESH DESIGNER"` and tagline `"Crafted for Your Most Beautiful Moments"` consistently across all consumer and admin touchpoints.
- **Consequences:** Brand name appears in navbar, browser title, hero section, footer, order confirmations, and admin header without variation.

#### FR-2: Design Tokens & Palette Conformance
The UI must strictly implement the brand color hierarchy: Neutral bases (70%: Warm White `#FFFDF9`, Cream `#F8F1E7`, Soft Beige `#EDE3D5`), Primary Accents (20%: Maroon `#6B1E2D`, Deep Red `#8B1E2D`, Burgundy `#3A0D18`), and Refined Micro-Accents (10%: Gold `#C9A227`, Emerald Green `#176B55`, Blush Pink `#F4E3E1`).
- **Consequences:** No neon colors, generic frameworks styles, or unstyled default controls appear anywhere.

#### FR-3: Editorial Typography Hierarchy
The application must render serif typefaces (Playfair Display / Cormorant Garamond) for primary headings and clean sans-serif typefaces (Inter / Manrope) for functional UI elements, forms, and data tables.

---

### 4.2 Customer Authentication & Profile Management
**Description:** Dedicated, secure customer account onboarding and lifecycle management. Realizes UJ-1.

#### FR-4: Customer Registration
The system must allow new customers to register by providing Full Name, Email, Username, Mobile Number, and a secure Password.
- **Consequences:** Backend enforces unique email and username, validates phone/email formats, hashes passwords securely, and creates an active customer account.

#### FR-5: Customer Authentication & Session Management
The system must authenticate customers via Username/Email and Password, issuing secure session tokens with protected route persistence.
- **Consequences:** Successful login redirects customers to their intended destination; invalid credentials return clear, non-leaking error messages.

#### FR-6: Customer Profile & Address Management
Customers can view and update their profile details (Full Name, Phone, Saved Delivery Address) and view their account summary.

---

### 4.3 Editorial Storefront & Discovery
**Description:** Homepage and storytelling sections designed to engage luxury shoppers. Realizes UJ-1.

#### FR-7: Global Luxury Navbar & Mobile Drawer
The system must display an editorial navbar containing Logo, Primary Links (Home, Collections, Categories, About), and Utility Icons (Search, Wishlist with badge, Cart with badge, Account). On mobile, a collapsible drawer handles navigation seamlessly.

#### FR-8: Full-Width Editorial Hero Section
The system must render a hero section featuring high-resolution bridal photography, brand headline, supporting narrative, and primary CTAs ("Explore Collection", "Customize Your Outfit").

#### FR-9: Curated Editorial Homepage Sections
The homepage must render structured storytelling blocks in sequence:
1. Editorial Hero Section
2. Featured Collections Grid (Bridal Blouses, Lehengas, Gowns, Aari Work, Kurtis, Custom Outfits)
3. Featured Products Dynamic Reel
4. Aari Craftsmanship Storytelling (Split-screen image & narrative)
5. Bridal Couture Showcase
6. Customization & Fabric Showcase
7. Verified Customer Reviews Carousel
8. Instagram / Fashion Showcase Gallery
9. Luxury Footer with navigation, category links, customer care, and copyright

---

### 4.4 Catalog, Filtering & Product Detail Experience
**Description:** Database-driven luxury product catalog with rich fashion taxonomy and multi-faceted filtering. Realizes UJ-1.

#### FR-10: Multi-Faceted Product Filtering & Search
Customers can filter products by Category, Price Range, Color, Fabric Type, Available Size, Availability, and Embroidery Type, as well as sort by Newest, Price (Low/High), and Popularity.
- **Consequences:** Search and filter queries execute dynamically without page reloads; empty search results render an elegant fallback state with alternative suggestions.

#### FR-11: Luxury Product Card Presentation
Product cards must display primary imagery, hover zoom preview, product name, category, rating, original/discounted price, stock tag, quick wishlist toggle, and quick add-to-cart.

#### FR-12: Rich Product Details Page (PDP)
The PDP must render a multi-image gallery with thumbnail switcher, comprehensive product specifications (Fabric Type, Color, Embroidery Type, Available Sizes, Customization flag), pricing/discount calculation, stock availability, size guide modal, related products, and verified customer reviews.

---

### 4.5 Wishlist & Shopping Cart
**Description:** Seamless shopping intent management with real-time stock validation. Realizes UJ-1.

#### FR-13: Customer Wishlist
Authenticated customers can add/remove items to/from their personal wishlist, move items directly to cart, and view a dedicated Wishlist page with an elegant empty state.
- **Consequences:** Wishlist state is persisted per customer account across devices.

#### FR-14: Shopping Cart & Price Calculation
Customers can add products with chosen size and quantity, modify quantities, remove items, and see real-time recalculations of subtotal, discounts, taxes, and final total.
- **Consequences:** Quantity selection cannot exceed available stock.

---

### 4.6 Checkout, Payment & Order Tracking
**Description:** Streamlined multi-step checkout and transparent post-purchase tracking. Realizes UJ-1.

#### FR-15: Multi-Section Checkout Flow
The system must guide authenticated customers through Contact Info verification, Shipping/Delivery Address entry, Order Summary review, and Order Placement.
- **Consequences:** Validates required delivery fields (Address, City, State, Pincode) and reserves stock upon successful placement.

#### FR-16: Order Confirmation & Receipt
Upon order completion, the system renders a dedicated luxury confirmation view displaying unique Order ID, date, itemized receipt, delivery address, and estimated fulfillment timeline.

#### FR-17: Customer Order History & Lifecycle Tracking
Customers can view their past orders, inspect individual order details, and track fulfillment status (`Pending`, `Confirmed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).

---

### 4.7 Customer Product Reviews
**Description:** Verified customer feedback and rating system. Realizes UJ-1.

#### FR-18: Review Submission & Verification
Authenticated customers who have purchased a product can submit a star rating (1-5) and written review.
- **Consequences:** Reviews are attributed to the verified purchaser and queued for admin visibility/moderation.

---

### 4.8 Secure Admin Portal & Business Analytics
**Description:** Protected back-office operations for boutique administrators. Realizes UJ-2.

#### FR-19: Dedicated Admin Authentication & RBAC
The system must provide an isolated Admin Login gateway. Non-admin accounts attempting to access admin routes or APIs are rejected with HTTP 403 Forbidden.
- **Consequences:** Strict backend middleware verifies `role == 'admin'` on every administrative request.

#### FR-20: Admin Operations Dashboard
The admin dashboard must display key operational metrics: Total Products, Total Categories, Total Registered Users, Total Orders, Stock Levels, Pending Orders, and Recent Transactions.

---

### 4.9 Admin Catalog & Inventory Management
**Description:** Full administrative lifecycle management of boutique products and categories. Realizes UJ-2.

#### FR-21: Product Creation & Image Upload
Admins can create new products with full metadata: Name, Category, Description, Fabric Type, Color, Embroidery Type, Available Sizes, Pricing, Discount, Stock Count, Customization availability, Status (`Active`/`Inactive`/`Out of Stock`), and Featured flag, uploading a primary image and multiple gallery images with client-side preview.
- **Consequences:** Supported image formats (JPG, PNG, WEBP) are validated for MIME type and file size before secure storage.

#### FR-22: Product Modification & Deletion
Admins can edit all product attributes, update inventory levels, toggle visibility, and delete products with confirmation safeguards.

#### FR-23: Category Management
Admins can create, edit, activate/deactivate, and delete product categories.

---

### 4.10 Admin Customer & Order Fulfillment Management
**Description:** Back-office order processing and user account oversight. Realizes UJ-2.

#### FR-24: Admin Order Processing & Status Updates
Admins can inspect all boutique orders, view customer contact and shipping details, and update the order lifecycle status (`Pending` → `Confirmed` → `Processing` → `Shipped` → `Delivered` / `Cancelled`).

#### FR-25: Admin Customer Directory & Status Control
Admins can view registered customer accounts and activate or deactivate access. Sensitive credentials (passwords, tokens) are never exposed.

#### FR-26: Admin Review Moderation
Admins can review customer ratings and delete spam or inappropriate reviews.

---

## 5. Non-Goals (Explicit)

- **Third-Party Multi-Vendor Marketplace:** The platform is exclusively built for Mahesh Designer; third-party vendor onboarding is out of scope.
- **Real-Time Payment Gateway Webhooks (v1):** v1 implements secure checkout order placement with structured payment method simulation (Cash on Delivery / Direct Bank Transfer / UPI confirmation). Live payment gateway gateway APIs (e.g. Razorpay/Stripe webhook reconciliation) are architected for v2.
- **AI Virtual Try-On via WebCam (v1):** Augmented reality try-on is reserved for future releases; v1 relies on high-resolution multi-angle editorial photography and macro zoom.
- **Automated Courier API Integration (v1):** Shipping status updates are managed manually by Admin in v1; third-party logistics APIs (Shiprocket, Delhivery) are deferred to v2.

---

## 6. MVP Scope

### 6.1 In Scope (v1)
- Complete luxury responsive frontend (Desktop, Tablet, Mobile) with full editorial design system.
- Customer authentication (Register, Login, Logout, Profile).
- Database-backed dynamic product catalog with search, multi-filter, sorting, and rich PDPs.
- Customer Wishlist and Cart with real-time calculations.
- Multi-section checkout with address capture and Order Confirmation.
- Customer Order History and tracking.
- Verified customer reviews and ratings.
- Admin authentication with strict Role-Based Access Control (RBAC).
- Admin Dashboard with live business metrics.
- Full Admin Product CRUD with multi-image upload and inventory controls.
- Full Admin Category CRUD.
- Admin Order Management with status progression.
- Admin Customer oversight and Review moderation.
- Comprehensive security (password hashing, input validation, protected API endpoints).

### 6.2 Out of Scope for MVP (Deferred to v2)
- Direct payment gateway webhook settlement (Razorpay/Stripe live auto-capture).
- Live chat / WhatsApp automated bot integration.
- Automated SMS/WhatsApp shipping notifications via Twilio/Gupshup.
- Automated carrier dispatch integration.

---

## 7. Success Metrics & Quality Invariants

### 7.1 Primary Metrics
- **SM-1 (Catalog Discovery Rate):** > 65% of customer sessions navigate from Homepage to at least one Product Details Page. Validates FR-7, FR-8, FR-9, FR-10, FR-11.
- **SM-2 (Cart-to-Order Conversion):** > 25% of authenticated carts complete checkout order placement. Validates FR-14, FR-15, FR-16.
- **SM-3 (Order Fulfillment Cycle Time):** Admin status updates from `Pending` to `Processing` occur within 24 hours of order receipt. Validates FR-20, FR-24.

### 7.2 Secondary Metrics
- **SM-4 (Catalog Sync Integrity):** Admin product and stock updates reflect on customer storefront within < 1 second. Validates FR-21, FR-22.

### 7.3 Counter-Metrics (Do Not Optimize)
- **SM-C1 (Visual Simplicity vs. Editorial Luxury):** Do not sacrifice high-resolution imagery, editorial spacing, and storytelling components solely to optimize minimal page byte-weight. Visual prestige is paramount.

---

## 8. Cross-Cutting Non-Functional Requirements (NFRs)

### 8.1 Security & Access Control
- **NFR-1 (RBAC Enforcement):** All `/api/admin/*` routes must validate JWT / session claims for `role === 'admin'`. Unauthorized requests must return HTTP 403 without data leakage.
- **NFR-2 (Credential Protection):** All customer and admin passwords must be hashed using bcrypt or Argon2. Passwords or hashes must never be returned in API payloads.
- **NFR-3 (Input Sanitization):** All incoming request payloads must be strictly validated against injection (SQL injection, XSS) and schema constraints.

### 8.2 Performance & Responsiveness
- **NFR-4 (Responsive Adaptability):** Storefront and admin interfaces must adapt seamlessly to viewport widths from 320px (mobile) to 1920px+ (desktop).
- **NFR-5 (Page Load & Interaction Latency):** Core catalog pages must achieve First Contentful Paint (FCP) < 1.5s on standard broadband and interactive API queries < 200ms.

---

## 9. Assumptions Index

- `[ASSUMPTION-1]`: v1 checkout uses authentic order capture with offline/on-delivery/UPI reference settlement before live card payment gateway integration.
- `[ASSUMPTION-2]`: Initial product photography is hosted locally in static assets or uploaded via the Admin portal and served via the backend static file handler.
- `[ASSUMPTION-3]`: Single boutique currency is INR (₹) with Indian regional formatting and standard Indian postal addresses (Pincode, State, City).
