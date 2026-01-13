"""
Temple Model - Religious temples and shrines.
Specialized model for temples with deity and worship information.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Numeric, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base


class Temple(Base):
    """
    Temple model for religious temples and shrines.
    
    Relationships:
    - created_by_user: Many-to-one with User
    - galleries: One-to-many with Gallery
    - reviews: One-to-many with Review
    - events: Many-to-many with Event (through TempleEvent)
    """
    
    __tablename__ = "temples"
    
    # Primary Key
    temple_id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information
    name = Column(String(255), nullable=False, index=True)
    deity = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    architectural_style = Column(String(100), nullable=True)
    
    # Location
    location = Column(String(255), nullable=False)
    latitude = Column(Numeric(10, 8), nullable=True)
    longitude = Column(Numeric(11, 8), nullable=True)
    
    # Temple Details
    age_years = Column(Integer, nullable=True)
    is_active_pilgrimage = Column(Boolean, default=True)
    
    # Festival Information
    main_festival = Column(String(100), nullable=True)
    festival_date = Column(String(50), nullable=True)
    pooja_timings = Column(String(255), nullable=True)
    
    # Visitor Information
    entry_fee = Column(Numeric(10, 2), default=0)
    parking_available = Column(Boolean, default=False)
    prasad_available = Column(Boolean, default=True)
    
    # Priest Contact
    priest_name = Column(String(100), nullable=True)
    priest_contact = Column(String(20), nullable=True)
    
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
    created_by_user = relationship("User", back_populates="temples")
    galleries = relationship("Gallery", back_populates="temple", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="temple", cascade="all, delete-orphan")
    temple_events = relationship("TempleEvent", back_populates="temple", cascade="all, delete-orphan")
    events = relationship(
        "Event",
        secondary="temple_events",
        back_populates="temples"
    )
    
    def __repr__(self):
        return f"<Temple(temple_id={self.temple_id}, name='{self.name}', deity='{self.deity}')>"
