import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Image, Upload, LogOut, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, credits, signOut, refreshCredits, loading } = useAuth();
  const navigate = useNavigate();
  const [uploads, setUploads] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

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
    if (!user) return;

    const { data, error } = await supabase
      .from("uploads")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUploads(data);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (credits < 1) {
      toast.error("Insufficient credits. Please upgrade your plan.");
      return;
    }

    setUploading(true);

    try {
      // Upload to storage
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("room-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("room-images")
        .getPublicUrl(filePath);

      // Create upload record
      const { error: insertError } = await supabase
        .from("uploads")
        .insert({
          user_id: user.id,
          original_image_url: publicUrl,
          status: "processing",
        });

      if (insertError) throw insertError;

      // Deduct credit
      const { error: updateError } = await supabase
        .from("user_credits")
        .update({ credits: credits - 1 })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      toast.success("Upload successful! Processing your image...");
      await refreshCredits();
      await fetchUploads();
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
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
    <div className="min-h-screen bg-[image:var(--gradient-subtle)]">
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

            <div className="flex items-center gap-4">
              <div className="text-sm font-medium">
                Credits: <span className="text-primary font-bold">{credits}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Upload Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Upload New Room</CardTitle>
              <CardDescription>
                Upload a photo of an empty room to get it professionally staged
              </CardDescription>
            </CardHeader>
            <CardContent>
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 50MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading || credits < 1}
                />
              </label>
            </CardContent>
          </Card>

          {/* Credits Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Credits</CardTitle>
              <CardDescription>Manage your upload credits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">{credits}</div>
                <p className="text-sm text-muted-foreground">Credits remaining</p>
              </div>
              <Button className="w-full" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Uploads History */}
        <Card>
          <CardHeader>
            <CardTitle>Your Uploads</CardTitle>
            <CardDescription>View all your staged rooms</CardDescription>
          </CardHeader>
          <CardContent>
            {uploads.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No uploads yet. Upload your first room to get started!
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploads.map((upload) => (
                  <div key={upload.id} className="rounded-lg overflow-hidden border">
                    <img
                      src={upload.original_image_url}
                      alt="Uploaded room"
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm font-medium capitalize">{upload.status}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(upload.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
