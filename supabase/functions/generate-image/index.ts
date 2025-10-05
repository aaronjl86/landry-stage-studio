import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { corsHeaders } from "../_shared/cors.ts";
import { validateJWT } from "../_shared/jwt-utils.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";
import { logger } from "../_shared/structured-logger.ts";

serve(async (req) => {
  const correlationId = crypto.randomUUID();

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logger.info("generate-image request started", { correlationId });

    const { userId, error: authError } = await validateJWT(req.headers.get("Authorization"));
    if (!userId) {
      return new Response(JSON.stringify({ error: authError }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rateLimitResult = checkRateLimit(userId, 10, 60000);
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded", resetTime: rateLimitResult.resetTime }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { prompt } = await req.json();

    if (!prompt || prompt.length > 32000) {
      return new Response(
        JSON.stringify({ error: "Invalid prompt. Must be between 1-32000 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const ref = `generate_${userId}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const { data: creditResult, error: creditError } = await supabase.rpc("credits_consume", {
      _user_id: userId,
      _amount: 1,
      _ref: ref,
      _service: "generate-image",
    });

    if (creditError || !creditResult?.success) {
      return new Response(
        JSON.stringify({ error: creditResult?.error || "Failed to consume credits" }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GOOGLE_AI_API_KEY = Deno.env.get("GOOGLE_AI_API_KEY");
    if (!GOOGLE_AI_API_KEY) {
      throw new Error("GOOGLE_AI_API_KEY not configured");
    }

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GOOGLE_AI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      await supabase.rpc("credits_refund", {
        _user_id: userId,
        _amount: 1,
        _ref: `refund_${ref}`,
        _original_ref: ref,
        _service: "generate-image",
      });

      const errorText = await geminiResponse.text();
      return new Response(
        JSON.stringify({ error: "AI generation failed", details: errorText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiResponse.json();
    const imageData = geminiData.candidates?.[0]?.content?.parts?.[0]?.inline_data?.data;

    if (!imageData) {
      await supabase.rpc("credits_refund", {
        _user_id: userId,
        _amount: 1,
        _ref: `refund_${ref}`,
        _original_ref: ref,
        _service: "generate-image",
      });

      return new Response(
        JSON.stringify({ error: "No image generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    logger.info("Image generation successful", { correlationId, userId });

    return new Response(
      JSON.stringify({
        success: true,
        imageData: `data:image/png;base64,${imageData}`,
        remaining: creditResult.remaining,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    logger.error("Error in generate-image", { correlationId, error: error?.message || String(error) });
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
