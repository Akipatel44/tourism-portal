/**
 * Token Manager
 * Handles access token storage and retrieval from localStorage
 *
 * Strategy: Access token only (no refresh token rotation)
 * Token stored in localStorage, not httpOnly (needed for React context)
 * On 401 response, token is cleared and user redirected to login
 */

import config from '../config';

class TokenManager {
  /**
   * Get stored access token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null; // SSR safety
    }
    return localStorage.getItem(config.TOKEN_KEY);
  }

  /**
   * Store access token
   */
  setToken(token: string): void {
    if (typeof window === 'undefined') return; // SSR safety
    localStorage.setItem(config.TOKEN_KEY, token);
  }

  /**
   * Clear access token
   */
  clearToken(): void {
    if (typeof window === 'undefined') return; // SSR safety
    localStorage.removeItem(config.TOKEN_KEY);
  }

  /**
   * Check if token exists
   */
  hasToken(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Get authorization header value
   */
  getAuthHeader(): string | null {
    const token = this.getToken();
    return token ? `Bearer ${token}` : null;
  }

  /**
   * Clear all authentication (logout)
   */
  clearAuth(): void {
    this.clearToken();
    // Additional cleanup could go here
  }
}

export default new TokenManager();
