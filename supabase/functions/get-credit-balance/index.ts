import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { corsHeaders } from "../_shared/cors.ts";
import { validateJWT } from "../_shared/jwt-utils.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, error: authError } = await validateJWT(req.headers.get("Authorization"));
    if (!userId) {
      return new Response(JSON.stringify({ error: authError }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get quota and used credits from profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("quota, used")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch credit balance" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get payment info from secure admin-only table
    const { data: paymentInfo, error: paymentError } = await supabase
      .from("user_payment_info")
      .select("plan_code, subscription_status, period_start, period_end")
      .eq("user_id", userId)
      .single();

    if (paymentError || !paymentInfo) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch payment information" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const remaining = profile.quota - profile.used;

    return new Response(
      JSON.stringify({
        quota: profile.quota,
        used: profile.used,
        remaining,
        plan_code: paymentInfo.plan_code,
        subscription_status: paymentInfo.subscription_status,
        period_start: paymentInfo.period_start,
        period_end: paymentInfo.period_end,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
