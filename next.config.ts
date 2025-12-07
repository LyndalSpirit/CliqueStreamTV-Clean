// next.config.ts

const nextConfig = {
  reactStrictMode: true,

  // Turbopack config (empty is fine; it just silences the error)
  turbopack: {
    // Optional: if you want to quiet the "workspace root" warning,
    // you can uncomment this line so Turbopack knows the real root:
    // root: __dirname,
  },

  // typedRoutes used to live under experimental.typedRoutes
  // in older versions of Next. As of v16, it's top-level.
  typedRoutes: true,
};

export default nextConfig;
