# 🧭 The Landry Method – BrandOps Ownership Manifesto

Defines roles, responsibilities, and escalation protocol for brand governance.

| Role | Primary Steward | Backup Steward | Scope |
|------|------------------|----------------|-------|
| **Design Steward** | @aaronjl86 | @design-collaborator | Figma libraries, variables, iconography. |
| **Technical Steward** | @aaronjl86 | @frontend-lead | Maintains `manifest-phase2.json` & `brand-tokens.ts`. |
| **BrandOps Auditor** | @qa-lead | @design-steward | Quarterly audits, reports `/brand/AUDIT_Q#.md`. |

**Hierarchy:**
1️⃣ Design Steward → visual changes
2️⃣ Technical Steward → code/token changes
3️⃣ Joint sign-off → breaking changes
4️⃣ Brand Council → weekly review + audit sync

**Escalation:**
- High: Regression on main → Council within 24h
- Medium: Token misuse in feature → fix within 48h
- Low: Doc drift → fix within 7d

**Principles:**
- Philosophy > Aesthetics
- Automation > Supervision
- Evidence > Opinion
- No Orphans — every token must exist in use.
