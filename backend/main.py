import os
import uuid
from datetime import datetime, timezone
from decimal import Decimal

from dotenv import load_dotenv

load_dotenv()

from fastapi import (
    FastAPI,
    HTTPException,
    UploadFile,
    File,
    Header,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel

from sqlalchemy import (
    create_engine,
    Column,
    String,
    Integer,
    Numeric,
    DateTime,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base, sessionmaker


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv(os.path.join(BASE_DIR, ".env"))


# ============================================================
# CONFIGURATION
# ============================================================

DATABASE_URL = os.getenv("DATABASE_URL")

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

ADMIN_TOKEN = os.getenv("ADMIN_TOKEN")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:8081")


if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured.")

if not ADMIN_PASSWORD:
    raise RuntimeError("ADMIN_PASSWORD is not configured.")

if not ADMIN_TOKEN:
    raise RuntimeError("ADMIN_TOKEN is not configured.")


# ============================================================
# UPLOAD DIRECTORY
# ============================================================

UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ============================================================
# FASTAPI
# ============================================================

app = FastAPI(
    title="Elite Store API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:8081",
        "http://127.0.0.1:8081",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://10.26.60.23:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# STATIC IMAGE FILES
# ============================================================

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads",
)


# ============================================================
# DATABASE
# ============================================================

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


# ============================================================
# PRODUCT MODEL
# ============================================================

class Product(Base):
    __tablename__ = "products"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    name = Column(
        String(255),
        nullable=False,
    )
    brand = Column(
        String(255),
        nullable=False,
    )
    category = Column(
        String(100),
        nullable=False,
    )
    price = Column(
        Numeric(12, 2),
        nullable=False,
    )
    storage = Column(
        String(100),
        nullable=True,
    )
    ram = Column(
        String(100),
        nullable=True,
    )
    description = Column(
        Text,
        nullable=True,
    )
    image = Column(
        Text,
        nullable=True,
    )


# ============================================================
# ORDER MODEL
# ============================================================

class Order(Base):
    __tablename__ = "orders"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    product_id = Column(
        UUID(as_uuid=True),
        nullable=False,
    )
    product_name = Column(
        String(255),
        nullable=False,
    )
    customer_name = Column(
        String(255),
        nullable=False,
    )
    customer_phone = Column(
        String(50),
        nullable=False,
    )
    customer_email = Column(
        String(255),
        nullable=False,
    )
    customer_location = Column(
        String(255),
        nullable=False,
    )
    quantity = Column(
        Integer,
        nullable=False,
        default=1,
    )
    total_amount = Column(
        Numeric(12, 2),
        nullable=False,
    )
    payment_method = Column(
        String(50),
        nullable=False,
    )
    status = Column(
        String(50),
        nullable=False,
        default="pending",
    )
    created_at = Column(
        DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )


# ============================================================
# CREATE TABLES
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# PYDANTIC MODELS
# ============================================================

class ProductCreate(BaseModel):
    name: str
    brand: str
    category: str
    price: float
    storage: str | None = None
    ram: str | None = None
    description: str | None = None
    image: str | None = None


class ProductUpdate(BaseModel):
    name: str
    brand: str
    category: str
    price: float
    storage: str | None = None
    ram: str | None = None
    description: str | None = None
    image: str | None = None


class AdminLogin(BaseModel):
    username: str
    password: str


class OrderCreate(BaseModel):
    product_id: str
    customer_name: str
    customer_phone: str
    customer_email: str
    customer_location: str
    quantity: int = 1
    payment_method: str


class OrderStatusUpdate(BaseModel):
    status: str


# ============================================================
# RESPONSE HELPERS
# ============================================================

def product_response(product):
    return {
        "id": str(product.id),
        "name": product.name,
        "brand": product.brand,
        "category": product.category,
        "price": float(product.price),
        "storage": product.storage or "",
        "ram": product.ram or "",
        "description": product.description or "",
        "image": product.image or "",
    }


def order_response(order):
    return {
        "id": str(order.id),
        "product_id": str(order.product_id),
        "product_name": order.product_name,
        "customer_name": order.customer_name,
        "customer_phone": order.customer_phone,
        "customer_email": order.customer_email,
        "customer_location": order.customer_location,
        "quantity": order.quantity,
        "total_amount": float(order.total_amount),
        "payment_method": order.payment_method,
        "status": order.status,
        "created_at": order.created_at.isoformat() if order.created_at else None,
    }


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "Elite Store API is running",
        "version": "1.0.0",
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "Elite Store API",
    }


# ============================================================
# ADMIN LOGIN
# ============================================================

@app.post("/admin/login")
def admin_login(login_data: AdminLogin):
    if login_data.username != ADMIN_USERNAME or login_data.password != ADMIN_PASSWORD:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    return {
        "success": True,
        "message": "Admin authentication successful",
        "token": ADMIN_TOKEN,
        "access_token": ADMIN_TOKEN,
        "username": ADMIN_USERNAME,
    }


# ============================================================
# ADMIN ME
# ============================================================

@app.get("/admin/me")
def admin_me(authorization: str | None = Header(default=None)):
    if not authorization or authorization != f"Bearer {ADMIN_TOKEN}":
        raise HTTPException(
            status_code=401,
            detail="Invalid or missing authentication token",
        )

    return {
        "authenticated": True,
        "username": ADMIN_USERNAME,
    }


# ============================================================
# ADMIN AUTH HELPER
# ============================================================

def verify_admin(authorization: str | None):
    if not authorization or authorization != f"Bearer {ADMIN_TOKEN}":
        raise HTTPException(
            status_code=401,
            detail="Unauthorized. Valid admin token required.",
        )


# ============================================================
# GET PRODUCTS
# PUBLIC
# ============================================================

@app.get("/products")
def get_products():
    db = SessionLocal()
    try:
        products = db.query(Product).order_by(Product.name.asc()).all()
        return [product_response(product) for product in products]
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch products: {str(e)}",
        )
    finally:
        db.close()


