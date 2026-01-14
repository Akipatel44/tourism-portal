# API Architecture Guide

## Overview

The OSAM Tourism Platform implements a clean, layered API architecture with clear separation of concerns. The API layer is built on Axios and provides type-safe interfaces to the FastAPI backend.

## Architecture Layers

### 1. HTTP Client Layer (`src/api/client.ts`)

**Purpose:** Core Axios instance with request/response interceptors

**Responsibilities:**
- Configure base URL from environment variables
- Auto-inject JWT tokens in Authorization headers
- Handle 401 (Unauthorized) errors
- Handle 403 (Forbidden) errors
- Transform API responses
- Standardize error format

**Key Features:**
- Environment-based configuration (dev/prod)
- Automatic token injection via interceptor
- Auth event dispatcher for 401 errors
- TypeScript-typed error/response interfaces

**Usage:**
```typescript
import { apiClient } from '@/api';

const response = await apiClient.get('/endpoint');
```

---

### 2. Token Storage Layer (`src/api/tokenStorage.ts`)

**Purpose:** Secure token management and validation

**Responsibilities:**
- Store/retrieve access tokens from localStorage
- Clear tokens on logout
- Validate token expiration
- Decode JWT payload
- Manage auth state

**Token Storage Interface:**
```typescript
tokenStorage.getAccessToken()    // Get current token
tokenStorage.setAccessToken()    // Store token
tokenStorage.clearAccessToken()  // Remove token
tokenStorage.hasAccessToken()    // Check if token exists
tokenStorage.clearAll()          // Clear all auth data
```

**Token Utilities:**
```typescript
tokenUtils.isTokenExpired()       // Check if expired
tokenUtils.decodeToken()          // Decode JWT payload
tokenUtils.getTokenExpiration()   // Get expiration time
tokenUtils.getTimeUntilExpiration() // Get remaining time
```

**Authentication State Hook:**
```typescript
const { isAuthenticated, token, isExpired, expiresAt } = useAuthState();
```

**Storage Strategy:**
- **Access Token:** Stored in localStorage
- **Refresh Token:** Not used (single token strategy)
- **Storage Key:** `osam_access_token`
- **Validation:** Client-side expiration check + server validation

---

### 3. Public API Service Layer (`src/api/public.ts`)

**Purpose:** API endpoints that don't require authentication

**Endpoints Provided:**
- `placesApi.getPlaces()` - Get all places with pagination/filtering
- `placesApi.getPlace(id)` - Get single place by ID
- `placesApi.getPlacesBySeason(season)` - Filter by season
- `placesApi.searchPlaces(query)` - Search by keyword
- `eventsApi.getEvents()` - Get all events with pagination
- `eventsApi.getEvent(id)` - Get single event
- `eventsApi.getUpcomingEvents()` - Get upcoming events
- `eventsApi.getEventsByPlace(placeId)` - Get events for a place
- `galleriesApi.getGalleries()` - Get all galleries
- `galleriesApi.getGallery(id)` - Get single gallery
- `galleriesApi.getGalleryImages(galleryId)` - Get gallery images
- `galleriesApi.getGalleriesByPlace(placeId)` - Get galleries for place

**Exported Namespace:**
```typescript
import { publicApi } from '@/api';

// Usage
const places = await publicApi.places.getPlaces();
const events = await publicApi.events.getEvents();
const galleries = await publicApi.galleries.getGalleries();
```

**Type Safety:**
All responses are fully typed with interfaces:
- `Place` - Mythological place with location and significance
- `Event` - Cultural event with date and capacity
- `Gallery` - Image collection with associated place
- `GalleryImage` - Individual gallery image with metadata
- `PaginatedResponse<T>` - Pagination metadata

---

### 4. Protected API Service Layer (`src/api/protected.ts`)

**Purpose:** Admin CRUD operations requiring authentication

**Access Control:** All requests require valid JWT token in Authorization header (auto-injected)

**Endpoints Provided:**

#### Places Management
- `protectedPlacesApi.createPlace(data)` - Create new place
- `protectedPlacesApi.updatePlace(id, data)` - Update place
- `protectedPlacesApi.deletePlace(id)` - Delete place
- `protectedPlacesApi.bulkUpdatePlaces(updates)` - Batch update

#### Events Management
- `protectedEventsApi.createEvent(data)` - Create event
- `protectedEventsApi.updateEvent(id, data)` - Update event
- `protectedEventsApi.deleteEvent(id)` - Delete event
- `protectedEventsApi.updateEventCapacity(id, seats)` - Update available seats

