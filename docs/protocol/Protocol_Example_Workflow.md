# PROTOCOL IN ACTION: Real Example Workflow

This shows exactly how the protocol works with a real problem scenario.

---

## SCENARIO: Your Landry Method Site's Upload Function Is Broken

### STEP 0: YOU PASTE THE PROTOCOL

You copy/paste the entire `PROTOCOL_COPY_PASTE.md` into the chat with Claude/ChatGPT/Gemini.

The AI responds:
> "I acknowledge that I have read and understand the Landry Coherence Protocol v4.0 and agree to follow all rules exactly as written."

**This is critical.** If the AI does NOT acknowledge the protocol, do not proceed.

---

### STEP 1: YOU DESCRIBE THE PROBLEM (Clearly)

**YOU:**
```
Using the Landry Protocol in ICU Mode:

ERROR: When users upload a staging image, they get a 500 error.

FILE: I'm pasting the upload handler below.

DESIRED BEHAVIOR: The image should upload to Supabase Storage and return a success response.

[You paste the actual file]

export async function uploadImage(file: File) {
  const bucket = supabase.storage.from('staging-images');
  const result = await bucket.upload(`images/${Date.now()}.jpg`, file);
  return result.data;
}

ERROR LOG: "bucket 'staging-images' not found"
```

