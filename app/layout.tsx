import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'Aquatic Studios Documentation',
    template: '%s – Aquatic Studios'
  },
  description: 'Official documentation for every Aquatic Studios plugin, library and API.'
}

const navbar = <Navbar logo={<b>Aquatic Studios</b>} />

const footer = <Footer>MIT {new Date().getFullYear()} © Aquatic Studios.</Footer>

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/aquatic-studios/docs/tree/main"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
