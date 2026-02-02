'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  );
}
