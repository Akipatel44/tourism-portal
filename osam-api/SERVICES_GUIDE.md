# Service Layer Documentation

## Overview

The service layer contains all **business logic** for the tourism portal. Services:
- Are independent of FastAPI/HTTP
- Handle validation and business rules
- Use repositories/models for data access
- Are fully testable
- Follow SOLID principles

---

## Architecture

```
HTTP Request
    ↓
Controller/Endpoint (validates request format)
    ↓
Service (business logic)
    ↓
Repository/Database (data access)
    ↓
Database
```

---

## Service Files

### 1. **base_service.py** - Abstract Base Class

```python
class BaseService(ABC, Generic[T]):
    def __init__(self, db: Session)
    def get_by_id(item_id: int) -> Optional[T]
    def get_all(skip: int, limit: int) -> List[T]
    def create(**kwargs) -> T
    def update(item_id: int, **kwargs) -> Optional[T]
    def delete(item_id: int) -> bool
    def _commit()
```

All services inherit from `BaseService` and implement these abstract methods.

---

## 2. PlaceService

**File:** `app/services/place_service.py`

### Purpose
Handle all business logic for places, landmarks, and attractions.

### Core Methods

#### CRUD Operations
```python
place_service.get_by_id(1)
place_service.get_all(skip=0, limit=100)
place_service.create(
    name="Osam Hill",
    description="...",
    location="Gujarat",
    category="landmark"
)
place_service.update(1, name="New Name")
place_service.delete(1)
```

#### Search & Filter
```python
place_service.search_by_name("osam")
place_service.filter_by_category("landmark")
place_service.filter_by_accessibility("easily_accessible")
place_service.get_places_by_location("Gujarat")
```

#### Featured & Metrics
```python
place_service.get_featured_places()
place_service.get_popular_places(min_views=100)
place_service.get_free_places()
place_service.get_places_with_facilities(
    parking=True,
    restrooms=True,
    food=True
)
```

#### Business Logic
```python
place_service.toggle_featured(1)
place_service.get_entry_fee_display(1)
place_service.get_place_summary(1)  # Complete summary
```

### Example Usage

```python
from app.services.place_service import PlaceService
from app.models.database import SessionLocal

db = SessionLocal()
service = PlaceService(db)

# Create a place
new_place = service.create(
    name="Osam Hill",
    description="Beautiful hill in Gujarat",
    location="Chichod Village",
    category="landmark",
    entry_fee=0,
    latitude=23.5505,
    longitude=72.5363
)

# Search
places = service.search_by_name("osam")

# Get summary
summary = service.get_place_summary(new_place.place_id)
```

---

## 3. EventService

**File:** `app/services/event_service.py`

### Purpose
Handle all business logic for events, festivals, and celebrations.

### Core Methods

#### CRUD Operations
```python
event_service.get_by_id(1)
event_service.get_all(skip=0, limit=100)
event_service.create(
    name="Janmashtami",
    event_type="festival",
    description="...",
    start_date=date(2024, 9, 7),
    location="Temple"
)
event_service.update(1, name="New Name")
event_service.delete(1)
```

#### Status-Based Filtering
```python
event_service.get_upcoming_events()     # Future events
event_service.get_ongoing_events()      # Currently happening
event_service.get_completed_events()    # Past events
event_service.get_events_by_status("upcoming")
```

#### Search & Filter
```python
event_service.search_by_name("janma")
event_service.filter_by_type("festival")
event_service.get_events_by_date_range(
    start_date=date(2024, 1, 1),
    end_date=date(2024, 12, 31)
)
event_service.get_annual_events()
```

#### Featured & Metrics
```python
event_service.get_featured_events()
event_service.get_free_events()
event_service.get_events_with_facilities(
    parking=True,
    accommodation=True
)
```

#### Business Logic
```python
event_service.update_event_status(1)  # Auto-update based on date
event_service.toggle_featured(1)
event_service.get_event_summary(1)    # Complete summary
```

### Example Usage

```python
from app.services.event_service import EventService
from app.models.database import SessionLocal
from datetime import date

db = SessionLocal()
service = EventService(db)

# Create event
festival = service.create(
    name="Janmashtami Festival",
    event_type="festival",
    description="Celebration of Krishna's birth",
    start_date=date(2024, 9, 7),
    end_date=date(2024, 9, 8),
    location="Osam Temple",
    is_free=True
)

# Get upcoming
upcoming = service.get_upcoming_events()

# Get summary
summary = service.get_event_summary(festival.event_id)
```

