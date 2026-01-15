/**
 * Environment Configuration Examples
 * 
 * Real-world usage examples of the environment configuration system
 */

// ============================================================================
// Example 1: Basic Environment Checking
// ============================================================================

import { env, isEnvironment, isFeatureEnabled } from '@/config/environment';

/**
 * Check current environment and adapt behavior
 */
export function Example1_EnvironmentDetection() {
  // Direct property access
  console.log('Current environment:', env.appEnv);
  console.log('API Base URL:', env.api.baseUrl);

  // Use helper functions
  if (isEnvironment('production')) {
    console.log('Running in production - extra safety checks enabled');
  } else if (isEnvironment('development')) {
    console.log('Running in development - verbose logging enabled');
  }

  // Check feature flags
  if (isFeatureEnabled('admin')) {
    console.log('Admin features are enabled');
  }

  if (isFeatureEnabled('analytics')) {
    console.log('Analytics tracking is enabled');
  }

  return (
    <div>
      <p>Environment: {env.appEnv}</p>
      <p>API: {env.api.baseUrl}</p>
    </div>
  );
}

// ============================================================================
// Example 2: Conditional Feature Display
// ============================================================================

import { isFeatureEnabled } from '@/config/environment';

/**
 * Show or hide features based on configuration
 */
export function Example2_ConditionalFeatures() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {isFeatureEnabled('admin') && (
        <section className="admin-section">
          <h2>Admin Panel</h2>
          <p>Manage places, events, galleries</p>
        </section>
      )}

      {isFeatureEnabled('analytics') && (
        <section className="analytics-section">
          <h2>Analytics</h2>
          <p>View usage statistics and metrics</p>
        </section>
      )}

      {isFeatureEnabled('beta') && (
        <section className="beta-section" style={{ border: '2px solid orange' }}>
          <h2>⚠️ Beta Features</h2>
          <p>Experimental features being tested</p>
        </section>
      )}
    </div>
  );
}

// ============================================================================
// Example 3: Image URLs with Environment Configuration
// ============================================================================

import { getFullImageUrl, getOptimizedImageUrl, preloadImage } from '@/utils/imageUrl';

/**
 * Handle images with proper base URL construction
 */
export function Example3_ImageHandling() {
  const galleryPath = '/uploads/gallery/mountain.jpg';

  // Get full image URL (automatically uses correct base URL)
  const imageUrl = getFullImageUrl(galleryPath);
  // Development: http://localhost:8000/uploads/gallery/mountain.jpg
  // Production: https://assets.osam-tourism.com/uploads/gallery/mountain.jpg

  // Get optimized image (if optimization enabled in environment)
  const optimized = getOptimizedImageUrl(galleryPath, {
    width: 1200,
    quality: 80,
    format: 'webp'
  });

  // Preload image before display
  const handleImageLoad = async () => {
    try {
      await preloadImage(galleryPath);
      console.log('Image preloaded successfully');
    } catch (error) {
      console.error('Failed to preload image:', error);
    }
  };

  return (
    <div>
      <img
        src={imageUrl}
        alt="Mountain view"
        loading="lazy"
        onError={(e) => {
          // Fallback to placeholder
          e.currentTarget.src = 'https://via.placeholder.com/1200x800?text=Image+Not+Found';
        }}
      />
      <button onClick={handleImageLoad}>Preload Image</button>
    </div>
  );
}

// ============================================================================
// Example 4: API Configuration and Client Usage
// ============================================================================

import { env } from '@/config/environment';
import axios from 'axios';

/**
 * Create API client using environment configuration
 */
