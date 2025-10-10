import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Upload, Wand2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const examplePrompts = [
  "Modern minimalist living room with Scandinavian furniture, natural light, and indoor plants",
  "Luxurious master bedroom with king-size bed, elegant chandelier, and spa-like bathroom view",
  "Cozy family room with comfortable sectional, fireplace, and rustic farmhouse style",
  "Contemporary home office with standing desk, ergonomic chair, and tech-savvy workspace",
];

const differentiators = [
  {
    title: "Your Images",
    description: "Upload any property photo",
    icon: Upload,
  },
  {
    title: "Your Prompts",
    description: "Describe your exact vision",
    icon: Wand2,
  },
  {
    title: "Your Results",
    description: "Get photorealistic staging in seconds",
    icon: Sparkles,
  },
];

export const InteractiveDemo = () => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const handleExampleClick = (index: number, prompt: string) => {
    setSelectedExample(index);
    setCustomPrompt(prompt);
  };

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge className="text-sm px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary/20">
            ⚡ Unmatched Customization
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">
            The Only Self-Serve Platform Where{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              YOU Control Everything
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlike other virtual staging services, you don't wait for designers or settle for preset templates. 
            Upload your photos and describe your exact vision—as detailed or simple as you want.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="p-6 text-center bg-card/50 backdrop-blur border-2 hover:border-primary/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Interactive Prompt Demo */}
        <Card className="p-8 md:p-12 bg-card shadow-2xl">
          <div className="space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h3 className="text-2xl font-bold">Try It Yourself</h3>
              <p className="text-muted-foreground">
                See how easy it is to create custom staging descriptions. Write anything you want!
              </p>
            </div>

            {/* Example Prompts */}
            <div className="space-y-3">
              <label className="text-sm font-semibold block">
                Click an example or write your own custom prompt:
              </label>
              <div className="grid gap-3">
                {examplePrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant={selectedExample === index ? "default" : "outline"}
                    className="justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleExampleClick(index, prompt)}
                  >
                    <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Prompt Input */}
            <div className="space-y-3">
              <label className="text-sm font-semibold block">
                Or write your completely custom prompt:
              </label>
              <Textarea
                value={customPrompt}
                onChange={(e) => {
                  setCustomPrompt(e.target.value);
                  setSelectedExample(null);
                }}
                placeholder="Describe your vision... Be as detailed or as simple as you like. Modern, traditional, luxury, cozy, minimalist—whatever style you want. Mention furniture, colors, lighting, artwork, plants, anything!"
                className="min-h-[120px] text-base resize-none"
              />
              <p className="text-sm text-muted-foreground">
                {customPrompt.length} characters • No limits on creativity
              </p>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-center sm:text-left">
                  <p className="font-semibold mb-1">Ready to stage your own properties?</p>
                  <p className="text-sm text-muted-foreground">
                    Start with 3 free uploads • No credit card required
                  </p>
                </div>
                <Link to="/auth">
                  <Button size="lg" className="group whitespace-nowrap">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Comparison Table */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-3">
              Why Choose The Landry Method?
            </h3>
            <p className="text-muted-foreground text-lg">
              See how we compare to traditional virtual staging services
            </p>
          </div>
          
          <Card className="overflow-hidden border-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-4 md:p-6 bg-muted/30 font-bold text-lg md:text-xl w-1/3">
                      Feature
                    </th>
                    <th className="text-center p-4 md:p-6 bg-muted/30 font-bold text-lg md:text-xl w-1/3">
                      <span className="text-muted-foreground">Traditional Services</span>
                    </th>
                    <th className="text-center p-4 md:p-6 bg-primary/10 font-bold text-lg md:text-xl w-1/3">
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        The Landry Method
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Turnaround Time",
                      traditional: "24-48 hours",
                      landry: "Instant (seconds)",
                      isGood: true,
                    },
                    {
                      feature: "Design Control",
                      traditional: "Limited templates",
                      landry: "Full customization",
                      isGood: true,
                    },
                    {
                      feature: "Revisions",
                      traditional: "Extra cost per change",
                      landry: "Unlimited variations",
                      isGood: true,
                    },
                    {
                      feature: "Creative Freedom",
                      traditional: "Preset options only",
                      landry: "Describe any vision",
                      isGood: true,
                    },
                    {
                      feature: "Cost per Image",
                      traditional: "$29-$99 each",
                      landry: "From $2.90 each",
                      isGood: true,
                    },
                    {
                      feature: "Batch Processing",
                      traditional: "Manual, slow",
                      landry: "15 images at once",
                      isGood: true,
                    },
                    {
                      feature: "Quality",
                      traditional: "Designer dependent",
                      landry: "AI-powered HD/4K",
                      isGood: true,
                    },
                    {
                      feature: "Support",
                      traditional: "Email only",
                      landry: "Priority + Dedicated",
                      isGood: true,
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-muted/20 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="p-4 md:p-6 font-semibold text-sm md:text-base">
                        {row.feature}
                      </td>
                      <td className="p-4 md:p-6 text-center text-muted-foreground text-sm md:text-base">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-destructive text-xl">✗</span>
                          <span>{row.traditional}</span>
                        </div>
                      </td>
                      <td className="p-4 md:p-6 text-center bg-primary/5 text-sm md:text-base">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-primary text-xl font-bold">✓</span>
                          <span className="font-semibold text-primary">{row.landry}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Bottom CTA */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-t-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="font-bold text-lg mb-1">
                    Experience the difference yourself
                  </p>
                  <p className="text-muted-foreground">
                    Start with 3 free uploads • No credit card required
                  </p>
                </div>
                <Link to="/auth">
                  <Button size="lg" className="group whitespace-nowrap shadow-lg">
                    Try Free Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
