from typing import List, Optional
from decimal import Decimal
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from app.database import get_db
from app.models.product import Product, ProductSize
from app.models.category import Category
from app.models.review import Review
from app.schemas.product import ProductResponse

router = APIRouter(prefix="/api/products", tags=["Products"])

def attach_review_stats(product: Product, db: Session):
    avg_r = db.query(func.avg(Review.rating)).filter(Review.product_id == product.id, Review.is_approved == True).scalar()
    cnt = db.query(func.count(Review.id)).filter(Review.product_id == product.id, Review.is_approved == True).scalar()
    product.avg_rating = round(float(avg_r or 5.0), 1)
    product.review_count = int(cnt or 0)
    return product

@router.get("", response_model=List[ProductResponse])
def get_products(
    category_id: Optional[int] = None,
    category_slug: Optional[str] = None,
    fabric_type: Optional[str] = None,
    embroidery_type: Optional[str] = None,
    fabric_color: Optional[str] = None,
    size: Optional[str] = None,
    min_price: Optional[Decimal] = None,
    max_price: Optional[Decimal] = None,
    search: Optional[str] = None,
    is_featured: Optional[bool] = None,
    sort_by: str = Query("newest", enum=["newest", "price_asc", "price_desc", "popular", "name_asc"]),
    db: Session = Depends(get_db)
):
    query = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.images),
        joinedload(Product.sizes)
    ).filter(Product.status == "active")

    if category_id:
        query = query.filter(Product.category_id == category_id)
    if category_slug:
        cat = db.query(Category).filter(Category.slug == category_slug).first()
        if cat:
            query = query.filter(Product.category_id == cat.id)

    if fabric_type:
        query = query.filter(Product.fabric_type.ilike(f"%{fabric_type}%"))
    if embroidery_type:
        query = query.filter(Product.embroidery_type.ilike(f"%{embroidery_type}%"))
    if fabric_color:
        query = query.filter(Product.fabric_color.ilike(f"%{fabric_color}%"))

    if size:
        query = query.join(Product.sizes).filter(ProductSize.size_label == size, ProductSize.stock_count > 0)

    if min_price is not None:
        query = query.filter(func.coalesce(Product.discount_price, Product.original_price) >= min_price)
    if max_price is not None:
        query = query.filter(func.coalesce(Product.discount_price, Product.original_price) <= max_price)

    if is_featured is not None:
        query = query.filter(Product.is_featured == is_featured)

    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            (Product.name.ilike(search_fmt)) |
            (Product.description.ilike(search_fmt)) |
            (Product.fabric_type.ilike(search_fmt)) |
            (Product.embroidery_type.ilike(search_fmt))
        )

    # Sort
    if sort_by == "price_asc":
        query = query.order_by(func.coalesce(Product.discount_price, Product.original_price).asc())
    elif sort_by == "price_desc":
        query = query.order_by(func.coalesce(Product.discount_price, Product.original_price).desc())
    elif sort_by == "name_asc":
        query = query.order_by(Product.name.asc())
    else:  # newest
        query = query.order_by(Product.created_at.desc())

    products = query.all()
    for p in products:
        attach_review_stats(p, db)
    return products

@router.get("/featured", response_model=List[ProductResponse])
def get_featured_products(db: Session = Depends(get_db)):
    products = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.images),
        joinedload(Product.sizes)
    ).filter(Product.status == "active", Product.is_featured == True).limit(8).all()

    for p in products:
        attach_review_stats(p, db)
    return products

@router.get("/{id_or_slug}", response_model=ProductResponse)
def get_product_detail(id_or_slug: str, db: Session = Depends(get_db)):
    query = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.images),
        joinedload(Product.sizes)
    )

    if id_or_slug.isdigit():
        product = query.filter(Product.id == int(id_or_slug)).first()
    else:
        product = query.filter(Product.slug == id_or_slug).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{id_or_slug}' not found in boutique catalog"
        )

    attach_review_stats(product, db)
    return product
