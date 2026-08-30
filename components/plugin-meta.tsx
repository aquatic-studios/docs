export function PluginMeta({ items }: { items: Record<string, string> }) {
  return (
    <dl className="aq-meta">
      {Object.entries(items).map(([key, value]) => (
        <div className="aq-meta__row" key={key}>
          <dt className="aq-meta__key">{key}</dt>
          <dd className="aq-meta__value">{renderInlineCode(value)}</dd>
        </div>
      ))}
    </dl>
  )
}

function renderInlineCode(value: string) {
  return value.split(/(`[^`]+`)/g).map((chunk, i) =>
    chunk.startsWith('`') && chunk.endsWith('`') && chunk.length > 1 ? (
      <code key={i}>{chunk.slice(1, -1)}</code>
    ) : (
      <span key={i}>{chunk}</span>
    )
  )
}
