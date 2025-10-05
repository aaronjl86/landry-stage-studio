import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Image, Sparkles, ImageIcon, CreditCard } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Card, CardContent } from "@/components/ui/card";

export default function Gallery() {
  const { user, signOut, loading } = useAuth();
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
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-accent`}>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Gallery
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/dashboard/credits">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
          <h1 className="text-3xl font-bold mb-2">Your Gallery</h1>
          <p className="text-muted-foreground">View all your processed images</p>
        </div>

        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No images yet</h3>
              <p className="text-muted-foreground mb-4">Process some photos to see them here</p>
              <Link to="/dashboard">
                <Button>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Start Editing
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
