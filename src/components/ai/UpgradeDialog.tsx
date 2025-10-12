import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptionPlans";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requiredCredits: number;
  currentCredits: number;
  onClose?: () => void;
}

export function UpgradeDialog({
  open,
  onOpenChange,
  requiredCredits,
  currentCredits,
  onClose,
}: UpgradeDialogProps) {
  const handleUpgrade = async (priceId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast({
        title: "Error",
        description: "Failed to open checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMaybeLater = () => {
    console.log("Maybe Later clicked - closing dialog and refreshing credits");
    onOpenChange(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Upgrade Your Plan
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You need <span className="font-semibold text-foreground">{requiredCredits}</span> credits but only have{" "}
            <span className="font-semibold text-foreground">{currentCredits}</span>.
            <br />
            Upgrade to continue staging your photos!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Starter Plan */}
          <Card
            className="p-6 cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary"
            onClick={() => handleUpgrade(SUBSCRIPTION_PLANS.starter.monthlyPriceId)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Starter Plan
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold">${SUBSCRIPTION_PLANS.starter.monthlyPrice}</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {SUBSCRIPTION_PLANS.starter.description}
              </p>
              <ul className="space-y-2">
                {SUBSCRIPTION_PLANS.starter.features.map((feature, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <span className="text-blue-600">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Professional Plan */}
          <Card
            className="p-6 cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20"
            onClick={() => handleUpgrade(SUBSCRIPTION_PLANS.professional.monthlyPriceId)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Professional Plan
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold">${SUBSCRIPTION_PLANS.professional.monthlyPrice}</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {SUBSCRIPTION_PLANS.professional.description}
              </p>
              <ul className="space-y-2">
                {SUBSCRIPTION_PLANS.professional.features.map((feature, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <span className="text-purple-600">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={handleMaybeLater}
            className="text-muted-foreground hover:text-foreground"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
