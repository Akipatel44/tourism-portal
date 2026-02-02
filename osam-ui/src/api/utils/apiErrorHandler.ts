/**
 * Centralized API Error Handler
 * Parses and handles errors from FastAPI responses
 */

import { AxiosError, AxiosResponse } from 'axios';
import {
  ApiErrorResponse,
  ParsedApiError,
  ValidationError,
} from '../types/error';

/**
 * Parse FastAPI error response into standardized format
 */
export function parseApiError(error: AxiosError): ParsedApiError {
  const status = error.response?.status || 500;
  const data = error.response?.data as ApiErrorResponse | undefined;

  // Handle validation errors (422 from FastAPI)
  if (status === 422 && Array.isArray(data?.detail)) {
    const errors = (data.detail as Array<any>).map((err) => ({
      field: err.loc?.[1] || 'unknown',
      message: err.msg || 'Validation error',
    }));

    return {
      status,
      message: 'Validation failed',
      detail: 'Please check your inputs',
      errors,
    };
  }

  // Handle standard error responses
  const message =
    typeof data?.detail === 'string'
      ? data.detail
      : error.message || 'An unexpected error occurred';

  return {
    status,
    message,
    detail: error.response?.statusText,
  };
}

/**
 * Get user-friendly error message based on status code
 */
export function getErrorMessage(error: AxiosError): string {
  const status = error.response?.status;

  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Authentication failed. Please log in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'Conflict: This resource may already exist.';
    case 422:
      return 'Please check your input and try again.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
      return 'Server error. Please try again later.';
    case 503:
      return 'Service temporarily unavailable. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
}

/**
 * Log error details in development mode
 */
export function logErrorDetails(error: AxiosError): void {
  if (process.env.NODE_ENV !== 'development') return;

  console.group('🔴 API Error');
  console.error('Status:', error.response?.status);
  console.error('URL:', error.config?.url);
  console.error('Method:', error.config?.method?.toUpperCase());
  console.error('Response:', error.response?.data);
  console.error('Message:', error.message);
  console.groupEnd();
}

/**
 * Determine if error is retryable
 */
export function isRetryableError(error: AxiosError): boolean {
  const status = error.response?.status;
  // Retry on network errors, 408 (timeout), 429 (rate limit), and 5xx
  return (
    !error.response ||
    status === 408 ||
    status === 429 ||
    (status ? status >= 500 : false)
  );
}

/**
 * Determine if error is authentication-related
 */
export function isAuthError(error: AxiosError): boolean {
  const status = error.response?.status;
  return status === 401 || status === 403;
}
