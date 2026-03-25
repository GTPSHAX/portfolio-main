import nextMDX from '@next/mdx';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    jsx: true,
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
  },
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: process.env.WITH_MDX_RS === 'true',
    optimizePackageImports: ['react-icons'],
  },
}

export default withMDX(nextConfig)