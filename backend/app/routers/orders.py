import random
from typing import List
from datetime import datetime
from decimal import Decimal
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models.user import User
from app.models.product import Product, ProductSize
from app.models.cart import CartItem
from app.models.order import Order, OrderItem
from app.schemas.order import OrderCreate, OrderResponse
from app.utils.security import get_current_user

router = APIRouter(prefix="/api/orders", tags=["Orders"])

def generate_order_number() -> str:
    timestamp_suffix = datetime.now().strftime("%y%m%d")
    random_code = random.randint(1000, 9999)
    return f"MD-{timestamp_suffix}-{random_code}"

@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def place_order(
    order_in: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Fetch customer's cart items
    cart_items = db.query(CartItem).options(
        joinedload(CartItem.product)
    ).filter(CartItem.user_id == current_user.id).all()

    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Your shopping cart is empty. Please add items before placing an order."
        )

    # Calculate total and validate products
    total_amount = Decimal("0.00")
    order_items_to_create = []

    for item in cart_items:
        product = item.product
        if not product or product.status != "active":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product '{product.name if product else item.product_id}' is no longer available"
            )

        unit_price = product.discount_price if product.discount_price else product.original_price
        subtotal = unit_price * item.quantity
        total_amount += subtotal

        # Decrement stock if finite size count exists
        if item.size_label and item.size_label != "Custom Fit":
            size_record = db.query(ProductSize).filter(
                ProductSize.product_id == item.product_id,
                ProductSize.size_label == item.size_label
            ).first()
            if size_record:
                size_record.stock_count = max(0, size_record.stock_count - item.quantity)
        
        # Decrement overall product stock
        product.stock = max(0, product.stock - item.quantity)

        order_items_to_create.append(OrderItem(
            product_id=product.id,
            product_name=product.name,
            size_label=item.size_label,
            unit_price=unit_price,
            quantity=item.quantity,
            subtotal=subtotal
        ))

    # Create Order
    new_order = Order(
        order_number=generate_order_number(),
        user_id=current_user.id,
        total_amount=total_amount,
        discount_amount=Decimal("0.00"),
        final_amount=total_amount,
        shipping_name=order_in.shipping_name,
        shipping_mobile=order_in.shipping_mobile,
        shipping_address=order_in.shipping_address,
        shipping_city=order_in.shipping_city,
        shipping_state=order_in.shipping_state,
        shipping_pincode=order_in.shipping_pincode,
        status="pending",
        payment_method=order_in.payment_method,
        payment_status="unpaid" if order_in.payment_method == "cod" else "paid",
        notes=order_in.notes
    )

    db.add(new_order)
    db.flush()  # assign new_order.id

    for oi in order_items_to_create:
        oi.order_id = new_order.id
        db.add(oi)

    # Clear user's cart
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()

    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("", response_model=List[OrderResponse])
def get_customer_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Order).options(
        joinedload(Order.items)
    ).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()

@router.get("/{order_id}", response_model=OrderResponse)
def get_order_details(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = db.query(Order).options(
        joinedload(Order.items)
    ).filter(
        Order.id == order_id,
        Order.user_id == current_user.id
    ).first()

    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order
