/**
 * Root Layout Example
 * Shows how to wrap the app with AuthProvider
 *
 * This is an example - integrate into your actual src/app/layout.tsx
 */

import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'OSAM Tourism',
  description: 'Tourism management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap entire app with AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
