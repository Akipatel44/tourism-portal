/**
 * OSAM Tourism Portal - Accessibility Specifications
 * WCAG 2.1 AA compliance guidelines
 */

// ============================================================================
// COLOR CONTRAST REQUIREMENTS
// ============================================================================

export const ColorContrast = {
  WCAG_AAA: {
    minRatio: "7:1",
    usage: "Normal text (recommended), critical information",
    examples: [
      "Forest #1B5E20 text on Mountain Mist #F8FAFC: 10.5:1 ✓",
      "Monsoon Gray #2D3E50 text on Mountain Mist #F8FAFC: 9.2:1 ✓",
      "Error Red #DC2626 on white: 5.1:1 (AAA not met, use for secondary)",
    ],
  },

  WCAG_AA: {
    minRatio: "4.5:1",
    largeText: "3:1",
    usage: "Minimum compliance for all text",
    definition: "Large text = 18pt+ (24px) or 14pt bold (18.66px bold)",
    examples: [
      "Forest #1B5E20 on white: 10.5:1 ✓ AAA",
      "Stone Gray #64748B on white: 7.8:1 ✓ AAA",
      "Emerald #2E8B57 on white: 4.5:1 ✓ AA",
    ],
  },

  graphicsAndUIComponents: {
    minRatio: "3:1",
    usage: "UI components, focus indicators, icon backgrounds",
    examples: [
      "Primary green button: 10.5:1 on white ✓",
      "Focus ring (Forest) on input: 10.5:1 ✓",
      "Disabled state (Light Gray): needs 3:1 from background",
    ],
  },

  contrastChecker: "Use: https://webaim.org/resources/contrastchecker/",

  failedCombinations: [
    "Sage #9CAF88 (light) on Mountain Mist (light) - TOO LIGHT",
    "Accent Gold #D4A574 on warm backgrounds - insufficient",
    "Fresh Mint #10B981 on Sky Blue #3B82F6 - hue problems",
  ],

  successfulCombinations: {
    darkTextOnLight: [
      "Forest #1B5E20 on any light background (10.5:1+)",
      "Monsoon Gray #2D3E50 on light backgrounds (9+:1)",
      "Stone Gray #64748B on white/light backgrounds (7+:1)",
    ],
    lightTextOnDark: [
      "Mountain Mist #F8FAFC on Forest #1B5E20 (10.5:1)",
      "White #FFFFFF on Forest #1B5E20 (12.6:1)",
      "White on Monsoon Gray #2D3E50 (10.2:1)",
    ],
  },

  implementation: `
    /* Tailwind: Use color utility with sufficient contrast */
    .btn-primary {
      @apply bg-forest-600 text-white; /* 10.5:1 ratio ✓ */
    }

    .text-body {
      @apply text-monsoon-800 bg-mountain-50; /* 9.2:1 ratio ✓ */
    }

    /* Don't use */
    .btn-light {
      @apply bg-sage-300 text-gray-100; /* FAILS - 1.2:1 ✗ */
    }
  `,
};

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

