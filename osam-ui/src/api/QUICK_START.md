# API Architecture - Quick Reference

## 🚀 Quick Start

### 1. Configure Environment
```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_TOKEN_KEY=osam_access_token
NODE_ENV=development
```

### 2. Use Services in Components
```typescript
import { placesService, authService, bookingsService } from '@/api';

// Public endpoint
const places = await placesService.getPlaces();

// Protected endpoint (auto-adds token)
const bookings = await bookingsService.getMyBookings();

// Handle errors
catch (error) {
  console.log(error.message);  // "Validation failed"
  console.log(error.errors);   // [{ field, message }]
}
```

---

## 📂 File Map

| File | Purpose |
|------|---------|
| `.env.example` | Environment variables template |
| `config.ts` | Centralized config from env vars |
| `constants.ts` | API endpoints & classifications |
| `axios/instances.ts` | Public & protected axios with interceptors |
| `services/auth.ts` | Auth API calls (login, register, profile) |
| `services/places.ts` | Places CRUD + search |
| `services/events.ts` | Events CRUD + search |
| `services/gallery.ts` | Gallery CRUD + image upload |
| `services/bookings.ts` | Bookings management |
| `utils/tokenManager.ts` | localStorage token operations |
| `utils/apiErrorHandler.ts` | Error parsing utilities |
| `types/auth.ts` | Auth request/response types |
| `types/api.ts` | Data entity types (Place, Event, etc) |
| `types/error.ts` | Error response types |
| `index.ts` | Central exports for all services |

---

## 🎯 Common Tasks

### Get Public Data
```typescript
// List places
const { items, total } = await placesService.getPlaces({ page: 1 });

// Get single item
const place = await placesService.getPlace('place-id');

// Search
const results = await placesService.searchPlaces('monsoon');

// By category
const temples = await placesService.getPlacesByCategory('temples');
```

### Authenticate
```typescript
// Login
const { access_token, user } = await authService.login({
  email: 'user@example.com',
  password: 'password'
});
// Token auto-saved to localStorage

// Check if logged in
if (authService.isAuthenticated()) { }

// Get profile
const profile = await authService.getCurrentUser();

// Logout
await authService.logout();  // Clears token
```

### Create/Edit/Delete (Protected)
```typescript
// Create
const place = await placesService.createPlace({
  name: 'New Place',
  category: 'temples',
  location: 'Address',
  description: '...'
});

// Update
const updated = await placesService.updatePlace(id, {
  name: 'Updated Name'
});

// Delete
await placesService.deletePlace(id);
```

### Handle Errors
```typescript
try {
  await someApiCall();
} catch (error: any) {
  // error.status = 422, 401, 500, etc
  // error.message = user-friendly message
  // error.errors = [{ field, message }] for validation
  
  error.errors?.forEach(err => {
    console.log(`${err.field}: ${err.message}`);
  });
}
```

### Upload Files
```typescript
const file = inputRef.current?.files?.[0];
if (file) {
  const { url } = await galleryService.uploadImage(file);
  console.log('Uploaded to:', url);
}
```

### Paginated Results
```typescript
const response = await placesService.getPlaces({
  page: 2,
  page_size: 20,
  category: 'temples'
});

console.log(response.items);        // [Place, Place, ...]
console.log(response.total);        // 150
console.log(response.total_pages);  // 8
console.log(response.page);         // 2
```

---

## 🔐 Token Management

### Token Lifecycle
```
Login → Token saved to localStorage
  ↓
Protected request → Token auto-added to header
  ↓
API response 401 → Token cleared from localStorage
  ↓
'auth:logout' event → AuthContext redirects to login
```

### Manual Token Operations
```typescript
import { tokenManager } from '@/api';

// Get token
const token = tokenManager.getToken();  // "eyJhbG..."

// Set token (after manual login)
tokenManager.setToken('eyJhbG...');

// Clear token (logout)
tokenManager.clearAuth();

// Check if has token
if (tokenManager.hasToken()) { }

// Get authorization header
const header = tokenManager.getAuthHeader();  // "Bearer eyJhbG..."
```

---

## ⚙️ Axios Instances

### Public Instance
```typescript
// No token injection
// For: Login, Register, Public data
import { publicApi } from '@/api';

await publicApi.get('/places');
await publicApi.post('/auth/login', {...});
```

### Protected Instance
```typescript
// Auto-injects token from localStorage
// For: Authenticated operations, CRUD, Bookings
import { protectedApi } from '@/api';

await protectedApi.get('/bookings/me');
await protectedApi.post('/bookings', {...});
```

### Custom Requests (Advanced)
```typescript
import { protectedApi } from '@/api';

// Custom headers
await protectedApi.get('/endpoint', {
  headers: { 'X-Custom': 'value' }
});

// Timeout override
await protectedApi.get('/endpoint', {
  timeout: 60000  // 60 seconds
});

// Progress events
await protectedApi.post('/upload', formData, {
  onUploadProgress: (e) => {
    const percent = (e.loaded / e.total) * 100;
    console.log(`${percent}% uploaded`);
  }
});
```

---

## 📊 API Endpoints

### Public Endpoints
```
GET    /api/places                    - List places
GET    /api/places/{id}               - Get place
GET    /api/places/search             - Search places
GET    /api/places/category/{cat}     - Filter by category

GET    /api/events                    - List events
GET    /api/events/{id}               - Get event
GET    /api/events/upcoming           - Upcoming events
GET    /api/events/search             - Search events

GET    /api/gallery                   - List gallery
GET    /api/gallery/{id}              - Get image
GET    /api/gallery/category/{cat}    - Filter by category
GET    /api/gallery/featured          - Featured images

POST   /api/auth/login                - Login
POST   /api/auth/register             - Register
```

