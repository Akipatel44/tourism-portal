/**
 * Authentication API Service
 * 
 * User authentication endpoints
 * - POST /auth/login - Authenticate user
 * - POST /auth/register - Create new user account
 * - POST /auth/logout - Logout and clear token
 * - GET /auth/me - Get current authenticated user info
 * - PUT /auth/profile - Update user profile
 */

import { apiClient } from './client';
import { tokenStorage } from './tokenStorage';
import type { AxiosError } from 'axios';

/**
 * User Interface
 * Matches FastAPI User model
 */
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Login Request
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Login Response
 * Contains JWT access token from FastAPI
 */
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user?: User;
}

/**
 * Register Request
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

/**
 * Register Response
 */
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  full_name: string;
  message: string;
}

/**
 * Update Profile Request
 */
export interface UpdateProfileRequest {
  full_name?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}

/**
 * Update Profile Response
 */
export interface UpdateProfileResponse {
  message: string;
  user: User;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  status: number;
  message: string;
  detail?: string;
  data?: any;
}

/**
 * Authentication API Service
/**
 * Authentication API Service
 * 
 * User authentication endpoints
 * - POST /auth/login - Authenticate user with credentials
 * - POST /auth/logout - Clear session
 * - GET /auth/me - Get current authenticated user
 * - PUT /auth/profile - Update user profile
 * - POST /auth/change-password - Change user password
 * 
 * Admin endpoints:
 * - GET /auth/admin - Verify admin access
 */

import { apiClient, handleApiError } from './client';
import { tokenStorage } from './tokenStorage';
import type { AxiosError } from 'axios';

/**
 * User Interface
 * Matches FastAPI User model
 */
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Login Request
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Login Response
 * Contains JWT access token from FastAPI
 */
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user?: User;
}

/**
 * Register Request
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

/**
 * Register Response
 */
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  full_name: string;
  message: string;
}

/**
 * Update Profile Request
 */
export interface UpdateProfileRequest {
  full_name?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}

/**
 * Update Profile Response
 */
export interface UpdateProfileResponse {
  message: string;
  user: User;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  status: number;
  message: string;
  detail?: string;
  data?: any;
}

/* ==================== AUTH API SERVICE ==================== */

/**
 * Authentication API Service
 * Handles all auth-related API calls
 */
export const authApi = {
  /**
   * Login user with credentials
   * 
   * @param credentials Username and password
   * @returns Access token and user info
   * @throws ApiErrorResponse on failure
   */
  login: async (
    credentials: LoginRequest
  ): Promise<{ token: string; user: User }> => {
    try {
      // FastAPI OAuth2 expects form-encoded credentials
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await apiClient.post<LoginResponse>(
        '/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, user } = response.data;

      // Store token in localStorage
      tokenStorage.setAccessToken(access_token);

      console.log('[AuthApi] User logged in:', credentials.username);

      return {
        token: access_token,
        user: user || {
          id: 0,
          username: credentials.username,
          email: '',
          full_name: '',
          is_admin: false,
          is_active: true,
        },
      };
    } catch (error) {
      const apiError = handleApiError(error);
      const errorMessage = apiError.message || 'Login failed';

      console.error('[AuthApi] Login failed:', errorMessage);

      throw {
        status: apiError.status,
        message: errorMessage,
        detail: apiError.details,
      } as ApiErrorResponse;
    }
  },

  /**
   * Get currently authenticated user
   * 
   * @returns Current user object
   * @throws ApiErrorResponse on failure
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);

      // Clear token on 401
      if (apiError.status === 401) {
        tokenStorage.clearAll();
      }

      console.error('[AuthApi] Failed to get current user:', apiError.message);

      throw {
        status: apiError.status,
        message: apiError.message || 'Failed to get user info',
      } as ApiErrorResponse;
    }
  },

  /**
   * Logout user and clear authentication
   * 
   * @returns Promise<void>
   */
  logout: async (): Promise<void> => {
    try {
      // Clear token first
      tokenStorage.clearAll();

      // Try to notify backend (endpoint may not exist)
      try {
        await apiClient.post('/auth/logout');
      } catch {
        // Silent fail - logout endpoint may not be implemented
      }

      console.log('[AuthApi] User logged out');
    } catch (error) {
      // Always clear token on logout attempt
      tokenStorage.clearAll();
      console.error('[AuthApi] Logout error (token cleared anyway):', error);
    }
  },

  /**
   * Verify current user is admin
   * 
   * @returns True if user is admin
   */
  isAdmin: async (): Promise<boolean> => {
    try {
      const user = await authApi.getCurrentUser();
      return user.is_admin || false;
    } catch {
      console.warn('[AuthApi] Could not verify admin status');
      return false;
    }
  },

  /**
   * Update user profile
   * 
   * @param data Profile update fields
   * @returns Updated user info and message
   * @throws ApiErrorResponse on failure
   */
  updateProfile: async (
    data: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> => {
    try {
      const response = await apiClient.put<UpdateProfileResponse>(
        '/auth/profile',
        data
      );

      console.log('[AuthApi] Profile updated successfully');

      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      const errorMessage = apiError.message || 'Profile update failed';

      console.error('[AuthApi] Profile update failed:', errorMessage);

      throw {
        status: apiError.status,
        message: errorMessage,
        detail: apiError.details,
      } as ApiErrorResponse;
    }
  },

  /**
   * Change user password
   * 
   * @param currentPassword Current password for verification
   * @param newPassword New password
   * @returns Success message
   * @throws ApiErrorResponse on failure
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>(
        '/auth/change-password',
        {
          current_password: currentPassword,
          new_password: newPassword,
        }
      );

      console.log('[AuthApi] Password changed successfully');

      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      const errorMessage = apiError.message || 'Password change failed';

      console.error('[AuthApi] Password change failed:', errorMessage);

      throw {
        status: apiError.status,
        message: errorMessage,
        detail: apiError.details,
      } as ApiErrorResponse;
    }
  },

  /**
   * Register new user account
   * 
   * @param data User registration info
   * @returns New user info and message
   * @throws ApiErrorResponse on failure
   */
  register: async (
    data: RegisterRequest
  ): Promise<RegisterResponse> => {
    try {
      const response = await apiClient.post<RegisterResponse>(
        '/auth/register',
        data
      );

      console.log('[AuthApi] User registered successfully');

      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);
      const errorMessage = apiError.message || 'Registration failed';

      console.error('[AuthApi] Registration failed:', errorMessage);

      throw {
        status: apiError.status,
        message: errorMessage,
        detail: apiError.details,
      } as ApiErrorResponse;
    }
  },

  /**
   * Request password reset
   * 
   * @param email User email address
   * @returns Success message
   * @throws ApiErrorResponse on failure
   */
  requestPasswordReset: async (
    email: string
  ): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>(
        '/auth/forgot-password',
        { email }
      );

      return response.data;
    } catch (error) {
      const apiError = handleApiError(error);

      console.error('[AuthApi] Password reset request failed:', apiError.message);

      throw {
        status: apiError.status,
        message: apiError.message || 'Password reset request failed',
        detail: apiError.details,
      } as ApiErrorResponse;
    }
  },

  /**
   * Verify token is valid
   * Quick local check without API call
   * 
   * @returns True if token exists
   */
  hasValidToken: (): boolean => {
    return tokenStorage.hasAccessToken();
  },
};
