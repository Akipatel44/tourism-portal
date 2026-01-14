# Osam Tourism Portal - Frontend Setup Guide

## Project Overview

A modern tourism website for Osam Hill & Chichod featuring:
- Responsive React + TypeScript frontend
- Tailwind CSS design system
- Global layout components (Header, Footer, Navigation)
- 7 public pages + 1 admin page
- Mobile-first responsive design
- Accessibility compliance (WCAG AA)

## Quick Start

### Prerequisites

- Node.js 16+ (check: `node --version`)
- npm 8+ (check: `npm --version`)
- Git

### Installation Steps

#### 1. Navigate to Project Directory
```bash
cd d:\PROJECT\osam-ui
```

#### 2. Install Dependencies
```bash
npm install
```

This installs:
- `react` - UI library
- `react-router-dom` - Routing
- `tailwindcss` - Utility-first CSS
- `typescript` - Type safety
- Build tools and development server

#### 3. Install Additional Packages
```bash
npm install --save-dev tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 4. Configure Tailwind
Copy our design tokens to `tailwind.config.ts`:
- Forest color palette
- Custom typography scale
- Spacing system
- Animations and gradients

#### 5. Create Entry Point
**File:** `src/main.tsx`
```typescript
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

#### 6. Create Global Styles
**File:** `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global styles */
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-monsoon-50;
}
```

#### 7. Create HTML Entry Point
**File:** `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Osam Hill & Chichod - Sacred Heritage Tourism</title>
    <meta name="description" content="Explore the sacred heritage and natural beauty of Osam Hill & Chichod" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Development Server

```bash
# Start development server
npm run dev

# Server runs on: http://localhost:5173
# Press 'q' to quit
```

## Project Structure

```
osam-ui/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Top navigation header
│   │   ├── HamburgerMenu.tsx       # Mobile menu toggle
│   │   ├── Footer.tsx              # Global footer
│   │   ├── Layout.tsx              # Layout wrapper
│   │   └── index.ts                # Component exports
│   ├── pages/
│   │   ├── HomePage.tsx            # Landing page
│   │   ├── PlacesPage.tsx          # Places listing
│   │   └── PageStubs.tsx           # Other pages
│   ├── constants/
│   │   └── navigation.ts           # Nav links & footer data
│   ├── design/
│   │   ├── tokens.ts               # Design tokens
│   │   └── component-specs.ts      # Component specs
│   ├── App.tsx                     # Main app with routing
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
├── package.json                    # Dependencies
├── LAYOUT_GUIDE.md                 # Component documentation
└── SETUP_GUIDE.md                  # This file
```

## Key Technologies

### React 18
- Component-based UI
- Hooks for state management
- Functional components

### TypeScript
- Type safety
- Better IDE support
- Self-documenting code

### React Router v6
- Client-side routing
- Nested routes
- Dynamic route parameters

### Tailwind CSS
- Utility-first CSS
- Design tokens system
- Responsive design
- Animation utilities

## Pages Overview

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Landing page with hero and featured content |
| Places | `/places` | Showcase sacred sites and landmarks |
| Mythology | `/mythology` | Legends and ancient stories |
| Nature | `/nature` | Flora, fauna, and ecosystems |
| Events | `/events` | Festivals and upcoming events |
| Gallery | `/gallery` | Photo gallery |
| Visit Guide | `/visit-guide` | Travel information and planning |
| Admin | `/admin` | Admin dashboard (hidden from nav) |
| 404 | `*` | Not found page |

## Component Usage

### Using Layout Wrapper
```jsx
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Layout 
      logoUrl="path/to/logo.png"
      siteName="Osam Hill & Chichod"
    >
      <HomePage />
    </Layout>
  );
}
```

### Using Header Component
```jsx
import Header from './components/Header';

<Header 
  logoUrl="path/to/logo.png"
  siteName="Osam Hill & Chichod"
/>
```

### Using Footer Component
```jsx
import Footer from './components/Footer';

