/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-tweet'],
  images: {
    domains: ['pbs.twimg.com', 'abs.twimg.com'],
  },
  experimental: {
    appDir: true,
  },
}

export default nextConfig
