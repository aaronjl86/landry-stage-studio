interface RateLimitBucket {
  count: number;
  resetTime: number;
}

const buckets = new Map<string, RateLimitBucket>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  let bucket = buckets.get(identifier);

  // Reset bucket if window expired
  if (!bucket || now > bucket.resetTime) {
    bucket = {
      count: 0,
      resetTime: now + windowMs,
    };
    buckets.set(identifier, bucket);
  }

  // Check if limit exceeded
  if (bucket.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: bucket.resetTime,
    };
  }

  // Increment counter
  bucket.count++;
  return {
    allowed: true,
    remaining: maxRequests - bucket.count,
    resetTime: bucket.resetTime,
  };
}

// Clean up old buckets periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets.entries()) {
    if (now > bucket.resetTime) {
      buckets.delete(key);
    }
  }
}, 60000);
