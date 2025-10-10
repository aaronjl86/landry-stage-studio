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

        {/* Comparison Callout */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Other Virtual Staging Services</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Send photos and wait 24-48 hours for results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Choose from limited preset design templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>No control over specific details or styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Pay per revision or redesign request</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">The Landry Method</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="font-medium">Instant results in seconds, not days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="font-medium">Unlimited creative freedom with custom prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="font-medium">Control every detail—from furniture to lighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="font-medium">Generate as many variations as you need</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
