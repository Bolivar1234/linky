import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const marketingURL = process.env.NEXT_PUBLIC_MARKETING_URL;

if (!marketingURL) {
  console.warn('⚠️ Environment variable NEXT_PUBLIC_MARKETING_URL is not defined. Rewrites will be skipped.');
}

const nextConfig: NextConfig = {
  transpilePackages: ['@trylinky/ui', '@trylinky/common'],
  rewrites: async () => {
    if (!marketingURL) return [];

    return [
      {
        source: '/',
        destination: `${marketingURL}/i`,
      },
      {
        source: '/sitemap.xml',
        destination: `${marketingURL}/i/sitemap.xml`,
      },
      {
        source: '/i/:path*',
        destination: `${marketingURL}/i/:path*`,
      },
    ];
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dev.giv.ee',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.giv.ee',
        port: '',
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: false,
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});