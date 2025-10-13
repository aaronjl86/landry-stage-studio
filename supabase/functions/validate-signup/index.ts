import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { corsHeaders } from "../_shared/cors.ts";
import { logger } from "../_shared/structured-logger.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, deviceFingerprint } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Get IP from request headers
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
               req.headers.get("x-real-ip") || 
               "0.0.0.0";
    
    const userAgent = req.headers.get("user-agent") || "unknown";

    logger.info("Validating signup", { email, ip, hasFingerprint: !!deviceFingerprint });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check for abuse patterns using our database function
    const { data: abuseCheck, error: abuseError } = await supabase.rpc("check_signup_abuse", {
      _email: email,
      _ip: ip,
      _device_fingerprint: deviceFingerprint || null
    });

    if (abuseError) {
      logger.error("Abuse check failed", { error: abuseError });
      throw abuseError;
    }

    logger.info("Abuse check completed", { 
      allowed: abuseCheck.allowed, 
      risk_score: abuseCheck.risk_score 
    });

    // Log signup attempt to tracking table
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
      logger.warn("Failed to log signup attempt", { error: logError });
      // Continue anyway - logging failure shouldn't block signup
    }

    return new Response(
      JSON.stringify({
        allowed: abuseCheck.allowed,
        risk_score: abuseCheck.risk_score,
        requires_verification: abuseCheck.requires_verification,
        message: abuseCheck.reason,
        flags: abuseCheck.flags
      }),
      {
        status: abuseCheck.allowed ? 200 : 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error: any) {
    logger.error("Validation error", { error: error.message, stack: error.stack });
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
