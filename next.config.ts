import { NextConfig } from "next";
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ["lucide-react"],
} satisfies NextConfig;

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
