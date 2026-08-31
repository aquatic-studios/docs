'use client'

import { usePathname } from 'next/navigation'
import gitInfo from '../git-info.json'

type Entry = {
  sha: string
  short: string
  commitUrl: string
  name: string
  handle: string | null
  date: string
}

const info = gitInfo as Record<string, Entry>

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function LastUpdated({ date }: { date?: Date }) {
  const pathname = usePathname() || '/'
  const key = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/'
  const entry = info[key]

  if (!entry) {
    return date ? <span className="as-updated">Last updated: {formatDate(date.toISOString())}</span> : null
  }

  const profileUrl = entry.handle ? `https://github.com/${entry.handle}` : null
  const avatarUrl = entry.handle ? `https://github.com/${entry.handle}.png?size=40` : null

  return (
    <span className="as-updated">
      <span>Last updated: {formatDate(entry.date)} by</span>

      {profileUrl ? (
        <a className="as-updated__author" href={profileUrl} target="_blank" rel="noopener noreferrer">
          {avatarUrl ? (
            <img className="as-updated__avatar" src={avatarUrl} alt="" width={18} height={18} loading="lazy" />
          ) : null}
          <svg className="as-updated__gh" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
            />
          </svg>
          <span>{entry.name}</span>
        </a>
      ) : (
        <span className="as-updated__author">{entry.name}</span>
      )}

      <span>in</span>

      <a href={entry.commitUrl} target="_blank" rel="noopener noreferrer">
        <code className="as-updated__sha">{entry.short}</code>
      </a>
    </span>
  )
}
