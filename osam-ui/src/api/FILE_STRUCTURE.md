# API Architecture - File Structure Guide

## Complete Folder Layout

```
src/api/
│
├── 📄 config.ts
│   └── Environment-based configuration
│       - Reads from .env.local
│       - Exports: API_BASE_URL, API_TIMEOUT, TOKEN_KEY
│       - Usage: import config from '@/api/config'
│
├── 📄 constants.ts  
│   └── Centralized endpoint definitions
│       - PUBLIC_ENDPOINTS: Login, Register, List operations
│       - PROTECTED_ENDPOINTS: CRUD, Bookings, Admin
│       - Helper: isProtectedEndpoint(path)
│       - Usage: import { AUTH_ENDPOINTS, PLACES_ENDPOINTS } from '@/api'
│
├── 📄 index.ts
│   └── Central exports barrel file
│       - Re-exports all services
│       - Re-exports all types
│       - Re-exports utilities
│       - Single import: import { authService, Place } from '@/api'
│
├── 📁 axios/
│   │
│   └── 📄 instances.ts
│       └── Axios configuration and interceptors
│           PUBLIC INSTANCE:
│           - No token injection
│           - For: login, register, public data
│           - Response handling: generic errors
│
│           PROTECTED INSTANCE:
│           - Auto-injects token from localStorage
│           - For: CRUD, bookings, admin operations
│           - Request interceptor: Adds Authorization header
│           - Response interceptor: Handles 401 (token refresh)
│
│           LOGGING (dev mode only):
│           - Logs all requests and responses
│           - Shows request params/data
│           - Shows response status
│
├── 📁 services/
│   │
│   ├── 📄 auth.ts
│   │   └── Authentication operations
│   │       - login(email, password): Public, returns token
│   │       - register(email, password, name): Public, returns token
│   │       - getCurrentUser(): Protected, requires token
│   │       - changePassword(current, new): Protected
│   │       - logout(): Protected, clears token
│   │       - isAuthenticated(): Local check
│   │       Exports: default as authService
│   │
│   ├── 📄 places.ts
│   │   └── Places management
│   │       PUBLIC METHODS:
│   │       - getPlaces(params): List with pagination
│   │       - getPlace(id): Single item
│   │       - searchPlaces(query): Full-text search
│   │       - getPlacesByCategory(category): Filter
│   │
│   │       PROTECTED METHODS:
│   │       - createPlace(payload): Create new
│   │       - updatePlace(id, payload): Edit
│   │       - deletePlace(id): Remove
│   │       Exports: default as placesService
│   │
│   ├── 📄 events.ts
│   │   └── Events management
│   │       PUBLIC METHODS:
│   │       - getEvents(params): List with status filter
│   │       - getEvent(id): Single event
│   │       - getUpcomingEvents(): Convenience method
│   │       - searchEvents(query): Full-text search
│   │
│   │       PROTECTED METHODS:
│   │       - createEvent(payload): Create
│   │       - updateEvent(id, payload): Edit
│   │       - deleteEvent(id): Remove
│   │       Exports: default as eventsService
│   │
│   ├── 📄 gallery.ts
│   │   └── Gallery management
│   │       PUBLIC METHODS:
│   │       - getGallery(params): List items
│   │       - getGalleryItem(id): Single image
│   │       - getGalleryByCategory(category): Filter
│   │       - getFeaturedGallery(): Featured images
│   │
│   │       PROTECTED METHODS:
│   │       - uploadImage(file): File upload (multipart/form-data)
│   │       - createGalleryItem(payload): Create item
│   │       - updateGalleryItem(id, payload): Edit
│   │       - deleteGalleryItem(id): Remove
│   │       Exports: default as galleryService
│   │
│   └── 📄 bookings.ts
│       └── Bookings management (protected)
│           - getMyBookings(params): Current user's bookings
│           - getAllBookings(params): All bookings (admin)
│           - getBooking(id): Single booking
│           - createBooking(payload): Create
│           - updateBooking(id, payload): Edit
│           - cancelBooking(id): Cancel operation
│           Exports: default as bookingsService
│
├── 📁 types/
│   │
│   ├── 📄 api.ts
│   │   └── Data entity types
│   │       - PaginatedResponse<T>: { items, total, page, page_size, total_pages }
│   │       - ApiResponse<T>: { data, message }
│   │       - Place: { id, name, category, location, ... }
│   │       - Event: { id, name, date, time, status, ... }
│   │       - GalleryItem: { id, image_url, title, category, ... }
│   │       - Booking: { id, user_id, place_id, status, ... }
│   │       - FileUploadResponse: { url, filename, size, ... }
│   │
│   ├── 📄 auth.ts
│   │   └── Authentication types
│   │       - LoginRequest: { email, password }
│   │       - LoginResponse: { access_token, user }
│   │       - RegisterRequest: { email, password, full_name }
│   │       - RegisterResponse: same as LoginResponse
│   │       - CurrentUserResponse: { id, email, full_name, is_admin, ... }
│   │       - ChangePasswordRequest: { current_password, new_password }
│   │
│   └── 📄 error.ts
│       └── Error types
│           - ApiErrorResponse: Raw API error
│           - ParsedApiError: Parsed with status, message, errors[]
│           - AuthError: Auth-specific error type
│           - ValidationError: Validation error type
│
├── 📁 utils/
│   │
│   ├── 📄 tokenManager.ts
│   │   └── Token storage operations
│   │       - getToken(): Get from localStorage
│   │       - setToken(token): Save to localStorage
│   │       - clearToken(): Remove from localStorage
│   │       - hasToken(): Check if exists
│   │       - getAuthHeader(): Returns "Bearer {token}"
│   │       - clearAuth(): Complete logout
│   │       STORAGE: localStorage key = NEXT_PUBLIC_TOKEN_KEY
│   │       SSR SAFE: Checks typeof window
│   │
│   └── 📄 apiErrorHandler.ts
│       └── Error handling utilities
│           - parseApiError(error): Parse to ParsedApiError
│           - getErrorMessage(error): User-friendly message
│           - isAuthError(error): Is 401/403?
│           - isRetryableError(error): Can retry?
│           - logErrorDetails(error): Dev logging
│
├── 📄 API_ARCHITECTURE.md
│   └── Comprehensive documentation
│       - Folder structure explained
│       - Design principles
│       - Complete usage examples
│       - Authentication flow
│       - Error handling patterns
│       - Integration checklist
│
└── 📄 QUICK_START.md
    └── Quick reference guide
        - Configuration steps
        - Common tasks
        - Service examples
        - Endpoint list
        - Debugging tips
        - TypeScript examples
```

