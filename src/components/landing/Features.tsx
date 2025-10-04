import { Zap, Image, Clock, Shield, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "AI-powered staging in seconds, not days. Get your listings market-ready instantly."
  },
  {
    icon: Image,
    title: "Photorealistic Quality",
    description: "High-definition, professional-quality images that look like real staged rooms."
  },
  {
    icon: Clock,
    title: "Save Time & Money",
    description: "No more expensive physical staging. Virtual staging costs 97% less than traditional methods."
  },
  {
    icon: Shield,
    title: "Commercial Rights",
    description: "Full usage rights for all images. Use them anywhere in your marketing materials."
  },
  {
    icon: Users,
    title: "Multiple Styles",
    description: "Choose from modern, traditional, minimalist, and more to match your target audience."
  },
  {
    icon: TrendingUp,
    title: "Sell Faster",
    description: "Staged homes sell 73% faster and for 3-5% more than empty properties."
  }
];

export const Features = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose The Landry Method?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create stunning property listings that sell faster
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
