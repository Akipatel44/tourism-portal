# JWT Authentication Documentation

## Overview

The API uses JWT (JSON Web Token) based authentication for secure admin-only access. Only authenticated admin users can create, update, or delete resources.

---

## Architecture

```
User Credentials
    ↓
LoginRequest (username + password)
    ↓
AuthService (password verification + JWT generation)
    ↓
TokenResponse (JWT token + user info)
    ↓
Protected Endpoints (require valid token)
```

---

## Key Features

✅ **Password Hashing** - Bcrypt encryption with salt
✅ **JWT Tokens** - Stateless, expiring tokens (60 minutes default)
✅ **Admin Only** - Only admin users can modify resources
✅ **Role-Based Access** - Separate endpoints for admin operations
✅ **Clean Architecture** - AuthService + AuthController separation

---

## File Structure

```
app/
├── schemas/
│   └── auth.py              # Auth request/response schemas
├── services/
│   ├── auth_service.py      # JWT + password logic
│   └── user_service.py      # User CRUD operations
├── api/v1/endpoints/
│   ├── auth.py              # Login, register, admin endpoints
│   ├── places.py            # Protected with @get_current_admin
│   ├── events.py            # Protected with @get_current_admin
│   └── galleries.py         # Protected with @get_current_admin
└── core/
    └── dependencies.py       # get_current_user, get_current_admin
```

---

## Authentication Flow

### 1. Register User
```
POST /api/v1/auth/register
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "user_id": 1,
  "username": "john",
  "email": "john@example.com",
  "role": "editor",
  "is_active": true,
  "created_at": "2024-01-13T...",
  "updated_at": "2024-01-13T..."
}
```

**Notes:**
- Default role is "editor"
- Admin accounts can only be created by existing admins
- Passwords are hashed with bcrypt

### 2. Login User
```
POST /api/v1/auth/login
{
  "username": "john",
  "password": "password123"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "user_id": 1,
    "username": "john",
    "email": "john@example.com",
    "role": "editor",
    "is_active": true,
    "created_at": "2024-01-13T...",
    "updated_at": "2024-01-13T..."
  }
}
```

**Token Valid For:** 60 minutes (3600 seconds)

### 3. Use Token in Protected Endpoints

All protected endpoints require the JWT token in the Authorization header:

```
GET /api/v1/places/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Token Structure

JWT tokens contain:
```json
{
  "user_id": 1,
  "username": "admin",
  "role": "admin",
  "exp": 1705165200,  // Expiration time
  "iat": 1705161600   // Issued at time
}
```

---

## Protected Routes

### Public Routes (No Token Required)
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/places` - List places
- `GET /api/v1/places/{id}` - Get place details
- `GET /api/v1/events` - List events
- `GET /api/v1/events/{id}` - Get event details
- `GET /api/v1/galleries` - List galleries
- `GET /api/v1/galleries/{id}` - Get gallery details
- `GET /health` - Health check

### Admin-Only Routes (Require Token + Admin Role)

#### Place Management
- `POST /api/v1/places` - Create place
- `PATCH /api/v1/places/{id}` - Update place
- `DELETE /api/v1/places/{id}` - Delete place
- `POST /api/v1/places/{id}/featured` - Toggle featured

#### Event Management
- `POST /api/v1/events` - Create event
- `PATCH /api/v1/events/{id}` - Update event
- `DELETE /api/v1/events/{id}` - Delete event
- `POST /api/v1/events/{id}/featured` - Toggle featured
- `POST /api/v1/events/{id}/status/update` - Update status

#### Gallery Management
- `POST /api/v1/galleries` - Create gallery
- `PATCH /api/v1/galleries/{id}` - Update gallery
- `DELETE /api/v1/galleries/{id}` - Delete gallery
- `POST /api/v1/galleries/{id}/featured` - Toggle featured
- `POST /api/v1/galleries/{id}/images` - Add image
- `DELETE /api/v1/galleries/{id}/images/{image_id}` - Remove image
- `POST /api/v1/galleries/{id}/images/reorder` - Reorder images
- `POST /api/v1/galleries/{id}/images/{image_id}/featured` - Set featured image

#### User Management (Admin Only)
- `POST /api/v1/auth/admin/create-user` - Create user
- `GET /api/v1/auth/admin/users` - List all users
- `POST /api/v1/auth/admin/users/{id}/activate` - Activate user
- `POST /api/v1/auth/admin/users/{id}/deactivate` - Deactivate user
- `POST /api/v1/auth/admin/users/{id}/promote` - Promote to admin
- `POST /api/v1/auth/admin/users/{id}/demote` - Demote to editor
- `DELETE /api/v1/auth/admin/users/{id}` - Delete user

---

## Authentication Endpoints

### Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "securepassword"
}

Response: 200 OK
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {...}
}
```

### Register (Self-Registration)
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "editor",
  "email": "editor@example.com",
  "password": "password123",
  "role": "editor"  // Optional, defaults to "editor"
}

Response: 201 Created
{user...}
```

### Create User (Admin Only)
```
POST /api/v1/auth/admin/create-user
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "newadmin",
  "email": "newadmin@example.com",
  "password": "password123",
  "role": "admin"
}

Response: 201 Created
{user...}
```

