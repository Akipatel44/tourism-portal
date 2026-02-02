import React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  pageTitle?: string;
  isAdmin?: boolean;
};

export const Layout: React.FC<LayoutProps> = ({ children, pageTitle, isAdmin = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-mountain-mist text-monsoon-900">
      <Header isAdmin={isAdmin} />

      <main className="flex-1">
        {pageTitle && (
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-2xl font-bold">{pageTitle}</h1>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>

      <Footer isAdmin={isAdmin} />
    </div>
  );
};

export default Layout;
