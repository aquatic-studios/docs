import type { ReactNode } from 'react'

/** Grilla usada en la landing para listar lo que hace el estudio. */
export function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="aq-features">{children}</div>
}

export function Feature({
  title,
  children,
  emoji
}: {
  title: string
  children: ReactNode
  emoji?: string
}) {
  return (
    <div className="aq-feature">
      {emoji ? <span className="aq-feature__emoji">{emoji}</span> : null}
      <h3 className="aq-feature__title">{title}</h3>
      <p className="aq-feature__body">{children}</p>
    </div>
  )
}
