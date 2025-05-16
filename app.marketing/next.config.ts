import createMDX from '@next/mdx';
import { NextConfig } from 'next';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
  },
});

const nextConfig: NextConfig = {
  basePath: '/i',
  experimental: {
    manualClientBasePath: true,
  },
  transpilePackages: ['@trylinky/ui', '@trylinky/common'],
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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
      {
        protocol: 'https',
        hostname: 'us-west-2.cdn.hygraph.com',
        port: '',
      },
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              protocol: 'http' as const,
              hostname: 'localhost',
              port: '3000',
            },
          ]
        : []),
    ],
  },
};

export default withMDX(nextConfig);