/**
 * Axios Instance Configuration
 * Separate instances for public and protected API calls
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import config from '../config';
import tokenManager from '../utils/tokenManager';

/**
 * Common axios configuration for both public and protected instances
 */
const commonConfig: AxiosRequestConfig = {
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: (status) => status < 500, // Don't throw on 4xx
};

// ============================================================================
// PUBLIC INSTANCE
// ============================================================================
/**
 * Public API instance
 * Used for: login, register, public data (places, events, gallery)
 * No authentication required
 */
export const publicApi: AxiosInstance = axios.create(commonConfig);

/**
 * Public instance response interceptor
 * Handles status codes without token injection
 */
publicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Public API Error]', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

// ============================================================================
// PROTECTED INSTANCE
// ============================================================================
/**
 * Protected API instance
 * Used for: authenticated operations (CRUD, bookings, admin)
 * Automatically injects access token in Authorization header
 */
export const protectedApi: AxiosInstance = axios.create(commonConfig);

/**
 * Protected instance request interceptor
 * Injects access token in Authorization header
 */
protectedApi.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Protected instance response interceptor
 * Handles 401 errors (unauthorized)
 * Strategy: Clear token and redirect to login (handled by AuthContext)
 */
protectedApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // On 401, clear token - AuthContext will redirect to login
    if (error.response?.status === 401) {
      tokenManager.clearAuth();

      // Dispatch custom event to notify AuthContext
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:logout'));
      }

      if (process.env.NODE_ENV === 'development') {
        console.warn('[Auth] Token invalid or expired, cleared token');
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.error(
        '[Protected API Error]',
        error.response?.data || error.message
      );
    }

    return Promise.reject(error);
  }
);

// ============================================================================
// REQUEST LOGGING (Development only)
// ============================================================================

if (config.IS_DEVELOPMENT) {
  // Log all public requests
  publicApi.interceptors.request.use((config) => {
    console.log(
      `📤 [PUBLIC] ${config.method?.toUpperCase()} ${config.url}`,
      {
        params: config.params,
        data: config.data,
      }
    );
    return config;
  });

  // Log all protected requests
  protectedApi.interceptors.request.use((config) => {
    console.log(
      `📤 [PROTECTED] ${config.method?.toUpperCase()} ${config.url}`,
      {
        params: config.params,
        data: config.data,
        hasToken: !!tokenManager.getToken(),
      }
    );
    return config;
  });
}
