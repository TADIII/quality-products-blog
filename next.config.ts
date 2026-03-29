import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't use standalone output for Vercel - it handles this automatically
  // output: "standalone", // Uncomment only for Docker deployments
  
  reactStrictMode: false,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
