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

    // TEMPORARILY DISABLED FOR TESTING - Credits consumption bypassed
    logger.info("Credits check bypassed for testing", { correlationId, userId });
    const creditResult = { success: true, remaining: 999 }; // Mock response for testing

    // Call Lovable AI Gateway with Gemini image editing model
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    logger.info("Calling Lovable AI Gateway for image editing", { correlationId, userId });

    // Add strict instruction to preserve room structure
    const enhancedPrompt = `MANDATORY ARCHITECTURAL PRESERVATION RULES:
1. DO NOT ALTER OR MODIFY ANY STRUCTURAL ELEMENTS
2. KEEP ALL WINDOWS EXACTLY AS THEY ARE - do not cover, remove, or replace windows
3. KEEP ALL WALLS EXACTLY AS THEY ARE - do not add, remove, or change wall positions
4. KEEP ALL DOORS EXACTLY AS THEY ARE - preserve all door locations and types
5. KEEP THE FLOOR EXACTLY AS IT IS - do not change flooring material or color
6. KEEP THE CEILING EXACTLY AS IT IS - preserve ceiling height and features
7. PRESERVE ALL ARCHITECTURAL DETAILS - moldings, trim, built-ins, fixtures

ONLY MODIFY: furniture placement, furniture style, decorative items, and styling elements.

Task: ${prompt}

REMINDER: The room structure must remain 100% unchanged. Only stage/furnish the space.`;

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: enhancedPrompt
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType};base64,${imageData.replace(/^data:image\/\w+;base64,/, "")}`
                  }
                }
              ]
            }
          ],
          modalities: ["image", "text"]
        }),
      }
    );

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      logger.error("AI Gateway error", { 
        correlationId, 
        userId, 
        status: aiResponse.status, 
        error: errorText 
      });

      return new Response(
        JSON.stringify({ error: "AI processing failed", details: errorText }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const aiData = await aiResponse.json();
    
    // Extract image from response
    const editedImageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!editedImageUrl) {
      logger.error("No image in AI response", { correlationId, userId, response: JSON.stringify(aiData) });

      return new Response(
        JSON.stringify({ error: "No edited image returned from AI" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    logger.info("Image editing successful", { correlationId, userId });

    return new Response(
      JSON.stringify({
        success: true,
        editedImageData: editedImageUrl,
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
