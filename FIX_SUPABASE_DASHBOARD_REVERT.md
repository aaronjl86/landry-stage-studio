# Fix: Supabase Dashboard Reverting Changes

## Problem
When you edit the `validate-signup` function in the Supabase dashboard, it automatically reverts back to the old version after saving.

## Root Cause
**Supabase is connected to your Git repository** and automatically syncs the function code from Git. When you make manual changes in the dashboard, they get overwritten by the code from your repository.

## Solution: Commit and Push to Git

The fix has been committed to your local repository. Now you need to push it so Supabase can sync it.

### Step 1: Push to GitHub

```bash
# Check which branch you're on
git branch

# If you're on builder_branch, push it
git push origin builder_branch

# OR if you need to merge to main first:
git checkout main
git merge builder_branch
git push origin main
```

### Step 2: Wait for Supabase to Sync

After pushing to GitHub:
1. **Wait 1-2 minutes** for Supabase to detect the Git changes
2. **Go to Supabase Dashboard** → **Edge Functions** → **validate-signup**
3. The function should now show the updated code with `status: 200`

### Step 3: Verify the Fix

1. Check the function code in the dashboard - it should show:
   ```typescript
   status: 200,  // Always return 200, let the frontend decide based on allowed flag
   ```

2. If it still shows the old version:
   - Wait a bit longer (Supabase sync can take a few minutes)
   - Or manually trigger a sync in Supabase dashboard (if available)

## Alternative: Disable Git Sync (Not Recommended)

If you want to edit functions directly in the dashboard without Git sync:

1. **Supabase Dashboard** → **Project Settings** → **Edge Functions**
2. Look for **"Git Integration"** or **"Source Control"** settings
3. Disable automatic Git sync (if available)

**⚠️ Warning**: This means your Git repository and Supabase will be out of sync. Manual edits won't be tracked in Git.

## Recommended Workflow

**Always edit functions in Git, not in the dashboard:**

1. Edit the function file locally: `supabase/functions/validate-signup/index.ts`
2. Commit the changes: `git commit -m "fix: description"`
3. Push to GitHub: `git push origin main`
4. Wait for Supabase to auto-sync (usually 1-2 minutes)
5. Verify in dashboard that changes are applied

This keeps your code in version control and ensures consistency.

