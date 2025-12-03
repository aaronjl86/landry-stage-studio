# Landry Coherence Protocol v4.0 — Documentation Index

Complete documentation for the Landry Coherence Protocol, a structured AI collaboration system designed to prevent hallucination and catastrophic errors.

---

## Quick Start

**New to the protocol?** Start here:

1. **Read this file** (you're here!) - Overview of all documentation
2. **Read `USAGE_GUIDE.md`** - When and how to use the protocol in Cursor
3. **Review `.cursor/rules/landry-protocol.mdc`** - The actual protocol rules
4. **Try it out** - Use ICU Mode on a non-critical task to get familiar

---

## File Index

### Essential Files (Start Here)

| File | Purpose | When to Use |
|------|---------|-------------|
| **USAGE_GUIDE.md** | Complete usage guide for Cursor | Read first to understand when/how to use |
| **.cursor/rules/landry-protocol.mdc** | Cursor-adapted protocol rules | Reference during conversations |
| **PROTOCOL_COPY_PASTE.md** | Original protocol (chat-based) | Reference for understanding the original design |

### Reference Files

| File | Purpose | When to Use |
|------|---------|-------------|
| **Protocol_Example_Workflow.md** | Real-world example walkthrough | See the protocol in action |
| **CHEAT_SHEET.txt** | Quick reference (printable) | Keep handy during conversations |
| **README_PROTOCOL_PACKAGE.md** | Original package documentation | Understand the complete package |
| **START_HERE.md** | Original package quick start | Reference for package overview |
| **FINAL_SYNTHESIS.md** | Meta-analysis and philosophy | Deep understanding of the approach |

### Supporting Files

| File | Purpose | When to Use |
|------|---------|-------------|
| **FILE_MANIFEST.txt** | Complete file list | Reference for all files |
| **Protocol_Quick_Reference.xlsx** | Spreadsheet quick reference | Bookmark for mid-conversation lookup |
| **Landry_Protocol_v4.0_REVISED.xlsx** | Formal protocol document | Deep dive into limitations |
| **Landry_Operating_Protocol_v1.0.xlsx** | Domain-specific constraints | Landry Method specific context |
| **Landry_Method_Workbook.xlsx** | Business tracking templates | Operational tracking (separate from protocol) |

---

## Protocol Overview

### What It Is

The Landry Coherence Protocol v4.0 is a structured framework for AI collaboration that prevents hallucination and catastrophic errors through **structural constraints**, not trust in AI self-policing.

### Core Principles

1. **Structure Prevents Hallucination:** Operational rules constrain behavior
2. **Two Operating Modes:** ICU (safety) and Growth (strategy)
3. **Verification Loops:** Human confirmation at every step
4. **Confidence Tiers:** Transparent about certainty levels
5. **Epistemic Boundaries:** Explicit acknowledgment of limitations

### What It Prevents

✅ Hallucinating file structures
✅ Inventing code you didn't ask for
✅ Proposing sweeping architectural changes without seeing code
✅ Proposing untestable solutions
✅ Operating blindly and sounding confident

### What It Does NOT Prevent

✗ Misdiagnosing code the AI actually read
✗ Missing system-level issues
✗ Being confidently wrong (protocol compliance ≠ correctness)
✗ You describing a problem unclearly

---

## Operating Modes

### ICU Mode (Emergency/Rebuild/Code Fixes)

**Use when:**
- Code is broken and needs fixing
- You have a specific error message
- Maximum safety is required
- Critical rebuilds

**Rules:**
- File-explicit operation (only modify files explicitly mentioned)
- One file, one error, one outcome
- Delta-only fixes (line-level changes)
- Two-minute verification rule
- Human override loop

**Invocation:**
```
Use Landry Protocol in ICU Mode: [your problem]
```

### Growth Mode (Strategy/Analysis/Architecture)

**Use when:**
- Strategic thinking is needed
- Architecture discussions
- Planning new features
- Analyzing tradeoffs

**Rules:**
- Inference is allowed
- Ideas, not implementation
- Confidence tiers still apply
- Always defaults back to ICU

**Invocation:**
```
Switch to Growth Mode. [your strategic question]
```

---

## Integration with Cursor

### Key Adaptations

The protocol has been adapted for Cursor's workflow:

1. **File Access:** Cursor can read files directly (no pasting needed)
2. **File-Explicit:** Only modify files explicitly mentioned (not "artifact-only")
3. **Persistent Context:** Cursor maintains context, but ICU Mode treats requests independently
4. **Tool Usage:** AI uses tools to gather context, but only modifies mentioned files

### Protocol Rule Location

The Cursor-adapted protocol is located at:
```
.cursor/rules/landry-protocol.mdc
```

This rule is set to `autoAttach: false`, meaning it only activates when explicitly invoked by you.

### Integration with Existing Rules

The protocol complements:
- `AI_INSTRUCTIONS.md` - Basic coding preferences
- `.cursor/rules/project-knowledge.mdc` - Project context
- `supabase/functions/_shared/architectural-rule.ts` - Architectural integrity rules

---

## Decision Tree: Should I Use the Protocol?

```
Is this a critical fix, rebuild, or high-stakes change?
├─ YES → Use ICU Mode
│   └─ "Use Landry Protocol in ICU Mode: [problem]"
│
└─ NO → Is this strategic thinking or architecture?
    ├─ YES → Use Growth Mode
    │   └─ "Switch to Growth Mode. [question]"
    │
    └─ NO → Use normal mode (protocol not needed)
```

**Rule of thumb:** Use the protocol when safety matters more than speed.

---

## Quick Reference

### ICU Mode Invocation
```
Use Landry Protocol in ICU Mode:

ERROR: [what's happening]
FILE: [file path]
DESIRED BEHAVIOR: [what should happen]
QUESTION: [what needs fixing]
```

### Growth Mode Invocation
```
Switch to Growth Mode. [your strategic question]
```

### Confidence Tiers
- **Tier 1:** Verifiable (you can check it)
- **Tier 2:** Supported (based on known patterns)
- **Tier 3:** Inference (reasonable guess)
- **Tier 4:** Speculation (only in Growth Mode)

### Halt Conditions
AI must stop if:
- Context is missing
- Files conflict
- Instructions contradict
- Solution can't be verified in 2 minutes

---

## Documentation Structure

```
docs/protocol/
├── README.md (this file) - Documentation index
├── USAGE_GUIDE.md - Complete usage guide for Cursor
├── PROTOCOL_COPY_PASTE.md - Original protocol (reference)
├── Protocol_Example_Workflow.md - Real-world example
├── CHEAT_SHEET.txt - Quick reference
├── README_PROTOCOL_PACKAGE.md - Original package docs
├── START_HERE.md - Original quick start
├── FINAL_SYNTHESIS.md - Meta-analysis
└── [Excel files] - Spreadsheet references

.cursor/rules/
└── landry-protocol.mdc - Cursor-adapted protocol rule
```

---

## Getting Started

### For First-Time Users

1. **Read `USAGE_GUIDE.md`** (15 minutes)
   - Understand when to use each mode
   - Learn the workflow
   - See examples

2. **Review `.cursor/rules/landry-protocol.mdc`** (10 minutes)
   - Understand the rules
   - See Cursor-specific adaptations

3. **Try ICU Mode** on a non-critical task
   - Get familiar with the workflow
   - See how it feels in practice

4. **Keep `CHEAT_SHEET.txt` handy**
   - Quick reference during conversations
   - Print or bookmark it

### For Regular Users

- **Quick lookup:** Use `CHEAT_SHEET.txt` or `USAGE_GUIDE.md`
- **Mid-conversation:** Reference `.cursor/rules/landry-protocol.mdc`
- **Understanding limitations:** Read `FINAL_SYNTHESIS.md`
- **Examples:** Review `Protocol_Example_Workflow.md`

---

## Philosophy

### The Core Insight

> "Don't trust the model to police itself. Trust the structure to constrain behavior. Verify every output with your own judgment."

### Why Structure Over Trust

- AI models can be confidently wrong
- Structure prevents hallucination better than promises
- Human verification is the only real defense
- Speed is secondary to safety on critical work

### Honest About Limitations

The protocol:
- ✅ Prevents structural hallucination
- ✅ Forces verification at every step
- ✅ Makes catastrophic failures nearly impossible

The protocol does NOT:
- ✗ Make AI smarter
- ✗ Guarantee correctness
- ✗ Eliminate the need for you to think

**Your responsibility:** Verify, test, and think critically.

---

## Examples

### Example 1: Critical Fix (ICU Mode)

See `Protocol_Example_Workflow.md` for a complete walkthrough of fixing an upload function.

### Example 2: Strategic Planning (Growth Mode)

See `USAGE_GUIDE.md` for examples of Growth Mode usage.

---

## Troubleshooting

### AI is violating protocol

**Response:** "Stop. You're not following the protocol. [Specific violation]."

### Not sure which mode to use

**Decision tree:**
- Critical fix? → ICU Mode
- Strategic thinking? → Growth Mode
- Routine task? → Normal mode

### Protocol seems too slow

**Remember:** Protocol prioritizes safety over speed. For critical work, slow and correct beats fast and broken.

---

## Related Documentation

- `AI_INSTRUCTIONS.md` - Basic AI assistant instructions
- `.cursor/rules/project-knowledge.mdc` - Project knowledge base
- `supabase/functions/_shared/architectural-rule.ts` - Architectural integrity rules

---

## Version History

- **v4.0 (Current):** Structure-based constraints, two-mode system, epistemic boundaries
- **v4.0 REVISED:** Honest assessment of limitations
- **v3.0:** Domain-specific constraints
- **v1.0:** Initial philosophical framework

---

## Support

For questions or issues:
1. Review `USAGE_GUIDE.md` for usage questions
2. Review `FINAL_SYNTHESIS.md` for philosophical questions
3. Review `Protocol_Example_Workflow.md` for workflow questions

---

## Next Steps

1. ✅ Read `USAGE_GUIDE.md`
2. ✅ Review `.cursor/rules/landry-protocol.mdc`
3. ✅ Try ICU Mode on a test task
4. ✅ Keep `CHEAT_SHEET.txt` handy
5. ✅ Use protocol for critical work

---

**You're ready to use the Landry Coherence Protocol safely in Cursor.**

Remember: The protocol is a tool. Use it when safety matters more than speed. Verify everything. Trust structure, not promises.
