/**
 * OSAM Tourism Portal - Component Specifications
 * Detailed specifications for each component type
 */

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

export const ButtonSpecifications = {
  heading: "Button Components",
  
  variants: [
    {
      name: "Primary Button",
      description: "Main call-to-action button, forest green background",
      usage: "Form submission, primary navigation, hero section CTA",
      states: {
        default: {
          background: "#1B5E20",
          text: "#F8FAFC",
          border: "none",
          shadow: "none",
        },
        hover: {
          background: "#2E8B57",
          shadow: "0 4px 12px rgba(27, 94, 32, 0.15)",
          transform: "translateY(-2px)",
          transition: "all 150ms ease",
        },
        active: {
          background: "#1B5E20",
          shadow: "0 2px 4px rgba(27, 94, 32, 0.1)",
          transform: "translateY(0)",
        },
        disabled: {
          background: "#CBD5E1",
          text: "#94A3B8",
          cursor: "not-allowed",
          opacity: 0.6,
        },
        focus: {
          outline: "2px solid #1B5E20",
          outlineOffset: "2px",
        },
      },
    },
    {
      name: "Secondary Button",
      description: "Alternative action, outlined with emerald border",
      usage: "Secondary actions, cancel buttons, less emphasis",
      states: {
        default: {
          background: "transparent",
          text: "#2E8B57",
          border: "2px solid #2E8B57",
        },
        hover: {
          background: "rgba(46, 139, 87, 0.05)",
          borderColor: "#1B5E20",
          color: "#1B5E20",
        },
        active: {
          background: "rgba(46, 139, 87, 0.1)",
          borderColor: "#1B5E20",
        },
      },
    },
    {
      name: "Ghost Button",
      description: "Minimal button, text only or light background",
      usage: "Tertiary actions, inline actions, minimal UI",
      states: {
        default: {
          background: "transparent",
          text: "#2E8B57",
          border: "none",
        },
        hover: {
          background: "rgba(46, 139, 87, 0.08)",
          text: "#1B5E20",
          underline: true,
        },
      },
    },
    {
      name: "Danger Button",
      description: "Destructive action, red background",
      usage: "Delete, remove, logout, destructive operations",
      states: {
        default: {
          background: "#EF4444",
          text: "#F8FAFC",
        },
        hover: {
          background: "#DC2626",
          shadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
        },
      },
    },
  ],

  sizes: {
    large: {
      height: "48px",
      padding: "12px 32px",
      fontSize: "16px",
      iconSize: "24px",
      iconGap: "8px",
    },
    medium: {
      height: "40px",
      padding: "10px 24px",
      fontSize: "14px",
      iconSize: "20px",
      iconGap: "6px",
    },
    small: {
      height: "32px",
      padding: "8px 16px",
      fontSize: "12px",
      iconSize: "16px",
      iconGap: "4px",
    },
  },

  guidelines: {
    minTouchTarget: "44px minimum height",
    states: ["default", "hover", "active", "disabled", "focus"],
    transitions: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    accessibility: "WCAG AA compliant colors, visible focus states",
    loading: "Show spinner, disable interaction",
  },
};

// ============================================================================
// CARD COMPONENTS
// ============================================================================