# ============================================================
# GET SINGLE PRODUCT
# ============================================================

@app.get("/products/{product_id}")
def get_product(product_id: str):
    db = SessionLocal()
    try:
        try:
            product_uuid = uuid.UUID(product_id)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Invalid product ID format. Must be a valid UUID.",
            )

        product = db.query(Product).filter(Product.id == product_uuid).first()
        if product is None:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )
        return product_response(product)
    finally:
        db.close()


# ============================================================
# CREATE PRODUCT
# ============================================================

@app.post("/products")
def create_product(
    product_data: ProductCreate,
    authorization: str | None = Header(default=None),
):
    verify_admin(authorization)

    db = SessionLocal()
    try:
        new_product = Product(
            name=product_data.name.strip(),
            brand=product_data.brand.strip(),
            category=product_data.category.strip(),
            price=Decimal(str(product_data.price)),
            storage=product_data.storage or "",
            ram=product_data.ram or "",
            description=product_data.description or "",
            image=product_data.image or "",
        )

        db.add(new_product)
        db.commit()
        db.refresh(new_product)

        return product_response(new_product)

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create product: {str(e)}",
        )
    finally:
        db.close()


# ============================================================
# UPDATE PRODUCT
# ============================================================

@app.put("/products/{product_id}")
def update_product(
    product_id: str,
    product_data: ProductUpdate,
    authorization: str | None = Header(default=None),
):
    verify_admin(authorization)

    db = SessionLocal()
    try:
        try:
            product_uuid = uuid.UUID(product_id)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Invalid product ID format. Must be a valid UUID.",
            )

        product = db.query(Product).filter(Product.id == product_uuid).first()
        if product is None:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        product.name = product_data.name.strip()
        product.brand = product_data.brand.strip()
        product.category = product_data.category.strip()
        product.price = Decimal(str(product_data.price))
        product.storage = product_data.storage or ""
        product.ram = product_data.ram or ""
        product.description = product_data.description or ""

        if product_data.image is not None:
            product.image = product_data.image

        db.commit()
        db.refresh(product)

        return product_response(product)

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update product: {str(e)}",
        )
    finally:
        db.close()


# ============================================================
# DELETE PRODUCT
# ============================================================

@app.delete("/products/{product_id}")
def delete_product(
    product_id: str,
    authorization: str | None = Header(default=None),
):
    verify_admin(authorization)

    db = SessionLocal()
    try:
        try:
            product_uuid = uuid.UUID(product_id)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Invalid product ID format. Must be a valid UUID.",
            )

        product = db.query(Product).filter(Product.id == product_uuid).first()
        if product is None:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        db.delete(product)
        db.commit()

        return {
            "success": True,
            "message": "Product deleted successfully",
            "id": product_id,
        }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete product: {str(e)}",
        )
    finally:
        db.close()


# ============================================================
# MANUAL IMAGE UPLOAD
# ============================================================

@app.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    authorization: str | None = Header(default=None),
):
    verify_admin(authorization)

    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="File type could not be determined",
        )

    allowed_types = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/gif": ".gif",
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG, WEBP and GIF images are allowed.",
        )

    extension = allowed_types[file.content_type]
    filename = f"{uuid.uuid4().hex}{extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    try:
        # Check file size
        file.file.seek(0, os.SEEK_END)
        file_size = file.file.tell()
        file.file.seek(0)

        max_size = 5 * 1024 * 1024  # 5MB

        if file_size > max_size:
            raise HTTPException(
                status_code=400,
                detail="File size exceeds 5MB limit.",
            )

        # Save file
        with open(file_path, "wb") as buffer:
            while True:
                chunk = await file.read(1024 * 1024)  # 1MB chunks
                if not chunk:
                    break
                buffer.write(chunk)

    except HTTPException:
        raise
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save image: {str(e)}",
        )

    image_url = f"/uploads/{filename}"

    return {
        "success": True,
        "filename": filename,
        "url": image_url,
        "image": image_url,
    }


