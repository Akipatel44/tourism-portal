"""
Gallery request/response schemas for FastAPI validation and documentation.
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
from datetime import datetime


class GalleryImageCreate(BaseModel):
    """Schema for adding image to gallery."""
    
    image_url: str = Field(..., max_length=500, description="URL to image")
    thumbnail_url: Optional[str] = Field(None, max_length=500, description="URL to thumbnail")
    title: Optional[str] = Field(None, max_length=255, description="Image title")
    caption: Optional[str] = Field(None, max_length=1000, description="Image caption")
    photographer: Optional[str] = Field(None, max_length=255, description="Photographer name")
    image_order: int = Field(default=0, ge=0, description="Display order")

    class Config:
        json_schema_extra = {
            "example": {
                "image_url": "/images/osam_hill_1.jpg",
                "thumbnail_url": "/images/osam_hill_1_thumb.jpg",
                "title": "Osam Hill Sunrise",
                "photographer": "John Doe",
                "image_order": 1
            }
        }


class GalleryImageResponse(BaseModel):
    """Schema for gallery image response."""
    
    image_id: int
    image_url: str
    thumbnail_url: Optional[str]
    title: Optional[str]
    caption: Optional[str]
    photographer: Optional[str]
    image_order: int
    is_featured: bool
    view_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class GalleryCreate(BaseModel):
    """Schema for creating a new gallery."""
    
    name: str = Field(..., min_length=1, max_length=255, description="Gallery name")
    description: Optional[str] = Field(None, max_length=1000, description="Gallery description")
    gallery_type: str = Field(..., description="photos, videos, 360photos")
    place_id: Optional[int] = Field(None, description="Associated place ID")
    temple_id: Optional[int] = Field(None, description="Associated temple ID")
    site_id: Optional[int] = Field(None, description="Associated mythological site ID")
    event_id: Optional[int] = Field(None, description="Associated event ID")

    @validator('gallery_type')
    def validate_gallery_type(cls, v):
        valid_types = ['photos', 'videos', '360photos']
        if v not in valid_types:
            raise ValueError(f'Gallery type must be one of {valid_types}')
        return v

    @validator('*', pre=True)
    def check_at_least_one_association(cls, v, values):
        # Check after all fields are validated
        if 'gallery_type' in values:
            associations = [values.get('place_id'), values.get('temple_id'), 
                          values.get('site_id'), values.get('event_id')]
            if all(a is None for a in associations):
                raise ValueError('Gallery must be associated with at least one content type (place, temple, site, or event)')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Osam Hill Photo Collection",
                "gallery_type": "photos",
                "place_id": 1,
                "description": "Beautiful photos of Osam Hill"
            }
        }


class GalleryUpdate(BaseModel):
    """Schema for updating a gallery (all fields optional)."""
    
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    gallery_type: Optional[str] = Field(None)
    is_featured: Optional[bool] = Field(None)

    @validator('gallery_type')
    def validate_gallery_type(cls, v):
        if v is None:
            return v
        valid_types = ['photos', 'videos', '360photos']
        if v not in valid_types:
            raise ValueError(f'Gallery type must be one of {valid_types}')
        return v


class GalleryResponse(BaseModel):
    """Schema for gallery response with details and images."""
    
    gallery_id: int
    name: str
    description: Optional[str]
    gallery_type: str
    place_id: Optional[int]
    temple_id: Optional[int]
    site_id: Optional[int]
    event_id: Optional[int]
    is_featured: bool
    view_count: int
    created_at: datetime
    updated_at: datetime
    images: List[GalleryImageResponse] = []

    class Config:
        from_attributes = True


class GalleryListResponse(BaseModel):
    """Schema for gallery list response (without images)."""
    
    gallery_id: int
    name: str
    gallery_type: str
    place_id: Optional[int]
    temple_id: Optional[int]
    site_id: Optional[int]
    event_id: Optional[int]
    is_featured: bool
    view_count: int
    image_count: int = 0

    class Config:
        from_attributes = True


class GalleryStatisticsResponse(BaseModel):
    """Schema for gallery statistics."""
    
    gallery_id: int
    name: str
    image_count: int
    view_count: int
    total_image_views: int
    is_featured: bool
    featured_image: Optional[GalleryImageResponse]

    class Config:
        from_attributes = True


class ReorderImagesRequest(BaseModel):
    """Schema for reordering gallery images."""
    
    image_order: Dict[int, int] = Field(..., description="Mapping of image_id to new order")

    class Config:
        json_schema_extra = {
            "example": {
                "image_order": {
                    "1": 2,
                    "2": 1,
                    "3": 3
                }
            }
        }