export const CardSpecifications = {
  heading: "Card Components",

  variants: [
    {
      name: "Base Card",
      description: "Standard card with subtle shadow and border",
      structure: {
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      },
      usage: "Content containers, lists, general information",
      hover: {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transform: "translateY(-4px)",
        borderColor: "#CBD5E1",
        transition: "all 150ms ease",
      },
    },
    {
      name: "Elevated Card",
      description: "High emphasis card with prominent shadow",
      structure: {
        background: "#FFFFFF",
        border: "none",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 13px rgba(0, 0, 0, 0.03)",
      },
      usage: "Featured content, highlights, premium items",
    },
    {
      name: "Featured Card",
      description: "Full-gradient card for premium or highlighted content",
      structure: {
        background: "linear-gradient(135deg, #2E8B57 0%, #1B5E20 100%)",
        border: "none",
        borderRadius: "16px",
        padding: "32px",
        color: "#F8FAFC",
        boxShadow: "0 8px 16px rgba(27, 94, 32, 0.2)",
      },
      usage: "Special promotions, seasonal highlights, premium features",
    },
  ],

  layoutPatterns: {
    attractionCard: {
      structure: `
        ┌──────────────────────┐
        │   Image (16:9)       │ ← Hero image with overlay
        │   [Overlay Gradient] │
        │   [Badge + Rating]   │
        ├──────────────────────┤
        │ Title (H4)           │ ← 2 lines max
        │ Description (Body SM)│ ← 2 lines max
        │                      │
        │ [Category] [Rating]  │ ← Badges
        │ [View Details →]     │ ← CTA Button
        └──────────────────────┘
      `,
      imageAspectRatio: "16/9",
      padding: "16px",
      gap: "12px",
    },
    eventCard: {
      structure: `
        ┌──────────────────────┐
        │   Image (4:3)        │ ← Event image
        │   [Date Badge]       │ ← Top-left overlay
        ├──────────────────────┤
        │ Title (H5)           │
        │ Location + Icon      │
        │ Date + Icon          │
        │ Price (if needed)    │
        │ [Register →]         │ ← CTA
        └──────────────────────┘
      `,
      imageAspectRatio: "4/3",
      padding: "16px",
    },
    reviewCard: {
      structure: `
        ┌──────────────────────┐
        │ [Avatar] Name ★★★★★ │
        │ Review text...       │
        │ Review text...       │
        │ (up to 3 lines)      │
        │                      │
        │ Date • Verified      │
        └──────────────────────┘
      `,
      noImage: true,
      padding: "16px",
    },
  },

  spacing: {
    desktopPadding: "24px",
    mobilePadding: "16px",
    imageToTextGap: "16px",
    elementGap: "12px",
  },

  guidelines: {
    imageHandling: "Always use optimized, responsive images",
    corners: "12px for base, 16px for elevated/featured",
    transitions: "150ms ease on all interactive elements",
    responsiveness: "Stack to single column on mobile",
  },
};

// ============================================================================
// IMAGE COMPONENTS
// ============================================================================

export const ImageSpecifications = {
  heading: "Image Components",

  aspectRatios: [
    {
      type: "Hero Banner",
      ratio: "16:9",
      desktopSize: { width: 1440, height: 810 },
      mobileSize: { width: 375, height: 211 },
      useCase: "Full-width page hero sections",
      borderRadius: "16px",
    },
    {
      type: "Section Banner",
      ratio: "16:9",
      desktopSize: { width: 1200, height: 675 },
      mobileSize: { width: 320, height: 180 },
      useCase: "Section backgrounds, category heroes",
    },
    {
      type: "Card Image",
      ratio: "16:9",
      desktopSize: { width: 400, height: 225 },
      mobileSize: { width: 288, height: 162 },
      useCase: "Attraction/event cards, list items",
    },
    {
      type: "Attraction Thumbnail",
      ratio: "4:3",
      size: { width: 360, height: 270 },
      useCase: "Attraction grid items",
    },
    {
      type: "Event Thumbnail",
      ratio: "3:2",
      size: { width: 400, height: 267 },
      useCase: "Event listing items",
    },
    {
      type: "Avatar",
      ratio: "1:1",
      sizes: { large: 64, medium: 48, small: 32 },
      useCase: "User profiles, reviews, comments",
      borderRadius: "50%",
    },
  ],

  overlays: {
    darkGradient: {
      description: "Dark gradient for text readability",
      css: "linear-gradient(to top, rgba(45, 62, 80, 0.8) 0%, rgba(45, 62, 80, 0.4) 50%, transparent 100%)",
      usage: "Text overlaid on images, card images with text",
      opacity: "Decreases from bottom to top",
    },
    hoverOverlay: {
      description: "Light overlay on hover for interactivity feedback",
      css: "rgba(27, 94, 32, 0.1)",
      usage: "Interactive card images, hover states",
      transition: "150ms ease-in-out",
    },
    lightOverlay: {
      description: "Light overlay for accessibility on dark images",
      css: "rgba(248, 250, 252, 0.15)",
      usage: "Dark background images, improved text contrast",
    },
  },

  optimization: {
    formats: {
      primary: "WebP (modern browsers)",
      fallback: "JPEG (older browsers)",
      animated: "GIF or WebP",
    },
    compression: {
      desktop: {
        maxWidth: "1200px",
        quality: 85,
        format: "WebP",
      },
      mobile: {
        maxWidth: "480px",
        quality: 80,
        format: "WebP",
      },
    },
    lazyLoading: "Enable for images below fold",
    srcset: "Include for responsive images",
    alt: "Always provide meaningful alt text",
  },

  spacing: {
    insideCards: "No additional margin",
    betweenImages: "Gap: 16px mobile, 24px desktop",
    imageToText: "16px minimum gap",
    padding: "0 (for full-width), 12px (for constrained)",
  },

  guidelines: {
    useNextImage: "Always use Next.js Image component",
    colorCorrection: "Ensure images match color palette",
    loading: "Use blur placeholder or skeleton",
    caching: "Implement CDN caching for all images",
  },
};

