"""
Review Model - User reviews and ratings for content.
Stores visitor reviews, ratings, and feedback for all content types.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Enum, DateTime, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.models.database import Base


class Review(Base):
    """
    Review model for user reviews and ratings.
    Can be attached to places, temples, sites, or events.
    
    Relationships:
    - place: Many-to-one with Place (nullable)
    - temple: Many-to-one with Temple (nullable)
    - mythological_site: Many-to-one with MythologicalSite (nullable)
    - event: Many-to-one with Event (nullable)
    """
    
    __tablename__ = "reviews"
    
    # Primary Key
    review_id = Column(Integer, primary_key=True, index=True)
    
    # Review Content
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    
    # Overall Rating
    rating = Column(Integer, nullable=False)  # 1-5 stars
    
    # Review Type
    review_type = Column(
        Enum('place', 'temple', 'site', 'event', name='review_type'),
        nullable=False
    )
    
    # Foreign Keys (nullable - belongs to one content type)
    place_id = Column(Integer, ForeignKey('places.place_id'), nullable=True)
    temple_id = Column(Integer, ForeignKey('temples.temple_id'), nullable=True)
    site_id = Column(Integer, ForeignKey('mythological_sites.site_id'), nullable=True)
    event_id = Column(Integer, ForeignKey('events.event_id'), nullable=True)
    
    # Visitor Information
    visitor_name = Column(String(100), nullable=False)
    visitor_email = Column(String(100), nullable=False)
    visit_date = Column(Date, nullable=True)
    visit_duration_hours = Column(Integer, nullable=True)
    
    # Multi-Dimensional Ratings
    value_for_money = Column(Integer, nullable=True)         # 1-5
    cleanliness_rating = Column(Integer, nullable=True)      # 1-5
    crowd_rating = Column(Integer, nullable=True)            # 1-5
    accessibility_rating = Column(Integer, nullable=True)    # 1-5
    
    # Verification and Approval
    is_verified = Column(Boolean, default=False)
    is_approved = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    
    # Feedback Metrics
    helpful_count = Column(Integer, default=0)
    unhelpful_count = Column(Integer, default=0)
    
    # Status
    status = Column(
        Enum('pending', 'approved', 'rejected', name='review_status'),
        default='pending'
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
    place = relationship("Place", back_populates="reviews")
    temple = relationship("Temple", back_populates="reviews")
    mythological_site = relationship("MythologicalSite", back_populates="reviews")
    event = relationship("Event", back_populates="reviews")
    
    def __repr__(self):
        return f"<Review(review_id={self.review_id}, rating={self.rating}, type='{self.review_type}')>"