export const KeyboardNavigation = {
  requirements: {
    allFunctional: "All functionality must be keyboard accessible",
    nologicTraps: "No keyboard traps (can't use Tab to escape)",
    focusVisible: "Focus state must be visible to keyboard users",
    tabOrder: "Logical Tab order (left-to-right, top-to-bottom)",
  },

  tabOrder: {
    rule: "Use natural HTML structure - avoid tabindex > 0",
    correct: [
      "<button> before <a> (reading order)",
      "<input> in form order",
      "Nested dialogs use focus management",
    ],
    incorrect: [
      "tabindex='1', tabindex='2', tabindex='10'",
      "Non-focusable divs with tabindex",
      "Random tab order not matching visual layout",
    ],
  },

  focusManagement: {
    visibleFocus: {
      minSize: "3px (at least 2px + 1px gap)",
      minContrast: "3:1 against adjacent colors",
      css: `
        focus-visible {
          outline: 3px solid #1B5E20;
          outline-offset: 2px;
        }
      `,
      remove_default: "Never remove outline without replacement",
    },

    focusIndicator: {
      outline: "3px solid Forest #1B5E20",
      outlineOffset: "2px",
      contrast: "3:1 from background",
      alwaysVisible: "Never hide on focus - always visible",
    },

    implementation: `
      /* Good */
      button:focus-visible {
        outline: 3px solid #1B5E20;
        outline-offset: 2px;
      }

      /* Bad - hides focus */
      button:focus {
        outline: none;
      }

      /* Bad - low contrast */
      button:focus-visible {
        outline: 1px solid #ccc; /* Only 1:1 ratio */
      }
    `,
  },

  keyboardShortcuts: {
    required: "Provide alternative keyboard-accessible methods",
    shortcuts: [
      "Enter/Space: Activate buttons",
      "Tab: Navigate between interactive elements",
      "Shift+Tab: Navigate backward",
      "Escape: Close modals/menus",
      "Arrow keys: Navigate lists/dropdowns",
    ],

    customShortcuts: {
      avoidCommon: "Don't override Tab, Enter, Escape, standard browser shortcuts",
      document: "If custom shortcuts exist, provide keyboard help (?)",
      makeOptional: "Shortcuts should enhance, not replace standard navigation",
    },
  },

  skipLinks: {
    implementation: `
      <a href="#main" class="skip-link">
        Skip to main content
      </a>

      /* CSS */
      .skip-link {
        position: absolute;
        left: -9999px;
        z-index: 999;
      }

      .skip-link:focus {
        left: 0;
        top: 0;
        background: #1B5E20;
        color: white;
        padding: 8px;
      }
    `,
    usage: "Allow users to jump past navigation directly to content",
  },
};

// ============================================================================
// SCREEN READER SUPPORT
// ============================================================================

