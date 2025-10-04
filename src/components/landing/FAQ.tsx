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
    answer: "Most rooms are staged within seconds. Turnaround times vary by plan: Starter (24 hours), Professional (12 hours), and Enterprise (2 hours). However, the AI processing itself is nearly instant."
  },
  {
    question: "Can I customize the staging style?",
    answer: "Yes! Professional and Enterprise plans include advanced editing tools that let you choose from various design styles (modern, traditional, minimalist, etc.) and adjust furniture placement."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact our support team for a full refund, no questions asked."
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

export const FAQ = () => {
  return (
    <section className="py-24 bg-secondary/30">
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
