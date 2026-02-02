/**
 * Auth Context
 * Manages authentication state for the entire application
 *
 * Features:
 * - Stores user data and authentication state
 * - Handles login and logout
 * - Persists user across page reloads
 * - Listens to token invalidation events
 * - Provides useAuth() hook for components
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService, tokenManager, CurrentUserResponse, ParsedApiError } from '@/api';

/**
 * Auth context value type
 */
interface AuthContextType {
  // State
  user: CurrentUserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ParsedApiError | null;

  // Actions
  login: (email: string, password: string) => Promise<CurrentUserResponse>;
  logout: () => Promise<void>;
  clearError: () => void;

  // Checks
  isAdmin: boolean;
}

/**
 * Create auth context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Auth Provider Component
 * Wraps app and provides authentication context
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<CurrentUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ParsedApiError | null>(null);

  /**
   * Initialize auth state on mount
   * Restore user if token exists in localStorage
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);

        // Check if token exists
        if (!authService.isAuthenticated()) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Try to fetch current user
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setError(null);
      } catch (err) {
        // Token is invalid, clear it
        tokenManager.clearAuth();
        setUser(null);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Listen for logout events from API interceptor
   * When token is cleared (401), redirect to login
   */
  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      setError(null);
      // AuthGuard will handle redirect
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:logout', handleLogout);
      return () => window.removeEventListener('auth:logout', handleLogout);
    }
  }, []);

  /**
   * Login handler
   * Calls authService.login(), saves token, fetches user
   */
  const handleLogin = useCallback(
    async (email: string, password: string): Promise<CurrentUserResponse> => {
      try {
        setIsLoading(true);
        setError(null);

        // Call login endpoint
        const response = await authService.login({ email, password });

        // Token is auto-saved by authService
        // Set user from response
        setUser(response.user);

        return response.user;
      } catch (err) {
        const parsed = err as ParsedApiError;
        setError(parsed);
        throw parsed;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Logout handler
   * Clears token and user state
   */
  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);

      // Call logout endpoint (optional cleanup on backend)
      await authService.logout();

      // Clear user state
      setUser(null);
      setError(null);
    } catch (err) {
      // Even if logout API fails, clear locally
      setUser(null);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear error handler
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Derived state: is admin
   */
  const isAdmin = user?.is_admin ?? false;

  /**
   * Context value
   */
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && authService.isAuthenticated(),
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * Use this in any component to access auth state
 *
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

/**
 * Optional: useRequireAuth Hook
 * Automatically redirects to login if not authenticated
 * Useful for protected pages
 */
export function useRequireAuth() {
  const auth = useAuth();
  const router = require('next/router').useRouter?.();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router?.push('/login');
    }
  }, [auth.isLoading, auth.isAuthenticated, router]);

  return auth;
}

/**
 * Optional: useRequireAdmin Hook
 * Automatically redirects if not admin
 */
export function useRequireAdmin() {
  const auth = useAuth();
  const router = require('next/router').useRouter?.();

  useEffect(() => {
    if (!auth.isLoading && (!auth.isAuthenticated || !auth.isAdmin)) {
      router?.push('/');
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.isAdmin, router]);

  return auth;
}
