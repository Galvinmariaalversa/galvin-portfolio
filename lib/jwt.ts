const encoder = new TextEncoder();

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function base64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64urlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

/**
 * Signs a payload using HMAC SHA-256 and returns a JWT token.
 * Valid for 24 hours.
 */
export async function signToken(payload: Record<string, any>, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const payloadWithExp = {
    ...payload,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours validity
  };

  const data = btoa(JSON.stringify(payloadWithExp))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${header}.${data}`)
  );

  const signature = base64url(signatureBuffer);
  return `${header}.${data}.${signature}`;
}

/**
 * Verifies a JWT token using the HMAC SHA-256 secret.
 * Returns the decoded payload if valid, otherwise null.
 */
export async function verifyToken(token: string, secret: string): Promise<Record<string, any> | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, data, signature] = parts;

  try {
    const key = await getCryptoKey(secret);
    const verified = await crypto.subtle.verify(
      'HMAC',
      key,
      base64urlDecode(signature) as any,
      encoder.encode(`${header}.${data}`)
    );

    if (!verified) return null;

    const decodedPayload = JSON.parse(
      new TextDecoder().decode(base64urlDecode(data))
    );

    if (decodedPayload.exp && decodedPayload.exp < Date.now()) {
      return null; // Token has expired
    }

    return decodedPayload;
  } catch (err) {
    return null;
  }
}
