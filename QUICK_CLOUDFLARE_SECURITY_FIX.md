# Quick Cloudflare Security Fix
## Fix Slow Security Check Pages in 2 Minutes

This guide will help you quickly adjust Cloudflare security settings to eliminate the slow security check pages.

---

## Option 1: Automated Script (Recommended - 2 minutes)

### Step 1: Get Your Cloudflare API Token (1 minute)

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Click **"Edit zone DNS"** template (or use "Custom token")
4. Set permissions:
   - **Zone** → **Zone Settings** → **Edit**
   - **Zone** → **Zone** → **Read**
5. Set Zone Resources to: **Include** → **Specific zone** → `thelandrymethod.com`
6. Click **"Continue to summary"** → **"Create Token"**
7. **Copy the token** (you'll only see it once!)

### Step 2: Run the Script (30 seconds)

**Using Node.js (recommended):**
```bash
cd /Users/thataaronguy/Documents/GitHub/landry-stage-studio
CLOUDFLARE_API_TOKEN=your_token_here node scripts/adjust-cloudflare-security.js
```

**Using Bash:**
```bash
cd /Users/thataaronguy/Documents/GitHub/landry-stage-studio
export CLOUDFLARE_API_TOKEN=your_token_here
./scripts/adjust-cloudflare-security.sh
```

The script will automatically:
- ✅ Set Security Level to **Medium** (balanced protection)
- ✅ Disable **Bot Fight Mode** (reduces false positives)
- ✅ Set **Challenge Passage** to **30 minutes** (fewer repeated challenges)

---

## Option 2: Manual Dashboard Fix (5 minutes)

If you prefer to do it manually:

1. Go to: https://dash.cloudflare.com
2. Select domain: **thelandrymethod.com**
3. Navigate to **Security** → **Settings**
4. Change **Security Level** from "High" or "I'm Under Attack!" to **"Medium"**
5. Navigate to **Security** → **Bots**
6. Set **Bot Fight Mode** to **"Off"** (or "Low" if you want some protection)
7. Navigate to **Security** → **WAF** → **Tools**
8. Set **Challenge Passage** to **30 minutes**
9. Save all changes

---

## ✅ Verification

After running the script or making manual changes:

1. Open an **incognito/private browser window**
2. Visit your site: https://thelandrymethod.com
3. You should **no longer see** the long security check page
4. Site should load quickly

---

## 🔧 Troubleshooting

**If the script fails:**
- Make sure your API token has the correct permissions
- Verify the domain name matches exactly: `thelandrymethod.com`
- Check that you're using the correct token (not the Global API Key)

**If you still see security checks:**
- Wait 1-2 minutes for changes to propagate
- Clear your browser cache
- Try a different browser or incognito mode
- Check if you have any custom firewall rules that might be causing challenges

---

## 📊 What Changed?

| Setting | Before | After | Impact |
|---------|--------|-------|--------|
| Security Level | High/I'm Under Attack! | Medium | Faster access, balanced protection |
| Bot Fight Mode | On | Off | No false positives for legitimate visitors |
| Challenge Passage | 5-15 min | 30 min | Fewer repeated challenges |

---

**Time to complete:** ~2 minutes with script, ~5 minutes manually  
**Result:** Fast site access without slow security check pages



