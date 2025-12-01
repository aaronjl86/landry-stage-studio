import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import tlmLogoFooter from "@/assets/tlm-logo-footer.webp";
import tlmLogoFooterPNG from "@/assets/tlm-logo-footer-opt.png";

export default function Footer4Col() {
  return (
    <footer className="border-t" style={{ backgroundColor: '#36eee0' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-bold">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <picture>
                <source srcSet={tlmLogoFooter} type="image/webp" />
                <img 
                  src={tlmLogoFooterPNG} 
                  alt="The Landry Method logo" 
                  className="h-16 md:h-20 w-auto" 
                  width="200" 
                  height="87" 
                  loading="lazy" 
                  decoding="async" 
                />
              </picture>
            </div>
            <p className="text-lg text-foreground font-medium">
              AI-powered virtual staging for real estate professionals
            </p>
            <p className="text-lg text-foreground font-medium">
              &copy; 2025 The Landry Method LLC. All rights reserved.
            </p>
            <p className="text-sm text-foreground">
              Refunds: 30-day money-back guarantee
            </p>
            <p className="text-sm text-foreground">
              Contact: <a href="mailto:support@thelandrymethod.com" className="underline hover:no-underline">support@thelandrymethod.com</a> • +1 (323) 745-8111
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
                <Link to="/#pricing" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/mls" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  MLS Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@thelandrymethod.com" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  Email Support
                </a>
              </li>
              <li>
                <a href="tel:+13237458111" className="text-lg text-foreground font-semibold hover:text-foreground transition-colors">
                  +1 (323) 745-8111
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div>
            <h3 className="font-semibold mb-4">Get Started</h3>
            <p className="text-sm text-foreground mb-4">
              Start staging your real estate photos today
            </p>
            <Button className="w-full" onClick={() => window.location.href = '/#pricing'}>
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}