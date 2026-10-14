import type { MetaRecord } from 'nextra'

export default {
  index: { type: 'page', title: 'Home', theme: { sidebar: false, toc: false, copyPage: false, breadcrumb: false } },
  start: { type: 'page', title: 'Features In All Plugins' },
  'supported-versions': { type: 'page', title: 'Supported Versions' },
  plugins: { type: 'page', title: 'Plugins' },
  libraries: { type: 'page', title: 'Libraries' },
  wip: { type: 'page', title: 'Work in progress' },
  changelog: { type: 'page', title: 'Changelog' }
} satisfies MetaRecord
