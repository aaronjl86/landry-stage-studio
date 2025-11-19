import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Home, DollarSign, Info, Mail, Sparkles, ImageIcon, CreditCard, LogIn, Menu, MessageSquare } from "lucide-react";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export const Header = () => {
  const {
    user,
    signOut,
    refreshCredits,
    checkSubscription,
    isAdmin
  } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  // Main navigation tabs - only landing page sections (all other routes are hidden)
  const mainTabs: TabItem[] = [{
    title: "Home",
    icon: Home,
    path: "/"
  }, {
    title: "Pricing",
    icon: DollarSign,
    path: "/#pricing"
  }, {
    title: "FAQ",
    icon: Info,
    path: "/#faq"
  }];

  // User product tabs - removed (routes are hidden)
  const userTabs: TabItem[] = [];

  // Admin tabs - removed (routes are hidden)
  const adminTabs: TabItem[] = [];

  // Auth tabs - removed (auth route is hidden)
  const authTabs: TabItem[] = [];
  const allTabs = [...mainTabs, ...userTabs, ...adminTabs, ...authTabs];
  const handleMobileNavClick = (onClick?: () => void) => {
    setMobileMenuOpen(false);
    if (onClick) onClick();
  };
  return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex h-[100px] md:h-[160px] items-center justify-between gap-2 md:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 max-w-[70%] md:max-w-none">
            {isMobile ? (
              <img 
                src="/TLM Logo White LA8-gigapixel-low resolution v2-823h.png"
                alt="The Landry Method" 
                className="h-[56px] w-auto object-contain"
              />
            ) : (
              <video 
                src="/videos/tlm-logo-animated.mp4" 
                autoPlay 
                muted 
                loop
                playsInline 
                preload="auto"
                aria-label="The Landry Method" 
                className="h-[112px] w-auto object-contain"
              />
            )}
          </Link>

          {/* Desktop Navigation - Large screens only */}
          <nav className="hidden lg:flex items-center flex-1 justify-center gap-2">
            <ExpandableTabs tabs={allTabs} />
          </nav>

          {/* Mobile/Tablet Navigation - Hamburger menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu">
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

                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>;
};