<Footer 
  logoUrl="path/to/logo.png"
  siteName="Osam Hill & Chichod"
/>
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter (if configured)
npm run lint

# Format code (if prettier configured)
npm run format
```

## Building for Production

```bash
# Create optimized build
npm run build

# Output: dist/ folder
# Files ready for deployment
```

The build includes:
- Minified JavaScript
- Optimized CSS
- Asset optimization
- Source maps for debugging

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel login
vercel deploy
```

### Option 2: Netlify
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages
```bash
# Update vite.config.ts
export default {
  base: '/osam-tourism/',
}

npm run build
npm i gh-pages
npx gh-pages -d dist
```

### Option 4: Traditional Web Server
```bash
# Copy dist/ folder to your server's web root
scp -r dist/ user@server:/var/www/osam-portal/
```

## Environment Variables

Create `.env` file for environment-specific settings:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api/v1
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NEWSLETTER=true

# Social Links
VITE_FACEBOOK_URL=https://facebook.com/osamhill
VITE_INSTAGRAM_URL=https://instagram.com/osamhill
```

Usage in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Styling Guide

### Using Tailwind Classes

```jsx
// Text styling
<h1 className="text-h1 font-bold text-forest-800">Heading</h1>

// Spacing
<div className="p-lg mb-xl">Content</div>

// Colors
<button className="bg-forest-600 text-white hover:bg-forest-700">
  Click Me
</button>

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

// Animations
<div className="animate-fade-in hover:shadow-lg transition-shadow">
  Animated content
</div>
```

### Custom Styles (if needed)

Always prefer Tailwind utilities first. If custom CSS is absolutely needed:

```css
/* src/components/Custom.module.css */
.customElement {
  @apply p-lg rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow;
}
```

## API Integration

### Fetching Data

```typescript
// src/hooks/useFetch.ts
import { useEffect, useState } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

### Using in Components

```typescript
import { useFetch } from '../hooks/useFetch';

export function PlacesPage() {
  const { data: places, loading, error } = useFetch('/api/v1/places');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {places?.map(place => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
}
```

## Authentication Setup

### Adding Protected Routes

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route 
    path="/admin" 
    element={<ProtectedRoute><AdminPage /></ProtectedRoute>} 
  />
</Routes>
```

### JWT Token Management

```typescript
// src/utils/auth.ts
export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// Using in API calls
const headers = {
  'Authorization': `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
};
```

## Troubleshooting

### Issue: Tailwind styles not applied
**Solution:** Ensure `tailwind.config.ts` content paths are correct:
```typescript
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./index.html",
],
```

### Issue: Routes not working
**Solution:** Verify App.tsx has Router wrapping:
```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<Router>
  <Routes>
    {/* your routes */}
  </Routes>
</Router>
```

### Issue: Images not loading
**Solution:** Use correct paths:
```jsx
// ✅ Correct
<img src={logoUrl} alt="Logo" />

// ❌ Wrong
<img src="../path/to/image.png" alt="Logo" />
```

## Performance Tips

1. **Code Splitting**
```typescript
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

<Suspense fallback={<Loading />}>
  <AdminPage />
</Suspense>
```

2. **Image Optimization**
```jsx
<img 
  src={imageUrl} 
  alt="Description"
  loading="lazy"
  width="400"
  height="300"
/>
```

3. **Memoization**
```typescript
const PlaceCard = React.memo(({ place }) => {
  return <div>{place.name}</div>;
});
```

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Start dev server: `npm run dev`
3. ✅ Customize logo and colors
4. ✅ Add API integration
5. ✅ Build for production: `npm run build`
6. ✅ Deploy to hosting platform

## Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)

## Support & Questions

- Check LAYOUT_GUIDE.md for component details
- Review example components in src/components/
- Read inline code comments
- Check the API backend documentation

---

**Happy Coding! 🎉**

Last Updated: January 14, 2026
Version: 1.0.0
