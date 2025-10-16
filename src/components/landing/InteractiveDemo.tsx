import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Upload, Wand2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const examplePrompts = ["Modern minimalist living room with Scandinavian furniture, natural light, and indoor plants", "Luxurious master bedroom with king-size bed, elegant chandelier, and spa-like bathroom view", "Cozy family room with comfortable sectional, fireplace, and rustic farmhouse style", "Contemporary home office with standing desk, ergonomic chair, and tech-savvy workspace"];
const differentiators = [{
  title: "Your Images",
  description: "Upload any property photo",
  icon: Upload
}, {
  title: "Your Prompts",
  description: "Describe your exact vision",
  icon: Wand2
}, {
  title: "Your Results",
  description: "Get photorealistic staging in seconds",
  icon: Sparkles
}];
export const InteractiveDemo = () => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const handleExampleClick = (index: number, prompt: string) => {
    setSelectedExample(index);
    setCustomPrompt(prompt);
  };
  return <section className="py-12 md:py-20 lg:py-28" style={{
    backgroundColor: '#36eee0'
  }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center space-y-4 md:space-y-6 mb-10 md:mb-16">
          <Badge className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] text-white hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300">
            ⚡ Unmatched Customization
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto px-2">
            The Only Self-Serve Platform Where{" "}
            <span className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent">
              YOU Control Everything
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground font-semibold max-w-3xl mx-auto px-2">
            Unlike other virtual staging services, you don't wait for designers or settle for preset templates. 
            Upload your photos and describe your exact vision—as detailed or simple as you want.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {differentiators.map(item => {
          const Icon = item.icon;
          return <Card key={item.title} className="p-4 sm:p-6 text-center bg-white backdrop-blur border-2 hover:border-primary/50 transition-all">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-purple-500/30">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-base sm:text-lg md:text-xl text-foreground font-medium">{item.description}</p>
              </Card>;
        })}
        </div>

        {/* Interactive Prompt Demo */}
        <Card className="p-4 sm:p-6 md:p-8 lg:p-12 bg-card shadow-2xl">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center space-y-2 mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Try It Yourself</h3>
              <p className="text-base sm:text-lg md:text-xl text-foreground font-medium px-2">
                See how easy it is to create custom staging descriptions. Write anything you want!
              </p>
            </div>

            {/* Example Prompts */}
            <div className="space-y-3">
              <label className="text-sm sm:text-base md:text-lg font-semibold block px-1">
                Click an example or write your own custom prompt:
              </label>
              <div className="grid gap-2 sm:gap-3">
                {examplePrompts.map((prompt, index) => <Button key={index} variant={selectedExample === index ? "default" : "outline"} className="justify-start text-left h-auto py-2.5 sm:py-3 px-3 sm:px-4 whitespace-normal" onClick={() => handleExampleClick(index, prompt)}>
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 flex-shrink-0 mt-0.5 text-[hsl(265,65%,55%)]" />
                    <span className="text-sm sm:text-base md:text-lg leading-snug">{prompt}</span>
                  </Button>)}
              </div>
            </div>

            {/* Custom Prompt Input */}
            <div className="space-y-3">
              <label className="text-sm sm:text-base md:text-lg font-semibold block px-1">
                Or write your completely custom prompt:
              </label>
              <Textarea value={customPrompt} onChange={e => {
              setCustomPrompt(e.target.value);
              setSelectedExample(null);
            }} placeholder="Describe your vision... Be as detailed or as simple as you like. Modern, traditional, luxury, cozy, minimalist—whatever style you want. Mention furniture, colors, lighting, artwork, plants, anything!" className="min-h-[100px] sm:min-h-[120px] text-base sm:text-lg md:text-xl resize-none" />
              <p className="text-sm sm:text-base md:text-lg text-foreground/80 font-medium px-1">
                {customPrompt.length} characters • No limits on creativity
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4 sm:pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-base sm:text-lg md:text-xl mb-1">Ready to stage your own properties?</p>
                  <p className="text-sm sm:text-base md:text-lg text-foreground/80 font-medium">
                    Start with 3 free uploads • No credit card required
                  </p>
                </div>
                <Link to="/auth">
                  <Button size="lg" className="group whitespace-nowrap w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Comparison Table */}
        <div className="mt-8 sm:mt-10 md:mt-12 max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 px-2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
              Why Choose The Landry Method?
            </h3>
            <p className="text-foreground font-semibold text-sm sm:text-base md:text-lg">
              See how we compare to traditional virtual staging services
            </p>
          </div>
          
          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b-2 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
                    <th className="text-center p-2 md:p-3 font-bold text-sm md:text-base w-1/3">
                      Feature
                    </th>
                    <th className="text-center p-2 md:p-3 font-bold text-sm md:text-base w-1/3">
                      Traditional
                    </th>
                    <th className="text-center p-2 md:p-3 font-bold text-sm md:text-base w-1/3">
                      <span className="text-[hsl(265,65%,55%)]">The Landry Method</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      emoji: "⚡",
                      feature: "Turnaround Time",
                      traditional: "24-48 hours",
                      landry: "Instant (seconds)"
                    },
                    {
                      emoji: "🎨",
                      feature: "Design Control",
                      traditional: "Limited templates",
                      landry: "Full customization"
                    },
                    {
                      emoji: "🔄",
                      feature: "Revisions",
                      traditional: "Extra cost",
                      landry: "Unlimited"
                    },
                    {
                      emoji: "✨",
                      feature: "Creative Freedom",
                      traditional: "Preset options",
                      landry: "Describe anything"
                    },
                    {
                      emoji: "💰",
                      feature: "Cost per Image",
                      traditional: "$29-$99",
                      landry: "From $2.90"
                    },
                    {
                      emoji: "📦",
                      feature: "Batch Processing",
                      traditional: "Manual, slow",
                      landry: "15 images at once"
                    },
                    {
                      emoji: "🎯",
                      feature: "Quality",
                      traditional: "Variable",
                      landry: "AI-powered HD/4K"
                    },
                    {
                      emoji: "💬",
                      feature: "Support",
                      traditional: "Email only",
                      landry: "Priority + Dedicated"
                    }
                  ].map((row, index) => (
                    <tr 
                      key={index} 
                      className="border-b hover:bg-muted/30 transition-colors animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="p-2 md:p-3 text-center text-xs md:text-sm">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-base">{row.emoji}</span>
                          <span className="font-semibold">{row.feature}</span>
                        </div>
                      </td>
                      <td className="p-2 md:p-3 text-center text-xs md:text-sm">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-destructive text-base">✗</span>
                          <span className="text-muted-foreground">{row.traditional}</span>
                        </div>
                      </td>
                      <td className="p-2 md:p-3 text-center bg-primary/5 text-xs md:text-sm">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-[hsl(265,65%,55%)] text-base font-bold">✓</span>
                          <span className="font-semibold text-[hsl(265,65%,55%)]">{row.landry}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Bottom CTA */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-t-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                <div className="text-center md:text-left">
                  <p className="font-bold text-base md:text-lg mb-1">
                    Experience the difference yourself
                  </p>
                  <p className="text-xs md:text-sm text-foreground/90 font-medium">
                    Start with 3 free uploads • No credit card required
                  </p>
                </div>
                <Link to="/auth" className="w-full sm:w-auto">
                  <Button size="lg" className="group whitespace-nowrap shadow-lg w-full sm:w-auto">
                    Try Free Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>;
};