/**
 * Quick Reference Guide & Code Examples
 * Osam Tourism Portal - Frontend Components
 */

// ============================================
// 1. BASIC APP SETUP
// ============================================

/*
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
*/

// ============================================
// 2. USING THE LAYOUT WRAPPER
// ============================================

/*
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

// Wraps entire app with Header, Footer, and Scroll-to-Top
<Layout 
  logoUrl="https://example.com/logo.png"
  siteName="Osam Hill & Chichod"
>
  <HomePage />
</Layout>
*/

// ============================================
// 3. COMPONENT PROPS INTERFACES
// ============================================

/**
 * Header Component Props
 * @param logoUrl - Image URL for logo (optional)
 * @param siteName - Website name (optional)
 */
interface HeaderProps {
  logoUrl?: string;
  siteName?: string;
}

/**
 * HamburgerMenu Component Props
 * @param isOpen - Current menu open state
 * @param onClick - Callback when toggled
 */
interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Footer Component Props
 * @param logoUrl - Image URL for logo (optional)
 * @param siteName - Website name (optional)
 */
interface FooterProps {
  logoUrl?: string;
  siteName?: string;
}

/**
 * Layout Component Props
 * @param children - Page content
 * @param logoUrl - Image URL for logo (optional)
 * @param siteName - Website name (optional)
 * @param showHeader - Show header component (default: true)
 * @param showFooter - Show footer component (default: true)
 */
interface LayoutProps {
  children: ReactNode;
  logoUrl?: string;
  siteName?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

// ============================================
// 4. NAVIGATION STRUCTURE
// ============================================

/*
Navigation Links (7 public pages):
- Home (/)
- Places (/places)
- Mythology (/mythology)
- Nature (/nature)
- Events (/events)
- Gallery (/gallery)
- Visit Guide (/visit-guide)

Admin (hidden from nav):
- Admin Dashboard (/admin) - Add auth guard

Special:
- 404 Page (*) - Not found fallback
*/

// ============================================
// 5. COLOR PALETTE REFERENCE
// ============================================

/*
PRIMARY COLORS:
- Forest Green: #1B5E20 (forest-800)
- Usage: Headers, buttons, important elements

NEUTRAL COLORS:
- Monsoon Gray: #2D3E50 (monsoon-dark)
- Usage: Text, backgrounds, borders

ACCENT COLORS:
- Mint Green: #10B981 (accent-mint)
  Usage: CTAs, success states, highlights
- Gold: #D4A574 (accent-gold)
  Usage: Highlights, special features
- Brown: #92400E (accent-brown)
  Usage: Nature-themed elements

STATUS COLORS:
- Success: #10B981 (green)
- Warning: #F59E0B (yellow)
- Error: #EF4444 (red)
- Info: #3B82F6 (blue)

SHADES:
- Lighter variants: -50, -100, -200, -300
- Standard: -400, -500, -600
- Darker variants: -700, -800, -900
- Darkest: -950
*/

// ============================================
// 6. RESPONSIVE BREAKPOINTS
// ============================================

/*
Mobile First Approach:

DEFAULT (mobile):
- Single column
- Hamburger menu visible
- Large touch targets

sm (640px):
- Slightly larger text
- 1-2 column layouts

md (768px):
- 2 column layouts
- Hamburger menu optional
- Desktop link visible

lg (1024px):
- 3 column layouts
- Full desktop nav
- Hover effects

xl (1280px):
- Max-width containers
- Spacious layouts

2xl (1536px):
- Premium layouts
- Enhanced spacing
*/

// ============================================
// 7. TAILWIND CLASS EXAMPLES
// ============================================

/*
SPACING:
- p-xs / m-xs = 4px
- p-sm / m-sm = 8px
- p-md / m-md = 16px
- p-lg / m-lg = 24px
- p-xl / m-xl = 32px
- p-2xl / m-2xl = 40px

COLORS:
- bg-forest-800 = Dark green background
- text-monsoon-600 = Gray text
- border-accent-mint = Green border
- hover:bg-forest-600 = Hover state

RESPONSIVE:
- md:grid-cols-2 = 2 columns on tablet
- lg:flex = Flex layout on desktop
- hidden lg:block = Hide on mobile, show on desktop

TYPOGRAPHY:
- text-h1 / text-h2 = Heading sizes
- font-bold / font-semibold = Font weight
- leading-tight / leading-relaxed = Line height

EFFECTS:
- shadow-md / shadow-lg = Drop shadows
- hover:shadow-xl = Hover shadow
- rounded-lg = Border radius
- transition-colors = Smooth color change
- transform hover:scale-105 = Hover scale effect
*/

// ============================================
// 8. CREATING A NEW PAGE
// ============================================

/*
// src/pages/MyPage.tsx
import React from 'react';

export const MyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-forest text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My Page Title
          </h1>
          <p className="text-xl text-forest-100">
            Subtitle or description
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Content cards here */}
        </div>
      </section>
    </div>
  );
};

