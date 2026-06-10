import { NextRequest } from 'next/server';

/**
 * Escapes HTML characters to prevent XSS / script injection attacks.
 */
export function sanitizeInput(value: string): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Extracts the real client IP address from request headers.
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for might contain a list of comma-separated proxy IPs. The first is the client's.
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;

  // Netlify-specific client IP header
  const netlifyIp = req.headers.get('x-nf-client-connection-ip');
  if (netlifyIp) return netlifyIp;

  return '127.0.0.1'; // Fallback
}
