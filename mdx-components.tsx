import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Callout, Cards, FileTree, Steps, Tabs } from 'nextra/components'

import { Badge } from './components/badge'
import { CardGrid, LinkCard } from './components/cards'
import { Feature, FeatureGrid } from './components/feature'
import { Hero } from './components/hero'
import { PluginMeta } from './components/plugin-meta'
import { Since } from './components/since'

const themeComponents = getThemeComponents()

/**
 * Componentes disponibles en TODOS los `.mdx` sin necesidad de importarlos.
 * Si agregás uno nuevo en /components, sumalo acá y ya lo podés usar.
 */
const customComponents = {
  Badge,
  Callout,
  CardGrid,
  Cards,
  Feature,
  FeatureGrid,
  FileTree,
  Hero,
  LinkCard,
  PluginMeta,
  Since,
  Steps,
  Tabs
}

export function useMDXComponents(components?: Record<string, unknown>) {
  return {
    ...themeComponents,
    ...customComponents,
    ...components
  }
}
