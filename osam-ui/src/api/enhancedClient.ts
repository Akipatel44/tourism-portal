/**
 * Enhanced API Wrapper
 * Wrapper around Axios client with global loading state and error handling
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { parseApiError, isRetryableError, getRetryDelay } from '@/utils/errorHandler';
import { LoadingContext } from '@/contexts/LoadingContext';

let loadingContext: any = null;

export const setLoadingContext = (context: any) => {
  loadingContext = context;
};

interface RetryConfig {
  maxAttempts?: number;
  retryableStatuses?: number[];
}

interface EnhancedRequestConfig extends AxiosRequestConfig {
  retry?: RetryConfig;
  skipLoading?: boolean;
  loadingMessage?: string;
}

/**
 * Create enhanced API client with loading and error handling
 */
export const createEnhancedApiClient = (client: AxiosInstance) => {
  return {
    /**
     * Make a GET request with loading and error handling
     */
    get: async <T,>(
      url: string,
      config?: EnhancedRequestConfig
    ): Promise<T> => {
      return makeRequest<T>(client, 'GET', url, undefined, config);
    },

    /**
     * Make a POST request with loading and error handling
     */
    post: async <T,>(
      url: string,
      data?: any,
      config?: EnhancedRequestConfig
    ): Promise<T> => {
      return makeRequest<T>(client, 'POST', url, data, config);
    },

    /**
     * Make a PATCH request with loading and error handling
     */
    patch: async <T,>(
      url: string,
      data?: any,
      config?: EnhancedRequestConfig
    ): Promise<T> => {
      return makeRequest<T>(client, 'PATCH', url, data, config);
    },

    /**
     * Make a PUT request with loading and error handling
     */
    put: async <T,>(
      url: string,
      data?: any,
      config?: EnhancedRequestConfig
    ): Promise<T> => {
      return makeRequest<T>(client, 'PUT', url, data, config);
    },

    /**
     * Make a DELETE request with loading and error handling
     */
    delete: async <T,>(
      url: string,
      config?: EnhancedRequestConfig
    ): Promise<T> => {
      return makeRequest<T>(client, 'DELETE', url, undefined, config);
    },

    /**
     * Access raw Axios instance if needed
     */
    axios: client
  };
};

/**
 * Internal function to make request with retry logic
 */
async function makeRequest<T>(
  client: AxiosInstance,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  config?: EnhancedRequestConfig
): Promise<T> {
  const {
    retry = { maxAttempts: 3 },
    skipLoading = false,
    loadingMessage = 'Processing...',
    ...axiosConfig
  } = config || {};

  const maxAttempts = retry?.maxAttempts ?? 3;
  let lastError: any;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt++;

    try {
      // Start loading
      if (!skipLoading && loadingContext) {
        loadingContext.startLoading?.(loadingMessage);
      }

      // Make request
      let response: any;
      switch (method) {
        case 'GET':
          response = await client.get<T>(url, axiosConfig);
          break;
        case 'POST':
          response = await client.post<T>(url, data, axiosConfig);
          break;
        case 'PATCH':
          response = await client.patch<T>(url, data, axiosConfig);
          break;
        case 'PUT':
          response = await client.put<T>(url, data, axiosConfig);
          break;
        case 'DELETE':
          response = await client.delete<T>(url, axiosConfig);
          break;
      }

      // Stop loading
      if (!skipLoading && loadingContext) {
        loadingContext.stopLoading?.();
      }

      return response.data;
    } catch (error: any) {
      lastError = error;
      const parsedError = parseApiError(error);

      // Stop loading
      if (!skipLoading && loadingContext) {
        loadingContext.stopLoading?.();
      }

      // Check if retryable
      if (!isRetryableError(parsedError) || attempt >= maxAttempts) {
        throw parsedError;
      }

      // Wait before retry
      const delay = getRetryDelay(attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // Throw last error if all retries failed
  if (lastError) {
    throw parseApiError(lastError);
  }

  throw new Error('Request failed after retries');
}

export default createEnhancedApiClient;
