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
            <p>As a direct service provider, we collect the following information when you engage with our services:</p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number</li>
              <li><strong>Property Images:</strong> Photos you provide for virtual staging enhancement</li>
              <li><strong>Service Instructions:</strong> Your specific requirements and preferences for image enhancement</li>
              <li><strong>Communication Records:</strong> Messages submitted through contact forms, email correspondence, and other communication channels</li>
              <li><strong>Billing Information:</strong> Payment details processed securely through third-party payment processors (we do not store complete payment card information)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h3>
            <ul>
              <li>Browser and device information</li>
              <li>IP address</li>
              <li>Website usage analytics (to improve our service)</li>
              <li>Error logs and technical diagnostics</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Service Delivery Model</h3>
            <p><strong>Important:</strong> The Landry Method operates as a direct service provider. We do not offer self-service platforms or automated processing. Our service model works as follows:</p>
            <ol>
              <li><strong>Client Submission:</strong> You provide us with images you want enhanced with virtual staging</li>
              <li><strong>Manual Processing:</strong> We manually review and enhance your images according to your specific instructions</li>
              <li><strong>Service Delivery:</strong> We deliver the enhanced images back to you via email, Slack, or other agreed-upon third-party communication channels</li>
              <li><strong>Invoicing:</strong> We invoice you for the services rendered after delivery</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
            <p>We use the information we collect solely for the following purposes:</p>
            <ul>
              <li><strong>Service Delivery:</strong> To receive, process, and enhance your property images according to your instructions</li>
              <li><strong>Communication:</strong> To communicate with you about your service requests, deliver completed work, and respond to inquiries</li>
              <li><strong>Direct Marketing:</strong> To send you information about our services, updates, and relevant content (only with your consent)</li>
              <li><strong>Billing and Invoicing:</strong> To process payments and send invoices for services rendered</li>
              <li><strong>Customer Support:</strong> To provide assistance and respond to your questions or concerns</li>
              <li><strong>Service Improvement:</strong> To analyze usage patterns and improve our service quality (using aggregated, anonymized data)</li>
            </ul>
            <p><strong>We do not:</strong></p>
            <ul>
              <li>Use your images to train AI models or for any purpose other than delivering your requested service</li>
              <li>Sell or rent your personal information or images to third parties</li>
              <li>Share your information except as necessary to provide the service (e.g., using third-party delivery platforms like email or Slack)</li>
              <li>Use automated systems to process your images without human oversight</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Image Processing and Service Delivery</h2>
            <p>Your property images are processed manually by our team using professional virtual staging tools and techniques. We review each image and enhance it according to your specific instructions.</p>
            <p><strong>Image Handling:</strong></p>
            <ul>
              <li>Images are received through secure channels (email, contact form, or agreed-upon third-party platforms)</li>
              <li>Images are processed manually by our team, not through automated self-service systems</li>
              <li>Enhanced images are delivered back to you via email, Slack, or other agreed-upon delivery methods</li>
              <li>Original and enhanced images are stored securely and only for as long as necessary to complete your service</li>
            </ul>
            <p><strong>We do <strong>not</strong>:</strong></p>
            <ul>
              <li>Use your images to train AI models or machine learning systems</li>
              <li>Sell or license your images to third parties</li>
              <li>Share your images publicly or use them for marketing without your explicit permission</li>
              <li>Retain images longer than necessary for service delivery and record-keeping purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payments and Invoicing</h2>
            <p>We invoice clients for services rendered after delivery of enhanced images. All payments are securely processed through third-party payment processors (such as Stripe).</p>
            <p><strong>Payment Information:</strong></p>
            <ul>
              <li>We do not store complete credit card numbers or full payment card details</li>
              <li>Payment information is handled by secure, PCI-compliant third-party processors</li>
              <li>We retain billing records as required by law and for accounting purposes</li>
              <li>Invoices are sent via email and include details of services provided</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Direct Marketing Communications</h2>
            <p>With your consent, we may send you direct marketing communications about our services, including:</p>
            <ul>
              <li>Service updates and new offerings</li>
              <li>Educational content about virtual staging</li>
              <li>Special offers or promotions</li>
              <li>Newsletters and industry insights</li>
            </ul>
            <p><strong>Opt-Out Rights:</strong></p>
            <ul>
              <li>You can opt out of marketing communications at any time by clicking the unsubscribe link in emails</li>
              <li>For SMS/text messages, reply "STOP" to opt out</li>
              <li>You can also contact us directly at support@thelandrymethod.com to opt out</li>
              <li>Opting out of marketing does not affect service-related communications (e.g., delivery confirmations, invoices)</li>
            </ul>
            <p><strong>Text Messaging (SMS) Consent:</strong> If you opt in to receive text messages, you understand that message frequency may vary, message and data rates may apply, and you can cancel at any time by replying "STOP". Carriers are not liable for delayed or undelivered messages.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p>We retain your information only for as long as necessary to provide our services and comply with legal obligations:</p>
            <ul>
              <li><strong>Service Images:</strong> Original and enhanced images are retained for the duration of the service relationship and may be kept for up to 2 years for record-keeping purposes, unless you request earlier deletion</li>
              <li><strong>Contact Information:</strong> Retained while you are an active client and for a reasonable period after service completion to handle follow-up inquiries</li>
              <li><strong>Billing Records:</strong> Retained as required by law (typically 7 years for tax and accounting purposes)</li>
              <li><strong>Communication Records:</strong> Email and form submissions are retained for customer service and record-keeping purposes</li>
            </ul>
            <p>You may request deletion of your images and personal information at any time by contacting support@thelandrymethod.com. We will honor such requests subject to legal retention requirements.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Sharing and Third Parties</h2>
            <p>We share your information only in the following limited circumstances:</p>
            <ul>
              <li><strong>Service Delivery:</strong> We may use third-party platforms (email services, Slack, cloud storage) to deliver your enhanced images and communicate with you. These platforms are bound by their own privacy policies and security measures.</li>
              <li><strong>Payment Processing:</strong> Payment information is shared with secure payment processors (e.g., Stripe) solely for transaction processing</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government regulation</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
            </ul>
            <p><strong>Important:</strong> We do <strong>not</strong>:</p>
            <ul>
              <li>Sell or rent your personal information or images to third parties</li>
              <li>Share your information with marketing partners or advertisers (except as part of newsletter/email marketing services you've opted into, such as GoHighLevel or Beehiiv, and only with your explicit consent)</li>
              <li>Use your images or information for purposes other than delivering the services you've requested</li>
            </ul>
            <p><strong>Text Messaging Data:</strong> Text messaging originator opt-in data and consent will not be shared with any third parties, excluding aggregators and providers of the text message services necessary to deliver messages to you.</p>
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
