# AI Assistant Instructions

## Coding Preferences
- Use TypeScript with strict mode
- Follow existing code patterns in this project
- Use Tailwind CSS for styling
- Prefer functional components over class components
- Use React hooks for state management

## Project Context
- This is a real estate staging studio application
- Uses Supabase for backend services
- Integrates with Stripe for payments
- Uses Vite + React + TypeScript

## Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow the existing file structure
- Use the established UI component library

## Common Tasks
- Always check for linter errors after making changes
- Test functionality before suggesting it's complete
- Consider mobile responsiveness
- Maintain accessibility standards

## Landry Coherence Protocol

For critical fixes, rebuilds, or high-stakes changes, the **Landry Coherence Protocol v4.0** is available to prevent hallucination and catastrophic errors through structured constraints.

### Quick Decision: Should I Use the Protocol?

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

**Rule of thumb:** Use the protocol when safety matters more than speed.

### When to Use Each Mode

**Use ICU Mode when:**
- Code is broken and needs fixing
- You have a specific error message
- The fix is isolated to a few lines
- Maximum safety is required
- Critical rebuilds or high-stakes changes

**Use Growth Mode when:**
- Strategic thinking is needed
- Architecture discussions are required
- Analysis or planning is requested
- Creative problem-solving is needed
- Understanding system-wide implications

**Use Normal Mode when:**
- Routine tasks (adding buttons, styling changes)
- Well-understood patterns (CRUD operations)
- Low-risk changes (documentation, comments)
- Quick fixes that are straightforward

### How to Invoke

- **ICU Mode:** "Use Landry Protocol in ICU Mode: [your problem]"
- **Growth Mode:** "Switch to Growth Mode. [your strategic question]"
- **Verify Protocol:** "Are you following the Landry Protocol? Which mode should we be in?"

### Protocol Documentation

**Complete documentation available:**
- **`docs/protocol/USAGE_GUIDE.md`** - Complete usage guide with examples and workflows
- **`docs/protocol/README.md`** - Documentation index and overview
- **`.cursor/rules/landry-protocol.mdc`** - The actual protocol rules (Cursor-adapted)

**Key Principles:**
- File-explicit operation (only modify files explicitly mentioned)
- Minimal delta fixes (line-level changes only)
- Verification loops (human confirmation required)
- Confidence tiers (transparent about certainty levels)
- Halt conditions (stop when context is missing)
- Epistemic boundaries (acknowledge limitations explicitly)

### Important Notes

- The protocol is **opt-in** and only activates when explicitly invoked
- For routine tasks and well-understood patterns, normal mode is sufficient
- The protocol prioritizes safety over speed (by design)
- Always verify and test protocol-guided changes yourself
- If the AI violates protocol, stop it: "Stop. You're not following the protocol. [Specific violation]."

For detailed usage instructions, examples, and troubleshooting, see `docs/protocol/USAGE_GUIDE.md`.
