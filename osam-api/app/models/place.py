"""
Place Model - General attractions, landmarks, viewpoints, and locations.
Core model for tourism destinations.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Numeric, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base


class Place(Base):
    """
    Place model for general attractions and landmarks.
    
    Relationships:
    - created_by_user: Many-to-one with User
    - galleries: One-to-many with Gallery
    - reviews: One-to-many with Review
    - seasons: Many-to-many with Season (through SeasonalAvailability)
    """
    
    __tablename__ = "places"
    
    # Primary Key
    place_id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=False)
    category = Column(
        Enum('place', 'landmark', 'viewpoint', 'parking', name='place_category'),
        nullable=False
    )
    
    # Location Information
    location = Column(String(255), nullable=False)
    latitude = Column(Numeric(10, 8), nullable=True)
    longitude = Column(Numeric(11, 8), nullable=True)
    elevation_meters = Column(Integer, nullable=True)
    
    # Visitor Information
    entry_fee = Column(Numeric(10, 2), nullable=True)
    entry_fee_currency = Column(String(3), default='INR')
    best_time_to_visit = Column(String(100), nullable=True)
    average_visit_duration_hours = Column(Integer, nullable=True)
    accessibility = Column(
        Enum('easily_accessible', 'moderate', 'difficult', name='accessibility_level'),
        nullable=True
    )
    
    # Facilities
    parking_available = Column(Boolean, default=False)
    public_restrooms = Column(Boolean, default=False)
    food_nearby = Column(Boolean, default=False)
    
    # Features and Metrics
    is_featured = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    
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
    created_by_user = relationship("User", back_populates="places")
    galleries = relationship("Gallery", back_populates="place", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="place", cascade="all, delete-orphan")
    seasonal_availabilities = relationship(
        "SeasonalAvailability",
        back_populates="place",
        cascade="all, delete-orphan"
    )
    
    def __repr__(self):
        return f"<Place(place_id={self.place_id}, name='{self.name}', category='{self.category}')>"