**Why this works:**
- Clear error (500 from bucket not found)
- Desired behavior (should upload successfully)
- Actual code (the file that's broken)
- Error log (concrete evidence)

---

### STEP 2: AI DIAGNOSES (Artifact-Only)

**CLAUDE (or any AI following the protocol):**

```
I'm diagnosing this file in ICU Mode.

DIAGNOSIS:
The error "bucket 'staging-images' not found" means you're trying to access a 
storage bucket named 'staging-images' that doesn't exist in your Supabase 
Storage.

Confidence: Tier 1 (Verifiable)

NEXT STEP:
Either:
A) Create the bucket 'staging-images' in Supabase Storage
B) Change the bucket name in the code to match an existing bucket

Before I suggest code changes, confirm:
1. Does this diagnosis match the error you're seeing?
2. Which bucket should this code be using?
3. What do you want the behavior to be?
```

**Why this works:**
- Diagnosed ONLY the file pasted
- Did not invent other files
- Did not assume architecture
- Labeled confidence (Tier 1)
- Asked for confirmation before suggesting fix
- All verifiable in under 2 minutes

---

### STEP 3: YOU CONFIRM OR CORRECT

**YOU:**

```
Diagnosis is correct. I need to create the bucket. 
But wait—I realized there's another issue. The bucket name might need to be 'staging-images-prod' 
because that's what I created in Supabase.

Updated question: Should I change 'staging-images' to 'staging-images-prod' in the code?
```

**Why this matters:**
- You caught something the AI missed (because AI was artifact-only)
- You provided the missing context (prod vs. dev buckets)
- AI now has ground truth

---

### STEP 4: AI SUGGESTS MINIMAL DELTA

**CLAUDE:**

```
Got it. Yes, change 'staging-images' to 'staging-images-prod'.

Here's the exact change needed:

Line 2:
CHANGE FROM: const bucket = supabase.storage.from('staging-images');
CHANGE TO:   const bucket = supabase.storage.from('staging-images-prod');

That's the only change. Nothing else in the file needs to update.

CONFIRMATION:
Before you apply this:
1. Does this match the file you pasted?
2. Is 'staging-images-prod' the correct bucket name?
3. Should I show you the complete updated code block?
```

**Why this works:**
- Minimal delta (one line only)
- Line-level clarity (what to change and where)
- No refactoring or invention
- Requires your confirmation before implementing
- Can be tested in 2 minutes (apply change, test upload)

---

### STEP 5: YOU TEST

**YOU:**

```
Applied the change. Tested upload. 

Result: SUCCESS. Image uploaded to staging-images-prod bucket.

Next issue: The response doesn't include the image URL. The staging needs to show the before/after,
so I need the URL returned.
```

---

### STEP 6: LOOP BACK TO STEP 1

**YOU (ICU Mode again):**

```
Using the Landry Protocol in ICU Mode:

NEW ERROR: Upload succeeds, but the returned data doesn't include the image URL.

FILE: [paste the uploadHandler again, with the bucket fix applied]

DESIRED BEHAVIOR: The function should return an object that includes the image URL 
so the staging preview can show it.

CURRENT CODE:
export async function uploadImage(file: File) {
  const bucket = supabase.storage.from('staging-images-prod');
  const result = await bucket.upload(`images/${Date.now()}.jpg`, file);
  return result.data;
}

QUESTION: What data is in result.data? Do I need to construct the URL manually?
```

And the cycle repeats...

---

## THE PATTERN

```
1. YOU: Describe problem clearly (error + desired behavior + paste file)
2. AI: Diagnose ONLY the pasted file
3. YOU: Confirm diagnosis or provide missing context
4. AI: Suggest minimal delta with confirmation loop
5. YOU: Test and report result
6. Repeat until done
```

---

## WHAT COULD GO WRONG (And How Protocol Catches It)

### SCENARIO A: AI Tries to Invent

**Bad AI (no protocol):**
```
I see the issue. The bucket doesn't exist. Also, you should probably refactor 
this entire upload system to use a middleware layer. And you might want to consider 
implementing image compression before upload. And your error handling is weak...
```

**Good AI (with protocol):**
```
HALT: You've shown me one function. To suggest middleware or refactoring, I would 
need to understand your entire upload pipeline. 

In ICU Mode, I'm diagnosing ONLY the artifact you pasted: change 'staging-images' 
to 'staging-images-prod'.

If you want architectural suggestions, ask me to switch to Growth Mode.
```

### SCENARIO B: AI Proceeds Without Context

**Bad AI (no protocol):**
```
The bucket doesn't exist. Here's what you need to do: [12-step solution involving database changes, config files, and environment variables]
```

**Good AI (with protocol):**
```
I need more information before I can be confident:
- What buckets exist in your Supabase Storage?
- Is 'staging-images-prod' the correct bucket?
- Should I assume this bucket already exists, or do you need help creating it?

Please confirm so I don't suggest something that doesn't apply.
```

### SCENARIO C: AI Suggests Untestable Fix

**Bad AI (no protocol):**
```
The issue might also be related to your Supabase RLS policies. You probably need 
to allow public read/write. Here's a complex RLS policy you should implement...
```

**Good AI (with protocol):**
```
WARNING (Tier 3 guess): The bucket error suggests an RLS policy issue might also exist.

But I cannot diagnose this without seeing:
- Your Supabase RLS policy
- Your authentication setup
- Error details from the RLS failure

For now, let's fix the bucket name and test. If upload still fails, we'll debug RLS.
```

---

## THE CRITICAL DIFFERENCE

**Without Protocol:**
- AI generates plausible-sounding multi-file solutions
- AI invents architecture you didn't ask for
- You trust the authority of the response
- Everything breaks in complex ways

**With Protocol:**
- AI diagnoses ONE artifact at a time
- AI halts when context is insufficient
- AI asks for confirmation before each step
- Breaks happen locally, not system-wide
- You catch errors before they compound

---

## ONE MORE THING: Switching to Growth Mode

**After your upload function is fixed, you might ask:**

```
Switch to Growth Mode. 

Given what we've fixed on the staging pipeline, what should the next priority be?
Should we focus on error handling, performance, or moving to the next feature?
```

Now the AI can:
- See the broader system context
- Think about architecture
- Propose longer-term improvements
- Suggest connections between parts

But the moment you're back to implementation, return to ICU:

```
Back to ICU Mode. I want to implement [specific thing]. Here's the file...
```

---

## THE PROMISE OF v4.0

If both you and the AI follow this protocol:

✓ Catastrophic hallucination becomes nearly impossible
✓ Every fix is testable and minimal
✓ You catch errors before they compound
✓ The rebuild process is slow but safe
✓ You remain in control the entire time

Not perfect. Not genius-level fast. But engineered to work.

---

## YOUR NEXT MOVE

1. Copy `PROTOCOL_COPY_PASTE.md` into your next chat with any LLM
2. Let them acknowledge the protocol
3. Describe your first actual problem (which system is broken: A-F?)
4. Follow the pattern: Describe → Diagnose → Confirm → Fix → Test → Repeat

You're ready.
