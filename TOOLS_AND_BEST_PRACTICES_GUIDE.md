# Tools and Best Practices Guide
## Comprehensive Reference for The Landry Method Project

---

## Table of Contents

1. [Tailwind CSS](#tailwind-css)
2. [React & TypeScript](#react--typescript)
3. [CSS Fundamentals](#css-fundamentals)
4. [Vite Build System](#vite-build-system)
5. [Project-Specific Patterns](#project-specific-patterns)
6. [Troubleshooting Guide](#troubleshooting-guide)

---

## Tailwind CSS

### Overview
Tailwind CSS v3.4.17 is a utility-first CSS framework that provides low-level utility classes for rapid UI development.

### Core Concepts

#### Utility Classes
- **Purpose**: Pre-built CSS classes that apply single-purpose styles
- **Pattern**: `property-modifier` (e.g., `text-center`, `bg-white`, `mt-4`)
- **Benefits**: No custom CSS needed, consistent spacing, responsive by default

#### Spacing System
Tailwind uses a 4px base unit system:
- `0` = 0px
- `1` = 4px (0.25rem)
- `2` = 8px (0.5rem)
- `3` = 12px (0.75rem)
- `4` = 16px (1rem)
- `6` = 24px (1.5rem)
- `8` = 32px (2rem)

**Common Utilities:**
- `p-4` = padding: 1rem (all sides)
- `px-4` = padding-left/right: 1rem
- `py-4` = padding-top/bottom: 1rem
- `pt-4` = padding-top: 1rem
- `pb-4` = padding-bottom: 1rem
- `m-4` = margin: 1rem
- `mt-4` = margin-top: 1rem
- `mb-4` = margin-bottom: 1rem

#### Display Utilities

**Block vs Inline:**
- `block` = `display: block` (takes full width, stack vertically)
- `inline` = `display: inline` (flows with text, no width/height)
- `inline-block` = `display: inline-block` (flows with text, can set width/height)
- `flex` = `display: flex`
- `grid` = `display: grid`
- `hidden` = `display: none`

**Best Practice for Images:**
```tsx
// ✅ Correct: Block display eliminates inline spacing issues
<img className="block w-full h-auto" />

// ❌ Avoid: Inline images create spacing issues
<img className="w-full h-auto" />
```

#### Object Fit Utilities (Critical for Images)

**Purpose**: Control how images fit within their containers

- `object-contain` = Image scales to fit container, maintains aspect ratio, **shows full image**
- `object-cover` = Image fills container, maintains aspect ratio, **may crop image**
- `object-fill` = Image stretches to fill container, **distorts aspect ratio**
- `object-none` = Image keeps original size
- `object-scale-down` = Behaves like `object-none` or `object-contain`, whichever is smaller

**When to Use:**
```tsx
// ✅ Show full image (like hero with disclaimer)
<img className="w-full h-auto object-contain" />

// ✅ Fill container (like thumbnails where cropping is acceptable)
<img className="w-full h-48 object-cover" />
```

#### Line Height Utilities (Critical for Image Spacing)

**Purpose**: Control line-height, which affects spacing below images

- `leading-none` = `line-height: 0` - **Eliminates gap below images**
- `leading-tight` = `line-height: 1.25`
- `leading-normal` = `line-height: 1.5`
- `leading-relaxed` = `line-height: 1.75`
- `leading-loose` = `line-height: 2`

**Why Images Have Gaps:**
- Images are inline elements by default
- Inline elements reserve space for text descenders (letters like g, j, p, q, y)
- This creates a gap below images
- **Solution**: `leading-none` on the image container

**Best Practice:**
```tsx
// ✅ Correct: Eliminates gap below image
<div className="leading-none">
  <img className="block w-full h-auto object-contain" />
</div>

// ❌ Wrong: Gap appears below image
<div>
  <img className="block w-full h-auto object-contain" />
</div>
```

#### Overflow Utilities

**Purpose**: Control how content that overflows containers is handled

- `overflow-hidden` = Clips content, **maintains rounded corners**
- `overflow-visible` = Content can overflow, **breaks rounded corners**
- `overflow-auto` = Adds scrollbars when needed
- `overflow-scroll` = Always shows scrollbars

**Best Practice for Cards:**
```tsx
// ✅ Correct: overflow-hidden maintains rounded corners
<div className="rounded-xl overflow-hidden">
  <img className="w-full h-auto object-contain" />
</div>

// ❌ Wrong: overflow-visible breaks rounded corners
<div className="rounded-xl overflow-visible">
  <img className="w-full h-auto object-contain" />
</div>
```

#### Width & Height Utilities

**Width:**
- `w-full` = `width: 100%`
- `w-auto` = `width: auto`
- `w-screen` = `width: 100vw`
- `w-1/2` = `width: 50%`
- `w-1/3` = `width: 33.333333%`

**Height:**
- `h-auto` = `height: auto` (maintains aspect ratio)
- `h-full` = `height: 100%`
- `h-screen` = `height: 100vh`
- `h-48` = `height: 12rem` (192px)
- `h-64` = `height: 16rem` (256px)

**Best Practice for Responsive Images:**
```tsx
// ✅ Correct: Full width, auto height maintains aspect ratio
<img className="w-full h-auto object-contain" />

// ❌ Wrong: Fixed height can crop image
<img className="w-full h-64 object-contain" />
```

#### Responsive Design

Tailwind uses mobile-first breakpoints:
- Default = Mobile (< 640px)
- `sm:` = 640px and up
- `md:` = 768px and up
- `lg:` = 1024px and up
- `xl:` = 1280px and up
- `2xl:` = 1536px and up

**Example:**
```tsx
<div className="text-sm sm:text-base lg:text-lg">
  Responsive text
</div>
```

#### Color System

**Project Colors (from tailwind.config.ts):**
- Custom colors use CSS variables: `hsl(var(--primary))`
- Brand color: `#FF634C` (coral/orange)
- Uses shadcn/ui color system

**Usage:**
```tsx
<div className="bg-[#FF634C] text-white">
  Brand colored element
</div>
```

### Best Practices

1. **Use Utility Classes, Not Custom CSS**
   - ✅ `className="flex items-center gap-4"`
   - ❌ Custom CSS for simple layouts

2. **Combine Utilities for Complex Styles**
   - ✅ `className="bg-white rounded-xl shadow-lg overflow-hidden"`
   - ❌ Multiple wrapper divs with custom classes

3. **Use `cn()` Helper for Conditional Classes**
   ```tsx
   import { cn } from "@/lib/utils";
   <div className={cn("base-class", condition && "conditional-class")} />
   ```

4. **Responsive Design First**
   - Start with mobile styles, add breakpoints
   - ✅ `className="text-sm sm:text-base lg:text-lg"`

5. **Image Best Practices**
   - Always use `block` for images
   - Use `object-contain` to show full image
   - Use `leading-none` on container to eliminate gaps
   - Use `w-full h-auto` for responsive images

---

## React & TypeScript

### JSX/TSX Basics

#### className Prop
- **Purpose**: Apply CSS classes to React elements
- **Type**: `string` (can be multiple classes separated by spaces)
- **Best Practice**: Use template literals or `cn()` helper for conditional classes

```tsx
// ✅ Simple
<div className="flex items-center">

// ✅ Multiple classes
<div className="bg-white rounded-xl shadow-lg">

// ✅ Conditional (using cn helper)
<div className={cn("base-class", isActive && "active-class")}>
```

#### Image Element

**Standard Props:**
- `src`: Image path (string)
- `alt`: Alternative text (required for accessibility)
- `className`: Tailwind classes
- `loading`: "lazy" or "eager"
- `decoding`: "async" or "sync"

**Best Practice:**
```tsx
<img
  src="/images/hero.jpg"
  alt="Descriptive text"
  className="w-full h-auto object-contain block"
  loading="lazy"
  decoding="async"
/>
```

#### Component Structure

**Functional Components:**
```tsx
const Component = () => {
  return (
    <div className="container">
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

**TypeScript Props:**
```tsx
interface ComponentProps {
  title: string;
  className?: string;
}

const Component = ({ title, className }: ComponentProps) => {
  return (
    <div className={cn("base-classes", className)}>
      {title}
    </div>
  );
};
```

### Best Practices

1. **Always Use TypeScript Types**
   - Define interfaces for props
   - Use type inference where appropriate

2. **Use Functional Components**
   - Hooks for state management
   - Avoid class components

3. **Component Composition**
   - Break down into smaller components
   - Reuse UI components from `src/components/ui/`

4. **Accessibility**
   - Always include `alt` text on images
   - Use semantic HTML elements
   - Proper heading hierarchy (h1 → h2 → h3)

---

## CSS Fundamentals

### Box Model

**Components:**
- Content (width/height)
- Padding (space inside border)
- Border
- Margin (space outside border)

**Tailwind Equivalents:**
- Width: `w-*`
- Height: `h-*`
- Padding: `p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`
- Margin: `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`
- Border: `border`, `border-*`

### Display Properties

**Block Elements:**
- Take full width by default
- Stack vertically
- Can set width/height
- Examples: `div`, `p`, `h1-h6`

**Inline Elements:**
- Flow with text
- Cannot set width/height
- Examples: `span`, `a`, `img` (by default)

**Inline-Block:**
- Flows with text but can set width/height
- Best of both worlds

**Why Images Need `display: block`:**
- Images are inline by default
- Inline elements have spacing issues (line-height, descenders)
- Block display eliminates these issues

### Object Fit Property

**Values:**
- `contain`: Image scales to fit, shows full image, may have empty space
- `cover`: Image fills container, may crop, no empty space
- `fill`: Stretches to fill, distorts aspect ratio
- `none`: Original size
- `scale-down`: Smaller of `none` or `contain`

**When to Use Each:**
- `object-contain`: When you need to see the full image (hero images, product photos with disclaimers)
- `object-cover`: When you need to fill a container (thumbnails, backgrounds)
- `object-fill`: Rarely used (distorts image)

### Line Height and Image Spacing

**The Problem:**
- Images are inline elements
- Inline elements align to text baseline
- Space is reserved for descenders (g, j, p, q, y)
- This creates unwanted gap below images

**The Solution:**
```css
/* CSS */
.image-container {
  line-height: 0;
}

/* Tailwind */
<div className="leading-none">
  <img className="block w-full h-auto" />
</div>
```

**Why This Works:**
- `line-height: 0` removes the space reserved for text
- Image no longer has gap below it
- Text below can be positioned with normal margins

### Overflow Property

**Values:**
- `visible`: Content can overflow (breaks rounded corners)
- `hidden`: Content is clipped (maintains rounded corners)
- `auto`: Scrollbars when needed
- `scroll`: Always show scrollbars

**Best Practice:**
- Use `overflow-hidden` on cards with rounded corners
- Use `overflow-visible` only when you need content to overflow
- For images in rounded containers, use `overflow-hidden` on container, not image

---

## Vite Build System

### Overview
Vite is the build tool and dev server for this project.

### Configuration (vite.config.ts)

**Key Features:**
- React with SWC (fast compilation)
- Path alias: `@/` → `./src/`
- Image optimization in production
- Code splitting for performance
- Gzip compression

**Image Optimization:**
- WebP: 80% quality
- JPEG: 75% quality, progressive
- PNG: 75% quality

### Development vs Production

**Development:**
- Fast HMR (Hot Module Replacement)
- Source maps
- Component tagger (Lovable.dev)

**Production:**
- Minified code
- Optimized images
- Code splitting
- Gzip compression
- No source maps

---

## Project-Specific Patterns

### File Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (shadcn/ui)
│   └── ...          # Feature components
├── pages/           # Page components
├── lib/
│   └── utils.ts     # Utility functions (cn helper)
├── styles/          # CSS files
└── assets/          # Images, fonts, etc.
```

### Utility Helper (`src/lib/utils.ts`)

**Purpose**: Merge Tailwind classes with conditional logic

```tsx
import { cn } from "@/lib/utils";

// Usage
<div className={cn(
  "base-class",
  condition && "conditional-class",
  anotherCondition && "another-class"
)} />
```

**How It Works:**
- Uses `clsx` for conditional classes
- Uses `tailwind-merge` to resolve conflicts
- Ensures only final classes are applied

### Color System

**CSS Variables (from critical.css):**
- Colors use HSL format: `hsl(var(--primary))`
- Theme-aware (light/dark mode support)
- Custom brand color: `#FF634C`

**Usage:**
```tsx
// Using CSS variable
<div className="bg-primary text-primary-foreground">

// Using direct color
<div className="bg-[#FF634C] text-white">
```

### Component Patterns

**Card Pattern:**
```tsx
<div className="bg-white rounded-xl shadow-lg overflow-hidden">
  <div className="p-6">
    {/* Content */}
  </div>
</div>
```

**Image Card Pattern:**
```tsx
<div className="bg-white rounded-xl shadow-lg overflow-hidden">
  <div className="pt-4 leading-none">
    <img
      src="/images/image.jpg"
      alt="Description"
      className="w-full h-auto object-contain block"
    />
  </div>
  <div className="p-6">
    {/* Text content */}
  </div>
</div>
```

---

## Troubleshooting Guide

### Image Cropping Issues

**Problem**: Image is being cut off, disclaimer not visible

**Causes:**
1. Container has `overflow-hidden` and image exceeds bounds
2. Fixed height on container
3. Using `object-cover` instead of `object-contain`

**Solutions:**
```tsx
// ✅ Correct: Shows full image
<div className="overflow-hidden">
  <div className="leading-none">
    <img className="w-full h-auto object-contain block" />
  </div>
</div>

// ❌ Wrong: Crops image
<div className="overflow-hidden">
  <img className="w-full h-64 object-cover" />
</div>
```

### Gap Below Images

**Problem**: Unwanted space between image and text below

**Cause**: Line-height on container reserves space for text descenders

**Solution:**
```tsx
// ✅ Correct: No gap
<div className="leading-none">
  <img className="block w-full h-auto" />
</div>
<div className="mt-3">
  {/* Text */}
</div>

// ❌ Wrong: Gap appears
<div>
  <img className="block w-full h-auto" />
</div>
```

### Rounded Corners Not Working

**Problem**: Rounded corners don't appear on card

**Cause**: Content overflowing container breaks rounded corners

**Solution:**
```tsx
// ✅ Correct: overflow-hidden maintains rounded corners
<div className="rounded-xl overflow-hidden">
  <img className="w-full h-auto" />
</div>

// ❌ Wrong: Content overflows, breaks corners
<div className="rounded-xl overflow-visible">
  <img className="w-full h-auto" />
</div>
```

### Classes Not Applying

**Problem**: Tailwind classes don't work

**Causes:**
1. Class not in content paths (tailwind.config.ts)
2. Class name typo
3. Conflicting classes

**Solutions:**
1. Check `tailwind.config.ts` content paths
2. Verify class name spelling
3. Use `cn()` helper to resolve conflicts
4. Check browser DevTools for applied styles

### Responsive Design Not Working

**Problem**: Breakpoints don't apply

**Causes:**
1. Wrong breakpoint syntax
2. Mobile-first approach not followed

**Solution:**
```tsx
// ✅ Correct: Mobile-first
<div className="text-sm sm:text-base lg:text-lg">

// ❌ Wrong: Desktop-first
<div className="text-lg lg:text-sm">
```

### Image Not Loading

**Problem**: Image doesn't appear

**Causes:**
1. Wrong path
2. Image not in public folder
3. Build not including image

**Solutions:**
1. Check path: `/images/` = `public/images/`
2. Verify image exists in `public/images/`
3. Rebuild project: `npm run build`

---

## Quick Reference

### Image Display Pattern (Full Image, No Gap)

```tsx
<div className="bg-white rounded-xl shadow-lg overflow-hidden">
  <div className="pt-4 leading-none">
    <img
      src="/images/image.jpg"
      alt="Description"
      className="w-full h-auto object-contain block"
    />
  </div>
  <div className="p-6">
    {/* Text content */}
  </div>
</div>
```

### Key Utilities for Images

- `w-full` = Full width
- `h-auto` = Auto height (maintains aspect ratio)
- `object-contain` = Show full image
- `object-cover` = Fill container (may crop)
- `block` = Block display (eliminates inline spacing)
- `leading-none` = No line-height (eliminates gap)

### Common Spacing Values

- `mt-0` = 0px
- `mt-2` = 8px
- `mt-3` = 12px
- `mt-4` = 16px
- `mt-6` = 24px
- `mt-8` = 32px

---

## Summary

### For Image Display Issues:

1. **Full Image Visible**: Use `object-contain` with `w-full h-auto`
2. **No Gap Below**: Use `leading-none` on image container
3. **Rounded Corners**: Use `overflow-hidden` on card container
4. **Block Display**: Always use `block` on images

### For Layout Issues:

1. **Spacing**: Use Tailwind spacing utilities (mt-*, mb-*, p-*, etc.)
2. **Responsive**: Use breakpoint prefixes (sm:, md:, lg:)
3. **Flexbox**: Use `flex` utilities for layouts
4. **Grid**: Use `grid` utilities for complex layouts

### For Styling Issues:

1. **Colors**: Use project color system or direct colors
2. **Typography**: Use Tailwind text utilities
3. **Shadows**: Use `shadow-*` utilities
4. **Borders**: Use `border`, `rounded-*` utilities

---

**Last Updated**: Based on Tailwind CSS v3.4.17, React 18.3.1, TypeScript 5.8.3

