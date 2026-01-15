/**
 * Header Component with Logo and Navigation
 * Responsive design with desktop and mobile support
 */

import React, { useState } from "react";
import { NAVIGATION_LINKS } from "../constants/navigation";
import { HamburgerMenu } from "./HamburgerMenu";

interface HeaderProps {
  siteName?: string;
}

const Logo = () => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <rect width="200" height="200" fill="#E8F0E8" />
    <circle cx="100" cy="100" r="95" fill="none" stroke="#2D5016" strokeWidth="3" />
    <rect x="70" y="130" width="60" height="35" fill="#2D5016" />
    <polygon points="75,130 125,130 120,100 80,100" fill="#3d7024" />
    <polygon points="85,100 115,100 100,70" fill="#2D5016" />
    <line x1="100" y1="70" x2="100" y2="60" stroke="#8B7355" strokeWidth="2" />
    <rect x="88" y="110" width="8" height="8" fill="#E8F0E8" stroke="#1a3a0d" strokeWidth="1" />
    <rect x="104" y="110" width="8" height="8" fill="#E8F0E8" stroke="#1a3a0d" strokeWidth="1" />
    <rect x="94" y="135" width="12" height="20" fill="#1a3a0d" />
    <circle cx="103" cy="143" r="1.5" fill="#FFD700" />
    <ellipse cx="55" cy="95" rx="10" ry="15" fill="#558B2F" transform="rotate(-40 55 95)" />
    <line x1="55" y1="80" x2="55" y2="110" stroke="#2D5016" strokeWidth="1" />
    <ellipse cx="145" cy="95" rx="10" ry="15" fill="#558B2F" transform="rotate(40 145 95)" />
    <line x1="145" y1="80" x2="145" y2="110" stroke="#2D5016" strokeWidth="1" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  siteName = "Osam Hill & Chichod",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Site Name */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-forest-50 rounded-lg p-1 flex items-center justify-center">
              <Logo />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-forest-800">
                {siteName}
              </h1>
              <p className="text-xs md:text-sm text-monsoon-500">
                Sacred Heritage & Nature
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md
                  transition-colors duration-200
                  hover:bg-forest-50 hover:text-forest-700
                  text-monsoon-700
                  ${
                    window.location.pathname === link.href
                      ? "bg-forest-100 text-forest-800 font-bold"
                      : ""
                  }
                `}
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <button
              className={`
                px-6 py-2.5 rounded-lg font-semibold
                bg-gradient-forest text-white
                hover:shadow-lg transition-all duration-200
                transform hover:scale-105
              `}
            >
              Plan Visit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <HamburgerMenu
            isOpen={mobileMenuOpen}
            onClick={handleMobileMenuToggle}
          />
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={`
              lg:hidden border-t border-monsoon-200
              bg-white overflow-hidden
              transition-all duration-300 ease-in-out
            `}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`
                    block px-4 py-3 rounded-md text-base font-medium
                    transition-colors duration-200
                    ${
                      window.location.pathname === link.href
                        ? "bg-forest-100 text-forest-800 border-l-4 border-forest-800"
                        : "text-monsoon-700 hover:bg-monsoon-50"
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </a>
              ))}

              {/* Mobile CTA Button */}
              <div className="px-4 pt-4">
                <button
                  className={`
                    w-full px-4 py-3 rounded-lg font-semibold
                    bg-gradient-forest text-white
                    hover:shadow-lg transition-all duration-200
                    text-sm
                  `}
                >
                  Plan Your Visit
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
