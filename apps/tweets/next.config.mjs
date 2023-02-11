/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-tweet'],
  images: {
    domains: ['pbs.twimg.com', 'abs.twimg.com'],
  },
}

export default nextConfig
