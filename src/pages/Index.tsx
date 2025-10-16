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