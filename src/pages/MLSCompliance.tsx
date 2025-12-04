import { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import Footer4Col from "@/components/ui/footer-column";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

export default function MLSCompliance() {
  useEffect(() => {
    document.title = "MLS Compliance | Virtual Staging Disclosure | The Landry Method";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Understanding MLS compliance requirements for virtually staged real estate photos. Disclosure requirements, best practices, and compliance guidelines.');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <article className="space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-950">
              MLS Compliance for Virtual Staging
            </h1>
            <p className="text-xl text-gray-600">
              Guidelines, best practices, and disclosure requirements for using virtually staged photos in your real estate listings
            </p>
          </div>

          <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-950 flex items-center gap-2">
              <AlertCircle className="text-blue-600" />
              Important Notice
            </h2>
            <p className="text-gray-700">
              This information is provided for educational purposes. MLS rules and real estate regulations vary by
              jurisdiction. The Landry Method is not a legal service provider. You are responsible for ensuring
              compliance with your local MLS rules and applicable real estate regulations. Consult with your local
              MLS, board of REALTORS®, and legal counsel for specific requirements in your area.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-950">Why Disclosure Matters</h2>
            <p className="text-gray-700 leading-relaxed">
              Virtual staging—the digital enhancement or addition of furniture and décor to real estate photos—is
              increasingly common in real estate marketing. However, using virtually staged images requires proper
              disclosure to comply with MLS rules, real estate regulations, and ethical standards.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Failing to disclose virtually staged images can result in:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700">MLS violation and potential delisting</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700">Disciplinary action from your local real estate board</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700">Consumer complaints and legal liability</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-600 font-bold">•</span>
                <span className="text-gray-700">Damage to your professional reputation</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-950">Standard MLS Disclosure Requirements</h2>
            <p className="text-gray-700 leading-relaxed">
              Most major MLS systems and real estate boards require clear disclosure that photos are virtually
              staged. Here are common requirements:
            </p>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-950 mb-2 flex items-center gap-2">
                  <CheckCircle className="text-green-600" />
                  Photo Disclosure
                </h3>
                <p className="text-sm text-gray-700">
                  Include text in the listing description or photo captions clearly indicating which photos are
                  virtually staged. Examples:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• "Virtually staged to show potential furnishings"</li>
                  <li>• "Photos include digitally staged elements"</li>
                  <li>• "Virtually staged—furniture not included"</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-950 mb-2 flex items-center gap-2">
                  <CheckCircle className="text-green-600" />
                  Metadata Disclosure
                </h3>
                <p className="text-sm text-gray-700">
                  Some MLS systems require disclosure in the photo metadata or through your MLS's photo remarks
                  field. Always check your local MLS rules.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-950 mb-2 flex items-center gap-2">
                  <CheckCircle className="text-green-600" />
                  Prominent Disclosure
                </h3>
                <p className="text-sm text-gray-700">
                  Disclosure should be clear and visible to consumers. It should appear in the listing
                  description, photo captions, or other prominent location where buyers will see it.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-950">Best Practices for Virtual Staging Disclosure</h2>
            <ol className="space-y-3 ml-6">
              <li className="flex gap-3">
                <span className="font-bold text-gray-950 flex-shrink-0">1.</span>
                <div>
                  <p className="font-semibold text-gray-900">Always Disclose</p>
                  <p className="text-sm text-gray-600">Never assume MLS rules don't apply. Always disclose virtual staging.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-950 flex-shrink-0">2.</span>
                <div>
                  <p className="font-semibold text-gray-900">Be Clear and Specific</p>
                  <p className="text-sm text-gray-600">
                    Don't be vague. Clearly state which photos are virtually staged and that the furniture is not included.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-950 flex-shrink-0">3.</span>
                <div>
                  <p className="font-semibold text-gray-900">Check Your MLS Rules</p>
                  <p className="text-sm text-gray-600">
                    MLS rules vary by region. Contact your local MLS or board of REALTORS® to confirm specific requirements.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-950 flex-shrink-0">4.</span>
                <div>
                  <p className="font-semibold text-gray-900">Provide Original Photos</p>
                  <p className="text-sm text-gray-600">
                    Include some photos of the actual property without staging. This builds trust with potential buyers.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-950 flex-shrink-0">5.</span>
                <div>
                  <p className="font-semibold text-gray-900">Document Everything</p>
                  <p className="text-sm text-gray-600">
                    Keep records of your disclosures. This protects you if a question or complaint arises later.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gray-950 flex-shrink-0">6.</span>
                <div>
                  <p className="font-semibold text-gray-900">Consult Legal Counsel</p>
                  <p className="text-sm text-gray-600">
                    For complex situations or if you're unsure about compliance, consult with a real estate attorney in
                    your jurisdiction.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-950">Sample Disclosure Statements</h2>
            <p className="text-gray-700">Here are examples of clear disclosure statements you can use:</p>

            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="font-mono text-sm text-gray-700 space-y-2">
                <div>"Photos: Digital staging applied to images 2, 4, and 6 to illustrate potential furnishings. Furniture and décor shown are not included in the sale."</div>
                <div className="mt-3">
                  "The living room and primary bedroom photos have been virtually staged. The actual property is unfurnished."
                </div>
                <div className="mt-3">
                  "Virtually staged to help buyers visualize potential. Actual property may differ."
                </div>
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-950">The Landry Method Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              The Landry Method is committed to compliance-first virtual staging. Every enhanced image includes:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Professional staging that respects property integrity</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Clear, visible disclosure overlays</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Editable metadata templates for easy MLS compliance</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Guidance on local compliance requirements</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Commitment to ethical, transparent service</span>
              </li>
            </ul>
          </section>

          <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-950">Need Help with MLS Compliance?</h2>
            <p className="text-gray-700">
              Have questions about MLS requirements in your area? Contact us for guidance on ensuring your virtually
              staged listings comply with local regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:support@thelandrymethod.com"
                className="inline-flex items-center justify-center bg-[#FF634C] text-white px-6 py-3 rounded-lg hover:bg-[#E5523E] transition-all font-semibold"
              >
                Email Support
              </a>
              <a
                href="tel:+15032767274"
                className="inline-flex items-center justify-center bg-white border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:border-[#FF634C] hover:text-[#FF634C] transition-all font-semibold"
              >
                Call Us
              </a>
            </div>
          </section>

          <div className="text-center pt-8 border-t">
            <p className="text-sm text-gray-600 mb-4">
              Ready to get started with compliant virtual staging?
            </p>
            <Link to="/auth">
              <Button size="lg">Access Dashboard</Button>
            </Link>
          </div>
        </article>
      </main>

      <Footer4Col />
    </div>
  );
}
