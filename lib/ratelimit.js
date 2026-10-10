// Simple in-memory rate limiter. On serverless platforms each instance has its
// own memory, so treat this as basic abuse protection, not a hard guarantee.
const buckets = new Map();

export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return true;
  }

  entry.count += 1;
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
  }
  return entry.count <= limit;
}

export function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
