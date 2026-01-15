# Environment Setup Summary

## Overview

A comprehensive multi-environment configuration system for the OSAM UI React application supporting Development, Staging, and Production environments.

## 📁 Files Created/Modified

### Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| `.env` | Default environment variables | ✅ Exists |
| `.env.development` | Development environment config | ✅ Created |
| `.env.staging` | Staging environment config | ✅ Created |
| `.env.production` | Production environment config | ✅ Exists |
| `.env.example` | Template/reference for all variables | ✅ Created |

### TypeScript Configuration

| File | Purpose |
|------|---------|
| `src/config/environment.ts` | Environment variable loader with type safety |
| `src/utils/imageUrl.ts` | Image URL helpers and optimization |

### Documentation

| File | Purpose |
|------|---------|
| `ENVIRONMENT_SETUP.md` | Complete setup and switching guide |
| `ENVIRONMENT_USAGE.md` | Code usage examples and patterns |
| `package.json` | Updated with staging build scripts |

## 🚀 Quick Reference

### Commands

```bash
# Development (localhost:8000)
npm run dev

# Production build
npm run build

# Staging build
npm run build:staging

# Preview builds
npm run preview               # Preview production build
npm run preview:staging       # Preview staging build
```

### Environment Variables

#### API Configuration
```
VITE_API_BASE_URL       - API endpoint with version (e.g., /api/v1)
VITE_API_TIMEOUT        - Request timeout in milliseconds
```

#### Image Configuration
```
VITE_IMAGE_BASE_URL     - Image asset base URL
VITE_IMAGE_OPTIMIZATION - Enable image transformations
```

#### Application
```
VITE_APP_ENV            - Environment name (development|staging|production)
VITE_APP_NAME           - Application display name
VITE_APP_VERSION        - Version number
```

#### Authentication
```
VITE_AUTH_ENABLED       - Enforce authentication
VITE_AUTH_MOCK          - Use mock auth (dev only)
VITE_AUTH_REDIRECT_PATH - Post-login redirect
VITE_AUTH_LOGOUT_PATH   - Post-logout redirect
```

#### Feature Flags
```
VITE_FEATURE_ADMIN              - Admin dashboard
VITE_FEATURE_ANALYTICS          - Analytics tracking
VITE_FEATURE_BETA               - Beta features
VITE_FEATURE_ERROR_DETAILS      - Detailed error messages
VITE_FEATURE_API_LOGGING        - API request logging
```

#### Debug
```
VITE_DEBUG              - Verbose logging
VITE_LOG_LEVEL          - Log level (trace|debug|info|warn|error)
VITE_LOG_API_CALLS      - Log API calls
VITE_REACT_DEVTOOLS     - React DevTools integration
VITE_SOURCE_MAPS        - Enable source maps
```

## 💻 Using in Code

### Import Configuration
```typescript
import { env } from '@/config/environment';

// Access values
console.log(env.api.baseUrl);
console.log(env.appEnv);
console.log(env.features.admin);
```

### Helper Functions
```typescript
import { 
  isEnvironment, 
  isFeatureEnabled, 
  getImageUrl 
} from '@/config/environment';

if (isEnvironment('production')) { }
if (isFeatureEnabled('admin')) { }
const url = getImageUrl('/uploads/photo.jpg');
```

### Image URLs
```typescript
import { 
  getFullImageUrl, 
  getOptimizedImageUrl,
  getAvatarUrl,
  preloadImage 
} from '@/utils/imageUrl';

const photo = getFullImageUrl('/uploads/gallery/photo.jpg');
const optimized = getOptimizedImageUrl(photo, { width: 800 });
```

## 📊 Environment Comparison

