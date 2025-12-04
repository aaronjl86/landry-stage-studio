import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname === path) return true;
    return false;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
    { name: "MLS Compliance", path: "/mls-compliance" },
    { name: "Newsletter", path: "/newsletter" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F483f25f7132142e9a123c6a7640139f0%2F02a36f10bc5448f9953f9578d904e2cc?format=webp&width=800"
              alt="The Landry Method - Spatial Intelligence in Motion"
              className="h-12 sm:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-[#FF634C]"
                    : "text-gray-600 hover:text-[#FF634C]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/auth" className="ml-4">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t bg-white py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-[#FF634C] bg-gray-50"
                    : "text-gray-600 hover:text-[#FF634C] hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 py-2 pt-4 border-t">
              <Link to="/auth" className="block w-full">
                <Button className="w-full" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
