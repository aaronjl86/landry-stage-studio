import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

export async function validateJWT(authHeader: string | null): Promise<{ userId: string | null; error?: string }> {
  if (!authHeader) {
    return { userId: null, error: "No authorization header provided" };
  }

  const token = authHeader.replace("Bearer ", "");
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const { data, error } = await supabaseClient.auth.getUser(token);
  
  if (error || !data.user) {
    return { userId: null, error: "Invalid or expired token" };
  }

  return { userId: data.user.id };
}
