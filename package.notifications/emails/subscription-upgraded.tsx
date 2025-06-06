import { EmailHeader, EmailFooter, styles, SignOff, Logo } from './components';
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

export default function SubscriptionUpgradedEmail({
  planName,
}: {
  planName: string;
}) {
  const title =
    planName === 'team'
      ? 'Welcome to Givee Teams'
      : planName === 'premium'
        ? 'Welcome to Givee Premium'
        : 'Your subscription has been upgraded';
  return (
    <Html>
      <Head />
      <Preview>Your subscription has been upgraded</Preview>
      <Tailwind>
        <Body style={styles.main}>
          <Container style={styles.container}>
            <Logo />
            <EmailHeader
              title={title}
              subtitle={`We've upgraded your subscription`}
            />

            <Section>
              {planName === 'team' && (
                <>
                  <Text style={styles.paragraph}>
                    Welcome to Givee Teams! You can now invite up to 5 team
                    members to join, each of which will receive Givee Premium
                    access.
                  </Text>
                  <Text style={styles.paragraph}>
                    If you had an existing personal subscription, we've
                    cancelled this as it is now included in your Givee Teams
                    plan.
                  </Text>
                  <Text style={styles.paragraph}>
                    If you have any other questions about your subscription,
                    please send us a message at support@giv.ee.
                  </Text>
                </>
              )}

              {planName === 'premium' && (
                <>
                  <Text style={styles.paragraph}>
                    Welcome to Givee Premium! You now have access to all of our
                    features, including creating unlimited pages, custom
                    domains, page analytics, and more.
                  </Text>
                  <Text style={styles.paragraph}>
                    If you have any other questions about your subscription,
                    please send us a message at support@giv.ee.
                  </Text>
                </>
              )}
              <SignOff />
            </Section>

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

SubscriptionUpgradedEmail.PreviewProps = {
  planName: 'premium',
};
