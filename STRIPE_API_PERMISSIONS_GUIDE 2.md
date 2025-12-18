# Stripe API Permissions Guide for Cline

## Recommended Permissions for Maximum Utility

Here are the Stripe permissions that would be most helpful for automating tasks:

---

## Essential Permissions (High Priority)

### 1. **Products - Write Access**
**Permission**: `Products: Write`

**What I Can Do:**
- ✅ Create new subscription products
- ✅ Update product descriptions and metadata
- ✅ Archive old products
- ✅ Modify product images and details

**Use Cases:**
- Create new subscription tiers
- Update product descriptions when features change
- Archive outdated products
- Add metadata for tracking/automation

---

### 2. **Prices - Write Access**
**Permission**: `Prices: Write`

**What I Can Do:**
- ✅ Create new pricing tiers
- ✅ Set up monthly/yearly billing
- ✅ Configure trial periods
- ✅ Create promotional pricing

**Use Cases:**
- Add new pricing options
- Create limited-time offers
- Set up tiered pricing structures
- Configure billing intervals

---

### 3. **Subscriptions - Read Access**
**Permission**: `Subscriptions: Read`

**What I Can Do:**
- ✅ Check active subscription counts
- ✅ View subscription details
- ✅ Monitor plan distribution
- ✅ Generate reports on revenue

**Use Cases:**
- Analyze which plans are most popular
- Check subscriber counts
- Monitor churn rates
- Verify subscription status

---

## Useful Permissions (Medium Priority)

### 4. **Customers - Read/Write Access**
**Permission**: `Customers: Write`

**What I Can Do:**
- ✅ View customer details
- ✅ Update customer metadata
- ✅ Add customer notes
- ✅ Manage customer tax IDs

**Use Cases:**
- Update customer records
- Add usage tracking metadata
- Manage customer support notes
- Sync customer data

---

### 5. **Coupons - Write Access**
**Permission**: `Coupons: Write`

**What I Can Do:**
- ✅ Create discount codes
- ✅ Set up promotional offers
- ✅ Configure redemption limits
- ✅ Create time-limited promotions

**Use Cases:**
- Launch promotional campaigns
- Create referral discounts
- Set up seasonal offers
- Implement retention discounts

---

### 6. **Webhooks - Read/Write Access**
**Permission**: `Webhook endpoints: Write`

**What I Can Do:**
- ✅ Create webhook endpoints
- ✅ Update webhook configurations
- ✅ Test webhook deliveries
- ✅ Monitor webhook events

**Use Cases:**
- Set up automated notifications
- Configure payment event handlers
- Debug webhook issues
- Add new integrations

---

## Analytics Permissions (Lower Priority but Useful)

### 7. **Events - Read Access**
**Permission**: `Events: Read`

**What I Can Do:**
- ✅ View event logs
- ✅ Debug payment issues
- ✅ Monitor subscription changes
- ✅ Audit account activity

**Use Cases:**
- Debug payment failures
- Track subscription lifecycle
- Monitor fraud attempts
- Generate audit reports

---

### 8. **Invoices - Read Access**
**Permission**: `Invoices: Read`

**What I Can Do:**
- ✅ View invoice details
- ✅ Check payment status
- ✅ Monitor failed payments
- ✅ Generate financial reports

**Use Cases:**
- Track monthly revenue
- Identify failed payments
- Generate tax reports
- Monitor payment patterns

---

## How to Set Up Restricted API Key

### Best Practice: Use Restricted Keys

Instead of giving me full access, create a **Restricted API Key** with only the permissions I need:

1. **Go to Stripe Dashboard**
   - https://dashboard.stripe.com/apikeys

2. **Click "Create restricted key"**

3. **Select Permissions:**
   ```
   Core resources:
   ✅ Products - Write
   ✅ Prices - Write
   ✅ Customers - Read
   ✅ Subscriptions - Read
   
   Optional (based on needs):
   ✅ Coupons - Write
   ✅ Webhook endpoints - Write
   ✅ Events - Read
   ✅ Invoices - Read
   ```

4. **Name the key**: `Cline Automation Key`

5. **Copy the key** and provide it to me

---

## Security Recommendations

### ✅ DO:
- Use restricted keys with minimal permissions
- Rotate keys regularly (monthly/quarterly)
- Monitor API usage in Stripe dashboard
- Revoke keys when no longer needed
- Use test mode keys during development

### ❌ DON'T:
- Share your full secret key
- Store keys in plain text files
- Commit keys to Git repositories
- Use production keys for testing
- Give more permissions than necessary

---

## Current Task Requirements

### For Creating New Enterprise Products:

**Minimum Required Permissions:**
- ✅ Products: Write
- ✅ Prices: Write

**Optional but Helpful:**
- ✅ Products: Read (to verify old products)
- ✅ Prices: Read (to check existing prices)

---

## Future Task Examples

### With These Permissions, I Could Help You:

1. **Subscription Management**
   - Create limited-time promotional offers
   - Set up seasonal discount codes
   - Launch new pricing tiers
   - Migrate customers between plans

2. **Customer Support**
   - Look up customer subscription details
   - Check payment history
   - Verify subscription status
   - Add internal notes

3. **Analytics & Reporting**
   - Generate monthly revenue reports
   - Track plan conversion rates
   - Monitor failed payments
   - Analyze customer lifecycle

4. **Automation**
   - Set up automated webhooks
   - Configure payment notifications
   - Create bulk discount codes
   - Update product catalogs

5. **Testing & Development**
   - Create test products/prices
   - Configure staging environments
   - Test payment flows
   - Debug webhook issues

---

## How to Provide API Key Securely

### Option 1: Temporary Share (Recommended)
1. Give me the restricted key
2. I complete the task
3. You immediately rotate/revoke the key
4. Total exposure: < 10 minutes

### Option 2: Environment Variable
1. Add to `.env` file locally: `STRIPE_SECRET_KEY=sk_test_...`
2. Don't commit to Git
3. I use it for automated tasks
4. Remove when done

### Option 3: Supabase Secrets
1. Add to Supabase project secrets
2. I access via Supabase functions
3. Most secure option
4. Requires Supabase Edge Function setup

---

## Summary

**For Maximum Usefulness:**
Give me a restricted key with:
- Products: Write ⭐
- Prices: Write ⭐
- Subscriptions: Read ⭐
- Customers: Read
- Coupons: Write
- Webhooks: Write

**For Current Task Only:**
Just need:
- Products: Write
- Prices: Write

**Security:**
Always use restricted keys, rotate regularly, and revoke after sensitive tasks.

---

Last Updated: October 10, 2025
