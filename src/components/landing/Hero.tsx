import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import beforeRoomAvif from "@/assets/before-empty-room.avif";
import beforeRoomWebp from "@/assets/before-empty-room.webp";
import beforeRoomJpg from "@/assets/before-empty-room.jpg";
import afterRoomAvif from "@/assets/after-staged-room.avif";
import afterRoomWebp from "@/assets/after-staged-room.webp";
import afterRoomJpg from "@/assets/after-staged-room.jpg";
export const Hero = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };
  return <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12" style={{
    backgroundColor: '#36eee0'
  }} aria-label="AI-Powered Virtual Staging Hero">
      {/* GPU-Accelerated Background - CSS only, no JS animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-400/20 to-cyan-500/20 animated-bg" data-decorative="true" />
      
      {/* Simplified decorative circles - GPU composited */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl blob" data-decorative="true" />
      <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-3xl blob" data-decorative="true" />
      
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
              <span className="block text-gray-900 drop-shadow-lg">AI-powered virtual staging that brings your vision and your listings to life in seconds</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              The <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-extrabold">ONLY</span> self-serve platform where <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-bold">YOU control the design</span>. Upload photos, describe your vision, and watch AI create stunning staged homes in seconds. No expensive physical staging, no waiting weeks—just professional results that help properties sell faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button size="lg" className="group text-2xl px-12 py-8 bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-110 font-bold">
                  Start Free Trial
                  <ArrowRight className="ml-3 h-7 w-7 transition-transform group-hover:translate-x-2" />
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-300 hover:scale-[1.02] transform will-change-transform">
              {/* Before Image - Empty Room (Left side) */}
              <img 
                src="/cdn-cgi/image/width=1200,quality=85,format=auto/assets/before-empty-room.jpg" 
                alt="Empty living room before virtual staging" 
                className="absolute inset-0 w-full h-full object-cover scale-110" 
                width="1200" 
                height="900" 
                loading="eager" 
                decoding="async" 
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 640px" 
                {...{fetchpriority: 'high'} as any} 
              />

              {/* After Image - Staged Room (Right side, revealed by slider) */}
              <div className="absolute inset-0" style={{
              clipPath: `inset(0 0 0 ${sliderPosition}%)`
            }}>
                <img 
                  src="/cdn-cgi/image/width=1200,quality=85,format=auto/assets/after-staged-room.jpg" 
                  alt="Professionally staged living room with modern design" 
                  className="w-full h-full object-cover scale-110" 
                  width="1200" 
                  height="900" 
                  loading="lazy" 
                  decoding="async" 
                  sizes="(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 640px" 
                />
              </div>

              {/* Slider */}
              <div className="absolute inset-0 flex items-center">
                <input type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} className="absolute w-full h-full opacity-0 cursor-ew-resize z-10" aria-label="Before and after comparison slider" />
                
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