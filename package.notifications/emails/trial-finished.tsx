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

export default function TrialFinishedEmail() {
  return (
    <Html>
      <Head />
      <Preview>Your Givee Premium trial has ended</Preview>
      <Tailwind>
        <Body style={styles.main}>
          <Container style={styles.container}>
            <Logo />
            <EmailHeader
              title="Your trial has ended"
              subtitle="We've moved you to our free plan"
            />

            <Section>
              <Text style={styles.paragraph}>
                As you haven't extended your plan, your account has been moved
                to our free plan.
              </Text>

              <Text style={styles.paragraph}>
                Login to the Givee dashboard at any point to choose a new plan,
                and carry on where you left off!
              </Text>
              <SignOff />
            </Section>

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
