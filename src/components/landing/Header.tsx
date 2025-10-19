import { Link } from "react-router-dom";
import tlmLogoVideo from "@/assets/tlm-logo-animated.mp4";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Home, DollarSign, Info, Mail, Sparkles, ImageIcon, CreditCard, LogIn, Menu } from "lucide-react";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export const Header = () => {
  const {
    user,
    signOut
  } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Main navigation tabs
  const mainTabs: TabItem[] = [{
    title: "Home",
    icon: Home,
    path: "/"
  }, {
    title: "Public Gallery",
    icon: ImageIcon,
    path: "/public-gallery"
  }, {
    title: "About",
    icon: Info,
    path: "/about"
  }, {
    title: "Pricing",
    icon: DollarSign,
    path: "/pricing"
  }, {
    title: "Contact",
    icon: Mail,
    path: "/contact"
  }];

  // User product tabs (always show, redirect to auth if not logged in)
  const userTabs: TabItem[] = [{
    type: "separator"
  }, {
    title: "Editor",
    icon: Sparkles,
    path: user ? "/dashboard" : "/auth"
  }, {
    title: "Gallery",
    icon: ImageIcon,
    path: user ? "/dashboard/gallery" : "/auth"
  }, {
    title: "Credits",
    icon: CreditCard,
    path: user ? "/dashboard/credits" : "/auth"
  }];

  // Auth tabs (conditionally add based on user state)
  const authTabs: TabItem[] = user ? [{
    type: "separator"
  }, {
    title: "Sign Out",
    icon: LogOut,
    path: "#",
    onClick: signOut
  }] : [{
    type: "separator"
  }, {
    title: "Sign In",
    icon: LogIn,
    path: "/auth"
  }];
  const allTabs = [...mainTabs, ...userTabs, ...authTabs];
  const handleMobileNavClick = (onClick?: () => void) => {
    setMobileMenuOpen(false);
    if (onClick) onClick();
  };
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex h-[100px] md:h-[160px] items-center justify-between gap-2 md:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 max-w-[70%] md:max-w-none">
            <video src={tlmLogoVideo} autoPlay muted playsInline aria-label="The Landry Method" className="h-[70px] md:h-[140px] w-auto object-contain" />
          </Link>

          {/* Desktop Navigation - Large screens only */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <ExpandableTabs tabs={allTabs} />
          </nav>

          {/* Mobile/Tablet Navigation - Hamburger menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {/* Main Navigation */}
                  <div className="flex flex-col gap-2">
                    {mainTabs.map(tab => {
                  const Icon = tab.icon;
                  return <Link key={tab.path} to={tab.path} onClick={() => handleMobileNavClick()} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                          <Icon className="h-5 w-5" />
                          <span className="text-base font-medium">{tab.title}</span>
                        </Link>;
                })}
                  </div>

                  {/* User Tabs (always shown) */}
                  <div className="h-px bg-border my-2" />
                  <div className="flex flex-col gap-2">
                    {userTabs.filter((tab): tab is Extract<TabItem, {
                  type?: never;
                }> => tab.type !== "separator").map(tab => {
                  const Icon = tab.icon;
                  return <Link key={tab.path} to={tab.path} onClick={() => handleMobileNavClick()} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                            <Icon className="h-5 w-5" />
                            <span className="text-base font-medium">{tab.title}</span>
                          </Link>;
                })}
                  </div>

                  {/* Auth Section */}
                  <div className="h-px bg-border my-2" />
                  {user ? <Button variant="ghost" onClick={() => handleMobileNavClick(signOut)} className="justify-start gap-3 px-4 py-6 h-auto">
                      <LogOut className="h-5 w-5" />
                      <span className="text-base font-medium">Sign Out</span>
                    </Button> : <Link to="/auth" onClick={() => handleMobileNavClick()} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                      <LogIn className="h-5 w-5" />
                      <span className="text-base font-medium">Sign In</span>
                    </Link>}
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>;
};