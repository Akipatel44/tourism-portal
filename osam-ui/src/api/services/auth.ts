/**
 * Auth Service
 * Handles all authentication-related API calls
 */

import { AxiosError } from 'axios';
import { publicApi, protectedApi } from '../axios/instances';
import { AUTH_ENDPOINTS } from '../constants';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  CurrentUserResponse,
  ChangePasswordRequest,
} from '../types/auth';
import tokenManager from '../utils/tokenManager';
import { parseApiError } from '../utils/apiErrorHandler';

class AuthService {
  /**
   * Login with email and password
   * Public endpoint - returns access token
   */
  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await publicApi.post<LoginResponse>(
        AUTH_ENDPOINTS.LOGIN,
        payload
      );

      if (response.data?.access_token) {
        tokenManager.setToken(response.data.access_token);
      }

      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Register new user
   * Public endpoint - returns access token
   */
  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await publicApi.post<RegisterResponse>(
        AUTH_ENDPOINTS.REGISTER,
        payload
      );

      if (response.data?.access_token) {
        tokenManager.setToken(response.data.access_token);
      }

      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get current user profile
   * Protected endpoint - requires valid token
   */
  async getCurrentUser(): Promise<CurrentUserResponse> {
    try {
      const response = await protectedApi.get<CurrentUserResponse>(
        AUTH_ENDPOINTS.ME
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Logout (clear token)
   * Protected endpoint - server may do cleanup
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if server needs cleanup
      await protectedApi.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with logout anyway
    } finally {
      // Always clear token locally
      tokenManager.clearAuth();
    }
  }

  /**
   * Change password
   * Protected endpoint
   */
  async changePassword(payload: ChangePasswordRequest): Promise<void> {
    try {
      await protectedApi.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, payload);
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Check if user is authenticated
   * Local check - doesn't hit API
   */
  isAuthenticated(): boolean {
    return tokenManager.hasToken();
  }

  /**
   * Get stored token (be careful with this!)
   * Only use in controlled contexts
   */
  getToken(): string | null {
    return tokenManager.getToken();
  }
}

export default new AuthService();
