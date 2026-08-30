import type { ReactNode } from 'react'
import Link from 'next/link'

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="aq-cardgrid">{children}</div>
}

export function LinkCard({
  title,
  href,
  description,
  icon,
  badge
}: {
  title: string
  href: string
  description?: string
  icon?: ReactNode
  badge?: string
}) {
  const external = href.startsWith('http')

  return (
    <Link
      href={href}
      className="aq-card"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="aq-card__head">
        {icon ? <span className="aq-card__icon">{icon}</span> : null}
        <span className="aq-card__title">{title}</span>
        {badge ? <span className="aq-card__badge">{badge}</span> : null}
        <svg className="aq-card__arrow" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.22 11.78a.75.75 0 0 1 0-1.06L8.94 6H5.75a.75.75 0 0 1 0-1.5h5a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V7.06l-4.72 4.72a.75.75 0 0 1-1.06 0z"
          />
        </svg>
      </span>
      {description ? <span className="aq-card__desc">{description}</span> : null}
    </Link>
  )
}
