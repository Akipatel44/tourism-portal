# API Architecture - Visual Guide

## 🏗️ Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    REACT COMPONENTS                               │
│  (Pages, Hooks, Event Listeners)                                 │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      │ import { authService, placesService }
                      │ import { tokenManager, ParsedApiError }
                      │
┌─────────────────────▼───────────────────────────────────────────┐
│                    API INDEX (index.ts)                           │
│  Central barrel export for all services, types, utilities         │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
   ┌─────────┐  ┌──────────┐  ┌─────────────┐
   │ SERVICES│  │  UTILITIES│  │    TYPES    │
   └─────────┘  └──────────┘  └─────────────┘
        │             │             │
        │ import      │ import      │ import
        │ axios inst  │ config      │ from types
        │ constants   │ tokenMgr    │
        │ types       │ errorHandler│
        │             │             │
        ▼             ▼             ▼
   ┌─────────────────────────────────────────┐
   │        AXIOS CONFIGURATION              │
   │                                          │
   │  ┌──────────────┐  ┌──────────────┐    │
   │  │ PUBLIC API   │  │ PROTECTED API │   │
   │  │              │  │               │    │
   │  │ No Token     │  │ Auto-Inject   │    │
   │  │ No Refresh   │  │ Token, Handle │    │
   │  │              │  │ 401 → Logout  │    │
   │  └──────────────┘  └──────────────┘    │
   │                                          │
   │  REQUEST INTERCEPTORS:                  │
   │  ├─ Add Authorization header (protected)
   │  ├─ Attach CSRF token (if needed)      │
   │  └─ Log request (dev only)              │
   │                                          │
   │  RESPONSE INTERCEPTORS:                 │
   │  ├─ Check 401 → Logout & dispatch event │
   │  ├─ Parse errors into ParsedApiError    │
   │  └─ Log response (dev only)             │
   └─────────────────────────────────────────┘
        │
        │ HTTP Requests via axios
        │
┌───────▼─────────────────────────────────────────┐
│           FASTAPI BACKEND                        │
│  http://localhost:8000/api                      │
│                                                  │
│  Endpoints:                                     │
│  ├─ POST   /auth/login                         │
│  ├─ POST   /auth/register                      │
│  ├─ GET    /places (paginated)                 │
│  ├─ POST   /places (protected)                 │
│  ├─ GET    /events (paginated)                 │
│  ├─ POST   /events (protected)                 │
│  ├─ GET    /gallery                            │
│  ├─ POST   /gallery/upload (protected)         │
│  └─ GET    /bookings/me (protected)            │
│                                                  │
│  Auth Strategy:                                 │
│  ├─ Accept: Authorization: Bearer <token>      │
│  ├─ Return: 401 if token invalid/expired       │
│  └─ Accept: Access token only (no refresh)     │
└──────────────────────────────────────────────────┘
        │
        ▼
