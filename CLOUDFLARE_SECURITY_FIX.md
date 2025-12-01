# Cloudflare Security Check Fix Guide
## Eliminate Slow Security Check Pages

**Issue:** Visitors are seeing long Cloudflare security check pages that slow down site access.

**Solution:** Adjust Cloudflare security settings to reduce unnecessary challenges.

---

## 🚀 Quick Fix Steps

### Step 1: Access Cloudflare Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain (thelandrymethod.com)
3. Navigate to **Security** → **Settings**

### Step 2: Adjust Security Level
1. Find **Security Level** setting
2. Change from **High** or **I'm Under Attack!** to **Medium** or **Low**
3. **Recommended:** Set to **Medium** for balanced protection
4. Click **Save**

**Security Level Options:**
- **Off** - No challenges (not recommended)
- **Essentially Off** - Minimal protection
- **Low** - Challenges only for the most threatening visitors
- **Medium** - Challenges for moderate threats (✅ **Recommended**)
- **High** - Challenges for many visitors (causes slow access)
- **I'm Under Attack!** - Maximum challenges (very slow, only use during active attacks)

### Step 3: Disable Bot Fight Mode (If Enabled)
1. Navigate to **Security** → **Bots**
2. Find **Bot Fight Mode**
3. If enabled, consider disabling it or setting to **Low**
4. **Note:** Bot Fight Mode can cause legitimate visitors to see challenge pages

### Step 4: Configure Challenge Passage
1. Navigate to **Security** → **WAF** → **Tools**
2. Find **Challenge Passage** setting
3. Set to **30 minutes** (default is often shorter)
4. This allows visitors who pass a challenge to skip future challenges for 30 minutes

### Step 5: Review Firewall Rules
1. Navigate to **Security** → **WAF**
2. Check for overly aggressive firewall rules
3. Look for rules that might be blocking legitimate traffic
4. Consider adding exceptions for known good traffic patterns

---

## 📊 Recommended Settings

For a public-facing website like The Landry Method:

| Setting | Recommended Value | Reason |
|---------|------------------|--------|
| **Security Level** | Medium | Balances protection with user experience |
| **Bot Fight Mode** | Off or Low | Reduces false positives for legitimate visitors |
| **Challenge Passage** | 30 minutes | Reduces repeated challenges for same visitor |
| **Browser Integrity Check** | On | Helps identify bots without full challenges |

---

## 🔍 Additional Optimizations

### Enable Always Use HTTPS
1. Navigate to **SSL/TLS** → **Overview**
2. Ensure **SSL/TLS encryption mode** is set to **Full (strict)**
3. This ensures secure connections without additional challenges

### Configure Rate Limiting (Optional)
If you're experiencing actual attacks, use rate limiting instead of security challenges:
1. Navigate to **Security** → **WAF** → **Rate limiting rules**
2. Create rules for specific attack patterns
3. This is more targeted than blanket security challenges

---

## ✅ Verification

After making changes:
1. Clear your browser cache
2. Visit your site in an incognito/private window
3. You should no longer see the long security check page
4. Site should load quickly for legitimate visitors

---

## 🚨 When to Use Higher Security

Only use **High** or **I'm Under Attack!** security levels when:
- You're actively experiencing a DDoS attack
- You're seeing unusual traffic patterns
- You need temporary protection during an incident

**Important:** Always return to **Medium** after the threat passes to restore normal site access speed.

---

## 📝 Notes

- Changes take effect immediately (no deployment needed)
- Security level changes apply to all traffic
- Monitor your site analytics after changes to ensure legitimate traffic isn't being blocked
- You can always adjust these settings based on your needs

---

**Last Updated:** January 2025



