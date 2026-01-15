/**
 * API Client Configuration
 * 
 * Modern Axios setup with:
 * ✓ Environment-based base URL
 * ✓ Automatic JWT token attachment
 * ✓ 401 unauthorized handling with auto-logout
 * ✓ Global error handling & retry logic
 * ✓ Request/response interceptors
 * ✓ TypeScript support
 */

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';
import { tokenStorage } from './tokenStorage';
import { env } from '@/config/environment';

/* ==================== CONFIGURATION ==================== */

const API_BASE_URL = env.api.baseUrl;
const API_TIMEOUT = env.api.timeout;

if (env.isDev || env.debug.enabled) {
  console.log('[API] Configuration:', {
    baseUrl: API_BASE_URL,
    timeout: API_TIMEOUT,
    environment: env.appEnv,
    apiLogging: env.features.apiLogging,
  });
}

/* ==================== TYPES ==================== */

/**
 * Standardized API error structure
 */
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, any>;
  originalError?: AxiosError;
}

/**
 * Standardized API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/* ==================== AXIOS INSTANCE ==================== */

/**
 * Create and configure Axios instance with interceptors
 */
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  /* ======== REQUEST INTERCEPTOR ======== */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Attach JWT token to Authorization header
      const token = tokenStorage.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log requests based on environment configuration
      if (env.features.apiLogging || env.isDev) {
        console.log(
          `[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
        );
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  /* ======== RESPONSE INTERCEPTOR ======== */
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const config = error.config as InternalAxiosRequestConfig;

      // ===== 401 UNAUTHORIZED - AUTO LOGOUT =====
      if (error.response?.status === 401) {
        // Clear authentication
        tokenStorage.clearAccessToken();

        // Dispatch logout event for listeners
        window.dispatchEvent(
          new CustomEvent('auth:unauthorized', {
            detail: { message: 'Token expired or invalid' },
          })
        );

        // Redirect to login (if not already there)
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }

        return Promise.reject(error);
      }

      // ===== 403 FORBIDDEN - ACCESS DENIED =====
      if (error.response?.status === 403) {
        console.warn(
          '[API] Access denied - insufficient permissions',
          error.response.data
        );
        return Promise.reject(error);
      }

      // ===== 5XX SERVER ERRORS - RETRY LOGIC =====
      if (
        error.response?.status &&
        error.response.status >= 500 &&
        config &&
        !config.headers['X-Retry-Count']
      ) {
        // Retry once for server errors
        const retryCount = (config.headers['X-Retry-Count'] as number) || 0;
        if (retryCount < 1) {
          config.headers['X-Retry-Count'] = String(retryCount + 1);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(instance(config));
            }, 1000); // Wait 1 second before retry
          });
        }
      }

      // ===== NETWORK ERROR =====
      if (!error.response) {
        console.error('[API] Network error:', error.message);
      }

      // ===== LOG ALL ERRORS =====
      if (import.meta.env.DEV) {
        console.error(
          '[API Error]',
          error.response?.status,
          error.response?.data || error.message
        );
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Export configured instance
export const apiClient = createApiClient();

/* ==================== UTILITIES ==================== */

/**
 * Transform Axios error into standardized ApiError
 * @param error Axios error or any thrown error
 * @returns Standardized ApiError object
 */
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 0;
    const data = error.response?.data as Record<string, any>;

    return {
      status,
      code: data?.code || `HTTP_${status}`,
      message: data?.message || error.message || 'An error occurred',
      details: data?.details,
      originalError: error,
    };
  }

  // Handle non-Axios errors
  const err = error as Error;
  return {
    status: 0,
    code: 'UNKNOWN_ERROR',
    message: err?.message || 'An unknown error occurred',
    originalError: err,
  };
};

/**
 * Extract data from API response with validation
 * @param response API response object
 * @returns Extracted data
 */
export const extractResponseData = <T = any>(response: any): T => {
  const data = response?.data;

  // Handle FastAPI standard response
  if (data && typeof data === 'object' && 'success' in data) {
    if (!data.success) {
      throw new Error(data.message || 'API request failed');
    }
    return data.data || data;
  }

  // Return data directly
  return data || response;
};

export default apiClient;