---

## File Dependencies Map

```
index.ts
├── → services/auth.ts
│   ├── → axios/instances.ts (protectedApi, publicApi)
│   ├── → config.ts
│   ├── → constants.ts (AUTH_ENDPOINTS)
│   ├── → types/auth.ts
│   ├── → utils/tokenManager.ts
│   └── → utils/apiErrorHandler.ts
│
├── → services/places.ts
│   ├── → axios/instances.ts
│   ├── → constants.ts (PLACES_ENDPOINTS)
│   ├── → types/api.ts
│   └── → utils/apiErrorHandler.ts
│
├── → services/events.ts, gallery.ts, bookings.ts
│   └── → (same dependencies as places)
│
├── → utils/tokenManager.ts
│   ├── → config.ts
│   └── → (no external deps)
│
└── → utils/apiErrorHandler.ts
    ├── → types/error.ts
    └── → (no axios/services deps)

axios/instances.ts
├── → config.ts
├── → constants.ts
├── → utils/tokenManager.ts
└── → (no service deps, intentional)
```

---

## Usage Examples by File

### 1. **config.ts** - Environment Access
```typescript
import config from '@/api/config';

console.log(config.API_BASE_URL);      // http://localhost:8000/api
console.log(config.API_TIMEOUT);       // 30000
console.log(config.TOKEN_KEY);         // osam_access_token
console.log(config.IS_DEVELOPMENT);    // true
console.log(config.IS_PRODUCTION);     // false
```

### 2. **constants.ts** - Endpoint Definitions
```typescript
import { 
  AUTH_ENDPOINTS, 
  PLACES_ENDPOINTS, 
  PUBLIC_ENDPOINTS,
  PROTECTED_ENDPOINTS,
  isProtectedEndpoint 
} from '@/api/constants';

const loginUrl = AUTH_ENDPOINTS.LOGIN;  // '/auth/login'
const placeUrl = PLACES_ENDPOINTS.DETAIL('123');  // '/places/123'

if (isProtectedEndpoint('/bookings')) {
  // Requires authentication
}
```