### Get Current User
```
GET /api/v1/auth/me
Authorization: Bearer {token}

Response: 200 OK
{user...}
```

### Change Password
```
POST /api/v1/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "current_password": "oldpassword123",
  "new_password": "newpassword456",
  "confirm_password": "newpassword456"
}

Response: 200 OK
{
  "success": true,
  "message": "Password changed successfully"
}
```

### List All Users (Admin Only)
```
GET /api/v1/auth/admin/users?skip=0&limit=100
Authorization: Bearer {token}

Response: 200 OK
[
  {user1...},
  {user2...},
  ...
]
```

### Activate User (Admin Only)
```
POST /api/v1/auth/admin/users/{user_id}/activate
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "User activated"
}
```

### Deactivate User (Admin Only)
```
POST /api/v1/auth/admin/users/{user_id}/deactivate
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "User deactivated"
}
```

### Promote to Admin (Admin Only)
```
POST /api/v1/auth/admin/users/{user_id}/promote
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "User promoted to admin"
}
```

### Demote to Editor (Admin Only)
```
POST /api/v1/auth/admin/users/{user_id}/demote
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "User demoted to editor"
}
```

### Delete User (Admin Only)
```
DELETE /api/v1/auth/admin/users/{user_id}
Authorization: Bearer {token}

Response: 204 No Content
```

### Logout
```
POST /api/v1/auth/logout
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Protected Endpoint Example

### Create Place (Admin Only)
```
POST /api/v1/places
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Osam Hill",
  "description": "Beautiful hill",
  "location": "Chichod Village",
  "category": "landmark"
}

Response: 201 Created
{place...}
```

If token is missing or invalid:
```
Response: 401 Unauthorized
{
  "detail": "Invalid or expired token"
}
```

If user is not admin:
```
Response: 403 Forbidden
{
  "detail": "This operation requires admin privileges"
}
```

---

## Error Responses

| Status | Error | Cause |
|--------|-------|-------|
| 401 | Invalid or expired token | Token missing or expired |
| 401 | Invalid username or password | Wrong credentials |
| 403 | This operation requires admin privileges | User not admin |
| 400 | Username already exists | Duplicate username |
| 400 | Email already exists | Duplicate email |
| 400 | Current password is incorrect | Wrong password change |

---

## AuthService Methods

```python
# Password hashing
hash_password(password: str) -> str

# Verify password
verify_password(plain_password: str, hashed: str) -> bool

# Create JWT token
create_access_token(user_id: int, username: str, role: str) 
    -> Tuple[str, int]

# Verify token
verify_token(token: str) -> Optional[dict]

# Authenticate user
authenticate_user(username: str, password: str) -> Optional[User]

# Get user by ID
get_user_by_id(user_id: int) -> Optional[User]

# Get user by username
get_user_by_username(username: str) -> Optional[User]

# Get user by email
get_user_by_email(email: str) -> Optional[User]

# Create user
create_user(username, email, password, role="editor") -> User

# Update password
update_password(user_id, current_password, new_password) -> bool

# Check if admin
is_admin(user_id: int) -> bool
```

---

## Dependency Injection

### Get Current User
```python
from app.core.dependencies import get_current_user

@router.get("/endpoint")
def my_endpoint(current_user: User = Depends(get_current_user)):
    # current_user is authenticated User object
    return {"username": current_user.username}
```

### Get Current Admin
```python
from app.core.dependencies import get_current_admin

@router.post("/admin-endpoint")
def admin_endpoint(current_user: User = Depends(get_current_admin)):
    # current_user is authenticated and is admin
    return {"success": True}
```

---

## Security Configuration

### Settings (Should be in .env)
```python
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
```

### Production Checklist
- ✅ Use environment variables for SECRET_KEY
- ✅ Set HTTPS only (secure cookies)
- ✅ Use strong SECRET_KEY (256+ bit)
- ✅ Implement token blacklisting for logout
- ✅ Use CORS carefully (specify allowed origins)
- ✅ Rate limiting on login endpoint
- ✅ Log failed authentication attempts

---

## Password Hashing

Passwords use **bcrypt** with:
- **Algorithm**: bcrypt
- **Salt rounds**: 12 (default)
- **Cost**: High computational cost prevents brute force

Example:
```python
from app.services.auth_service import AuthService

# Hash password
hashed = AuthService.hash_password("password123")

# Verify password
is_correct = AuthService.verify_password("password123", hashed)
```

---

## Testing Authentication

```bash
# 1. Register user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# 2. Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'

# 3. Use token in protected endpoint
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Summary

| Component | Purpose | File |
|-----------|---------|------|
| **AuthService** | JWT + password logic | `auth_service.py` |
| **UserService** | User CRUD operations | `user_service.py` |
| **Dependencies** | get_current_user, get_current_admin | `dependencies.py` |
| **Auth Router** | Login, register, admin endpoints | `endpoints/auth.py` |
| **Auth Schemas** | Request/response validation | `schemas/auth.py` |

All endpoints follow clean architecture with:
- ✅ Services handling business logic
- ✅ Controllers handling HTTP
- ✅ Schemas validating input
- ✅ Dependencies managing authentication
