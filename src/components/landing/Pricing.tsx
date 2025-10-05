import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "Perfect for agents just getting started",
    features: [
      "10 uploads per month",
      "HD quality images",
      "24-hour turnaround",
      "Email support",
      "Basic editing tools"
    ],
    popular: false
  },
  {
    name: "Professional",
    monthlyPrice: 79,
    yearlyPrice: 790,
    description: "For active real estate professionals",
    features: [
      "50 uploads per month",
      "Ultra HD quality images",
      "12-hour turnaround",
      "Priority support",
      "Advanced editing tools",
      "Bulk upload",
      "Custom branding"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    description: "For agencies and high-volume users",
    features: [
      "Unlimited uploads",
      "4K quality images",
      "2-hour turnaround",
      "Dedicated support",
      "Full editing suite",
      "API access",
      "White-label solution",
      "Team collaboration"
    ],
    popular: false
  }
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include our AI-powered staging.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!isYearly ? 'font-bold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-primary rounded-full transition-colors"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  isYearly ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'font-bold' : 'text-muted-foreground'}`}>
              Yearly
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                Save 17%
              </span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative transition-all hover:shadow-xl ${
                plan.popular ? 'border-primary shadow-[var(--shadow-card)] scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link to="/auth" className="w-full">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
