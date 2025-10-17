import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does AI virtual staging work?",
    answer: "Upload a photo of an empty room, and our AI analyzes the space's dimensions, lighting, and style. It then generates professionally staged furniture and decor that perfectly fits the room, creating photorealistic images in seconds."
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept JPG, PNG, and HEIC files. For best results, we recommend high-resolution images (at least 1920x1080 pixels) taken with good lighting."
  },
  {
    question: "How long does it take to stage a room?",
    answer: "AI processing typically completes within seconds! Batch uploads may take a few minutes depending on queue volume. All plans include instant AI processing. Support response times vary by tier: Starter (24h), Professional (12h), Enterprise (2h)."
  },
  {
    question: "Can I customize the staging style?",
    answer: "Yes! All plans include editing tools to choose from various design styles (modern, traditional, minimalist, luxury, contemporary, etc.). Professional and Enterprise plans offer advanced editing capabilities and custom branding options."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee from your initial purchase date. If you're not satisfied with our service, contact support@thelandrymethod.com for a refund. Credits used during the trial period will be deducted from your refund amount."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely! You can cancel your subscription at any time from your dashboard. Your access will continue until the end of your current billing period."
  },
  {
    question: "Is there a limit to file size?",
    answer: "Files up to 50MB are supported. For larger files or batch processing, please contact our Enterprise team for custom solutions."
  },
  {
    question: "Do you provide commercial usage rights?",
    answer: "Yes! All staged images come with full commercial usage rights. You can use them in listings, marketing materials, and any promotional content."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about The Landry Method
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-lg px-6 border-0 shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
