/** @type {import('next').NextConfig} */
const WebpackObfuscator = require('webpack-obfuscator')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'www.google.com',
      'avatars.githubusercontent.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'i1.ytimg.com',
      'sarhfiles.blob.core.windows.net',
      'www.powerchangeslives.com',
      'ph-files.imgix.net',
      'img.freepik.com',
      'github.githubassets.com',
      'github.githubassets.com',
      '*.medium.com',
      '*',
    ],
    minimumCacheTTL: 86400,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.plugins.push(
        new WebpackObfuscator(
          {
            rotateStringArray: true,
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: false,
            stringArray: true,
            stringArrayThreshold: 0.75,
          },
          []
        )
      )
    }
    return config
  },
}

module.exports = nextConfig
