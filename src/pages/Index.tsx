import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { SocialProof } from "@/components/landing/SocialProof";
import { GalleryCarousel } from "@/components/landing/GalleryCarousel";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Gallery & Social Proof Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              See The Transformation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our portfolio of stunning before-and-after staging examples
            </p>
          </div>
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-start mb-8">
            <div className="flex justify-center">
              <GalleryCarousel />
            </div>
            <div>
              <SocialProof />
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      <div id="examples">
        <BeforeAfter />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      
      {/* Footer */}
      <footer className="border-t py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-muted-foreground space-y-3">
            <p className="font-medium">&copy; 2025 The Landry Method. All rights reserved.</p>
            <p className="text-sm">AI-powered virtual staging for real estate professionals</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
