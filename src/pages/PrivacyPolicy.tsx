import { Header } from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer4Col from "@/components/ui/footer-column";

export default function PrivacyPolicy() {
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
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
          
          <section>
            <h2>Introduction</h2>
            <p>
              The Landry Method ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered virtual staging platform.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We collect the following personal information when you use our service:</p>
            <ul>
              <li><strong>Account Information:</strong> Email address, password (encrypted), and full name</li>
              <li><strong>Payment Information:</strong> Processed securely through Stripe; we do not store your complete payment card details</li>
              <li><strong>Usage Data:</strong> Credits used, subscription plan, processing history</li>
            </ul>

            <h3>Content You Upload</h3>
            <ul>
              <li><strong>Property Images:</strong> Photos you upload for virtual staging</li>
              <li><strong>Processed Images:</strong> AI-generated staged versions of your photos</li>
              <li><strong>Template Preferences:</strong> Your selected styling templates and custom prompts</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li><strong>Device Information:</strong> Browser type, device type, operating system</li>
              <li><strong>Usage Analytics:</strong> Pages visited, features used, time spent on platform</li>
              <li><strong>Log Data:</strong> IP address, access times, error logs</li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li><strong>Service Delivery:</strong> Process your images using AI technology, manage your account, and deliver staged photos</li>
              <li><strong>Payment Processing:</strong> Handle subscriptions, credit purchases, and billing through Stripe</li>
              <li><strong>Communication:</strong> Send service updates, respond to inquiries, and provide customer support</li>
              <li><strong>Platform Improvement:</strong> Analyze usage patterns to enhance our AI models and user experience</li>
              <li><strong>Security:</strong> Detect fraud, prevent abuse, and protect our users</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2>AI Processing and Data Usage</h2>
            <p>
              Your uploaded images are processed using Google Gemini AI models (including Gemini 2.5 Flash and other variants). The images are:
            </p>
            <ul>
              <li>Sent to AI processing services only for the purpose of virtual staging</li>
              <li>Not used to train AI models without your explicit consent</li>
              <li>Deleted from temporary processing storage after completion</li>
              <li>Stored securely in your account gallery for your access</li>
            </ul>

            <h3>Free Trial Information</h3>
            <ul>
              <li><strong>Free Trial Tracking:</strong> Email addresses and device fingerprints to prevent free trial abuse</li>
              <li>Free trial data is retained for fraud prevention purposes even after account deletion</li>
            </ul>
          </section>

          <section>
            <h2>Data Storage and Security</h2>
            <p>
              We implement industry-standard security measures to protect your information:
            </p>
            <ul>
              <li><strong>Encryption:</strong> Data is encrypted in transit (SSL/TLS) and at rest</li>
              <li><strong>Access Controls:</strong> Strict authentication and authorization protocols</li>
              <li><strong>Secure Infrastructure:</strong> Hosted on Lovable Cloud with Supabase backend</li>
              <li><strong>Regular Backups:</strong> Automated backups to prevent data loss</li>
              <li><strong>Monitoring:</strong> Continuous security monitoring and threat detection</li>
            </ul>
          </section>

          <section>
            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Stripe:</strong> Payment processing and subscription management</li>
              <li><strong>Google Gemini:</strong> AI image processing and virtual staging</li>
              <li><strong>Supabase/Lovable Cloud:</strong> Database, authentication, and file storage</li>
            </ul>
            <p>
              These services have their own privacy policies. We share only the minimum necessary information required for service delivery.
            </p>
          </section>

          <section>
            <h2>Your Rights and Choices</h2>
            <h3>Access and Control</h3>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> View all personal information we hold about you</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong>Export:</strong> Download your processed images and account data</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            </ul>

            <h3>Data Retention</h3>
            <ul>
              <li>Active account data: Retained while your account is active</li>
              <li>Processed images: Stored until you delete them or close your account</li>
              <li>Billing records: Retained for 7 years for tax and accounting purposes</li>
              <li>Deleted account data: Permanently removed within 30 days of account closure</li>
            </ul>
          </section>

          <section>
            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to:
            </p>
            <ul>
              <li>Maintain your login session</li>
              <li>Remember your preferences</li>
              <li>Analyze platform usage</li>
              <li>Improve user experience</li>
            </ul>
            <p>
              You can control cookies through your browser settings, but some features may not function properly without them.
            </p>
          </section>

          <section>
            <h2>GDPR Compliance (European Users)</h2>
            <p>
              If you are located in the European Economic Area (EEA), you have additional rights under GDPR:
            </p>
            <ul>
              <li>Right to be informed about data processing</li>
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Rights related to automated decision-making</li>
            </ul>
            <p>
              <strong>Legal Basis:</strong> We process your data based on consent, contract fulfillment, legal obligations, and legitimate interests.
            </p>
          </section>

          <section>
            <h2>CCPA Compliance (California Residents)</h2>
            <p>
              California residents have the right to:
            </p>
            <ul>
              <li>Know what personal information is collected</li>
              <li>Know if personal information is sold or disclosed</li>
              <li>Opt-out of the sale of personal information (we do not sell your data)</li>
              <li>Request deletion of personal information</li>
              <li>Non-discrimination for exercising CCPA rights</li>
            </ul>
          </section>

          <section>
            <h2>Children's Privacy</h2>
            <p>
              Our service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes by:
            </p>
            <ul>
              <li>Posting the updated policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending an email notification for material changes</li>
            </ul>
            <p>
              Your continued use of the service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              For privacy-related questions, concerns, or requests, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@thelandrymethod.com</li>
              <li><strong>Support:</strong> support@thelandrymethod.com</li>
              <li><strong>Mail:</strong> The Landry Method Privacy Team, Address available upon request (contact privacy@thelandrymethod.com)</li>
            </ul>
            <p>
              We will respond to your request within 30 days.
            </p>
          </section>
        </article>
      </main>
      
      <Footer4Col />
    </div>
  );
}
