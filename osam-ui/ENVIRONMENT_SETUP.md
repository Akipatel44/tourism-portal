# Environment Configuration Guide

This guide explains how to set up and switch between development, staging, and production environments for the OSAM UI application.

## 📋 Overview

The application uses Vite environment variables to manage configuration across different environments. Environment-specific variables are loaded automatically based on the command used to run the application.

### Environment Files

| File | Purpose | Usage |
|------|---------|-------|
| `.env` | Default variables (fallback) | Loaded in all environments |
| `.env.development` | Development configuration | Loaded when running `npm run dev` |
| `.env.production` | Production configuration | Loaded when building with `npm run build` |
| `.env.staging` | Staging configuration (optional) | Custom staging environment |
| `.env.example` | Template for environment variables | Reference for all available variables |

## 🚀 Quick Start

### Development Environment

```bash
# Install dependencies
npm install

# Start development server (uses .env.development)
npm run dev

# Server runs at: http://localhost:5173
# API connects to: http://localhost:8000/api/v1
```

**Key settings for development:**
- API timeout: 30 seconds (generous for debugging)
- Debug mode: enabled
- API logging: enabled
- Feature flags: admin & beta features enabled
- Auth mock mode: disabled (use real authentication)

### Production Build

```bash
# Build for production (uses .env.production)
npm run build

# The build output is in: ./dist

# Serve production build locally
npm run preview
```

**Key settings for production:**
- API timeout: 45 seconds
- Debug mode: disabled
- API logging: disabled
- Analytics: enabled
- Minimal error details shown to users

## 📝 Environment Variables Reference

### API Configuration

```env
# API base URL with version path
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Request timeout in milliseconds
VITE_API_TIMEOUT=30000
```

**Examples:**
- **Development:** `http://localhost:8000/api/v1`
- **Staging:** `https://staging-api.osam-tourism.com/api/v1`
- **Production:** `https://api.osam-tourism.com/api/v1`

### Image Configuration

```env
# Base URL for image assets (without trailing slash)
VITE_IMAGE_BASE_URL=http://localhost:8000

# Enable image optimization (WebP conversion, lazy loading)
VITE_IMAGE_OPTIMIZATION=false
```

**Examples:**
- **Development:** `http://localhost:8000`
- **Production:** `https://assets.osam-tourism.com` or `https://api.osam-tourism.com`

### Application Settings

```env
# Environment identifier
VITE_APP_ENV=development  # development | staging | production

# Display name
VITE_APP_NAME=OSAM Tourism Platform

# Version
VITE_APP_VERSION=1.0.0
```

### Authentication

```env
# Enforce authentication
VITE_AUTH_ENABLED=true

# Redirect after login (relative path)
VITE_AUTH_REDIRECT_PATH=/

# Redirect on logout
VITE_AUTH_LOGOUT_PATH=/login

# Use mock authentication (development only)
VITE_AUTH_MOCK=false
```

### Feature Flags

```env
# Admin dashboard and management features
VITE_FEATURE_ADMIN=true

# Analytics tracking
VITE_FEATURE_ANALYTICS=false

# Beta features
VITE_FEATURE_BETA=false

# Detailed error messages
VITE_FEATURE_ERROR_DETAILS=false

# API request logging
VITE_FEATURE_API_LOGGING=true
```

### Debug Settings

```env
# Verbose console output
VITE_DEBUG=false

# Log level: trace | debug | info | warn | error
VITE_LOG_LEVEL=info

# Log all API calls
VITE_LOG_API_CALLS=false

# React DevTools integration
VITE_REACT_DEVTOOLS=false

# Source maps
VITE_SOURCE_MAPS=false
```

## 🔄 Switching Environments

### Method 1: Using npm Commands (Recommended)

```bash
# Development (uses .env.development)
npm run dev

# Production build (uses .env.production)
npm run build

# Preview production build locally
npm run preview
```

### Method 2: Using Environment Files

1. **Check which environment you're using:**
   - Running `npm run dev` → loads `.env` + `.env.development`
   - Running `npm run build` → loads `.env` + `.env.production`

2. **To add a staging environment:**
   - Create `.env.staging` with staging-specific settings
   - Use a custom Vite command in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "preview:staging": "vite preview --mode staging"
  }
}
```

Then run: `npm run build:staging`

## 💾 Using Environment Variables in Code

### Import the environment configuration

```typescript
import { env, isEnvironment, isFeatureEnabled, getImageUrl, getApiUrl } from '@/config/environment';

// Check current environment
if (isEnvironment('production')) {
  console.log('Running in production!');
}

// Check if feature is enabled
if (isFeatureEnabled('analytics')) {
  // Initialize analytics
}

// Get image URL
const imageUrl = getImageUrl('/uploads/gallery/photo.jpg');
// Result: http://localhost:8000/uploads/gallery/photo.jpg

