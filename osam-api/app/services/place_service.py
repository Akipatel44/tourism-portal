"""
Place Service - Business logic for places and attractions.
Handles place-related operations, filtering, and business rules.
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.models.place import Place
from app.services.base_service import BaseService


class PlaceService(BaseService[Place]):
    """
    Service for place-related business logic.
    
    Responsibilities:
    - CRUD operations for places
    - Filtering and searching places
    - Place statistics and metrics
    - Business rule validation
    """
    
    def __init__(self, db: Session):
        """Initialize PlaceService with database session."""
        super().__init__(db)
    
    # ============================================
    # BASIC CRUD OPERATIONS
    # ============================================
    
    def get_by_id(self, place_id: int) -> Optional[Place]:
        """
        Get a place by ID.
        
        Args:
            place_id: Place ID
            
        Returns:
            Place object or None if not found
        """
        place = self.db.query(Place).filter(Place.place_id == place_id).first()
        
        if place:
            # Increment view count
            place.view_count += 1
            self._commit()
        
        return place
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Place]:
        """
        Get all places with pagination.
        
        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return
            
        Returns:
            List of Place objects
        """
        return self.db.query(Place).offset(skip).limit(limit).all()
    
    def create(self, **kwargs) -> Place:
        """
        Create a new place.
        
        Args:
            **kwargs: Place attributes
            
        Returns:
            Created Place object
            
        Raises:
            ValueError: If required fields are missing
        """
        # Validate required fields
        required_fields = ['name', 'description', 'location', 'category']
        for field in required_fields:
            if field not in kwargs or not kwargs[field]:
                raise ValueError(f"Missing required field: {field}")
        
        # Validate category enum
        valid_categories = ['place', 'landmark', 'viewpoint', 'parking']
        if kwargs.get('category') not in valid_categories:
            raise ValueError(f"Invalid category. Must be one of: {valid_categories}")
        
        # Create place
        place = Place(**kwargs)
        self.db.add(place)
        self._commit()
        
        return place
    
    def update(self, place_id: int, **kwargs) -> Optional[Place]:
        """
        Update a place.
        
        Args:
            place_id: Place ID
            **kwargs: Fields to update
            
        Returns:
            Updated Place object or None if not found
        """
        place = self.get_by_id(place_id)
        if not place:
            return None
        
        # Validate category if provided
        if 'category' in kwargs:
            valid_categories = ['place', 'landmark', 'viewpoint', 'parking']
            if kwargs['category'] not in valid_categories:
                raise ValueError(f"Invalid category. Must be one of: {valid_categories}")
        
        # Update fields
        for key, value in kwargs.items():
            if hasattr(place, key) and key != 'place_id':
                setattr(place, key, value)
        
        place.updated_at = datetime.utcnow()
        self._commit()
        
        return place
    
    def delete(self, place_id: int) -> bool:
        """
        Delete a place.
        
        Args:
            place_id: Place ID
            
        Returns:
            True if deleted, False if not found
        """
        place = self.db.query(Place).filter(Place.place_id == place_id).first()
        if not place:
            return False
        
        self.db.delete(place)
        self._commit()
        
        return True
    
    # ============================================
    # SEARCH & FILTER OPERATIONS
    # ============================================
    
    def search_by_name(self, name: str, skip: int = 0, limit: int = 100) -> List[Place]:
        """
        Search places by name (partial match).
        
        Args:
            name: Search term
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of matching Place objects
        """
        return self.db.query(Place).filter(
            Place.name.ilike(f"%{name}%")
        ).offset(skip).limit(limit).all()
    
    def filter_by_category(self, category: str, skip: int = 0, limit: int = 100) -> List[Place]:
        """
        Filter places by category.
        
        Args:
            category: Category type
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Place objects in category
        """
        return self.db.query(Place).filter(
            Place.category == category
        ).offset(skip).limit(limit).all()
    
    def filter_by_accessibility(self, accessibility: str, skip: int = 0, limit: int = 100) -> List[Place]:
        """
        Filter places by accessibility level.
        
        Args:
            accessibility: Accessibility level (easily_accessible, moderate, difficult)
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Place objects
        """
        return self.db.query(Place).filter(
            Place.accessibility == accessibility
        ).offset(skip).limit(limit).all()
    
    def get_places_by_location(self, location: str, skip: int = 0, limit: int = 100) -> List[Place]:
        """
        Get places by location (partial match).
        
        Args:
            location: Location string
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Place objects
        """
        return self.db.query(Place).filter(
            Place.location.ilike(f"%{location}%")
        ).offset(skip).limit(limit).all()
    
    # ============================================
    # FEATURED & METRICS OPERATIONS
    # ============================================
    
    def get_featured_places(self, skip: int = 0, limit: int = 100) -> List[Place]:
        """
        Get featured places.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of featured Place objects
        """
        return self.db.query(Place).filter(
            Place.is_featured == True
        ).order_by(Place.view_count.desc()).offset(skip).limit(limit).all()
    
    def get_popular_places(self, min_views: int = 100, skip: int = 0, limit: int = 100) -> List[Place]:
        """
        Get popular places by view count.
        
        Args:
            min_views: Minimum view count
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of popular Place objects
        """
        return self.db.query(Place).filter(
            Place.view_count >= min_views
        ).order_by(Place.view_count.desc()).offset(skip).limit(limit).all()
    
    def get_free_places(self, skip: int = 0, limit: int = 100) -> List[Place]:
        """
        Get places with no entry fee.
        
        Args:
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of free Place objects
        """
        return self.db.query(Place).filter(
            or_(Place.entry_fee == None, Place.entry_fee == 0)
        ).offset(skip).limit(limit).all()
    
    def get_places_with_facilities(self, 
                                   parking: bool = False,
                                   restrooms: bool = False,
                                   food: bool = False,
                                   skip: int = 0,
                                   limit: int = 100) -> List[Place]:
        """
        Get places with specific facilities.
        
        Args:
            parking: Has parking
            restrooms: Has restrooms
            food: Has nearby food
            skip: Pagination offset
            limit: Pagination limit
            
        Returns:
            List of Place objects matching criteria
        """
        filters = []
        if parking:
            filters.append(Place.parking_available == True)
        if restrooms:
            filters.append(Place.public_restrooms == True)
        if food:
            filters.append(Place.food_nearby == True)
        
        query = self.db.query(Place)
        if filters:
            query = query.filter(and_(*filters))
        
        return query.offset(skip).limit(limit).all()
    
    # ============================================
    # BUSINESS LOGIC OPERATIONS
    # ============================================
    
    def toggle_featured(self, place_id: int) -> Optional[Place]:
        """
        Toggle featured status of a place.
        
        Args:
            place_id: Place ID
            
        Returns:
            Updated Place object or None if not found
        """
        place = self.db.query(Place).filter(Place.place_id == place_id).first()
        if not place:
            return None
        
        place.is_featured = not place.is_featured
        place.updated_at = datetime.utcnow()
        self._commit()
        
        return place
    
    def get_entry_fee_display(self, place_id: int) -> Optional[Dict[str, Any]]:
        """
        Get entry fee information with currency.
        
        Args:
            place_id: Place ID
            
        Returns:
            Dictionary with fee and currency or None if not found
        """
        place = self.db.query(Place).filter(Place.place_id == place_id).first()
        if not place:
            return None
        
        return {
            "amount": float(place.entry_fee or 0),
            "currency": place.entry_fee_currency or "INR",
            "is_free": (place.entry_fee is None or place.entry_fee == 0)
        }
    
    def get_place_summary(self, place_id: int) -> Optional[Dict[str, Any]]:
        """
        Get comprehensive place information summary.
        
        Args:
            place_id: Place ID
            
        Returns:
            Dictionary with place summary or None if not found
        """
        place = self.get_by_id(place_id)
        if not place:
            return None
        
        return {
            "id": place.place_id,
            "name": place.name,
            "category": place.category,
            "location": place.location,
            "accessibility": place.accessibility,
            "view_count": place.view_count,
            "is_featured": place.is_featured,
            "facilities": {
                "parking": place.parking_available,
                "restrooms": place.public_restrooms,
                "food": place.food_nearby
            },
            "visit_info": {
                "duration_hours": place.average_visit_duration_hours,
                "best_season": place.best_time_to_visit,
                "entry_fee": float(place.entry_fee) if place.entry_fee else 0,
                "currency": place.entry_fee_currency
            }
        }
