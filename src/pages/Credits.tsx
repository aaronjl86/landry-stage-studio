import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/landing/Header";

export default function Credits() {
  const { user, loading, credits, refreshCredits } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

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
          <p className="text-muted-foreground">Monitor your AI credits and usage</p>
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
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Need More Credits?</CardTitle>
            <CardDescription>Upgrade your plan for more processing power</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/#pricing">
              <Button size="lg">View Pricing Plans</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