export const ScreenReaderSupport = {
  semanticHTML: {
    use: [
      "<button> for buttons (not <div onclick>)",
      "<a> for links (not <div onclick>)",
      "<nav> for navigation regions",
      "<main> for main content",
      "<article> for independent content",
      "<section> for content sections",
      "<header>/<footer> for page header/footer",
      "<form> and <label> for forms",
      "<table> with <th>, <caption> for tables",
      "<ul>/<ol> for lists (not divs)",
    ],
    dont: [
      "<div onclick=...> for button behavior",
      "<span role='button'> instead of <button>",
      "<div role='link'> instead of <a>",
      "Divs with classes for semantic meaning",
    ],
  },

  ariaAttributes: {
    ariaLabel: {
      usage: "When visual label doesn't exist or is unclear",
      examples: [
        '<button aria-label="Close menu">×</button>',
        '<a href="/" aria-label="OSAM Home">Logo</a>',
      ],
    },

    ariaLabelledBy: {
      usage: "Connect element to text elsewhere on page",
      examples: [
        '<h2 id="dialog-title">Booking Confirmation</h2>\n<dialog aria-labelledby="dialog-title">',
        '<div id="error-msg">Invalid email</div>\n<input aria-labelledby="error-msg">',
      ],
    },

    ariaDescribedBy: {
      usage: "Additional description or help text",
      examples: [
        '<input aria-describedby="pwd-hint">\n<p id="pwd-hint">Min 8 characters</p>',
      ],
    },

    ariaLive: {
      usage: "Announce dynamic content changes",
      values: ["polite (default)", "assertive (urgent)", "off"],
      examples: [
        '<div aria-live="polite">Item added to cart</div>',
        '<div aria-live="assertive" role="alert">Server error!</div>',
      ],
    },

    ariaHidden: {
      usage: "Hide decorative elements from screen readers",
      examples: [
        '<span aria-hidden="true">→</span> (arrow decoration)',
        '<div aria-hidden="true" class="decorative-shape"></div>',
      ],
    },

    ariaExpanded: {
      usage: "Indicate if expandable content is open/closed",
      examples: [
        '<button aria-expanded="false" aria-controls="menu">Menu</button>\n<ul id="menu" hidden></ul>',
      ],
    },

    ariaPressed: {
      usage: "Toggle buttons",
      examples: [
        '<button aria-pressed="false">Favorite</button>',
      ],
    },

    ariaChecked: {
      usage: "Checkboxes and radio buttons",
      examples: [
        '<div role="checkbox" aria-checked="true"></div>',
      ],
    },

    ariaRequired: {
      usage: "Form fields that must be filled",
      examples: [
        '<input aria-required="true" required>',
      ],
    },

    ariaInvalid: {
      usage: "Mark form fields with errors",
      examples: [
        '<input aria-invalid="true" aria-describedby="error-1">',
      ],
    },
  },

  landmarks: {
    implementation: `
      <header role="banner">
        <nav role="navigation">Navigation</nav>
      </header>

      <main role="main">
        Main content
      </main>

      <aside role="complementary">
        Sidebar content
      </aside>

      <footer role="contentinfo">
        Footer
      </footer>
    `,
    benefit: "Screen readers can jump between major regions",
  },

  headingStructure: {
    rule: "Use h1-h6 in logical order, never skip levels",
    correct: [
      "<h1>Page Title</h1>",
      "<h2>Section</h2>",
      "<h3>Subsection</h3>",
    ],
    incorrect: [
      "<h1>Title</h1> <h3>Subsection</h3> (skips h2)",
      "Multiple <h1>s on one page (use only one)",
      "<h2>Styled like h1</h2> (use h1, style with CSS)",
    ],
    onePage: "Only ONE h1 per page (use multiple on large sites with multiple h1s in different sections)",
  },

  imageAlt: {
    decorative: {
      examples: [
        '<img src="leaf.svg" alt="">',
        '<img src="line.png" alt="" aria-hidden="true">',
      ],
      explanation: "Empty alt attribute for decorative images",
    },

    informative: {
      examples: [
        '<img src="lake.jpg" alt="Sunrise at Dal Lake, Kashmir">',
        '<img src="mountain.jpg" alt="Snow-capped Himalayan peaks">',
      ],
      guidelines: [
        "Describe what the image IS, not 'Image of...'",
        "Keep under 125 characters",
        "Don't use 'image', 'photo', 'picture' in alt text",
        "Include context: location, time, important details",
      ],
    },

    complex: {
      longDesc: "Use aria-describedby or <figure><figcaption>",
      example: `
        <figure>
          <img src="graph.png" alt="Tourism statistics 2024">
          <figcaption>
            Shows 45% increase in hill station visits,
            30% increase in beach destinations, 25% for religious sites.
          </figcaption>
        </figure>
      `,
    },
  },

  forms: {
    labels: {
      correct: '<label for="email">Email</label>\n<input id="email">',
      incorrect: 'Placeholder only: <input placeholder="Email">',
      benefit: "Screen readers announce label with input",
    },

    errorHandling: {
      announce: "aria-live='polite' for error messages",
      link: "aria-describedby links input to error",
      example: `
        <input id="email-field" aria-describedby="email-error">
        <div id="email-error" aria-live="polite">Invalid email</div>
      `,
    },

    fieldGroups: {
      example: `
        <fieldset>
          <legend>Travel Preferences</legend>
          <label><input type="checkbox"> Mountains</label>
          <label><input type="checkbox"> Beaches</label>
        </fieldset>
      `,
      benefit: "Groups related fields, announces context",
    },
  },
};

// ============================================================================
// TEXT & READABILITY
// ============================================================================