┌────────────────────┐
│  Database          │
│  (PostgreSQL)      │
└────────────────────┘
```

---

## 🔄 Authentication Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│ 1. USER LOGS IN                                              │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
    ┌────────────────────────────────────────┐
    │ Component calls:                        │
    │ authService.login({email, password})   │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ publicApi.post('/auth/login', {...})   │
    │ (No token injection)                   │
    └────────────────┬───────────────────────┘
                     │ HTTP POST
                     ▼
    ┌────────────────────────────────────────┐
    │ FastAPI Login Endpoint                 │
    │ Validates credentials                  │
    │ Generates JWT token                    │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ Returns: {                             │
    │   access_token: "eyJhbGc...",         │
    │   user: { id, email, full_name }      │
    │ }                                      │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ tokenManager.setToken(access_token)    │
    │ localStorage.setItem(                  │
    │   'osam_access_token',                 │
    │   'eyJhbGc...'                        │
    │ )                                      │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ Component receives user object         │
    │ AuthContext updates state              │
    │ Redirect to dashboard                  │
    └────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│ 2. USER MAKES PROTECTED REQUEST                             │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
    ┌────────────────────────────────────────┐
    │ Component calls:                        │
    │ bookingsService.getMyBookings()        │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ protectedApi.get('/bookings/me')       │
    └────────────────┬───────────────────────┘
                     │
    REQUEST INTERCEPTOR RUNS:
    │
    │ const token = tokenManager.getToken()
    │ // Returns: "eyJhbGc..."
    │
    │ headers.Authorization = "Bearer eyJhbGc..."
    │
                     ▼
    ┌────────────────────────────────────────────┐
    │ HTTP GET /api/bookings/me                  │
    │ Headers:                                   │
    │   Authorization: Bearer eyJhbGc...        │
    │   Content-Type: application/json          │
    └────────────────┬───────────────────────────┘
                     │ HTTP Request
                     ▼
    ┌────────────────────────────────────────┐
    │ FastAPI Protected Endpoint              │
    │ Validates token                        │
    │ Returns user's bookings                │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ Returns: { items: [...], total: 5 }    │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ Response Interceptor:                  │
    │ - No 401, so no error handling        │
    │ - Return data to service              │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ Service returns PaginatedResponse      │
    │ Component receives typed data          │
    │ Display bookings in UI                 │
    └────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────────┐
│ 3. TOKEN EXPIRES (401 Response)                             │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
    ┌────────────────────────────────────────┐
    │ Protected request with expired token   │
    │ FastAPI returns: 401 Unauthorized      │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │ Response Interceptor catches 401:      │
    │                                        │
    │ if (status === 401) {                 │
    │   tokenManager.clearAuth()  ─────┐   │
    │   window.dispatchEvent(      ────┼─┐ │
    │     new Event('auth:logout')  ───┼─┼─┼──┐
    │   )                           ────┼─┼─┼──┼──┐
    │ }                                 │ │ │  │  │
    └────────────────┬───────────────────┘ │ │  │  │
                     │                     │ │  │  │
    CACHE CLEANED:   │                     │ │  │  │
                     ▼                     │ │  │  │
    ┌────────────────────────────────────┐ │ │  │  │
    │ localStorage.removeItem(         ◄─┘ │  │  │
    │   'osam_access_token'               │  │  │
    │ )                                   │  │  │
    └─────────────────────────────────────┘  │  │
                                             │  │
    EVENT DISPATCHED:                        │  │
                                             │  │
                        ▼◄────────────────────┘  │
    ┌────────────────────────────────┐          │
    │ window.dispatchEvent(          │          │
    │   'auth:logout' event          │          │
    │ )                              │          │
    └────────────────┬───────────────┘          │
                     │                          │
    AUTH CONTEXT LISTENS:                      │
                     │                          │
                     ▼                          │
    ┌────────────────────────────────────┐    │
    │ AuthContext event listener:       │    │
    │ window.addEventListener(           │    │
    │   'auth:logout',                   │    │
    │   () => {                          │    │
    │     setUser(null)     ◄────────────┘    │
    │     navigate('/login')                  │
    │   }                                     │
    │ )                                      │
    └────────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────┐
    │ User state cleared                 │
    │ Redirect to login page             │
    │ User sees login form               │
    └────────────────────────────────────┘
```

---

## 📊 Request/Response Flow by Endpoint Type

### Public Endpoint (GET /places)
```
Component
    │
    ▼
placesService.getPlaces()
    │
    ▼
publicApi.get('/places')
    │
    ├─ Request Interceptor
    │  ├─ Log request (dev)
    │  ├─ NO token injection
    │  └─ Send request
    │
    ▼
FastAPI: GET /api/places
    │
    ├─ Check if query params valid
    ├─ Query database
    ├─ Return JSON
    │
    ▼
Response: 200 OK
{
  items: [...],
  total: 100,
  page: 1
}
    │
    ├─ Response Interceptor
    │  ├─ Log response (dev)
    │  └─ Return data
    │
    ▼
Service parses response
    │
    ▼
Component receives PaginatedResponse<Place>
```

