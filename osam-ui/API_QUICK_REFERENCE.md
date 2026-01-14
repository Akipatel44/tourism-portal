# API Quick Reference

## Import Everything from API Layer

```typescript
import {
  // HTTP Client
  apiClient,
  
  // Token Management
  tokenStorage,
  tokenUtils,
  useAuthState,
  
  // Public API
  publicApi,
  placesApi,
  eventsApi,
  galleriesApi,
  
  // Protected API
  protectedApi,
  protectedPlacesApi,
  protectedEventsApi,
  protectedGalleriesApi,
  
  // Auth
  authApi,
  listenToAuthEvent,
  createAuthEvent,
} from '@/api';

// Or import types
import type {
  User,
  Place,
  Event,
  Gallery,
  GalleryImage,
  LoginRequest,
  RegisterRequest,
  CreatePlaceRequest,
  UpdatePlaceRequest,
  CreateEventRequest,
  UpdateEventRequest,
  CreateGalleryRequest,
  UpdateGalleryRequest,
} from '@/api';
```

## Common Tasks

### Fetch Public Data (No Auth Needed)

```typescript
// Get all places
const places = await publicApi.places.getPlaces({ limit: 10 });

// Get single place
const place = await publicApi.places.getPlace(1);

// Search places
const results = await publicApi.places.searchPlaces('temple');

// Get places by season
const seasonalPlaces = await publicApi.places.getPlacesBySeason('winter');

// Get events
const events = await publicApi.events.getEvents();
const upcoming = await publicApi.events.getUpcomingEvents(5);

// Get galleries
const galleries = await publicApi.galleries.getGalleries();
const galleryImages = await publicApi.galleries.getGalleryImages(1);
```

### Authenticate User

```typescript
// Login
const { token, user } = await authApi.login({
  username: 'admin@example.com',
  password: 'password123'
});
// Token automatically stored!

// Get current user
const currentUser = await authApi.getCurrentUser();

// Check admin status
const isAdmin = await authApi.isAdmin();

// Logout
await authApi.logout();
// Token automatically cleared!
```

### Admin CRUD Operations (Auth Required)

```typescript
// Create place
const newPlace = await protectedApi.places.createPlace({
  name: 'Kailasa Temple',
  description: 'Ancient rock-cut temple',
  location: '19.2183, 75.1302',
  latitude: 19.2183,
  longitude: 75.1302,
  significance: 'Religious site',
  season: 'all',
  image_url: 'https://...'
});

// Update place
const updated = await protectedApi.places.updatePlace(1, {
  description: 'Updated description'
});

// Delete place
await protectedApi.places.deletePlace(1);

// Same pattern for events and galleries
await protectedApi.events.createEvent({ ... });
await protectedApi.galleries.updateGallery(id, { ... });
```

### Token Management

```typescript
// Check token existence
if (tokenStorage.hasAccessToken()) {
  console.log('User is authenticated');
}

// Get token
const token = tokenStorage.getAccessToken();

// Check if expired
if (tokenUtils.isTokenExpired()) {
  console.log('Token expired, need to login');
}

// Get expiration time
const expiresAt = tokenUtils.getTokenExpiration();
const timeLeft = tokenUtils.getTimeUntilExpiration();

// Clear token (usually on logout)
tokenStorage.clearAccessToken();
```

### Listen to Auth Events

```typescript
// Listen to unauthorized error (401)
listenToAuthEvent('unauthorized', () => {
  // Redirect to login or show message
  window.location.href = '/login';
});

// Dispatch custom auth event
createAuthEvent('login', { user: userData });
```

### Get Auth State

```typescript
const authState = useAuthState();
// Returns:
// {
//   isAuthenticated: boolean,
//   token: string | null,
//   isExpired: boolean,
//   expiresAt: Date | null
// }
```

## Error Handling Template

```typescript
try {
  const data = await publicApi.places.getPlaces();
} catch (error: any) {
  // Error structure
  const { status, message, data } = error;
  
  if (status === 404) {
    console.error('Not found');
  } else if (status === 401) {
    console.error('Unauthorized - redirect to login');
  } else if (status === 500) {
    console.error('Server error:', message);
  } else {
    console.error('Unknown error:', message);
  }
}
```

## Types Quick Reference

### Place
```typescript
{
  id: number;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  significance: string;
  season: string;
  image_url: string;
}
```

### Event
```typescript
{
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  event_type: string;
  image_url: string;
  capacity?: number;
  available_seats?: number;
}
```

### User
```typescript
{
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_active: boolean;
}
```

### Gallery
```typescript
{
  id: number;
  name: string;
  description: string;
  place_id?: number;
  images: GalleryImage[];
}
```

## File Locations

- **API Folder:** `src/api/`
- **Documentation:** `API_ARCHITECTURE.md`
- **Environment Config:** `.env` (dev), `.env.production` (prod)
- **Types:** All in respective files or `src/api/index.ts`

## Configuration

Edit `.env` file:
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=30000
VITE_LOG_LEVEL=debug
```

## Development Workflow

1. **Start Backend:** `python main.py` (or your FastAPI command)
2. **Backend should be running at:** `http://localhost:8000`
3. **Frontend requests go to:** `http://localhost:8000/api/v1`
4. **Token automatically handled:** No manual header setting needed

## Integration Checklist for Pages

When integrating API into a page:

- [ ] Import needed API services
- [ ] Add loading state (useState)
- [ ] Add error state (useState)
- [ ] Call API in useEffect
- [ ] Handle success case (update state)
- [ ] Handle error case (show message)
- [ ] Handle loading state (show spinner)
- [ ] Use TypeScript types for data
- [ ] Test with real backend running

### Template

```typescript
import { useEffect, useState } from 'react';
import { publicApi } from '@/api';
import type { Place } from '@/api';

export function MyPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await publicApi.places.getPlaces();
        setPlaces(Array.isArray(data) ? data : data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {places.map(place => (
        <div key={place.id}>{place.name}</div>
      ))}
    </div>
  );
}
```

---

**Tip:** All API calls have TypeScript types! Hover over functions to see what's returned and what parameters are needed.
