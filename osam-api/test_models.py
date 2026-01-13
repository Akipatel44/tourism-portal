"""
Test script to verify all models import correctly.
Run this before running alembic commands.
"""

import sys
import os

try:
    print("Testing model imports...")
    print("-" * 50)
    
    from app.models.database import Base, engine, SessionLocal
    print("✓ Database configuration imported")
    
    from app.models.user import User
    print("✓ User model imported")
    
    from app.models.place import Place
    print("✓ Place model imported")
    
    from app.models.temple import Temple
    print("✓ Temple model imported")
    
    from app.models.mythological_site import MythologicalSite
    print("✓ MythologicalSite model imported")
    
    from app.models.event import Event
    print("✓ Event model imported")
    
    from app.models.season import Season
    print("✓ Season model imported")
    
    from app.models.seasonal_availability import SeasonalAvailability
    print("✓ SeasonalAvailability model imported")
    
    from app.models.gallery import Gallery
    print("✓ Gallery model imported")
    
    from app.models.gallery_image import GalleryImage
    print("✓ GalleryImage model imported")
    
    from app.models.review import Review
    print("✓ Review model imported")
    
    from app.models.temple_event import TempleEvent
    print("✓ TempleEvent model imported")
    
    from app.models.site_event import SiteEvent
    print("✓ SiteEvent model imported")
    
    print("-" * 50)
    print("✓ All models imported successfully!")
    print()
    print("Models registered with Base:")
    for table_name in Base.metadata.tables.keys():
        print(f"  - {table_name}")
    print()
    print("Ready to run migrations!")
    
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
