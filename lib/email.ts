import nodemailer from 'nodemailer';

// -------------------------------------------------------------------
// Nodemailer transporter — Hostinger SMTP using founder@OasisOfArabic.com
// -------------------------------------------------------------------
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'founder@OasisOfArabic.com',
    pass: process.env.SMTP_PASSWORD || '',
  },
});

// Verify transporter configuration (non-blocking)
transporter.verify()
  .then(() => {
    console.log('✅ SMTP server ready — Oasis of Arabic email service online');
  })
  .catch((error) => {
    console.error('❌ SMTP connection error:', error);
    console.error('Email functionality may not work. Please check SMTP_PASSWORD in .env');
  });

// -------------------------------------------------------------------
// Shared email constants
// -------------------------------------------------------------------
const FROM = '"Oasis of Arabic" <founder@OasisOfArabic.com>';
const BRAND_COLOR = '#16a34a'; // green-600
const BRAND_DARK = '#0d5c2f';  // dark green

// -------------------------------------------------------------------
// OTP generation
// -------------------------------------------------------------------
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// -------------------------------------------------------------------
// Shared HTML components
// -------------------------------------------------------------------
function emailHeader(title: string, subtitle: string) {
  return `
    <tr>
      <td style="background: linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_COLOR} 100%); padding: 40px 30px; text-align: center;">
        <div style="font-size: 32px; margin-bottom: 8px;">🌿</div>
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; font-family: Georgia, serif;">${title}</h1>
        <p style="color: #bbf7d0; margin: 10px 0 0 0; font-size: 15px;">${subtitle}</p>
      </td>
    </tr>
  `;
}

function emailFooter() {
  return `
    <tr>
      <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 6px 0; color: #4b5563; font-size: 14px; font-weight: 600;">Oasis of Arabic</p>
        <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px;">Master Arabic Online — Live Zoom Classes &amp; Expert Guidance</p>
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">
          © ${new Date().getFullYear()} Oasis of Arabic. All rights reserved. |
          <a href="mailto:founder@OasisOfArabic.com" style="color: ${BRAND_COLOR}; text-decoration: none;">founder@OasisOfArabic.com</a>
        </p>
      </td>
    </tr>
  `;
}

function emailWrapper(bodyRows: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          ${bodyRows}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// -------------------------------------------------------------------
// Send OTP for email verification
// -------------------------------------------------------------------
export async function sendVerificationOTP(email: string, otp: string, name?: string) {
  const html = emailWrapper(`
    ${emailHeader('🔐 Verify Your Email', 'Welcome to Oasis of Arabic')}
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: ${BRAND_DARK}; margin: 0 0 16px 0; font-size: 22px; font-family: Georgia, serif;">
          Hello${name ? ' ' + name : ''},
        </h2>
        <p style="color: #4b5563; line-height: 1.7; margin: 0 0 28px 0; font-size: 15px;">
          Thank you for joining <strong>Oasis of Arabic</strong>! To complete your registration and begin your Arabic learning journey, please verify your email using the code below:
        </p>

        <!-- OTP Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_COLOR} 100%); border-radius: 16px; padding: 32px 48px;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px 0; color: #bbf7d0; font-size: 13px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase;">Your Verification Code</p>
                    <p style="margin: 0; color: #ffffff; font-size: 52px; font-weight: bold; letter-spacing: 10px; font-family: 'Courier New', monospace;">${otp}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-left: 4px solid ${BRAND_COLOR}; border-radius: 8px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px 20px;">
              <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.6;">
                ⏱️ <strong>This code expires in 10 minutes.</strong> Do not share it with anyone.
              </p>
            </td>
          </tr>
        </table>

        <p style="color: #6b7280; line-height: 1.6; margin: 0; font-size: 13px;">
          If you didn't create an account, you can safely ignore this email. Questions? Contact us at
          <a href="mailto:founder@OasisOfArabic.com" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: bold;">founder@OasisOfArabic.com</a>
        </p>
      </td>
    </tr>
    ${emailFooter()}
  `);

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: 'Verify Your Email — Oasis of Arabic',
    html,
  });

  return { success: true };
}

