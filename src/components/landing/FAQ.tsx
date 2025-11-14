import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is virtual staging different from physical staging?",
    answer: "Virtual staging uses AI to digitally furnish empty rooms, while physical staging requires renting and placing actual furniture. Virtual staging costs 90% less than traditional staging ($29-149/month vs $2,000-5,000 per home), delivers staged homes in 24 hours instead of weeks, and allows unlimited style changes without the hassle of moving furniture. Perfect for real estate agents who need fast, affordable staging solutions."
  },
  {
    question: "What furniture styles are available?",
    answer: "Our virtual staging software offers unlimited furniture style options including modern, traditional, contemporary, minimalist, luxury, farmhouse, industrial, Scandinavian, and more. Each style is designed to appeal to home buyers and showcase your real estate photos in the best light. You can even create custom styles with your own prompts."
  },
  {
    question: "How quickly will I receive my staged photos?",
    answer: "Most staged images are delivered within seconds to minutes! Our AI-powered virtual staging platform processes photos instantly across all plans. Much faster than traditional physical staging that takes 7-14 days."
  },
  {
    question: "How does AI virtual staging work?",
    answer: "Upload a photo of an empty room, and our AI analyzes the space's dimensions, lighting, and style. It then generates professionally staged furniture and decor that perfectly fits the room, creating photorealistic images in seconds."
  },
  {
    question: "Can virtual staging help attract more home buyers?",
    answer: "Absolutely! Studies show that staged homes sell 73% faster and for 3-5% more than empty properties. Virtual staging helps home buyers visualize themselves living in the space, making your real estate listings more appealing and memorable. Our photorealistic staged images showcase the full potential of every room."
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept JPG, PNG, and HEIC files from any real estate photographer. For best results, we recommend high-resolution images (at least 1920x1080 pixels) taken with good lighting."
  },
  {
    question: "Can I customize the staging style?",
    answer: "Yes! All plans include editing tools to choose from various design styles (modern, traditional, minimalist, luxury, contemporary, etc.). Professional and Enterprise plans offer advanced editing capabilities and custom branding options."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee from the date of your initial purchase. If you are not satisfied with our service, simply contact us at support@thelandrymethod.com within 30 days and we will process your refund. If you used any credits during this period, the value of those credits will be deducted from your refund amount."
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
  // FAQ component with SEO-optimized schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
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
