import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database import engine, Base
import app.models  # Import all SQLAlchemy models to register them in Base.metadata
from app.routers import auth, categories, products, wishlist, cart, orders, reviews, admin

# ─── Create DB Tables ─────────────────────────────────────────────────────────
Base.metadata.create_all(bind=engine)


# ─── Create Upload Directory ──────────────────────────────────────────────────
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

# ─── FastAPI Application ──────────────────────────────────────────────────────
app = FastAPI(
    title="Mahesh Designer API",
    description="Premium Bridal Boutique REST API — Crafted for Your Most Beautiful Moments",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# ─── CORS Middleware ──────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Static File Serving ──────────────────────────────────────────────────────
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# ─── Register Routers ─────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(wishlist.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(reviews.router)
app.include_router(admin.router)

# ─── Health Check ─────────────────────────────────────────────────────────────
@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "service": "Mahesh Designer API",
        "version": "1.0.0"
    }
