import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, ImageIcon, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/landing/Header";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Upload {
  id: string;
  original_image_url: string;
  staged_image_url: string;
  created_at: string;
}

export default function Gallery() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loadingUploads, setLoadingUploads] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUploads();
    }
  }, [user]);

  const fetchUploads = async () => {
    try {
      const { data, error } = await supabase
        .from("uploads")
        .select("*")
        .eq("status", "completed")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUploads(data || []);
    } catch (error) {
      console.error("Error fetching uploads:", error);
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    } finally {
      setLoadingUploads(false);
    }
  };

  const downloadImage = (dataUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || loadingUploads) {
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

        {uploads.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uploads.map((upload) => (
              <Card key={upload.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Before</p>
                      <img
                        src={upload.original_image_url}
                        alt="Original"
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">After</p>
                      <img
                        src={upload.staged_image_url}
                        alt="Staged"
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      {new Date(upload.created_at).toLocaleDateString()}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        downloadImage(
                          upload.staged_image_url,
                          `staged-${upload.id}.png`
                        )
                      }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
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
