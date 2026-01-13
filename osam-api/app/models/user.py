"""
User Model - Admin and staff users.
Stores authentication and user profile information.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, Enum, DateTime
from sqlalchemy.orm import relationship
from app.models.database import Base


class User(Base):
    """
    User model for admin and staff accounts.
    
    Relationships:
    - places: One-to-many with Place (created_by)
    - temples: One-to-many with Temple (created_by)
    - mythological_sites: One-to-many with MythologicalSite (created_by)
    - events: One-to-many with Event (created_by)
    - galleries: One-to-many with Gallery (created_by)
    """
    
    __tablename__ = "users"
    
    # Primary Key
    user_id = Column(Integer, primary_key=True, index=True)
    
    # Authentication
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    
    # Profile Information
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    
    # Status
    role = Column(Enum('admin', 'editor', name='user_role'), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    places = relationship("Place", back_populates="created_by_user", foreign_keys="Place.created_by")
    temples = relationship("Temple", back_populates="created_by_user", foreign_keys="Temple.created_by")
    mythological_sites = relationship(
        "MythologicalSite",
        back_populates="created_by_user",
        foreign_keys="MythologicalSite.created_by"
    )
    events = relationship("Event", back_populates="created_by_user", foreign_keys="Event.created_by")
    galleries = relationship("Gallery", back_populates="created_by_user", foreign_keys="Gallery.created_by")
    
    def __repr__(self):
        return f"<User(user_id={self.user_id}, username='{self.username}', role='{self.role}')>"
