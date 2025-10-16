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
      <section className="bg-transparent py-12 overflow-hidden">
        <div className="mx-auto flex justify-center items-center">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="max-w-2xl w-full mix-blend-screen"
            style={{ filter: 'contrast(1.2)' }}
          >
            <source src="/src/assets/tlm-logo-animated.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
      
      {/* Gallery & Social Proof Section */}
      <section className="bg-transparent py-12 overflow-hidden">
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
        <FAQ />
      </div>
      
      <Footer4Col />
    </div>
  );
};

export default Index;
