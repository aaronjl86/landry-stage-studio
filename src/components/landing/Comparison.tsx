import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Cost per Property",
    traditional: "$2,000 - $5,000",
    virtual: "$29 - $149/month unlimited",
    virtualWins: true
  },
  {
    feature: "Turnaround Time",
    traditional: "7-14 days",
    virtual: "24 hours or less",
    virtualWins: true
  },
  {
    feature: "Furniture Styles",
    traditional: "Limited by inventory",
    virtual: "Unlimited styles & variations",
    virtualWins: true
  },
  {
    feature: "Style Changes",
    traditional: "$500-1,000 per restaging",
    virtual: "Free unlimited edits",
    virtualWins: true
  },
  {
    feature: "Setup & Removal",
    traditional: "2-3 days coordination",
    virtual: "Instant - no logistics",
    virtualWins: true
  },
  {
    feature: "Storage Fees",
    traditional: "$200-500/month",
    virtual: "$0 - digital only",
    virtualWins: true
  },
  {
    feature: "Property Access Needed",
    traditional: "Yes - multiple visits",
    virtual: "No - just photos",
    virtualWins: true
  },
  {
    feature: "Works for Occupied Homes",
    traditional: "No - requires empty space",
    virtual: "Yes - virtual decluttering",
    virtualWins: true
  }
];

export const Comparison = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Virtual Staging vs Physical Staging
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See why real estate agents are switching from traditional staging to AI-powered virtual staging software. Save thousands while delivering professional staged homes faster.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-card rounded-2xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)]">
                <th className="p-6 text-left text-white font-bold text-lg">Feature</th>
                <th className="p-6 text-center text-white font-bold text-lg">Traditional Physical Staging</th>
                <th className="p-6 text-center text-white font-bold text-lg">
                  <div className="flex items-center justify-center gap-2">
                    AI Virtual Staging
                    <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-bold">WINNER</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-border ${index % 2 === 0 ? 'bg-secondary/10' : 'bg-background'}`}
                >
                  <td className="p-6 font-semibold">{row.feature}</td>
                  <td className="p-6 text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <X className="h-5 w-5 text-destructive flex-shrink-0" />
                      <span>{row.traditional}</span>
                    </div>
                  </td>
                  <td className="p-6 text-center font-semibold">
                    <div className="flex items-center justify-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">{row.virtual}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
            <div className="text-4xl font-bold text-purple-600 mb-2">90%</div>
            <p className="text-muted-foreground">Lower cost than physical staging</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <p className="text-muted-foreground">Faster turnaround than traditional staging</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
            <div className="text-4xl font-bold text-green-600 mb-2">∞</div>
            <p className="text-muted-foreground">Unlimited furniture style variations</p>
          </div>
        </div>
      </div>
    </section>
  );
};
