import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type AdminLayoutProps = {
  children: React.ReactNode;
  pageTitle?: string;
};

const ADMIN_MENU = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Places', href: '/admin/places', icon: '📍' },
  { label: 'Events', href: '/admin/events', icon: '🎉' },
  { label: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
  { label: 'Bookings', href: '/admin/bookings', icon: '📅' },
  { label: 'Users', href: '/admin/users', icon: '👥' },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const isActive = (href: string) => router.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 w-64 bg-forest-900 text-white transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-72`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-forest-800">
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center font-bold text-forest-900">
                🏔️
              </div>
              <div>
                <h1 className="font-bold text-lg">Osam Admin</h1>
                <p className="text-xs text-forest-300">Dashboard</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <div className="space-y-1">
            {ADMIN_MENU.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-emerald-600 text-white'
                      : 'text-forest-100 hover:bg-forest-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-forest-800 bg-forest-950">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-forest-100 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="md:ml-72">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 md:px-8">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page Title */}
            {pageTitle && <h1 className="text-2xl font-bold text-forest-900">{pageTitle}</h1>}
            <div className="flex-1" />

            {/* Admin User Info */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-gray-800">Admin User</p>
                <p className="text-sm text-gray-500">System Admin</p>
              </div>
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
