import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

// Map Stripe product IDs to credit amounts
const CREDIT_MAP: Record<string, number> = {
  // Starter plans
  'prod_TBQJMYlasGRqG': 10,  // Monthly
  'prod_TQ8JBVm1yc0yKd': 10,  // Yearly
  // Professional plans
  'prod_TQ8JKPwJmHr2': 50,  // Monthly
  'prod_TQaJRgLJma': 50,  // Yearly
  // Enterprise plans
  'prod_TDF2': 400,  // Monthly (corrected key based on context - was truncated)
  'prod_TDF2OCFGCIe': 400,  // Yearly
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');

  if (!webhookSecret) {
    logStep('ERROR: Webhook secret not configured');
    return new Response(JSON.stringify({ error: 'Webhook secret not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!signature) {
    logStep('ERROR: No signature provided');
    return new Response(JSON.stringify({ error: 'No signature provided' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.text();
    const stripe = new Stripe(stripeKey!, { apiVersion: '2025-08-27.basil' as any });
    
    logStep('Verifying webhook signature');
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    
    logStep('Webhook event received', { type: event.type, id: event.id });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle subscription events
    if (event.type === 'customer.subscription.created' || 
        event.type === 'customer.subscription.updated' || 
        event.type === 'invoice.payment_succeeded') {
      
      const subscription = event.type === 'invoice.payment_succeeded' 
        ? (event.data.object as any).lines.data[0] 
        : event.data.object;

      const customerId = event.type === 'invoice.payment_succeeded'
        ? (event.data.object as any).customer
        : subscription.customer;

      logStep('Processing subscription event', { customerId, eventType: event.type });

      // Get customer email from Stripe
      const customer = await stripe.customers.retrieve(customerId as string);
      const customerEmail = (customer as any).email;

      if (!customerEmail) {
        logStep('ERROR: No customer email found');
        return new Response(JSON.stringify({ error: 'No customer email' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      logStep('Customer email found', { email: customerEmail });

      // Get product ID from subscription
      const productId = event.type === 'invoice.payment_succeeded'
        ? (event.data.object as any).lines.data[0].price.product
        : subscription.items.data[0].price.product;

      logStep('Product ID from event', { productId });

      // Get credit amount from product ID
      const credits = CREDIT_MAP[productId];

      if (!credits) {
        logStep('WARNING: Unknown product ID', { productId });
        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Unknown product, no credits allocated' 
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      logStep('Allocating credits', { productId, credits });

      // Update user's credits in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({
          quota: credits,
          used: 0,
          updated_at: new Date().toISOString(),
        })
        .eq('email', customerEmail)
        .select();

      if (profileError) {
        logStep('ERROR: Failed to update profile', { error: profileError });
        return new Response(JSON.stringify({ error: profileError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (!profileData || profileData.length === 0) {
        logStep('ERROR: No profile found for email', { email: customerEmail });
        return new Response(JSON.stringify({ error: 'Profile not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      logStep('SUCCESS: Credits allocated', { 
        email: customerEmail, 
        credits, 
        productId 
      });

      return new Response(JSON.stringify({ 
        success: true, 
        credits,
        email: customerEmail 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // For other events, just acknowledge receipt
    logStep('Event acknowledged', { type: event.type });
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    logStep('ERROR: Webhook processing failed', { error: err.message });
    return new Response(JSON.stringify({ 
      error: 'Webhook error', 
      message: err.message 
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
