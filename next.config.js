/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
