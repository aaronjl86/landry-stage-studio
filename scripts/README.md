# AVIF Image Conversion for Hero Slider

This directory contains the script to convert slider images to AVIF format for improved performance.

## Overview

The conversion script (`convert-to-avif.js`) automatically converts the two hero slider JPG images to AVIF format, which provides:
- **93.79% size reduction** on average (from 1.4 MB to 89.7 KB)
- Better performance and Lighthouse scores
- Faster page load times

## Usage

### Manual Conversion

```bash
npm run convert:avif
```

This will:
1. Read `public/assets/slider-image-1.jpg` and `public/assets/slider-image-2.jpg`
2. Convert them to AVIF format with quality=50
3. Save as `slider-image-1.avif` and `slider-image-2.avif`
4. Display size comparisons

### Automatic Conversion (Build Time)

The AVIF conversion runs automatically during the build process:

```bash
npm run build
```

The build process includes:
1. `npm run convert:avif` - Generate AVIF files
2. `vite build` - Build the application

### CI/CD Integration

The GitHub Actions workflow (`epistemic-gate.yml`) automatically generates AVIF assets during CI builds.

## SliderImage Component

The `SliderImage.jsx` component provides automatic AVIF support with JPG fallback:

```jsx
import SliderImage from '@/components/SliderImage';

<SliderImage
  src="/assets/slider-image-1.jpg"
  alt="Empty room before staging"
  width={800}
  height={600}
  loading="eager"
  fetchPriority="high"
/>
```

### Browser Support

- **Modern browsers**: Receive AVIF format (Chrome 85+, Edge 90+, Firefox 93+, Safari 16+)
- **Older browsers**: Automatically fall back to JPG format
- **No JavaScript required**: Uses native `<picture>` element

## File Structure

```
public/assets/
├── slider-image-1.jpg      # Original JPG (173 KB)
├── slider-image-1.avif     # Generated AVIF (48 KB) - 72.50% reduction
├── slider-image-2.jpg      # Original JPG (1.27 MB)
└── slider-image-2.avif     # Generated AVIF (42 KB) - 96.68% reduction
```

## Configuration

The conversion quality can be adjusted in `scripts/convert-to-avif.js`:

```javascript
const quality = 50; // Adjust between 1-100 (lower = smaller file, lower quality)
```

## Benefits

1. **Lighthouse Performance**: Improved image-size metrics
2. **Bandwidth Savings**: 93.79% reduction in transfer size
3. **User Experience**: Faster page loads, especially on mobile
4. **SEO**: Better Core Web Vitals scores
5. **Progressive Enhancement**: Works for all browsers with appropriate fallbacks
