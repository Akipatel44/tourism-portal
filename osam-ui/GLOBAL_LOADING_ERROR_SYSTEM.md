# Global Loading & Error Handling System

## Overview

A comprehensive, production-ready global loading and error handling system has been implemented across the entire application. This system provides:

- **Centralized Loading State** - Global loading context tracking concurrent API requests
- **HTTP Error Mapping** - User-friendly error messages for all HTTP status codes
- **Automatic Retry** - Exponential backoff retry mechanism for transient failures
- **Error Boundaries** - React error catching at component tree level
- **Global Loader UI** - Modal spinner showing loading status and request count

## Architecture

```
ErrorBoundary (top-level error catching)
├── Router
│   └── AuthProvider
│       └── LoadingProvider (global loading state)
│           ├── NotificationContainer (toast messages)
│           ├── GlobalLoader (modal spinner)
│           └── Layout (main UI)
```

## Core Components & Utilities

### 1. LoadingContext (`src/contexts/LoadingContext.tsx`)

Global state management for API loading indicators.

**Key Features:**
- Tracks concurrent requests with counter (handles parallel API calls)
- Provides loading message for UI feedback
- Auto-derives `isLoading` from request count

**Usage:**
```typescript
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';

// In component:
const { loading, startLoading, stopLoading, setLoadingMessage } = useLoading();

// Start loading
startLoading('Loading places...');

// Stop loading
stopLoading();

// Get loading state
if (loading.isLoading) {
  console.log(`${loading.activeRequests} requests in progress`);
}
```

### 2. GlobalLoader (`src/components/GlobalLoader.tsx`)

Centralized modal loading indicator that responds to global loading state.

**Features:**
- Animated spinner with CSS
- Shows loading message
- Displays concurrent request counter
- Animated bounce dots
- Auto-shows/hides based on loading state

**No configuration needed** - automatically responds to LoadingContext

### 3. Error Handler (`src/utils/errorHandler.ts`)

Comprehensive error parsing and status code mapping.

**Key Functions:**

```typescript
// Parse API error to user-friendly format
const apiError = parseApiError(error);
// Returns: { message: string, status: number, code: string }

// Check if error should be retried
if (isRetryableError(error)) {
  // 5xx, 429, 408, network errors
}

// Calculate retry delay with exponential backoff
const delayMs = getRetryDelay(attemptNumber);
// 1s, 2s, 4s, 8s, 16s... (capped at 30s)

// Check specific error types
isAuthError(error)           // 401/403
isRateLimitError(error)      // 429
getRateLimitDelay(error)     // Read Retry-After header
```

**HTTP Status Code Mapping:**
- `400` → "Invalid request. Please check the information..."
- `401` → "Your session has expired. Please log in again."
- `403` → "You do not have permission to perform this action."
- `404` → "The requested resource was not found."
- `409` → "This resource already exists..."
- `422` → "The provided data contains validation errors."
- `429` → "Too many requests. Please wait a moment..."
- `5xx` → "A server error occurred. Please try again later."

### 4. Retry Hook (`src/hooks/useRetry.ts`)

Automatic retry mechanism with exponential backoff.

**Usage:**
```typescript
const { state, retry, cancel } = useRetry({
  maxAttempts: 3,
  onRetry: (attempt, error) => {
    console.log(`Retrying ${attempt}/3...`);
  },
  onFailed: (error) => {
    console.error('All retries exhausted');
  }
});

// Execute operation with retry
const result = await retry(
  () => api.fetchData(),  // operation to retry
  'Fetching data'         // operation name for notifications
);

// Cancel pending retry
cancel();
```

**Retry Strategy:**
- Exponential backoff: 1s → 2s → 4s → 8s → 16s
- Add random jitter (0-1s) to prevent thundering herd
- Detects rate limiting (429) and respects Retry-After header
- Only retries transient errors (5xx, 429, 408, network)

### 5. Error Boundary (`src/components/ErrorBoundary.tsx`)

