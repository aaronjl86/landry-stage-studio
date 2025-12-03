# Postman Collections Setup Guide

**Date:** January 2025  
**Status:** ✅ Collections Created

---

## 📦 Collections Created

I've created two Postman collections for you:

### 1. **Cloudflare Pages API - Landry Stage Studio**
   - **Collection ID:** `990d99f4-bb6d-40ab-8a35-8790bd081adf`
   - **UID:** `50482314-990d99f4-bb6d-40ab-8a35-8790bd081adf`

   **Requests included:**
   - Get Project - View project settings and configuration
   - List Deployments - View recent deployments with status
   - Create Deployment - Trigger a new deployment from a branch
   - Update Project Settings - Modify build configuration

### 2. **Supabase Edge Functions - Landry Stage Studio**
   - **Collection ID:** `36e7bf2c-cf59-4e0c-bf07-2cb965d9dde0`
   - **UID:** `50482314-36e7bf2c-cf59-4e0c-bf07-2cb965d9dde0`

   **Requests included:**
   - Create Checkout Session - Test Stripe checkout flow
   - Get Credit Balance - Check user credit balance
   - Check Subscription - Verify subscription status
   - Edit Photo - Test AI photo editing function
   - Generate Image - Test AI image generation
   - Customer Portal - Access Stripe customer portal

---

## 🚀 Quick Start

### Step 1: Import Environment Variables

1. Open Postman
2. Click **Environments** in the left sidebar
3. Click **Import**
4. Select the file: `postman-environment.json`
5. The environment will be created with all your API keys

### Step 2: Select the Environment

1. In the top right of Postman, click the environment dropdown
2. Select **"Landry Stage Studio - Development"**

### Step 3: Use the Collections

The collections are already in your workspace:
- **ThatAaronGuy's Workspace** → **Cloudflare Pages API - Landry Stage Studio**
- **ThatAaronGuy's Workspace** → **Supabase Edge Functions - Landry Stage Studio**

---

## 🔑 Environment Variables

Your environment includes:

| Variable | Description | Value |
|----------|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token | ✅ Set |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | ✅ Set |
| `PROJECT_NAME` | Cloudflare Pages project name | `landry-stage-studio` |
| `SUPABASE_URL` | Supabase project URL | ✅ Set |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ Set |
| `SUPABASE_JWT_TOKEN` | User JWT token | ⚠️ Set manually after login |

---

## 📝 Getting Your JWT Token (for Supabase Functions)

To test Supabase Edge Functions that require authentication:

### Method 1: From Browser Console

1. Log into your app at `https://landry-stage-studio.pages.dev`
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Run:
   ```javascript
   JSON.parse(localStorage.getItem('sb-lcwhbgfcyzefwnoblkkd-auth-token')).access_token
   ```
5. Copy the token
6. In Postman, update `SUPABASE_JWT_TOKEN` variable

### Method 2: From Supabase Client

1. In your app, after logging in, run in console:
   ```javascript
   const { data } = await supabase.auth.getSession();
   console.log(data.session.access_token);
   ```

---

## 🧪 Testing Cloudflare Pages API

### Example: Trigger a Deployment

1. Open **Cloudflare Pages API** collection
2. Select **"Create Deployment"** request
3. Click **Send**
4. You should see a response with deployment details

### Example: Check Recent Deployments

1. Select **"List Deployments"** request
2. Click **Send**
3. View all recent deployments with their status

---

## 🧪 Testing Supabase Edge Functions

### Example: Get Credit Balance

1. **First, get your JWT token** (see above)
2. Open **Supabase Edge Functions** collection
3. Select **"Get Credit Balance"** request
4. Click **Send**
5. You should see your current credit balance

### Example: Create Checkout Session

1. Select **"Create Checkout Session"** request
2. Update the `priceId` in the request body if needed
3. Click **Send**
4. You'll get a Stripe checkout URL

---

## 📋 Available Price IDs

For testing checkout sessions, use these Stripe Price IDs:

### Monthly Plans:
- **Starter:** `price_1SF3ZN3pODi329mx0uqGFYz2`
- **Professional:** `price_1SF3bN3pODi329mxvDZO99kU`
- **Enterprise:** `price_1SF3cx3pODi329mxTwQjBJbv`

### Yearly Plans:
- **Starter:** `price_1SF3dq3pODi329mxs5VZbdJo`
- **Professional:** `price_1SF3e73pODi329mx35xLMDMT`
- **Enterprise:** `price_1SF3fk3pODi329mxfilFAFfg`

---

## 🔒 Security Notes

⚠️ **Important:**
- The `postman-environment.json` file contains sensitive API keys
- **DO NOT** commit this file to git (it's already in `.gitignore`)
- Keep your Postman API key secure
- Rotate API keys if they're ever exposed

---

## 🛠️ Troubleshooting

### Issue: "Unauthorized" errors

**Solution:** 
- Check that `CLOUDFLARE_API_TOKEN` is set correctly
- Verify the token has correct permissions
- For Supabase functions, ensure `SUPABASE_JWT_TOKEN` is set

### Issue: "Collection not found"

**Solution:**
- Collections are in your workspace: **ThatAaronGuy's Workspace**
- Refresh Postman or check you're logged in with the correct account

### Issue: Supabase functions return 401

**Solution:**
- Get a fresh JWT token (they expire)
- Make sure you're logged into your app
- Update `SUPABASE_JWT_TOKEN` in the environment

---

## 📚 Next Steps

1. ✅ Import the environment file
2. ✅ Test Cloudflare Pages API requests
3. ✅ Get your JWT token and test Supabase functions
4. ✅ Add more requests to collections as needed
5. ✅ Share collections with your team

---

## 🔗 Useful Links

- [Postman Documentation](https://learning.postman.com/)
- [Cloudflare Pages API Docs](https://developers.cloudflare.com/api/operations/pages-project-get-project)
- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)

---

**Collections Created:** 2  
**Environment Variables:** 6  
**Status:** ✅ Ready to use

