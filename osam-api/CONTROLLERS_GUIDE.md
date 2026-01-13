# FastAPI Controllers Documentation

## Overview

The controller layer provides HTTP endpoints for the tourism portal. Each controller:
- Only calls services (no business logic)
- Validates request format with Pydantic schemas
- Returns appropriate HTTP status codes
- Handles errors gracefully

---

## Architecture

```
HTTP Request
    ↓
Controller (@app.post, @app.get, etc.)
    ↓
Validation (Pydantic schema)
    ↓
Service (business logic)
    ↓
Database
    ↓
Response (schema)
```

---

## Project Structure

```
app/
├── api/
│   └── v1/
│       ├── __init__.py          # Router combining all endpoints
│       └── endpoints/
│           ├── places.py        # Place endpoints
│           ├── events.py        # Event endpoints
│           ├── galleries.py     # Gallery endpoints
│           └── __init__.py
├── schemas/
│   ├── place.py                 # Place schemas
│   ├── event.py                 # Event schemas
│   ├── gallery.py               # Gallery schemas
│   └── __init__.py
├── services/
│   ├── base_service.py
│   ├── place_service.py
│   ├── event_service.py
│   ├── gallery_service.py
│   └── __init__.py
├── models/
│   ├── database.py
│   ├── user.py
│   └── ... (other models)
└── main.py                      # Main FastAPI app
```

---

## Main Application (main.py)

### Initialization

```python
app = FastAPI(
    title="Osam Tourism Portal API",
    version="1.0.0"
)
```

### CORS Configuration

```python
CORSMiddleware(
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
```

### Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| GET | `/docs` | Swagger UI documentation |
| GET | `/redoc` | ReDoc documentation |

---

## Place Endpoints

**Base URL:** `/api/v1/places`

### Create Place
```
POST /api/v1/places
Content-Type: application/json

{
  "name": "Osam Hill",
  "description": "Beautiful hill",
  "location": "Chichod Village",
  "category": "landmark",
  "entry_fee": 0,
  "latitude": 23.5505,
  "longitude": 72.5363
}

Response: 201 Created
{
  "place_id": 1,
  "name": "Osam Hill",
  "location": "Chichod Village",
  "category": "landmark",
  "entry_fee": 0,
  "view_count": 0,
  "is_featured": false,
  "created_at": "2024-01-13T...",
  "updated_at": "2024-01-13T..."
}
```

### Get Single Place
```
GET /api/v1/places/{place_id}

Response: 200 OK
{
  "place_id": 1,
  "name": "Osam Hill",
  "description": "Beautiful hill",
  "location": "Chichod Village",
  ...
}
```

### List All Places
```
GET /api/v1/places?skip=0&limit=100

Response: 200 OK
[
  {
    "place_id": 1,
    "name": "Osam Hill",
    ...
  }
]
```

### Search by Name
```
GET /api/v1/places/search/by-name?query=osam

Response: 200 OK
[
  {place...},
  {place...}
]
```

### Filter by Category
```
GET /api/v1/places/filter/by-category?category=landmark

Response: 200 OK
[{place...}]
```

### Filter by Accessibility
```
GET /api/v1/places/filter/by-accessibility?level=easily_accessible

Response: 200 OK
[{place...}]
```

### Filter by Location
```
GET /api/v1/places/filter/by-location?location=Gujarat

Response: 200 OK
[{place...}]
```

### Get Featured Places
```
GET /api/v1/places/featured/

Response: 200 OK
[{place...}]
```

### Get Popular Places
```
GET /api/v1/places/popular/?min_views=100

Response: 200 OK
[{place...}]
```

### Get Free Places
```
GET /api/v1/places/free/

Response: 200 OK
[{place...}]
```

### Get Places with Facilities
```
GET /api/v1/places/with-facilities/?parking=true&restrooms=true&food=false

Response: 200 OK
[{place...}]
```

### Update Place
```
PATCH /api/v1/places/{place_id}
Content-Type: application/json

{
  "name": "New Name",
  "is_featured": true
}

Response: 200 OK
{place...}
```

### Delete Place
```
DELETE /api/v1/places/{place_id}

Response: 204 No Content
```

### Toggle Featured
```
POST /api/v1/places/{place_id}/featured

Response: 200 OK
{
  "success": true,
  "is_featured": true
}
```

### Get Place Summary
```
GET /api/v1/places/{place_id}/summary

Response: 200 OK
{
  "place_id": 1,
  "name": "Osam Hill",
  "facilities": {...},
  "visit_info": {...},
  "metrics": {...}
}
```

### Get Entry Fee Display
```
GET /api/v1/places/{place_id}/entry-fee

Response: 200 OK
{
  "amount": 0,
  "currency": "INR",
  "is_free": true
}
```

