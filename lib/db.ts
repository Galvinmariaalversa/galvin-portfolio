import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role bypasses RLS for backend operations

interface InquiryData {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  ip_address: string;
  status?: 'pending' | 'contacted';
  created_at?: string;
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

async function saveInquiryLocally(data: InquiryData) {
  const filePath = path.join(/*turbopackIgnore: true*/ process.cwd(), 'inquiries_fallback.json');
  let currentInquiries: any[] = [];
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      currentInquiries = JSON.parse(content);
    }
  } catch (e) {
    console.warn('Could not read inquiries from process.cwd() fallback file.');
  }

  const newEntry = {
    id: data.id || Math.random().toString(36).substring(2, 9),
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    phone: data.phone || null,
    ip_address: data.ip_address,
    status: data.status || 'pending',
    created_at: data.created_at || new Date().toISOString(),
  };
  currentInquiries.push(newEntry);

  try {
    fs.writeFileSync(filePath, JSON.stringify(currentInquiries, null, 2), 'utf8');
    console.log('Successfully saved inquiry to fallback JSON:', filePath);
  } catch (e) {
    // Fallback to /tmp for serverless/readonly environments
    try {
      const tmpPath = path.join('/tmp', 'inquiries_fallback.json');
      let tmpInquiries: any[] = [];
      if (fs.existsSync(tmpPath)) {
        const content = fs.readFileSync(tmpPath, 'utf8');
        tmpInquiries = JSON.parse(content);
      }
      tmpInquiries.push(newEntry);
      fs.writeFileSync(tmpPath, JSON.stringify(tmpInquiries, null, 2), 'utf8');
      console.log('Successfully saved inquiry to fallback JSON in /tmp:', tmpPath);
    } catch (tmpErr) {
      console.error('Failed to save inquiry to /tmp as well:', tmpErr);
    }
  }
  return newEntry;
}

/**
 * Inserts a new contact submission into the database.
 */
export async function insertInquiry(data: InquiryData) {
  try {
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

    return await res.json();
  } catch (err) {
    console.error('Database connection / insertion failed. Storing locally as fallback.', err);
    return await saveInquiryLocally(data);
  }
}

/**
 * Checks how many submissions have been made by a specific IP in the last X minutes.
 */
export async function getRecentSubmissionCount(ip: string, minutes: number): Promise<number> {
  let count = 0;
  try {
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
    } else {
      const data = await res.json();
      count = Array.isArray(data) ? data.length : 0;
    }
  } catch (err) {
    console.error(`Error querying rate limits from Supabase:`, err);
  }

  // Load from local fallback files too
  const timeThresholdMs = Date.now() - minutes * 60 * 1000;
  const filePaths = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), 'inquiries_fallback.json'),
    path.join('/tmp', 'inquiries_fallback.json')
  ];

  for (const filePath of filePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const inquiries = JSON.parse(content);
        const localCount = inquiries.filter((item: any) => {
          return item.ip_address === ip && new Date(item.created_at || item.created_time).getTime() >= timeThresholdMs;
        }).length;
        count += localCount;
      }
    } catch (e) {}
  }

  return count;
}

/**
 * Gets all inquiries sorted by creation date descending (for admin).
 */
export async function getAllInquiries() {
  let supabaseInquiries: any[] = [];
  try {
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

    supabaseInquiries = await res.json();
  } catch (err) {
    console.error('Failed to fetch inquiries from Supabase. Falling back to local/tmp files.', err);
  }

  // Load from local fallbacks
  let localInquiries: any[] = [];
  const filePaths = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), 'inquiries_fallback.json'),
    path.join('/tmp', 'inquiries_fallback.json')
  ];

  for (const filePath of filePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const list = JSON.parse(content);
        for (const item of list) {
          // Prevent duplicates if loaded from both/multiple fallbacks
          if (!localInquiries.some(li => li.id === item.id)) {
            localInquiries.push(item);
          }
        }
      }
    } catch (e) {}
  }

  // Combine both and sort by created_at descending
  const combined = [...supabaseInquiries, ...localInquiries];
  combined.sort((a, b) => {
    const timeA = new Date(a.created_at || a.created_time || 0).getTime();
    const timeB = new Date(b.created_at || b.created_time || 0).getTime();
    return timeB - timeA;
  });

  return combined;
}

/**
 * Updates the status of an inquiry (e.g. marked as contacted or pending).
 */
export async function updateInquiryStatus(id: string, status: 'pending' | 'contacted') {
  let updatedInSupabase = false;
  try {
    const headers = getHeaders();
    const url = `${SUPABASE_URL}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`;

    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      updatedInSupabase = true;
    } else {
      const errText = await res.text();
      console.error(`Failed to update inquiry status in Supabase: ${errText}`);
    }
  } catch (err) {
    console.error('Failed to update inquiry status in Supabase:', err);
  }

  // Also update in local fallbacks
  const filePaths = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), 'inquiries_fallback.json'),
    path.join('/tmp', 'inquiries_fallback.json')
  ];

  for (const filePath of filePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const inquiries = JSON.parse(content);
        const index = inquiries.findIndex((item: any) => String(item.id) === String(id));
        if (index !== -1) {
          inquiries[index].status = status;
          fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2), 'utf8');
          console.log(`Updated status to ${status} for inquiry ${id} in fallback: ${filePath}`);
        }
      }
    } catch (e) {}
  }

  return true;
}

/**
 * Deletes a spam or invalid inquiry.
 */
export async function deleteInquiry(id: string) {
  let deletedFromSupabase = false;
  try {
    const headers = getHeaders();
    const url = `${SUPABASE_URL}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    if (res.ok) {
      deletedFromSupabase = true;
    } else {
      const errText = await res.text();
      console.error(`Failed to delete inquiry from Supabase: ${errText}`);
    }
  } catch (err) {
    console.error('Failed to delete inquiry from Supabase:', err);
  }

  // Also delete in local fallbacks
  const filePaths = [
    path.join(/*turbopackIgnore: true*/ process.cwd(), 'inquiries_fallback.json'),
    path.join('/tmp', 'inquiries_fallback.json')
  ];

  for (const filePath of filePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const inquiries = JSON.parse(content);
        const filtered = inquiries.filter((item: any) => String(item.id) !== String(id));
        if (filtered.length !== inquiries.length) {
          fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), 'utf8');
          console.log(`Deleted inquiry ${id} from fallback: ${filePath}`);
        }
      }
    } catch (e) {}
  }

  return true;
}
