import { Button } from "@/components/ui/button";
import Footer4Col from "@/components/ui/footer-column";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Cookies</h2>
            <p>
              We use cookies and similar technologies (like localStorage) to enhance your experience, secure your account, and improve our service. We categorize cookies into different types based on their purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-6 mt-4">
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
                <p className="mb-4 text-muted-foreground">
                  These cookies are necessary for the website to function and cannot be disabled. They are usually only set in response to actions you take, such as logging in or setting your privacy preferences.
                </p>
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium">Authentication Tokens</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Purpose:</strong> Keeps you logged in securely
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Storage:</strong> localStorage
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Duration:</strong> Session-based (cleared on logout)
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium">Cookie Consent</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Purpose:</strong> Remembers your cookie preferences
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Storage:</strong> localStorage (cookieConsent)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Duration:</strong> 1 year
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Functional Cookies</h3>
                <p className="mb-4 text-muted-foreground">
                  These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers. If you do not allow these cookies, some or all of these features may not function properly.
                </p>
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium">Sidebar State</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Purpose:</strong> Remembers if you collapsed the sidebar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Storage:</strong> localStorage (sidebar:state)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Duration:</strong> 7 days
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium">Theme Preference</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Purpose:</strong> Remembers your dark/light mode preference
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Storage:</strong> localStorage
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Duration:</strong> Persistent
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Analytics Cookies</h3>
                <p className="mb-4 text-muted-foreground">
                  Currently, we use Vercel Speed Insights for performance monitoring. These cookies help us understand how visitors interact with our website and identify areas for improvement.
                </p>
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded p-4">
                    <p className="font-medium">Vercel Speed Insights</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Purpose:</strong> Performance monitoring and analytics
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Type:</strong> First-party analytics
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Duration:</strong> Session-based
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Managing Your Cookie Preferences</h2>
            <p className="mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the cookie preferences dialog on our website</li>
              <li>Setting your browser to refuse cookies or alert you when cookies are being sent</li>
              <li>Clearing cookies that have already been set in your browser</li>
            </ul>
            <p className="mt-4">
              Please note that if you choose to reject essential cookies, you may not be able to access certain features of our website, particularly those requiring authentication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Browser-Specific Cookie Controls</h2>
            <p className="mb-4">Most browsers allow you to control cookies through their settings:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Chrome:</strong>{" "}
                <a 
                  href="https://support.google.com/chrome/answer/95647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Manage cookies in Chrome
                </a>
              </li>
              <li>
                <strong>Firefox:</strong>{" "}
                <a 
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Manage cookies in Firefox
                </a>
              </li>
              <li>
                <strong>Safari:</strong>{" "}
                <a 
                  href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Manage cookies in Safari
                </a>
              </li>
              <li>
                <strong>Edge:</strong>{" "}
                <a 
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Manage cookies in Edge
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Cookies</h2>
            <p>
              We may use third-party service providers who may set cookies on your device. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong>Vercel Speed Insights:</strong> For performance monitoring and analytics
              </li>
              <li>
                <strong>Stripe:</strong> For secure payment processing (when you subscribe)
              </li>
            </ul>
            <p className="mt-4">
              These third parties have their own privacy and cookie policies. We encourage you to review their policies to understand how they use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page with an updated "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions about our use of cookies or this Cookie Policy, please contact us at:
            </p>
            <p className="mt-4">
              Email: <a href="mailto:support@thelandrymethod.com" className="text-primary hover:underline">support@thelandrymethod.com</a>
            </p>
          </section>

          <section className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              For more information about how we handle your personal data, please see our{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer4Col />
    </div>
  );
}
