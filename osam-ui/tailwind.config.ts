/**
 * OSAM Tourism Portal - Tailwind CSS Configuration
 * Design System Implementation
 */

export const tailwindConfig = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Color Palette
      colors: {
        // Primary Colors - Forest & Nature
        forest: {
          50: "#F0FDF4",
          100: "#E0FBE8",
          200: "#C7F0D8",
          300: "#9CAF88", // Sage Green
          400: "#5BA96E",
          500: "#2E8B57", // Emerald
          600: "#2E8B57",
          700: "#2E8B57",
          800: "#1B5E20", // Forest Green (primary)
          900: "#0B4620",
          950: "#051609",
        },
        // Neutral - Monsoon Colors
        monsoon: {
          50: "#F8FAFC", // Mountain Mist
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
          dark: "#2D3E50", // Monsoon Gray
        },
        // Accent Colors
        accent: {
          gold: "#D4A574", // Sunrise Gold
          mint: "#10B981", // Fresh Mint
          brown: "#92400E", // Soil Brown
          sky: "#3B82F6",   // Sky Blue
        },
        // Status Colors
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
      },

      // Typography
      fontSize: {
        // Headings
        h1: ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["1.875rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        h4: ["1.5rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "600" }],
        h5: ["1.25rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "500" }],
        h6: ["1rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "500" }],
        // Body
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-md": ["1rem", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.01em" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "500" }],
        "overline": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.15em", fontWeight: "600" }],
      },

      // Spacing Scale (base 4px)
      spacing: {
        xs: "0.25rem",   // 4px
        sm: "0.5rem",    // 8px
        md: "1rem",      // 16px
        lg: "1.5rem",    // 24px
        xl: "2rem",      // 32px
        "2xl": "2.5rem", // 40px
        "3xl": "3rem",   // 48px
        "4xl": "4rem",   // 64px
      },

      // Border Radius
      borderRadius: {
        sm: "0.5rem",   // 8px
        md: "0.75rem",  // 12px
        lg: "1rem",     // 16px
        xl: "1.5rem",   // 24px
        full: "9999px",
      },

      // Box Shadows
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.07)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
        // Custom shadows for nature theme
        "card-hover": "0 4px 12px rgba(27, 94, 32, 0.15)",
        "featured": "0 8px 16px rgba(27, 94, 32, 0.2)",
      },

      // Transitions
      transitionDuration: {
        fast: "75ms",
        DEFAULT: "150ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      // Gradients
      backgroundImage: {
        "gradient-forest": "linear-gradient(135deg, #1B5E20 0%, #2E8B57 100%)",
        "gradient-monsoon": "linear-gradient(135deg, #2D3E50 0%, #3B82F6 100%)",
        "gradient-golden": "linear-gradient(135deg, #D4A574 0%, #92400E 100%)",
        "gradient-nature": "linear-gradient(135deg, #2E8B57 0%, #10B981 100%)",
        "gradient-overlay-dark": 
          "linear-gradient(to top, rgba(45, 62, 80, 0.8) 0%, rgba(45, 62, 80, 0.4) 50%, transparent 100%)",
      },

      // Container
      maxWidth: {
        container: "1440px",
        large: "1280px",
        medium: "1024px",
        small: "768px",
      },

      // Custom Properties
      aspectRatio: {
        "16/9": "16 / 9",
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "1/1": "1 / 1",
      },

      // Font Family
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Roboto", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },

      // Letter Spacing
      letterSpacing: {
        tight: "-0.02em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.15em",
      },

      // Line Height
      lineHeight: {
        tight: "1.2",
        snug: "1.4",
        normal: "1.5",
        relaxed: "1.6",
        loose: "1.8",
      },

      // Animation
      animation: {
        "fade-in": "fadeIn 300ms ease-in-out",
        "slide-up": "slideUp 300ms ease-out",
        "slide-down": "slideDown 300ms ease-out",
        "pulse-soft": "pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

export default tailwindConfig;
