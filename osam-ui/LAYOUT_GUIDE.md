# Osam Tourism Portal - Global Layout System

## Overview

A comprehensive React + Tailwind CSS layout system for the Osam Hill & Chichod tourism website with responsive design, navigation, and footer components.

## Directory Structure

```
src/
├── components/
│   ├── Header.tsx          # Main header with logo and navigation
│   ├── HamburgerMenu.tsx   # Mobile hamburger menu toggle
│   ├── Footer.tsx          # Global footer with links and social
│   ├── Layout.tsx          # Layout wrapper component
│   └── index.ts            # Component exports
├── pages/
│   ├── HomePage.tsx        # Landing page with hero section
│   ├── PlacesPage.tsx      # Places and landmarks showcase
│   └── PageStubs.tsx       # Placeholder pages for other sections
├── constants/
│   └── navigation.ts       # Navigation links and footer data
├── App.tsx                 # Main app with React Router
└── design/
    ├── tokens.ts           # Design system tokens
    ├── layout-system.ts    # Layout utilities
    └── component-specs.ts  # Component specifications
```

## Components

### 1. Header Component
**File:** `src/components/Header.tsx`

Features:
- Responsive logo and site name
- Desktop navigation with 7 main pages
- Mobile hamburger menu toggle
- CTA button (Plan Visit)
- Active route highlighting
- Sticky positioning with z-index management

**Props:**
```typescript
interface HeaderProps {
  logoUrl?: string;      // Logo image URL
  siteName?: string;     // Website name
}
```

**Usage:**
```jsx
<Header 
  logoUrl="path/to/logo.png" 
  siteName="Osam Hill & Chichod"
/>
```

### 2. HamburgerMenu Component
**File:** `src/components/HamburgerMenu.tsx`

Features:
- Mobile-only hamburger/close icon
- Smooth rotation animation
- Accessible with ARIA labels
- Toggle functionality for mobile menu

**Props:**
```typescript
interface HamburgerMenuProps {
  isOpen: boolean;     // Menu open state
  onClick: () => void; // Toggle callback
}
```

### 3. Footer Component
**File:** `src/components/Footer.tsx`

Features:
- Brand section with logo and description
- 3-column layout: About, Quick Links, Visit Info
- Social media icons (5 platforms)
- Newsletter subscription form
- Copyright and legal links
- Bottom gradient bar
- Fully responsive design

**Sections:**
- **About Osam Hill** - Brand description and related links
- **Quick Links** - Navigation to main pages
- **Visit Information** - Practical travel information
- **Social Media** - 5 social platform links
- **Newsletter** - Email subscription form

### 4. Layout Component
**File:** `src/components/Layout.tsx`

Features:
- Global layout wrapper for all pages
- Header, main content, footer structure
- Scroll-to-top button (appears at 300px scroll)
- Flexible show/hide for header and footer
- Smooth scroll animations
- Min-height viewport coverage

**Props:**
```typescript
interface LayoutProps {
  children: ReactNode;     // Page content
  logoUrl?: string;        // Logo URL
  siteName?: string;       // Site name
  showHeader?: boolean;    // Show header (default: true)
  showFooter?: boolean;    // Show footer (default: true)
}
```

**Usage:**
```jsx
<Layout>
  <YourPageContent />
</Layout>
```

### 5. Scroll to Top Button
Built into Layout component with:
- Appears after 300px scroll
- Smooth scroll to top animation
- Hover effects and scale transform
- Accessible button with aria-label

## Pages

### 1. HomePage
**File:** `src/pages/HomePage.tsx`

Features:
- Hero section with gradient overlay and background image
- Call-to-action button
- 3-card feature section (Places, Mythology, Events)
- Secondary CTA section with Visit Planning
- Responsive grid layout

### 2. PlacesPage
**File:** `src/pages/PlacesPage.tsx`

Features:
- Page header with gradient background
- Places grid (3 columns on desktop, responsive)
- Individual place cards with:
  - Image with hover zoom
  - Category badge
  - Description
  - Significance indicator
  - "Learn More" button
- Filter section with category buttons

**Sample Data:**
```typescript
interface Place {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  significance: string;
}
```

### 3. Mythology, Nature, Events, Gallery, Visit Guide Pages
**File:** `src/pages/PageStubs.tsx`

Placeholder pages with:
- Themed gradient headers
- Content sections ready for implementation
- Responsive layouts
- Consistent styling with design system

