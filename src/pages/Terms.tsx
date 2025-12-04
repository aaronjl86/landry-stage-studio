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
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          
          <div className="text-sm text-muted-foreground mb-8">
            <p><strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Legal Entity:</strong> The Landry Method LLC</p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the services of The Landry Method LLC ("we," "us," "our," or "The Landry Method"), 
              you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
              please do not use our services.
            </p>
            <p>
              These Terms apply to all clients who use our virtual staging services, whether through our website, 
              email, or other communication channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p>
              The Landry Method provides professional virtual staging services for real estate property images. 
              Our service model operates as follows:
            </p>
            <ol>
              <li><strong>Client Submission:</strong> You provide us with property images you wish to have enhanced with virtual staging</li>
              <li><strong>Service Processing:</strong> We manually review and enhance your images according to your specific instructions using professional virtual staging techniques</li>
              <li><strong>Delivery:</strong> We deliver the enhanced images back to you via email, Slack, or other agreed-upon third-party communication channels</li>
              <li><strong>Invoicing:</strong> We invoice you for the services rendered after delivery</li>
            </ol>
            <p>
              <strong>Important:</strong> The Landry Method operates as a direct service provider. We do not offer 
              self-service platforms or automated processing systems. All work is performed manually by our team.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Client Responsibilities</h2>
            <p>As a client, you agree to:</p>
            <ul>
              <li>Provide clear, high-quality images suitable for virtual staging enhancement</li>
              <li>Provide specific instructions regarding the desired staging style, furniture placement, and design preferences</li>
              <li>Ensure you have the legal right to use and modify the images you submit</li>
              <li>Pay invoices promptly according to the payment terms specified</li>
              <li>Use enhanced images in compliance with applicable real estate regulations and disclosure requirements</li>
              <li>Not use our services for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Service Delivery and Turnaround</h2>
            <p>
              Turnaround times for service delivery will be communicated to you at the time of service request. 
              While we strive to meet all deadlines, turnaround times are estimates and not guarantees. 
              Factors such as image complexity, volume of work, and specific requirements may affect delivery times.
            </p>
            <p>
              We will deliver completed work via the communication method agreed upon (email, Slack, or other platform). 
              It is your responsibility to ensure delivery addresses and contact information are accurate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
            <p>
              <strong>Invoicing:</strong> We invoice clients for services rendered after delivery of enhanced images. 
              Payment terms will be specified on each invoice, typically net 15 or net 30 days.
            </p>
            <p>
              <strong>Payment Methods:</strong> Payments are processed through secure third-party payment processors. 
              We accept major credit cards and other payment methods as specified.
            </p>
            <p>
              <strong>Late Payments:</strong> Late payments may be subject to interest charges and may result in 
              suspension of services until payment is received.
            </p>
            <p>
              <strong>Disputes:</strong> If you dispute any charge, you must contact us within 30 days of the invoice date. 
              We will work with you to resolve any billing disputes promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
            <p>
              <strong>Client Images:</strong> You retain all rights to the original images you submit. 
              By submitting images, you grant us a limited license to use them solely for the purpose 
              of providing the virtual staging services you've requested.
            </p>
            <p>
              <strong>Enhanced Images:</strong> Upon payment in full, you receive a license to use the 
              enhanced images for your real estate marketing purposes. You may use the enhanced images 
              in listings, websites, marketing materials, and other promotional materials related to the 
              properties depicted.
            </p>
            <p>
              <strong>Our Rights:</strong> We retain the right to use enhanced images (with client permission) 
              for portfolio, marketing, and promotional purposes, unless otherwise agreed in writing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Real Estate Disclosure Requirements</h2>
            <p>
              <strong>Virtual Staging Disclosure:</strong> You are responsible for ensuring compliance with 
              all applicable real estate regulations regarding virtual staging disclosure. Most MLS systems and 
              real estate regulations require disclosure that images are virtually staged.
            </p>
            <p>
              We recommend including language such as "Photos are virtually staged to help buyers visualize 
              the potential of the space" or "Virtually staged photos" in your listing descriptions.
            </p>
            <p>
              The Landry Method is not responsible for your compliance with local, state, or federal real estate 
              regulations. It is your responsibility to ensure proper disclosure of virtual staging.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Revisions and Changes</h2>
            <p>
              We strive to deliver work that meets your specifications. If you require revisions to completed work, 
              please contact us within 7 days of delivery. Revisions may be subject to additional charges depending 
              on the scope of changes requested.
            </p>
            <p>
              Minor adjustments and corrections are typically included at no additional charge. Significant changes 
              or complete re-staging may incur additional fees, which will be communicated before work begins.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Refund Policy</h2>
            <p>
              <strong>Service Satisfaction:</strong> We are committed to delivering high-quality work. 
              If you are not satisfied with the delivered work, please contact us within 7 days of delivery 
              to discuss revisions or resolution.
            </p>
            <p>
              <strong>Refund Eligibility:</strong> Refunds may be considered on a case-by-case basis for 
              services that have not been delivered or in cases where we are unable to fulfill the service 
              as agreed. Once work has been delivered and accepted, refunds are generally not available, 
              though we will work with you to address any concerns.
            </p>
            <p>
              <strong>Partial Refunds:</strong> If a project is cancelled after work has begun but before 
              completion, a partial refund may be provided based on the work completed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p>
              <strong>Service Limitations:</strong> While we strive for excellence, virtual staging results 
              depend on various factors including image quality, lighting, and specific requirements. 
              We do not guarantee specific outcomes or that enhanced images will meet all expectations.
            </p>
            <p>
              <strong>Liability Cap:</strong> Our total liability for any claim arising from our services 
              shall not exceed the amount paid by you for the specific service giving rise to the claim.
            </p>
            <p>
              <strong>Indirect Damages:</strong> We are not liable for any indirect, incidental, special, 
              or consequential damages arising from the use of our services, including but not limited to 
              lost profits, lost sales, or business interruption.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Prohibited Uses</h2>
            <p>You agree not to use our services:</p>
            <ul>
              <li>For any illegal purpose or in violation of any laws or regulations</li>
              <li>To submit images for which you do not have the legal right to use or modify</li>
              <li>To submit images containing illegal, harmful, or offensive content</li>
              <li>To attempt to reverse engineer or copy our service methods</li>
              <li>To interfere with or disrupt our services or operations</li>
              <li>To use our services to compete with or harm our business</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Communication and Marketing</h2>
            <p>
              <strong>Service Communications:</strong> We will communicate with you regarding your service 
              requests, delivery, and invoicing through email, phone, or other agreed-upon channels.
            </p>
            <p>
              <strong>Marketing Communications:</strong> With your consent, we may send you marketing 
              communications about our services. You can opt out at any time by:
            </p>
            <ul>
              <li>Clicking the unsubscribe link in marketing emails</li>
              <li>Replying "STOP" to text messages</li>
              <li>Contacting us at support@thelandrymethod.com</li>
            </ul>
            <p>
              <strong>Text Messaging:</strong> If you opt in to receive text messages, you understand that:
            </p>
            <ul>
              <li>Message frequency may vary</li>
              <li>Message and data rates may apply</li>
              <li>You can cancel at any time by replying "STOP"</li>
              <li>You can get help by replying "HELP"</li>
              <li>Carriers are not liable for delayed or undelivered messages</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Privacy</h2>
            <p>
              Your use of our services is also governed by our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, 
              which explains how we collect, use, and protect your information. Please review our Privacy Policy carefully.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Termination</h2>
            <p>
              <strong>By You:</strong> You may discontinue use of our services at any time by notifying us 
              and completing payment for any outstanding invoices.
            </p>
            <p>
              <strong>By Us:</strong> We reserve the right to suspend or terminate services if you violate 
              these Terms, fail to pay invoices, or engage in prohibited uses. We will provide reasonable 
              notice when possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Material changes will be communicated 
              to active clients via email or other reasonable means. Continued use of our services after 
              changes constitutes acceptance of the modified Terms.
            </p>
            <p>
              The "Last Updated" date at the top of this page indicates when these Terms were last revised.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">16. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Oregon, United States, without regard to 
              conflict of law principles. Any disputes arising from these Terms or our services shall be 
              resolved in the courts of Oregon.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            <p>
              <strong>The Landry Method LLC</strong><br />
              5441 S Macadam Ave STE N<br />
              Portland, OR 97239<br />
              Phone: +1 (503) 276-7274<br />
              Email: <a href="mailto:support@thelandrymethod.com" className="text-primary hover:underline">support@thelandrymethod.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">18. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and 
              The Landry Method regarding the use of our services and supersede all prior agreements and 
              understandings.
            </p>
          </section>
        </article>
      </main>

      <Footer4Col />
    </div>
  );
}
