import nextra from 'nextra'

const withNextra = nextra({
  // Muestra el botón "copiar" en todos los bloques de código
  defaultShowCopyCode: true,
  // Buscador (Pagefind). `codeblocks: true` también indexa el código.
  search: { codeblocks: false },
  // Las páginas viven en /content y se sirven desde la raíz del sitio
  contentDirBasePath: '/',
  // Tema de resaltado de sintaxis (Shiki)
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        light: 'github-light',
        dark: 'night-owl'
      }
    }
  }
})

export default withNextra({
  // Export 100% estático -> carpeta /out -> GitHub Pages
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
})
