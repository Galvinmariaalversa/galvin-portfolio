import { NextRequest, NextResponse, after } from 'next/server';
import { sanitizeInput, getClientIp } from '@/lib/utils';
import { insertInquiry, getRecentSubmissionCount } from '@/lib/db';
import nodemailer from 'nodemailer';

// Cache nodemailer Transporter instance for connection reuse/keep-alive across requests
let transporterInstance: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporterInstance) return transporterInstance;

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_PASS;

  if (GMAIL_USER && GMAIL_PASS) {
    transporterInstance = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });
  }
  return transporterInstance;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, turnstileToken, website } = body;

    console.log('[Contact API] Received form submission payload:', {
      name,
      email,
      phone,
      message,
      hasToken: !!turnstileToken,
      website,
    });

    // 1. Honeypot check
    // If the hidden 'website' field has value, it's a bot. Return fake success to prevent bot retries.
    if (website) {
      console.warn('[Contact API] Bot detected via honeypot field submission. Website value:', website);
      return NextResponse.json({
        success: true,
        message: 'Thank you for contacting me. Your message has been received successfully and a confirmation email has been sent to your inbox.',
      });
    }

    // 2. Client IP & Rate Limiting
    const ip = getClientIp(req);
    console.log('[Contact API] Client IP address extracted:', ip);

    const recentCount = await getRecentSubmissionCount(ip, 15);
    console.log(`[Contact API] Rate Limiting Check: IP ${ip} has ${recentCount} submissions in the last 15 minutes.`);
    if (recentCount >= 3) {
      console.warn(`[Contact API] Rate limit exceeded for IP: ${ip}. Submission blocked.`);
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    // 3. Server-side validation
    if (!name || !email || !phone || !message) {
      console.warn('[Contact API] Validation failed: Missing required fields.', { name: !!name, email: !!email, phone: !!phone, message: !!message });
      return NextResponse.json(
        { success: false, message: 'All required fields (Name, Email, Phone, Message) must be filled.' },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeInput(name.trim());
    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedPhone = sanitizeInput(phone.trim());
    const sanitizedMessage = sanitizeInput(message.trim());
    const subject = 'General Portfolio Inquiry'; // Option B: default subject generated server-side

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      console.warn('[Contact API] Validation failed: Invalid email format:', sanitizedEmail);
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Length checks
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      console.warn('[Contact API] Validation failed: Name length invalid (must be 2-100 characters):', sanitizedName.length);
      return NextResponse.json(
        { success: false, message: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (sanitizedPhone.length < 5 || sanitizedPhone.length > 30) {
      console.warn('[Contact API] Validation failed: Phone length invalid (must be 5-30 characters):', sanitizedPhone.length);
      return NextResponse.json(
        { success: false, message: 'Phone number must be between 5 and 30 characters.' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
      console.warn('[Contact API] Validation failed: Message length invalid (must be 10-5000 characters):', sanitizedMessage.length);
      return NextResponse.json(
        { success: false, message: 'Message must be between 10 and 5000 characters.' },
        { status: 400 }
      );
    }

    // 4. Bot Protection: Cloudflare Turnstile token validation
    if (!turnstileToken) {
      console.warn('[Contact API] Verification failed: Turnstile token is missing.');
      return NextResponse.json(
        { success: false, message: 'Bot verification token is missing. Please try again.' },
        { status: 400 }
      );
    }

    const host = req.headers.get('host') || '';
    const hostname = host.split(':')[0];
    const isLocal = hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '[::1]' ||
      /^192\.168\./.test(hostname) ||
      /^10\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      /\.local$/.test(hostname);
    const secretKeyToUse = isLocal
      ? '1x0000000000000000000000000000000AA' // Correct sandbox testing secret key ending in AA
      : process.env.TURNSTILE_SECRET_KEY;

    console.log('[Contact API] Verifying Turnstile token with Cloudflare. IP Local status:', isLocal);

    if (!secretKeyToUse) {
      console.error('[Contact API] Missing TURNSTILE_SECRET_KEY in environment variables.');
    } else {
      let turnstileResult = { success: false, 'error-codes': ['internal-fallback'] };
      try {
        const turnstileVerifyRes = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              secret: secretKeyToUse,
              response: turnstileToken,
              remoteip: ip,
            }),
          }
        );
        turnstileResult = await turnstileVerifyRes.json();
        console.log('[Contact API] Cloudflare siteverify response:', turnstileResult);
      } catch (fetchErr) {
        console.error('[Contact API] Turnstile verify API request failed. Gracefully bypassing validation.', fetchErr);
        // Bypassing verification so network failures to Cloudflare don't block inquiries
        turnstileResult = { success: true, 'error-codes': [] };
      }

      if (!turnstileResult.success) {
        console.warn(`[Contact API] Turnstile validation failed for IP ${ip}:`, turnstileResult['error-codes']);
        return NextResponse.json(
          { success: false, message: 'Bot verification failed. Please refresh and try again.' },
          { status: 400 }
        );
      }
    }

    // 5. Database Storage
    try {
      await insertInquiry({
        name: sanitizedName,
        email: sanitizedEmail,
        subject,
        message: sanitizedMessage,
        phone: sanitizedPhone,
        ip_address: ip,
        status: 'pending',
      });
    } catch (dbErr) {
      console.error('Database insertion error:', dbErr);
      return NextResponse.json(
        { success: false, message: 'Something went wrong while saving your message. Please try again later.' },
        { status: 500 }
      );
    }

    // 6. Gmail SMTP Email Notifications via Nodemailer
    const transporter = getTransporter();
    const GMAIL_USER = process.env.GMAIL_USER;
    const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || 'hello.galvinj@gmail.com';

    if (transporter && GMAIL_USER) {
      after(async () => {
        try {
          console.log('[Contact API] Initiating background email delivery...');
          const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

          // A. Generate HTML for Owner Notification
          const ownerEmailHtml = `
            <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 12px;">
              <div style="background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">New Inquiry Received</h1>
              </div>
              <div style="background: #ffffff; padding: 25px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 120px; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #1f2937; font-weight: 700;">${sanitizedName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #8b5cf6; font-weight: 600;">
                      <a href="mailto:${sanitizedEmail}" style="color: #8b5cf6; text-decoration: none;">${sanitizedEmail}</a>
                    </td>
                  </tr>
                  ${sanitizedPhone ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #1f2937; font-weight: 600;">${sanitizedPhone}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Subject</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #1f2937; font-weight: 600;">${subject}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px;">
                  <span style="font-size: 11px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Message</span>
                  <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #8b5cf6; border-radius: 4px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</div>
                </div>
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #f3f4f6; font-size: 11px; color: #9ca3af;">
                  <p style="margin: 0; margin-bottom: 4px;">Submitted At: ${timestamp}</p>
                  <p style="margin: 0;">IP Address: ${ip}</p>
                </div>
              </div>
            </div>
          `;

          // B. Generate HTML for Visitor Auto-Reply
          const visitorEmailHtml = `
            <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 12px;">
              <div style="background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%); padding: 25px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">Message Received!</h1>
              </div>
              <div style="background: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <p style="font-size: 16px; color: #1f2937; margin-top: 0; font-weight: 600;">Hi ${sanitizedName},</p>
                <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">Thank you for reaching out through my portfolio website.</p>
                <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">I have successfully received your message and appreciate your interest in my web development services.</p>
                <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">I will personally review your inquiry and get back to you within <strong>12–24 hours</strong>.</p>
                
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 25px 0;">
                  <h3 style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; margin-bottom: 10px; font-weight: 700;">Direct Contact Info</h3>
                  <p style="margin: 0; font-size: 14px; color: #374151; font-weight: 600; margin-bottom: 6px;">Email: <a href="mailto:hello.galvinj@gmail.com" style="color: #8b5cf6; text-decoration: none;">hello.galvinj@gmail.com</a></p>
                  <p style="margin: 0; font-size: 14px; color: #374151; font-weight: 600;">Phone: <a href="tel:+919344200893" style="color: #8b5cf6; text-decoration: none;">+91 93442 00893</a></p>
                </div>

                <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin-bottom: 25px;">I look forward to discussing your project and exploring how I can help bring your ideas to life.</p>
                
                <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 25px;">
                  <p style="margin: 0; font-size: 14px; font-weight: 700; color: #1f2937;">Best Regards,</p>
                  <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 600; color: #8b5cf6;">Galvin J</p>
                  <p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280;">Freelance Frontend Developer | Chennai, Tamil Nadu</p>
                </div>
              </div>
            </div>
          `;

          // C. Send both emails concurrently in parallel via Promise.all
          const emailPromises = [
            transporter.sendMail({
              from: `"Portfolio Inquiry" <${GMAIL_USER}>`,
              to: CONTACT_RECEIVER_EMAIL,
              subject: `New Portfolio Inquiry from ${sanitizedName}`,
              html: ownerEmailHtml,
            })
            .then(() => {
              console.log('[Contact API] Inquiry email sent successfully to owner via Gmail SMTP.');
            })
            .catch((emailErr) => {
              console.error('[Contact API] Failed to send inquiry email to owner via SMTP:', emailErr);
            }),

            transporter.sendMail({
              from: `"Galvin J" <${GMAIL_USER}>`,
              to: sanitizedEmail,
              subject: 'Thank You for Contacting Galvin J',
              html: visitorEmailHtml,
            })
            .then(() => {
              console.log('[Contact API] Auto-reply confirmation email sent to visitor via SMTP:', sanitizedEmail);
            })
            .catch((visitorEmailErr) => {
              console.error('[Contact API] Failed to send auto-reply to visitor via SMTP:', visitorEmailErr);
            })
          ];

          await Promise.all(emailPromises);
          console.log('[Contact API] All background emails processed successfully.');
        } catch (err) {
          console.error('[Contact API] Error sending background emails:', err);
        }
      });
    } else {
      console.error('[Contact API] Gmail SMTP credentials missing in environment variables. Emails not sent.');
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting me. Your message has been received successfully and a confirmation email has been sent to your inbox. I will get back to you within 12–24 hours.',
    });
  } catch (err) {
    console.error('Unhandled contact API route error:', err);
    return NextResponse.json(
      { success: false, message: 'Something went wrong while sending your message. Please try again later.' },
      { status: 500 }
    );
  }
}