### Protected Endpoint (POST /bookings)
```
Component
    │
    ▼
bookingsService.createBooking(payload)
    │
    ▼
protectedApi.post('/bookings', payload)
    │
    ├─ Request Interceptor
    │  ├─ Read token: "eyJhbGc..."
    │  ├─ Add header: Authorization: Bearer eyJhbGc...
    │  ├─ Log request (dev)
    │  └─ Send request
    │
    ▼
FastAPI: POST /api/bookings
    │
    ├─ Extract Authorization header
    ├─ Validate JWT token signature
    ├─ Check token expiration
    ├─ Get user ID from token
    ├─ Validate request payload
    ├─ Create booking in database
    ├─ Return created resource
    │
    ▼
Response: 201 Created
{
  id: "booking-123",
  user_id: "user-456",
  status: "confirmed"
}
    │
    ├─ Response Interceptor
    │  ├─ Status is 201 (success)
    │  ├─ NO 401, so no logout
    │  ├─ Log response (dev)
    │  └─ Return data
    │
    ▼
Service parses response
    │
    ▼
Component receives Booking
    │
    ▼
Show success message
```

### Protected Endpoint (401 Unauthorized)
```
Component
    │
    ▼
bookingsService.getMyBookings()
    │ (Token expired in localStorage)
    ▼
protectedApi.get('/bookings/me')
    │
    ├─ Request Interceptor
    │  ├─ Read token: "eyJhbGc..." (expired)
    │  ├─ Add header: Authorization: Bearer eyJhbGc...
    │  └─ Send request
    │
    ▼
FastAPI: GET /api/bookings/me
    │
    ├─ Extract token from header
    ├─ Validate signature: ✓ OK
    ├─ Check expiration: ✗ EXPIRED
    │
    ▼
Response: 401 Unauthorized
{
  detail: "Token has expired"
}
    │
    ├─ Response Interceptor
    │  ├─ Status is 401: HANDLE ERROR
    │  ├─ Call: tokenManager.clearAuth()
    │  │   └─ localStorage.removeItem('osam_access_token')
    │  ├─ Dispatch: window.dispatchEvent('auth:logout')
    │  └─ Return error promise
    │
    ▼
Promise rejected with AxiosError
    │
    ▼
Service catches error
    │
    ▼
parseApiError(error)
    │
    ▼
throw ParsedApiError
    │
    ▼
Component catch block
    │
    ├─ AuthContext event listener catches 'auth:logout'
    │  ├─ setUser(null)
    │  └─ navigate('/login')
    │
    ▼
Redirect to login page
```

---

## 🔐 Token Storage & Lifecycle

```
┌──────────────────────────────┐
│ BROWSER ENVIRONMENT          │
│                              │
│ ┌────────────────────────┐  │
│ │  localStorage          │  │
│ │  (Persistent Storage) │  │
│ │                        │  │
│ │ osam_access_token:    │  │
│ │ "eyJhbGciOiJIUzI1NiIs │  │
│ │  InR5cCI6IkpXVCJ9..." │  │
│ │                        │  │
│ │ Survives:              │  │
│ │ ✓ Page reload         │  │
│ │ ✓ Tab close/reopen    │  │
│ │ ✓ Browser restart     │  │
│ │                        │  │
│ │ Cleared on:            │  │
│ │ ✗ 401 response        │  │
│ │ ✗ Logout clicked      │  │
│ │ ✗ localStorage cleared│  │
│ └────────────────────────┘  │
│                              │
│ tokenManager                 │
│ ├─ getToken()              │
│ ├─ setToken(token)         │
│ ├─ clearToken()            │
│ ├─ hasToken()              │
│ ├─ getAuthHeader()         │
│ └─ clearAuth()             │
│                              │
│ protectedApi                 │
│ ├─ Request: Injects token   │
│ ├─ Response: Handles 401    │
│ └─ Dispatches 'auth:logout' │
└──────────────────────────────┘
        │
        │ localStorage key set in config
        │ Can be changed in .env
        │
┌───────▼──────────────────────┐
│ SERVER (FastAPI)             │
│                              │
│ Validates JWT:               │
│ ├─ Signature verification   │
│ ├─ Expiration check         │
│ ├─ User ID extraction       │
│ └─ Permission check         │
│                              │
│ On valid token:             │
│ ├─ Execute endpoint logic   │
│ └─ Return 200 + data       │
│                              │
│ On invalid token:           │
│ ├─ Return 401 Unauthorized  │
│ └─ No data returned         │
└──────────────────────────────┘
```

