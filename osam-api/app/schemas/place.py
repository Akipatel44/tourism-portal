"""
Place request/response schemas for FastAPI validation and documentation.
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime


class PlaceCreate(BaseModel):
    """Schema for creating a new place."""
    
    name: str = Field(..., min_length=1, max_length=255, description="Place name")
    description: Optional[str] = Field(None, max_length=2000, description="Detailed description")
    location: str = Field(..., min_length=1, max_length=255, description="Location/address")
    category: str = Field(..., description="Category: place, landmark, viewpoint, parking")
    latitude: Optional[float] = Field(None, description="Latitude coordinate")
    longitude: Optional[float] = Field(None, description="Longitude coordinate")
    elevation_meters: Optional[int] = Field(None, description="Elevation in meters")
    entry_fee: Optional[float] = Field(None, ge=0, description="Entry fee in currency")
    accessibility_level: Optional[str] = Field(None, description="easily_accessible, moderately_accessible, difficult_to_access")
    has_parking: bool = Field(False, description="Has parking facility")
    has_restrooms: bool = Field(False, description="Has restroom facilities")
    has_food: bool = Field(False, description="Has food options")
    best_time_to_visit: Optional[str] = Field(None, max_length=500, description="Best time recommendations")

    @validator('category')
    def validate_category(cls, v):
        valid_categories = ['place', 'landmark', 'viewpoint', 'parking']
        if v not in valid_categories:
            raise ValueError(f'Category must be one of {valid_categories}')
        return v

    @validator('accessibility_level')
    def validate_accessibility(cls, v):
        if v is None:
            return v
        valid_levels = ['easily_accessible', 'moderately_accessible', 'difficult_to_access']
        if v not in valid_levels:
            raise ValueError(f'Accessibility level must be one of {valid_levels}')
        return v

    class Config:
        schema_extra = {
            "example": {
                "name": "Osam Hill",
                "description": "Beautiful hill with scenic views",
                "location": "Chichod Village, Gujarat",
                "category": "landmark",
                "latitude": 23.5505,
                "longitude": 72.5363,
                "entry_fee": 0,
                "has_parking": True,
                "has_restrooms": True,
                "has_food": False
            }
        }


class PlaceUpdate(BaseModel):
    """Schema for updating a place (all fields optional)."""
    
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    location: Optional[str] = Field(None, min_length=1, max_length=255)
    category: Optional[str] = Field(None)
    latitude: Optional[float] = Field(None)
    longitude: Optional[float] = Field(None)
    elevation_meters: Optional[int] = Field(None)
    entry_fee: Optional[float] = Field(None, ge=0)
    accessibility_level: Optional[str] = Field(None)
    has_parking: Optional[bool] = Field(None)
    has_restrooms: Optional[bool] = Field(None)
    has_food: Optional[bool] = Field(None)
    best_time_to_visit: Optional[str] = Field(None, max_length=500)
    is_featured: Optional[bool] = Field(None)

    @validator('category')
    def validate_category(cls, v):
        if v is None:
            return v
        valid_categories = ['place', 'landmark', 'viewpoint', 'parking']
        if v not in valid_categories:
            raise ValueError(f'Category must be one of {valid_categories}')
        return v

    @validator('accessibility_level')
    def validate_accessibility(cls, v):
        if v is None:
            return v
        valid_levels = ['easily_accessible', 'moderately_accessible', 'difficult_to_access']
        if v not in valid_levels:
            raise ValueError(f'Accessibility level must be one of {valid_levels}')
        return v


class PlaceResponse(BaseModel):
    """Schema for place response with all details."""
    
    place_id: int
    name: str
    description: Optional[str]
    location: str
    category: str
    latitude: Optional[float]
    longitude: Optional[float]
    elevation_meters: Optional[int]
    entry_fee: Optional[float]
    accessibility_level: Optional[str]
    has_parking: bool
    has_restrooms: bool
    has_food: bool
    best_time_to_visit: Optional[str]
    view_count: int
    is_featured: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PlaceListResponse(BaseModel):
    """Schema for list of places (without full details)."""
    
    place_id: int
    name: str
    location: str
    category: str
    latitude: Optional[float]
    longitude: Optional[float]
    entry_fee: Optional[float]
    has_parking: bool
    has_restrooms: bool
    is_featured: bool
    view_count: int

    class Config:
        from_attributes = True
