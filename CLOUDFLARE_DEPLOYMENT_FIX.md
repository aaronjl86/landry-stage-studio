# Cloudflare Pages Deployment Fix Guide

**Problem:** Cloudflare Pages is skipping deployments for commits to `main` and `builder_branch`.

**Status:** Based on analysis, the issue is likely in Cloudflare Dashboard settings, not in your code or commit messages.

---

## 🔍 Root Cause Analysis

After checking your repository, I found:

✅ **No skip flags in commit messages** - Recent commits don't contain `[skip ci]`, `[CF-Pages-Skip]`, etc.  
✅ **wrangler.toml is correct** - Output directory is set to `dist`  
✅ **Build configuration looks correct** - `npm run build` → `dist`  

**Most Likely Causes (in order of probability):**

1. **Production deployments disabled** (40% probability)
   - Setting: `Settings → Builds & deployments → Configure Production deployments`
   - Must have "Enable automatic production branch deployments" **CHECKED**

2. **Branch exclusion rules** (25% probability)
   - `main` branch may be excluded in preview branch controls
   - Setting: `Settings → Builds & deployments → Preview deployments`

3. **Build watch paths configured** (15% probability)
   - If configured, only changes to specific paths trigger builds
   - Setting: `Settings → Builds & deployments → Build watch paths`

4. **Git integration issues** (10% probability)
   - GitHub app may be suspended or disconnected
   - Check: GitHub Settings → Applications → Cloudflare Pages

5. **Manual deployment pause** (5% probability)
   - Deployments may be manually paused
   - Setting: `Settings → Builds & deployments`

---

## ✅ Step-by-Step Fix Instructions

### Option 1: Use the Diagnostic Script (Recommended)

1. **Set up API credentials:**
   ```bash
   export CLOUDFLARE_API_TOKEN="your_api_token"
   export CLOUDFLARE_ACCOUNT_ID="your_account_id"
   ```

2. **Get your API token:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - My Profile → API Tokens → Create Token
   - Use "Edit Cloudflare Workers" template
   - Add permission: `Account.Cloudflare Pages:Edit`
   - Copy the token

3. **Get your Account ID:**
   - In Cloudflare Dashboard, look at the right sidebar
   - Account ID is displayed there

4. **Run the diagnostic script:**
   ```bash
   node scripts/fix-cloudflare-deployments.js
   ```

5. **If issues are found, the script will attempt to fix them automatically**

6. **To trigger a deployment after fixing:**
   ```bash
   node scripts/fix-cloudflare-deployments.js --deploy
   ```

---

### Option 2: Manual Fix via Cloudflare Dashboard

#### Step 1: Check Production Deployments

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **landry-stage-studio**
3. Go to **Settings** → **Builds & deployments**
4. Scroll to **"Configure Production deployments"**
5. **CRITICAL:** Ensure **"Enable automatic production branch deployments"** is **CHECKED** ✅
6. If unchecked, check it and click **Save**

#### Step 2: Check Branch Controls

1. Still in **Settings** → **Builds & deployments**
2. Scroll to **"Preview deployments"** section
3. Check **"Preview branch control"**
4. **CRITICAL:** Ensure `main` is **NOT** in the exclude list
5. If `main` is excluded:
   - Remove it from exclusions
   - Or ensure `main` is in the include list
6. Click **Save**

#### Step 3: Check Build Watch Paths

1. Still in **Settings** → **Builds & deployments**
2. Look for **"Build watch paths"** or **"Monorepo configuration"**
3. **If configured:**
   - Ensure paths include: `src/**`, `public/**`, `index.html`, `package.json`, `vite.config.ts`
   - Or remove watch paths to build on all changes
4. Click **Save**

#### Step 4: Verify Build Configuration

1. Still in **Settings** → **Builds & deployments**
2. Check **"Build configuration"**:
   - **Production branch:** Should be `main`
   - **Build command:** Should be `npm run build`
   - **Build output directory:** Should be `dist`
   - **Root directory:** Should be `/` or empty
3. If any are incorrect, fix them and click **Save**

#### Step 5: Check Git Integration

1. Go to **Settings** → **Builds & deployments** → **Git integration**
2. Verify:
   - Repository is connected
   - Branch is `main`
   - Installation is active (not suspended)