React error catching at component level.

**Features:**
- Catches unhandled React component errors
- Displays error UI with recovery options
- Stack trace in development mode
- Buttons: Try Again, Reload Page, Back Home

**Auto-activated** - no configuration needed, wraps entire app

### 6. Enhanced API Client (`src/api/enhancedClient.ts`)

Axios wrapper with integrated loading state and retry logic.

**Usage:**
```typescript
const client = createEnhancedApiClient(axiosInstance);

// Automatic loading state management
const data = await client.get('/api/places', {
  loadingMessage: 'Loading places...',
  skipLoading: false,  // skip global loading indicator
  retry: {
    maxAttempts: 3
  }
});

// Methods: get, post, patch, put, delete
await client.post('/api/places', placeData);
await client.patch('/api/places/1', updates);
await client.delete('/api/places/1');
```

### 7. API Loading Utilities (`src/utils/apiLoading.ts`)

High-level utility hooks for common patterns.

**useApiCall()** - Single operation with loading management:
```typescript
const { executeCall, startLoading, stopLoading, updateMessage } = useApiCall();

const data = await executeCall(
  () => api.fetchData(),
  { showNotification: true }
);
```

**useBatchApiCalls()** - Multiple parallel operations:
```typescript
const { executeBatch } = useBatchApiCalls();

const [places, events, galleries] = await executeBatch([
  () => api.getAllPlaces(),
  () => api.getAllEvents(),
  () => api.getAllGalleries()
], 'Loading all data...');
```

## Implementation Patterns

### Pattern 1: Basic Loading with Error Handling

```typescript
import { useLoading } from '@/contexts/LoadingContext';
import { parseApiError } from '@/utils/errorHandler';
import { useNotification } from '@/hooks/useNotification';

function MyComponent() {
  const { startLoading, stopLoading } = useLoading();
  const notify = useNotification();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    startLoading('Loading data...');
    try {
      const result = await api.getData();
      setData(result);
      notify.success('Success', 'Data loaded');
    } catch (error: any) {
      const apiError = parseApiError(error);
      notify.error('Error', apiError.message);
    } finally {
      stopLoading();
    }
  };

  return <button onClick={fetchData}>Load Data</button>;
}
```

### Pattern 2: With Automatic Retry

```typescript
import { useRetry } from '@/hooks/useRetry';

function MyComponent() {
  const { state, retry } = useRetry({ maxAttempts: 3 });

  const fetchWithRetry = async () => {
    const result = await retry(
      () => api.getData(),
      'Fetching data'
    );
    if (result) {
      setData(result);
    }
  };

  return (
    <>
      <button onClick={fetchWithRetry}>Load Data</button>
      {state.isRetrying && `Retrying ${state.attempt}/3...`}
    </>
  );
}
```

### Pattern 3: Form Submission with Validation

