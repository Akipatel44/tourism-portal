"""
Authentication service for JWT token generation and password management.
"""

from datetime import datetime, timedelta
from typing import Optional, Tuple
from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.models.user import User

# Security configuration
SECRET_KEY = "your-secret-key-change-this-in-production-use-env-variable"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """Service for authentication operations."""
    
    def __init__(self, db: Session):
        """Initialize auth service with database session."""
        self.db = db
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password using bcrypt."""
        return pwd_context.hash(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against hashed password."""
        return pwd_context.verify(plain_password, hashed_password)
    
    def create_access_token(self, user_id: int, username: str, role: str) -> Tuple[str, int]:
        """
        Create JWT access token.
        
        Returns:
            Tuple of (token, expires_in_seconds)
        """
        expires_in = ACCESS_TOKEN_EXPIRE_MINUTES * 60
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        
        payload = {
            "user_id": user_id,
            "username": username,
            "role": role,
            "exp": expire,
            "iat": datetime.utcnow()
        }
        
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return token, expires_in
    
    def verify_token(self, token: str) -> Optional[dict]:
        """
        Verify JWT token and return payload.
        
        Returns:
            Token payload dict or None if invalid
        """
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except JWTError:
            return None
    
    def authenticate_user(self, username: str, password: str) -> Optional[User]:
        """
        Authenticate user by username and password.
        
        Args:
            username: User's username
            password: User's plain text password
            
        Returns:
            User object if credentials valid, None otherwise
        """
        # Get user by username
        user = self.db.query(User).filter(User.username == username).first()
        
        if not user:
            return None
        
        # Verify password and active status
        if not self.verify_password(password, user.password_hash):
            return None
        
        if not user.is_active:
            return None
        
        return user
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID."""
        return self.db.query(User).filter(User.user_id == user_id).first()
    
    def get_user_by_username(self, username: str) -> Optional[User]:
        """Get user by username."""
        return self.db.query(User).filter(User.username == username).first()
    
    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email."""
        return self.db.query(User).filter(User.email == email).first()
    
    def create_user(self, username: str, email: str, password: str, role: str = "editor") -> User:
        """
        Create a new user.
        
        Args:
            username: User's username (must be unique)
            email: User's email (must be unique)
            password: Plain text password (will be hashed)
            role: User role (admin or editor)
            
        Returns:
            Created User object
            
        Raises:
            ValueError: If username or email already exists
        """
        # Check if username exists
        if self.get_user_by_username(username):
            raise ValueError(f"Username '{username}' already exists")
        
        # Check if email exists
        if self.get_user_by_email(email):
            raise ValueError(f"Email '{email}' already exists")
        
        # Hash password
        hashed_password = self.hash_password(password)
        
        # Create user
        user = User(
            username=username,
            email=email,
            password_hash=hashed_password,
            role=role,
            is_active=True
        )
        
        try:
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
            return user
        except Exception:
            self.db.rollback()
            raise ValueError("Failed to create user")
    
    def update_password(self, user_id: int, current_password: str, new_password: str) -> bool:
        """
        Update user password.
        
        Args:
            user_id: User's ID
            current_password: Current plain text password
            new_password: New plain text password
            
        Returns:
            True if updated, False if current password incorrect
        """
        user = self.get_user_by_id(user_id)
        if not user:
            raise ValueError("User not found")
        
        # Verify current password
        if not self.verify_password(current_password, user.password_hash):
            raise ValueError("Current password is incorrect")
        
        # Update password
        user.password_hash = self.hash_password(new_password)
        user.updated_at = datetime.utcnow()
        
        try:
            self.db.commit()
            return True
        except Exception:
            self.db.rollback()
            raise ValueError("Failed to update password")
    
    def is_admin(self, user_id: int) -> bool:
        """Check if user is admin."""
        user = self.get_user_by_id(user_id)
        return user is not None and user.role == "admin"
    
    def logout(self, token: str) -> bool:
        """
        Logout user (can be used for token blacklisting in future).
        
        Currently just returns True, but can be extended for
        maintaining a token blacklist.
        """
        return True
