"""
User service for user management operations.
"""

from typing import Optional, List
from datetime import datetime
from sqlalchemy.orm import Session

from app.models.user import User
from app.services.base_service import BaseService


class UserService(BaseService[User]):
    """Service for user management."""
    
    def __init__(self, db: Session):
        """Initialize user service."""
        super().__init__(db, User)
    
    def get_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID."""
        return self.db.query(User).filter(User.user_id == user_id).first()
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[User]:
        """Get all users with pagination."""
        return self.db.query(User).offset(skip).limit(limit).all()
    
    def create(self, **kwargs) -> User:
        """Create a new user."""
        if 'password_hash' not in kwargs:
            raise ValueError("password_hash is required")
        
        user = User(**kwargs)
        self._commit(user)
        return user
    
    def update(self, user_id: int, **kwargs) -> Optional[User]:
        """Update user."""
        user = self.get_by_id(user_id)
        if not user:
            return None
        
        # Don't allow direct password_hash updates
        if 'password_hash' in kwargs:
            kwargs.pop('password_hash')
        
        for key, value in kwargs.items():
            if hasattr(user, key):
                setattr(user, key, value)
        
        user.updated_at = datetime.utcnow()
        self._commit(user)
        return user
    
    def delete(self, user_id: int) -> bool:
        """Delete user."""
        user = self.get_by_id(user_id)
        if not user:
            return False
        
        try:
            self.db.delete(user)
            self.db.commit()
            return True
        except Exception:
            self.db.rollback()
            return False
    
    def get_by_username(self, username: str) -> Optional[User]:
        """Get user by username."""
        return self.db.query(User).filter(User.username == username).first()
    
    def get_by_email(self, email: str) -> Optional[User]:
        """Get user by email."""
        return self.db.query(User).filter(User.email == email).first()
    
    def get_admins(self) -> List[User]:
        """Get all admin users."""
        return self.db.query(User).filter(User.role == "admin").all()
    
    def get_active_users(self) -> List[User]:
        """Get all active users."""
        return self.db.query(User).filter(User.is_active == True).all()
    
    def deactivate_user(self, user_id: int) -> bool:
        """Deactivate a user."""
        user = self.get_by_id(user_id)
        if not user:
            return False
        
        user.is_active = False
        user.updated_at = datetime.utcnow()
        self._commit(user)
        return True
    
    def activate_user(self, user_id: int) -> bool:
        """Activate a user."""
        user = self.get_by_id(user_id)
        if not user:
            return False
        
        user.is_active = True
        user.updated_at = datetime.utcnow()
        self._commit(user)
        return True
    
    def promote_to_admin(self, user_id: int) -> bool:
        """Promote user to admin."""
        user = self.get_by_id(user_id)
        if not user:
            return False
        
        user.role = "admin"
        user.updated_at = datetime.utcnow()
        self._commit(user)
        return True
    
    def demote_to_editor(self, user_id: int) -> bool:
        """Demote user to editor."""
        user = self.get_by_id(user_id)
        if not user:
            return False
        
        user.role = "editor"
        user.updated_at = datetime.utcnow()
        self._commit(user)
        return True
