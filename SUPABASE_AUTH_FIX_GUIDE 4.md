# Supabase Authentication 422 Error - Fix Guide
**Issue:** Account creation returns 422 (Unprocessable Entity) error  
**Project:** The Landry Method (lcwhbgfcyzefwnoblkkd)

---

## 🔍 Problem Analysis

The 422 error when signing up indicates Supabase is rejecting the sign-up request. Common causes:

1. **Email confirmation required** but SMTP not configured
2. **Email domain restrictions** in place
3. **Rate limiting** or security restrictions
4. **Missing auth configuration** in Supabase project

---

## ✅ Step-by-Step Fix Instructions

### Step 1: Access Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Log in to your account
3. Select project: **The Landry Method** (lcwhbgfcyzefwnoblkkd)

---

### Step 2: Check Authentication Settings

Navigate to: **Authentication → Settings**

#### A. Email Configuration

**Location:** Authentication → Settings → Email Auth

**Check these settings:**

1. **Enable Email Confirmations:**
   - If ENABLED: Users must confirm email before login
   - If DISABLED: Users can log in immediately (recommended for testing)
   
   **Recommended for Testing:**
   ```
   ☐ Enable email confirmations
   ```
   
   **Recommended for Production:**
   ```
   ☑ Enable email confirmations
   ```

2. **Double Confirm Email Changes:**
   ```
   ☐ Double Confirm Email Changes (disable for testing)
   ```

3. **Secure Email Change:**
   ```
   ☐ Secure Email Change Enabled (disable for testing)
   ```

#### B. Email Templates

**Location:** Authentication → Email Templates

Verify these templates exist:
- ✅ Confirmation Email
- ✅ Magic Link
- ✅ Change Email Address
- ✅ Reset Password

**If missing:** Supabase will provide defaults, but check they're enabled

---

### Step 3: Configure SMTP (If Email Confirmation Enabled)

**Location:** Project Settings → Auth

If you have "Enable email confirmations" turned ON, you MUST configure SMTP:

1. Scroll to **SMTP Settings**
2. Choose one of:

#### Option A: Use Supabase's Built-in Email (Easiest)
- Supabase provides limited email sending for testing
- Should work out of the box
- Limited to ~50 emails/day

#### Option B: Configure Custom SMTP (Production)
```
SMTP Host: smtp.your-provider.com
SMTP Port: 587
SMTP User: your-email@domain.com
SMTP Password: your-password
SMTP Sender Email: noreply@thelandrymethod.com
SMTP Sender Name: The Landry Method
```

**Recommended SMTP Providers:**
- SendGrid (free tier: 100 emails/day)
- Mailgun (free tier: 5,000 emails/month)
- AWS SES (very cheap, requires AWS account)
- Resend (modern, developer-friendly)

---

### Step 4: Check Email Domain Restrictions

**Location:** Authentication → Settings → Email Auth

Look for "Allowed Email Domains" or similar setting:

**Current Issue:** You may have domain restrictions that block test emails like:
- `sarah.anderson.test@landrymethod.com`
- `@example.com` domains
- Disposable email services

**Fix Options:**

#### Option 1: Remove Domain Restrictions (Best for Testing)
```
Allowed Domains: (leave blank or set to *)
```

#### Option 2: Add Specific Domains
```
Allowed Domains: 
- landrymethod.com
- gmail.com
- outlook.com
- yahoo.com
```

---

### Step 5: Check Rate Limiting

**Location:** Authentication → Rate Limits

Supabase has built-in rate limiting. Check:

```
Sign Up Rate Limit: X requests per hour per IP
```

If too restrictive during testing, temporarily increase or disable.

---

### Step 6: Check Auth Providers

**Location:** Authentication → Providers

Ensure **Email** provider is enabled:

```
☑ Email (should be checked)
☐ Phone (optional)
☐ Google (optional)
☐ GitHub (optional)
```

---

## 🧪 Testing the Fix

### Quick Test (Recommended)

**After making changes above:**

1. **Disable Email Confirmations** (for initial testing)
2. Go to: http://localhost:8083/auth
3. Click "Sign up"
4. Use a REAL email you can access:
   ```
   Name: Your Name
   Email: youremail@gmail.com (use real Gmail/Outlook)
   Password: TestPass123!
   ```