---

## Event Endpoints

**Base URL:** `/api/v1/events`

### Create Event
```
POST /api/v1/events
Content-Type: application/json

{
  "name": "Janmashtami Festival",
  "event_type": "festival",
  "location": "Osam Temple",
  "start_date": "2024-09-07",
  "end_date": "2024-09-08",
  "is_annual": true,
  "is_free": true
}

Response: 201 Created
{
  "event_id": 1,
  "name": "Janmashtami Festival",
  "event_type": "festival",
  "status": "upcoming",
  ...
}
```

### Get Single Event
```
GET /api/v1/events/{event_id}

Response: 200 OK
{event...}
```

### List All Events
```
GET /api/v1/events?skip=0&limit=100

Response: 200 OK
[{event...}]
```

### Get Upcoming Events
```
GET /api/v1/events/status/upcoming

Response: 200 OK
[{event...}]
```

### Get Ongoing Events
```
GET /api/v1/events/status/ongoing

Response: 200 OK
[{event...}]
```

### Get Completed Events
```
GET /api/v1/events/status/completed

Response: 200 OK
[{event...}]
```

### Filter by Status
```
GET /api/v1/events/filter/by-status?status=upcoming

Response: 200 OK
[{event...}]
```

### Search by Name
```
GET /api/v1/events/search/by-name?query=janma

Response: 200 OK
[{event...}]
```

### Filter by Type
```
GET /api/v1/events/filter/by-type?event_type=festival

Response: 200 OK
[{event...}]
```

### Filter by Date Range
```
GET /api/v1/events/filter/by-date-range?start_date=2024-01-01&end_date=2024-12-31

Response: 200 OK
[{event...}]
```

### Get Annual Events
```
GET /api/v1/events/annual/

Response: 200 OK
[{event...}]
```

### Get Featured Events
```
GET /api/v1/events/featured/

Response: 200 OK
[{event...}]
```

### Get Free Events
```
GET /api/v1/events/free/

Response: 200 OK
[{event...}]
```

### Get Events with Facilities
```
GET /api/v1/events/with-facilities/?parking=true&accommodation=false

Response: 200 OK
[{event...}]
```

### Update Event
```
PATCH /api/v1/events/{event_id}

Response: 200 OK
{event...}
```

### Delete Event
```
DELETE /api/v1/events/{event_id}

Response: 204 No Content
```

### Update Event Status
```
POST /api/v1/events/{event_id}/status/update

Response: 200 OK
{
  "success": true,
  "status": "ongoing"
}
```

### Toggle Featured
```
POST /api/v1/events/{event_id}/featured

Response: 200 OK
{
  "success": true,
  "is_featured": true
}
```

### Get Event Summary
```
GET /api/v1/events/{event_id}/summary

Response: 200 OK
{
  "event_id": 1,
  "name": "Janmashtami",
  "dates": {...},
  "tickets": {...},
  "facilities": {...},
  "contact": {...}
}
```

---

## Gallery Endpoints

**Base URL:** `/api/v1/galleries`

### Create Gallery
```
POST /api/v1/galleries
Content-Type: application/json

{
  "name": "Osam Hill Photos",
  "gallery_type": "photos",
  "place_id": 1
}

Response: 201 Created
{
  "gallery_id": 1,
  "name": "Osam Hill Photos",
  "gallery_type": "photos",
  "place_id": 1,
  "images": [],
  ...
}
```

### Get Single Gallery
```
GET /api/v1/galleries/{gallery_id}

Response: 200 OK
{
  "gallery_id": 1,
  "name": "Osam Hill Photos",
  "images": [{image...}]
}
```

### List All Galleries
```
GET /api/v1/galleries?skip=0&limit=100

Response: 200 OK
[{gallery...}]
```

### Search by Name
```
GET /api/v1/galleries/search/by-name?query=osam

Response: 200 OK
[{gallery...}]
```

### Filter by Type
```
GET /api/v1/galleries/filter/by-type?gallery_type=photos

Response: 200 OK
[{gallery...}]
```

### Get Galleries for Place
```
GET /api/v1/galleries/for-place/{place_id}

Response: 200 OK
[{gallery...}]
```

### Get Galleries for Temple
```
GET /api/v1/galleries/for-temple/{temple_id}

Response: 200 OK
[{gallery...}]
```

### Get Galleries for Site
```
GET /api/v1/galleries/for-site/{site_id}

Response: 200 OK
[{gallery...}]
```

### Get Galleries for Event
```
GET /api/v1/galleries/for-event/{event_id}

Response: 200 OK
[{gallery...}]
```

### Get Featured Galleries
```
GET /api/v1/galleries/featured/

Response: 200 OK
[{gallery...}]
```

