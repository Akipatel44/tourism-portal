"""
Script to create the first admin user directly in the database.
Run this once to bootstrap the admin account.
"""

from sqlalchemy.orm import Session
from app.models.database import SessionLocal, engine
from app.models.user import User
from app.models import Base
from app.services.auth_service import AuthService

# Ensure tables exist
Base.metadata.create_all(bind=engine)

# Create database session
db: Session = SessionLocal()

try:
    # Check if admin already exists
    existing_admin = db.query(User).filter(User.username == "admin").first()
    
    if existing_admin:
        print("✓ Admin user already exists!")
        print(f"  Username: {existing_admin.username}")
        print(f"  Email: {existing_admin.email}")
        print(f"  Role: {existing_admin.role}")
    else:
        # Hash password
        auth_service = AuthService(db)
        hashed_password = auth_service.hash_password("admin123")
        
        # Create admin user
        admin_user = User(
            username="admin",
            email="admin@example.com",
            password_hash=hashed_password,
            first_name="Admin",
            last_name="User",
            role="admin",
            is_active=True
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print("✓ Admin user created successfully!")
        print(f"  User ID: {admin_user.user_id}")
        print(f"  Username: {admin_user.username}")
        print(f"  Email: {admin_user.email}")
        print(f"  Role: {admin_user.role}")
        print("\n📝 You can now login with:")
        print("  Username: admin")
        print("  Password: admin123")
        
finally:
    db.close()
