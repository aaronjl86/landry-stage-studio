import { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import PricingSection from "@/components/landing/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer4Col from "@/components/ui/footer-column";

export default function Pricing() {
  useEffect(() => {
    document.title = "Virtual Staging Pricing | Affordable Plans for Real Estate Agents - The Landry Method";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Compare virtual staging pricing plans. From $29/month for starter agents to enterprise plans. Save thousands vs physical staging costs.');
  }, []);

  return <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        
        
        <PricingSection />
      </main>
      
      <Footer4Col />
    </div>;
}