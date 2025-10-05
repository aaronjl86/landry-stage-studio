import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import tlmLogo from "@/assets/tlm-logo-white.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={tlmLogo} alt="The Landry Method" className="h-12" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="lg">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button size="lg">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
