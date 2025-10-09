import { Zap, Image, Clock, Shield, Wand2, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Custom Prompts",
    description: "Write exactly what you want to see. No preset templates—describe your vision in your own words and our AI brings it to life."
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get photorealistic staging in seconds, not days. No waiting for designers or back-and-forth revisions."
  },
  {
    icon: Image,
    title: "Photorealistic Quality",
    description: "High-definition, professional images at a fraction of the cost of physical staging—competitively priced with other virtual services."
  },
  {
    icon: Clock,
    title: "Self-Serve Platform",
    description: "Complete control from start to finish. Upload, customize, and download—all on your own timeline, 24/7."
  },
  {
    icon: Shield,
    title: "Unlimited Creativity",
    description: "Generate as many variations as you need. Try different styles, furniture arrangements, and details until it's perfect."
  },
  {
    icon: TrendingUp,
    title: "Sell Faster",
    description: "Staged homes sell 73% faster and for 3-5% more. Now with the flexibility to showcase any style to your target buyers."
  }
];

export const Features = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why The Landry Method is Different
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The only platform that gives you complete creative control with custom prompts, instant results, and photorealistic quality—all at competitive pricing
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
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
