import Link from 'next/link'
import type { ReactNode } from 'react'

type Action = {
  text: string
  href: string
  variant?: 'primary' | 'minimal'
}

export function Hero({
  eyebrow,
  title,
  tagline,
  actions = [],
  children
}: {
  eyebrow?: string
  title: string
  tagline: string
  actions?: Action[]
  children?: ReactNode
}) {
  return (
    <section className="aq-hero">
      <div className="aq-hero__glow" aria-hidden="true" />
      <div className="aq-hero__inner">
        {eyebrow ? <p className="aq-hero__eyebrow">{eyebrow}</p> : null}
        <h1 className="aq-hero__title">{title}</h1>
        <p className="aq-hero__tagline">{tagline}</p>

        {actions.length > 0 ? (
          <div className="aq-hero__actions">
            {actions.map(action => {
              const external = action.href.startsWith('http')
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`aq-btn aq-btn--${action.variant ?? 'minimal'}`}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {action.text}
                </Link>
              )
            })}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  )
}
