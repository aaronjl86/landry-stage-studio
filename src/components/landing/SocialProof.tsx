import { Star, Users, TrendingUp, Award } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import realEstateLogos from "@/assets/real-estate-logos-transparent.png";
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
  }];
  return <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => <div key={idx} className="bg-card border rounded-lg p-4 text-center hover:border-primary/50 transition-colors py-[16px]">
            <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>)}
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center mb-4">What Our Users Say</h3>
        {testimonials.map((testimonial, idx) => <div key={idx} className="bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex gap-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-sm mb-3 italic">"{testimonial.text}"</p>
            <div className="text-sm">
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-muted-foreground">{testimonial.role}</div>
            </div>
          </div>)}
      </div>

      {/* Trust Badges */}
      <div className="bg-muted/30 rounded-lg p-4 text-center overflow-hidden">
        <div className="text-sm font-medium mb-3">Trusted By</div>
        <Marquee className="py-4" pauseOnHover>
          <div className="relative h-16 w-auto mx-8 flex items-center justify-center">
            <img
              src={realEstateLogos}
              alt="Top Real Estate Companies"
              className="h-full w-auto object-contain"
            />
          </div>
        </Marquee>
      </div>
    </div>;
};