// Get API endpoint
const url = getApiUrl('/places');
// Result: http://localhost:8000/api/v1/places
```

### Access individual environment variables

```typescript
import { env } from '@/config/environment';

// API configuration
console.log(env.api.baseUrl);      // 'http://localhost:8000/api/v1'
console.log(env.api.timeout);       // 30000

// Image configuration
console.log(env.images.baseUrl);    // 'http://localhost:8000'

// Authentication
console.log(env.auth.enabled);      // true
console.log(env.auth.mockMode);     // false

// Feature flags
console.log(env.features.admin);    // true
console.log(env.features.beta);     // true

// Debug settings
console.log(env.debug.enabled);     // true
console.log(env.debug.logLevel);    // 'debug'
```

## 🛠️ Setting Up Different Environments

### Development on Local Machine

1. **Ensure `.env.development` exists** (already provided)
2. **Start the backend:**
   ```bash
   cd ../osam-api
   python -m uvicorn app.main:app --reload --port 8000
   ```
3. **Start the frontend:**
   ```bash
   npm run dev
   ```
4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/docs (Swagger UI)

### Staging Environment

1. **Create `.env.staging`:**
   ```env
   VITE_APP_ENV=staging
   VITE_API_BASE_URL=https://staging-api.osam-tourism.com/api/v1
   VITE_IMAGE_BASE_URL=https://staging-api.osam-tourism.com
   VITE_FEATURE_ANALYTICS=true
   VITE_FEATURE_ERROR_DETAILS=true
   VITE_AUTH_ENABLED=true
   ```

2. **Update `package.json`:**
   ```json
   {
     "scripts": {
       "build:staging": "vite build --mode staging"
     }
   }
   ```

3. **Build for staging:**
   ```bash
   npm run build:staging
   ```

### Production Environment

1. **Update `.env.production`** with production URLs:
   ```env
   VITE_API_BASE_URL=https://api.osam-tourism.com/api/v1
   VITE_IMAGE_BASE_URL=https://assets.osam-tourism.com
   VITE_FEATURE_ANALYTICS=true
   VITE_FEATURE_ERROR_DETAILS=false
   VITE_DEBUG=false
   VITE_LOG_LEVEL=error
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Deploy the `dist` folder** to your hosting service (Vercel, Netlify, AWS S3, etc.)

## 🔐 Security Considerations

### Public vs. Secret Variables

⚠️ **All `VITE_*` environment variables are embedded in the client-side bundle!**

**Safe to expose:**
- API URLs
- Feature flags
- Image CDN URLs
- App name/version

**NEVER expose in `VITE_*` variables:**
- API keys
- Secret tokens
- Private credentials
- Database passwords

**For sensitive data:**
- Use backend environment variables only
- Never commit secrets to git
- Use `.gitignore` for `.env` files (if they contain secrets)

### .gitignore Configuration

```gitignore
# Don't commit local environment files with secrets
.env.local
.env.*.local

# DO commit these templates
!.env.example
!.env.development
!.env.production
```

Current `.gitignore` status: Check your `.gitignore` file to ensure local `.env` files are not tracked.

## 🐛 Debugging Environment Issues

### Check Current Environment

```typescript
import { env, logEnvironmentConfig } from '@/config/environment';

// Log all environment settings
logEnvironmentConfig();

// Check specific values
console.log(env.appEnv);
console.log(env.api.baseUrl);
```

### Browser DevTools

1. **Open browser console:** F12 → Console tab
2. **Check environment configuration:**
   ```javascript
   // Log current environment
   console.log(import.meta.env);
   ```

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| API calls fail | Wrong `VITE_API_BASE_URL` | Verify backend is running, check URL in `.env.development` |
| Images don't load | Wrong `VITE_IMAGE_BASE_URL` | Check image path construction in `getImageUrl()` |
| Feature flags not working | Using wrong environment | Verify `.env.development` vs `.env.production` settings |
| Old values still cached | Browser cache or HMR issue | Clear browser cache, restart dev server with `npm run dev` |

## 📚 Related Documentation

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Environment Setup](https://react.dev/learn/development-vs-production)
- [API Architecture Guide](./API_ARCHITECTURE.md)
- [API Setup Guide](./API_SETUP_GUIDE.md)

## ✅ Environment Checklist

Before deploying to a new environment:

- [ ] Create appropriate `.env.{environment}` file
- [ ] Set correct `VITE_API_BASE_URL` (with `/api/v1`)
- [ ] Set correct `VITE_IMAGE_BASE_URL`
- [ ] Set `VITE_APP_ENV` to environment name
- [ ] Configure feature flags appropriately
- [ ] Set `VITE_DEBUG=false` for production
- [ ] Set `VITE_LOG_LEVEL=error` for production
- [ ] Disable `VITE_FEATURE_ERROR_DETAILS` for production
- [ ] Test API connectivity before deployment
- [ ] Verify image loading from correct CDN
- [ ] Run `npm run build` to test production build locally
