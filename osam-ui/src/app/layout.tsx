import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalUIProvider } from '@/contexts/GlobalUIContext';
import GlobalLoader from '@/components/GlobalLoader';

export const metadata: Metadata = {
  title: 'Osam Tourism',
  description: 'Explore Osam Hill - Ancient temples, mountain adventures, and natural beauty',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <GlobalUIProvider>
            {children}
            <GlobalLoader />
          </GlobalUIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
