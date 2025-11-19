import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { hasConsent, acceptAllCookies, rejectNonEssentialCookies } from "@/lib/cookieConsent";
import { CookiePreferences } from "./CookiePreferences";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    if (!hasConsent()) {
      // Small delay to avoid banner flashing on page load
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    rejectNonEssentialCookies();
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowPreferences(true);
  };

  const handlePreferencesSaved = () => {
    setShowPreferences(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">We Value Your Privacy</h3>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  We use cookies and similar technologies to enhance your experience, secure your account, and improve our service. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto"
              >
                Reject Non-Essential
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCustomize}
                className="w-full sm:w-auto"
              >
                Customize
              </Button>
              <Button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CookiePreferences 
        open={showPreferences} 
        onOpenChange={setShowPreferences}
        onSave={handlePreferencesSaved}
      />
    </>
  );
}
