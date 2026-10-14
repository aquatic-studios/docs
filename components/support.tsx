type Status = 'yes' | 'no' | 'soon' | 'legacy'

const labels: Record<Status, string> = {
  yes: 'Supported',
  no: 'Not supported',
  soon: 'Coming soon',
  legacy: 'Older release only'
}

const icons: Record<Status, string> = {
  yes: 'm5 12.5 4.5 4.5L19 7.5',
  no: 'M7 7l10 10M17 7 7 17',
  soon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7.5V12l3 2',
  legacy: 'M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11'
}

export function Support({ status, last }: { status: Status; last?: string }) {
  return (
    <span className={`as-support as-support--${status}`} title={labels[status]}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={icons[status]} />
      </svg>
      {last ? <span>last {last}</span> : <span className="as-sr">{labels[status]}</span>}
    </span>
  )
}
