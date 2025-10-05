import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Image, Sparkles, ImageIcon, CreditCard, RefreshCw } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Credits() {
  const { user, signOut, loading, credits, refreshCredits } = useAuth();
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
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Image className="h-5 w-5 text-white" />
              </div>
              <span>The Landry Method</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Editor
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/dashboard/gallery">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Gallery
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/dashboard/credits">
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-accent`}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credits
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
