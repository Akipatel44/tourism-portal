#!/usr/bin/env python3
"""Test API endpoints with detailed error handling"""

import requests
import json
import traceback

BASE_URL = 'http://localhost:8001'

def test_login():
    """Test login endpoint"""
    try:
        response = requests.post(
            f'{BASE_URL}/api/v1/auth/login',
            json={
                'username': 'admin',
                'password': 'admin123'
            },
            timeout=5
        )
        
        print(f"Login Status: {response.status_code}")
        print(f"Response Headers: {response.headers}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            token = data.get('access_token', 'No token')
            print(f"Token: {token[:50]}..." if len(token) > 50 else f"Token: {token}")
            print(f"Token Type: {data.get('token_type')}")
            return token
        else:
            print(f"Error: {response.json() if response.headers.get('content-type') == 'application/json' else response.text}")
            return None
    except Exception as e:
        print(f"Exception occurred: {e}")
        traceback.print_exc()
        return None

if __name__ == '__main__':
    print("Testing API endpoints...\n")
    token = test_login()
