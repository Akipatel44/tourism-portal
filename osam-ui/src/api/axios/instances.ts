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
import GlobalUIController from '@/contexts/GlobalUIController';
import { getErrorMessage, isRetryableError } from '../utils/apiErrorHandler';

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
  (response) => {
    // decrement loading for successful responses
    try { GlobalUIController.decrementLoading(); } catch {}
    return response;
  },
  async (error) => {
    try { GlobalUIController.decrementLoading(); } catch {}

    // Notify global UI
    try {
      const message = getErrorMessage(error as any);
      GlobalUIController.notifyError({ message, code: (error as any).response?.status, raw: (error as any).response?.data });
    } catch {}

    // Retry logic for retryable errors
    try {
      const cfg = (error.config as any) || {};
      cfg.__retryCount = cfg.__retryCount || 0;
      const MAX_RETRIES = cfg.__maxRetries ?? 2;

      if (isRetryableError(error as any) && cfg.__retryCount < MAX_RETRIES) {
        cfg.__retryCount += 1;
        const delay = Math.pow(2, cfg.__retryCount) * 250; // exponential backoff
        await new Promise((r) => setTimeout(r, delay));
        return publicApi.request(cfg);
      }
    } catch (retryErr) {
      // ignore retry errors
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('[Public API Error]', (error as any).response?.data || (error as any).message);
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

    // increment global loading
    try { GlobalUIController.incrementLoading(); } catch {}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    try { GlobalUIController.decrementLoading(); } catch {}
    return Promise.reject(error);
  }
);

/**
 * Protected instance response interceptor
 * Handles 401 errors (unauthorized)
 * Strategy: Clear token and redirect to login (handled by AuthContext)
 */
protectedApi.interceptors.response.use(
  (response) => {
    try { GlobalUIController.decrementLoading(); } catch {}
    return response;
  },
  async (error: AxiosError) => {
    try { GlobalUIController.decrementLoading(); } catch {}

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

    // Notify global UI with friendly message
    try {
      const message = getErrorMessage(error as any);
      GlobalUIController.notifyError({ message, code: error.response?.status, raw: error.response?.data });
    } catch {}

    // Retry mechanism for retryable errors
    try {
      const cfg = (error.config as any) || {};
      cfg.__retryCount = cfg.__retryCount || 0;
      const MAX_RETRIES = cfg.__maxRetries ?? 2;

      if (isRetryableError(error) && cfg.__retryCount < MAX_RETRIES) {
        cfg.__retryCount += 1;
        const delay = Math.pow(2, cfg.__retryCount) * 250;
        await new Promise((r) => setTimeout(r, delay));
        return protectedApi.request(cfg);
      }
    } catch (retryErr) {
      // ignore retry errors
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('[Protected API Error]', error.response?.data || error.message);
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
