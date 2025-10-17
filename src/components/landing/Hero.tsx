import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import emptyRoom from "@/assets/demo-empty-room.webp";
import stagedRoom from "@/assets/demo-bedroom.webp";
export const Hero = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };
  return <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12 bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-100">
      {/* Animated Background gradient */}
      <div className="absolute inset-0 opacity-40 animate-pulse" style={{
      backgroundColor: '#36eee0',
      animationDuration: '8s'
    }} />
      
      {/* Decorative circles - responsive sizes */}
      <div className="absolute top-10 md:top-20 -right-20 md:right-20 w-[200px] h-[200px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{
      animationDuration: '6s'
    }} />
      <div className="absolute bottom-10 md:bottom-20 -left-20 md:left-20 w-[250px] h-[250px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{
      animationDuration: '7s',
      animationDelay: '1s'
    }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] to-[hsl(265,65%,55%)] text-white px-6 py-3 rounded-full text-base font-bold shadow-lg shadow-purple-500/50">
                ✨ AI-Powered Virtual Staging
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
              <span className="block text-gray-900 drop-shadow-lg">Stage Any Space</span>
              <span className="block mt-3 bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-2xl font-extrabold">
                Exactly How You Envision It
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              The <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-extrabold">ONLY</span> self-serve platform where <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-bold">YOU control the design</span>. Upload your photos, write custom prompts, and get photorealistic staging in seconds—not days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button size="lg" className="group text-2xl px-12 py-8 bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-110 font-bold">
                  Start Free Trial
                  <ArrowRight className="ml-3 h-7 w-7 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <Link to="/public-gallery">
                
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
                alt="Empty room ready for virtual staging" 
                className="absolute inset-0 w-full h-full object-cover scale-110"
                width="800"
                height="600"
                loading="eager"
                fetchPriority="high"
              />

              {/* After Image with clip-path */}
              <div className="absolute inset-0" style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
            }}>
                <img 
                  src={emptyRoom} 
                  alt="Professionally staged room showcasing modern design" 
                  className="w-full h-full object-cover scale-110"
                  width="800"
                  height="600"
                  loading="eager"
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
                  aria-label="Before and after comparison slider"
                />
                
                {/* Slider Line */}
                <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none" style={{
                left: `${sliderPosition}%`
              }}>
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
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-opacity duration-300" style={{
              opacity: sliderPosition > 10 ? 1 : 0
            }}>
                Before
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-opacity duration-300" style={{
              opacity: sliderPosition < 90 ? 1 : 0
            }}>
                After
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};