# Environment Configuration Quick Reference

## 🚀 Quick Start Commands

```bash
# Development
npm run dev

# Production
npm run build

# Staging
npm run build:staging

# Preview builds locally
npm run preview              # Production
npm run preview:staging      # Staging
```

## 📝 Environment Variables Quick Lookup

### API & Images
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=30000
VITE_IMAGE_BASE_URL=http://localhost:8000
VITE_IMAGE_OPTIMIZATION=false
```

### Application
```env
VITE_APP_ENV=development
VITE_APP_NAME=OSAM Tourism Platform
VITE_APP_VERSION=1.0.0
```

### Authentication
```env
VITE_AUTH_ENABLED=true
VITE_AUTH_MOCK=false
VITE_AUTH_REDIRECT_PATH=/
VITE_AUTH_LOGOUT_PATH=/login
```

### Feature Flags
```env
VITE_FEATURE_ADMIN=true
VITE_FEATURE_ANALYTICS=false
VITE_FEATURE_BETA=false
VITE_FEATURE_ERROR_DETAILS=false
VITE_FEATURE_API_LOGGING=true
```

### Debug
```env
VITE_DEBUG=false
VITE_LOG_LEVEL=info
VITE_LOG_API_CALLS=false
VITE_REACT_DEVTOOLS=false
VITE_SOURCE_MAPS=false
```

## 💻 Code Usage Snippets

### Import Configuration
```typescript
import { env } from '@/config/environment';
```

### Check Environment
```typescript
import { isEnvironment } from '@/config/environment';

if (isEnvironment('production')) { }
if (isEnvironment('development')) { }
if (isEnvironment('staging')) { }
```

### Check Feature Flags
```typescript
import { isFeatureEnabled } from '@/config/environment';

if (isFeatureEnabled('admin')) { }
if (isFeatureEnabled('analytics')) { }
if (isFeatureEnabled('beta')) { }
```

### Image URLs
```typescript
import { 
  getFullImageUrl, 
  getOptimizedImageUrl 
} from '@/utils/imageUrl';

const url = getFullImageUrl('/uploads/photo.jpg');
const optimized = getOptimizedImageUrl('/uploads/photo.jpg', { width: 800 });
```

### Debug Configuration
```typescript
import { env, logEnvironmentConfig } from '@/config/environment';

logEnvironmentConfig(); // Log all settings
console.log(env.appEnv);
console.log(env.api.baseUrl);
```

## 📊 Environment Comparison Table

| Feature | Development | Staging | Production |
|---------|-------------|---------|-----------|
| API URL | localhost | staging-api.* | api.* |
| Timeout | 30s | 40s | 45s |
| Debug | ✅ | ❌ | ❌ |
| API Logging | ✅ | ✅ | ❌ |
| Admin | ✅ | ✅ | ✅ |
| Analytics | ❌ | ✅ | ✅ |
| Beta Features | ✅ | ✅ | ❌ |
| Error Details | ✅ | ✅ | ❌ |

## 🔧 Common Tasks

### Switch to Development
```bash
npm run dev
# Automatically uses .env.development
```

### Build for Production
```bash
npm run build
# Automatically uses .env.production
# Output: dist/ folder
```

### Add New Environment Variable

1. Add to `.env.example`:
```env
VITE_MY_VAR=value
```

2. Add to `.env.{environment}`:
```env
VITE_MY_VAR=environment_value
```

3. Add to `src/config/environment.ts`:
```typescript
export const env = {
  myVar: import.meta.env.VITE_MY_VAR || 'default',
};
```

### Debug Why API Calls Fail

```typescript
import { env } from '@/config/environment';

console.log('API URL:', env.api.baseUrl);
console.log('API Timeout:', env.api.timeout);
console.log('Environment:', env.appEnv);
```

### Check if Feature is Enabled

```typescript
import { isFeatureEnabled } from '@/config/environment';

console.log('Admin enabled?', isFeatureEnabled('admin'));
console.log('Analytics enabled?', isFeatureEnabled('analytics'));
```

### Preload Images

```typescript
import { preloadImage, preloadImages } from '@/utils/imageUrl';

// Single image
await preloadImage('/uploads/gallery/photo.jpg');

// Multiple images
await preloadImages([
  '/uploads/gallery/photo1.jpg',
  '/uploads/gallery/photo2.jpg'
]);
```

## 🔐 Security Checklist

- ✅ API URLs are safe to expose
- ✅ Feature flags are safe to expose
- ❌ Never expose API keys in VITE_* variables
- ❌ Never expose secret tokens in VITE_* variables
- ✅ Use backend for sensitive configuration
- ✅ All VITE_* variables are embedded in client bundle

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `.env.example` | Template for all variables |
| `ENVIRONMENT_SETUP.md` | Complete setup guide |
| `ENVIRONMENT_USAGE.md` | Code usage patterns |
| `ENVIRONMENT_CONFIGURATION.md` | System summary |
| `ENVIRONMENT_ARCHITECTURE.md` | Architecture diagrams |
| `src/config/environment.ts` | Configuration module |
| `src/utils/imageUrl.ts` | Image URL utilities |
| `src/examples/EnvironmentConfigExamples.tsx` | Code examples |

## ❓ Troubleshooting

**API calls fail?**
→ Check `VITE_API_BASE_URL` matches running backend

**Images don't load?**
→ Verify `VITE_IMAGE_BASE_URL` is set correctly

**Feature flag not working?**
→ Confirm you're using the correct `.env.{environment}` file

**Old values still showing?**
→ Clear browser cache, restart `npm run dev`

**Production build shows debug info?**
→ Ensure `.env.production` has `VITE_DEBUG=false`

## 🎯 Next Steps

1. Start development: `npm run dev`
2. Check configuration: `env.logEnvironmentConfig()`
3. Use in components: `import { env } from '@/config/environment'`
4. Deploy with correct `.env.*` file
5. Verify configuration in deployed environment
