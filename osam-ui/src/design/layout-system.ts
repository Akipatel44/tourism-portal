/**
 * OSAM Tourism Portal - Layout System
 * Grid, responsive patterns, and layout rules
 */

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const ResponsiveBreakpoints = {
  mobile: {
    breakpoint: "320px - 639px",
    collapseAt: 640,
    gridColumns: 4,
    containerPadding: "16px",
    gapSize: "16px",
    fontScale: "reduce by 50%",
    examples: "Phone screens",
  },
  tablet: {
    breakpoint: "640px - 1023px",
    collapseAt: 1024,
    gridColumns: 8,
    containerPadding: "20px",
    gapSize: "20px",
    fontScale: "reduce by 25%",
    examples: "Tablets, large phones",
  },
  desktop: {
    breakpoint: "1024px - 1279px",
    gridColumns: 12,
    containerPadding: "32px",
    gapSize: "24px",
    fontScale: "100%",
    examples: "Laptops, small monitors",
  },
  large: {
    breakpoint: "1280px - 1535px",
    gridColumns: 12,
    containerPadding: "40px",
    gapSize: "24px",
    fontScale: "100%",
    maxWidth: "1440px",
    examples: "Large monitors",
  },
  xl: {
    breakpoint: "1536px+",
    gridColumns: 12,
    containerPadding: "64px",
    gapSize: "24px",
    fontScale: "110%",
    maxWidth: "1440px",
    examples: "Extra-large displays",
  },
};

// ============================================================================
// CSS MEDIA QUERY MIXINS
// ============================================================================

