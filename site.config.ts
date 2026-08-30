/**
 * Configuración central del sitio.
 * Todo lo que puede cambiar (dominio, repo, redes, autor) vive acá.
 * Aquatic Studios — by Senkex
 */
export const site = {
  /** Nombre corto, usado en navbar y footer */
  name: 'Aquatic Studios',
  /** Título por defecto de las pestañas del navegador */
  title: 'Aquatic Studios Documentation',
  /** Plantilla de título para las páginas internas */
  titleTemplate: '%s — Aquatic Studios',
  /** Descripción por defecto / meta description */
  description:
    'Official documentation for every Aquatic Studios plugin, library and API. Written and maintained by Senkex.',
  /** URL final del sitio (sin barra al final) */
  url: 'https://docs.aquatic-studios.com',
  /** Autor único del proyecto */
  author: 'Senkex',
  authorUrl: 'https://github.com/senkex',
  /** Organización en GitHub */
  github: 'https://github.com/aquatic-studios',
  /** Repositorio de esta documentación */
  repo: 'https://github.com/aquatic-studios/docs',
  /** Base usada por "Edit this page" y por el enlace a los commits */
  docsRepositoryBase: 'https://github.com/aquatic-studios/docs/tree/main',
  /** Servidor de Discord */
  discord: 'https://discord.gg/aquaticstudios',
  /** Marketplaces donde publicás */
  spigot: 'https://www.spigotmc.org/',
  polymart: 'https://polymart.org/',
  /** Colores base del tema (se aplican en app/layout.tsx) */
  theme: {
    hue: { light: 199, dark: 190 },
    saturation: { light: 90, dark: 95 },
    lightness: { light: 42, dark: 58 },
    background: { light: '#fbfdfe', dark: '#080b11' }
  }
} as const

export type SiteConfig = typeof site
