from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from decimal import Decimal
from app.database import get_db
from app.models.user import User
from app.models.product import Product, ProductImage, ProductSize
from app.models.category import Category
from app.models.order import Order
from app.models.review import Review
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from app.schemas.order import OrderStatusUpdate, OrderResponse
from app.schemas.user import UserResponse
from app.schemas.review import ReviewResponse
from app.utils.security import get_current_admin_user
from app.utils.file_storage import save_uploaded_image

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# ─── Dashboard KPIs ──────────────────────────────────────────────────────────

@router.get("/dashboard")
def admin_dashboard(admin: User = Depends(get_current_admin_user), db: Session = Depends(get_db)):
    total_orders = db.query(func.count(Order.id)).scalar() or 0
    total_revenue = db.query(func.sum(Order.final_amount)).filter(
        Order.status.notin_(["cancelled"])
    ).scalar() or Decimal("0")
    total_products = db.query(func.count(Product.id)).filter(Product.status == "active").scalar() or 0
    total_customers = db.query(func.count(User.id)).filter(User.role == "customer").scalar() or 0
    pending_orders = db.query(func.count(Order.id)).filter(Order.status == "pending").scalar() or 0

    return {
        "total_orders": total_orders,
        "total_revenue": float(total_revenue),
        "total_products": total_products,
        "total_customers": total_customers,
        "pending_orders": pending_orders,
    }

# ─── Product CRUD ─────────────────────────────────────────────────────────────

@router.get("/products", response_model=List[ProductResponse])
def admin_list_products(admin: User = Depends(get_current_admin_user), db: Session = Depends(get_db)):
    return db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.images),
        joinedload(Product.sizes)
    ).order_by(Product.created_at.desc()).all()

@router.post("/products", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def admin_create_product(
    name: str = Form(...),
    slug: str = Form(...),
    category_id: int = Form(...),
    description: str = Form(""),
    care_instructions: Optional[str] = Form(None),
    original_price: Decimal = Form(...),
    discount_price: Optional[Decimal] = Form(None),
    fabric_type: Optional[str] = Form(None),
    embroidery_type: Optional[str] = Form(None),
    fabric_color: Optional[str] = Form(None),
    is_featured: bool = Form(False),
    is_customizable: bool = Form(True),
    stock: int = Form(10),
    images: Optional[List[UploadFile]] = File(None),
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    existing = db.query(Product).filter(Product.slug == slug).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Slug '{slug}' is already in use")

    product = Product(
        name=name, slug=slug, category_id=category_id,
        description=description, care_instructions=care_instructions,
        original_price=original_price, discount_price=discount_price,
        fabric_type=fabric_type, embroidery_type=embroidery_type,
        fabric_color=fabric_color, is_featured=is_featured,
        is_customizable=is_customizable, stock=stock, status="active"
    )
    db.add(product)
    db.flush()

    if images:
        for i, img in enumerate(images):
            if img.filename:
                url = save_uploaded_image(img)
                db.add(ProductImage(product_id=product.id, image_url=url, is_primary=(i == 0), sort_order=i))

    db.commit()
    db.refresh(product)
    return product

@router.put("/products/{product_id}", response_model=ProductResponse)
def admin_update_product(
    product_id: int,
    product_in: ProductUpdate,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    for field, value in product_in.model_dump(exclude_unset=True).items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{product_id}")
def admin_delete_product(
    product_id: int,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.status = "archived"
    db.commit()
    return {"detail": f"Product '{product.name}' archived successfully"}

# ─── Category CRUD ────────────────────────────────────────────────────────────

@router.get("/categories", response_model=List[CategoryResponse])
def admin_list_categories(admin: User = Depends(get_current_admin_user), db: Session = Depends(get_db)):
    return db.query(Category).order_by(Category.name.asc()).all()

@router.post("/categories", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def admin_create_category(
    cat_in: CategoryCreate,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    cat = Category(**cat_in.model_dump())
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat

@router.put("/categories/{cat_id}", response_model=CategoryResponse)
def admin_update_category(
    cat_id: int,
    cat_in: CategoryUpdate,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    cat = db.query(Category).filter(Category.id == cat_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    for field, value in cat_in.model_dump(exclude_unset=True).items():
        setattr(cat, field, value)
    db.commit()
    db.refresh(cat)
    return cat

@router.delete("/categories/{cat_id}")
def admin_delete_category(
    cat_id: int,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    cat = db.query(Category).filter(Category.id == cat_id).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    cat.is_active = False
    db.commit()
    return {"detail": "Category deactivated"}

# ─── Order Fulfillment ────────────────────────────────────────────────────────

@router.get("/orders", response_model=List[OrderResponse])
def admin_list_orders(
    status_filter: Optional[str] = None,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    q = db.query(Order).options(joinedload(Order.items))
    if status_filter:
        q = q.filter(Order.status == status_filter)
    return q.order_by(Order.created_at.desc()).all()

@router.put("/orders/{order_id}/status", response_model=OrderResponse)
def admin_update_order_status(
    order_id: int,
    status_in: OrderStatusUpdate,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).options(joinedload(Order.items)).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    valid_statuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]
    if status_in.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")

    order.status = status_in.status
    if status_in.payment_status:
        order.payment_status = status_in.payment_status
    db.commit()
    db.refresh(order)
    return order

# ─── Customer Directory ───────────────────────────────────────────────────────

@router.get("/customers", response_model=List[UserResponse])
def admin_list_customers(admin: User = Depends(get_current_admin_user), db: Session = Depends(get_db)):
    return db.query(User).filter(User.role == "customer").order_by(User.created_at.desc()).all()

# ─── Review Moderation ────────────────────────────────────────────────────────

@router.get("/reviews", response_model=List[ReviewResponse])
def admin_list_reviews(admin: User = Depends(get_current_admin_user), db: Session = Depends(get_db)):
    reviews = db.query(Review).order_by(Review.created_at.desc()).all()
    result = []
    for r in reviews:
        user = db.query(User).filter(User.id == r.user_id).first()
        result.append(ReviewResponse(
            id=r.id, product_id=r.product_id, user_id=r.user_id,
            user_name=user.full_name if user else "Unknown",
            rating=r.rating, review_text=r.review_text,
            is_approved=r.is_approved, created_at=r.created_at
        ))
    return result

@router.put("/reviews/{review_id}/approve")
def admin_approve_review(
    review_id: int,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.is_approved = True
    db.commit()
    return {"detail": "Review approved"}

@router.delete("/reviews/{review_id}")
def admin_delete_review(
    review_id: int,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    review = db.query(Review).filter(Review.id == review_id).first()
    if review:
        db.delete(review)
        db.commit()
    return {"detail": "Review deleted"}

# ─── Image Upload Endpoint ────────────────────────────────────────────────────

@router.post("/products/{product_id}/images")
def admin_upload_product_image(
    product_id: int,
    is_primary: bool = Form(False),
    image: UploadFile = File(...),
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    url = save_uploaded_image(image)
    img = ProductImage(product_id=product_id, image_url=url, is_primary=is_primary, sort_order=0)
    db.add(img)
    db.commit()
    return {"image_url": url, "product_id": product_id}
