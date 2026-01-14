/**
 * API Client - Axios Instance Setup
 * 
 * Configures base Axios instance with:
 * - Environment-based URLs
 * - Default headers
 * - Token management
 * - Error handling
 * - Request/response interceptors
 */

import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from './tokenStorage';

// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT ? parseInt(import.meta.env.VITE_API_TIMEOUT) : 30000;

console.log('[API Client] Initialized with base URL:', API_BASE_URL);

/**
 * Create base Axios instance
 * Used for all API requests
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Request interceptor - Add auth token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenStorage.getAccessToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Handle auth errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // 401 Unauthorized - Token expired or invalid
      if (error.response?.status === 401) {
        // Clear stored token
        tokenStorage.clearAccessToken();
        
        // Trigger logout event (components listening can redirect to login)
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }

      // 403 Forbidden - User doesn't have permission
      if (error.response?.status === 403) {
        console.error('[API] Access denied - insufficient permissions');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Export the Axios instance
export const apiClient = createAxiosInstance();

/**
 * API Error Type
 * Standardized error handling for all API responses
 */
export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, any>;
  originalError?: Error;
}

/**
 * API Response Type
 * Standard response wrapper from FastAPI
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Unified error handler
 * Transforms various error types into standardized ApiError
 */
export const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status || 0,
      message: error.response?.data?.message || error.message || 'Unknown error',
      details: error.response?.data?.details,
      originalError: error,
    };
  }

  return {
    status: 0,
    message: error?.message || 'Unknown error',
    originalError: error,
  };
};

/**
 * Unified response handler
 * Extracts data from response with error checking
 */
export const handleApiResponse = <T>(response: any): T => {
  // If response has 'data' property (standard Axios response)
  if (response?.data) {
    // If it's a FastAPI standard response structure
    if ('success' in response.data) {
      if (!response.data.success) {
        throw new Error(response.data.message || 'API request failed');
      }
      return response.data.data || response.data;
    }
    // Otherwise return the data directly
    return response.data;
  }

  return response;
};

export default apiClient;
