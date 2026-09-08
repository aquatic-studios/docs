import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

import { LastUpdated } from '../components/last-updated'
import { TocIndicator } from '../components/toc-indicator'

import '@fontsource-variable/inter'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://docs.aquatic-studios.com'),
  title: {
    default: 'Aquatic Studios Documentation',
    template: '%s – Aquatic Studios'
  },
  description: 'Official documentation for every Aquatic Studios plugin and library.',
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
    description: 'Official documentation for every Aquatic Studios plugin and library.',
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

const tocTitle = (
  <span className="as-toc-title">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 6h16M4 12h10M4 18h13" />
    </svg>
    On this page
  </span>
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
        backgroundColor={{ light: '#ffffff', dark: '#080b12' }}
      />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/aquatic-studios/docs/tree/main"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 6, toggleButton: true, autoCollapse: false }}
          lastUpdated={<LastUpdated />}
          toc={{ title: tocTitle, backToTop: 'Scroll to top', extraContent: <TocIndicator /> }}
          nextThemes={{ defaultTheme: 'dark' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
