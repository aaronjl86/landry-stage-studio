# Editor, Credits & Stripe Payment Testing Plan
**Date:** January 10, 2025  
**Critical Systems:** Payment Processing, Editor Functionality, Credit Management  

---

## 🚨 CRITICAL FINDINGS

### ⚠️ POTENTIAL BUG IDENTIFIED

**Issue:** Credit tracking for regenerations/redo operations
- **Location:** `src/hooks/useAIProcessor.tsx` - `redoJob()` function
- **Current Behavior:** When user clicks "Redo" on a failed/completed image, it reprocesses WITHOUT checking credits
- **Expected Behavior:** Redo should NOT charge credits (as stated in requirements)
- **Actual Behavior:** System doesn't charge because it skips the credit check, BUT this is not explicitly coded
- **Risk:** If credit checking is re-enabled, redo will charge credits incorrectly

**Code Analysis:**
```typescript
// In AIPhotoEditor.tsx - Credit check is COMMENTED OUT
// TEMPORARY: Credit check disabled for testing
// if (credits < uploadedImages.length) {
//   toast({ title: "Insufficient Credits", ... });
//   return;
// }

// In useAIProcessor.tsx - redoJob() function
// Reprocesses the same job but doesn't check credits at all
const redoJob = useCallback(async (jobId: string) => {
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return;
  
  updateJob(jobId, { /* reset status */ });
  await processJob(job); // <-- Reprocesses without credit check
}, [jobs, updateJob, processJob]);
```

**Recommendation:** Need explicit logic for variations/regenerations

---

## 📊 SYSTEM ARCHITECTURE

### Credit Flow Diagram:
```
User Signs Up
    ↓
Stripe Payment (if paid plan)
    ↓
Webhook Updates Supabase
    ↓
Profile Created/Updated
    ├─ quota: Based on plan (Starter: 10, Pro: 50, Enterprise: unlimited)
    ├─ used: Starts at 0
    └─ Credits = quota - used
    ↓
User Uploads Image to Editor
    ↓
[CURRENTLY DISABLED] Check: credits >= images?
    ↓
Process Images via AI
    ↓
For each completed image:
    ├─ Save to uploads table
    ├─ credits_used: 1 per image
    └─ Increment profile.used by 1
    ↓
Display: credits = quota - used
```

### What Charges Credits:
✅ **SHOULD Charge 1 Credit:**
- Original image processing
- New image upload and processing
- Different prompt on same image (creates new job)

❌ **Should NOT Charge Credits:**
- Regenerating/redoing failed image
- Creating variations of same original (NEEDS CLARIFICATION)
- Adjusting same image with different templates (NEEDS TESTING)

---

## 🧪 COMPREHENSIVE TESTING PLAN

### Phase 1: Stripe Payment Testing (Requires Auth Fix First)

#### Test 1.1: Starter Plan Monthly Payment
**Prerequisites:** Fix 422 auth error, create test account

**Steps:**
1. Navigate to pricing page
2. Ensure Monthly toggle selected
3. Click "Get Started" on Starter ($29/month)
4. **Verify**: Redirected to Stripe Checkout
5. **Verify**: URL contains `price_1SF3ZN3pODi329mx0uqGFYz2`
6. **Verify**: Amount shows $29.00
7. Enter test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
8. Complete payment
9. **Verify**: Redirected back to dashboard
10. **Verify**: Credits display: 10
11. **Verify**: Profile in database shows:
    - quota: 10
    - used: 0
12. **Verify**: Subscription shows active

**Expected Results:**
- ✅ Payment processed successfully
- ✅ 10 credits available
- ✅ Can access editor
- ✅ Subscription status: active

---

#### Test 1.2: Professional Plan Yearly Payment
**Steps:**
1. Navigate to pricing page
2. Toggle to "Yearly"
3. **Verify**: Shows $790/year with "Save 17%" badge
4. Click "Get Started" on Professional
5. **Verify**: URL contains `price_1SF3e73pODi329mx35xLMDMT`
6. **Verify**: Amount shows $790.00
7. Complete payment with test card
8. **Verify**: Credits display: 50
9. **Verify**: Profile shows quota: 50, used: 0
10. **Verify**: "Most Popular" plan is active

