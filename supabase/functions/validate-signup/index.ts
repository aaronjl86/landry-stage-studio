import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { corsHeaders } from "../_shared/cors.ts";
import { logger } from "../_shared/structured-logger.ts";
import { checkDatabaseRateLimit } from "../_shared/db-rate-limit.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, deviceFingerprint } = await req.json();
    
    // Get IP from request headers
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
               req.headers.get("x-real-ip") || 
               "127.0.0.1";
    
    const userAgent = req.headers.get("user-agent") || "unknown";

    logger.info("Validating signup attempt", { 
      email, 
      ip, 
      hasFingerprint: !!deviceFingerprint 
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Apply IP-based rate limiting (3 attempts per IP per minute)
    const rateLimitResult = await checkDatabaseRateLimit(
      supabase,
      `signup_ip_${ip}`,
      3,
      60000
    );

    if (!rateLimitResult.allowed) {
      logger.warn("Rate limit exceeded", { ip });
      return new Response(
        JSON.stringify({
          allowed: false,
          message: "Too many signup attempts. Please try again later.",
          resetTime: rateLimitResult.resetTime,
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          }
        }
      );
    }

    // Check for abuse patterns using the database function
    const { data: abuseCheck, error } = await supabase.rpc("check_signup_abuse", {
      _email: email,
      _ip: ip,
      _device_fingerprint: deviceFingerprint || null
    });

    if (error) {
      logger.error("Abuse check failed", { error: error.message });
      throw error;
    }

    logger.info("Abuse check result", { 
      allowed: abuseCheck.allowed,
      risk_score: abuseCheck.risk_score 
    });

    // Log signup attempt to track patterns
    const { error: logError } = await supabase.from("signup_attempts").insert({
      email,
      email_domain: email.split("@")[1].toLowerCase(),
      ip_address: ip,
      device_fingerprint: deviceFingerprint,
      user_agent: userAgent,
      status: abuseCheck.allowed ? "pending" : "blocked",
      risk_score: abuseCheck.risk_score,
      metadata: { flags: abuseCheck.flags }
    });

    if (logError) {
      logger.warn("Failed to log signup attempt", { error: logError.message });
    }

    return new Response(
      JSON.stringify({
        allowed: abuseCheck.allowed,
        risk_score: abuseCheck.risk_score,
        requires_verification: abuseCheck.requires_verification,
        message: abuseCheck.reason
      }),
      {
        status: abuseCheck.allowed ? 200 : 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    logger.error("Validation error", { error: error.message });
    return new Response(
      JSON.stringify({ 
        error: "Validation failed",
        message: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
