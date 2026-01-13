#!/usr/bin/env python3
"""Test API endpoints"""

import requests
import json

BASE_URL = 'http://localhost:8001'

def test_login():
    """Test login endpoint"""
    response = requests.post(
        f'{BASE_URL}/api/v1/auth/login',
        json={
            'username': 'admin',
            'password': 'admin123'
        }
    )
    
    print(f"Login Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Token: {data.get('access_token', 'No token')[:50]}...")
        print(f"Token Type: {data.get('token_type')}")
        return data.get('access_token')
    else:
        print(f"Error: {response.text}")
        return None

def test_protected_endpoint(token):
    """Test a protected endpoint"""
    if not token:
        print("No token provided")
        return
    
    headers = {
        'Authorization': f'Bearer {token}'
    }
    
    response = requests.get(
        f'{BASE_URL}/api/v1/places',
        headers=headers
    )
    
    print(f"\nProtected Endpoint Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)[:200]}...")
    else:
        print(f"Error: {response.text}")

if __name__ == '__main__':
    print("Testing API endpoints...\n")
    token = test_login()
    if token:
        test_protected_endpoint(token)
