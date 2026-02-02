import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalUIProvider } from '@/contexts/GlobalUIContext';
import GlobalLoader from '@/components/GlobalLoader';

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
