import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getCookieConsent, setCookieConsent, defaultPreferences } from "@/lib/cookieConsent";
import { Shield, Settings, BarChart } from "lucide-react";

interface CookiePreferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
}

export function CookiePreferences({ open, onOpenChange, onSave }: CookiePreferencesProps) {
  const [preferences, setPreferences] = useState(() => {
    const saved = getCookieConsent();
    return saved || defaultPreferences;
  });

  useEffect(() => {
    if (open) {
      const saved = getCookieConsent();
      setPreferences(saved || defaultPreferences);
    }
  }, [open]);

  const handleSave = () => {
    setCookieConsent(preferences);
    onSave?.();
    onOpenChange(false);
  };

  const handleToggle = (category: 'functional' | 'analytics') => {
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Manage your cookie preferences. Essential cookies are always enabled as they are necessary for the website to function.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Essential Cookies */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <Label className="text-base font-semibold">Essential Cookies</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  These cookies are necessary for the website to function and cannot be disabled. 
                  They include authentication tokens and security features.
                </p>
                <div className="text-xs text-muted-foreground mt-2 space-y-1">
                  <p>• Authentication and session management</p>
                  <p>• Security and fraud prevention</p>
                  <p>• Cookie consent preferences</p>
                </div>
              </div>
              <Switch 
                checked={true} 
                disabled 
                className="mt-1"
              />
            </div>
          </div>

          <Separator />

          {/* Functional Cookies */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" />
                  <Label htmlFor="functional" className="text-base font-semibold cursor-pointer">
                    Functional Cookies
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                </p>
                <div className="text-xs text-muted-foreground mt-2 space-y-1">
                  <p>• Sidebar state and layout preferences</p>
                  <p>• Theme preferences (dark/light mode)</p>
                  <p>• Language and region settings</p>
                </div>
              </div>
              <Switch 
                id="functional"
                checked={preferences.functional} 
                onCheckedChange={() => handleToggle('functional')}
                className="mt-1"
              />
            </div>
          </div>

          <Separator />

          {/* Analytics Cookies */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-primary" />
                  <Label htmlFor="analytics" className="text-base font-semibold cursor-pointer">
                    Analytics Cookies
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  These cookies help us understand how visitors interact with our website by collecting anonymous information.
                </p>
                <div className="text-xs text-muted-foreground mt-2 space-y-1">
                  <p>• Performance monitoring and page analytics</p>
                  <p>• Usage statistics and page views</p>
                  <p>• Error tracking and debugging</p>
                </div>
              </div>
              <Switch 
                id="analytics"
                checked={preferences.analytics} 
                onCheckedChange={() => handleToggle('analytics')}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="w-full sm:w-auto"
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
