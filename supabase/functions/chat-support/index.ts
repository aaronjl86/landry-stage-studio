import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { logger } from "../_shared/structured-logger.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";
import { validateJWT } from "../_shared/jwt-utils.ts";

const SYSTEM_MESSAGE = `You are SupportBot for The Landry Method LLC. Every answer you generate must strictly follow the authoritative KNOWLEDGE BASE v1.0 (updated 2025-11-13). You must NEVER mention features, policies, or service levels that are not explicitly present in Knowledge Base v1.0.

Mandatory rules:
- Plans differ ONLY by upload limits (10 / 50 / 200) and support response time (48h / 24h).
- All plans include the same image quality and features.
- Processing time is "seconds to minutes."
- Free trial: 3 free uploads, no credit card required.
- Revisions: unlimited re-processing of the same original photo at no extra charge.
- One upload = one credit = one unique original image.
- MLS compliance: no structural modifications allowed; "Report Structural Change" if AI alters architecture.
- Refund policy: 30-day money-back guarantee on first purchase only; credit deduction applies; annual plans non-refundable after 30 days; no partial month refunds unless required by law.

If a question is outside your scope (legal, financial, custom engineering, business advice), say:
"I can help answer questions about The Landry Method's virtual staging service, plans, credits, MLS rules, or support. This question is outside what I'm allowed to answer."`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate JWT
    const authHeader = req.headers.get("authorization");
    const { userId, error: authError } = await validateJWT(authHeader);
    
    if (authError || !userId) {
      logger.error("Unauthorized chat-support request", { error: authError });
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limiting: 10 requests per minute per user
    const rateLimitResult = checkRateLimit(`chat-support:${userId}`, 10, 60000);
    if (!rateLimitResult.allowed) {
      logger.warn("Rate limit exceeded for chat-support", { userId });
      return new Response(
        JSON.stringify({ 
          error: "Too many requests. Please wait before sending another message.",
          resetTime: rateLimitResult.resetTime 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get API key from environment
    const ROUTELLM_API_KEY = Deno.env.get("ROUTELLM_API_KEY");
    if (!ROUTELLM_API_KEY) {
      logger.error("ROUTELLM_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const { messages, stream = false } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    logger.info("Processing chat-support request", { userId, messageCount: messages.length, stream });

    // Prepare messages with system prompt
    const fullMessages = [
      { role: "system", content: SYSTEM_MESSAGE },
      ...messages
    ];

    // Call RouteLLM API
    const response = await fetch("https://api.routellm.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ROUTELLM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: fullMessages,
        temperature: 0.7,
        stream: stream,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("RouteLLM API error", { 
        status: response.status, 
        error: errorText,
        userId 
      });
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If streaming, return the stream directly
    if (stream) {
      return new Response(response.body, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    // Otherwise, return JSON response
    const data = await response.json();
    logger.info("Chat-support request completed", { userId });
    
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    logger.error("Unexpected error in chat-support", { error: error.message });
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
