/**
 * MLS Compliance Policies for Portland, OR Market
 * Based on standard MLS requirements for virtual staging disclosure
 * 
 * Key Requirements:
 * - Mandatory disclosure of virtual staging
 * - No structural modifications
 * - Maintain original photo integrity
 * - Standard disclosure language
 */

export const PORTLAND_MLS_DISCLOSURE_TEXT = `IMPORTANT MLS COMPLIANCE REQUIREMENT - PORTLAND, OR MARKET:

This image has been virtually staged to help buyers visualize the potential of the space. 
Virtual staging is a digital enhancement technique used for marketing purposes only.

MLS DISCLOSURE REQUIREMENTS:
- All virtually staged images MUST be clearly disclosed in listing descriptions
- Recommended disclosure language: "Photos are virtually staged to help buyers visualize the potential of the space"
- Alternative disclosure: "Virtually staged photos"
- Disclosure must be visible and clear to potential buyers
- Original unedited photos should be available upon request

PROHIBITED MODIFICATIONS:
- No structural changes to walls, windows, doors, or room layouts
- No misleading enhancements that misrepresent the property
- No removal of existing features or fixtures
- No addition of features that don't exist in the actual property
- No alteration of property dimensions or square footage representation

IMAGE QUALITY STANDARDS:
- Maintain original photo integrity and accuracy
- Preserve architectural features and room proportions
- Ensure lighting and colors remain realistic
- Keep property representation truthful and accurate

COMPLIANCE NOTES:
- Virtual staging is for marketing visualization only
- Buyers must be informed that images are digitally enhanced
- Actual property condition may differ from staged images
- All staging is clearly marked as virtual/digital enhancement`;

export const MLS_PROMPT_PREFIX = `[MLS COMPLIANCE - PORTLAND, OR MARKET]

${PORTLAND_MLS_DISCLOSURE_TEXT}

When processing this image, you must:
1. Only add furniture, decor, and staging elements
2. Preserve all architectural features exactly as they appear
3. Maintain realistic lighting and colors
4. Ensure the result clearly represents a virtually staged space
5. Do not make any structural modifications

USER'S STAGING REQUEST:`;

/**
 * Get MLS-compliant prompt text
 * @param userPrompt The user's custom staging prompt
 * @returns MLS-compliant prompt with disclosure requirements
 */
export function getMLSCompliantPrompt(userPrompt: string): string {
  return `${MLS_PROMPT_PREFIX}\n${userPrompt}`;
}

/**
 * Standard MLS disclosure text for listing descriptions
 */
export const STANDARD_DISCLOSURE_TEXT = "Photos are virtually staged to help buyers visualize the potential of the space";

/**
 * Alternative MLS disclosure text
 */
export const ALTERNATIVE_DISCLOSURE_TEXT = "Virtually staged photos";

/**
 * MLS policy metadata
 */
export interface MLSComplianceMetadata {
  mlsCompliant: boolean;
  disclosureText: string;
  market: string;
  timestamp: string;
  policyVersion: string;
}

/**
 * Create MLS compliance metadata
 */
export function createMLSComplianceMetadata(): MLSComplianceMetadata {
  return {
    mlsCompliant: true,
    disclosureText: STANDARD_DISCLOSURE_TEXT,
    market: "Portland, OR",
    timestamp: new Date().toISOString(),
    policyVersion: "1.0"
  };
}

