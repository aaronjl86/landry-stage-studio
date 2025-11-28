# Testing Fix #1: CSP Update for Google Analytics

## What Was Changed
- Added `https://www.google.com` and `https://*.google.com` to the `connect-src` directive in `public/_headers`
- This allows Google Analytics to connect to `ga-audiences` endpoint

## How to Test

### Option 1: Test on Deployed Site (Recommended)
1. Deploy the updated `public/_headers` file to Cloudflare Pages
2. Visit your site: https://thelandrymethod.com
3. Open browser DevTools (F12 or Cmd+Option+I)
4. Go to **Console** tab
5. Look for CSP errors - should see NO errors about:
   - `ga-audiences`
   - `www.google.com`
   - Content Security Policy violations

### Option 2: Test Locally (Build + Preview)
1. Build the site: `npm run build`
2. Preview: `npm run preview`
3. Open http://localhost:4173 (or the port shown)
4. Open DevTools Console
5. Check for CSP errors

### Option 3: Check Network Tab
1. Open DevTools → **Network** tab
2. Filter by "ga-audiences" or "google.com"
3. Check if requests are successful (Status 200) or blocked (Status 0/CSP error)

## Expected Results

### ✅ Success Indicators:
- **No CSP errors** in console about `ga-audiences` or `www.google.com`
- Google Analytics requests to `ga-audiences` succeed
- Network tab shows successful connections to `www.google.com`

### ❌ Failure Indicators:
- Console shows: `Refused to connect to 'https://www.google.com/ads/ga-audiences' because it violates CSP`
- Network tab shows blocked requests (red, status 0)

## Quick Console Check
Run this in browser console:
```javascript
// Check if CSP allows Google domains
console.log('CSP Test:', document.querySelector('meta[http-equiv="Content-Security-Policy"]') || 'CSP set via headers');
```

## Verification Checklist
- [ ] No CSP errors in console
- [ ] Google Analytics loads without errors
- [ ] Network requests to `www.google.com` succeed
- [ ] Site functionality unchanged (no broken features)

