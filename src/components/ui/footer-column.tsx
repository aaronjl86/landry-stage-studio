import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import tlmLogoFooter from "@/assets/tlm-logo-footer.webp";

export default function Footer4Col() {
  return (
    <footer className="border-t" style={{ backgroundColor: '#36eee0' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-bold">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={tlmLogoFooter} alt="The Landry Method logo" className="h-16 md:h-20 w-auto" width="200" height="80" loading="lazy" />
            </div>
            <p className="text-lg text-foreground font-medium">
              AI-powered virtual staging for real estate professionals
            </p>
            <p className="text-lg text-foreground font-medium">
              &copy; 2025 The Landry Method. All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#examples" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/gallery" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/dashboard/credits" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Credits
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & CTA */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/privacy-policy" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            <Link to="/auth">
              <Button className="w-full">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}