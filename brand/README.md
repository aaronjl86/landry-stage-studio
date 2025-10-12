# 🧭 The Landry Method BrandOps System

This directory enforces visual, motion, and accessibility integrity across all Landry Method properties. It is protected by GitHub actions to prevent **Brand Drift**.

### Core Philosophy
* **Lilac = Intelligence Layer:** Never used for decoration.
* **Motion = Cognition:** Animations are purposeful and timed (4s, 8s).
* **Code = Tokens:** Hardcoded hex values are forbidden.

### Commands (Requires Node.js)
- `npm install`
- `npm run brand:lint` → Runs regex check for hex values.
- `npm run brand:audit` → Runs Lighthouse + WCAG audits.
- `npm run brand:test` → Executes visual regression (Chromatic).

### Branch Workflow
1. Create a feature branch (`feat/update-color`).
2. Modify components referencing `brand-tokens.ts`.
3. Submit PR → CI runs BrandOps checks.
4. Approved PR bumps version and merges.
