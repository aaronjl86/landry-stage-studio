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

For critical fixes, rebuilds, or high-stakes changes, the **Landry Coherence Protocol v4.0** is available to prevent hallucination and catastrophic errors.

### When to Use the Protocol

**Use ICU Mode when:**
- Code is broken and needs fixing
- You have a specific error message
- The fix is isolated to a few lines
- Maximum safety is required

**Use Growth Mode when:**
- Strategic thinking is needed
- Architecture discussions are required
- Analysis or planning is requested
- Creative problem-solving is needed

### How to Invoke

- **ICU Mode:** "Use Landry Protocol in ICU Mode: [your problem]"
- **Growth Mode:** "Switch to Growth Mode. [your strategic question]"

### Protocol Details

See `.cursor/rules/landry-protocol.mdc` for the complete protocol rules, or refer to `docs/protocol/` for full documentation.

**Key Principles:**
- File-explicit operation (only modify files explicitly mentioned)
- Minimal delta fixes (line-level changes only)
- Verification loops (human confirmation required)
- Confidence tiers (transparent about certainty levels)
- Halt conditions (stop when context is missing)

For routine tasks and well-understood patterns, normal mode is sufficient. The protocol is opt-in and designed for critical work where safety is prioritized over speed.
