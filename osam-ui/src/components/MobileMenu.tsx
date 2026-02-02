import React from 'react';
import NAV, { NavItem } from './nav';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isAdmin?: boolean;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, isAdmin }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <nav
        className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-monsoon-900 p-6 shadow-lg"
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-bold text-forest-700">OSAM Hill</div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-md hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <ul className="space-y-3">
          {NAV.map((item: NavItem) => {
            if (item.hidden && !isAdmin) return null;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block text-lg font-medium text-monsoon-900 hover:text-forest-700"
                  onClick={onClose}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t pt-4">
          <a href="/contact" className="block text-sm text-stone-500">Contact</a>
          <a href="/book" className="block text-sm text-stone-500">Book Visit</a>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
