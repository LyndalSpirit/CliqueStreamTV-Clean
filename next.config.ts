// next.config.ts
import type { NextConfig } from 'next'
import webpack from 'webpack'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },
  webpack: (config) => {
    // If anything tries to import these, ignore them in the client bundle
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(handlebars|dotprompt|genkit|@genkit-ai\/core)$/,
      })
    )
    return config
  },
}

export default nextConfig