### 3. **index.ts** - Central Import Point
```typescript
// Before (scattered imports):
import authService from '@/api/services/auth';
import placesService from '@/api/services/places';
import { Place } from '@/api/types/api';
import { parseApiError } from '@/api/utils/apiErrorHandler';

// After (single import):
import { 
  authService, 
  placesService, 
  Place, 
  parseApiError 
} from '@/api';
```

### 4. **axios/instances.ts** - Request Configuration
```typescript
import { publicApi, protectedApi } from '@/api';

// Public (no token):
await publicApi.get('/places');

// Protected (auto-token):
await protectedApi.get('/bookings/me');

// Custom request:
await protectedApi.get('/endpoint', {
  timeout: 60000,
  headers: { 'X-Custom': 'value' }
});
```

### 5. **services/*.ts** - Business Logic
```typescript
import { placesService, Place, ParsedApiError } from '@/api';

try {
  const places: PaginatedResponse<Place> = await placesService.getPlaces({
    page: 1,
    category: 'temples'
  });
  
  const updated: Place = await placesService.updatePlace(id, {
    name: 'New Name'
  });
} catch (error) {
  const parsed: ParsedApiError = error as ParsedApiError;
  console.log(parsed.status, parsed.message);
}
```

### 6. **types/*.ts** - Type Definitions
```typescript
import { 
  Place, 
  Event, 
  LoginRequest, 
  ParsedApiError,
  PaginatedResponse 
} from '@/api';

interface Props {
  places: Place[];
  error?: ParsedApiError;
  onSubmit: (req: LoginRequest) => void;
}

const response: PaginatedResponse<Place> = await fetch();
```

### 7. **utils/tokenManager.ts** - Token Operations
```typescript
import { tokenManager } from '@/api';

// Store
tokenManager.setToken('eyJhbG...');

// Retrieve
const token = tokenManager.getToken();

// Check
if (tokenManager.hasToken()) {
  const header = tokenManager.getAuthHeader();  // "Bearer eyJhbG..."
}

// Clear
tokenManager.clearAuth();
```

### 8. **utils/apiErrorHandler.ts** - Error Handling
```typescript
import { 
  parseApiError, 
  getErrorMessage, 
  isAuthError,
  isRetryableError 
} from '@/api';

try {
  await someOperation();
} catch (error) {
  const parsed = parseApiError(error);
  const message = getErrorMessage(error);  // User-friendly
  
  if (isAuthError(error)) {
    // Handle 401/403
  }
  
  if (isRetryableError(error)) {
    // Retry logic
  }
}
```

---

## Environment Variables (.env.local)

```bash
# Required for axios configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Optional with defaults
NEXT_PUBLIC_API_TIMEOUT=30000                    # Default: 30000ms
NEXT_PUBLIC_TOKEN_KEY=osam_access_token          # Default: osam_access_token
NODE_ENV=development                             # development|production

# Example for different environments
# Development:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Staging:
NEXT_PUBLIC_API_BASE_URL=https://staging-api.osam.com/api

# Production:
NEXT_PUBLIC_API_BASE_URL=https://api.osam.com/api
```

---

## Import Patterns

### Pattern 1: Everything from Index (Recommended)
```typescript
import {
  authService,
  placesService,
  eventsService,
  galleryService,
  bookingsService,
  tokenManager,
  Place,
  Event,
  ParsedApiError,
  parseApiError,
  getErrorMessage
} from '@/api';
```

### Pattern 2: Specific Imports
```typescript
// Services
import authService from '@/api/services/auth';
import placesService from '@/api/services/places';

// Types
import { Place, PaginatedResponse } from '@/api/types/api';
import { LoginRequest } from '@/api/types/auth';
import { ParsedApiError } from '@/api/types/error';

// Utils
import { tokenManager } from '@/api/utils/tokenManager';
import { parseApiError } from '@/api/utils/apiErrorHandler';
```

### Pattern 3: Config Access
```typescript
import config from '@/api/config';
import { AUTH_ENDPOINTS, isProtectedEndpoint } from '@/api/constants';
```

---

## File Size Reference

| File | Lines | Purpose | Complexity |
|------|-------|---------|-----------|
| config.ts | ~30 | Environment config | Simple |
| constants.ts | ~80 | Endpoint definitions | Simple |
| axios/instances.ts | ~100 | Interceptors setup | Medium |
| services/auth.ts | ~90 | Auth API calls | Medium |
| services/places.ts | ~110 | Places CRUD | Medium |
| services/events.ts | ~110 | Events CRUD | Medium |
| services/gallery.ts | ~130 | Gallery + upload | Medium |
| services/bookings.ts | ~80 | Bookings CRUD | Medium |
| utils/tokenManager.ts | ~45 | Token storage | Simple |
| utils/apiErrorHandler.ts | ~100 | Error handling | Medium |
| types/api.ts | ~80 | Data types | Simple |
| types/auth.ts | ~50 | Auth types | Simple |
| types/error.ts | ~40 | Error types | Simple |
| index.ts | ~30 | Exports | Simple |
| **TOTAL** | **~1,100** | **Complete system** | **Moderate** |

