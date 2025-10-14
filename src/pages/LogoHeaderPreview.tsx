import { Link } from "react-router-dom";
import tlmLogoVideo from "@/assets/tlm-logo-animated.mp4";
import { Home, DollarSign, Info, Mail, Sparkles, ImageIcon, CreditCard, LogIn } from "lucide-react";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";

export default function LogoHeaderPreview() {
  const sizes = [
    { height: 80, label: "80px (Small)" },
    { height: 100, label: "100px (Medium Small)" },
    { height: 120, label: "120px (Medium)" },
    { height: 140, label: "140px (Medium Large)" },
    { height: 160, label: "160px (Large)" },
    { height: 180, label: "180px (Very Large)" },
    { height: 200, label: "200px (Extra Large)" },
  ];

  const mainTabs: TabItem[] = [
    { title: "Home", icon: Home, path: "/" },
    { title: "Public Gallery", icon: ImageIcon, path: "/public-gallery" },
    { title: "About", icon: Info, path: "/about" },
    { title: "Pricing", icon: DollarSign, path: "/pricing" },
    { title: "Contact", icon: Mail, path: "/contact" },
    { type: "separator" },
    { title: "Editor", icon: Sparkles, path: "/dashboard" },
    { title: "Gallery", icon: ImageIcon, path: "/dashboard/gallery" },
    { title: "Credits", icon: CreditCard, path: "/dashboard/credits" },
    { type: "separator" },
    { title: "Sign In", icon: LogIn, path: "/auth" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Logo Size Preview in Header Context</h1>
        <p className="text-muted-foreground text-center mb-8">
          See how each logo size looks in the actual header with navigation
        </p>
      </div>

      <div className="space-y-12">
        {sizes.map((size, index) => (
          <div key={index} className="space-y-4">
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                {size.label}
              </span>
            </div>
            
            <header className="w-full border-b bg-background/95 backdrop-blur">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                  className="flex items-center justify-between gap-4"
                  style={{ height: `${size.height + 20}px` }}
                >
                  <Link to="/" className="flex items-center flex-shrink-0">
                    <video
                      src={tlmLogoVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="The Landry Method"
                      style={{ height: `${size.height}px`, width: 'auto' }}
                      className="object-contain"
                    />
                  </Link>

                  <nav className="flex items-center flex-1 justify-center">
                    <ExpandableTabs tabs={mainTabs} />
                  </nav>
                </div>
              </div>
            </header>
          </div>
        ))}
      </div>

      <div className="p-8 text-center">
        <p className="text-muted-foreground">
          Once you've chosen your preferred size, let me know and I'll update the header!
        </p>
      </div>
    </div>
  );
}