```typescript
function AdminForm() {
  const { startLoading, stopLoading } = useLoading();
  const notify = useNotification();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (formData: any) => {
    // Client-side validation
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    startLoading('Saving...');
    try {
      await api.createItem(formData);
      notify.success('Success', 'Item created');
      // Reset form
    } catch (error: any) {
      const apiError = parseApiError(error);
      
      if (error.response?.status === 422) {
        // Server validation errors
        const fieldErrors = error.response.data?.errors || {};
        setErrors(fieldErrors);
      } else {
        notify.error('Error', apiError.message);
      }
    } finally {
      stopLoading();
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Pattern 4: Batch Operations

```typescript
function AdminDashboard() {
  const { executeBatch } = useBatchApiCalls();
  const [stats, setStats] = useState(null);

  const loadDashboard = async () => {
    const [places, events, galleries] = await executeBatch([
      () => api.getPlacesStats(),
      () => api.getEventsStats(),
      () => api.getGalleriesStats()
    ], 'Loading dashboard...');

    setStats({ places, events, galleries });
  };

  return <button onClick={loadDashboard}>Refresh Dashboard</button>;
}
```

## Integration Checklist

When integrating with existing API calls, follow this checklist:

- [ ] Import `useLoading` from LoadingContext
- [ ] Import `parseApiError` from errorHandler
- [ ] Import `useNotification` for user feedback
- [ ] Replace `useState` loading states with `useLoading`
- [ ] Wrap API calls in try-catch with startLoading/stopLoading
- [ ] Parse errors with `parseApiError(error)`
- [ ] Show user-friendly error messages via `notify.error()`
- [ ] Remove local loading spinners (GlobalLoader handles it)
- [ ] Test error scenarios (offline, 401, 429, 500)
- [ ] Add loading message for context

## Current Status

### ✅ Completed
- LoadingContext with global state management
- GlobalLoader modal component
- Error handler utility with HTTP status mapping
- Retry hook with exponential backoff
- Enhanced API client wrapper
- Error Boundary component
- API loading utilities
- Admin pages migrated (AdminPlacesPage)
- App.tsx integrated with all providers

### ⏳ Pending Migration
- AdminEventsPage (partially migrated)
- AdminGalleryPage (partially migrated)
- PlacesPage (public)
- EventsPage (public)
- GalleryPage (public)

## Error Scenarios Handled

| Scenario | Response | Action |
|----------|----------|--------|
| Network error | Connection failed | Auto-retry with backoff |
| 401 Unauthorized | Session expired | Redirect to login |
| 403 Forbidden | Permission denied | Show error, no retry |
| 404 Not Found | Resource missing | Show error, no retry |
| 422 Validation | Field errors | Show field errors |
| 429 Rate Limited | Too many requests | Retry after Retry-After header |
| 5xx Server Error | Server error | Auto-retry with backoff |
| Timeout | Connection timeout | Auto-retry with backoff |

## Configuration

### Global Loader
- Threshold: Auto-shows when loading.isLoading === true
- Timeout: None (stays visible until all requests complete)
- Message: Configurable per operation

### Retry Mechanism
- Max Attempts: 3 (configurable per operation)
- Backoff: Exponential (1s, 2s, 4s, 8s, 16s)
- Rate Limit: Respects Retry-After header
- Only Retries: 5xx, 429, 408, network errors

### Error Boundary
- Scope: Entire application
- Recovery: Try Again, Reload, Back Home buttons
- Dev Mode: Shows stack trace

## Testing Recommendations

1. **Network Failures**
   - Use browser DevTools to throttle/disable network
   - Verify retry mechanism works
   - Check error messages display

2. **Rate Limiting**
   - Mock 429 response with Retry-After header
   - Verify proper retry delay

3. **Component Errors**
   - Intentionally throw error in component render
   - Verify ErrorBoundary catches it
   - Test recovery buttons

4. **Concurrent Requests**
   - Make multiple API calls simultaneously
   - Verify request counter displays correctly
   - Check GlobalLoader shows properly

5. **Admin Operations**
   - CRUD operations with loading indicators
   - Form validation with error display
   - Success notifications after operations

## Example Files

Complete examples available in `src/pages/examples.tsx`:
1. ExampleBasicFetch - Simple useEffect pattern
2. ExampleWithRetry - Retry hook usage
3. ExampleBatchOperations - Multiple parallel requests
4. ExampleFormWithRetry - Form with validation and retry
5. ExampleErrorHandling - Different HTTP error codes

## Summary

This global loading and error handling system provides:

✅ **Centralized State** - One source of truth for loading state
✅ **User Feedback** - Clear messages during operations
✅ **Automatic Retry** - Resilience to transient failures
✅ **Error Safety** - Catches and displays errors gracefully
✅ **Type Safe** - 100% TypeScript coverage
✅ **Production Ready** - Comprehensive error scenarios handled
✅ **Easy Integration** - Minimal changes to existing code

The system is ready for immediate use across the application!
