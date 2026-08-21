from typing import Optional, List
from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, Field

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    size_label: str
    unit_price: Decimal
    quantity: int
    subtotal: Decimal

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    shipping_name: str = Field(..., min_length=2)
    shipping_mobile: str = Field(..., min_length=10)
    shipping_address: str = Field(..., min_length=5)
    shipping_city: str
    shipping_state: str
    shipping_pincode: str
    payment_method: str = "cod"
    notes: Optional[str] = None

class OrderStatusUpdate(BaseModel):
    status: str
    payment_status: Optional[str] = None

class OrderResponse(BaseModel):
    id: int
    order_number: str
    user_id: int
    total_amount: Decimal
    discount_amount: Decimal
    final_amount: Decimal
    shipping_name: str
    shipping_mobile: str
    shipping_address: str
    shipping_city: str
    shipping_state: str
    shipping_pincode: str
    status: str
    payment_method: str
    payment_status: str
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True