---

## Code Organization Principles

### 1. **Separation of Concerns**
- Services: API calls only (no UI logic)
- Utilities: Helper functions (no business logic)
- Types: Type definitions only
- Axios: Configuration and interceptors

### 2. **No Circular Dependencies**
```
✓ index.ts → services → utils
✗ services → index.ts (circular)
✗ utils → services (circular)
```

### 3. **Minimal External Dependencies**
- Uses only: axios, TypeScript
- No UI frameworks (React) in api layer
- Composable with any UI layer

### 4. **Environment Isolation**
- All env vars in one place (config.ts)
- Easy switching between dev/staging/prod
- No hardcoded URLs or keys

### 5. **Error Handling at Source**
- Services catch and parse errors
- Components use parsed errors
- Centralized logging (dev mode)

---

## Extension Points

### Adding a New Service
```typescript
// src/api/services/newfeature.ts
import { protectedApi } from '../axios/instances';
import { NEWFEATURE_ENDPOINTS } from '../constants';
import { ParsedApiError } from '../types/error';
import { parseApiError } from '../utils/apiErrorHandler';

class NewFeatureService {
  async getData(): Promise<Data> {
    try {
      const response = await protectedApi.get(NEWFEATURE_ENDPOINTS.LIST);
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }
}

export default new NewFeatureService();
```

Then export from index.ts:
```typescript
export { default as newFeatureService } from './services/newfeature';
```

### Adding New Endpoints
```typescript
// src/api/constants.ts
export const NEWFEATURE_ENDPOINTS = {
  LIST: '/newfeature',
  DETAIL: (id: string) => `/newfeature/${id}`,
  CREATE: '/newfeature',
  UPDATE: (id: string) => `/newfeature/${id}`,
  DELETE: (id: string) => `/newfeature/${id}`,
} as const;
```

### Adding New Types
```typescript
// src/api/types/newfeature.ts
export interface NewFeature {
  id: string;
  name: string;
  created_at: string;
}

export interface NewFeatureRequest {
  name: string;
}
```

Then export from types/api.ts or types/newfeature.ts and add to index.ts.

---

## Testing Integration

### Testing Services
```typescript
import { placesService } from '@/api';

describe('PlacesService', () => {
  it('should get places', async () => {
    const response = await placesService.getPlaces({ page: 1 });
    expect(response.items).toBeDefined();
    expect(response.total).toBeGreaterThan(0);
  });
});
```

### Mocking in Tests
```typescript
jest.mock('@/api', () => ({
  placesService: {
    getPlaces: jest.fn().mockResolvedValue({
      items: [{ id: '1', name: 'Test Place' }],
      total: 1
    })
  }
}));
```

---

## Performance Considerations

### 1. **Token Retrieval** (O(1))
```typescript
// Fast: direct localStorage access
const token = tokenManager.getToken();
```

### 2. **Request Caching** (TODO)
```typescript
// Implement in future if needed:
- SWR hook for automatic caching
- TanStack Query for advanced caching
- In-memory cache for config
```

### 3. **Batch Operations** (TODO)
```typescript
// For bulk operations, consider:
- Single API endpoint for batch requests
- Server-side pagination
- GraphQL for selective field loading
```

---

## Security Considerations

### ✅ Currently Implemented
- Token stored in localStorage (not httpOnly due to React requirement)
- Token auto-cleared on 401 response
- No token logging in production
- Environment-based URLs prevent hardcoding secrets

### 🔮 Future Enhancements
- Token expiration handling with refresh
- CSRF protection headers
- Rate limiting client-side
- Request/response encryption (if sensitive)

---

## Migration Checklist

If migrating from another API structure:

- [ ] Update all service imports to use `/api` barrel
- [ ] Replace hardcoded URLs with constants
- [ ] Standardize error handling with parseApiError
- [ ] Ensure all services follow same pattern
- [ ] Update .env variables
- [ ] Test all endpoints with new structure
- [ ] Remove old API folder

