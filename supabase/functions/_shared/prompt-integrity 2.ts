import { ARCHITECTURAL_RULE, ARCHITECTURAL_RULE_HASH } from "./architectural-rule.ts";

/**
 * Verifies that the architectural rule has not been tampered with
 * by comparing its current hash against the stored baseline
 * @returns true if integrity is intact, false if modified
 */
export async function verifyPromptIntegrity(): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(ARCHITECTURAL_RULE);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    const isValid = hashHex === ARCHITECTURAL_RULE_HASH;
    
    if (!isValid) {
      console.error("CRITICAL SECURITY ALERT: Architectural rule hash mismatch!", {
        expected: ARCHITECTURAL_RULE_HASH,
        actual: hashHex,
        timestamp: new Date().toISOString()
      });
    }
    
    return isValid;
  } catch (error) {
    console.error("Error verifying prompt integrity:", error);
    return false;
  }
}

/**
 * Injects a cryptographic signature into the prompt for traceability
 * @param prompt The prompt to sign
 * @returns Signed prompt with rule metadata header
 */
export function injectRuleSignature(prompt: string): string {
  const timestamp = new Date().toISOString();
  const signature = `## RULE_ID:ARCH_001 HASH:${ARCHITECTURAL_RULE_HASH} TIMESTAMP:${timestamp}`;
  return `${signature}\n\n${prompt}`;
}
