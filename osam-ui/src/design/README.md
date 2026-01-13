# OSAM Tourism Portal - Design System Complete Reference

A comprehensive design system for the OSAM Tourism Portal, a modern 2025 tourism website with Tailwind CSS and a mobile-first approach.

## 📚 Design System Files

This design system is split across multiple files for organization and maintainability:

### Core Documentation
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Main design specification document
  - Color palette (20+ colors with hex codes)
  - Typography system (11 font sizes)
  - Spacing & layout rules
  - Button and Card component styles
  - Image handling guidelines
  - Accessibility standards
  - Shadow and transition specifications

### Configuration Files
- **[tailwind.config.ts](./tailwind.config.ts)** - Tailwind CSS configuration
  - Extended theme with custom colors
  - Typography scale mappings
  - Spacing system configuration
  - Custom gradients and animations
  - Plugin setup (@tailwindcss/forms, @tailwindcss/typography)

### Design Tokens (TypeScript)
- **[src/design/tokens.ts](./src/design/tokens.ts)** - Programmatic design constants
  - 500+ lines of exported design tokens
  - Colors, Typography, Spacing constants
  - Component-specific tokens (Button, Card, Image, Input)
  - Breakpoints and Z-index values

- **[src/design/component-specs.ts](./src/design/component-specs.ts)** - Component specifications
  - Button component variants and states
  - Card component layouts
  - Image aspect ratios and overlays
  - Form input specifications
  - Badge/Tag styles

- **[src/design/layout-system.ts](./src/design/layout-system.ts)** - Layout patterns
  - Responsive grid system (4/8/12 columns)
  - Flexbox patterns
  - Common layout patterns (Hero, Sidebar, Grid)
  - Container sizing rules
  - Spacing patterns

- **[src/design/accessibility.ts](./src/design/accessibility.ts)** - Accessibility guidelines
  - WCAG 2.1 AA compliance requirements
  - Contrast specifications
  - Keyboard navigation guidelines
  - Screen reader support
  - Color blindness considerations

## 🎨 Color Palette

### Primary Colors (Forest Theme)
- **Forest Green #1B5E20** - Primary brand color, call-to-action
- **Emerald #2E8B57** - Secondary green, interactive states
- **Sage Green #9CAF88** - Light accent, disabled states

### Accent Colors (Tourism Theme)
- **Sunrise Gold #D4A574** - Luxury, special offers
- **Fresh Mint #10B981** - Success, positive actions
- **Soil Brown #92400E** - Warm earth tones
- **Sky Blue #3B82F6** - Information, links

### Neutral & Monsoon Colors
- **Mountain Mist #F8FAFC** - Light backgrounds
- **Stone Gray #64748B** - Secondary text
- **Monsoon Gray #2D3E50** - Dark text, headings

### Status Colors
- **Success Green #10B981**
- **Warning Amber #F59E0B**
- **Error Red #DC2626**
- **Info Blue #3B82F6**

## 🔤 Typography

### Font Family
- **Primary (Headings):** "Poppins", sans-serif - Modern, bold
- **Secondary (Body):** "Inter", sans-serif - Clean, readable
- **Monospace (Code):** "Fira Code", monospace - Technical content

### Font Sizes & Hierarchy
| Size | Desktop | Mobile | Weight | Usage |
|------|---------|--------|--------|-------|
| h1 | 56px | 40px | 700 | Page titles |
| h2 | 44px | 32px | 700 | Section titles |
| h3 | 32px | 24px | 700 | Subsection titles |
| h4 | 24px | 20px | 600 | Card titles |
| h5 | 20px | 18px | 600 | Small headings |
| h6 | 16px | 14px | 600 | Mini headings |
| body-lg | 18px | 16px | 400 | Large body text |
| body-md | 16px | 14px | 400 | Standard body text |
| body-sm | 14px | 12px | 400 | Small body text |
| caption | 12px | 11px | 500 | Captions, labels |
| overline | 11px | 10px | 600 | Small uppercase labels |

### Line Heights
- Headings: 1.2 (tight)
- Body: 1.5-1.6 (readable)
- Captions: 1.4 (compact)

## 📏 Spacing System

**8px-based scale** for consistency:

```
xs:   4px    | Single pixel adjustment
sm:   8px    | Smallest spacing
md:  16px    | Default between elements
lg:  24px    | Section spacing
xl:  32px    | Large spacing
2xl: 40px    | Extra large
3xl: 48px    | Section breaks
4xl: 64px    | Major sections
```

### Usage Guidelines
- Between form fields: 16px (md)
- Between sections: 48px (3xl)
- Card internal padding: 16px
- Page padding: 16px (mobile), 32px+ (desktop)

## 📱 Responsive Breakpoints

| Breakpoint | Width | Columns | Usage |
|-----------|-------|---------|-------|
| Mobile | 320px - 639px | 4 | Phones |
| Tablet | 640px - 1023px | 8 | Tablets, large phones |
| Desktop | 1024px - 1279px | 12 | Laptops |
| Large | 1280px - 1535px | 12 | Large monitors |
| XL | 1536px+ | 12 | Extra-large displays |

**Mobile-first approach:** Start with mobile styles, add `@media (min-width: 640px)` for larger screens.

## 🔘 Button Component

### Variants
1. **Primary** - Main call-to-action (Forest Green)
2. **Secondary** - Alternative action (Outline)
3. **Ghost** - Minimal style (Text only)
4. **Danger** - Destructive action (Red)

