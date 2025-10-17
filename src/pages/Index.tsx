import { lazy, Suspense } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { SocialProof } from "@/components/landing/SocialProof";
import spatialIntelligenceTitle from "@/assets/spatial-intelligence-motion.png";

// Lazy load heavy components
const GalleryCarousel = lazy(() => import("@/components/landing/GalleryCarousel"));
const InteractiveDemo = lazy(() => import("@/components/landing/InteractiveDemo"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const Footer4Col = lazy(() => import("@/components/ui/footer-column"));
const Index = () => {
  return <div className="min-h-screen">
      <Header />
      <section className="overflow-hidden">
        <Hero />
      </section>
      
      {/* Gallery Section */}
      <section className="bg-primary pb-12 overflow-hidden">
        <div className="mx-auto">
          <div className="text-center mb-4 px-4">
            <h2 className="sr-only">Gallery Showcase</h2>
            <img src={spatialIntelligenceTitle} alt="Spatial Intelligence in Motion" className="mx-auto max-w-full h-auto" width="800" height="200" loading="lazy" />
            <p className="mt-4 text-5xl text-[#b21bd7] font-normal my-px mx-0">
              Turning empty rooms into persuasive visuals.
            </p>
          </div>
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
            <GalleryCarousel />
          </Suspense>
        </div>
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