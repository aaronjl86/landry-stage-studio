# Task for Lovable: Create New Enterprise Stripe Products

## Objective
Create NEW Enterprise subscription products in Stripe with 400 upload limit, then update the codebase with the new product IDs.

---

## Prerequisites
You'll need Stripe API keys. Check if they exist in:
- `.env` file
- Supabase edge function environment variables
- Or ask the user for their Stripe secret key

---

## Step 1: Create New Stripe Products via API

### Monthly Enterprise Product

Create a product with these specifications:

**Product Details:**
```json
{
  "name": "Enterprise (Monthly)",
  "description": "For agencies and high-volume users - 400 uploads per month, 4K quality, 2-hour turnaround, dedicated support",
  "metadata": {
    "plan_type": "enterprise",
    "billing_cycle": "monthly",
    "upload_limit": "400",
    "quota": "400",
    "quality": "4k",
    "turnaround": "2_hours",
    "support": "dedicated"
  }
}
```

**Price Details:**
```json
{
  "unit_amount": 14900,
  "currency": "usd",
  "recurring": {
    "interval": "month"
  },
  "product": "[USE_PRODUCT_ID_FROM_ABOVE]"
}
```

### Yearly Enterprise Product

**Product Details:**
```json
{
  "name": "Enterprise (Yearly)",  
  "description": "For agencies and high-volume users - 400 uploads per month, 4K quality, 2-hour turnaround, dedicated support (Save $298/year)",
  "metadata": {
    "plan_type": "enterprise",
    "billing_cycle": "yearly",
    "upload_limit": "400",
    "quota": "400",
    "quality": "4k",
    "turnaround": "2_hours",
    "support": "dedicated"
  }
}
```

**Price Details:**
```json
{
  "unit_amount": 149000,
  "currency": "usd",
  "recurring": {
    "interval": "year"
  },
  "product": "[USE_PRODUCT_ID_FROM_ABOVE]"
}
```

---

## Step 2: Update Code with New IDs

Once products are created, update `src/lib/subscriptionPlans.ts`:

```typescript
enterprise: {
  name: "Enterprise",
  monthlyPriceId: "price_NEW_MONTHLY_ID_HERE",      // ← Replace with new monthly price ID
  yearlyPriceId: "price_NEW_YEARLY_ID_HERE",        // ← Replace with new yearly price ID  
  monthlyPrice: 149,
  yearlyPrice: 1490,
  productId: "prod_NEW_MONTHLY_PRODUCT_ID_HERE",    // ← Replace with new monthly product ID
  yearlyProductId: "prod_NEW_YEARLY_PRODUCT_ID_HERE", // ← Replace with new yearly product ID
  description: "For agencies and high-volume users",
  features: [
    "Everything in Professional plus",
    "400 uploads per month",  // ← Already updated
    "Dedicated support"
  ],
}
```

---

## Step 3: Archive Old Products in Stripe

**Old Product IDs to Archive (NOT delete immediately):**
- Monthly: `prod_TBQVXXiUUs3q4V` (Price: `price_1SF3cx3pODi329mxTwQjBJbv`)
- Yearly: `prod_TBQWpzxm0syW72` (Price: `price_1SF3fk3pODi329mxfilFAFfg`)

**Action:** Set these products to "archived" status via Stripe API, don't delete (in case there are existing subscribers).

---

## Step 4: Commit Changes

```bash
git add src/lib/subscriptionPlans.ts
git commit -m "Update Enterprise plan with new Stripe products for 400 upload limit"
git push origin main
```

---

## Alternative: If No Stripe API Access

If you don't have Stripe API access, create a simple checklist for the user:

### Manual Steps for User:

1. **Log into Stripe Dashboard**: https://dashboard.stripe.com/products

2. **Create Monthly Product:**
   - Click "+ Add product"
   - Name: `Enterprise (Monthly)`
   - Price: `$149/month`
   - Description: `For agencies and high-volume users - 400 uploads per month`
   - Add metadata as shown above
   - Copy new Product ID and Price ID

3. **Create Yearly Product:**
   - Click "+ Add product"
   - Name: `Enterprise (Yearly)`
   - Price: `$1,490/year`
   - Description: `For agencies and high-volume users - 400 uploads per month (Save $298/year)`
   - Add metadata as shown above
   - Copy new Product ID and Price ID

4. **Provide IDs to Lovable:**
   - Tell Lovable the 4 new IDs
   - Lovable will update the code automatically

5. **Archive Old Products:**
   - Go to old products in Stripe
   - Click "..." menu → Archive
   - Don't delete (existing subscribers may be using them)

---

## Notes

- ✅ Website code already updated to show "400 uploads per month"
- ✅ Terms & Conditions already updated
- ⏳ Only need to create new Stripe products and update IDs
- ⚠️ Don't delete old products immediately - archive them first
- 💡 Existing subscribers will continue on old products until they manually upgrade

---

## Success Criteria

- [ ] Two new Enterprise products created in Stripe
- [ ] Four new IDs (2 product IDs + 2 price IDs) obtained
- [ ] `src/lib/subscriptionPlans.ts` updated with new IDs
- [ ] Changes committed and pushed to GitHub
- [ ] Old products archived (not deleted)
- [ ] Website shows updated "400 uploads" everywhere

Last Updated: October 10, 2025
