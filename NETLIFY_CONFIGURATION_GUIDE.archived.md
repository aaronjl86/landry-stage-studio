# Complete Netlify Configuration Guide
## For landry-stage-studio

This guide covers EVERY setting you'll see in your Netlify dashboard and whether you need to configure it.

---

## ✅ REQUIRED SETTINGS (Must Be Configured)

### 1. Build & Deploy → Environment Variables
**Status:** MUST CONFIGURE
**Action Required:** Add these 3 variables:
- `VITE_SUPABASE_PROJECT_ID` = `lcwhbgfcyzefwnoblkkd`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjd2hiZ2ZjeXplZndub2Jsa2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTAyNTQsImV4cCI6MjA3NTA2NjI1NH0.C_8p4biYHN9hCQc15k6zDPPQdhOgAnI_AHjVb-6n8NQ`
- `VITE_SUPABASE_URL` = `https://lcwhbgfcyzefwnoblkkd.supabase.co`

### 2. Build & Deploy → Build Settings
**Status:** AUTO-CONFIGURED from netlify.toml
**Action Required:** None - already set in your netlify.toml file
- Build command: `npm run build`
- Publish directory: `dist`

### 3. Domain Management → Custom Domain (Optional but Recommended)
**Status:** OPTIONAL
**Action Required:** If you want a custom domain:
1. Add your domain (e.g., yourdomain.com)
2. Update DNS records as Netlify instructs
**If NOT using custom domain:** Your site works fine on netlify.app subdomain

---

## ⚠️ SHOULD CONFIGURE (Recommended)

### 4. Build & Deploy → Deploy Contexts
**Status:** RECOMMENDED
**Current Setting:** Should be "Deploy only production branch"
**Action Required:** Verify it's set to deploy only from your main/master branch

### 5. Build & Deploy → Deploy Notifications
**Status:** OPTIONAL but helpful
**Action Required:** 
- Enable email notifications for failed builds (helps you catch issues)
- You can add Slack/Discord webhooks if you use those

### 6. Security → HTTPS
**Status:** AUTO-ENABLED
**Action Required:** None - Netlify automatically provides SSL certificate
**Verify:** Should show "Your site has HTTPS enabled"

---

## ❌ NOT NEEDED FOR YOUR PROJECT

### 7. Site Settings → Identity
**Status:** NOT NEEDED
**Reason:** You're using Supabase Auth, not Netlify Identity
**Action Required:** Leave disabled

### 8. Site Settings → Forms
**Status:** NOT NEEDED  
**Reason:** Your forms don't use Netlify Forms (you use your own backend)
**Action Required:** Leave disabled

### 9. Site Settings → Functions
**Status:** NOT NEEDED
**Reason:** You use Supabase Edge Functions, not Netlify Functions
**Action Required:** Ignore this section entirely - it will show "not configured" and that's correct

### 10. Site Settings → Large Media
**Status:** NOT NEEDED
**Reason:** Your media is handled by your app and Supabase Storage
**Action Required:** Leave disabled

### 11. Site Settings → Analytics
**Status:** OPTIONAL (costs extra)
**Reason:** Netlify Analytics costs $9/month
**Action Required:** Only enable if you want to pay for Netlify's analytics
**Alternative:** Use free Google Analytics instead

### 12. Build & Deploy → Build Hooks
**Status:** NOT NEEDED (unless specific use case)
**Reason:** Webhooks for triggering builds from external services
**Action Required:** Leave empty unless you need CI/CD integration from other services

### 13. Build & Deploy → Deploy Previews
**Status:** OPTIONAL
**Reason:** Shows previews of pull requests before merging
**Action Required:** Enable if you want PR previews, otherwise leave as default

### 14. Build & Deploy → Branch Deploys
**Status:** RECOMMENDED: Disabled
**Reason:** Only deploy production branch, not all branches
**Action Required:** Set to "Deploy only production branch"

### 15. Build & Deploy → Snippet Injection
**Status:** NOT NEEDED
**Reason:** For injecting code into your site (like analytics scripts)
**Action Required:** Leave empty unless you need to inject third-party scripts

### 16. Build & Deploy → Post Processing
**Status:** AUTO-CONFIGURED from netlify.toml
**Action Required:** None - already set in netlify.toml
- Asset optimization: Enabled
- Pretty URLs: Enabled
- Bundle CSS: Enabled
- Minify CSS: Enabled
- Minify JS: Enabled
- Compress images: Enabled

### 17. Build & Deploy → Dependency Management
**Status:** AUTO-CONFIGURED
**Action Required:** None - using Node 18 from netlify.toml

### 18. Domain Management → Domain Aliases
**Status:** NOT NEEDED
**Reason:** Only needed if you have multiple domains pointing to same site
**Action Required:** Leave empty

### 19. Domain Management → HTTPS/SSL
**Status:** AUTO-ENABLED
**Action Required:** None - verify certificate shows "Active"

### 20. Security → Deploy Controls
**Status:** OPTIONAL
**Options:**
- Deploy locks (prevent deploys): Leave disabled
- Deploy passwords (password protect site): Only if you want private site

### 21. Security → Role-based Access Control
**Status:** NOT NEEDED (unless team project)
**Reason:** For team collaboration and permissions
**Action Required:** Leave as default unless you have multiple team members

