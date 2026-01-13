"""
SiteEvent Model - Many-to-Many relationship between Mythological Sites and Events.
Associates mythological sites with events held at them.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models.database import Base


class SiteEvent(Base):
    """
    SiteEvent model for Many-to-Many relationship.
    Associates mythological sites with events that occur at them.
    
    Relationships:
    - site: Many-to-one with MythologicalSite
    - event: Many-to-one with Event
    """
    
    __tablename__ = "site_events"
    
    # Primary Key
    site_event_id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    site_id = Column(Integer, ForeignKey('mythological_sites.site_id'), nullable=False)
    event_id = Column(Integer, ForeignKey('events.event_id'), nullable=False)
    
    # Association Information
    is_primary = Column(Boolean, default=True)  # Primary venue for event
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    site = relationship("MythologicalSite", back_populates="site_events")
    event = relationship("Event", back_populates="site_events")
    
    # Unique constraint: one site per event
    __table_args__ = (
        UniqueConstraint('site_id', 'event_id', name='unique_site_event'),
    )
    
    def __repr__(self):
        return f"<SiteEvent(site_id={self.site_id}, event_id={self.event_id})>"
