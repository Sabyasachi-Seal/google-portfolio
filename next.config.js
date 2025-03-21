/** @type {import('next').NextConfig} */
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
      '*',
    ],
    minimumCacheTTL: 86400,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: 'akamai',
    path: './public',
  },
}

module.exports = nextConfig
