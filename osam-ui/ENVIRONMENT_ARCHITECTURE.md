# Environment Configuration Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ENVIRONMENT CONFIGURATION SYSTEM                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                      COMMAND → ENVIRONMENT MAPPING                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  npm run dev              →  .env.development                               │
│  npm run build            →  .env.production                                │
│  npm run build:staging    →  .env.staging                                   │
│  npm run preview          →  (uses built files + .env.production)           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         ENVIRONMENT FILE HIERARCHY                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  .env                          (default variables - always loaded)          │
│    │                                                                        │
│    ├─→ .env.development        (dev overrides)                             │
│    │                                                                        │
│    ├─→ .env.staging            (staging overrides)                         │
│    │                                                                        │
│    └─→ .env.production         (production overrides)                      │
│                                                                              │
│  .env.example                  (template/documentation)                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                       ENVIRONMENT VARIABLE CATEGORIES                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ API Configuration                                                  │   │
│  │  ├─ VITE_API_BASE_URL         http://localhost:8000/api/v1       │   │
│  │  └─ VITE_API_TIMEOUT          30000 (milliseconds)                │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ Image Configuration                                                │   │
│  │  ├─ VITE_IMAGE_BASE_URL       http://localhost:8000              │   │
│  │  └─ VITE_IMAGE_OPTIMIZATION   true|false                          │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ Application Settings                                               │   │
│  │  ├─ VITE_APP_ENV              development|staging|production      │   │
│  │  ├─ VITE_APP_NAME             OSAM Tourism Platform              │   │
│  │  └─ VITE_APP_VERSION          1.0.0                               │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ Authentication                                                     │   │
│  │  ├─ VITE_AUTH_ENABLED         true|false                          │   │
│  │  ├─ VITE_AUTH_MOCK            true|false (dev only)              │   │
│  │  ├─ VITE_AUTH_REDIRECT_PATH   /                                  │   │
│  │  └─ VITE_AUTH_LOGOUT_PATH     /login                             │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ Feature Flags                                                      │   │
│  │  ├─ VITE_FEATURE_ADMIN        true|false                          │   │
│  │  ├─ VITE_FEATURE_ANALYTICS    true|false                          │   │
│  │  ├─ VITE_FEATURE_BETA         true|false                          │   │
│  │  ├─ VITE_FEATURE_ERROR_DETAILS true|false                         │   │
│  │  └─ VITE_FEATURE_API_LOGGING  true|false                          │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ Debug Settings                                                     │   │
│  │  ├─ VITE_DEBUG                true|false                          │   │
│  │  ├─ VITE_LOG_LEVEL            trace|debug|info|warn|error         │   │
│  │  ├─ VITE_LOG_API_CALLS        true|false                          │   │
│  │  ├─ VITE_REACT_DEVTOOLS       true|false                          │   │
│  │  └─ VITE_SOURCE_MAPS          true|false                          │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                      ENVIRONMENT CONFIGURATION FLOW                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. Application Start (npm run dev)                                         │
│     │                                                                       │
│     ├─→ Vite loads .env (fallback)                                         │
│     │                                                                       │
│     ├─→ Vite loads .env.development (overrides)                            │
│     │                                                                       │
│     └─→ Variables accessible as import.meta.env.VITE_*                     │
│                                                                              │
│  2. Module Load (src/config/environment.ts)                                 │
│     │                                                                       │
│     ├─→ Reads all VITE_* variables                                         │
│     │                                                                       │
│     ├─→ Creates typed env object                                           │
│     │                                                                       │
│     ├─→ Logs configuration if isDev or debug.enabled                       │
│     │                                                                       │
│     └─→ Exports env, helper functions, hooks                               │
│                                                                              │
│  3. Component Usage                                                         │
│     │                                                                       │
│     ├─→ import { env } from '@/config/environment'                         │
│     │                                                                       │
│     ├─→ Use env.api.baseUrl, env.features.admin, etc.                      │
│     │                                                                       │
│     ├─→ Use helper functions (isEnvironment, isFeatureEnabled)             │
│     │                                                                       │
│     └─→ Use image URL helpers (getFullImageUrl, getOptimizedImageUrl)      │
│                                                                              │
│  4. API Client Usage (src/api/client.ts)                                    │
│     │                                                                       │
│     ├─→ import { env } from '@/config/environment'                         │
│     │                                                                       │
│     ├─→ const API_BASE_URL = env.api.baseUrl                               │
│     │                                                                       │
│     ├─→ const API_TIMEOUT = env.api.timeout                                │
│     │                                                                       │
│     ├─→ Log API calls if env.features.apiLogging                           │
│     │                                                                       │
│     └─→ Auto-attach JWT token to requests                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT vs PRODUCTION                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DEVELOPMENT (.env.development)      PRODUCTION (.env.production)          │
│  ──────────────────────────────      ──────────────────────────────       │
│                                                                              │
│  API URL: localhost:8000               API URL: api.osam-tourism.com       │
│  Timeout: 30 seconds                   Timeout: 45 seconds                 │
│  Debug: ENABLED ✓                      Debug: DISABLED ✗                   │
│  API Logging: ENABLED ✓                API Logging: DISABLED ✗             │
│  Admin Features: ENABLED ✓             Admin Features: ENABLED ✓           │
│  Analytics: DISABLED ✗                 Analytics: ENABLED ✓                │
│  Beta Features: ENABLED ✓              Beta Features: DISABLED ✗           │
│  Error Details: ENABLED ✓              Error Details: DISABLED ✗           │
│  Source Maps: ENABLED ✓                Source Maps: DISABLED ✗             │
│                                                                              │
│  Build: npm run dev                    Build: npm run build                 │
│  Output: HMR with watch                Output: Optimized dist/              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FILE STRUCTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  osam-ui/                                                                  │
│  ├─ .env                        ← Default variables                        │
│  ├─ .env.example                ← Template/reference                       │
│  ├─ .env.development            ← Dev overrides                            │
│  ├─ .env.staging                ← Staging overrides                        │
│  ├─ .env.production             ← Production overrides                     │
│  │                                                                          │
│  ├─ ENVIRONMENT_SETUP.md        ← Complete setup guide                    │
│  ├─ ENVIRONMENT_USAGE.md        ← Code usage examples                     │
│  ├─ ENVIRONMENT_CONFIGURATION.md ← This summary                           │
│  │                                                                          │
│  ├─ src/                                                                   │
│  │  ├─ config/                                                             │
│  │  │  └─ environment.ts        ← Central config module                   │
│  │  │                                                                      │
│  │  ├─ utils/                                                              │
│  │  │  └─ imageUrl.ts          ← Image URL helpers                        │
│  │  │                                                                      │
│  │  ├─ api/                                                                │
│  │  │  └─ client.ts            ← Uses env.api.baseUrl                     │
│  │  │                                                                      │
│  │  └─ App.tsx, pages/, etc.    ← Use env configuration                   │
│  │                                                                          │
│  └─ package.json                ← Build scripts with environments          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        IMPORT AND USAGE PATTERNS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  // Pattern 1: Environment configuration                                    │
│  import { env } from '@/config/environment';                                │
│  console.log(env.api.baseUrl);      // http://localhost:8000/api/v1       │
│  console.log(env.appEnv);           // 'development'                       │
│                                                                              │
│  // Pattern 2: Helper functions                                             │
│  import {                                                                    │
│    isEnvironment,                                                            │
│    isFeatureEnabled,                                                         │
│    getImageUrl                                                               │
│  } from '@/config/environment';                                             │
│                                                                              │
│  if (isFeatureEnabled('admin')) { }   // Check feature flag                │
│  if (isEnvironment('production')) { } // Check environment                 │
│                                                                              │
│  // Pattern 3: Image URLs                                                   │
│  import {                                                                    │
│    getFullImageUrl,                                                          │
│    getOptimizedImageUrl,                                                     │
│    preloadImage                                                              │
│  } from '@/utils/imageUrl';                                                │
│                                                                              │
│  const url = getFullImageUrl('/uploads/gallery/photo.jpg');                │
│  // Result: http://localhost:8000/uploads/gallery/photo.jpg               │
│                                                                              │
│  // Pattern 4: Conditional rendering                                        │
│  import { isFeatureEnabled } from '@/config/environment';                   │
│                                                                              │
│  export function MyComponent() {                                            │
│    return (                                                                  │
│      <>                                                                      │
│        {isFeatureEnabled('admin') && <AdminPanel />}                        │
│        {isFeatureEnabled('beta') && <BetaFeatures />}                       │
│      </>                                                                      │
│    );                                                                        │
│  }                                                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Key Points

1. **Automatic Mode Detection**: Vite automatically selects the correct `.env.*` file based on the command used

2. **Type Safety**: All environment variables are loaded through `src/config/environment.ts` with full TypeScript support

3. **Hierarchical Loading**: Default values in `.env` are overridden by environment-specific values in `.env.{mode}`

4. **Helper Functions**: Use `isEnvironment()`, `isFeatureEnabled()`, `getImageUrl()` instead of accessing variables directly

5. **API Integration**: The API client automatically uses `env.api.baseUrl` and `env.api.timeout`

6. **Image Support**: The `imageUrl.ts` utility provides consistent image URL construction with optional optimization

7. **Documentation**: Three guides provide setup instructions, code examples, and troubleshooting

## Common Workflows

### Start Development
```bash
npm run dev
# Uses .env.development
# Connects to http://localhost:8000/api/v1
```

### Deploy to Staging
```bash
npm run build:staging
# Uses .env.staging
# Creates optimized dist/ for deployment
```

### Deploy to Production
```bash
npm run build
# Uses .env.production
# Creates optimized dist/ for production deployment
```

### Debug Configuration
```typescript
import { env, logEnvironmentConfig } from '@/config/environment';

logEnvironmentConfig(); // Logs all settings to console
```
