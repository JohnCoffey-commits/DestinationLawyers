/**
 * Used by metadata (metadataBase, OG URLs) so links resolve to the real host,
 * not a placeholder domain — fixes wrong favicon / social preview URLs.
 *
 * Set in production: NEXT_PUBLIC_SITE_URL=https://your-domain.com
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit.endsWith("/") ? explicit.slice(0, -1) : explicit);
    } catch {
      /* ignore */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}
