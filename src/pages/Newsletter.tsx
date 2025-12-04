import { useState, useEffect } from "react";
import { Header } from "@/components/landing/Header";
import Footer4Col from "@/components/ui/footer-column";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, AlertCircle } from "lucide-react";

export default function Newsletter() {
  useEffect(() => {
    document.title = "Newsletter Signup | The Landry Method";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Subscribe to The Landry Method newsletter for updates, tips, and insights on virtual staging for real estate professionals.');
  }, []);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToSMS, setAgreedToSMS] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setSubmitMessage({
        type: 'error',
        text: 'Please agree to the privacy policy and terms to continue.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would send to your backend/email service
      // For now, we'll just show a success message
      console.log('Newsletter signup:', { email, firstName, phone, agreedToSMS });

      setSubmitMessage({
        type: 'success',
        text: `Thank you for subscribing, ${firstName || 'friend'}! Check your email for a welcome message. We'll be in touch soon.`
      });

      setEmail("");
      setFirstName("");
      setPhone("");
      setAgreedToTerms(false);
      setAgreedToSMS(false);

      setTimeout(() => setSubmitMessage(null), 5000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setSubmitMessage({
        type: 'error',
        text: 'There was an error subscribing. Please try again or contact support.'
      });
      setTimeout(() => setSubmitMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Benefits */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-950">
                Stay Updated
              </h1>
              <p className="text-xl text-gray-600">
                Get exclusive tips, industry insights, and updates delivered to your inbox
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#FF634C] text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Weekly Tips</h3>
                  <p className="text-gray-600">
                    Expert strategies for virtual staging that increase showings and sales
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#FF634C] text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Industry Updates</h3>
                  <p className="text-gray-600">
                    Stay informed about MLS changes, real estate trends, and compliance updates
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#FF634C] text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Exclusive Offers</h3>
                  <p className="text-gray-600">
                    Special promotions and early access to new features for subscribers
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#FF634C] text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Best Practices</h3>
                  <p className="text-gray-600">
                    Learn how top agents are using virtual staging to transform their business
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Unsubscribe anytime:</strong> Your email is valuable. We promise not to spam and make
                it easy to manage your preferences.
              </p>
            </div>
          </div>

          {/* Right Column: Signup Form */}
          <div>
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-950">Join Our Newsletter</h2>

              {submitMessage && (
                <div
                  className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                    submitMessage.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                    placeholder="+1 (503) 276-7274"
                  />
                </div>

                <div className="space-y-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreedToTerms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-gray-300"
                    />
                    <label htmlFor="agreedToTerms" className="text-sm text-gray-700">
                      I agree to the{" "}
                      <Link to="/privacy" className="text-[#FF634C] hover:underline font-semibold">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link to="/terms" className="text-[#FF634C] hover:underline font-semibold">
                        Terms of Service
                      </Link>
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreedToSMS"
                      checked={agreedToSMS}
                      onChange={(e) => setAgreedToSMS(e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-gray-300"
                    />
                    <label htmlFor="agreedToSMS" className="text-xs text-gray-700">
                      <AlertCircle className="inline h-3 w-3 mr-1" />
                      <strong>Optional SMS:</strong> I consent to receive SMS messages from The Landry Method.
                      Message frequency varies. Reply "STOP" to opt out. Standard message rates apply.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !agreedToTerms}
                  className="w-full bg-[#FF634C] text-white px-6 py-3 rounded-lg hover:bg-[#E5523E] transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer4Col />
    </div>
  );
}
