import { validateEmail } from '@/lib/email';
import { createResendClient } from '@/lib/resend';
import { captureException } from '@sentry/node';
import {
  MagicLinkEmail,
  OrganizationInviteEmail,
  SubscriptionCancelledEmail,
  SubscriptionUpgradedEmail,
  TrialEndingSoonEmail,
  TrialFinishedEmail,
  WelcomeEmail,
} from '@trylinky/notifications';
import React from 'react';

export async function sendEmail({
  email,
  subject,
  from = 'Givee <team@notifications.giv.ee>',
  react,
  text,
  replyTo = 'team@giv.ee',
  scheduledAt,
}: {
  email: string;
  subject: string;
  from?: string;
  replyTo?: string;
  react?: React.ReactNode;
  text?: string;
  scheduledAt?: Date;
}) {
  const resend = createResendClient();

  if (!resend) {
    console.warn('Resend is not enabled, skipping email send');
    return;
  }

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    console.warn('Invalid email, skipping email send');
    return;
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to: [email],
      replyTo,
      subject,
      react,
      text,
      scheduledAt: scheduledAt?.toISOString(),
    });

    if (error) {
      console.error('Error sending email', error);
      captureException(error);
    }
  } catch (error) {
    console.error('Error sending email', error);
    captureException(error);
  }
}

export async function sendTrialReminderEmail(email: string) {
  return sendEmail({
    email,
    subject: 'Your Givee Premium trial is ending soon',
    react: <TrialEndingSoonEmail />,
  });
}

export async function sendTrialEndedEmail(email: string) {
  return sendEmail({
    email,
    subject: 'Your Givee Premium trial has ended',
    react: <TrialFinishedEmail />,
  });
}

export async function sendSubscriptionDeletedEmail(email: string) {
  return sendEmail({
    email,
    subject: 'Your Givee subscription has been cancelled',
    react: <SubscriptionCancelledEmail />,
  });
}

export async function sendOrganizationInvitationEmail({
  email,
  inviteLink,
}: {
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  teamName: string;
  inviteLink: string;
}) {
  return sendEmail({
    email,
    subject: "You've been invited to join a team on Givee",
    react: <OrganizationInviteEmail inviteUrl={inviteLink} />,
  });
}

export async function sendWelcomeEmail(email: string) {
  return sendEmail({
    from: 'Dan from Givee <Dan@notifications.giv.ee>',
    replyTo: 'Dan@giv.ee',
    email,
    subject: 'Welcome to Givee',
    react: <WelcomeEmail />,
  });
}

export async function sendWelcomeFollowUpEmail(email: string) {
  const twentyThreeHoursFromNow = new Date(Date.now() + 23 * 60 * 60 * 1000);

  return sendEmail({
    from: 'Dan <Dan@notifications.giv.ee>',
    replyTo: 'Dan@giv.ee',
    email,
    subject: 'Re: Welcome to Givee',
    scheduledAt: twentyThreeHoursFromNow,
    text: `Hey,

I'm Dan, the founder of Givee. Welcome!

I wanted to reach out to see how you're finding using Givee so far?

As someone who has been creating content online for the past 15 years, I built Givee as a tool to make it easier to start building your presence online.

If you're looking for inspiration, we've also recently launched the explore gallery (giv.ee/i/explore), where you can find some of our favorite pages from the community.

If you have any questions or have any issues using the platform, feel free to respond to this email (I respond to every email personally).

Dan`,
  });
}

export async function sendMagicLinkEmail({
  email,
  url,
}: {
  email: string;
  url: string;
}) {
  return sendEmail({
    email,
    subject: 'Verify your Givee login',
    react: <MagicLinkEmail url={url} />,
  });
}

export async function sendSubscriptionUpgradedTeamEmail({
  email,
}: {
  email: string;
}) {
  return sendEmail({
    email,
    subject: 'Your Givee subscription has been upgraded',
    react: <SubscriptionUpgradedEmail planName="team" />,
  });
}

export async function sendSubscriptionUpgradedPremiumEmail({
  email,
}: {
  email: string;
}) {
  return sendEmail({
    email,
    subject: 'Your Givee subscription has been upgraded',
    react: <SubscriptionUpgradedEmail planName="premium" />,
  });
}