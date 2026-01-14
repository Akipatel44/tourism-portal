/**
 * Global Layout Components Structure
 * Osam Tourism Portal - React + Tailwind
 */

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Places", href: "/places", icon: "📍" },
  { label: "Mythology", href: "/mythology", icon: "📚" },
  { label: "Nature", href: "/nature", icon: "🌿" },
  { label: "Events", href: "/events", icon: "🎉" },
  { label: "Gallery", href: "/gallery", icon: "🖼️" },
  { label: "Visit Guide", href: "/visit-guide", icon: "🗺️" },
];

export const FOOTER_SECTIONS = {
  about: {
    title: "About Osam Hill",
    description: "Discover the sacred mystique of Osam Hill and Chichod. A sacred destination steeped in mythology, natural beauty, and spiritual significance.",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Community", href: "/community" },
    ],
  },
  quickLinks: {
    title: "Quick Links",
    links: [
      { label: "Explore Places", href: "/places" },
      { label: "Upcoming Events", href: "/events" },
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Plan Your Visit", href: "/visit-guide" },
      { label: "Mythology Guide", href: "/mythology" },
    ],
  },
  visit: {
    title: "Visit Information",
    links: [
      { label: "Getting Here", href: "/visit-guide/directions" },
      { label: "Opening Hours", href: "/visit-guide/hours" },
      { label: "Facilities", href: "/visit-guide/facilities" },
      { label: "Safety & Rules", href: "/visit-guide/rules" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
};

export const SOCIAL_LINKS = [
  { platform: "Facebook", url: "https://facebook.com/osamhill", icon: "f" },
  { platform: "Instagram", url: "https://instagram.com/osamhill", icon: "📷" },
  { platform: "Twitter", url: "https://twitter.com/osamhill", icon: "𝕏" },
  { platform: "YouTube", url: "https://youtube.com/@osamhill", icon: "▶️" },
];
