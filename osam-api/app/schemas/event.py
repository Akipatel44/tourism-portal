"""
Event request/response schemas for FastAPI validation and documentation.
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime, date, time


class EventCreate(BaseModel):
    """Schema for creating a new event."""
    
    name: str = Field(..., min_length=1, max_length=255, description="Event name")
    description: Optional[str] = Field(None, max_length=2000, description="Detailed description")
    event_type: str = Field(..., description="festival, fair, ceremony, cultural")
    location: str = Field(..., min_length=1, max_length=255, description="Event location")
    start_date: date = Field(..., description="Event start date")
    end_date: date = Field(..., description="Event end date")
    start_time: Optional[time] = Field(None, description="Event start time")
    end_time: Optional[time] = Field(None, description="Event end time")
    is_annual: bool = Field(False, description="Recurring annual event")
    is_free: bool = Field(True, description="Free or paid event")
    entry_fee: Optional[float] = Field(None, ge=0, description="Entry fee if paid")
    organizing_body: Optional[str] = Field(None, max_length=255, description="Organizing organization")
    contact_person: Optional[str] = Field(None, max_length=255, description="Contact person name")
    phone: Optional[str] = Field(None, max_length=20, description="Contact phone")
    email: Optional[str] = Field(None, max_length=255, description="Contact email")
    has_parking: bool = Field(False, description="Has parking")
    has_accommodation: bool = Field(False, description="Has accommodation")

    @validator('event_type')
    def validate_event_type(cls, v):
        valid_types = ['festival', 'fair', 'ceremony', 'cultural']
        if v not in valid_types:
            raise ValueError(f'Event type must be one of {valid_types}')
        return v

    @validator('end_date')
    def validate_date_range(cls, v, values):
        if 'start_date' in values and v < values['start_date']:
            raise ValueError('end_date must be >= start_date')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Janmashtami Festival",
                "description": "Celebration of Lord Krishna's birth",
                "event_type": "festival",
                "location": "Osam Temple",
                "start_date": "2024-09-07",
                "end_date": "2024-09-08",
                "is_annual": True,
                "is_free": True,
                "has_parking": True
            }
        }


class EventUpdate(BaseModel):
    """Schema for updating an event (all fields optional)."""
    
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    event_type: Optional[str] = Field(None)
    location: Optional[str] = Field(None, min_length=1, max_length=255)
    start_date: Optional[date] = Field(None)
    end_date: Optional[date] = Field(None)
    start_time: Optional[time] = Field(None)
    end_time: Optional[time] = Field(None)
    is_annual: Optional[bool] = Field(None)
    is_free: Optional[bool] = Field(None)
    entry_fee: Optional[float] = Field(None, ge=0)
    organizing_body: Optional[str] = Field(None, max_length=255)
    contact_person: Optional[str] = Field(None, max_length=255)
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=255)
    has_parking: Optional[bool] = Field(None)
    has_accommodation: Optional[bool] = Field(None)
    is_featured: Optional[bool] = Field(None)

    @validator('event_type')
    def validate_event_type(cls, v):
        if v is None:
            return v
        valid_types = ['festival', 'fair', 'ceremony', 'cultural']
        if v not in valid_types:
            raise ValueError(f'Event type must be one of {valid_types}')
        return v


class EventResponse(BaseModel):
    """Schema for event response with all details."""
    
    event_id: int
    name: str
    description: Optional[str]
    event_type: str
    location: str
    start_date: date
    end_date: date
    start_time: Optional[time]
    end_time: Optional[time]
    status: str  # upcoming, ongoing, completed
    is_annual: bool
    is_free: bool
    entry_fee: Optional[float]
    organizing_body: Optional[str]
    contact_person: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    has_parking: bool
    has_accommodation: bool
    is_featured: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class EventListResponse(BaseModel):
    """Schema for event list response (without full details)."""
    
    event_id: int
    name: str
    event_type: str
    location: str
    start_date: date
    end_date: date
    status: str
    is_annual: bool
    is_free: bool
    entry_fee: Optional[float]
    is_featured: bool

    class Config:
        from_attributes = True
