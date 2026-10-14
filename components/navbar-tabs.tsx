'use client'

import { Anchor } from 'nextra/components'
import { useFSRoute } from 'nextra/hooks'
import { useConfig } from 'nextra-theme-docs'

type Tab = { title: string; href: string; active: boolean }

export function NavbarTabs() {
  const route = useFSRoute()
  const items = useConfig().normalizePagesResult.topLevelNavbarItems

  const tabs: Tab[] = items.map(item => {
    const firstChild = 'frontMatter' in item || !('firstChildRoute' in item) ? undefined : item.firstChildRoute

    return {
      title: String(item.title),
      href: firstChild || item.route,
      active: route === item.route || route.startsWith(item.route + '/')
    }
  })

  return (
    <div className="as-tabs">
      {tabs.map(tab => (
        <Anchor
          key={tab.href}
          href={tab.href}
          className="as-tab"
          aria-current={tab.active ? 'page' : undefined}
        >
          {tab.title}
        </Anchor>
      ))}
    </div>
  )
}
