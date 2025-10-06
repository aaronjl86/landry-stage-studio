import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import tlmLogo from "@/assets/tlm-logo-white.png";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Home, DollarSign, Info, Mail, Sparkles, ImageIcon, CreditCard } from "lucide-react";

export const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={tlmLogo} alt="The Landry Method" className="h-12" />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive("/") ? "text-primary" : ""}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive("/about") ? "text-primary" : ""}`}
            >
              <Info className="h-4 w-4" />
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive("/contact") ? "text-primary" : ""}`}
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <Link 
              to="/pricing" 
              className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive("/pricing") ? "text-primary" : ""}`}
            >
              <DollarSign className="h-4 w-4" />
              Pricing
            </Link>
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive("/dashboard") && location.pathname === "/dashboard" ? "text-primary" : ""}`}
                >
                  <Sparkles className="h-4 w-4" />
                  Editor
                </Link>
                <Link 
                  to="/dashboard/gallery" 
                  className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive("/dashboard/gallery") ? "text-primary" : ""}`}
                >
                  <ImageIcon className="h-4 w-4" />
                  Gallery
                </Link>
                <Link 
                  to="/dashboard/credits" 
                  className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${isActive("/dashboard/credits") ? "text-primary" : ""}`}
                >
                  <CreditCard className="h-4 w-4" />
                  Credits
                </Link>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {user ? (
              <Button variant="ghost" size="lg" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="lg">Sign In</Button>
                </Link>
                <Link to="/auth" className="hidden sm:block">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
