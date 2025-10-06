import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/landing/Header";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptionPlans";

export default function Credits() {
  const { user, loading, credits, refreshCredits, subscription, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleManageSubscription = async () => {
    setIsLoadingPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Portal error:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPortal(false);
    }
  };

  const getPlanName = () => {
    if (!subscription.subscribed || !subscription.product_id) return "No active subscription";
    
    // Check all plans for matching product ID
    for (const [key, plan] of Object.entries(SUBSCRIPTION_PLANS)) {
      if (plan.productId === subscription.product_id || plan.yearlyProductId === subscription.product_id) {
        return plan.name;
      }
    }
    return "Unknown Plan";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Credits Management</h1>
          <p className="text-muted-foreground">Monitor your AI credits and subscription</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Balance</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshCredits}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Your available AI credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{credits || 0}</div>
              <p className="text-sm text-muted-foreground mt-2">
                Credits remaining
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
              <CardDescription>Your current plan details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan:</span>
                <span className="font-semibold">{getPlanName()}</span>
              </div>
              {subscription.subscribed && subscription.subscription_end && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Renews:</span>
                  <span className="font-semibold">{formatDate(subscription.subscription_end)}</span>
                </div>
              )}
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={handleManageSubscription}
                disabled={isLoadingPortal || !subscription.subscribed}
              >
                {isLoadingPortal ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Manage Subscription"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Information</CardTitle>
              <CardDescription>How credits are consumed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per Image Edit:</span>
                <span className="font-semibold">1 credit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Per Generation:</span>
                <span className="font-semibold">1 credit</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refresh Status</CardTitle>
              <CardDescription>Check for subscription updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => {
                  checkSubscription();
                  refreshCredits();
                  toast({
                    title: "Status Updated",
                    description: "Subscription and credit balance refreshed",
                  });
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Status
              </Button>
            </CardContent>
          </Card>
        </div>

        {!subscription.subscribed && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Need More Credits?</CardTitle>
              <CardDescription>Upgrade your plan for more processing power</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/pricing">
                <Button size="lg">View Pricing Plans</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
