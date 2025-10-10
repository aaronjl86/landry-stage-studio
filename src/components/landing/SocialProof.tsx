import { Star, Users, TrendingUp, Award } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import redOakRealty from "@/assets/logos/red-oak-realty.png";
import austinRealEstate from "@/assets/logos/austin-real-estate.png";
import kellerWilliams from "@/assets/logos/keller-williams-new.png";
import leggettRealEstate from "@/assets/logos/leggett-real-estate.png";
import johnTaylor from "@/assets/logos/john-taylor.png";
export const SocialProof = () => {
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
    rating: 5
  }, {
    name: "Michael Chen",
    role: "Property Developer",
    text: "The quality is incredible and it saves me thousands on traditional staging. Highly recommended!",
    rating: 5
  }, {
    name: "Emma Williams",
    role: "Broker",
    text: "Game changer for my business. The before/after transformations are absolutely stunning.",
    rating: 5
  }, {
    name: "David Martinez",
    role: "Luxury Agent",
    text: "My clients are consistently impressed with the staging quality. It's like having a professional stager on demand!",
    rating: 5
  }, {
    name: "Jennifer Lee",
    role: "Real Estate Team Leader",
    text: "We've staged over 200 properties with this tool. The ROI is incredible and our team loves how easy it is.",
    rating: 5
  }, {
    name: "Robert Anderson",
    role: "Investment Property Manager",
    text: "Perfect for our rental portfolio. Quick turnaround and beautiful results every single time.",
    rating: 5
  }];
  return <div className="space-y-2">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, idx) => <div key={idx} className="bg-card border-2 rounded-lg p-2 text-center hover:border-primary/50 transition-colors py-2">
            <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>)}
      </div>

      {/* Testimonials */}
      <div className="space-y-2">
        <h3 className="text-3xl font-semibold text-center mb-2 py-8">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {testimonials.map((testimonial, idx) => <div key={idx} className="bg-card border rounded-lg p-2 hover:border-primary/50 transition-colors">
              <div className="flex gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm mb-2 italic">"{testimonial.text}"</p>
              <div className="text-sm">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>)}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-muted/30 rounded-lg p-6 text-center overflow-hidden">
        <div className="text-2xl font-semibold mb-4">Trusted By</div>
        <Marquee className="py-6" pauseOnHover>
          <div className="relative h-24 w-auto mx-8 flex items-center justify-center">
            <img
              src={redOakRealty}
              alt="Red Oak Realty"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="relative h-24 w-auto mx-8 flex items-center justify-center">
            <img
              src={austinRealEstate}
              alt="Austin Real Estate Experts"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="relative h-24 w-auto mx-8 flex items-center justify-center">
            <img
              src={kellerWilliams}
              alt="Keller Williams"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="relative h-24 w-auto mx-8 flex items-center justify-center">
            <img
              src={leggettRealEstate}
              alt="Leggett International Real Estate"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="relative h-24 w-auto mx-8 flex items-center justify-center">
            <img
              src={johnTaylor}
              alt="John Taylor Luxury Real Estate"
              className="h-full w-auto object-contain"
            />
          </div>
        </Marquee>
      </div>
    </div>;
};