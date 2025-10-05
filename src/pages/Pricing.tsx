import { Header } from "@/components/landing/Header";
import { Pricing as PricingSection } from "@/components/landing/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen">
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
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your real estate staging needs
          </p>
        </div>
        
        <PricingSection />
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-secondary/30 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 The Landry Method. All rights reserved.</p>
            <p className="mt-2 text-sm">AI-powered virtual staging for real estate professionals</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
