from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class ReviewCreate(BaseModel):
    product_id: int
    rating: int = Field(..., ge=1, le=5)
    review_text: str = Field(..., min_length=3)

class ReviewResponse(BaseModel):
    id: int
    product_id: int
    user_id: int
    user_name: Optional[str] = "Verified Customer"
    rating: int
    review_text: str
    is_approved: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
