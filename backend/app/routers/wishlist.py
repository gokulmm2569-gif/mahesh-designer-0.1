from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.user import User
from app.models.product import Product
from app.models.cart import WishlistItem
from app.schemas.cart import WishlistItemResponse
from app.utils.security import get_current_user

router = APIRouter(prefix="/api/wishlist", tags=["Wishlist"])

@router.get("", response_model=List[WishlistItemResponse])
def get_wishlist(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(WishlistItem).options(
        joinedload(WishlistItem.product).joinedload(Product.images),
        joinedload(WishlistItem.product).joinedload(Product.category)
    ).filter(WishlistItem.user_id == current_user.id).order_by(WishlistItem.created_at.desc()).all()

@router.post("/toggle/{product_id}")
def toggle_wishlist_item(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    existing = db.query(WishlistItem).filter(
        WishlistItem.user_id == current_user.id,
        WishlistItem.product_id == product_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return {"action": "removed", "product_id": product_id, "is_wishlisted": False}
    else:
        new_item = WishlistItem(user_id=current_user.id, product_id=product_id)
        db.add(new_item)
        db.commit()
        return {"action": "added", "product_id": product_id, "is_wishlisted": True}

@router.delete("/{product_id}")
def remove_wishlist_item(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    item = db.query(WishlistItem).filter(
        WishlistItem.user_id == current_user.id,
        WishlistItem.product_id == product_id
    ).first()
    if item:
        db.delete(item)
        db.commit()
    return {"detail": "Item removed from wishlist"}
