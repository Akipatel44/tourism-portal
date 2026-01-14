/**
 * Hamburger Menu Component
 * Mobile navigation toggle button
 */

import React from "react";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-monsoon-600 hover:text-forest-800 hover:bg-monsoon-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-forest-500 transition-colors duration-200"
      aria-expanded={isOpen}
      aria-label="Toggle navigation menu"
    >
      <svg
        className={`h-6 w-6 transition-transform duration-300 ${
          isOpen ? "rotate-90" : ""
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isOpen ? (
          // Close Icon (X)
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          // Hamburger Icon (3 lines)
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
};

export default HamburgerMenu;