export const MediaQueries = `
/* Mobile First Approach - Base styles are mobile, then override */

/* Tablet and up (640px) */
@media (min-width: 640px) {
  /* Tablet styles here */
}

/* Desktop and up (1024px) */
@media (min-width: 1024px) {
  /* Desktop styles here */
}

/* Large desktop and up (1280px) */
@media (min-width: 1280px) {
  /* Large desktop styles here */
}

/* Extra large and up (1536px) */
@media (min-width: 1536px) {
  /* Extra large styles here */
}

/* Print media */
@media print {
  /* Print styles */
}

/* Dark mode (if implemented) */
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ============================================================================
// GRID SYSTEM
// ============================================================================

export const GridSystem = {
  mobileGrid: {
    columns: "4 columns",
    gap: "16px",
    padding: "16px",
    maxWidth: "100%",
    usage: "320px - 639px screens",
    columnWidth: "calc((100% - 48px) / 4)", // 3 gaps of 16px each
  },

  tabletGrid: {
    columns: "8 columns",
    gap: "20px",
    padding: "20px",
    maxWidth: "100%",
    usage: "640px - 1023px screens",
    columnWidth: "calc((100% - 140px) / 8)", // 7 gaps of 20px each
  },

  desktopGrid: {
    columns: "12 columns",
    gap: "24px",
    padding: "32px",
    maxWidth: "1440px",
    usage: "1024px+ screens",
    columnWidth: "calc((1440px - 24px * 11) / 12)",
  },

  gridExamples: {
    fullWidth: "span 4 columns (mobile), 8 columns (tablet), 12 columns (desktop)",
    twoColumn: "span 2 columns (mobile), 4 columns (tablet), 6 columns (desktop)",
    threeColumn: "span 4 columns (mobile - wrapped), 3 columns (tablet), 4 columns (desktop)",
    fourColumn: "span 2 columns (mobile - wrapped), 2 columns (tablet), 3 columns (desktop)",
  },

  implementation: `
    /* CSS Grid Implementation */
    .container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding: 16px;
    }

    @media (min-width: 640px) {
      .container {
        grid-template-columns: repeat(8, 1fr);
        gap: 20px;
        padding: 20px;
      }
    }

    @media (min-width: 1024px) {
      .container {
        grid-template-columns: repeat(12, 1fr);
        gap: 24px;
        padding: 32px;
        max-width: 1440px;
        margin: 0 auto;
      }
    }

    /* Item Examples */
    .full-width {
      grid-column: span 4;
    }

    @media (min-width: 640px) {
      .full-width {
        grid-column: span 8;
      }
    }

    @media (min-width: 1024px) {
      .full-width {
        grid-column: span 12;
      }
    }
  `,
};

// ============================================================================
// FLEXBOX PATTERNS
// ============================================================================

export const FlexboxPatterns = {
  horizontalStack: {
    name: "Horizontal Stack (Row)",
    css: `
      display: flex;
      flex-direction: row;
      gap: 16px; /* Mobile */
      gap: 24px; /* Desktop */
    `,
    usage: "Navigation, button groups, inline elements",
    wrapping: "flex-wrap: wrap on mobile, nowrap on desktop",
  },

  verticalStack: {
    name: "Vertical Stack (Column)",
    css: `
      display: flex;
      flex-direction: column;
      gap: 12px; /* Between form fields */
      gap: 16px; /* Between sections */
    `,
    usage: "Form layouts, content stacks, lists",
  },

  centerContent: {
    name: "Center Content",
    css: `
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
    `,
    usage: "Icons with text, centered layouts",
  },

  spaceBetween: {
    name: "Space Between",
    css: `
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    `,
    usage: "Header/footer, balanced layouts",
  },

  wrapGrid: {
    name: "Wrap Grid (Grid-like with Flex)",
    css: `
      display: flex;
      flex-wrap: wrap;
      gap: 16px; /* Mobile */
      gap: 24px; /* Desktop */
      justify-content: flex-start;
    `,
    usage: "Product grids, tag clouds, flexible layouts",
  },
};

// ============================================================================
// COMMON LAYOUT PATTERNS
// ============================================================================

export const LayoutPatterns = {
  heroWithContent: {
    name: "Hero with Content Below",
    structure: `
      ┌────────────────────────────┐
      │                            │
      │      Hero Banner           │
      │      (16:9, full width)    │
      │      [Background Image]    │
      │      [Overlay Gradient]    │
      │      [Title + CTA]         │
      │                            │
      └────────────────────────────┘
      ┌────────────────────────────┐
      │                            │
      │   Main Content Grid        │
      │   [Cards / Items]          │
      │                            │
      └────────────────────────────┘
    `,
    responsive: "Hero height: 400px mobile, 600px desktop",
    gridLayout: "2-col mobile (stacked), 3-col tablet, 4-col desktop",
  },

  sidebarLayout: {
    name: "Main Content + Sidebar",
    structure: `
      Desktop View:
      ┌──────────────────────┬──────────┐
      │                      │ Sidebar  │
      │                      │ Widget   │
      │   Main Content       │ Widget   │
      │   (75% width)        │ (25%)    │
      │                      │ Widget   │
      │                      │          │
      └──────────────────────┴──────────┘

      Mobile View (Stacked):
      ┌──────────────┐
      │ Main Content │
      ├──────────────┤
      │ Sidebar      │
      │ Widget       │
      │ Widget       │
      └──────────────┘
    `,
    responsive: "Use CSS Grid with responsive columns",
    columnRatio: "Main: Sidebar = 3:1 desktop, 1:1 mobile",
  },

  cardGrid: {
    name: "Responsive Card Grid",
    mobile: "1 column (full width)",
    tablet: "2 columns (equal width)",
    desktop: "3-4 columns (equal width)",
    gap: "16px mobile, 24px desktop",
    implementation: `
      .card-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }

      @media (min-width: 640px) {
        .card-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
      }

      @media (min-width: 1024px) {
        .card-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
      }

      @media (min-width: 1536px) {
        .card-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    `,
  },

  navigationLayout: {
    name: "Top Navigation + Content",
    structure: `
      ┌────────────────────────────────┐
      │ Logo | Nav Items | CTA | Menu  │ ← Fixed 56px height
      ├────────────────────────────────┤
      │                                │
      │      Main Content Area         │
      │      (pt-56 to avoid overlap)  │
      │                                │
      └────────────────────────────────┘
    `,
    headerHeight: "56px (mobile), 64px (desktop)",
    headerFixed: "position: fixed; top: 0; z-index: 1000",
    responsiveness: "Hamburger menu on mobile, full nav on desktop",
  },

  footerLayout: {
    name: "Content + Footer",
    structure: `
      ┌────────────────────────────────┐
      │                                │
      │      Main Content Area         │
      │      (min-height: 100vh)       │
      │                                │
      ├────────────────────────────────┤
      │         Footer                 │
      │  [Links] [Info] [Socials]      │
      │  [Copyright]                   │
      └────────────────────────────────┘
    `,
    minHeight: "100vh for body to push footer down",
    structure: "4 columns on desktop, 2 columns mobile",
    padding: "48px desktop, 32px mobile",
  },
};

// ============================================================================
// SPACING PATTERNS
// ============================================================================

export const SpacingPatterns = {
  sectionSpacing: {
    mobile: "32px vertical (lg + lg), 16px horizontal (md + md)",
    tablet: "48px vertical (3xl), 24px horizontal (lg + lg)",
    desktop: "64px vertical (4xl), 40px horizontal (2xl + 2xl)",
    description: "Space between major content sections",
  },

  elementSpacing: {
    between: "16px (md) between related elements",
    group: "24px (lg) between element groups",
    section: "48px (3xl) between sections",
  },

  cardInternalSpacing: {
    title: "12px below image",
    description: "8px below title",
    badges: "12px below description",
    button: "16px below badges",
  },

  formSpacing: {
    between_fields: "16px (md) between form fields",
    between_groups: "24px (lg) between field groups",
    label_to_input: "8px (sm) from label to input",
    error_to_input: "4px below input for error text",
  },

  lineLength: {
    optimal: "65-80 characters per line",
    maximum: "100 characters per line",
    minimum: "40 characters per line",
    css: "max-width: 65ch or container limit",
  },
};

// ============================================================================
// CONTAINER SIZING
// ============================================================================

export const ContainerSizes = {
  fluid: {
    width: "100%",
    padding: "16px mobile, 32px+ desktop",
    usage: "Full width backgrounds, heroes",
  },

  fullWidth: {
    maxWidth: "100vw",
    width: "100%",
    usage: "Full viewport width",
  },

  default: {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "0 16px", // Mobile padding
    responsive: "Increases to 40px on desktop",
    usage: "Default page container",
  },

  narrow: {
    maxWidth: "768px",
    margin: "0 auto",
    usage: "Blog posts, forms, single column content",
  },

  compact: {
    maxWidth: "600px",
    margin: "0 auto",
    usage: "Modals, cards, compact content",
  },
};

// ============================================================================
// OVERFLOW & SCROLLING
// ============================================================================

export const OverflowPatterns = {
  horizontalScroll: {
    usage: "Image carousels, category lists",
    css: `
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch; /* Mobile momentum scroll */
    `,
    example: "Gallery, testimonials carousel",
  },

  verticalScroll: {
    usage: "Page content",
    css: `
      overflow-y: auto;
      overflow-x: hidden;
    `,
  },

  textOverflow: {
    singleLine: `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    multiLine: `
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `,
    usage: "Truncate long text",
  },
};

