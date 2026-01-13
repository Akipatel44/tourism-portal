"""
Authentication schemas for FastAPI validation.
"""

from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
from datetime import datetime


class LoginRequest(BaseModel):
    """Schema for user login request."""
    
    username: str = Field(..., min_length=3, max_length=255, description="Username")
    password: str = Field(..., min_length=6, max_length=255, description="Password")

    class Config:
        json_schema_extra = {
            "example": {
                "username": "admin",
                "password": "securepassword123"
            }
        }


class TokenResponse(BaseModel):
    """Schema for JWT token response."""
    
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(default="bearer", description="Token type (always 'bearer')")
    expires_in: int = Field(..., description="Token expiration in seconds")
    user: Optional["UserResponse"] = Field(None, description="Current user info")

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "expires_in": 3600,
                "user": {
                    "user_id": 1,
                    "username": "admin",
                    "email": "admin@example.com",
                    "role": "admin"
                }
            }
        }


class UserCreate(BaseModel):
    """Schema for creating a new user."""
    
    username: str = Field(..., min_length=3, max_length=255, description="Username (unique)")
    email: EmailStr = Field(..., description="Email address (unique)")
    password: str = Field(..., min_length=6, max_length=255, description="Password")
    role: str = Field(default="editor", description="Role: admin or editor")

    @validator('role')
    def validate_role(cls, v):
        valid_roles = ['admin', 'editor']
        if v not in valid_roles:
            raise ValueError(f'Role must be one of {valid_roles}')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "username": "admin",
                "email": "admin@example.com",
                "password": "securepassword123",
                "role": "admin"
            }
        }


class UserUpdate(BaseModel):
    """Schema for updating user."""
    
    username: Optional[str] = Field(None, min_length=3, max_length=255)
    email: Optional[EmailStr] = Field(None)
    password: Optional[str] = Field(None, min_length=6, max_length=255)
    role: Optional[str] = Field(None)
    is_active: Optional[bool] = Field(None)

    @validator('role')
    def validate_role(cls, v):
        if v is None:
            return v
        valid_roles = ['admin', 'editor']
        if v not in valid_roles:
            raise ValueError(f'Role must be one of {valid_roles}')
        return v


class UserResponse(BaseModel):
    """Schema for user response (no password)."""
    
    user_id: int
    username: str
    email: str
    role: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

        json_schema_extra = {
            "example": {
                "user_id": 1,
                "username": "admin",
                "email": "admin@example.com",
                "role": "admin",
                "is_active": True,
                "created_at": "2024-01-13T12:00:00",
                "updated_at": "2024-01-13T12:00:00"
            }
        }


class ChangePasswordRequest(BaseModel):
    """Schema for changing user password."""
    
    current_password: str = Field(..., min_length=6, description="Current password")
    new_password: str = Field(..., min_length=6, max_length=255, description="New password")
    confirm_password: str = Field(..., min_length=6, max_length=255, description="Confirm new password")

    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'new_password' in values and v != values['new_password']:
            raise ValueError('Passwords do not match')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "current_password": "oldpassword123",
                "new_password": "newpassword456",
                "confirm_password": "newpassword456"
            }
        }


class ChangePasswordResponse(BaseModel):
    """Schema for password change response."""
    
    success: bool
    message: str

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "message": "Password changed successfully"
            }
        }