### Protected Endpoints
```
GET    /api/auth/me                   - Current user profile
POST   /api/auth/logout               - Logout
POST   /api/auth/change-password      - Change password

POST   /api/places                    - Create place
PATCH  /api/places/{id}               - Update place
DELETE /api/places/{id}               - Delete place

POST   /api/events                    - Create event
PATCH  /api/events/{id}               - Update event
DELETE /api/events/{id}               - Delete event

POST   /api/gallery                   - Create item
PATCH  /api/gallery/{id}              - Update item
DELETE /api/gallery/{id}              - Delete item
POST   /api/gallery/upload            - Upload image

GET    /api/bookings/me               - My bookings
GET    /api/bookings                  - All bookings (admin)
GET    /api/bookings/{id}             - Get booking
POST   /api/bookings                  - Create booking
PATCH  /api/bookings/{id}             - Update booking
POST   /api/bookings/{id}/cancel      - Cancel booking

GET    /api/admin/stats               - Dashboard stats
GET    /api/admin/users               - List users (admin)
```

---

## 🔄 Request/Response Examples

### List Places Request
```typescript
const response = await placesService.getPlaces({
  page: 1,
  page_size: 12,
  category: 'temples'
});

// Response structure
{
  items: [
    {
      id: "place-123",
      name: "Chichod Temple",
      category: "temples",
      location: "Address",
      description: "...",
      image_url: "https://...",
      visit_count: 450,
      rating: 4.5,
      is_featured: true,
      created_at: "2026-01-15T10:30:00",
      updated_at: "2026-02-01T14:20:00"
    }
  ],
  total: 50,
  page: 1,
  page_size: 12,
  total_pages: 5
}
```

### Create Booking Request/Response
```typescript
const booking = await bookingsService.createBooking({
  place_id: 'place-123',
  visit_date: '2026-06-15',
  number_of_guests: 4,
  notes: 'Group booking'
});

// Response
{
  id: "booking-456",
  user_id: "user-789",
  place_id: "place-123",
  booking_date: "2026-02-01",
  visit_date: "2026-06-15",
  number_of_guests: 4,
  status: "confirmed",
  total_price: 4000,
  notes: "Group booking",
  created_at: "2026-02-01T10:30:00",
  updated_at: "2026-02-01T10:30:00"
}
```

### Error Response
```typescript
try {
  await authService.register({
    email: 'invalid-email',
    password: '123'
  });
} catch (error) {
  // Structure
  {
    status: 422,
    message: "Validation failed",
    detail: "Unprocessable Entity",
    errors: [
      {
        field: "email",
        message: "Invalid email address"
      },
      {
        field: "password",
        message: "Must be at least 8 characters"
      }
    ]
  }
}
```

---

## 🏗️ Component Integration Pattern

```typescript
'use client';  // Next.js client component

import { useEffect, useState } from 'react';
import { placesService, Place, ParsedApiError } from '@/api';

export function PlacesList() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      setLoading(true);
      const response = await placesService.getPlaces({ page: 1 });
      setPlaces(response.items);
    } catch (err) {
      const error = err as ParsedApiError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {places.map(place => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>{place.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔍 Debugging Tips

### Enable Request Logging
Development mode automatically logs all requests. Check browser console under Network tab.

### Inspect Token
```typescript
import { tokenManager } from '@/api';

console.log('Current token:', tokenManager.getToken());
console.log('Has token:', tokenManager.hasToken());
```

### Test Protected Endpoint
```typescript
// If this throws 401, check:
// 1. Is token in localStorage?
// 2. Is FastAPI accepting the token?
// 3. Has token expired?

const user = await authService.getCurrentUser();
console.log('Authenticated as:', user.email);
```

### Check API Base URL
```typescript
import config from '@/api/config';

console.log('API Base:', config.API_BASE_URL);
console.log('Timeout:', config.API_TIMEOUT);
console.log('Is Production:', config.IS_PRODUCTION);
```

---

## ✅ TypeScript Support

All services are **fully typed**:
```typescript
// Autocomplete for all parameters
const places = await placesService.getPlaces({
  page: 1,      // ✓ Required
  page_size: 12,  // ✓ Optional
  // ✗ category: 123  // Error: must be string
});

// Response is typed
const items: Place[] = places.items;
for (const place of items) {
  console.log(place.name);  // ✓ Autocomplete
  console.log(place.foo);   // ✗ Error: property doesn't exist
}

// Errors are typed
catch (error: any) {
  const parsed: ParsedApiError = error;
  console.log(parsed.status);     // ✓ number
  console.log(parsed.message);    // ✓ string
  console.log(parsed.errors);     // ✓ Array<{ field, message }>
}
```

---

## 🎬 Next Steps

1. **Auth Context**: Create `src/contexts/AuthContext.tsx`
   - Wrap app with provider
   - Listen to 'auth:logout' event
   - Export useAuth() hook

2. **Protected Routes**: Create `src/components/ProtectedRoute.tsx`
   - Check auth before rendering
   - Redirect to login if needed

3. **API Usage**: Start using services in pages
   - Implement loading states
   - Add error handling
   - Display data