---

## 🛠️ Configuration Locations

```
.env.local                    NEXT_PUBLIC_*
│                            │
├─ NEXT_PUBLIC_API_BASE_URL ─┬─→ config.API_BASE_URL
├─ NEXT_PUBLIC_API_TIMEOUT ──┬─→ config.API_TIMEOUT
├─ NEXT_PUBLIC_TOKEN_KEY ────┬─→ config.TOKEN_KEY
├─ NODE_ENV ─────────────────┬─→ config.IS_PRODUCTION
│                            │
src/api/config.ts (reads env vars)
│
├─→ src/api/axios/instances.ts (uses config)
├─→ src/api/services/*.ts (uses instances)
├─→ src/api/utils/tokenManager.ts (uses config)
│
src/api/index.ts (exports everything)
│
Components import from @/api
```

---

## 🎯 Data Flow Summary

```
Component renders
    │
    ▼
User interaction (click, submit, etc)
    │
    ▼
Component calls: await service.operation(data)
    │
    ▼
Service method validates input (TypeScript)
    │
    ▼
Service calls: await apiInstance.method(endpoint, payload)
    │
    ▼
Request Interceptor:
├─ (Protected) Add token to header
├─ Log request (dev)
└─ Send HTTP request
    │
    ▼
FastAPI Backend:
├─ Validate authentication (if protected)
├─ Validate payload (Pydantic)
├─ Execute business logic
├─ Query database
└─ Return response
    │
    ▼
Response Interceptor:
├─ Check status code
├─ Handle 401 (token expired)
├─ Log response (dev)
└─ Return data or error
    │
    ▼
Service catches error:
├─ Parse error with parseApiError()
└─ Throw ParsedApiError
    │
    ▼
Component catch block:
├─ Display error message
├─ Update error state
└─ User sees error UI
    │
    OR if success:
    │
    ▼
Component receives data:
├─ Update state with data
├─ Trigger UI update
└─ User sees result
```

---

## 📋 File Dependencies

```
index.ts (central export)
│
├── services/auth.ts
│   ├── axios/instances.ts
│   ├── config.ts
│   ├── constants.ts
│   ├── types/auth.ts
│   ├── utils/tokenManager.ts
│   └── utils/apiErrorHandler.ts
│
├── services/places.ts
│   ├── axios/instances.ts
│   ├── constants.ts
│   ├── types/api.ts
│   └── utils/apiErrorHandler.ts
│
├── services/events.ts
├── services/gallery.ts
├── services/bookings.ts
│   └── (same as places)
│
├── axios/instances.ts
│   ├── config.ts
│   ├── utils/tokenManager.ts
│   └── (no service imports - intentional)
│
├── utils/tokenManager.ts
│   └── config.ts
│
├── utils/apiErrorHandler.ts
│   └── types/error.ts
│
├── types/api.ts
├── types/auth.ts
└── types/error.ts
    └── (no external imports)
```

**Key Principle**: No circular dependencies. Services → Axios → Utils → Types (one-way dependency tree).

