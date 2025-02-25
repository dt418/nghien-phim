import { NextConfig } from 'next';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  output: 'standalone',
} satisfies NextConfig;

export default nextConfig;
