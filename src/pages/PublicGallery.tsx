import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/landing/Header";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PublicUpload {
  id: string;
  original_image_url: string;
  staged_image_url: string;
  created_at: string;
}

export default function PublicGallery() {
  const [uploads, setUploads] = useState<PublicUpload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicUploads();
  }, []);

  const fetchPublicUploads = async () => {
    try {
      const { data, error } = await supabase
        .from("uploads")
        .select("id, original_image_url, staged_image_url, created_at")
        .eq("is_public", true)
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setUploads(data || []);
    } catch (error) {
      console.error("Error fetching public gallery:", error);
      toast({
        title: "Error",
        description: "Failed to load public gallery",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Public Gallery</h1>
          <p className="text-muted-foreground mb-4">
            Real transformations from our community
          </p>
          <Link to="/auth">
            <Button size="lg" className="gap-2">
              <Sparkles className="h-5 w-5" />
              Create Your Own Staged Photos
            </Button>
          </Link>
        </div>

        {uploads.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <div className="text-center">
                <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No public images yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to share your staged photos!
                </p>
                <Link to="/auth">
                  <Button>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploads.map((upload) => (
              <Card key={upload.id}>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold mb-2 text-muted-foreground">Before</p>
                      <img
                        src={upload.original_image_url}
                        alt="Original"
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2 text-muted-foreground">After</p>
                      <img
                        src={upload.staged_image_url}
                        alt="Staged"
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