# ============================================================
# CREATE ORDER
# ============================================================

@app.post("/orders")
def create_order(order_data: OrderCreate):
    db = SessionLocal()
    try:
        if order_data.quantity < 1:
            raise HTTPException(
                status_code=400,
                detail="Quantity must be at least 1",
            )

        payment_method = order_data.payment_method.strip().lower()
        if payment_method not in {"airtel", "crdb"}:
            raise HTTPException(
                status_code=400,
                detail="Invalid payment method. Use 'airtel' or 'crdb'.",
            )

        try:
            product_uuid = uuid.UUID(order_data.product_id)
        except (ValueError, AttributeError, TypeError):
            raise HTTPException(
                status_code=400,
                detail="Invalid product ID format. Must be a valid UUID.",
            )

        product = db.query(Product).filter(Product.id == product_uuid).first()
        if product is None:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        total_amount = Decimal(str(product.price)) * order_data.quantity

        new_order = Order(
            product_id=product.id,
            product_name=product.name,
            customer_name=order_data.customer_name.strip(),
            customer_phone=order_data.customer_phone.strip(),
            customer_email=order_data.customer_email.strip(),
            customer_location=order_data.customer_location.strip(),
            quantity=order_data.quantity,
            total_amount=total_amount,
            payment_method=payment_method,
            status="pending",
        )

        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        return order_response(new_order)

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create order: {str(e)}",
        )
    finally:
        db.close()


# ============================================================
# GET ORDERS
# ============================================================

@app.get("/orders")
def get_orders(authorization: str | None = Header(default=None)):
    verify_admin(authorization)

    db = SessionLocal()
    try:
        orders = db.query(Order).order_by(Order.created_at.desc()).all()
        return [order_response(order) for order in orders]
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch orders: {str(e)}",
        )
    finally:
        db.close()


# ============================================================
# GET SINGLE ORDER
# ============================================================

@app.get("/orders/{order_id}")
def get_order(order_id: str, authorization: str | None = Header(default=None)):
    verify_admin(authorization)

    db = SessionLocal()
    try:
        try:
            order_uuid = uuid.UUID(order_id)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Invalid order ID format. Must be a valid UUID.",
            )

        order = db.query(Order).filter(Order.id == order_uuid).first()
        if order is None:
            raise HTTPException(
                status_code=404,
                detail="Order not found",
            )
        return order_response(order)
    finally:
        db.close()


# ============================================================
# UPDATE ORDER STATUS
# ============================================================

@app.put("/orders/{order_id}/status")
def update_order_status(
    order_id: str,
    status_data: OrderStatusUpdate,
    authorization: str | None = Header(default=None),
):
    verify_admin(authorization)

    db = SessionLocal()
    try:
        try:
            order_uuid = uuid.UUID(order_id)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Invalid order ID format. Must be a valid UUID.",
            )

        allowed_statuses = {
            "pending",
            "confirmed",
            "processing",
            "completed",
            "cancelled",
        }

        new_status = status_data.status.strip().lower()
        if new_status not in allowed_statuses:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid status. Use: {', '.join(sorted(allowed_statuses))}",
            )

        order = db.query(Order).filter(Order.id == order_uuid).first()
        if order is None:
            raise HTTPException(
                status_code=404,
                detail="Order not found",
            )

        order.status = new_status
        db.commit()
        db.refresh(order)

        return order_response(order)

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update order: {str(e)}",
        )
    finally:
        db.close()


# ============================================================
# DELETE ORDER
# ============================================================

@app.delete("/orders/{order_id}")
def delete_order(order_id: str, authorization: str | None = Header(default=None)):
    verify_admin(authorization)

    db = SessionLocal()
    try:
        try:
            order_uuid = uuid.UUID(order_id)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Invalid order ID format. Must be a valid UUID.",
            )

        order = db.query(Order).filter(Order.id == order_uuid).first()
        if order is None:
            raise HTTPException(
                status_code=404,
                detail="Order not found",
            )

        db.delete(order)
        db.commit()

        return {
            "success": True,
            "message": "Order deleted successfully",
            "id": order_id,
        }

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete order: {str(e)}",
        )
    finally:
        db.close()


# ============================================================
# GET SINGLE ORDER (PUBLIC - for customer reference)
# ============================================================

@app.get("/orders/public/{order_id}")
def get_public_order(order_id: str):
    """Public endpoint for customers to check their order status."""
    db = SessionLocal()
    try:
        try:
            order_uuid = uuid.UUID(order_id)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Invalid order ID format. Must be a valid UUID.",
            )

        order = db.query(Order).filter(Order.id == order_uuid).first()
        if order is None:
            raise HTTPException(
                status_code=404,
                detail="Order not found",
            )
        return order_response(order)
    finally:
        db.close()


# ============================================================
# DEVELOPMENT SERVER
# ============================================================

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8080,
        reload=True,
    )