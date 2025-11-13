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
          <p className="text-muted-foreground">
            <strong>Effective Date: November 13, 2025</strong>
          </p>
          <p className="text-muted-foreground">Last updated: November 13, 2025</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              The Landry Method ("we," "our," or "us") operates an AI-powered virtual staging platform for real estate professionals at thelandrymethod.com (the "Service"). We are committed to protecting your privacy and handling your data in an open and transparent manner.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. Please read this policy carefully. By accessing or using our Service, you agree to the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information You Provide</h3>
            <p>When you create an account or use our Service, we collect:</p>
            <ul>
              <li><strong>Account Information:</strong> Email address, password (encrypted), and name</li>
              <li><strong>Payment Information:</strong> Billing details processed securely through Stripe. We do not store complete credit card numbers</li>
              <li><strong>Profile Data:</strong> Subscription plan, credit balance, and account preferences</li>
              <li><strong>Communication Data:</strong> Your messages when you contact our support team</li>
            </ul>

            <h3>2.2 Content and Files</h3>
            <ul>
              <li><strong>Property Images:</strong> Photographs you upload for virtual staging</li>
              <li><strong>Processed Images:</strong> AI-generated staged versions of your photos stored in your gallery</li>
              <li><strong>Processing Data:</strong> Template selections, custom prompts, and editing history</li>
            </ul>

            <h3>2.3 Automatically Collected Information</h3>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, features used, processing queue activity, credit usage</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type, IP address</li>
              <li><strong>Analytics Data:</strong> Session duration, click patterns, error logs</li>
              <li><strong>Cookies:</strong> Session cookies, preference cookies, and analytics cookies</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            
            <h3>3.1 Service Delivery</h3>
            <ul>
              <li>Process your property images using Google Gemini 2.5 Flash AI technology</li>
              <li>Generate professionally staged versions of your photos</li>
              <li>Manage your account, credits, and subscription</li>
              <li>Store and organize your gallery of processed images</li>
              <li>Provide batch processing capabilities</li>
            </ul>

            <h3>3.2 Payment and Billing</h3>
            <ul>
              <li>Process subscription payments ($29, $79, or $149 monthly plans)</li>
              <li>Handle annual billing ($290, $790, or $1,490 yearly plans)</li>
              <li>Manage credit allocations and usage tracking</li>
              <li>Generate invoices and payment receipts</li>
            </ul>

            <h3>3.3 Communication</h3>
            <ul>
              <li>Send account notifications and service updates</li>
              <li>Respond to support inquiries</li>
              <li>Notify you about subscription changes or credit usage</li>
              <li>Send important security alerts</li>
            </ul>

            <h3>3.4 Service Improvement</h3>
            <ul>
              <li>Analyze usage patterns to enhance the platform</li>
              <li>Improve AI model performance and staging quality</li>
              <li>Develop new features and templates</li>
              <li>Optimize processing speed and reliability</li>
            </ul>

            <h3>3.5 Security and Compliance</h3>
            <ul>
              <li>Detect and prevent fraudulent activity</li>
              <li>Enforce our Terms and Conditions</li>
              <li>Comply with legal obligations</li>
              <li>Protect user accounts and data</li>
            </ul>
          </section>

          <section>
            <h2>4. AI Processing and Third-Party Services</h2>
            
            <h3>4.1 Google Gemini AI</h3>
            <p>
              Your uploaded images are processed using Google Gemini 2.5 Flash AI models. When you submit an image for staging:
            </p>
            <ul>
              <li>The image is transmitted to Google's AI services for processing</li>
              <li>The AI analyzes the image and applies virtual staging based on your selected template</li>
              <li>The processed image is returned and stored in your account</li>
              <li>We do not use your images to train AI models</li>
              <li>Google's data processing complies with their privacy policy and our data processing agreement</li>
            </ul>

            <h3>4.2 Stripe Payment Processing</h3>
            <p>
              All payment transactions are processed by Stripe, Inc. We do not store complete credit card information. Stripe's handling of payment data is governed by their privacy policy and PCI DSS compliance standards.
            </p>

            <h3>4.3 Hosting and Storage</h3>
            <p>
              Our Service is hosted using secure cloud infrastructure. Your images and data are stored with encryption both in transit and at rest.
            </p>
          </section>

          <section>
            <h2>5. Data Retention</h2>
            <p>We retain your information as follows:</p>
            <ul>
              <li><strong>Account Data:</strong> Retained for the duration of your active subscription plus 90 days after cancellation</li>
              <li><strong>Processed Images:</strong> Stored in your gallery until you delete them or close your account</li>
              <li><strong>Payment Records:</strong> Retained for 7 years for tax and accounting purposes</li>
              <li><strong>Usage Logs:</strong> Retained for 12 months for security and analytics</li>
              <li><strong>Deleted Account Data:</strong> Permanently deleted within 30 days of account closure request</li>
            </ul>
          </section>

          <section>
            <h2>6. Data Sharing and Disclosure</h2>
            
            <h3>6.1 We Do Not Sell Your Data</h3>
            <p>
              We do not sell, rent, or trade your personal information or images to third parties for their marketing purposes.
            </p>

            <h3>6.2 Service Providers</h3>
            <p>We share data with trusted service providers who assist in operating our Service:</p>
            <ul>
              <li><strong>AI Processing:</strong> Google (for Gemini AI staging services)</li>
              <li><strong>Payment Processing:</strong> Stripe (for subscription and billing)</li>
              <li><strong>Hosting:</strong> Cloud infrastructure providers (for data storage and delivery)</li>
              <li><strong>Analytics:</strong> Service providers for usage analytics and performance monitoring</li>
            </ul>

            <h3>6.3 Legal Requirements</h3>
            <p>We may disclose your information if required to:</p>
            <ul>
              <li>Comply with legal obligations, court orders, or government requests</li>
              <li>Enforce our Terms and Conditions</li>
              <li>Protect the rights, property, or safety of The Landry Method, our users, or the public</li>
              <li>Detect, prevent, or address fraud, security, or technical issues</li>
            </ul>

            <h3>6.4 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity. We will notify you via email and/or prominent notice on our Service of any such change in ownership.
            </p>
          </section>

          <section>
            <h2>7. Your Rights and Choices</h2>
            
            <h3>7.1 Access and Correction</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information through your account dashboard</li>
              <li>Update or correct your account information</li>
              <li>Request a copy of your data</li>
            </ul>

            <h3>7.2 Data Deletion</h3>
            <p>You can:</p>
            <ul>
              <li>Delete individual processed images from your gallery at any time</li>
              <li>Request account deletion by contacting us at +1 (323) 745-8111</li>
              <li>Your data will be permanently deleted within 30 days of your request</li>
            </ul>

            <h3>7.3 Opt-Out Rights</h3>
            <ul>
              <li><strong>Marketing Communications:</strong> Unsubscribe from marketing emails using the link in any email</li>
              <li><strong>Cookies:</strong> Manage cookie preferences through your browser settings</li>
              <li><strong>Analytics:</strong> Opt out of analytics tracking by contacting our support team</li>
            </ul>

            <h3>7.4 Data Portability</h3>
            <p>
              You can download your processed images at any time through your gallery. For a complete data export, contact us at the address below.
            </p>
          </section>

          <section>
            <h2>8. Security Measures</h2>
            <p>We implement industry-standard security measures to protect your information:</p>
            <ul>
              <li><strong>Encryption:</strong> All data is encrypted in transit (TLS/SSL) and at rest</li>
              <li><strong>Authentication:</strong> Secure password hashing and account authentication</li>
              <li><strong>Access Controls:</strong> Role-based access to limit data exposure</li>
              <li><strong>Monitoring:</strong> Continuous security monitoring and threat detection</li>
              <li><strong>Regular Audits:</strong> Periodic security assessments and updates</li>
            </ul>
            <p>
              While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>9. International Data Transfers</h2>
            <p>
              Our Service operates in the United States. If you access our Service from outside the U.S., your information will be transferred to, stored, and processed in the United States. By using our Service, you consent to this transfer and processing.
            </p>
            <p>
              We ensure adequate safeguards are in place for international data transfers in compliance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2>10. Children's Privacy</h2>
            <p>
              Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately and we will delete such information.
            </p>
          </section>

          <section>
            <h2>11. California Privacy Rights (CCPA)</h2>
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act:</p>
            <ul>
              <li><strong>Right to Know:</strong> Request disclosure of personal information collected about you</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell personal information)</li>
              <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your privacy rights</li>
            </ul>
            <p>
              To exercise these rights, contact us at +1 (323) 745-8111 or via email to the address in the Contact section below.
            </p>
          </section>

          <section>
            <h2>12. European Privacy Rights (GDPR)</h2>
            <p>If you are in the European Economic Area, you have rights under the General Data Protection Regulation:</p>
            <ul>
              <li><strong>Right of Access:</strong> Obtain confirmation of data processing and access to your data</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
              <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise these rights or file a complaint with a supervisory authority, contact us at the address below.
            </p>
          </section>

          <section>
            <h2>13. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Enable core functionality like authentication and security</li>
              <li><strong>Performance Cookies:</strong> Analyze how you use our Service to improve performance</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling certain cookies may limit your ability to use some features of our Service.
            </p>
          </section>

          <section>
            <h2>14. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by:
            </p>
            <ul>
              <li>Posting the updated policy on our website</li>
              <li>Updating the "Last updated" date at the top of this page</li>
              <li>Sending email notification for significant changes</li>
            </ul>
            <p>
              Your continued use of the Service after changes are posted constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2>15. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="not-prose bg-muted p-6 rounded-lg my-6">
              <p className="font-semibold mb-2">The Landry Method</p>
              <p>5441 S Macadam Ave STE N</p>
              <p>Portland, OR 97239</p>
              <p className="mt-4">Phone: +1 (323) 745-8111</p>
              <p>Website: <a href="https://thelandrymethod.com" className="text-primary hover:underline">thelandrymethod.com</a></p>
              <p className="mt-4">
                Email: Use the <Link to="/contact" className="text-primary hover:underline">contact form</Link> on our website
              </p>
            </div>
          </section>

          <section>
            <h2>16. Acknowledgment</h2>
            <p>
              By using The Landry Method, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
            </p>
          </section>
        </article>
      </main>
      
      <Footer4Col />
    </div>
  );
}
