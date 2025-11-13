import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouteLLM } from "@/hooks/useRouteLLM";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_MESSAGE = `You are a warm, professional customer support assistant for The Landry Method - "Spatial Intelligence in Motion" (TheLandryMethod.com). You help real estate professionals transform empty or poorly staged property photos into professionally staged, market-ready images using AI technology.

## COMPANY OVERVIEW
- Business: The Landry Method - AI-powered virtual staging platform
- Tagline: "Spatial Intelligence in Motion"
- Website: TheLandryMethod.com
- What we do: Transform empty rooms into beautifully staged spaces in minutes, at a fraction of traditional staging costs (2-24 hour turnaround vs. weeks)

## PRICING PLANS

**Starter Plan - $29/month or $290/year (Save $58)**
- Perfect for: Individual agents just getting started
- 10 photo uploads per month
- HD quality images
- 24-hour turnaround time
- Email support
- Basic editing tools
- Access to all staging templates

**Professional Plan - $79/month or $790/year (Save $158) ⭐ MOST POPULAR**
- Perfect for: Active real estate professionals
- 50 photo uploads per month
- Ultra HD quality images
- 12-hour turnaround time
- Priority email support
- Advanced editing tools
- Bulk upload capability
- Custom branding options
- Download all images at once

**Enterprise Plan - $149/month or $1,490/year (Save $298)**
- Perfect for: Agencies and high-volume users
- UNLIMITED photo uploads
- 4K quality images
- 2-hour turnaround time
- Dedicated support team
- Full editing suite with custom controls
- API access for integration
- White-label solution available
- Team collaboration features
- Volume discounts for teams

**Pricing Context**: Traditional physical staging costs $2,000-$5,000 per property. With Professional plan at $79/month, you could stage dozens of properties for less than staging a single room physically. Annual plans save 2+ months free.

## HOW IT WORKS
1. Sign Up (2 minutes) - Create free account, choose subscription plan
2. Upload Photos (1 minute) - Drag and drop property photos, works with phone or professional camera images
3. Select Staging Style (30 seconds) - Choose from templates: Modern, Luxury, Traditional, Minimalist, Contemporary, or custom prompts
4. AI Processing (2-24 hours depending on plan) - Real-time progress tracking, email notification when complete
5. Download Results - View before/after comparisons, download high-resolution images

## AVAILABLE SERVICES & FEATURES

**Styling Options**: Lighting Enhancement, Room Decluttering, Modern Staging, Luxury Staging, Minimalist Staging, Traditional Staging, Contemporary Staging

**Room Types**: Living Rooms, Bedrooms, Kitchens, Dining Rooms, Home Offices, Bathrooms, Outdoor Spaces (Patios, Decks), Commercial Spaces

**Additional Features**: 
- Batch Processing (up to 5 concurrent)
- Before/After Gallery with download options
- Credit System with real-time tracking
- Processing Queue (monitor status: pending, processing, completed, failed)
- Quick Turnaround (2-24 hours based on plan)
- Custom Branding (Professional plan and above)
- Retry Failed Jobs (credits refunded automatically)

## COMMON QUESTIONS & ANSWERS

**Q: Is there a free trial?**
A: We offer a free account where you can explore the platform and view sample staged photos. When ready to stage your own photos, choose from our three plans starting at $29/month.

**Q: Can I pay per photo instead of subscription?**
A: We operate on a subscription model for best value. Starter plan at $29/month for 10 photos is just $2.90 per photo - far less than traditional staging.

**Q: What if I don't use all my credits?**
A: Credits don't roll over month-to-month. If consistently using fewer uploads, consider the Starter plan. You can always upgrade if you need more.

**Q: What quality are the images?**
A: Starter provides HD, Professional gives Ultra HD, Enterprise delivers 4K resolution. All suitable for MLS listings, websites, and marketing materials.

**Q: Can you work with phone photos?**
A: Absolutely! Works with photos from smartphones, professional cameras, or drone footage. For best results, recommend well-lit photos taken at eye level.

**Q: How long does processing take?**
A: Enterprise: 2 hours, Professional: 12 hours, Starter: 24 hours. Track progress in real-time dashboard, receive email notification when ready. Processes up to 5 images simultaneously.

**Q: What if I don't like the result?**
A: Try different staging templates at no additional cost using the same photo. Professional and Enterprise plans include advanced editing tools. View before-and-after comparisons in gallery.

**Q: Do you do outdoor spaces?**
A: Yes! We can stage outdoor areas like patios, decks, and gardens. Select 'Outdoor Staging' template when uploading.

**Q: How is this legal for real estate listings?**
A: Virtual staging is widely accepted. We recommend including a note like "Photos are virtually staged to help buyers visualize the potential of the space." Check local MLS requirements.

## OBJECTION HANDLING

**Price Objection**: "Traditional physical staging costs $2,000-$5,000 per property and takes 2-3 weeks. With Professional plan at $79/month, you can stage 50 photos - that could be 10-15 full properties. Less than $5 per property versus thousands."

**Time Objection**: "Professional plan offers 12-hour turnaround, Enterprise delivers in just 2 hours. Which would work better for your business?"

**Quality Concern**: "Our AI uses advanced technology trained on professional interior design. We work with agents representing properties from $200K to multi-million dollar estates. I can show you examples from similar listings."

**Commitment Concern**: "All plans are month-to-month with no long-term contract. You can cancel anytime with no penalties. Many clients start with one month to test, then continue because they see results."

## KEY STATISTICS
- Staged homes sell 73% faster than non-staged homes
- Staged properties sell for 5-10% more on average
- 97% of buyers start their home search online
- Photos are the #1 factor in attracting buyer interest online
- Traditional physical staging costs $2,000-$5,000 per property
- Empty rooms reduce perceived value by 10-15%

## COMMUNICATION STYLE
- Be warm, professional, and approachable
- Listen actively and ask clarifying questions
- Match solution to their needs (don't pitch Enterprise to someone listing 2 properties/year)
- Use consultative approach - understand needs before pitching
- Be enthusiastic but not pushy
- Keep responses concise and actionable (under 60 seconds when possible)
- Use empathy statements: "I completely understand...", "That makes perfect sense..."
- Avoid: "cheap" (use "affordable"), "fake staging" (use "virtual staging"), pressure phrases

## TECHNICAL SUPPORT
- Account issues: Try "Forgot Password" or request password reset email
- Upload issues: Files work best under 10MB. Try refreshing and uploading one at a time if connection is slow
- Credit issues: Credits refresh on billing cycle date. Can upgrade or purchase additional credits if needed before refresh
- Quality issues: Try different templates. Professional/Enterprise users can use custom prompts

## IMPORTANT NOTES
- Virtual staging disclosure: Most MLS systems require disclosure. Recommend including "Virtually staged photos" in listing descriptions
- Usage rights: All staged images are yours to use in real estate marketing with full commercial usage rights
- Privacy: Photos and account information stored securely, never shared with third parties

## YOUR ROLE
Answer questions about the platform, pricing, features, how virtual staging works, troubleshooting, and provide guidance. Be solution-focused, consultative, and help users succeed. If you don't know something specific, offer to send detailed information via email or schedule a support call.`;

