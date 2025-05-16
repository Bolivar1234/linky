import { EmailHeader, EmailFooter, styles, Logo, SignOff } from './components';
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>Welcome to Givee - The delightfully rich link-in-bio</Preview>
    <Tailwind>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Logo />
          <EmailHeader
            title="Welcome to Givee"
            subtitle="The delightfully rich link-in-bio"
            imageUrl="https://cdn.giv.e/email-assets/welcome-header.png"
            imageAlt="Welcome to Givee"
          />

          <Section>
            <Text style={styles.paragraph}>Thanks for signing up!</Text>

            <Text style={styles.paragraph}>
              My name is Dan, the founder of Givee. You're now part of a
              growing community of over 3,000 creators who are using Givee to
              power their link-in-bio.
            </Text>

            <Text style={styles.paragraph}>
              To help you get the most out of Givee, here's a few recommended
              first steps:
            </Text>

            <ul style={styles.list}>
              <li style={styles.listItem}>
                <Link href="https://giv.e/edit" style={styles.link}>
                  Setup your first page
                </Link>
              </li>
              <li style={styles.listItem}>
                Add some integrations (I personally love the Spotify and Threads
                integrations)
              </li>
              <li style={styles.listItem}>Share your Givee on your socials!</li>
            </ul>

            <Text style={styles.paragraph}>
              If you have any questions or feedback, feel free to reply to this
              email!
            </Text>

            <SignOff label="Dan" />
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WelcomeEmail;
