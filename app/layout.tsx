import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

import { LastUpdated } from '../components/last-updated'

import '@fontsource-variable/inter'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://docs.aquatic-studios.com'),
  title: {
    default: 'Aquatic Studios Documentation',
    template: '%s – Aquatic Studios'
  },
  description: 'Official documentation for every Aquatic Studios plugin, library and API.',
  authors: [{ name: 'Senkex', url: 'https://github.com/senkex' }],
  creator: 'Senkex',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  },
  openGraph: {
    type: 'website',
    url: 'https://docs.aquatic-studios.com',
    siteName: 'Aquatic Studios Documentation',
    title: 'Aquatic Studios Documentation',
    description: 'Official documentation for every Aquatic Studios plugin, library and API.',
    images: ['/logo.png'],
    locale: 'en_US'
  }
}

const logo = (
  <span className="as-logo">
    <img src="/logo.png" alt="" width={28} height={28} />
    <span>Aquatic Studios</span>
  </span>
)

const navbar = (
  <Navbar logo={logo} logoLink="/" projectLink="https://github.com/aquatic-studios" />
)

const footer = (
  <Footer>
    <div className="as-footer">
      Powered by{' '}
      <a href="https://github.com/aquatic-studios" target="_blank" rel="noopener noreferrer">
        Aquatic Studios
      </a>{' '}
      @{' '}
      <a href="https://github.com/senkex" target="_blank" rel="noopener noreferrer">
        Senkex
      </a>
    </div>
  </Footer>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        color={{ hue: 211, saturation: 100, lightness: { light: 48, dark: 56 } }}
        backgroundColor={{ light: '#ffffff', dark: '#000000' }}
      />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/aquatic-studios/docs/tree/main"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          lastUpdated={<LastUpdated />}
          toc={{ backToTop: 'Back to top' }}
          nextThemes={{ defaultTheme: 'dark' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
