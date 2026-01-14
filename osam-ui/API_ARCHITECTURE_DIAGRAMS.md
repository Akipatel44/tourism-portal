# API Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                      OSAM Tourism Platform                          │
│                      Frontend (React + Vite)                        │
└─────────────────────────────────────────────────────────────────────┘

                         ┌─────────────────┐
                         │ React Components│
                         │   (Future)      │
                         └────────┬────────┘
                                  │ imports
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API Layer (src/api)                         │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                     API Services                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │  │
│  │  │  publicApi   │  │ protectedApi │  │   authApi    │       │  │
│  │  ├──────────────┤  ├──────────────┤  ├──────────────┤       │  │
│  │  │ .places      │  │ .places      │  │ .login()     │       │  │
│  │  │ .events      │  │ .events      │  │ .register()  │       │  │
│  │  │ .galleries   │  │ .galleries   │  │ .logout()    │       │  │
│  │  │              │  │              │  │ .getCurrentUser()    │  │
│  │  │ No auth req. │  │ Auth req.    │  │ .changePassword()    │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘       │  │
│  │                                                              │  │
│  │  ┌──────────────┐  ┌──────────────┐                         │  │
│  │  │tokenStorage  │  │ tokenUtils   │                         │  │
│  │  ├──────────────┤  ├──────────────┤                         │  │
│  │  │ .getToken()  │  │ .isExpired() │                         │  │
│  │  │ .setToken()  │  │ .decode()    │                         │  │
│  │  │ .clearAll()  │  │ .getExpiration()                       │  │
│  │  └──────────────┘  └──────────────┘                         │  │
│  │                                                              │  │
│  └──────────────────────┬───────────────────────────────────────┘  │
│                         │                                           │
│  ┌──────────────────────▼───────────────────────────────────────┐  │
│  │           HTTP Client Layer (src/api/client.ts)              │  │
│  │                      Axios Instance                          │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ • Base URL: env VITE_API_BASE_URL                            │  │
│  │ • Timeout: env VITE_API_TIMEOUT                              │  │
│  │                                                              │  │
│  │ Request Interceptor:                                         │  │
│  │  ├─ Auto-inject Authorization: Bearer {token}                │  │
│  │  └─ Set request timeout                                      │  │
│  │                                                              │  │
│  │ Response Interceptor:                                        │  │
│  │  ├─ 401 Unauthorized → dispatch auth:unauthorized event     │  │
│  │  ├─ 403 Forbidden → log denied access                       │  │
│  │  └─ Transform response/error format                         │  │
│  │                                                              │  │
│  └──────────────────────┬───────────────────────────────────────┘  │
│                         │                                           │
│  ┌──────────────────────▼───────────────────────────────────────┐  │
│  │     Token Storage Layer (localStorage)                       │  │
│  │                                                              │  │
│  │  Key: osam_access_token                                      │  │
│  │  Value: JWT Token (from login)                               │  │
│  │  Persistence: Across sessions                                │  │
│  │                                                              │  │
│  └──────────────────────┬───────────────────────────────────────┘  │
│                         │                                           │
└─────────────────────────┼───────────────────────────────────────────┘
                          │ HTTP Requests
                          │ (axios)
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FastAPI Backend (osam-api)                       │
│              http://localhost:8000/api/v1                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐  ┌──────────────┐  ┌───────────────┐         │
│  │  Public Routes  │  │ Auth Routes  │  │ Admin Routes  │         │
│  ├─────────────────┤  ├──────────────┤  ├───────────────┤         │
│  │ GET /places     │  │ POST /login  │  │ POST /admin/* │         │
│  │ GET /events     │  │ POST /reg... │  │ PUT /admin/*  │         │
│  │ GET /galleries  │  │ GET /me      │  │ DEL /admin/*  │         │
│  │ GET /mythology  │  │ PUT /profile │  │ PATCH /admin/*│         │
│  │ GET /nature     │  │ POST /logout │  │               │         │
│  │                 │  │              │  │               │         │
│  │ No JWT Required │  │ JWT Required │  │ JWT Required  │         │
│  └─────────────────┘  └──────────────┘  └───────────────┘         │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │            JWT Validation Middleware                    │       │
│  │  • Extract token from Authorization header              │       │
│  │  • Validate token signature                             │       │
│  │  • Check token expiration                               │       │
│  │  • Verify user permissions                              │       │
│  └─────────────────────────────────────────────────────────┘       │
│                              │                                      │
│  ┌───────────────────────────▼──────────────────────────────┐       │
│  │           Application Logic & Business Rules             │       │
│  │  • Data validation                                       │       │
│  │  • Business logic implementation                         │       │
│  │  • Error handling                                        │       │
│  └───────────────────────────┬──────────────────────────────┘       │
│                              │                                      │
│  ┌───────────────────────────▼──────────────────────────────┐       │
│  │         Database Layer (MySQL - osam_tourism)            │       │
│  │  • Users (id, username, email, hashed_password)          │       │
│  │  • Places (id, name, location, description)              │       │
│  │  • Events (id, name, date, place_id)                     │       │
│  │  • Galleries (id, name, place_id)                        │       │
│  │  • Gallery Images (id, gallery_id, image_url)            │       │
│  │  • Relationships & constraints                           │       │
│  └───────────────────────────────────────────────────────────┘       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Public Data Fetch Flow

```
React Component
      │
      ├─ import { publicApi } from '@/api'
      │
      ▼
publicApi.places.getPlaces()
      │
      ├─ Call GET /places
      │
      ▼
apiClient.get('/places')
      │
      ├─ Request Interceptor
      │  └─ No token needed (public)
      │
      ├─ HTTP GET request
      │
      ▼
FastAPI Backend
      │
      ├─ Route Handler (public)
      │  └─ No auth check
      │
      ├─ Database Query
      │
      ▼
Response (JSON)
      │
      ├─ Response Interceptor
      │  └─ Transform to standardized format
      │
      ▼
Promise<Place[]>
      │
      ▼
Component State Update
```

---

### Protected Data Operation Flow (with Auth)

```
React Component (Admin)
      │
      ├─ await authApi.login(credentials)
      │
      ▼
API: POST /auth/login
      │
      ├─ Request Interceptor
      │  └─ No token (not authenticated yet)
      │
      ├─ Backend validates credentials
      │
      ├─ Backend generates JWT token
      │
      ▼
Response: { access_token: "jwt...", user: {...} }
      │
      ├─ Response Interceptor
      │  └─ Extract token
      │
      ├─ tokenStorage.setAccessToken(token)
      │  └─ Stored in localStorage
      │
      ▼
Now authenticated for protected routes

React Component
      │
      ├─ protectedApi.places.createPlace(data)
      │
      ▼
apiClient.post('/admin/places', data)
      │
      ├─ Request Interceptor
      │  ├─ Get token from tokenStorage
      │  └─ Add Header: Authorization: Bearer {token}
      │
      ├─ HTTP POST request with token
      │
      ▼
FastAPI Backend
      │
      ├─ JWT Validation Middleware
      │  ├─ Extract token from header
      │  ├─ Validate signature
      │  └─ Verify not expired
      │
      ├─ Route Handler (protected)
      │  ├─ Check user_id from token
      │  ├─ Check admin role
      │
      ├─ Business Logic
      │  ├─ Validate input
      │  ├─ Database insert
      │
      ▼
Response: { id: 123, name: "...", ... }
      │
      ├─ Response Interceptor
      │  └─ Parse and return
      │
      ▼
Promise<Place>
      │
      ▼
Component State Update with new Place
```

---

### Error Handling Flow

```
API Call
      │
      ├─ Axios makes request
      │
      ▼
Response Interceptor
      │
      ├─ Check response.status
      │
      ├─ 200-299: Success
      │  └─ Return data as-is
      │
      ├─ 401: Unauthorized
      │  ├─ tokenStorage.clearAll()
      │  ├─ dispatch 'auth:unauthorized' event
      │  └─ throw ApiError
      │
      ├─ 403: Forbidden
      │  ├─ Log to console
      │  └─ throw ApiError
      │
      ├─ 4xx: Client Error
      │  ├─ Log error details
      │  └─ throw ApiError
      │
      ├─ 5xx: Server Error
      │  ├─ Log error details
      │  └─ throw ApiError
      │
      ▼
Component try/catch block
      │
      ├─ catch (error)
      │  ├─ error.status (HTTP status)
      │  ├─ error.message (user-friendly message)
      │  └─ error.data (raw response)
      │
      ▼
Handle error appropriately
      │
      ├─ Show error message to user
      ├─ Redirect to login if 401
      └─ Retry request or fallback
```

---

## Token Lifecycle Diagram

```
Initial State
      │
      ├─ No token in localStorage
      └─ isAuthenticated = false

User Login
      │
      ├─ authApi.login(credentials)
      │
      ├─ Validation on backend
      │
      ├─ Generate JWT token
      │  └─ exp: current_time + token_lifetime
      │
      │
      ├─ Return token to frontend
      │
      ├─ tokenStorage.setAccessToken(token)
      │  └─ Stored: localStorage['osam_access_token']
      │
      ▼
Authenticated State
      │
      ├─ Token in localStorage
      ├─ Token injected in every request
      └─ isAuthenticated = true

Protected API Calls
      │
      ├─ Request with Authorization header
      │
      ├─ Backend validates token
      │
      ├─ Token valid?
      │  ├─ YES: Process request
      │  │       Return data
      │  │
      │  └─ NO: Return 401
      │         Browser: dispatch 'auth:unauthorized'
      │         Clear token: tokenStorage.clearAll()
      │
      ▼
Token Expiration Check (Client-side)
      │
      ├─ tokenUtils.isTokenExpired()
      │  ├─ Decode token
      │  └─ Compare exp with current time
      │
      ├─ If expired: tokenStorage.clearAccessToken()
      │
      ▼
User Logout
      │
      ├─ authApi.logout()
      │
      ├─ Clear from storage: tokenStorage.clearAll()
      │  └─ localStorage['osam_access_token'] = null
      │
      ▼
Logged Out State
      │
      ├─ No token in localStorage
      ├─ Public API accessible
      └─ Protected API returns 401
```

---

## Folder Structure

```
osam-ui/
│
├── src/
│   ├── api/                      ◄─── API LAYER
│   │   ├── client.ts             HTTP client setup
│   │   ├── tokenStorage.ts       Token management
│   │   ├── public.ts             Public endpoints
│   │   ├── protected.ts          Admin endpoints
│   │   ├── auth.ts               Authentication
│   │   └── index.ts              Central exports
│   │
│   ├── components/               React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Icons.tsx
│   │   ├── Layout.tsx
│   │   ├── Loader.tsx
│   │   ├── EmptyState.tsx
│   │   └── ... (11 total)
│   │
│   ├── pages/                    Page components
│   │   ├── HomePage.tsx
│   │   ├── PlacesPage.tsx
│   │   ├── PlaceDetailPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── ... (9 total)
│   │
│   ├── constants/                Constants
│   ├── design/                   Design system
│   │
│   ├── App.tsx                   Router setup
│   ├── main.tsx                  Entry point
│   └── index.css                 Tailwind styles
│
├── .env                          Dev environment
├── .env.production               Prod environment
│
├── API_ARCHITECTURE.md           Complete guide
├── API_QUICK_REFERENCE.md        Quick start
├── API_SETUP_GUIDE.md            Setup help
├── API_ARCHITECTURE_COMPLETE.md  This summary
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## API Service Methods Reference

### publicApi

```
publicApi.places
├── .getPlaces(params?)              Returns Place[] or PaginatedResponse<Place>
├── .getPlace(id)                    Returns Place
├── .getPlacesBySeason(season)       Returns Place[]
└── .searchPlaces(query)             Returns Place[]

publicApi.events
├── .getEvents(params?)              Returns Event[] or PaginatedResponse<Event>
├── .getEvent(id)                    Returns Event
├── .getUpcomingEvents(limit?)       Returns Event[]
└── .getEventsByPlace(placeId)       Returns Event[]

publicApi.galleries
├── .getGalleries(params?)           Returns Gallery[] or PaginatedResponse<Gallery>
├── .getGallery(id)                  Returns Gallery
├── .getGalleryImages(galleryId)     Returns GalleryImage[]
└── .getGalleriesByPlace(placeId)    Returns Gallery[]
```

### protectedApi

```
protectedApi.places
├── .createPlace(data)               Returns Place
├── .updatePlace(id, data)           Returns Place
├── .deletePlace(id)                 Returns { message: string }
└── .bulkUpdatePlaces(updates)       Returns Place[]

protectedApi.events
├── .createEvent(data)               Returns Event
├── .updateEvent(id, data)           Returns Event
├── .deleteEvent(id)                 Returns { message: string }
└── .updateEventCapacity(id, seats)  Returns Event

protectedApi.galleries
├── .createGallery(data)             Returns Gallery
├── .updateGallery(id, data)         Returns Gallery
├── .deleteGallery(id)               Returns { message: string }
├── .addGalleryImage(data)           Returns GalleryImage
├── .deleteGalleryImage(...)         Returns { message: string }
└── .reorderImages(galleryId, ids)   Returns GalleryImage[]
```

### authApi

```
authApi
├── .login(credentials)              Returns { token, user }
├── .register(data)                  Returns RegisterResponse
├── .logout()                        Returns void
├── .getCurrentUser()                Returns User
├── .updateProfile(data)             Returns UpdateProfileResponse
├── .changePassword(old, new)        Returns { message: string }
├── .isAdmin()                       Returns boolean
├── .verifyToken()                   Returns boolean
└── .requestPasswordReset(email)     Returns { message: string }
```

### tokenStorage

```
tokenStorage
├── .getAccessToken()                Returns string | null
├── .setAccessToken(token)           Returns void
├── .clearAccessToken()              Returns void
├── .hasAccessToken()                Returns boolean
└── .clearAll()                      Returns void
```

### tokenUtils

```
tokenUtils
├── .isTokenExpired(token?)          Returns boolean
├── .decodeToken(token?)             Returns any (payload)
├── .getTokenExpiration(token?)      Returns Date | null
└── .getTimeUntilExpiration(token?)  Returns number (ms)
```

---

## Configuration Summary

```
Development (.env):
  VITE_API_BASE_URL=http://localhost:8000/api/v1
  VITE_API_TIMEOUT=30000
  VITE_LOG_LEVEL=debug
  VITE_LOG_API_CALLS=true

Production (.env.production):
  VITE_API_BASE_URL=https://api.osam-tourism.com/api/v1
  VITE_API_TIMEOUT=45000
  VITE_LOG_LEVEL=error
  VITE_LOG_API_CALLS=false
```

---

## Security Summary

```
┌─────────────────────────────────────┐
│    Frontend (React + API Layer)     │
├─────────────────────────────────────┤
│ Token Storage: localStorage         │
│ Token Lifecycle: Login → Stored     │
│ Token Usage: Auto-injected header   │
│ Token Clearing: Logout clears       │
└─────────────────────────────────────┘
             HTTPS (Prod)
┌─────────────────────────────────────┐
│      Backend (FastAPI)              │
├─────────────────────────────────────┤
│ JWT Validation: Every request       │
│ Token Check: Signature + Expiry     │
│ Permission Check: User role         │
│ Error Response: Clear messages      │
└─────────────────────────────────────┘
             Database
┌─────────────────────────────────────┐
│      MySQL (osam_tourism)           │
├─────────────────────────────────────┤
│ Users: Hashed passwords             │
│ Sessions: No stored sessions        │
│ Encryption: In transit via HTTPS    │
└─────────────────────────────────────┘
```

---

**Diagram Legend:**
- `─►` = Direct connection
- `│` = Flow
- `▼` = Next step
- `◄─` = References

**Last Updated:** API Architecture Complete
**Status:** Ready for integration
