# Environment Configuration Usage Guide

Quick reference for using environment variables in the OSAM UI application.

## 🎯 Quick Start

### Development
```bash
npm run dev
```
Uses `.env.development` - connects to local API at `http://localhost:8000/api/v1`

### Production
```bash
npm run build
```
Uses `.env.production` - connects to production API at `https://api.osam-tourism.com/api/v1`

### Staging
```bash
npm run build:staging
```
Uses `.env.staging` - connects to staging API

## 📦 Using Environment Variables in Code

### 1. Import the Environment Configuration

```typescript
import { env } from '@/config/environment';

// Check environment
console.log(env.appEnv);        // 'development' | 'staging' | 'production'

// API URLs
console.log(env.api.baseUrl);   // http://localhost:8000/api/v1
console.log(env.api.timeout);   // 30000

// Image URLs
console.log(env.images.baseUrl); // http://localhost:8000

// Feature flags
console.log(env.features.admin);        // true
console.log(env.features.analytics);    // false

// Debug settings
console.log(env.debug.enabled);         // true
console.log(env.debug.logApiCalls);     // true
```

### 2. Use Helper Functions

```typescript
import { 
  env, 
  isEnvironment, 
  isFeatureEnabled, 
  getImageUrl, 
  getApiUrl 
} from '@/config/environment';

// Check environment
if (isEnvironment('production')) {
  // Production-specific code
}

// Check feature flags
if (isFeatureEnabled('admin')) {
  // Show admin features
}

// Build URLs
const imageUrl = getImageUrl('/uploads/gallery/photo.jpg');
const apiUrl = getApiUrl('/places');
```

### 3. Use Image URL Helpers

```typescript
import { 
  getFullImageUrl, 
  getOptimizedImageUrl, 
  getPlaceholderImageUrl,
  getAvatarUrl,
  preloadImage
} from '@/utils/imageUrl';

// Get full image URL
const photoUrl = getFullImageUrl('/uploads/gallery/photo.jpg');

// Get optimized image (if enabled)
const optimized = getOptimizedImageUrl('/uploads/gallery/photo.jpg', {
  width: 800,
  quality: 80,
  format: 'webp'
});

// Get placeholder image
const placeholder = getPlaceholderImageUrl(400, 300, 'Gallery Image');

// Get avatar
const avatar = getAvatarUrl('john_doe', 100);

// Preload image
await preloadImage('/uploads/gallery/photo.jpg');
```

## 💡 Common Use Cases

### Building Component with Image

```typescript
import { getFullImageUrl } from '@/utils/imageUrl';
import { env } from '@/config/environment';

export function GalleryImage({ path, alt }: { path: string; alt: string }) {
  const imageUrl = getFullImageUrl(path);

  return (
    <img
      src={imageUrl}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        // Use placeholder on error
        e.currentTarget.src = `https://via.placeholder.com/400x300?text=${alt}`;
      }}
    />
  );
}
```

### Conditional Feature Display

```typescript
import { isFeatureEnabled } from '@/config/environment';

export function Dashboard() {
  return (
    <div>
      {isFeatureEnabled('admin') && <AdminPanel />}
      {isFeatureEnabled('analytics') && <AnalyticsDashboard />}
      {isFeatureEnabled('beta') && <BetaFeatures />}
    </div>
  );
}
```

### API Configuration

The API client automatically uses the environment configuration:

```typescript
// src/api/client.ts automatically loads:
import { env } from '@/config/environment';

const API_BASE_URL = env.api.baseUrl;      // From environment
const API_TIMEOUT = env.api.timeout;       // From environment

// Logging is controlled by:
if (env.features.apiLogging) {
  // Log API calls
}
```

### Debug Logging

```typescript
import { env, logEnvironmentConfig } from '@/config/environment';

// Log all environment settings
logEnvironmentConfig();

// Conditional logging
if (env.debug.enabled) {
  console.log('Detailed debug information');
}

