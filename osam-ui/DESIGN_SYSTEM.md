# OSAM Tourism Portal - Design System

## 1. COLOR PALETTE

### Inspiration
- **Hill Stations**: Misty mountains, crisp air, pristine peaks
- **Monsoon**: Lush vegetation, dark clouds, fresh earth, rain-washed skies
- **Nature**: Forest greens, stone grays, golden sunlight, flowing water

### Primary Colors

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| **Forest Green** | `#1B5E20` | 27, 94, 32 | Primary CTA, navigation, key elements |
| **Emerald** | `#2E8B57` | 46, 139, 87 | Secondary actions, hover states |
| **Sage Green** | `#9CAF88` | 156, 175, 136 | Softer backgrounds, subtle elements |
| **Monsoon Gray** | `#2D3E50` | 45, 62, 80 | Text, dark backgrounds |
| **Mountain Mist** | `#F8FAFC` | 248, 250, 252 | Light backgrounds, cards |
| **Stone Gray** | `#64748B` | 100, 116, 139 | Secondary text, borders |

### Accent Colors

| Color | Hex | RGB | Use Case |
|-------|-----|-----|----------|
| **Sunrise Gold** | `#D4A574` | 212, 165, 116 | Highlights, badges, premium features |
| **Sky Blue** | `#3B82F6` | 59, 130, 246 | Links, secondary CTA, info messages |
| **Soil Brown** | `#92400E` | 146, 64, 14 | Warm accents, earth tones |
| **Fresh Mint** | `#10B981` | 16, 185, 129 | Success, positive actions |

### Status Colors

| Status | Hex | Use Case |
|--------|-----|----------|
| **Success** | `#10B981` | Confirmations, available, open |
| **Warning** | `#F59E0B` | Alerts, pending, caution |
| **Error** | `#EF4444` | Errors, unavailable, closed |
| **Info** | `#3B82F6` | Information, help text |

### Gradient Combinations

```
Forest to Emerald Gradient:
  from: #1B5E20 → to: #2E8B57
  
Monsoon Gradient:
  from: #2D3E50 → to: #3B82F6
  
Golden Hour Gradient:
  from: #D4A574 → to: #92400E
  
Fresh Nature Gradient:
  from: #2E8B57 → to: #10B981
```

---

## 2. TYPOGRAPHY SYSTEM

### Font Stack
```
Font Family: Inter, Segoe UI, Roboto, sans-serif
Backup: system-ui, -apple-system, sans-serif
Serif (headings optional): Merriweather, Georgia, serif
```

### Heading Scale

| Level | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|--------|-------------|----------------|----------|
| **H1** | 3.5rem (56px) | 700 Bold | 1.2 | -0.02em | Page titles, hero sections |
| **H2** | 2.25rem (36px) | 700 Bold | 1.3 | -0.01em | Section headers, main features |
| **H3** | 1.875rem (30px) | 600 Semi-bold | 1.4 | 0em | Sub-sections, card titles |
| **H4** | 1.5rem (24px) | 600 Semi-bold | 1.5 | 0em | Feature titles, modal headers |
| **H5** | 1.25rem (20px) | 500 Medium | 1.5 | 0em | Subsection headers |
| **H6** | 1rem (16px) | 500 Medium | 1.5 | 0em | Small headers, metadata |

### Body Text

| Type | Size | Weight | Line Height | Letter Spacing | Use Case |
|------|------|--------|-------------|----------------|----------|
| **Body Large** | 1.125rem (18px) | 400 Regular | 1.6 | 0em | Main body text, descriptions |
| **Body Regular** | 1rem (16px) | 400 Regular | 1.6 | 0em | Standard body copy, paragraphs |
| **Body Small** | 0.875rem (14px) | 400 Regular | 1.6 | 0.01em | Secondary text, metadata |
| **Caption** | 0.75rem (12px) | 500 Medium | 1.5 | 0.02em | Labels, hints, timestamps |
| **Overline** | 0.75rem (12px) | 600 Semi-bold | 1.4 | 0.15em | Category tags, badges |

### Text Color Hierarchy

