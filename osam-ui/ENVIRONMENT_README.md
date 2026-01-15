# Environment Configuration System - Complete Setup

## 📋 What's Been Set Up

A comprehensive, production-ready environment configuration system for the OSAM UI React application with support for:
- ✅ **Development** (localhost with hot reload)
- ✅ **Staging** (pre-production testing environment)
- ✅ **Production** (optimized, deployed environment)

## 🎯 Key Features

1. **Automatic Environment Detection** - Vite automatically loads the correct `.env.*` file based on the command used
2. **Type-Safe Configuration** - Full TypeScript support with autocomplete and type checking
3. **Feature Flags** - Control features across different environments
4. **Image URL Management** - Automatic base URL construction for images
5. **API Configuration** - Centralized API endpoint and timeout settings
6. **Debug Controls** - Environment-aware logging and debugging capabilities

## 📁 File Structure

```
osam-ui/
├── .env                              Default variables
├── .env.development                  Development overrides
├── .env.staging                      Staging overrides
├── .env.production                   Production overrides
├── .env.example                      Template reference
├── package.json                      Updated with build commands
│
├── ENVIRONMENT_QUICK_REFERENCE.md    👈 Start here for quick usage
├── ENVIRONMENT_SETUP.md              Complete setup guide
├── ENVIRONMENT_USAGE.md              Code usage patterns
├── ENVIRONMENT_CONFIGURATION.md      System summary
├── ENVIRONMENT_ARCHITECTURE.md       Architecture diagrams
│
├── src/
│   ├── config/
│   │   └── environment.ts            🔧 Configuration module (type-safe access)
│   │
│   ├── utils/
│   │   └── imageUrl.ts               Image URL helpers
│   │
│   ├── examples/
│   │   └── EnvironmentConfigExamples.tsx  10 code examples
│   │
│   ├── api/
│   │   └── client.ts                 Updated to use environment config
│   │
│   └── App.tsx                       Imports and uses configuration
```

## 🚀 Getting Started (3 Steps)

### Step 1: Start Development Server
```bash
npm run dev
```
- Automatically uses `.env.development`
- Connects to `http://localhost:8000/api/v1`
- Enables debug mode, API logging, beta features

### Step 2: Access Configuration in Code
```typescript
import { env, isFeatureEnabled, isEnvironment } from '@/config/environment';

// Check current environment
console.log(env.appEnv);           // 'development'

// Check feature flags
if (isFeatureEnabled('admin')) {
  // Show admin features
}

// Check environment
if (isEnvironment('production')) {
  // Production-specific code
}
```

### Step 3: Use Image URLs
```typescript
import { getFullImageUrl, getOptimizedImageUrl } from '@/utils/imageUrl';

const imageUrl = getFullImageUrl('/uploads/gallery/photo.jpg');
// Result: http://localhost:8000/uploads/gallery/photo.jpg (dev)
// Result: https://assets.osam-tourism.com/uploads/gallery/photo.jpg (prod)
```

## 📊 Environment Comparison

| Setting | Development | Staging | Production |
|---------|-------------|---------|-----------|
| **Command** | `npm run dev` | `npm run build:staging` | `npm run build` |
| **API URL** | localhost:8000 | staging-api.* | api.osam-tourism.com |
| **Debug** | ✅ Enabled | ❌ Disabled | ❌ Disabled |
| **Admin Features** | ✅ Enabled | ✅ Enabled | ✅ Enabled |
| **Analytics** | ❌ Disabled | ✅ Enabled | ✅ Enabled |
| **Beta Features** | ✅ Enabled | ✅ Enabled | ❌ Disabled |
| **API Logging** | ✅ Enabled | ✅ Enabled | ❌ Disabled |

## 🔧 All Available Commands

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Build for staging
npm run build:staging

# Preview production build locally
npm run preview

# Preview staging build locally
npm run preview:staging

# Type check and lint
npm run lint
```

## 📖 Documentation Map

| Document | Best For |
|----------|----------|
| **ENVIRONMENT_QUICK_REFERENCE.md** | ⚡ Quick lookups and common tasks |
| **ENVIRONMENT_SETUP.md** | 📚 Complete setup and configuration guide |
| **ENVIRONMENT_USAGE.md** | 💻 Code patterns and usage examples |
| **ENVIRONMENT_CONFIGURATION.md** | 📊 System overview and summary |
| **ENVIRONMENT_ARCHITECTURE.md** | 🏗️ Architecture diagrams and flow |
| **src/examples/EnvironmentConfigExamples.tsx** | 📝 10 real-world code examples |

## 🎨 All Environment Variables

### API & Images (2)
- `VITE_API_BASE_URL` - API endpoint with `/api/v1` path
- `VITE_API_TIMEOUT` - Request timeout in milliseconds
- `VITE_IMAGE_BASE_URL` - Image asset base URL
- `VITE_IMAGE_OPTIMIZATION` - Enable image optimization

### Application (3)
- `VITE_APP_ENV` - Environment name (development|staging|production)
- `VITE_APP_NAME` - Application display name
- `VITE_APP_VERSION` - Version number (semantic versioning)

### Authentication (4)
- `VITE_AUTH_ENABLED` - Enforce authentication
- `VITE_AUTH_MOCK` - Use mock auth (dev only)
- `VITE_AUTH_REDIRECT_PATH` - Post-login redirect path
- `VITE_AUTH_LOGOUT_PATH` - Post-logout redirect path

### Feature Flags (5)
- `VITE_FEATURE_ADMIN` - Admin dashboard
- `VITE_FEATURE_ANALYTICS` - Analytics tracking
- `VITE_FEATURE_BETA` - Beta features
- `VITE_FEATURE_ERROR_DETAILS` - Detailed errors
- `VITE_FEATURE_API_LOGGING` - API logging

### Debug (5)
- `VITE_DEBUG` - Verbose logging
- `VITE_LOG_LEVEL` - Log level (trace|debug|info|warn|error)
- `VITE_LOG_API_CALLS` - Log API requests
- `VITE_REACT_DEVTOOLS` - React DevTools integration
- `VITE_SOURCE_MAPS` - Enable source maps

**Total: 20 environment variables**

## 💡 Common Use Cases

### 1. Show Admin Features Only in Development
```typescript
import { isEnvironment } from '@/config/environment';