---

## 4. GalleryService

**File:** `app/services/gallery_service.py`

### Purpose
Handle all business logic for galleries and image management.

### Core Methods

#### Gallery CRUD
```python
gallery_service.get_by_id(1)
gallery_service.get_all(skip=0, limit=100)
gallery_service.create(
    name="Osam Hill Photos",
    gallery_type="photos",
    place_id=1
)
gallery_service.update(1, name="New Name")
gallery_service.delete(1)
```

#### Image Management
```python
gallery_service.add_image_to_gallery(
    gallery_id=1,
    image_url="/images/osam1.jpg",
    thumbnail_url="/images/osam1_thumb.jpg",
    title="Osam Hill Sunrise",
    photographer="John Doe",
    image_order=1
)
gallery_service.remove_image_from_gallery(image_id=1)
gallery_service.get_gallery_images(gallery_id=1)
gallery_service.reorder_images(
    gallery_id=1,
    image_order={1: 2, 2: 1, 3: 3}
)
gallery_service.set_featured_image(gallery_id=1, image_id=2)
```

#### Search & Filter by Content
```python
gallery_service.search_galleries_by_name("osam")
gallery_service.filter_by_type("photos")
gallery_service.get_galleries_for_place(place_id=1)
gallery_service.get_galleries_for_temple(temple_id=1)
gallery_service.get_galleries_for_site(site_id=1)
gallery_service.get_galleries_for_event(event_id=1)
```

#### Featured & Metrics
```python
gallery_service.get_featured_galleries()
gallery_service.get_popular_galleries(min_views=50)
gallery_service.toggle_featured(1)
```

#### Statistics
```python
gallery_service.get_gallery_statistics(1)
gallery_service.get_gallery_summary(1)
```

### Example Usage

```python
from app.services.gallery_service import GalleryService
from app.models.database import SessionLocal

db = SessionLocal()
service = GalleryService(db)

# Create gallery
gallery = service.create(
    name="Osam Hill Photos",
    gallery_type="photos",
    place_id=1
)

# Add images
service.add_image_to_gallery(
    gallery_id=gallery.gallery_id,
    image_url="/images/photo1.jpg",
    title="View 1",
    image_order=1
)

# Set featured
service.set_featured_image(gallery.gallery_id, image_id=1)

# Get summary
summary = service.get_gallery_summary(gallery.gallery_id)
```

---

## Using Services in FastAPI

### In Controllers/Endpoints

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.services.place_service import PlaceService
from app.schemas.place import PlaceCreate, PlaceResponse

router = APIRouter(prefix="/places", tags=["places"])

@router.get("/{place_id}")
def get_place(place_id: int, db: Session = Depends(get_db)):
    service = PlaceService(db)
    place = service.get_by_id(place_id)
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    return place

@router.post("/")
def create_place(place_data: PlaceCreate, db: Session = Depends(get_db)):
    service = PlaceService(db)
    try:
        place = service.create(**place_data.dict())
        return place
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/")
def list_places(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    service = PlaceService(db)
    return service.get_all(skip=skip, limit=limit)
```

---

## Key Principles

### 1. **No FastAPI Dependencies**
Services don't know about FastAPI, requests, or responses.

### 2. **Validation & Business Logic**
All business rules are in services, not in endpoints or models.

### 3. **Testability**
Services can be tested independently by mocking the database session.

### 4. **Reusability**
Same service can be used by:
- REST endpoints
- GraphQL resolvers
- Background jobs
- CLI commands

### 5. **Error Handling**
Services raise `ValueError`, `TypeError`, etc. Controllers convert to HTTP errors.

---

## Testing Example

```python
from unittest.mock import Mock
from app.services.place_service import PlaceService

def test_create_place_validation():
    # Mock database session
    db = Mock()
    service = PlaceService(db)
    
    # Test validation
    with pytest.raises(ValueError, match="Missing required field"):
        service.create(name="Test")  # Missing required fields
```

---

## Summary

| Service | Purpose | Key Methods |
|---------|---------|------------|
| PlaceService | Places/attractions | search, filter, featured, summary |
| EventService | Events/festivals | upcoming, status, date range, featured |
| GalleryService | Galleries/images | create, add_image, reorder, featured |

All services:
- ✅ Inherit from BaseService
- ✅ Use dependency injection (db: Session)
- ✅ Have clean, testable methods
- ✅ Handle validation and business logic
- ✅ Independent of FastAPI
- ✅ Easy to extend and reuse
