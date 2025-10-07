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
    <section className="relative min-h-[85vh] flex items-center overflow-hidden py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Empty Rooms into
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Stunning Spaces
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              AI-powered virtual staging for real estate professionals. Upload photos of empty rooms and get professionally staged images in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button size="lg" className="group text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/dashboard/gallery">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Examples
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div>✓ 3 Free Uploads</div>
              <div>✓ No Credit Card</div>
              <div>✓ Cancel Anytime</div>
            </div>
          </div>

          {/* Before/After Slider */}
          <div className="relative animate-scale-in">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
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
