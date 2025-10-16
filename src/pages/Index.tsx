import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { SocialProof } from "@/components/landing/SocialProof";
import { GalleryCarousel } from "@/components/landing/GalleryCarousel";
import Footer4Col from "@/components/ui/footer-column";
const Index = () => {
  return <div className="min-h-screen">
      <Header />
      <section className="overflow-hidden">
        <Hero />
      </section>
      
      {/* Gallery & Social Proof Section */}
      <section className="bg-transparent pb-12 overflow-hidden">
        <div className="mx-auto">
          <div className="text-center mb-12 px-4">
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Spatial Intelligence in Motion
            </h2>
          </div>
          <GalleryCarousel />
          <SocialProof />
        </div>
      </section>
      
      <Features />
      <InteractiveDemo />
      <div id="pricing">
        <Pricing />
      </div>
      <div id="faq">
        
      </div>
      
      <Footer4Col />
    </div>;
};
export default Index;