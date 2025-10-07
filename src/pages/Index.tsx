import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { SocialProof } from "@/components/landing/SocialProof";
import { GalleryCarousel } from "@/components/landing/GalleryCarousel";
import Footer4Col from "@/components/ui/footer-column";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Gallery & Social Proof Section */}
      <section className="bg-transparent">
        <div className="mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              See The Transformation
            </h2>
          </div>
          <GalleryCarousel />
          <SocialProof />
        </div>
      </section>
      
      <Features />
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
