/**
 * Error Handler
 * Centralized error handling and user-friendly message mapping
 */

export interface ApiError {
  status: number;
  message: string;
  detail?: string;
  code?: string;
  originalError?: any;
}

export interface ErrorResponse {
  detail?: string;
  message?: string;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * Map HTTP status codes to user-friendly messages
 */
const getStatusMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'Invalid request. Please check the information and try again.';
    case 401:
      return 'Your session has expired. Please log in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'This resource already exists. Please use a different value.';
    case 422:
      return 'The provided data contains validation errors.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
      return 'A server error occurred. Please try again later.';
    case 502:
      return 'Service temporarily unavailable. Please try again later.';
    case 503:
      return 'Service is under maintenance. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Determine if an error is retryable
 */
export const isRetryableError = (error: ApiError): boolean => {
  // Network errors
  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return true;
  }

  // Server errors (5xx)
  if (error.status >= 500) {
    return true;
  }

  // Rate limiting
  if (error.status === 429) {
    return true;
  }

  // Request timeout
  if (error.status === 408) {
    return true;
  }

  return false;
};

/**
 * Extract error message from API response
 */
const extractErrorMessage = (
  status: number,
  data: ErrorResponse | null
): string => {
  if (!data) {
    return getStatusMessage(status);
  }

  // Try different error message fields
  if (data.detail) {
    return typeof data.detail === 'string'
      ? data.detail
      : 'An error occurred. Please try again.';
  }

  if (data.message) {
    return data.message;
  }

  if (data.error) {
    return data.error;
  }

  // If it's a validation error with field-level messages
  if (data.errors && Array.isArray(data.errors)) {
    return data.errors.map((e) => `${e.field}: ${e.message}`).join('\n');
  }

  return getStatusMessage(status);
};

/**
 * Parse API error into a standardized format
 */
export const parseApiError = (error: any): ApiError => {
  // Network error
  if (!error.response) {
    return {
      status: error.code === 'ECONNABORTED' ? 408 : 0,
      message: error.message || 'Network error. Please check your connection.',
      code: error.code,
      originalError: error
    };
  }

  const status = error.response.status || 500;
  const data = error.response.data as ErrorResponse | null;
  const message = extractErrorMessage(status, data);

  return {
    status,
    message,
    detail: data?.detail,
    code: data?.code,
    originalError: error
  };
};

/**
 * Format validation errors into a user-friendly string
 */
export const formatValidationErrors = (
  errors: Array<{ field: string; message: string }>
): string => {
  if (!errors || errors.length === 0) {
    return 'Validation failed. Please check your input.';
  }

  if (errors.length === 1) {
    return errors[0].message;
  }

  return errors.map((e) => `• ${e.message}`).join('\n');
};

/**
 * Get HTTP method name for error context
 */
export const getMethodName = (method: string): string => {
  const methodMap: Record<string, string> = {
    GET: 'fetching',
    POST: 'creating',
    PATCH: 'updating',
    PUT: 'updating',
    DELETE: 'deleting'
  };

  return methodMap[method.toUpperCase()] || 'processing';
};

/**
 * Determine retry delay in milliseconds (exponential backoff)
 */
export const getRetryDelay = (attempt: number): number => {
  // 1s, 2s, 4s, 8s, 16s with jitter
  const baseDelay = Math.min(1000 * Math.pow(2, attempt - 1), 30000);
  const jitter = Math.random() * 0.1 * baseDelay;
  return baseDelay + jitter;
};

/**
 * Check if error is authentication related
 */
export const isAuthError = (error: ApiError): boolean => {
  return error.status === 401 || error.status === 403;
};

/**
 * Check if error is rate limiting
 */
export const isRateLimitError = (error: ApiError): boolean => {
  return error.status === 429;
};

/**
 * Get rate limit retry-after delay (in seconds)
 */
export const getRateLimitDelay = (error: any): number => {
  const retryAfter = error.response?.headers?.['retry-after'];
  if (retryAfter) {
    const delay = parseInt(retryAfter, 10);
    return isNaN(delay) ? 60 : delay;
  }
  return 60; // Default to 60 seconds
};

export default {
  parseApiError,
  isRetryableError,
  extractErrorMessage,
  formatValidationErrors,
  getMethodName,
  getRetryDelay,
  isAuthError,
  isRateLimitError,
  getRateLimitDelay
};