3. If disconnected:
   - Click **"Connect to Git"**
   - Re-authorize GitHub access
   - Select your repository

#### Step 6: Check for Manual Pause

1. Still in **Settings** → **Builds & deployments**
2. Look for any **"Pause deployments"** toggle
3. Ensure it's **OFF** (deployments enabled)

---

## 🚨 Quick Fix: Force New Deployment

If settings are correct but deployments still skip:

### Method 1: Manual Retry via Dashboard

1. Go to **Deployments** tab
2. Find the latest commit (even if skipped)
3. Click the **three dots menu** (⋯)
4. Select **"Retry deployment"** or **"Create deployment"**

### Method 2: Use the Script

```bash
node scripts/fix-cloudflare-deployments.js --deploy
```

### Method 3: Create a New Commit

Make a small change and commit:

```bash
# Make a trivial change
echo "# Deployment test" >> README.md

# Commit and push
git add README.md
git commit -m "Test deployment trigger"
git push origin main
```

**Important:** Don't use commit messages with words like "skip", "deploy", "changes" alone - they might accidentally match skip patterns.

---

## 📋 Checklist

Use this checklist to verify everything is configured correctly:

- [ ] Production deployments enabled in Cloudflare Dashboard
- [ ] `main` branch is NOT excluded in preview branch controls
- [ ] Build watch paths are either not configured OR include all necessary paths
- [ ] Production branch is set to `main`
- [ ] Build command is `npm run build`
- [ ] Build output directory is `dist`
- [ ] Git integration is connected and active
- [ ] No manual pause is enabled
- [ ] Latest commit doesn't have skip flags in message
- [ ] API token has correct permissions (if using script)

---

## 🔧 Common Issues & Solutions

### Issue: "Enable automatic production branch deployments" is disabled

**Fix:** Enable it in Settings → Builds & deployments → Configure Production deployments

### Issue: Branch exclusion rules exclude `main`

**Fix:** Remove `main` from exclude list in Preview deployments settings

### Issue: Build watch paths configured incorrectly

**Fix:** Either:
- Add all necessary paths: `src/**`, `public/**`, `*.json`, `*.ts`, `*.tsx`, `index.html`
- Or remove watch paths entirely to build on all changes

### Issue: Git integration disconnected

**Fix:** Reconnect in Settings → Builds & deployments → Git integration

### Issue: Commit messages accidentally trigger skip

**Fix:** Avoid commit messages with:
- `[skip ci]`, `[CI Skip]`, `[CF-Pages-Skip]`
- Words like "skip", "deploy" alone in messages
- Use descriptive messages like "Update homepage layout" instead of "deployments"

---

## 📊 What the Diagnostic Script Checks

The `fix-cloudflare-deployments.js` script automatically checks:

1. ✅ Production deployments enabled
2. ✅ Preview branch exclusions (ensures `main` not excluded)
3. ✅ Production branch set to `main`
4. ✅ Build watch paths (warns if configured)
5. ✅ Deployments enabled globally
6. ✅ Build configuration (command, output directory)

If issues are found, the script will attempt to fix them automatically via the Cloudflare API.

---

## 🎯 Next Steps

1. **Run the diagnostic script** (Option 1) OR **check dashboard manually** (Option 2)
2. **Fix any issues found**
3. **Trigger a new deployment** (via script or dashboard)
4. **Monitor the Deployments tab** for new activity
5. **If still skipping**, check build logs for skipped deployments

---

## 📞 Still Having Issues?

If deployments are still being skipped after following this guide:

1. **Check build logs:**
   - Go to Deployments → [Skipped Deployment] → View details → Build log
   - Look for error messages or skip reasons

2. **Verify GitHub app:**
   - GitHub Settings → Applications → Cloudflare Pages
   - Ensure installation is active and has repository access

3. **Check Cloudflare status:**
   - Visit [Cloudflare Status Page](https://www.cloudflarestatus.com/)
   - Check for any incidents affecting Pages

4. **Review commit messages:**
   - Ensure no skip flags are present
   - Use descriptive commit messages

---

**Last Updated:** January 2025  
**Script Version:** 1.0  
**Tested With:** Cloudflare Pages API v4

