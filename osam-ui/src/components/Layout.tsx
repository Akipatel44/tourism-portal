/**
 * Layout Wrapper Component
 * Global layout structure with Header, Footer, and content area
 */

import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
  logoUrl?: string;
  siteName?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  logoUrl,
  siteName,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-monsoon-50">
      {/* Header */}
      {showHeader && <Header logoUrl={logoUrl} siteName={siteName} />}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer logoUrl={logoUrl} siteName={siteName} />}

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

/**
 * Scroll to Top Button Component
 * Shows when user scrolls down
 */
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6 z-40
        w-12 h-12 rounded-full bg-forest-600 hover:bg-forest-700
        text-white shadow-lg
        flex items-center justify-center
        transition-all duration-200 transform hover:scale-110
        hover:shadow-xl
      "
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default Layout;
