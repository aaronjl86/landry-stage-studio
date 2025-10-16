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
      
      {/* Video Section with Transparent Background */}
      <section className="bg-primary py-16 overflow-hidden">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="relative w-full max-w-4xl" style={{ isolation: 'isolate' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              style={{
                mixBlendMode: 'multiply',
                filter: 'contrast(1.3) brightness(1.8) saturate(1.2)'
              }}
            >
              <source src="/src/assets/spatial-intelligence-motion.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-auto"
              style={{
                mixBlendMode: 'screen',
                filter: 'invert(1) hue-rotate(180deg) saturate(2) brightness(2.4) contrast(1.4)',
                opacity: 0.7
              }}
            >
              <source src="/src/assets/spatial-intelligence-motion.mp4" type="video/mp4" />
            </video>
          </div>
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
    </div>;
};
export default Index;