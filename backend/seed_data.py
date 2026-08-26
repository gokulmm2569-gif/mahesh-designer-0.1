"""
Mahesh Designer — Database Seeder Script
Run: python seed_data.py
Seeds: admin user, categories, and initial bridal products
"""
import sys
import os
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.category import Category
from app.models.product import Product, ProductImage, ProductSize
from app.models.cart import CartItem, WishlistItem
from app.models.order import Order, OrderItem
from app.models.review import Review
from app.utils.security import get_password_hash

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # ── Admin User ────────────────────────────────────────────────────────
        if not db.query(User).filter(User.email == "admin@maheshdesigner.com").first():
            admin = User(
                full_name="Mahesh Designer Admin",
                username="admin",
                email="admin@maheshdesigner.com",
                mobile="9999999999",
                password_hash=get_password_hash("Admin@123"),
                role="admin",
                is_active=True
            )
            db.add(admin)
            print("✓ Admin user created (admin@maheshdesigner.com / Admin@123)")

        # ── Categories ────────────────────────────────────────────────────────
        categories_data = [
            {"name": "Bridal Blouses", "slug": "bridal-blouses", "description": "Handcrafted Aari embroidery bridal blouses with intricate zari work"},
            {"name": "Bridal Lehengas", "slug": "bridal-lehengas", "description": "Luxurious bridal lehengas for your most special day"},
            {"name": "Reception Gowns", "slug": "reception-gowns", "description": "Elegant reception gowns and evening wear"},
            {"name": "Party Wear", "slug": "party-wear", "description": "Stunning party wear for every celebration"},
            {"name": "Customized Outfits", "slug": "customized-outfits", "description": "Bespoke outfits tailored to your vision"},
            {"name": "Kurtis", "slug": "kurtis", "description": "Premium embroidered kurtis for daily elegance"},
            {"name": "Premium Fabrics", "slug": "premium-fabrics", "description": "Luxurious fabrics sourced from finest weavers"},
        ]

        cat_map = {}
        for cat_data in categories_data:
            cat = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
            if not cat:
                cat = Category(**cat_data, is_active=True)
                db.add(cat)
                db.flush()
                print(f"  ✓ Category: {cat_data['name']}")
            cat_map[cat_data["slug"]] = cat

        db.flush()

        # ── Products ──────────────────────────────────────────────────────────
        products_data = [
            {
                "name": "Royal Crimson Aari Bridal Blouse",
                "slug": "royal-crimson-aari-bridal-blouse",
                "category_slug": "bridal-blouses",
                "description": "A masterpiece of Aari embroidery craftsmanship. Featuring intricate floral motifs in gold zari thread on rich crimson silk, this bridal blouse is designed for the queen within every bride. Hand-embroidered by artisans with decades of tradition.",
                "care_instructions": "Dry clean only. Store in a muslin bag away from direct sunlight.",
                "original_price": "8500.00",
                "discount_price": "7200.00",
                "fabric_type": "Pure Silk",
                "embroidery_type": "Aari with Zari",
                "fabric_color": "Crimson Red",
                "is_featured": True,
                "is_customizable": True,
                "stock": 15,
                "sizes": ["XS", "S", "M", "L", "XL", "Custom Fit"],
                "image_url": "/uploads/770387738_18098593040578086_6478356792783263711_n.jpg"
            },
            {
                "name": "Golden Hour Zari Lehenga",
                "slug": "golden-hour-zari-lehenga",
                "category_slug": "bridal-lehengas",
                "description": "A breathtaking bridal lehenga adorned with all-over golden zari embroidery on ivory silk. The flared skirt features traditional peacock motifs while the dupatta is embellished with mirror work and stone detailing.",
                "care_instructions": "Professional dry clean recommended. Handle with care to protect embroidery.",
                "original_price": "45000.00",
                "discount_price": "39999.00",
                "fabric_type": "Ivory Silk Georgette",
                "embroidery_type": "Zari with Stone Work",
                "fabric_color": "Ivory Gold",
                "is_featured": True,
                "is_customizable": True,
                "stock": 5,
                "sizes": ["XS", "S", "M", "L", "XL", "Custom Fit"],
                "image_url": "/uploads/Screenshot_26-8-2026_115914_www.instagram.com.jpeg"
            },
            {
                "name": "Midnight Rose Reception Gown",
                "slug": "midnight-rose-reception-gown",
                "category_slug": "reception-gowns",
                "description": "An ethereal floor-length reception gown in deep burgundy with delicate floral embroidery. Features a sweetheart neckline, cinched waist, and an elegant trail. Perfect for the bride who wants to make a lasting impression.",
                "care_instructions": "Dry clean only. Steam iron on low setting.",
                "original_price": "28500.00",
                "discount_price": "24999.00",
                "fabric_type": "Velvet Crepe",
                "embroidery_type": "Thread Embroidery with Sequins",
                "fabric_color": "Deep Burgundy",
                "is_featured": True,
                "is_customizable": True,
                "stock": 8,
                "sizes": ["XS", "S", "M", "L", "XL", "Custom Fit"],
                "image_url": "/uploads/780070284_18100128413578086_122324511139491431_n.jpg"
            },
            {
                "name": "Sunset Embroidered Party Saree",
                "slug": "sunset-embroidered-party-saree",
                "category_slug": "party-wear",
                "description": "A stunning orange-gold party saree with heavy border embroidery and matching blouse piece. Perfect for festive celebrations, weddings, and sangeet ceremonies.",
                "care_instructions": "Dry clean recommended for first wash.",
                "original_price": "12500.00",
                "discount_price": "10999.00",
                "fabric_type": "Banarasi Silk",
                "embroidery_type": "Weaved Zari Border",
                "fabric_color": "Sunset Orange",
                "is_featured": True,
                "is_customizable": False,
                "stock": 12,
                "sizes": ["Free Size"],
                "image_url": "/uploads/Screenshot%202026-08-26%20115803.png"
            },
            {
                "name": "Floral Mirror Work Kurti",
                "slug": "floral-mirror-work-kurti",
                "category_slug": "kurtis",
                "description": "A premium embroidered kurti featuring intricate mirror work and floral thread embroidery on soft cotton fabric. Effortlessly blends traditional artistry with everyday wearability.",
                "care_instructions": "Hand wash separately in cold water. Do not tumble dry.",
                "original_price": "3500.00",
                "discount_price": "2999.00",
                "fabric_type": "Soft Cotton",
                "embroidery_type": "Mirror Work & Thread",
                "fabric_color": "Ivory White",
                "is_featured": False,
                "is_customizable": True,
                "stock": 25,
                "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
                "image_url": "/uploads/Screenshot%202026-08-26%20121947.png"
            },
            {
                "name": "Bespoke Bridal Couture Package",
                "slug": "bespoke-bridal-couture-package",
                "category_slug": "customized-outfits",
                "description": "A fully bespoke bridal outfit designed from scratch to your vision. Includes personal consultation, custom measurements, fabric selection, embroidery design approval, and up to 3 fittings. Price varies based on design complexity.",
                "care_instructions": "Individual care instructions provided with each bespoke outfit.",
                "original_price": "75000.00",
                "discount_price": None,
                "fabric_type": "Custom Selection",
                "embroidery_type": "Custom Design",
                "fabric_color": "Custom",
                "is_featured": True,
                "is_customizable": True,
                "stock": 10,
                "sizes": ["Custom Fit"],
                "image_url": "/uploads/Screenshot_26-8-2026_115639_www.instagram.com.jpeg"
            },
            {
                "name": "Heritage Silk Fabric (Per Meter)",
                "slug": "heritage-silk-fabric-per-meter",
                "category_slug": "premium-fabrics",
                "description": "Pure Kanjivaram silk fabric sourced directly from master weavers in Tamil Nadu. Rich in texture, vibrant in color, and perfect for bridal blouses and sarees. Sold per meter.",
                "care_instructions": "Store in a cool, dry place. Avoid contact with rough surfaces.",
                "original_price": "2200.00",
                "discount_price": "1999.00",
                "fabric_type": "Pure Kanjivaram Silk",
                "embroidery_type": "None",
                "fabric_color": "Gold with Maroon Border",
                "is_featured": False,
                "is_customizable": False,
                "stock": 50,
                "sizes": ["0.5m", "1m", "1.5m", "2m", "Custom Length"],
                "image_url": "/uploads/771757318_18098730095578086_4773276763468998885_n.jpg"
            },
            {
                "name": "Champagne Sequin Cocktail Blouse",
                "slug": "champagne-sequin-cocktail-blouse",
                "category_slug": "bridal-blouses",
                "description": "A glamorous cocktail-reception blouse dripping in champagne sequins and hand-beaded accents. Perfect for reception parties and sangeet ceremonies.",
                "care_instructions": "Dry clean only. Handle with extreme care.",
                "original_price": "6500.00",
                "discount_price": "5499.00",
                "fabric_type": "Net with Sequin Overlay",
                "embroidery_type": "Sequin and Bead Work",
                "fabric_color": "Champagne Gold",
                "is_featured": True,
                "is_customizable": True,
                "stock": 10,
                "sizes": ["XS", "S", "M", "L", "XL", "Custom Fit"],
                "image_url": "/uploads/Screenshot%202026-08-26%20122249.png"
            },
        ]


        for pd in products_data:
            cat = cat_map.get(pd["category_slug"])
            if not cat:
                continue

            existing = db.query(Product).filter(Product.slug == pd["slug"]).first()
            if not existing:
                product = Product(
                    name=pd["name"],
                    slug=pd["slug"],
                    category_id=cat.id,
                    description=pd["description"],
                    original_price=pd["original_price"],
                    discount_price=pd.get("discount_price"),
                    fabric_type=pd.get("fabric_type"),
                    embroidery_type=pd.get("embroidery_type"),
                    fabric_color=pd.get("fabric_color"),
                    is_featured=pd.get("is_featured", False),
                    is_customization_available=pd.get("is_customizable", True),
                    stock=pd.get("stock", 10),
                    status="active"
                )
                db.add(product)
                db.flush()

                # Primary image
                db.add(ProductImage(
                    product_id=product.id,
                    image_url=pd["image_url"],
                    is_primary=True,
                    display_order=0
                ))

                # Sizes
                for size in pd.get("sizes", []):
                    db.add(ProductSize(
                        product_id=product.id,
                        size_label=size,
                        stock_count=pd.get("stock", 10)
                    ))

                print(f"  ✓ Created Product: {pd['name']}")
            else:
                # Update image
                pimg = db.query(ProductImage).filter(ProductImage.product_id == existing.id, ProductImage.is_primary == True).first()
                if pimg:
                    pimg.image_url = pd["image_url"]
                else:
                    db.add(ProductImage(product_id=existing.id, image_url=pd["image_url"], is_primary=True, display_order=0))
                print(f"  ✓ Updated Product Image: {existing.name}")

        # ── Demo Customer ─────────────────────────────────────────────────────
        if not db.query(User).filter(User.email == "bride@example.com").first():
            customer = User(
                full_name="Priya Sharma",
                username="priya_bride",
                email="bride@example.com",
                mobile="9876543210",
                password_hash=get_password_hash("Bride@2024"),
                role="customer",
                address="123, Rose Garden Apartments, MG Road",
                city="Chennai",
                state="Tamil Nadu",
                pincode="600001",
                is_active=True
            )
            db.add(customer)
            print("✓ Demo customer created (bride@example.com / Bride@2024)")

        db.commit()
        print("\n🌸 Seeding complete! Mahesh Designer database is ready.")
        print("\nAdmin Login:")
        print("  Email: admin@maheshdesigner.com")
        print("  Password: Admin@123")
        print("\nDemo Customer Login:")
        print("  Email: bride@example.com")
        print("  Password: Bride@2024")

    except Exception as e:
        db.rollback()
        print(f"\n❌ Seeding failed: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("🌸 Seeding Mahesh Designer database...\n")
    seed()
