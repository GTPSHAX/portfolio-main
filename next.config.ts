import nextMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

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
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: process.env.WITH_MDX_RS === 'true',
  },
}

export default withMDX(nextConfig)