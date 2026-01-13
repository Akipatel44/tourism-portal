"""
Season Model - Weather and seasonal information.
Stores season definitions and characteristics.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Enum, DateTime
from sqlalchemy.orm import relationship
from app.models.database import Base


class Season(Base):
    """
    Season model for seasonal information and characteristics.
    
    Relationships:
    - seasonal_availabilities: One-to-many with SeasonalAvailability
    - places: Many-to-many with Place (through SeasonalAvailability)
    """
    
    __tablename__ = "seasons"
    
    # Primary Key
    season_id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information
    name = Column(String(50), nullable=False, unique=True, index=True)
    
    # Month Range
    month_start = Column(Integer, nullable=False)  # 1-12
    month_end = Column(Integer, nullable=False)    # 1-12
    
    # Weather Information
    temperature_min_celsius = Column(Integer, nullable=True)
    temperature_max_celsius = Column(Integer, nullable=True)
    humidity_percent = Column(Integer, nullable=True)
    rainfall_mm = Column(Integer, nullable=True)
    
    # Description
    description = Column(Text, nullable=True)
    best_for_activities = Column(String(255), nullable=True)
    
    # Season Characteristics
    is_tourist_season = Column(Boolean, default=False)
    is_peak_season = Column(Boolean, default=False)
    crowding_level = Column(
        Enum('low', 'moderate', 'high', name='crowding_level'),
        nullable=True
    )
    vegetation_status = Column(String(100), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    seasonal_availabilities = relationship(
        "SeasonalAvailability",
        back_populates="season",
        cascade="all, delete-orphan"
    )
    
    def __repr__(self):
        return f"<Season(season_id={self.season_id}, name='{self.name}')>"
