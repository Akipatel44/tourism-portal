"""
Shared schemas used across multiple endpoints.
"""

from pydantic import BaseModel, Field
from typing import List, Generic, TypeVar, Optional

T = TypeVar('T')


class PaginatedResponse(BaseModel, Generic[T]):
    """Generic paginated response wrapper."""
    
    skip: int = Field(description="Number of items skipped")
    limit: int = Field(description="Limit per page")
    total: int = Field(description="Total items available")
    items: List[T] = Field(description="Items in this page")


class ErrorResponse(BaseModel):
    """Standard error response."""
    
    detail: str = Field(description="Error message")
    error_code: Optional[str] = Field(None, description="Error code for client handling")

    class Config:
        schema_extra = {
            "example": {
                "detail": "Place not found",
                "error_code": "PLACE_NOT_FOUND"
            }
        }


class SuccessResponse(BaseModel):
    """Standard success response for operations."""
    
    success: bool = Field(default=True, description="Operation success status")
    message: str = Field(description="Success message")

    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "message": "Place created successfully"
            }
        }
