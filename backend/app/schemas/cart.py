from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.product import ProductResponse

class CartItemAdd(BaseModel):
    product_id: int
    size_label: str
    quantity: int = Field(1, ge=1)

class CartItemUpdate(BaseModel):
    quantity: int = Field(..., ge=1)

class CartItemResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    size_label: str
    quantity: int
    created_at: Optional[datetime] = None
    product: Optional[ProductResponse] = None

    class Config:
        from_attributes = True

class WishlistItemResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    created_at: Optional[datetime] = None
    product: Optional[ProductResponse] = None

    class Config:
        from_attributes = True
