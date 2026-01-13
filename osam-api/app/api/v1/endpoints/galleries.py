"""
FastAPI router for Gallery endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from app.models.database import get_db
from app.models.user import User
from app.services.gallery_service import GalleryService
from app.schemas.gallery import (
    GalleryCreate, GalleryUpdate, GalleryResponse, GalleryListResponse,
    GalleryImageCreate, GalleryImageResponse, ReorderImagesRequest,
    GalleryStatisticsResponse
)
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/galleries", tags=["galleries"])


@router.post("/", response_model=GalleryResponse, status_code=201)
def create_gallery(
    gallery_data: GalleryCreate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Create a new gallery (admin only)."""
    service = GalleryService(db)
    try:
        gallery = service.create(**gallery_data.dict())
        return gallery
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create gallery")


@router.get("/{gallery_id}", response_model=GalleryResponse)
def get_gallery(
    gallery_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific gallery by ID with all images."""
    service = GalleryService(db)
    gallery = service.get_by_id(gallery_id)
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")
    return gallery


@router.get("/", response_model=List[GalleryListResponse])
def list_galleries(
    skip: int = Query(0, ge=0, description="Number of galleries to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum galleries to return"),
    db: Session = Depends(get_db)
):
    """List all galleries with pagination."""
    service = GalleryService(db)
    return service.get_all(skip=skip, limit=limit)


@router.get("/search/by-name", response_model=List[GalleryListResponse])
def search_galleries_by_name(
    query: str = Query(..., min_length=1, description="Search query"),
    db: Session = Depends(get_db)
):
    """Search galleries by name."""
    service = GalleryService(db)
    results = service.search_galleries_by_name(query)
    if not results:
        raise HTTPException(status_code=404, detail="No galleries found matching query")
    return results


@router.get("/filter/by-type", response_model=List[GalleryListResponse])
def filter_galleries_by_type(
    gallery_type: str = Query(..., description="Type: photos, videos, 360photos"),
    db: Session = Depends(get_db)
):
    """Filter galleries by type."""
    service = GalleryService(db)
    try:
        results = service.filter_by_type(gallery_type)
        if not results:
            raise HTTPException(status_code=404, detail="No galleries found of this type")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/for-place/{place_id}", response_model=List[GalleryListResponse])
def get_galleries_for_place(
    place_id: int,
    db: Session = Depends(get_db)
):
    """Get all galleries for a place."""
    service = GalleryService(db)
    results = service.get_galleries_for_place(place_id)
    if not results:
        raise HTTPException(status_code=404, detail="No galleries found for this place")
    return results


@router.get("/for-temple/{temple_id}", response_model=List[GalleryListResponse])
def get_galleries_for_temple(
    temple_id: int,
    db: Session = Depends(get_db)
):
    """Get all galleries for a temple."""
    service = GalleryService(db)
    results = service.get_galleries_for_temple(temple_id)
    if not results:
        raise HTTPException(status_code=404, detail="No galleries found for this temple")
    return results


@router.get("/for-site/{site_id}", response_model=List[GalleryListResponse])
def get_galleries_for_site(
    site_id: int,
    db: Session = Depends(get_db)
):
    """Get all galleries for a mythological site."""
    service = GalleryService(db)
    results = service.get_galleries_for_site(site_id)
    if not results:
        raise HTTPException(status_code=404, detail="No galleries found for this site")
    return results


@router.get("/for-event/{event_id}", response_model=List[GalleryListResponse])
def get_galleries_for_event(
    event_id: int,
    db: Session = Depends(get_db)
):
    """Get all galleries for an event."""
    service = GalleryService(db)
    results = service.get_galleries_for_event(event_id)
    if not results:
        raise HTTPException(status_code=404, detail="No galleries found for this event")
    return results


@router.get("/featured/", response_model=List[GalleryListResponse])
def get_featured_galleries(
    db: Session = Depends(get_db)
):
    """Get featured galleries."""
    service = GalleryService(db)
    results = service.get_featured_galleries()
    if not results:
        raise HTTPException(status_code=404, detail="No featured galleries found")
    return results


@router.get("/popular/", response_model=List[GalleryListResponse])
def get_popular_galleries(
    min_views: int = Query(50, ge=0, description="Minimum view count"),
    db: Session = Depends(get_db)
):
    """Get popular galleries by view count."""
    service = GalleryService(db)
    results = service.get_popular_galleries(min_views=min_views)
    if not results:
        raise HTTPException(status_code=404, detail="No popular galleries found with the specified criteria")
    return results


@router.patch("/{gallery_id}", response_model=GalleryResponse)
def update_gallery(
    gallery_id: int,
    gallery_data: GalleryUpdate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Update a gallery (admin only)."""
    service = GalleryService(db)
    try:
        gallery = service.update(gallery_id, **gallery_data.dict(exclude_unset=True))
        if not gallery:
            raise HTTPException(status_code=404, detail="Gallery not found")
        return gallery
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{gallery_id}", status_code=204)
def delete_gallery(
    gallery_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Delete a gallery (admin only)."""
    service = GalleryService(db)
    success = service.delete(gallery_id)
    if not success:
        raise HTTPException(status_code=404, detail="Gallery not found")
    return None


@router.post("/{gallery_id}/featured", status_code=200)
def toggle_gallery_featured(
    gallery_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Toggle featured status for a gallery (admin only)."""
    service = GalleryService(db)
    try:
        result = service.toggle_featured(gallery_id)
        if not result:
            raise HTTPException(status_code=404, detail="Gallery not found")
        return {"success": True, "is_featured": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


# Image Management Endpoints

@router.post("/{gallery_id}/images", response_model=GalleryImageResponse, status_code=201)
def add_image_to_gallery(
    gallery_id: int,
    image_data: GalleryImageCreate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Add an image to a gallery (admin only)."""
    service = GalleryService(db)
    try:
        image = service.add_image_to_gallery(gallery_id, **image_data.dict())
        if not image:
            raise HTTPException(status_code=404, detail="Gallery not found")
        return image
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{gallery_id}/images", response_model=List[GalleryImageResponse])
def get_gallery_images(
    gallery_id: int,
    db: Session = Depends(get_db)
):
    """Get all images in a gallery (ordered by image_order)."""
    service = GalleryService(db)
    results = service.get_gallery_images(gallery_id)
    if not results:
        raise HTTPException(status_code=404, detail="No images found in this gallery")
    return results


@router.get("/{gallery_id}/images/{image_id}", response_model=GalleryImageResponse)
def get_gallery_image(
    gallery_id: int,
    image_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific image from a gallery."""
    service = GalleryService(db)
    image = service.get_gallery_images(gallery_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return next((img for img in image if img.image_id == image_id), None) or HTTPException(status_code=404, detail="Image not found")


@router.delete("/{gallery_id}/images/{image_id}", status_code=204)
def remove_image_from_gallery(
    gallery_id: int,
    image_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Remove an image from a gallery (admin only)."""
    service = GalleryService(db)
    try:
        success = service.remove_image_from_gallery(image_id)
        if not success:
            raise HTTPException(status_code=404, detail="Image not found")
        return None
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{gallery_id}/images/reorder", status_code=200)
def reorder_gallery_images(
    gallery_id: int,
    reorder_data: ReorderImagesRequest,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Reorder images in a gallery (admin only)."""
    service = GalleryService(db)
    try:
        success = service.reorder_images(gallery_id, reorder_data.image_order)
        if not success:
            raise HTTPException(status_code=404, detail="Gallery not found")
        return {"success": True, "message": "Images reordered successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{gallery_id}/images/{image_id}/featured", status_code=200)
def set_featured_image(
    gallery_id: int,
    image_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Set an image as featured for a gallery."""
    service = GalleryService(db)
    try:
        result = service.set_featured_image(gallery_id, image_id)
        if not result:
            raise HTTPException(status_code=404, detail="Image not found")
        return {"success": True, "message": "Featured image updated"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{gallery_id}/images/featured", response_model=GalleryImageResponse)
def get_featured_image(
    gallery_id: int,
    db: Session = Depends(get_db)
):
    """Get the featured image for a gallery."""
    service = GalleryService(db)
    image = service.get_featured_image(gallery_id)
    if not image:
        raise HTTPException(status_code=404, detail="No featured image found for this gallery")
    return image


# Statistics and Summary Endpoints

@router.get("/{gallery_id}/statistics", response_model=dict)
def get_gallery_statistics(
    gallery_id: int,
    db: Session = Depends(get_db)
):
    """Get statistics for a gallery."""
    service = GalleryService(db)
    try:
        stats = service.get_gallery_statistics(gallery_id)
        if not stats:
            raise HTTPException(status_code=404, detail="Gallery not found")
        return stats
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{gallery_id}/summary", response_model=dict)
def get_gallery_summary(
    gallery_id: int,
    db: Session = Depends(get_db)
):
    """Get comprehensive summary for a gallery."""
    service = GalleryService(db)
    try:
        summary = service.get_gallery_summary(gallery_id)
        if not summary:
            raise HTTPException(status_code=404, detail="Gallery not found")
        return summary
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
