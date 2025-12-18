export interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  timestamp: number;
}

const COOKIE_CONSENT_KEY = 'cookieConsent';
const CONSENT_EXPIRY_DAYS = 365;

export const defaultPreferences: CookiePreferences = {
  essential: true, // Always true, cannot be disabled
  functional: false,
  analytics: false,
  timestamp: Date.now(),
};

/**
 * Get current cookie consent preferences from localStorage
 */
export function getCookieConsent(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;
    
    const preferences: CookiePreferences = JSON.parse(stored);
    
    // Check if consent has expired (1 year)
    const expiryTime = preferences.timestamp + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    if (Date.now() > expiryTime) {
      clearCookieConsent();
      return null;
    }
    
    return preferences;
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return null;
  }
}

/**
 * Save cookie consent preferences to localStorage
 */
export function setCookieConsent(preferences: Omit<CookiePreferences, 'timestamp'>): void {
  try {
    const preferencesWithTimestamp: CookiePreferences = {
      ...preferences,
      essential: true, // Always true
      timestamp: Date.now(),
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferencesWithTimestamp));
    
    // Apply preferences immediately
    applyConsentPreferences(preferencesWithTimestamp);
  } catch (error) {
    console.error('Error saving cookie consent:', error);
  }
}

/**
 * Check if user has made a consent choice
 */
export function hasConsent(): boolean {
  return getCookieConsent() !== null;
}

/**
 * Clear cookie consent (for testing or user request)
 */
export function clearCookieConsent(): void {
  try {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch (error) {
    console.error('Error clearing cookie consent:', error);
  }
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  setCookieConsent({
    essential: true,
    functional: true,
    analytics: true,
  });
}

/**
 * Reject non-essential cookies
 */
export function rejectNonEssentialCookies(): void {
  setCookieConsent({
    essential: true,
    functional: false,
    analytics: false,
  });
}

/**
 * Apply consent preferences by enabling/disabling features
 */
function applyConsentPreferences(preferences: CookiePreferences): void {
  // Clear functional cookies if not consented
  if (!preferences.functional) {
    try {
      localStorage.removeItem('sidebar:state');
      // Add other functional storage items here as needed
    } catch (error) {
      console.error('Error clearing functional cookies:', error);
    }
  }
  
  // Note: Analytics cookies are handled by the analytics service itself
  // based on the consent preferences
}

/**
 * Check if a specific cookie category is allowed
 */
export function isCategoryAllowed(category: keyof Omit<CookiePreferences, 'timestamp'>): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[category];
}
