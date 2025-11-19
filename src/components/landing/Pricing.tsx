import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptionPlans";

const plans = [
  {
    key: "starter" as const,
    ...SUBSCRIPTION_PLANS.starter,
    popular: false,
  },
  {
    key: "professional" as const,
    ...SUBSCRIPTION_PLANS.professional,
    popular: true,
  },
  {
    key: "enterprise" as const,
    ...SUBSCRIPTION_PLANS.enterprise,
    popular: false,
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { user, subscription, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (planKey: string, priceId: string) => {
    if (!user) {
      toast({
        title: "Coming Soon",
        description: "Authentication will be available soon. Please check back later.",
      });
      // Scroll to top of pricing section
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setLoadingPlan(planKey);
    
    try {
      console.log('[Pricing] Creating checkout session for:', { planKey, priceId });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      console.log('[Pricing] Checkout response:', { data, error });

      if (error) {
        console.error('[Pricing] Checkout error:', error);
        toast({
          title: "Checkout Error",
          description: error.message || "Failed to create checkout session",
          variant: "destructive",
        });
        setLoadingPlan(null);
        return;
      }

      if (data?.url) {
        console.log('[Pricing] Redirecting to Stripe:', data.url);
        // Redirect in same window so user returns to app after payment
        window.location.href = data.url;
      } else {
        toast({
          title: "Error",
          description: "No checkout URL received from server",
          variant: "destructive",
        });
        setLoadingPlan(null);
      }
    } catch (error) {
      console.error('[Pricing] Exception during checkout:', error);
      toast({
        title: "Unexpected Error",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      setLoadingPlan(null);
    }
  };

  const isCurrentPlan = (productId: string, yearlyProductId: string) => {
    if (!subscription.subscribed) return false;
    return subscription.product_id === productId || subscription.product_id === yearlyProductId;
  };

  // Admins shouldn't see subscription prompts
  if (isAdmin) {
    return (
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center space-y-4">
            <div className="inline-block bg-gradient-to-r from-[hsl(280,70%,70%)] to-[hsl(290,75%,65%)] text-white px-6 py-3 rounded-full text-lg font-semibold mb-4">
              🎉 Admin Account - Unlimited Access
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              You have full admin access
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              As an administrator, you have unlimited credits and full access to all features. No subscription required.
            </p>
          </div>
        </div>
      </section>
    );
  }
  return <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Competitively Priced, Infinitely More Flexible
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get photorealistic virtual staging at prices comparable to other services—but with unlimited creative freedom and instant results you control.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!isYearly ? 'font-bold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button onClick={() => setIsYearly(!isYearly)} className="relative w-14 h-7 bg-gradient-to-r from-[hsl(280,70%,70%)] to-[hsl(265,65%,55%)] rounded-full transition-colors">
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm ${isYearly ? 'font-bold' : 'text-muted-foreground'}`}>
              Yearly
              <span className="ml-2 text-xs bg-gradient-to-r from-[hsl(280,70%,70%)]/10 via-[hsl(265,65%,55%)]/10 to-[hsl(290,75%,65%)]/10 px-2 py-1 rounded-full">
                <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent">Save 17%</span>
              </span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map(plan => {
            const currentPlan = isCurrentPlan(plan.productId, plan.yearlyProductId);
            const priceId = isYearly ? plan.yearlyPriceId : plan.monthlyPriceId;
            const isLoading = loadingPlan === plan.key;

            return (
              <Card key={plan.name} className={`relative transition-all hover:shadow-xl border-2 border-transparent bg-gradient-to-r from-[hsl(280,70%,70%)] to-[hsl(290,75%,65%)] p-[2px] ${plan.popular ? 'shadow-[var(--shadow-card)] scale-105' : ''}`}>
                <div className="bg-background rounded-lg h-full flex flex-col">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">Most Popular</span>
                  </div>
                )}
                {currentPlan && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">Your Plan</span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[hsl(265,65%,55%)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.key, priceId)}
                    disabled={isLoading || currentPlan}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : currentPlan ? (
                      "Current Plan"
                    ) : (
                      "Get Started"
                    )}
                  </Button>
                </CardFooter>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>;
};

export default Pricing;
