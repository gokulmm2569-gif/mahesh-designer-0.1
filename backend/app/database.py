from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

db_url = settings.DATABASE_URL
engine_kwargs = {}

if "sqlite" in db_url:
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    engine_kwargs.update({
        "pool_pre_ping": True,
        "pool_recycle": 3600,
        "pool_size": 10,
        "max_overflow": 20,
    })

try:
    engine = create_engine(db_url, **engine_kwargs)
    with engine.connect() as conn:
        pass
except Exception as e:
    print(f"[Database] Primary DB connection failed ({e}). Falling back to SQLite (sqlite:///./mahesh_designer.db).")
    sqlite_url = "sqlite:///./mahesh_designer.db"
    engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

