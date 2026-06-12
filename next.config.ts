import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placeholder.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      include: /locales/,
      type: 'json',
    })
    return config
  },
}

export default nextConfig
