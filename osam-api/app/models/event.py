"""
Event Model - Festivals, events, and celebrations.
Stores information about cultural events and festivals.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Numeric, Enum, DateTime, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base


class Event(Base):
    """
    Event model for festivals, fairs, and cultural events.
    
    Relationships:
    - created_by_user: Many-to-one with User
    - galleries: One-to-many with Gallery
    - reviews: One-to-many with Review
    - temples: Many-to-many with Temple (through TempleEvent)
    - mythological_sites: Many-to-many with MythologicalSite (through SiteEvent)
    """
    
    __tablename__ = "events"
    
    # Primary Key
    event_id = Column(Integer, primary_key=True, index=True)
    
    # Basic Information
    name = Column(String(255), nullable=False, index=True)
    event_type = Column(
        Enum('festival', 'fair', 'ceremony', 'cultural', name='event_type'),
        nullable=False
    )
    description = Column(Text, nullable=False)
    
    # Date and Time Information
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    start_time = Column(Time, nullable=True)
    end_time = Column(Time, nullable=True)
    is_annual = Column(Boolean, default=True)
    
    # Event Details
    expected_attendance = Column(Integer, nullable=True)
    
    # Location
    location = Column(String(255), nullable=False)
    latitude = Column(Numeric(10, 8), nullable=True)
    longitude = Column(Numeric(11, 8), nullable=True)
    
    # Organization
    organizing_body = Column(String(255), nullable=True)
    contact_person = Column(String(100), nullable=True)
    contact_phone = Column(String(20), nullable=True)
    contact_email = Column(String(100), nullable=True)
    
    # Visitor Information
    entry_fee = Column(Numeric(10, 2), default=0)
    is_free = Column(Boolean, default=True)
    parking_available = Column(Boolean, default=False)
    accommodation_nearby = Column(Boolean, default=False)
    
    # Website
    website = Column(String(255), nullable=True)
    
    # Features and Status
    is_featured = Column(Boolean, default=False)
    status = Column(
        Enum('upcoming', 'ongoing', 'completed', name='event_status'),
        default='upcoming'
    )
    
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
    created_by_user = relationship("User", back_populates="events")
    galleries = relationship("Gallery", back_populates="event", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="event", cascade="all, delete-orphan")
    temple_events = relationship("TempleEvent", back_populates="event", cascade="all, delete-orphan")
    temples = relationship(
        "Temple",
        secondary="temple_events",
        back_populates="events"
    )
    site_events = relationship("SiteEvent", back_populates="event", cascade="all, delete-orphan")
    mythological_sites = relationship(
        "MythologicalSite",
        secondary="site_events",
        back_populates="events"
    )
    
    def __repr__(self):
        return f"<Event(event_id={self.event_id}, name='{self.name}', type='{self.event_type}')>"