### 4. Admin Page
**File:** `src/pages/PageStubs.tsx`

Features:
- Hidden from main navigation
- Dark theme for admin interface
- Quick action buttons
- Ready for admin functionality

## Navigation Structure

### Main Navigation Links (Header)

```typescript
[
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Places", href: "/places", icon: "📍" },
  { label: "Mythology", href: "/mythology", icon: "📚" },
  { label: "Nature", href: "/nature", icon: "🌿" },
  { label: "Events", href: "/events", icon: "🎉" },
  { label: "Gallery", href: "/gallery", icon: "🖼️" },
  { label: "Visit Guide", href: "/visit-guide", icon: "🗺️" },
]
```

### Responsive Behavior

**Desktop (lg breakpoint):**
- Full navigation links visible
- Desktop spacing and sizing
- CTA button visible
- No hamburger menu

**Tablet (md breakpoint):**
- Condensed header
- Hamburger menu visible
- Single-column to 2-column layouts
- Optimized spacing

**Mobile (sm breakpoint):**
- Hamburger menu required
- Full-width content
- Single column layouts
- Larger touch targets

## Design System Integration

### Color Palette
- **Primary Forest:** #1B5E20 (forest-800)
- **Accent Mint:** #10B981 (accent-mint)
- **Neutral Monsoon:** #2D3E50 (monsoon-dark)
- **Gold:** #D4A574 (accent-gold)

### Typography
- **H1:** 3.5rem, bold, tight spacing
- **H2:** 2.25rem, bold
- **Body:** 1rem, relaxed line height
- **Captions:** 0.75rem, uppercase

### Spacing
- **xs:** 4px
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px

### Transitions
- **Fast:** 75ms
- **Default:** 150ms
- **Slow:** 300ms

## Routing Setup

**File:** `src/App.tsx`

Uses React Router with the following routes:

```typescript
/ → HomePage
/places → PlacesPage
/mythology → MythologyPage
/nature → NaturePage
/events → EventsPage
/gallery → GalleryPage
/visit-guide → VisitGuidePage
/admin → AdminPage (protected)
* → 404 Not Found
```

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install react react-router-dom tailwindcss
```

2. Import Tailwind config:
```typescript
import tailwindConfig from './tailwind.config.ts';
```

3. Create main.tsx or index.tsx:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### Usage

```jsx
import { App } from './App';

function main() {
  return <App />;
}
```

## Customization

### Changing Logo
```jsx
<Layout logoUrl="your-logo-url">
  <YourPage />
</Layout>
```

### Custom Navigation Links
Edit `src/constants/navigation.ts`:
```typescript
export const NAVIGATION_LINKS = [
  { label: "Custom", href: "/custom", icon: "📌" },
  // ... more links
];
```

### Custom Colors
Modify `tailwind.config.ts`:
```typescript
colors: {
  forest: { /* your colors */ },
  monsoon: { /* your colors */ },
}
```

### Custom Footer Links
Edit `src/constants/navigation.ts`:
```typescript
export const FOOTER_SECTIONS = {
  about: { /* ... */ },
  quickLinks: { /* ... */ },
  visit: { /* ... */ },
};
```

## Accessibility Features

- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Color contrast compliance (WCAG AA)
- ✅ Focus indicators on buttons
- ✅ Mobile-friendly touch targets (min 44px)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Optimization

- Component-based code splitting (React Router)
- Tailwind CSS tree-shaking
- Lazy loading ready (add React.lazy when needed)
- Optimized image loading with placeholders
- Smooth animations with GPU acceleration

## Future Enhancements

- [ ] Admin authentication system
- [ ] Protected routes with auth guards
- [ ] Dynamic content from API
- [ ] Search functionality
- [ ] Advanced filtering on Places page
- [ ] Image lightbox for gallery
- [ ] Contact form integration
- [ ] SEO meta tags
- [ ] Progressive Web App (PWA) features
- [ ] Internationalization (i18n)

## Contributing

When adding new pages or components:

1. Follow the existing component structure
2. Use Tailwind utility classes (no custom CSS)
3. Import from `src/constants/navigation.ts` for shared data
4. Add TypeScript interfaces for props
5. Include JSDoc comments
6. Update this documentation

## Support

For questions or issues, refer to:
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- React Documentation: https://react.dev
- React Router Documentation: https://reactrouter.com

---

**Last Updated:** January 14, 2026
**Version:** 1.0.0
**Status:** Production Ready
