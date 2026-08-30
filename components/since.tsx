export function Since({ v }: { v: string }) {
  return (
    <span className="aq-since" title={`Disponible desde la versión ${v}`}>
      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.75 4a.75.75 0 0 0-1.5 0v4c0 .28.16.54.4.67l2.75 1.5a.75.75 0 1 0 .72-1.32L8.75 7.55V4z"
        />
      </svg>
      since {v}
    </span>
  )
}
