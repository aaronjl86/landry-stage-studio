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

    // TEMPORARY: Credit consumption disabled for testing
    // logger.info("Consuming credits", { correlationId, userId, amount: 1 });
    // const { data: creditResult, error: creditError } = await supabase.rpc("credits_consume", {
    //   _user_id: userId,
    //   _amount: 1,
    //   _ref: ref,
    //   _service: "edit-photo",
    // });

    // if (creditError || !creditResult?.success) {
    //   logger.warn("Credit consumption failed", { correlationId, userId, error: creditError, result: creditResult });
    //   return new Response(
    //     JSON.stringify({ 
    //       error: creditResult?.error || "Failed to consume credits",
    //       remaining: creditResult?.remaining 
    //     }),
    //     {
    //       status: 402,
    //       headers: { ...corsHeaders, "Content-Type": "application/json" },
    //     }
    //   );
    // }

    // Mock credit result for testing
    const creditResult = { success: true, remaining: 999 };

    // Call Lovable AI Gateway with Gemini image editing model
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    logger.info("Calling Lovable AI Gateway for image editing", { correlationId, userId });

    // Add STRICT architectural preservation guardrails
    const enhancedPrompt = `CRITICAL ARCHITECTURAL PRESERVATION REQUIREMENTS - ABSOLUTE COMPLIANCE MANDATORY:

⛔ FORBIDDEN MODIFICATIONS (NEVER ALLOWED):
- DO NOT add, remove, relocate, resize, or alter ANY windows
- DO NOT add, remove, move, or change ANY walls or wall positions
- DO NOT add, remove, move, or change ANY doors or doorways
- DO NOT modify room dimensions, ceiling height, or floor plan layout
- DO NOT change structural elements: beams, columns, built-ins, moldings, trim
- DO NOT alter permanent fixtures: light fixtures, outlets, vents, radiators
- DO NOT modify flooring material or type (hardwood, tile, carpet pattern/texture)
- DO NOT change ceiling features or architectural details
- DO NOT add or remove archways, alcoves, or structural openings
- DO NOT alter window views or what is visible through windows

✅ ALLOWED MODIFICATIONS ONLY:
- Add, remove, or rearrange furniture (sofas, tables, chairs, beds, etc.)
- Add or remove decorative items (art, plants, lamps, accessories)
- Change wall paint colors (surface color only, not texture or material)
- Add or change area rugs on top of existing flooring
- Adjust lighting brightness and ambiance (not fixture placement)
- Add or remove curtains/window treatments (not windows themselves)

USER'S EDITING REQUEST: ${prompt}

⚠️ FINAL VERIFICATION: Before generating, confirm that:
1. All windows remain in their exact original positions with no modifications
2. All walls remain in their exact original positions with no structural changes
3. All doors remain in their exact original positions
4. Room dimensions and architecture are 100% preserved
5. Only furniture, decor, and styling elements have been modified

If the request asks for ANY forbidden modification, you MUST refuse and only apply the allowed changes.`;

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

      // TEMPORARY: Credit refund disabled for testing
      // await supabase.rpc("credits_refund", {
      //   _user_id: userId,
      //   _amount: 1,
      //   _ref: `refund_${ref}`,
      //   _original_ref: ref,
      //   _service: "edit-photo",
      // });
      // logger.info("Credit refunded due to AI failure", { correlationId, userId });

      return new Response(
        JSON.stringify({ error: "AI processing failed" }),
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

      // TEMPORARY: Credit refund disabled for testing
      // await supabase.rpc("credits_refund", {
      //   _user_id: userId,
      //   _amount: 1,
      //   _ref: `refund_${ref}`,
      //   _original_ref: ref,
      //   _service: "edit-photo",
      // });
      // logger.info("Credit refunded due to missing image", { correlationId, userId });

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
