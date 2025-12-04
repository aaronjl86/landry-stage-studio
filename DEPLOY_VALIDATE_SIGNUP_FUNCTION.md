# Deploy validate-signup Edge Function

## Option 1: Deploy via Supabase Dashboard (Recommended - Easiest)

1. **Go to Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard
   - Select your project: **The Landry Method** (lcwhbgfcyzefwnoblkkd)

2. **Navigate to Edge Functions**:
   - Click **Edge Functions** in the left sidebar
   - Find **validate-signup** in the list

3. **Deploy the Function**:
   - Click on **validate-signup**
   - Click **Deploy** or **Redeploy** button
   - Wait for deployment to complete (usually 30-60 seconds)

**Note**: The function code is already updated in your repository. The dashboard will pull the latest code from your connected Git repository, OR you can copy-paste the code directly.

---

## Option 2: Deploy via Supabase CLI (Requires Authentication)

### Step 1: Login to Supabase CLI

Open a terminal and run:

```bash
npx supabase login
```

This will open a browser window for authentication. Follow the prompts to log in.

### Step 2: Link Your Project

```bash
cd /Users/thataaronguy/Documents/GitHub/landry-stage-studio
npx supabase link --project-ref lcwhbgfcyzefwnoblkkd
```

### Step 3: Deploy the Function

```bash
npx supabase functions deploy validate-signup
```

---

## Option 3: Manual Code Update via Dashboard

If you can't deploy via Git, you can manually update the function code:

1. **Go to Supabase Dashboard** → **Edge Functions** → **validate-signup**
2. **Click "Edit Function"** or open the code editor
3. **Replace the return statement** (around line 65-76) with:

```typescript
// Always return 200, let the frontend decide based on allowed flag
return new Response(
  JSON.stringify({
    allowed: abuseCheck.allowed,
    risk_score: abuseCheck.risk_score,
    requires_verification: abuseCheck.requires_verification,
    message: abuseCheck.reason
  }),
  {
    status: 200,  // Changed from: status: abuseCheck.allowed ? 200 : 403
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  }
);
```

4. **Save and Deploy**

---

## Verify Deployment

After deployment, test the function:

1. Try signing up again
2. Check browser console - the 403 error should be gone
3. The function should now return 200 with `allowed: true/false` in the response

---

## What Changed?

The function was updated to:
- **Always return HTTP 200** (instead of 403 when blocked)
- **Include `allowed: false` in the response body** when signup should be blocked
- **Let the frontend decide** whether to block signup based on the `allowed` flag

This prevents the 403 error from blocking the signup flow, while still allowing the validation logic to work.

