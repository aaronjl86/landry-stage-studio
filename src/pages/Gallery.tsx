import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/landing/Header";

export default function Gallery() {
  const { user, loading } = useAuth();
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
