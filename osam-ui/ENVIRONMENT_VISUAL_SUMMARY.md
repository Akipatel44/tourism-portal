# Environment Configuration System - Visual Summary

## 🎯 System Overview

```
Your React App (OSAM UI)
│
├─ npm run dev          → .env + .env.development      → Development
├─ npm run build:staging→ .env + .env.staging          → Staging
└─ npm run build        → .env + .env.production       → Production
```

## 🔄 How It Works

```
1. You run command: npm run dev
       ↓
2. Vite detects mode: development
       ↓
3. Loads environment files:
   - .env (defaults)
   - .env.development (overrides)
       ↓
4. Makes variables available as: import.meta.env.VITE_*
       ↓
5. src/config/environment.ts reads and validates all variables
       ↓
6. Components import { env } from '@/config/environment'
       ↓
7. Use env.api.baseUrl, env.features.admin, etc.
```

## 📦 What's Included

```
✅ 4 Environment files      (.env, .env.development, .env.staging, .env.production)
✅ 20 Environment variables (API, Images, Auth, Features, Debug)
✅ 1 Configuration module   (src/config/environment.ts - type-safe)
✅ 1 Image utility          (src/utils/imageUrl.ts - automatic URL construction)
✅ 3 Build commands         (dev, build, build:staging)
✅ 5 Documentation files    (Setup, Usage, Quick Ref, Config, Architecture)
✅ 10 Code examples         (Real-world usage patterns)
```

## 🚀 Commands at a Glance

```bash
npm run dev              Development (localhost:8000, hot reload)
npm run build            Production build (optimized)
npm run build:staging    Staging build
npm run preview          Preview production build locally
npm run preview:staging  Preview staging build locally
```

## 💻 Code Usage at a Glance

```typescript
// 1. Access configuration
import { env } from '@/config/environment';
console.log(env.api.baseUrl);        // 'http://localhost:8000/api/v1'
console.log(env.appEnv);             // 'development'

// 2. Check environment
import { isEnvironment } from '@/config/environment';
if (isEnvironment('production')) { }

// 3. Check feature flags
import { isFeatureEnabled } from '@/config/environment';
if (isFeatureEnabled('admin')) { }

// 4. Image URLs
import { getFullImageUrl } from '@/utils/imageUrl';
const url = getFullImageUrl('/uploads/photo.jpg');

// 5. Debug logging
import { env, logEnvironmentConfig } from '@/config/environment';
logEnvironmentConfig();
```

## 📊 Environment Settings Comparison

```
                    DEVELOPMENT        STAGING            PRODUCTION
Command             npm run dev         build:staging      npm run build
API URL             localhost:8000      staging-api.*      api.osam-tourism.com
Timeout             30s                 40s                45s
Debug Mode          ✅ ON               ❌ OFF             ❌ OFF
API Logging         ✅ ON               ✅ ON              ❌ OFF
Admin Features      ✅ ENABLED          ✅ ENABLED         ✅ ENABLED
Analytics           ❌ OFF              ✅ ON              ✅ ON
Beta Features       ✅ ON               ✅ ON              ❌ OFF
Error Details       ✅ SHOWN            ✅ SHOWN           ❌ HIDDEN
Source Maps         ✅ YES              ❌ NO              ❌ NO
Bundle Size         Larger (dev)        Optimized          Optimized
Hot Reload          ✅ YES              ❌ NO              ❌ NO
```

## 📁 File Organization

```
osam-ui/
│
├── Environment Configuration Files
│   ├── .env                          Default values
│   ├── .env.development              Dev overrides
│   ├── .env.staging                  Staging overrides
│   ├── .env.production               Production overrides
│   └── .env.example                  Template reference
│
├── Documentation
│   ├── ENVIRONMENT_README.md          ← Main entry point
│   ├── ENVIRONMENT_QUICK_REFERENCE.md ← Quick lookup
│   ├── ENVIRONMENT_SETUP.md           ← Detailed setup
│   ├── ENVIRONMENT_USAGE.md           ← Code patterns
│   ├── ENVIRONMENT_CONFIGURATION.md   ← System overview
│   └── ENVIRONMENT_ARCHITECTURE.md    ← Architecture
│
├── Source Code
│   └── src/
│       ├── config/
│       │   └── environment.ts         Type-safe config access
│       ├── utils/
│       │   └── imageUrl.ts            Image URL helpers
│       ├── examples/
│       │   └── EnvironmentConfigExamples.tsx  10 examples
│       └── api/
│           └── client.ts              Uses environment config
│
└── Build Configuration
    └── package.json                   Updated with build commands
```

## 🎓 Learning Path

