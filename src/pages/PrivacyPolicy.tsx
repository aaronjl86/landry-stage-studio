import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/landing/Header";
import Footer4Col from "@/components/ui/footer-column";

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          
          <div className="text-sm text-muted-foreground mb-8">
            <p><strong>Effective Date:</strong> November 13, 2025</p>
            <p><strong>Last Updated:</strong> November 13, 2025</p>
            <p><strong>Legal Entity:</strong> The Landry Method LLC</p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Information You Provide</h3>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Property photos you upload</li>
              <li>Messages submitted through forms</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Automatically Collected</h3>
            <ul>
              <li>Browser/device details</li>
              <li>IP address</li>
              <li>Usage analytics</li>
              <li>Error logs</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Free Trial Information</h3>
            <p>When you register for an account, The Landry Method LLC automatically provides <strong>3 free uploads</strong>.</p>
            <p>To support this functionality, we collect:</p>
            <ul>
              <li>Trial usage count</li>
              <li>Upload timestamps</li>
              <li>Non-payment identifiers used to enforce free-trial limits</li>
            </ul>
            <p>No payment method is required to use free uploads. Subscription billing begins only when you choose a paid plan.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Process and deliver staged/decluttered images</li>
              <li>Manage your subscription</li>
              <li>Provide support</li>
              <li>Improve the service</li>
              <li>Prevent abuse and ensure platform integrity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. AI Processing</h2>
            <p>Your images are processed by automated AI systems.</p>
            <p>We do <strong>not</strong>:</p>
            <ul>
              <li>Use your images to train AI models</li>
              <li>Sell your images</li>
              <li>Share your images with third parties except those required for processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payments</h2>
            <p>All payments are securely processed via Stripe.</p>
            <p>We do not store complete credit card numbers.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Refund Policy</h2>
            <p>Refunds follow our <strong>30-day money-back guarantee</strong>.</p>
            <p>See the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> for details.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <ul>
              <li>Uploaded images remain until deleted</li>
              <li>Account data is stored while the account is active</li>
              <li>Deleted accounts are fully removed within 30 days</li>
              <li>Billing records are retained as legally required</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Sharing</h2>
            <p>We only share data with:</p>
            <ul>
              <li>Service providers required to operate the platform</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>We do <strong>not</strong> sell or rent your data.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Security</h2>
            <p>We use encryption, access controls, and server-level protections to safeguard your data.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Your Rights</h2>
            <p>You may request to:</p>
            <ul>
              <li>Access your data</li>
              <li>Correct your data</li>
              <li>Delete photos</li>
              <li>Delete your account</li>
              <li>Opt out of marketing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
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
