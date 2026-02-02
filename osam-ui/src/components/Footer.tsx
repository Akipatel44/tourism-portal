import React from 'react';
import NAV from './nav';

type FooterProps = {
  isAdmin?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ isAdmin = false }) => {
  return (
    <footer className="bg-mountain-mist text-monsoon-900 border-t border-monsoon-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-monsoon-900">About Osam Hill</h3>
            <p className="mt-3 text-sm text-stone-600">Osam Hill & Chichod are a collection of hill-station experiences—misty mornings, monsoon trails, and local myths. Plan your visit and explore responsibly.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-monsoon-900">Quick links</h4>
            <ul className="mt-3 space-y-2">
              {NAV.map((item) => {
                if (item.hidden && !isAdmin) return null;
                return (
                  <li key={item.href}><a href={item.href} className="text-sm text-stone-600 hover:text-forest-600">{item.title}</a></li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-monsoon-900">Follow us</h4>
            <div className="mt-3 flex items-center gap-4">
              <a href="#" aria-label="Twitter" className="text-stone-600 hover:text-forest-600">Twitter</a>
              <a href="#" aria-label="Instagram" className="text-stone-600 hover:text-forest-600">Instagram</a>
              <a href="#" aria-label="Facebook" className="text-stone-600 hover:text-forest-600">Facebook</a>
            </div>
            <p className="mt-6 text-xs text-stone-500">© {new Date().getFullYear()} OSAM Hill. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
