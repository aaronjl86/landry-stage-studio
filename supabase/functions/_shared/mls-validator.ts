/**
 * MLS Compliance Validator
 * Validates prompts and requests against Portland MLS policies
 */

import { PORTLAND_MLS_DISCLOSURE_TEXT } from "./mls-policies.ts";

export interface MLSValidationResult {
  valid: boolean;
  violations: string[];
  warnings: string[];
  compliant: boolean;
}

/**
 * Prohibited terms that indicate non-compliant modifications
 */
const PROHIBITED_TERMS = [
  "remove wall",
  "add wall",
  "move wall",
  "change window",
  "add window",
  "remove window",
  "move door",
  "add door",
  "remove door",
  "expand room",
  "make room bigger",
  "change layout",
  "modify structure",
  "alter architecture",
  "change dimensions",
  "increase square footage",
  "decrease square footage",
  "misleading",
  "fake",
  "not real",
];

/**
 * Warning terms that may indicate compliance issues
 */
const WARNING_TERMS = [
  "remove",
  "delete",
  "erase",
  "hide",
  "cover up",
  "disguise",
];

/**
 * Validate prompt against MLS policies
 * @param prompt The user's prompt to validate
 * @returns Validation result with violations and warnings
 */
export function validateMLSCompliance(prompt: string): MLSValidationResult {
  const violations: string[] = [];
  const warnings: string[] = [];
  const lowerPrompt = prompt.toLowerCase();

  // Check for prohibited structural modification terms
  for (const term of PROHIBITED_TERMS) {
    if (lowerPrompt.includes(term)) {
      violations.push(
        `Prohibited modification detected: "${term}". MLS policies prohibit structural changes to properties.`
      );
    }
  }

  // Check for warning terms (may need review)
  for (const term of WARNING_TERMS) {
    if (lowerPrompt.includes(term)) {
      // Only warn if it's not clearly about furniture/decor
      const context = lowerPrompt.substring(
        Math.max(0, lowerPrompt.indexOf(term) - 20),
        Math.min(lowerPrompt.length, lowerPrompt.indexOf(term) + 50)
      );
      
      // If it's about furniture, decor, or staging items, it's OK
      const safeContext = ["furniture", "sofa", "chair", "table", "decor", "art", "pillow", "curtain", "rug"].some(
        safe => context.includes(safe)
      );
      
      if (!safeContext) {
        warnings.push(
          `Potential compliance concern: "${term}" detected. Ensure this refers to staging elements only, not property features.`
        );
      }
    }
  }

  // Check prompt length (reasonable staging prompts shouldn't be too long)
  if (prompt.length > 2000) {
    warnings.push("Prompt is unusually long. Ensure it only contains staging instructions, not structural modifications.");
  }

  const valid = violations.length === 0;
  const compliant = valid && warnings.length === 0;

  return {
    valid,
    violations,
    warnings,
    compliant,
  };
}

/**
 * Validate that prompt is appropriate for virtual staging
 * @param prompt The user's prompt
 * @returns True if prompt is appropriate for staging
 */
export function isValidStagingPrompt(prompt: string): boolean {
  const lowerPrompt = prompt.toLowerCase();
  
  // Check if prompt contains staging-related terms
  const stagingTerms = [
    "stage",
    "staging",
    "furniture",
    "decor",
    "sofa",
    "chair",
    "table",
    "art",
    "artwork",
    "pillow",
    "curtain",
    "rug",
    "lighting",
    "color",
    "enhance",
    "add",
    "place",
  ];

  const hasStagingContent = stagingTerms.some(term => lowerPrompt.includes(term));

  // Check for structural modification terms
  const hasStructuralTerms = PROHIBITED_TERMS.some(term => lowerPrompt.includes(term));

  return hasStagingContent && !hasStructuralTerms;
}

/**
 * Get validation error message for user
 * @param result Validation result
 * @returns User-friendly error message
 */
export function getValidationErrorMessage(result: MLSValidationResult): string {
  if (result.valid) {
    return "";
  }

  if (result.violations.length > 0) {
    return `MLS Compliance Error: ${result.violations[0]}`;
  }

  return "MLS compliance validation failed. Please review your staging request.";
}

