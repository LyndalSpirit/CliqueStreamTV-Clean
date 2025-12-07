// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // If you need custom webpack tweaks, put them here:
  webpack: (config) => {
    // Example: leave it unchanged for now
    return config;
  },

  // (Optional) Later we can add:
  // outputFileTracingRoot: __dirname,
  // if you want to silence the workspace-root warning cleanly.
};

export default nextConfig;
