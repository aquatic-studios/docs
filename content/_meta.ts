import type { MetaRecord } from 'nextra'

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
