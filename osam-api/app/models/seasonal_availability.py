"""
SeasonalAvailability Model - Many-to-Many relationship between Places and Seasons.
Tracks accessibility of places during specific seasons.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, Enum, Text, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models.database import Base


class SeasonalAvailability(Base):
    """
    SeasonalAvailability model for Many-to-Many relationship.
    Links places with seasons and tracks accessibility information.
    
    Relationships:
    - place: Many-to-one with Place
    - season: Many-to-one with Season
    """
    
    __tablename__ = "seasonal_availabilities"
    
    # Primary Key
    availability_id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    place_id = Column(Integer, ForeignKey('places.place_id'), nullable=False)
    season_id = Column(Integer, ForeignKey('seasons.season_id'), nullable=False)
    
    # Accessibility Information
    is_accessible = Column(Boolean, nullable=False, default=True)
    accessibility_notes = Column(Text, nullable=True)
    crowding_level = Column(
        Enum('low', 'moderate', 'high', name='crowding_level'),
        nullable=True
    )
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    place = relationship("Place", back_populates="seasonal_availabilities")
    season = relationship("Season", back_populates="seasonal_availabilities")
    
    # Unique constraint: one place per season
    __table_args__ = (
        UniqueConstraint('place_id', 'season_id', name='unique_place_season'),
    )
    
    def __repr__(self):
        return f"<SeasonalAvailability(place_id={self.place_id}, season_id={self.season_id}, accessible={self.is_accessible})>"
