# Migration Summary: Netlify → Cloudflare Pages

**Date**: January 10, 2025  
**Status**: ✅ Ready to Deploy

## What Was Done

### Files Created
1. **`wrangler.toml`** - Cloudflare Pages configuration
   - Build settings (npm run build → dist)
   - SPA routing redirects
   - Security headers
   - Static asset caching

2. **`CLOUDFLARE_DEPLOYMENT_GUIDE.md`** - Complete deployment guide
   - Step-by-step setup instructions
   - Environment variable configuration
   - Troubleshooting tips
   - Performance optimization guide

3. **`public/_redirects`** - SPA routing fallback
   - Ensures all routes work with React Router
   - Backup for wrangler.toml routing

### Files Archived
- **`NETLIFY_CONFIGURATION_GUIDE.md`** → `NETLIFY_CONFIGURATION_GUIDE.archived.md`

### Files to Keep (No Changes Needed)
- ✅ All source code (`src/`)
- ✅ Build configuration (`vite.config.ts`, `package.json`)
- ✅ Supabase integration
- ✅ Environment variables (`.env`, `.env.production`)
- ✅ `netlify.toml` (can be removed after Cloudflare deployment is verified)

## What You Need to Do

### 1. Commit & Push Changes
```bash
git add .
git commit -m "Add Cloudflare Pages configuration"
git push origin main
```

### 2. Set Up Cloudflare Pages

Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) and follow these steps:

#### A. Create Project
1. Click **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Select repository: `aaronjl86/landry-stage-studio`
3. Click **Begin setup**

#### B. Configure Build Settings
| Setting | Value |
|---------|-------|
| Project name | `landry-stage-studio` |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |

#### C. Add Environment Variables
In **Settings** → **Environment variables**, add:

```
VITE_SUPABASE_PROJECT_ID=lcwhbgfcyzefwnoblkkd
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjd2hiZ2ZjeXplZndub2Jsa2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTAyNTQsImV4cCI6MjA3NTA2NjI1NH0.C_8p4biYHN9hCQc15k6zDPPQdhOgAnI_AHjVb-6n8NQ
VITE_SUPABASE_URL=https://lcwhbgfcyzefwnoblkkd.supabase.co
```

Set environment to: **Production** (and optionally **Preview**)

#### D. Deploy
1. Click **Save and Deploy**
2. Wait 2-3 minutes for build to complete
3. Your site will be live at: `https://landry-stage-studio.pages.dev`

### 3. Test Your Deployment

After deployment completes:

✅ **Homepage loads correctly**
- Navigate to your Cloudflare Pages URL
- Check that all images and styles load

✅ **Authentication works**
- Test sign up / sign in
- Verify Supabase connection

✅ **Routing works**
- Navigate to different pages
- Refresh the page (should not get 404)

✅ **Image upload/processing works**
- Test photo upload feature
- Verify AI processing functionality

### 4. Clean Up Netlify (After Verification)

Once you've verified Cloudflare deployment works:

1. Go to Netlify dashboard
2. Delete the site (or just stop builds to keep the site paused)
3. Remove local Netlify files (optional):
   ```bash
   git rm netlify.toml
   git commit -m "Remove Netlify configuration"
   git push
   ```

## Benefits of This Migration

### Cost Savings
- ❌ Netlify: Limited to 100GB bandwidth, 300 build minutes
- ✅ Cloudflare: **Unlimited bandwidth**, 500 builds/month

### Performance
- 🚀 Cloudflare's global CDN (faster edge locations)
- 🚀 Automatic Brotli compression
- 🚀 Built-in DDoS protection
- 🚀 Optimized caching

### Developer Experience
- 📦 Automatic preview deployments for PRs
- 📊 Built-in analytics
- 🔄 Easy rollbacks
- 🔒 Automatic HTTPS

## Support

If you encounter any issues:

1. **Check the guide**: Open `CLOUDFLARE_DEPLOYMENT_GUIDE.md`
2. **Troubleshooting section**: Common issues and solutions
3. **Cloudflare Docs**: https://developers.cloudflare.com/pages/
4. **Community Support**: https://community.cloudflare.com/

## Quick Reference

### Your URLs
- **Production**: `https://landry-stage-studio.pages.dev` (after deployment)
- **Custom Domain**: Configure in Cloudflare dashboard
- **GitHub Repo**: `https://github.com/aaronjl86/landry-stage-studio`

### Important Files
- `wrangler.toml` - Cloudflare configuration
- `CLOUDFLARE_DEPLOYMENT_GUIDE.md` - Detailed guide
- `public/_redirects` - SPA routing fallback

### Build Info
- Framework: Vite + React + TypeScript
- Output: `dist/` directory
- Node Version: 20
- Backend: Supabase Edge Functions (unchanged)

---

**Ready to deploy!** Follow the steps above to complete your migration to Cloudflare Pages.
