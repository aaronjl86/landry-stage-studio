import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import tlmLogo from "@/assets/tlm-logo-white.png";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Home, DollarSign, Info, Mail, Sparkles, ImageIcon, CreditCard, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ExpandableTabs, type TabItem, type Tab } from "@/components/ui/expandable-tabs";

export const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const baseTabs: TabItem[] = [
    { title: "Home", icon: Home, path: "/" },
    { title: "About", icon: Info, path: "/about" },
    { title: "Contact", icon: Mail, path: "/contact" },
    { title: "Pricing", icon: DollarSign, path: "/pricing" },
  ];

  const userTabs: TabItem[] = user
    ? [
        { type: "separator" },
        { title: "Editor", icon: Sparkles, path: "/dashboard" },
        { title: "Gallery", icon: ImageIcon, path: "/dashboard/gallery" },
        { title: "Credits", icon: CreditCard, path: "/dashboard/credits" },
      ]
    : [];

  const allTabs = [...baseTabs, ...userTabs];

  // Mobile nav links for Sheet
  const navLinks = (
    <>
      {allTabs.map((item, index) => {
        if (item.type === "separator") return null;
        // Type guard - TypeScript now knows item is a Tab
        const tab = item as Tab;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.path || index}
            to={tab.path}
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 text-foreground"
          >
            <Icon className="h-4 w-4" />
            {tab.title}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={tlmLogo} alt="The Landry Method" className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <ExpandableTabs tabs={allTabs} />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {user ? (
              <Button variant="ghost" size="lg" onClick={signOut} className="hidden lg:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth" className="hidden lg:block">
                  <Button variant="ghost" size="lg">Sign In</Button>
                </Link>
                <Link to="/auth" className="hidden lg:block">
                  <Button size="lg">Start Free Trial</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks}
                  
                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                    {user ? (
                      <Button variant="outline" size="lg" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    ) : (
                      <>
                        <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="outline" size="lg" className="w-full">Sign In</Button>
                        </Link>
                        <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                          <Button size="lg" className="w-full">Start Free Trial</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