// -------------------------------------------------------------------
// Send OTP for password reset
// -------------------------------------------------------------------
export async function sendPasswordResetOTP(email: string, otp: string, name?: string) {
  const html = emailWrapper(`
    ${emailHeader('🔑 Reset Your Password', 'Oasis of Arabic Account Recovery')}
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: ${BRAND_DARK}; margin: 0 0 16px 0; font-size: 22px; font-family: Georgia, serif;">
          Hello${name ? ' ' + name : ''},
        </h2>
        <p style="color: #4b5563; line-height: 1.7; margin: 0 0 28px 0; font-size: 15px;">
          We received a request to reset your <strong>Oasis of Arabic</strong> account password. Use the code below to proceed:
        </p>

        <!-- OTP Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_COLOR} 100%); border-radius: 16px; padding: 32px 48px;">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 8px 0; color: #bbf7d0; font-size: 13px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase;">Password Reset Code</p>
                    <p style="margin: 0; color: #ffffff; font-size: 52px; font-weight: bold; letter-spacing: 10px; font-family: 'Courier New', monospace;">${otp}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px 20px;">
              <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.6;">
                ⚠️ <strong>This code expires in 10 minutes.</strong> If you didn't request a reset, please ignore this email or contact us immediately.
              </p>
            </td>
          </tr>
        </table>

        <p style="color: #6b7280; line-height: 1.6; margin: 0; font-size: 13px;">
          Need help? Reach us at
          <a href="mailto:founder@OasisOfArabic.com" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: bold;">founder@OasisOfArabic.com</a>
        </p>
      </td>
    </tr>
    ${emailFooter()}
  `);

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: 'Reset Your Password — Oasis of Arabic',
    html,
  });

  return { success: true };
}

// -------------------------------------------------------------------
// Send password reset LINK (used by Better Auth's forgetPassword)
// -------------------------------------------------------------------
export async function sendPasswordResetLink(email: string, resetUrl: string, name?: string) {
  const html = emailWrapper(`
    ${emailHeader('🔑 Reset Your Password', 'Oasis of Arabic Account Recovery')}
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: ${BRAND_DARK}; margin: 0 0 16px 0; font-size: 22px; font-family: Georgia, serif;">
          Hello${name ? ' ' + name : ''},
        </h2>
        <p style="color: #4b5563; line-height: 1.7; margin: 0 0 28px 0; font-size: 15px;">
          We received a request to reset your <strong>Oasis of Arabic</strong> account password. Click the button below to set a new password:
        </p>

        <!-- CTA Button -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
          <tr>
            <td align="center">
              <a href="${resetUrl}"
                style="display: inline-block; background: linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_COLOR} 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: bold; letter-spacing: 0.5px;">
                Reset My Password &rarr;
              </a>
            </td>
          </tr>
        </table>

        <p style="color: #6b7280; font-size: 13px; text-align: center; margin: 0 0 16px 0;">
          Or copy and paste this link into your browser:
        </p>
        <p style="background-color: #f3f4f6; padding: 12px 16px; border-radius: 8px; word-break: break-all; font-size: 12px; color: #4b5563; margin: 0 0 24px 0;">
          ${resetUrl}
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 16px 20px;">
              <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.6;">
                ⚠️ <strong>This link expires in 60 minutes.</strong> If you didn't request a reset, please ignore this email or contact us immediately.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${emailFooter()}
  `);

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: 'Reset Your Password — Oasis of Arabic',
    html,
  });

  return { success: true };
}

