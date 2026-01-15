# Typography & Fonts Guide

## Font Family

The dashboard uses **Inter** as the primary font family - a modern, professional sans-serif font designed for digital screens.

### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Why Inter?
- **Optimized for screens** - Designed specifically for computer screens
- **Excellent readability** - High legibility at all sizes
- **Professional appearance** - Modern, clean aesthetic
- **Wide character support** - Supports multiple languages
- **Performance** - Fast loading via Google Fonts CDN

## Typography Scale

### Official Font Sizes

| Size | Pixels | Rem | Usage |
|------|--------|-----|-------|
| xs   | 12px   | 0.75rem | Small labels, captions |
| sm   | 14px   | 0.875rem | Secondary text, helper text |
| base | 16px   | 1rem | Body text, default |
| lg   | 18px   | 1.125rem | Large body text |
| xl   | 20px   | 1.25rem | Small headings |
| 2xl  | 24px   | 1.5rem | Section headings |
| 3xl  | 30px   | 1.875rem | Page headings |
| 4xl  | 36px   | 2.25rem | Large page headings |
| 5xl  | 48px   | 3rem | Hero headings |
| 6xl  | 60px   | 3.75rem | Display headings |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Subtle emphasis |
| Normal | 400 | Body text, default |
| Medium | 500 | Slightly emphasized text |
| Semibold | 600 | Headings, labels |
| Bold | 700 | Strong emphasis, titles |
| Extrabold | 800 | Display text |
| Black | 900 | Maximum emphasis |

## Usage Examples

### Headings

```jsx
// H1 - Main page title
<h1 className="text-4xl font-bold tracking-tight">
  Dashboard
</h1>

// H2 - Section title
<h2 className="text-3xl font-semibold tracking-tight">
  Analytics Overview
</h2>

// H3 - Subsection title
<h3 className="text-2xl font-semibold tracking-tight">
  User Statistics
</h3>
```

### Body Text

```jsx
// Default body text
<p className="text-base font-normal leading-relaxed">
  Welcome back! Here's what's happening with your business today.
</p>

// Large body text
<p className="text-lg font-normal leading-relaxed">
  Important information that needs more emphasis.
</p>

// Small body text
<p className="text-sm font-normal leading-relaxed">
  Secondary information or helper text.
</p>
```

### Labels & Captions

```jsx
// Form labels
<label className="text-sm font-medium">
  Email Address
</label>

// Small labels
<label className="text-xs font-medium">
  Status
</label>

// Captions
<p className="text-xs font-normal text-gray-600 dark:text-gray-400">
  Last updated 2 hours ago
</p>
```

### Buttons

```jsx
// Default button
<button className="text-base font-semibold">
  Save Changes
</button>

// Small button
<button className="text-sm font-semibold">
  Cancel
</button>

// Large button
<button className="text-lg font-semibold">
  Get Started
</button>
```

## Typography Presets

Use these Tailwind classes for consistent typography:

### Headings
- `text-4xl font-bold tracking-tight` - H1
- `text-3xl font-semibold tracking-tight` - H2
- `text-2xl font-semibold tracking-tight` - H3
- `text-xl font-semibold tracking-tight` - H4
- `text-lg font-medium tracking-tight` - H5
- `text-base font-medium tracking-tight` - H6

### Body Text
- `text-base font-normal leading-relaxed` - Default body
- `text-lg font-normal leading-relaxed` - Large body
- `text-sm font-normal leading-relaxed` - Small body

### Labels
- `text-sm font-medium` - Default label
- `text-xs font-medium` - Small label

### Captions
- `text-xs font-normal text-gray-600 dark:text-gray-400` - Caption
- `text-xs font-normal text-gray-500 dark:text-gray-500` - Small caption

## Line Heights

| Name | Value | Usage |
|------|-------|-------|
| tight | 1.25 | Headings |
| snug | 1.375 | Compact text |
| normal | 1.5 | Default body text |
| relaxed | 1.625 | Comfortable reading |
| loose | 2 | Spacious text |

## Letter Spacing

| Name | Value | Usage |
|------|-------|-------|
| tighter | -0.05em | Large headings |
| tight | -0.025em | Headings |
| normal | 0 | Body text |
| wide | 0.025em | Uppercase text |
| wider | 0.05em | Labels |
| widest | 0.1em | Display text |

## Best Practices

1. **Consistency** - Use the typography scale consistently across the application
2. **Hierarchy** - Maintain clear visual hierarchy with size and weight
3. **Readability** - Use appropriate line heights for comfortable reading
4. **Dark Mode** - Ensure text has sufficient contrast in both themes
5. **Responsive** - Adjust font sizes for mobile devices when needed

## Customization

To customize fonts, edit `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['YourFont', 'fallback', 'fonts'],
}
```

To customize font sizes, edit the `fontSize` section in `tailwind.config.js`.

---

**Font System Version:** 1.0.0  
**Last Updated:** 2025
