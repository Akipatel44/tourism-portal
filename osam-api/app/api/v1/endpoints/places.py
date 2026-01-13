"""
FastAPI router for Place endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from app.models.database import get_db
from app.models.user import User
from app.services.place_service import PlaceService
from app.schemas.place import PlaceCreate, PlaceUpdate, PlaceResponse, PlaceListResponse
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/places", tags=["places"])


@router.post("/", response_model=PlaceResponse, status_code=201)
def create_place(
    place_data: PlaceCreate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Create a new place (admin only)."""
    service = PlaceService(db)
    try:
        place = service.create(**place_data.dict())
        return place
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create place")


@router.get("/{place_id}", response_model=PlaceResponse)
def get_place(
    place_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific place by ID."""
    service = PlaceService(db)
    place = service.get_by_id(place_id)
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    return place


@router.get("/", response_model=List[PlaceListResponse])
def list_places(
    skip: int = Query(0, ge=0, description="Number of places to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum places to return"),
    db: Session = Depends(get_db)
):
    """List all places with pagination."""
    service = PlaceService(db)
    return service.get_all(skip=skip, limit=limit)


@router.get("/search/by-name", response_model=List[PlaceListResponse])
def search_places_by_name(
    query: str = Query(..., min_length=1, description="Search query"),
    db: Session = Depends(get_db)
):
    """Search places by name."""
    service = PlaceService(db)
    results = service.search_by_name(query)
    if not results:
        raise HTTPException(status_code=404, detail="No places found matching query")
    return results


@router.get("/filter/by-category", response_model=List[PlaceListResponse])
def filter_places_by_category(
    category: str = Query(..., description="Category: place, landmark, viewpoint, parking"),
    db: Session = Depends(get_db)
):
    """Filter places by category."""
    service = PlaceService(db)
    try:
        results = service.filter_by_category(category)
        if not results:
            raise HTTPException(status_code=404, detail="No places found in this category")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/filter/by-accessibility", response_model=List[PlaceListResponse])
def filter_places_by_accessibility(
    level: str = Query(..., description="Accessibility: easily_accessible, moderately_accessible, difficult_to_access"),
    db: Session = Depends(get_db)
):
    """Filter places by accessibility level."""
    service = PlaceService(db)
    try:
        results = service.filter_by_accessibility(level)
        if not results:
            raise HTTPException(status_code=404, detail="No places found with this accessibility level")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/filter/by-location", response_model=List[PlaceListResponse])
def get_places_by_location(
    location: str = Query(..., min_length=1, description="Location name"),
    db: Session = Depends(get_db)
):
    """Get places by location."""
    service = PlaceService(db)
    results = service.get_places_by_location(location)
    if not results:
        raise HTTPException(status_code=404, detail="No places found in this location")
    return results


@router.get("/featured/", response_model=List[PlaceListResponse])
def get_featured_places(
    db: Session = Depends(get_db)
):
    """Get featured places."""
    service = PlaceService(db)
    results = service.get_featured_places()
    if not results:
        raise HTTPException(status_code=404, detail="No featured places found")
    return results


@router.get("/popular/", response_model=List[PlaceListResponse])
def get_popular_places(
    min_views: int = Query(100, ge=0, description="Minimum view count"),
    db: Session = Depends(get_db)
):
    """Get popular places by view count."""
    service = PlaceService(db)
    results = service.get_popular_places(min_views=min_views)
    if not results:
        raise HTTPException(status_code=404, detail="No popular places found with the specified criteria")
    return results


@router.get("/free/", response_model=List[PlaceListResponse])
def get_free_places(
    db: Session = Depends(get_db)
):
    """Get places with free entry."""
    service = PlaceService(db)
    results = service.get_free_places()
    if not results:
        raise HTTPException(status_code=404, detail="No free places found")
    return results


@router.get("/with-facilities/", response_model=List[PlaceListResponse])
def get_places_with_facilities(
    parking: bool = Query(False, description="Has parking"),
    restrooms: bool = Query(False, description="Has restrooms"),
    food: bool = Query(False, description="Has food options"),
    db: Session = Depends(get_db)
):
    """Get places with specific facilities."""
    service = PlaceService(db)
    try:
        results = service.get_places_with_facilities(
            parking=parking,
            restrooms=restrooms,
            food=food
        )
        if not results:
            raise HTTPException(status_code=404, detail="No places found with the specified facilities")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/{place_id}", response_model=PlaceResponse)
def update_place(
    place_id: int,
    place_data: PlaceUpdate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Update a place (admin only)."""
    service = PlaceService(db)
    try:
        place = service.update(place_id, **place_data.dict(exclude_unset=True))
        if not place:
            raise HTTPException(status_code=404, detail="Place not found")
        return place
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{place_id}", status_code=204)
def delete_place(
    place_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Delete a place (admin only)."""
    service = PlaceService(db)
    success = service.delete(place_id)
    if not success:
        raise HTTPException(status_code=404, detail="Place not found")
    return None


@router.post("/{place_id}/featured", status_code=200)
def toggle_place_featured(
    place_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Toggle featured status for a place (admin only)."""
    service = PlaceService(db)
    try:
        result = service.toggle_featured(place_id)
        if not result:
            raise HTTPException(status_code=404, detail="Place not found")
        return {"success": True, "is_featured": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{place_id}/summary", response_model=dict)
def get_place_summary(
    place_id: int,
    db: Session = Depends(get_db)
):
    """Get comprehensive summary for a place."""
    service = PlaceService(db)
    try:
        summary = service.get_place_summary(place_id)
        if not summary:
            raise HTTPException(status_code=404, detail="Place not found")
        return summary
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{place_id}/entry-fee", response_model=dict)
def get_entry_fee_display(
    place_id: int,
    db: Session = Depends(get_db)
):
    """Get entry fee display information."""
    service = PlaceService(db)
    try:
        fee_info = service.get_entry_fee_display(place_id)
        if not fee_info:
            raise HTTPException(status_code=404, detail="Place not found")
        return fee_info
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
