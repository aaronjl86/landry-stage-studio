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
  return (
    <div className="min-h-screen">
      <Header />
      <section className="overflow-hidden">
        <Hero />
      </section>
      
      {/* Video Section */}
      <section className="bg-primary py-16 overflow-hidden">
        <div className="flex justify-center items-center">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="max-w-3xl w-full"
            style={{ 
              mixBlendMode: 'screen',
              filter: 'contrast(2) brightness(1.5)'
            }}
          >
            <source src="/src/assets/spatial-intelligence-motion.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
      
      {/* Gallery & Social Proof Section */}
      <section className="overflow-hidden">
        <GalleryCarousel />
        <SocialProof />
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
    </div>
  );
};

export default Index;
