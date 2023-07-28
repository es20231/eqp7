/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add environment variables
  env: {
    API_URL: process.env.API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['www.dropbox.com'],
  },
}

module.exports = nextConfig