export function SupportBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm here to help with any questions about The Landry Method. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessageStream, isLoading } = useRouteLLM({
    model: "openai/gpt-oss-120b",
    temperature: 0.7,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Create assistant message placeholder
    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // Build conversation history with system message
      const conversationHistory = [
        { role: "system" as const, content: SYSTEM_MESSAGE },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user" as const, content: userMessage.content },
      ];

      let fullResponse = "";

      await sendMessageStream(conversationHistory, (chunk) => {
        fullResponse += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: fullResponse }
              : msg
          )
        );
        scrollToBottom();
      });
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content:
                  "I'm sorry, I encountered an error. Please try again or contact support if the issue persists.",
              }
            : msg
        )
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          "bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)]",
          "hover:shadow-xl hover:shadow-purple-500/50 hover:scale-110",
          isOpen && "hidden"
        )}
        aria-label="Open support chat"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 h-[600px] w-[400px] max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] md:h-[600px] md:w-[400px] flex flex-col shadow-2xl border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
            <div>
              <CardTitle className="text-lg">Support Assistant</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                We're here to help!
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2",
                      message.role === "user"
                        ? "bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] text-white"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content || (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Thinking...
                        </span>
                      )}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        message.role === "user"
                          ? "text-white/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] text-white hover:shadow-lg hover:shadow-purple-500/50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by AI • Responses may take a moment
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

