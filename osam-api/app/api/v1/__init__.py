"""
API v1 router combining all endpoints.
"""

from fastapi import APIRouter
from app.api.v1.endpoints import places, events, galleries, auth

# Create main v1 router
router = APIRouter(prefix="/api/v1")

# Include all endpoint routers
router.include_router(auth.router)  # Auth routes at /api/v1/auth
router.include_router(places.router)
router.include_router(events.router)
router.include_router(galleries.router)