5. Click "Create Account"
6. **Expected Result:** Success! Redirects to dashboard

---

### If Still Getting 422 Error:

#### Check Supabase Logs

**Location:** Logs → Auth Logs

1. Look for the failed sign-up attempt
2. Click on it to see detailed error message
3. Common errors you'll see:
   - "Email confirmation required but SMTP not configured"
   - "Email domain not allowed"
   - "Rate limit exceeded"
   - "Invalid email format"

---

## 🔧 Quick Fix (Testing Only)

If you want to test RIGHT NOW without fixing Supabase settings:

### Option 1: Create User Manually

1. Go to Supabase Dashboard
2. Navigate to: **Authentication → Users**
3. Click "Add user"
4. Fill in:
   ```
   Email: test@thelandrymethod.com
   Password: TestPass123!
   Auto Confirm Email: ☑ (check this!)
   ```
5. Click "Create user"
6. Now you can log in with these credentials

### Option 2: Use SQL to Create User

1. Go to: **SQL Editor**
2. Run this query:
```sql
-- Create a test user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_sent_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@thelandrymethod.com',
  crypt('TestPass123!', gen_salt('bf')),
  NOW(),
  '',
  '',
  '',
  '',
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Test User"}',
  false,
  NOW()
);

-- Create profile for the user
INSERT INTO public.profiles (id, quota, used)
SELECT 
  id,
  10, -- Starter plan quota
  0   -- No credits used yet
FROM auth.users 
WHERE email = 'test@thelandrymethod.com';
```

3. Now log in with:
   - Email: `test@thelandrymethod.com`
   - Password: `TestPass123!`

---

## 📋 Recommended Configuration for Production

Once you've tested and everything works:

```yaml
Email Confirmations: ENABLED
Secure Email Change: ENABLED
SMTP Provider: SendGrid / Mailgun / AWS SES
Allowed Domains: 
  - landrymethod.com (for staff)
  - * (allow all for customers)
Rate Limits: 
  - Sign Up: 10 per hour per IP
  - Sign In: 20 per hour per IP
  - Password Reset: 5 per hour per IP
```

---

## 🎯 Most Likely Fix

Based on the 422 error, the most common issue is:

**EMAIL CONFIRMATIONS ENABLED WITHOUT SMTP CONFIGURED**

**Quick Fix:**
1. Go to Authentication → Settings
2. Find "Enable email confirmations"
3. **UNCHECK IT** (for testing)
4. Save
5. Try signing up again

This will allow immediate account creation without email confirmation.

---

## ✅ Verification Checklist

After making changes, verify:

- [ ] Can create new account successfully
- [ ] User appears in Authentication → Users
- [ ] User has profile in profiles table
- [ ] Can log in with new account
- [ ] Can log out
- [ ] Dashboard shows correct credit balance
- [ ] No 422 errors in console

---

## 📞 If Still Not Working

1. **Check Supabase Logs:**
   - Go to Logs → Auth Logs
   - Find the failed attempt
   - Read the detailed error message

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for detailed error messages
   - May show more specific Supabase errors

3. **Common Issues:**
   - CORS settings (unlikely with same-origin requests)
   - API key expired or invalid (check .env)
   - Supabase project paused (free tier limitation)
   - Database migrations not run

4. **Contact Support:**
   - Supabase Discord: https://discord.supabase.com
   - Or check: https://supabase.com/docs/guides/auth

---

## 🔑 Environment Variables to Check

Make sure these are set correctly in `.env`:

```bash
VITE_SUPABASE_URL=https://lcwhbgfcyzefwnoblkkd.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These look correct based on what I see.

---

## 📝 Summary

**The 422 error is definitely a Supabase configuration issue, not a code issue.**

**Most likely fix:** Disable email confirmations for testing

**Steps:**
1. Supabase Dashboard → Authentication → Settings
2. Uncheck "Enable email confirmations"
3. Save
4. Try signing up again

This should resolve the issue immediately.

---

**After this is fixed, you'll be able to:**
✅ Create accounts
✅ Test subscription payments
✅ Test editor functionality
✅ Test credit tracking
✅ Complete end-to-end testing
