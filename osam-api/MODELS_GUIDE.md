# SQLAlchemy Models - Tourism Portal

## Overview

All SQLAlchemy models are created using the **Declarative Base** pattern and are organized in the `app/models/` directory. Each model corresponds to a database table.

## Model Files Structure

```
app/models/
├── __init__.py              # Exports all models
├── database.py              # Base, engine, SessionLocal, get_db
├── user.py                  # User model
├── place.py                 # Place model
├── temple.py                # Temple model
├── mythological_site.py     # MythologicalSite model
├── event.py                 # Event model
├── season.py                # Season model
├── seasonal_availability.py # SeasonalAvailability (M2M)
├── gallery.py               # Gallery model
├── gallery_image.py         # GalleryImage model
├── review.py                # Review model
├── temple_event.py          # TempleEvent (M2M)
└── site_event.py            # SiteEvent (M2M)
```

## Key Relationships

### One-to-Many Relationships

```
User (1) ─────→ (M) Place
User (1) ─────→ (M) Temple
User (1) ─────→ (M) MythologicalSite
User (1) ─────→ (M) Event
User (1) ─────→ (M) Gallery

Place (1) ─────→ (M) Gallery
Place (1) ─────→ (M) Review

Temple (1) ─────→ (M) Gallery
Temple (1) ─────→ (M) Review

MythologicalSite (1) ─────→ (M) Gallery
MythologicalSite (1) ─────→ (M) Review

Event (1) ─────→ (M) Gallery
Event (1) ─────→ (M) Review

Season (1) ─────→ (M) SeasonalAvailability
Gallery (1) ─────→ (M) GalleryImage
```

### Many-to-Many Relationships

```
Place (M) ←────────→ (M) Season
  ↓ through SeasonalAvailability

Temple (M) ←────────→ (M) Event
  ↓ through TempleEvent

MythologicalSite (M) ←────────→ (M) Event
  ↓ through SiteEvent
```

## Model Details

### 1. User Model (`user.py`)
- **Purpose**: Admin and staff user accounts
- **Relationships**: Creates places, temples, sites, events, galleries
- **Key Fields**: username, email, password_hash, role (admin/editor), is_active

### 2. Place Model (`place.py`)
- **Purpose**: General attractions, landmarks, viewpoints
- **Relationships**: Has galleries, reviews, seasonal availability
- **Key Fields**: name, location, latitude, longitude, entry_fee, accessibility

### 3. Temple Model (`temple.py`)
- **Purpose**: Religious temples and shrines
- **Relationships**: Has galleries, reviews, events
- **Key Fields**: name, deity, location, festival_date, pooja_timings, priest_contact

### 4. MythologicalSite Model (`mythological_site.py`)
- **Purpose**: Sites of mythological and legendary significance
- **Relationships**: Has galleries, reviews, events
- **Key Fields**: name, mythology, legend_source, cultural_significance

### 5. Event Model (`event.py`)
- **Purpose**: Festivals, fairs, and cultural events
- **Relationships**: Has galleries, reviews, associated temples/sites
- **Key Fields**: name, event_type, start_date, location, status

### 6. Season Model (`season.py`)
- **Purpose**: Weather and seasonal information
- **Relationships**: Connected to places through seasonal availability
- **Key Fields**: name, month_start, month_end, temperature, crowding_level

### 7. SeasonalAvailability Model (`seasonal_availability.py`)
- **Purpose**: Many-to-Many junction table for Places ↔ Seasons
- **Key Fields**: place_id, season_id, is_accessible, crowding_level

### 8. Gallery Model (`gallery.py`)
- **Purpose**: Collections of images and media
- **Relationships**: Belongs to place/temple/site/event, contains images
- **Key Fields**: name, gallery_type (photos/videos/360photos), is_featured

### 9. GalleryImage Model (`gallery_image.py`)
- **Purpose**: Individual images within a gallery
- **Relationships**: Belongs to gallery
- **Key Fields**: image_url, thumbnail_url, title, photographer, image_order

### 10. Review Model (`review.py`)
- **Purpose**: User reviews and ratings for content
- **Relationships**: Belongs to place/temple/site/event
- **Key Fields**: title, content, rating (1-5), review_type, status

### 11. TempleEvent Model (`temple_event.py`)
- **Purpose**: Many-to-Many junction table for Temples ↔ Events
- **Key Fields**: temple_id, event_id, is_primary

### 12. SiteEvent Model (`site_event.py`)
- **Purpose**: Many-to-Many junction table for Sites ↔ Events
- **Key Fields**: site_id, event_id, is_primary

## Database Configuration

File: `app/models/database.py`

```python
DATABASE_URL = "mysql+pymysql://root:@localhost:3306/osam_tourism"

engine = create_engine(DATABASE_URL, ...)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
```

## Usage Examples

### In FastAPI Endpoints

```python
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Place, get_db

@app.get("/places")
def get_places(db: Session = Depends(get_db)):
    return db.query(Place).all()
```

### Creating Records

```python
from app.models import Place
from app.models.database import SessionLocal

db = SessionLocal()
new_place = Place(
    name="Osam Hill",
    location="Gujarat",
    latitude=23.5505,
    longitude=72.5363
)
db.add(new_place)
db.commit()
```

### Querying with Relationships

```python
# Get a place with all its galleries
place = db.query(Place).filter(Place.place_id == 1).first()
galleries = place.galleries  # Automatic relationship loading

# Get a season with all available places
season = db.query(Season).filter(Season.season_id == 1).first()
places = season.places  # Many-to-many access
```

## Key Features

✓ **Declarative Base**: All models inherit from Base  
✓ **Relationships**: Back_populates for bidirectional access  
✓ **Cascading**: Cascade="all, delete-orphan" for automatic cleanup  
✓ **Unique Constraints**: Prevent duplicate junction records  
✓ **Timestamps**: created_at, updated_at for audit trails  
✓ **Indexes**: Important fields indexed for performance  
✓ **Enums**: Type-safe enum fields (not VARCHAR)  
✓ **Foreign Keys**: Referential integrity maintained  

## Next Steps

1. Create Pydantic schemas for request/response validation
2. Create repositories for data access abstraction
3. Create services for business logic
4. Create controllers/endpoints for API routes
5. Create migrations using Alembic