{isEnvironment('development') && <AdminDebugPanel />}
```

### 2. Log API Calls Only If Enabled
```typescript
import { env } from '@/config/environment';

if (env.features.apiLogging) {
  console.log(`[API] GET ${url}`);
}
```

### 3. Different Image URLs Per Environment
```typescript
import { getFullImageUrl } from '@/utils/imageUrl';

// Automatically uses correct base URL from environment
const photoUrl = getFullImageUrl('/uploads/gallery/photo.jpg');
```

### 4. Verify Environment Before Deployment
```typescript
import { env, logEnvironmentConfig } from '@/config/environment';

// Log configuration to verify it's correct
logEnvironmentConfig();

// Verify production is using HTTPS
console.assert(env.api.baseUrl.startsWith('https://'), 'Production must use HTTPS');
```

### 5. Conditional Analytics Initialization
```typescript
import { isFeatureEnabled } from '@/config/environment';

if (isFeatureEnabled('analytics')) {
  // Initialize Google Analytics, Mixpanel, etc.
  initializeAnalytics();
}
```

## ✅ Deployment Checklist

### Before Deploying to Staging
- [ ] Create/update `.env.staging`
- [ ] Set `VITE_API_BASE_URL=https://staging-api.osam-tourism.com/api/v1`
- [ ] Run `npm run build:staging`
- [ ] Test all admin features
- [ ] Verify API connectivity
- [ ] Check analytics integration

### Before Deploying to Production
- [ ] Update `.env.production` with production URLs
- [ ] Verify `VITE_API_BASE_URL` uses HTTPS
- [ ] Set `VITE_DEBUG=false`
- [ ] Set `VITE_LOG_LEVEL=error`
- [ ] Set `VITE_FEATURE_ERROR_DETAILS=false`
- [ ] Disable `VITE_FEATURE_BETA`
- [ ] Run `npm run build`
- [ ] Test build locally with `npm run preview`
- [ ] Deploy `dist/` folder to production
- [ ] Verify all features work in production

## 🔐 Security Notes

**Safe to expose (VITE_* variables):**
- API URLs, image URLs, app name, feature flags

**Never expose (use backend environment variables):**
- API keys, secret tokens, database credentials, private keys

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| API calls fail | Check `VITE_API_BASE_URL` matches running backend |
| Images don't load | Verify `VITE_IMAGE_BASE_URL` is configured |
| Feature flag not working | Confirm correct `.env.{environment}` file is being used |
| Old values showing | Clear browser cache, restart dev server with `npm run dev` |
| Production uses localhost | Verify `.env.production` has correct API URL |

## 🚦 What's Next?

1. ✅ **You are here** - Environment system is set up
2. 📖 Read [ENVIRONMENT_QUICK_REFERENCE.md](./ENVIRONMENT_QUICK_REFERENCE.md) for quick usage
3. 💻 Check [src/examples/EnvironmentConfigExamples.tsx](./src/examples/EnvironmentConfigExamples.tsx) for code patterns
4. 🚀 Start development with `npm run dev`
5. 📊 Build and deploy when ready

## 📞 Quick Reference Commands

```bash
# Check environment configuration
npm run dev                    # Start with logging

# In browser console:
import { env } from '@/config/environment'
env.logEnvironmentConfig()     # View all settings

# Check specific values
console.log(env.api.baseUrl)
console.log(env.appEnv)
console.log(env.features)
```

## 📚 Complete Documentation Index

All documentation is in markdown format in the project root:

- 📖 [ENVIRONMENT_QUICK_REFERENCE.md](./ENVIRONMENT_QUICK_REFERENCE.md) - **Start here for quick lookups**
- 📚 [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Complete setup guide
- 💻 [ENVIRONMENT_USAGE.md](./ENVIRONMENT_USAGE.md) - Code usage patterns
- 📊 [ENVIRONMENT_CONFIGURATION.md](./ENVIRONMENT_CONFIGURATION.md) - System overview
- 🏗️ [ENVIRONMENT_ARCHITECTURE.md](./ENVIRONMENT_ARCHITECTURE.md) - Architecture diagrams
- 📝 [src/examples/EnvironmentConfigExamples.tsx](./src/examples/EnvironmentConfigExamples.tsx) - 10 code examples

## 🎯 Key Files to Know

| File | Purpose |
|------|---------|
| `src/config/environment.ts` | Type-safe configuration access |
| `src/utils/imageUrl.ts` | Image URL helpers |
| `src/api/client.ts` | Updated to use environment config |
| `.env.development` | Development settings |
| `.env.production` | Production settings |
| `.env.staging` | Staging settings |
| `package.json` | Build commands with environment modes |

---

**Environment Configuration System Setup Complete! ✅**

Ready to start development or deploy to production.