export const TextAccessibility = {
  fontSize: {
    minimum: "16px for body text",
    ideal: "16-18px for body text",
    headings: "24px+ for headings (maintain hierarchy)",
    captions: "12px minimum (with sufficient contrast)",
    relativeUnits: "Use rem or em, not fixed px (allows user zoom)",
  },

  lineHeight: {
    body: "1.5 (1.5x font size)",
    headings: "1.2-1.4 (tighter than body)",
    minimum: "1.4 for accessibility",
    improvement: "1.6-1.8 significantly improves readability",
  },

  lineLength: {
    optimal: "65-80 characters per line",
    implementation: "max-width: 65ch or max-width: 1000px",
    tooWide: "Harder to track when eyes move to next line",
    tooNarrow: "Causes excessive line breaks",
  },

  spacing: {
    letterSpacing: "0 (default), no need to increase",
    wordSpacing: "Default is fine",
    paragraphSpacing: "1.5-2x line-height (roughly 1.5x font size)",
    example: "1.5em between paragraphs if line-height is 1.5",
  },

  textAlignment: {
    use_leftAlign: "Default - easiest to read",
    avoid_justified: "Creates uneven word spacing",
    avoid_centerAlign: "Only for headings/callouts",
    avoid_rightAlign: "Never for body text",
  },

  language: {
    clearWriting: "Use simple, clear language",
    avoid: [
      "Jargon without explanation",
      "Very long sentences (avg <15 words)",
      "Passive voice when active is clearer",
      "Abbreviations without definition (first use: define acronym)",
    ],

    examples: {
      unclear: "Utilize the indigenous-derived hospitality paradigm",
      clear: "Enjoy authentic local hospitality",
    },
  },

  lists: {
    structure: "Use <ul>/<ol>, not paragraphs",
    markup: `
      <ul>
        <li>First point</li>
        <li>Second point</li>
      </ul>
    `,
    benefit: "Screen readers announce list context and position",
  },

  emphasis: {
    bold: "Use for important terms: <strong>",
    italic: "Use for citations: <em>",
    avoid: "ALL CAPS (harder to read), excessive punctuation!!!",
  },
};

// ============================================================================
// MOTION & ANIMATION
// ============================================================================

export const MotionAccessibility = {
  reducedMotion: {
    requirement: "Respect prefers-reduced-motion",
    css: `
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `,
    whenToUse: "Always include",
    benefit: "Prevents motion sickness and seizures",
  },

  animation: {
    duration: "Keep animations under 1 second for most effects",
    vestibular: "Avoid parallax scrolling (motion sickness)",
    flashing: "NEVER flash more than 3x per second (seizure risk)",
    autoplay: "Never auto-play animations (let user control)",
  },

  transitions: {
    inform: "Transitions should inform, not distract",
    duration: "100-300ms for most UI transitions",
    easing: "Use ease-in-out for natural feeling",
    avoid: "Avoid elastic/bounce for serious content",
  },
};

// ============================================================================
// COLOR & PATTERNS
// ============================================================================

export const ColorAccessibility = {
  dontRelyOnColor: {
    problem: "Users with color blindness can't distinguish colors",
    solution: "Use pattern, texture, text, or icon in addition",
    examples: [
      "Don't: 'Click the red button' - some can't see red",
      "Do: 'Click the save button' (has label + icon)",
      "Error text should be red AND have icon + text",
    ],
  },

  colorBlindness: {
    protanopia: {
      name: "Red-blind (1% of males)",
      appear: "Red appears as brown",
      impact: "Can't distinguish red/green",
    },

    deuteranopia: {
      name: "Green-blind (1% of males)",
      appear: "Green appears as brown",
      impact: "Can't distinguish red/green",
    },

    tritanopia: {
      name: "Blue-yellow blind (rare)",
      appear: "Blue appears as pink, yellow as gray",
      impact: "Can't distinguish blue/yellow",
    },

    achromatopsia: {
      name: "Total color blindness (very rare)",
      appear: "Only sees gray",
      impact: "Needs very high contrast",
    },

    simulator: "Use Color Oracle to test (https://colororacle.org/)",
  },

  palletteGuidance: {
    safeColor: [
      "Blue + Yellow (good for color blind users)",
      "Purple + Yellow (also works)",
    ],
    avoid: [
      "Red + Green only (hardest for color blind)",
      "Red + Blue + Green (assumes all colors distinguishable)",
    ],
  },
};

