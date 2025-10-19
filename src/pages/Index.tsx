import { lazy, Suspense } from "react";
import { HeaderBare } from "@/components/landing/HeaderBare";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { SocialProof } from "@/components/landing/SocialProof";

// Lazy load heavy components
const InteractiveDemo = lazy(() => import("@/components/landing/InteractiveDemo"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const Footer4Col = lazy(() => import("@/components/ui/footer-column"));
const Index = () => {
  return <div className="min-h-screen">
      {/* Lightweight header on home to keep initial JS minimal */}
      <HeaderBare />
      <section className="overflow-hidden">
        <Hero />
      </section>
      
      {/* Social Proof Section */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <SocialProof />
        </div>
      </section>
      
      <Features />
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
        <InteractiveDemo />
      </Suspense>
      <div id="pricing">
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
          <Pricing />
        </Suspense>
      </div>
      <div id="faq">
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
          <FAQ />
        </Suspense>
      </div>
      
      <Suspense fallback={<div className="h-24"></div>}>
        <Footer4Col />
      </Suspense>
    </div>;
};
export default Index;