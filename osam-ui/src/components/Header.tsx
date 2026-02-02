import React, { useState } from 'react';
import NAV from './nav';
import MobileMenu from './MobileMenu';

type HeaderProps = {
  isAdmin?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ isAdmin = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center text-white font-bold">O</div>
              <span className="font-semibold text-lg text-monsoon-900">OSAM Hill</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
            {NAV.map((item) => {
              if (item.hidden && !isAdmin) return null;
              return (
                <a key={item.href} href={item.href} className="text-sm font-medium text-monsoon-700 hover:text-forest-700">
                  {item.title}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <a href="/book" className="inline-flex items-center px-4 py-2 bg-forest-600 text-white rounded-md text-sm font-medium hover:bg-forest-700">Book</a>
            </div>

            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} isAdmin={isAdmin} />
    </header>
  );
};

export default Header;
