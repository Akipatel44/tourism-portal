/**
 * Environment Configuration
 * 
 * Centralized access to environment variables with type safety and defaults
 * Supports: development, staging, production
 */

export type Environment = 'development' | 'staging' | 'production';

/**
 * Environment configuration object
 * All values are read from VITE_* environment variables
 */
export const env = {
  // ===== Environment Identification =====
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  appEnv: (import.meta.env.VITE_APP_ENV || 'development') as Environment,
  appName: import.meta.env.VITE_APP_NAME || 'OSAM Tourism Platform',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // ===== API Configuration =====
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  },

  // ===== Image Configuration =====
  images: {
    baseUrl: import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:8000',
    optimization: import.meta.env.VITE_IMAGE_OPTIMIZATION === 'true',
  },

  // ===== Authentication =====
  auth: {
    enabled: import.meta.env.VITE_AUTH_ENABLED !== 'false',
    mockMode: import.meta.env.VITE_AUTH_MOCK === 'true',
    redirectPath: import.meta.env.VITE_AUTH_REDIRECT_PATH || '/',
    logoutPath: import.meta.env.VITE_AUTH_LOGOUT_PATH || '/login',
  },

  // ===== Feature Flags =====
  features: {
    admin: import.meta.env.VITE_FEATURE_ADMIN !== 'false',
    analytics: import.meta.env.VITE_FEATURE_ANALYTICS === 'true',
    beta: import.meta.env.VITE_FEATURE_BETA === 'true',
    errorDetails: import.meta.env.VITE_FEATURE_ERROR_DETAILS === 'true',
    apiLogging: import.meta.env.VITE_FEATURE_API_LOGGING === 'true',
  },

  // ===== Debug & Logging =====
  debug: {
    enabled: import.meta.env.VITE_DEBUG === 'true',
    logLevel: (import.meta.env.VITE_LOG_LEVEL || 'info') as LogLevel,
    logApiCalls: import.meta.env.VITE_LOG_API_CALLS === 'true',
    reactDevTools: import.meta.env.VITE_REACT_DEVTOOLS === 'true',
    sourceMaps: import.meta.env.VITE_SOURCE_MAPS === 'true',
  },
} as const;

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';

/**
 * Helper function to check if running in specific environment
 */
export const isEnvironment = (env: Environment): boolean => {
  return import.meta.env.VITE_APP_ENV === env;
};

/**
 * Helper function to check if feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof env.features): boolean => {
  return env.features[feature];
};

/**
 * Helper function to get image URL
 */
export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path; // Already an absolute URL
  }
  return `${env.images.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

/**
 * Helper function to get API URL for a specific endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  return `${env.api.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};

/**
 * Log environment configuration (useful for debugging)
 */
export const logEnvironmentConfig = (): void => {
  if (env.debug.enabled || env.isDev) {
    console.group('🔧 Environment Configuration');
    console.log('App Environment:', env.appEnv);
    console.log('App Name:', env.appName);
    console.log('App Version:', env.appVersion);
    console.log('API Base URL:', env.api.baseUrl);
    console.log('Image Base URL:', env.images.baseUrl);
    console.table({
      'Auth Enabled': env.auth.enabled,
      'Auth Mock Mode': env.auth.mockMode,
      'Admin Feature': env.features.admin,
      'Analytics Feature': env.features.analytics,
      'Beta Features': env.features.beta,
      'API Logging': env.features.apiLogging,
    });
    console.groupEnd();
  }
};

// Log configuration on module load in development
if (env.isDev) {
  logEnvironmentConfig();
}