### States
- Default (resting)
- Hover (mouse over)
- Active (pressed)
- Disabled (inactive)
- Focus (keyboard navigation)

### Sizes
- **Large** - 56px height, 24px font
- **Medium** - 44px height, 16px font (default)
- **Small** - 36px height, 14px font

## 🎯 Card Component

### Variants
1. **Base** - 12px border radius, white background
2. **Elevated** - 16px radius, subtle shadow
3. **Featured** - 16px radius, gradient accent border

### Layouts
- **Attraction Card** - Image (16:9) + Title + Description + Badge + CTA
- **Event Card** - Image + Title + Date/Time + Location + Buttons
- **Review Card** - Avatar + Name + Rating + Review text + Date

## 🖼️ Image Guidelines

### Aspect Ratios
- **Hero images:** 16:9 (full width banners)
- **Card images:** 16:9 (destination cards)
- **Attraction images:** 4:3 (detail pages)
- **Event images:** 3:2 (event listings)
- **Avatar images:** 1:1 (user profiles)
- **Icon images:** 1:1 (small graphics)

### Optimization
- Use Next.js `Image` component for all images
- Responsive sizes: srcSet for different screen sizes
- Lazy loading for below-fold images
- WebP format with fallback
- Alt text for all images (accessibility)

### Overlays
- Dark gradient overlay for text on images
- Light overlay for accessibility
- Hover overlay for interactive images

## ✅ Accessibility (WCAG 2.1 AA)

### Key Requirements
- **Color Contrast:** 4.5:1 for text, 3:1 for UI components
- **Keyboard Navigation:** All functionality accessible via Tab key
- **Focus Indicators:** 3px solid #1B5E20 outline with 2px offset
- **Semantic HTML:** Use `<button>`, `<a>`, `<nav>`, not divs
- **Alt Text:** All images must have descriptive alt text
- **Form Labels:** Every input must have associated label
- **Heading Hierarchy:** One h1 per page, h1→h2→h3 (no skipping)

### Testing Tools
- Axe DevTools (browser extension)
- NVDA/VoiceOver (screen readers)
- WebAIM Contrast Checker
- Lighthouse (automated testing)

## 🚀 Quick Start Guide

### For Component Developers

1. **Import design tokens:**
   ```typescript
   import { Colors, Typography, Spacing, ButtonTokens } from '@/design/tokens';
   ```

2. **Use Tailwind utilities with custom colors:**
   ```jsx
   <button className={`
     px-6 py-3
     bg-forest-600 hover:bg-forest-700
     text-white font-semibold
     rounded-md
     transition-colors
     focus-visible:outline-forest-600 focus-visible:outline-offset-2
   `}>
     Click me
   </button>
   ```

3. **Build responsive layouts:**
   ```jsx
   <div className="grid grid-cols-4 gap-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-6">
     {/* Mobile: 4 cols, Tablet: 8 cols, Desktop: 12 cols */}
   </div>
   ```

4. **Ensure accessibility:**
   - Use semantic HTML tags
   - Include aria-label for icon-only buttons
   - Test with keyboard navigation (Tab key)
   - Check contrast ratios

### File Structure
```
src/
├── design/
│   ├── tokens.ts              # Design token exports
│   ├── component-specs.ts     # Component specifications
│   ├── layout-system.ts       # Layout patterns
│   ├── accessibility.ts       # Accessibility guidelines
│   └── README.md              # This file
├── components/
│   ├── Button.tsx             # Button component (uses tokens)
│   ├── Card.tsx               # Card component
│   └── ...
└── app/
    ├── page.tsx               # Home page
    └── ...
```

## 📊 Tailwind Configuration

All custom colors, typography, and spacing are configured in `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        forest: { /* custom green scale */ },
        monsoon: { /* custom gray scale */ },
        // ... more colors
      },
      // ... more custom theme values
    }
  }
}
```

## 🎓 Design Principles

1. **Nature-Inspired:** Colors reflect hill stations, monsoons, and nature
2. **Modern:** Clean, contemporary aesthetic for 2025
3. **Inclusive:** Accessible to all users (WCAG 2.1 AA)
4. **Mobile-First:** Optimized for phones, enhanced for larger screens
5. **Consistent:** All components use the same tokens and patterns
6. **Performant:** Optimized images, efficient CSS, fast interactions

## 📝 Documentation

- See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete design specifications
- See [src/design/tokens.ts](./src/design/tokens.ts) for programmatic access to design values
- See [src/design/component-specs.ts](./src/design/component-specs.ts) for component details
- See [src/design/layout-system.ts](./src/design/layout-system.ts) for layout patterns
- See [src/design/accessibility.ts](./src/design/accessibility.ts) for accessibility requirements

## 🔄 Design System Updates

When updating the design system:

1. Update the relevant file (tokens.ts, tailwind.config.ts, etc.)
2. Verify Tailwind config matches tokens
3. Test components with updated values
4. Document changes in this README
5. Update affected component implementations

## 📞 Questions & Discussions

For design system questions, refer to the comprehensive specifications:
- Visual styling → DESIGN_SYSTEM.md
- Programmatic values → tokens.ts
- Component layouts → component-specs.ts
- Responsive behavior → layout-system.ts
- Accessibility → accessibility.ts

---

**Last Updated:** 2025
**Status:** Complete - Ready for React Component Development
**Compliance:** WCAG 2.1 AA Target
**Technology:** Tailwind CSS + TypeScript + Next.js
