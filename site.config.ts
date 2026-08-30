export const site = {
  name: 'Aquatic Studios',
  title: 'Aquatic Studios Documentation',
  titleTemplate: '%s — Aquatic Studios',
  description:
    'Official documentation for every Aquatic Studios plugin, library and API. Written and maintained by Senkex.',
  url: 'https://docs.aquatic-studios.com',
  author: 'Senkex',
  authorUrl: 'https://github.com/senkex',
  github: 'https://github.com/aquatic-studios',
  repo: 'https://github.com/aquatic-studios/docs',
  docsRepositoryBase: 'https://github.com/aquatic-studios/docs/tree/main',
  discord: 'https://discord.gg/aquaticstudios',
  spigot: 'https://www.spigotmc.org/',
  polymart: 'https://polymart.org/',
  theme: {
    hue: { light: 199, dark: 190 },
    saturation: { light: 90, dark: 95 },
    lightness: { light: 42, dark: 58 },
    background: { light: '#fbfdfe', dark: '#080b11' }
  }
} as const

export type SiteConfig = typeof site
