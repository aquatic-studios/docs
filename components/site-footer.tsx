import { site } from '../site.config'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <div className="aq-footer">
      <div className="aq-footer__top">
        <div className="aq-footer__brand">
          <strong>{site.name}</strong>
          <span>{site.description}</span>
        </div>

        <nav className="aq-footer__nav" aria-label="Footer">
          <div className="aq-footer__col">
            <span className="aq-footer__heading">Docs</span>
            <a href="/start/introduction">Introduction</a>
            <a href="/plugins/aquacore/overview">Plugins</a>
            <a href="/libraries/aqualib">Libraries</a>
            <a href="/api/aquaapi">API</a>
          </div>
          <div className="aq-footer__col">
            <span className="aq-footer__heading">Project</span>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={site.discord} target="_blank" rel="noopener noreferrer">
              Discord
            </a>
            <a href="/changelog">Changelog</a>
            <a href="/start/support">Support</a>
          </div>
        </nav>
      </div>

      <div className="aq-footer__bottom">
        <p>
          Copyright © {year} <a href={site.url}>{site.name}</a>. Written and maintained by{' '}
          <a href={site.authorUrl} target="_blank" rel="noopener noreferrer">
            {site.author}
          </a>
          .
        </p>
        <p className="aq-footer__disclaimer">
          This website is not an official Minecraft website and is not associated with Mojang Studios
          or Microsoft. All product and company names are trademarks or registered trademarks of
          their respective holders. Use of these names does not imply any affiliation or endorsement
          by them.
        </p>
      </div>
    </div>
  )
}
