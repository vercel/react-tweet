import mdx from '@next/mdx'

const withMDX = mdx()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
    ],
  },
  experimental: {
    appDir: true,
    mdxRs: true,
  },
}

export default withMDX(nextConfig)