| Setting | Development | Staging | Production |
|---------|-------------|---------|-----------|
| **API URL** | localhost:8000 | staging-api.* | api.osam-tourism.com |
| **Timeout** | 30s | 40s | 45s |
| **Debug** | ✅ Enabled | ❌ Disabled | ❌ Disabled |
| **API Logging** | ✅ Enabled | ✅ Enabled | ❌ Disabled |
| **Admin Features** | ✅ Enabled | ✅ Enabled | ✅ Enabled |
| **Analytics** | ❌ Disabled | ✅ Enabled | ✅ Enabled |
| **Beta Features** | ✅ Enabled | ✅ Enabled | ❌ Disabled |
| **Error Details** | ✅ Enabled | ✅ Enabled | ❌ Disabled |
| **Source Maps** | ✅ Enabled | ❌ Disabled | ❌ Disabled |

## 🔄 How It Works

### 1. Load Order

Vite loads environment files in this order:
```
.env              (always loaded)
.env.{mode}       (mode-specific: development|staging|production)
```

### 2. Automatic Mode Selection

```bash
npm run dev              # Mode = development → .env.development
npm run build            # Mode = production → .env.production
npm run build:staging    # Mode = staging → .env.staging
```

### 3. Type-Safe Access

```typescript
// src/config/environment.ts loads and validates all variables
export const env = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
  },
  // ... more configuration
};

// Use in components with full TypeScript support
import { env } from '@/config/environment';
env.api.baseUrl // ✅ Type-safe, autocomplete enabled
```

## ✅ Deployment Checklist

Before deploying to each environment:

### Development ✅
- [ ] `.env.development` configured
- [ ] Backend running on `localhost:8000`
- [ ] `npm run dev` starts application

### Staging 🏗️
- [ ] Create `.env.staging`
- [ ] Set `VITE_API_BASE_URL=https://staging-api.osam-tourism.com/api/v1`
- [ ] Run `npm run build:staging`
- [ ] Deploy `dist/` folder
- [ ] Test admin features work
- [ ] Verify analytics integration

### Production 🚀
- [ ] `.env.production` configured with production URLs
- [ ] Set `VITE_DEBUG=false`
- [ ] Set `VITE_LOG_LEVEL=error`
- [ ] Set `VITE_FEATURE_ERROR_DETAILS=false`
- [ ] Run `npm run build`
- [ ] Test all features in production build
- [ ] Deploy to production hosting
- [ ] Verify analytics tracking

## 🔐 Security Notes

**Safe to expose (in VITE_* variables):**
- ✅ API base URLs
- ✅ Image CDN URLs
- ✅ Feature flags
- ✅ App name/version

**Never expose (NOT in VITE_* variables):**
- ❌ API keys
- ❌ Secret tokens
- ❌ Database credentials
- ❌ Private keys

**For sensitive data:**
- Use backend environment variables
- Never commit secrets to git
- Use `.gitignore` for local `.env` files with secrets

## 📚 Documentation Files

1. **ENVIRONMENT_SETUP.md** - Complete setup guide
   - How to set up each environment
   - Detailed variable descriptions
   - Troubleshooting guide

2. **ENVIRONMENT_USAGE.md** - Code usage guide
   - Code examples
   - Common patterns
   - Helper functions

3. **src/config/environment.ts** - Configuration module
   - Type-safe environment access
   - Helper functions

4. **src/utils/imageUrl.ts** - Image URL utilities
   - Image URL construction
   - Optimization support
   - Preloading functions

## 🎯 Next Steps

1. **Start Development:**
   ```bash
   npm run dev
   ```

2. **Check Environment:**
   - Open browser console
   - Run: `env.logEnvironmentConfig()`

3. **Use in Components:**
   ```typescript
   import { env, isFeatureEnabled } from '@/config/environment';
   ```

4. **Deploy to New Environment:**
   - Create `.env.{environment}`
   - Update API URLs
   - Run appropriate build command

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| API calls fail | Check `VITE_API_BASE_URL` matches running backend |
| Images don't load | Verify `VITE_IMAGE_BASE_URL` in `.env.{environment}` |
| Old values still showing | Clear browser cache, restart dev server |
| Feature flag not working | Confirm you're using correct `.env` file for environment |

See **ENVIRONMENT_SETUP.md** for detailed troubleshooting.
