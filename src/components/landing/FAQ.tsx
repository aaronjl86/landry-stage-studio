import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Everything you need to know about our AI virtual staging service
          </p>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                How does AI virtual staging work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our AI analyzes your empty room photos and intelligently furnishes them with realistic, professionally styled furniture and decor. Simply upload your photos, choose a style, and get staged images in seconds.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                What photo quality do I need?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For best results, use well-lit photos taken with a wide-angle lens. The room should be empty or minimally furnished. Higher resolution images (at least 1080p) will produce better staging results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                How quickly will I receive my staged photos?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most photos are processed within seconds to a few minutes. Processing time may vary based on image complexity and current system load.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Can I request revisions?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! You can reprocess any image with different style preferences. Each subscription plan includes unlimited revisions at no extra cost.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                What file formats are supported?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We support JPG, JPEG, PNG, and WEBP image formats. Maximum file size is 10MB per image.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Do I own the rights to staged images?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! You retain full commercial rights to all staged images generated through our platform. Use them in your listings, marketing materials, and anywhere else you need.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Can I cancel my subscription anytime?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely. You can cancel your subscription at any time from your account dashboard. You'll retain access until the end of your current billing period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                What happens to unused credits?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Unused monthly credits do not roll over to the next month. We recommend choosing a plan that matches your typical monthly usage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
