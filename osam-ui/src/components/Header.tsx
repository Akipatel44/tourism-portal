/**
 * Header Component with Logo and Navigation
 * Responsive design with desktop and mobile support
 */

import React, { useState } from "react";
import { NAVIGATION_LINKS } from "../constants/navigation";
import { HamburgerMenu } from "./HamburgerMenu";

interface HeaderProps {
  logoUrl?: string;
  siteName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logoUrl = "/logo.svg",
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
            <img
              src={logoUrl}
              alt={siteName}
              className="h-12 w-12 md:h-14 md:w-14 rounded-lg object-cover"
            />
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
