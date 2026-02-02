/**
 * Protected Route Component
 * Guards routes from unauthorized access
 *
 * Usage:
 * <ProtectedRoute>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */

'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  fallback?: ReactNode;
}

/**
 * ProtectedRoute Component
 * Checks authentication before rendering content
 *
 * @param children - Content to render if authenticated
 * @param requireAdmin - If true, only allow admin users
 * @param fallback - Loading UI while checking auth
 */
export function ProtectedRoute({
  children,
  requireAdmin = false,
  fallback = <AuthLoadingFallback />,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, isAdmin, user } = useAuth();

  // Show fallback while checking authentication
  if (isLoading) {
    return <>{fallback}</>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return <>{fallback}</>;
  }

  // Redirect if admin is required but user is not admin
  if (requireAdmin && !isAdmin) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return <>{fallback}</>;
  }

  // Render children if authenticated (and admin if required)
  return <>{children}</>;
}

/**
 * Default loading fallback UI
 */
function AuthLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-forest-600"></div>
        </div>
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    </div>
  );
}

/**
 * Alternative: Higher Order Component (HOC) wrapper
 * For class components or different patterns
 */
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  requireAdmin: boolean = false
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute requireAdmin={requireAdmin}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

/**
 * Alternative: Route guard function
 * For use in route definitions or middleware
 */
export function canAccess(
  isAuthenticated: boolean,
  isAdmin: boolean,
  requireAdmin: boolean
): boolean {
  if (!isAuthenticated) return false;
  if (requireAdmin && !isAdmin) return false;
  return true;
}
