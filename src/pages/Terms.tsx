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

            <p className="mt-4"><strong>Credits refresh monthly and do not roll over.</strong></p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Support Level Definitions</h3>
            <ul>
              <li><strong>Standard support:</strong> Email response within 48 business hours</li>
              <li><strong>Priority support:</strong> Email response within 24 business hours</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payments & Billing</h2>
            <p>Payments are securely handled through Stripe.</p>
            <p>Subscriptions renew automatically unless canceled before your billing date.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Refund Policy (30-Day Money-Back Guarantee)</h2>
            <p>We offer a <strong>30-day money-back guarantee</strong> on your first purchase.</p>
            <p>To request a refund, email <a href="mailto:support@thelandrymethod.com" className="text-primary hover:underline">support@thelandrymethod.com</a> within 30 days.</p>
            <p>If credits were used, the proportional value of those credits will be deducted from the refund.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Acceptable Use</h2>
            <p>You may not upload content that is illegal, hateful, violent, pornographic, copyrighted, or harmful.</p>
            <p>Images containing identifiable people are prohibited.</p>
            <p>Virtual staging must be clearly disclosed when used in real-estate listings ("Photos are virtually staged").</p>
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
