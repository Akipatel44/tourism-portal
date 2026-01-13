#!/usr/bin/env python3
"""Test database connection"""

import sys
import traceback

try:
    from app.models.database import SessionLocal, engine
    from sqlalchemy import text
    
    print("Testing database connection...")
    
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print(f"✓ Database connection successful!")
except Exception as e:
    print(f"✗ Error: {e}")
    print(f"\nTraceback:")
    traceback.print_exc()
    sys.exit(1)