---

## 📋 EVERY FIELD IN BUILD & DEPLOY SETTINGS

Looking at your Netlify dashboard, here's EXACTLY what should be in EVERY field you see:

### Build Settings Section
- **Build command:** `npm run build` (auto-fills from netlify.toml)
- **Publish directory:** `dist` (auto-fills from netlify.toml)
- **Base directory:** LEAVE BLANK (your project is in the root)
- **Functions directory:** LEAVE BLANK (you don't use Netlify Functions)
- **Package directory:** LEAVE BLANK (this is for monorepos - you're not using one)

### Build Status
- **Status:** Should show "Active" or "Building" or "Published" (automatic)
- **Build image:** Ubuntu (automatic, managed by Netlify)
- **Runtime:** LEAVE AS "Select" - DO NOT choose Angular, Gatsby, or Next.js
  - Your app is a Vite + React app, which is NOT one of these three frameworks
  - These options are for specific frameworks that need special build configurations
  - Leaving it as "Select" (unselected) is correct for your Vite setup
  - **Note:** Node.js version is controlled by NODE_VERSION in your netlify.toml (now set to 22, the current LTS), NOT by this Runtime dropdown

### Environment Variables Section
Should have these 3 variables (you already added these):
- VITE_SUPABASE_PROJECT_ID = lcwhbgfcyzefwnoblkkd
- VITE_SUPABASE_PUBLISHABLE_KEY = (the long token)
- VITE_SUPABASE_URL = https://lcwhbgfcyzefwnoblkkd.supabase.co

### Dependency Management
- **Node.js version:** 22 (from netlify.toml - current LTS version)
- **Package manager:** npm (default)
- **Lockfile:** Should detect package-lock.json automatically

### Build & Deploy Hooks
- **Build hook name:** LEAVE BLANK (only needed for external triggers)
- **Build hook URL:** LEAVE BLANK
- **Deploy notifications:** Optional - enable email for failed builds

### Deploy Contexts
- **Production branch:** `main` or `master` (whatever your default branch is)
- **Branch deploy controls:** Set to "Deploy only production branch"
- **Deploy previews:** Enable if you want PR previews, otherwise default is fine
- **Deploy preview controls:** Can leave as default

### Ignored Commands  
- **Build command:** LEAVE BLANK (uses the one from netlify.toml)
- **Deploy command:** LEAVE BLANK (not needed)

### Build Command
- **Command:** npm run build (from netlify.toml)
- **Environment:** Production (default)

### Functions Settings
- **Functions directory:** LEAVE BLANK (you don't use Netlify Functions)
- **Functions region:** Leave as default (doesn't matter since you don't use them)
- **Edge functions directory:** LEAVE BLANK (you use Supabase Edge Functions instead)

### Post Processing
All these should be auto-configured from netlify.toml:
- **Asset optimization:** Enabled
- **Pretty URLs:** Enabled
- **Bundle CSS:** Enabled
- **Minify CSS:** Enabled  
- **Minify JS:** Enabled
- **Compress images:** Enabled
- **Bundle images:** Optional (can leave default)

### Build Plugins
- **Installed plugins:** LEAVE EMPTY (you don't need build plugins)

### Notifications
- **Deploy notifications:** Enable "Failed builds" (helpful)
- **Deploy succeeded:** Optional
- **Deploy started:** Optional
- **Outgoing webhooks:** LEAVE BLANK unless you use Slack/Discord

### Sensitive Variable Policy
- **Policy:** Default is fine (restricts build logs)

### Preview Server Settings
- **Preview Server command:** LEAVE AS "Not set" (uses your local dev server settings)
- **Target port:** LEAVE AS "Not set" (Netlify will auto-detect from your dev server)
- **Preview Server size:** Leave as default (1 vCPU, 4 GB RAM, 20 GB Storage is fine)
  - **Note:** This is for Netlify CLI Preview Server, not your production deployment
  - Only matters if you're using `netlify dev` locally
  - Your production site doesn't use these settings

---

## 📋 QUICK CHECKLIST

### Must Have ✅
- [ ] 3 Environment variables added
- [ ] Build command: npm run build
- [ ] Publish directory: dist
- [ ] HTTPS enabled (automatic)
- [ ] Production branch set (main or master)

### Should Have ⚠️
- [ ] Deploy only production branch
- [ ] Deploy notifications for failures enabled

### Leave Blank ⬜
- Base directory
- Functions directory  
- Build hooks
- Any other empty fields you see

### Ignore Completely ❌
- Functions (you use Supabase)
- Identity (you use Supabase Auth)
- Forms (you handle forms yourself)
- Large Media (not needed)
- Analytics (optional, costs money)

---

## 🎯 SUMMARY

**Your site needs:**
1. Environment variables (3 of them) ✅
2. Build settings (auto-configured from netlify.toml) ✅
3. HTTPS (automatic) ✅

**Everything else:**
- Either optional or not applicable to your setup
- You can safely ignore settings that say "not configured" or "enable"
- Most features are for advanced use cases you don't need

**Your app architecture:**
- **Netlify** = Static file hosting only
- **Supabase** = All backend (database, auth, functions)
- **Lovable Cloud** = Managing your Supabase backend

This is a perfectly valid and common setup. You don't need most of Netlify's features because Supabase handles your backend.