#### Galleries Management
- `protectedGalleriesApi.createGallery(data)` - Create gallery
- `protectedGalleriesApi.updateGallery(id, data)` - Update gallery
- `protectedGalleriesApi.deleteGallery(id)` - Delete gallery
- `protectedGalleriesApi.addGalleryImage(data)` - Add image to gallery
- `protectedGalleriesApi.deleteGalleryImage(galleryId, imageId)` - Remove image
- `protectedGalleriesApi.reorderImages(galleryId, imageIds)` - Reorder images

**Exported Namespace:**
```typescript
import { protectedApi } from '@/api';

// Usage (requires authentication)
const newPlace = await protectedApi.places.createPlace(data);
const updated = await protectedApi.events.updateEvent(id, data);
await protectedApi.galleries.deleteGallery(galleryId);
```

**Request Types:** All operations export request interfaces for type safety:
- `CreatePlaceRequest` / `UpdatePlaceRequest`
- `CreateEventRequest` / `UpdateEventRequest`
- `CreateGalleryRequest` / `UpdateGalleryRequest`
- `UploadGalleryImageRequest`

---

### 5. Authentication Service (`src/api/auth.ts`)

**Purpose:** User authentication and profile management

**Core Methods:**

```typescript
// Login
const { token, user } = await authApi.login({
  username: 'user@example.com',
  password: 'password123'
});
// Token automatically stored in localStorage

// Register
const registered = await authApi.register({
  username: 'newuser',
  email: 'user@example.com',
  password: 'secure123',
  full_name: 'John Doe'
});

// Get current user
const user = await authApi.getCurrentUser();

// Update profile
const updated = await authApi.updateProfile({
  full_name: 'Jane Doe',
  email: 'jane@example.com'
});

// Change password
await authApi.changePassword('oldPassword', 'newPassword');

// Logout
await authApi.logout();
// Token automatically cleared from storage

// Check admin status
const isAdmin = await authApi.isAdmin();

// Verify token validity
const isValid = authApi.verifyToken();
```

**Authentication Events:**

The auth service dispatches custom events for global listeners:

```typescript
import { listenToAuthEvent, createAuthEvent } from '@/api';

// Listen to login event
const unsubscribe = listenToAuthEvent('login', (user) => {
  console.log('User logged in:', user);
});

// Later, unsubscribe
unsubscribe();
```

**Type Definitions:**
- `User` - User profile with admin status
- `LoginRequest` / `LoginResponse`
- `RegisterRequest` / `RegisterResponse`
- `UpdateProfileRequest` / `UpdateProfileResponse`
- `ApiErrorResponse` - Standardized error format

---

## Environment Configuration

### Development (`.env`)
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=30000
VITE_APP_ENV=development
VITE_AUTH_ENABLED=true
VITE_LOG_LEVEL=debug
VITE_LOG_API_CALLS=true
```

### Production (`.env.production`)
```
VITE_API_BASE_URL=https://api.osam-tourism.com/api/v1
VITE_API_TIMEOUT=45000
VITE_APP_ENV=production
VITE_AUTH_ENABLED=true
VITE_LOG_LEVEL=error
VITE_LOG_API_CALLS=false
```

**Available Variables:**
- `VITE_API_BASE_URL` - FastAPI backend URL
- `VITE_API_TIMEOUT` - Request timeout in milliseconds
- `VITE_APP_ENV` - Environment name
- `VITE_AUTH_ENABLED` - Enable/disable auth
- `VITE_LOG_LEVEL` - Logging verbosity

---

## Error Handling Strategy

All API calls throw standardized error objects:

```typescript
try {
  const place = await publicApi.places.getPlace(999);
} catch (error) {
  // Error structure
  {
    status: number;      // HTTP status code
    message: string;     // User-friendly message
    data?: any;          // Raw response data
  }
}
```

**Error Handling in Client:**
- **401 Unauthorized:** Token is invalid/expired → dispatches `auth:unauthorized` event
- **403 Forbidden:** User lacks permissions → logged to console
- **4xx Client Errors:** Validation/parameter errors → thrown with detail
- **5xx Server Errors:** Backend issues → thrown with message

---

## Security Implementation

### Token Management
1. **Storage:** Access token in localStorage (persistent across sessions)
2. **Injection:** Automatic via request interceptor (no manual header setting)
3. **Validation:** Client-side expiration check + server-side validation
4. **Logout:** Complete token and auth data clearing

### Request Security
1. **HTTPS:** Required for production (enforced by backend redirect)
2. **CORS:** Configured on FastAPI backend
3. **Header Injection:** Authorization header auto-set by interceptor
4. **Token Format:** Bearer token in Authorization header

### Response Security
1. **HTTPS:** Encrypted in transit
2. **CSRF Protection:** FastAPI provides (cookies not used)
3. **Error Disclosure:** Sensitive info not logged in production

---

## Usage Patterns

### Pattern 1: Fetching Public Data
```typescript
import { publicApi } from '@/api';

