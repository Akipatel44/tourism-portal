"""
Event Service - Business logic for events and festivals.
Handles event-related operations, scheduling, and business rules.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime, date
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.models.event import Event
from app.services.base_service import BaseService


class EventService(BaseService[Event]):
    """
    Service for event-related business logic.
    
    Responsibilities:
    - CRUD operations for events
    - Event scheduling and status management
    - Event filtering by date, status, type
    - Upcoming events logic
    """
    
    def __init__(self, db: Session):
        """Initialize EventService with database session."""
        super().__init__(db)
    
    # ============================================
    # BASIC CRUD OPERATIONS
    # ============================================
    
    def get_by_id(self, event_id: int) -> Optional[Event]:
        """
        Get an event by ID.
        
        Args:
            event_id: Event ID
            
        Returns:
            Event object or None if not found
        """
        return self.db.query(Event).filter(Event.event_id == event_id).first()
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Get all events with pagination.
        
        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return
            
        Returns:
            List of Event objects
        """
        return self.db.query(Event).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    def create(self, **kwargs) -> Event:
        """
        Create a new event.
        
        Args:
            **kwargs: Event attributes
            
        Returns:
            Created Event object
            
        Raises:
            ValueError: If required fields are missing or invalid
        """
        # Validate required fields
        required_fields = ['name', 'event_type', 'description', 'start_date', 'location']
        for field in required_fields:
            if field not in kwargs or not kwargs[field]:
                raise ValueError(f"Missing required field: {field}")
        
        # Validate event_type enum
        valid_types = ['festival', 'fair', 'ceremony', 'cultural']
        if kwargs.get('event_type') not in valid_types:
            raise ValueError(f"Invalid event_type. Must be one of: {valid_types}")
        
        # Validate dates
        start_date = kwargs.get('start_date')
        end_date = kwargs.get('end_date')
        if end_date and end_date < start_date:
            raise ValueError("End date cannot be before start date")
        
        # Auto-set status based on start_date
        if 'status' not in kwargs:
            today = date.today()
            if start_date <= today:
                kwargs['status'] = 'ongoing'
            else:
                kwargs['status'] = 'upcoming'
        
        # Create event
        event = Event(**kwargs)
        self.db.add(event)
        self._commit()
        
        return event
    
    def update(self, event_id: int, **kwargs) -> Optional[Event]:
        """
        Update an event.
        
        Args:
            event_id: Event ID
            **kwargs: Fields to update
            
        Returns:
            Updated Event object or None if not found
        """
        event = self.db.query(Event).filter(Event.event_id == event_id).first()
        if not event:
            return None
        
        # Validate event_type if provided
        if 'event_type' in kwargs:
            valid_types = ['festival', 'fair', 'ceremony', 'cultural']
            if kwargs['event_type'] not in valid_types:
                raise ValueError(f"Invalid event_type. Must be one of: {valid_types}")
        
        # Validate dates if provided
        if 'start_date' in kwargs or 'end_date' in kwargs:
            start_date = kwargs.get('start_date', event.start_date)
            end_date = kwargs.get('end_date', event.end_date)
            if end_date and end_date < start_date:
                raise ValueError("End date cannot be before start date")
        
        # Update fields
        for key, value in kwargs.items():
            if hasattr(event, key) and key != 'event_id':
                setattr(event, key, value)
        
        event.updated_at = datetime.utcnow()
        self._commit()
        
        return event
    
    def delete(self, event_id: int) -> bool:
        """
        Delete an event.
        
        Args:
            event_id: Event ID
            
        Returns:
            True if deleted, False if not found
        """
        event = self.db.query(Event).filter(Event.event_id == event_id).first()
        if not event:
            return False
        
        self.db.delete(event)
        self._commit()
        
        return True
    
    # ============================================
    # STATUS-BASED OPERATIONS
    # ============================================
    
    def get_upcoming_events(self, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Get upcoming events.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of upcoming Event objects
        """
        today = date.today()
        return self.db.query(Event).filter(
            Event.start_date > today
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    def get_ongoing_events(self, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Get currently ongoing events.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of ongoing Event objects
        """
        today = date.today()
        return self.db.query(Event).filter(
            and_(
                Event.start_date <= today,
                or_(Event.end_date == None, Event.end_date >= today)
            )
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    def get_completed_events(self, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Get completed events.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of completed Event objects
        """
        today = date.today()
        return self.db.query(Event).filter(
            Event.end_date < today
        ).order_by(Event.start_date.desc()).offset(skip).limit(limit).all()
    
    def get_events_by_status(self, status: str, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Get events by status.
        
        Args:
            status: Event status (upcoming, ongoing, completed)
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Event objects with status
        """
        valid_statuses = ['upcoming', 'ongoing', 'completed']
        if status not in valid_statuses:
            raise ValueError(f"Invalid status. Must be one of: {valid_statuses}")
        
        return self.db.query(Event).filter(
            Event.status == status
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    # ============================================
    # SEARCH & FILTER OPERATIONS
    # ============================================
    
    def search_by_name(self, name: str, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Search events by name (partial match).
        
        Args:
            name: Search term
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of matching Event objects
        """
        return self.db.query(Event).filter(
            Event.name.ilike(f"%{name}%")
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    def filter_by_type(self, event_type: str, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Filter events by type.
        
        Args:
            event_type: Event type (festival, fair, ceremony, cultural)
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Event objects of type
        """
        return self.db.query(Event).filter(
            Event.event_type == event_type
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    def get_events_by_date_range(self, 
                                 start_date: date,
                                 end_date: date,
                                 skip: int = 0,
                                 limit: int = 100) -> List[Event]:
        """
        Get events within a date range.
        
        Args:
            start_date: Start date
            end_date: End date
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Event objects in date range
        """
        return self.db.query(Event).filter(
            and_(
                Event.start_date >= start_date,
                Event.start_date <= end_date
            )
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    def get_annual_events(self, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Get annual recurring events.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of annual Event objects
        """
        return self.db.query(Event).filter(
            Event.is_annual == True
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    # ============================================
    # FEATURED & METRICS OPERATIONS
    # ============================================
    
    def get_featured_events(self, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Get featured events.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of featured Event objects
        """
        return self.db.query(Event).filter(
            Event.is_featured == True
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    def get_free_events(self, skip: int = 0, limit: int = 100) -> List[Event]:
        """
        Get free entry events.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of free Event objects
        """
        return self.db.query(Event).filter(
            Event.is_free == True
        ).order_by(Event.start_date).offset(skip).limit(limit).all()
    
    def get_events_with_facilities(self,
                                   parking: bool = False,
                                   accommodation: bool = False,
                                   skip: int = 0,
                                   limit: int = 100) -> List[Event]:
        """
        Get events with specific facilities.
        
        Args:
            parking: Has parking
            accommodation: Has nearby accommodation
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Event objects with facilities
        """
        filters = []
        if parking:
            filters.append(Event.parking_available == True)
        if accommodation:
            filters.append(Event.accommodation_nearby == True)
        
        query = self.db.query(Event)
        if filters:
            query = query.filter(and_(*filters))
        
        return query.order_by(Event.start_date).offset(skip).limit(limit).all()
    
    # ============================================
    # BUSINESS LOGIC OPERATIONS
    # ============================================
    
    def update_event_status(self, event_id: int) -> Optional[Event]:
        """
        Auto-update event status based on dates.
        
        Args:
            event_id: Event ID
            
        Returns:
            Updated Event object or None if not found
        """
        event = self.db.query(Event).filter(Event.event_id == event_id).first()
        if not event:
            return None
        
        today = date.today()
        
        if event.end_date and today > event.end_date:
            event.status = 'completed'
        elif event.start_date <= today <= (event.end_date or event.start_date):
            event.status = 'ongoing'
        elif today < event.start_date:
            event.status = 'upcoming'
        
        event.updated_at = datetime.utcnow()
        self._commit()
        
        return event
    
    def toggle_featured(self, event_id: int) -> Optional[Event]:
        """
        Toggle featured status of an event.
        
        Args:
            event_id: Event ID
            
        Returns:
            Updated Event object or None if not found
        """
        event = self.db.query(Event).filter(Event.event_id == event_id).first()
        if not event:
            return None
        
        event.is_featured = not event.is_featured
        event.updated_at = datetime.utcnow()
        self._commit()
        
        return event
    
    def get_event_summary(self, event_id: int) -> Optional[Dict[str, Any]]:
        """
        Get comprehensive event information summary.
        
        Args:
            event_id: Event ID
            
        Returns:
            Dictionary with event summary or None if not found
        """
        event = self.get_by_id(event_id)
        if not event:
            return None
        
        # Update status
        self.update_event_status(event_id)
        event = self.get_by_id(event_id)
        
        return {
            "id": event.event_id,
            "name": event.name,
            "type": event.event_type,
            "status": event.status,
            "location": event.location,
            "is_featured": event.is_featured,
            "dates": {
                "start_date": event.start_date.isoformat(),
                "end_date": event.end_date.isoformat() if event.end_date else None,
                "is_annual": event.is_annual
            },
            "ticket_info": {
                "entry_fee": float(event.entry_fee) if event.entry_fee else 0,
                "is_free": event.is_free
            },
            "facilities": {
                "parking": event.parking_available,
                "accommodation": event.accommodation_nearby
            },
            "contact": {
                "organization": event.organizing_body,
                "contact_person": event.contact_person,
                "phone": event.contact_phone,
                "email": event.contact_email
            }
        }
