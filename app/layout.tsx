import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { DiscordIcon, GitHubIcon } from 'nextra/icons'
import { getPageMap } from 'nextra/page-map'

import { LastUpdated } from '../components/last-updated'
import { NavbarTabs } from '../components/navbar-tabs'

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
    <img src="/logo.png" alt="" width={26} height={26} />
    <span className="as-logo__name">Aquatic Studios</span>
    <span className="as-logo__tag">Docs</span>
  </span>
)

const navbar = (
  <Navbar logo={logo}>
    <div className="as-links">
      <a href="https://discord.gg/cdT5g5xsVq" target="_blank" rel="noopener noreferrer" aria-label="Discord">
        <DiscordIcon width="20" />
      </a>
      <a href="https://github.com/aquatic-studios" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <GitHubIcon height="20" />
      </a>
    </div>
    <NavbarTabs />
  </Navbar>
)

const tocTitle = (
  <span className="as-toc-title">
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h10" />
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
        color={{ hue: 211, saturation: 100, lightness: { light: 42, dark: 70 } }}
        backgroundColor={{ light: '#ffffff', dark: '#1e1e22' }}
      />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/aquatic-studios/docs/tree/main"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true, toggleButton: false }}
          lastUpdated={<LastUpdated />}
          editLink={null}
          feedback={{ content: null }}
          toc={{ title: tocTitle, backToTop: null }}
          nextThemes={{ defaultTheme: 'dark' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
