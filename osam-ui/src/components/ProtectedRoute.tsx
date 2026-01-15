/**
 * ProtectedRoute Component
 * 
 * Guards routes that require authentication
 * - Redirects unauthenticated users to login
 * - Optional admin-only access
 * - Shows loading state during auth check
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
}

/**
 * ProtectedRoute wrapper
 * Checks authentication before rendering children
 * 
 * @param children Content to render if authenticated
 * @param requireAdmin If true, only admins can access (default: false)
 * @param fallback Component to show while loading (default: Loader)
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  fallback,
}) => {
  const { isAuthenticated, isAdmin, isLoading, user } = useAuth();

  // Show loading state
  if (isLoading) {
    return fallback || <Loader />;
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but requires admin
  if (requireAdmin && !isAdmin) {
    console.warn('[ProtectedRoute] User lacks admin privileges');
    return <Navigate to="/unauthorized" replace />;
  }

  // All checks passed
  return <>{children}</>;
};

export default ProtectedRoute;
