"""
Gallery Model - Collections of images and media.
Groups images together for places, temples, sites, and events.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base


class Gallery(Base):
    """
    Gallery model for organizing images and media into albums.
    
    Relationships:
    - created_by_user: Many-to-one with User
    - place: Many-to-one with Place (nullable)
    - temple: Many-to-one with Temple (nullable)
    - mythological_site: Many-to-one with MythologicalSite (nullable)
    - event: Many-to-one with Event (nullable)
    - gallery_images: One-to-many with GalleryImage
    """
    
    __tablename__ = "galleries"
    
    # Primary Key
    gallery_id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    
    # Gallery Type
    gallery_type = Column(
        Enum('photos', 'videos', '360photos', name='gallery_type'),
        nullable=False
    )
    
    # Features and Metrics
    is_featured = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    
    # Foreign Keys (nullable - can belong to any content type)
    place_id = Column(Integer, ForeignKey('places.place_id'), nullable=True)
    temple_id = Column(Integer, ForeignKey('temples.temple_id'), nullable=True)
    site_id = Column(Integer, ForeignKey('mythological_sites.site_id'), nullable=True)
    event_id = Column(Integer, ForeignKey('events.event_id'), nullable=True)
    created_by = Column(Integer, ForeignKey('users.user_id'), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    created_by_user = relationship("User", back_populates="galleries")
    place = relationship("Place", back_populates="galleries")
    temple = relationship("Temple", back_populates="galleries")
    mythological_site = relationship("MythologicalSite", back_populates="galleries")
    event = relationship("Event", back_populates="galleries")
    gallery_images = relationship("GalleryImage", back_populates="gallery", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Gallery(gallery_id={self.gallery_id}, name='{self.name}', type='{self.gallery_type}')>"
