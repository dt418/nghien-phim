import type { NextConfig } from 'next'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
} satisfies NextConfig

export default nextConfig
