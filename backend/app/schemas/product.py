from typing import Optional, List
from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, Field
from app.schemas.category import CategoryResponse

class ProductImageSchema(BaseModel):
    id: Optional[int] = None
    image_url: str
    is_primary: bool = False
    display_order: int = 0

    class Config:
        from_attributes = True

class ProductSizeSchema(BaseModel):
    id: Optional[int] = None
    size_label: str
    stock_count: int = 0

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    category_id: int
    name: str = Field(..., min_length=2, max_length=200)
    slug: Optional[str] = None
    description: str
    fabric_type: str
    fabric_color: str
    embroidery_type: str
    original_price: Decimal
    discount_price: Optional[Decimal] = None
    stock: int = 0
    is_customization_available: bool = False
    is_featured: bool = False
    status: str = "active"

class ProductCreate(ProductBase):
    images: Optional[List[str]] = []  # URLs of uploaded images
    sizes: Optional[List[dict]] = []   # e.g. [{"size_label": "34 (S)", "stock_count": 5}]

class ProductUpdate(BaseModel):
    category_id: Optional[int] = None
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    fabric_type: Optional[str] = None
    fabric_color: Optional[str] = None
    embroidery_type: Optional[str] = None
    original_price: Optional[Decimal] = None
    discount_price: Optional[Decimal] = None
    stock: Optional[int] = None
    is_customization_available: Optional[bool] = None
    is_featured: Optional[bool] = None
    status: Optional[str] = None
    images: Optional[List[str]] = None
    sizes: Optional[List[dict]] = None

class ProductResponse(ProductBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    category: Optional[CategoryResponse] = None
    images: List[ProductImageSchema] = []
    sizes: List[ProductSizeSchema] = []
    avg_rating: Optional[float] = 5.0
    review_count: Optional[int] = 0

    class Config:
        from_attributes = True
