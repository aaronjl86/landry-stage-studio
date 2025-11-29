# Enable Speed Brain for The Landry Method

## What is Speed Brain?

Speed Brain is a Cloudflare feature that prefetches likely next pages to improve performance metrics like:
- **LCP (Largest Contentful Paint)** - Faster perceived load time
- **TTFB (Time to First Byte)** - Faster server response
- **Overall page load time** - Better user experience

## Compatibility Check

✅ **Your site is compatible:**
- CSP uses `'unsafe-inline'` (not `strict-dynamic` or `nonce`) ✅
- Using custom domain (not pages.dev) ✅
- On Cloudflare Pro plan ✅

## How to Enable Speed Brain

### Option 1: Cloudflare Dashboard (Easiest)

1. Go to: https://dash.cloudflare.com
2. Select your domain: **thelandrymethod.com**
3. Navigate to: **Speed** → **Settings**
4. Scroll to: **Content Optimization**
5. Toggle: **Speed Brain** → **On**
6. Click **Save**

### Option 2: API (If you have Zone ID)

```bash
# Get your Zone ID first (from dashboard or API)
ZONE_ID="your-zone-id-here"

# Enable Speed Brain
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/speed_brain" \
  --request PATCH \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{
    "value": "on"
  }'
```

## How It Works

1. **Prefetches likely next pages** when user hovers over links
2. **Only serves cached content** - won't hit origin server
3. **Uses Speculation Rules API** - modern browser feature
4. **Conservative eagerness** - only prefetches when browser thinks it's safe

## Benefits for Your Site

- **Faster navigation** between pages
- **Better LCP scores** on subsequent page loads
- **Improved user experience** - pages feel instant
- **No code changes required** - works automatically

## Testing

After enabling, test by:

1. Open Chrome DevTools → **Network** tab
2. Visit: https://thelandrymethod.com
3. **Mouse down** (don't click) on a link
4. You should see a prefetch request with `sec-purpose: prefetch` header

## Requirements

- ✅ Chromium-based browser (Chrome 121+, Edge 121+)
- ✅ Content must be cacheable
- ✅ No Workers on prefetched routes
- ✅ CSP compatible (yours is ✅)

## Notes

- Speed Brain **doesn't improve first page load** - only subsequent navigations
- Prefetch requests return `503` if content not cached
- Prefetch requests return `200` if content is cached
- Works best with good caching strategy (which you have ✅)

## Integration with RUM

For performance visibility, enable **Web Analytics & RUM**:
- **Speed** → **Web Analytics** → Enable

This shows how Speed Brain affects your performance metrics.

