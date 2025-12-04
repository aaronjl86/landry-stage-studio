import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/landing/Header";
import Footer4Col from "@/components/ui/footer-column";

const isDev = import.meta.env.DEV;

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    "agent-name": "",
    email: "",
    "listing-address": "",
    notes: "",
  });
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    document.title = "The Landry Method | Portland-Authentic Virtual Staging | MLS-Compliant";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'The Landry Method - Portland-authentic virtual staging service for real estate professionals. MLS-compliant, ethically staged, beautifully Portland.');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!supabase) {
        throw new Error("Database connection not available. Please try again later.");
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          agent_name: formData['agent-name'],
          email: formData.email,
          listing_address: formData['listing-address'] || '',
          notes: formData.notes || ''
        }]);

      if (error) throw error;

      setSubmitMessage({
        type: 'success',
        text: `Thank you for your inquiry! We'll respond to ${formData.email} within 24 hours with your free sample and disclosure template.`
      });

      setFormData({
        "agent-name": "",
        email: "",
        "listing-address": "",
        notes: "",
      });

      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(null), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage({
        type: 'error',
        text: "There was an error submitting your inquiry. Please try again or contact us directly."
      });
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-950 mb-6 leading-tight tracking-tight">
                  Ethically staged. Beautifully Portland. MLS-compliant.
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed max-w-lg">
                  Virtual staging that honors Pacific Northwest craft — furniture-style cues, local lighting aesthetics, and clear MLS disclosure baked into every image.
                </p>

                {/* Feature Callouts */}
                <div className="space-y-5 mb-12">
                  {/* Feature 1 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-11 h-11 bg-[#FF634C] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5 text-base">MLS Disclosure Included</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">Full compliance built in. Every image includes visible disclosure and editable metadata, so you stay confident and compliant with local MLS rules.</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-11 h-11 bg-[#FF634C] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5 text-base">Portland Authenticity</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">We stage spaces the way Portland buyers expect to see them. Local materials, neighborhood character, and Pacific Northwest design sensibility in every image.</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-11 h-11 bg-[#FF634C] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1.5 text-base">Professional Service, No Platform</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">Direct service means personal attention. We deliver samples in 48 hours and handle all the details so you can focus on selling.</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#samples" className="inline-flex items-center justify-center bg-[#FF634C] text-white px-7 py-3.5 rounded-lg hover:bg-[#E5523E] transition-all duration-200 font-semibold shadow-md hover:shadow-lg">
                    See Portland Samples
                  </a>
                  <a href="#contact" className="inline-flex items-center justify-center bg-white border-2 border-gray-300 text-gray-900 px-7 py-3.5 rounded-lg hover:border-[#FF634C] hover:text-[#FF634C] transition-all duration-200 font-semibold hover:shadow-sm">
                    Get free template
                  </a>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="pt-1 px-1 leading-none">
                    <img
                      src="/images/downtown-loft.webp"
                      {...(!isDev && {
                        srcSet: "/cdn-cgi/image/width=400,quality=85,format=auto/images/downtown-loft.webp 400w, /cdn-cgi/image/width=609,quality=85,format=auto/images/downtown-loft.webp 609w, /cdn-cgi/image/width=800,quality=85,format=auto/images/downtown-loft.webp 800w, /cdn-cgi/image/width=1200,quality=85,format=auto/images/downtown-loft.webp 1200w",
                        sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 609px, 800px"
                      })}
                      alt="Modern Portland-style staged living room"
                      className="w-full h-auto object-cover rounded-xl"
                      width="609"
                      height="332"
                      loading="eager"
                      fetchpriority="high"
                      decoding="async"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">Sample: Downtown Loft</h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">Mid-century + PNW craft. Includes: Joinery-style walnut table, Schoolhouse-inspired pendant, Powell's book stack styling.</p>
                    <p className="text-xs text-gray-500 italic">Disclosure: This image has been digitally staged to illustrate potential furnishings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spatial Intelligence in Motion - Philosophy Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-[#FF634C]/5 to-transparent border-t-2 border-[#FF634C]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-4">
                Spatial Intelligence in Motion
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Our tagline represents our core approach: understanding how space, light, and thoughtfully selected furnishings work together to help properties sell faster.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-[#FF634C] mb-3">🧠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Spatial Intelligence</h3>
                <p className="text-gray-600 leading-relaxed">
                  We understand how to read a room—analyzing proportions, natural light, traffic flow, and sight lines to stage spaces that feel authentic and inviting to buyers.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-[#FF634C] mb-3">✨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Design Integrity</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every staged image reflects real design principles and local Portland aesthetics. We never overdo it—just enough to help buyers visualize the space at its full potential.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-[#FF634C] mb-3">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">In Motion</h3>
                <p className="text-gray-600 leading-relaxed">
                  Staging is a catalyst—it creates momentum for your listings. Better photos = more showings = faster sales. We help your properties move.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Samples Section */}
        <section id="samples" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-950 mb-4 tracking-tight">
                Selected Portland-style staging
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore our curated portfolio of authentic Pacific Northwest designs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sample Card 1 */}
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-[#FF634C]/20 transition-all duration-300">
                <div className="relative overflow-hidden h-64">
                  <img
                    src="/images/craftsman-living-room.webp"
                    {...(!isDev && {
                      srcSet: "/cdn-cgi/image/width=400,quality=85,format=auto/images/craftsman-living-room.webp 400w, /cdn-cgi/image/width=600,quality=85,format=auto/images/craftsman-living-room.webp 600w, /cdn-cgi/image/width=800,quality=85,format=auto/images/craftsman-living-room.webp 800w",
                      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    })}
                    alt="Portland craftsman living room staging"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="800"
                    height="472"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2.5">Craftsman Living Room</h3>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">Reclaimed Douglas fir shelving, vintage Portland map art, and hand-turned ceramic pieces.</p>
                  <p className="text-xs text-gray-500 italic">Disclosure: Digitally staged to illustrate potential furnishings.</p>
                </div>
              </div>

              {/* Sample Card 2 */}
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-[#FF634C]/20 transition-all duration-300">
                <div className="relative overflow-hidden h-64">
                  <img
                    src="/images/pearl-district-bedroom.webp"
                    {...(!isDev && {
                      srcSet: "/cdn-cgi/image/width=400,quality=85,format=auto/images/pearl-district-bedroom.webp 400w, /cdn-cgi/image/width=600,quality=85,format=auto/images/pearl-district-bedroom.webp 600w, /cdn-cgi/image/width=800,quality=85,format=auto/images/pearl-district-bedroom.webp 800w",
                      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    })}
                    alt="Portland modern bedroom staging"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="800"
                    height="470"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2.5">Pearl District Bedroom</h3>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">Minimalist linen bedding, locally-sourced wood nightstands, and Pacific Northwest photography.</p>
                  <p className="text-xs text-gray-500 italic">Disclosure: Digitally staged to illustrate potential furnishings.</p>
                </div>
              </div>

              {/* Sample Card 3 */}
              <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:border-[#FF634C]/20 transition-all duration-300">
                <div className="relative overflow-hidden h-64">
                  <img
                    src="/images/alberta-arts-kitchen.webp"
                    {...(!isDev && {
                      srcSet: "/cdn-cgi/image/width=400,quality=85,format=auto/images/alberta-arts-kitchen.webp 400w, /cdn-cgi/image/width=600,quality=85,format=auto/images/alberta-arts-kitchen.webp 600w, /cdn-cgi/image/width=800,quality=85,format=auto/images/alberta-arts-kitchen.webp 800w",
                      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    })}
                    alt="Portland kitchen staging"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="800"
                    height="472"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2.5">Alberta Arts Kitchen</h3>
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">Industrial pendant lighting, open shelving with local pottery, and fresh farmer's market styling.</p>
                  <p className="text-xs text-gray-500 italic">Disclosure: Digitally staged to illustrate potential furnishings.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how" className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 border border-gray-100">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-12 tracking-tight">How it works</h2>

              <ol className="space-y-7 mb-12 max-w-3xl">
                <li className="flex gap-6">
                  <span className="flex-shrink-0 w-10 h-10 bg-[#065F46] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">1</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Upload photos</h3>
                    <p className="text-gray-600 leading-relaxed">High-res interior shots or provide key dimensions.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="flex-shrink-0 w-10 h-10 bg-[#065F46] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">2</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Choose style</h3>
                    <p className="text-gray-600 leading-relaxed">Portland Authentic / Craftsman / Loft / Custom</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="flex-shrink-0 w-10 h-10 bg-[#065F46] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">3</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">Receive staged images</h3>
                    <p className="text-gray-600 leading-relaxed">48 hours for standard package; each image includes editable MLS disclosure overlay and metadata file.</p>
                  </div>
                </li>
              </ol>

              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                <a href="#contact" className="inline-flex items-center justify-center bg-[#FF634C] text-white px-7 py-3.5 rounded-lg hover:bg-[#E5523E] transition-all duration-200 font-semibold shadow-md hover:shadow-lg">
                  Request sample
                </a>
                <a href="#contact" className="inline-flex items-center justify-center bg-white border-2 border-gray-300 text-gray-900 px-7 py-3.5 rounded-lg hover:border-[#065F46] hover:text-[#065F46] transition-all duration-200 font-semibold hover:shadow-sm">
                  Download template
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 lg:p-16 border border-gray-100 max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 mb-10 tracking-tight">Why Portland?</h2>

              <div className="space-y-7 text-lg text-gray-700 leading-relaxed">
                <p>
                  In 2015, I celebrated my 30th birthday with my mom—my favorite person—on a two-week journey through Portland. We explored Multnomah Falls, toured Pittock Mansion, wandered the rose gardens, discovered the Shanghai Tunnels, and stood speechless at Columbia River Gorge viewpoints.
                </p>

                <p>
                  Portland became more than my favorite city. It became the place I associate with my mom's laugh, her curiosity, her joy in discovering new things. She passed away from cancer. Portland remains.
                </p>

                <p>
                  When I registered The Landry Method as a Portland business despite living in Los Angeles, it wasn't strategy—it was tribute. This city gave me memories I treasure every day. My mom was born here. One day, I'll call it home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-950 mb-4 tracking-tight">
                Ready to get started?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Book a free sample and receive your MLS disclosure template
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <div className="bg-gray-50 rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100">
                {submitMessage && (
                  <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                    submitMessage.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>📱 Opt-In Consent:</strong> By providing your phone number, you consent to receive SMS messages
                    from The Landry Method. Message frequency may vary. Reply "STOP" to opt out. Standard message rates apply.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="agent-name" className="block text-sm font-semibold text-gray-900 mb-2.5">Agent name *</label>
                    <input
                      type="text"
                      id="agent-name"
                      name="agent-name"
                      required
                      value={formData['agent-name']}
                      onChange={(e) => setFormData({ ...formData, 'agent-name': e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2.5">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="listing-address" className="block text-sm font-semibold text-gray-900 mb-2.5">Listing address (optional)</label>
                    <input
                      type="text"
                      id="listing-address"
                      name="listing-address"
                      value={formData['listing-address']}
                      onChange={(e) => setFormData({ ...formData, 'listing-address': e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                      placeholder="123 Main St, Portland, OR"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-900 mb-2.5">Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent bg-white text-gray-900 placeholder-gray-500 resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF634C] text-white px-6 py-3.5 rounded-lg hover:bg-[#E5523E] transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit inquiry'}
                  </button>
                </form>
              </div>

              {/* Design Inspirations Card */}
              <div className="bg-gray-50 rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-950 mb-5">Portland Design Inspirations</h3>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Our virtual staging reflects authentic Pacific Northwest craft traditions. We draw respectful aesthetic inspiration from Portland's renowned furniture makers, lighting designers, and artisans to create staging that resonates with local buyers.
                </p>
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Style references</h4>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF634C] font-bold mt-1 flex-shrink-0 text-lg">•</span>
                    <span className="text-gray-700"><strong className="text-gray-900">The Joinery</strong><br className="hidden sm:block" /> warm solid wood furniture, exposed joinery, heirloom quality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF634C] font-bold mt-1 flex-shrink-0 text-lg">•</span>
                    <span className="text-gray-700"><strong className="text-gray-900">Schoolhouse</strong><br className="hidden sm:block" /> vintage pendants, opal glass, honest brass hardware</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF634C] font-bold mt-1 flex-shrink-0 text-lg">•</span>
                    <span className="text-gray-700"><strong className="text-gray-900">Pigeon Toe</strong><br className="hidden sm:block" /> hand-thrown ceramics, soft silhouettes, matte glazes</span>
                  </li>
                </ul>
                <div className="p-5 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use original, generic furniture designs influenced by Portland maker aesthetics. We are not affiliated with, endorsed by, or representing the businesses mentioned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer4Col />
    </div>
  );
};

export default Index;
