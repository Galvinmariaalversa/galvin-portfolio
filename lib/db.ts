const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role bypasses RLS for backend operations

interface InquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  ip_address: string;
  status?: 'pending' | 'contacted';
}

function getHeaders() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase configuration is missing in environment variables.');
  }

  return {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Inserts a new contact submission into the database.
 */
export async function insertInquiry(data: InquiryData) {
  const headers = getHeaders();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
    method: 'POST',
    headers: {
      ...headers,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      phone: data.phone || null,
      ip_address: data.ip_address,
      status: data.status || 'pending',
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to insert inquiry: ${errText}`);
  }

  return res.json();
}

/**
 * Checks how many submissions have been made by a specific IP in the last X minutes.
 */
export async function getRecentSubmissionCount(ip: string, minutes: number): Promise<number> {
  const headers = getHeaders();
  const timeThreshold = new Date(Date.now() - minutes * 60 * 1000).toISOString();

  // Query: get inquiries where ip_address matches client IP and created_at is greater than or equal to threshold
  const url = `${SUPABASE_URL}/rest/v1/inquiries?ip_address=eq.${encodeURIComponent(ip)}&created_at=gte.${encodeURIComponent(timeThreshold)}&select=id`;

  const res = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Error querying rate limits: ${errText}`);
    return 0;
  }

  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}

/**
 * Gets all inquiries sorted by creation date descending (for admin).
 */
export async function getAllInquiries() {
  const headers = getHeaders();
  const url = `${SUPABASE_URL}/rest/v1/inquiries?order=created_at.desc`;

  const res = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch inquiries: ${errText}`);
  }

  return res.json();
}

/**
 * Updates the status of an inquiry (e.g. marked as contacted or pending).
 */
export async function updateInquiryStatus(id: string, status: 'pending' | 'contacted') {
  const headers = getHeaders();
  const url = `${SUPABASE_URL}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to update inquiry status: ${errText}`);
  }

  return true;
}

/**
 * Deletes a spam or invalid inquiry.
 */
export async function deleteInquiry(id: string) {
  const headers = getHeaders();
  const url = `${SUPABASE_URL}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to delete inquiry: ${errText}`);
  }

  return true;
}