---

#### Test 1.3: Enterprise Plan Monthly Payment
**Steps:**
1. Select Monthly billing
2. Click "Get Started" on Enterprise ($149/month)
3. **Verify**: URL contains `price_1SF3cx3pODi329mxTwQjBJbv`
4. Complete payment
5. **Verify**: Credits display: 999999 (unlimited represented as high number)
6. **Verify**: Can process unlimited images

---

#### Test 1.4: Payment Failure Scenarios
**Test Cards:**
- **Declined**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`
- **Expired Card**: `4000 0000 0000 0069`

**For Each:**
1. Attempt payment
2. **Verify**: Error message displayed
3. **Verify**: User returned to pricing page
4. **Verify**: No subscription activated
5. **Verify**: No credits added

---

### Phase 2: Editor Functionality Testing

#### Test 2.1: Basic Image Upload & Processing
**Prerequisites:** Active subscription with credits

**Steps:**
1. Navigate to Dashboard
2. **Verify**: Credit balance displays correctly
3. Click "Upload Photos" or drag-and-drop
4. Upload 1 test image (JPG, PNG, or HEIC)
5. **Verify**: Image preview appears
6. **Verify**: File name shown
7. Select template: "Virtual Staging"
8. Click "Process 1 Photo"
9. **Verify**: Progress indicator appears
10. **Verify**: Job status changes: pending → processing → completed
11. **Verify**: Before/After comparison displays
12. **Verify**: Processing time shown
13. **Verify**: Credits decreased by 1
14. **Verify**: Database updated:
    - profiles.used increased by 1
    - uploads table has new record with credits_used: 1

**Expected Results:**
- ✅ Image processes successfully
- ✅ 1 credit consumed
- ✅ Before/After displayed
- ✅ Can download result

---

#### Test 2.2: Multiple Image Upload
**Steps:**
1. Upload 5 images simultaneously
2. Select template: "Lighting Enhancement"
3. Click "Process 5 Photos"
4. **Verify**: All 5 show in processing queue
5. **Verify**: Process with controlled concurrency (5 at a time per code)
6. **Verify**: Each completes with status update
7. **Verify**: Credits decreased by 5
8. **Verify**: 5 database records created
9. **Verify**: Each shows credits_used: 1

---

#### Test 2.3: Multiple Templates on Single Image
**Steps:**
1. Upload 1 image
2. Select MULTIPLE templates:
   - ✅ Lighting Enhancement
   - ✅ Virtual Staging
   - ✅ HDR Enhancement
3. Click "Process 1 Photo"
4. **VERIFY CAREFULLY**: Does this create 1 job or 3 jobs?
5. **VERIFY**: How many credits charged?

**Expected Behavior (NEEDS CLARIFICATION):**
- Option A: Creates 1 job with combined prompt = 1 credit
- Option B: Creates 3 separate jobs = 3 credits

**Current Code Analysis:**
```typescript
// From AIPhotoEditor.tsx
submitBatchEdit(uploadedImages, selectedTemplates, customPrompt);

