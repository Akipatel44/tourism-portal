"""
FastAPI router for Event endpoints.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import date

from app.models.database import get_db
from app.models.user import User
from app.services.event_service import EventService
from app.schemas.event import EventCreate, EventUpdate, EventResponse, EventListResponse
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/events", tags=["events"])


@router.post("/", response_model=EventResponse, status_code=201)
def create_event(
    event_data: EventCreate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Create a new event (admin only)."""
    service = EventService(db)
    try:
        event = service.create(**event_data.dict())
        return event
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create event")


@router.get("/{event_id}", response_model=EventResponse)
def get_event(
    event_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific event by ID."""
    service = EventService(db)
    event = service.get_by_id(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.get("/", response_model=List[EventListResponse])
def list_events(
    skip: int = Query(0, ge=0, description="Number of events to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Maximum events to return"),
    db: Session = Depends(get_db)
):
    """List all events with pagination."""
    service = EventService(db)
    return service.get_all(skip=skip, limit=limit)


@router.get("/status/upcoming", response_model=List[EventListResponse])
def get_upcoming_events(
    db: Session = Depends(get_db)
):
    """Get upcoming events."""
    service = EventService(db)
    results = service.get_upcoming_events()
    if not results:
        raise HTTPException(status_code=404, detail="No upcoming events found")
    return results


@router.get("/status/ongoing", response_model=List[EventListResponse])
def get_ongoing_events(
    db: Session = Depends(get_db)
):
    """Get currently ongoing events."""
    service = EventService(db)
    results = service.get_ongoing_events()
    if not results:
        raise HTTPException(status_code=404, detail="No ongoing events found")
    return results


@router.get("/status/completed", response_model=List[EventListResponse])
def get_completed_events(
    db: Session = Depends(get_db)
):
    """Get completed events."""
    service = EventService(db)
    results = service.get_completed_events()
    if not results:
        raise HTTPException(status_code=404, detail="No completed events found")
    return results


@router.get("/filter/by-status", response_model=List[EventListResponse])
def get_events_by_status(
    status: str = Query(..., description="Status: upcoming, ongoing, completed"),
    db: Session = Depends(get_db)
):
    """Filter events by status."""
    service = EventService(db)
    try:
        results = service.get_events_by_status(status)
        if not results:
            raise HTTPException(status_code=404, detail="No events found with this status")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/search/by-name", response_model=List[EventListResponse])
def search_events_by_name(
    query: str = Query(..., min_length=1, description="Search query"),
    db: Session = Depends(get_db)
):
    """Search events by name."""
    service = EventService(db)
    results = service.search_by_name(query)
    if not results:
        raise HTTPException(status_code=404, detail="No events found matching query")
    return results


@router.get("/filter/by-type", response_model=List[EventListResponse])
def filter_events_by_type(
    event_type: str = Query(..., description="Type: festival, fair, ceremony, cultural"),
    db: Session = Depends(get_db)
):
    """Filter events by type."""
    service = EventService(db)
    try:
        results = service.filter_by_type(event_type)
        if not results:
            raise HTTPException(status_code=404, detail="No events found of this type")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/filter/by-date-range", response_model=List[EventListResponse])
def get_events_by_date_range(
    start_date: date = Query(..., description="Start date (YYYY-MM-DD)"),
    end_date: date = Query(..., description="End date (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    """Get events within a date range."""
    service = EventService(db)
    try:
        results = service.get_events_by_date_range(start_date, end_date)
        if not results:
            raise HTTPException(status_code=404, detail="No events found in this date range")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/annual/", response_model=List[EventListResponse])
def get_annual_events(
    db: Session = Depends(get_db)
):
    """Get recurring annual events."""
    service = EventService(db)
    results = service.get_annual_events()
    if not results:
        raise HTTPException(status_code=404, detail="No annual events found")
    return results


@router.get("/featured/", response_model=List[EventListResponse])
def get_featured_events(
    db: Session = Depends(get_db)
):
    """Get featured events."""
    service = EventService(db)
    results = service.get_featured_events()
    if not results:
        raise HTTPException(status_code=404, detail="No featured events found")
    return results


@router.get("/free/", response_model=List[EventListResponse])
def get_free_events(
    db: Session = Depends(get_db)
):
    """Get free events."""
    service = EventService(db)
    results = service.get_free_events()
    if not results:
        raise HTTPException(status_code=404, detail="No free events found")
    return results


@router.get("/with-facilities/", response_model=List[EventListResponse])
def get_events_with_facilities(
    parking: bool = Query(False, description="Has parking"),
    accommodation: bool = Query(False, description="Has accommodation"),
    db: Session = Depends(get_db)
):
    """Get events with specific facilities."""
    service = EventService(db)
    try:
        results = service.get_events_with_facilities(
            parking=parking,
            accommodation=accommodation
        )
        if not results:
            raise HTTPException(status_code=404, detail="No events found with the specified facilities")
        return results
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.patch("/{event_id}", response_model=EventResponse)
def update_event(
    event_id: int,
    event_data: EventUpdate,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Update an event (admin only)."""
    service = EventService(db)
    try:
        event = service.update(event_id, **event_data.dict(exclude_unset=True))
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        return event
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{event_id}", status_code=204)
def delete_event(
    event_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Delete an event (admin only)."""
    service = EventService(db)
    success = service.delete(event_id)
    if not success:
        raise HTTPException(status_code=404, detail="Event not found")
    return None


@router.post("/{event_id}/status/update", status_code=200)
def update_event_status(
    event_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Auto-update event status based on current date (admin only)."""
    service = EventService(db)
    try:
        result = service.update_event_status(event_id)
        if not result:
            raise HTTPException(status_code=404, detail="Event not found")
        return {"success": True, "status": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{event_id}/featured", status_code=200)
def toggle_event_featured(
    event_id: int,
    current_user: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Toggle featured status for an event."""
    service = EventService(db)
    try:
        result = service.toggle_featured(event_id)
        if not result:
            raise HTTPException(status_code=404, detail="Event not found")
        return {"success": True, "is_featured": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{event_id}/summary", response_model=dict)
def get_event_summary(
    event_id: int,
    db: Session = Depends(get_db)
):
    """Get comprehensive summary for an event."""
    service = EventService(db)
    try:
        summary = service.get_event_summary(event_id)
        if not summary:
            raise HTTPException(status_code=404, detail="Event not found")
        return summary
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
