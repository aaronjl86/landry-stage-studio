import { useEffect } from "react";
import { Header } from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Users, Zap } from "lucide-react";
import Footer4Col from "@/components/ui/footer-column";

export default function About() {
  useEffect(() => {
    document.title = "About The Landry Method | Professional Virtual Staging Service for Real Estate";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Learn how The Landry Method helps real estate agents transform empty spaces with AI-powered virtual staging. Professional results delivered quickly.');
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About The Landry Method</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Transforming real estate marketing with professional virtual staging services
            </p>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                The Landry Method is committed to transforming real estate marketing through professional 
                virtual staging services. Our mission is to help real estate professionals showcase 
                properties at their full potential while maintaining the highest standards of quality, 
                compliance, client satisfaction, and transparency in everything we do.
              </p>
              <p className="text-muted-foreground mb-6">
                We believe that every property deserves to be presented in the best possible light, and 
                we are dedicated to delivering exceptional results that help our clients succeed. Our 
                commitment extends beyond just creating beautiful images—we are committed to building 
                lasting relationships based on trust, integrity, and exceptional service.
              </p>
            </section>

            <section className="mb-12 p-8 bg-gradient-to-r from-[#FF634C]/5 to-transparent rounded-lg border-2 border-[#FF634C]/20">
              <h2 className="text-3xl font-bold mb-6 text-gray-950">What is Spatial Intelligence in Motion?</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our tagline captures the essence of what we believe virtual staging should be. It's not just about placing furniture in a photo—it's about understanding the <strong>spatial intelligence</strong> that makes a room work: how light flows, how people move through the space, and how design choices influence perception.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                <strong>In Motion</strong> represents the momentum we create for your listings. Better staged photos lead to more showings, faster sales, and happy clients. We help properties move—both visually and commercially.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every image we enhance combines strategic design with authentic Portland aesthetics. We stage properties not to trick buyers, but to help them <strong>visualize the full potential</strong> of the space. That's Spatial Intelligence in Motion.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-card rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">✨</span> Quality Excellence
                  </h3>
                  <p className="text-muted-foreground">
                    We are committed to delivering the highest quality virtual staging results. Every 
                    image is carefully reviewed and enhanced by our professional team to ensure it meets 
                    our exacting standards. We never compromise on quality, and we continuously improve 
                    our techniques and processes to deliver exceptional results.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">🛡️</span> Compliance & Integrity
                  </h3>
                  <p className="text-muted-foreground">
                    We operate with complete integrity and strict adherence to all applicable regulations 
                    and industry standards. From A2P messaging compliance to real estate disclosure 
                    requirements, we ensure our clients can use our services with confidence. We maintain 
                    transparent business practices and always act in our clients' best interests.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">❤️</span> Client Happiness
                  </h3>
                  <p className="text-muted-foreground">
                    Our clients' success and satisfaction are at the heart of everything we do. We take 
                    the time to understand your specific needs and deliver personalized service that exceeds 
                    expectations. We're not just a service provider—we're your partner in showcasing 
                    properties beautifully and effectively.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-lg border">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔍</span> Transparency
                  </h3>
                  <p className="text-muted-foreground">
                    We believe in complete transparency in our business practices, pricing, and processes. 
                    No hidden fees, no surprises—just clear communication and honest service. We provide 
                    clear information about how we handle your data, our service delivery process, and 
                    what you can expect every step of the way.
                  </p>
                </div>
              </div>
            </section>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  Make professional virtual staging accessible to every real estate professional
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Team</h3>
                <p className="text-muted-foreground">
                  Experienced staging professionals with deep real estate market knowledge
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Process</h3>
                <p className="text-muted-foreground">
                  Professional staging tools combined with expert human oversight for quality results
                </p>
              </div>
            </div>
            
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Service Approach</h2>
              <p className="text-muted-foreground mb-6">
                The Landry Method operates as a direct service provider, not a self-service platform. 
                This means every project receives personal attention and professional oversight. Here's 
                how we work:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">You Submit Your Images</h4>
                    <p className="text-sm text-muted-foreground">Provide us with the property images you want enhanced, along with your specific instructions and preferences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">We Enhance with Care</h4>
                    <p className="text-sm text-muted-foreground">Our professional team manually reviews and enhances each image according to your specifications, ensuring quality and attention to detail.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">We Deliver Your Results</h4>
                    <p className="text-sm text-muted-foreground">Receive your enhanced images via email, Slack, or your preferred delivery method, ready to use in your listings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">We Invoice for Services</h4>
                    <p className="text-sm text-muted-foreground">After delivery, we send a clear invoice for the services rendered, with transparent pricing and payment terms.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2 font-bold">✓</span>
                  <span><strong>Personal Service:</strong> Every project receives individual attention from our professional team—no automated processing</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2 font-bold">✓</span>
                  <span><strong>Quality Guaranteed:</strong> Professional-quality results that help properties sell faster and for better prices</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2 font-bold">✓</span>
                  <span><strong>Compliance Focus:</strong> We ensure all work meets real estate disclosure requirements and industry standards</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2 font-bold">✓</span>
                  <span><strong>Transparent Pricing:</strong> Clear, upfront pricing with no hidden fees or surprises</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent mr-2 font-bold">✓</span>
                  <span><strong>Client-Focused:</strong> Your success is our success—we're committed to your satisfaction</span>
                </li>
              </ul>
            </section>
            
            <div className="text-center mt-12">
              <Link to="/auth">
                <Button size="lg">Get Started Today</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer4Col />
    </div>
  );
}
