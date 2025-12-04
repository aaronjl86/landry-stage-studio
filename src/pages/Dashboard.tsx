import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/landing/Header";
import { AIPhotoEditor } from "@/components/ai/AIPhotoEditor";

export default function Dashboard() {
  const { user, session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Photo Enhancement Dashboard - The Landry Method";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Access your photo enhancement dashboard. Upload real estate photos for professional staging enhancement.');
  }, []);

  useEffect(() => {
    if (!loading && !user && !session) {
      navigate("/auth");
    }
  }, [user, session, loading, navigate]);

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
      <main>
        <AIPhotoEditor />
      </main>
    </div>
  );
}
