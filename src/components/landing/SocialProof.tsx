import { Star, Users, TrendingUp, Award } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { useState, useEffect, useRef } from "react";
// WebP versions
import redOakRealtyWebP from "@/assets/logos/red-oak-realty-opt.webp";
import austinRealEstateWebP from "@/assets/logos/austin-real-estate-opt.webp";
import kellerWilliamsWebP from "@/assets/logos/keller-williams-opt.webp";
import leggettRealEstateWebP from "@/assets/logos/leggett-real-estate-opt.webp";
import johnTaylorWebP from "@/assets/logos/john-taylor-opt.webp";

// PNG fallbacks
import redOakRealtyPNG from "@/assets/logos/red-oak-realty-opt.png";
import austinRealEstatePNG from "@/assets/logos/austin-real-estate-opt.png";
import kellerWilliamsPNG from "@/assets/logos/keller-williams-opt.png";
import leggettRealEstatePNG from "@/assets/logos/leggett-real-estate-opt.png";
import johnTaylorPNG from "@/assets/logos/john-taylor-opt.png";
import sarahJohnson from "@/assets/testimonials/sarah-johnson-opt.webp";
import michaelChen from "@/assets/testimonials/michael-chen-opt.webp";
import emmaWilliams from "@/assets/testimonials/emma-williams-opt.webp";
import davidMartinez from "@/assets/testimonials/david-martinez-opt.webp";
import jenniferLee from "@/assets/testimonials/jennifer-lee-opt.webp";
import robertAnderson from "@/assets/testimonials/robert-anderson-opt.webp";
export const SocialProof = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showMarquee, setShowMarquee] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMarquee(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (marqueeRef.current) {
      observer.observe(marqueeRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const stats = [{
    icon: Users,
    value: "10,000+",
    label: "Properties Staged"
  }, {
    icon: Star,
    value: "4.9/5",
    label: "Average Rating"
  }, {
    icon: TrendingUp,
    value: "73%",
    label: "Faster Sales"
  }, {
    icon: Award,
    value: "98%",
    label: "Customer Satisfaction"
  }];
  const testimonials = [{
    name: "Sarah Johnson",
    role: "Real Estate Agent",
    text: "This AI staging tool has completely transformed how I present properties. My listings sell 73% faster now!",
    rating: 5,
    image: sarahJohnson
  }, {
    name: "Michael Chen",
    role: "Property Developer",
    text: "The quality is incredible and it saves me thousands on traditional staging. Highly recommended!",
    rating: 5,
    image: michaelChen
  }, {
    name: "Emma Williams",
    role: "Broker",
    text: "Game changer for my business. The before/after transformations are absolutely stunning.",
    rating: 5,
    image: emmaWilliams
  }, {
    name: "David Martinez",
    role: "Luxury Agent",
    text: "My clients are consistently impressed with the staging quality. It's like having a professional stager on demand!",
    rating: 5,
    image: davidMartinez
  }, {
    name: "Jennifer Lee",
    role: "Real Estate Team Leader",
    text: "We've staged over 200 properties with this tool. The ROI is incredible and our team loves how easy it is.",
    rating: 5,
    image: jenniferLee
  }, {
    name: "Robert Anderson",
    role: "Investment Property Manager",
    text: "Perfect for our rental portfolio. Quick turnaround and beautiful results every single time.",
    rating: 5,
    image: robertAnderson
  }];
  return <div className="space-y-2">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, idx) => <div key={idx} className={`bg-card border-4 rounded-lg p-2 text-center hover:border-primary/70 transition-colors py-2 border-primary/40 ${idx < 2 ? 'mt-4' : ''}`}>
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] mx-auto mb-2 flex items-center justify-center shadow-lg shadow-purple-500/40">
              <stat.icon className="h-8 w-8 text-white stroke-[2.5]" />
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-lg text-muted-foreground font-bold">{stat.label}</div>
          </div>)}
      </div>

      {/* Testimonials */}
      <div className="space-y-2">
        <h3 className="font-semibold text-center mb-2 py-8 text-5xl">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {(isMobile ? testimonials.slice(0, 3) : testimonials).map((testimonial, idx) => <div key={idx} className="bg-card border-4 rounded-lg p-2 hover:border-primary/50 transition-colors border-primary/40 text-center">
              <img 
                src={testimonial.image} 
                alt={`${testimonial.name} - ${testimonial.role}`}
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-primary/30"
                width="80"
                height="80"
                loading="lazy"
                decoding="async"
              />
              <div className="flex gap-1 mb-2 justify-center">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-fade-in hover:scale-110 transition-transform" style={{
              animationDelay: `${i * 0.1}s`
            }} />)}
              </div>
              <p className="text-base mb-2 italic font-bold">"{testimonial.text}"</p>
              <div className="text-base">
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-muted-foreground font-bold">{testimonial.role}</div>
              </div>
            </div>)}
        </div>
      </div>

      {/* Trust Badges */}
      <div ref={marqueeRef} className="bg-muted/30 rounded-lg p-6 text-center overflow-hidden">
        <div className="text-5xl font-semibold mb-4 rounded-none">Trusted By</div>
        {showMarquee && (
          <Marquee pauseOnHover className="py-6 [--gap:4rem] rounded-xl">
          <div className="relative h-28 w-48 flex items-center justify-center">
            <picture>
              <source srcSet={redOakRealtyWebP} type="image/webp" />
              <img 
                src={redOakRealtyPNG} 
                alt="Red Oak Realty" 
                className="h-full w-full object-contain" 
                width="192" 
                height="112" 
                loading="lazy" 
                decoding="async"
              />
            </picture>
          </div>
          <div className="relative h-28 w-48 flex items-center justify-center">
            <picture>
              <source srcSet={austinRealEstateWebP} type="image/webp" />
              <img 
                src={austinRealEstatePNG} 
                alt="Austin Real Estate Experts" 
                className="h-full w-full object-contain" 
                width="192" 
                height="112" 
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <div className="relative h-28 w-48 flex items-center justify-center">
            <picture>
              <source srcSet={kellerWilliamsWebP} type="image/webp" />
              <img 
                src={kellerWilliamsPNG} 
                alt="Keller Williams" 
                className="h-full w-full object-contain" 
                width="192" 
                height="112" 
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <div className="relative h-28 w-48 flex items-center justify-center">
            <picture>
              <source srcSet={leggettRealEstateWebP} type="image/webp" />
              <img 
                src={leggettRealEstatePNG} 
                alt="Leggett International Real Estate" 
                className="h-full w-full object-contain" 
                width="192" 
                height="112" 
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <div className="relative h-28 w-48 flex items-center justify-center">
            <picture>
              <source srcSet={johnTaylorWebP} type="image/webp" />
              <img 
                src={johnTaylorPNG} 
                alt="John Taylor Luxury Real Estate" 
                className="h-full w-full object-contain" 
                width="192" 
                height="112" 
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </Marquee>
        )}
      </div>
    </div>;
};