# API Integration Architecture

## 📁 Folder Structure

```
src/api/
├── axios/
│   └── instances.ts              # Public vs Protected axios instances with interceptors
├── interceptors/                 # (Reserved for future complex interceptors)
├── services/
│   ├── auth.ts                   # Authentication API calls
│   ├── places.ts                 # Places CRUD + search
│   ├── events.ts                 # Events CRUD + search
│   ├── gallery.ts                # Gallery CRUD + image upload
│   └── bookings.ts               # Bookings management
├── types/
│   ├── api.ts                    # Response types (Place, Event, GalleryItem, Booking)
│   ├── auth.ts                   # Auth types (Login, Register, User)
│   └── error.ts                  # Error types (ParsedApiError, ValidationError)
├── utils/
│   ├── tokenManager.ts           # Access token storage (localStorage)
│   └── apiErrorHandler.ts        # Error parsing & handling utilities
├── config.ts                     # Environment-based configuration
├── constants.ts                  # API endpoints & endpoint classification
└── index.ts                      # Central exports
```

---

## 🔑 Key Concepts

### 1. **Dual Axios Instances**

#### Public Instance (`publicApi`)
- Used for: Login, Register, Public Data
- No authentication required
- Endpoints: `/auth/login`, `/auth/register`, `/places`, `/events`, `/gallery`

#### Protected Instance (`protectedApi`)
- Used for: CRUD operations, Bookings, Admin functions
- **Automatically injects access token** in Authorization header
- Handles **401 responses** by clearing token and dispatching logout event
- Endpoints: Protected CRUD, Bookings, Admin operations

**Key Feature**: Token injection is automatic - just use `protectedApi.get()`, `protectedApi.post()`, etc.

```typescript
// Public call - no token needed
await publicApi.get('/places');

// Protected call - token injected automatically
await protectedApi.get('/bookings/me');
```

---

### 2. **Token Storage Strategy**

#### Why Access Token Only?
- **Simpler architecture**: No token refresh logic needed for initial MVP
- **User context needed in React**: Can't use httpOnly cookies (not accessible from JS)
- **Clear intent**: Frontend can display user info from login response

#### Storage Location
- **localStorage**: Persistent across page reloads
- **Key**: Configurable via `NEXT_PUBLIC_TOKEN_KEY` (default: `osam_access_token`)
- **Format**: Bearer token (no custom serialization)

#### Lifecycle
```
User Login
    ↓
API returns access_token
    ↓
tokenManager.setToken(access_token)  // localStorage.setItem()
    ↓
Token automatically added to all protected API requests
    ↓
On 401 response: tokenManager.clearAuth()  // localStorage.removeItem()
    ↓
Window event dispatched: 'auth:logout'
    ↓
Auth context listens and redirects to login
```

#### Access Token Retrieval
```typescript
import { tokenManager } from '@/api';

// Get token
const token = tokenManager.getToken();

// Check if authenticated
if (tokenManager.hasToken()) {
  // User is logged in
}

// Clear on logout
tokenManager.clearAuth();
```

---

### 3. **Environment-Based Configuration**

#### .env.local Setup
```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Token Key
NEXT_PUBLIC_TOKEN_KEY=osam_access_token

# Environment
NODE_ENV=development
```

#### Switching Environments
```bash
# Development (local)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Staging
NEXT_PUBLIC_API_BASE_URL=https://staging-api.osam.com/api

# Production
NEXT_PUBLIC_API_BASE_URL=https://api.osam.com/api
```

#### Accessing Configuration
```typescript
import config from '@/api/config';

console.log(config.API_BASE_URL);      // http://localhost:8000/api
console.log(config.API_TIMEOUT);       // 30000
console.log(config.IS_PRODUCTION);     // false
console.log(config.IS_DEVELOPMENT);    // true
```

---

### 4. **Public vs Protected Endpoint Separation**

#### Automatic Classification
```typescript
// src/api/constants.ts defines endpoint groups

PUBLIC_ENDPOINTS = {
  auth: ['/auth/login', '/auth/register'],
  places: ['/places', '/places/search'],
  events: ['/events', '/events/upcoming'],
  gallery: ['/gallery', '/gallery/category/{id}'],
}

PROTECTED_ENDPOINTS = {
  auth: ['/auth/me', '/auth/logout', '/auth/change-password'],
  places: ['/places (POST)', '/places/{id} (PATCH)', '/places/{id} (DELETE)'],
  events: ['/events (POST)', '/events/{id} (PATCH)', '/events/{id} (DELETE)'],
  gallery: ['/gallery (POST)', '/gallery/{id} (PATCH)', '/gallery/{id} (DELETE)', '/gallery/upload'],
  bookings: [/* all bookings endpoints */],
  admin: [/* all admin endpoints */],
}
```

