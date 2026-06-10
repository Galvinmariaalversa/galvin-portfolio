import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET;

async function checkAuth(req: NextRequest): Promise<boolean> {
  if (!JWT_SECRET) return false;

  const cookieStore = req.cookies;
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return false;

  const payload = await verifyToken(token, JWT_SECRET);
  return payload !== null && payload.role === 'admin';
}

/**
 * GET: Retrieves all portfolio inquiries (Secured).
 */
export async function GET(req: NextRequest) {
  try {
    const isAuthed = await checkAuth(req);
    if (!isAuthed) {
      return NextResponse.json({ success: false, message: 'Unauthorized access.' }, { status: 401 });
    }

    const inquiries = await getAllInquiries();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (err) {
    console.error('Failed to get inquiries:', err);
    return NextResponse.json(
      { success: false, message: 'An error occurred while fetching inquiries.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH: Updates an inquiry's status (Secured).
 */
export async function PATCH(req: NextRequest) {
  try {
    const isAuthed = await checkAuth(req);
    if (!isAuthed) {
      return NextResponse.json({ success: false, message: 'Unauthorized access.' }, { status: 401 });
    }

    const { id, status } = await req.json();
    if (!id || !status || (status !== 'pending' && status !== 'contacted')) {
      return NextResponse.json({ success: false, message: 'Invalid payload.' }, { status: 400 });
    }

    await updateInquiryStatus(id, status);
    return NextResponse.json({ success: true, message: 'Status updated successfully.' });
  } catch (err) {
    console.error('Failed to update inquiry status:', err);
    return NextResponse.json(
      { success: false, message: 'An error occurred while updating the status.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Deletes an inquiry (Secured).
 */
export async function DELETE(req: NextRequest) {
  try {
    const isAuthed = await checkAuth(req);
    if (!isAuthed) {
      return NextResponse.json({ success: false, message: 'Unauthorized access.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Inquiry ID is required.' }, { status: 400 });
    }

    await deleteInquiry(id);
    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (err) {
    console.error('Failed to delete inquiry:', err);
    return NextResponse.json(
      { success: false, message: 'An error occurred while deleting the inquiry.' },
      { status: 500 }
    );
  }
}
