"""
GalleryImage Model - Individual images within a gallery.
Stores image metadata and ordering information.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base


class GalleryImage(Base):
    """
    GalleryImage model for individual images within a gallery.
    
    Relationships:
    - gallery: Many-to-one with Gallery
    """
    
    __tablename__ = "gallery_images"
    
    # Primary Key
    image_id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Key
    gallery_id = Column(Integer, ForeignKey('galleries.gallery_id'), nullable=False)
    
    # Image Information
    image_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500), nullable=True)
    
    # Metadata
    title = Column(String(255), nullable=False)
    caption = Column(Text, nullable=True)
    photographer = Column(String(100), nullable=True)
    
    # Display Information
    image_order = Column(Integer, nullable=False)  # Position in gallery
    is_featured = Column(Boolean, default=False)
    
    # Metrics
    view_count = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    gallery = relationship("Gallery", back_populates="gallery_images")
    
    def __repr__(self):
        return f"<GalleryImage(image_id={self.image_id}, title='{self.title}')>"
