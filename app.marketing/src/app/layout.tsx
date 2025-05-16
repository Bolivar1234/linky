import './globals.css';
import MarketingFooter from '@/components/marketing-footer';
import MarketingNavigation from '@/components/marketing-navigation';
import { LoginWidget } from '@trylinky/common';
import { Button } from '@trylinky/ui';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ReactNode } from 'react';

const seasonFont = localFont({
  src: './ssn.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Givee - A delightfully rich link-in-bio.',
  description:
    'Create your own dynamic link in bio page effortlessly with Givee, the personal page builder designed to help you stand out and connect with your audience.',
  metadataBase: new URL('https://giv.ee'),
  openGraph: {
    images: [
      {
        url: 'https://giv.ee/assets/og.png',
      },
    ],
    type: 'website',
    url: 'https://giv.ee',
    title: 'Linky',
    description:
      'Create your own dynamic link in bio page effortlessly with Givee, the personal page builder designed to help you stand out and connect with your audience.',
    siteName: 'Linky',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@trylinky',
    creator: '@trylinky',
    images: 'https://giv.ee/assets/og.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={seasonFont.className}>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="uOVisnglxzaKbI/UovGA7w"
            defer={true}
          />
        )}
      </head>
      <body className="min-h-screen">
        <MarketingNavigation>
          <>
            <LoginWidget
              trigger={
                <Button variant="ghost" className="block rounded-full">
                  Log in
                </Button>
              }
            />
            <LoginWidget
              isSignup
              trigger={
                <Button className="block rounded-full">Get started</Button>
              }
            />
          </>
        </MarketingNavigation>
        <main className="min-h-full">{children}</main>
        <MarketingFooter />
      </body>

      <Analytics />
    </html>
  );
}
