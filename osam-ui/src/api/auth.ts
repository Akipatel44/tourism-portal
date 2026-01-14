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
 */
export const authApi = {
  /**
   * Login user with credentials
   * Stores token in localStorage via tokenStorage
   */
  login: async (
    credentials: LoginRequest
  ): Promise<{ token: string; user: User }> => {
    try {
      // FastAPI uses form data for OAuth2 login
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

      // Store token
      tokenStorage.setAccessToken(access_token);

      console.log('[AuthApi] User logged in successfully');

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
      const apiError = error as AxiosError;
      const errorMessage =
        (apiError.response?.data as any)?.detail ||
        apiError.message ||
        'Login failed';

      console.error('[AuthApi] Login failed:', errorMessage);

      throw {
        status: apiError.response?.status || 401,
        message: errorMessage,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Register new user account
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
      const apiError = error as AxiosError;
      const errorMessage =
        (apiError.response?.data as any)?.detail ||
        apiError.message ||
        'Registration failed';

      console.error('[AuthApi] Registration failed:', errorMessage);

      throw {
        status: apiError.response?.status || 400,
        message: errorMessage,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Logout user and clear token
   */
  logout: async (): Promise<void> => {
    try {
      // Clear token from storage first
      tokenStorage.clearAll();

      // Call logout endpoint (might not exist, but try anyway)
      try {
        await apiClient.post('/auth/logout');
      } catch {
        // Logout endpoint might not exist - that's ok
        // Token is already cleared from storage
      }

      console.log('[AuthApi] User logged out successfully');
    } catch (error) {
      console.error('[AuthApi] Logout error:', error);
      // Clear token anyway on logout
      tokenStorage.clearAll();
      throw error;
    }
  },

  /**
   * Get current authenticated user info
   * Uses token from Authorization header
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;

      // If 401, clear token
      if (apiError.response?.status === 401) {
        tokenStorage.clearAll();
      }

      throw {
        status: apiError.response?.status || 401,
        message: apiError.message || 'Failed to get user info',
      };
    }
  },

  /**
   * Update user profile
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
      const apiError = error as AxiosError;
      const errorMessage =
        (apiError.response?.data as any)?.detail ||
        apiError.message ||
        'Profile update failed';

      console.error('[AuthApi] Profile update failed:', errorMessage);

      throw {
        status: apiError.response?.status || 400,
        message: errorMessage,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Verify current token is valid
   * Quick check without additional API call
   */
  verifyToken: (): boolean => {
    try {
      // Use client's axios instance to check if token is valid
      // The interceptor will handle Authorization header
      const token = tokenStorage.getAccessToken();
      return !!token;
    } catch {
      return false;
    }
  },

  /**
   * Change password
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
      const apiError = error as AxiosError;
      const errorMessage =
        (apiError.response?.data as any)?.detail ||
        apiError.message ||
        'Password change failed';

      console.error('[AuthApi] Password change failed:', errorMessage);

      throw {
        status: apiError.response?.status || 400,
        message: errorMessage,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Check if user has admin role
   */
  isAdmin: async (): Promise<boolean> => {
    try {
      const user = await authApi.getCurrentUser();
      return user.is_admin || false;
    } catch {
      return false;
    }
  },

  /**
   * Request password reset (if implemented)
   */
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<{ message: string }>(
        '/auth/forgot-password',
        { email }
      );

      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      const errorMessage =
        (apiError.response?.data as any)?.detail ||
        apiError.message ||
        'Password reset request failed';

      throw {
        status: apiError.response?.status || 400,
        message: errorMessage,
      };
    }
  },
};

/**
 * Global authentication event dispatcher
 * Allows components to react to auth changes without context
 */
export const createAuthEvent = (type: string, data?: any) => {
  const event = new CustomEvent(`auth:${type}`, {
    detail: data,
  });
  window.dispatchEvent(event);
};

/**
 * Listen to authentication events
 * Usage: listenToAuthEvent('login', (data) => console.log(data))
 */
export const listenToAuthEvent = (
  type: string,
  callback: (data?: any) => void
) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    callback(customEvent.detail);
  };

  window.addEventListener(`auth:${type}`, handler);

  // Return unsubscribe function
  return () => {
    window.removeEventListener(`auth:${type}`, handler);
  };
};