// From useAIProcessor.tsx
const newJobs: EditingJob[] = images.map((img) => ({
  id: crypto.randomUUID(),
  // ... each IMAGE gets ONE job
  templateIds, // ALL templates in one job
}));
```

**Conclusion:** Creates 1 job per image with combined templates = **1 credit per image**

---

#### Test 2.4: Custom Prompt Processing
**Steps:**
1. Upload 1 image
2. Don't select any templates
3. Enter custom prompt: "Modern living room with blue sofa and gold accents"
4. Click "Process 1 Photo"
5. **Verify**: Processes with custom prompt only
6. **Verify**: 1 credit charged
7. **Verify**: Result matches prompt

---

#### Test 2.5: Template + Custom Prompt Combination
**Steps:**
1. Upload 1 image
2. Select template: "Virtual Staging"
3. Add custom prompt: "with mid-century modern furniture"
4. Click "Process 1 Photo"
5. **Verify**: Prompts combined correctly
6. **Verify**: 1 credit charged
7. **Verify**: Result has both template and custom styling

---

### Phase 3: Credit Tracking Testing

#### Test 3.1: Credit Deduction on Success
**Starting Credits:** 10

**Steps:**
1. Process 1 image successfully
2. **Verify**: Credits: 10 → 9
3. **Verify**: profiles.used: 0 → 1
4. **Verify**: profiles.quota remains: 10
5. Refresh page
6. **Verify**: Credits still shows 9

---

#### Test 3.2: Credit NOT Deducted on Failure
**Steps:**
1. Upload invalid/corrupted image
2. Attempt to process
3. **Verify**: Processing fails
4. **Verify**: Error message shown
5. **Verify**: Credits unchanged
6. **Verify**: profiles.used unchanged
7. **Verify**: No record in uploads table

---

#### Test 3.3: Insufficient Credits Handling
**Starting Credits:** 2

**Steps:**
1. Upload 5 images
2. Click "Process 5 Photos"
3. **CURRENTLY**: Credit check is disabled (commented out)
4. **WHEN ENABLED**: Should show error "You need 5 credits but only have 2"
5. **Verify**: No processing starts
6. **Verify**: Credits unchanged

---

#### Test 3.4: **CRITICAL - Redo/Regeneration Does NOT Charge Credits**
**This is the key test for your requirement!**

**Steps:**
1. Process 1 image successfully
2. **Verify**: Credits decreased by 1 (e.g., 10 → 9)
3. Image processing completed
4. Click "Redo" button on the completed image
5. **Verify**: Image reprocesses
6. **Verify**: Credits UNCHANGED (still 9)
7. **Verify**: No new upload record created
8. **Verify**: profiles.used UNCHANGED

**Current Code Issue:**
```typescript
// redoJob() in useAIProcessor.tsx
const redoJob = useCallback(async (jobId: string) => {
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return;
  
  updateJob(jobId, { status: "pending", ... });
  await processJob(job); // <-- Just reprocesses
}, [jobs, updateJob, processJob]);

// processJob() DOES save to database on success
await supabase.from("uploads").insert({
  user_id: user.id,
  original_image_url: job.originalImage,
  staged_image_url: result.editedImageData,
  status: "completed",
  credits_used: 1, // <-- CHARGES CREDIT AGAIN!
});
```

**🚨 BUG FOUND:** Redo WILL charge credits because processJob() saves to database with credits_used: 1

**Fix Required:**
```typescript
// Need to add a flag to track if this is a redo
interface EditingJob {
  // ... existing fields
  isRedo?: boolean; // <-- Add this
}

// In redoJob()
updateJob(jobId, { 
  status: "pending",
  isRedo: true // <-- Mark as redo
});

