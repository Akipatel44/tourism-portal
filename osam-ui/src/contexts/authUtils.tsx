/**
 * Auth Utilities
 * Common authentication patterns and helpers
 */

import React from 'react';
import { useAuth, useIsAdmin, useIsAuthenticated } from '@/contexts/AuthContext';

/* ==================== CONDITIONAL RENDERING COMPONENTS ==================== */

/**
 * Only render if user is authenticated
 */
export const IfAuthenticated: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <>{children}</> : null;
};

/**
 * Only render if user is NOT authenticated
 */
export const IfNotAuthenticated: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useIsAuthenticated();
  return !isAuthenticated ? <>{children}</> : null;
};

/**
 * Only render if user is admin
 */
export const IfAdmin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAdmin = useIsAdmin();
  return isAdmin ? <>{children}</> : null;
};

/**
 * Only render if user is NOT admin
 */
export const IfNotAdmin: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAdmin = useIsAdmin();
  return !isAdmin ? <>{children}</> : null;
};

/* ==================== AUTH STATUS COMPONENTS ==================== */

/**
 * Display current user name or login link
 */
export const UserGreeting: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <a href="/login">Login</a>;
  }

  return <span>Welcome, {user.full_name || user.username}</span>;
};

/**
 * Display admin badge if user is admin
 */
export const AdminBadge: React.FC = () => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) return null;

  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
      Administrator
    </span>
  );
};

/**
 * Display auth status indicator
 */
export const AuthStatus: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isAuthenticated ? 'bg-green-500' : 'bg-gray-400'
        }`}
      />
      <span className="text-sm text-gray-600">
        {isAuthenticated
          ? `Logged in as ${user?.username}`
          : 'Not authenticated'}
      </span>
    </div>
  );
};

/* ==================== FORM COMPONENTS ==================== */

/**
 * Reusable auth input field
 */
export const AuthInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  }
> = ({ label, error, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

/**
 * Auth form layout wrapper
 */
export const AuthFormLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

/* ==================== PERMISSION CHECKS ==================== */

/**
 * Check if user can access resource
 */
export const useCanAccess = (requiredRoles: string[]): boolean => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return false;

  // Simple role check - extend as needed
  if (requiredRoles.includes('admin') && user.is_admin) return true;
  if (requiredRoles.includes('user') && user.is_active) return true;

  return false;
};

/**
 * Check if user can perform action
 */
export const useCanPerformAction = (action: string): boolean => {
  const { user } = useAuth();

  // Implement your action-based permissions here
  const adminActions = ['delete', 'edit', 'manage'];
  const userActions = ['view', 'comment'];

  if (adminActions.includes(action)) {
    return user?.is_admin || false;
  }

  if (userActions.includes(action)) {
    return !!user;
  }

  return false;
};

/* ==================== CUSTOM HOOKS ==================== */

/**
 * Get current user or throw error if not authenticated
 */
export const useRequireAuth = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    throw new Error('This component requires authentication');
  }

  return user!;
};

/**
 * Get current user info with auto-refresh
 */
export const useUserProfile = () => {
  const { user, refreshUser, isLoading } = useAuth();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshUser();
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    user,
    refresh,
    isLoading: isLoading || isRefreshing,
  };
};

/**
 * Handle login with error state
 */
export const useLoginHandler = () => {
  const { login, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLogin = async (username: string, password: string) => {
    clearError();
    setIsSubmitting(true);

    try {
      await login(username, password);
      return true;
    } catch {
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    login: handleLogin,
    error,
    clearError,
    isSubmitting,
  };
};

/**
 * Handle logout with confirmation
 */
export const useLogoutHandler = (confirmMessage?: string) => {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    if (confirmMessage && !window.confirm(confirmMessage)) {
      return false;
    }

    try {
      await logout();
      return true;
    } catch {
      return false;
    }
  };

  return {
    logout: handleLogout,
    isLoading,
  };
};

/* ==================== GUARDS ==================== */

/**
 * Require admin access
 */
export const useRequireAdmin = () => {
  const isAdmin = useIsAdmin();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!isAdmin) {
      console.warn('Admin access required');
      window.location.href = '/unauthorized';
    }
  }, [isAdmin]);

  return isAdmin;
};

/**
 * Redirect to login if not authenticated
 */
export const useRequireLogin = () => {
  const isAuthenticated = useIsAuthenticated();

  React.useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  return isAuthenticated;
};
