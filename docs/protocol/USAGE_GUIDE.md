# Landry Coherence Protocol v4.0 — Usage Guide for Cursor

This guide explains when and how to use the Landry Coherence Protocol in Cursor for safe AI collaboration.

---

## Quick Decision Tree

**Should I use the protocol for this task?**

```
Is this a critical fix, rebuild, or high-stakes change?
├─ YES → Use ICU Mode
│   └─ "Use Landry Protocol in ICU Mode: [your problem]"
│
└─ NO → Is this strategic thinking or architecture?
    ├─ YES → Use Growth Mode
    │   └─ "Switch to Growth Mode. [your question]"
    │
    └─ NO → Use normal mode (protocol not needed)
```

---

## When to Use ICU Mode

**ICU Mode is for:**
- ✅ Code is broken and needs fixing
- ✅ You have a specific error message
- ✅ The fix is isolated to a few lines
- ✅ Maximum safety is required
- ✅ Rebuilding critical functionality
- ✅ High-stakes changes that could break the system

**ICU Mode is NOT for:**
- ❌ Routine tasks (adding a button, styling changes)
- ❌ Well-understood patterns (CRUD operations, standard components)
- ❌ Low-risk changes (documentation, comments)
- ❌ Creative or exploratory work

**Example ICU Mode Invocation:**
```
Use Landry Protocol in ICU Mode:

ERROR: Upload function returns 500 error. Bucket not found.

FILE: src/lib/upload.ts (line 15)

DESIRED BEHAVIOR: Upload should succeed and return image URL.

QUESTION: How do I fix the bucket reference?
```

---

## When to Use Growth Mode

**Growth Mode is for:**
- ✅ Strategic thinking about architecture
- ✅ Planning new features or systems
- ✅ Analyzing tradeoffs and risks
- ✅ Creative problem-solving
- ✅ High-level design decisions
- ✅ Understanding system-wide implications

**Growth Mode is NOT for:**
- ❌ Implementation (switch back to ICU Mode)
- ❌ Code fixes (use ICU Mode)
- ❌ Routine tasks (use normal mode)

**Example Growth Mode Invocation:**
```
Switch to Growth Mode.

I'm planning to add a new subscription tier. What are the architectural 
considerations? Should I extend the existing Stripe integration or create 
a new system?
```

**Important:** Growth Mode expires when you move to implementation. Always switch back to ICU Mode for actual code changes.

---

## When to Use Normal Mode

**Normal Mode (no protocol) is for:**
- ✅ Routine tasks you understand well
- ✅ Standard patterns (adding components, styling)
- ✅ Low-risk changes (documentation, refactoring)
- ✅ Well-established workflows
- ✅ Quick fixes that are straightforward

**Example Normal Mode Tasks:**
- "Add a button to the dashboard"
- "Update the color scheme"
- "Fix a typo in the README"
- "Add a new field to a form"

---

## How the Protocol Works in Cursor

### Key Differences from Chat-Based Protocol

1. **File Access:** Cursor can read files directly. The AI will use `read_file` when it needs to see a file, rather than asking you to paste it.

2. **File-Explicit:** Instead of "artifact-only" (you paste files), the protocol uses "file-explicit" (only modify files explicitly mentioned by you).

3. **Persistent Context:** Cursor maintains conversation context, but in ICU Mode, each request is treated as independent unless files are explicitly re-referenced.

4. **Tool Usage:** The AI has access to codebase search, file reading, and other tools. It will use them to gather context, but only modify files you explicitly mention.

---

## ICU Mode Workflow

### Step 1: Invoke ICU Mode
```
Use Landry Protocol in ICU Mode: [your problem description]
```

### Step 2: Provide Context
- **ERROR:** What exactly is happening/breaking
- **FILE:** Reference the specific file path (e.g., `src/lib/upload.ts`)
- **DESIRED BEHAVIOR:** What should happen instead
- **QUESTION:** What specifically needs to be fixed

