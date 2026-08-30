import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

import { AquaticLogo } from '../components/logo'
import { SiteFooter } from '../components/site-footer'
import { site } from '../site.config'

import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: site.titleTemplate
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.authorUrl }],
  creator: site.author,
  publisher: site.name,
  keywords: [
    'Aquatic Studios',
    'Minecraft plugins',
    'Spigot',
    'Paper',
    'Folia',
    'documentation',
    'Senkex'
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description
  },
  alternates: {
    canonical: site.url
  }
}

const banner = (
  <Banner storageKey="aquatic-docs-banner-1">
    AquaCore 2.0 is out — <a href="/changelog">read the changelog</a>
  </Banner>
)

const navbar = (
  <Navbar logo={<AquaticLogo />} logoLink="/" projectLink={site.github} chatLink={site.discord} />
)

const footer = (
  <Footer>
    <SiteFooter />
  </Footer>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        color={{
          hue: site.theme.hue,
          saturation: site.theme.saturation,
          lightness: site.theme.lightness
        }}
        backgroundColor={site.theme.background}
      />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase={site.docsRepositoryBase}
          editLink="Edit this page on GitHub"
          feedback={{ content: 'Found a mistake? Open an issue', labels: 'documentation' }}
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true, autoCollapse: false }}
          toc={{ backToTop: 'Back to top', title: 'On this page' }}
          navigation={{ prev: true, next: true }}
          darkMode
          nextThemes={{ defaultTheme: 'dark' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
