import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/landing/Header";
import Footer4Col from "@/components/ui/footer-column";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
          
          <div className="text-sm text-muted-foreground mb-8">
            <p><strong>Effective Date:</strong> November 13, 2025</p>
            <p><strong>Last Updated:</strong> November 13, 2025</p>
            <p><strong>Legal Entity:</strong> The Landry Method LLC</p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By using The Landry Method LLC ("Service"), you agree to these Terms. If you do not agree, discontinue use immediately.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. What the Service Does</h2>
            <p>The Landry Method LLC provides AI-powered virtual staging that transforms uploaded property photos through digital staging, decluttering (when included in the user's prompt), lighting enhancement, and visual cleanup.</p>
            <p>Processing typically completes in <strong>seconds</strong>, though complex jobs may take longer.</p>
            <p><strong>We do not modify architectural structure</strong> such as walls, ceilings, windows, floors, or layout.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2.5 Revisions & Re-Processing</h2>
            <p>The Landry Method LLC provides <strong>unlimited revisions</strong> for the same original photo at <strong>no extra cost</strong>.</p>
            <ul>
              <li>Each original photo upload consumes <strong>one (1) credit</strong></li>
              <li>Revisions do <strong>not</strong> consume additional credits</li>
              <li>If you are unsatisfied with a result, you may re-process the same image at any time</li>
              <li>AI errors (glitches, distortions, malformed objects) may be corrected by re-processing</li>
              <li>If an image fails to process, the credit is automatically refunded</li>
              <li>If the AI alters architectural structure (MLS violation), users should click <strong>"Report Structural Change"</strong> and re-process the image at no cost</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Subscription Plans</h2>
            <p>The only differences between plans are <strong>monthly upload limits</strong> and <strong>support level</strong>.</p>
            <p>Higher-tier plans do <strong>not</strong> unlock extra tools, features, quality improvements, or capabilities.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Starter — $29/month or $290/year</h3>
            <ul>
              <li>10 uploads/month</li>
              <li>Standard support</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Professional — $79/month or $790/year</h3>
            <ul>
              <li>50 uploads/month</li>
              <li>Priority support</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Enterprise — $149/month or $1,490/year</h3>
            <ul>
              <li>200 uploads/month</li>
              <li>Priority support</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Upload & Credit System</h3>
            <ul>
              <li>One (1) credit = one (1) unique original photo upload</li>
              <li>Revisions do <strong>not</strong> consume credits</li>
              <li>Credits refresh monthly on your billing date and do not roll over to the next month</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Support Level Definitions</h3>
            <ul>
              <li><strong>Standard support:</strong> Typical email response within 48 business hours</li>
              <li><strong>Priority support:</strong> Typical email response within 24 business hours</li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground"><em>Note: These are typical response times, not guaranteed service level agreements (SLAs).</em></p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3.5 Free Trial</h2>
            <p>All new users of The Landry Method LLC receive <strong>3 free uploads</strong> when creating an account.</p>
            <ul>
              <li>No credit card is required</li>
              <li>Free uploads are available immediately upon registration</li>
              <li>Free uploads are valid for 90 days of account inactivity</li>
              <li>Once free uploads are used, continued usage requires a paid plan</li>
              <li>Free uploads cannot be combined or rolled over with paid subscription credits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payments & Billing</h2>
            <p>Payments are securely handled through Stripe.</p>
            <p>Subscriptions renew automatically unless canceled before your billing date.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Refund Policy (30-Day Money-Back Guarantee)</h2>
            <p>We offer a <strong>30-day money-back guarantee</strong> on your <strong>first purchase</strong> only.</p>
            <p>To request a refund, email <a href="mailto:support@thelandrymethod.com" className="text-primary hover:underline">support@thelandrymethod.com</a> within 30 days.</p>
            <p>If credits were used during the guarantee period, the proportional value of used credits will be deducted from the refund.</p>
            <p className="mt-4"><strong>Additional refund rules:</strong></p>
            <ul>
              <li>Partial-month refunds are not provided unless required by applicable law</li>
              <li>Annual subscriptions are non-refundable after the initial 30-day guarantee period</li>
              <li>Processing failures automatically refund the associated credit</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Acceptable Use & MLS Compliance</h2>
            <p>You may not upload content that is illegal, hateful, violent, pornographic, copyrighted, or harmful. Images containing identifiable people are prohibited.</p>
            <p>Virtual staging must be clearly disclosed when used in real-estate listings ("Photos are virtually staged").</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">MLS Compliance</h3>
            <p>Users must comply with all applicable MLS rules when using virtually staged images. The Landry Method LLC adheres to strict compliance by <strong>not modifying architectural structure</strong>.</p>
            
            <h4 className="text-lg font-semibold mt-4 mb-2">The system DOES NOT modify:</h4>
            <ul>
              <li>Walls</li>
              <li>Doors</li>
              <li>Windows</li>
              <li>Ceilings</li>
              <li>Floors</li>
              <li>Built-ins</li>
              <li>Fireplaces</li>
              <li>Staircases</li>
              <li>Any load-bearing or structural elements</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4 mb-2">The system MAY modify:</h4>
            <ul>
              <li>Furniture placement</li>
              <li>Clutter removal</li>
              <li>Décor changes</li>
              <li>Non-structural lighting enhancement</li>
              <li>Aesthetic improvements</li>
              <li>AI-generated errors (fixable by re-processing)</li>
            </ul>

            <p className="mt-4">Users are responsible for following MLS disclosure requirements (e.g., "Photos are virtually staged").</p>
            <p>A <strong>"Report Structural Change"</strong> button is provided to flag accidental architectural modifications created by the AI.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p>You retain ownership of your uploaded photos and receive full commercial usage rights for processed outputs.</p>
            <p>The Landry Method LLC does <strong>not</strong> train AI models on user content and does <strong>not</strong> use your images for marketing without explicit permission.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Service Limitations</h2>
            <p>Results may vary based on input quality.</p>
            <p>If a processing failure occurs, the associated credit is automatically refunded.</p>
            <p>Uptime is not guaranteed.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p>Liability is limited to the total amount you paid in the previous 12 months.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p>You agree to indemnify and hold harmless The Landry Method LLC from any misuse of the Service or violation of applicable laws.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Communication Consent</h2>
            <p>By submitting contact information, you consent to receive:</p>
            <ul>
              <li>SMS messages</li>
              <li>Emails</li>
              <li>Phone calls, including automated or AI-generated voice</li>
            </ul>
            <p>You may opt out anytime by replying <strong>STOP</strong>.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
            <p>Either party may terminate the account at any time.</p>
            <p>Misuse, nonpayment, or policy violations may result in immediate termination.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
            <p>These Terms are governed by the laws of <strong>Oregon</strong>.</p>
            <p>Disputes will be resolved through binding arbitration in <strong>Portland, Oregon</strong>.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
            <p>
              <strong>The Landry Method LLC</strong><br />
              5441 S Macadam Ave STE N<br />
              Portland, OR 97239<br />
              Phone: +1 (323) 745-8111<br />
              Email: <a href="mailto:support@thelandrymethod.com" className="text-primary hover:underline">support@thelandrymethod.com</a>
            </p>
          </section>
        </article>
      </main>

      <Footer4Col />
    </div>
  );
}