### Step 3: AI Diagnoses
- AI reads the file you referenced
- Diagnoses ONLY that file
- Labels confidence tier (Tier 1-4)
- Asks for confirmation before proposing changes

### Step 4: You Confirm or Correct
- Review the diagnosis
- Provide missing context if needed
- Confirm the approach

### Step 5: AI Proposes Minimal Fix
- Shows only the exact lines to change
- Produces a diff, not a full file rewrite
- Requires your confirmation before applying

### Step 6: You Test
- Apply the change
- Test the fix
- Report the result

### Step 7: Loop Until Fixed
- If it works, move to the next issue
- If it doesn't, loop back to Step 1 with updated context

---

## Growth Mode Workflow

### Step 1: Invoke Growth Mode
```
Switch to Growth Mode. [your strategic question]
```

### Step 2: AI Provides Strategic Analysis
- Makes reasonable inferences
- Proposes architecture concepts
- Identifies tradeoffs and risks
- Labels confidence tiers
- Provides ideas, NOT implementation code

### Step 3: You Translate to ICU Mode
- Take the strategic insights
- Break them into specific implementation tasks
- Switch back to ICU Mode for each task

### Step 4: Implement in ICU Mode
```
Back to ICU Mode. I want to implement [specific thing from Growth Mode]. 
Here's the file...
```

---

## Protocol Rules Summary

### ICU Mode Rules
1. **File-Explicit:** Only modify files explicitly mentioned
2. **One File, One Error:** Focus on one file at a time
3. **Delta-Only Fixes:** Line-level changes only
4. **Two-Minute Verification:** Every fix must be testable in under 2 minutes
5. **Halt Conditions:** AI stops if context is missing
6. **Human Override Loop:** Every suggestion requires your confirmation
7. **No Context Carryover:** Each request is independent

### Growth Mode Rules
1. **Inference Allowed:** Can make reasonable inferences
2. **Ideas, Not Implementation:** Provides concepts, not code
3. **Confidence Tiers:** Labels speculation honestly
4. **Always Defaults Back to ICU:** Expires when moving to implementation

---

## Confidence Tiers

When the AI makes claims, it will label them:

- **Tier 1 (Verifiable):** You can directly check it
- **Tier 2 (Supported):** Based on known files or patterns
- **Tier 3 (Inference):** A reasonable guess that could be wrong
- **Tier 4 (Speculation):** Guessing without evidence (only in Growth Mode)

**Rule:** Never deliver Tier 4 claims in ICU Mode.

---

## Halt Conditions

The AI must stop and ask if:
- Context is missing
- Files conflict
- Instructions contradict
- Error description is unclear
- Solution can't be verified in 2 minutes
- Need to read another file to be confident

**AI Response:**
> "HALT: I cannot proceed safely. I need: [specific file path or clarification]"

---

## What the Protocol Prevents

✅ Hallucinating file structures
✅ Inventing code you didn't ask for
✅ Proposing sweeping architectural changes without seeing code
✅ Proposing untestable solutions
✅ Operating blindly and sounding confident
✅ Modifying files not explicitly mentioned

---

## What the Protocol Does NOT Prevent

✗ Misdiagnosing code the AI actually read
✗ Missing system-level issues
✗ Being confidently wrong (protocol compliance ≠ correctness)
✗ You describing a problem unclearly

**Your Responsibility:**
- Verify diagnosis makes sense
- Test every output before implementing
- Tell the AI if the answer seems incomplete
- Ask: "Do you have enough context to be sure?"

---

## Best Practices

### For ICU Mode
1. **Be Specific:** Provide exact file paths, line numbers, error messages
2. **One Thing at a Time:** Focus on one error, one file, one outcome
3. **Test Immediately:** Verify each fix before moving to the next
4. **Provide Context:** If the AI asks for more information, provide it
5. **Trust but Verify:** The protocol helps, but you must still verify

