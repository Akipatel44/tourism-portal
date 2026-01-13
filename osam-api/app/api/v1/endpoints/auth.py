"""
FastAPI router for authentication endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.models.database import get_db
from app.models.user import User
from app.services.auth_service import AuthService
from app.services.user_service import UserService
from app.schemas.auth import (
    LoginRequest, TokenResponse, UserCreate, UserResponse,
    ChangePasswordRequest, ChangePasswordResponse
)
from app.core.dependencies import get_current_user, get_current_admin

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse, status_code=200)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    Login endpoint for user authentication.
    
    Returns JWT token if credentials are valid.
    """
    auth_service = AuthService(db)
    
    # Authenticate user
    user = auth_service.authenticate_user(login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create token
    token, expires_in = auth_service.create_access_token(
        user_id=user.user_id,
        username=user.username,
        role=user.role
    )
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_in": expires_in,
        "user": {
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        }
    }


@router.post("/register", response_model=UserResponse, status_code=201)
def register(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Register a new user (accessible by anyone).
    
    Default role is 'editor'. Admin accounts must be created by existing admins.
    """
    auth_service = AuthService(db)
    
    try:
        # Prevent regular registration of admin accounts
        if user_data.role == "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin accounts can only be created by existing admins"
            )
        
        user = auth_service.create_user(
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            role=user_data.role
        )
        
        return {
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/admin/create-user", response_model=UserResponse, status_code=201)
def admin_create_user(
    user_data: UserCreate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Create a new user (admin only).
    
    Admins can create users with any role including other admins.
    """
    auth_service = AuthService(db)
    
    try:
        user = auth_service.create_user(
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            role=user_data.role
        )
        
        return {
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at,
            "updated_at": user.updated_at
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/me", response_model=UserResponse)
def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current authenticated user's information."""
    return {
        "user_id": current_user.user_id,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at,
        "updated_at": current_user.updated_at
    }


@router.post("/change-password", response_model=ChangePasswordResponse)
def change_password(
    password_data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Change current user's password."""
    auth_service = AuthService(db)
    
    try:
        auth_service.update_password(
            user_id=current_user.user_id,
            current_password=password_data.current_password,
            new_password=password_data.new_password
        )
        
        return {
            "success": True,
            "message": "Password changed successfully"
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/admin/users/{user_id}/activate", status_code=200)
def admin_activate_user(
    user_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Activate a user (admin only)."""
    user_service = UserService(db)
    
    if not user_service.activate_user(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"success": True, "message": "User activated"}


@router.post("/admin/users/{user_id}/deactivate", status_code=200)
def admin_deactivate_user(
    user_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Deactivate a user (admin only)."""
    user_service = UserService(db)
    
    if not user_service.deactivate_user(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"success": True, "message": "User deactivated"}


@router.post("/admin/users/{user_id}/promote", status_code=200)
def admin_promote_user(
    user_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Promote user to admin (admin only)."""
    user_service = UserService(db)
    
    if not user_service.promote_to_admin(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"success": True, "message": "User promoted to admin"}


@router.post("/admin/users/{user_id}/demote", status_code=200)
def admin_demote_user(
    user_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Demote user to editor (admin only)."""
    user_service = UserService(db)
    
    if not user_service.demote_to_editor(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"success": True, "message": "User demoted to editor"}


@router.get("/admin/users", status_code=200)
def admin_list_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """List all users (admin only)."""
    user_service = UserService(db)
    users = user_service.get_all(skip=skip, limit=limit)
    
    return [
        {
            "user_id": u.user_id,
            "username": u.username,
            "email": u.email,
            "role": u.role,
            "is_active": u.is_active,
            "created_at": u.created_at,
            "updated_at": u.updated_at
        }
        for u in users
    ]


@router.delete("/admin/users/{user_id}", status_code=204)
def admin_delete_user(
    user_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Delete a user (admin only)."""
    # Prevent admin self-deletion
    if user_id == current_user.user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    user_service = UserService(db)
    if not user_service.delete(user_id):
        raise HTTPException(status_code=404, detail="User not found")
    
    return None


@router.post("/logout", status_code=200)
def logout(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Logout endpoint (can be extended with token blacklisting).
    
    Currently just returns success. In production, implement token blacklist.
    """
    return {"success": True, "message": "Logged out successfully"}
