import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { corsHeaders } from "../_shared/cors.ts";
import { validateJWT } from "../_shared/jwt-utils.ts";
import { checkRateLimit } from "../_shared/rate-limit.ts";
import { logger } from "../_shared/structured-logger.ts";
import { verifyPromptIntegrity, injectRuleSignature } from "../_shared/prompt-integrity.ts";
import { getArchitecturalPrompt } from "../_shared/architectural-rule.ts";
import { validateArchitecturalIntegrity } from "../_shared/image-validator.ts";

serve(async (req) => {
  const correlationId = crypto.randomUUID();

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logger.info("edit-photo request started", { correlationId });

    // Phase 4: Pre-flight integrity check
    const isPromptValid = await verifyPromptIntegrity();
    if (!isPromptValid) {
      logger.error("CRITICAL: Architectural rule hash mismatch!", { correlationId });
      throw new Error("System integrity violation: Architectural rule modified");
    }

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
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate prompt length and sanitize (prevent injection attacks)
    // Allow longer prompts since we add system instructions
    if (prompt.length > 4000) {
      logger.warn("Prompt too long", { correlationId, userId, length: prompt.length });
      return new Response(
        JSON.stringify({ error: "Prompt must be 4000 characters or less" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Sanitize prompt: remove newlines and excessive whitespace
    const sanitizedPrompt = prompt
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

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

    // Check if user is admin
    const { data: adminData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    const isAdmin = !!adminData;
    logger.info("Admin status checked", { correlationId, userId, isAdmin });

    // Generate unique reference for idempotency
    const ref = `edit_${userId}_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    let creditResult;
    
    if (!isAdmin) {
      // Consume credits for non-admin users
      logger.info("Consuming credits", { correlationId, userId, amount: 1 });
      const { data, error: creditError } = await supabase.rpc("credits_consume", {
        _user_id: userId,
        _amount: 1,
        _ref: ref,
        _service: "edit-photo",
      });

      if (creditError || !data?.success) {
        logger.warn("Credit consumption failed", { correlationId, userId, error: creditError, result: data });
        return new Response(
          JSON.stringify({ 
            error: data?.error || "Failed to consume credits",
            remaining: data?.remaining 
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      creditResult = data;
    } else {
      // Admin bypass - unlimited credits
      logger.info("Admin user - bypassing credit check", { correlationId, userId });
      creditResult = { success: true, remaining: 999999 };
    }

    // Call Lovable AI Gateway with Gemini image editing model
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    logger.info("Calling Lovable AI Gateway for image editing", { correlationId, userId });

    // Phase 1: Use immutable architectural rule with signature injection
    const enhancedPrompt = injectRuleSignature(
      getArchitecturalPrompt(sanitizedPrompt)
    );

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

      // Refund credits due to AI failure (skip for admins)
      if (!isAdmin) {
        await supabase.rpc("credits_refund", {
          _user_id: userId,
          _amount: 1,
          _ref: `refund_${ref}`,
          _original_ref: ref,
          _service: "edit-photo",
        });
        logger.info("Credit refunded due to AI failure", { correlationId, userId });
      }

      return new Response(
        JSON.stringify({ error: "Processing failed. Please try again." }),
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

      // Refund credits due to missing image (skip for admins)
      if (!isAdmin) {
        await supabase.rpc("credits_refund", {
          _user_id: userId,
          _amount: 1,
          _ref: `refund_${ref}`,
          _original_ref: ref,
          _service: "edit-photo",
        });
        logger.info("Credit refunded due to missing image", { correlationId, userId });
      }

      return new Response(
        JSON.stringify({ error: "Processing failed. Please try again." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Phase 2: Validate architectural integrity
    logger.info("Validating architectural integrity", { correlationId, userId });
    const validation = await validateArchitecturalIntegrity(imageData, editedImageUrl);
    
    if (!validation.valid) {
      logger.warn("Architectural integrity violation detected", {
        correlationId,
        userId,
        similarityScore: validation.similarityScore,
        reason: validation.reason
      });
      
      // Log violation to database for analysis
      try {
        await supabase.from("architectural_violations").insert({
          user_id: userId,
          original_image_url: `data:${mimeType};base64,${imageData.substring(0, 100)}...`, // Truncated for storage
          edited_image_url: editedImageUrl.substring(0, 100) + "...", // Truncated
          user_prompt: sanitizedPrompt,
          ssim_score: validation.similarityScore,
          violation_reason: validation.reason,
          reported_by_user: false
        });
      } catch (dbError) {
        logger.error("Failed to log violation", { correlationId, error: dbError });
        // Continue even if logging fails
      }
      
      // Refund credit and reject output (skip for admins)
      if (!isAdmin) {
        await supabase.rpc("credits_refund", {
          _user_id: userId,
          _amount: 1,
          _ref: `refund_${ref}`,
          _original_ref: ref,
          _service: "edit-photo",
        });
        logger.info("Credit refunded due to integrity violation", { correlationId, userId });
      }
      
      return new Response(
        JSON.stringify({
          success: false,
          error: "Image processing resulted in structural changes. Credit refunded. Please try again with different instructions."
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 422 }
      );
    }
    
    logger.info("Architectural integrity validated successfully", {
      correlationId,
      userId,
      similarityScore: validation.similarityScore
    });

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
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
