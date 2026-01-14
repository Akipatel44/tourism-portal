/**
 * Footer Component
 * Comprehensive footer with sections, links, and social media
 */

import React from "react";
import { FOOTER_SECTIONS, SOCIAL_LINKS } from "../constants/navigation";

interface FooterProps {
  logoUrl?: string;
  siteName?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logoUrl = "https://via.placeholder.com/40x40?text=OSAM",
  siteName = "Osam Hill & Chichod",
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-monsoon-900 text-monsoon-100 mt-16 md:mt-24">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top Section: Logo & Description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-8 border-b border-monsoon-700">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoUrl}
                alt={siteName}
                className="h-10 w-10 rounded object-cover"
              />
              <div>
                <h3 className="font-bold text-lg text-white">{siteName}</h3>
                <p className="text-xs text-monsoon-400">Sacred Heritage</p>
              </div>
            </div>
            <p className="text-sm text-monsoon-300 leading-relaxed">
              {FOOTER_SECTIONS.about.description}
            </p>
          </div>

          {/* About Section */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-bold text-white mb-4">
              {FOOTER_SECTIONS.about.title}
            </h4>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.about.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-monsoon-300 hover:text-accent-mint transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-bold text-white mb-4">
              {FOOTER_SECTIONS.quickLinks.title}
            </h4>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-monsoon-300 hover:text-accent-mint transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Information */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-bold text-white mb-4">
              {FOOTER_SECTIONS.visit.title}
            </h4>
            <ul className="space-y-2">
              {FOOTER_SECTIONS.visit.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-monsoon-300 hover:text-accent-mint transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-8 border-b border-monsoon-700">
          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4 flex-wrap">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-12 h-12 rounded-full bg-monsoon-800 hover:bg-forest-600
                    flex items-center justify-center text-xl
                    transition-all duration-200 transform hover:scale-110
                    hover:shadow-lg
                  "
                  aria-label={`Follow us on ${social.platform}`}
                  title={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">
              Stay Updated
            </h4>
            <p className="text-sm text-monsoon-300 mb-3">
              Subscribe to our newsletter for updates and events.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="
                  flex-1 px-4 py-2.5 rounded-lg bg-monsoon-800
                  border border-monsoon-700 text-white placeholder-monsoon-400
                  focus:outline-none focus:ring-2 focus:ring-forest-500
                  transition-colors duration-200 text-sm
                "
              />
              <button
                type="submit"
                className="
                  px-6 py-2.5 rounded-lg bg-forest-600 hover:bg-forest-700
                  text-white font-semibold
                  transition-all duration-200 transform hover:scale-105
                  text-sm
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <p className="text-sm text-monsoon-400">
              © {currentYear} {siteName}. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-1 flex justify-center">
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-sm text-monsoon-400 hover:text-accent-mint transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-monsoon-400 hover:text-accent-mint transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-sm text-monsoon-400 hover:text-accent-mint transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="md:col-span-1 flex justify-end">
            <p className="text-sm text-monsoon-400">
              Designed with ❤️ for heritage conservation
            </p>
          </div>
        </div>
      </div>

      {/* Gradient Bottom */}
      <div className="h-1 bg-gradient-forest"></div>
    </footer>
  );
};

export default Footer;
