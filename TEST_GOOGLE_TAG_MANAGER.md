# Testing Google Tag Manager (GTM-MPDC5HS7)

## ✅ Installation Verified

**GTM Code Status:**
- ✓ GTM script in `<head>` (GTM-MPDC5HS7)
- ✓ Noscript fallback in `<body>`
- ✓ Build successful
- ✓ GTM ID appears 2 times (correct)

---

## How to Test Google Tag Manager

### Option 1: Test Locally (Preview Server)

1. **Preview server should be running** (started in background)
   - URL: http://localhost:4173 (or check terminal for actual port)

2. **Open in browser:**
   - Visit the preview URL
   - Open DevTools (F12 or Cmd+Option+I)

3. **Check GTM is loading:**
   - **Console tab:** Look for GTM-related messages
   - **Network tab:** Filter by "gtm.js" - should see a successful request
   - **Elements tab:** Search for "dataLayer" - should exist

4. **Verify GTM container:**
   - In Console, type: `dataLayer`
   - Should see an array with GTM initialization data
   - Should see `gtm.start` event

---

### Option 2: Test on Live Site (After Deployment)

1. **Wait for Cloudflare deployment** (after PR is merged)
   - Usually takes 2-5 minutes

2. **Visit your site:**
   - https://thelandrymethod.com

3. **Use GTM Preview Mode:**
   - Go to [Google Tag Manager](https://tagmanager.google.com/)
   - Select your container (GTM-MPDC5HS7)
   - Click **Preview** button
   - Enter your site URL: `https://thelandrymethod.com`
   - Click **Connect**

4. **Verify tags fire:**
   - GTM Preview window will show which tags fired
   - Should see page view events
   - Check for any errors

---

### Option 3: Browser Console Test

**Run these commands in browser console:**

```javascript
// Check if dataLayer exists
console.log('dataLayer:', window.dataLayer);

// Check if GTM script loaded
console.log('GTM loaded:', !!window.google_tag_manager);

// Check GTM container ID
console.log('GTM Container:', window.google_tag_manager?.['GTM-MPDC5HS7']);

// Manually trigger a test event
dataLayer.push({
  'event': 'test_event',
  'test': 'GTM is working'
});
```

**Expected Results:**
- `dataLayer` should be an array with GTM data
- `window.google_tag_manager` should exist
- Container should show `GTM-MPDC5HS7`

---

### Option 4: Network Tab Verification

1. Open DevTools → **Network** tab
2. Filter by: `gtm`
3. Reload the page
4. Look for:
   - `gtm.js?id=GTM-MPDC5HS7` - Should load successfully (Status 200)
   - `collect` requests - GTM sending data to Google Analytics

---

## Common Issues & Solutions

### Issue: GTM not loading
**Check:**
- CSP allows `www.googletagmanager.com` (should be in `public/_headers`)
- Network tab shows GTM script request
- No JavaScript errors in console

### Issue: Tags not firing
**Check:**
- GTM Preview mode shows container is connected
- Tags are published in GTM dashboard
- No errors in GTM Preview debugger

### Issue: dataLayer is empty
**Check:**
- GTM script loaded (check Network tab)
- No JavaScript errors blocking execution
- Container ID matches (GTM-MPDC5HS7)

---

## Quick Verification Checklist

- [ ] GTM script in `<head>` (check page source)
- [ ] Noscript fallback in `<body>` (check page source)
- [ ] `dataLayer` exists in console
- [ ] GTM script loads (Network tab)
- [ ] GTM Preview mode connects
- [ ] Tags fire in GTM Preview
- [ ] No console errors

---

**Status:** Ready for testing  
**GTM Container ID:** GTM-MPDC5HS7  
**Next Step:** Test locally or wait for deployment

