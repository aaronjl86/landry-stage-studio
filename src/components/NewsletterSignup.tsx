import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" })
    .optional(),
  smsConsent: z.boolean().optional(),
  marketingConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive marketing communications to subscribe",
  }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface NewsletterSignupProps {
  variant?: "default" | "compact";
  showFirstName?: boolean;
}

export function NewsletterSignup({ variant = "default", showFirstName = false }: NewsletterSignupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      smsConsent: false,
      marketingConsent: false,
    },
  });

  async function onSubmit(data: NewsletterFormValues) {
    setIsSubmitting(true);
    
    try {
      // Prepare submission data
      const submissionData = {
        email: data.email,
        firstName: data.firstName || "",
        smsConsent: data.smsConsent || false,
        marketingConsent: data.marketingConsent,
        source: "newsletter_signup",
        timestamp: new Date().toISOString(),
      };

      // Send to GoHighLevel webhook (if configured)
      const gohighlevelWebhook = import.meta.env.VITE_GOHIGHLEVEL_WEBHOOK_URL;
      if (gohighlevelWebhook) {
        try {
          await fetch(gohighlevelWebhook, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
          });
        } catch (error) {
          console.error("GoHighLevel webhook error:", error);
          // Continue with other integrations even if this fails
        }
      }

      // Send to Beehiiv API (if configured)
      const beehiivApiKey = import.meta.env.VITE_BEEHIIV_API_KEY;
      const beehiivPublicationId = import.meta.env.VITE_BEEHIIV_PUBLICATION_ID;
      if (beehiivApiKey && beehiivPublicationId) {
        try {
          await fetch(`https://api.beehiiv.com/v2/publications/${beehiivPublicationId}/subscriptions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${beehiivApiKey}`,
            },
            body: JSON.stringify({
              email: data.email,
              reactivate_existing: false,
              send_welcome_email: true,
              custom_fields: {
                first_name: data.firstName || "",
                sms_consent: data.smsConsent || false,
              },
            }),
          });
        } catch (error) {
          console.error("Beehiiv API error:", error);
          // Continue even if this fails
        }
      }

      // Also save to Supabase for backup/analytics
      try {
        await supabase.from("newsletter_subscriptions").insert({
          email: data.email,
          first_name: data.firstName || null,
          sms_consent: data.smsConsent || false,
          marketing_consent: data.marketingConsent,
          source: "website",
          subscribed_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Database save error:", error);
        // Don't fail the whole submission if database save fails
      }

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter. Check your email for a confirmation.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us at support@thelandrymethod.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (variant === "compact") {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {showFirstName && (
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marketingConsent"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    id="marketingConsent"
                    className="mt-0.5"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="marketingConsent" className="text-sm font-normal cursor-pointer">
                    I agree to receive marketing communications, including newsletters and updates, from The Landry Method LLC. I can unsubscribe at any time by clicking the link in emails or contacting support@thelandrymethod.com. I have read and agree to the <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="smsConsent"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    id="smsConsent"
                    className="mt-0.5"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="smsConsent" className="text-sm font-normal cursor-pointer">
                    <strong>Optional - SMS/Text Message Consent:</strong> I also consent to receive text messages from The Landry Method LLC. Message frequency may vary. Message and data rates may apply. I can cancel at any time by replying "STOP". For help, reply "HELP". Carriers are not liable for delayed or undelivered messages.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

