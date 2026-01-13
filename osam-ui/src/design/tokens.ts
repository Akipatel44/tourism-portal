/**
 * OSAM Tourism Portal - Design Tokens
 * Centralized design token definitions for use in components
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const Colors = {
  // Primary - Forest Green Palette
  primary: {
    50: "#F0FDF4",
    100: "#E0FBE8",
    200: "#C7F0D8",
    300: "#9CAF88", // Sage Green
    400: "#5BA96E",
    500: "#2E8B57", // Emerald
    600: "#2E8B57",
    700: "#2E8B57",
    800: "#1B5E20", // Forest Green (main)
    900: "#0B4620",
    950: "#051609",
  },

  // Neutral - Monsoon Colors
  neutral: {
    50: "#F8FAFC", // Mountain Mist (light background)
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B", // Stone Gray
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },

  // Dark Monsoon
  dark: "#2D3E50",

  // Accents
  accent: {
    gold: "#D4A574",    // Sunrise Gold
    mint: "#10B981",    // Fresh Mint
    brown: "#92400E",   // Soil Brown
    sky: "#3B82F6",     // Sky Blue
  },

  // Status
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },

  // Semantic
  background: {
    default: "#FFFFFF",
    light: "#F8FAFC",
    dark: "#2D3E50",
  },

  text: {
    primary: "#2D3E50",
    secondary: "#64748B",
    tertiary: "#94A3B8",
    disabled: "#CBD5E1",
    onDark: "#F8FAFC",
  },

  border: "#E2E8F0",
};

// ============================================================================
// TYPOGRAPHY TOKENS
// ============================================================================

export const Typography = {
  // Font Families
  fontFamily: {
    sans: "Inter, Segoe UI, Roboto, system-ui, -apple-system, sans-serif",
    serif: "Merriweather, Georgia, serif",
  },

  // Font Sizes (with line-height and letter-spacing)
  fontSize: {
    h1: { size: "56px", lineHeight: 1.2, letterSpacing: "-0.02em", weight: 700 },
    h2: { size: "36px", lineHeight: 1.3, letterSpacing: "-0.01em", weight: 700 },
    h3: { size: "30px", lineHeight: 1.4, letterSpacing: "0", weight: 600 },
    h4: { size: "24px", lineHeight: 1.5, letterSpacing: "0", weight: 600 },
    h5: { size: "20px", lineHeight: 1.5, letterSpacing: "0", weight: 500 },
    h6: { size: "16px", lineHeight: 1.5, letterSpacing: "0", weight: 500 },
    bodyLg: { size: "18px", lineHeight: 1.6, letterSpacing: "0", weight: 400 },
    bodyMd: { size: "16px", lineHeight: 1.6, letterSpacing: "0", weight: 400 },
    bodySm: { size: "14px", lineHeight: 1.6, letterSpacing: "0.01em", weight: 400 },
    caption: { size: "12px", lineHeight: 1.5, letterSpacing: "0.02em", weight: 500 },
    overline: { size: "12px", lineHeight: 1.4, letterSpacing: "0.15em", weight: 600 },
  },

  // Font Weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// ============================================================================
// SPACING TOKENS
// ============================================================================

export const Spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "40px",
  "3xl": "48px",
  "4xl": "64px",
};

export const Padding = {
  cardDesktop: "24px",
  cardMobile: "16px",
  sectionDesktop: { vertical: "64px", horizontal: "40px" },
  sectionMobile: { vertical: "32px", horizontal: "16px" },
  buttonVertical: "12px",
  buttonHorizontal: "24px",
  inputVertical: "8px",
  inputHorizontal: "12px",
};

export const Margin = {
  elementDefault: "16px",
  elementVertical: "24px",
  sectionVertical: "48px",
  elementMobileVertical: "8px",
  sectionMobileVertical: "24px",
};

export const Gap = {
  desktop: "24px",
  tablet: "20px",
  mobile: "16px",
};

// ============================================================================
// BORDER & RADIUS TOKENS
// ============================================================================

export const BorderRadius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
};

export const Border = {
  default: "1px solid #E2E8F0",
  focus: "2px solid #1B5E20",
  error: "1px solid #EF4444",
};

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const Shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px rgba(0, 0, 0, 0.07)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
  "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
  
  // Component-specific shadows
  card: "0 1px 3px rgba(0, 0, 0, 0.05)",
  cardHover: "0 4px 12px rgba(27, 94, 32, 0.15)",
  elevated: "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 13px rgba(0, 0, 0, 0.03)",
  featured: "0 8px 16px rgba(27, 94, 32, 0.2)",
  button: "0 4px 12px rgba(27, 94, 32, 0.15)",
};

// ============================================================================
// TRANSITION TOKENS
// ============================================================================

export const Transitions = {
  fast: "75ms cubic-bezier(0.4, 0, 0.2, 1)",
  default: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  
  // Property-specific
  duration: {
    fast: "75ms",
    default: "150ms",
    slow: "300ms",
  },
  
  easing: {
    ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// ============================================================================
// BUTTON TOKENS
// ============================================================================

export const ButtonTokens = {
  // Sizes
  sizes: {
    large: {
      height: "48px",
      paddingVertical: "12px",
      paddingHorizontal: "32px",
      fontSize: "16px",
      iconSize: "24px",
    },
    medium: {
      height: "40px",
      paddingVertical: "10px",
      paddingHorizontal: "24px",
      fontSize: "14px",
      iconSize: "20px",
    },
    small: {
      height: "32px",
      paddingVertical: "8px",
      paddingHorizontal: "16px",
      fontSize: "12px",
      iconSize: "16px",
    },
  },

  // Primary Button
  primary: {
    default: {
      background: "#1B5E20",
      color: "#F8FAFC",
      border: "none",
    },
    hover: {
      background: "#2E8B57",
      boxShadow: Shadows.cardHover,
      transform: "translateY(-2px)",
    },
    active: {
      background: "#1B5E20",
      boxShadow: "0 2px 4px rgba(27, 94, 32, 0.1)",
      transform: "translateY(0px)",
    },
    disabled: {
      background: "#CBD5E1",
      color: "#94A3B8",
      cursor: "not-allowed",
    },
  },

  // Secondary Button
  secondary: {
    default: {
      background: "transparent",
      color: "#2E8B57",
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

  // Ghost Button
  ghost: {
    default: {
      background: "transparent",
      color: "#2E8B57",
      border: "none",
    },
    hover: {
      background: "rgba(46, 139, 87, 0.08)",
      color: "#1B5E20",
    },
  },

  // Danger Button
  danger: {
    default: {
      background: "#EF4444",
      color: "#F8FAFC",
    },
    hover: {
      background: "#DC2626",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
    },
  },
};

// ============================================================================
// CARD TOKENS
// ============================================================================

export const CardTokens = {
  // Base Card
  base: {
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow: Shadows.sm,
    padding: Padding.cardDesktop,
  },

  // Elevated Card
  elevated: {
    background: "#FFFFFF",
    border: "none",
    borderRadius: "16px",
    boxShadow: Shadows.elevated,
    padding: "24px",
  },

  // Featured Card
  featured: {
    background: "linear-gradient(135deg, #2E8B57 0%, #1B5E20 100%)",
    border: "none",
    borderRadius: "16px",
    boxShadow: Shadows.featured,
    color: "#F8FAFC",
    padding: "32px",
  },

  // Hover State
  hover: {
    boxShadow: Shadows.lg,
    transform: "translateY(-4px)",
    borderColor: "#CBD5E1",
  },
};

// ============================================================================
// IMAGE TOKENS
// ============================================================================

export const ImageTokens = {
  // Aspect Ratios
  aspectRatios: {
    heroBanner: "16/9",
    sectionBanner: "16/9",
    cardImage: "16/9",
    attractionThumbnail: "4/3",
    eventThumbnail: "3/2",
    avatar: "1/1",
  },

  // Sizes
  sizes: {
    heroBannerDesktop: { width: 1440, height: 810 },
    heroBannerMobile: { width: 375, height: 211 },
    cardImageDesktop: { width: 400, height: 225 },
    cardImageMobile: { width: 288, height: 162 },
    attractionThumbnail: { width: 360, height: 270 },
    avatarLarge: { width: 64, height: 64 },
    avatarSmall: { width: 48, height: 48 },
  },

  // Overlays
  overlays: {
    darkGradient: "linear-gradient(to top, rgba(45, 62, 80, 0.8) 0%, rgba(45, 62, 80, 0.4) 50%, transparent 100%)",
    hoverOverlay: "rgba(27, 94, 32, 0.1)",
    lightOverlay: "rgba(248, 250, 252, 0.15)",
  },

  // Border Radius
  borderRadius: {
    standard: "8px",
    card: "12px",
    hero: "16px",
    avatar: "50%",
  },

  // Compression Settings
  compression: {
    quality: {
      desktop: 85,
      mobile: 80,
    },
    maxWidth: {
      desktop: 1200,
      mobile: 480,
    },
  },
};

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const Breakpoints = {
  mobile: "320px",
  mobileLarge: "480px",
  tablet: "640px",
  desktop: "1024px",
  desktopLarge: "1280px",
  xl: "1536px",

  // For media queries
  screens: {
    sm: "320px",
    md: "640px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

// ============================================================================
// Z-INDEX TOKENS
// ============================================================================

export const ZIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// ============================================================================
// ACCESSIBILITY TOKENS
// ============================================================================

export const Accessibility = {
  focusOutline: "2px solid #1B5E20",
  focusOutlineOffset: "2px",

  // Color Contrast Ratios (WCAG AAA)
  colorContrast: {
    textOnBackground: 7, // 7:1 minimum
    largeText: 4.5,      // 4.5:1 minimum
    uiComponents: 3,     // 3:1 minimum
  },

  minTouchTarget: "44px",
  minTouchSpacing: "8px",
  minFontSize: "12px",
  minLineHeight: 1.4,
};

// ============================================================================
// COMPONENT-SPECIFIC TOKENS
// ============================================================================

export const InputTokens = {
  border: "1px solid #E2E8F0",
  borderRadius: "8px",
  padding: "12px 16px",
  fontSize: "16px",
  minHeight: "40px",
  focusBorder: "1px solid #1B5E20",
  focusBoxShadow: "0 0 0 3px rgba(27, 94, 32, 0.1)",
};

export const BadgeTokens = {
  background: "#F0FDF4",
  color: "#1B5E20",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: 500,
};

export const DividerTokens = {
  color: "#E2E8F0",
  height: "1px",
  margin: `${Margin.elementVertical} 0`,
};

// ============================================================================
// EXPORT ALL TOKENS
// ============================================================================

export const DesignTokens = {
  Colors,
  Typography,
  Spacing,
  Padding,
  Margin,
  Gap,
  BorderRadius,
  Border,
  Shadows,
  Transitions,
  ButtonTokens,
  CardTokens,
  ImageTokens,
  Breakpoints,
  ZIndex,
  Accessibility,
  InputTokens,
  BadgeTokens,
  DividerTokens,
};

export default DesignTokens;
