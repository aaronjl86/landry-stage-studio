import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <div id="examples">
        <BeforeAfter />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      
      {/* Footer */}
      <footer className="border-t py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-muted-foreground space-y-3">
            <p className="font-medium">&copy; 2025 The Landry Method. All rights reserved.</p>
            <p className="text-sm">AI-powered virtual staging for real estate professionals</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