// ============================================================================
// SAFE AREAS (for notched devices)
// ============================================================================

export const SafeAreas = {
  implementation: `
    /* Header with notch consideration */
    header {
      padding-top: max(16px, env(safe-area-inset-top));
    }

    /* Footer with home indicator */
    footer {
      padding-bottom: max(16px, env(safe-area-inset-bottom));
    }

    /* Full bleed backgrounds respecting safe areas */
    .hero {
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }
  `,
  devices: "iPhone notch, Android gesture buttons",
};

// ============================================================================
// PRINT STYLES
// ============================================================================

export const PrintStyles = `
  @media print {
    /* Hide navigation and interactive elements */
    nav, footer, .print-hide {
      display: none;
    }

    /* Ensure good contrast for printing */
    body {
      color: #000;
      background: #fff;
    }

    /* Show URLs for links */
    a[href]:after {
      content: " (" attr(href) ")";
    }

    /* Proper page breaks */
    .page-break {
      page-break-after: always;
    }

    /* Prevent widows and orphans */
    p {
      widows: 3;
      orphans: 3;
    }

    /* Keep images and tables on one page */
    img, table {
      page-break-inside: avoid;
    }
  }
`;

// ============================================================================
// EXPORT ALL LAYOUT SPECIFICATIONS
// ============================================================================

export const LayoutSystem = {
  ResponsiveBreakpoints,
  MediaQueries,
  GridSystem,
  FlexboxPatterns,
  LayoutPatterns,
  SpacingPatterns,
  ContainerSizes,
  OverflowPatterns,
  SafeAreas,
  PrintStyles,
};

export default LayoutSystem;