```
Primary Text:        #2D3E50 (100% opacity)
Secondary Text:      #64748B (75% opacity)
Tertiary Text:       #94A3B8 (60% opacity)
Disabled Text:       #CBD5E1 (50% opacity)
Contrast (on dark):  #F8FAFC (100% opacity)
```

---

## 3. SPACING & LAYOUT RULES

### Spacing Scale (based on 0.25rem = 4px)

```
xs:  0.25rem (4px)
sm:  0.5rem (8px)
md:  1rem (16px)
lg:  1.5rem (24px)
xl:  2rem (32px)
2xl: 2.5rem (40px)
3xl: 3rem (48px)
4xl: 4rem (64px)
```

### Margin Rules
- **Elements**: Always use multiples of `md` (16px)
- **Top margins**: 1.5x (24px) for vertical breathing room
- **Bottom margins**: Match with top for consistency
- **Horizontal margins**: Auto-center with consistent padding
- **Mobile**: Reduce by 50% (use `lg` instead of `2xl`)

### Padding Rules
- **Cards**: `lg` padding (24px) on desktop, `md` (16px) on mobile
- **Sections**: `4xl` (64px) vertical, `2xl` (40px) horizontal
- **Buttons**: Vertical `md` (16px), Horizontal `lg` (24px)
- **Inputs**: `sm` (8px) on all sides with `md` side padding

### Layout Grid
- **Desktop**: 12-column grid
- **Tablet**: 8-column grid
- **Mobile**: 4-column grid
- **Gap**: `lg` (24px) desktop, `md` (16px) mobile
- **Max-width**: 1440px for content

### Container Rules
```
Container Widths:
  - Full: 100%
  - Desktop: 1440px
  - Large: 1280px
  - Medium: 1024px
  - Small: 768px
```

### Responsive Breakpoints
```
Mobile:       320px → 639px   (sm)
Tablet:       640px → 1023px  (md)
Desktop:      1024px → 1279px (lg)
Large:        1280px → 1535px (xl)
Extra Large:  1536px+         (2xl)
```

---

## 4. BUTTON STYLES

### Button Variants

#### Primary Button (Forest Green)
```
State: Default
  - Background: #1B5E20
  - Text: #F8FAFC
  - Border: none
  - Padding: 12px 24px
  - Font: Body Small, 500 Medium

State: Hover
  - Background: #2E8B57
  - Box Shadow: 0 4px 12px rgba(27, 94, 32, 0.15)
  - Transform: translateY(-2px)

State: Active/Pressed
  - Background: #1B5E20
  - Box Shadow: 0 2px 4px rgba(27, 94, 32, 0.1)
  - Transform: translateY(0px)

State: Disabled
  - Background: #CBD5E1
  - Text: #94A3B8
  - Cursor: not-allowed
```

#### Secondary Button (Outline)
```
State: Default
  - Background: transparent
  - Text: #2E8B57
  - Border: 2px solid #2E8B57
  - Padding: 10px 22px
  - Font: Body Small, 500 Medium

State: Hover
  - Background: rgba(46, 139, 87, 0.05)
  - Border-color: #1B5E20
  - Color: #1B5E20

State: Active/Pressed
  - Background: rgba(46, 139, 87, 0.1)
  - Border-color: #1B5E20
```

#### Ghost Button (Minimal)
```
State: Default
  - Background: transparent
  - Text: #2E8B57
  - Border: none
  - Padding: 12px 16px
  - Font: Body Small, 500 Medium

State: Hover
  - Background: rgba(46, 139, 87, 0.08)
  - Text: #1B5E20

State: Active
  - Background: rgba(46, 139, 87, 0.12)
```

#### Danger Button (Error)
```
State: Default
  - Background: #EF4444
  - Text: #F8FAFC
  - Padding: 12px 24px

State: Hover
  - Background: #DC2626
  - Box Shadow: 0 4px 12px rgba(239, 68, 68, 0.15)
```

### Button Sizes

