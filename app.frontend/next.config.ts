import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@trylinky/ui', '@trylinky/common'],
  rewrites: async () => [
    {
      source: '/',
      destination: `${process.env.NEXT_PUBLIC_MARKETING_URL}/i`,
    },
    {
      source: '/sitemap.xml',
      destination: `${process.env.NEXT_PUBLIC_MARKETING_URL}/i/sitemap.xml`,
    },
    {
      source: '/i/:path*',
      destination: `${process.env.NEXT_PUBLIC_MARKETING_URL}/i/:path*`,
    },
  ],
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