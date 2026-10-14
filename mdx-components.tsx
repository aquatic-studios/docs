import type { ComponentProps } from 'react'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'

const themeComponents = getThemeComponents()

function Table(props: ComponentProps<'table'>) {
  return (
    <div className="as-table">
      <table {...props} />
    </div>
  )
}

export function useMDXComponents(components?: Record<string, unknown>) {
  return {
    ...themeComponents,
    table: Table,
    ...components
  }
}
