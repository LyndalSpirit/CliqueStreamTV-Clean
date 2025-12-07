// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optional: this can clean up tracing warnings later if needed
  // outputFileTracingRoot: __dirname,

  webpack: (config, { isServer }) => {
    // For client-side bundles, tell Webpack not to try to polyfill
    // Node core modules used by gRPC / OpenTelemetry / Genkit.
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        tls: false,
        net: false,
        http2: false,
        dns: false,
      };
    }

    return config;
  },
};

export default nextConfig;

