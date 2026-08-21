from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, UserProfileUpdate, UserResponse, TokenResponse
from app.utils.security import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    # Check if username or email exists
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists"
        )
    if db.query(User).filter(User.username == user_data.username).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This username is already taken"
        )

    # Hash password & create user
    new_user = User(
        full_name=user_data.full_name,
        username=user_data.username,
        email=user_data.email,
        mobile=user_data.mobile,
        password_hash=get_password_hash(user_data.password),
        role="customer",
        address=user_data.address,
        city=user_data.city,
        state=user_data.state,
        pincode=user_data.pincode,
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Issue token
    token = create_access_token(data={"sub": str(new_user.id), "role": new_user.role, "name": new_user.full_name})
    return {"access_token": token, "token_type": "bearer", "user": new_user}

@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        (User.username == credentials.username_or_email) | (User.email == credentials.username_or_email)
    ).first()

    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account has been deactivated. Please contact boutique support."
        )

    token = create_access_token(data={"sub": str(user.id), "role": user.role, "name": user.full_name})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.get("/profile", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile", response_model=UserResponse)
def update_profile(
    profile_data: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if profile_data.full_name is not None:
        current_user.full_name = profile_data.full_name
    if profile_data.mobile is not None:
        current_user.mobile = profile_data.mobile
    if profile_data.address is not None:
        current_user.address = profile_data.address
    if profile_data.city is not None:
        current_user.city = profile_data.city
    if profile_data.state is not None:
        current_user.state = profile_data.state
    if profile_data.pincode is not None:
        current_user.pincode = profile_data.pincode

    db.commit()
    db.refresh(current_user)
    return current_user
