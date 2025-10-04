import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-living-room.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Transform Empty Rooms into
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Stunning Spaces
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              AI-powered virtual staging for real estate professionals. Upload photos of empty rooms and get professionally staged images in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button size="lg" className="group text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Examples
              </Button>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div>✓ 3 Free Uploads</div>
              <div>✓ No Credit Card</div>
              <div>✓ Cancel Anytime</div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <img
              src={heroImage}
              alt="Professionally staged living room"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
