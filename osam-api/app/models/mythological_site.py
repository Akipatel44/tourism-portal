"""
Mythological Site Model - Sites of mythological and legendary significance.
Stores stories, legends, and cultural significance of sites.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Enum, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from app.models.database import Base


class MythologicalSite(Base):
    """
    MythologicalSite model for sites with legendary and mythological significance.
    
    Relationships:
    - created_by_user: Many-to-one with User
    - galleries: One-to-many with Gallery
    - reviews: One-to-many with Review
    - events: Many-to-many with Event (through SiteEvent)
    """
    
    __tablename__ = "mythological_sites"
    
    # Primary Key
    site_id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information
    name = Column(String(255), nullable=False, index=True)
    mythology = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    
    # Historical Information
    legend_source = Column(String(255), nullable=True)
    historical_period = Column(String(100), nullable=True)
    
    # Location
    location = Column(String(255), nullable=False)
    latitude = Column(Numeric(10, 8), nullable=True)
    longitude = Column(Numeric(11, 8), nullable=True)
    
    # Significance
    cultural_significance = Column(Text, nullable=True)
    archaeological_value = Column(Text, nullable=True)
    
    # Visitor Information
    accessibility = Column(
        Enum('easily_accessible', 'moderate', 'difficult', name='accessibility_level'),
        nullable=True
    )
    guide_available = Column(Boolean, default=False)
    best_time_to_visit = Column(String(100), nullable=True)
    
    # Features and Metrics
    is_featured = Column(Boolean, default=False)
    
    # Foreign Key
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
    created_by_user = relationship("User", back_populates="mythological_sites")
    galleries = relationship("Gallery", back_populates="mythological_site", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="mythological_site", cascade="all, delete-orphan")
    site_events = relationship("SiteEvent", back_populates="site", cascade="all, delete-orphan")
    events = relationship(
        "Event",
        secondary="site_events",
        back_populates="mythological_sites"
    )
    
    def __repr__(self):
        return f"<MythologicalSite(site_id={self.site_id}, name='{self.name}', mythology='{self.mythology}')>"
