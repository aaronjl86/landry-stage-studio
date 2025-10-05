import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { corsHeaders } from "../_shared/cors.ts";
import { validateJWT } from "../_shared/jwt-utils.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";
import { logger } from "../_shared/structured-logger.ts";

serve(async (req) => {
  const correlationId = crypto.randomUUID();

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logger.info("edit-photo request started", { correlationId });

    // Validate JWT
    const { userId, error: authError } = await validateJWT(req.headers.get("Authorization"));
    if (!userId) {
      logger.warn("Authentication failed", { correlationId, error: authError });
      return new Response(JSON.stringify({ error: authError }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Rate limiting
    const rateLimitResult = checkRateLimit(userId, 10, 60000);
    if (!rateLimitResult.allowed) {
      logger.warn("Rate limit exceeded", { correlationId, userId });
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded", 
          resetTime: rateLimitResult.resetTime 
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const { prompt, imageData, mimeType } = await req.json();

    // Validate input
    if (!prompt || !imageData || !mimeType) {
      logger.warn("Invalid input", { correlationId, userId, hasPrompt: !!prompt, hasImage: !!imageData });
      return new Response(
        JSON.stringify({ error: "Missing required fields: prompt, imageData, mimeType" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate image size (max 10MB base64)
    if (imageData.length > 10 * 1024 * 1024 * 1.37) {
      return new Response(
        JSON.stringify({ error: "Image too large. Max 10MB." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Generate unique reference for idempotency
    const ref = `edit_${userId}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Consume credits
    logger.info("Consuming credits", { correlationId, userId, amount: 1 });
    const { data: creditResult, error: creditError } = await supabase.rpc("credits_consume", {
      _user_id: userId,
      _amount: 1,
      _ref: ref,
      _service: "edit-photo",
    });

    if (creditError || !creditResult?.success) {
      logger.error("Credit consumption failed", { 
        correlationId, 
        userId, 
        error: creditError?.message || creditResult?.error 
      });
      return new Response(
        JSON.stringify({ 
          error: creditResult?.error || "Failed to consume credits",
          remaining: creditResult?.remaining 
        }),
        {
          status: creditResult?.error === "Insufficient credits" ? 402 : 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    logger.info("Credits consumed successfully", { 
      correlationId, 
      userId, 
      remaining: creditResult.remaining 
    });

    // Call Google Gemini API
    const GOOGLE_AI_API_KEY = Deno.env.get("GOOGLE_AI_API_KEY");
    if (!GOOGLE_AI_API_KEY) {
      throw new Error("GOOGLE_AI_API_KEY not configured");
    }

    logger.info("Calling Google Gemini API", { correlationId, userId });

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GOOGLE_AI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: imageData.replace(/^data:image\/\w+;base64,/, ""),
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      logger.error("Gemini API error", { 
        correlationId, 
        userId, 
        status: geminiResponse.status, 
        error: errorText 
      });

      // Refund credits on API failure
      await supabase.rpc("credits_refund", {
        _user_id: userId,
        _amount: 1,
        _ref: `refund_${ref}`,
        _original_ref: ref,
        _service: "edit-photo",
      });

      return new Response(
        JSON.stringify({ error: "AI processing failed", details: errorText }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const geminiData = await geminiResponse.json();
    
    // Extract image from response
    const candidate = geminiData.candidates?.[0];
    const content = candidate?.content?.parts?.[0];
    
    if (!content?.inline_data?.data) {
      logger.error("No image in Gemini response", { correlationId, userId });
      
      // Refund credits
      await supabase.rpc("credits_refund", {
        _user_id: userId,
        _amount: 1,
        _ref: `refund_${ref}`,
        _original_ref: ref,
        _service: "edit-photo",
      });

      return new Response(
        JSON.stringify({ error: "No edited image returned from AI" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const editedImageData = content.inline_data.data;
    const editedMimeType = content.inline_data.mime_type || "image/png";

    logger.info("Image editing successful", { correlationId, userId });

    return new Response(
      JSON.stringify({
        success: true,
        editedImageData: `data:${editedMimeType};base64,${editedImageData}`,
        remaining: creditResult.remaining,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    logger.error("Unhandled error in edit-photo", { 
      correlationId, 
      error: error?.message || String(error), 
      stack: error?.stack 
    });

    return new Response(
      JSON.stringify({ error: "Internal server error", correlationId }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