### Get Popular Galleries
```
GET /api/v1/galleries/popular/?min_views=50

Response: 200 OK
[{gallery...}]
```

### Update Gallery
```
PATCH /api/v1/galleries/{gallery_id}

Response: 200 OK
{gallery...}
```

### Delete Gallery
```
DELETE /api/v1/galleries/{gallery_id}

Response: 204 No Content
```

### Toggle Gallery Featured
```
POST /api/v1/galleries/{gallery_id}/featured

Response: 200 OK
{
  "success": true,
  "is_featured": true
}
```

---

## Gallery Image Management

### Add Image to Gallery
```
POST /api/v1/galleries/{gallery_id}/images
Content-Type: application/json

{
  "image_url": "/images/photo1.jpg",
  "title": "View 1",
  "image_order": 1
}

Response: 201 Created
{
  "image_id": 1,
  "image_url": "/images/photo1.jpg",
  "title": "View 1",
  "image_order": 1,
  "is_featured": false,
  "view_count": 0
}
```

### Get Gallery Images
```
GET /api/v1/galleries/{gallery_id}/images

Response: 200 OK
[
  {
    "image_id": 1,
    "image_url": "/images/photo1.jpg",
    "image_order": 1,
    ...
  }
]
```

### Remove Image from Gallery
```
DELETE /api/v1/galleries/{gallery_id}/images/{image_id}

Response: 204 No Content
```

### Reorder Images
```
POST /api/v1/galleries/{gallery_id}/images/reorder
Content-Type: application/json

{
  "image_order": {
    "1": 2,
    "2": 1,
    "3": 3
  }
}

Response: 200 OK
{
  "success": true,
  "message": "Images reordered successfully"
}
```

### Set Featured Image
```
POST /api/v1/galleries/{gallery_id}/images/{image_id}/featured

Response: 200 OK
{
  "success": true,
  "message": "Featured image updated"
}
```

### Get Featured Image
```
GET /api/v1/galleries/{gallery_id}/images/featured

Response: 200 OK
{
  "image_id": 1,
  "image_url": "/images/photo1.jpg",
  "is_featured": true,
  ...
}
```

---

## Gallery Statistics

### Get Gallery Statistics
```
GET /api/v1/galleries/{gallery_id}/statistics

Response: 200 OK
{
  "gallery_id": 1,
  "name": "Osam Hill Photos",
  "image_count": 5,
  "view_count": 150,
  "total_image_views": 450,
  "is_featured": true,
  "featured_image": {...}
}
```

### Get Gallery Summary
```
GET /api/v1/galleries/{gallery_id}/summary

Response: 200 OK
{
  "gallery_id": 1,
  "name": "Osam Hill Photos",
  "gallery_type": "photos",
  "associations": {
    "place_id": 1
  },
  "statistics": {...},
  "featured_image": {...}
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request** - Validation failed
```json
{
  "detail": "Category must be one of ['place', 'landmark', 'viewpoint', 'parking']"
}
```

**404 Not Found** - Resource not found
```json
{
  "detail": "Place not found"
}
```

**500 Internal Server Error** - Server error
```json
{
  "detail": "Failed to create place"
}
```

---

## Running the API

### Development Mode
```bash
cd c:\PROJECT\osam-api
.\venv\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Access Documentation
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **OpenAPI JSON:** http://localhost:8000/openapi.json

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PATCH requests |
| 201 | Created | Successful POST requests |
| 204 | No Content | Successful DELETE requests |
| 400 | Bad Request | Validation errors |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server errors |

---

## Key Principles

1. **No Business Logic in Controllers** - All logic in services
2. **Validation at Entry Point** - Pydantic validates all requests
3. **Proper Status Codes** - 201 for create, 204 for delete, etc.
4. **Dependency Injection** - `db: Session = Depends(get_db)`
5. **Error Handling** - ValueError → 400, Not found → 404
6. **Framework Agnostic Services** - Services work with any framework

---

## Testing Example

```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_place():
    response = client.post(
        "/api/v1/places",
        json={
            "name": "Test Place",
            "location": "Test",
            "category": "landmark"
        }
    )
    assert response.status_code == 201
    assert response.json()["name"] == "Test Place"

def test_get_place():
    response = client.get("/api/v1/places/1")
    assert response.status_code == 200
```

---

## Summary

| Entity | Endpoints | Operations |
|--------|-----------|------------|
| Places | 18 | CRUD, search, filter, featured, metrics |
| Events | 18 | CRUD, status mgmt, date range, scheduling |
| Galleries | 20+ | CRUD, image mgmt, content associations |

All endpoints:
- ✅ Use dependency injection for database
- ✅ Call services (no business logic)
- ✅ Validate with Pydantic
- ✅ Return proper status codes
- ✅ Handle errors gracefully