export default MyPage;
*/

// ============================================
// 9. ADDING PAGE TO ROUTER
// ============================================

/*
// In src/App.tsx
import MyPage from './pages/MyPage';

<Routes>
  {/* ... other routes ... */}
  <Route path="/my-page" element={<MyPage />} />
</Routes>

// In src/constants/navigation.ts
export const NAVIGATION_LINKS = [
  // ... other links ...
  { label: "My Page", href: "/my-page", icon: "📌" },
];
*/

// ============================================
// 10. COMPONENT PATTERNS
// ============================================

/*
CARD COMPONENT PATTERN:
<div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
  <img src={image} alt="title" className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-xl font-bold text-forest-800 mb-3">Title</h3>
    <p className="text-monsoon-600 mb-4">Description</p>
    <button className="px-4 py-2 bg-forest-600 text-white rounded hover:bg-forest-700">
      Learn More
    </button>
  </div>
</div>

BUTTON PATTERN:
<button className="px-6 py-3 bg-gradient-forest text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
  Click Me
</button>

SECTION PATTERN:
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <h2 className="text-3xl md:text-4xl font-bold text-forest-800 mb-8">
    Section Title
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Content here */}
  </div>
</section>

HEADER GRADIENT PATTERN:
<section className="bg-gradient-forest text-white py-12 md:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Title</h1>
    <p className="text-xl text-forest-100">Subtitle</p>
  </div>
</section>
*/

// ============================================
// 11. COMMON TAILWIND PATTERNS
// ============================================

/*
CENTER CONTENT:
<div className="flex items-center justify-center h-screen">
  <div>Centered content</div>
</div>

GRID LAYOUT (Auto-responsive):
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>

FLEX LAYOUT (Responsive row):
<div className="flex flex-col md:flex-row gap-6 items-center">
  <div className="flex-1">Left</div>
  <div className="flex-1">Right</div>
</div>

DROPDOWN MENU:
<div className="relative group">
  <button>Menu</button>
  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded">
    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Item 1</a>
    <a href="#" className="block px-4 py-2 hover:bg-gray-100">Item 2</a>
  </div>
</div>

STICKY HEADER:
<header className="sticky top-0 z-50 bg-white shadow-md">
  {/* Header content */}
</header>

SMOOTH SCROLL:
<html className="scroll-smooth">
  {/* Page content */}
</html>
*/

// ============================================
// 12. ACCESSING API BACKEND
// ============================================

/*
// Hook for fetching data
import { useEffect, useState } from 'react';

export function useApi(endpoint: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1${endpoint}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}

// Usage in component
const { data: places, loading } = useApi('/places');

if (loading) return <div>Loading...</div>;
return (
  <div>
    {places?.map(place => (
      <div key={place.id}>{place.name}</div>
    ))}
  </div>
);
*/

// ============================================
// 13. ENVIRONMENT VARIABLES
// ============================================

/*
// .env
VITE_API_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=30000
VITE_SITE_NAME=Osam Hill & Chichod

// Usage
const apiUrl = import.meta.env.VITE_API_URL;
const siteName = import.meta.env.VITE_SITE_NAME;
*/

// ============================================
// 14. DEPLOYMENT COMMANDS
// ============================================

/*
// Build for production
npm run build

// Output: dist/ folder
// Contains optimized files ready for deployment

// Preview locally
npm run preview

// Deploy to Vercel
vercel deploy

// Deploy to Netlify
netlify deploy --prod --dir=dist

// Deploy to GitHub Pages
npm run build
gh-pages -d dist

// Manual server deployment
scp -r dist/ user@server:/var/www/osam-portal/
*/

// ============================================
// 15. FILE TREE STRUCTURE
// ============================================

