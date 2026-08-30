import type { ReactNode } from 'react'

type Variant = 'note' | 'tip' | 'caution' | 'danger' | 'version' | 'neutral'

/**
 * Etiqueta corta de estado.
 *
 * ```mdx
 * <Badge variant="tip">Stable</Badge>
 * <Badge variant="danger">Experimental</Badge>
 * ```
 */
export function Badge({
  children,
  variant = 'neutral'
}: {
  children: ReactNode
  variant?: Variant
}) {
  return <span className={`aq-badge aq-badge--${variant}`}>{children}</span>
}