```
START HERE → ENVIRONMENT_README.md (this file)
     ↓
QUICK START → ENVIRONMENT_QUICK_REFERENCE.md (5 minutes)
     ↓
RUN APP → npm run dev (check browser console)
     ↓
USE CODE → Import { env } from '@/config/environment'
     ↓
DEEP DIVE → ENVIRONMENT_SETUP.md or ENVIRONMENT_USAGE.md
     ↓
BUILD → npm run build (when ready to deploy)
```

## 🔑 Key Concepts

### 1. Automatic Environment Detection
```
You write:     npm run dev
Vite detects:  mode = "development"
Loads file:    .env.development
Result:        env.appEnv = "development"
```

### 2. Type-Safe Access
```typescript
import { env } from '@/config/environment';
// TypeScript knows about all properties
env.api.baseUrl     ✅ Type-safe, autocomplete
env.api.timeout     ✅ Type-safe, autocomplete
env.features.admin  ✅ Type-safe, autocomplete
```

### 3. Feature Flags
```typescript
// Control features per environment
VITE_FEATURE_ADMIN=true (dev+staging+prod)
VITE_FEATURE_BETA=true (dev+staging only)
VITE_FEATURE_ANALYTICS=false (dev), true (staging+prod)
```

### 4. Automatic Image URLs
```typescript
// Path: /uploads/photo.jpg
// Dev: http://localhost:8000/uploads/photo.jpg
// Prod: https://assets.osam-tourism.com/uploads/photo.jpg
```

## ⚡ Common Patterns

### Show Admin Panel (Dev + Staging)
```typescript
import { isEnvironment } from '@/config/environment';
{!isEnvironment('production') && <AdminPanel />}
```

### Enable Analytics (Prod + Staging)
```typescript
import { isFeatureEnabled } from '@/config/environment';
if (isFeatureEnabled('analytics')) {
  initializeAnalytics();
}
```

### Log API Calls (If Enabled)
```typescript
import { env } from '@/config/environment';
if (env.features.apiLogging) {
  console.log('API call:', url);
}
```

### Build Correct Image URL
```typescript
import { getFullImageUrl } from '@/utils/imageUrl';
const url = getFullImageUrl('/uploads/photo.jpg');
```

## ✅ Quality Checklist

- ✅ All 20 environment variables documented
- ✅ Type-safe access with TypeScript
- ✅ Automatic environment detection
- ✅ Feature flag support
- ✅ Debug/logging controls
- ✅ Image URL management
- ✅ API configuration centralized
- ✅ 3 environment templates (dev, staging, prod)
- ✅ 5 comprehensive documentation files
- ✅ 10 real-world code examples
- ✅ Production-ready configuration

## 🚦 Next Steps

1. **Read** [ENVIRONMENT_QUICK_REFERENCE.md](./ENVIRONMENT_QUICK_REFERENCE.md) (5 min)
2. **Run** `npm run dev` (start development)
3. **Check** Browser console for environment configuration
4. **Use** `import { env } from '@/config/environment'` in components
5. **Deploy** with appropriate `.env.{environment}` file

## 🎯 Success Criteria

- ✅ Development app runs with `npm run dev`
- ✅ `env.logEnvironmentConfig()` shows correct settings
- ✅ Images load from correct base URL
- ✅ API calls connect to correct endpoint
- ✅ Feature flags control UI elements
- ✅ Debug mode works in development
- ✅ Production build is optimized and silent
- ✅ Feature flags are disabled in production as configured

## 📞 Quick Help

**"How do I get the API URL?"**
```typescript
import { env } from '@/config/environment';
console.log(env.api.baseUrl);  // http://localhost:8000/api/v1
```

**"How do I check if a feature is enabled?"**
```typescript
import { isFeatureEnabled } from '@/config/environment';
if (isFeatureEnabled('admin')) { /* ... */ }
```

**"How do I use image URLs correctly?"**
```typescript
import { getFullImageUrl } from '@/utils/imageUrl';
const url = getFullImageUrl('/uploads/photo.jpg');
```

**"How do I switch environments?"**
```bash
npm run dev              # Development
npm run build:staging    # Staging
npm run build            # Production
```

**"Where's the documentation?"**
→ See [ENVIRONMENT_README.md](./ENVIRONMENT_README.md) for links

## 🏆 What You've Got

A **production-ready environment configuration system** that:
- 🎯 Automatically detects and loads the right settings
- 🔒 Type-safe with full TypeScript support
- 🎨 Supports feature flags for flexible deployments
- 🖼️ Manages image URLs across environments
- 🐛 Provides debug/logging controls
- 📱 Scales from development to production
- 📚 Fully documented with examples

---

**Ready to start? Run: `npm run dev`**

Then read: [ENVIRONMENT_QUICK_REFERENCE.md](./ENVIRONMENT_QUICK_REFERENCE.md)