export function Example4_ApiClient() {
  // Create client with environment-based configuration
  const apiClient = axios.create({
    baseURL: env.api.baseUrl,
    timeout: env.api.timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add logging interceptor if enabled
  if (env.features.apiLogging) {
    apiClient.interceptors.request.use((config) => {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });
  }

  return apiClient;
}

// ============================================================================
// Example 5: Debug and Logging Configuration
// ============================================================================

import { env } from '@/config/environment';

/**
 * Use environment debug settings to control logging
 */
export function Example5_DebugLogging() {
  // Main logger respects environment settings
  const log = (level: 'debug' | 'info' | 'warn' | 'error', message: string) => {
    const levels = { trace: 0, debug: 1, info: 2, warn: 3, error: 4 };
    const currentLevel = levels[env.debug.logLevel];
    const messageLevel = levels[level];

    if (messageLevel >= currentLevel) {
      console[level](message);
    }
  };

  // Only log debug messages if enabled
  if (env.debug.enabled) {
    log('debug', 'Detailed debug information...');
  }

  // Log API calls if enabled
  if (env.features.apiLogging) {
    log('info', 'Making API request...');
  }

  // Production safe - won't show error details to users
  if (!env.features.errorDetails) {
    log('error', 'An error occurred. Please try again later.');
  } else {
    log('error', 'Detailed error: Connection timeout to API server');
  }

  return (
    <div>
      <p>Debug enabled: {env.debug.enabled ? 'Yes' : 'No'}</p>
      <p>Log level: {env.debug.logLevel}</p>
      <p>API logging: {env.features.apiLogging ? 'Enabled' : 'Disabled'}</p>
    </div>
  );
}

// ============================================================================
// Example 6: Authentication Configuration
// ============================================================================

import { env } from '@/config/environment';

/**
 * Configure authentication behavior based on environment
 */
export function Example6_Authentication() {
  const handleLogin = async (credentials: { username: string; password: string }) => {
    // Use mock auth in development if enabled
    if (env.auth.mockMode && env.isDev) {
      console.log('Using mock authentication (development only)');
      // Simulate successful login
      localStorage.setItem('token', 'mock-token-' + credentials.username);
      window.location.href = env.auth.redirectPath;
      return;
    }

    // Real authentication
    try {
      const response = await fetch(`${env.api.baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        window.location.href = env.auth.redirectPath;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = env.auth.logoutPath;
  };

  return (
    <div>
      <p>Auth enabled: {env.auth.enabled ? 'Yes' : 'No'}</p>
      <p>Mock mode: {env.auth.mockMode ? 'Yes (DEV ONLY)' : 'No'}</p>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}

// ============================================================================
// Example 7: Environment-Specific Component Behavior
// ============================================================================

import React from 'react';
import { env, isEnvironment } from '@/config/environment';

/**
 * Different behavior for development vs production
 */
export function Example7_AdaptiveComponent() {
  return (
    <div className="adaptive-component">
      {/* Show debug info in development */}
      {isEnvironment('development') && (
        <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
          <details>
            <summary>🔧 Environment Debug (dev only)</summary>
            <pre>
              {JSON.stringify(
                {
                  env: env.appEnv,
                  apiUrl: env.api.baseUrl,
                  debug: env.debug.enabled,
                  features: {
                    admin: env.features.admin,
                    analytics: env.features.analytics,
                    beta: env.features.beta
                  }
                },
                null,
                2
              )}
            </pre>
          </details>
        </div>
      )}

      {/* Show performance warning in production */}
      {isEnvironment('production') && (
        <div style={{ background: '#fffacd', padding: '10px', margin: '10px 0' }}>
          ⚠️ Production environment - performance optimizations enabled
        </div>
      )}

      {/* Content */}
      <h2>Adaptive Content</h2>
      <p>This component adapts to the environment.</p>
    </div>
  );
}

// ============================================================================
// Example 8: Feature Flag Permission Check
// ============================================================================

import { isFeatureEnabled, isEnvironment } from '@/config/environment';

/**
 * Grant or deny access based on feature flags and environment
 */
export function Example8_FeaturePermissions() {
  const canAccessAdmin = () => {
    // Admin requires both feature flag and user permissions
    return isFeatureEnabled('admin');
  };

  const canAccessAnalytics = () => {
    // Analytics only enabled in certain environments
    return isFeatureEnabled('analytics');
  };

  const canUseBetaFeatures = () => {
    // Beta only in non-production
    return isFeatureEnabled('beta') && !isEnvironment('production');
  };

  const Features = () => (
    <div>
      <button disabled={!canAccessAdmin()}>Admin Panel</button>
      <button disabled={!canAccessAnalytics()}>Analytics Dashboard</button>
      <button disabled={!canUseBetaFeatures()}>Beta Feature</button>
    </div>
  );

  return <Features />;
}

// ============================================================================
// Example 9: Deployment Verification Utility
// ============================================================================

import { env, logEnvironmentConfig } from '@/config/environment';

/**
 * Verify environment is correctly configured before deployment
 */
export function Example9_DeploymentCheck() {
  const verifyEnvironment = (): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check API URL
    if (!env.api.baseUrl || env.api.baseUrl === '') {
      errors.push('API base URL is not configured');
    } else if (!env.api.baseUrl.includes('/api/')) {
      warnings.push('API URL might be missing /api/ path');
    }

    // Check for secure HTTPS in production
    if (isEnvironment('production')) {
      if (!env.api.baseUrl.startsWith('https://')) {
        errors.push('Production API must use HTTPS');
      }

      if (env.debug.enabled) {
        warnings.push('Debug mode should be disabled in production');
      }

      if (env.features.errorDetails) {
        warnings.push('Error details should be disabled in production');
      }
    }

    // Check image URL
    if (!env.images.baseUrl) {
      warnings.push('Image base URL not configured');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };

  const check = verifyEnvironment();

  if (!check.valid) {
    console.error('❌ Environment validation failed:');
    check.errors.forEach(err => console.error('  - ' + err));
  }

  if (check.warnings.length > 0) {
    console.warn('⚠️ Environment warnings:');
    check.warnings.forEach(warn => console.warn('  - ' + warn));
  }

  if (check.valid) {
    console.log('✅ Environment is correctly configured');
    logEnvironmentConfig();
  }

  return (
    <div>
      {check.valid ? (
        <div style={{ color: 'green' }}>✅ Environment OK</div>
      ) : (
        <div style={{ color: 'red' }}>
          ❌ Environment errors: {check.errors.join(', ')}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 10: Complete Application Setup
// ============================================================================

import { useEffect } from 'react';
import { env, logEnvironmentConfig } from '@/config/environment';

/**
 * Application initialization with environment configuration
 */
export function Example10_AppInitialization() {
  useEffect(() => {
    // Initialize application with environment configuration
    const initializeApp = async () => {
      // Log environment configuration
      if (env.isDev) {
        logEnvironmentConfig();
      }

      // Initialize analytics if enabled
      if (env.features.analytics && isEnvironment('production')) {
        // Initialize GA, Mixpanel, etc.
        console.log('Initializing analytics...');
      }

      // Load mock data if in mock mode
      if (env.auth.mockMode) {
        console.log('Mock authentication enabled');
      }

      // Verify environment before starting
      if (isEnvironment('production')) {
        console.log('✅ Production environment verified');
      } else if (isEnvironment('development')) {
        console.log('🔧 Development environment loaded');
      }

      // Initialize React DevTools if enabled
      if (env.debug.reactDevTools && isEnvironment('development')) {
        console.log('React DevTools enabled');
      }

      console.log(`🚀 Application initialized (${env.appName} v${env.appVersion})`);
    };

    initializeApp();
  }, []);

  return (
    <div>
      <h1>{env.appName}</h1>
      <p>Version: {env.appVersion}</p>
      <p>Environment: {env.appEnv}</p>
      <p>API: {env.api.baseUrl}</p>
    </div>
  );
}
