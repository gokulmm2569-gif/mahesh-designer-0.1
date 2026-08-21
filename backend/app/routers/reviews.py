from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.product import Product
from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewResponse
from app.utils.security import get_current_user

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

@router.get("/{product_id}", response_model=List[ReviewResponse])
def get_product_reviews(product_id: int, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(
        Review.product_id == product_id,
        Review.is_approved == True
    ).order_by(Review.created_at.desc()).all()

    result = []
    for r in reviews:
        user = db.query(User).filter(User.id == r.user_id).first()
        rv = ReviewResponse(
            id=r.id,
            product_id=r.product_id,
            user_id=r.user_id,
            user_name=user.full_name if user else "Verified Customer",
            rating=r.rating,
            review_text=r.review_text,
            is_approved=r.is_approved,
            created_at=r.created_at
        )
        result.append(rv)
    return result

@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def submit_review(
    review_in: ReviewCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == review_in.product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    # Prevent duplicate reviews
    existing = db.query(Review).filter(
        Review.product_id == review_in.product_id,
        Review.user_id == current_user.id
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already submitted a review for this product"
        )

    new_review = Review(
        product_id=review_in.product_id,
        user_id=current_user.id,
        rating=review_in.rating,
        review_text=review_in.review_text,
        is_approved=True  # auto-approve; admin can moderate later
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return ReviewResponse(
        id=new_review.id,
        product_id=new_review.product_id,
        user_id=new_review.user_id,
        user_name=current_user.full_name,
        rating=new_review.rating,
        review_text=new_review.review_text,
        is_approved=new_review.is_approved,
        created_at=new_review.created_at
    )