// Fetch places
const places = await publicApi.places.getPlaces({ limit: 10 });

// Fetch events
const events = await publicApi.events.getUpcomingEvents();
```

### Pattern 2: Protected CRUD Operations
```typescript
import { protectedApi } from '@/api';

// Create
const newPlace = await protectedApi.places.createPlace({
  name: 'New Temple',
  description: '...',
  location: 'Latitude, Longitude',
  // ... other fields
});

// Update
const updated = await protectedApi.places.updatePlace(id, {
  name: 'Updated Temple'
});

// Delete
await protectedApi.places.deletePlace(id);
```

### Pattern 3: Authentication Flow
```typescript
import { authApi, tokenStorage } from '@/api';

// Login
const { token, user } = await authApi.login({
  username: 'admin@example.com',
  password: 'password'
});

// Token auto-stored, used in subsequent requests

// Get user info
const currentUser = await authApi.getCurrentUser();

// Logout
await authApi.logout();
// Token auto-cleared
```

### Pattern 4: Global Auth Events
```typescript
import { listenToAuthEvent } from '@/api';

// Listen to unauthorized errors (401)
listenToAuthEvent('unauthorized', () => {
  // Redirect to login, show message, etc.
  window.location.href = '/login';
});
```

---

## Folder Structure

```
src/api/
├── client.ts              # Axios instance + interceptors
├── tokenStorage.ts        # Token management
├── public.ts              # Public endpoints
├── protected.ts           # Protected/admin endpoints
├── auth.ts                # Authentication endpoints
└── index.ts               # Central exports
```

---

## Integration Checklist

Before integrating API into pages:

- [ ] `.env` file configured with `VITE_API_BASE_URL`
- [ ] Backend (FastAPI) running on configured URL
- [ ] All API services created and tested
- [ ] Token storage strategy verified
- [ ] Environment variables accessible via `import.meta.env`
- [ ] TypeScript types generated from API responses
- [ ] Error handling patterns consistent across app
- [ ] Auth state management ready (hooks)

---

## Next Steps

After API architecture is complete:

1. **Create Data Hooks** (`src/hooks/`)
   - `useFetch()` - Generic data fetching with loading/error states
   - `useAuth()` - Authentication context
   - `usePlace()` - Places-specific hook
   - `useEvent()` - Events-specific hook

2. **Update Pages** (Phase 6)
   - Integrate API calls into page components
   - Add loading states and error handling
   - Connect forms to protected endpoints

3. **State Management** (Optional)
   - Consider Context API for global auth state
   - Consider Redux/Zustand for complex state

4. **Testing**
   - Mock API responses in tests
   - Test error handling paths
   - Test token refresh logic

---

## API Endpoint Reference

**Base URL:** `http://localhost:8000/api/v1`

### Public Endpoints (No Auth Required)
- `GET /places` - List all places
- `GET /places/{id}` - Get single place
- `GET /places/season?season=winter` - Filter by season
- `GET /events` - List all events
- `GET /events/{id}` - Get single event
- `GET /galleries` - List all galleries
- `GET /galleries/{id}` - Get single gallery

### Protected Endpoints (Auth Required)
- `POST /admin/places` - Create place
- `PUT /admin/places/{id}` - Update place
- `DELETE /admin/places/{id}` - Delete place
- `POST /admin/events` - Create event
- `PUT /admin/events/{id}` - Update event
- `DELETE /admin/events/{id}` - Delete event

### Authentication Endpoints
- `POST /auth/login` - Login user
- `POST /auth/register` - Register user
- `GET /auth/me` - Get current user
- `PUT /auth/profile` - Update profile
- `POST /auth/logout` - Logout user

---

**Last Updated:** API Architecture Phase - Complete
**Status:** Ready for integration into pages
