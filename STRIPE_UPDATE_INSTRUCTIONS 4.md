# Stripe Product Update Instructions

## Enterprise Plan Changes
**Update Required**: Change from "Unlimited uploads" to "400 uploads per month"

---

## Steps to Update Stripe

### 1. Log into Stripe Dashboard
Go to: https://dashboard.stripe.com/

### 2. Update Product Descriptions

#### Monthly Enterprise Product
- **Product ID**: `prod_TBQVXXiUUs3q4V`
- **Price ID**: `price_1SF3cx3pODi329mxTwQjBJbv`
- **Current Description**: Likely mentions "unlimited uploads"
- **New Description**: Should mention "400 uploads per month"

**Steps:**
1. Go to Products → Find "Enterprise" (monthly)
2. Click on the product
3. Edit product description
4. Change any mention of "unlimited" to "400 uploads per month"
5. Save changes

#### Yearly Enterprise Product
- **Product ID**: `prod_TBQWpzxm0syW72`
- **Price ID**: `price_1SF3fk3pODi329mxfilFAFfg`
- **Current Description**: Likely mentions "unlimited uploads"
- **New Description**: Should mention "400 uploads per month"

**Steps:**
1. Go to Products → Find "Enterprise" (yearly)
2. Click on the product
3. Edit product description
4. Change any mention of "unlimited" to "400 uploads per month"
5. Save changes

### 3. Update Product Metadata (Optional but Recommended)

Add or update metadata fields:
- `upload_limit`: `400`
- `quota`: `400`

This helps with automated quota checks in the backend.

### 4. Update Checkout Page Descriptions

If you have custom checkout pages or payment links:
1. Go to Payment Links or Checkout Sessions
2. Update any descriptions that mention "unlimited"
3. Change to "400 uploads per month"

### 5. Update Customer Communication

Consider sending an email to existing Enterprise customers:
- Inform them of the plan change
- Clarify they now have 400 uploads per month
- Grandfather existing customers if desired (optional)

---

## Backend Changes Already Made

The following files have been updated in the codebase:

✅ **src/lib/subscriptionPlans.ts**
- Changed Enterprise features from "Unlimited uploads" to "400 uploads per month"

✅ **src/pages/Terms.tsx**
- Updated Enterprise plan description
- Changed credit system documentation from "unlimited credits" to "400 credits per month"

---

## Notes

### What Stays as "Unlimited"
These features remain unlimited and do NOT need changes:
- ✅ "Unlimited Creativity" - refers to creative variations, not uploads
- ✅ "Unlimited Creative Freedom" - refers to creative control, not uploads
- ✅ "Unlimited variations" - refers to trying different styles, not uploads

### Quota Enforcement
Make sure your backend properly enforces the 400 upload limit for Enterprise users:
- Check `supabase/functions/` for quota validation
- Update any hardcoded "unlimited" checks
- Ensure credit system properly tracks usage

---

## Verification Checklist

After updating Stripe:
- [ ] Enterprise monthly product description updated
- [ ] Enterprise yearly product description updated
- [ ] Metadata fields added/updated
- [ ] Test checkout flow shows correct description
- [ ] Customer portal shows correct plan details
- [ ] Backend enforces 400 upload limit
- [ ] Existing customers notified (if applicable)

---

## Contact

If you need help with Stripe updates:
- **Stripe Support**: https://support.stripe.com
- **Stripe Dashboard**: https://dashboard.stripe.com

Last Updated: October 10, 2025