| Size | Height | Padding | Font Size | Icon Size | Use Case |
|------|--------|---------|-----------|-----------|----------|
| **Large** | 48px | 16px 32px | 16px | 24px | Primary CTAs, hero section |
| **Medium** | 40px | 12px 24px | 14px | 20px | Standard buttons |
| **Small** | 32px | 8px 16px | 12px | 16px | Compact spaces |
| **Icon Only** | 40px | - | - | 20px | Icon buttons, toolbar |

### Button Transitions
```
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 5. CARD STYLES

### Base Card
```
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)
Padding: 24px (desktop), 16px (mobile)
Transition: all 150ms ease

State: Hover
  - Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
  - Transform: translateY(-4px)
  - Border-color: #CBD5E1
```

### Elevated Card
```
Background: #FFFFFF
Border: none
Box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 
            0 10px 13px rgba(0, 0, 0, 0.03)
Border-radius: 16px
Padding: 24px
```

### Featured Card
```
Background: linear-gradient(135deg, #2E8B57 0%, #1B5E20 100%)
Border: none
Border-radius: 16px
Box-shadow: 0 8px 16px rgba(27, 94, 32, 0.2)
Color: #F8FAFC
Padding: 32px
```

### Image Card Structure
```
┌─────────────────────────┐
│                         │
│   Image Container       │  16:9 aspect ratio
│   (with overlay)        │
│                         │
├─────────────────────────┤
│ Title (H4)              │
│ Description (Body Small)│
│ Category Badge          │
│ Action Button           │
└─────────────────────────┘
```

### Card Variants

#### Attraction Card
- Image: 16:9 aspect ratio, 100% width
- Title: H4 weight, 2 lines max
- Description: Body Small, 2 lines max
- Badge: Category + availability status
- CTA: "View Details" button

#### Event Card
- Image: 4:3 aspect ratio
- Date Badge: Sunrise Gold background
- Title: H5
- Location: Caption with icon
- Price (if applicable): Prominent
- CTA: "Learn More" or "Register"

#### Review Card
- Author Avatar: 40px circle
- Author Name: Body Small, bold
- Rating: Star icons
- Review Text: Body Small, 3 lines max
- Date: Caption
- No Image

---

## 6. IMAGE HANDLING RULES

### Aspect Ratios

| Use Case | Ratio | Size (Desktop) | Size (Mobile) |
|----------|-------|----------------|---------------|
| **Hero Banner** | 16:9 | 1440x810px | 375x211px |
| **Section Banner** | 16:9 | 1200x675px | 320x180px |
| **Card Image** | 16:9 | 400x225px | 288x162px |
| **Attraction Thumbnail** | 4:3 | 360x270px | 280x210px |
| **Event Thumbnail** | 3:2 | 400x267px | 320x213px |
| **Avatar** | 1:1 | 64px | 48px |
| **Icon** | 1:1 | 24px-48px | 20px-32px |
| **Gallery Grid** | Mixed | Masonry | Single column |

### Image Overlays

#### Dark Gradient Overlay (for text readability)
```
Gradient: linear-gradient(to top, 
          rgba(45, 62, 80, 0.8) 0%,
          rgba(45, 62, 80, 0.4) 50%,
          transparent 100%)
Applied on: Card images with text overlay
```

#### Hover Overlay
```
Background: rgba(27, 94, 32, 0.1)
Opacity transition: 150ms
Blur (optional): 2px
Used for: Interactive card images
```

#### Light Overlay (for dark images)
```
Background: rgba(248, 250, 252, 0.15)
Used for: Accessibility on dark background images
```

### Image Compression & Optimization
```
Desktop: WebP format, 1200px max width, 85% quality
Mobile: WebP format, 480px max width, 80% quality
Fallback: JPEG format for older browsers
Next.js Image component required: next/image
```

### Image Borders & Corners
```
Standard: border-radius: 8px
Cards: border-radius: 12px
Hero: border-radius: 16px
Avatars: border-radius: 50% (full circle)
```

### Image Spacing
```
- Inside cards: No additional margin
- Between images: gap: 16px (mobile), 24px (desktop)
- Image to text: 16px gap minimum
```

---

## 7. ADDITIONAL COMPONENTS STANDARDS

### Input Fields
```
Border: 1px solid #E2E8F0
Border-radius: 8px
Padding: 12px 16px
Font: Body Regular
Background: #FFFFFF
Min-height: 40px

Focus State:
  - Border-color: #1B5E20
  - Box-shadow: 0 0 0 3px rgba(27, 94, 32, 0.1)
  - Outline: none
```

### Badges & Tags
```
Background: #F0FDF4 (light green)
Color: #1B5E20
Padding: 4px 12px
Border-radius: 20px
Font: Caption, 500 Medium
Display: inline-block
```

### Dividers
```
Color: #E2E8F0
Height: 1px
Margin: 24px 0 (desktop), 16px 0 (mobile)
```

### Shadows Scale
```
Shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05)
Shadow-md:  0 4px 6px rgba(0, 0, 0, 0.07)
Shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.1)
Shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.1)
Shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15)
```

### Transitions
```
Default: 150ms cubic-bezier(0.4, 0, 0.2, 1)
Slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
Fast: 75ms cubic-bezier(0.4, 0, 0.2, 1)
Properties: opacity, transform, color, background-color, border-color
```

---

## 8. MOBILE-FIRST PRINCIPLES

### Mobile Breakpoints & Adjustments

#### Mobile (320px - 639px)
```
Font scales: -2 sizes from desktop
Padding: 16px sections, 12px cards
Touch targets: Minimum 44px height
Spacing: 16px gap
Stack: All grids to 1 column
Header: Fixed, 56px height
```

#### Tablet (640px - 1023px)
```
Font scales: -1 size from desktop
Padding: 20px sections, 16px cards
Grid: 2-column layout
Spacing: 20px gap
```

#### Desktop (1024px+)
```
Full design system applies
Grid: 3-4 columns
Spacing: 24px gap
```

### Touch Interaction Rules
- Minimum target size: 44x44px
- Spacing between targets: 8px minimum
- No hover effects on mobile (use active state)
- Swipe gestures preferred over drag
- Long-press for additional options

---

## 9. ACCESSIBILITY STANDARDS

### Color Contrast
```
WCAG AAA Standards:
- Text on background: 7:1 ratio minimum
- Large text (18px+): 4.5:1 ratio
- UI components: 3:1 ratio for focus states
```

### Focus States
```
Outline: 2px solid #1B5E20
Outline-offset: 2px
Border-radius: matches element
Never remove outline
```

### Typography
```
Minimum font size: 12px (captions only)
Line-height: minimum 1.4
Letter-spacing: avoid negative values
Justify text: Never on web
```

---

## 10. IMPLEMENTATION NOTES

### Tailwind CSS Configuration
```
- Extend with custom colors from this palette
- Use mobile-first approach (no min-width)
- Create utility classes for common patterns
- Use CSS variables for dynamic theming (optional future)
```

### File Structure for Design Assets
```
design/
  ├── colors.ts         (Color values)
  ├── typography.ts     (Font sizes & weights)
  ├── spacing.ts        (Spacing scale)
  ├── shadows.ts        (Shadow definitions)
  └── breakpoints.ts    (Responsive breakpoints)
```

### Performance Considerations
- Optimize all images (WebP with JPEG fallback)
- Use CSS Grid for layouts (no excessive divs)
- Lazy load images below fold
- Minimize animations on mobile devices
- Use system fonts where possible

---

## 11. DESIGN TOKENS REFERENCE

### Quick Reference Table

| Token | Value | Tailwind |
|-------|-------|----------|
| **Primary Color** | #1B5E20 | `green-900` |
| **Secondary Color** | #2E8B57 | `green-700` |
| **Base Spacing** | 16px | `4` |
| **Border Radius** | 12px | `rounded-lg` |
| **Shadow** | 0 4px 6px rgba(0,0,0,0.07) | `shadow-md` |
| **Transition** | 150ms ease | `transition` |

---

This design system ensures consistency, accessibility, and a modern 2025 aesthetic inspired by natural elements. All measurements are mobile-first and scale appropriately for larger screens.