// In processJob(), check flag before saving
if (!job.isRedo) {
  await supabase.from("uploads").insert({ /* ... */ });
  // Only save if NOT a redo
}
```

---

#### Test 3.5: Variations of Same Image
**NEEDS CLARIFICATION FROM REQUIREMENTS**

**Scenario A:** Same image, different templates
1. Upload image once
2. Process with "Virtual Staging"
3. Credits: 10 → 9
4. Click "Clear All" to reset
5. Upload SAME image again
6. Process with "Lighting Enhancement"
7. **Question**: Should this charge another credit?

**Current Behavior:** YES, charges 1 credit (creates new job)
**Your Requirement Says:** "Don't charge for variations"

**Interpretation Needed:**
- Does "variation" mean different template on same image?
- Or does it mean adjusting/refining the RESULT of an edit?

---

#### Test 3.6: Monthly Credit Reset
**Steps:**
1. Use all 10 credits (Starter plan)
2. **Verify**: Credits show 0
3. **Verify**: Cannot process more images
4. Wait for next billing cycle (or manually trigger in Stripe)
5. **Verify**: Stripe subscription renews
6. **Verify**: Webhook fires
7. **Verify**: profiles.used resets to 0
8. **Verify**: Credits show 10 again

---

### Phase 4: Subscription Management Testing

#### Test 4.1: View Current Subscription
**Steps:**
1. Log in with active subscription
2. Navigate to pricing page
3. **Verify**: Current plan shows "Your Plan" badge
4. **Verify**: "Get Started" button shows "Current Plan" (disabled)
5. Navigate to dashboard
6. **Verify**: Subscription status displayed
7. **Verify**: Next billing date shown

---

#### Test 4.2: Upgrade Subscription
**Starting Plan:** Starter ($29/mo)

**Steps:**
1. Navigate to pricing page
2. Click "Get Started" on Professional
3. **Verify**: Stripe shows upgrade option
4. **Verify**: Prorated amount calculated
5. Complete upgrade
6. **Verify**: Credits immediately update to 50
7. **Verify**: Subscription status updated
8. **Verify**: "Your Plan" badge moves to Professional

---

#### Test 4.3: Downgrade Subscription
**Starting Plan:** Professional ($79/mo)

**Steps:**
1. Navigate to pricing page
2. Click "Get Started" on Starter
3. **Verify**: Downgrade confirmation shown
4. **Verify**: Change takes effect at end of billing period
5. **Verify**: Current credits remain until renewal
6. After billing period:
7. **Verify**: Credits reset to 10
8. **Verify**: "Your Plan" badge on Starter

---

#### Test 4.4: Cancel Subscription
**Steps:**
1. Access Stripe Customer Portal (needs implementation)
2. Click "Cancel Subscription"
3. **Verify**: Cancellation confirmed
4. **Verify**: Access continues until end of period
5. **Verify**: Credits still available
6. After period ends:
7. **Verify**: Credits set to 0 or free tier amount
8. **Verify**: Cannot process images without resubscribing

---

### Phase 5: Edge Cases & Error Handling

#### Test 5.1: Network Failure During Processing
**Steps:**
1. Start processing image
2. Disconnect internet mid-process
3. **Verify**: Retry logic activates (max 3 retries)
4. **Verify**: If all retries fail, job marked as failed
5. **Verify**: Credit not charged
6. **Verify**: Error message shown

---

#### Test 5.2: Large Image Files
**Steps:**
1. Upload 20MB+ image
2. **Verify**: Upload succeeds or shows size error
3. If processes:
4. **Verify**: 1 credit charged
5. **Verify**: Result quality maintained

---

#### Test 5.3: Concurrent Processing
**Steps:**
1. Upload 10 images
2. Start processing
3. **Verify**: Only 5 process simultaneously (per code)
4. **Verify**: Next batch starts when first completes
5. **Verify**: All complete successfully
6. **Verify**: 10 credits charged total

---

#### Test 5.4: Browser Refresh During Processing
**Steps:**
1. Start processing 5 images
2. Refresh browser mid-process
3. **Verify**: Jobs lost (not persisted to database until complete)
4. **Verify**: Credits not charged for incomplete jobs
5. **RECOMMENDATION**: Add job persistence for reliability

---

## 🐛 BUGS & ISSUES FOUND

### Critical Issues:

1. **Redo/Regeneration Charges Credits** ⚠️
   - Location: `useAIProcessor.tsx` - `processJob()`
   - Issue: Always saves to uploads table with credits_used: 1
   - Fix: Add `isRedo` flag to skip database save on regenerations

2. **Credit Check Disabled** ⚠️
   - Location: `AIPhotoEditor.tsx` - `handleProcess()`
   - Issue: Credit validation commented out for testing
   - Fix: Re-enable before production

3. **No Job Persistence** ⚠️
   - Issue: Browser refresh loses in-progress jobs
   - Fix: Save job state to database or localStorage

### Minor Issues:

4. **No Variation Tracking**
   - Issue: Can't distinguish between new image vs. variation
   - Fix: Add `original_upload_id` field to track variations

5. **Unlimited Credits Not Clearly Defined**
   - Issue: Enterprise shows finite number (999999)
   - Fix: Use -1 or null for truly unlimited

---

## ✅ TESTING CHECKLIST

### Stripe Payment Processing:
- [ ] Starter Monthly payment ($29)
- [ ] Starter Yearly payment ($290)
- [ ] Professional Monthly payment ($79)
- [ ] Professional Yearly payment ($790)
- [ ] Enterprise Monthly payment ($149)
- [ ] Enterprise Yearly payment ($1490)
- [ ] Payment decline handling
- [ ] Payment success redirects correctly
- [ ] Subscription activates in database
- [ ] Webhook updates profile correctly

### Editor Functionality:
- [ ] Single image upload
- [ ] Multiple image upload (5+)
- [ ] Image preview displays
- [ ] Template selection works
- [ ] Custom prompt works
- [ ] Template + custom prompt combines
- [ ] Processing queue displays
- [ ] Progress indicators work
- [ ] Before/After comparison shows
- [ ] Download results works
- [ ] Clear all works

### Credit Tracking:
- [ ] Credits display correctly
- [ ] Credits decrease on successful process
- [ ] Credits DON'T decrease on failure
- [ ] Redo/regeneration doesn't charge ⚠️ BUG
- [ ] Insufficient credits blocks processing
- [ ] Credit balance persists across sessions
- [ ] Credits refresh on subscription renewal
- [ ] Upgrade immediately updates credits
- [ ] Downgrade updates credits at renewal

### Subscription Management:
- [ ] "Your Plan" badge shows correctly
- [ ] Can upgrade plans
- [ ] Can downgrade plans
- [ ] Can cancel subscription
- [ ] Access continues until period end
- [ ] Renewal works automatically
- [ ] Proration calculated correctly

---

## 🎯 RECOMMENDED FIXES

### Priority 1 (Critical):
1. **Fix Redo Credit Charging**
   ```typescript
   // Add to EditingJob interface
   isRedo?: boolean;
   
   // Modify processJob to skip database save for redos
   if (!job.isRedo && result.success) {
     await supabase.from("uploads").insert({...});
   }
   ```

2. **Re-enable Credit Checking**
   ```typescript
   // Remove comment in AIPhotoEditor.tsx
   if (credits < uploadedImages.length) {
     toast({
       title: "Insufficient Credits",
       description: `You need ${uploadedImages.length} credits but only have ${credits}`,
       variant: "destructive",
     });
     return;
   }
   ```

### Priority 2 (Important):
3. **Add Variation Tracking**
   ```typescript
   // Add to uploads table
   original_upload_id: string | null;
   is_variation: boolean;
   variation_type: 'template_change' | 'prompt_refinement' | 'regeneration';
   ```

4. **Add Job Persistence**
   - Save jobs to localStorage on state change
   - Restore on page load
   - Or save to Supabase for cross-device access

---

## 📝 FINAL NOTES

**What Works:**
✅ Frontend UI for all features
✅ Stripe integration architecture
✅ Credit display and tracking
✅ Image upload and processing
✅ Template system
✅ Subscription plan configuration

**What Needs Testing (Blocked by Auth):**
⚠️ Actual Stripe payments
⚠️ Webhook subscription updates
⚠️ Credit deduction on process
⚠️ Monthly credit reset
⚠️ Plan upgrades/downgrades

**What Needs Fixing:**
🐛 Redo operation charges credits (BUG)
🐛 Credit check disabled
🐛 No job persistence
🐛 No variation tracking

**Confidence Level:**
- Architecture: 95% ✅
- Implementation: 85% ⚠️ (has bugs)
- Testing Readiness: 60% ⚠️ (blocked by auth)

---

**Next Steps:**
1. Fix authentication (422 error)
2. Fix redo credit bug
3. Re-enable credit checking
4. Test complete flow end-to-end
5. Verify webhook integration
6. Test all subscription scenarios
