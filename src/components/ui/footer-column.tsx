import { Link } from "react-router-dom";

export default function Footer4Col() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F483f25f7132142e9a123c6a7640139f0%2F02a36f10bc5448f9953f9578d904e2cc?format=webp&width=800"
              alt="The Landry Method - Spatial Intelligence in Motion"
              className="h-14 w-auto"
            />
            <p className="text-sm text-gray-400">
              Professional virtual staging for real estate professionals
            </p>
            <p className="text-sm text-gray-400">
              © {currentYear} The Landry Method LLC. All rights reserved.
            </p>
            <div className="text-sm text-gray-400 space-y-1">
              <p>5441 S Macadam Ave STE N</p>
              <p>Portland, OR 97239</p>
              <p>Phone: +1 (503) 276-7274</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@thelandrymethod.com"
                  className="text-[#FF634C] hover:underline"
                >
                  support@thelandrymethod.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Product Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/auth"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/newsletter"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/mls-compliance"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  MLS Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@thelandrymethod.com"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  Email Support
                </a>
              </li>
              <li>
                <a
                  href="tel:+15032767274"
                  className="text-sm text-gray-400 hover:text-[#FF634C] transition-colors"
                >
                  Call Us
                </a>
              </li>
              <li>
                <p className="text-sm text-gray-400">
                  Available Monday - Friday, 9am - 5pm PST
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* A2P Disclaimer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="bg-gray-900 rounded p-4 mb-6">
            <h4 className="text-white font-semibold mb-2 text-sm">
              📱 SMS and Marketing Communications
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              By providing your phone number and opting in to our communications, you consent to receive
              SMS text messages, transactional communications, and marketing messages from The Landry
              Method via text message. Message frequency may vary. Message and data rates may apply.
              Reply "STOP" to opt out. Carriers are not liable for delayed or undelivered messages. This
              is standard A2P (Application-to-Person) messaging. You can manage your communication
              preferences at any time by contacting support@thelandrymethod.com or replying "STOP" to any
              message.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-xs text-gray-500">
            The Landry Method is committed to ethical, compliant service delivery and transparent
            business practices. All virtual staged photos include appropriate MLS disclosures.
          </p>
        </div>
      </div>
    </footer>
  );
}
