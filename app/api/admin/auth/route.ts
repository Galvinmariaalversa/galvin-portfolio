import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/jwt';

/**
 * Handles Admin Login (POST) and Admin Logout (GET).
 */

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!ADMIN_PASSWORD || !JWT_SECRET) {
      console.error('Missing ADMIN_PASSWORD or JWT_SECRET in environment variables.');
      return NextResponse.json(
        { success: false, message: 'Server configuration error.' },
        { status: 500 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password.' },
        { status: 401 }
      );
    }

    // Sign the JWT token with the admin role
    const token = await signToken({ role: 'admin' }, JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful.',
    });

    // Set the HTTP-Only cookie containing the secure JWT
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (err) {
    console.error('Authentication route error:', err);
    return NextResponse.json(
      { success: false, message: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully.',
  });

  // Clear the admin_token cookie by setting maxAge to 0
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
