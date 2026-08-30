import type { MetaRecord } from 'nextra'

/**
 * Orden y títulos del nivel raíz.
 * - `type: 'page'` -> aparece en la navbar en vez del sidebar.
 * - `display: 'hidden'` -> no se lista en ningún lado.
 * - `theme` -> overrides de layout por página.
 */
export default {
  index: {
    type: 'page',
    display: 'hidden',
    theme: {
      layout: 'full',
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
      timestamp: false,
      copyPage: false,
      footer: true
    }
  },
  start: {
    title: 'Getting started'
  },
  libraries: {
    title: 'Libraries'
  },
  api: {
    title: 'API'
  },
  plugins: {
    title: 'Plugins'
  },
  wip: {
    title: 'Work in progress'
  },
  changelog: {
    title: 'Changelog',
    theme: { toc: true }
  }
} satisfies MetaRecord
