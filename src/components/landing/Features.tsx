import { Zap, Image, Clock, Shield, Wand2, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Professional Virtual Staging Service",
    description: "Write exactly what you want to see with custom prompts. No preset templates—describe your vision in your own words and our AI-powered virtual staging software brings it to life with photorealistic results."
  },
  {
    icon: Zap,
    title: "24 Hours Turnaround Time",
    description: "Get professional staged photos in seconds, not days. Our virtual staging real estate platform delivers faster than traditional staging without waiting for designers or back-and-forth revisions."
  },
  {
    icon: Image,
    title: "Works with Any Real Estate Photographer",
    description: "Upload real estate photos from any source. High-definition, professional staged images at a fraction of the cost of physical staging—competitively priced virtual staging service for real estate agents."
  },
  {
    icon: Clock,
    title: "Self-Serve Virtual Staging Platform",
    description: "Complete control from start to finish. Upload your real estate photos, choose furniture styles, customize, and download staged homes—all on your own timeline, 24/7. No design experience needed."
  },
  {
    icon: Shield,
    title: "Unlimited Furniture Styles",
    description: "Generate as many staged images as you need. Try different furniture styles, arrangements, and details until it's perfect. From modern to traditional staging, showcase staged homes that appeal to home buyers."
  },
  {
    icon: TrendingUp,
    title: "Staged Homes Sell 73% Faster",
    description: "Staged homes sell 73% faster and for 3-5% more than empty properties. Virtual staging real estate gives you the flexibility to showcase any style to your target home buyers at a fraction of physical staging costs."
  }
];

export const Features = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why The Landry Method is Different
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Process entire properties in the time it takes to schedule a single designer call. Upload 15 photos at once, watch them transform in real-time, and have your listings market-ready before lunch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border hover:shadow-[var(--shadow-card)] transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
