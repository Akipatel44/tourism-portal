# Admin Authentication - Backend Requirements

This document outlines what the FastAPI backend needs to support for the React authentication system to work properly.

---

## Required Endpoints

### 1. POST /auth/login
**Purpose**: Authenticate user and issue JWT token

**Request Body** (form-encoded):
```
username=admin&password=password123
```

**Response (200)**:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "full_name": "Admin User",
    "is_admin": true,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2024-01-01T00:00:00"
  }
}
```

**Error Response (401)**:
```json
{
  "detail": "Invalid credentials"
}
```

**Important Notes**:
- Use OAuth2 form encoding (not JSON body)
- Must return `user` object with `is_admin` field
- Token must be valid JWT signed with your secret key
- Use `application/x-www-form-urlencoded` content type

---

### 2. GET /auth/me
**Purpose**: Get current authenticated user info

**Headers**:
```
Authorization: Bearer {access_token}
```

**Response (200)**:
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "full_name": "Admin User",
  "is_admin": true,
  "is_active": true,
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

**Error Response (401)**:
```json
{
  "detail": "Not authenticated"
}
```

**Important Notes**:
- Must validate JWT from Authorization header
- Return 401 if token is invalid or expired
- Used to initialize auth state on app load

---

### 3. POST /auth/logout (Optional)
**Purpose**: Invalidate token on backend (optional)

**Headers**:
```
Authorization: Bearer {access_token}
```

**Response (200)**:
```json
{
  "message": "Successfully logged out"
}
```

**Important Notes**:
- Frontend clears token from localStorage before calling
- Can return 404 if not implemented (frontend handles this)
- Useful for token blacklisting in production

---

### 4. PUT /auth/profile
**Purpose**: Update user profile

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "full_name": "New Name",
  "email": "newemail@example.com",
  "current_password": "oldpassword",
  "new_password": "newpassword"
}
```

**Response (200)**:
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "newemail@example.com",
    "full_name": "New Name",
    "is_admin": true,
    "is_active": true
  }
}
```

**Error Response (400)**:
```json
{
  "detail": "Invalid email format"
}
```

---

### 5. POST /auth/change-password
**Purpose**: Change user password

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Request Body**:
```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword"
}
```

**Response (200)**:
```json
{
  "message": "Password changed successfully"
}
```

**Error Response (400)**:
```json
{
  "detail": "Current password is incorrect"
}
```

---

### 6. POST /auth/register (Optional)
**Purpose**: Register new user

**Request Body**:
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "full_name": "New User"
}
```

**Response (201)**:
```json
{
  "id": 2,
  "username": "newuser",
  "email": "user@example.com",
  "full_name": "New User",
  "message": "User created successfully"
}
```

---

### 7. POST /auth/forgot-password (Optional)
**Purpose**: Request password reset

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response (200)**:
```json
{
  "message": "Password reset link sent to email"
}
```

---

## JWT Token Requirements

### Token Structure
The JWT should be signed with your SECRET_KEY and include these claims:

```json
{
  "user_id": 1,
  "username": "admin",
  "role": "admin",
  "exp": 1705310400,
  "iat": 1705307800
}
```

### Token Validation
- Use HS256 algorithm for signing
- Expiration should be checked on backend
- Frontend doesn't validate signature (trust backend)
- Return 401 if token is expired or invalid

---

## User Model Requirements

Your User model must have these fields:

```python
class User(Base):
    __tablename__ = "users"
    
    id: int = Column(Integer, primary_key=True)
    username: str = Column(String, unique=True)
    email: str = Column(String, unique=True)
    full_name: str = Column(String)
    password_hash: str = Column(String)
    is_admin: bool = Column(Boolean, default=False)
    is_active: bool = Column(Boolean, default=True)
    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow)
```

---

## Security Requirements

### Password Hashing
- Use bcrypt or similar for password hashing
- Never store plain text passwords
- Verify password before issuing token

### JWT Signing
```python
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your-secret-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def create_access_token(user_id: int, username: str, role: str):
    payload = {
        "user_id": user_id,
        "username": username,
        "role": role,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        "iat": datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token
```

### CORS Configuration
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## FastAPI Example Implementation

```python
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Authenticate user
    user = db.query(User).filter(User.username == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not user.is_active:
        raise HTTPException(status_code=401, detail="User is inactive")
    
    # Create token
    token = create_access_token(user.id, user.username, "admin" if user.is_admin else "user")
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "is_admin": user.is_admin,
            "is_active": user.is_active
        }
    }

@router.get("/me")
async def get_current_user(
    user_id: int = Depends(verify_token),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@router.post("/logout")
async def logout(user_id: int = Depends(verify_token)):
    # Optional: invalidate token on backend
    return {"message": "Successfully logged out"}
```

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=password123"
```

### Get Current User
```bash
curl -X GET http://localhost:8000/auth/me \
  -H "Authorization: Bearer {token}"
```

---

## Common Issues

### 1. "Invalid credentials"
- Check username exists in database
- Verify password is hashed correctly
- Ensure password matches hash

### 2. "Not authenticated" on /auth/me
- Check token is being sent in Authorization header
- Verify token hasn't expired
- Check SECRET_KEY matches between endpoints

### 3. CORS errors
- Add React dev server to CORS allowed origins
- Check credentials: true is set

### 4. Admin check not working
- Ensure user.is_admin is true in database
- Check /auth/me returns is_admin field
- Verify is_admin is sent in login response

### 5. Token blacklisting
- Implement token blacklist table if logout needs to invalidate
- Check token against blacklist on verify_token
- Add token to blacklist when user logs out

---

## Production Checklist

- [ ] Use environment variables for SECRET_KEY
- [ ] Set ALGORITHM to HS256 or RS256
- [ ] Use HTTPS only
- [ ] Set secure cookies if needed
- [ ] Implement rate limiting on /auth/login
- [ ] Hash passwords with bcrypt
- [ ] Validate token expiration
- [ ] Log authentication attempts
- [ ] Implement token refresh endpoint (optional)
- [ ] Add 2FA support (optional)
- [ ] Monitor failed login attempts
- [ ] Set proper CORS headers
