import { Link } from "react-router-dom";
import tlmLogo from "@/assets/tlm-logo-white.png";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, 
  Home, 
  DollarSign, 
  Info, 
  Mail, 
  Sparkles, 
  ImageIcon, 
  CreditCard, 
  LogIn
} from "lucide-react";
import { ExpandableTabs, type TabItem, type Tab } from "@/components/ui/expandable-tabs";

export const Header = () => {
  const { user, signOut } = useAuth();
  

  // Main navigation tabs
  const mainTabs: TabItem[] = [
    { title: "Home", icon: Home, path: "/" },
    { title: "About", icon: Info, path: "/about" },
    { title: "Pricing", icon: DollarSign, path: "/pricing" },
    { title: "Contact", icon: Mail, path: "/contact" },
  ];

  // User product tabs (only show when logged in)
  const userTabs: TabItem[] = user
    ? [
        { type: "separator" },
        { title: "Editor", icon: Sparkles, path: "/dashboard" },
        { title: "Gallery", icon: ImageIcon, path: "/dashboard/gallery" },
        { title: "Credits", icon: CreditCard, path: "/dashboard/credits" },
      ]
    : [];

  // Auth tabs (conditionally add based on user state)
  const authTabs: TabItem[] = user
    ? [
        { type: "separator" },
        { title: "Sign Out", icon: LogOut, path: "#", onClick: signOut },
      ]
    : [
        { type: "separator" },
        { title: "Sign In", icon: LogIn, path: "/auth" },
      ];

  const allTabs = [...mainTabs, ...userTabs, ...authTabs];


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={tlmLogo} alt="The Landry Method" className="h-12" />
          </Link>

          <nav className="flex items-center flex-1 justify-center">
            <ExpandableTabs tabs={allTabs} />
          </nav>

        </div>
      </div>
    </header>
  );
};
