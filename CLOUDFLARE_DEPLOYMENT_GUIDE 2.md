# Cloudflare Pages Deployment Guide

This guide walks you through deploying the Landry Stage Studio application to Cloudflare Pages.

## Why Cloudflare Pages?

### Free Tier Benefits
- ✅ **Unlimited sites and requests**
- ✅ **Unlimited bandwidth**
- ✅ **500 builds per month**
- ✅ **Automatic preview deployments** for pull requests
- ✅ **Global CDN** with edge caching
- ✅ **Built-in DDoS protection**
- ✅ **Automatic HTTPS**
- ✅ **Git integration** with GitHub/GitLab

### Comparison to Netlify
- No bandwidth limits on free tier
- No build minute restrictions (500 builds/month vs time-based)
- Faster global CDN performance
- Better integration with Cloudflare's ecosystem

## Prerequisites

1. A Cloudflare account (free) - [Sign up here](https://dash.cloudflare.com/sign-up)
2. GitHub repository with your code
3. Environment variables from Supabase

## Step-by-Step Deployment

### 1. Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Workers & Pages** in the left sidebar
3. Click **Create application** → **Pages** → **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select your repository: `aaronjl86/landry-stage-studio`

### 2. Configure Build Settings

Use these exact settings:

| Setting | Value |
|---------|-------|
| **Project name** | `landry-stage-studio` (or your choice) |
| **Production branch** | `main` |
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave as default) |
| **Node version** | `20` |

### 3. Configure Environment Variables

⚠️ **IMPORTANT**: Add these environment variables in the Cloudflare dashboard:

1. In your Pages project, go to **Settings** → **Environment variables**
2. Click **Add variable** for each of the following:

#### Production Variables

```
VITE_SUPABASE_PROJECT_ID=lcwhbgfcyzefwnoblkkd
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjd2hiZ2ZjeXplZndub2Jsa2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTAyNTQsImV4cCI6MjA3NTA2NjI1NH0.C_8p4biYHN9hCQc15k6zDPPQdhOgAnI_AHjVb-6n8NQ
VITE_SUPABASE_URL=https://lcwhbgfcyzefwnoblkkd.supabase.co
```

3. Set each variable's environment to **Production** (and optionally **Preview** for testing)

### 4. Deploy

1. Click **Save and Deploy**
2. Cloudflare will clone your repository and start building
3. Build typically takes 2-3 minutes
4. Once complete, you'll get a URL like: `landry-stage-studio.pages.dev`

### 5. Custom Domain (Optional)

To use your own domain:

1. Go to **Custom domains** in your Pages project
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `landry-stage-studio.com`)
4. Follow the DNS configuration instructions
5. Cloudflare automatically provisions SSL certificates

## Features & Configuration

### Automatic Deployments

- **Production**: Every push to `main` branch triggers a production deployment
- **Preview**: Every pull request gets its own preview URL
- **Branch Previews**: Enable branch previews in Settings for staging branches

### SPA Routing

The `wrangler.toml` configuration handles Single Page Application routing:
- All routes redirect to `index.html`
- React Router handles client-side routing
- No 404 errors on page refresh

### Security Headers

Built-in security headers configured in `wrangler.toml`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restrictions

### Caching

Optimized caching for performance:
- Static assets (`/assets/*`): 1 year cache
- JavaScript files: 1 year cache with immutable flag
- CSS files: 1 year cache with immutable flag

## Monitoring & Analytics

### Built-in Analytics

1. Go to your Pages project dashboard
2. Click **Analytics** tab
3. View:
   - Page views and unique visitors
   - Top pages and referrers
   - Geographic distribution
   - Response times

### Web Analytics (Optional)

Enable Cloudflare Web Analytics for more detailed insights:
1. Go to **Analytics** → **Web Analytics**
2. Add your site
3. No tracking cookies required (privacy-friendly)

## Rollbacks

To rollback to a previous deployment:

1. Go to **Deployments** in your Pages project
2. Find the working deployment
3. Click **···** → **Rollback to this deployment**
4. Confirm rollback

## Troubleshooting

### Build Fails

**Issue**: Build fails with module not found
- **Solution**: Ensure `package-lock.json` is committed to git
- **Solution**: Check Node version is set to 20 in environment variables

**Issue**: Environment variables not working
- **Solution**: Environment variables must be prefixed with `VITE_`
- **Solution**: Restart build after adding variables

### Site Not Loading

**Issue**: 404 errors on routes
- **Solution**: Verify `wrangler.toml` redirects are configured
- **Solution**: Check `dist` folder contains `index.html`

**Issue**: White screen / blank page
- **Solution**: Check browser console for errors
- **Solution**: Verify environment variables are set correctly

### Supabase Connection Issues

**Issue**: "Failed to connect to Supabase"
- **Solution**: Verify all 3 environment variables are set
- **Solution**: Check Supabase project is active
- **Solution**: Verify API keys are correct (no quotes in dashboard)

## Performance Optimization

### Automatic Optimizations

Cloudflare Pages automatically:
- Minifies HTML, CSS, and JavaScript
- Compresses with Brotli and Gzip
- Serves from nearest edge location
- Caches static assets globally

### Manual Optimizations

1. **Enable Auto Minify**:
   - Go to **Speed** → **Optimization**
   - Enable Auto Minify for HTML, CSS, JS

2. **Enable Rocket Loader** (optional):
   - Defers JavaScript loading
   - May improve initial page load

3. **Image Optimization**:
   - Consider Cloudflare Images for resizing
   - Use WebP format where possible

## CI/CD Integration

### GitHub Actions

Deployments happen automatically via Git push, but you can add additional CI/CD:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: landry-stage-studio
          directory: dist
```

## Migration from Netlify

### What to Keep
- ✅ All source code stays the same
- ✅ Supabase configuration unchanged
- ✅ Build commands identical
- ✅ Environment variables (just reconfigure)

### What to Remove (Optional)
- `netlify.toml` (replaced by `wrangler.toml`)
- `public/_redirects` (handled by wrangler.toml)
- Netlify-specific documentation

### DNS Changes (if using custom domain)
1. Remove Netlify DNS records
2. Add Cloudflare DNS records per their instructions
3. SSL certificates automatically provisioned

## Support & Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#cloudflare-pages)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Cloudflare Discord](https://discord.gg/cloudflaredev)

## Cost Comparison

### Free Tier Limits

| Feature | Cloudflare Pages | Netlify Free |
|---------|------------------|--------------|
| Bandwidth | **Unlimited** | 100 GB/month |
| Builds | 500/month | 300 min/month |
| Sites | **Unlimited** | 1 concurrent build |
| Team members | **Unlimited** | 1 |
| Build time | 20 min/build | Shared pool |

### When to Upgrade

Cloudflare Pages Free tier is sufficient for most projects. Consider upgrading if:
- You need more than 500 builds/month
- You want priority support
- You need advanced features like A/B testing

---

**Last Updated**: January 2025
**Cloudflare Pages Version**: v2
**Node Version**: 20.x
