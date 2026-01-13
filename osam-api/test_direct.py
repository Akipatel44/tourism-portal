#!/usr/bin/env python3
"""Test API endpoint directly without HTTP"""

import asyncio
from fastapi.testclient import TestClient
from app.main import app

def test_login_direct():
    """Test login endpoint directly"""
    client = TestClient(app)
    
    try:
        response = client.post(
            "/api/v1/auth/login",
            json={
                "username": "admin",
                "password": "admin123"
            }
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json() if response.headers.get('content-type') == 'application/json' else response.text}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("Testing login endpoint directly...\n")
    test_login_direct()