// -------------------------------------------------------------------
// Contact form submission
// -------------------------------------------------------------------
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function sendContactFormEmail(data: ContactFormData) {
  const { name, email, phone, subject, message } = data;

  const html = emailWrapper(`
    ${emailHeader('📧 New Contact Message', 'Received via oasisofarabic.com')}
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: ${BRAND_DARK}; margin: 0 0 20px 0; font-size: 20px; font-family: Georgia, serif;">Contact Details</h2>

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 10px; margin-bottom: 20px;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</p>
              <p style="margin: 0 0 16px 0; color: ${BRAND_DARK}; font-weight: bold; font-size: 16px;">${name}</p>

              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
              <p style="margin: 0 0 16px 0; color: ${BRAND_DARK}; font-weight: bold; font-size: 16px;">
                <a href="mailto:${email}" style="color: ${BRAND_COLOR}; text-decoration: none;">${email}</a>
              </p>

              ${phone ? `
              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</p>
              <p style="margin: 0 0 16px 0; color: ${BRAND_DARK}; font-weight: bold; font-size: 16px;">
                <a href="tel:${phone}" style="color: ${BRAND_COLOR}; text-decoration: none;">${phone}</a>
              </p>
              ` : ''}

              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
              <p style="margin: 0; color: ${BRAND_DARK}; font-weight: bold; font-size: 16px;">${subject}</p>
            </td>
          </tr>
        </table>

        <h3 style="color: ${BRAND_DARK}; margin: 0 0 12px 0; font-size: 18px; font-family: Georgia, serif;">Message</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 10px; border-left: 4px solid ${BRAND_COLOR}; margin-bottom: 20px;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0; color: #374151; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align: center;">
              <a href="mailto:${email}"
                style="display: inline-block; background: linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND_COLOR} 100%); color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 15px;">
                Reply to ${name} &rarr;
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    ${emailFooter()}
  `);

  await transporter.sendMail({
    from: FROM,
    to: 'founder@OasisOfArabic.com',
    replyTo: email,
    subject: `New Contact: ${subject}`,
    html,
  });

  return { success: true };
}

// -------------------------------------------------------------------
// Course enrollment confirmation
// -------------------------------------------------------------------
interface EnrollmentConfirmationData {
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  coursePrice: number;
  currency?: string;
  zoomLink?: string;
}

export async function sendEnrollmentConfirmation(data: EnrollmentConfirmationData) {
  const { studentName, studentEmail, courseTitle, coursePrice, currency = 'PKR', zoomLink } = data;

  const html = emailWrapper(`
    ${emailHeader('🎉 Enrollment Confirmed!', 'Welcome to your Arabic learning journey')}
    <tr>
      <td style="padding: 40px 30px;">
        <h2 style="color: ${BRAND_DARK}; margin: 0 0 16px 0; font-size: 22px; font-family: Georgia, serif;">
          Congratulations, ${studentName}!
        </h2>
        <p style="color: #4b5563; line-height: 1.7; margin: 0 0 24px 0; font-size: 15px;">
          You have successfully enrolled in <strong>${courseTitle}</strong>. Your Arabic learning journey begins now! 🌿
        </p>

        <!-- Course Info Box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #bbf7d0; border-radius: 12px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Course</p>
              <p style="margin: 0 0 16px 0; color: ${BRAND_DARK}; font-weight: bold; font-size: 18px;">${courseTitle}</p>

              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Amount Paid</p>
              <p style="margin: 0 0 16px 0; color: ${BRAND_COLOR}; font-weight: bold; font-size: 20px;">${currency} ${coursePrice.toLocaleString()}</p>

              ${zoomLink ? `
              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Join Your Class</p>
              <a href="${zoomLink}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">
                🎥 Join Zoom Class
              </a>
              ` : ''}
            </td>
          </tr>
        </table>

        <p style="color: #6b7280; line-height: 1.6; margin: 0; font-size: 14px;">
          Questions or need help getting started? Email us at
          <a href="mailto:founder@OasisOfArabic.com" style="color: ${BRAND_COLOR}; text-decoration: none; font-weight: bold;">founder@OasisOfArabic.com</a>
        </p>
      </td>
    </tr>
    ${emailFooter()}
  `);

  await transporter.sendMail({
    from: FROM,
    to: studentEmail,
    subject: `Enrollment Confirmed: ${courseTitle} — Oasis of Arabic`,
    html,
  });

  return { success: true };
}
