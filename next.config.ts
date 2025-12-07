// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optional: you can uncomment this later to quiet some tracing/root warnings
  // outputFileTracingRoot: __dirname,

  webpack: (config, { isServer }) => {
    // For client-side bundles, avoid trying to bundle Node core modules
    // that libraries like gRPC / OpenTelemetry / Genkit use.
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        tls: false,
        net: false,
        http2: false,
        dns: false,
        fs: false,
        dgram: false,
        async_hooks: false,
      };
    }

    return config;
  },
};

export default nextConfig;
