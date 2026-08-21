from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.user import User
from app.models.product import Product, ProductSize
from app.models.cart import CartItem
from app.schemas.cart import CartItemAdd, CartItemUpdate, CartItemResponse
from app.utils.security import get_current_user

router = APIRouter(prefix="/api/cart", tags=["Cart"])

@router.get("", response_model=List[CartItemResponse])
def get_cart(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(CartItem).options(
        joinedload(CartItem.product).joinedload(Product.images),
        joinedload(CartItem.product).joinedload(Product.category)
    ).filter(CartItem.user_id == current_user.id).order_by(CartItem.created_at.desc()).all()

@router.post("/add", response_model=CartItemResponse, status_code=status.HTTP_201_CREATED)
def add_to_cart(
    item_in: CartItemAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == item_in.product_id).first()
    if not product or product.status != "active":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product is currently unavailable"
        )

    # Check available size stock if size specified
    if item_in.size_label and item_in.size_label != "Custom Fit":
        size_record = db.query(ProductSize).filter(
            ProductSize.product_id == item_in.product_id,
            ProductSize.size_label == item_in.size_label
        ).first()
        if size_record and size_record.stock_count < item_in.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Requested quantity ({item_in.quantity}) exceeds available stock ({size_record.stock_count}) for size {item_in.size_label}"
            )

    # Check if item already in cart
    existing_item = db.query(CartItem).filter(
        CartItem.user_id == current_user.id,
        CartItem.product_id == item_in.product_id,
        CartItem.size_label == item_in.size_label
    ).first()

    if existing_item:
        existing_item.quantity += item_in.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item

    new_cart_item = CartItem(
        user_id=current_user.id,
        product_id=item_in.product_id,
        size_label=item_in.size_label,
        quantity=item_in.quantity
    )
    db.add(new_cart_item)
    db.commit()
    db.refresh(new_cart_item)
    return new_cart_item

@router.put("/{item_id}", response_model=CartItemResponse)
def update_cart_item(
    item_id: int,
    item_in: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.user_id == current_user.id
    ).first()

    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")

    cart_item.quantity = item_in.quantity
    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.delete("/{item_id}")
def remove_cart_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.user_id == current_user.id
    ).first()

    if cart_item:
        db.delete(cart_item)
        db.commit()
    return {"detail": "Item removed from cart"}

@router.delete("/clear/all")
def clear_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    return {"detail": "Shopping cart cleared"}
