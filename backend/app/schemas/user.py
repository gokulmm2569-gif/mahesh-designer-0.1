from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field

class UserRegister(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=150)
    username: str = Field(..., min_length=3, max_length=100)
    email: str = Field(..., pattern=r"^[\w\.-]+@[\w\.-]+\.\w+$")
    mobile: str = Field(..., min_length=10, max_length=20)
    password: str = Field(..., min_length=6)
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None

class UserLogin(BaseModel):
    username_or_email: str
    password: str

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    mobile: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    full_name: str
    username: str
    email: str
    mobile: str
    role: str
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    is_active: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
