/**
 * Typography Utility Functions
 * Official font styles and sizes for consistent typography across the application
 */

export const typography = {
  // Font Families
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },

  // Font Sizes (Official Scale)
  fontSize: {
    xs: '0.75rem',      // 12px - Small labels, captions
    sm: '0.875rem',     // 14px - Secondary text, helper text
    base: '1rem',       // 16px - Body text, default
    lg: '1.125rem',     // 18px - Large body text
    xl: '1.25rem',      // 20px - Small headings
    '2xl': '1.5rem',    // 24px - Section headings
    '3xl': '1.875rem',  // 30px - Page headings
    '4xl': '2.25rem',   // 36px - Large page headings
    '5xl': '3rem',      // 48px - Hero headings
    '6xl': '3.75rem',   // 60px - Display headings
  },

  // Font Weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

/**
 * Typography Presets for Common Use Cases
 */
export const typographyPresets = {
  // Headings
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-semibold tracking-tight',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-semibold tracking-tight',
  h5: 'text-lg font-medium tracking-tight',
  h6: 'text-base font-medium tracking-tight',
  
  // Body Text
  body: 'text-base font-normal leading-relaxed',
  bodyLarge: 'text-lg font-normal leading-relaxed',
  bodySmall: 'text-sm font-normal leading-relaxed',
  
  // Labels
  label: 'text-sm font-medium',
  labelSmall: 'text-xs font-medium',
  
  // Captions
  caption: 'text-xs font-normal text-gray-600 dark:text-gray-400',
  captionSmall: 'text-xs font-normal text-gray-500 dark:text-gray-500',
  
  // Buttons
  button: 'text-base font-semibold',
  buttonSmall: 'text-sm font-semibold',
  buttonLarge: 'text-lg font-semibold',
  
  // Display Text
  display: 'text-5xl font-extrabold tracking-tight',
  displayLarge: 'text-6xl font-extrabold tracking-tight',
}

export default typography