#### Usage Pattern
```typescript
// Services automatically handle public vs protected

// ✅ Public - uses publicApi internally
const places = await placesService.getPlaces();
const event = await eventsService.getEvent(id);

// ✅ Protected - uses protectedApi internally  
const booking = await bookingsService.createBooking(payload);
const updated = await placesService.updatePlace(id, payload);

// When 401 occurs on protected endpoint:
// 1. Token cleared from localStorage
// 2. 'auth:logout' event dispatched
// 3. Auth context redirects to login
```

---

## 📝 API Services Reference

### Auth Service
```typescript
import { authService } from '@/api';

// Login (public)
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});
// Returns: { access_token, user: { id, email, full_name, is_admin } }

// Register (public)
const response = await authService.register({
  email: 'user@example.com',
  password: 'password123',
  full_name: 'John Doe'
});

// Get current user (protected)
const user = await authService.getCurrentUser();

// Logout (protected)
await authService.logout();

// Check local authentication state
if (authService.isAuthenticated()) {
  // Token exists in localStorage
}
```

### Places Service
```typescript
import { placesService } from '@/api';

// Get paginated list (public)
const response = await placesService.getPlaces({
  page: 1,
  page_size: 12,
  category: 'temples'
});
// Returns: { items: Place[], total, page, page_size, total_pages }

// Get single place (public)
const place = await placesService.getPlace(id);

// Search (public)
const results = await placesService.searchPlaces('Monsoon');

// Create (protected, requires auth)
const newPlace = await placesService.createPlace({
  name: 'New Place',
  category: 'temples',
  location: 'Somewhere',
  description: '...',
  is_featured: true
});

// Update (protected)
const updated = await placesService.updatePlace(id, {
  name: 'Updated Name'
});

// Delete (protected)
await placesService.deletePlace(id);
```

### Events Service
```typescript
import { eventsService } from '@/api';

// Get list with filtering (public)
const response = await eventsService.getEvents({
  page: 1,
  status: 'upcoming'
});

// Get upcoming events (public convenience method)
const upcoming = await eventsService.getUpcomingEvents();

// Search (public)
const results = await eventsService.searchEvents('monsoon festival');

// Create (protected)
const event = await eventsService.createEvent({
  name: 'Festival 2026',
  date: '2026-07-15',
  time: '10:00',
  location: 'Chichod',
  description: '...'
});

// Update (protected)
const updated = await eventsService.updateEvent(id, { status: 'cancelled' });

// Delete (protected)
await eventsService.deleteEvent(id);
```

### Gallery Service
```typescript
import { galleryService } from '@/api';

// Get gallery items (public)
const response = await galleryService.getGallery({
  page: 1,
  category: 'monsoon'
});

// Get by category (public)
const items = await galleryService.getGalleryByCategory('temples');

// Get featured (public)
const featured = await galleryService.getFeaturedGallery();

// Upload image (protected, multipart/form-data)
const file = new File([...], 'photo.jpg', { type: 'image/jpeg' });
const uploaded = await galleryService.uploadImage(file);
// Returns: { url, filename, size, content_type, uploaded_at }

// Create gallery item (protected)
const item = await galleryService.createGalleryItem({
  image_url: 'https://...',
  title: 'Photo 1',
  category: 'monsoon',
  is_featured: true
});

// Update (protected)
const updated = await galleryService.updateGalleryItem(id, {
  is_featured: false
});

// Delete (protected)
await galleryService.deleteGalleryItem(id);
```

### Bookings Service
```typescript
import { bookingsService } from '@/api';

// Get my bookings (protected)
const response = await bookingsService.getMyBookings({
  page: 1,
  status: 'confirmed'
});

// Get all bookings (protected, admin only)
const all = await bookingsService.getAllBookings();

// Create booking (protected)
const booking = await bookingsService.createBooking({
  place_id: '123',
  visit_date: '2026-06-15',
  number_of_guests: 4,
  notes: 'Large group'
});

// Update (protected)
const updated = await bookingsService.updateBooking(id, {
  number_of_guests: 5
});

// Cancel (protected)
const cancelled = await bookingsService.cancelBooking(id);
```

---

## ⚠️ Error Handling

### Automatic Error Parsing
All services automatically parse and throw `ParsedApiError`:

```typescript
try {
  await placesService.createPlace(payload);
} catch (error) {
  // error is ParsedApiError
  console.log(error.status);      // 422
  console.log(error.message);     // "Validation failed"
  console.log(error.errors);      // [{ field, message }, ...]
}
```

### Error Classification
```typescript
import { getErrorMessage, isAuthError, isRetryableError } from '@/api';

const error = await someApiCall().catch(e => e);

// Get user-friendly message
const message = getErrorMessage(error);
// "Please check your input and try again."

// Check error type
if (isAuthError(error)) {
  // Handle 401/403
  redirect('/login');
}

if (isRetryableError(error)) {
  // Retry with exponential backoff
  await retry(operation);
}
```

### Validation Errors
FastAPI returns validation errors with field-level details:

