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
          <p className="text-muted-foreground">
            <strong>Effective Date: November 13, 2025</strong>
          </p>
          <p className="text-muted-foreground">Last updated: November 13, 2025</p>
          
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              Welcome to The Landry Method. These Terms and Conditions ("Terms") govern your access to and use of The Landry Method website, platform, and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you ("User," "you," or "your") and The Landry Method ("Company," "we," "us," or "our"). If you do not agree to these Terms, you must not access or use the Service.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting to our website. Your continued use of the Service after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2>2. Service Description</h2>
            <p>
              The Landry Method is an AI-powered virtual staging platform designed specifically for real estate professionals. Our Service enables you to:
            </p>
            <ul>
              <li>Upload property photographs in various formats (JPEG, PNG, WEBP)</li>
              <li>Transform empty or poorly staged spaces using advanced AI technology powered by Google Gemini 2.5 Flash</li>
              <li>Access multiple styling templates including modern, luxury, minimalist, traditional, and contemporary staging options</li>
              <li>Process images in batches with controlled concurrency (up to 5 images simultaneously)</li>
              <li>Download professionally staged images in HD, Ultra HD, or 4K quality depending on your plan</li>
              <li>Manage and organize your gallery of processed images</li>
              <li>Track your credit usage and processing history</li>
            </ul>
            <p>
              <strong>Service Availability:</strong> We strive to provide uninterrupted Service but do not guarantee 100% uptime. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2>3. User Accounts and Eligibility</h2>
            
            <h3>3.1 Account Creation</h3>
            <p>To use the Service, you must:</p>
            <ul>
              <li>Be at least 18 years of age or the age of legal majority in your jurisdiction</li>
              <li>Provide accurate, current, and complete registration information including a valid email address</li>
              <li>Create a secure password and maintain its confidentiality</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be prohibited from using the Service under applicable laws</li>
            </ul>

            <h3>3.2 Account Security and Responsibility</h3>
            <p>You are solely responsible for:</p>
            <ul>
              <li>Maintaining the security and confidentiality of your account credentials</li>
              <li>All activities that occur under your account, whether authorized by you or not</li>
              <li>Notifying us immediately of any unauthorized access or security breach</li>
              <li>Ensuring your account information remains accurate and up to date</li>
            </ul>
            <p>
              We are not liable for any loss or damage arising from your failure to maintain account security.
            </p>

            <h3>3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend, disable, or terminate your account at our sole discretion, without prior notice, if:
            </p>
            <ul>
              <li>You violate these Terms or any applicable laws</li>
              <li>You engage in fraudulent, abusive, or illegal activities</li>
              <li>You misuse the Service or harm other users</li>
              <li>Your payment method fails or you have outstanding payment obligations</li>
              <li>You upload prohibited or infringing content</li>
              <li>We reasonably believe termination is necessary to protect the Company, users, or third parties</li>
            </ul>
            <p>
              Upon termination, your right to access the Service immediately ceases. You may lose access to your processed images and data.
            </p>
          </section>

          <section>
            <h2>4. Subscription Plans and Pricing</h2>
            
            <h3>4.1 Available Plans</h3>
            <p>We offer three subscription tiers with distinct features and benefits:</p>
            
            <h4>Starter Plan</h4>
            <ul>
              <li><strong>Price:</strong> $29 per month or $290 per year (save $58 annually)</li>
              <li><strong>Upload Limit:</strong> 10 images per month</li>
              <li><strong>Image Quality:</strong> HD (High Definition)</li>
              <li><strong>Processing Speed:</strong> 24-hour turnaround time</li>
              <li><strong>Support:</strong> Email support</li>
              <li><strong>Features:</strong> Basic editing tools, standard templates</li>
            </ul>

            <h4>Professional Plan (Most Popular)</h4>
            <ul>
              <li><strong>Price:</strong> $79 per month or $790 per year (save $158 annually)</li>
              <li><strong>Upload Limit:</strong> 50 images per month</li>
              <li><strong>Image Quality:</strong> Ultra HD (4K ready)</li>
              <li><strong>Processing Speed:</strong> 12-hour turnaround time</li>
              <li><strong>Support:</strong> Priority email support</li>
              <li><strong>Features:</strong> Advanced editing tools, bulk upload, custom branding, all templates</li>
            </ul>

            <h4>Enterprise Plan</h4>
            <ul>
              <li><strong>Price:</strong> $149 per month or $1,490 per year (save $298 annually)</li>
              <li><strong>Upload Limit:</strong> Unlimited images</li>
              <li><strong>Image Quality:</strong> 4K quality</li>
              <li><strong>Processing Speed:</strong> 2-hour turnaround time</li>
              <li><strong>Support:</strong> Dedicated support team</li>
              <li><strong>Features:</strong> Full editing suite, API access, white-label solution, team collaboration, priority processing</li>
            </ul>

            <h3>4.2 Billing and Payment</h3>
            <ul>
              <li>All payments are processed securely through Stripe, Inc.</li>
              <li>Monthly subscriptions are billed on the same day each month</li>
              <li>Annual subscriptions are billed once per year on your subscription anniversary</li>
              <li>You authorize us to charge your payment method for all fees owed</li>
              <li>All fees are non-refundable unless otherwise stated in Section 4.5</li>
              <li>Prices are subject to change with 30 days' prior notice</li>
            </ul>

            <h3>4.3 Credit System</h3>
            <p>
              Each subscription plan includes a monthly allocation of image processing credits:
            </p>
            <ul>
              <li>Credits are consumed per image processed (1 credit = 1 image)</li>
              <li>Credits refresh at the start of each billing cycle</li>
              <li>Unused credits do not roll over to the next billing period</li>
              <li>If you exceed your monthly limit, you must upgrade your plan or wait for the next billing cycle</li>
              <li>Credit balance is displayed in your dashboard in real-time</li>
            </ul>

            <h3>4.4 Plan Changes</h3>
            <ul>
              <li><strong>Upgrades:</strong> Take effect immediately, with prorated credit for the time remaining in your current billing period</li>
              <li><strong>Downgrades:</strong> Take effect at the start of your next billing cycle</li>
              <li>You can change plans at any time through your account settings or by contacting support</li>
            </ul>

            <h3>4.5 Cancellation and Refunds</h3>
            <ul>
              <li>You may cancel your subscription at any time through your account settings</li>
              <li>Cancellation takes effect at the end of your current billing period</li>
              <li>You will retain access to the Service until the end of the paid period</li>
              <li>No refunds are provided for partial months or unused credits</li>
              <li>If you cancel an annual plan, no refund is provided for the remaining months</li>
              <li>We may offer refunds at our sole discretion in cases of Service failure or billing errors</li>
            </ul>

            <h3>4.6 Failed Payments</h3>
            <p>
              If your payment method fails:
            </p>
            <ul>
              <li>We will attempt to process payment multiple times over several days</li>
              <li>You will receive email notifications of payment failures</li>
              <li>Your account may be suspended until payment is received</li>
              <li>Continued payment failure may result in account termination</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property Rights</h2>
            
            <h3>5.1 Service Content</h3>
            <p>
              All content, features, and functionality of the Service, including but not limited to text, graphics, logos, icons, images, software, and the compilation thereof (the "Service Content"), are the exclusive property of The Landry Method and are protected by United States and international copyright, trademark, and other intellectual property laws.
            </p>

            <h3>5.2 User Content License</h3>
            <p>
              By uploading images to the Service ("User Content"), you grant The Landry Method:
            </p>
            <ul>
              <li>A limited, non-exclusive, royalty-free license to process your images using AI technology</li>
              <li>The right to store your images on our servers for the duration of your account</li>
              <li>Permission to use your images solely for providing the Service to you</li>
            </ul>
            <p>
              <strong>Important:</strong> We do NOT use your images to train AI models, for marketing purposes, or share them with third parties except as necessary to provide the Service (e.g., sending to Google Gemini AI for processing).
            </p>

            <h3>5.3 User Content Ownership</h3>
            <p>
              You retain all ownership rights to your original uploaded images. The processed, staged images created by our Service are provided to you for your commercial use in real estate marketing.
            </p>

            <h3>5.4 Restrictions on Use</h3>
            <p>You may not:</p>
            <ul>
              <li>Copy, modify, distribute, sell, or lease any part of the Service</li>
              <li>Reverse engineer, decompile, or attempt to extract source code</li>
              <li>Remove, obscure, or alter any copyright, trademark, or proprietary notices</li>
              <li>Use the Service to create a competing product or service</li>
              <li>Frame or mirror any part of the Service without our express written permission</li>
              <li>Use automated systems (bots, scrapers) to access the Service</li>
            </ul>
          </section>

          <section>
            <h2>6. Prohibited Uses and Content</h2>
            
            <h3>6.1 Prohibited Activities</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Violate or infringe upon the intellectual property rights of others</li>
              <li>Upload viruses, malware, or any malicious code</li>
              <li>Attempt to gain unauthorized access to any part of the Service, other accounts, or connected systems</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
              <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with any person or entity</li>
              <li>Engage in any activity that could damage, disable, overburden, or impair the Service</li>
              <li>Use the Service to harass, abuse, or harm another person</li>
              <li>Collect or store personal data about other users without their consent</li>
            </ul>

            <h3>6.2 Prohibited Content</h3>
            <p>You may not upload images that:</p>
            <ul>
              <li>Contain nudity, pornography, or sexually explicit material</li>
              <li>Depict violence, gore, or graphic content</li>
              <li>Contain hate speech, discriminatory content, or promote violence against individuals or groups</li>
              <li>Infringe upon copyrights, trademarks, or other intellectual property rights of third parties</li>
              <li>Violate privacy rights or contain personal information of others without consent</li>
              <li>Contain illegal content or promote illegal activities</li>
              <li>Are deceptive, fraudulent, or misleading</li>
            </ul>

            <h3>6.3 Enforcement</h3>
            <p>
              We reserve the right to review, monitor, and remove any User Content that violates these Terms. Violation may result in immediate account termination without refund.
            </p>
          </section>

          <section>
            <h2>7. Service Limitations and AI Disclaimer</h2>
            
            <h3>7.1 AI Technology Limitations</h3>
            <p>
              Our Service uses artificial intelligence (Google Gemini 2.5 Flash) to generate virtual staging. You acknowledge and agree that:
            </p>
            <ul>
              <li>AI-generated images may not be perfect and may contain artifacts, inconsistencies, or imperfections</li>
              <li>Results may vary based on input image quality, lighting, and complexity</li>
              <li>The AI may not accurately interpret all architectural features or spatial relationships</li>
              <li>Colors, textures, and furniture styles in staged images are approximations</li>
              <li>We do not guarantee specific results or outcomes</li>
            </ul>

            <h3>7.2 Professional Use Disclaimer</h3>
            <p>
              <strong>Virtual Staging Disclosure:</strong> All staged images produced by our Service are digitally altered representations and do not depict the actual physical condition of the property. Real estate professionals using our Service must:
            </p>
            <ul>
              <li>Clearly disclose to potential buyers that images are virtually staged</li>
              <li>Comply with all applicable real estate advertising laws and regulations</li>
              <li>Not use staged images to misrepresent property conditions</li>
              <li>Provide actual property photos alongside staged images when required by law</li>
            </ul>
            <p>
              You are solely responsible for compliance with all applicable laws, regulations, and professional standards in your jurisdiction.
            </p>

            <h3>7.3 Service Availability</h3>
            <ul>
              <li>We do not guarantee uninterrupted or error-free Service</li>
              <li>The Service may be temporarily unavailable for maintenance, updates, or technical issues</li>
              <li>Processing times are estimates and may vary based on system load</li>
              <li>We reserve the right to modify, suspend, or discontinue any feature at any time</li>
            </ul>

            <h3>7.4 Image Quality and Specifications</h3>
            <ul>
              <li>Supported formats: JPEG, PNG, WEBP</li>
              <li>Recommended minimum resolution: 1920x1080 pixels</li>
              <li>Maximum file size may apply based on your plan</li>
              <li>Output quality depends on input image quality</li>
            </ul>
          </section>

          <section>
            <h2>8. Privacy and Data Protection</h2>
            <p>
              Your use of the Service is also governed by our Privacy Policy, which is incorporated by reference into these Terms. By using the Service, you consent to our collection, use, and disclosure of your information as described in the Privacy Policy.
            </p>
            <p>
              Key points:
            </p>
            <ul>
              <li>We collect account information, uploaded images, and usage data</li>
              <li>Images are processed using Google Gemini AI services</li>
              <li>We do not sell your data or images to third parties</li>
              <li>You can delete your images and account at any time</li>
            </ul>
            <p>
              Please review our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> for complete details.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            
            <h3>9.1 Disclaimer of Warranties</h3>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>
            <p>
              WE DO NOT WARRANT THAT:
            </p>
            <ul>
              <li>The Service will meet your specific requirements or expectations</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free</li>
              <li>The results obtained from the Service will be accurate, complete, or reliable</li>
              <li>Any errors in the Service will be corrected</li>
              <li>The AI-generated images will be suitable for any particular purpose</li>
            </ul>

            <h3>9.2 Limitation of Damages</h3>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE LANDRY METHOD, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
            </p>
            <ul>
              <li>Loss of profits, revenue, data, or use</li>
              <li>Loss of business opportunities or goodwill</li>
              <li>Cost of substitute services</li>
              <li>Personal injury or property damage</li>
              <li>Emotional distress</li>
            </ul>
            <p>
              WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>

            <h3>9.3 Cap on Liability</h3>
            <p>
              OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
            </p>

            <h3>9.4 Jurisdictional Limitations</h3>
            <p>
              Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for incidental or consequential damages. In such jurisdictions, our liability will be limited to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless The Landry Method, its officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, expenses, damages, and costs, including reasonable attorneys' fees, arising out of or related to:
            </p>
            <ul>
              <li>Your use or misuse of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party, including intellectual property rights</li>
              <li>Your User Content or any content you upload to the Service</li>
              <li>Your use of AI-generated images in violation of applicable laws or regulations</li>
              <li>Any false or misleading representations you make using our Service</li>
            </ul>
            <p>
              We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of these claims.
            </p>
          </section>

          <section>
            <h2>11. Third-Party Services and Links</h2>
            <p>
              The Service may contain links to third-party websites, services, or resources, including:
            </p>
            <ul>
              <li>Google Gemini AI services (for image processing)</li>
              <li>Stripe (for payment processing)</li>
              <li>Other external websites or resources</li>
            </ul>
            <p>
              These third-party services are governed by their own terms and privacy policies. We are not responsible for:
            </p>
            <ul>
              <li>The availability, accuracy, or content of third-party services</li>
              <li>Any loss or damage arising from your use of third-party services</li>
              <li>The privacy practices of third parties</li>
            </ul>
            <p>
              Your use of third-party services is at your own risk.
            </p>
          </section>

          <section>
            <h2>12. Dispute Resolution and Governing Law</h2>
            
            <h3>12.1 Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Oregon, United States, without regard to its conflict of law provisions.
            </p>

            <h3>12.2 Informal Resolution</h3>
            <p>
              Before filing a formal claim, you agree to first contact us at +1 (323) 745-8111 to attempt to resolve any dispute informally. We will make good-faith efforts to resolve disputes amicably.
            </p>

            <h3>12.3 Arbitration Agreement</h3>
            <p>
              Any dispute, claim, or controversy arising out of or relating to these Terms or the Service that cannot be resolved informally shall be settled by binding arbitration administered by the American Arbitration Association in accordance with its Commercial Arbitration Rules.
            </p>
            <ul>
              <li>Arbitration shall take place in Portland, Oregon</li>
              <li>The arbitrator's decision shall be final and binding</li>
              <li>Each party shall bear its own costs and fees</li>
              <li>You waive your right to participate in class action lawsuits or class-wide arbitration</li>
            </ul>

            <h3>12.4 Exceptions to Arbitration</h3>
            <p>
              Either party may seek injunctive or other equitable relief in court to protect intellectual property rights or confidential information.
            </p>

            <h3>12.5 Jurisdiction and Venue</h3>
            <p>
              To the extent arbitration does not apply, you agree that any legal action shall be brought exclusively in the state or federal courts located in Portland, Oregon, and you consent to personal jurisdiction in such courts.
            </p>
          </section>

          <section>
            <h2>13. Modifications to the Service and Terms</h2>
            
            <h3>13.1 Service Changes</h3>
            <p>
              We reserve the right to:
            </p>
            <ul>
              <li>Modify, suspend, or discontinue any feature or functionality of the Service at any time</li>
              <li>Change pricing with 30 days' prior notice</li>
              <li>Update AI models, templates, or processing capabilities</li>
              <li>Impose new limitations on features</li>
            </ul>
            <p>
              We will make reasonable efforts to notify you of material changes via email or through the Service.
            </p>

            <h3>13.2 Terms Changes</h3>
            <p>
              We may update these Terms from time to time. Changes will be effective upon posting to our website with an updated "Effective Date" at the top.
            </p>
            <ul>
              <li>Material changes will be communicated via email</li>
              <li>Your continued use of the Service after changes are posted constitutes acceptance</li>
              <li>If you do not agree to changes, you must stop using the Service and cancel your subscription</li>
            </ul>
          </section>

          <section>
            <h2>14. Termination</h2>
            
            <h3>14.1 Termination by You</h3>
            <p>
              You may terminate your account at any time by:
            </p>
            <ul>
              <li>Canceling your subscription through account settings</li>
              <li>Contacting us at +1 (323) 745-8111</li>
            </ul>
            <p>
              Upon termination, you will retain access until the end of your paid billing period.
            </p>

            <h3>14.2 Termination by Us</h3>
            <p>
              We may terminate or suspend your account immediately, without prior notice, for any reason, including:
            </p>
            <ul>
              <li>Breach of these Terms</li>
              <li>Violation of applicable laws</li>
              <li>Fraudulent activity or misuse of the Service</li>
              <li>Non-payment of fees</li>
              <li>Prolonged inactivity</li>
            </ul>

            <h3>14.3 Effects of Termination</h3>
            <p>
              Upon termination:
            </p>
            <ul>
              <li>Your right to access and use the Service immediately ceases</li>
              <li>We may delete your account data, including uploaded and processed images, after 30 days</li>
              <li>You remain liable for all fees and charges incurred prior to termination</li>
              <li>No refunds will be provided except as required by law</li>
            </ul>

            <h3>14.4 Survival</h3>
            <p>
              The following sections survive termination: Intellectual Property Rights, Limitation of Liability, Indemnification, Dispute Resolution, and any other provisions that by their nature should survive.
            </p>
          </section>

          <section>
            <h2>15. Miscellaneous Provisions</h2>
            
            <h3>15.1 Entire Agreement</h3>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and The Landry Method regarding the Service and supersede all prior agreements, understandings, and communications.
            </p>

            <h3>15.2 Severability</h3>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
            </p>

            <h3>15.3 Waiver</h3>
            <p>
              Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver must be in writing and signed by an authorized representative.
            </p>

            <h3>15.4 Assignment</h3>
            <p>
              You may not assign or transfer these Terms or your account without our prior written consent. We may assign these Terms to any affiliate or in connection with a merger, acquisition, or sale of assets.
            </p>

            <h3>15.5 No Agency</h3>
            <p>
              No agency, partnership, joint venture, or employment relationship is created as a result of these Terms, and neither party has authority to bind the other.
            </p>

            <h3>15.6 Force Majeure</h3>
            <p>
              We shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, labor disputes, or internet service provider failures.
            </p>

            <h3>15.7 Notices</h3>
            <p>
              Notices to you may be made via email or through the Service. Notices to us should be sent to the contact information below.
            </p>

            <h3>15.8 Export Control</h3>
            <p>
              The Service may be subject to U.S. export control laws. You agree not to export, re-export, or transfer the Service to any prohibited country, person, or entity.
            </p>
          </section>

          <section>
            <h2>16. Contact Information</h2>
            <p>
              For questions, concerns, or notices regarding these Terms or the Service, please contact us:
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
            <h2>17. Acknowledgment and Acceptance</h2>
            <p>
              BY ACCESSING OR USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT ACCESS OR USE THE SERVICE.
            </p>
            <p>
              You represent and warrant that:
            </p>
            <ul>
              <li>You have the legal capacity to enter into these Terms</li>
              <li>All information you provide is accurate and truthful</li>
              <li>You will comply with all applicable laws and regulations</li>
              <li>You understand the limitations and disclaimers outlined in these Terms</li>
            </ul>
          </section>
        </article>
      </main>
      
      <Footer4Col />
    </div>
  );
}
