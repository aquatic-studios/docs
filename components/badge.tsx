import type { ReactNode } from 'react'

type Variant = 'note' | 'tip' | 'caution' | 'danger' | 'version' | 'neutral'

export function Badge({
  children,
  variant = 'neutral'
}: {
  children: ReactNode
  variant?: Variant
}) {
  return <span className={`aq-badge aq-badge--${variant}`}>{children}</span>
}