// ============================================================================
// INPUT/FORM COMPONENTS
// ============================================================================

export const InputSpecifications = {
  heading: "Input/Form Components",

  baseInput: {
    structure: {
      border: "1px solid #E2E8F0",
      borderRadius: "8px",
      padding: "12px 16px",
      fontSize: "16px",
      minHeight: "40px",
      fontFamily: "Inter, sans-serif",
      background: "#FFFFFF",
    },
    states: {
      default: {
        borderColor: "#E2E8F0",
        color: "#2D3E50",
        placeholder: "#94A3B8",
      },
      hover: {
        borderColor: "#CBD5E1",
        boxShadow: "none",
      },
      focus: {
        borderColor: "#1B5E20",
        boxShadow: "0 0 0 3px rgba(27, 94, 32, 0.1)",
        outline: "none",
      },
      error: {
        borderColor: "#EF4444",
        boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
        errorText: "#EF4444",
      },
      disabled: {
        background: "#F8FAFC",
        borderColor: "#E2E8F0",
        color: "#94A3B8",
        cursor: "not-allowed",
      },
    },
  },

  labels: {
    position: "Above input (always visible)",
    fontSize: "14px",
    fontWeight: 500,
    color: "#2D3E50",
    marginBottom: "8px",
    required: "Red asterisk (*) for required fields",
  },

  helpText: {
    fontSize: "12px",
    color: "#64748B",
    marginTop: "4px",
    position: "Below input",
  },

  errorMessage: {
    fontSize: "12px",
    color: "#EF4444",
    fontWeight: 500,
    marginTop: "4px",
    position: "Below input",
    icon: "Warning triangle icon",
  },

  guidelines: {
    minTouchHeight: "44px for mobile inputs",
    spacing: "12px between form fields",
    grouping: "Relate fields visually with spacing",
    labels: "Always provide visible labels",
    validation: "Real-time validation for better UX",
  },
};

// ============================================================================
// BADGE/TAG COMPONENTS
// ============================================================================

export const BadgeSpecifications = {
  heading: "Badge/Tag Components",

  styles: {
    default: {
      background: "#F0FDF4",
      color: "#1B5E20",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 500,
      whiteSpace: "nowrap",
    },
    outline: {
      background: "transparent",
      color: "#1B5E20",
      border: "1px solid #1B5E20",
      padding: "4px 12px",
      borderRadius: "20px",
    },
    accent: {
      background: "#FEF3C7",
      color: "#92400E",
    },
    success: {
      background: "#DCFCE7",
      color: "#166534",
    },
    error: {
      background: "#FEE2E2",
      color: "#991B1B",
    },
  },

  usage: {
    category: "Place/event categories",
    status: "Open, closed, available, etc",
    featured: "Premium, featured, new",
    rating: "Review ratings, difficulty levels",
  },

  guidelines: {
    content: "Short text, max 20 characters",
    noWrapping: "Always keep on single line",
    clickable: "Make interactive if filtering",
    nesting: "Never nest badges",
  },
};

// ============================================================================
// EXPORT ALL SPECIFICATIONS
// ============================================================================

export const ComponentSpecifications = {
  ButtonSpecifications,
  CardSpecifications,
  ImageSpecifications,
  InputSpecifications,
  BadgeSpecifications,
};

export default ComponentSpecifications;
