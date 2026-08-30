import { site } from '../site.config'

/** Isotipo + wordmark de Aquatic Studios usado en la navbar. */
export function AquaticLogo() {
  return (
    <span className="aq-logo">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="aq-logo__mark">
        <defs>
          <linearGradient id="aq-logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38e8ff" />
            <stop offset="55%" stopColor="#12a6f0" />
            <stop offset="100%" stopColor="#1244d6" />
          </linearGradient>
        </defs>
        <path
          d="M32 8c8.8 10.6 15 18.7 15 26.1C47 43.4 40.3 50 32 50s-15-6.6-15-15.9C17 26.7 23.2 18.6 32 8z"
          fill="url(#aq-logo-grad)"
        />
        <path
          d="M18.5 37c3 0 3 3 6 3s3-3 6-3 3 3 6 3 3-3 6-3"
          fill="none"
          stroke="#04070d"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".5"
        />
      </svg>
      <span className="aq-logo__text">
        <b>Aquatic</b> Studios
      </span>
      <span className="aq-logo__tag">docs</span>
      <span className="sr-only">{site.title}</span>
    </span>
  )
}
