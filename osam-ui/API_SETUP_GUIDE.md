# API Setup Guide

## Prerequisites

1. **FastAPI Backend Running**
   - Ensure `osam-api` is running on `http://localhost:8000`
   - Database should be initialized
   - See `osam-api/README.md` for backend setup

2. **Frontend Environment**
   - Node.js 16+ installed
   - npm packages installed (`npm install`)
   - Vite dev server running (`npm run dev`)

## Step 1: Configure Environment

### Development Setup

Edit or create `.env` in `osam-ui/`:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=30000

# Application
VITE_APP_ENV=development
VITE_APP_NAME=OSAM Tourism Platform

# Features
VITE_AUTH_ENABLED=true
VITE_FEATURE_ADMIN=true

# Logging
VITE_LOG_LEVEL=debug
VITE_LOG_API_CALLS=true
```

### Production Setup

Edit `.env.production`:

```bash
# Update to your production API URL
VITE_API_BASE_URL=https://api.example.com/api/v1
VITE_API_TIMEOUT=45000
VITE_APP_ENV=production
VITE_LOG_LEVEL=error
VITE_LOG_API_CALLS=false
```

## Step 2: Verify Backend is Running

```bash
# In a separate terminal, navigate to osam-api/
cd osam-api

# Start FastAPI
python main.py
# Or if using Poetry:
# poetry run python main.py

# Or using Uvicorn directly:
# uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Should see output like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

## Step 3: Start Frontend Dev Server

```bash
# In osam-ui/ directory
npm run dev
```

Should see:
```
  VITE v4.5.14  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Step 4: Test API Connection

### Using Browser DevTools

1. Open `http://localhost:5173/` in browser
2. Open DevTools (F12)
3. Go to Console tab
4. Test a public endpoint:

```javascript
// Test public API
fetch('http://localhost:8000/api/v1/places')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));
```

Should return places data or empty array.

### Using Frontend Code

Create a test component:

```typescript
import { useEffect, useState } from 'react';
import { publicApi } from '@/api';

export function ApiTest() {
  const [status, setStatus] = useState<string>('Testing...');

  useEffect(() => {
    const test = async () => {
      try {
        const places = await publicApi.places.getPlaces();
        setStatus(`✓ Connected! Got ${Array.isArray(places) ? places.length : places.data?.length || 0} places`);
      } catch (error: any) {
        setStatus(`✗ Error: ${error.message}`);
      }
    };
    test();
  }, []);

  return <div>{status}</div>;
}
```

## Step 5: Test Authentication

### Create Admin User

In `osam-api/` directory:

```bash
python create_admin.py
# Follow prompts to create admin account
```

Or use FastAPI Swagger UI at `http://localhost:8000/docs`:
1. Find `/auth/register` endpoint
2. Click "Try it out"
3. Enter credentials
4. Execute

### Test Login

```typescript
import { authApi } from '@/api';

const { token, user } = await authApi.login({
  username: 'admin@example.com',
  password: 'admin123'
});

console.log('Logged in as:', user.full_name);
console.log('Token stored:', !!token);
```

## Step 6: Test Protected Endpoints

```typescript
import { protectedApi } from '@/api';

// Create new place (requires auth)
const newPlace = await protectedApi.places.createPlace({
  name: 'Test Place',
  description: 'A test place',
  location: '19.2183, 75.1302',
  latitude: 19.2183,
  longitude: 75.1302,
  significance: 'Test significance',
  season: 'all',
  image_url: 'https://via.placeholder.com/400'
});

console.log('Created place:', newPlace.id);
```

## Troubleshooting

### Issue: CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution 1:** Backend CORS not configured
- Check `osam-api/app/main.py` for CORS configuration
- Should have:
  ```python
  from fastapi.middleware.cors import CORSMiddleware
  
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["http://localhost:5173", "http://localhost:3000"],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```

**Solution 2:** Frontend pointing to wrong URL
- Check `.env` has correct `VITE_API_BASE_URL`
- Should be `http://localhost:8000/api/v1` for local development

### Issue: 404 Not Found

**Error:** `GET http://localhost:8000/api/v1/places 404`

**Causes:**
1. Backend not running on port 8000
2. Wrong API path in `.env`
3. Backend route not defined

**Fix:**
- Verify FastAPI is running: `http://localhost:8000/docs` should show Swagger UI
- Check `osam-api/app/api/v1/` endpoints are defined
- Verify `.env` has correct URL

