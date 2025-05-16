// app.api/scripts/send-test-email.ts

import { config } from 'dotenv';
config({ path: '.env.local' });

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || 'Givee <team@notifications.giv.ee>',
    to: 'daniel@colabria.org',
    subject: '🚀 Test email from local Givee',
    html: `<p>Hello! This is a test email from your local Givee dev environment.</p>`
  });

  console.log('✅ Email sent:', result);
}

main().catch((err) => {
  console.error('❌ Failed to send email:', err);
  process.exit(1);
});