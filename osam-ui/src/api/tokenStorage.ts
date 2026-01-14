/**
 * Token Storage Strategy
 * 
 * Secure token management for JWT authentication
 * - Stores access token only (no refresh token)
 * - Uses localStorage for persistence
 * - Provides utilities for get/set/clear operations
 * - Validates token presence
 */

const TOKEN_KEY = 'osam_access_token';

/**
 * Token Storage Interface
 * Handles all token-related operations
 */
export const tokenStorage = {
  /**
   * Get current access token
   * @returns {string | null} Access token or null if not found
   */
  getAccessToken: (): string | null => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      return token ? token.trim() : null;
    } catch (error) {
      console.error('[TokenStorage] Error reading token:', error);
      return null;
    }
  },

  /**
   * Set access token
   * @param {string} token JWT access token
   */
  setAccessToken: (token: string): void => {
    try {
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token provided');
      }
      localStorage.setItem(TOKEN_KEY, token.trim());
      console.log('[TokenStorage] Access token stored');
    } catch (error) {
      console.error('[TokenStorage] Error storing token:', error);
    }
  },

  /**
   * Clear access token
   * Called on logout or token expiration
   */
  clearAccessToken: (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      console.log('[TokenStorage] Access token cleared');
    } catch (error) {
      console.error('[TokenStorage] Error clearing token:', error);
    }
  },

  /**
   * Check if token exists
   * @returns {boolean} True if token is available
   */
  hasAccessToken: (): boolean => {
    return tokenStorage.getAccessToken() !== null;
  },

  /**
   * Clear all auth-related data
   * Called on logout
   */
  clearAll: (): void => {
    try {
      // Clear token
      tokenStorage.clearAccessToken();
      
      // Clear any other auth-related items
      const authKeys = Array.from({ length: localStorage.length }, (_, i) =>
        localStorage.key(i)
      )
        .filter((key) => key?.startsWith('osam_') || key?.includes('auth'))
        .filter((key): key is string => key !== null);

      authKeys.forEach((key) => localStorage.removeItem(key));
      
      console.log('[TokenStorage] All auth data cleared');
    } catch (error) {
      console.error('[TokenStorage] Error clearing auth data:', error);
    }
  },
};

/**
 * Token Validation Utilities
 */
export const tokenUtils = {
  /**
   * Check if token is likely expired (basic check)
   * Does not validate signature - use server validation
   * @param {string} token JWT token
   * @returns {boolean} True if token appears expired
   */
  isTokenExpired: (token?: string): boolean => {
    try {
      const tokenToCheck = token || tokenStorage.getAccessToken();
      if (!tokenToCheck) return true;

      // JWT format: header.payload.signature
      const parts = tokenToCheck.split('.');
      if (parts.length !== 3) return true;

      // Decode payload (add padding if needed)
      const payload = JSON.parse(
        atob(parts[1] + '='.repeat(4 - (parts[1].length % 4)))
      );

      // Check expiration (exp is in seconds)
      if (payload.exp) {
        const expirationTime = payload.exp * 1000;
        const currentTime = Date.now();
        return currentTime >= expirationTime;
      }

      return false;
    } catch (error) {
      console.error('[TokenUtils] Error checking token expiration:', error);
      return true; // Treat parsing errors as expired
    }
  },

  /**
   * Decode token payload (for debugging/display)
   * @param {string} token JWT token
   * @returns {any} Decoded payload
   */
  decodeToken: (token?: string): any => {
    try {
      const tokenToDecode = token || tokenStorage.getAccessToken();
      if (!tokenToDecode) return null;

      const parts = tokenToDecode.split('.');
      if (parts.length !== 3) return null;

      return JSON.parse(
        atob(parts[1] + '='.repeat(4 - (parts[1].length % 4)))
      );
    } catch (error) {
      console.error('[TokenUtils] Error decoding token:', error);
      return null;
    }
  },

  /**
   * Get token expiration time
   * @returns {Date | null} Expiration time or null
   */
  getTokenExpiration: (token?: string): Date | null => {
    const payload = tokenUtils.decodeToken(token);
    if (payload?.exp) {
      return new Date(payload.exp * 1000);
    }
    return null;
  },

  /**
   * Get time until token expiration
   * @returns {number} Milliseconds until expiration
   */
  getTimeUntilExpiration: (token?: string): number => {
    const expiration = tokenUtils.getTokenExpiration(token);
    if (!expiration) return 0;
    return expiration.getTime() - Date.now();
  },
};

/**
 * Authentication State Hook
 * Use in components to react to auth changes
 */
export const useAuthState = () => {
  return {
    isAuthenticated: tokenStorage.hasAccessToken(),
    token: tokenStorage.getAccessToken(),
    isExpired: tokenUtils.isTokenExpired(),
    expiresAt: tokenUtils.getTokenExpiration(),
  };
};
