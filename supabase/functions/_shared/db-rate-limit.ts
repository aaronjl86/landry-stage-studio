import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Database-backed rate limiting that persists across edge function restarts
 * and works with horizontal scaling
 */
export async function checkDatabaseRateLimit(
  supabase: SupabaseClient,
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): Promise<RateLimitResult> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMs);

  try {
    // Try to get existing bucket
    const { data: bucket, error: fetchError } = await supabase
      .from("rate_limit_buckets")
      .select("*")
      .eq("identifier", identifier)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // Error other than "not found"
      throw fetchError;
    }

    // If bucket doesn't exist or window expired, create/reset
    if (!bucket || new Date(bucket.window_start) < windowStart) {
      const { data: newBucket, error: upsertError } = await supabase
        .from("rate_limit_buckets")
        .upsert(
          {
            identifier,
            count: 1,
            window_start: now.toISOString(),
          },
          {
            onConflict: "identifier",
          }
        )
        .select()
        .single();

      if (upsertError) throw upsertError;

      const resetTime = new Date(now.getTime() + windowMs).getTime();
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime,
      };
    }

    // Check if limit exceeded
    if (bucket.count >= maxRequests) {
      const resetTime = new Date(
        new Date(bucket.window_start).getTime() + windowMs
      ).getTime();
      return {
        allowed: false,
        remaining: 0,
        resetTime,
      };
    }

    // Increment counter
    const { error: updateError } = await supabase
      .from("rate_limit_buckets")
      .update({ count: bucket.count + 1 })
      .eq("identifier", identifier);

    if (updateError) throw updateError;

    const resetTime = new Date(
      new Date(bucket.window_start).getTime() + windowMs
    ).getTime();

    return {
      allowed: true,
      remaining: maxRequests - (bucket.count + 1),
      resetTime,
    };
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // Fail open - allow the request if rate limiting fails
    return {
      allowed: true,
      remaining: maxRequests,
      resetTime: now.getTime() + windowMs,
    };
  }
}