// ============================================================================
// TESTING & VALIDATION
// ============================================================================

export const AccessibilityTesting = {
  automatedTools: {
    axeDevTools: "Browser extension for automated testing",
    lighthouseCI: "Google's Lighthouse automated audit",
    webAIM: "https://webaim.org/resources/contrastchecker/",
    nvda: "Free screen reader for testing (Windows)",
    jaws: "Industry standard screen reader (Windows)",
    voiceOver: "Built-in screen reader (Mac/iOS)",
    talkBack: "Built-in screen reader (Android)",
  },

  manualTesting: {
    keyboard: "Navigate entire site using only Tab/Shift+Tab/Enter",
    screenReader: "Use NVDA or VoiceOver to verify announcements",
    contrast: "Check all text meets 4.5:1 ratio",
    zoom: "Test at 200% zoom (content should remain usable)",
    mobile: "Test with mobile screen readers (VoiceOver, TalkBack)",
  },

  checklist: {
    visual: [
      "☐ All text has 4.5:1 contrast (or 3:1 for large text)",
      "☐ Focus indicators are visible (3px+ outline)",
      "☐ Decorative images have empty alt or aria-hidden",
      "☐ Informative images have descriptive alt text",
      "☐ Color not the only way to convey information",
    ],

    interactive: [
      "☐ All functionality accessible via keyboard",
      "☐ No keyboard traps",
      "☐ Tab order is logical (left-right, top-bottom)",
      "☐ Focus visible on every interactive element",
      "☐ Form labels properly associated with inputs",
    ],

    structure: [
      "☐ One h1 per page",
      "☐ Heading hierarchy (h1→h2→h3, no skipping)",
      "☐ Semantic HTML (<button>, <a>, <nav>, not divs)",
      "☐ Lists use <ul>/<ol>/<li>, not divs",
      "☐ Tables use <table>, <th>, <caption> properly",
    ],

    screenReader: [
      "☐ All images have alt text",
      "☐ Form fields have labels",
      "☐ Error messages linked to fields (aria-describedby)",
      "☐ Dynamic content announced (aria-live)",
      "☐ Skip link to main content exists",
    ],
  },

  wcag21Levels: {
    A: "Basic accessibility - least strict",
    AA: "Industry standard - meets most needs (TARGET FOR OSAM)",
    AAA: "Enhanced - most strict (aim for critical content)",
  },
};

// ============================================================================
// OSAM-SPECIFIC ACCESSIBILITY REQUIREMENTS
// ============================================================================

export const OSAMAccessibilityGoals = {
  target: "WCAG 2.1 AA compliance",

  priority: [
    "Ensure all destinations/attractions have descriptive images",
    "Make booking forms fully keyboard accessible",
    "Announce booking confirmation messages",
    "Provide alt text for all tourism photos",
    "Test with actual disabled users in target market",
  ],

  implementation: {
    imageAlt: "Every destination image needs: location + time + description",
    forms: "All booking/filter forms must work with keyboard only",
    liveRegions: "Cart updates, confirmation messages announced",
    focus: "3px solid green (#1B5E20) focus indicator on all inputs",
    landmarks: "Clear <header>, <nav>, <main>, <footer> structure",
  },

  timeline: [
    "Phase 1: Implement semantic HTML (foundations)",
    "Phase 2: Add ARIA labels and descriptions",
    "Phase 3: Keyboard navigation testing",
    "Phase 4: Screen reader testing (NVDA, VoiceOver)",
    "Phase 5: User testing with disabled users",
  ],
};

// ============================================================================
// EXPORT ALL ACCESSIBILITY SPECIFICATIONS
// ============================================================================

export const AccessibilitySystem = {
  ColorContrast,
  KeyboardNavigation,
  ScreenReaderSupport,
  TextAccessibility,
  MotionAccessibility,
  ColorAccessibility,
  AccessibilityTesting,
  OSAMAccessibilityGoals,
};

export default AccessibilitySystem;
