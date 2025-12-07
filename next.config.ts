// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // You *can* add this later if you want to silence the workspace-root warning:
  // outputFileTracingRoot: __dirname,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};

      // Tell Webpack not to try to bundle these Node core modules
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        tls: false,
        net: false,
        http2: false,
        dns: false,
        fs: false,
        dgram: false,
        async_hooks: false,
        child_process: false,
        buffer: false,
        events: false,
      };

      // Handle the new "node:"-prefixed imports too (node:async_hooks, node:buffer, node:events)
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'node:async_hooks': false,
        'node:buffer': false,
        'node:events': false,
      };
    }

    return config;
  },
};

export default nextConfig;