/*
osam-ui/
├── src/
│   ├── components/           // Reusable components
│   │   ├── Header.tsx        // Top navigation
│   │   ├── Footer.tsx        // Bottom section
│   │   ├── HamburgerMenu.tsx // Mobile menu toggle
│   │   ├── Layout.tsx        // Page wrapper
│   │   └── index.ts          // Export all
│   │
│   ├── pages/                // Full page components
│   │   ├── HomePage.tsx      // Landing
│   │   ├── PlacesPage.tsx    // Places listing
│   │   └── PageStubs.tsx     // Other pages
│   │
│   ├── constants/            // Constants and config
│   │   └── navigation.ts     // Nav links, footer data
│   │
│   ├── design/               // Design system
│   │   ├── tokens.ts         // Colors, spacing
│   │   ├── layout-system.ts  // Layout utilities
│   │   └── component-specs.ts
│   │
│   ├── App.tsx               // Main app with routes
│   ├── main.tsx              // Entry point
│   └── index.css             // Global styles
│
├── index.html                // HTML template
├── tailwind.config.ts        // Tailwind config
├── tsconfig.json             // TypeScript config
├── vite.config.ts            // Vite config
├── package.json              // Dependencies
│
└── docs/
    ├── LAYOUT_GUIDE.md       // Component docs
    ├── SETUP_GUIDE.md        // Setup instructions
    ├── FRONTEND_SUMMARY.md   // Project overview
    └── QUICK_REFERENCE.md    // This file
*/

// ============================================
// 16. TROUBLESHOOTING QUICK FIXES
// ============================================

/*
Issue: Styles not applied
→ Check tailwind.config.ts content paths

Issue: Routes not working
→ Verify Router wraps Routes in App.tsx

Issue: Images not loading
→ Use correct image paths (public/ or URLs)

Issue: Mobile menu not closing
→ Add onClick handler to close on link click

Issue: Scroll-to-top button not showing
→ Check z-index (should be 40)

Issue: Footer not at bottom
→ Ensure Layout has min-h-screen on wrapper

Issue: Build fails
→ Clear node_modules: rm -rf node_modules
→ Reinstall: npm install

Issue: Port 5173 already in use
→ npm run dev -- --port 3000
*/

// ============================================
// 17. KEYBOARD NAVIGATION
// ============================================

/*
Tab           → Navigate through links
Enter         → Activate buttons/links
Escape        → Close mobile menu
Space         → Activate buttons

Screen Reader Support:
- ARIA labels on icon buttons
- Semantic HTML (nav, section, main)
- Form labels properly associated
- Alt text on images
*/

// ============================================
// 18. LIGHTHOUSE OPTIMIZATION TIPS
// ============================================

/*
Performance:
✓ Code splitting with React.lazy()
✓ Image optimization (width/height)
✓ CSS purging with Tailwind
✓ Minification on build

Accessibility:
✓ Proper heading hierarchy
✓ Color contrast ratios
✓ ARIA labels on interactive
✓ Keyboard navigation

Best Practices:
✓ HTTPS in production
✓ Meta tags on pages
✓ No console errors
✓ Security headers

SEO:
✓ Semantic HTML
✓ Meta descriptions
✓ Open Graph tags
✓ Structured data (schema)
*/

// ============================================
// 19. TESTING COMPONENTS
// ============================================

/*
// Example Jest test
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders header with logo', () => {
  render(<Header siteName="Osam Hill" />);
  const heading = screen.getByText('Osam Hill');
  expect(heading).toBeInTheDocument();
});

// Example integration test
test('mobile menu opens and closes', () => {
  const { getByLabelText } = render(<Header />);
  const button = getByLabelText('Toggle navigation menu');
  
  fireEvent.click(button);
  expect(button).toHaveAttribute('aria-expanded', 'true');
});
*/

// ============================================
// 20. GIT WORKFLOW
// ============================================

/*
// Clone repository
git clone <repo-url>
cd osam-ui

// Install dependencies
npm install

// Create feature branch
git checkout -b feature/new-component

// Make changes and commit
git add src/
git commit -m "feat: add new component"

// Push to repository
git push origin feature/new-component

// Create pull request on GitHub

// After review, merge to main
// Deploy from main branch
*/

// ============================================
// END OF QUICK REFERENCE
// ============================================

export const QUICK_REFERENCE = {
  pages: [
    "/",
    "/places",
    "/mythology",
    "/nature",
    "/events",
    "/gallery",
    "/visit-guide",
    "/admin",
  ],
  commands: {
    dev: "npm run dev",
    build: "npm run build",
    preview: "npm run preview",
    lint: "npm run lint",
  },
  colors: {
    primary: "#1B5E20",
    neutral: "#2D3E50",
    accent: "#10B981",
  },
  documentation: {
    layout: "LAYOUT_GUIDE.md",
    setup: "SETUP_GUIDE.md",
    summary: "FRONTEND_SUMMARY.md",
  },
};
