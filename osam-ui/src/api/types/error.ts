/**
 * API Error Types
 * Strongly typed API error responses and handling
 */

/**
 * Standard API error response from FastAPI
 */
export interface ApiErrorResponse {
  detail: string | { loc: string[]; msg: string; type: string }[];
  status_code?: number;
}

/**
 * Parsed error information for UI handling
 */
export interface ParsedApiError {
  status: number;
  message: string;
  detail?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Auth-specific errors
 */
export interface AuthError extends ParsedApiError {
  type: 'invalid_credentials' | 'token_expired' | 'unauthorized' | 'forbidden';
}

/**
 * Validation errors from FastAPI
 */
export interface ValidationError extends ParsedApiError {
  type: 'validation_error';
  errors: Array<{
    field: string;
    message: string;
  }>;
}