// Log by level
if (env.debug.logLevel === 'debug') {
  console.debug('Debug level logging');
}
```

## 🔧 Environment-Specific Behavior

### Development Environment

```typescript
import { env } from '@/config/environment';

if (env.appEnv === 'development') {
  // Features enabled in dev:
  // - Admin dashboard (VITE_FEATURE_ADMIN=true)
  // - Beta features (VITE_FEATURE_BETA=true)
  // - Error details (VITE_FEATURE_ERROR_DETAILS=true)
  // - API logging (VITE_FEATURE_API_LOGGING=true)
  // - Debug mode (VITE_DEBUG=true)
  // - Source maps (VITE_SOURCE_MAPS=true)
}
```

### Production Environment

```typescript
import { env } from '@/config/environment';

if (env.appEnv === 'production') {
  // Features enabled in production:
  // - Admin dashboard (VITE_FEATURE_ADMIN=true)
  // - Analytics (VITE_FEATURE_ANALYTICS=true)
  // - Longer API timeout (45s)
  
  // Features disabled in production:
  // - Debug mode (VITE_DEBUG=false)
  // - Error details (VITE_FEATURE_ERROR_DETAILS=false)
  // - API logging (VITE_LOG_API_CALLS=false)
  // - Beta features (VITE_FEATURE_BETA=false)
}
```

## 🚀 Deployment Checklist

Before deploying to a new environment:

```typescript
import { env, logEnvironmentConfig } from '@/config/environment';

// 1. Verify environment
console.assert(env.appEnv === 'production', 'Wrong environment!');

// 2. Verify API URL
console.assert(
  env.api.baseUrl.startsWith('https://'),
  'API should use HTTPS in production'
);

// 3. Log configuration for verification
logEnvironmentConfig();

// 4. Check feature flags are appropriate
console.log('Admin enabled:', env.features.admin);
console.log('Analytics enabled:', env.features.analytics);
console.log('Debug enabled:', env.debug.enabled);
```

## 📝 Adding New Environment Variables

To add a new environment variable:

1. **Add to `.env.example`:**
   ```env
   VITE_MY_NEW_VAR=default_value
   ```

2. **Add to all `.env.*` files:**
   ```env
   VITE_MY_NEW_VAR=environment_specific_value
   ```

3. **Add to `src/config/environment.ts`:**
   ```typescript
   export const env = {
     myNewVar: import.meta.env.VITE_MY_NEW_VAR || 'default_value',
   };
   ```

4. **Use in components:**
   ```typescript
   import { env } from '@/config/environment';
   
   console.log(env.myNewVar);
   ```

## 🐛 Debugging Environment Issues

### Check what environment is loaded

```typescript
import { env } from '@/config/environment';

// In browser console:
env.logEnvironmentConfig();

// Or check specific values:
console.log('Current environment:', env.appEnv);
console.log('API URL:', env.api.baseUrl);
console.log('Is development?', env.isDev);
console.log('Is production?', env.isProd);
```

### Verify env file is being used

```bash
# Check which mode Vite is using
npm run dev  # Uses .env.development
npm run build  # Uses .env.production

# For staging:
npm run build:staging  # Uses .env.staging
```

### Test environment variable access

```typescript
// In component:
import { env } from '@/config/environment';

export function EnvDebug() {
  return (
    <div>
      <p>Environment: {env.appEnv}</p>
      <p>API: {env.api.baseUrl}</p>
      <p>Images: {env.images.baseUrl}</p>
    </div>
  );
}
```

## 📚 Related Files

- [Environment Configuration Module](./src/config/environment.ts)
- [Image URL Utilities](./src/utils/imageUrl.ts)
- [Main Environment Setup Guide](./ENVIRONMENT_SETUP.md)
- [API Client](./src/api/client.ts)
- [API Configuration](./src/api/index.ts)
