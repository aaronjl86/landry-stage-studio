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

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("quota, used, plan_code, subscription_status, period_start, period_end")
      .eq("id", userId)
      .single();

    if (error || !profile) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch credit balance" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const remaining = profile.quota - profile.used;

    return new Response(
      JSON.stringify({
        quota: profile.quota,
        used: profile.used,
        remaining,
        plan_code: profile.plan_code,
        subscription_status: profile.subscription_status,
        period_start: profile.period_start,
        period_end: profile.period_end,
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
