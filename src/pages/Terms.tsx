import { Header } from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer4Col from "@/components/ui/footer-column";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <article className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1>Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
          
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using The Landry Method ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not use the Service.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you ("User," "you," or "your") and The Landry Method ("Company," "we," "us," or "our").
            </p>
          </section>

          <section>
            <h2>2. Service Description</h2>
            <p>
              The Landry Method is an AI-powered virtual staging platform designed for real estate professionals. Our Service allows you to:
            </p>
            <ul>
              <li>Upload property photographs</li>
              <li>Transform empty or poorly staged spaces using AI technology</li>
              <li>Access multiple styling templates and custom prompts</li>
              <li>Download professionally staged images for marketing purposes</li>
              <li>Manage your gallery of processed images</li>
            </ul>
          </section>

          <section>
            <h2>3. User Accounts</h2>
            <h3>3.1 Account Creation</h3>
            <p>
              To use the Service, you must:
            </p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your password</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your account information remains current and accurate</li>
            </ul>

            <h3>3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account if:
            </p>
            <ul>
              <li>You violate these Terms</li>
              <li>You engage in fraudulent or illegal activities</li>
              <li>You abuse the Service or harm other users</li>
              <li>Your payment method fails or you have outstanding balances</li>
            </ul>
          </section>

          <section>
            <h2>4. Subscription Plans and Billing</h2>
            <h3>4.1 Available Plans</h3>
            <p>
              We offer three subscription tiers:
            </p>
            <ul>
              <li><strong>Starter Plan:</strong> $29/month or $290/year - 10 uploads/month, HD quality, 24-hour turnaround</li>
              <li><strong>Professional Plan:</strong> $79/month or $790/year - 50 uploads/month, Ultra HD quality, 12-hour turnaround</li>
              <li><strong>Enterprise Plan:</strong> $149/month or $1,490/year - Unlimited uploads, 4K quality, 2-hour turnaround</li>
            </ul>

            <h3>4.2 Billing and Payments</h3>
            <ul>
              <li>All payments are processed securely through Stripe</li>
              <li>Subscriptions automatically renew at the end of each billing cycle</li>
              <li>Prices are in USD and subject to applicable taxes</li>
              <li>You authorize us to charge your payment method for all fees</li>
            </ul>

            <h3>4.3 Credit System</h3>
            <ul>
              <li>Each image processed consumes one credit</li>
              <li>Credits refresh monthly based on your subscription plan</li>
              <li>Unused credits do not roll over to the next billing cycle</li>
              <li>Enterprise plan users receive unlimited credits per month</li>
            </ul>

            <h3>4.4 Refund Policy</h3>
            <ul>
              <li>All subscriptions: 30-day money-back guarantee from initial purchase date</li>
              <li>Credits used during the refund period will be deducted from refund amount at the rate of $2.90 per credit for Starter, $1.58 per credit for Professional, and $0.37 per credit for Enterprise</li>
              <li>Refunds processed to original payment method within 5-10 business days</li>
              <li>Refund requests must be submitted to support@thelandrymethod.com</li>
            </ul>

            <h3>4.5 Plan Changes and Cancellation</h3>
            <ul>
              <li>You may upgrade or downgrade your plan at any time</li>
              <li>Upgrades take effect immediately; downgrades at next billing cycle</li>
              <li>Cancellations can be made through your account settings or customer portal</li>
              <li>Access continues until the end of your paid period</li>
              <li>No pro-rated refunds for mid-cycle cancellations</li>
            </ul>

            <h3>4.6 Free Trial</h3>
            <ul>
              <li>New users receive 3 free image uploads to evaluate the Service</li>
              <li>No credit card required for free trial</li>
              <li>Free trial credits do not expire but cannot be replenished without a paid subscription</li>
              <li>One free trial per user; additional accounts to access more free trials are prohibited</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property Rights</h2>
            <h3>5.1 Your Content</h3>
            <p>
              You retain all ownership rights to images you upload. By using the Service, you grant us:
            </p>
            <ul>
              <li>A limited license to process your images using AI technology</li>
              <li>Permission to store processed images in your account</li>
              <li>The right to use anonymized, non-identifiable data to improve our Service</li>
            </ul>

            <h3>5.2 AI-Generated Content</h3>
            <ul>
              <li>You own all rights to the staged images we generate from your uploads</li>
              <li>You may use processed images for any lawful commercial or personal purpose</li>
              <li>You may create unlimited variations within your monthly credit allocation</li>
              <li>You are responsible for ensuring compliance with real estate advertising regulations</li>
              <li>You must not claim that AI-generated staging represents actual physical staging</li>
            </ul>

            <h3>5.3 Our Intellectual Property</h3>
            <p>
              The Service, including all software, algorithms, templates, and branding, is protected by copyright, trademark, and other intellectual property laws. You may not:
            </p>
            <ul>
              <li>Copy, modify, or reverse-engineer our technology</li>
              <li>Remove or alter any proprietary notices</li>
              <li>Use our branding without written permission</li>
              <li>Create derivative works based on our Service</li>
            </ul>
          </section>

          <section>
            <h2>6. Prohibited Uses</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Upload images you do not have rights to use</li>
              <li>Process images containing illegal content or copyrighted material without permission</li>
              <li>Create misleading or deceptive real estate listings</li>
              <li>Harass, abuse, or harm other users or our staff</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use automated systems to access the Service (except Enterprise API access)</li>
              <li>Resell or redistribute our Service without authorization</li>
              <li>Upload viruses, malware, or malicious code</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2>7. Content Guidelines</h2>
            <h3>7.1 Acceptable Content</h3>
            <p>
              You may only upload:
            </p>
            <ul>
              <li>Property photographs you own or have permission to use</li>
              <li>Images of residential or commercial real estate interiors/exteriors</li>
              <li>Content that complies with all applicable laws</li>
            </ul>

            <h3>7.2 Prohibited Content</h3>
            <p>
              You may not upload:
            </p>
            <ul>
              <li>Images of people (for privacy protection)</li>
              <li>Copyrighted material without proper authorization</li>
              <li>Illegal, obscene, or offensive content</li>
              <li>Images violating third-party rights</li>
            </ul>

            <h3>7.3 Content Moderation</h3>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Review uploaded content for compliance</li>
              <li>Remove content that violates these Terms</li>
              <li>Suspend accounts that repeatedly violate content guidelines</li>
            </ul>
          </section>

          <section>
            <h2>8. Service Availability and Limitations</h2>
            <h3>8.1 Uptime and Maintenance</h3>
            <ul>
              <li>We strive for 99.9% uptime but do not guarantee uninterrupted access</li>
              <li>Scheduled maintenance will be announced in advance when possible</li>
              <li>Emergency maintenance may occur without notice</li>
            </ul>

            <h3>8.2 Processing Times</h3>
            <ul>
              <li>AI image processing completes in seconds for standard uploads</li>
              <li>Batch processing may take longer depending on queue volume (typically under 5 minutes)</li>
              <li>Support response times: Starter (24h), Professional (12h), Enterprise (2h)</li>
              <li>Complex images or custom requests may require additional processing time</li>
            </ul>

            <h3>8.3 AI Limitations</h3>
            <ul>
              <li>AI-generated results may vary in quality</li>
              <li>We do not guarantee perfect results for every image</li>
              <li>You may retry processing if results are unsatisfactory (credit will not be refunded)</li>
            </ul>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul>
              <li>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND</li>
              <li>WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES</li>
              <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE LAST 12 MONTHS</li>
              <li>WE ARE NOT RESPONSIBLE FOR LOST PROFITS, DATA, OR BUSINESS OPPORTUNITIES</li>
              <li>YOU ASSUME ALL RISKS ASSOCIATED WITH USING AI-GENERATED CONTENT</li>
            </ul>
          </section>

          <section>
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless The Landry Method, its officers, employees, and agents from any claims, damages, or expenses arising from:
            </p>
            <ul>
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Content you upload or distribute</li>
              <li>Your use of AI-generated images in real estate marketing</li>
            </ul>
          </section>

          <section>
            <h2>11. Communications and Consent</h2>
            <h3>11.1 Consent to Receive Communications</h3>
            <p>
              By providing your telephone number and agreeing to receive communications from us, you expressly consent to receive:
            </p>
            <ul>
              <li><strong>Phone Calls:</strong> Including automated calls, pre-recorded messages, and artificial intelligence (AI) voice calls</li>
              <li><strong>Text Messages:</strong> SMS and MMS messages for service notifications and marketing</li>
              <li><strong>Marketing Communications:</strong> Promotional offers, updates, and information about our services</li>
            </ul>

            <h3>11.2 Automated and AI Voice Technology</h3>
            <p>
              You acknowledge and agree that:
            </p>
            <ul>
              <li>We may use automated telephone dialing systems to contact you</li>
              <li>Calls may be pre-recorded or generated using artificial intelligence voice technology</li>
              <li>AI voice agents may conduct conversations, answer questions, and collect information</li>
              <li>Call content may be recorded for quality assurance and training purposes</li>
            </ul>

            <h3>11.3 TCPA Compliance</h3>
            <p>
              In compliance with the Telephone Consumer Protection Act (TCPA):
            </p>
            <ul>
              <li>Your consent is not required as a condition of purchasing any goods or services</li>
              <li>You may revoke your consent at any time without penalty</li>
              <li>We maintain internal do-not-call lists and honor the National Do Not Call Registry</li>
              <li>Standard message and data rates from your carrier may apply to calls and texts</li>
            </ul>

            <h3>11.4 Communication Frequency</h3>
            <ul>
              <li>Message and call frequency may vary based on your account activity and selected preferences</li>
              <li>Service-related communications (account notifications, security alerts) may be sent regardless of marketing preferences</li>
              <li>Marketing communications will only be sent if you have provided express consent</li>
            </ul>

            <h3>11.5 Opt-Out Rights</h3>
            <p>
              You have the right to opt out of communications at any time:
            </p>
            <ul>
              <li><strong>SMS/Text Messages:</strong> Reply STOP to any text message to unsubscribe</li>
              <li><strong>Phone Calls:</strong> Request removal during any call or email support@thelandrymethod.com</li>
              <li><strong>Marketing Emails:</strong> Click unsubscribe in any marketing email</li>
              <li><strong>All Communications:</strong> Contact support@thelandrymethod.com to update all preferences</li>
            </ul>
            <p>
              For assistance with communications, reply HELP to any text message or contact support@thelandrymethod.com.
            </p>
          </section>

          <section>
            <h2>12. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Please review our <Link to="/privacy-policy" className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your information.
            </p>
            <p>
              Key points:
            </p>
            <ul>
              <li>We encrypt data in transit and at rest</li>
              <li>We do not sell your personal information</li>
              <li>You have rights to access, correct, and delete your data</li>
              <li>We comply with GDPR, CCPA, and other privacy regulations</li>
            </ul>
          </section>

          <section>
            <h2>13. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by:
            </p>
            <ul>
              <li>Posting updated Terms on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending email notification for significant changes</li>
            </ul>
            <p>
              Your continued use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2>14. Governing Law and Dispute Resolution</h2>
            <h3>13.1 Governing Law</h3>
            <p>
              These Terms are governed by the laws of the State of Oregon, without regard to conflict of law principles.
            </p>

            <h3>13.2 Dispute Resolution</h3>
            <p>
              In the event of a dispute:
            </p>
            <ul>
              <li>First, contact us at legal@thelandrymethod.com to resolve informally</li>
              <li>If unresolved, disputes shall be settled through binding arbitration</li>
              <li>Arbitration will be conducted under the Commercial Arbitration Rules of the American Arbitration Association</li>
              <li>The arbitration venue shall be Portland, Oregon</li>
              <li>You waive the right to participate in class actions</li>
            </ul>

            <h3>13.3 Exceptions</h3>
            <p>
              Either party may seek injunctive relief in court for:
            </p>
            <ul>
              <li>Intellectual property violations</li>
              <li>Breach of confidentiality</li>
              <li>Unauthorized access to systems</li>
            </ul>
            <p>
              Any court proceedings shall be brought exclusively in the state or federal courts located in Multnomah County, Oregon, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>

          <section>
            <h2>15. Miscellaneous</h2>
            <h3>14.1 Entire Agreement</h3>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and The Landry Method.
            </p>

            <h3>14.2 Severability</h3>
            <p>
              If any provision is found unenforceable, the remaining provisions remain in full effect.
            </p>

            <h3>14.3 Waiver</h3>
            <p>
              Our failure to enforce any right or provision does not constitute a waiver of that right or provision.
            </p>

            <h3>14.4 Assignment</h3>
            <p>
              You may not assign these Terms without our written consent. We may assign our rights and obligations without restriction.
            </p>

            <h3>14.5 Force Majeure</h3>
            <p>
              We are not liable for delays or failures due to circumstances beyond our reasonable control.
            </p>
          </section>

          <section>
            <h2>16. Contact Information</h2>
            <p>
              For questions about these Terms, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> legal@thelandrymethod.com</li>
              <li><strong>Support:</strong> support@thelandrymethod.com</li>
              <li><strong>Mail:</strong> The Landry Method Legal Department, Address available upon request (contact support@thelandrymethod.com)</li>
            </ul>
          </section>

          <section>
            <h2>17. Acknowledgment</h2>
            <p>
              BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM.
            </p>
          </section>
        </article>
      </main>
      
      <Footer4Col />
    </div>
  );
}
