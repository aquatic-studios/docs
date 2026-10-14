import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: { codeblocks: false },
  contentDirBasePath: '/',
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        light: 'github-light-default',
        dark: 'github-dark-default'
      }
    }
  }
})

export default withNextra({
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
})
