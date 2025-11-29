import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo & Branding */}
            <div className="flex items-center gap-3">
              <img
                src="/TLM LOGO (BOLD LA STYLE) (800 x 1200 px) (1800 x 1200 px)-gigapixel-standard v2-2x.png"
                alt="The Landry Method Logo"
                className="h-16 sm:h-20 md:h-24 w-auto flex-shrink-0"
                width="360"
                height="112"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#samples" className="text-gray-700 hover:text-[#FF634C] transition-colors">Samples</a>
              <a href="#how" className="text-gray-700 hover:text-[#FF634C] transition-colors">How it works</a>
              <a href="#about" className="text-gray-700 hover:text-[#FF634C] transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-[#FF634C] transition-colors">Contact</a>
              <a href="#contact" className="bg-[#FF634C] text-white px-5 py-2 rounded-lg hover:bg-[#E5523E] transition-colors font-medium">Book a free sample</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-[#FF634C] p-3"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <nav className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:hidden pb-4 flex-col gap-3 transition-all duration-300 ease-in-out overflow-hidden`}>
            <a href="#samples" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#FF634C] transition-colors py-2">Samples</a>
            <a href="#how" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#FF634C] transition-colors py-2">How it works</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#FF634C] transition-colors py-2">About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#FF634C] transition-colors py-2">Contact</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-block bg-[#FF634C] text-white px-5 py-3 rounded-lg hover:bg-[#E5523E] transition-colors font-medium text-center">Book a free sample</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Ethically staged. Beautifully Portland. MLS-compliant.
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  Virtual staging that honors Pacific Northwest craft — furniture-style cues, local lighting aesthetics, and clear MLS disclosure baked into every image.
                </p>

                {/* Feature Callouts */}
                <div className="space-y-6 mb-8">
                  {/* Feature 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF634C] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">MLS Disclosure Included</h3>
                      <p className="text-gray-700">Every staged photo includes a visible disclosure and editable metadata ready for MLS upload.</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF634C] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Portland Style Guide</h3>
                      <p className="text-gray-700">Hand-curated visual language: Joinery-style wood, Schoolhouse-inspired lighting, Powell's stacks and subtle mural cues.</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF634C] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Agent-Friendly Pricing</h3>
                      <p className="text-gray-700">Sample delivery within 48 hours, clear usage rights, and an option for licensed local-art add-ons.</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#samples" className="w-full sm:w-auto bg-[#FF634C] text-white px-6 py-3 rounded-lg hover:bg-[#E5523E] transition-colors font-medium text-center">
                    See Portland Samples
                  </a>
                  <a href="#contact" className="w-full sm:w-auto bg-white border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:border-[#FF634C] hover:text-[#FF634C] transition-colors font-medium text-center">
                    Get a free disclosure template
                  </a>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="pt-4 px-4 leading-none">
                    <img
                      src="/images/downtown-loft.webp"
                      alt="Modern Portland-style staged living room"
                      className="w-full h-auto object-contain block"
                      width="609"
                      height="332"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      style={{ 
                        height: 'auto',
                        maxHeight: 'none',
                        display: 'block',
                        width: '100%'
                      }}
                    />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Sample: Downtown Loft — mid-century + PNW craft</h3>
                <p className="text-gray-700 mb-3">Includes: Joinery-style walnut table, Schoolhouse-inspired pendant, Powell's book stack styling.</p>
                <p className="text-xs text-gray-500 italic">Disclosure: This image has been digitally staged to illustrate potential furnishings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Samples Section */}
        <section id="samples" className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
              Selected Portland-style staging samples
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Sample Card 1 */}
              <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="/images/craftsman-living-room.webp"
                  alt="Portland craftsman living room staging"
                  className="w-full h-56 object-cover"
                  width="800"
                  height="472"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Craftsman Living Room</h3>
                  <p className="text-gray-700 mb-3 text-sm">Featuring: Reclaimed Douglas fir shelving, vintage Portland map art, and hand-turned ceramic pieces.</p>
                  <p className="text-xs text-gray-500 italic">Disclosure: This image has been digitally staged to illustrate potential furnishings.</p>
                </div>
              </div>

              {/* Sample Card 2 */}
              <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="/images/pearl-district-bedroom.webp"
                  alt="Portland modern bedroom staging"
                  className="w-full h-56 object-cover"
                  width="800"
                  height="470"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Pearl District Bedroom</h3>
                  <p className="text-gray-700 mb-3 text-sm">Featuring: Minimalist linen bedding, locally-sourced wood nightstands, and Pacific Northwest photography.</p>
                  <p className="text-xs text-gray-500 italic">Disclosure: This image has been digitally staged to illustrate potential furnishings.</p>
                </div>
              </div>

              {/* Sample Card 3 */}
              <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src="/images/alberta-arts-kitchen.webp"
                  alt="Portland kitchen staging"
                  className="w-full h-56 object-cover"
                  width="800"
                  height="472"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Alberta Arts Kitchen</h3>
                  <p className="text-gray-700 mb-3 text-sm">Featuring: Industrial pendant lighting, open shelving with local pottery, and fresh farmer's market styling.</p>
                  <p className="text-xs text-gray-500 italic">Disclosure: This image has been digitally staged to illustrate potential furnishings.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how" className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">How it works</h2>

              <ol className="space-y-6 mb-8">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#065F46] text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Upload photos</h3>
                    <p className="text-gray-700">High-res interior shots or provide key dimensions.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#065F46] text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Choose style</h3>
                    <p className="text-gray-700">Portland Authentic / Craftsman / Loft / Custom</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#065F46] text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Receive staged images</h3>
                    <p className="text-gray-700">48 hours for standard package; each image includes editable MLS disclosure overlay and metadata file.</p>
                  </div>
                </li>
              </ol>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="w-full sm:w-auto bg-[#FF634C] text-white px-6 py-3 rounded-lg hover:bg-[#E5523E] transition-colors font-medium text-center">
                  Request sample
                </a>
                <a href="#contact" className="w-full sm:w-auto bg-white border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:border-[#065F46] hover:text-[#065F46] transition-colors font-medium text-center">
                  Download disclosure template
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Why Portland?</h2>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  In 2015, I celebrated my 30th birthday with my mom—my favorite person—on a two-week journey through Portland. We explored Multnomah Falls, toured Pittock Mansion, wandered the rose gardens, discovered the Shanghai Tunnels, and stood speechless at Columbia River Gorge viewpoints.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  Portland became more than my favorite city. It became the place I associate with my mom's laugh, her curiosity, her joy in discovering new things. She passed away from cancer. Portland remains.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  When I registered The Landry Method as a Portland business despite living in Los Angeles, it wasn't strategy—it was tribute. This city gave me memories I treasure every day. My mom was born here. One day, I'll call it home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">Contact & Book</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-gray-50 rounded-xl shadow-md p-6 sm:p-8">
                {submitMessage && (
                  <div className={`mb-4 p-4 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="agent-name" className="block text-sm font-medium text-gray-900 mb-2">Agent name *</label>
                    <input
                      type="text"
                      id="agent-name"
                      name="agent-name"
                      required
                      value={formData['agent-name']}
                      onChange={(e) => setFormData({ ...formData, 'agent-name': e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="listing-address" className="block text-sm font-medium text-gray-900 mb-2">Listing address (optional)</label>
                    <input
                      type="text"
                      id="listing-address"
                      name="listing-address"
                      value={formData['listing-address']}
                      onChange={(e) => setFormData({ ...formData, 'listing-address': e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-900 mb-2">Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF634C] focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF634C] text-white px-6 py-3 rounded-lg hover:bg-[#E5523E] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit inquiry'}
                  </button>
                </form>
              </div>

              {/* Design Inspirations Card */}
              <div className="bg-gray-50 rounded-xl shadow-md p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Portland Design Inspirations</h3>
                <p className="text-gray-700 mb-6">
                  Our virtual staging reflects authentic Pacific Northwest craft traditions. We draw respectful aesthetic inspiration from Portland's renowned furniture makers, lighting designers, and artisans to create staging that resonates with local buyers — without implying any formal affiliation.
                </p>
                <h4 className="font-bold text-gray-900 mb-3">Style references</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF634C] font-bold mt-0.5 flex-shrink-0">•</span>
                    <span className="text-gray-700"><strong>The Joinery</strong> — warm solid wood furniture, exposed joinery, heirloom quality feel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF634C] font-bold mt-0.5 flex-shrink-0">•</span>
                    <span className="text-gray-700"><strong>Schoolhouse</strong> — vintage-inspired pendants, opal glass shades, honest brass hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF634C] font-bold mt-0.5 flex-shrink-0">•</span>
                    <span className="text-gray-700"><strong>Pigeon Toe</strong> — hand-thrown ceramics, soft silhouettes, matte glazes and subtle color</span>
                  </li>
                </ul>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">
                    Our images use original, generic furniture and décor designs influenced by this broader Portland maker aesthetic. We are not affiliated with, sponsored by, or endorsed by the businesses mentioned, and our work does not depict their actual products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2024 The Landry Method — Portland inspired virtual staging. All staged images include disclosure overlays unless otherwise noted.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
