from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean, TIMESTAMP, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    fabric_type = Column(String(100), nullable=False)
    fabric_color = Column(String(100), nullable=False)
    embroidery_type = Column(String(100), nullable=False)
    original_price = Column(Numeric(10, 2), nullable=False)
    discount_price = Column(Numeric(10, 2), nullable=True)
    stock = Column(Integer, default=0, nullable=False)
    is_customization_available = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    status = Column(Enum("active", "inactive", "out_of_stock", name="product_statuses"), default="active", nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    category = relationship("Category", back_populates="products")
    images = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan", order_by="ProductImage.display_order")
    sizes = relationship("ProductSize", back_populates="product", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="product", cascade="all, delete-orphan")

class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(255), nullable=False)
    is_primary = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)

    product = relationship("Product", back_populates="images")

class ProductSize(Base):
    __tablename__ = "product_sizes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    size_label = Column(String(20), nullable=False)
    stock_count = Column(Integer, default=0)

    product = relationship("Product", back_populates="sizes")
