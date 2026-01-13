"""
Database configuration and base model setup.
Configures SQLAlchemy ORM, database connection, and creates the declarative base.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.pool import QueuePool

# Database URL configuration
# Format: mysql+pymysql://username:password@host:port/database
DATABASE_URL = "mysql+pymysql://akshay:AKS%402025elite@localhost:3306/osam_tourism"


# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,  # Test connections before using
    echo=False,  # Set to True to see SQL queries
)

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Declarative base for all models
Base = declarative_base()


def get_db():
    """
    Dependency injection function for database sessions.
    Used in FastAPI endpoints to get database access.
    
    Usage in endpoints:
    @app.get("/items")
    def get_items(db: Session = Depends(get_db)):
        return db.query(Item).all()
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
