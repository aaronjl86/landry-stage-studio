import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export const Hero = () => {
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
              <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] to-[hsl(265,65%,55%)] text-white px-6 py-3 rounded-full text-xs font-bold shadow-lg shadow-purple-500/50">
                ✨ Stage Properties in Seconds, Not Weeks
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              <span className="block text-gray-900 drop-shadow-lg">AI-powered <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent">virtual staging</span> that brings <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent">your</span> vision and <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent">your</span> listings to life in <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent">seconds</span></span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              The <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-extrabold">ONLY</span> self-serve platform where <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-bold">YOU control the design</span>. Upload photos, describe your vision, and watch AI create stunning staged homes in <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-bold">seconds</span>. No expensive physical staging, no waiting weeks—just <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-bold">professional results</span> that help properties sell <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent font-bold">faster</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button size="lg" className="group text-base px-8 py-6 bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-110 font-bold">
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

          {/* Right Column - Simple Visual */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-2xl">✨</span>
                  <span className="text-sm font-medium">AI-Powered Staging</span>
                </div>
                <p className="text-muted-foreground max-w-md mx-auto">
                  See the full before & after transformation below
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};