```typescript
try {
  await authService.register({
    email: 'invalid',
    password: '123'
  });
} catch (error) {
  // error.errors = [
  //   { field: 'email', message: 'Invalid email format' },
  //   { field: 'password', message: 'Must be at least 8 characters' }
  // ]
  
  error.errors.forEach(err => {
    console.log(`${err.field}: ${err.message}`);
  });
}
```

---

## 🔐 Authentication Flow

### Login Flow
```
User submits credentials
    ↓
authService.login(email, password)
    ↓
publicApi.post('/auth/login', { email, password })
    ↓
API returns { access_token, user }
    ↓
tokenManager.setToken(access_token)  // saved to localStorage
    ↓
AuthContext updates user state
    ↓
Redirect to dashboard
```

### Protected Request Flow
```
Component calls: await bookingsService.getMyBookings()
    ↓
protectedApi interceptor runs:
  - Reads token from localStorage
  - Adds: Authorization: Bearer <token>
    ↓
Request sent to /bookings/me with token header
    ↓
API returns data (if token valid)
    ↓
Data returned to component
```

### 401 Response Flow
```
Protected API returns 401 (unauthorized)
    ↓
protectedApi response interceptor catches 401
    ↓
tokenManager.clearAuth()  // removed from localStorage
    ↓
window.dispatchEvent(new Event('auth:logout'))
    ↓
AuthContext listens to 'auth:logout' event
    ↓
AuthContext clears user state
    ↓
Redirect to /login page
```

---

## 🚀 Usage in Components

### Using Services Directly
```typescript
import { useEffect, useState } from 'react';
import { placesService, Place, ParsedApiError } from '@/api';

export function PlacesList() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<ParsedApiError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const response = await placesService.getPlaces({ page: 1 });
        setPlaces(response.items);
      } catch (err) {
        setError(err as ParsedApiError);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {places.map(place => (
        <li key={place.id}>{place.name}</li>
      ))}
    </ul>
  );
}
```

---

## 📦 Type Safety

### All services are fully typed:
```typescript
// Input validation
interface CreatePlaceRequest {
  name: string;
  category: string;
  location: string;
  description: string;
  latitude?: number;
  longitude?: number;
}

// Output typing
const place: Place = await placesService.createPlace(payload);

// Error typing
catch (error) {
  const parsed: ParsedApiError = error;
  // ✓ Autocomplete for error.status, error.message, error.errors
}
```

---

## 🔍 Development Logging

When `NODE_ENV=development`, all API requests and responses are logged:

```
📤 [PUBLIC] GET /places
  params: { page: 1 }
  
📤 [PROTECTED] POST /bookings
  data: { place_id: '123', ... }
  hasToken: true

🔴 API Error
  Status: 422
  URL: /places
  Response: { detail: [...validation errors...] }
```

Logging can be disabled by removing development-only code in `src/api/axios/instances.ts`.

---

## ✅ Complete Request/Response Lifecycle

```
1. Component calls: await placesService.getPlaces()
   ↓
2. Service validates input (TypeScript)
   ↓
3. publicApi.get('/places', { params: { page: 1 } })
   ↓
4. Request interceptor:
   - Logs request (dev mode)
   - Does NOT add token (public endpoint)
   ↓
5. Request sent to http://localhost:8000/api/places?page=1
   ↓
6. Response received: { items: [...], total: 100, page: 1, ... }
   ↓
7. Response interceptor:
   - Logs response (dev mode)
   ↓
8. Service returns: PaginatedResponse<Place>
   ↓
9. Component receives typed data with autocomplete
```

---

## 🎯 Design Principles

1. **Separation of Concerns**: Services handle API logic, components use them
2. **Type Safety**: Full TypeScript coverage from request to response
3. **Reusability**: Services can be used in any component, hook, or action
4. **Error Handling**: Centralized error parsing with user-friendly messages
5. **Token Management**: Transparent token injection and refresh
6. **Environment Config**: Easy switching between dev/staging/prod
7. **Public vs Protected**: Clear endpoint classification prevents security mistakes
8. **Development Support**: Verbose logging for debugging

---

## 🔗 Integration Checklist

- [ ] Create `.env.local` with `NEXT_PUBLIC_API_BASE_URL`
- [ ] Verify FastAPI server running on http://localhost:8000
- [ ] Import services in components
- [ ] Handle `ParsedApiError` in try/catch blocks
- [ ] Create Auth context hook (ListenAuth context) to wrap app
- [ ] Add loading/error states to components
- [ ] Test with browser DevTools Network tab
- [ ] Verify tokens in localStorage

---

## 🚦 Next Steps

1. **Create Auth Context Hook**: `src/contexts/AuthContext.tsx`
   - Wraps app with authentication state
   - Listens to 'auth:logout' event
   - Provides useAuth() hook

2. **Create Protected Route Component**: `src/components/ProtectedRoute.tsx`
   - Checks authentication before rendering
   - Redirects to login if not authenticated

3. **Integrate with Pages**:
   - Use services in page components
   - Implement loading/error UI
   - Add success notifications

