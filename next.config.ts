import { NextConfig } from "next";

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

export default nextConfig;
