import { lazy, Suspense } from "react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";

// Lazy load heavy components
const InteractiveDemo = lazy(() => import("@/components/landing/InteractiveDemo"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const Footer4Col = lazy(() => import("@/components/ui/footer-column"));
const HeroComparison = lazy(() => import("@/components/landing/HeroComparison").then(m => ({ default: m.HeroComparison })));
const Comparison = lazy(() => import("@/components/landing/Comparison").then(m => ({ default: m.Comparison })));
const Index = () => {
  return <div className="min-h-screen">
      <Header />
      <section className="overflow-hidden">
        <Hero />
      </section>
      
      <section style={{ backgroundColor: '#36eee0' }}>
        <Features />
      </section>
      
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
        <HeroComparison />
      </Suspense>
      
      <Suspense fallback={<div className="h-96" />}>
        <Comparison />
      </Suspense>
      
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