### Issue: 401 Unauthorized

**Error:** Response status 401 when accessing protected endpoints

**Causes:**
1. Token not stored after login
2. Token expired
3. Token not being sent in Authorization header

**Fix:**
```typescript
// Check token is stored
import { tokenStorage } from '@/api';
const token = tokenStorage.getAccessToken();
console.log('Token exists:', !!token);

// Check not expired
import { tokenUtils } from '@/api';
const isExpired = tokenUtils.isTokenExpired();
console.log('Token expired:', isExpired);

// Check interceptor is working
// Open DevTools > Network tab
// Look for Authorization header in request
```

### Issue: Backend Connection Fails

**Error:** `Failed to fetch` or `ERR_CONNECTION_REFUSED`

**Solutions:**
1. Ensure backend is running: 
   ```bash
   curl http://localhost:8000/docs
   ```
   Should return HTML (Swagger UI)

2. Check if port 8000 is in use:
   ```bash
   # Windows PowerShell
   netstat -ano | findstr :8000
   
   # Linux/Mac
   lsof -i :8000
   ```

3. Start backend on different port if needed:
   ```bash
   uvicorn app.main:app --reload --port 8001
   # Then update VITE_API_BASE_URL=http://localhost:8001/api/v1
   ```

### Issue: Axios Interceptor Not Working

**Sign:** Token not automatically included in requests

**Debug:**
```typescript
import { apiClient } from '@/api';

// Check request interceptor
console.log(apiClient.interceptors.request.handlers);
// Should show 1+ interceptor

// Test request
const response = await apiClient.get('/auth/me');
// Check Network tab - should have Authorization header
```

## Development Workflow

### Typical Day

1. **Start Backend**
   ```bash
   cd osam-api
   python main.py
   ```

2. **Start Frontend**
   ```bash
   cd osam-ui
   npm run dev
   ```

3. **Open Browser**
   - `http://localhost:5173/`

4. **Work on Features**
   - Edit components
   - Use API services
   - Hot reload automatically reloads changes

### Debugging API Calls

**In DevTools Console:**
```javascript
// Check all stored data
localStorage

// Check specific token
localStorage.getItem('osam_access_token')

// Clear all auth data if stuck
localStorage.clear()
```

**In DevTools Network Tab:**
1. Filter by XHR
2. Look for API requests
3. Click request to see:
   - Request headers (Authorization)
   - Request body (POST/PUT)
   - Response headers
   - Response body

## Common API Workflows

### Login and Fetch Protected Data

```typescript
import { authApi, protectedApi } from '@/api';

async function workflow() {
  // 1. Login
  const { user } = await authApi.login({
    username: 'admin@example.com',
    password: 'password'
  });
  console.log('Logged in:', user.full_name);

  // 2. Token automatically stored and injected

  // 3. Create place (protected - uses stored token)
  const place = await protectedApi.places.createPlace({
    name: 'New Temple',
    description: 'Ancient temple',
    location: '19.2183, 75.1302',
    latitude: 19.2183,
    longitude: 75.1302,
    significance: 'Religious',
    season: 'all',
    image_url: 'https://...'
  });
  console.log('Created place:', place.id);

  // 4. Logout (clears token)
  await authApi.logout();
}

workflow();
```

### Fetch and Display Public Data

```typescript
import { useEffect, useState } from 'react';
import { publicApi } from '@/api';
import type { Place } from '@/api';

export function PlacesList() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.places.getPlaces()
      .then(data => setPlaces(Array.isArray(data) ? data : data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {places.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

## Performance Tips

1. **Cache Requests:** Store fetched data in state
2. **Pagination:** Use `skip` and `limit` parameters
3. **Lazy Loading:** Fetch data only when needed
4. **Debounce Search:** Debounce search queries

## Security Checklist

- [ ] `.env` file contains local `localhost` URLs only
- [ ] `.env.production` has production API URL
- [ ] No credentials in `.env` files
- [ ] Token stored in localStorage only
- [ ] CORS configured on backend
- [ ] Backend validates all requests
- [ ] Protected routes require valid token

## Next Steps

- Create custom hooks for data fetching (`src/hooks/`)
- Integrate API into page components
- Add global loading and error states
- Implement logout on 401 error

---

**API Setup Complete!** You're ready to integrate API into pages.
