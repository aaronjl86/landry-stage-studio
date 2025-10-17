import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { SocialProof } from "@/components/landing/SocialProof";
import { GalleryCarousel } from "@/components/landing/GalleryCarousel";
import Footer4Col from "@/components/ui/footer-column";
import spatialIntelligenceTitle from "@/assets/spatial-intelligence-motion.png";
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
            <img src={spatialIntelligenceTitle} alt="Spatial Intelligence in Motion" className="mx-auto max-w-full h-auto" width="800" height="200" loading="lazy" />
            <p className="mt-4 text-5xl text-[#b21bd7] font-normal my-px mx-0">
              Turning empty rooms into persuasive visuals.
            </p>
          </div>
          <GalleryCarousel />
        </div>
      </section>
      
      {/* Social Proof Section */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <SocialProof />
        </div>
      </section>
      
      <Features />
      <InteractiveDemo />
      <div id="pricing">
        <Pricing />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      
      <Footer4Col />
    </div>;
};
export default Index;