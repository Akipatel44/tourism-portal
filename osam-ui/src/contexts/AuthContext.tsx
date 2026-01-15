/**
 * Authentication Context
 * 
 * Global authentication state management
 * - Manages login/logout state
 * - Stores current user info
 * - Handles token persistence
 * - Provides auth methods to entire app
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { authApi, User } from '@/api/auth';
import { tokenStorage } from '@/api/tokenStorage';

/* ==================== TYPES ==================== */

export interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean;

  // Methods
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

/* ==================== CONTEXT ==================== */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ==================== PROVIDER ==================== */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize auth state on mount
   * Check if token exists and fetch user info
   */
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        // Check if token exists
        if (tokenStorage.hasAccessToken()) {
          // Fetch current user
          const currentUser = await authApi.getCurrentUser();
          setUser(currentUser);
          setError(null);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        // Silent fail - user not authenticated
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for unauthorized events
    const unsubscribe = listenToAuthStateChange('unauthorized', () => {
      setUser(null);
      setError('Your session has expired. Please login again.');
    });

    return unsubscribe;
  }, []);

  /**
   * Login user with credentials
   */
  const login = useCallback(
    async (username: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { token, user: loginUser } = await authApi.login({
          username,
          password,
        });

        setUser(loginUser);
        dispatchAuthStateChange('login', { user: loginUser, token });

        console.log('[Auth] Login successful:', loginUser.username);
      } catch (err: any) {
        const errorMessage = err?.message || 'Login failed';
        setError(errorMessage);
        dispatchAuthStateChange('error', { message: errorMessage });

        console.error('[Auth] Login error:', errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Logout user and clear state
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
      setError(null);
      dispatchAuthStateChange('logout', {});

      console.log('[Auth] Logout successful');
    } catch (err: any) {
      const errorMessage = err?.message || 'Logout failed';
      setError(errorMessage);
      console.error('[Auth] Logout error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh current user info
   * Useful after profile updates
   */
  const refreshUser = useCallback(async () => {
    try {
      if (!tokenStorage.hasAccessToken()) {
        setUser(null);
        return;
      }

      const currentUser = await authApi.getCurrentUser();
      setUser(currentUser);
      setError(null);
    } catch (err: any) {
      setUser(null);
      const errorMessage = err?.message || 'Failed to refresh user';
      setError(errorMessage);
      console.error('[Auth] Refresh user error:', errorMessage);
      throw err;
    }
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    isAdmin: user?.is_admin || false,
    login,
    logout,
    refreshUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* ==================== HOOKS ==================== */

/**
 * Hook to use authentication context
 * Must be used within AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

/**
 * Hook for login logic
 * Returns loading state and login method
 */
export const useLogin = () => {
  const { login, isLoading, error } = useAuth();

  return {
    login,
    isLoading,
    error,
  };
};

/**
 * Hook for logout logic
 */
export const useLogout = () => {
  const { logout, isLoading } = useAuth();

  return {
    logout,
    isLoading,
  };
};

/**
 * Hook to check admin status
 */
export const useIsAdmin = (): boolean => {
  const { isAdmin } = useAuth();
  return isAdmin;
};

/**
 * Hook to check authentication status
 */
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

/* ==================== UTILITIES ==================== */

/**
 * Dispatch auth state change event
 * Allows multiple listeners across app
 */
export const dispatchAuthStateChange = (type: string, data?: any) => {
  const event = new CustomEvent(`auth:state:${type}`, {
    detail: data,
  });
  window.dispatchEvent(event);
};

/**
 * Listen to auth state changes
 * @param type Event type (login, logout, error, unauthorized)
 * @param callback Function to call when event occurs
 * @returns Unsubscribe function
 */
export const listenToAuthStateChange = (
  type: string,
  callback: (data?: any) => void
) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent;
    callback(customEvent.detail);
  };

  window.addEventListener(`auth:state:${type}`, handler);

  // Return unsubscribe function
  return () => {
    window.removeEventListener(`auth:state:${type}`, handler);
  };
};
