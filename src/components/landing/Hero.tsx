import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import emptyRoom from "@/assets/before-empty-room.jpg";
import stagedRoom from "@/assets/after-staged-room.jpg";

export const Hero = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      {/* Animated Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/30 opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            <div className="inline-block mb-4">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
                ✨ AI-Powered Virtual Staging
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="block text-foreground drop-shadow-sm">Stage Any Space</span>
              <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Exactly How You Envision It
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The only self-serve platform where <span className="text-primary font-bold">YOU control the design</span>. Upload your photos, write custom prompts, and get photorealistic staging in seconds—not days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button size="lg" className="group text-xl px-10 py-7 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/dashboard/gallery">
                <Button size="lg" variant="outline" className="text-xl px-10 py-7 border-2 hover:bg-primary/10 hover:border-primary transition-all duration-300">
                  View Examples
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div>✓ 3 Free Uploads</div>
              <div>✓ Unlimited Creative Freedom</div>
              <div>✓ Instant Results</div>
            </div>
          </div>

          {/* Before/After Slider */}
          <div className="relative animate-scale-in">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-300 hover:scale-[1.02] transform">
              {/* Before Image */}
              <img
                src={stagedRoom}
                alt="Empty room before staging"
                className="absolute inset-0 w-full h-full object-cover scale-110"
              />

              {/* After Image with clip-path */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <img
                  src={emptyRoom}
                  alt="Professionally staged room"
                  className="w-full h-full object-cover scale-110"
                />
              </div>

              {/* Slider */}
              <div className="absolute inset-0 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="absolute w-full h-full opacity-0 cursor-ew-resize z-10"
                />
                
                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Slider Handle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <div className="flex gap-1">
                      <div className="w-0.5 h-4 bg-primary" />
                      <div className="w-0.5 h-4 bg-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                Before
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                After
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