### For Growth Mode
1. **Ask Strategic Questions:** Focus on architecture, tradeoffs, risks
2. **Don't Ask for Code:** Growth Mode provides ideas, not implementation
3. **Translate to ICU:** Break strategic insights into ICU Mode tasks
4. **Switch Back:** Always return to ICU Mode for implementation

### General
1. **Use Protocol Selectively:** Not every task needs it
2. **Start Conservative:** When in doubt, use ICU Mode
3. **Enforce the Rules:** If the AI violates protocol, stop it
4. **Be Patient:** Protocol is slower by design (safety over speed)

---

## Troubleshooting

### AI is proposing changes to files I didn't mention
**Response:** "Stop. You're not following the protocol. Only modify files I explicitly mentioned."

### AI is suggesting architecture in ICU Mode
**Response:** "Stop. You're not following the protocol. Architecture suggestions are for Growth Mode only."

### AI is proposing untestable solutions
**Response:** "Stop. You're not following the protocol. Every fix must be testable in under 2 minutes."

### AI is proceeding without enough context
**Response:** "Stop. You're not following the protocol. What context is missing?"

---

## Examples

### Example 1: Critical Fix (ICU Mode)

**You:**
```
Use Landry Protocol in ICU Mode:

ERROR: Users can't upload images. Getting "bucket not found" error.

FILE: src/lib/upload.ts

DESIRED BEHAVIOR: Images should upload successfully to Supabase Storage.

QUESTION: How do I fix the bucket reference?
```

**AI Response:**
```
I'm diagnosing this file in ICU Mode.

DIAGNOSIS:
The error "bucket not found" means the code references a storage bucket 
that doesn't exist in Supabase Storage.

Confidence: Tier 1 (Verifiable)

I need to read src/lib/upload.ts to see the exact bucket name being used.
```

[AI reads file, provides minimal fix with confirmation request]

---

### Example 2: Strategic Planning (Growth Mode)

**You:**
```
Switch to Growth Mode.

I'm planning to add a new subscription tier. What are the architectural 
considerations? Should I extend the existing Stripe integration or create 
a new system?
```

**AI Response:**
```
I'm in Growth Mode for strategic analysis.

ARCHITECTURAL CONSIDERATIONS:

1. **Extend Existing System (Recommended)**
   - Tier 1: Your current Stripe integration already handles multiple tiers
   - Tier 2: Extending is lower risk than creating new system
   - Tradeoff: Simpler but may need refactoring if structure changes

2. **Create New System**
   - Tier 3: Would provide more flexibility
   - Risk: Higher complexity, potential for inconsistencies
   - Tradeoff: More flexible but more maintenance

RECOMMENDATION: Extend existing system unless you need fundamentally 
different behavior.

When you're ready to implement, switch back to ICU Mode and we'll work 
on the specific changes.
```

---

## Quick Reference

| Situation | Mode | Invocation |
|-----------|------|------------|
| Code is broken | ICU | "Use Landry Protocol in ICU Mode: [problem]" |
| Strategic thinking | Growth | "Switch to Growth Mode. [question]" |
| Routine task | Normal | No protocol needed |
| Architecture discussion | Growth | "Switch to Growth Mode. [topic]" |
| Critical rebuild | ICU | "Use Landry Protocol in ICU Mode: [rebuild]" |
| Quick fix | Normal | No protocol needed |

---

## Next Steps

1. **Read the full protocol:** See `.cursor/rules/landry-protocol.mdc`
2. **Review examples:** See `docs/protocol/Protocol_Example_Workflow.md`
3. **Start with a test:** Try ICU Mode on a non-critical task first
4. **Refine your usage:** Adjust based on what works for you

---

**Remember:** The protocol is a tool to help you work safely with AI. It's not perfect, but it's designed to prevent catastrophic failures through structural constraints. Use it when safety matters more than speed.

