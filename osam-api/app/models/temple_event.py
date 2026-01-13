"""
TempleEvent Model - Many-to-Many relationship between Temples and Events.
Associates temples with events held at them.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.models.database import Base


class TempleEvent(Base):
    """
    TempleEvent model for Many-to-Many relationship.
    Associates temples with events that occur at them.
    
    Relationships:
    - temple: Many-to-one with Temple
    - event: Many-to-one with Event
    """
    
    __tablename__ = "temple_events"
    
    # Primary Key
    temple_event_id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    temple_id = Column(Integer, ForeignKey('temples.temple_id'), nullable=False)
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
    temple = relationship("Temple", back_populates="temple_events")
    event = relationship("Event", back_populates="temple_events")
    
    # Unique constraint: one temple per event
    __table_args__ = (
        UniqueConstraint('temple_id', 'event_id', name='unique_temple_event'),
    )
    
    def __repr__(self):
        return f"<TempleEvent(temple_id={self.temple_id}, event_id={self.event_id})>"
